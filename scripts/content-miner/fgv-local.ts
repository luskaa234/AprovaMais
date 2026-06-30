import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { normalizeContentText } from "../../src/utils/textEncoding.js";

type LocalExam = {
  slug: string;
  orgao: string;
  ano: number;
  cargo: string;
  prova: string;
  gabarito: string;
  cargoGabarito: string;
  total: number;
  alternativas: 4 | 5;
};

type LocalQuestion = {
  id: string;
  codigo: string;
  orgao: string;
  ano: number;
  cargo: string;
  banca: "FGV";
  numero: number;
  materia: string;
  materia_original: string;
  topico: string;
  dificuldade: string;
  enunciado: string;
  alternativas: Array<{ letra: string; texto: string }>;
  gabarito: string;
  origem: "oficial";
  duplicate: boolean;
};

const ROOT = path.resolve(process.cwd(), "material-provas", "fgv", "provas PM");
const OUT_ROOT = path.resolve(process.cwd(), "storage", "content", "fgv-local");
const REPORT_PATH = path.join(OUT_ROOT, "fgv-local-report.json");
const QUESTIONS_PATH = path.join(OUT_ROOT, "fgv-local-preview.json");

const EXAMS: LocalExam[] = [
  {
    slug: "pmerj-cfo-2021-fgv",
    orgao: "PMERJ",
    ano: 2021,
    cargo: "Oficial da PM (QOPM)",
    prova: "pmerj2021-curso-de-formacao-de-oficiais-da-pmerj-pmcfo01-tipo-1.pdf",
    gabarito: "pmerj2021_gabarito_definitivo.pdf",
    cargoGabarito: "Oficial da PM (QOPM)",
    total: 70,
    alternativas: 5,
  },
  {
    slug: "pmpb-cfo-2022-fgv",
    orgao: "PMPB",
    ano: 2022,
    cargo: "Curso de Formacao de Oficiais PM",
    prova: "curso-de-formacao-de-oficiais-combatentes-da-pmpbcfopb-22-tipo-1.pdf",
    gabarito: "pmpb2021_gabarito_definitivo.pdf",
    cargoGabarito: "Curso de Formação de Oficiais PM - Masculino",
    total: 80,
    alternativas: 5,
  },
  {
    slug: "pmam-oficial-2021-fgv",
    orgao: "PMAM",
    ano: 2021,
    cargo: "Aluno Oficial PM",
    prova: "aluno_oficial_da_pmns101_tipo_1.pdf",
    gabarito: "pmam2021_gabarito_definitivo_retificado_26.04.2022.pdf",
    cargoGabarito: "Aluno Oficial PM",
    total: 80,
    alternativas: 5,
  },
  {
    slug: "pmam-soldado-2021-fgv",
    orgao: "PMAM",
    ano: 2021,
    cargo: "Aluno Soldado PM",
    prova: "aluno_soldado_da_pmnm001_tipo_1.pdf",
    gabarito: "pmam2021_gabarito_definitivo_retificado_26.04.2022.pdf",
    cargoGabarito: "Aluno Soldado PM",
    total: 60,
    alternativas: 5,
  },
  {
    slug: "pmce-soldado-2021-fgv",
    orgao: "PMCE",
    ano: 2021,
    cargo: "Soldado Policial Militar",
    prova: "pmce2021_soldado_da_pm-ce_pmce01_tipo_1.pdf",
    gabarito: "pmce2021_gabarito_definitivo.pdf",
    cargoGabarito: "Soldado Policial Militar - Masculino",
    total: 80,
    alternativas: 5,
  },
  {
    slug: "pmesp-cabo-2022-fgv-local",
    orgao: "PMSP",
    ano: 2022,
    cargo: "Cabo PM",
    prova: "cabo-pmcnm001-tipo-1.pdf",
    gabarito: "pmespcabo2022_gabarito_definitivo.pdf",
    cargoGabarito: "Cabo PM",
    total: 60,
    alternativas: 4,
  },
  {
    slug: "pmesp-sargento-2024-fgv",
    orgao: "PMSP",
    ano: 2024,
    cargo: "Sargento PM",
    prova: "pm-sargentocnm001-tipo-1.pdf",
    gabarito: "pmesp-sargento-2024-gabaritos-para-publicacao.pdf",
    cargoGabarito: "PROVA TIPO 1",
    total: 60,
    alternativas: 4,
  },
  {
    slug: "pmac-oficial-combatente-2023-fgv",
    orgao: "PMAC",
    ano: 2023,
    cargo: "Aluno Oficial Combatente",
    prova: "cns101-aluno-oficial-combatentecns101-tipo-1.pdf",
    gabarito: "pmac2023-gabaritos-definitivo-final-para-publicacao-1.pdf",
    cargoGabarito: "Aluno Oficial Combatente",
    total: 60,
    alternativas: 5,
  },
  {
    slug: "pcrj-inspetor-2021-fgv",
    orgao: "PCRJ",
    ano: 2021,
    cargo: "Inspetor de Policia de 6a Classe",
    prova: "inspetor_de_policia_de_6a_classeinspetor_tipo_1_revisada.pdf",
    gabarito: "pcrj2021e1_gabarito_definitivo.pdf",
    cargoGabarito: "Inspetor de Polícia de 6ª Classe",
    total: 100,
    alternativas: 5,
  },
  {
    slug: "pcrj-investigador-2021-fgv",
    orgao: "PCRJ",
    ano: 2021,
    cargo: "Investigador Policial de 3a Classe",
    prova: "investigador_policial_de_3a_classeinvest_tipo_1_revisada.pdf",
    gabarito: "pcrj2021e2_gabarito_definitivo.pdf",
    cargoGabarito: "Investigador Policial de 3ª Classe",
    total: 100,
    alternativas: 5,
  },
  {
    slug: "pcrn-delegado-2021-fgv",
    orgao: "PCRN",
    ano: 2021,
    cargo: "Delegado de Policia Civil Substituto",
    prova: "pcrn-delegado-de-policia-civil-substituto-deleg-01-tipo-1.pdf",
    gabarito: "pcrn_gabarito_definitivo.pdf",
    cargoGabarito: "Delegado de Polícia Civil Substituto",
    total: 100,
    alternativas: 5,
  },
  {
    slug: "pcsc-delegado-2024-fgv",
    orgao: "PCSC",
    ano: 2024,
    cargo: "Delegado de Policia Substituto",
    prova: "delegado-objetivacns100-tipo-1.pdf",
    gabarito: "pcscdelegado2024_gabarito_definitivo_20240220.pdf",
    cargoGabarito: "Delegado de Polícia Substituto",
    total: 100,
    alternativas: 5,
  },
  {
    slug: "pcam-delegado-2021-fgv",
    orgao: "PCAM",
    ano: 2021,
    cargo: "Delegado de Policia - 4a Classe",
    prova: "ns001_-_delegado_de_policia_-_4a_classe_prova_objetivans001_tipo_1.pdf",
    gabarito: "pcam2021e01_gabarito_definitivo.pdf",
    cargoGabarito: "Delegado de Polícia - 4ª Classe",
    total: 100,
    alternativas: 5,
  },
];

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
    .replace(/\b(?:FGV Conhecimento|FGV)\s*$/i, "")
    .replace(/\b(?:Curso de Formação de Oficiais da PMERJ|Cabo PM|Concurso Público PMERJ 2021)\b\s*$/i, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function normalizeAnswer(value = "") {
  const raw = normalizeText(value);
  if (!raw) return "";
  if (raw === "*" || raw.includes("anulada")) return "anulada";
  return raw[0];
}

function safeId(value: string) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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

async function extractRawPdf(filePath: string) {
  const parser = new PDFParse({ data: await readFile(filePath) });
  try {
    return (await parser.getText()).text.replace(/\r/g, "");
  } finally {
    await parser.destroy();
  }
}

function sliceAnswerBlock(text: string, cargo: string) {
  const lines = text.split("\n");
  const target = normalizeText(cargo);
  const start = lines.findIndex((line) => normalizeText(line).includes(target) && normalizeText(line).includes("tipo 1"));
  if (start < 0) return "";
  const end = lines.findIndex((line, index) => index > start && /tipo\s*[234]/i.test(normalizeText(line)));
  return lines.slice(start, end > start ? end : undefined).join("\n");
}

function parseAnswers(text: string, total: number) {
  const map = new Map<number, string>();
  const lines = text.split(/\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
  const answerToken = /^(?:A|B|C|D|E|\*)$/i;

  for (let index = 0; index < lines.length; index += 1) {
    const numbers = (lines[index].match(/\b\d{1,3}\b/g) || [])
      .map(Number)
      .filter((number) => number > 0 && number <= total);
    if (numbers.length < 3) continue;

    const answers: string[] = [];
    for (let next = index + 1; next < Math.min(lines.length, index + 4) && answers.length < numbers.length; next += 1) {
      answers.push(...lines[next].split(/\s+/).filter((word) => answerToken.test(word)));
    }
    if (answers.length < numbers.length) continue;
    numbers.forEach((number, numberIndex) => {
      const answer = normalizeAnswer(answers[numberIndex]);
      if (answer) map.set(number, answer);
    });
  }

  return map;
}

function detectMatter(line: string, current: string) {
  const normalized = normalizeText(line);
  if (/lingua portuguesa|portugues|texto/i.test(normalized)) return "Portugues";
  if (/raciocinio logico/.test(normalized)) return "Matematica e Raciocinio Logico";
  if (/matematica|estatistica/.test(normalized)) return "Matematica";
  if (/informatica|tecnologia da informacao/.test(normalized)) return "Informatica";
  if (/direito constitucional/.test(normalized)) return "Direito Constitucional";
  if (/direito administrativo|administracao publica/.test(normalized)) return "Direito Administrativo";
  if (/direito penal militar|codigo penal militar|processo penal militar/.test(normalized)) return "Legislacao PM e Direito Militar";
  if (/processual penal|processo penal/.test(normalized)) return "Direito Processual Penal";
  if (/direito penal|codigo penal/.test(normalized)) return "Direito Penal";
  if (/direitos humanos/.test(normalized)) return "Direitos Humanos";
  if (/legislacao especial|lei maria|estatuto|abuso de autoridade|drogas|desarmamento|tortura/.test(normalized)) return "Legislacao Especial";
  if (/criminologia/.test(normalized)) return "Criminologia";
  if (/medicina legal/.test(normalized)) return "Medicina Legal";
  if (/contabilidade/.test(normalized)) return "Contabilidade";
  if (/conhecimentos gerais|atualidades|historia|geografia/.test(normalized)) return "Historia, Geografia e Atualidades";
  return current;
}

function difficultyForQuestion(materia: string, text: string) {
  const normalizedMatter = normalizeText(materia);
  const normalizedText = normalizeText(text);
  if (normalizedMatter.includes("raciocinio") && /(proposicional|equivalent|negacao|argument|silog|sentenca|conectivo|tabela verdade|condicional)/.test(normalizedText)) return "dificil";
  if (normalizedMatter.includes("matematica") && /(probabilidade|combinatoria|combinacao|arranjo|permutacao|juros compostos|estatistica|desvio|progressao|pa|pg)/.test(normalizedText)) return "dificil";
  return "medio";
}

function splitQuestionBlocks(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const blocks: Array<{ number: number; body: string; materia: string }> = [];
  let current: { number: number; lines: string[]; materia: string } | null = null;
  let currentMatter = "Conhecimentos Gerais";
  let pendingContext: string[] = [];
  let seenFirstQuestion = false;

  for (const line of lines) {
    if (/^-- .* --$/.test(line) || /^p[áa]gina\s+\d+/i.test(line)) continue;
    currentMatter = detectMatter(line, currentMatter);

    const marker = line.match(/^0?([1-9]\d?|100)$/);
    if (marker) {
      if (current) blocks.push({ number: current.number, body: current.lines.join("\n"), materia: current.materia });
      const pending = pendingContext.join(" ");
      const hasTextBase = /(aten[cç][aã]o|texto a seguir|leia o texto|fragmento|dispon[ií]vel em|adaptado|jus\.com|fonte:|“|”)/i.test(pending);
      const context = !seenFirstQuestion && hasTextBase ? pendingContext.slice(-18) : [];
      current = { number: Number(marker[1]), lines: [...context], materia: currentMatter };
      pendingContext = [];
      seenFirstQuestion = true;
      continue;
    }

    const inline = line.match(/^0?([1-9]\d?|100)\s+(.{10,})$/);
    if (inline && !/[A-E]\)/.test(line.slice(0, 8))) {
      if (current) blocks.push({ number: current.number, body: current.lines.join("\n"), materia: current.materia });
      current = { number: Number(inline[1]), lines: [inline[2]], materia: currentMatter };
      seenFirstQuestion = true;
      pendingContext = [];
      continue;
    }

    if (current) current.lines.push(line);
    else pendingContext.push(line);
  }

  if (current) blocks.push({ number: current.number, body: current.lines.join("\n"), materia: current.materia });
  return blocks;
}

function extractQuestions(exam: LocalExam, proofText: string, answers: Map<number, string>, duplicateKeys: Set<string>) {
  const valid: LocalQuestion[] = [];
  const discarded: Record<string, number> = {};
  const blocks = splitQuestionBlocks(proofText);
  const seen = new Set<number>();
  const letters = exam.alternativas === 5 ? ["A", "B", "C", "D", "E"] : ["A", "B", "C", "D"];

  function discard(reason: string) {
    discarded[reason] = (discarded[reason] || 0) + 1;
  }

  for (const block of blocks) {
    if (block.number > exam.total || seen.has(block.number)) continue;
    seen.add(block.number);
    const answer = answers.get(block.number);
    if (!answer) {
      discard("sem_gabarito");
      continue;
    }
    if (answer === "anulada") continue;

    const markers = [...block.body.matchAll(/(?:^|\n|\s)\(([A-Ea-e])\)\s+/g)];
    const uniqueMarkers = markers
      .filter((marker, index, list) => list.findIndex((item) => item[1].toUpperCase() === marker[1].toUpperCase()) === index)
      .filter((marker) => letters.includes(marker[1].toUpperCase()))
      .slice(0, exam.alternativas);

    if (uniqueMarkers.length !== exam.alternativas) {
      discard(`alternativas_${uniqueMarkers.length || 0}`);
      continue;
    }
    if (!letters.map((letter) => letter.toLowerCase()).includes(answer)) {
      discard("gabarito_fora_das_alternativas");
      continue;
    }

    const alternatives = uniqueMarkers.map((marker, index) => {
      const letra = marker[1].toUpperCase();
      const start = (marker.index || 0) + marker[0].length;
      const end = index + 1 < uniqueMarkers.length ? uniqueMarkers[index + 1].index || block.body.length : block.body.length;
      return { letra, texto: cleanText(block.body.slice(start, end)) };
    });
    if (alternatives.some((alternative) => !alternative.texto)) {
      discard("alternativa_vazia");
      continue;
    }

    const first = uniqueMarkers[0].index || 0;
    const enunciado = cleanText(block.body.slice(0, first));
    if (!enunciado) {
      discard("enunciado_vazio");
      continue;
    }

    const duplicateKey = makeDuplicateKey(enunciado, alternatives);
    const duplicate = duplicateKeys.has(duplicateKey);
    if (duplicate) {
      discard("duplicada_existente");
      continue;
    }
    duplicateKeys.add(duplicateKey);

    const id = `${exam.slug}-q${String(block.number).padStart(3, "0")}`;
    valid.push({
      id,
      codigo: id.toUpperCase(),
      orgao: exam.orgao,
      ano: exam.ano,
      cargo: exam.cargo,
      banca: "FGV",
      numero: block.number,
      materia: block.materia,
      materia_original: block.materia,
      topico: `${exam.orgao} ${exam.cargo} ${exam.ano} - Q${block.number}`,
      dificuldade: difficultyForQuestion(block.materia, enunciado),
      enunciado,
      alternativas: alternatives,
      gabarito: answer,
      origem: "oficial",
      duplicate,
    });
  }

  const extractedNumbers = new Set(blocks.map((block) => block.number).filter((number) => number <= exam.total));
  const missingBlocks = exam.total - extractedNumbers.size;
  if (missingBlocks > 0) discarded.bloco_nao_extraido = (discarded.bloco_nao_extraido || 0) + missingBlocks;
  return { valid, discarded };
}

function makeDuplicateKey(enunciado: string, alternatives: Array<{ letra: string; texto: string }>) {
  return normalizeText([enunciado, ...alternatives.map((alternative) => alternative.texto)].join(" "));
}

async function getExistingDuplicateKeys() {
  const keys = new Set<string>();
  try {
    const publicQuestions = JSON.parse(await readFile(path.resolve(process.cwd(), "public", "questoes", "militar.json"), "utf-8")) as any[];
    for (const question of publicQuestions) {
      const alternatives = question.alternativas || ["a", "b", "c", "d", "e"].map((letter) => ({ texto: question[`alternativa_${letter}`] || "" }));
      keys.add(makeDuplicateKey(question.enunciado || question.afirmacao || "", alternatives));
    }
  } catch {
    // public file is optional for this preview miner
  }

  const rawUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !serviceKey) return keys;

  const endpoint = `${rawUrl.replace(/\/$/, "")}/rest/v1/questoes`;
  for (let offset = 0; ; offset += 1000) {
    const response = await fetch(`${endpoint}?select=enunciado,alternativa_a,alternativa_b,alternativa_c,alternativa_d,alternativa_e&limit=1000&offset=${offset}`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    });
    if (!response.ok) break;
    const rows = await response.json();
    for (const row of rows) {
      keys.add(makeDuplicateKey(row.enunciado || "", [
        { letra: "A", texto: row.alternativa_a || "" },
        { letra: "B", texto: row.alternativa_b || "" },
        { letra: "C", texto: row.alternativa_c || "" },
        { letra: "D", texto: row.alternativa_d || "" },
        { letra: "E", texto: row.alternativa_e || "" },
      ]));
    }
    if (rows.length < 1000) break;
  }

  return keys;
}

