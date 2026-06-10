import "dotenv/config";
import axios from "axios";
import * as cheerio from "cheerio";
import { PDFParse } from "pdf-parse";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import https from "node:https";
import path from "node:path";

type ExamFormat = "multipla_escolha" | "certo_errado";

type ManifestEntry = {
  orgao: string;
  cargo: string;
  ano: number;
  banca: string;
  formato?: ExamFormat;
  totalQuestoes?: number;
  materiaPorNumero?: Array<{ inicio: number; fim: number; materia: string }>;
  importarMaterias?: string[];
  gabaritoTipo?: string;
  aplicadaEm?: string;
  status?: string;
  fonteUrl?: string;
  provaPdf?: string;
  gabaritoPdf?: string;
  observacao?: string;
};

type MilitarQuestion = {
  id: string;
  codigo: string;
  orgao: string;
  cargo: string;
  ano: number;
  banca: string;
  formato: ExamFormat;
  numero: number;
  materia: string;
  materia_original: string;
  dificuldade: string;
  enunciado: string;
  alternativas: Array<{ letra: string; texto: string }>;
  afirmacao?: string;
  gabarito: string;
  anulada: boolean;
  origem: string;
  banca_selo: string;
  concurso: string;
  comentario: string;
};

const SOURCE = "Oficial militar";
const STORAGE_ROOT = path.resolve(process.cwd(), "storage", "content", "militar");
const MANIFEST_PATH = path.resolve(process.cwd(), "scripts", "content-miner", "manifesto-militar.json");
const PUBLIC_QUESTIONS_PATH = path.resolve(process.cwd(), "public", "questoes", "militar.json");
const PUBLIC_MANIFEST_PATH = path.resolve(process.cwd(), "public", "materiais", "militar-manifest.json");
const PUBLIC_REPORT_PATH = path.resolve(process.cwd(), "public", "questoes", "militar-extraction-report.json");
const insecureNupeceAgent = new https.Agent({ rejectUnauthorized: false });
const PUSH_SUPABASE = process.argv.includes("--push-supabase");

function log(message: string) {
  console.log(`[Militar Miner] ${message}`);
}

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function safeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120)
    .toLowerCase();
}

function slugFor(entry: ManifestEntry) {
  return `${safeFileName(entry.orgao)}-${safeFileName(entry.cargo).replace(/-pm-de-2a-classe|-pm-2a-classe/g, "")}-${entry.ano}-${safeFileName(entry.banca)}`;
}

function isRemote(source = "") {
  return /^https?:\/\//i.test(source);
}

function isReady(entry: ManifestEntry) {
  return Boolean(entry.provaPdf && entry.gabaritoPdf && entry.status !== "previsto");
}

async function readManifest() {
  return JSON.parse(await readFile(MANIFEST_PATH, "utf-8")) as ManifestEntry[];
}

async function downloadOrCopy(source: string, targetPath: string) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  if (isRemote(source)) {
    const response = await axios.get(source, {
      responseType: "arraybuffer",
      maxRedirects: 5,
      timeout: 60_000,
      httpsAgent: source.includes("nucepe.uespi.br") ? insecureNupeceAgent : undefined,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AprovaMilitarMiner/1.0)",
        Referer: new URL(source).origin,
      },
    });
    const contentType = String(response.headers["content-type"] || "");
    const buffer = Buffer.from(response.data);
    if (contentType.includes("pdf") || buffer.subarray(0, 4).toString() === "%PDF") {
      await writeFile(targetPath, buffer);
      return;
    }

    if (contentType.includes("html")) {
      const $ = cheerio.load(buffer.toString("utf-8"));
      const candidate = $("a")
        .toArray()
        .map((node) => ({
          href: $(node).attr("href") || "",
          text: normalizeText($(node).text()),
        }))
        .find((link) => /\.pdf(?:\?|$)/i.test(link.href) && /(prova|gabarito|caderno)/i.test(link.href + " " + link.text));
      if (candidate?.href) {
        const resolved = new URL(candidate.href, source).toString();
        await downloadOrCopy(resolved, targetPath);
        return;
      }
    }

    throw new Error(`fonte nao retornou PDF valido: ${source}`);
  }
  const localPath = path.isAbsolute(source) ? source : path.resolve(process.cwd(), source);
  const buffer = await readFile(localPath);
  if (buffer.subarray(0, 4).toString() !== "%PDF") throw new Error(`arquivo local nao e PDF: ${source}`);
  await writeFile(targetPath, buffer);
}

