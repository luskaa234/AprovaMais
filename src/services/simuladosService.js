import { questoesService } from "./questoesService";
import { groupCount } from "../utils";

const DEFAULT_TEMPLATES = [
  { id: "real-rapido", modo: "Treino real", nome: "Simulado rapido", quantidade: 10, tempoMinutos: 40 },
  { id: "real-medio", modo: "Prova real", nome: "Simulado direcionado", quantidade: 20, tempoMinutos: 90 },
  { id: "real-completo", modo: "Completo", nome: "Simulado completo", quantidade: 40, tempoMinutos: 180 },
];

function normalizeAlternative(option = {}, index = 0, gabarito = "") {
  const id = String(option.id || option.letra || ["a", "b", "c", "d", "e"][index] || "").toLowerCase();
  return {
    id,
    letra: String(option.letra || id).toUpperCase(),
    texto: option.texto || option.label || String(option),
    correta: id === String(gabarito).toLowerCase(),
  };
}

function normalizeQuestion(question = {}) {
  const gabarito = String(question.gabarito || question.respostaCorreta || "").toLowerCase();
  const alternativas = Array.isArray(question.alternativas)
    ? question.alternativas.map((item, index) => normalizeAlternative(item, index, gabarito)).filter((item) => item.id && item.texto)
    : [];

  if (!question.id || !question.enunciado || !gabarito || alternativas.length < 2) return null;

  return {
    ...question,
    alternativas,
    gabarito,
    comentario: question.comentario || "Comentario ainda nao disponivel para esta questao oficial.",
    materia: question.materia || "Materia nao informada",
    assunto: question.assunto || question.topico || question.materia || "Assunto nao informado",
    banca: question.banca || "Banca nao informada",
    dificuldade: question.dificuldade || question.nivel || "medio",
    concurso: question.concurso || question.orgao || "Concurso nao informado",
  };
}

function formatTempo(minutos = 0) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (!horas) return `${resto}min`;
  return resto ? `${horas}h${String(resto).padStart(2, "0")}` : `${horas}h`;
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
  async getTemplates({ user } = {}) {
    const area = questoesService.resolveAreaFromUser(user);
    const materias = await questoesService.getMateriasPorArea(area);
    const total = (await questoesService.getQuestoes({ area, apenasOficiais: true, limit: 5000 })).length;

    return DEFAULT_TEMPLATES.map((template) => ({
      ...template,
      area,
      areaLabel: questoesService.getAreaLabel(area),
      materias,
      totalDisponivel: total,
      disabled: total < Math.min(template.quantidade, 5),
    }));
  },
  async iniciar(template, config = {}) {
    const area = config.area || template.area || "geral";
    const quantidade = Number(config.quantidade || template.quantidade || 10);
    const filtros = {
      area,
      materia: config.materia || "",
      status: config.status || "",
      apenasOficiais: true,
      aleatorio: true,
      limit: quantidade,
    };
    const questoes = (await questoesService.getQuestoes(filtros)).map(normalizeQuestion).filter(Boolean);

    if (questoes.length < quantidade) {
      throw new Error(`Base insuficiente: encontrei ${questoes.length} questoes oficiais para este filtro.`);
    }

    return {
      id: `${template.id}-${Date.now()}`,
      nome: config.nome || template.nome,
      modo: template.modo,
      area,
      areaLabel: questoesService.getAreaLabel(area),
      questoes: questoes.slice(0, quantidade),
      respostas: {},
      tempoMinutos: Number(config.tempoMinutos || template.tempoMinutos || 60),
      tipo: "oficial",
      startedAt: Date.now(),
    };
  },
  calcularResultado(simulado, respostas = {}) {
    const questoes = simulado.questoes.map((questao) => {
      const expected = String(questao.gabarito || questao.respostaCorreta || "").toLowerCase();
      return { ...questao, correct: String(respostas[questao.id] || "").toLowerCase() === expected, expected };
    });
    const correct = questoes.filter((questao) => questao.correct).length;
    const percent = questoes.length ? Math.round((correct / questoes.length) * 100) : 0;
    const porMateria = Object.entries(groupCount(questoes.filter((questao) => questao.correct), "materia")).map(([label, valor]) => ({ label, valor }));
    return {
      id: simulado.id,
      nome: simulado.nome,
      modo: simulado.modo,
      data: new Date().toISOString(),
      percent,
      correct,
      total: questoes.length,
      tempo: formatTempo(simulado.tempoMinutos),
      porMateria,
      respostas,
      questoes,
    };
  },
};
