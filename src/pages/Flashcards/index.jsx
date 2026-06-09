import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge, Button, EmptyState, Input, cx } from "../../components";
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

function normalizeAnswerText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getJudgment(text = "") {
  const value = normalizeAnswerText(text);
  if (!value) return null;
  const words = value.split(" ");
  const has = (...terms) => terms.some((term) => words.includes(term) || value.includes(term));
  if (has("errado", "incorreto", "falso", "falsa", "nao")) return "errado";
  if (has("certo", "correto", "correta", "verdadeiro", "verdadeira", "sim")) return "certo";
  return null;
}

function getAnswerFeedback(card, studentAnswer) {
  const expected = getJudgment(card?.resposta);
  const informed = getJudgment(studentAnswer);
  if (!studentAnswer.trim() || !expected || !informed) return null;
  const correct = expected === informed;
  return {
    correct,
    label: correct ? "Resposta aceita" : "Resposta diferente do gabarito",
    helper: correct ? "Sua resposta indica o mesmo sentido do gabarito." : "Compare sua resposta com o verso antes de avaliar.",
  };
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
  const [studentAnswer, setStudentAnswer] = useState("");

  const baseCards = useMemo(() => decks.flatMap((deck, deckIndex) => (deck.cards || []).map((card, cardIndex) => normalizeCard(deck, card, deckIndex, cardIndex))), [decks]);
  const cards = useMemo(() => baseCards.map((card) => ({ ...card, ...(overrides[card.id] || {}) })), [baseCards, overrides]);
  const filtered = useMemo(() => cards.filter((card) => {
    const text = [card.pergunta, card.resposta, card.explicacao, card.materia, card.assunto, card.subassunto, card.concurso].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    return true;
  }), [cards, deferredQuery]);
  const activeCard = filtered.find((card) => card.id === activeId) || filtered[0];
  const activeIndex = activeCard ? filtered.findIndex((card) => card.id === activeCard.id) : -1;
  const cardPosition = activeIndex >= 0 ? activeIndex + 1 : 0;
  const answerFeedback = activeCard ? getAnswerFeedback(activeCard, studentAnswer) : null;

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);
  const review = useCallback((card, label, days, quality) => {
    const acerto = quality >= 3;
    const acertos = (card.acertos || 0) + (acerto ? 1 : 0);
    const erros = (card.erros || 0) + (acerto ? 0 : 1);
    const dominio = Math.max(0, Math.min(100, (card.dominio || 0) + (quality === 0 ? -18 : quality * 8)));
    const status = dominio >= 80 ? "Dominado" : "Em revisao";
    setOverrides((current) => ({ ...current, [card.id]: { ...(current[card.id] || {}), acertos, erros, dominio, status, proximaRevisao: addDays(days) } }));
    setShowAnswer(false);
    setStudentAnswer("");
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
    setStudentAnswer("");
  }, [activeCard, filtered]);

  return (
    <div className="mx-auto max-w-[1500px] pb-10 text-slate-900">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-black text-slate-950">Flashcards</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input icon={Search} placeholder="Buscar flashcards..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>

      <main className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
        {activeCard ? (
          <section className="grid min-h-[420px] place-items-center rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="w-full max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <Badge>{activeCard.materia}</Badge>
                {activeCard.assunto !== activeCard.materia ? <Badge variant="neutral">{activeCard.assunto}</Badge> : null}
                <Badge variant={activeCard.dificuldade === "Dificil" ? "error" : "neutral"}>{activeCard.dificuldade}</Badge>
              </div>
              <h2 className="mx-auto max-w-2xl text-xl font-black leading-snug text-slate-950 sm:text-2xl">{activeCard.pergunta}</h2>

              {!showAnswer ? (
                <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left">
                  <label className="text-sm font-bold text-slate-700" htmlFor="flashcard-answer">Sua resposta</label>
                  <textarea
                    id="flashcard-answer"
                    className="min-h-28 w-full resize-none rounded-lg border border-blue-100 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    placeholder="Responda com suas palavras antes de ver o gabarito."
                    value={studentAnswer}
                    onChange={(event) => setStudentAnswer(event.target.value)}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-500">Flashcard {cardPosition} de {filtered.length}</span>
                    <Button onClick={() => setShowAnswer(true)}>Responder</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 grid gap-4">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 text-left text-sm leading-relaxed text-slate-600">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <strong className="text-slate-950">Sua resposta</strong>
                      {answerFeedback ? <span className={cx("rounded-full px-3 py-1 text-xs font-bold", answerFeedback.correct ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{answerFeedback.label}</span> : null}
                    </div>
                    {studentAnswer.trim() || "Resposta mental, sem texto digitado."}
                    {answerFeedback ? <p className="mt-2 text-xs text-slate-500">{answerFeedback.helper}</p> : null}
                  </div>
                  <div className="rounded-lg border border-blue-100 bg-slate-50 p-4 text-left text-sm leading-relaxed text-slate-700">
                    <strong className="block text-blue-700">Resposta</strong>
                    {activeCard.resposta}
                    {activeCard.explicacao ? <p className="mt-3 text-slate-500">{activeCard.explicacao}</p> : null}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {reviewActions.map(([label, days, quality, variant]) => <Button key={label} variant={variant} onClick={() => review(activeCard, label, days, quality)}>{label}</Button>)}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <Button variant="secondary" onClick={() => goToCard(-1)}>Anterior</Button>
                <span className="text-xs font-semibold text-slate-500">Flashcard {cardPosition} de {filtered.length}</span>
                <Button variant="secondary" onClick={() => goToCard(1)}>Proximo</Button>
              </div>
            </div>
          </section>
        ) : <EmptyState icon={Search} title="Nenhum flashcard encontrado" description="Ajuste a busca para voltar aos cards." />}
      </main>

    </div>
  );
}
