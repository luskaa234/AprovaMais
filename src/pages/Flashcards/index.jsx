import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { Archive, BarChart3, Bookmark, Brain, CalendarCheck, Clock, Edit3, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { flashcardsService } from "../../services";

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (days) => {
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
};
const statusOptions = ["Novo", "Em revisao", "Dominado", "Arquivado"];
const difficultyOptions = ["Facil", "Medio", "Dificil"];
const tabFilters = ["Todos", "Novos", "Em revisao", "Dominados", "Favoritos", "Meus", "Plataforma"];
const reviewActions = [
  ["Errei", 0, 0, "danger"],
  ["Fazer depois", 1, 1, "secondary"],
  ["Acertei", 5, 5, "primary"],
];

function unique(items) {
  return [...new Set(items.filter(Boolean))];
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

function emptyDraft() {
  return {
    pergunta: "",
    resposta: "",
    explicacao: "",
    materia: "",
    assunto: "",
    subassunto: "",
    concurso: "PRF",
    dificuldade: "Medio",
    status: "Novo",
  };
}

export default function FlashcardsPage() {
  const load = useCallback(() => flashcardsService.getDecks(), []);
  const { data: decks = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filters, setFilters] = useState({ concurso: "", materia: "", assunto: "", subassunto: "", dificuldade: "", status: "", origem: "", favorito: "" });
  const [tab, setTab] = useState("Todos");
  const [localCards, setLocalCards] = useState([]);
  const [overrides, setOverrides] = useState({});
  const [deleted, setDeleted] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(emptyDraft());

  const baseCards = useMemo(() => decks.flatMap((deck, deckIndex) => (deck.cards || []).map((card, cardIndex) => normalizeCard(deck, card, deckIndex, cardIndex))), [decks]);
  const cards = useMemo(() => [...localCards, ...baseCards].filter((card) => !deleted.includes(card.id)).map((card) => ({ ...card, ...(overrides[card.id] || {}) })), [baseCards, deleted, localCards, overrides]);
  const filtered = useMemo(() => cards.filter((card) => {
    const text = [card.pergunta, card.resposta, card.explicacao, card.materia, card.assunto, card.subassunto, card.concurso].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    if (filters.concurso && card.concurso !== filters.concurso) return false;
    if (filters.materia && card.materia !== filters.materia) return false;
    if (filters.assunto && card.assunto !== filters.assunto) return false;
    if (filters.subassunto && card.subassunto !== filters.subassunto) return false;
    if (filters.dificuldade && card.dificuldade !== filters.dificuldade) return false;
    if (filters.status && card.status !== filters.status) return false;
    if (filters.origem && card.origem !== filters.origem) return false;
    if (filters.favorito === "sim" && !card.favorito) return false;
    if (tab === "Novos" && card.status !== "Novo") return false;
    if (tab === "Em revisao" && card.status !== "Em revisao") return false;
    if (tab === "Dominados" && card.status !== "Dominado") return false;
    if (tab === "Favoritos" && !card.favorito) return false;
    if (tab === "Meus" && card.origem !== "usuario") return false;
    if (tab === "Plataforma" && card.origem !== "plataforma") return false;
    return true;
  }), [cards, deferredQuery, filters, tab]);
  const visibleCards = filtered.slice(0, 18);
  const activeCard = cards.find((card) => card.id === activeId) || filtered[0];
  const dueCards = cards.filter((card) => card.proximaRevisao <= today() && card.status !== "Arquivado");
  const accuracy = cards.length ? Math.round(cards.reduce((sum, card) => sum + card.dominio, 0) / cards.length) : 0;

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);
  const saveCard = useCallback(() => {
    if (!draft.pergunta.trim()) return;
    if (modal === "edit") {
      setOverrides((current) => ({ ...current, [draft.id]: { ...draft } }));
      notify("Flashcard atualizado", "As alteracoes foram salvas.");
    } else {
      setLocalCards((current) => [{ ...draft, id: `fc-${Date.now()}`, origem: "usuario", favorito: false, criadoEm: today(), proximaRevisao: today(), acertos: 0, erros: 0, dominio: 0 }, ...current]);
      notify("Flashcard criado", "Novo card adicionado aos seus estudos.");
    }
    setDraft(emptyDraft());
    setModal(null);
  }, [draft, modal, notify]);
  const editCard = useCallback((card) => {
    setDraft(card);
    setModal("edit");
  }, []);
  const deleteCard = useCallback((card) => {
    setDeleted((current) => [...current, card.id]);
    notify("Flashcard removido", "O card saiu da lista ativa.");
  }, [notify]);
  const toggleFavorite = useCallback((card) => {
    setOverrides((current) => ({ ...current, [card.id]: { ...(current[card.id] || {}), favorito: !card.favorito } }));
  }, []);
  const archiveCard = useCallback((card) => {
    setOverrides((current) => ({ ...current, [card.id]: { ...(current[card.id] || {}), status: "Arquivado" } }));
  }, []);
  const review = useCallback((card, label, days, quality) => {
    const acerto = quality >= 3;
    const acertos = (card.acertos || 0) + (acerto ? 1 : 0);
    const erros = (card.erros || 0) + (acerto ? 0 : 1);
    const dominio = Math.max(0, Math.min(100, (card.dominio || 0) + (quality === 0 ? -18 : quality * 8)));
    const status = dominio >= 80 ? "Dominado" : "Em revisao";
    setOverrides((current) => ({ ...current, [card.id]: { ...(current[card.id] || {}), acertos, erros, dominio, status, proximaRevisao: addDays(days) } }));
    setShowAnswer(false);
    setActiveId(filtered.find((item) => item.id !== card.id)?.id || card.id);
    notify("Revisao registrada", `${label}: proxima revisao atualizada.`);
  }, [filtered, notify]);

  const dashboard = [
    ["Revisoes de hoje", dueCards.length ? "Iniciar revisao" : "Sem pendencias", CalendarCheck],
    ["Pronto para revisar", dueCards[0]?.materia || "Sequencia em dia", Clock],
    ["Seu progresso", `${accuracy}% de dominio`, BarChart3],
  ];

  return (
    <div className="mx-auto max-w-[1500px] pb-10 text-slate-900">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-black text-slate-950">Flashcards</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input icon={Search} placeholder="Buscar flashcards..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Button icon={Plus} onClick={() => { setDraft(emptyDraft()); setModal("create"); }}>Novo flashcard</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 rounded-lg border border-blue-100 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        <Select label="Concurso" placeholder="Todos" options={unique(cards.map((card) => card.concurso))} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
        <Select label="Materia" placeholder="Todas" options={unique(cards.map((card) => card.materia))} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
        <Select label="Assunto" placeholder="Todos" options={unique(cards.map((card) => card.assunto))} value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
        <Select label="Subassunto" placeholder="Todos" options={unique(cards.map((card) => card.subassunto))} value={filters.subassunto} onChange={(event) => setFilters((current) => ({ ...current, subassunto: event.target.value }))} />
        <Select label="Nivel" placeholder="Todos" options={difficultyOptions} value={filters.dificuldade} onChange={(event) => setFilters((current) => ({ ...current, dificuldade: event.target.value }))} />
        <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
        <Select label="Favoritos" placeholder="Todos" options={[{ value: "sim", label: "Favoritos" }]} value={filters.favorito} onChange={(event) => setFilters((current) => ({ ...current, favorito: event.target.value }))} />
        <Select label="Origem" placeholder="Todas" options={[{ value: "usuario", label: "Meus flashcards" }, { value: "plataforma", label: "Plataforma" }]} value={filters.origem} onChange={(event) => setFilters((current) => ({ ...current, origem: event.target.value }))} />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
        <aside className="space-y-4">
          {dashboard.map(([label, value, Icon], index) => (
            <Card hover={false} className="border-blue-100 bg-white p-4 shadow-sm" key={label}>
              <div className="flex items-center justify-between gap-3">
                <div><h2 className="text-sm font-bold text-slate-950">{label}</h2><p className="mt-2 text-xs text-slate-500">{value}</p></div>
                <span className="grid size-12 place-items-center rounded-full bg-blue-50 text-blue-700"><Icon size={18} /></span>
              </div>
              {index === 0 ? <Button className="mt-4 w-full" onClick={() => { setTab("Todos"); setActiveId(dueCards[0]?.id || filtered[0]?.id); }}>Iniciar revisao</Button> : null}
            </Card>
          ))}
        </aside>

        <main className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
          <div className="flex gap-2 overflow-x-auto border-b border-slate-100 px-4 pt-3">
            {tabFilters.map((item) => <button key={item} onClick={() => { setTab(item); setActiveId(null); setShowAnswer(false); }} className={cx("whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold", tab === item ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-950")}>{item}</button>)}
          </div>

          {activeCard ? (
            <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <section className="grid min-h-[360px] place-items-center rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
                <div className="w-full max-w-3xl">
                  <div className="mb-6 flex flex-wrap justify-center gap-2">
                    <Badge>{activeCard.materia}</Badge>
                    {activeCard.assunto !== activeCard.materia ? <Badge variant="neutral">{activeCard.assunto}</Badge> : null}
                    <Badge variant={activeCard.dificuldade === "Dificil" ? "error" : "neutral"}>{activeCard.dificuldade}</Badge>
                  </div>
                  <h2 className="mx-auto max-w-2xl text-xl font-black leading-snug text-slate-950 sm:text-2xl">{activeCard.pergunta}</h2>
                  {!showAnswer ? <Button className="mt-8" onClick={() => setShowAnswer(true)}>Ver resposta</Button> : (
                    <div className="mt-8 grid gap-4">
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
                </div>
              </section>

              <section className="max-h-[540px] space-y-3 overflow-y-auto pr-1">
                {visibleCards.map((card) => (
                  <button key={card.id} onClick={() => { setActiveId(card.id); setShowAnswer(false); }} className={cx("w-full rounded-lg border p-3 text-left transition", activeCard.id === card.id ? "border-blue-500 bg-blue-600 text-white shadow-sm" : "border-blue-100 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50")}>
                    <div className="flex items-center justify-between gap-2"><strong className="line-clamp-1 text-sm">{card.pergunta}</strong><Bookmark size={15} className={card.favorito ? "fill-current" : ""} /></div>
                    <p className="mt-1 text-xs opacity-75">{card.materia} - {card.status}</p>
                  </button>
                ))}
              </section>
            </div>
          ) : <EmptyState icon={Search} title="Nenhum flashcard encontrado" description="Ajuste a busca ou os filtros." />}
        </main>

        <aside className="space-y-4">
          <Card hover={false} className="border-blue-100 bg-white shadow-sm">
            <h2 className="mb-3 font-bold text-slate-950">Detalhes</h2>
            {activeCard ? (
              <div className="space-y-3 text-sm text-slate-600">
                <p><strong className="text-slate-950">Proxima revisao:</strong> {activeCard.proximaRevisao}</p>
                <p><strong className="text-slate-950">Dominio:</strong> {activeCard.dominio}%</p>
                <p><strong className="text-slate-950">Origem:</strong> {activeCard.origem === "usuario" ? "Meus flashcards" : "Plataforma"}</p>
                <div className="grid gap-2 pt-2">
                  <Button size="sm" variant="secondary" icon={Bookmark} onClick={() => toggleFavorite(activeCard)}>Favoritar</Button>
                  <Button size="sm" variant="secondary" icon={Edit3} onClick={() => editCard(activeCard)}>Editar</Button>
                  <Button size="sm" variant="secondary" icon={Archive} onClick={() => archiveCard(activeCard)}>Arquivar</Button>
                  <Button size="sm" variant="danger" icon={Trash2} onClick={() => deleteCard(activeCard)}>Excluir</Button>
                </div>
              </div>
            ) : null}
          </Card>
          <Card hover={false} className="border-blue-100 bg-white shadow-sm">
            <h2 className="mb-3 font-bold text-slate-950">Integracoes</h2>
            <div className="grid gap-2">
              <Button size="sm" variant="ghost" icon={Brain} onClick={() => notify("Plano atualizado", "Flashcard enviado para o plano de estudos.")}>Enviar para o plano</Button>
              <Button size="sm" variant="ghost" icon={MoreVertical} onClick={() => notify("Fonte conectada", "Voce podera gerar cards de mapas, erros e leis secas.")}>Criar por fonte</Button>
            </div>
          </Card>
        </aside>
      </div>

      <Modal open={Boolean(modal)} title={modal === "edit" ? "Editar flashcard" : "Novo flashcard"} onClose={() => setModal(null)} footer={<Button onClick={saveCard}>{modal === "edit" ? "Salvar alteracoes" : "Criar flashcard"}</Button>}>
        <div className="grid gap-3">
          <Input label="Pergunta" value={draft.pergunta} onChange={(event) => setDraft((current) => ({ ...current, pergunta: event.target.value }))} />
          <Input label="Resposta" value={draft.resposta} onChange={(event) => setDraft((current) => ({ ...current, resposta: event.target.value }))} />
          <Input label="Explicacao" value={draft.explicacao} onChange={(event) => setDraft((current) => ({ ...current, explicacao: event.target.value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Materia" value={draft.materia} onChange={(event) => setDraft((current) => ({ ...current, materia: event.target.value }))} />
            <Input label="Assunto" value={draft.assunto} onChange={(event) => setDraft((current) => ({ ...current, assunto: event.target.value }))} />
            <Input label="Subassunto" value={draft.subassunto} onChange={(event) => setDraft((current) => ({ ...current, subassunto: event.target.value }))} />
            <Input label="Concurso" value={draft.concurso} onChange={(event) => setDraft((current) => ({ ...current, concurso: event.target.value }))} />
            <Select label="Dificuldade" options={difficultyOptions} value={draft.dificuldade} onChange={(event) => setDraft((current) => ({ ...current, dificuldade: event.target.value }))} />
            <Select label="Status" options={statusOptions} value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
