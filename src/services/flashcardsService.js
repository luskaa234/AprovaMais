import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useFlashcardsStore } from "../stores";
import { applySm2 } from "../utils";

let localDecksCache = null;

async function getLocalDecks() {
  if (localDecksCache) return localDecksCache;
  try {
    const response = await fetch("/flashcards/decks.json");
    if (!response.ok) throw new Error("Decks locais nao encontrados.");
    localDecksCache = await response.json();
    return localDecksCache;
  } catch {
    localDecksCache = useFlashcardsStore.getState().decks;
    return localDecksCache;
  }
}

function mapCard(card) {
  return {
    id: card.id,
    frente: card.frente,
    verso: card.verso,
    easeFactor: card.ef,
    interval: card.intervalo,
    repetitions: card.repeticoes,
    dueAt: card.proxima,
  };
}

function mapDeck(deck) {
  const cards = deck.flashcards?.map(mapCard) || [];
  const due = cards.filter((card) => card.dueAt <= new Date().toISOString().slice(0, 10)).length;
  return {
    id: deck.id,
    titulo: deck.titulo,
    materia: deck.materia || "Geral",
    concurso: deck.concurso,
    origem: deck.origem,
    retencao: cards.length ? Math.round(((cards.length - due) / cards.length) * 100) : 0,
    cards,
  };
}

/**
 * Future REST contract:
 * GET /flashcards/decks
 * GET /flashcards/decks/:id/cards
 * POST /flashcards/cards/:id/avaliar
 * POST /flashcards/decks/gerar-ia
 */
export const flashcardsService = {
  async getDecks() {
    if (isSupabaseConfigured) {
      const userId = await getCurrentUserId();
      if (!userId) return [];
      const { data, error } = await supabase.from("flashcard_decks").select("*, flashcards(*)").eq("user_id", userId).order("created_at", { ascending: false });
      if (error) throw error;
      return data.map(mapDeck);
    }
    return getLocalDecks();
  },
  async getCards(deckId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("flashcards").select("*").eq("deck_id", deckId).order("proxima");
      if (error) throw error;
      return data.map(mapCard);
    }
    return useFlashcardsStore.getState().decks.find((deck) => deck.id === deckId)?.cards || [];
  },
  async avaliar(card, quality) {
    if (isSupabaseConfigured) {
      const next = applySm2(card, quality);
      const { error } = await supabase
        .from("flashcards")
        .update({
          ef: next.easeFactor,
          intervalo: next.interval,
          repeticoes: next.repetitions,
          proxima: next.dueAt,
          ultima_revisao: new Date().toISOString(),
        })
        .eq("id", card.id);
      if (error) throw error;
      return next;
    }
    return useFlashcardsStore.getState().avaliar(card.id, quality);
  },
  async gerarDeckIA(prompt) {
    return useFlashcardsStore.getState().gerarDeckIA(prompt);
  },
};
