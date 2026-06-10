import { normalize } from "../utils";

const OAB_DISCIPLINES = [
  "Etica Profissional",
  "Filosofia do Direito",
  "Direito Constitucional",
  "Direito Administrativo",
  "Direito Civil",
  "Processo Civil",
  "Direito Penal",
  "Processo Penal",
  "Direito do Trabalho",
  "Processo do Trabalho",
  "Direito Tributario",
  "Direito Empresarial",
  "Direitos Humanos",
  "Direito Internacional",
  "Direito Ambiental",
  "ECA",
  "Direito do Consumidor",
  "Direito Eleitoral",
  "Direito Financeiro",
  "Direito Digital",
  "Direito Previdenciario",
];

const SECOND_PHASE_AREAS = [
  "Direito Administrativo",
  "Direito Civil",
  "Direito Constitucional",
  "Direito do Trabalho",
  "Direito Empresarial",
  "Direito Penal",
  "Direito Tributario",
];

let cache = null;

function cleanText(value = "") {
  return String(value)
    .replace(/Âº/g, "º")
    .replace(/Âª/g, "ª")
    .replace(/Ã¡/g, "á")
    .replace(/Ã©/g, "é")
    .replace(/Ã­/g, "í")
    .replace(/Ã³/g, "ó")
    .replace(/Ãº/g, "ú")
    .replace(/Ã£/g, "ã")
    .replace(/Ãµ/g, "õ")
    .replace(/Ã§/g, "ç")
    .replace(/Ãª/g, "ê")
    .replace(/Ã¢/g, "â")
    .replace(/Ã /g, "à")
    .replace(/\s+/g, " ")
    .trim();
}

function examFromPath(sourcePath = "") {
  const match = String(sourcePath).match(/oab\/([^/]+)-exame/i);
  if (!match) return null;
  const slug = `${match[1]}-exame`;
  const raw = match[1];
  const isYear = raw.startsWith("2010-");
  return {
    slug,
    number: isYear ? 0 : Number(raw),
    label: isYear ? raw.replace("-", ".") : `${Number(raw)}º Exame`,
    order: isYear ? Number(`0.${raw.split("-")[1] || "0"}`) : Number(raw),
  };
}

function questionExam(question = {}) {
  const match = String(question.id || question.codigo || "").match(/oab-(.*?)-t/i);
  if (!match) return null;
  const raw = match[1];
  return {
    slug: `${raw}-exame`,
    number: Number(raw),
    label: `${Number(raw)}º Exame`,
    order: Number(raw),
  };
}

function materialCategory(material = {}) {
  const title = normalize(material.titulo);
  const sourcePath = normalize(material.sourcePath);
  if (sourcePath.includes("/gabaritos/") || title.includes("gabarito")) return "Gabaritos";
  if (title.includes("espelho")) return "Espelhos de Correcao";
  if (title.includes("peca") || title.includes("pratico-profissional")) return "Pecas Pratico-Profissionais";
  if (sourcePath.includes("/segunda-fase/") || title.includes("padrao de resposta")) return "Segunda Fase";
  if (sourcePath.includes("/provas/") && title.match(/direito|tributario|penal|civil|trabalho|constitucional|administrativo|empresarial/)) return "Segunda Fase";
  return "Primeira Fase";
}

function secondPhaseArea(material = {}) {
  const title = normalize(material.titulo);
  const file = normalize(material.sourcePath);
  return SECOND_PHASE_AREAS.find((area) => {
    const normalizedArea = normalize(area);
    if (title.includes(normalizedArea) || file.includes(normalizedArea.replace(/\s+/g, "-"))) return true;
    if (area === "Direito Tributario" && (title.includes("tributario") || file.includes("tributario"))) return true;
    if (area === "Direito Empresarial" && (title.includes("empresarial") || file.includes("empresarial"))) return true;
    return false;
  }) || "Area nao identificada";
}

function secondPhaseKind(material = {}) {
  const title = normalize(material.titulo);
  if (title.includes("espelho")) return "Espelho de correcao";
  if (title.includes("padrao")) return title.includes("definitivo") ? "Padrao definitivo" : "Padrao preliminar";
  if (title.includes("peca") || title.includes("pratico-profissional")) return "Peca pratico-profissional";
  if (title.includes("caderno") || title.includes("prova")) return "Caderno de prova";
  return "Material de 2a fase";
}

