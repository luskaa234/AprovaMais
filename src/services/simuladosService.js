import { mockSimulados } from "../data";
import { groupCount } from "../utils";

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
        modo: "prova oficial",
        nome: item.titulo,
        tempoMinutos: 180,
        mediaTurma: 68 + (index % 8),
        materialUrl: item.url,
        questoes: baseQuestoes,
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
    return [...(await getOfficialTests()), ...mockSimulados];
  },
  async iniciar(templateId) {
    return { ...mockSimulados.find((item) => item.id === templateId), startedAt: Date.now(), respostas: {} };
  },
  calcularResultado(simulado, respostas = {}) {
    const questoes = simulado.questoes.map((questao, index) => {
      const expected = ["A", "B", "C", "D"][index % 4];
      return { ...questao, correct: (respostas[questao.id] || "") === expected, expected };
    });
    const correct = questoes.filter((questao) => questao.correct).length;
    const percent = Math.round((correct / questoes.length) * 100);
    const porMateria = Object.entries(groupCount(questoes.filter((questao) => questao.correct), "materia")).map(([label, valor]) => ({ label, valor }));
    return { percent, correct, total: questoes.length, tempo: "2h12", mediaTurma: simulado.mediaTurma, porMateria, respostas, questoes };
  },
};
