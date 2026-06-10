import "dotenv/config";
import axios, { type AxiosInstance } from "axios";
import * as cheerio from "cheerio";
import { PDFParse } from "pdf-parse";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const SOURCE = "FGV/OAB";
const OAB_HOME = "https://oab.fgv.br/";
const REQUIRED_EXAM_URL = "https://oab.fgv.br/home.aspx?key=650";
const DEFAULT_SECCIONAL = process.env.OAB_MINER_SECCIONAL || "5124";
const EXAM_LIMIT = Number(process.env.OAB_MINER_EXAM_LIMIT || 0);
const REPROCESS_ONLY = process.env.OAB_MINER_REPROCESS_ONLY === "1";
const STORAGE_ROOT = path.resolve(process.cwd(), "storage", "content", "oab");

const IGNORE_TERMS = [
  "resultado",
  "resultado definitivo",
  "resultado preliminar",
  "apos recursos",
  "após recursos",
  "relação de aprovados",
  "relacao de aprovados",
  "lista de aprovados",
  "comunicado",
  "retificação",
  "retificacao",
  "edital",
  "inscrição",
  "inscricao",
  "locais de prova",
  "convocação",
  "convocacao",
  "recurso",
  "decisão de recurso",
  "decisao de recurso",
  "homologação",
  "homologacao",
];

const ALLOW_TERMS = [
  "prova",
  "caderno de prova",
  "prova objetiva",
  "prova prático-profissional",
  "prova pratico-profissional",
  "gabarito",
  "gabarito preliminar",
  "gabarito definitivo",
  "padrão de resposta",
  "padrao de resposta",
  "espelho de correção",
  "espelho de correcao",
  "redação",
  "redacao",
  "peça",
  "peca",
  "questões",
  "questoes",
];

type ContentType = "prova" | "gabarito" | "segunda-fase";

type Exam = {
  key: string;
  title: string;
  url: string;
  slug: string;
  order: number;
};

type CandidateFile = {
  title: string;
  url: string;
  type: ContentType;
  relativePath: string;
  absolutePath: string;
};

type PublicMaterial = {
  id: string;
  titulo: string;
  tipo: string;
  categoria: string;
  materia: string;
  descricao: string;
  url: string;
  arquivo: string;
  source: string;
  sourcePath: string;
};

type PublicExam = {
  slug: string;
  title: string;
  label: string;
  sourceUrl: string;
  order: number;
  materialCount: number;
};

type ExtractedQuestion = {
  id: string;
  codigo: string;
  banca: string;
  materia: string;
  topico: string;
  dificuldade: string;
  enunciado: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  alternativa_e?: string;
  gabarito: string;
  comentario: string;
  concurso: string;
};

function log(message: string) {
  console.log(`[OAB Miner] ${message}`);
}

function normalizeText(value: string) {
  return value
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
    .slice(0, 140)
    .toLowerCase();
}

function shortHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36).slice(0, 6);
}

function romanToNumber(value: string) {
  const roman = value.toUpperCase();
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 };
  let total = 0;
  for (let index = 0; index < roman.length; index += 1) {
    const current = map[roman[index]] || 0;
    const next = map[roman[index + 1]] || 0;
    total += current < next ? -current : current;
  }
  return total;
}

function extractExamNumber(title: string) {
  const normalized = title.replace(/Â/g, "");
  const numeric = normalized.match(/\b(\d{1,2})\s*(?:º|o|°)?\s*EXAME/i);
  if (numeric) return Number(numeric[1]);

  const roman = normalized.match(/\b([XLIVC]+)\s+EXAME/i);
  if (roman) return romanToNumber(roman[1]);

  return 0;
}

function extractYearEdition(title: string) {
  const match = title.match(/\b(20\d{2})\.(\d)\b/);
  return match ? `${match[1]}-${match[2]}` : "";
}

function cleanExamTitle(title: string, key: string) {
  const normalized = title.replace(/\s+/g, " ").trim();
  const number = extractExamNumber(normalized);
  if (number) return `${number}º Exame de Ordem Unificado`;

  const yearEdition = extractYearEdition(normalized);
  if (yearEdition) return `Exame de Ordem Unificado ${yearEdition.replace("-", ".")}`;

  return `${key} Exame de Ordem Unificado`;
}

