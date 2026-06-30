import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type PreviewQuestion = {
  id: string;
  codigo: string;
  orgao: string;
  ano: number;
  cargo: string;
  banca: string;
  numero: number;
  materia: string;
  materia_original: string;
  topico: string;
  dificuldade: string;
  enunciado: string;
  alternativas: Array<{ letra: string; texto: string }>;
  gabarito: string;
  origem: string;
};

const PREVIEW_PATH = path.resolve(process.cwd(), "storage", "content", "fgv-local", "fgv-local-preview.json");
const REPORT_PATH = path.resolve(process.cwd(), "storage", "content", "fgv-local", "fgv-local-report.json");
const PUBLIC_QUESTIONS_PATH = path.resolve(process.cwd(), "public", "questoes", "militar.json");
const PUBLIC_MANIFEST_PATH = path.resolve(process.cwd(), "public", "materiais", "militar-manifest.json");
const PUBLIC_REPORT_PATH = path.resolve(process.cwd(), "public", "questoes", "militar-extraction-report.json");
const STORAGE_ROOT = path.resolve(process.cwd(), "storage", "content", "militar");

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function duplicateKey(question: any) {
  const alternatives = Array.isArray(question.alternativas)
    ? question.alternativas
    : ["a", "b", "c", "d", "e"].map((letter) => ({ texto: question[`alternativa_${letter}`] || "" }));
  return normalizeText([question.enunciado || question.afirmacao || "", ...alternatives.map((item: any) => item.texto || "")].join(" "));
}

function toOfficialQuestion(question: PreviewQuestion) {
  return {
    id: question.id,
    codigo: question.codigo,
    orgao: question.orgao,
    cargo: question.cargo,
    ano: question.ano,
    banca: question.banca,
    formato: "multipla_escolha",
    numero: question.numero,
    materia: question.materia,
    materia_original: question.materia_original,
    dificuldade: question.dificuldade,
    enunciado: question.enunciado,
    alternativas: question.alternativas,
    afirmacao: "",
    gabarito: question.gabarito,
    anulada: false,
    origem: "oficial",
    banca_selo: question.banca,
    concurso: question.orgao,
    comentario: `Questao oficial ${question.orgao} ${question.cargo} ${question.ano}. Banca: ${question.banca}. Gabarito definitivo: ${question.gabarito.toUpperCase()}. Origem: oficial. Materia original: ${question.materia_original}.`,
  };
}

function toDbRow(question: ReturnType<typeof toOfficialQuestion>) {
  const alternatives = Object.fromEntries(question.alternativas.map((item) => [`alternativa_${item.letra.toLowerCase()}`, item.texto]));
  return {
    id: question.id,
    codigo: question.codigo,
    banca: question.banca,
    materia: question.materia,
    topico: `${question.orgao} ${question.cargo} ${question.ano} - Q${question.numero}`,
    dificuldade: question.dificuldade,
    enunciado: question.enunciado,
    alternativa_a: alternatives.alternativa_a || "",
    alternativa_b: alternatives.alternativa_b || "",
    alternativa_c: alternatives.alternativa_c || "",
    alternativa_d: alternatives.alternativa_d || "",
    alternativa_e: alternatives.alternativa_e || "",
    gabarito: question.gabarito,
    comentario: question.comentario,
    concurso: question.orgao,
  };
}

async function saveToSupabase(questions: Array<ReturnType<typeof toOfficialQuestion>>) {
  const rawUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !serviceKey) throw new Error("Supabase URL/service key ausente na .env");
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
    if (!response.ok) throw new Error(`Supabase upsert falhou: ${response.status} ${await response.text()}`);
  }
}