async function extractPdfText(filePath: string) {
  const parser = new PDFParse({ data: await readFile(filePath) });
  try {
    const result = await parser.getText();
    return result.text.replace(/\r/g, "");
  } finally {
    await parser.destroy();
  }
}

function parseAnswers(text: string, total = 0) {
  const map = new Map<number, string>();
  const lines = text.split(/\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  const answerToken = /^(?:A|B|C|D|E|X|\*|Anulada|Certo|Errado)$/i;

  for (let index = 0; index < lines.length; index += 1) {
    const numbers = (lines[index].match(/\b\d{1,3}\b/g) || []).map(Number).filter((number) => number > 0 && (!total || number <= total));
    if (numbers.length < 5) continue;

    const answerWords: string[] = [];
    for (let next = index + 1; next < Math.min(lines.length, index + 4) && answerWords.length < numbers.length; next += 1) {
      const words = lines[next].split(/\s+/).filter((word) => answerToken.test(word));
      if (words.length >= 3) answerWords.push(...words);
    }
    if (answerWords.length < Math.min(numbers.length, 5)) continue;

    numbers.forEach((number, numberIndex) => {
      const answer = normalizeAnswer(answerWords[numberIndex]);
      if (answer) map.set(number, answer);
    });
  }

  const normalized = text.replace(/\s+/g, " ");
  const pairRegex = /\b0?(\d{1,3})\s*(?:[-\u2012\u2013\u2014.:]|\s)\s*(A|B|C|D|E|Certo|Errado|Anulada|X|\*)\b/gi;
  for (const match of normalized.matchAll(pairRegex)) {
    const number = Number(match[1]);
    if (!number || (total && number > total)) continue;
    const answer = normalizeAnswer(match[2]);
    if (answer) map.set(number, answer);
  }

  const tableRegex = /\b0?(\d{1,3})\b\s+(A|B|C|D|E|X|\*|Nula|Anulada)\b/gi;
  for (const match of normalized.matchAll(tableRegex)) {
    const number = Number(match[1]);
    if (!number || (total && number > total)) continue;
    const answer = normalizeAnswer(match[2]);
    if (answer) map.set(number, answer);
  }

  if (map.size >= Math.min(total || 20, 20)) return map;

  const compact = normalized.match(/\b[A-E*X]\b/g) || [];
  compact.slice(0, total || compact.length).forEach((answer, index) => {
    const normalizedAnswer = normalizeAnswer(answer);
    if (normalizedAnswer) map.set(index + 1, normalizedAnswer);
  });
  return map;
}

function normalizeAnswer(value = "") {
  const raw = normalizeText(value);
  if (!raw) return "";
  if (raw === "*" || raw === "x" || raw.includes("anulada") || raw.includes("nula")) return "anulada";
  if (raw.startsWith("certo")) return "c";
  if (raw.startsWith("errado")) return "e";
  return raw[0];
}

function cleanText(value = "") {
  return value
    .replace(/\s*RASCUNHO[\s\S]*$/i, "")
    .replace(/\s*Transcreva[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanCebraspeStatement(value = "") {
  let text = cleanText(value)
    .replace(/\s*Espaço\s+Livre[\s\S]*$/i, "")
    .replace(/\s*\|\|[A-Z0-9_]+[^|]*\|\|[\s\S]*$/i, "");

  const trailingPromptPatterns = [
    /\s+(?:A respeito|Acerca|Com relação|Considerando|Tendo como referência|No que se refere|Em relação|À luz|Julgue)\b[\s\S]*?\bjulgue\b[\s\S]*$/i,
    /\s+Texto\s+[A-Z0-9]+[\s\S]*$/i,
    /\s+CONHECIMENTOS\s+(?:BÁSICOS|ESPECÍFICOS)[\s\S]*$/i,
  ];

  for (const pattern of trailingPromptPatterns) {
    const match = text.match(pattern);
    if (match && match.index && match.index > 40) {
      text = text.slice(0, match.index).trim();
    }
  }

  return text;
}

function splitQuestionBlocks(text: string) {
  const lines = text.split(/\n/).map((line) => line.trim()).filter(Boolean);
  const blocks: Array<{ number: number; body: string }> = [];
  let current: { number: number; lines: string[] } | null = null;

  for (const line of lines) {
    if (/^-- .* --$/.test(line) || /^Página \d+/i.test(line)) continue;
    const marker = line.match(/^(?:Quest[aã]o\s*)?0?([1-9]\d?|1[0-4]\d|150)\s*(?:[.)-])?$/i);
    if (marker) {
      if (current) blocks.push({ number: current.number, body: current.lines.join("\n") });
      current = { number: Number(marker[1]), lines: [] };
      continue;
    }
    const inline = line.match(/^(?:Quest[aã]o\s*)?0?([1-9]\d?|1[0-4]\d|150)\s*[.)]?\s+(.{10,})$/i);
    if (inline && !/[A-E]\)/.test(line.slice(0, 8))) {
      if (current) blocks.push({ number: current.number, body: current.lines.join("\n") });
      current = { number: Number(inline[1]), lines: [inline[2]] };
      continue;
    }
    if (current) current.lines.push(line);
  }

  if (current) blocks.push({ number: current.number, body: current.lines.join("\n") });
  return blocks;
}

function detectMatter(text: string, fallback: string) {
  const normalized = normalizeText(text);
  if (normalized.includes("lingua portuguesa") || normalized.includes("portugues")) return "Portugues";
  if (normalized.includes("matematica") || normalized.includes("raciocinio logico")) return "Matematica e Raciocinio Logico";
  if (normalized.includes("informatica")) return "Informatica";
  if (normalized.includes("constitucional")) return "Direito Constitucional";
  if (normalized.includes("administrativo")) return "Direito Administrativo";
  if (normalized.includes("penal")) return "Direito Penal";
  if (normalized.includes("direitos humanos")) return "Direitos Humanos";
  if (normalized.includes("atualidades")) return "Atualidades";
  return fallback;
}

function matterForQuestion(entry: ManifestEntry, numero: number, fallback: string) {
  const range = entry.materiaPorNumero?.find((item) => numero >= item.inicio && numero <= item.fim);
  return range?.materia || fallback;
}

function shouldImportQuestion(entry: ManifestEntry, materia: string) {
  if (!entry.importarMaterias?.length) return true;
  const current = normalizeText(materia);
  return entry.importarMaterias.some((item) => current === normalizeText(item));
}

function difficultyForQuestion(materia: string, text: string) {
  const normalizedMatter = normalizeText(materia);
  const normalizedText = normalizeText(text);
  if (normalizedMatter.includes("raciocinio") && /(proposicional|equivalent|negacao|argument|silog|sentenca|conectivo|tabela verdade|condicional)/.test(normalizedText)) return "dificil";
  if (normalizedMatter.includes("matematica") && /(probabilidade|combinatoria|combinacao|arranjo|permutacao|juros compostos|estatistica|desvio|progressao|pa|pg)/.test(normalizedText)) return "dificil";
  return "medio";
}

function sliceAnswerType(text: string, typeLabel: string) {
  const normalizedLabel = normalizeText(typeLabel);
  const lines = text.split("\n");
  const start = lines.findIndex((line) => normalizeText(line).includes(normalizedLabel));
  if (start < 0) return text;
  const end = lines.findIndex((line, index) => index > start && /tipo\s+\d+/i.test(normalizeText(line)));
  return lines.slice(start, end > start ? end : undefined).join("\n");
}

function detectFormat(entry: ManifestEntry, proofText: string): ExamFormat {
  if (entry.formato) return entry.formato;
  const normalized = normalizeText(proofText.slice(0, 10_000));
  if (normalized.includes("julgue") && normalized.includes("certo") && normalized.includes("errado")) return "certo_errado";
  return "multipla_escolha";
}

function extractMultipleChoice(entry: ManifestEntry, proofText: string, answers: Map<number, string>, format: ExamFormat) {
  const questions: MilitarQuestion[] = [];
  const blocks = splitQuestionBlocks(proofText);
  const seen = new Set<number>();
  let currentMatter = "Conhecimentos Gerais";

  for (const block of blocks) {
    if (seen.has(block.number)) continue;
    const answer = answers.get(block.number);
    if (!answer || answer === "anulada") continue;
    currentMatter = matterForQuestion(entry, block.number, detectMatter(block.body.slice(0, 350), currentMatter));
    if (!shouldImportQuestion(entry, currentMatter)) continue;

    if (format === "certo_errado") {
      const statement = cleanCebraspeStatement(block.body);
      if (!statement || !["c", "e"].includes(answer)) continue;
      seen.add(block.number);
      questions.push(makeQuestion(entry, block.number, currentMatter, statement, [], statement, answer, format));
      continue;
    }

    const markers = [...block.body.matchAll(/(?:^|\n|\s)(?:\(([A-Ea-e])\)|([A-Ea-e])[\).]|([A-Ea-e])\s*[-\u2012\u2013\u2014])\s+/g)];
    const optionMarkers = markers.filter((marker, index, list) => {
      const letter = (marker[1] || marker[2] || marker[3] || "").toLowerCase();
      return letter && list.findIndex((item) => (item[1] || item[2] || item[3] || "").toLowerCase() === letter) === index;
    }).slice(0, 5);
    if (optionMarkers.length < 4 || !["a", "b", "c", "d", "e"].includes(answer)) continue;

    const alternatives = optionMarkers.map((marker, index) => {
      const letra = (marker[1] || marker[2] || marker[3] || "ABCDE"[index]).toUpperCase();
      const start = (marker.index || 0) + marker[0].length;
      const end = index + 1 < optionMarkers.length ? optionMarkers[index + 1].index || block.body.length : block.body.length;
      return { letra, texto: cleanText(block.body.slice(start, end)) };
    }).filter((item) => item.texto);

    if (alternatives.length < 4) continue;
    const first = optionMarkers[0].index || 0;
    const enunciado = cleanText(block.body.slice(0, first));
    if (!enunciado) continue;

    seen.add(block.number);
    questions.push(makeQuestion(entry, block.number, currentMatter, enunciado, alternatives, "", answer, format));
  }

  return questions;
}