function examOrder(title: string, key: string) {
  const number = extractExamNumber(title);
  if (number) return number;
  const yearEdition = extractYearEdition(title);
  if (yearEdition) return Number(`0.${yearEdition.split("-")[1] || "0"}`);
  return Number(key) || 0;
}

function examSlug(title: string, key: string) {
  const number = extractExamNumber(title);
  if (number) return `${number}-exame`;

  const yearEdition = extractYearEdition(title);
  if (yearEdition) return `${yearEdition}-exame`;

  return `${key}-exame`;
}

function shouldDownload(title: string) {
  const normalized = normalizeText(title);
  const ignored = IGNORE_TERMS.find((term) => normalized.includes(normalizeText(term)));
  if (ignored) return { allowed: false, reason: ignored };

  const allowed = ALLOW_TERMS.find((term) => normalized.includes(normalizeText(term)));
  return { allowed: Boolean(allowed), reason: allowed || "sem termo permitido" };
}

function classify(title: string): ContentType {
  const normalized = normalizeText(title);
  if (normalized.includes("gabarito")) return "gabarito";
  if (
    normalized.includes("pratico-profissional") ||
    normalized.includes("padrao de resposta") ||
    normalized.includes("peca") ||
    normalized.includes("espelho") ||
    normalized.includes("redacao")
  ) {
    return "segunda-fase";
  }
  return "prova";
}

function folderForType(type: ContentType) {
  if (type === "gabarito") return "gabaritos";
  if (type === "segunda-fase") return "segunda-fase";
  return "provas";
}

function questionSubject(questionNumber: number) {
  if (questionNumber <= 8) return "Etica Profissional";
  if (questionNumber <= 10) return "Filosofia do Direito";
  if (questionNumber <= 16) return "Direito Constitucional";
  if (questionNumber <= 22) return "Direito Administrativo";
  if (questionNumber <= 28) return "Direito Civil";
  if (questionNumber <= 34) return "Processo Civil";
  if (questionNumber <= 40) return "Direito Penal";
  if (questionNumber <= 46) return "Processo Penal";
  if (questionNumber <= 51) return "Direito do Trabalho";
  if (questionNumber <= 56) return "Processo do Trabalho";
  if (questionNumber <= 60) return "Direito Tributario";
  if (questionNumber <= 62) return "Direito Empresarial";
  if (questionNumber <= 64) return "Direitos Humanos";
  if (questionNumber <= 66) return "Direito Internacional";
  if (questionNumber <= 68) return "Direito Ambiental";
  if (questionNumber <= 70) return "ECA";
  if (questionNumber <= 72) return "Direito do Consumidor";
  if (questionNumber <= 74) return "Direito Eleitoral";
  if (questionNumber <= 76) return "Direito Financeiro";
  if (questionNumber <= 78) return "Direito Digital";
  return "Direito Previdenciario";
}

function isPdfUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

function isOfficialFileUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "oab.fgv.br" || parsed.hostname.endsWith(".fgv.br") || parsed.hostname.endsWith(".cloudfront.net");
  } catch {
    return false;
  }
}

function createClient() {
  return axios.create({
    maxRedirects: 5,
    timeout: 45_000,
    headers: {
      "User-Agent": "AprovaContentMiner/1.0 (+https://aprovamais.local)",
      Accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
    },
  });
}

async function discoverExams(client: AxiosInstance): Promise<Exam[]> {
  const response = await client.get<string>(OAB_HOME, { responseType: "text" });
  const $ = cheerio.load(response.data);
  const byKey = new Map<string, Exam>();

  $("a[href*='home.aspx?key=']").each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;
    const url = new URL(href, OAB_HOME).toString();
    const key = new URL(url).searchParams.get("key");
    if (!key) return;
    const rawTitle = $(element).text().replace(/\s+/g, " ").trim() || `${key} Exame de Ordem Unificado`;
    const title = cleanExamTitle(rawTitle, key);
    byKey.set(key, { key, title, url, slug: examSlug(rawTitle, key), order: examOrder(rawTitle, key) });
  });

  const requiredKey = new URL(REQUIRED_EXAM_URL).searchParams.get("key") || "650";
  if (!byKey.has(requiredKey)) {
    byKey.set(requiredKey, {
      key: requiredKey,
      title: "47º Exame de Ordem Unificado",
      url: REQUIRED_EXAM_URL,
      slug: "47-exame",
      order: 47,
    });
  }

  return [...byKey.values()].sort((a, b) => b.order - a.order || Number(b.key) - Number(a.key));
}

