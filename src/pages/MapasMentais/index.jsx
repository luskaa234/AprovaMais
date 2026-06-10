import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";
import { Bookmark, Brain, CalendarCheck, Download, Edit3, FileQuestion, FileText, Maximize2, Plus, Printer, Search, Share2, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { mapasService } from "../../services";

const levelOptions = ["Basico", "Intermediario", "Avancado"];
const tabs = ["Todos", "Favoritos", "Recentes", "Meus mapas", "Plataforma"];

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function emptyMap() {
  return {
    titulo: "",
    descricao: "",
    concurso: "PRF",
    materia: "",
    assunto: "",
    banca: "FGV",
    nivel: "Intermediario",
    tagsText: "",
  };
}

function normalizeMap(item, index) {
  const title = item.titulo || item.materia || "Mapa mental";
  return {
    id: item.id || `map-${index}`,
    titulo: title,
    descricao: item.descricao || `Mapa mental sobre ${title}, com foco em revisao para concursos.`,
    concurso: item.concurso || (index % 2 ? "PRF" : "PM"),
    materia: item.materia || title,
    assunto: item.assunto || item.root?.children?.[0]?.label || "Fundamentos",
    banca: item.banca || ["FGV", "CEBRASPE", "IBFC"][index % 3],
    nivel: item.nivel || levelOptions[index % 3],
    tags: item.tags || ["mapa mental", item.materia || title, "revisao"].filter(Boolean),
    favorito: Boolean(item.favorito),
    origem: item.origem || "plataforma",
    criadoEm: item.criadoEm || "2026-06-01",
    atualizadoEm: item.atualizadoEm || "2026-06-09",
    root: item.root || { label: title, children: [] },
    flashcardsRelacionados: item.flashcardsRelacionados || 5,
    questoesRelacionadas: item.questoesRelacionadas || 12,
  };
}

function buildRootFromDraft(draft) {
  const main = draft.assunto || draft.titulo || "Novo mapa";
  return {
    label: main,
    children: [
      { label: "Conceito central", children: [{ label: "Definicao", children: [] }, { label: "Palavras-chave", children: [] }] },
      { label: "Aplicacao em prova", children: [{ label: draft.banca || "Banca", children: [] }, { label: "Pegadinhas", children: [] }] },
      { label: "Revisao rapida", children: [{ label: "Resumo", children: [] }, { label: "Questoes", children: [] }] },
    ],
  };
}

function nodePoints(branches, collapsed) {
  return branches.map((branch, index) => {
    const angle = (index / Math.max(1, branches.length)) * Math.PI * 2 - Math.PI / 2;
    return { branch, collapsed: collapsed[branch.label], x: 500 + Math.cos(angle) * 280, y: 310 + Math.sin(angle) * 205 };
  });
}

export default function MapasMentaisPage() {
  const load = useCallback(() => mapasService.getMapas(), []);
  const { data: source = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [tab, setTab] = useState("Todos");
  const [filters, setFilters] = useState({ concurso: "", materia: "", assunto: "", banca: "", nivel: "", favorito: "", origem: "" });
  const [localMaps, setLocalMaps] = useState([]);
  const [overrides, setOverrides] = useState({});
  const [deleted, setDeleted] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);
  const frameRef = useRef(null);
  const [full, setFull] = useState(false);
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(emptyMap());

  const maps = useMemo(() => [...localMaps, ...source.map(normalizeMap)].filter((item) => !deleted.includes(item.id)).map((item) => ({ ...item, ...(overrides[item.id] || {}) })), [deleted, localMaps, overrides, source]);
  const filtered = useMemo(() => maps.filter((item) => {
    const text = [item.titulo, item.descricao, item.concurso, item.materia, item.assunto, item.banca, item.nivel, ...(item.tags || [])].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    if (filters.concurso && item.concurso !== filters.concurso) return false;
    if (filters.materia && item.materia !== filters.materia) return false;
    if (filters.assunto && item.assunto !== filters.assunto) return false;
    if (filters.banca && item.banca !== filters.banca) return false;
    if (filters.nivel && item.nivel !== filters.nivel) return false;
    if (filters.favorito === "sim" && !item.favorito) return false;
    if (filters.origem && item.origem !== filters.origem) return false;
    if (tab === "Favoritos" && !item.favorito) return false;
    if (tab === "Recentes" && item.atualizadoEm < "2026-06-01") return false;
    if (tab === "Meus mapas" && item.origem !== "usuario") return false;
    if (tab === "Plataforma" && item.origem !== "plataforma") return false;
    return true;
  }), [deferredQuery, filters, maps, tab]);
  const visibleMaps = filtered.slice(0, 60);
  const activeMap = maps.find((item) => item.id === activeId) || filtered[0];
  const points = useMemo(() => nodePoints(activeMap?.root?.children || [], collapsed), [activeMap, collapsed]);

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);
  const saveMap = useCallback(() => {
    if (!draft.titulo.trim()) return;
    if (modal === "edit") {
      setOverrides((current) => ({ ...current, [draft.id]: { ...draft, tags: draft.tagsText?.split(",").map((tag) => tag.trim()).filter(Boolean) || draft.tags, root: draft.root || buildRootFromDraft(draft), atualizadoEm: new Date().toISOString().slice(0, 10) } }));
      notify("Mapa atualizado", "Alteracoes salvas.");
    } else {
      const map = { ...draft, id: `map-user-${Date.now()}`, origem: "usuario", favorito: false, tags: draft.tagsText.split(",").map((tag) => tag.trim()).filter(Boolean), criadoEm: new Date().toISOString().slice(0, 10), atualizadoEm: new Date().toISOString().slice(0, 10), root: buildRootFromDraft(draft), flashcardsRelacionados: 0, questoesRelacionadas: 0 };
      setLocalMaps((current) => [map, ...current]);
      setActiveId(map.id);
      notify("Mapa criado", "Novo mapa adicionado aos seus estudos.");
    }
    setDraft(emptyMap());
    setModal(null);
  }, [draft, modal, notify]);
  const editMap = useCallback((map) => {
    setDraft({ ...map, tagsText: (map.tags || []).join(", ") });
    setModal("edit");
  }, []);
  const deleteMap = useCallback((map) => {
    setDeleted((current) => [...current, map.id]);
    notify("Mapa removido", "O mapa saiu da lista ativa.");
  }, [notify]);
  const toggleFavorite = useCallback((map) => setOverrides((current) => ({ ...current, [map.id]: { ...(current[map.id] || {}), favorito: !map.favorito } })), []);
  const markStudied = useCallback((map) => {
    setOverrides((current) => ({ ...current, [map.id]: { ...(current[map.id] || {}), estudado: true, atualizadoEm: new Date().toISOString().slice(0, 10) } }));
    notify("Mapa estudado", "Progresso registrado e plano atualizado.");
  }, [notify]);
  const onMove = useCallback((event) => {
    if (!drag) return;
    const next = { x: event.clientX - drag.x, y: event.clientY - drag.y };
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setPan(next));
  }, [drag]);

  const viewer = activeMap ? (
    <Card hover={false} className={cx("overflow-hidden", full && "fixed inset-4 z-50 bg-gray-950")}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 p-3">
        <div><h2 className="font-bold text-white">{activeMap.titulo}</h2><p className="text-xs text-gray-500">{activeMap.concurso} · {activeMap.materia} · {activeMap.assunto}</p></div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" icon={ZoomOut} onClick={() => setZoom(Math.max(0.7, zoom - 0.1))} />
          <Button size="sm" variant="secondary" icon={ZoomIn} onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} />
          <Button size="sm" variant="ghost" icon={Maximize2} onClick={() => setFull((value) => !value)}>{full ? "Sair" : "Tela cheia"}</Button>
        </div>
      </div>
      <div className="h-[610px] cursor-grab overflow-auto bg-gray-900/60" onMouseDown={(event) => setDrag({ x: event.clientX - pan.x, y: event.clientY - pan.y })} onMouseMove={onMove} onMouseLeave={() => setDrag(null)} onMouseUp={() => setDrag(null)}>
        <svg width="1000" height="650" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center" }}>
          {points.map(({ branch, x, y, collapsed: isCollapsed }) => (
            <g key={branch.label}>
              <line x1="500" y1="310" x2={x} y2={y} stroke="#60a5fa" strokeWidth="2" />
              {!isCollapsed ? branch.children.map((child, childIndex) => {
                const spread = childIndex - (branch.children.length - 1) / 2;
                return <line key={child.label} x1={x} y1={y} x2={x + spread * 145} y2={y + (y > 310 ? 95 : -95)} stroke="#94a3b8" strokeWidth="1.5" />;
              }) : null}
            </g>
          ))}
          <foreignObject x="390" y="265" width="220" height="90"><div className="grid h-full place-items-center rounded-lg bg-blue-600 p-4 text-center text-lg font-black text-white">{activeMap.root?.label || activeMap.titulo}</div></foreignObject>
          {points.map(({ branch, x, y, collapsed: isCollapsed }) => (
            <g key={`${branch.label}-node`}>
              <foreignObject x={x - 82} y={y - 34} width="164" height="68"><button className="grid h-full w-full place-items-center rounded-lg border border-blue-300 bg-gray-950 p-2 text-center text-sm font-bold text-gray-100" onClick={() => setCollapsed((current) => ({ ...current, [branch.label]: !current[branch.label] }))}>{branch.label}</button></foreignObject>
              {!isCollapsed ? branch.children.map((child, childIndex) => {
                const spread = childIndex - (branch.children.length - 1) / 2;
                return <foreignObject key={child.label} x={x + spread * 145 - 65} y={y + (y > 310 ? 78 : -128)} width="130" height="58"><div className="grid h-full place-items-center rounded-lg border border-gray-700 bg-gray-950 p-2 text-center text-xs text-gray-200">{child.label}</div></foreignObject>;
              }) : null}
            </g>
          ))}
        </svg>
      </div>
    </Card>
  ) : null;

  return (
    <div className="mx-auto max-w-[1500px] pb-10">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-black text-white">Mapas Mentais</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input icon={Search} placeholder="Buscar mapas mentais..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <Button icon={Plus} onClick={() => { setDraft(emptyMap()); setModal("create"); }}>Novo mapa</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 rounded-lg border border-gray-800 bg-gray-950/70 p-4 md:grid-cols-2 xl:grid-cols-7">
        <Select label="Concurso" placeholder="Todos" options={unique(maps.map((item) => item.concurso))} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
        <Select label="Materia" placeholder="Todas" options={unique(maps.map((item) => item.materia))} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
        <Select label="Assunto" placeholder="Todos" options={unique(maps.map((item) => item.assunto))} value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
        <Select label="Banca" placeholder="Todas" options={unique(maps.map((item) => item.banca))} value={filters.banca} onChange={(event) => setFilters((current) => ({ ...current, banca: event.target.value }))} />
        <Select label="Nivel" placeholder="Todos" options={levelOptions} value={filters.nivel} onChange={(event) => setFilters((current) => ({ ...current, nivel: event.target.value }))} />
        <Select label="Favoritos" placeholder="Todos" options={[{ value: "sim", label: "Favoritos" }]} value={filters.favorito} onChange={(event) => setFilters((current) => ({ ...current, favorito: event.target.value }))} />
        <Select label="Origem" placeholder="Todas" options={[{ value: "usuario", label: "Meus mapas" }, { value: "plataforma", label: "Plataforma" }]} value={filters.origem} onChange={(event) => setFilters((current) => ({ ...current, origem: event.target.value }))} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[300px_1fr_300px]">
        <aside className="rounded-lg border border-gray-800 bg-gray-950/70">
          <div className="flex gap-2 overflow-x-auto border-b border-gray-800 px-3 pt-2">
            {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={cx("whitespace-nowrap border-b-2 px-2 py-3 text-sm font-semibold", tab === item ? "border-blue-500 text-white" : "border-transparent text-gray-400")}>{item}</button>)}
          </div>
          <div className="max-h-[650px] space-y-2 overflow-y-auto p-3">
            {visibleMaps.map((item) => (
              <button key={item.id} onClick={() => { setActiveId(item.id); setCollapsed({}); }} className={cx("w-full rounded-lg border p-3 text-left transition", activeMap?.id === item.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400")}>
                <div className="flex items-center justify-between gap-2"><strong className="text-sm">{item.titulo}</strong><Bookmark size={15} className={item.favorito ? "fill-current" : ""} /></div>
                <p className="mt-1 text-xs opacity-75">{item.materia} · {item.assunto}</p>
              </button>
            ))}
          </div>
        </aside>

        {activeMap ? viewer : <EmptyState icon={Search} title="Nenhum mapa encontrado" description="Ajuste os filtros ou crie um novo mapa." />}

        <aside className="space-y-4">
          <Card hover={false}>
            <div className="mb-3 flex items-start justify-between gap-2">
              <div><h2 className="font-bold text-white">{activeMap?.titulo}</h2><p className="mt-1 text-sm text-gray-400">{activeMap?.descricao}</p></div>
              <button onClick={() => activeMap && toggleFavorite(activeMap)} className="text-amber-300"><Bookmark size={18} className={activeMap?.favorito ? "fill-current" : ""} /></button>
            </div>
            {activeMap ? (
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong className="text-gray-200">Nivel:</strong> {activeMap.nivel}</p>
                <p><strong className="text-gray-200">Atualizado:</strong> {activeMap.atualizadoEm}</p>
                <p><strong className="text-gray-200">Relacionados:</strong> {activeMap.questoesRelacionadas} questoes · {activeMap.flashcardsRelacionados} flashcards</p>
                <div className="mt-3 flex flex-wrap gap-2">{(activeMap.tags || []).slice(0, 4).map((tag) => <Badge key={tag} variant="neutral">{tag}</Badge>)}</div>
              </div>
            ) : null}
          </Card>
          <Card hover={false}>
            <h2 className="mb-3 font-bold text-white">Acoes</h2>
            <div className="grid gap-2">
              <Button size="sm" icon={CalendarCheck} onClick={() => activeMap && markStudied(activeMap)}>Estudar este mapa</Button>
              <Button size="sm" variant="secondary" icon={Brain} onClick={() => notify("Flashcards gerados", "Flashcards criados a partir do mapa.")}>Gerar flashcards</Button>
              <Button size="sm" variant="secondary" icon={FileText} onClick={() => notify("Resumo gerado", "Resumo criado para revisao.")}>Gerar resumo</Button>
              <Button size="sm" variant="secondary" icon={FileQuestion} onClick={() => notify("Questoes geradas", "Questoes relacionadas adicionadas.")}>Gerar questoes</Button>
              <Button size="sm" variant="ghost" icon={Download} onClick={() => notify("PDF preparado", "Download do mapa iniciado.")}>Baixar PDF</Button>
              <Button size="sm" variant="ghost" icon={Printer} onClick={() => window.print()}>Imprimir</Button>
              <Button size="sm" variant="ghost" icon={Share2} onClick={() => notify("Link copiado", "Mapa pronto para compartilhar.")}>Compartilhar</Button>
              <Button size="sm" variant="ghost" icon={Edit3} onClick={() => activeMap && editMap(activeMap)}>Editar</Button>
              <Button size="sm" variant="danger" icon={Trash2} onClick={() => activeMap && deleteMap(activeMap)}>Excluir</Button>
            </div>
          </Card>
        </aside>
      </div>

      <Modal open={Boolean(modal)} title={modal === "edit" ? "Editar mapa" : "Novo mapa"} onClose={() => setModal(null)} footer={<Button onClick={saveMap}>{modal === "edit" ? "Salvar alteracoes" : "Criar mapa"}</Button>}>
        <div className="grid gap-3">
          <Input label="Titulo" value={draft.titulo} onChange={(event) => setDraft((current) => ({ ...current, titulo: event.target.value }))} />
          <Input label="Descricao" value={draft.descricao} onChange={(event) => setDraft((current) => ({ ...current, descricao: event.target.value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Concurso" value={draft.concurso} onChange={(event) => setDraft((current) => ({ ...current, concurso: event.target.value }))} />
            <Input label="Materia" value={draft.materia} onChange={(event) => setDraft((current) => ({ ...current, materia: event.target.value }))} />
            <Input label="Assunto" value={draft.assunto} onChange={(event) => setDraft((current) => ({ ...current, assunto: event.target.value }))} />
            <Input label="Banca" value={draft.banca} onChange={(event) => setDraft((current) => ({ ...current, banca: event.target.value }))} />
            <Select label="Nivel" options={levelOptions} value={draft.nivel} onChange={(event) => setDraft((current) => ({ ...current, nivel: event.target.value }))} />
            <Input label="Tags" value={draft.tagsText} onChange={(event) => setDraft((current) => ({ ...current, tagsText: event.target.value }))} placeholder="Separadas por virgula" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
