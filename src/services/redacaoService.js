import { mockRedacoes } from "../data";

/**
 * Future REST contract:
 * GET /redacoes/temas
 * POST /redacoes
 * PUT /redacoes/:id
 * POST /redacoes/:id/corrigir-ia
 */
export const redacaoService = {
  async getHistorico() {
    return mockRedacoes;
  },
  async corrigir(texto) {
    return { nota: Math.min(940, 720 + texto.length), competencias: [168, 176, 164, 172, 180], comentarios: "Tese clara, repertorio pertinente e proposta consistente." };
  },
};
