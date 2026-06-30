import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Sparkles, Search, Layers3, X } from "lucide-react";
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

const REVIEW_ACTIONS = [
  { label: "Errei", days: 0, quality: 0, variant: "danger" },
  { label: "Fazer depois", days: 1, quality: 1, variant: "secondary" },
  { label: "Acertei", days: 5, quality: 5, variant: "primary" },
];

const FILTER_TABS = ["Todos", "Para revisar", "Dominados", "Favoritos"];

function seededRandom(seed) {
  let v = seed % 2147483647;
  if (v <= 0) v += 2147483646;
  return () => { v = (v * 16807) % 2147483647; return (v - 1) / 2147483646; };
}

function shuffleCards(items, seed) {
  const rng = seededRandom(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function normalizeCard(deck, card, di, ci) {
  const acertos = card.acertos ?? card.repetitions ?? card.repeticoes ?? 0;
  const erros = card.erros ?? 0;
  const dominio = card.dominio ?? Math.min(100, acertos * 20);
  const status = card.status || (dominio >= 80 ? "Dominado" : acertos ? "Em revisão" : "Novo");
  const pergunta = card.pergunta || card.frente || `${deck.materia}: conceito essencial`;
  const resposta = card.resposta || card.verso || "Resposta ainda não cadastrada.";
  const explicacao = card.explicacao && card.explicacao !== resposta ? card.explicacao : "";
  return {
    id: card.id || `${deck.id}-${ci}`,
    pergunta, resposta, explicacao,
    materia: card.materia || deck.materia || "Geral",
    assunto: card.assunto || deck.assunto || deck.materia || "Geral",
    dificuldade: card.dificuldade || (deck.retencao >= 75 ? "Difícil" : deck.retencao >= 45 ? "Médio" : "Fácil"),
    status, dominio, acertos, erros,
    favorito: Boolean(card.favorito),
    origem: card.origem || deck.origem || (deck.id?.includes("user") ? "usuario" : "plataforma"),
    proximaRevisao: card.proximaRevisao || card.dueAt || card.proxima || today(),
  };
}

export default function FlashcardsPage() {
  const load = useCallback(() => flashcardsService.getDecks(), []);
  const { data: decks = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filterTab, setFilterTab] = useState("Todos");
  const [overrides, setOverrides] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now() + Math.floor(Math.random() * 100000));
  const [generatedDecks, setGeneratedDecks] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [sessionStats, setSessionStats] = useState({ acertos: 0, erros: 0, pendentes: 0 });

  const baseCards = useMemo(
    () => [...generatedDecks, ...decks].flatMap((deck, di) => (deck.cards || []).map((card, ci) => normalizeCard(deck, card, di, ci))),
    [decks, generatedDecks],
  );

  const cards = useMemo(
    () => shuffleCards(baseCards, shuffleSeed).map((c) => ({ ...c, ...(overrides[c.id] || {}) })),
    [baseCards, overrides, shuffleSeed],
  );

  const filtered = useMemo(() => cards.filter((c) => {
    const text = [c.pergunta, c.resposta, c.explicacao, c.materia, c.assunto].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    if (filterTab === "Para revisar") return c.status !== "Dominado";
    if (filterTab === "Dominados") return c.status === "Dominado";
    if (filterTab === "Favoritos") return c.favorito;
    return true;
  }), [cards, deferredQuery, filterTab]);

  const activeCard = filtered.find((c) => c.id === activeId) || filtered[0];
  const activeIndex = activeCard ? filtered.findIndex((c) => c.id === activeCard.id) : -1;
  const progress = filtered.length ? Math.round(((activeIndex + 1) / filtered.length) * 100) : 0;
  const dominados = cards.filter((c) => c.status === "Dominado").length;
  const paraRevisar = cards.filter((c) => c.status !== "Dominado").length;

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);

  const review = useCallback((card, label, days, quality) => {
    const acerto = quality >= 3;
    const acertos = (card.acertos || 0) + (acerto ? 1 : 0);
    const erros = (card.erros || 0) + (acerto ? 0 : 1);
    const dominio = Math.max(0, Math.min(100, (card.dominio || 0) + (quality === 0 ? -18 : quality * 8)));
    const status = dominio >= 80 ? "Dominado" : "Em revisão";
    setOverrides((cur) => ({ ...cur, [card.id]: { ...(cur[card.id] || {}), acertos, erros, dominio, status, proximaRevisao: addDays(days) } }));
    useFlashcardsStore.getState().avaliar(card.id, quality);
    setSessionStats((s) => ({ ...s, acertos: s.acertos + (acerto ? 1 : 0), erros: s.erros + (acerto ? 0 : 1) }));
    setShowAnswer(false);
    const idx = filtered.findIndex((item) => item.id === card.id);
    setActiveId(filtered[idx + 1]?.id || filtered[0]?.id || card.id);
    notify("Revisão registrada", `${label} — próxima revisão: ${addDays(days)}.`);
  }, [filtered, notify]);

  const goToCard = useCallback((dir) => {
    if (!filtered.length) return;
    const cur = activeCard ? filtered.findIndex((c) => c.id === activeCard.id) : 0;
    const next = (Math.max(0, cur) + dir + filtered.length) % filtered.length;
    setActiveId(filtered[next].id);
    setShowAnswer(false);
  }, [activeCard, filtered]);

  const shuffleAgain = useCallback(() => {
    setShuffleSeed(Date.now() + Math.floor(Math.random() * 100000));
    setActiveId(null);
    setShowAnswer(false);
    setSessionStats({ acertos: 0, erros: 0, pendentes: 0 });
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
      setGeneratedDecks((cur) => [deck, ...cur.filter((d) => d.id !== deck.id)]);
      setActiveId(deck.cards?.[0]?.id || null);
      setShowAnswer(false);
      notify("Deck criado", `${deck.cards?.length || 0} flashcards gerados pela IA.`);
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar o deck agora." });
    } finally { setGenerating(false); }
  }, [activeCard, addNotification, generating, notify, query]);

  const isLongQ = (activeCard?.pergunta || "").length > 180;
  const isLongA = [activeCard?.resposta, activeCard?.explicacao].filter(Boolean).join(" ").length > 240;

  return (
    <div className="mx-auto max-w-5xl pb-12" data-tour="tour-flashcards-page">

      {/* ─── Header ─── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-royal">Revisão com flashcards</p>
          <h1 className="mt-0.5 text-3xl font-black text-slate-950">Flashcards</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input
            icon={Search}
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="secondary" icon={Sparkles} loading={generating} onClick={generateDeck}>Gerar IA</Button>
          <Button variant="ghost" icon={RotateCcw} onClick={shuffleAgain} title="Embaralhar" />
        </div>
      </div>

      {/* ─── Stats chips ─── */}
      <div className="mb-5 flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-royal/20 bg-white px-3 py-1.5 text-sm font-black text-slate-700 shadow-sm">
          <Layers3 size={14} className="text-royal" />
          {cards.length} cartões
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-amber-100 bg-amber-50 px-3 py-1.5 text-sm font-black text-amber-700">
          <BookOpen size={14} />
          {paraRevisar} para revisar
        </div>
        {dominados > 0 && (
          <div className="flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-700">
            ✓ {dominados} dominados
          </div>
        )}
        {(sessionStats.acertos + sessionStats.erros) > 0 && (
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-black text-slate-600">
            Sessão: {sessionStats.acertos}✓ {sessionStats.erros}✗
          </div>
        )}
      </div>

      {/* ─── Filter tabs ─── */}
      <div className="mb-5 flex gap-1.5 overflow-x-auto pb-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => { setFilterTab(tab); setActiveId(null); setShowAnswer(false); }}
            className={cx(
              "shrink-0 rounded-xl px-3.5 py-2 text-sm font-black transition",
              filterTab === tab
                ? "bg-royal text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky hover:text-navy",
            )}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Main session area ─── */}
      {activeCard ? (
        <div className="rounded-2xl border border-royal/20 bg-white shadow-sm" data-tour="tour-flashcards-study">

          {/* Progress bar */}
          <div className="border-b border-slate-100 px-5 py-3">
            <div className="mb-1.5 flex items-center justify-between text-xs font-black text-slate-500">
              <span>Progresso da sessão</span>
              <span>{Math.min(activeIndex + 1, filtered.length)} / {filtered.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-royal transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="p-5">
            {/* Badges */}
            <div className="mb-5 flex flex-wrap justify-center gap-2" data-tour="tour-flashcards-header">
              <Badge>{activeCard.materia}</Badge>
              {activeCard.assunto !== activeCard.materia && <Badge variant="neutral">{activeCard.assunto}</Badge>}
              <Badge variant={activeCard.dificuldade === "Difícil" ? "error" : "neutral"}>{activeCard.dificuldade}</Badge>
            </div>

            {/* Flip card */}
            <div className="flashcard-flip-stage mx-auto" data-tour="tour-flashcards-card">
              <div className={cx("flashcard-flip-inner flashcard-standard-card rounded-2xl", showAnswer && "is-flipped")}>

                <div className="flashcard-flip-face flashcard-flip-front">
                  <div className={cx("flashcard-face-content flashcard-face-content-front", isLongQ && "is-long")}>
                    <div className="flashcard-card-scroll">
                      <span className="mb-3 block text-xs font-black uppercase tracking-wide text-royal">Pergunta</span>
                      <h2 className={cx("flashcard-question-text text-xl font-black leading-snug text-slate-950 sm:text-2xl", isLongQ && "is-long")}>
                        {activeCard.pergunta}
                      </h2>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-slate-400">Pense na resposta e toque em Ver resposta.</p>
                  </div>
                </div>

                <div className="flashcard-flip-face flashcard-flip-back">
                  <div className="flashcard-face-content flashcard-face-content-back text-left">
                    <div className="flashcard-card-scroll flashcard-card-scroll-back">
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <span className="mb-2 block text-xs font-black uppercase tracking-wide text-emerald-700">Resposta</span>
                        <p className={cx("flashcard-answer-text text-base leading-relaxed text-slate-800", isLongA && "is-long")}>
                          {activeCard.resposta}
                        </p>
                        {activeCard.explicacao && (
                          <p className="mt-3 text-sm leading-relaxed text-slate-500">{activeCard.explicacao}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 space-y-4" data-tour="tour-flashcards-answer">
              {!showAnswer ? (
                <div className="flex justify-center">
                  <Button onClick={() => setShowAnswer(true)}>Ver resposta</Button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2" data-tour="tour-flashcards-actions">
                  {REVIEW_ACTIONS.map(({ label, days, quality, variant }) => (
                    <Button key={label} variant={variant} onClick={() => review(activeCard, label, days, quality)}>{label}</Button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-slate-100 pt-4" data-tour="tour-flashcards-navigation">
                <button
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-black text-slate-600 shadow-sm transition hover:border-sky hover:text-navy active:scale-95"
                  onClick={() => { goToCard(-1); }}
                  type="button"
                >
                  <ChevronLeft size={15} />
                  Anterior
                </button>
                <span className="text-xs font-semibold text-slate-400">
                  Cartão {Math.min(activeIndex + 1, filtered.length)} de {filtered.length}
                </span>
                <button
                  className="flex items-center gap-1.5 rounded-xl bg-royal px-3.5 py-2 text-sm font-black text-white shadow-sm transition hover:bg-navy active:scale-95"
                  onClick={() => showAnswer ? goToCard(1) : setShowAnswer(true)}
                  type="button"
                >
                  {showAnswer ? "Próximo" : "Ver resposta"}
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-royal/20 bg-white p-10 shadow-sm">
          <EmptyState
            icon={query ? X : Layers3}
            title={query ? "Nenhum flashcard encontrado" : "Sem flashcards nesta categoria"}
            description={query ? "Tente outro termo ou limpe a busca." : "Tente outra aba ou gere cards com IA."}
            action={query ? <Button variant="ghost" onClick={() => setQuery("")}>Limpar busca</Button> : undefined}
          />
        </div>
      )}
    </div>
  );
}