function collectHiddenFields($: cheerio.CheerioAPI) {
  const form = new URLSearchParams();
  $("input[type='hidden']").each((_, element) => {
    const name = $(element).attr("name");
    if (!name) return;
    form.set(name, $(element).attr("value") || "");
  });
  return form;
}

async function openExamFilesPage(client: AxiosInstance, exam: Exam) {
  const response = await client.get<string>(exam.url, { responseType: "text" });
  const $ = cheerio.load(response.data);
  const select = $("select").first();
  const selectName = select.attr("name");

  if (!selectName) return response.data;

  const defaultOption =
    select.find(`option[value='${DEFAULT_SECCIONAL}']`).attr("value") ||
    select.find("option").filter((_, option) => ($(option).attr("value") || "") !== "-1").first().attr("value");

  if (!defaultOption) return response.data;

  const form = collectHiddenFields($);
  form.set(selectName, defaultOption);

  const posted = await client.post<string>(exam.url, form.toString(), {
    responseType: "text",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: exam.url,
    },
  });

  return posted.data;
}

function collectPdfCandidates(html: string, exam: Exam): CandidateFile[] {
  const $ = cheerio.load(html);
  const files = new Map<string, CandidateFile>();

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;
    const url = new URL(href, exam.url).toString();
    if (!isPdfUrl(url) || !isOfficialFileUrl(url)) return;

    const title = $(element).text().replace(/\s+/g, " ").trim() || decodeURIComponent(path.basename(new URL(url).pathname));
    const filter = shouldDownload(title);
    if (!filter.allowed) {
      log(`Ignorado: ${title} (${filter.reason})`);
      return;
    }

    const type = classify(title);
    const folder = folderForType(type);
    const baseName = safeFileName(title) || safeFileName(path.basename(new URL(url).pathname)) || "arquivo";
    const fileName = `${baseName}-${shortHash(url)}.pdf`;
    const relativePath = path.join("storage", "content", "oab", exam.slug, folder, fileName).replace(/\\/g, "/");
    const absolutePath = path.resolve(process.cwd(), relativePath);

    files.set(url, { title, url, type, relativePath, absolutePath });
  });

  return [...files.values()];
}

async function downloadFile(client: AxiosInstance, file: CandidateFile) {
  await mkdir(path.dirname(file.absolutePath), { recursive: true });
  log(`Baixando: ${file.title}`);
  const response = await client.get(file.url, { responseType: "stream" });
  await pipeline(response.data, createWriteStream(file.absolutePath));
  log(`Salvo em: ${path.dirname(file.relativePath)}/`);
}

