import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { Sparkles, Search } from "lucide-react";
import { Badge, Button, EmptyState, Input, cx } from "../../components";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { flashcardsService } from "../../services";
import { useFlashcardsStore } from "../../stores";

const today = () => new Date().toISOString().slice(0, 10);

const addDays = (days) => {
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
};

const reviewActions = [
  ["Errei", 0, 0, "danger"],
  ["Fazer depois", 1, 1, "secondary"],
  ["Acertei", 5, 5, "primary"],
];

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function shuffleCards(items, seed) {
  const random = seededRandom(seed);
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function normalizeCard(deck, card, deckIndex, cardIndex) {
  const acertos = card.acertos ?? card.repetitions ?? card.repeticoes ?? 0;
  const erros = card.erros ?? 0;
  const dominio = card.dominio ?? Math.min(100, acertos * 20);
  const status = card.status || (dominio >= 80 ? "Dominado" : acertos ? "Em revisão" : "Novo");
  const pergunta = card.pergunta || card.frente || `${deck.materia}: conceito essencial`;
  const resposta = card.resposta || card.verso || "Resposta ainda não cadastrada.";
  const explicacao = card.explicacao && card.explicacao !== resposta ? card.explicacao : "";

  return {
    id: card.id || `${deck.id}-${cardIndex}`,
    pergunta,
    resposta,
    explicacao,
    materia: card.materia || deck.materia || "Geral",
    assunto: card.assunto || deck.assunto || deck.materia || "Geral",
    subassunto: card.subassunto || deck.subassunto || "Pontos de prova",
    concurso: card.concurso || deck.concurso || (deckIndex % 2 ? "PRF" : "PM"),
    dificuldade: card.dificuldade || (deck.retencao >= 75 ? "Difícil" : deck.retencao >= 45 ? "Médio" : "Fácil"),
    status,
    favorito: Boolean(card.favorito),
    origem: card.origem || deck.origem || (deck.id?.includes("user") ? "usuario" : "plataforma"),
    criadoEm: card.criadoEm || today(),
    proximaRevisao: card.proximaRevisao || card.dueAt || card.proxima || today(),
    acertos,
    erros,
    dominio,
  };
}

export default function FlashcardsPage() {
  const load = useCallback(() => flashcardsService.getDecks(), []);
  const { data: decks = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [overrides, setOverrides] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now() + Math.floor(Math.random() * 100000));
  const [generatedDecks, setGeneratedDecks] = useState([]);
  const [generating, setGenerating] = useState(false);

  const baseCards = useMemo(
    () => [...generatedDecks, ...decks].flatMap((deck, deckIndex) => (deck.cards || []).map((card, cardIndex) => normalizeCard(deck, card, deckIndex, cardIndex))),
    [decks, generatedDecks],
  );

  const cards = useMemo(
    () => shuffleCards(baseCards, shuffleSeed).map((card) => ({ ...card, ...(overrides[card.id] || {}) })),
    [baseCards, overrides, shuffleSeed],
  );

  const filtered = useMemo(() => cards.filter((card) => {
    const text = [card.pergunta, card.resposta, card.explicacao, card.materia, card.assunto, card.subassunto, card.concurso].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    return true;
  }), [cards, deferredQuery]);

  const activeCard = filtered.find((card) => card.id === activeId) || filtered[0];
  const activeIndex = activeCard ? filtered.findIndex((card) => card.id === activeCard.id) : -1;
  const cardPosition = activeIndex >= 0 ? activeIndex + 1 : 0;
  const isLongQuestion = (activeCard?.pergunta || "").length > 180;
  const isLongAnswer = [activeCard?.resposta, activeCard?.explicacao].filter(Boolean).join(" ").length > 240;
  const isHardDifficulty = normalizeText(activeCard?.dificuldade) === "dificil";

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);

  const review = useCallback((card, label, days, quality) => {
    const acerto = quality >= 3;
    const acertos = (card.acertos || 0) + (acerto ? 1 : 0);
    const erros = (card.erros || 0) + (acerto ? 0 : 1);
    const dominio = Math.max(0, Math.min(100, (card.dominio || 0) + (quality === 0 ? -18 : quality * 8)));
    const status = dominio >= 80 ? "Dominado" : "Em revisão";

    setOverrides((current) => ({
      ...current,
      [card.id]: {
        ...(current[card.id] || {}),
        acertos,
        erros,
        dominio,
        status,
        proximaRevisao: addDays(days),
      },
    }));

    useFlashcardsStore.getState().avaliar(card.id, quality);

    setShowAnswer(false);
    const currentIndex = filtered.findIndex((item) => item.id === card.id);
    setActiveId(filtered[currentIndex + 1]?.id || filtered[0]?.id || card.id);
    notify("Revisão registrada", `${label}: próxima revisão atualizada.`);
  }, [filtered, notify]);

  const goToCard = useCallback((direction) => {
    if (!filtered.length) return;

    const currentIndex = activeCard ? filtered.findIndex((card) => card.id === activeCard.id) : 0;
    const nextIndex = (Math.max(0, currentIndex) + direction + filtered.length) % filtered.length;
    setActiveId(filtered[nextIndex].id);
    setShowAnswer(false);
  }, [activeCard, filtered]);

  const shuffleAgain = useCallback(() => {
    setShuffleSeed(Date.now() + Math.floor(Math.random() * 100000));
    setActiveId(null);
    setShowAnswer(false);
  }, []);

  const generateDeck = useCallback(async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const assunto = query.trim() || activeCard?.assunto || activeCard?.materia || "revisão geral";
      const deck = await flashcardsService.gerarDeckIA(assunto, {
        materia: activeCard?.materia || assunto,
        concurso: activeCard?.concurso || "Geral",
        quantidade: 6,
      });
      setGeneratedDecks((current) => [deck, ...current.filter((item) => item.id !== deck.id)]);
      setActiveId(deck.cards?.[0]?.id || null);
      setShowAnswer(false);
      notify("Deck criado", `${deck.cards?.length || 0} flashcards gerados com IA.`);
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar o deck agora." });
    } finally {
      setGenerating(false);
    }
  }, [activeCard, addNotification, generating, notify, query]);

  const handleNextAction = useCallback((event) => {
    event.currentTarget.blur();

    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }

    goToCard(1);
  }, [goToCard, showAnswer]);

  return (
    <div className="flashcards-page mx-auto max-w-[1500px] pb-10 text-slate-900" data-tour="tour-flashcards-page">
      <div className="flashcards-header mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between" data-tour="tour-flashcards-header">
        <h1 className="text-3xl font-black text-slate-950">Flashcards</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input icon={Search} placeholder="Buscar flashcards..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Button variant="secondary" icon={Sparkles} loading={generating} onClick={generateDeck}>Gerar IA</Button>
          <Button variant="secondary" onClick={shuffleAgain}>Aleatório</Button>
        </div>
      </div>

      <main className="flashcards-study mx-auto max-w-5xl rounded-lg border border-blue-100 bg-white p-4 shadow-sm" data-tour="tour-flashcards-study">
        {activeCard ? (
          <section className="flashcards-session rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flashcards-session-inner">
              <div className="flashcards-meta">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge>{activeCard.materia}</Badge>
                  {activeCard.assunto !== activeCard.materia ? <Badge variant="neutral">{activeCard.assunto}</Badge> : null}
                  <Badge variant={isHardDifficulty ? "error" : "neutral"}>{activeCard.dificuldade}</Badge>
                </div>

                <div className="flashcards-progress">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Progresso da sessão</span>
                    <span>{cardPosition}/{filtered.length}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${filtered.length ? (cardPosition / filtered.length) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>

              <div className="flashcard-flip-stage mx-auto">
                <div
                  className={cx("flashcard-swipe-card flashcard-flip-inner flashcard-standard-card rounded-lg bg-white", showAnswer && "is-flipped")}
                  data-tour="tour-flashcards-card"
                >
                  <div className="flashcard-flip-face flashcard-flip-front">
                    <div className={cx("flashcard-face-content flashcard-face-content-front", isLongQuestion && "is-long")}>
                      <div className="flashcard-card-scroll">
                        <span className="flashcard-face-label">Pergunta</span>
                        <h2 className={cx("flashcard-question-text text-lg font-black leading-snug text-slate-950 sm:text-xl lg:text-2xl", isLongQuestion && "is-long")}>{activeCard.pergunta}</h2>
                      </div>
                      <p className="flashcard-front-hint mt-4 text-xs font-semibold text-slate-400">Leia, responda mentalmente e confira o resultado.</p>
                    </div>
                  </div>

                  <div className="flashcard-flip-face flashcard-flip-back">
                    <div className="flashcard-face-content flashcard-face-content-back text-left">
                      <div className="flashcard-card-scroll flashcard-card-scroll-back">
                        <div className="flashcard-back-stack">
                          <div className="flashcard-back-block flashcard-back-answer-block rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">
                            <strong className="mb-2 block text-emerald-700">Resposta</strong>
                            <p className={cx("flashcard-answer-text", isLongAnswer && "is-long")}>{activeCard.resposta}</p>
                            {activeCard.explicacao ? <p className="mt-3 text-slate-500">{activeCard.explicacao}</p> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flashcards-controls-panel" data-tour="tour-flashcards-answer">
                {!showAnswer ? (
                  <p className="flashcards-study-hint text-sm font-semibold text-slate-500">Pense na resposta e toque em Ver resposta para conferir.</p>
                ) : (
                  <div className="flashcards-review-actions grid gap-2 sm:grid-cols-3" data-tour="tour-flashcards-actions">
                    {reviewActions.map(([label, days, quality, variant]) => (
                      <Button key={label} variant={variant} onClick={() => review(activeCard, label, days, quality)}>{label}</Button>
                    ))}
                  </div>
                )}

                <div className="flashcards-navigation flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <Button variant="secondary" onClick={(event) => { event.currentTarget.blur(); goToCard(-1); }}>Anterior</Button>
                  <span className="text-xs font-semibold text-slate-500">Flashcard {cardPosition} de {filtered.length}</span>
                  <Button variant="primary" onClick={handleNextAction}>{showAnswer ? "Próximo" : "Ver resposta"}</Button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <EmptyState
            icon={Search}
            title="Nenhum flashcard encontrado"
            description="Ajuste a busca para voltar aos cards."
          />
        )}
      </main>
    </div>
  );
}
