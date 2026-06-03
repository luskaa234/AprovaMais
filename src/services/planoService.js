import { mockPlano } from "../data";

/**
 * Future REST contract:
 * GET /plano
 * POST /plano/gerar
 * PUT /plano/progresso
 */
export const planoService = {
  async getPlano() {
    return mockPlano;
  },
  async getSugestao() {
    return "Redistribua 20 min de Informatica para Constitucional nesta semana.";
  },
};
