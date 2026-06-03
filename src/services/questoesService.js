import { mockQuestoes } from "../data";
import { normalize } from "../utils";

/**
 * Future REST contract:
 * GET /questoes?banca=&orgao=&materia=&ano=&dificuldade=&page=&limit=
 * GET /questoes/:id
 * POST /questoes/:id/responder
 * POST /questoes/:id/salvar
 * POST /questoes/:id/reportar
 */
export const questoesService = {
  async getAll(filters = {}) {
    return this.filter(mockQuestoes, filters);
  },
  async getById(id) {
    return mockQuestoes.find((questao) => questao.id === id);
  },
  async responder(id, alternativaId) {
    const questao = await this.getById(id);
    return { correta: questao?.gabarito === alternativaId, gabarito: questao?.gabarito };
  },
  async salvar() {
    return { success: true };
  },
  async reportar() {
    return { success: true };
  },
  filter(questoes, filters = {}) {
    return questoes.filter((q) => Object.entries(filters).every(([key, value]) => !value || normalize(q[key]).includes(normalize(value))));
  },
};
