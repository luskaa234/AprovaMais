import "dotenv/config";
import axios from "axios";
import * as cheerio from "cheerio";
import { PDFParse } from "pdf-parse";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeContentText } from "../../src/utils/textEncoding.js";

type ExamFormat = "multipla_escolha";

type SubjectConfig = {
  id: string;
  name: string;
  url: string;
};

type ManualPdfSource = {
  provaPdf: string;
  gabaritoPdf?: string;
  disciplina: string;
  orgao: string;
  cargo: string;
  ano: number;
  banca: string;
  fonteUrl?: string;
};

type MinerConfig = {
  mode: "test" | "import";
  pageLimit: number;
  questionLimitPerDiscipline: number;
  import: boolean;
  pageHints?: Record<string, number[]>;
  allowedSubjects: SubjectConfig[];
  militaryKeywords: string[];
  excludedKeywords: string[];
  proofDiscoveryUrls: string[];
  proofSearchTerms: string[];
  manualSources: {
    html: string[];
    pdfs: ManualPdfSource[];
  };
  output: {
    storageRoot: string;
    preview: string;
    report: string;
    publicQuestions: string;
    publicReport: string;
    publicManifest: string;
  };
};

type PciQuestion = {
  id: string;
  codigo: string;
  orgao: string;
  cargo: string;
  ano: number | "";
  banca: string;
  formato: ExamFormat;
  numero: number;
  materia: string;
  topico: string;
  enunciado: string;
  alternativas: Array<{ letra: string; texto: string }>;
  gabarito: string;
  anulada: boolean;
  origem: string;
  banca_selo: string;
  concurso: string;
  comentario: string;
  fonteUrl: string;
  categoria: "Concursos Militares";
  statusRevisao: "ok" | "pendente_gabarito" | "pendente_extracao";
};

type ProofCandidate = {
  title: string;
  url: string;
  orgao: string;
  banca: string;
  ano: number | "";
  cargo: string;
  fonte: string;
};

type Report = {
  mode: string;
  collectedAt: string;
  urlsAcessadas: string[];
  provasEncontradas: ProofCandidate[];
  porDisciplina: Record<string, { extraidas: number; importaveis: number; pendentes: number; ignoradas: number }>;
  totais: {
    extraidas: number;
    importaveis: number;
    pendentesRevisao: number;
    duplicadas: number;
    ignoradas: number;
    importadas: number;
  };
  erros: Array<{ url?: string; etapa: string; erro: string }>;
  proximosPassos: string[];
};

const CONFIG_PATH = path.resolve(process.cwd(), "scripts", "content-miner", "pci-militar.config.json");
const PCI_BASE = "https://www.pciconcursos.com.br";
const USER_AGENT = "Mozilla/5.0 (compatible; AprovaPCI-MilitarMiner/1.0; +https://vemaprovar.com)";

function log(message: string) {
  console.log(`[PCI Militar Miner] ${message}`);
}

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(value = "") {
  return normalizeContentText(value)
    .replace(/\u00c2/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function safeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 130)
    .toLowerCase();
}

function shortHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function isImportMode(config: MinerConfig) {
  return process.argv.includes("--import") || process.env.PCI_MILITAR_IMPORT === "1" || config.mode === "import" || config.import === true;
}

async function readConfig() {
  return JSON.parse(await readFile(CONFIG_PATH, "utf-8")) as MinerConfig;
}

async function fetchHtml(url: string) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 30_000,
    maxRedirects: 5,
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Language": "pt-BR,pt;q=0.9",
    },
  });
  return decodeHtml(Buffer.from(response.data), String(response.headers["content-type"] || ""));
}