function phaseFromMaterial(material = {}) {
  const category = materialCategory(material);
  return category === "Primeira Fase" || category === "Gabaritos" ? "1a fase" : "2a fase";
}

function mapMaterial(material) {
  const exam = examFromPath(material.sourcePath);
  return {
    ...material,
    titulo: cleanText(material.titulo),
    descricao: cleanText(material.descricao),
    exam,
    category: materialCategory(material),
    phase: phaseFromMaterial(material),
    secondPhaseArea: secondPhaseArea(material),
    secondPhaseKind: secondPhaseKind(material),
  };
}

function mapQuestion(question) {
  const exam = questionExam(question);
  const number = String(question.codigo || question.id || "").match(/q(\d+)$/i)?.[1] || "";
  return {
    ...question,
    enunciado: cleanText(question.enunciado),
    materia: cleanText(question.materia),
    topico: cleanText(question.topico),
    comentario: cleanText(question.comentario),
    exam,
    phase: "1a fase",
    number: number ? Number(number) : null,
  };
}

function byCount(entries) {
  return Object.entries(entries)
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
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

function buildExams(materials, questions, officialExams = []) {
  const map = new Map();
  officialExams.forEach((exam) => {
    map.set(exam.slug, {
      slug: exam.slug,
      number: exam.slug.startsWith("2010") ? 0 : Number(String(exam.slug).split("-")[0]),
      label: cleanText(exam.label || exam.title),
      order: Number(exam.order || 0),
      sourceUrl: exam.sourceUrl,
      materials: [],
      questions: [],
    });
  });

  [...materials.map((item) => item.exam), ...questions.map((item) => item.exam)].filter(Boolean).forEach((exam) => {
    if (!map.has(exam.slug)) map.set(exam.slug, { ...exam, materials: [], questions: [] });
  });

  materials.forEach((material) => {
    if (material.exam) map.get(material.exam.slug)?.materials.push(material);
  });
  questions.forEach((question) => {
    if (question.exam) map.get(question.exam.slug)?.questions.push(question);
  });

  return [...map.values()]
    .map((exam) => ({
      ...exam,
      categories: group(exam.materials, (item) => item.category),
      questionCount: exam.questions.length,
      materialCount: exam.materials.length,
    }))
    .sort((a, b) => b.order - a.order);
}

function buildDisciplines(questions, materials) {
  const questionGroups = group(questions, (item) => item.materia);
  const materialGroups = group(materials, (item) => {
    const title = normalize(item.titulo);
    return OAB_DISCIPLINES.find((discipline) => title.includes(normalize(discipline)));
  });

  return OAB_DISCIPLINES.map((name) => ({
    name,
    questions: questionGroups[name] || [],
    materials: materialGroups[name] || [],
    questionCount: (questionGroups[name] || []).length,
    materialCount: (materialGroups[name] || []).length,
  })).filter((item) => item.questionCount || item.materialCount);
}

function buildStats(exams, disciplines, questions, materials) {
  const disciplineCounts = disciplines.reduce((acc, discipline) => ({ ...acc, [discipline.name]: discipline.questionCount }), {});
  const categoryCounts = materials.reduce((acc, item) => ({ ...acc, [item.category]: (acc[item.category] || 0) + 1 }), {});
  const trend = exams
    .filter((exam) => exam.questionCount)
    .slice(0, 10)
    .map((exam) => ({
      label: exam.label,
      questions: exam.questionCount,
      mainDiscipline: byCount(countBy(exam.questions, (item) => item.materia)).at(0)?.label || "Sem dados",
    }));

  return {
    totalExams: exams.length,
    totalMaterials: materials.length,
    totalQuestions: questions.length,
    topDisciplines: byCount(disciplineCounts).slice(0, 8),
    topCategories: byCount(categoryCounts),
    trend,
    recentTrend: trend.slice(0, 5),
  };
}

function buildSecondPhase(materials, user) {
  const materials2 = materials.filter((item) => item.phase === "2a fase");
  const byArea = group(materials2, (item) => item.secondPhaseArea);
  const byKind = countBy(materials2, (item) => item.secondPhaseKind);
  const selectedArea = user?.oabArea || user?.oabSecondPhaseArea || "";
  const normalizedSelected = normalize(selectedArea);
  const preferredArea =
    SECOND_PHASE_AREAS.find((area) => normalize(area).includes(normalizedSelected) || normalizedSelected.includes(normalize(area))) ||
    SECOND_PHASE_AREAS.find((area) => byArea[area]?.length) ||
    SECOND_PHASE_AREAS[0];

  const areas = SECOND_PHASE_AREAS.map((area) => {
    const rows = byArea[area] || [];
    return {
      name: area,
      total: rows.length,
      cadernos: rows.filter((item) => item.secondPhaseKind === "Caderno de prova").length,
      padroes: rows.filter((item) => item.secondPhaseKind.includes("Padrao")).length,
      espelhos: rows.filter((item) => item.secondPhaseKind === "Espelho de correcao").length,
      materials: rows,
    };
  });

  const recentExams = [...new Set(materials2.map((item) => item.exam?.label).filter(Boolean))].slice(0, 8);
  const plan = [
    "1 peca completa por semana com estrutura, fundamentos e pedidos.",
    "2 questoes discursivas por ciclo, sempre corrigidas pelo padrao oficial.",
    "Comparar sua resposta com o padrao definitivo e registrar omissoes.",
    "Revisar modelos de peca da area escolhida antes de cada novo treino.",
  ];

  return {
    total: materials2.length,
    areas,
    kinds: byCount(byKind),
    selectedArea: preferredArea,
    selectedMaterials: byArea[preferredArea] || [],
    recentExams,
    plan,
  };
}

function buildStudyAssets(stats, disciplines, user) {
  const weakSubjects = Array.isArray(user?.difficulties) ? user.difficulties : [];
  const priority = [...weakSubjects, ...stats.topDisciplines.map((item) => item.label)]
    .filter(Boolean)
    .filter((item, index, array) => array.findIndex((current) => normalize(current) === normalize(item)) === index)
    .slice(0, 6);

  const simulations = [
    { title: "Simulado OAB 1a fase", detail: "80 questoes oficiais FGV/OAB, com correcao por disciplina." },
    { title: "Bloco por disciplina", detail: "20 questoes da materia escolhida para treino objetivo." },
    { title: "Revisao de erros", detail: "Questoes erradas voltam em blocos curtos ate consolidar." },
  ];

  const flashcards = priority.slice(0, 5).map((subject) => ({
    front: subject,
    back: `Revise conceitos centrais, excecoes e pegadinhas recorrentes em ${subject}.`,
  }));

  const summaries = stats.topDisciplines.slice(0, 5).map((item) => ({
    title: item.label,
    text: `${item.total} questoes extraidas ate agora. Priorize lei seca, questoes oficiais e revisao dos erros.`,
  }));

  const hours = Number(user?.hoursPerDay || user?.horasSemanais / 5 || 2) || 2;
  const plan = [
    `${Math.max(30, Math.round(hours * 25))} min de teoria dirigida`,
    `${Math.max(20, Math.round(hours * 12))} questoes oficiais por dia`,
    "Revisao dos erros no dia seguinte",
    "1 simulado completo por semana quando houver 4h livres",
  ];

  return { priority, simulations, flashcards, summaries, plan, disciplines };
}

async function fetchJson(path, fallback = []) {
  try {
    const response = await fetch(path);
    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}

export const oabService = {
  async getKnowledgeBase(user) {
    if (cache) return { ...cache, assets: buildStudyAssets(cache.stats, cache.disciplines, user) };

    const [rawMaterials, rawQuestions, rawExams] = await Promise.all([
      fetchJson("/materiais/oab-manifest.json"),
      fetchJson("/questoes/oab.json"),
      fetchJson("/materiais/oab-exams.json"),
    ]);

    const materials = rawMaterials.map(mapMaterial);
    const questions = rawQuestions.map(mapQuestion);
    const exams = buildExams(materials, questions, rawExams);
    const disciplines = buildDisciplines(questions, materials);
    const stats = buildStats(exams, disciplines, questions, materials);
    const secondPhase = buildSecondPhase(materials, user);

    cache = { materials, questions, exams, disciplines, stats, secondPhase };
    return { ...cache, secondPhase: buildSecondPhase(materials, user), assets: buildStudyAssets(stats, disciplines, user) };
  },
};
