import { mockLeis, mockMapas, mockNotificacoes, mockRanking } from "../data";

/**
 * Future REST contract:
 * GET /concursos?estado=&orgao=&area=
 * GET /concursos/:id/edital
 * GET /concursos/:id/materias
 */
export const rankingService = { async getRanking() { return mockRanking; } };
export const mapasService = { async getMapas() { return mockMapas; } };
export const leisService = { async getLeis() { return mockLeis; } };
export const notificacoesService = { async getAll() { return mockNotificacoes; } };