async function postSearch(term: string) {
  const response = await axios.post(`${PCI_BASE}/provas/`, new URLSearchParams({ prova: term }), {
    responseType: "arraybuffer",
    timeout: 30_000,
    maxRedirects: 5,
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Language": "pt-BR,pt;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return decodeHtml(Buffer.from(response.data), String(response.headers["content-type"] || ""));
}

function decodeHtml(buffer: Buffer, contentType: string) {
  const charset = contentType.match(/charset=([^;]+)/i)?.[1]?.trim().toLowerCase();
  const decoder = new TextDecoder(charset && charset !== "iso-8859-1" ? charset : "windows-1252");
  return decoder.decode(buffer);
}

function includesTerm(haystack: string, term: string) {
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return false;

  if (["pm", "cbm"].includes(normalizedTerm)) {
    return new RegExp(`(?:^|[^a-z0-9])${normalizedTerm}(?:$|[^a-z0-9])`, "i").test(haystack);
  }
  if (["pm-", "pm/", "pm ", "cbm-", "cbm/"].includes(normalizedTerm)) {
    return haystack.includes(normalizedTerm);
  }
  return haystack.includes(normalizedTerm);
}

function hasMilitaryContext(value: string, config: MinerConfig) {
  const normalized = normalizeText(value);
  if (!normalized) return false;
  if (config.excludedKeywords.some((term) => normalized.includes(normalizeText(term)))) return false;

  const strongTerms = [
    "polícia militar",
    "policia militar",
    "bombeiro militar",
    "corpo de bombeiros",
    "guarda municipal",
    "guarda civil municipal",
    "cbm",
    "pm-",
    "pm/",
    "cbm-",
    "cbm/",
    "concurso militar",
  ];
  if (strongTerms.some((term) => includesTerm(normalized, term))) return true;

  const weakTerm = ["soldado", "oficial", "cadete", "bombeiro", "agente de segurança", "agente de seguranca"]
    .some((term) => includesTerm(normalized, term));
  const explicitContext = ["policia", "polícia", "militar", "bombeiro militar", "cbm", "guarda municipal", "guarda civil municipal", "corpo de bombeiros"]
    .some((term) => includesTerm(normalized, term));
  return weakTerm && explicitContext;
}

function parseGabaritos(html: string) {
  const map = new Map<string, string>();
  const match = html.match(/var\s+simGabaritos\s*=\s*(\{[\s\S]*?\});/);
  if (!match) return map;

  try {
    const parsed = JSON.parse(match[1]);
    Object.entries(parsed).forEach(([id, answer]) => {
      const normalized = normalizeAnswer(String(answer || ""));
      if (normalized) map.set(String(id), normalized);
    });
  } catch {
    // Mantem pendente se o PCI alterar o formato do script.
  }
  return map;
}

function parseComentarios(html: string) {
  const map = new Map<string, string>();
  const match = html.match(/var\s+simComentariosIA\s*=\s*(\{[\s\S]*?\});/);
  if (!match) return map;

  try {
    const parsed = JSON.parse(match[1]);
    Object.entries(parsed).forEach(([id, comment]) => {
      if (comment) map.set(String(id), cleanText(String(comment)));
    });
  } catch {
    // Comentarios sao opcionais; nunca bloqueiam a mineracao.
  }
  return map;
}

function normalizeAnswer(value = "") {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  if (normalized.includes("anulada") || normalized === "*" || normalized === "x") return "anulada";
  const letter = normalized[0];
  return ["a", "b", "c", "d", "e"].includes(letter) ? letter : "";
}

function parseSource(text = "", href = ""): { orgao: string; banca: string; ano: number | ""; cargo: string } {
  const parts = text.split("•").map((item) => cleanText(item)).filter(Boolean);
  const yearMatch = text.match(/\b(19|20)\d{2}\b/) || href.match(/\b(19|20)\d{2}\b/);
  const ano: number | "" = yearMatch ? Number(yearMatch[0]) : "";
  return {
    orgao: parts[0] || "PCI Concursos",
    banca: parts[1] || "PCI",
    ano,
    cargo: inferCargoFromUrl(href) || inferCargoFromTitle(parts[0] || text) || "Cargo militar",
  };
}

function inferCargoFromUrl(href = "") {
  const slug = href.split("/").pop() || "";
  const clean = slug.replace(/-\d+$/, "");
  if (clean.includes("bombeiro") && clean.includes("cbm")) return "Bombeiro Militar";
  if (clean.includes("policia-militar") && clean.includes("soldado")) return "Soldado";
  if (clean.includes("policia-militar") && clean.includes("oficial")) return "Oficial";
  const known = [
    "soldado",
    "oficial",
    "cadete",
    "guarda-municipal",
    "guarda-civil-municipal",
    "bombeiro-militar",
    "agente-de-seguranca",
  ];
  const found = known.find((term) => clean.includes(term));
  if (!found) return "";
  return titleCase(found.replace(/-/g, " "));
}

function inferCargoFromTitle(value = "") {
  const normalized = normalizeText(value);
  const options = ["Soldado", "Oficial", "Cadete", "Guarda Municipal", "Bombeiro Militar", "Agente de Segurança"];
  return options.find((option) => normalized.includes(normalizeText(option))) || "";
}

function titleCase(value = "") {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function parseQuestionNumber(text = "") {
  return Number(text.match(/Questão\s+(\d+)/i)?.[1] || 0);
}

function parseQuestionCode(text = "", sid = "") {
  return text.match(/\bQ\d{4,}\b/i)?.[0] || `Q${sid}`;
}

function makeQuestionId(question: Omit<PciQuestion, "id" | "codigo">, originalCode: string) {
  const source = [
    "pci",
    question.orgao,
    question.cargo,
    question.ano,
    question.banca,
    question.materia,
    originalCode,
    question.numero,
  ].join("-");
  return safeFileName(source);
}

function parseSimuladoQuestions(html: string, subject: SubjectConfig, sourceUrl: string, config: MinerConfig) {
  const $ = cheerio.load(html);
  const answers = parseGabaritos(html);
  const comments = parseComentarios(html);
  const questions: PciQuestion[] = [];
  let ignored = 0;

  $(".sim-questao").each((_, node) => {
    const sid = String($(node).attr("data-sid") || "");
    const sourceLink = $(node).find(".sim-prova-link").first();
    const sourceText = cleanText(sourceLink.text());
    const sourceHref = sourceLink.attr("href") || "";
    const fullSourceUrl = sourceHref ? new URL(sourceHref, PCI_BASE).toString() : sourceUrl;
    const badges = cleanText($(node).find(".badge").text());
    const haystack = `${sourceText} ${sourceHref} ${badges}`;

    if (!hasMilitaryContext(haystack, config)) {
      ignored += 1;
      return;
    }

    const source = parseSource(sourceText, sourceHref);
    const enunciado = cleanText($(node).find(".sim-enunciado").text());
    const alternativas = $(node)
      .find(".btn-sim-alt")
      .toArray()
      .map((button) => ({
        letra: String($(button).attr("data-letra") || "").toUpperCase(),
        texto: cleanText($(button).clone().children(".sim-letra").remove().end().text()),
      }))
      .filter((item) => item.letra && item.texto);

    if (!enunciado || alternativas.length < 2) {
      ignored += 1;
      return;
    }

    const gabarito = answers.get(sid) || "";
    const numero = parseQuestionNumber(badges) || questions.length + 1;
    const originalCode = parseQuestionCode(badges, sid);
    const statusRevisao: PciQuestion["statusRevisao"] = gabarito ? "ok" : "pendente_gabarito";
    const questionBase = {
      orgao: source.orgao,
      cargo: source.cargo,
      ano: source.ano,
      banca: source.banca,
      formato: "multipla_escolha" as const,
      numero,
      materia: subject.name,
      topico: `${subject.name} - ${source.orgao} ${source.ano || ""}`.trim(),
      enunciado,
      alternativas,
      gabarito: gabarito || "pendente",
      anulada: gabarito === "anulada",
      origem: "pci_concursos",
      banca_selo: source.banca,
      concurso: source.orgao,
      comentario: comments.get(sid) || (gabarito ? `Questao PCI Concursos. Gabarito: ${gabarito.toUpperCase()}.` : "Gabarito nao localizado com seguranca no PCI; revisar antes de usar em simulado avaliativo."),
      fonteUrl: fullSourceUrl,
      categoria: "Concursos Militares" as const,
      statusRevisao,
    };
    const id = makeQuestionId(questionBase, originalCode);
    questions.push({
      ...questionBase,
      id,
      codigo: id.toUpperCase(),
    });
  });

  return { questions, ignored };
}

function dedupeQuestions(questions: PciQuestion[]) {
  const seen = new Set<string>();
  const unique: PciQuestion[] = [];
  let duplicated = 0;

  for (const question of questions) {
    const key = normalizeText([
      question.enunciado,
      question.alternativas.map((item) => `${item.letra}:${item.texto}`).join("|"),
      question.banca,
      question.ano,
      question.orgao,
    ].join(" "));
    if (seen.has(key)) {
      duplicated += 1;
      continue;
    }
    seen.add(key);
    unique.push(question);
  }
  return { unique, duplicated };
}

function parseProofCandidates(html: string, sourceUrl: string, config: MinerConfig) {
  const $ = cheerio.load(html);
  const candidates: ProofCandidate[] = [];
  $("a[href*='/provas/download/']").each((_, link) => {
    const title = cleanText($(link).text());
    const href = $(link).attr("href") || "";
    const url = new URL(href, PCI_BASE).toString();
    const row = $(link).closest("tr");
    const cells = row.find("td").toArray();
    const year = Number(cleanText($(cells[1]).text()).match(/\b(19|20)\d{2}\b/)?.[0] || 0) || "";
    const orgao = cleanText($(cells[2]).text());
    const banca = cleanText($(cells[3]).text());
    const context = cleanText([
      title,
      href,
      row.text() || $(link).parent().text(),
    ].join(" "));

    if (!hasMilitaryContext(context, config)) return;

    const source = parseSource(context, href);
    candidates.push({
      title: title || source.cargo,
      url,
      orgao: orgao || source.orgao,
      banca: banca || source.banca,
      ano: year || source.ano,
      cargo: inferCargoFromUrl(href) || inferCargoFromTitle(title) || source.cargo,
      fonte: sourceUrl,
    });
  });
  return dedupeProofs(candidates);
}

function dedupeProofs(items: ProofCandidate[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeText(`${item.title} ${item.url}`);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function questionToDbRow(question: PciQuestion) {
  const alternatives = Object.fromEntries(question.alternativas.map((item) => [`alternativa_${item.letra.toLowerCase()}`, item.texto]));
  return {
    id: question.id,
    codigo: question.codigo,
    banca: question.banca,
    materia: question.materia,
    topico: question.topico,
    dificuldade: "medio",
    enunciado: question.enunciado,
    alternativa_a: alternatives.alternativa_a || "",
    alternativa_b: alternatives.alternativa_b || "",
    alternativa_c: alternatives.alternativa_c || "",
    alternativa_d: alternatives.alternativa_d || "",
    alternativa_e: alternatives.alternativa_e || "",
    gabarito: question.gabarito,
    comentario: `${question.comentario} Fonte: ${question.fonteUrl}. Status: ${question.statusRevisao}. Categoria: Concursos Militares. Cargo: ${question.cargo}. Ano: ${question.ano || "nao informado"}.`,
    concurso: question.orgao,
  };
}

async function saveToSupabase(questions: PciQuestion[]) {
  const rawUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !serviceKey || !questions.length) return false;

  const endpoint = `${rawUrl.replace(/\/$/, "")}/rest/v1/questoes`;
  const rows = questions.map(questionToDbRow);
  for (let index = 0; index < rows.length; index += 25) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(rows.slice(index, index + 25)),
    });
    if (!response.ok) throw new Error(`Supabase PCI militar upsert falhou: ${response.status} ${await response.text()}`);
  }
  return true;
}

async function extractPdfText(filePathOrUrl: string) {
  const data = /^https?:\/\//i.test(filePathOrUrl)
    ? Buffer.from((await axios.get(filePathOrUrl, { responseType: "arraybuffer", headers: { "User-Agent": USER_AGENT }, timeout: 60_000 })).data)
    : await readFile(path.isAbsolute(filePathOrUrl) ? filePathOrUrl : path.resolve(process.cwd(), filePathOrUrl));
  const parser = new PDFParse({ data });
  try {
    const result = await parser.getText();
    return result.text.replace(/\r/g, "");
  } finally {
    await parser.destroy();
  }
}

function parseManualPdfQuestions(text: string, source: ManualPdfSource) {
  const blocks = text
    .replace(/\r/g, "")
    .split(/\n(?=\s*(?:Quest[aã]o\s*)?\d{1,3}\s*[\).:-])/i)
    .map((block) => cleanText(block))
    .filter((block) => block.length > 80);

  const questions: PciQuestion[] = [];
  blocks.forEach((block, index) => {
    if (!normalizeText(block).includes(normalizeText(source.disciplina))) return;
    const markers = [...block.matchAll(/^([A-E])\s*[\).:-]\s+/gm)].slice(0, 5);
    if (markers.length < 4) return;
    const alternatives = markers.map((marker, altIndex) => {
      const start = (marker.index || 0) + marker[0].length;
      const end = altIndex + 1 < markers.length ? markers[altIndex + 1].index || block.length : block.length;
      return { letra: marker[1].toUpperCase(), texto: cleanText(block.slice(start, end)) };
    });
    const enunciado = cleanText(block.slice(0, markers[0].index || 0));
    if (!enunciado) return;
    const questionBase = {
      orgao: source.orgao,
      cargo: source.cargo,
      ano: source.ano,
      banca: source.banca,
      formato: "multipla_escolha" as const,
      numero: index + 1,
      materia: source.disciplina,
      topico: `${source.disciplina} - ${source.orgao} ${source.ano}`,
      enunciado,
      alternativas: alternatives,
      gabarito: "pendente",
      anulada: false,
      origem: "pci_concursos_manual_pdf",
      banca_selo: source.banca,
      concurso: source.orgao,
      comentario: "Questao extraida de PDF manual. Gabarito pendente de revisao.",
      fonteUrl: source.fonteUrl || source.provaPdf,
      categoria: "Concursos Militares" as const,
      statusRevisao: "pendente_gabarito" as const,
    };
    const id = makeQuestionId(questionBase, `manual-${index + 1}`);
    questions.push({ ...questionBase, id, codigo: id.toUpperCase() });
  });
  return questions;
}

