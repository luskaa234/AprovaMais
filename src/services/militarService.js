import { normalize } from "../utils";

let cache = null;

const DEFAULT_DISCIPLINES = [
  "Portugues",
  "Matematica e Raciocinio Logico",
  "Informatica",
  "Atualidades",
  "Direito Constitucional",
  "Direito Administrativo",
  "Direito Penal",
  "Direitos Humanos",
];

async function fetchJson(path, fallback = []) {
  try {
    const response = await fetch(path);
    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}

function group(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    if (!key) return acc;
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function byCount(entries) {
  return Object.entries(entries)
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
}

function mapQuestion(question = {}) {
  const alternatives = Array.isArray(question.alternativas)
    ? question.alternativas
    : ["a", "b", "c", "d", "e"].map((letter) => ({ letra: letter.toUpperCase(), texto: question[`alternativa_${letter}`] })).filter((item) => item.texto);
  return {
    ...question,
    alternatives,
    examSlug: `${normalize(question.orgao || question.concurso).replace(/\s+/g, "-")}-${normalize(question.cargo || "soldado").replace(/\s+/g, "-")}-${question.ano}-${normalize(question.banca).replace(/\s+/g, "-")}`,
    official: normalize(question.origem).includes("oficial"),
  };
}

function buildStats(materials, questions, report) {
  const validReport = report.filter((item) => item.status !== "previsto");
  return {
    totalExams: materials.length || validReport.length,
    totalQuestions: questions.length,
    totalOfficial: questions.filter((item) => item.official).length,
    pending: report.filter((item) => item.motivo && item.motivo !== "ok").length,
    topDisciplines: byCount(countBy(questions, (item) => item.materia)).slice(0, 8),
    topBanks: byCount(countBy(questions, (item) => item.banca)).slice(0, 6),
    report,
  };
}

function buildDisciplines(questions) {
  const byDiscipline = group(questions, (item) => item.materia);
  const names = [...new Set([...DEFAULT_DISCIPLINES, ...Object.keys(byDiscipline)])];
  return names.map((name) => ({ name, questionCount: byDiscipline[name]?.length || 0, questions: byDiscipline[name] || [] }));
}

function buildAssets(stats, user) {
  const difficulties = Array.isArray(user?.difficulties) ? user.difficulties : [];
  const priority = [...difficulties, ...stats.topDisciplines.map((item) => item.label)]
    .filter(Boolean)
    .filter((item, index, array) => array.findIndex((current) => normalize(current) === normalize(item)) === index)
    .slice(0, 6);

  return {
    priority,
    simulations: [
      { title: "Simulado PM", detail: "Blocos oficiais por banca, cargo e disciplina." },
      { title: "Certo/Errado Cebraspe", detail: "Treino separado para PMMA, bombeiros e provas CESPE/Cebraspe." },
      { title: "Vunesp A-E", detail: "Simulados de Soldado com cinco alternativas e gabarito definitivo." },
    ],
    plan: [
      "Comece por Portugues e Matematica nos dias de maior energia.",
      "Resolva questoes oficiais da banca escolhida antes de ineditas.",
      "Separe erros por disciplina e revise em 24 horas.",
      "Inclua TAF no cronograma quando o objetivo for PM/Bombeiros.",
    ],
  };
}

export const militarService = {
  async getKnowledgeBase(user) {
    if (cache) return { ...cache, assets: buildAssets(cache.stats, user) };

    const [rawMaterials, rawQuestions, report] = await Promise.all([
      fetchJson("/materiais/militar-manifest.json"),
      fetchJson("/questoes/militar.json"),
      fetchJson("/questoes/militar-extraction-report.json"),
    ]);

    const questions = rawQuestions.map(mapQuestion);
    const materials = rawMaterials;
    const disciplines = buildDisciplines(questions);
    const stats = buildStats(materials, questions, report);

    cache = { materials, questions, disciplines, stats };
    return { ...cache, assets: buildAssets(stats, user) };
  },
};