function countByMatter(questions: LocalQuestion[]) {
  return questions.reduce<Record<string, number>>((acc, question) => {
    acc[question.materia] = (acc[question.materia] || 0) + 1;
    return acc;
  }, {});
}

async function main() {
  const duplicateKeys = await getExistingDuplicateKeys();
  const allQuestions: LocalQuestion[] = [];
  const report = [];

  for (const exam of EXAMS) {
    const proofPath = path.join(ROOT, exam.prova);
    const answerPath = path.join(ROOT, exam.gabarito);
    const [proofText, answerText] = await Promise.all([extractColumnsPdf(proofPath), extractRawPdf(answerPath)]);
    const answerBlock = sliceAnswerBlock(answerText, exam.cargoGabarito);
    const answers = parseAnswers(answerBlock, exam.total);
    const anuladas = [...answers.values()].filter((answer) => answer === "anulada").length;
    const { valid, discarded } = extractQuestions(exam, proofText, answers, duplicateKeys);
    allQuestions.push(...valid);
    report.push({
      slug: exam.slug,
      orgao: exam.orgao,
      ano: exam.ano,
      cargo: exam.cargo,
      prova: exam.prova,
      gabarito: exam.gabarito,
      cargoGabarito: exam.cargoGabarito,
      totalEsperado: exam.total,
      alternativasEsperadas: exam.alternativas,
      gabaritosLidos: answers.size,
      validas: valid.length,
      anuladas,
      descartadas: Math.max(exam.total - valid.length - anuladas, 0),
      motivosDescarte: discarded,
      porMateria: countByMatter(valid),
    });
  }

  const samples = allQuestions.slice(0, 3);
  await mkdir(OUT_ROOT, { recursive: true });
  await writeFile(QUESTIONS_PATH, JSON.stringify(allQuestions, null, 2), "utf-8");
  await writeFile(REPORT_PATH, JSON.stringify({ report, samples }, null, 2), "utf-8");

  console.log(JSON.stringify({ report, samples }, null, 2));
  console.log("Supabase nao atualizado. Este minerador local gera apenas JSON de previa.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