async function processManualSources(config: MinerConfig, report: Report) {
  const questions: PciQuestion[] = [];

  for (const htmlPath of config.manualSources.html || []) {
    try {
      const absolute = path.isAbsolute(htmlPath) ? htmlPath : path.resolve(process.cwd(), htmlPath);
      const html = await readFile(absolute, "utf-8");
      for (const subject of config.allowedSubjects) {
        const parsed = parseSimuladoQuestions(html, subject, absolute, config);
        questions.push(...parsed.questions);
      }
      log(`HTML manual processado: ${htmlPath}`);
    } catch (error) {
      report.erros.push({ etapa: "manual_html", url: htmlPath, erro: error instanceof Error ? error.message : String(error) });
    }
  }

  for (const pdf of config.manualSources.pdfs || []) {
    try {
      const text = await extractPdfText(pdf.provaPdf);
      const parsed = parseManualPdfQuestions(text, pdf);
      questions.push(...parsed);
      log(`PDF manual processado: ${pdf.provaPdf} (${parsed.length} questoes pendentes)`);
    } catch (error) {
      report.erros.push({ etapa: "manual_pdf", url: pdf.provaPdf, erro: error instanceof Error ? error.message : String(error) });
    }
  }

  return questions;
}

async function mergePublicQuestions(publicPath: string, incoming: PciQuestion[]) {
  let existing: unknown[] = [];
  try {
    existing = JSON.parse(await readFile(publicPath, "utf-8"));
  } catch {
    existing = [];
  }

  const byId = new Map<string, unknown>();
  existing.forEach((item: any) => {
    if (item?.id) byId.set(item.id, item);
  });
  incoming.forEach((question) => byId.set(question.id, question));
  const merged = [...byId.values()];
  await writeJson(publicPath, merged);
  return { before: existing.length, after: merged.length, added: merged.length - existing.length };
}

