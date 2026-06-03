import { mockBiblioteca } from "../data";
import { normalize } from "../utils";

/**
 * Future REST contract:
 * GET /biblioteca?categoria=&materia=&favorito=
 * POST /biblioteca/:id/favoritar
 */
export const bibliotecaService = {
  async getAll(filters = {}) {
    return this.filter(mockBiblioteca, filters);
  },
  async favoritar() {
    return { success: true };
  },
  filter(materiais, filters = {}) {
    return materiais.filter((item) => Object.entries(filters).every(([key, value]) => !value || normalize(item[key]).includes(normalize(value))));
  },
};
