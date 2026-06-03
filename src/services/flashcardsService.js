import { mockFlashcards } from "../data";
import { applySm2 } from "../utils";

/**
 * Future REST contract:
 * GET /flashcards/decks
 * GET /flashcards/decks/:id/cards
 * POST /flashcards/cards/:id/avaliar
 * POST /flashcards/decks/gerar-ia
 */
export const flashcardsService = {
  async getDecks() {
    return mockFlashcards;
  },
  async getCards(deckId) {
    return mockFlashcards.find((deck) => deck.id === deckId)?.cards || [];
  },
  async avaliar(card, quality) {
    return applySm2(card, quality);
  },
  async gerarDeckIA(prompt) {
    return { ...mockFlashcards[0], id: `ia-${Date.now()}`, titulo: `Deck IA: ${prompt || "Novo tema"}` };
  },
};
