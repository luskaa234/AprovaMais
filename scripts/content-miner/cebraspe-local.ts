import "dotenv/config";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { normalizeContentText } from "../../src/utils/textEncoding.js";

type QuestionType = "certo_errado" | "multipla";

type ExamFolder = {
  slug: string;
  root: string;
  proofPath: string;
  answerPath: string;
  meta: ExamMeta;
};

type ExamMeta = {
  orgao: string;
  ano: number | "";
  cargo: string;
  codigo_prova: string;
};

type AnswerBlock = {
  codigo: string;
  cargo: string;
  answers: Map<number, string>;
};

type QuestionBlock = {
  number: number;
  body: string;
  materiaOriginal: string;
};

type ExtractedQuestion = {
  id: string;
  codigo: string;
  orgao: string;
  ano: number | "";
  cargo: string;
  banca: "Cebraspe";
  codigo_prova: string;
  numero_item: number;
  numero: number;
  tipo: QuestionType;
  formato: QuestionType;
  materia: string;
  materia_original: string;
  topico: string;
  dificuldade: string;
  enunciado: string;
  afirmacao?: string;
  alternativas: Array<{ letra: string; texto: string }>;
  gabarito: string;
  anulada: false;
  origem: "oficial";
  banca_selo: "Cebraspe";
  concurso: string;
  comentario: string;
  duplicate: boolean;
};

type Discard = {
  numero?: number;
  reason: string;
  detail?: string;
};

type ExamReport = {
  slug: string;
  orgao: string;
  ano: number | "";
  cargo: string;
  codigo_prova: string;
  prova: string;
  gabarito: string;
  totalGabarito: number;
  extraidas: number;
  validas: number;
  anuladas: number;
  descartadas: number;
  porTipo: Record<QuestionType, number>;
  porMateria: Record<string, number>;
  validacoes: {
    formatoGabarito: "passou" | "falhou";
    contagem: "passou" | "falhou";
    alternativasMultipla: "passou" | "falhou";
    semGabaritoOrfao: "passou" | "falhou";
    falhas: string[];
  };
  motivosDescarte: Record<string, number>;
};

const INPUT_ROOT = path.resolve(process.cwd(), "material-provas", "cebraspe");
const OUT_ROOT = path.resolve(process.cwd(), "storage", "content", "cebraspe-local");
const REPORT_PATH = path.join(OUT_ROOT, "cebraspe-local-report.json");
const PREVIEW_PATH = path.join(OUT_ROOT, "cebraspe-local-preview.json");
const PUSH_SUPABASE = process.argv.includes("--push-supabase");

