import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { BarChart3, Bookmark, Brain, CalendarCheck, CheckCircle2, Clock, Search, Target } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { flashcardsService } from "../../services";

const today = () => new Date().toISOString().slice(0, 10);
const studyModes = ["Estudo rapido", "Por materia", "Por concurso", "Revisao do dia", "Revisao de erros"];
const difficultyOptions = [
  { value: "basico", label: "Basico" },
  { value: "medio", label: "Medio" },
  { value: "avancado", label: "Avancado" },
];
const statusOptions = [
  { value: "Novo", label: "Novo" },
  { value: "Em Revisao", label: "Em Revisao" },
  { value: "Dominado", label: "Dominado" },
];
const answerTypes = ["Mental", "Escrita", "Opcao"];

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeCard(deck, card, deckIndex, cardIndex) {
  const repetitions = card.repetitions || card.repeticoes || 0;
  const dueAt = card.dueAt || card.proxima || today();
  const dominio = repetitions >= 4 ? "Dominado" : repetitions > 0 || (deck.retencao || 0) > 0 ? "Em Revisao" : "Novo";
  const assunto = card.assunto || deck.assunto || card.frente?.split(":")?.[0] || deck.materia;
  return {
    ...card,
    id: card.id || `${deck.id}-${cardIndex}`,
    deckId: deck.id,
    deckTitle: deck.titulo,
    concurso: deck.concurso || (deckIndex % 2 ? "PRF" : "PM"),
    materia: deck.materia || "Geral",
    assunto,
    subassunto: card.subassunto || deck.subassunto || "Pontos de prova",
    dificuldade: card.dificuldade || (deck.retencao >= 75 ? "avancado" : deck.retencao >= 45 ? "medio" : "basico"),
    status: dominio,
    origem: card.origem || deck.origem || (deck.id?.includes("user") ? "usuario" : "plataforma"),
    favorito: Boolean(card.favorito),
    dueAt,
    repetitions,
    acertos: repetitions,
    respostaTipo: card.respostaTipo || answerTypes[(deckIndex + cardIndex) % answerTypes.length],
    opcoes: card.opcoes || [
      card.verso,
      "Conceito relacionado, mas incompleto para o enunciado.",
      "Resposta incorreta comum em provas.",
    ].filter(Boolean),
  };
}

function metricTone(value) {
  if (value >= 75) return "text-blue-300";
  if (value >= 45) return "text-amber-300";
  return "text-red-300";
}

