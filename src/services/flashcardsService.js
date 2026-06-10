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
      try {
        const userId = await getCurrentUserId();
        if (!userId) return getLocalDecks();
        const { data, error } = await supabase.from("flashcard_decks").select("*, flashcards(*)").eq("user_id", userId).order("created_at", { ascending: false });
        if (error) throw error;
        const remoteDecks = (data || []).map(mapDeck).filter((deck) => deck.cards.length);
        if (remoteDecks.length) return remoteDecks;
      } catch {
        // Sem decks no banco ou sem sessao: usa a base local preservada.
      }
    }
    return getLocalDecks();
  },
  async getCards(deckId) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("flashcards").select("*").eq("deck_id", deckId).order("proxima");
        if (error) throw error;
        if (data?.length) return data.map(mapCard);
      } catch {
        // Fallback local abaixo.
      }
    }
    const localDeck = (await getLocalDecks()).find((deck) => deck.id === deckId);
    return localDeck?.cards || useFlashcardsStore.getState().decks.find((deck) => deck.id === deckId)?.cards || [];
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
  async criarFlashcard(payload = {}) {
    const card = {
      id: `card-${Date.now()}`,
      frente: payload.frente || "Nova pergunta",
      verso: payload.verso || "Resposta em construcao.",
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      dueAt: new Date().toISOString().slice(0, 10),
      assunto: payload.assunto,
      subassunto: payload.subassunto,
      dificuldade: payload.dificuldade || "medio",
      favorito: Boolean(payload.favorito),
      origem: "usuario",
    };
    const deck = {
      id: `deck-user-${Date.now()}`,
      titulo: payload.titulo || `Flashcards: ${payload.materia || "Geral"}`,
      materia: payload.materia || "Geral",
      concurso: payload.concurso || "Geral",
      assunto: payload.assunto || payload.materia || "Geral",
      subassunto: payload.subassunto || "Revisao",
      origem: "usuario",
      retencao: 0,
      cards: [card],
    };
    useFlashcardsStore.setState((state) => ({ decks: [deck, ...state.decks] }));
    localDecksCache = null;
    return deck;
  },
  async criarDeckLeiSeca(payload = {}) {
    const today = new Date().toISOString().slice(0, 10);
    const cards = (payload.cards || []).map((card, index) => ({
      id: `lei-card-${payload.artigoId || Date.now()}-${index}-${Date.now()}`,
      frente: card.frente,
      verso: card.verso,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      dueAt: today,
      origem: "lei_seca",
      artigoId: payload.artigoId,
    }));
    const deck = {
      id: `deck-lei-${payload.artigoId || Date.now()}-${Date.now()}`,
      titulo: payload.titulo || "Lei Seca",
      materia: payload.materia || "Legislacao",
      concurso: payload.concurso || "Geral",
      assunto: "Lei Seca",
      origem: "lei_seca",
      retencao: 0,
      cards,
    };
    useFlashcardsStore.setState((state) => ({ decks: [deck, ...state.decks] }));
    localDecksCache = null;
    return deck;
  },
};