function makeQuestion(entry: ManifestEntry, numero: number, materia: string, enunciado: string, alternativas: Array<{ letra: string; texto: string }>, afirmacao: string, gabarito: string, formato: ExamFormat): MilitarQuestion {
  const slug = slugFor(entry);
  const code = `${slug}-q${String(numero).padStart(2, "0")}`;
  return {
    id: code,
    codigo: code.toUpperCase(),
    orgao: entry.orgao,
    cargo: entry.cargo,
    ano: entry.ano,
    banca: entry.banca,
    formato,
    numero,
    materia,
    materia_original: materia,
    dificuldade: difficultyForQuestion(materia, `${enunciado} ${afirmacao || ""}`),
    enunciado,
    alternativas,
    afirmacao,
    gabarito,
    anulada: false,
    origem: "oficial",
    banca_selo: entry.banca,
    concurso: entry.orgao,
    comentario: `Questao oficial ${entry.orgao} ${entry.cargo} ${entry.ano}. Banca: ${entry.banca}. Gabarito definitivo: ${gabarito.toUpperCase()}.`,
  };
}

function toDbRow(question: MilitarQuestion) {
  const alternatives = Object.fromEntries(question.alternativas.map((item) => [`alternativa_${item.letra.toLowerCase()}`, item.texto]));
  return {
    id: question.id,
    codigo: question.codigo,
    banca: question.banca,
    materia: question.materia,
    topico: `${question.orgao} ${question.cargo} ${question.ano} - Q${question.numero}`,
    dificuldade: question.dificuldade,
    enunciado: question.enunciado || question.afirmacao || "",
    alternativa_a: alternatives.alternativa_a || (question.formato === "certo_errado" ? "Certo" : ""),
    alternativa_b: alternatives.alternativa_b || (question.formato === "certo_errado" ? "Errado" : ""),
    alternativa_c: alternatives.alternativa_c || "",
    alternativa_d: alternatives.alternativa_d || "",
    alternativa_e: alternatives.alternativa_e || "",
    gabarito: question.formato === "certo_errado" ? (question.gabarito === "c" ? "a" : "b") : question.gabarito,
    comentario: `${question.comentario} Origem: ${question.origem}. Materia original: ${question.materia_original}. Cargo: ${question.cargo}. Ano: ${question.ano}.`,
    concurso: question.orgao,
  };
}