function log(message: string) {
  console.log(`[Cebraspe Local Miner] ${message}`);
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
    .replace(/\u00a0/g, " ")
    .replace(/\s*Eventuais espacos livres[\s\S]*$/i, "")
    .replace(/\s*Espaco livre[\s\S]*$/i, "")
    .replace(/\s*RASCUNHO[\s\S]*$/i, "")
    .replace(/\s*\|\|[A-Z0-9_]+[^|]*\|\|/g, " ")
    .replace(/\b(?:CESPE|CEBRASPE)\s*\|\s*CEBRASPE\s*[-–].*?Aplicacao:\s*\d{4}/gi, " ")
    .replace(/\bP[aá]gina\s+\d+\b/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function safeFileName(value: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140);
}

function shortHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function normalizeAnswer(value = "") {
  const raw = normalizeText(value);
  if (!raw) return "";
  if (raw === "*" || raw === "x" || raw.includes("anulada") || raw.includes("nula")) return "x";
  if (raw.startsWith("certo")) return "c";
  if (raw.startsWith("errado")) return "e";
  const first = raw[0];
  return ["a", "b", "c", "d", "e"].includes(first) ? first : "";
}

async function pathExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findPdfByKind(folder: string, kind: "prova" | "gabarito") {
  const files = await readdir(folder, { withFileTypes: true });
  const pdfs = files
    .filter((item) => item.isFile() && item.name.toLowerCase().endsWith(".pdf"))
    .map((item) => item.name);
  const preferred = pdfs.find((name) => {
    const normalized = normalizeText(name);
    if (kind === "prova") return normalized === "prova.pdf" || (normalized.includes("prova") && !normalized.includes("discursiva"));
    return normalized === "gabarito.pdf" || normalized.includes("gabarito");
  });
  return preferred ? path.join(folder, preferred) : "";
}

async function discoverExams() {
  if (!(await pathExists(INPUT_ROOT))) return [] as ExamFolder[];
  const entries = await readdir(INPUT_ROOT, { withFileTypes: true });
  const exams: ExamFolder[] = [];

  for (const entry of entries.filter((item) => item.isDirectory())) {
    const root = path.join(INPUT_ROOT, entry.name);
    const proofPath = await findPdfByKind(root, "prova");
    const answerPath = await findPdfByKind(root, "gabarito");
    if (!proofPath || !answerPath) {
      log(`Ignorado: ${entry.name} precisa de prova.pdf e gabarito.pdf ou nomes com prova/gabarito.`);
      continue;
    }

    const metaPath = path.join(root, "metadata.json");
    let meta = inferMeta(entry.name, `${path.basename(proofPath)} ${path.basename(answerPath)}`);
    if (await pathExists(metaPath)) {
      const parsed = JSON.parse(await readFile(metaPath, "utf-8")) as Partial<ExamMeta>;
      meta = { ...meta, ...parsed };
    }

    exams.push({ slug: safeFileName(entry.name), root, proofPath, answerPath, meta });
  }

  return exams;
}

function inferMeta(slug: string, names: string): ExamMeta {
  const source = `${slug} ${names}`;
  const normalized = normalizeText(source);
  const year = Number(source.match(/\b(19|20)\d{2}\b/)?.[0] || 0) || "";
  const orgaoMatch = normalized.match(/\b(?:pm|cbm)[-_\s]?[a-z]{2}\b/)?.[0] || normalized.match(/\bpm[a-z]{2}\b/)?.[0] || "";
  const orgao = orgaoMatch ? orgaoMatch.replace(/[-_\s]/g, "").toUpperCase() : "Orgao militar";
  let cargo = "Cargo militar";
  if (normalized.includes("soldado")) cargo = "Soldado";
  else if (normalized.includes("oficial")) cargo = "Oficial";
  else if (normalized.includes("bombeiro")) cargo = "Bombeiro Militar";
  const code = source.match(/\b\d{3,4}_[A-Z0-9_]+_\d{2}\b/i)?.[0] || source.match(/\b[A-Z]{2,6}_?[A-Z0-9]+_?\d{2,4}\b/i)?.[0] || safeFileName(slug).toUpperCase();
  return { orgao, ano: year, cargo, codigo_prova: code };
}

async function extractColumnsPdf(filePath: string) {
  const data = new Uint8Array(await readFile(filePath));
  const document = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent({ disableCombineTextItems: false });
    const items = content.items
      .map((item: any) => {
        const transform = pdfjs.Util.transform(viewport.transform, item.transform);
        return { str: String(item.str || ""), x: transform[4], y: transform[5] };
      })
      .filter((item) => item.str.trim());

    for (const side of [0, 1]) {
      const minX = side === 0 ? 0 : viewport.width / 2;
      const maxX = side === 0 ? viewport.width / 2 : viewport.width;
      const column = items
        .filter((item) => item.x >= minX && item.x < maxX)
        .sort((a, b) => (Math.abs(a.y - b.y) > 2 ? a.y - b.y : a.x - b.x));

      const lines: string[] = [];
      let current: typeof column = [];
      let lastY: number | null = null;
      for (const item of column) {
        if (lastY === null || Math.abs(item.y - lastY) <= 2) current.push(item);
        else {
          lines.push(current.sort((a, b) => a.x - b.x).map((lineItem) => lineItem.str).join(" "));
          current = [item];
        }
        lastY = item.y;
      }
      if (current.length) lines.push(current.sort((a, b) => a.x - b.x).map((lineItem) => lineItem.str).join(" "));
      pages.push(lines.join("\n"));
    }
  }

  await document.destroy();
  return pages.join("\n");
}