export default function FlashcardsPage() {
  const load = useCallback(() => flashcardsService.getDecks(), []);
  const { data: decks = [], setData } = useAsyncData(load);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [mode, setMode] = useState(studyModes[0]);
  const [filters, setFilters] = useState({ concurso: "", materia: "", assunto: "", subassunto: "", dificuldade: "", status: "", origem: "", favoritos: "" });
  const [studyCard, setStudyCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const cards = useMemo(() => decks.flatMap((deck, deckIndex) => (deck.cards || []).map((card, cardIndex) => normalizeCard(deck, card, deckIndex, cardIndex))), [decks]);
  const accuracy = useMemo(() => cards.length ? Math.round(cards.reduce((sum, card) => sum + Math.min(100, (card.repetitions || 0) * 22), 0) / cards.length) : 0, [cards]);
  const dueCards = useMemo(() => cards.filter((card) => card.dueAt <= today()), [cards]);

  const filteredCards = useMemo(() => cards.filter((card) => {
    const haystack = [card.frente, card.verso, card.materia, card.assunto, card.subassunto, card.concurso].join(" ").toLowerCase();
    if (deferredQuery && !haystack.includes(deferredQuery.toLowerCase())) return false;
    if (filters.concurso && card.concurso !== filters.concurso) return false;
    if (filters.materia && card.materia !== filters.materia) return false;
    if (filters.assunto && card.assunto !== filters.assunto) return false;
    if (filters.subassunto && card.subassunto !== filters.subassunto) return false;
    if (filters.dificuldade && card.dificuldade !== filters.dificuldade) return false;
    if (filters.status && card.status !== filters.status) return false;
    if (filters.origem && card.origem !== filters.origem) return false;
    if (filters.favoritos === "sim" && !card.favorito) return false;
    if (mode === "Revisao do dia" && card.dueAt > today()) return false;
    if (mode === "Revisao de erros" && card.repetitions > 0) return false;
    return true;
  }), [cards, deferredQuery, filters, mode]);
  const visibleCards = useMemo(() => filteredCards.slice(0, 48), [filteredCards]);

  const dashboard = [
    ["Revisoes pendentes", dueCards.length ? "Prioridade hoje" : "Em dia", CalendarCheck],
    ["Revisoes do dia", dueCards.length ? "Comecar agora" : "Sem urgencia", Clock],
    ["Taxa de acerto", `${accuracy}%`, Target],
    ["Mais revisada", cards[0]?.materia || "Aguardando estudo", BarChart3],
  ];

  const rate = useCallback(async (quality, nextAction = true) => {
    if (!studyCard) return;
    const updated = await flashcardsService.avaliar(studyCard, quality);
    setData((items) => items.map((deck) => ({
      ...deck,
      cards: (deck.cards || []).map((card) => card.id === studyCard.id ? { ...card, ...updated } : card),
    })));
    setShowAnswer(false);
    setWrittenAnswer("");
    setSelectedOption("");
    setStudyCard(nextAction ? filteredCards.find((card) => card.id !== studyCard.id) || null : null);
  }, [filteredCards, setData, studyCard]);

  const openStudy = useCallback((card) => {
    setStudyCard(card);
    setShowAnswer(card.respostaTipo === "Mental");
    setWrittenAnswer("");
    setSelectedOption("");
  }, []);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Flashcards</p>
          <h1 className="text-3xl font-black text-white">Revisao ativa para concursos</h1>
          <p className="mt-1 text-sm text-gray-400">Pergunta, resposta, explicacao e repeticao espacada no estilo Anki.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input icon={Search} placeholder="Pesquisar flashcard" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {dashboard.map(([label, value, Icon], index) => (
          <Card hover={false} className="p-4" key={label}>
            <Icon className={index === 2 ? metricTone(accuracy) : "text-blue-300"} size={18} />
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
            <strong className="mt-1 block text-lg text-white">{value}</strong>
          </Card>
        ))}
      </div>

      <Card hover={false} className="mb-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {studyModes.map((item) => <button key={item} onClick={() => setMode(item)} className={cx("rounded-lg px-3 py-2 text-sm font-semibold transition", mode === item ? "bg-blue-600 text-white" : "bg-gray-900 text-gray-300 hover:bg-gray-800")}>{item}</button>)}
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Select label="Concurso" placeholder="Todos" options={unique(cards.map((card) => card.concurso))} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
          <Select label="Materia" placeholder="Todas" options={unique(cards.map((card) => card.materia))} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
          <Select label="Assunto" placeholder="Todos" options={unique(cards.map((card) => card.assunto))} value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
          <Select label="Subassunto" placeholder="Todos" options={unique(cards.map((card) => card.subassunto))} value={filters.subassunto} onChange={(event) => setFilters((current) => ({ ...current, subassunto: event.target.value }))} />
          <Select label="Nivel" placeholder="Todos" options={difficultyOptions} value={filters.dificuldade} onChange={(event) => setFilters((current) => ({ ...current, dificuldade: event.target.value }))} />
          <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
          <Select label="Favoritos" placeholder="Todos" options={[{ value: "sim", label: "Favoritos" }]} value={filters.favoritos} onChange={(event) => setFilters((current) => ({ ...current, favoritos: event.target.value }))} />
          <Select label="Origem" placeholder="Todas" options={[{ value: "usuario", label: "Criados pelo usuario" }, { value: "plataforma", label: "Criados pela plataforma" }]} value={filters.origem} onChange={(event) => setFilters((current) => ({ ...current, origem: event.target.value }))} />
        </div>
      </Card>

      {filteredCards.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((card) => (
            <Card hover={false} key={card.id} className="flex min-h-64 flex-col">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-2"><Badge>{card.materia}</Badge><Badge variant="neutral">{card.status}</Badge></div>
                <Bookmark className={card.favorito ? "fill-blue-300 text-blue-300" : "text-gray-500"} size={18} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{card.concurso} · {card.assunto}</p>
              <h2 className="mt-2 flex-1 text-lg font-black leading-snug text-white">{card.frente}</h2>
              <p className="mt-3 line-clamp-2 text-sm text-gray-400">{card.subassunto} · proxima revisao {card.dueAt}</p>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1" icon={Brain} onClick={() => openStudy(card)}>Estudar</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : <EmptyState icon={Search} title="Nenhum flashcard encontrado" description="Ajuste os filtros ou crie um novo flashcard para iniciar a revisao." />}

      <Modal open={Boolean(studyCard)} title="Modo de estudo" onClose={() => setStudyCard(null)} size="lg">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
          <div className="mb-4 flex flex-wrap gap-2"><Badge>{studyCard?.materia}</Badge><Badge variant="neutral">{studyCard?.assunto}</Badge><Badge variant="neutral">{studyCard?.status}</Badge></div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Pergunta</p>
          <h2 className="mt-2 text-2xl font-black leading-snug text-white">{studyCard?.frente}</h2>
          {studyCard?.respostaTipo === "Escrita" && !showAnswer ? (
            <div className="mt-5 grid gap-3">
              <label className="grid gap-2 text-sm font-semibold text-gray-300">
                Responda com suas palavras
                <textarea className="min-h-32 rounded-lg border border-gray-700 bg-gray-950 p-3 text-sm text-gray-100 outline-none focus:border-blue-400" value={writtenAnswer} onChange={(event) => setWrittenAnswer(event.target.value)} placeholder="Digite sua resposta..." />
              </label>
              <Button onClick={() => setShowAnswer(true)}>Ver Resposta</Button>
            </div>
          ) : null}
          {studyCard?.respostaTipo === "Opcao" && !showAnswer ? (
            <div className="mt-5 grid gap-2">
              {(studyCard?.opcoes || []).map((option, index) => (
                <button key={`${option}-${index}`} onClick={() => setSelectedOption(option)} className={cx("rounded-lg border p-3 text-left text-sm transition", selectedOption === option ? "border-blue-600 bg-blue-600 text-white" : "border-gray-700 bg-gray-950 text-gray-200 hover:border-blue-400")}>
                  <span className="mr-2 font-black">{String.fromCharCode(65 + index)}.</span>{option}
                </button>
              ))}
              <Button className="mt-2" disabled={!selectedOption} onClick={() => setShowAnswer(true)}>Conferir resposta</Button>
            </div>
          ) : null}
          {studyCard?.respostaTipo === "Mental" && !showAnswer ? <Button className="mt-5" onClick={() => setShowAnswer(true)}>Proximo</Button> : null}
          {showAnswer ? (
            <div className="mt-5 grid gap-4">
              <div className="rounded-lg bg-gray-950 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-300">Resposta e explicacao</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-200">{studyCard?.verso}</p>
              </div>
              {writtenAnswer ? <div className="rounded-lg bg-gray-950 p-4 text-sm text-gray-300"><strong>Sua resposta:</strong> {writtenAnswer}</div> : null}
              {selectedOption ? <div className="rounded-lg bg-gray-950 p-4 text-sm text-gray-300"><strong>Opcao escolhida:</strong> {selectedOption}</div> : null}
              <div className="flex flex-wrap gap-2">
                <Button variant="danger" onClick={() => rate(1)}>Errei</Button>
                <Button onClick={() => rate(5)}>Acertei</Button>
                <Button variant="secondary" onClick={() => rate(3)}>Fazer depois</Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
