import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bookmark, Brain, CalendarCheck, Download, Edit3, FileQuestion, FileText, Info, Maximize2, Minus, Plus, Printer, Search, Share2, SlidersHorizontal, Trash2, X } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useInternalRouter, useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { aiService, flashcardsService, mapasService, questoesService } from "../../services";
import { useMapasStore } from "../../stores";

const levelOptions = ["Básico", "Intermediário", "Avançado"];
const tabs = ["Todos", "Favoritos", "Recentes", "Meus mapas", "Plataforma"];
const emptyFilters = { concurso: "", materia: "", assunto: "", banca: "", nivel: "", favorito: "", origem: "" };

function unique(items) {
  return [...new Set(items.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "pt-BR"));
}

function emptyMap() {
  return { titulo: "", descricao: "", concurso: "PRF", materia: "", assunto: "", banca: "FGV", nivel: "Intermediário", tagsText: "", svgUrl: "" };
}

function normalizeMap(item, index) {
  const title = item.titulo || item.materia || "Mapa mental";
  const svgUrl = item.svgUrl || item.svg_url || item.materialUrl || item.url || "";
  return {
    id: item.id || `map-${index}`,
    titulo: title,
    descricao: item.descricao || `Mapa mental sobre ${title}, com foco em revisão para concursos.`,
    concurso: item.concurso || (index % 2 ? "PRF" : "PM"),
    materia: item.materia || title,
    assunto: item.assunto || item.root?.children?.[0]?.label || "Fundamentos",
    banca: item.banca || ["FGV", "CEBRASPE", "IBFC"][index % 3],
    nivel: item.nivel || levelOptions[index % 3],
    tags: item.tags || ["mapa mental", item.materia || title, "revisão"].filter(Boolean),
    favorito: Boolean(item.favorito),
    origem: item.origem || "plataforma",
    criadoEm: item.criadoEm || "2026-06-01",
    atualizadoEm: item.atualizadoEm || "2026-06-09",
    root: item.root || { label: title, children: [] },
    svgUrl: /\.svg($|\?)/i.test(svgUrl) ? svgUrl : "",
    flashcardsRelacionados: item.flashcardsRelacionados || 5,
    questoesRelacionadas: item.questoesRelacionadas || 12,
  };
}

function buildRootFromDraft(draft) {
  const main = draft.assunto || draft.titulo || "Novo mapa";
  return {
    label: main,
    children: [
      { label: "Conceito central", children: [{ label: "Definição", children: [] }, { label: "Palavras-chave", children: [] }] },
      { label: "Aplicação em prova", children: [{ label: draft.banca || "Banca", children: [] }, { label: "Pegadinhas", children: [] }] },
      { label: "Revisão rápida", children: [{ label: "Resumo", children: [] }, { label: "Questões", children: [] }] },
    ],
  };
}

function nodePoints(branches) {
  return branches.map((branch, index) => {
    const angle = (index / Math.max(1, branches.length)) * Math.PI * 2 - Math.PI / 2;
    return { branch, x: 600 + Math.cos(angle) * 350, y: 380 + Math.sin(angle) * 245 };
  });
}

function distance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