function splitAnswerBlocks(text: string, meta: ExamMeta) {
  const lines = text.split("\n").map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  const codeCandidates = [
    meta.codigo_prova,
    ...[...text.matchAll(/\b\d{3,4}_[A-Z0-9_]+_\d{2}\b/gi)].map((match) => match[0]),
  ].filter(Boolean);
  const uniqueCodes = [...new Set(codeCandidates.map((item) => normalizeText(item)))];

  const blocks: AnswerBlock[] = [];
  const fullAnswers = parseAnswersFromLines(lines);
  if (fullAnswers.size) {
    blocks.push({
      codigo: meta.codigo_prova,
      cargo: meta.cargo,
      answers: fullAnswers,
    });
  }

  for (const code of uniqueCodes) {
    const start = lines.findIndex((line) => normalizeText(line).includes(code));
    if (start < 0) continue;
    const end = lines.findIndex((line, index) => index > start && uniqueCodes.some((candidate) => candidate !== code && normalizeText(line).includes(candidate)));
    const slice = lines.slice(start, end > start ? end : undefined);
    const answers = parseAnswersFromLines(slice);
    if (answers.size) blocks.push({ codigo: code.toUpperCase(), cargo: slice[0] || meta.cargo, answers });
  }

  const byKey = new Map<string, AnswerBlock>();
  for (const block of blocks) byKey.set(`${block.codigo}-${block.answers.size}`, block);
  return [...byKey.values()].sort((a, b) => scoreAnswerBlock(b, meta) - scoreAnswerBlock(a, meta));
}

function scoreAnswerBlock(block: AnswerBlock, meta: ExamMeta) {
  let score = block.answers.size;
  if (normalizeText(block.codigo).includes(normalizeText(meta.codigo_prova))) score += 1000;
  if (normalizeText(block.cargo).includes(normalizeText(meta.cargo))) score += 100;
  return score;
}

function parseAnswersFromLines(lines: string[]) {
  const map = new Map<number, string>();
  const answerToken = /^(?:A|B|C|D|E|X|\*|Certo|Errado|Anulada|Nula)$/i;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const numbers = (line.match(/\b\d{1,3}\b/g) || []).map(Number).filter((number) => number > 0 && number <= 200);
    if (numbers.length < 3) continue;

    const answers: string[] = [];
    for (let next = index + 1; next < Math.min(lines.length, index + 5) && answers.length < numbers.length; next += 1) {
      const tokens = lines[next].split(/\s+/).filter((word) => answerToken.test(word));
      if (tokens.length >= 2) answers.push(...tokens);
    }
    if (answers.length >= numbers.length) {
      numbers.forEach((number, numberIndex) => {
        const answer = normalizeAnswer(answers[numberIndex]);
        if (answer) map.set(number, answer);
      });
    }
  }

  const joined = lines.join(" ");
  const pairRegex = /\b0?(\d{1,3})\s*(?:[-\u2012-\u2015.:]|\s)\s*(A|B|C|D|E|X|\*|Certo|Errado|Anulada|Nula)\b/gi;
  for (const match of joined.matchAll(pairRegex)) {
    const number = Number(match[1]);
    const answer = normalizeAnswer(match[2]);
    if (number > 0 && number <= 200 && answer) map.set(number, answer);
  }

  return map;
}

function detectMatterFromLine(line: string, current: string) {
  const normalized = normalizeText(line);
  if (/conhecimentos basicos|lingua portuguesa|portugues|interpretacao de texto/.test(normalized)) return "Portugues";
  if (/raciocinio logico/.test(normalized)) return "Matematica e Raciocinio Logico";
  if (/matematica|estatistica/.test(normalized)) return "Matematica";
  if (/informatica|tecnologia da informacao/.test(normalized)) return "Informatica";
  if (/direito constitucional|constitucional/.test(normalized)) return "Direito Constitucional";
  if (/direito administrativo|administrativo/.test(normalized)) return "Direito Administrativo";
  if (/processual penal|processo penal/.test(normalized)) return "Direito Processual Penal";
  if (/direito penal militar|codigo penal militar|processo penal militar/.test(normalized)) return "Legislacao PM e Direito Militar";
  if (/direito penal|codigo penal/.test(normalized)) return "Direito Penal";
  if (/direitos humanos/.test(normalized)) return "Direitos Humanos";
  if (/legislacao especial|lei maria|estatuto|abuso de autoridade|drogas|desarmamento|tortura|eca/.test(normalized)) return "Legislacao Especial";
  if (/legislacao institucional|legislacao da pm|legislacao da policia militar|estatuto dos policiais|direito militar/.test(normalized)) return "Legislacao PM e Direito Militar";
  if (/atualidades/.test(normalized)) return "Atualidades";
  if (/historia|geografia/.test(normalized)) return "Historia e Geografia";
  return current;
}

