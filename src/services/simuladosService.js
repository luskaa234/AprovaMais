import { mockSimulados } from "../data";
import { groupCount } from "../utils";

function formatOfficialTestName(title = "") {
  const cleaned = String(title)
    .replace(/\.(pdf|docx?|xlsx?)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ");
  const knownBoards = ["IBFC", "VUNESP", "FGV", "CEBRASPE", "AOCP", "CESPE", "FCC"];
  const banca = knownBoards.includes(words[0]?.toUpperCase()) ? words[0].toUpperCase() : "";
  const year = words.find((word) => /^\d{4}$/.test(word));
  const rest = words
    .filter((word, index) => (!banca || index !== 0) && word !== year && !["prova", "tipo", "001", "01"].includes(word.toLowerCase()))
    .map((word) => {
      const upper = word.toUpperCase();
      if (["PM", "PB", "PF", "PRF", "TJ", "RJ", "SP", "PC", "DF"].includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  if (banca || year) return [banca, year].filter(Boolean).join(" ") + (rest ? ` · ${rest}` : "");
  return rest || cleaned;
}

function normalizeQuestion(question = {}, index = 0, template = {}) {
  const fallbackGabarito = ["a", "b", "c", "d"][index % 4];
  const gabarito = String(question.gabarito || question.respostaCorreta || fallbackGabarito).toLowerCase();
  const alternativas = Array.isArray(question.alternativas) && question.alternativas.length
    ? question.alternativas.map((item, altIndex) => {
      const id = String(item.id || item.letra || ["a", "b", "c", "d"][altIndex]).toLowerCase();
      return { id, letra: id.toUpperCase(), texto: item.texto || item.label || item, correta: id === gabarito };
    })
    : ["A", "B", "C", "D"].map((letra, altIndex) => {
      const id = letra.toLowerCase();
      return { id, letra, texto: `Alternativa ${letra} padronizada para o simulado.`, correta: id === gabarito };
    });

  return {
    id: question.id || `${template.id || "simulado"}-${index + 1}`,
    enunciado: question.enunciado || `Questao ${index + 1}. Em ${question.materia || "Conhecimentos gerais"}, analise o enunciado e escolha a alternativa correta conforme a banca.`,
    alternativas,
    gabarito,
    comentario: question.comentario || "Comentario ainda nao disponivel para esta questao.",
    materia: question.materia || "Conhecimentos gerais",
    assunto: question.assunto || question.topico || question.materia || "Assunto geral",
    banca: question.banca || template.banca || "Banca nao informada",
    dificuldade: question.dificuldade || question.nivel || "medio",
    nivel: question.nivel || question.dificuldade || "medio",
    concurso: question.concurso || template.concurso || template.nome || "Concurso relacionado",
  };
}

function normalizeTemplate(template = {}) {
  return {
    ...template,
    questoes: (template.questoes || []).map((questao, index) => normalizeQuestion(questao, index, template)),
  };
}

async function getOfficialTests() {
  try {
    const response = await fetch("/materiais/manifest.json");
    if (!response.ok) return [];
    const manifest = await response.json();
    const baseQuestoes = mockSimulados[0]?.questoes || [];
    return manifest
      .filter((item) => item.categoria === "Provas")
      .map((item, index) => ({
        id: `prova-${item.id}`,
        modo: "Prova oficial",
        nome: formatOfficialTestName(item.titulo),
        tempoMinutos: 180,
        mediaTurma: 68 + (index % 8),
        materialUrl: item.url,
        questoes: baseQuestoes.map((questao, qIndex) => normalizeQuestion(questao, qIndex, { id: `prova-${item.id}`, nome: item.titulo, concurso: item.titulo })),
      }));
  } catch {
    return [];
  }
}

/**
 * Future REST contract:
 * GET /simulados/templates
 * POST /simulados/iniciar
 * PUT /simulados/:id/responder
 * POST /simulados/:id/finalizar
 * GET /simulados/:id/resultado
 */
export const simuladosService = {
  async getTemplates() {
    return [...(await getOfficialTests()), ...mockSimulados.map(normalizeTemplate)];
  },
  async iniciar(templateId) {
    return { ...mockSimulados.find((item) => item.id === templateId), startedAt: Date.now(), respostas: {} };
  },
  calcularResultado(simulado, respostas = {}) {
    const questoes = simulado.questoes.map((questao, index) => {
      const expected = String(questao.gabarito || questao.respostaCorreta || ["a", "b", "c", "d"][index % 4]).toLowerCase();
      return { ...questao, correct: String(respostas[questao.id] || "").toLowerCase() === expected, expected };
    });
    const correct = questoes.filter((questao) => questao.correct).length;
    const percent = Math.round((correct / questoes.length) * 100);
    const porMateria = Object.entries(groupCount(questoes.filter((questao) => questao.correct), "materia")).map(([label, valor]) => ({ label, valor }));
    return { percent, correct, total: questoes.length, tempo: "2h12", mediaTurma: simulado.mediaTurma, porMateria, respostas, questoes };
  },
};
