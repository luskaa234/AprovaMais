import { mockFlashcards } from "../data";
import { applySm2 } from "../utils";

/**
 * Future REST contract:
 * GET /revisoes
 * POST /revisoes/:id/avaliar
 */
export const revisaoService = {
  async getPendentes() {
    return mockFlashcards.flatMap((deck) => deck.cards.slice(0, 3).map((card) => ({ ...card, materia: deck.materia, urgencia: "hoje" })));
  },
  avaliar(item, quality) {
    return applySm2(item, quality);
  },
};
