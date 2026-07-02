import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, Bookmark, Brain, CalendarCheck, Edit3, FileQuestion,
  FileText, Maximize2, Minus, Plus, Search, Share2, SlidersHorizontal,
  Trash2, X,
} from "lucide-react";
import { Badge, Button, Card, EmptyState, HtmlFrameViewer, Input, PdfFrameViewer, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useInternalRouter, useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { aiService, flashcardsService, mapasService, questoesService } from "../../services";
import { useMapasStore } from "../../stores";

const levelOptions = ["Básico", "Intermediário", "Avançado"];
const TABS = ["Todos", "Favoritos", "Recentes", "Meus mapas", "Plataforma"];
const emptyFilters = { concurso: "", materia: "", assunto: "", banca: "", nivel: "", origem: "" };

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
    descricao: item.descricao || `Mapa mental: ${title}`,
    concurso: item.concurso || (index % 2 ? "PRF" : "PM"),
    materia: item.materia || title,
    assunto: item.assunto || item.root?.children?.[0]?.label || "Fundamentos",
    banca: item.banca || ["FGV", "CEBRASPE", "IBFC"][index % 3],
    nivel: item.nivel || levelOptions[index % 3],
    tags: item.tags || [item.materia || title].filter(Boolean),
    favorito: Boolean(item.favorito),
    origem: item.origem || "plataforma",
    criadoEm: item.criadoEm || "2026-06-01",
    atualizadoEm: item.atualizadoEm || "2026-06-09",
    root: item.root || { label: title, children: [] },
    htmlUrl: item.htmlUrl || item.html_url || "",
    svgUrl: /\.svg($|\?)/i.test(svgUrl) ? svgUrl : "",
    pdfUrl: item.pdfUrl || item.pdf_url || (/\.pdf($|\?)/i.test(item.url || "") ? (item.url || "") : ""),
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

function dist(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

/* ─── Bottom sheet ─── */
function Sheet({ open, title, onClose, children, footer }) {
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-end"
      style={{ background: "rgba(0,0,0,0.45)", pointerEvents: open ? "auto" : "none", overscrollBehavior: "contain" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      onAnimationComplete={() => { if (!open) setMounted(false); }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full rounded-t-3xl bg-white px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl"
        style={{ maxHeight: "90svh", overflowY: "auto" }}
        initial={{ y: "100%" }}
        animate={{ y: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 340 }}
        drag="y" dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => { if (info.offset.y > 72) onClose(); }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-black text-slate-900">{title}</h2>
          <button aria-label="Fechar" className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100" onClick={onClose} type="button">
            <X size={17} />
          </button>
        </div>
        {children}
        {footer && <div className="mt-4 flex gap-2">{footer}</div>}
      </motion.div>
    </motion.div>
  );
}

/* ─── SVG radial map ─── */
function MindMapSvg({ map, collapsed, onToggle, onNodeTap }) {
  const points = useMemo(() => nodePoints(map?.root?.children || []), [map]);
  return (
    <svg className="mindmap-generated-svg" viewBox="0 0 1200 760" role="img" aria-label={`Mapa: ${map?.titulo}`}>
      <defs>
        <linearGradient id="mmBlue" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#13386e" />
          <stop offset="100%" stopColor="#2e97d4" />
        </linearGradient>
      </defs>
      <rect width="1200" height="760" rx="20" fill="#f8fbff" />
      <g opacity="0.5">
        <circle cx="1060" cy="90" r="90" fill="#dbeafe" />
        <circle cx="100" cy="660" r="110" fill="#e0f2fe" />
      </g>
      {points.map(({ branch, x, y }) => (
        <g key={branch.label}>
          <path d={`M600 380 C ${600 + (x - 600) * 0.38} 380, ${x - (x - 600) * 0.35} ${y}, ${x} ${y}`}
            stroke="#2e97d4" strokeWidth="4" fill="none" strokeLinecap="round" />
          {!collapsed[branch.label] && branch.children.map((child, ci) => {
            const spread = ci - (branch.children.length - 1) / 2;
            const cx2 = x + spread * 165;
            const cy2 = y + (y > 380 ? 112 : -112);
            return <path key={child.label} d={`M${x} ${y} C ${x} ${(y + cy2) / 2}, ${cx2} ${(y + cy2) / 2}, ${cx2} ${cy2}`}
              stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
          })}
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
            <button className="mindmap-node mindmap-node-branch"
              onClick={() => { onToggle(branch.label); onNodeTap?.(branch.label, "branch"); }}
              type="button">
              {branch.label}
            </button>
          </foreignObject>
          {!collapsed[branch.label] && branch.children.map((child, ci) => {
            const spread = ci - (branch.children.length - 1) / 2;
            return (
              <foreignObject key={child.label} x={x + spread * 165 - 82} y={y + (y > 380 ? 92 : -152)} width="164" height="64">
                <button className="mindmap-node mindmap-node-leaf"
                  onClick={() => onNodeTap?.(child.label, "leaf")}
                  type="button">
                  {child.label}
                </button>
              </foreignObject>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/* ─── Map viewer ─── */
function MapViewer({ map, full, zoom, pan, collapsed, onCloseFull, onFullscreen, onZoom, onPan, onToggleNode, onNodeTap, onBack, mobile }) {
  const pointers = useRef(new Map());
  const gesture = useRef({ panStart: pan, pointerStart: null, distanceStart: 0, zoomStart: zoom });
  const hasHtmlMap = Boolean(map.htmlUrl);
  const hasPdf = Boolean(map.pdfUrl);
  const mapId = map?.id;
  const [viewModeState, setViewModeState] = useState({ mapId, mode: "map" }); // "map" | "pdf"
  const viewMode = viewModeState.mapId === mapId ? viewModeState.mode : "map";
  const setViewMode = useCallback((mode) => setViewModeState({ mapId, mode }), [mapId]);

  useEffect(() => { pointers.current.clear(); }, [mapId]);

  const startGesture = useCallback((e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, e);
    if (pointers.current.size === 1) gesture.current = { ...gesture.current, panStart: pan, pointerStart: e };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { ...gesture.current, distanceStart: dist(a, b), zoomStart: zoom };
    }
  }, [pan, zoom]);

  const moveGesture = useCallback((e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, e);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      onZoom(Math.max(0.35, Math.min(3.5, gesture.current.zoomStart * (dist(a, b) / Math.max(1, gesture.current.distanceStart)))));
      return;
    }
    const start = gesture.current.pointerStart;
    if (!start) return;
    onPan({ x: gesture.current.panStart.x + e.clientX - start.clientX, y: gesture.current.panStart.y + e.clientY - start.clientY });
  }, [onPan, onZoom]);

  const endGesture = useCallback((e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 1) {
      const [rem] = [...pointers.current.values()];
      gesture.current = { ...gesture.current, panStart: pan, pointerStart: rem };
    }
  }, [pan]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    onZoom(Math.max(0.35, Math.min(3.5, zoom + (e.deltaY > 0 ? -0.08 : 0.08))));
  }, [onZoom, zoom]);

  const centerMap = useCallback(() => { onZoom(1); onPan({ x: 0, y: 0 }); }, [onPan, onZoom]);

  return (
    <Card hover={false} className={cx("mindmap-viewer overflow-hidden p-0", full && "fixed inset-3 z-50", mobile && "mindmap-viewer-mobile")}>
      {/* Toolbar */}
      <div className="mindmap-viewer-toolbar flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {mobile && onBack && (
            <button
              aria-label="Voltar"
              className="flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black text-slate-600 transition active:scale-95"
              onClick={onBack} type="button"
            >
              <ArrowLeft size={13} /> Lista
            </button>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-slate-900">{map.titulo}</p>
            <p className="truncate text-xs text-slate-500">{map.concurso} · {map.materia}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {hasPdf && (
            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
              <button
                onClick={() => setViewMode("map")}
                className={cx("rounded-md px-2.5 py-1 transition", viewMode === "map" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                type="button"
              >
                Mapa
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={cx("rounded-md px-2.5 py-1 transition", viewMode === "pdf" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                type="button"
              >
                PDF
              </button>
            </div>
          )}
          {!hasHtmlMap && viewMode === "map" && (
            <>
              <button aria-label="Reduzir" className="mindmap-zoom-btn" onClick={() => onZoom(Math.max(0.35, zoom - 0.14))} type="button"><Minus size={14} /></button>
              <button className="mindmap-zoom-btn mindmap-zoom-pct" onClick={centerMap} type="button">{Math.round(zoom * 100)}%</button>
              <button aria-label="Ampliar" className="mindmap-zoom-btn" onClick={() => onZoom(Math.min(3.5, zoom + 0.14))} type="button"><Plus size={14} /></button>
            </>
          )}
          {!mobile && (
            <button className="mindmap-zoom-btn ml-1" onClick={full ? onCloseFull : onFullscreen} type="button">
              {full ? <X size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* Canvas */}
      {viewMode === "pdf" ? (
        <div className="mindmap-canvas mindmap-canvas-html" style={{ height: "min(74svh, 52rem)", minHeight: "34rem" }}>
          <PdfFrameViewer key={map.pdfUrl} url={map.pdfUrl} title={`PDF: ${map.titulo}`} />
        </div>
      ) : (
        <div
          className={cx("mindmap-canvas", hasHtmlMap && "mindmap-canvas-html")}
          onPointerDown={hasHtmlMap ? undefined : startGesture}
          onPointerMove={hasHtmlMap ? undefined : moveGesture}
          onPointerCancel={hasHtmlMap ? undefined : endGesture}
          onPointerUp={hasHtmlMap ? undefined : endGesture}
          onWheel={hasHtmlMap ? undefined : onWheel}
        >
          {hasHtmlMap ? (
            <div style={{ width: "100%", height: "min(74svh, 52rem)", minHeight: "34rem" }}>
              <HtmlFrameViewer url={map.htmlUrl} title={map.materia || map.titulo} />
            </div>
          ) : (
            <div className="mindmap-stage" style={{ transform: `translate3d(${pan.x}px,${pan.y}px,0) scale(${zoom})` }}>
              {map.svgUrl
                ? <img className="mindmap-svg-image" src={map.svgUrl} alt={`Mapa: ${map.titulo}`} loading="lazy" draggable={false} />
                : <MindMapSvg map={map} collapsed={collapsed} onToggle={onToggleNode} onNodeTap={onNodeTap} />}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function MobileMindMap({ map, collapsed, onToggleNode, onNodeTap, onToggleAll }) {
  const branches = map?.root?.children || [];
  const rootLabel = map?.root?.label || map?.titulo;
  const openCount = branches.filter((branch) => !collapsed[branch.label]).length;
  const allOpen = branches.length > 0 && openCount === branches.length;

  return (
    <section className="mobile-mindmap-flow" aria-label={`Mapa mental: ${map?.titulo}`}>
      <button className="mobile-mindmap-root" type="button" onClick={() => onNodeTap?.(rootLabel, "root")}>
        <span>Tema central</span>
        <strong>{rootLabel}</strong>
        <small>{map?.materia} · {map?.assunto}</small>
      </button>

      <div className="mobile-mindmap-meta" aria-label="Dados do mapa">
        <Badge variant="neutral">{map?.concurso}</Badge>
        <Badge variant="info">{map?.nivel}</Badge>
        <Badge variant="neutral">{branches.length} tópicos</Badge>
      </div>

      {branches.length > 0 ? (
        <button className="mobile-mindmap-toggle-all" type="button" onClick={() => onToggleAll?.(!allOpen)}>
          {allOpen ? <Minus size={16} /> : <Plus size={16} />}
          {allOpen ? "Recolher tópicos" : "Expandir tópicos"}
        </button>
      ) : null}

      <div className="mobile-mindmap-branches">
        {branches.length ? branches.map((branch, index) => {
          const isOpen = !collapsed[branch.label];
          const children = branch.children || [];
          return (
            <article className={cx("mobile-mindmap-card", isOpen && "is-open")} key={`${branch.label}-${index}`}>
              <button
                className="mobile-mindmap-branch"
                type="button"
                aria-expanded={isOpen}
                onClick={() => { onToggleNode(branch.label); onNodeTap?.(branch.label, "branch"); }}
              >
                <span className="mobile-mindmap-index">{index + 1}</span>
                <span className="mobile-mindmap-branch-text">
                  <strong>{branch.label}</strong>
                  <small>{children.length ? `${children.length} subtópicos` : "Sem subtópicos"}</small>
                </span>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    className="mobile-mindmap-leaves"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {children.length ? children.map((child) => (
                      <button key={child.label} type="button" onClick={() => onNodeTap?.(child.label, "leaf")}>
                        {child.label}
                      </button>
                    )) : (
                      <p>Este tópico ainda não tem subtópicos cadastrados.</p>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        }) : (
          <EmptyState icon={Brain} title="Mapa sem ramificações" description="O tema central está disponível, mas este mapa ainda não tem tópicos cadastrados." />
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   Page
═══════════════════════════════ */
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
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const localMaps = useMapasStore((s) => s.localMaps);
  const overrides = useMapasStore((s) => s.overrides);
  const deleted = useMapasStore((s) => s.deleted);
  const activeId = useMapasStore((s) => s.activeId);
  const { addMap, setOverride, removeMap, setActiveId } = useMapasStore();

  const [collapsed, setCollapsed] = useState({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [full, setFull] = useState(false);
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(emptyMap());
  const [aiLoading, setAiLoading] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [mobileView, setMobileView] = useState("list");
  const [nodeSheet, setNodeSheet] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const maps = useMemo(
    () => [...localMaps, ...source.map(normalizeMap)]
      .filter((m) => !deleted.includes(m.id))
      .map((m) => ({ ...m, ...(overrides[m.id] || {}) })),
    [deleted, localMaps, overrides, source],
  );

  const filtered = useMemo(() => maps.filter((m) => {
    const text = [m.titulo, m.descricao, m.concurso, m.materia, m.assunto, m.banca, m.nivel, ...(m.tags || [])].join(" ").toLowerCase();
    if (deferredQuery && !text.includes(deferredQuery.toLowerCase())) return false;
    if (filters.concurso && m.concurso !== filters.concurso) return false;
    if (filters.materia && m.materia !== filters.materia) return false;
    if (filters.assunto && m.assunto !== filters.assunto) return false;
    if (filters.banca && m.banca !== filters.banca) return false;
    if (filters.nivel && m.nivel !== filters.nivel) return false;
    if (filters.origem && m.origem !== filters.origem) return false;
    if (tab === "Favoritos" && !m.favorito) return false;
    if (tab === "Recentes" && m.atualizadoEm < cutoff30d) return false;
    if (tab === "Meus mapas" && m.origem !== "usuario") return false;
    if (tab === "Plataforma" && m.origem !== "plataforma") return false;
    return true;
  }), [cutoff30d, deferredQuery, filters, maps, tab]);

  const visibleMaps = filtered.slice(0, 80);
  const activeMap = maps.find((m) => m.id === activeId) || filtered[0];
  const activeFilterCount = useMemo(() => Object.values(filters).filter(Boolean).length, [filters]);

  const groupedMaps = useMemo(() => visibleMaps.reduce((acc, m) => {
    const key = m.materia || "Geral";
    (acc[key] = acc[key] || []).push(m);
    return acc;
  }, {}), [visibleMaps]);

  useEffect(() => {
    if (!full) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [full]);

  const notify = useCallback((title, msg) => addNotification({ type: "success", title, message: msg }), [addNotification]);
  const resetViewer = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); setCollapsed({}); }, []);

  const selectMap = useCallback((id) => {
    setActiveId(id);
    resetViewer();
    setMobileView("viewer");
  }, [resetViewer, setActiveId]);

  const saveMap = useCallback(() => {
    if (!draft.titulo.trim()) return;
    const tags = draft.tagsText?.split(",").map((t) => t.trim()).filter(Boolean) || [];
    if (modal === "edit") {
      setOverride(draft.id, { ...draft, tags, root: draft.root || buildRootFromDraft(draft), atualizadoEm: new Date().toISOString().slice(0, 10) });
      notify("Mapa atualizado", "Alterações salvas.");
    } else {
      const map = { ...draft, id: `map-user-${Date.now()}`, origem: "usuario", favorito: false, tags, criadoEm: new Date().toISOString().slice(0, 10), atualizadoEm: new Date().toISOString().slice(0, 10), root: buildRootFromDraft(draft), flashcardsRelacionados: 0, questoesRelacionadas: 0 };
      addMap(map);
      selectMap(map.id);
      notify("Mapa criado", "Novo mapa adicionado.");
    }
    setDraft(emptyMap());
    setModal(null);
  }, [addMap, draft, modal, notify, selectMap, setOverride]);

  const editMap = useCallback((m) => { setDraft({ ...m, tagsText: (m.tags || []).join(", ") }); setModal("edit"); }, []);
  const deleteMap = useCallback((m) => { removeMap(m.id); notify("Removido", "Mapa removido da lista."); }, [notify, removeMap]);
  const toggleFavorite = useCallback((m) => setOverride(m.id, { favorito: !m.favorito }), [setOverride]);
  const markStudied = useCallback((m) => {
    setOverride(m.id, { estudado: true, atualizadoEm: new Date().toISOString().slice(0, 10) });
    notify("Mapa estudado", "Progresso registrado.");
  }, [notify, setOverride]);

  const shareMap = useCallback(async (m) => {
    if (!m) return;
    try {
      if (navigator.share) await navigator.share({ title: m.titulo, text: `${m.titulo} — ${m.materia}`, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); notify("Link copiado", "Endereço copiado."); }
    } catch { /* cancelado */ }
  }, [notify]);

  const generateSummary = useCallback(async () => {
    if (!activeMap || aiLoading) return;
    setAiLoading("summary");
    try {
      const text = await aiService.gerarTexto(
        `Crie um resumo de revisão para este mapa. Seja objetivo, com tópicos e foco em prova.\nMapa: ${activeMap.titulo}\nMatéria: ${activeMap.materia}\nAssunto: ${activeMap.assunto}`,
        { task: "summary", maxOutputTokens: 650, cache: true, cacheKey: `mapa-resumo:${activeMap.id}`, cacheTtlDays: 90, tier: "barato" },
      );
      setAiOutput(text);
      notify("Resumo gerado", "Resumo criado pela IA.");
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
      notify("Flashcards gerados", `${deck.cards?.length || 0} cards adicionados.`);
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar flashcards agora." });
    } finally { setAiLoading(""); }
  }, [activeMap, addNotification, aiLoading, notify, setOverride]);

  const generateQuestions = useCallback(async () => {
    if (!activeMap || aiLoading) return;
    setAiLoading("questions");
    try {
      const rows = await questoesService.gerarQuestoesIA({ assunto: activeMap.assunto || activeMap.titulo, materia: activeMap.materia, concurso: activeMap.concurso, quantidade: 3 });
      setOverride(activeMap.id, { questoesRelacionadas: (activeMap.questoesRelacionadas || 0) + rows.length });
      sessionStorage.setItem("aprova-questoes-artigo-filter", JSON.stringify({ questoesIds: rows.map((r) => r.id), search: activeMap.assunto || activeMap.materia }));
      notify("Questões geradas", `${rows.length} questões adicionadas.`);
      navigate("questoes");
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar questões agora." });
    } finally { setAiLoading(""); }
  }, [activeMap, addNotification, aiLoading, navigate, notify, setOverride]);

  const setFilter = useCallback((key, val) => setFilters((f) => ({ ...f, [key]: val })), []);

  const filtersContent = (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      <Select label="Concurso" placeholder="Todos" options={unique(maps.map((m) => m.concurso))} value={filters.concurso} onChange={(e) => setFilter("concurso", e.target.value)} />
      <Select label="Matéria" placeholder="Todas" options={unique(maps.map((m) => m.materia))} value={filters.materia} onChange={(e) => setFilter("materia", e.target.value)} />
      <Select label="Assunto" placeholder="Todos" options={unique(maps.map((m) => m.assunto))} value={filters.assunto} onChange={(e) => setFilter("assunto", e.target.value)} />
      <Select label="Banca" placeholder="Todas" options={unique(maps.map((m) => m.banca))} value={filters.banca} onChange={(e) => setFilter("banca", e.target.value)} />
      <Select label="Nível" placeholder="Todos" options={levelOptions} value={filters.nivel} onChange={(e) => setFilter("nivel", e.target.value)} />
      <Select label="Origem" placeholder="Todas" options={[{ value: "usuario", label: "Meus mapas" }, { value: "plataforma", label: "Plataforma" }]} value={filters.origem} onChange={(e) => setFilter("origem", e.target.value)} />
    </div>
  );

  return (
    <div className="mindmaps-page mx-auto max-w-[1500px] pb-10" data-tour="tour-mapas-page">

      {/* ─── Header ─── */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" data-tour="tour-mapas-header">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-royal">Revisão visual</p>
          <h1 className="mt-0.5 text-3xl font-black text-slate-950">Mapas mentais</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input icon={Search} placeholder="Buscar mapas..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-sky hover:text-navy active:scale-95 xl:hidden"
            onClick={() => setFilterSheetOpen(true)}
            type="button"
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeFilterCount > 0 && <span className="flex h-5 min-w-[1.1rem] items-center justify-center rounded-full bg-royal px-1 text-[10px] font-black text-white">{activeFilterCount}</span>}
          </button>
          <Button icon={Plus} onClick={() => { setDraft(emptyMap()); setModal("create"); }}>Novo mapa</Button>
        </div>
      </div>

      {/* ─── Desktop filters ─── */}
      <div className="mb-4 hidden rounded-xl border border-royal/20 bg-white p-4 shadow-sm xl:block" data-tour="tour-mapas-filters">
        {filtersContent}
      </div>

      {/* ─── Tabs ─── */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cx(
              "shrink-0 rounded-xl px-3.5 py-2 text-sm font-black transition",
              tab === t ? "bg-royal text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-sky hover:text-navy",
            )}
            type="button"
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════════════
          MOBILE  (< xl)
      ══════════════════════ */}

      {/* Mobile list */}
      <div className={cx("xl:hidden", mobileView !== "list" && "hidden")}>
        {visibleMaps.length === 0 ? (
          <div className="rounded-2xl border border-royal/20 bg-white p-10 shadow-sm">
            <EmptyState icon={Search} title="Nenhum mapa encontrado" description="Ajuste os filtros ou crie um novo mapa." />
          </div>
        ) : (
          <div className="space-y-2.5">
            {visibleMaps.map((m) => (
              <div
                key={m.id}
                role="button"
                tabIndex={0}
                onClick={() => selectMap(m.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectMap(m.id); } }}
                className="w-full cursor-pointer rounded-2xl border border-royal/20 bg-white p-4 text-left shadow-sm transition active:scale-[0.985]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <strong className="block truncate text-sm font-black text-slate-900">{m.titulo}</strong>
                    <p className="mt-0.5 text-xs text-slate-500">{m.materia} · {m.assunto}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(m); }} className="shrink-0 p-1 text-amber-400 transition active:scale-90" type="button" aria-label="Favoritar">
                    <Bookmark size={16} className={m.favorito ? "fill-current" : ""} />
                  </button>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-royal/20 bg-royal/10 px-2 py-0.5 text-[11px] font-black text-navy">{m.nivel}</span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-500">{m.banca}</span>
                  {m.estudado && <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-emerald-700">Estudado</span>}
                  {m.svgUrl && <span className="rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[11px] font-black text-violet-700">SVG</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile viewer */}
      <div className={cx("xl:hidden", mobileView !== "viewer" && "hidden")}>
        {activeMap ? (
          <>
            <div className="mb-3 flex items-center gap-2">
              <button
                className="mobile-mindmap-back"
                onClick={() => setMobileView("list")}
                type="button"
              >
                <ArrowLeft size={16} />
                Lista de mapas
              </button>
              {activeMap.pdfUrl && (
                <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
                  <button
                    onClick={() => setMobileView("viewer")}
                    className={cx("rounded-md px-2.5 py-1 transition", mobileView === "viewer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}
                    type="button"
                  >
                    Mapa
                  </button>
                  <button
                    onClick={() => setMobileView("viewer-pdf")}
                    className={cx("rounded-md px-2.5 py-1 transition", mobileView === "viewer-pdf" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}
                    type="button"
                  >
                    PDF
                  </button>
                </div>
              )}
            </div>
            {mobileView === "viewer-pdf" && activeMap.pdfUrl ? (
              <div className="overflow-hidden rounded-2xl" style={{ height: "62svh", minHeight: "24rem" }}>
                <PdfFrameViewer key={activeMap.pdfUrl} url={activeMap.pdfUrl} title={`PDF: ${activeMap.titulo}`} />
              </div>
            ) : activeMap.htmlUrl ? (
              <div className="overflow-hidden rounded-2xl" style={{ width: "100%", height: "64svh", minHeight: "24rem" }}>
                <HtmlFrameViewer url={activeMap.htmlUrl} title={activeMap.materia || activeMap.titulo} />
              </div>
            ) : (
              <MobileMindMap
                map={activeMap}
                collapsed={collapsed}
                onToggleNode={(label) => setCollapsed((c) => ({ ...c, [label]: !c[label] }))}
                onNodeTap={(label, type) => setNodeSheet({ label, type })}
                onToggleAll={(open) => {
                  const labels = activeMap.root?.children?.map((branch) => branch.label) || [];
                  setCollapsed((current) => {
                    const next = { ...current };
                    labels.forEach((label) => {
                      if (open) delete next[label];
                      else next[label] = true;
                    });
                    return next;
                  });
                }}
              />
            )}
            <div className="mindmap-mobile-actions mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: "Detalhes", icon: <SlidersHorizontal size={14} />, action: () => setDetailsOpen(true) },
                { label: "Estudar", icon: <CalendarCheck size={14} />, action: () => markStudied(activeMap), primary: true },
                { label: "Flashcards", icon: <Brain size={14} />, action: generateFlashcards, disabled: Boolean(aiLoading) },
                { label: "Resumo", icon: <FileText size={14} />, action: generateSummary, disabled: Boolean(aiLoading) },
                { label: "Questões", icon: <FileQuestion size={14} />, action: generateQuestions, disabled: Boolean(aiLoading) },
                { label: "Compartilhar", icon: <Share2 size={14} />, action: () => shareMap(activeMap) },
              ].map(({ label, icon, action, primary, disabled }) => (
                <button
                  key={label}
                  onClick={action}
                  disabled={disabled}
                  className={cx(
                    "flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-black shadow-sm transition active:scale-95 disabled:opacity-50",
                    primary ? "bg-royal text-white" : "border border-slate-200 bg-white text-slate-700",
                  )}
                  type="button"
                >
                  {icon}{label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-royal/20 bg-white p-10 shadow-sm">
            <EmptyState icon={Search} title="Nenhum mapa selecionado" description="Selecione um mapa da lista." />
          </div>
        )}
      </div>

      {/* ══════════════════════
          DESKTOP  (≥ xl)
      ══════════════════════ */}
      <div className="mindmaps-layout hidden gap-4 xl:grid xl:grid-cols-[320px_minmax(0,1fr)_280px]" data-tour="tour-mapas-layout">

        {/* Sidebar list */}
        <aside className="mindmaps-list rounded-xl border border-royal/20 bg-white shadow-sm" data-tour="tour-mapas-list">
          <div className="max-h-[700px] overflow-y-auto p-3">
            {Object.keys(groupedMaps).length === 0 ? (
              <EmptyState icon={Search} title="Nenhum mapa" description="Ajuste os filtros ou crie um novo." />
            ) : Object.entries(groupedMaps).map(([materia, items]) => (
              <section key={materia} className="mb-4">
                <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wider text-slate-400">{materia}</p>
                <div className="space-y-1.5">
                  {items.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => selectMap(m.id)}
                      className={cx(
                        "mindmap-list-card w-full rounded-xl border p-3 text-left transition",
                        activeMap?.id === m.id
                          ? "border-royal bg-royal text-white shadow-sm"
                          : "border-royal/20 bg-white text-slate-700 hover:border-sky hover:bg-royal/10",
                      )}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <strong className="block text-sm leading-tight">{m.titulo}</strong>
                        <Bookmark size={14} className={cx("shrink-0", m.favorito ? "fill-current" : "opacity-40")} />
                      </div>
                      <p className="mt-1.5 text-xs opacity-70">{m.assunto} · {m.banca}</p>
                      <div className="mt-2 flex gap-1.5">
                        <span className="rounded-full bg-current/10 px-2 py-0.5 text-[11px] font-black">{m.svgUrl ? "SVG" : "Modelo"}</span>
                        <span className="rounded-full bg-current/10 px-2 py-0.5 text-[11px] font-black">{m.nivel}</span>
                        {m.estudado && <span className="rounded-full bg-current/10 px-2 py-0.5 text-[11px] font-black">✓</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </aside>

        {/* Viewer */}
        <div data-tour="tour-mapas-viewer">
          {activeMap ? (
            <MapViewer
              map={activeMap} full={full} zoom={zoom} pan={pan} collapsed={collapsed}
              onCloseFull={() => setFull(false)} onFullscreen={() => setFull(true)}
              onZoom={setZoom} onPan={setPan}
              onToggleNode={(label) => setCollapsed((c) => ({ ...c, [label]: !c[label] }))}
            />
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-royal/20 bg-white shadow-sm">
              <EmptyState icon={Search} title="Selecione um mapa" description="Clique em um mapa da lista para visualizar." />
            </div>
          )}
        </div>

        {/* Right panel */}
        <aside className="mindmaps-side space-y-3" data-tour="tour-mapas-actions">
          {activeMap && (
            <Card hover={false} className="p-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-wide text-royal">Selecionado</p>
                  <h2 className="mt-0.5 truncate text-base font-black text-slate-900">{activeMap.titulo}</h2>
                </div>
                <button onClick={() => toggleFavorite(activeMap)} className="shrink-0 text-amber-400 transition hover:text-amber-500" aria-label="Favoritar" type="button">
                  <Bookmark size={18} className={activeMap.favorito ? "fill-current" : ""} />
                </button>
              </div>
              <div className="space-y-1.5 text-sm">
                {[
                  ["Matéria", activeMap.materia],
                  ["Nível", activeMap.nivel],
                  ["Banca", activeMap.banca],
                  ["Questões", `${activeMap.questoesRelacionadas}`],
                  ["Flashcards", `${activeMap.flashcardsRelacionados}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-2">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-black text-slate-800">{v}</span>
                  </div>
                ))}
              </div>
              {(activeMap.tags || []).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeMap.tags.slice(0, 4).map((tag) => <Badge key={tag} variant="neutral">{tag}</Badge>)}
                </div>
              )}
            </Card>
          )}

          <Card hover={false} className="p-4">
            <h2 className="mb-3 text-sm font-black text-slate-900">Ações</h2>
            <div className="grid gap-2">
              <Button size="sm" icon={CalendarCheck} onClick={() => activeMap && markStudied(activeMap)}>Estudar este mapa</Button>
              <Button size="sm" variant="secondary" loading={aiLoading === "flashcards"} icon={Brain} onClick={generateFlashcards}>Gerar flashcards</Button>
              <Button size="sm" variant="secondary" loading={aiLoading === "summary"} icon={FileText} onClick={generateSummary}>Gerar resumo</Button>
              <Button size="sm" variant="secondary" loading={aiLoading === "questions"} icon={FileQuestion} onClick={generateQuestions}>Gerar questões</Button>
              <Button size="sm" variant="ghost" icon={Share2} onClick={() => shareMap(activeMap)}>Compartilhar</Button>
              <Button size="sm" variant="ghost" icon={Edit3} onClick={() => activeMap && editMap(activeMap)}>Editar</Button>
              <Button size="sm" variant="danger" icon={Trash2} onClick={() => activeMap && deleteMap(activeMap)}>Excluir</Button>
            </div>
          </Card>

          {aiOutput && (
            <Card hover={false} className="p-4">
              <h2 className="mb-2 text-sm font-black text-slate-900">Resumo IA</h2>
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">{aiOutput}</p>
            </Card>
          )}
        </aside>
      </div>

      {/* ─── Sheets ─── */}
      <Sheet
        open={filterSheetOpen}
        title={`Filtros${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
        onClose={() => setFilterSheetOpen(false)}
        footer={
          <>
            <button className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-black text-slate-700 transition active:scale-95" onClick={() => setFilters(emptyFilters)} type="button">Limpar</button>
            <button className="flex-1 rounded-xl bg-royal py-2.5 text-sm font-black text-white shadow-sm transition active:scale-95" onClick={() => setFilterSheetOpen(false)} type="button">Aplicar</button>
          </>
        }
      >
        {filtersContent}
      </Sheet>

      <Sheet open={Boolean(nodeSheet)} title={nodeSheet?.label || "Nó"} onClose={() => setNodeSheet(null)}>
        {nodeSheet && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-royal/20 bg-royal/10 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-royal">
                {nodeSheet.type === "root" ? "Tema central" : nodeSheet.type === "branch" ? "Tópico" : "Subtópico"}
              </p>
              <p className="mt-1 text-base font-black text-slate-900">{nodeSheet.label}</p>
            </div>
            {activeMap && (
              <div className="space-y-1 text-sm text-slate-600">
                <p><strong className="text-slate-900">Mapa:</strong> {activeMap.titulo}</p>
                <p><strong className="text-slate-900">Matéria:</strong> {activeMap.materia}</p>
              </div>
            )}
            <button className="w-full rounded-xl bg-royal py-3 text-sm font-black text-white shadow-sm transition active:scale-95" onClick={() => { if (activeMap) markStudied(activeMap); setNodeSheet(null); }} type="button">
              Marcar como estudado
            </button>
          </div>
        )}
      </Sheet>

      <Sheet open={detailsOpen} title={activeMap?.titulo || "Detalhes"} onClose={() => setDetailsOpen(false)}>
        {activeMap && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[["Nível", activeMap.nivel], ["Banca", activeMap.banca], ["Questões", `${activeMap.questoesRelacionadas}`], ["Flashcards", `${activeMap.flashcardsRelacionados}`]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-black text-slate-500">{k}</p>
                  <p className="mt-0.5 font-black text-slate-900">{v}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-2">
              <button onClick={() => { editMap(activeMap); setDetailsOpen(false); }} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition active:scale-95" type="button"><Edit3 size={14} /> Editar</button>
              <button onClick={() => shareMap(activeMap)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition active:scale-95" type="button"><Share2 size={14} /> Compartilhar</button>
              <button onClick={() => { deleteMap(activeMap); setDetailsOpen(false); setMobileView("list"); }} className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-black text-red-600 transition active:scale-95" type="button"><Trash2 size={14} /> Excluir</button>
            </div>
          </div>
        )}
      </Sheet>

      {/* Modal criar/editar */}
      <Modal open={Boolean(modal)} title={modal === "edit" ? "Editar mapa" : "Novo mapa"} onClose={() => setModal(null)} footer={<Button onClick={saveMap}>{modal === "edit" ? "Salvar" : "Criar mapa"}</Button>}>
        <div className="grid gap-3">
          <Input label="Título" value={draft.titulo} onChange={(e) => setDraft((d) => ({ ...d, titulo: e.target.value }))} />
          <Input label="Descrição" value={draft.descricao} onChange={(e) => setDraft((d) => ({ ...d, descricao: e.target.value }))} />
          <Input label="URL do SVG" helperText="Opcional. Ex: /mapas/constitucional.svg" value={draft.svgUrl || ""} onChange={(e) => setDraft((d) => ({ ...d, svgUrl: e.target.value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Concurso" value={draft.concurso} onChange={(e) => setDraft((d) => ({ ...d, concurso: e.target.value }))} />
            <Input label="Matéria" value={draft.materia} onChange={(e) => setDraft((d) => ({ ...d, materia: e.target.value }))} />
            <Input label="Assunto" value={draft.assunto} onChange={(e) => setDraft((d) => ({ ...d, assunto: e.target.value }))} />
            <Input label="Banca" value={draft.banca} onChange={(e) => setDraft((d) => ({ ...d, banca: e.target.value }))} />
            <Select label="Nível" options={levelOptions} value={draft.nivel} onChange={(e) => setDraft((d) => ({ ...d, nivel: e.target.value }))} />
            <Input label="Tags" value={draft.tagsText} onChange={(e) => setDraft((d) => ({ ...d, tagsText: e.target.value }))} placeholder="Separadas por vírgula" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