async function writeJson(filePath: string, data: unknown) {
  const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

function emptyReport(mode: string): Report {
  return {
    mode,
    collectedAt: new Date().toISOString(),
    urlsAcessadas: [],
    provasEncontradas: [],
    porDisciplina: {},
    totais: {
      extraidas: 0,
      importaveis: 0,
      pendentesRevisao: 0,
      duplicadas: 0,
      ignoradas: 0,
      importadas: 0,
    },
    erros: [],
    proximosPassos: [],
  };
}

async function main() {
  const config = await readConfig();
  const importMode = isImportMode(config);
  const report = emptyReport(importMode ? "import" : "test");
  const collected: PciQuestion[] = [];

  log(`Modo: ${report.mode}`);
  log(`Config: ${CONFIG_PATH}`);

  for (const subject of config.allowedSubjects) {
    report.porDisciplina[subject.name] = { extraidas: 0, importaveis: 0, pendentes: 0, ignoradas: 0 };
    const regularPages = Array.from({ length: config.pageLimit }, (_, index) => index);
    const hintedPages = config.pageHints?.[subject.id] || [];
    const pages = [...new Set([...regularPages, ...hintedPages])].sort((a, b) => a - b);
    for (const page of pages) {
      if (report.porDisciplina[subject.name].extraidas >= config.questionLimitPerDiscipline) break;
      const url = `${subject.url}${page ? `/${page}` : ""}`;
      try {
        log(`URL acessada: ${url}`);
        report.urlsAcessadas.push(url);
        const html = await fetchHtml(url);
        const parsed = parseSimuladoQuestions(html, subject, url, config);
        collected.push(...parsed.questions);
        report.porDisciplina[subject.name].extraidas += parsed.questions.length;
        report.porDisciplina[subject.name].ignoradas += parsed.ignored;
        report.porDisciplina[subject.name].pendentes += parsed.questions.filter((question) => question.statusRevisao !== "ok").length;
        report.porDisciplina[subject.name].importaveis += parsed.questions.filter((question) => question.statusRevisao === "ok").length;
        log(`${subject.name}: ${parsed.questions.length} candidatas, ${parsed.ignored} ignoradas nesta pagina`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        log(`Erro em ${url}: ${message}`);
        report.erros.push({ etapa: "simulados", url, erro: message });
      }
    }
  }

  for (const url of config.proofDiscoveryUrls) {
    try {
      log(`URL acessada: ${url}`);
      report.urlsAcessadas.push(url);
      report.provasEncontradas.push(...parseProofCandidates(await fetchHtml(url), url, config));
    } catch (error) {
      report.erros.push({ etapa: "provas_categoria", url, erro: error instanceof Error ? error.message : String(error) });
    }
  }

  for (const term of config.proofSearchTerms) {
    try {
      const url = `${PCI_BASE}/provas/?prova=${encodeURIComponent(term)}`;
      log(`URL acessada: ${url}`);
      report.urlsAcessadas.push(url);
      report.provasEncontradas.push(...parseProofCandidates(await postSearch(term), url, config));
    } catch (error) {
      report.erros.push({ etapa: "provas_busca", url: term, erro: error instanceof Error ? error.message : String(error) });
    }
  }

  collected.push(...await processManualSources(config, report));
  report.provasEncontradas = dedupeProofs(report.provasEncontradas).slice(0, 250);

  const deduped = dedupeQuestions(collected);
  const questions = deduped.unique.sort((a, b) => a.materia.localeCompare(b.materia, "pt-BR") || String(a.ano).localeCompare(String(b.ano)) || a.numero - b.numero);
  report.totais.extraidas = collected.length;
  report.totais.duplicadas = deduped.duplicated;
  report.totais.pendentesRevisao = questions.filter((question) => question.statusRevisao !== "ok").length;
  report.totais.importaveis = questions.filter((question) => question.statusRevisao === "ok").length;
  report.totais.ignoradas = Object.values(report.porDisciplina).reduce((sum, item) => sum + item.ignoradas, 0);

  await writeJson(config.output.preview, questions);
  await writeJson(config.output.report, report);
  await writeJson(config.output.publicReport, report);
  await writeJson(config.output.publicManifest, report.provasEncontradas);

  if (importMode) {
    const merge = await mergePublicQuestions(config.output.publicQuestions, questions);
    report.totais.importadas = questions.length;
    await writeJson(config.output.report, report);
    await writeJson(config.output.publicReport, report);
    log(`Importacao local: ${merge.added} novas, total ${merge.after}`);
    const supabaseSaved = await saveToSupabase(questions);
    log(supabaseSaved ? `Questoes salvas no Supabase: ${questions.length}` : "Supabase nao configurado; importacao ficou no JSON local.");
  } else {
    report.proximosPassos.push("Revisar o preview em storage/content/concursos-militares/pci/test-preview.json.");
    report.proximosPassos.push("Aumentar pageLimit no config se a amostra vier pequena.");
    report.proximosPassos.push("Usar npm run miner:pci-militar:import somente depois de validar o relatorio.");
    report.proximosPassos.push("Para PDFs fora dos simulados, preencher manualSources.pdfs no config com prova/gabarito local ou URL.");
    await writeJson(config.output.report, report);
    await writeJson(config.output.publicReport, report);
  }

  log(`Relatorio: ${questions.length} candidatas unicas, ${report.totais.importaveis} com gabarito, ${report.totais.pendentesRevisao} pendentes, ${deduped.duplicated} duplicadas.`);
  log(`Por disciplina: ${Object.entries(report.porDisciplina).map(([name, item]) => `${name}=${item.extraidas}`).join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