async function saveMetadata(exam: Exam, files: CandidateFile[]) {
  const metadataPath = path.join(STORAGE_ROOT, exam.slug, "metadata.json");
  await mkdir(path.dirname(metadataPath), { recursive: true });

  const metadata = {
    exam: exam.title,
    source: SOURCE,
    sourceUrl: exam.url,
    collectedAt: new Date().toISOString(),
    files: files.map((file) => ({
      title: file.title,
      type: file.type,
      url: file.url,
      path: file.relativePath,
    })),
  };

  await writeFile(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");
}

async function loadDownloadedFiles(exam: Exam): Promise<CandidateFile[]> {
  const metadataPath = path.join(STORAGE_ROOT, exam.slug, "metadata.json");
  try {
    const metadata = JSON.parse(await readFile(metadataPath, "utf-8")) as { files?: Array<{ title: string; type: ContentType; url: string; path: string }> };
    return (metadata.files || []).map((file) => ({
      title: file.title,
      type: file.type,
      url: file.url,
      relativePath: file.path,
      absolutePath: path.resolve(process.cwd(), file.path),
    }));
  } catch {
    return [];
  }
}

async function extractPdfText(filePath: string) {
  const parser = new PDFParse({ data: await readFile(filePath) });
  try {
    const result = await parser.getText();
    return shouldDecodeFgvObfuscatedText(filePath) ? decodeFgvObfuscatedText(result.text) : result.text;
  } finally {
    await parser.destroy();
  }
}

function shouldDecodeFgvObfuscatedText(filePath: string) {
  const normalized = filePath.replace(/\\/g, "/");
  return normalized.includes("/42-exame/");
}

function decodeFgvObfuscatedText(text: string) {
  const sample = text.slice(0, 20_000);
  const obfuscated = [...sample].filter((char) => OBFUSCATED_FGV_MARKERS.has(char.codePointAt(0) || 0)).length;
  if (obfuscated < 200) return text;

  return [...text].map((char) => OBFUSCATED_FGV_MAP[char.codePointAt(0) || 0] || char).join("");
}

const OBFUSCATED_FGV_MARKERS = new Set([
  0x0102,
  0x011a,
  0x011e,
  0x0175,
  0x017d,
  0x0190,
  0x01b5,
  0x03ed,
  0x037e,
  0x037f,
]);

const OBFUSCATED_FGV_MAP: Record<number, string> = {
  0x0003: " ",
  0x0004: "A",
  0x0011: "B",
  0x0012: "C",
  0x0018: "D",
  0x0019: "E",
  0x0026: "F",
  0x0027: "G",
  0x002f: "I",
  0x003e: "L",
  0x0044: "M",
  0x0045: "N",
  0x004b: "O",
  0x0057: "P",
  0x0059: "Q",
  0x005a: "R",
  0x005e: "S",
  0x0064: "T",
  0x0068: "U",
  0x0073: "V",
  0x0102: "a",
  0x0104: "a",
  0x0106: "a",
  0x0108: "a",
  0x0110: "c",
  0x0115: "c",
  0x011a: "d",
  0x011e: "e",
  0x0120: "e",
  0x0121: "e",
  0x0128: "f",
  0x0150: "g",
  0x015a: "h",
  0x015d: "i",
  0x015f: "i",
  0x0169: "j",
  0x016c: "k",
  0x016f: "l",
  0x0175: "m",
  0x0176: "n",
  0x017d: "o",
  0x017f: "o",
  0x0181: "o",
  0x0189: "p",
  0x018b: "q",
  0x018c: "r",
  0x0190: "s",
  0x019a: "t",
  0x01b5: "u",
  0x01b7: "u",
  0x01c0: "v",
  0x01c1: "w",
  0x01c6: "x",
  0x01c7: "y",
  0x01cc: "z",
  0x035e: "\"",
  0x035f: "\"",
  0x036c: "/",
  0x0372: "-",
  0x0374: "-",
  0x037e: "(",
  0x037f: ")",
  0x03ec: "0",
  0x03ed: "1",
  0x03ee: "2",
  0x03ef: "3",
  0x03f0: "4",
  0x03f1: "5",
  0x03f2: "6",
  0x03f3: "7",
  0x03f4: "8",
  0x03f5: "9",
};

function isReadableQuestionText(text: string) {
  const sample = text.slice(0, 30_000);
  const latin = (sample.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  const corrupted = (sample.match(/[\u0370-\u03ff\u0400-\u052f]/g) || []).length;
  return latin > 3000 && corrupted / Math.max(latin, 1) < 0.45;
}

function parseTipo1Answers(text: string) {
  const candidates = [
    ...text.matchAll(/(?:PROVA\s+TIPO|TIPO)\s*0?1[\s\S]*?(?=(?:PROVA\s+TIPO|TIPO)\s*0?2|--\s*1\s+of|TABELA DE CORRESPONDÊNCIA)/gi),
    ...text.matchAll(/PROVA\s+0?1\b[\s\S]*?(?=PROVA\s+0?2\b|--\s*1\s+of|TABELA DE CORRESPONDÊNCIA)/gi),
    ...text.matchAll(/CADERNO DE PROVA(?:\s*n[ºo.]?)?\s*0?1[\s\S]*?(?=CADERNO DE PROVA(?:\s*n[ºo.]?)?\s*0?2|TABELA DE CORRESPONDENCIA|TABELA DE CORRESPONDÊNCIA|$)/gi),
  ].map((match) => match[0]);
  const section = candidates.find((candidate) => {
    const pairs = [...candidate.matchAll(/\b0?(\d{1,3})\s*[-\u2012\u2013\u2014]\s*([A-D]|\*)\b/g)];
    const tokens = candidate.match(/\b[A-D]\b|\*/g) || [];
    return pairs.length >= 80 || tokens.length >= 80;
  }) || "";
  const numberedPairs = [...section.matchAll(/\b0?(\d{1,3})\s*[-\u2012\u2013\u2014]\s*([A-D]|\*)/g)];
  if (numberedPairs.length >= 80) {
    const map = new Map<number, string>();
    numberedPairs.slice(0, 100).forEach((match) => {
      map.set(Number(match[1]), match[2] === "*" ? "anulada" : match[2].toLowerCase());
    });
    return map;
  }
  const answers = section.match(/\b[A-D]\b|\*/g) || [];
  const map = new Map<number, string>();
  answers.slice(0, 100).forEach((answer, index) => map.set(index + 1, answer === "*" ? "anulada" : answer.toLowerCase()));
  return map;
}

function cleanQuestionText(value: string) {
  return value
    .replace(/\s*CRONOGRAMA OPERACIONAL[\s\S]*$/i, "")
    .replace(/\s*QUESTION[ÁA]RIO DE PERCEP[ÇC][ÃA]O SOBRE A PROVA[\s\S]*$/i, "")
    .replace(/\s*Question[aá]rio de percep[cç][aã]o sobre a prova[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseObjectiveBlocks(text: string) {
  const isNoiseLine = (line: string) =>
    /^-- .* --$/.test(line) ||
    /EXAME DE ORDEM UNIFICADO.*TIPO/i.test(line) ||
    /^Tipo .*P[aá]gina/i.test(line) ||
    /^Caderno de Prova/i.test(line) ||
    /^OAB\s*[–-]\s*Exame de Ordem Unificado/i.test(line) ||
    /^PROVA OBJETIVA$/i.test(line) ||
    /^As siglas encontradas na prova/i.test(line) ||
    /^CF\s*=\s*Constitui/i.test(line);

  const legacyMarkers = [...text.matchAll(/(?:^|\n)\s*0?([1-9]\d?|100)\s+[A-Z]\d{4,6}\s*(?=\n)/g)];
  if (legacyMarkers.length >= 80) {
    return legacyMarkers.map((marker, index) => {
      const start = (marker.index || 0) + marker[0].length;
      const end = index + 1 < legacyMarkers.length ? legacyMarkers[index + 1].index || text.length : text.length;
      const lines = text
        .slice(start, end)
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !isNoiseLine(line) && !/^\d{2}$/.test(line));
      return { number: Number(marker[1]), lines };
    }).filter((block) => block.number >= 1 && block.number <= 100);
  }

  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const blocks: Array<{ number: number; lines: string[] }> = [];
  let current: { number: number; lines: string[] } | null = null;

  for (const line of lines) {
    if (isNoiseLine(line)) continue;
    const marker = line.match(/^(?:Quest[aã]o\s*)?0?([1-9]|[1-9][0-9]|100)$/i);
    if (marker) {
      if (current) blocks.push(current);
      current = { number: Number(marker[1]), lines: [] };
      continue;
    }
    if (current) current.lines.push(line);
  }

  if (current) blocks.push(current);
  return blocks.filter((block) => block.number >= 1 && block.number <= 100);
}

function isTypeOneProof(file: CandidateFile) {
  const value = normalizeText(`${file.title} ${file.relativePath}`);
  return (
    value.includes("tipo 1") ||
    value.includes("tipo 01") ||
    value.includes("prova 01") ||
    value.includes("prova-01") ||
    value.includes("caderno de prova 01") ||
    value.includes("caderno-de-prova-01")
  );
}

async function extractQuestionsFromProof(exam: Exam, proof: CandidateFile, answers: Map<number, string>) {
  if (!isTypeOneProof(proof)) {
    log(`Questoes ignoradas em ${proof.title}: usando apenas Tipo 1/Caderno 01 para evitar duplicidade`);
    return [];
  }

  const text = await extractPdfText(proof.absolutePath);
  if (!isReadableQuestionText(text)) {
    log(`Questoes nao importadas de ${proof.title}: camada de texto corrompida; exige OCR`);
    return [];
  }
  const blocks = parseObjectiveBlocks(text);
  const questions: ExtractedQuestion[] = [];
  const seen = new Set<number>();
  const maxQuestions = answers.size >= 100 ? 100 : 80;

  for (const block of blocks) {
    if (seen.has(block.number)) continue;
    if (questions.length >= maxQuestions) break;
    const body = block.lines.join("\n");
    const markers = [...body.matchAll(/(?:^|\n)\s*(?:\(([A-E])\)|([A-E])\)|[^\sA-Za-z0-9]\))\s+/g)];
    if (markers.length < 4) continue;
    const optionMarkers = markers.filter((marker, index, list) => {
      const letter = (marker[1] || marker[2] || "abcde"[index] || "").toLowerCase();
      return letter && list.findIndex((item, itemIndex) => (item[1] || item[2] || "abcde"[itemIndex] || "").toLowerCase() === letter) === index;
    }).slice(0, 5);
    if (optionMarkers.length < 4) continue;
    const answer = answers.get(block.number);
    if (!answer) continue;
    seen.add(block.number);

    const alternatives = new Map<string, string>();
    optionMarkers.forEach((marker, index) => {
      const letter = (marker[1] || marker[2] || "abcde"[index] || "").toLowerCase();
      const start = (marker.index || 0) + marker[0].length;
      const end = index + 1 < optionMarkers.length ? optionMarkers[index + 1].index || body.length : body.length;
      alternatives.set(letter, cleanQuestionText(body.slice(start, end)));
    });

    const examNumber = exam.slug.replace("-exame", "");
    const code = `OAB-${examNumber}-T1-Q${String(block.number).padStart(2, "0")}`;
    questions.push({
      id: code.toLowerCase(),
      codigo: code,
      banca: "FGV",
      materia: block.number <= 80 ? questionSubject(block.number) : "OAB - Prova objetiva",
      topico: `${examNumber}o Exame OAB - Questao ${block.number}`,
      dificuldade: "medio",
      enunciado: cleanQuestionText(body.slice(0, markers[0].index)),
      alternativa_a: alternatives.get("a") || "",
      alternativa_b: alternatives.get("b") || "",
      alternativa_c: alternatives.get("c") || "",
      alternativa_d: alternatives.get("d") || "",
      alternativa_e: alternatives.get("e") || "",
      gabarito: answer,
      comentario: answer === "anulada"
        ? `Questao oficial da OAB/FGV (${examNumber}o Exame), extraida do caderno Tipo 1. Questao anulada no gabarito oficial.`
        : `Questao oficial da OAB/FGV (${examNumber}o Exame), extraida do caderno Tipo 1. Gabarito oficial: ${answer.toUpperCase()}.`,
      concurso: "OAB",
    });
  }

  log(`Questoes extraidas de ${proof.title}: ${questions.length}`);
  return questions;
}

async function extractExamQuestions(exam: Exam, files: CandidateFile[]) {
  const definitiveAnswerFile =
    files.find((file) => file.type === "gabarito" && normalizeText(file.title).includes("definitivo")) ||
    files.find((file) => file.type === "gabarito");

  const type1Proof = files.find((file) => file.type === "prova" && isTypeOneProof(file));
  if (!definitiveAnswerFile || !type1Proof) {
    log(`Questoes nao importadas para ${exam.slug}: caderno Tipo 1/Caderno 01 ou gabarito ausente`);
    return [];
  }

  const answerText = await extractPdfText(definitiveAnswerFile.absolutePath);
  const answers = parseTipo1Answers(answerText);
  if (answers.size < 80) {
    log(`Questoes nao importadas para ${exam.slug}: gabarito Tipo 1 incompleto (${answers.size}/80)`);
    return [];
  }

  const questions = await extractQuestionsFromProof(exam, type1Proof, answers);
  if (!questions.length) return [];

  const questionsPath = path.join(STORAGE_ROOT, exam.slug, "questoes", "questoes-extraidas.json");
  await mkdir(path.dirname(questionsPath), { recursive: true });
  await writeFile(questionsPath, JSON.stringify(questions, null, 2), "utf-8");
  log(`Banco local salvo em: storage/content/oab/${exam.slug}/questoes/`);
  return questions;
}

async function savePublicQuestions(questions: ExtractedQuestion[]) {
  const outputPath = path.resolve(process.cwd(), "public", "questoes", "oab.json");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(questions, null, 2), "utf-8");
}

async function savePublicManifest(materials: PublicMaterial[]) {
  const manifestPath = path.resolve(process.cwd(), "public", "materiais", "oab-manifest.json");
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(materials, null, 2), "utf-8");
}