async function main() {
  const shouldPush = process.argv.includes("--push-supabase");
  const preview = JSON.parse(await readFile(PREVIEW_PATH, "utf-8")) as PreviewQuestion[];
  const previewReport = JSON.parse(await readFile(REPORT_PATH, "utf-8"));
  const currentQuestions = JSON.parse(await readFile(PUBLIC_QUESTIONS_PATH, "utf-8")) as any[];
  const currentManifest = JSON.parse(await readFile(PUBLIC_MANIFEST_PATH, "utf-8")) as any[];
  const currentReport = JSON.parse(await readFile(PUBLIC_REPORT_PATH, "utf-8")) as any[];

  const knownIds = new Set(currentQuestions.map((question) => question.id));
  const knownKeys = new Set(currentQuestions.map(duplicateKey));
  const promoted = preview
    .map(toOfficialQuestion)
    .filter((question) => !knownIds.has(question.id) && !knownKeys.has(duplicateKey(question)));

  const mergedQuestions = [...currentQuestions, ...promoted].sort((a, b) => {
    const orgao = String(a.orgao || "").localeCompare(String(b.orgao || ""));
    if (orgao) return orgao;
    const year = Number(a.ano || 0) - Number(b.ano || 0);
    if (year) return year;
    return String(a.id || "").localeCompare(String(b.id || ""));
  });

  const reportBySlug = new Map(previewReport.report.map((item: any) => [item.slug, item]));
  const materialSlugs = new Set(currentManifest.map((item) => item.id));
  const reportSlugs = new Set(currentReport.map((item) => item.slug));
  const newMaterials = [];
  const newReports = [];

  for (const item of previewReport.report) {
    if (!materialSlugs.has(item.slug)) {
      newMaterials.push({
        id: item.slug,
        titulo: `${item.orgao} ${item.cargo} ${item.ano}`,
        tipo: "Prova militar oficial",
        categoria: item.alternativasEsperadas === 4 ? "Multipla escolha A-D" : "Multipla escolha",
        orgao: item.orgao,
        cargo: item.cargo,
        ano: item.ano,
        banca: "FGV",
        slug: item.slug,
        sourcePath: `storage/content/militar/${item.slug}`,
      });
    }
    if (!reportSlugs.has(item.slug)) {
      newReports.push({
        slug: item.slug,
        orgao: item.orgao,
        cargo: item.cargo,
        ano: item.ano,
        banca: "FGV",
        status: "ativo",
        extraidas: item.validas + item.anuladas,
        validas: item.validas,
        anuladas: item.anuladas,
        descartadas: item.descartadas,
        motivo: "ok",
      });
    }
  }

  await writeFile(PUBLIC_QUESTIONS_PATH, JSON.stringify(mergedQuestions, null, 2), "utf-8");
  await writeFile(PUBLIC_MANIFEST_PATH, JSON.stringify([...currentManifest, ...newMaterials], null, 2), "utf-8");
  await writeFile(PUBLIC_REPORT_PATH, JSON.stringify([...currentReport, ...newReports], null, 2), "utf-8");

  const promotedBySlug = new Map<string, ReturnType<typeof toOfficialQuestion>[]>();
  for (const question of promoted) {
    const slug = question.id.replace(/-q\d+$/, "");
    const items = promotedBySlug.get(slug) || [];
    items.push(question);
    promotedBySlug.set(slug, items);
  }

  for (const [slug, questions] of promotedBySlug) {
    const report = reportBySlug.get(slug) as any;
    const root = path.join(STORAGE_ROOT, slug);
    await mkdir(path.join(root, "questoes"), { recursive: true });
    await writeFile(path.join(root, "questoes", "questoes-extraidas.json"), JSON.stringify(questions, null, 2), "utf-8");
    await writeFile(path.join(root, "metadata.json"), JSON.stringify({
      exame: `${report.orgao} ${report.cargo} ${report.ano}`,
      banca: "FGV",
      ano: report.ano,
      cargo: report.cargo,
      total_questoes: report.totalEsperado,
      fonte: "Oficial FGV local",
      sourceUrl: `material-provas/fgv/provas PM/${report.prova}`,
      gabarito: "definitivo",
      origem: "oficial",
      files: [
        { title: "Prova oficial", type: "prova", path: `material-provas/fgv/provas PM/${report.prova}` },
        { title: "Gabarito definitivo", type: "gabarito", path: `material-provas/fgv/provas PM/${report.gabarito}` },
      ],
    }, null, 2), "utf-8");
  }

  if (shouldPush && promoted.length) await saveToSupabase(promoted);

  const byExam = [...promotedBySlug.entries()].map(([slug, questions]) => ({ slug, validas: questions.length }));
  const byMatter = promoted.reduce<Record<string, number>>((acc, question) => {
    acc[question.materia] = (acc[question.materia] || 0) + 1;
    return acc;
  }, {});

  console.log(JSON.stringify({
    promoted: promoted.length,
    skippedExisting: preview.length - promoted.length,
    supabaseUpdated: shouldPush,
    byExam,
    byMatter,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