function cleanQuestionBody(value = "") {
  return cleanText(value)
    .replace(/^(?:Quest[aã]o|Item)\s*\d+\s*[.)-]?\s*/i, "")
    .replace(/^\d+\s*[.)-]?\s*/, "")
    .trim();
}

function splitQuestionBlocks(text: string, answerNumbers: Set<number>) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const blocks: QuestionBlock[] = [];
  let current: { number: number; lines: string[]; materia: string } | null = null;
  let currentMatter = "Conhecimentos Gerais";
  let pendingContext: string[] = [];
  let activeContext: string[] = [];
  let activeContextRange: { start: number; end: number } | null = null;

  for (const line of lines) {
    if (isNoiseLine(line)) continue;
    currentMatter = detectMatterFromLine(line, currentMatter);

    const contextRange = detectTextBaseRange(line);
    if (contextRange) {
      activeContextRange = contextRange;
      activeContext = pendingContext.slice(-20);
      pendingContext = [];
    }

    const marker = detectQuestionMarker(line, answerNumbers);
    if (marker) {
      if (current) blocks.push({ number: current.number, body: current.lines.join("\n"), materiaOriginal: current.materia });
      const context = activeContextRange && marker.number >= activeContextRange.start && marker.number <= activeContextRange.end
        ? [...activeContext, line]
        : [];
      current = {
        number: marker.number,
        lines: marker.rest ? [...context, marker.rest] : context,
        materia: currentMatter,
      };
      pendingContext = [];
      continue;
    }

    if (current) current.lines.push(line);
    else pendingContext.push(line);
  }

  if (current) blocks.push({ number: current.number, body: current.lines.join("\n"), materiaOriginal: current.materia });
  return blocks.filter((block) => block.body.trim());
}

function isNoiseLine(line: string) {
  const normalized = normalizeText(line);
  return /^-- .* --$/.test(line)
    || /^pagina \d+/.test(normalized)
    || normalized.includes("eventuais espacos livres")
    || normalized === "espaco livre"
    || /^\d{3,4}[a-z0-9_]+ cebraspe/i.test(normalized);
}

function detectTextBaseRange(line: string) {
  const normalized = normalizeText(line);
  const range = normalized.match(/(?:itens|questoes)\s+(?:de\s+)?(\d{1,3})\s+a\s+(\d{1,3})/);
  if (!range) return null;
  if (!/(texto|julgue|considere|com relacao|acerca|a respeito)/.test(normalized)) return null;
  return { start: Number(range[1]), end: Number(range[2]) };
}

function detectQuestionMarker(line: string, answerNumbers: Set<number>) {
  const standalone = line.match(/^(?:Quest[aã]o|Item)?\s*0?(\d{1,3})\s*[.)-]?$/i);
  if (standalone) {
    const number = Number(standalone[1]);
    return answerNumbers.has(number) ? { number, rest: "" } : null;
  }

  const inline = line.match(/^(?:Quest[aã]o|Item)?\s*0?(\d{1,3})\s*[.)-]?\s+(.{8,})$/i);
  if (!inline) return null;
  const number = Number(inline[1]);
  if (!answerNumbers.has(number)) return null;
  const rest = inline[2];
  if (/^[A-Ea-e][).:-]\s+/.test(rest)) return null;
  return { number, rest };
}

function parseAlternatives(body: string) {
  const markers = [...body.matchAll(/(?:^|\n|\s)(?:\(([A-Ea-e])\)|([A-Ea-e])[\).]|([A-Ea-e])\s*[-\u2012-\u2015])\s+/g)];
  const firstByLetter = new Map<string, RegExpMatchArray>();
  for (const marker of markers) {
    const letter = (marker[1] || marker[2] || marker[3] || "").toUpperCase();
    if (!letter || firstByLetter.has(letter)) continue;
    firstByLetter.set(letter, marker);
  }

  const ordered = ["A", "B", "C", "D", "E"].map((letter) => firstByLetter.get(letter)).filter(Boolean) as RegExpMatchArray[];
  if (ordered.length !== 5) return null;

  const alternatives = ordered.map((marker, index) => {
    const letra = (marker[1] || marker[2] || marker[3] || "ABCDE"[index]).toUpperCase();
    const start = (marker.index || 0) + marker[0].length;
    const end = index + 1 < ordered.length ? ordered[index + 1].index || body.length : body.length;
    return { letra, texto: cleanText(body.slice(start, end)) };
  });

  if (alternatives.some((item) => !item.texto || item.texto.length < 2)) return null;
  const enunciado = cleanText(body.slice(0, ordered[0].index || 0));
  return enunciado ? { enunciado, alternatives } : null;
}

