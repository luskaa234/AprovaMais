import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Badge, Button, EmptyState, Input, Mascot, cx } from "../../components";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { flashcardsService } from "../../services";

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
  const status = card.status || (dominio >= 80 ? "Dominado" : acertos ? "Em revisao" : "Novo");
  const pergunta = card.pergunta || card.frente || `${deck.materia}: conceito essencial`;
  const resposta = card.resposta || card.verso || "Resposta ainda nao cadastrada.";
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
    dificuldade: card.dificuldade || (deck.retencao >= 75 ? "Dificil" : deck.retencao >= 45 ? "Medio" : "Facil"),
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);

  const baseCards = useMemo(() => decks.flatMap((deck, deckIndex) => (deck.cards || []).map((card, cardIndex) => normalizeCard(deck, card, deckIndex, cardIndex))), [decks]);
  const cards = useMemo(() => shuffleCards(baseCards, shuffleSeed).map((card) => ({ ...card, ...(overrides[card.id] || {}) })), [baseCards, overrides, shuffleSeed]);
  const filtered = useMemo(() => cards.filter((card) => {
    const text = [card.pergunta, card.resposta, card.explicacao, card.materia, card.assunto, card.subassunto, card.concurso].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    return true;
  }), [cards, deferredQuery]);
  const activeCard = filtered.find((card) => card.id === activeId) || filtered[0];
  const activeIndex = activeCard ? filtered.findIndex((card) => card.id === activeCard.id) : -1;
  const cardPosition = activeIndex >= 0 ? activeIndex + 1 : 0;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);
  const review = useCallback((card, label, days, quality) => {
    const acerto = quality >= 3;
    const acertos = (card.acertos || 0) + (acerto ? 1 : 0);
    const erros = (card.erros || 0) + (acerto ? 0 : 1);
    const dominio = Math.max(0, Math.min(100, (card.dominio || 0) + (quality === 0 ? -18 : quality * 8)));
    const status = dominio >= 80 ? "Dominado" : "Em revisao";
    setOverrides((current) => ({ ...current, [card.id]: { ...(current[card.id] || {}), acertos, erros, dominio, status, proximaRevisao: addDays(days) } }));
    setShowAnswer(false);
    const currentIndex = filtered.findIndex((item) => item.id === card.id);
    setActiveId(filtered[currentIndex + 1]?.id || filtered[0]?.id || card.id);
    notify("Revisao registrada", `${label}: proxima revisao atualizada.`);
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

  const handleSwipeReview = useCallback((_, info) => {
    if (!isMobile || !activeCard) return;
    if (info.offset.x > 120) {
      review(activeCard, "Acertei", 5, 5);
      return;
    }
    if (info.offset.x < -120) {
      review(activeCard, "Errei", 0, 0);
    }
  }, [activeCard, isMobile, review]);

  const revealAnswer = useCallback(() => {
    setShowAnswer(true);
  }, []);

  const handleNextAction = useCallback((event) => {
    event.currentTarget.blur();
    if (!showAnswer) {
      revealAnswer();
      return;
    }
    goToCard(1);
  }, [goToCard, revealAnswer, showAnswer]);

  return (
    <div className="flashcards-page mx-auto max-w-[1500px] pb-10 text-slate-900" data-tour="tour-flashcards-page">
      <div className="flashcards-header mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-tour="tour-flashcards-header">
        <h1 className="text-3xl font-black text-slate-950">Flashcards</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input icon={Search} placeholder="Buscar flashcards..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Button variant="secondary" onClick={shuffleAgain}>Aleatorio</Button>
        </div>
      </div>

      <main className="flashcards-study mx-auto max-w-5xl overflow-hidden rounded-lg border border-blue-100 bg-white p-4 shadow-sm" data-tour="tour-flashcards-study">
        {activeCard ? (
          <section className="flashcards-session grid min-h-[420px] place-items-center rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="w-full max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <Badge>{activeCard.materia}</Badge>
                {activeCard.assunto !== activeCard.materia ? <Badge variant="neutral">{activeCard.assunto}</Badge> : null}
                <Badge variant={activeCard.dificuldade === "Dificil" ? "error" : "neutral"}>{activeCard.dificuldade}</Badge>
              </div>
              <div className="flashcards-progress mb-5">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Progresso da sessão</span>
                  <span>{cardPosition}/{filtered.length}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${filtered.length ? (cardPosition / filtered.length) * 100 : 0}%` }} />
                </div>
              </div>
              <div className={cx("flashcard-flip-stage mx-auto max-w-3xl", !showAnswer && "cursor-pointer")} onClick={() => !showAnswer && revealAnswer()}>
                <motion.div
                  animate={{
                    opacity: 1,
                    rotateY: showAnswer ? 180 : 0,
                    y: 0,
                  }}
                  className="flashcard-swipe-card flashcard-flip-inner rounded-lg bg-white px-2 py-4"
                  data-tour="tour-flashcards-card"
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.24}
                  initial={{ opacity: 0, rotateY: 0, y: 8 }}
                  onDragEnd={handleSwipeReview}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  whileDrag={isMobile ? { scale: 0.985 } : undefined}
                >
                  <div className="flashcard-flip-face flashcard-flip-front">
                    <div>
                      <h2 className="text-lg font-black leading-snug text-slate-950 sm:text-xl lg:text-2xl">{activeCard.pergunta}</h2>
                      <p className="mt-4 text-xs font-semibold text-slate-400">Pense na resposta e toque em Próximo para virar o card</p>
                    </div>
                  </div>
                  <div className="flashcard-flip-face flashcard-flip-back">
                    <div className="grid gap-4 text-left">
                      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                        <strong className="mb-2 block text-sm text-blue-700">Pergunta</strong>
                        <p className="text-lg font-black leading-snug text-slate-950 sm:text-xl">{activeCard.pergunta}</p>
                      </div>
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">
                        <strong className="mb-2 block text-emerald-700">Resposta</strong>
                        {activeCard.resposta}
                        {activeCard.explicacao ? <p className="mt-3 text-slate-500">{activeCard.explicacao}</p> : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!showAnswer ? (
                <div className="flashcards-answer mx-auto mt-6 max-w-2xl text-center" data-tour="tour-flashcards-answer">
                  <p className="text-sm font-semibold text-slate-500">Responda mentalmente e toque em Próximo para conferir o resultado.</p>
                </div>
              ) : (
                <div className="mt-8 grid gap-4">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-left text-sm leading-relaxed text-slate-600">
                    <strong className="mb-1 block text-slate-950">Resultado</strong>
                    Confira o gabarito no verso do card e marque como foi seu desempenho.
                  </div>
                  <div className="flashcards-review-actions grid gap-2 sm:grid-cols-3" data-tour="tour-flashcards-actions">
                    {reviewActions.map(([label, days, quality, variant]) => <Button key={label} variant={variant} onClick={() => review(activeCard, label, days, quality)}>{label}</Button>)}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <Button variant="secondary" onClick={(event) => { event.currentTarget.blur(); goToCard(-1); }}>Anterior</Button>
                <span className="text-xs font-semibold text-slate-500">Flashcard {cardPosition} de {filtered.length}</span>
                <Button variant={showAnswer ? "secondary" : "primary"} onClick={handleNextAction}>Próximo</Button>
              </div>
            </div>
          </section>
        ) : (
          <EmptyState
            icon={Search}
            title="Nenhum flashcard encontrado"
            description="Ajuste a busca para voltar aos cards."
            action={<Mascot size="lg" pose="feedback" framed={false} />}
          />
        )}
      </main>

    </div>
  );
}