async function savePublicExamIndex(exams: PublicExam[]) {
  const manifestPath = path.resolve(process.cwd(), "public", "materiais", "oab-exams.json");
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(exams, null, 2), "utf-8");
}

function toPublicMaterial(exam: Exam, file: CandidateFile): PublicMaterial {
  const tipo = file.type === "gabarito" ? "Gabarito" : file.type === "segunda-fase" ? "Prova oficial" : "Prova oficial";
  return {
    id: `oab-${exam.slug}-${safeFileName(file.title)}-${shortHash(file.url)}`,
    titulo: `${exam.title} - ${file.title}`,
    tipo,
    categoria: "OAB/FGV",
    materia: file.type === "segunda-fase" ? "OAB - 2a fase" : "OAB - 1a fase",
    descricao: `Material oficial ${SOURCE} coletado automaticamente.`,
    url: file.url,
    arquivo: path.basename(file.relativePath),
    source: SOURCE,
    sourcePath: file.relativePath,
  };
}

async function trySaveWithPrisma(exam: Exam, files: CandidateFile[]) {
  if (!process.env.DATABASE_URL || files.length === 0) return;

  try {
    const prismaModule = await import("@prisma/client") as unknown as { PrismaClient?: new () => any; default?: { PrismaClient?: new () => any } };
    const PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
    if (!PrismaClient) throw new Error("PrismaClient nao gerado");
    const prisma = new PrismaClient();
    for (const file of files) {
      await prisma.contentFile.upsert({
        where: { url: file.url },
        create: {
          source: SOURCE,
          exam: exam.title,
          examKey: exam.key,
          title: file.title,
          type: file.type,
          url: file.url,
          path: file.relativePath,
        },
        update: {
          title: file.title,
          type: file.type,
          path: file.relativePath,
        },
      });
    }
    await prisma.$disconnect();
  } catch (error) {
    log(`Prisma indisponivel; metadata local mantido. ${error instanceof Error ? error.message : ""}`.trim());
  }
}