function classifyMatter(materiaOriginal: string, text: string) {
  const fromHeading = detectMatterFromLine(materiaOriginal, "");
  if (fromHeading) return fromHeading;
  return detectMatterFromLine(text, "Conhecimentos Gerais");
}

function difficultyForQuestion(materia: string, text: string) {
  const normalizedMatter = normalizeText(materia);
  const normalizedText = normalizeText(text);
  if (normalizedMatter.includes("raciocinio") && /(proposicional|equivalent|negacao|argument|silog|sentenca|conectivo|tabela verdade|condicional)/.test(normalizedText)) return "dificil";
  if (normalizedMatter.includes("matematica") && /(probabilidade|combinatoria|combinacao|arranjo|permutacao|juros compostos|estatistica|desvio|progressao|pa|pg)/.test(normalizedText)) return "dificil";
  return "medio";
}

function duplicateKey(enunciado: string, alternatives: Array<{ letra: string; texto: string }>) {
  return normalizeText([enunciado, ...alternatives.map((item) => item.texto)].join(" "));
}

async function loadExistingDuplicateKeys() {
  const keys = new Set<string>();
  const candidates = [
    path.resolve(process.cwd(), "public", "questoes", "militar.json"),
    path.resolve(process.cwd(), "storage", "content", "fgv-local", "fgv-local-preview.json"),
  ];

  for (const filePath of candidates) {
    try {
      const rows = JSON.parse(await readFile(filePath, "utf-8"));
      if (!Array.isArray(rows)) continue;
      for (const row of rows) {
        const alternatives = Array.isArray(row.alternativas)
          ? row.alternativas
          : ["a", "b", "c", "d", "e"].map((letter) => ({ letra: letter.toUpperCase(), texto: row[`alternativa_${letter}`] || "" }));
        keys.add(duplicateKey(row.enunciado || row.afirmacao || "", alternatives));
      }
    } catch {
      // Existing files are optional.
    }
  }

  return keys;
}

function extractQuestions(exam: ExamFolder, blocks: QuestionBlock[], answers: Map<number, string>, duplicateKeys: Set<string>) {
  const questions: ExtractedQuestion[] = [];
  const discarded: Discard[] = [];
  const answerNumbers = new Set(answers.keys());
  const blockNumbers = new Set(blocks.map((block) => block.number));

  for (const number of answerNumbers) {
    if (!blockNumbers.has(number)) discarded.push({ numero: number, reason: "bloco_nao_extraido" });
  }

  for (const block of blocks) {
    const answer = answers.get(block.number);
    if (!answer) {
      discarded.push({ numero: block.number, reason: "sem_gabarito" });
      continue;
    }
    if (answer === "x") continue;

    const body = cleanQuestionBody(block.body);
    const parsedMultiple = parseAlternatives(body);
    const type: QuestionType = parsedMultiple ? "multipla" : "certo_errado";

    if (type === "multipla") {
      if (!["a", "b", "c", "d", "e"].includes(answer)) {
        discarded.push({ numero: block.number, reason: "gabarito_incompativel_multipla", detail: answer });
        continue;
      }
      const key = duplicateKey(parsedMultiple.enunciado, parsedMultiple.alternatives);
      const duplicate = duplicateKeys.has(key);
      if (duplicate) {
        discarded.push({ numero: block.number, reason: "duplicada_existente" });
        continue;
      }
      duplicateKeys.add(key);
      questions.push(makeQuestion(exam, block, type, parsedMultiple.enunciado, parsedMultiple.alternatives, answer, duplicate));
      continue;
    }

    if (!["c", "e"].includes(answer)) {
      discarded.push({ numero: block.number, reason: "gabarito_incompativel_certo_errado", detail: answer });
      continue;
    }
    if (!body || body.length < 12) {
      discarded.push({ numero: block.number, reason: "afirmacao_vazia" });
      continue;
    }
    const key = duplicateKey(body, []);
    const duplicate = duplicateKeys.has(key);
    if (duplicate) {
      discarded.push({ numero: block.number, reason: "duplicada_existente" });
      continue;
    }
    duplicateKeys.add(key);
    questions.push(makeQuestion(exam, block, type, body, [], answer, duplicate));
  }

  return { questions, discarded };
}