async function saveToSupabase(questions: MilitarQuestion[]) {
  const rawUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !serviceKey || !questions.length) return false;
  const endpoint = `${rawUrl.replace(/\/$/, "")}/rest/v1/questoes`;
  const rows = questions.map(toDbRow);
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
    if (!response.ok) throw new Error(`Supabase militar upsert falhou: ${response.status} ${await response.text()}`);
  }
  return true;
}

async function processEntry(entry: ManifestEntry) {
  const slug = slugFor(entry);
  const root = path.join(STORAGE_ROOT, slug);
  const report = { slug, orgao: entry.orgao, cargo: entry.cargo, ano: entry.ano, banca: entry.banca, status: entry.status || "ativo", extraidas: 0, validas: 0, anuladas: 0, descartadas: 0, motivo: "" };

  if (!isReady(entry)) {
    report.motivo = entry.status === "previsto" ? "concurso previsto" : "prova/gabarito definitivo ausente no manifesto";
    log(`Ignorado: ${slug} (${report.motivo})`);
    return { questions: [] as MilitarQuestion[], material: null, report };
  }

  const proofPath = path.join(root, "provas", `${slug}-prova.pdf`);
  const answerPath = path.join(root, "gabaritos", `${slug}-gabarito-definitivo.pdf`);
  await downloadOrCopy(entry.provaPdf || "", proofPath);
  await downloadOrCopy(entry.gabaritoPdf || "", answerPath);

  const [proofText, rawAnswerText] = await Promise.all([extractPdfText(proofPath), extractPdfText(answerPath)]);
  const answerText = entry.gabaritoTipo ? sliceAnswerType(rawAnswerText, entry.gabaritoTipo) : rawAnswerText;
  const format = detectFormat(entry, proofText);
  const answers = parseAnswers(answerText, entry.totalQuestoes || 0);
  const questions = extractMultipleChoice(entry, proofText, answers, format);
  const anuladas = [...answers.values()].filter((item) => item === "anulada").length;
  report.extraidas = questions.length + anuladas;
  report.validas = questions.length;
  report.anuladas = anuladas;
  report.descartadas = Math.max((entry.totalQuestoes || answers.size || questions.length) - questions.length - anuladas, 0);
  report.motivo = questions.length ? "ok" : "nenhuma questao validada";

  await mkdir(path.join(root, "questoes"), { recursive: true });
  await writeFile(path.join(root, "questoes", "questoes-extraidas.json"), JSON.stringify(questions, null, 2), "utf-8");
  const metadata = {
    exame: `${entry.orgao} ${entry.cargo} ${entry.ano}`,
    banca: entry.banca,
    ano: entry.ano,
    aplicada_em: entry.aplicadaEm || null,
    cargo: entry.cargo,
    total_questoes: entry.totalQuestoes || questions.length,
    fonte: SOURCE,
    sourceUrl: entry.fonteUrl || entry.provaPdf,
    gabarito: "definitivo",
    origem: "oficial",
    files: [
      { title: "Prova oficial", type: "prova", url: entry.provaPdf, path: proofPath.replace(process.cwd() + path.sep, "").replace(/\\/g, "/") },
      { title: "Gabarito definitivo", type: "gabarito", url: entry.gabaritoPdf, path: answerPath.replace(process.cwd() + path.sep, "").replace(/\\/g, "/") },
    ],
  };
  await writeFile(path.join(root, "metadata.json"), JSON.stringify(metadata, null, 2), "utf-8");
  log(`${slug}: ${questions.length} questoes validas`);

  return {
    questions,
    material: {
      id: slug,
      titulo: `${entry.orgao} ${entry.cargo} ${entry.ano}`,
      tipo: "Prova militar oficial",
      categoria: format === "certo_errado" ? "Certo/Errado" : "Multipla escolha",
      orgao: entry.orgao,
      cargo: entry.cargo,
      ano: entry.ano,
      banca: entry.banca,
      slug,
      sourcePath: `storage/content/militar/${slug}`,
    },
    report,
  };
}

