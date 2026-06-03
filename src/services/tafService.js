import { mockDicasTAF, mockEditaisTAF, mockHistoricoTAF, mockPlanoTAF } from "../data";

/**
 * Future REST contract:
 * GET /taf/editais
 * POST /taf/simulados
 * GET /taf/historico
 * POST /taf/plano/gerar
 */
export const tafService = {
  async getEditais() { return mockEditaisTAF; },
  async getHistorico() { return mockHistoricoTAF; },
  async getPlano() { return mockPlanoTAF; },
  async getDicas() { return mockDicasTAF; },
  calcularPontuacao(prova, valor) {
    const row = prova.tabela.find((item) => valor >= item.min && valor <= item.max) || prova.tabela[0];
    return { pontos: row.pontos, situacao: row.eliminatorio ? "Eliminatorio" : row.pontos >= 7 ? "Aprovado" : "Na media", minimo: prova.minimo };
  },
};