/* ---------- Light bottom-sheet ---------- */
function LightSheet({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full rounded-t-3xl bg-white px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl"
            style={{ maxHeight: "90svh", overflowY: "auto" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 340 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => { if (info.offset.y > 72) onClose(); }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-black text-slate-900">{title}</h2>
              <button aria-label="Fechar" className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-100" onClick={onClose} type="button">
                <X size={17} />
              </button>
            </div>
            {children}
            {footer ? <div className="mt-4 flex gap-2">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------- Generated radial SVG ---------- */
function GeneratedMindMapSvg({ map, collapsed, onToggle, onNodeTap }) {
  const points = useMemo(() => nodePoints(map?.root?.children || []), [map]);

  return (
    <svg className="mindmap-generated-svg" viewBox="0 0 1200 760" role="img" aria-label={`Mapa mental: ${map?.titulo}`}>
      <defs>
        <linearGradient id="mindmapBlue" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="mindmapShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#1e3a8a" floodOpacity="0.16" />
        </filter>
      </defs>
      <rect width="1200" height="760" rx="28" fill="#f8fbff" />
      <g opacity="0.65">
        <circle cx="1040" cy="110" r="96" fill="#dbeafe" />
        <circle cx="120" cy="640" r="120" fill="#e0f2fe" />
      </g>
      {points.map(({ branch, x, y }) => (
        <g key={branch.label}>
          <path d={`M600 380 C ${600 + (x - 600) * 0.38} 380, ${x - (x - 600) * 0.35} ${y}, ${x} ${y}`} stroke="#60a5fa" strokeWidth="5" fill="none" strokeLinecap="round" />
          {!collapsed[branch.label] ? branch.children.map((child, childIndex) => {
            const spread = childIndex - (branch.children.length - 1) / 2;
            const childX = x + spread * 165;
            const childY = y + (y > 380 ? 112 : -112);
            return <path key={child.label} d={`M${x} ${y} C ${x} ${(y + childY) / 2}, ${childX} ${(y + childY) / 2}, ${childX} ${childY}`} stroke="#93c5fd" strokeWidth="3" fill="none" strokeLinecap="round" />;
          }) : null}
        </g>
      ))}
      <foreignObject x="470" y="315" width="260" height="130">
        <div className="mindmap-node mindmap-node-root" onClick={() => onNodeTap?.(map?.root?.label || map?.titulo, "root")}>
          {map?.root?.label || map?.titulo}
        </div>
      </foreignObject>
      {points.map(({ branch, x, y }) => (
        <g key={`${branch.label}-node`}>
          <foreignObject x={x - 108} y={y - 42} width="216" height="84">
            <button
              className="mindmap-node mindmap-node-branch"
              onClick={() => { onToggle(branch.label); onNodeTap?.(branch.label, "branch"); }}
              type="button"
            >
              {branch.label}
            </button>
          </foreignObject>
          {!collapsed[branch.label] ? branch.children.map((child, childIndex) => {
            const spread = childIndex - (branch.children.length - 1) / 2;
            return (
              <foreignObject key={child.label} x={x + spread * 165 - 82} y={y + (y > 380 ? 92 : -152)} width="164" height="64">
                <button
                  className="mindmap-node mindmap-node-leaf"
                  onClick={() => onNodeTap?.(child.label, "leaf")}
                  type="button"
                >
                  {child.label}
                </button>
              </foreignObject>
            );
          }) : null}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Map viewer ---------- */
function SvgMindMapViewer({ map, full, zoom, pan, collapsed, onCloseFull, onFullscreen, onZoom, onPan, onToggleNode, onNodeTap, onBack, onShowDetails, mobile }) {
  const pointers = useRef(new Map());
  const gesture = useRef({ panStart: pan, pointerStart: null, distanceStart: 0, zoomStart: zoom });

  useEffect(() => {
    pointers.current.clear();
  }, [map?.id]);

  const startGesture = useCallback((event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pointers.current.set(event.pointerId, event);
    if (pointers.current.size === 1) {
      gesture.current = { ...gesture.current, panStart: pan, pointerStart: event };
    }
    if (pointers.current.size === 2) {
      const [first, second] = [...pointers.current.values()];
      gesture.current = { ...gesture.current, distanceStart: distance(first, second), zoomStart: zoom };
    }
  }, [pan, zoom]);

  const moveGesture = useCallback((event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, event);
    if (pointers.current.size === 2) {
      const [first, second] = [...pointers.current.values()];
      const ratio = distance(first, second) / Math.max(1, gesture.current.distanceStart);
      onZoom(Math.max(0.35, Math.min(3.5, gesture.current.zoomStart * ratio)));
      return;
    }
    const start = gesture.current.pointerStart;
    if (!start) return;
    onPan({
      x: gesture.current.panStart.x + event.clientX - start.clientX,
      y: gesture.current.panStart.y + event.clientY - start.clientY,
    });
  }, [onPan, onZoom]);

  const endGesture = useCallback((event) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size === 1) {
      const [remaining] = [...pointers.current.values()];
      gesture.current = { ...gesture.current, panStart: pan, pointerStart: remaining };
    }
  }, [pan]);

  const onWheel = useCallback((event) => {
    event.preventDefault();
    onZoom(Math.max(0.35, Math.min(3.5, zoom + (event.deltaY > 0 ? -0.08 : 0.08))));
  }, [onZoom, zoom]);

  const centerMap = useCallback(() => { onZoom(1); onPan({ x: 0, y: 0 }); }, [onPan, onZoom]);

  return (
    <Card hover={false} className={cx("mindmap-viewer overflow-hidden p-0", full && "fixed inset-3 z-50", mobile && "mindmap-viewer-mobile")}>
      <div className="mindmap-viewer-toolbar">
        <div className="flex min-w-0 items-center gap-2">
          {mobile && onBack ? (
            <button aria-label="Voltar à lista" className="mr-1 flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black text-slate-600 transition active:scale-95" onClick={onBack} type="button">
              <ArrowLeft size={14} />
              Lista
            </button>
          ) : null}
          <div className="min-w-0">
            <h2 className="truncate font-black">{map.titulo}</h2>
            <p className="truncate text-xs">{map.concurso} · {map.materia} · {map.assunto}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button aria-label="Diminuir zoom" className="mindmap-zoom-btn" onClick={() => onZoom(Math.max(0.35, zoom - 0.14))} type="button"><Minus size={15} /></button>
          <button className="mindmap-zoom-btn mindmap-zoom-pct" onClick={centerMap} type="button">{Math.round(zoom * 100)}%</button>
          <button aria-label="Aumentar zoom" className="mindmap-zoom-btn" onClick={() => onZoom(Math.min(3.5, zoom + 0.14))} type="button"><Plus size={15} /></button>
          {!mobile ? (
            <button className="mindmap-zoom-btn" onClick={full ? onCloseFull : onFullscreen} type="button">
              {full ? <X size={15} /> : <Maximize2 size={15} />}
            </button>
          ) : null}
        </div>
      </div>
      <div
        className="mindmap-canvas"
        onPointerDown={startGesture}
        onPointerMove={moveGesture}
        onPointerCancel={endGesture}
        onPointerUp={endGesture}
        onWheel={onWheel}
      >
        <div className="mindmap-stage" style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}>
          {map.svgUrl ? (
            <img className="mindmap-svg-image" src={map.svgUrl} alt={`Mapa mental: ${map.titulo}`} loading="lazy" draggable={false} />
          ) : (
            <GeneratedMindMapSvg map={map} collapsed={collapsed} onToggle={onToggleNode} onNodeTap={onNodeTap} />
          )}
        </div>
      </div>
    </Card>
  );
}

/* ========== Page ========== */
export default function MapasMentaisPage() {
  const load = useCallback(() => mapasService.getMapas(), []);
  const { data: source = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const { navigate } = useInternalRouter();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [tab, setTab] = useState("Todos");
  const [cutoff30d] = useState(() => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [filters, setFilters] = useState(emptyFilters);
  const localMaps = useMapasStore((state) => state.localMaps);
  const overrides = useMapasStore((state) => state.overrides);
  const deleted = useMapasStore((state) => state.deleted);
  const activeId = useMapasStore((state) => state.activeId);
  const { addMap, setOverride, removeMap, setActiveId } = useMapasStore();
  const [collapsed, setCollapsed] = useState({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [full, setFull] = useState(false);
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(emptyMap());
  const [aiLoading, setAiLoading] = useState("");
  const [aiOutput, setAiOutput] = useState("");

  // Mobile-specific state
  const [mobileView, setMobileView] = useState("list"); // "list" | "viewer"
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [nodeSheet, setNodeSheet] = useState(null); // { label, type } | null
  const [detailsOpen, setDetailsOpen] = useState(false);

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
    if (tab === "Recentes" && item.atualizadoEm < cutoff30d) return false;
    if (tab === "Meus mapas" && item.origem !== "usuario") return false;
    if (tab === "Plataforma" && item.origem !== "plataforma") return false;
    return true;
  }), [cutoff30d, deferredQuery, filters, maps, tab]);
  const visibleMaps = filtered.slice(0, 80);
  const activeMap = maps.find((item) => item.id === activeId) || filtered[0];
  const groupedMaps = useMemo(() => visibleMaps.reduce((acc, item) => {
    const key = item.materia || "Geral";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {}), [visibleMaps]);

  const activeFilterCount = useMemo(() => Object.values(filters).filter(Boolean).length, [filters]);

  useEffect(() => {
    if (!full) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [full]);

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);

  const resetViewer = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); setCollapsed({}); }, []);

  const selectMap = useCallback((id) => {
    setActiveId(id);
    resetViewer();
    setMobileView("viewer");
  }, [resetViewer, setActiveId]);

  const saveMap = useCallback(() => {
    if (!draft.titulo.trim()) return;
    const tags = draft.tagsText?.split(",").map((tag) => tag.trim()).filter(Boolean) || draft.tags || [];
    if (modal === "edit") {
      setOverride(draft.id, { ...draft, tags, root: draft.root || buildRootFromDraft(draft), atualizadoEm: new Date().toISOString().slice(0, 10) });
      notify("Mapa atualizado", "Alterações salvas.");
    } else {
      const map = { ...draft, id: `map-user-${Date.now()}`, origem: "usuario", favorito: false, tags, criadoEm: new Date().toISOString().slice(0, 10), atualizadoEm: new Date().toISOString().slice(0, 10), root: buildRootFromDraft(draft), flashcardsRelacionados: 0, questoesRelacionadas: 0 };
      addMap(map);
      selectMap(map.id);
      notify("Mapa criado", "Novo mapa adicionado aos seus estudos.");
    }
    setDraft(emptyMap());
    setModal(null);
  }, [addMap, draft, modal, notify, selectMap, setOverride]);

  const editMap = useCallback((map) => { setDraft({ ...map, tagsText: (map.tags || []).join(", ") }); setModal("edit"); }, []);
  const deleteMap = useCallback((map) => { removeMap(map.id); notify("Mapa removido", "O mapa saiu da lista ativa."); }, [notify, removeMap]);
  const toggleFavorite = useCallback((map) => setOverride(map.id, { favorito: !map.favorito }), [setOverride]);

  const shareMap = useCallback(async (map) => {
    if (!map) return;
    const shareData = { title: map.titulo, text: `Mapa mental: ${map.titulo} — ${map.materia}`, url: window.location.href };
    try {
      if (navigator.share) { await navigator.share(shareData); }
      else { await navigator.clipboard.writeText(window.location.href); notify("Link copiado", "Endereço copiado para a área de transferência."); }
    } catch { /* usuário cancelou */ }
  }, [notify]);

  const markStudied = useCallback((map) => {
    setOverride(map.id, { estudado: true, atualizadoEm: new Date().toISOString().slice(0, 10) });
    notify("Mapa estudado", "Progresso registrado e plano atualizado.");
  }, [notify, setOverride]);

  const generateSummary = useCallback(async () => {
    if (!activeMap || aiLoading) return;
    setAiLoading("summary");
    try {
      const text = await aiService.gerarTexto(`Crie um resumo de revisao para este mapa mental. Seja objetivo, com topicos e foco em prova.
Mapa: ${activeMap.titulo}
Materia: ${activeMap.materia}
Assunto: ${activeMap.assunto}
Nos principais: ${JSON.stringify(activeMap.root || {})}`, { task: "summary", maxOutputTokens: 650, cache: true, cacheKey: `mapa-resumo:${activeMap.id}`, cacheTtlDays: 90, tier: "barato" });
      setAiOutput(text);
      notify("Resumo gerado", "Resumo criado com IA para este mapa.");
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar o resumo agora." });
    } finally { setAiLoading(""); }
  }, [activeMap, addNotification, aiLoading, notify]);

  const generateFlashcards = useCallback(async () => {
    if (!activeMap || aiLoading) return;
    setAiLoading("flashcards");
    try {
      const deck = await flashcardsService.gerarDeckIA(activeMap.assunto || activeMap.titulo, { materia: activeMap.materia, concurso: activeMap.concurso, quantidade: 6 });
      setOverride(activeMap.id, { flashcardsRelacionados: (activeMap.flashcardsRelacionados || 0) + (deck.cards?.length || 0) });
      notify("Flashcards gerados", `${deck.cards?.length || 0} cards adicionados ao treino.`);
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar flashcards agora." });
    } finally { setAiLoading(""); }
  }, [activeMap, addNotification, aiLoading, notify, setOverride]);

  const generateQuestions = useCallback(async () => {
    if (!activeMap || aiLoading) return;
    setAiLoading("questions");
    try {
      const rows = await questoesService.gerarQuestoesIA({ assunto: activeMap.assunto || activeMap.titulo, materia: activeMap.materia, concurso: activeMap.concurso, quantidade: 3, contexto: JSON.stringify(activeMap.root || {}) });
      setOverride(activeMap.id, { questoesRelacionadas: (activeMap.questoesRelacionadas || 0) + rows.length });
      sessionStorage.setItem("aprova-questoes-artigo-filter", JSON.stringify({ questoesIds: rows.map((item) => item.id), search: activeMap.assunto || activeMap.materia }));
      notify("Questões geradas", `${rows.length} questões adicionadas ao banco.`);
      navigate("questoes");
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar questões agora." });
    } finally { setAiLoading(""); }
  }, [activeMap, addNotification, aiLoading, navigate, notify, setOverride]);

  const filtersContent = (
    <div className="grid gap-3 xl:grid-cols-7">
      <Select label="Concurso" placeholder="Todos" options={unique(maps.map((item) => item.concurso))} value={filters.concurso} onChange={(e) => setFilters((c) => ({ ...c, concurso: e.target.value }))} />
      <Select label="Matéria" placeholder="Todas" options={unique(maps.map((item) => item.materia))} value={filters.materia} onChange={(e) => setFilters((c) => ({ ...c, materia: e.target.value }))} />
      <Select label="Assunto" placeholder="Todos" options={unique(maps.map((item) => item.assunto))} value={filters.assunto} onChange={(e) => setFilters((c) => ({ ...c, assunto: e.target.value }))} />
      <Select label="Banca" placeholder="Todas" options={unique(maps.map((item) => item.banca))} value={filters.banca} onChange={(e) => setFilters((c) => ({ ...c, banca: e.target.value }))} />
      <Select label="Nível" placeholder="Todos" options={levelOptions} value={filters.nivel} onChange={(e) => setFilters((c) => ({ ...c, nivel: e.target.value }))} />
      <Select label="Favoritos" placeholder="Todos" options={[{ value: "sim", label: "Favoritos" }]} value={filters.favorito} onChange={(e) => setFilters((c) => ({ ...c, favorito: e.target.value }))} />
      <Select label="Origem" placeholder="Todas" options={[{ value: "usuario", label: "Meus mapas" }, { value: "plataforma", label: "Plataforma" }]} value={filters.origem} onChange={(e) => setFilters((c) => ({ ...c, origem: e.target.value }))} />
    </div>
  );

  return (
    <div className="mindmaps-page mx-auto max-w-[1500px] pb-10" data-tour="tour-mapas-page">

      {/* ── Mobile header (< xl) ── */}
      <div className="mb-3 xl:hidden">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <Input icon={Search} placeholder="Buscar mapas..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm transition active:scale-95"
            onClick={() => setFilterSheetOpen(true)}
            type="button"
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeFilterCount > 0 && (
              <span className="flex h-4.5 min-w-[1.1rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-black text-white">{activeFilterCount}</span>
            )}
          </button>
          <button
            className="flex shrink-0 items-center gap-1 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-black text-white shadow-sm transition active:scale-95"
            onClick={() => { setDraft(emptyMap()); setModal("create"); }}
            type="button"
            aria-label="Novo mapa"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Novo</span>
          </button>
        </div>
      </div>

      {/* ── Desktop hero (≥ xl) ── */}
      <section className="mindmaps-hero mb-4 hidden rounded-xl border border-blue-100 bg-white p-5 shadow-sm xl:block" data-tour="tour-mapas-header">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-600">Mapas mentais</p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">Biblioteca visual de revisão</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Abra mapas em SVG com zoom, arraste para navegar e use tela cheia para leitura no celular.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input icon={Search} placeholder="Buscar mapas mentais..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button icon={Plus} onClick={() => { setDraft(emptyMap()); setModal("create"); }}>Novo mapa</Button>
          </div>
        </div>
      </section>

      {/* ── Desktop filters (≥ xl) ── */}
      <div className="mindmaps-filters mb-4 hidden rounded-xl border border-blue-100 bg-white p-4 shadow-sm xl:block" data-tour="tour-mapas-filters">
        {filtersContent}
      </div>

      {/* ══════════════════════════════
          MOBILE VIEWS  (< xl)
      ══════════════════════════════ */}

      {/* Mobile: tab + list */}
      <div className={cx("xl:hidden", mobileView !== "list" && "hidden")}>
        {/* Tabs */}
        <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cx(
                "shrink-0 rounded-xl px-3 py-2 text-sm font-black transition",
                tab === t ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600",
              )}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>
        {/* Cards */}
        {visibleMaps.length === 0 ? (
          <EmptyState icon={Search} title="Nenhum mapa encontrado" description="Ajuste os filtros ou crie um novo mapa." />
        ) : (
          <div className="space-y-2.5">
            {visibleMaps.map((item) => (
              <button
                key={item.id}
                onClick={() => selectMap(item.id)}
                className="w-full rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-sm transition active:scale-[0.985]"
                type="button"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <strong className="block truncate text-sm font-black text-slate-900">{item.titulo}</strong>
                    <p className="mt-0.5 text-xs text-slate-500">{item.materia} · {item.assunto}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                    className="shrink-0 p-1 text-amber-400 transition active:scale-90"
                    type="button"
                    aria-label="Favoritar"
                  >
                    <Bookmark size={16} className={item.favorito ? "fill-current" : ""} />
                  </button>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-black text-blue-700">{item.nivel}</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-500">{item.banca}</span>
                  {item.estudado && <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-emerald-700">Estudado</span>}
                  {item.svgUrl && <span className="rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[11px] font-black text-violet-700">SVG</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile: viewer */}
      <div className={cx("xl:hidden", mobileView !== "viewer" && "hidden")}>
        {activeMap ? (
          <>
            <SvgMindMapViewer
              map={activeMap}
              full={full}
              zoom={zoom}
              pan={pan}
              collapsed={collapsed}
              onCloseFull={() => setFull(false)}
              onFullscreen={() => setFull(true)}
              onZoom={setZoom}
              onPan={setPan}
              onToggleNode={(label) => setCollapsed((c) => ({ ...c, [label]: !c[label] }))}
              onNodeTap={(label, type) => setNodeSheet({ label, type })}
              onBack={() => setMobileView("list")}
              mobile
            />
            {/* Action strip */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              <button
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm transition active:scale-95"
                onClick={() => setDetailsOpen(true)}
                type="button"
              >
                <Info size={14} />
                Detalhes
              </button>
              <button
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-black text-white shadow-sm transition active:scale-95"
                onClick={() => markStudied(activeMap)}
                type="button"
              >
                <CalendarCheck size={14} />
                Estudar
              </button>
              <button
                disabled={Boolean(aiLoading)}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm transition active:scale-95 disabled:opacity-50"
                onClick={generateFlashcards}
                type="button"
              >
                <Brain size={14} />
                Flashcards
              </button>
              <button
                disabled={Boolean(aiLoading)}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm transition active:scale-95 disabled:opacity-50"
                onClick={generateSummary}
                type="button"
              >
                <FileText size={14} />
                Resumo
              </button>
              <button
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm transition active:scale-95"
                onClick={() => shareMap(activeMap)}
                type="button"
              >
                <Share2 size={14} />
                Compartilhar
              </button>
            </div>
          </>
        ) : (
          <EmptyState icon={Search} title="Nenhum mapa selecionado" description="Selecione um mapa da lista." />
        )}
      </div>

      {/* ══════════════════════════════
          DESKTOP 3-COLUMN  (≥ xl)
      ══════════════════════════════ */}
      <div className="mindmaps-layout hidden gap-4 xl:grid xl:grid-cols-[340px_minmax(0,1fr)_300px]">
        <aside className="mindmaps-list rounded-xl border border-blue-100 bg-white shadow-sm" data-tour="tour-mapas-list">
          <div className="flex gap-2 overflow-x-auto border-b border-blue-100 px-3 pt-2">
            {tabs.map((item) => (
              <button key={item} onClick={() => setTab(item)} className={cx("whitespace-nowrap border-b-2 px-2 py-3 text-sm font-black transition", tab === item ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-blue-700")} type="button">{item}</button>
            ))}
          </div>
          <div className="max-h-[680px] space-y-4 overflow-y-auto p-3">
            {Object.entries(groupedMaps).map(([materia, items]) => (
              <section key={materia} className="space-y-2">
                <h2 className="px-1 text-xs font-black uppercase tracking-wide text-slate-500">{materia}</h2>
                {items.map((item) => (
                  <button key={item.id} onClick={() => selectMap(item.id)} className={cx("mindmap-list-card w-full rounded-xl border p-3 text-left transition", activeMap?.id === item.id ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-blue-100 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50")} type="button">
                    <div className="flex items-start justify-between gap-2">
                      <strong className="text-sm leading-tight">{item.titulo}</strong>
                      <Bookmark size={15} className={item.favorito ? "shrink-0 fill-current" : "shrink-0 opacity-55"} />
                    </div>
                    <p className="mt-2 text-xs opacity-75">{item.assunto} · {item.banca}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-current/10 px-2 py-1 text-[11px] font-black">{item.svgUrl ? "SVG" : "Modelo"}</span>
                      <span className="rounded-full bg-current/10 px-2 py-1 text-[11px] font-black">{item.nivel}</span>
                    </div>
                  </button>
                ))}
              </section>
            ))}
          </div>
        </aside>

        <div data-tour="tour-mapas-viewer">
          {activeMap ? (
            <SvgMindMapViewer
              map={activeMap}
              full={full}
              zoom={zoom}
              pan={pan}
              collapsed={collapsed}
              onCloseFull={() => setFull(false)}
              onFullscreen={() => setFull(true)}
              onZoom={setZoom}
              onPan={setPan}
              onToggleNode={(label) => setCollapsed((c) => ({ ...c, [label]: !c[label] }))}
            />
          ) : (
            <EmptyState icon={Search} title="Nenhum mapa encontrado" description="Ajuste os filtros ou crie um novo mapa." />
          )}
        </div>

        <aside className="mindmaps-side space-y-4" data-tour="tour-mapas-actions">
          <Card hover={false}>
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-slate-950">{activeMap?.titulo}</h2>
                <p className="mt-1 text-sm text-slate-500">{activeMap?.descricao}</p>
              </div>
              <button onClick={() => activeMap && toggleFavorite(activeMap)} className="text-amber-500" aria-label="Favoritar mapa" type="button">
                <Bookmark size={18} className={activeMap?.favorito ? "fill-current" : ""} />
              </button>
            </div>
            {activeMap ? (
              <div className="space-y-2 text-sm text-slate-500">
                <p><strong className="text-slate-950">Nível:</strong> {activeMap.nivel}</p>
                <p><strong className="text-slate-950">Atualizado:</strong> {activeMap.atualizadoEm}</p>
                <p><strong className="text-slate-950">Arquivo:</strong> {activeMap.svgUrl ? "SVG externo" : "Modelo gerado"}</p>
                <p><strong className="text-slate-950">Relacionados:</strong> {activeMap.questoesRelacionadas} questões · {activeMap.flashcardsRelacionados} flashcards</p>
                <div className="mt-3 flex flex-wrap gap-2">{(activeMap.tags || []).slice(0, 4).map((tag) => <Badge key={tag} variant="neutral">{tag}</Badge>)}</div>
              </div>
            ) : null}
          </Card>
          <Card hover={false}>
            <h2 className="mb-3 font-bold text-slate-950">Ações</h2>
            <div className="grid gap-2">
              <Button size="sm" icon={CalendarCheck} onClick={() => activeMap && markStudied(activeMap)}>Estudar este mapa</Button>
              <Button size="sm" variant="secondary" loading={aiLoading === "flashcards"} icon={Brain} onClick={generateFlashcards}>Gerar flashcards</Button>
              <Button size="sm" variant="secondary" loading={aiLoading === "summary"} icon={FileText} onClick={generateSummary}>Gerar resumo</Button>
              <Button size="sm" variant="secondary" loading={aiLoading === "questions"} icon={FileQuestion} onClick={generateQuestions}>Gerar questões</Button>
              <Button size="sm" variant="ghost" icon={Download} onClick={() => window.print()}>Baixar PDF</Button>
              <Button size="sm" variant="ghost" icon={Printer} onClick={() => window.print()}>Imprimir</Button>
              <Button size="sm" variant="ghost" icon={Share2} onClick={() => shareMap(activeMap)}>Compartilhar</Button>
              <Button size="sm" variant="ghost" icon={Edit3} onClick={() => activeMap && editMap(activeMap)}>Editar</Button>
              <Button size="sm" variant="danger" icon={Trash2} onClick={() => activeMap && deleteMap(activeMap)}>Excluir</Button>
            </div>
          </Card>
          {aiOutput ? (
            <Card hover={false}>
              <h2 className="mb-2 font-bold text-slate-950">Resumo IA</h2>
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">{aiOutput}</p>
            </Card>
          ) : null}
        </aside>
      </div>

      {/* ══ Bottom sheets ══ */}

      {/* Filter sheet */}
      <LightSheet
        open={filterSheetOpen}
        title={`Filtros${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
        onClose={() => setFilterSheetOpen(false)}
        footer={
          <>
            <button
              className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-black text-slate-700 transition active:scale-95"
              onClick={() => setFilters(emptyFilters)}
              type="button"
            >
              Limpar
            </button>
            <button
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-black text-white shadow-sm transition active:scale-95"
              onClick={() => setFilterSheetOpen(false)}
              type="button"
            >
              Aplicar
            </button>
          </>
        }
      >
        {filtersContent}
      </LightSheet>

      {/* Node detail sheet */}
      <LightSheet
        open={Boolean(nodeSheet)}
        title={nodeSheet?.label || "Nó"}
        onClose={() => setNodeSheet(null)}
      >
        {nodeSheet ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-blue-600">
                {nodeSheet.type === "root" ? "Tema central" : nodeSheet.type === "branch" ? "Tópico principal" : "Subtópico"}
              </p>
              <p className="mt-1 text-base font-black text-slate-900">{nodeSheet.label}</p>
            </div>
            {activeMap ? (
              <div className="space-y-1.5 text-sm text-slate-600">
                <p><strong className="text-slate-900">Mapa:</strong> {activeMap.titulo}</p>
                <p><strong className="text-slate-900">Matéria:</strong> {activeMap.materia}</p>
                <p><strong className="text-slate-900">Concurso:</strong> {activeMap.concurso} · {activeMap.banca}</p>
              </div>
            ) : null}
            <button
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-sm transition active:scale-95"
              onClick={() => { if (activeMap) markStudied(activeMap); setNodeSheet(null); }}
              type="button"
            >
              Marcar mapa como estudado
            </button>
          </div>
        ) : null}
      </LightSheet>

      {/* Map details sheet (mobile) */}
      <LightSheet
        open={detailsOpen}
        title={activeMap?.titulo || "Detalhes"}
        onClose={() => setDetailsOpen(false)}
      >
        {activeMap ? (
          <div className="space-y-4">
            <div className="space-y-2 text-sm text-slate-600">
              <p>{activeMap.descricao}</p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <p className="font-black text-slate-500">Nível</p>
                  <p className="mt-0.5 font-black text-slate-900">{activeMap.nivel}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <p className="font-black text-slate-500">Banca</p>
                  <p className="mt-0.5 font-black text-slate-900">{activeMap.banca}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <p className="font-black text-slate-500">Questões</p>
                  <p className="mt-0.5 font-black text-slate-900">{activeMap.questoesRelacionadas}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <p className="font-black text-slate-500">Flashcards</p>
                  <p className="mt-0.5 font-black text-slate-900">{activeMap.flashcardsRelacionados}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <button onClick={() => { editMap(activeMap); setDetailsOpen(false); }} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition active:scale-95" type="button">
                <Edit3 size={14} /> Editar mapa
              </button>
              <button onClick={() => shareMap(activeMap)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition active:scale-95" type="button">
                <Share2 size={14} /> Compartilhar
              </button>
              <button onClick={() => { deleteMap(activeMap); setDetailsOpen(false); setMobileView("list"); }} className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-black text-red-600 transition active:scale-95" type="button">
                <Trash2 size={14} /> Excluir mapa
              </button>
            </div>
          </div>
        ) : null}
      </LightSheet>

      {/* Create / edit modal */}
      <Modal open={Boolean(modal)} title={modal === "edit" ? "Editar mapa" : "Novo mapa"} onClose={() => setModal(null)} footer={<Button onClick={saveMap}>{modal === "edit" ? "Salvar alterações" : "Criar mapa"}</Button>}>
        <div className="grid gap-3">
          <Input label="Título" value={draft.titulo} onChange={(e) => setDraft((c) => ({ ...c, titulo: e.target.value }))} />
          <Input label="Descrição" value={draft.descricao} onChange={(e) => setDraft((c) => ({ ...c, descricao: e.target.value }))} />
          <Input label="URL do SVG" helperText="Opcional. Use um caminho em /public, como /mapas/constitucional.svg." value={draft.svgUrl || ""} onChange={(e) => setDraft((c) => ({ ...c, svgUrl: e.target.value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Concurso" value={draft.concurso} onChange={(e) => setDraft((c) => ({ ...c, concurso: e.target.value }))} />
            <Input label="Matéria" value={draft.materia} onChange={(e) => setDraft((c) => ({ ...c, materia: e.target.value }))} />
            <Input label="Assunto" value={draft.assunto} onChange={(e) => setDraft((c) => ({ ...c, assunto: e.target.value }))} />
            <Input label="Banca" value={draft.banca} onChange={(e) => setDraft((c) => ({ ...c, banca: e.target.value }))} />
            <Select label="Nível" options={levelOptions} value={draft.nivel} onChange={(e) => setDraft((c) => ({ ...c, nivel: e.target.value }))} />
            <Input label="Tags" value={draft.tagsText} onChange={(e) => setDraft((c) => ({ ...c, tagsText: e.target.value }))} placeholder="Separadas por vírgula" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