async function main() {
  const manifest = await readManifest();
  const results = [];
  for (const entry of manifest) {
    try {
      results.push(await processEntry(entry));
    } catch (error) {
      const slug = slugFor(entry);
      const message = error instanceof Error ? error.message : String(error);
      log(`Erro em ${slug}: ${message}`);
      results.push({
        questions: [] as MilitarQuestion[],
        material: null,
        report: {
          slug,
          orgao: entry.orgao,
          cargo: entry.cargo,
          ano: entry.ano,
          banca: entry.banca,
          status: "erro",
          extraidas: 0,
          validas: 0,
          anuladas: 0,
          descartadas: entry.totalQuestoes || 0,
          motivo: message,
        },
      });
    }
  }

  const byId = new Map<string, MilitarQuestion>();
  results.flatMap((item) => item.questions).forEach((question) => byId.set(question.id, question));
  const questions = [...byId.values()].sort((a, b) => a.orgao.localeCompare(b.orgao) || a.ano - b.ano || a.numero - b.numero);
  const materials = results.map((item) => item.material).filter(Boolean);
  const report = results.map((item) => item.report);

  await mkdir(path.dirname(PUBLIC_QUESTIONS_PATH), { recursive: true });
  await mkdir(path.dirname(PUBLIC_MANIFEST_PATH), { recursive: true });
  await writeFile(PUBLIC_QUESTIONS_PATH, JSON.stringify(questions, null, 2), "utf-8");
  await writeFile(PUBLIC_MANIFEST_PATH, JSON.stringify(materials, null, 2), "utf-8");
  await writeFile(PUBLIC_REPORT_PATH, JSON.stringify(report, null, 2), "utf-8");

  if (questions.length && PUSH_SUPABASE) {
    await saveToSupabase(questions);
    log(`Questoes salvas no Supabase: ${questions.length}`);
  } else if (questions.length) {
    log("Supabase nao atualizado. Use --push-supabase para fazer upsert explicitamente.");
  }

  const totalValidas = report.reduce((sum, item) => sum + item.validas, 0);
  const totalAnuladas = report.reduce((sum, item) => sum + item.anuladas, 0);
  const totalDescartadas = report.reduce((sum, item) => sum + item.descartadas, 0);
  const byMatter = questions.reduce((acc, question) => {
    acc.set(question.materia, (acc.get(question.materia) || 0) + 1);
    return acc;
  }, new Map<string, number>());
  log(`Relatorio: ${totalValidas} validas, ${totalAnuladas} anuladas, ${totalDescartadas} descartadas`);
  log(`Contagem por materia: ${[...byMatter.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([materia, count]) => `${materia}: ${count}`).join("; ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