function makeQuestion(
  exam: ExamFolder,
  block: QuestionBlock,
  type: QuestionType,
  enunciado: string,
  alternatives: Array<{ letra: string; texto: string }>,
  answer: string,
  duplicate: boolean,
): ExtractedQuestion {
  const materia = classifyMatter(block.materiaOriginal, enunciado);
  const id = `${exam.slug}-q${String(block.number).padStart(3, "0")}`;
  return {
    id,
    codigo: id.toUpperCase(),
    orgao: exam.meta.orgao,
    ano: exam.meta.ano,
    cargo: exam.meta.cargo,
    banca: "Cebraspe",
    codigo_prova: exam.meta.codigo_prova,
    numero_item: block.number,
    numero: block.number,
    tipo: type,
    formato: type,
    materia,
    materia_original: block.materiaOriginal || materia,
    topico: `${exam.meta.orgao} ${exam.meta.cargo} ${exam.meta.ano || ""} - item ${block.number}`.trim(),
    dificuldade: difficultyForQuestion(materia, enunciado),
    enunciado,
    afirmacao: type === "certo_errado" ? enunciado : undefined,
    alternativas: alternatives,
    gabarito: answer,
    anulada: false,
    origem: "oficial",
    banca_selo: "Cebraspe",
    concurso: exam.meta.orgao,
    comentario: `Questao oficial ${exam.meta.orgao} ${exam.meta.cargo} ${exam.meta.ano || ""}. Banca: Cebraspe. Codigo: ${exam.meta.codigo_prova}. Gabarito definitivo: ${answer.toUpperCase()}.`,
    duplicate,
  };
}

function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<T, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

function makeReport(exam: ExamFolder, answers: Map<number, string>, blocks: QuestionBlock[], questions: ExtractedQuestion[], discarded: Discard[]) {
  const anuladas = [...answers.values()].filter((answer) => answer === "x").length;
  const porTipo = {
    certo_errado: questions.filter((question) => question.tipo === "certo_errado").length,
    multipla: questions.filter((question) => question.tipo === "multipla").length,
  };
  const porMateria = questions.reduce<Record<string, number>>((acc, question) => {
    acc[question.materia] = (acc[question.materia] || 0) + 1;
    return acc;
  }, {});
  const motivosDescarte = discarded.reduce<Record<string, number>>((acc, item) => {
    acc[item.reason] = (acc[item.reason] || 0) + 1;
    return acc;
  }, {});
  const falhas = [
    ...discarded.filter((item) => item.reason.startsWith("gabarito_incompativel")).map((item) => `Item ${item.numero}: ${item.reason} (${item.detail})`),
    ...discarded.filter((item) => item.reason === "sem_gabarito").map((item) => `Item ${item.numero}: sem gabarito`),
  ];
  const countExpected = answers.size - anuladas;
  const countPassed = questions.length === countExpected;
  const alternativesPassed = !discarded.some((item) => ["alternativas_incompletas", "alternativa_vazia"].includes(item.reason));
  const noOrphanPassed = !discarded.some((item) => item.reason === "sem_gabarito");
  const formatPassed = !discarded.some((item) => item.reason.startsWith("gabarito_incompativel"));

  return {
    slug: exam.slug,
    orgao: exam.meta.orgao,
    ano: exam.meta.ano,
    cargo: exam.meta.cargo,
    codigo_prova: exam.meta.codigo_prova,
    prova: path.relative(process.cwd(), exam.proofPath).replace(/\\/g, "/"),
    gabarito: path.relative(process.cwd(), exam.answerPath).replace(/\\/g, "/"),
    totalGabarito: answers.size,
    extraidas: blocks.length,
    validas: questions.length,
    anuladas,
    descartadas: discarded.length,
    porTipo,
    porMateria,
    validacoes: {
      formatoGabarito: formatPassed ? "passou" : "falhou",
      contagem: countPassed ? "passou" : "falhou",
      alternativasMultipla: alternativesPassed ? "passou" : "falhou",
      semGabaritoOrfao: noOrphanPassed ? "passou" : "falhou",
      falhas,
    },
    motivosDescarte,
  } satisfies ExamReport;
}

