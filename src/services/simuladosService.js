import { mockSimulados } from "../data";
import { groupCount } from "../utils";

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
    return mockSimulados;
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