async function trySaveQuestionsWithPrisma(questions: ExtractedQuestion[]) {
  if (!process.env.DATABASE_URL || questions.length === 0) return false;

  try {
    const prismaModule = await import("@prisma/client") as unknown as { PrismaClient?: new () => any; default?: { PrismaClient?: new () => any } };
    const PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
    if (!PrismaClient) throw new Error("PrismaClient nao gerado");
    const prisma = new PrismaClient();
    if (!prisma.questao) throw new Error("Modelo Questao ainda nao gerado. Rode prisma generate.");
    for (const question of questions) {
      await prisma.questao.upsert({
        where: { id: question.id },
        create: {
          id: question.id,
          codigo: question.codigo,
          banca: question.banca,
          materia: question.materia,
          topico: question.topico,
          dificuldade: question.dificuldade,
          enunciado: question.enunciado,
          alternativaA: question.alternativa_a,
          alternativaB: question.alternativa_b,
          alternativaC: question.alternativa_c,
          alternativaD: question.alternativa_d,
          alternativaE: question.alternativa_e,
          gabarito: question.gabarito,
          comentario: question.comentario,
          concurso: question.concurso,
        },
        update: {
          materia: question.materia,
          topico: question.topico,
          enunciado: question.enunciado,
          alternativaA: question.alternativa_a,
          alternativaB: question.alternativa_b,
          alternativaC: question.alternativa_c,
          alternativaD: question.alternativa_d,
          alternativaE: question.alternativa_e,
          gabarito: question.gabarito,
          comentario: question.comentario,
        },
      });
    }
    await prisma.$disconnect();
    log(`Questoes salvas no PostgreSQL via Prisma: ${questions.length}`);
    return true;
  } catch (error) {
    log(`Prisma indisponivel para questoes; tentando fallback se houver Supabase service key. ${error instanceof Error ? error.message : ""}`.trim());
    return false;
  }
}

