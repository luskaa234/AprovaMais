import { useRevisaoStore } from "../stores";

/**
 * Future REST contract:
 * GET /revisoes
 * POST /revisoes/:id/avaliar
 */
export const revisaoService = {
  async getPendentes() {
    return useRevisaoStore.getState().pendentesHoje;
  },
  avaliar(item, quality) {
    useRevisaoStore.getState().concluir(item.assuntoId || item.id, quality);
    return { ...item, nivel: quality, urgencia: "agendada" };
  },
  adiar(assuntoId) {
    useRevisaoStore.getState().adiar(assuntoId);
    return { success: true };
  },
};
