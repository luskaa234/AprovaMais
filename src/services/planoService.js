import { usePlanoStore } from "../stores";

/**
 * Future REST contract:
 * GET /plano
 * POST /plano/gerar
 * PUT /plano/progresso
 */
export const planoService = {
  async getPlano() {
    return usePlanoStore.getState().getPlano();
  },
  async getSugestão() {
    return "Redistribua 20 min de Informática para Constitucional nesta semana.";
  },
};