function normalizedSupabaseRestUrl() {
  const rawUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  if (!rawUrl) return "";
  try {
    return `${new URL(rawUrl).origin}/rest/v1`;
  } catch {
    return "";
  }
}

async function trySaveQuestionsWithSupabase(questions: ExtractedQuestion[]) {
  const restUrl = normalizedSupabaseRestUrl();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!restUrl || !serviceKey || questions.length === 0) return false;

  try {
    const chunkSize = 25;
    for (let index = 0; index < questions.length; index += chunkSize) {
      const chunk = questions.slice(index, index + chunkSize);
      await axios.post(`${restUrl}/questoes?on_conflict=id`, chunk, {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
      });
    }
    log(`Questoes salvas no Supabase: ${questions.length}`);
    return true;
  } catch (error) {
    log(`Falha ao salvar questoes no Supabase: ${error instanceof Error ? error.message : "erro desconhecido"}`);
    return false;
  }
}

async function run() {
  const client = createClient();
  const exams = await discoverExams(client);
  const selectedExams = EXAM_LIMIT > 0 ? exams.slice(0, EXAM_LIMIT) : exams;
  const publicMaterials: PublicMaterial[] = [];
  const publicExams: PublicExam[] = [];
  const extractedQuestions: ExtractedQuestion[] = [];

  for (const exam of selectedExams) {
    log(`Exame ${exam.slug.replace("-exame", "")} encontrado`);
    const downloaded: CandidateFile[] = [];

    if (REPROCESS_ONLY) {
      downloaded.push(...await loadDownloadedFiles(exam));
    } else {
      const html = await openExamFilesPage(client, exam);
      const candidates = collectPdfCandidates(html, exam);

      for (const file of candidates) {
        try {
          await downloadFile(client, file);
          downloaded.push(file);
        } catch (error) {
          log(`Falha ao baixar ${file.title}: ${error instanceof Error ? error.message : "erro desconhecido"}`);
        }
      }

      await saveMetadata(exam, downloaded);
    }

    publicExams.push({
      slug: exam.slug,
      title: exam.title,
      label: exam.title.replace(" de Ordem Unificado", ""),
      sourceUrl: exam.url,
      order: exam.order,
      materialCount: downloaded.length,
    });
    await trySaveWithPrisma(exam, downloaded);
    try {
      const examQuestions = await extractExamQuestions(exam, downloaded);
      extractedQuestions.push(...examQuestions);
    } catch (error) {
      log(`Questoes nao importadas para ${exam.slug}: ${error instanceof Error ? error.message : "erro desconhecido"}`);
    }
    publicMaterials.push(...downloaded.map((file) => toPublicMaterial(exam, file)));
  }

  await savePublicManifest(publicMaterials);
  log(`Manifest publico atualizado: public/materiais/oab-manifest.json`);
  await savePublicExamIndex(publicExams);
  log(`Indice publico de exames atualizado: public/materiais/oab-exams.json`);
  await savePublicQuestions(extractedQuestions);
  log(`Banco local de questoes OAB atualizado: public/questoes/oab.json (${extractedQuestions.length})`);
  const savedWithPrisma = await trySaveQuestionsWithPrisma(extractedQuestions);
  if (!savedWithPrisma) await trySaveQuestionsWithSupabase(extractedQuestions);
}

run().catch((error) => {
  console.error("[OAB Miner] Falha fatal:", error);
  process.exitCode = 1;
});