function sampleQuestions(questions: ExtractedQuestion[]) {
  return {
    certo_errado: questions
      .filter((question) => question.tipo === "certo_errado")
      .slice(0, 3)
      .map((question) => ({
        prova: question.id,
        enunciado: question.enunciado,
        gabarito: question.gabarito.toUpperCase(),
      })),
    multipla: questions
      .filter((question) => question.tipo === "multipla")
      .slice(0, 3)
      .map((question) => ({
        prova: question.id,
        enunciado: question.enunciado,
        alternativas: question.alternativas,
        gabarito: question.gabarito.toUpperCase(),
      })),
  };
}

async function writeExamOutput(exam: ExamFolder, questions: ExtractedQuestion[], report: ExamReport) {
  const root = path.join(OUT_ROOT, exam.slug);
  await mkdir(path.join(root, "questoes"), { recursive: true });
  await writeFile(path.join(root, "questoes", "questoes-extraidas.json"), `${JSON.stringify(questions, null, 2)}\n`, "utf-8");
  await writeFile(path.join(root, "metadata.json"), `${JSON.stringify({
    exame: `${exam.meta.orgao} ${exam.meta.cargo} ${exam.meta.ano || ""}`.trim(),
    banca: "Cebraspe",
    ano: exam.meta.ano,
    cargo: exam.meta.cargo,
    codigo_prova: exam.meta.codigo_prova,
    origem: "oficial",
    gabarito: "definitivo",
    report,
  }, null, 2)}\n`, "utf-8");
}

async function main() {
  if (PUSH_SUPABASE) {
    throw new Error("Este minerador de validacao nao faz upsert automatico. Remova --push-supabase, valide a amostra e crie uma promocao explicita depois.");
  }

  const exams = await discoverExams();
  await mkdir(OUT_ROOT, { recursive: true });

  if (!exams.length) {
    const empty = {
      inputRoot: path.relative(process.cwd(), INPUT_ROOT).replace(/\\/g, "/"),
      message: "Nenhuma pasta Cebraspe encontrada. Crie material-provas/cebraspe/<concurso>/prova.pdf e gabarito.pdf.",
      reports: [],
      samples: { certo_errado: [], multipla: [] },
    };
    await writeFile(REPORT_PATH, `${JSON.stringify(empty, null, 2)}\n`, "utf-8");
    await writeFile(PREVIEW_PATH, "[]\n", "utf-8");
    console.log(JSON.stringify(empty, null, 2));
    return;
  }

  const duplicateKeys = await loadExistingDuplicateKeys();
  const allQuestions: ExtractedQuestion[] = [];
  const reports: ExamReport[] = [];

  for (const exam of exams) {
    log(`Processando ${exam.slug}`);
    const [proofText, answerText] = await Promise.all([
      extractColumnsPdf(exam.proofPath),
      extractColumnsPdf(exam.answerPath),
    ]);
    const answerBlocks = splitAnswerBlocks(answerText, exam.meta);
    const answerBlock = answerBlocks[0];
    if (!answerBlock) {
      const report = makeReport(exam, new Map(), [], [], [{ reason: "gabarito_nao_lido" }]);
      reports.push(report);
      await writeExamOutput(exam, [], report);
      continue;
    }

    const blocks = splitQuestionBlocks(proofText, new Set(answerBlock.answers.keys()));
    const { questions, discarded } = extractQuestions(exam, blocks, answerBlock.answers, duplicateKeys);
    const report = makeReport(exam, answerBlock.answers, blocks, questions, discarded);
    reports.push(report);
    allQuestions.push(...questions);
    await writeExamOutput(exam, questions, report);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    inputRoot: path.relative(process.cwd(), INPUT_ROOT).replace(/\\/g, "/"),
    totalValidas: allQuestions.length,
    totalPorTipo: countBy(allQuestions.map((question) => question.tipo)),
    totalPorMateria: allQuestions.reduce<Record<string, number>>((acc, question) => {
      acc[question.materia] = (acc[question.materia] || 0) + 1;
      return acc;
    }, {}),
    reports,
    samples: sampleQuestions(allQuestions),
    supabase: "nao atualizado; este minerador gera apenas JSON local para validacao",
  };

  await writeFile(PREVIEW_PATH, `${JSON.stringify(allQuestions, null, 2)}\n`, "utf-8");
  await writeFile(REPORT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf-8");
  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
