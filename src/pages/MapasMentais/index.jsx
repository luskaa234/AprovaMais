import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";
import { Bookmark, Brain, CalendarCheck, Download, FileQuestion, FileText, Focus, Maximize2, Printer, Search, Share2, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { mapasService } from "../../services";

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function nodePoints(branches, collapsed) {
  return branches.map((branch, index) => {
    const angle = (index / Math.max(1, branches.length)) * Math.PI * 2 - Math.PI / 2;
    return {
      branch,
      collapsed: collapsed[branch.label],
      x: 520 + Math.cos(angle) * 300,
      y: 330 + Math.sin(angle) * 210,
    };
  });
}

export default function MapasMentaisPage() {
  const load = useCallback(() => mapasService.getMapas(), []);
  const { data: mapas = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [full, setFull] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);
  const frameRef = useRef(null);
  const [collapsed, setCollapsed] = useState({});
  const [studied, setStudied] = useState({});
  const [favorites, setFavorites] = useState({});
  const [filters, setFilters] = useState({ search: "", concurso: "", materia: "", assunto: "", banca: "", nivel: "", favoritos: "", ordenacao: "" });
  const deferredSearch = useDeferredValue(filters.search);

  const enriched = useMemo(() => mapas.map((item) => ({ ...item, favorito: favorites[item.id] ?? item.favorito, estudado: studied[item.id] })), [favorites, mapas, studied]);
  const filtered = useMemo(() => {
    const items = enriched.filter((item) => {
      const haystack = [item.titulo, item.materia, item.assunto, item.concurso, item.banca, ...(item.tags || [])].join(" ").toLowerCase();
      if (deferredSearch && !haystack.includes(deferredSearch.toLowerCase())) return false;
      if (filters.concurso && item.concurso !== filters.concurso) return false;
      if (filters.materia && item.materia !== filters.materia) return false;
      if (filters.assunto && item.assunto !== filters.assunto) return false;
      if (filters.banca && item.banca !== filters.banca) return false;
      if (filters.nivel && item.nivel !== filters.nivel) return false;
      if (filters.favoritos === "sim" && !item.favorito) return false;
      return true;
    });
    if (filters.ordenacao === "mais_acessados") return [...items].sort((a, b) => (b.acessos || 0) - (a.acessos || 0));
    if (filters.ordenacao === "recentes") return [...items].sort((a, b) => String(b.atualizadoEm).localeCompare(String(a.atualizadoEm)));
    return items;
  }, [deferredSearch, enriched, filters]);
  const visibleMaps = useMemo(() => filtered.slice(0, 60), [filtered]);
  const mapa = filtered.find((item) => item.id === active?.id) || filtered[0];
  const branches = useMemo(() => mapa?.root?.children || [], [mapa]);
  const points = useMemo(() => nodePoints(branches, collapsed), [branches, collapsed]);
  const lastStudied = useMemo(() => enriched.filter((item) => item.estudado).slice(0, 3), [enriched]);
  const recommended = useMemo(() => enriched.filter((item) => !item.estudado).slice(0, 3), [enriched]);

  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);
  const markStudied = useCallback(() => {
    if (!mapa) return;
    setStudied((current) => ({ ...current, [mapa.id]: true }));
    notify("Mapa estudado", "Progresso registrado e revisao adicionada ao planejamento.");
  }, [mapa, notify]);

  const onMove = useCallback((event) => {
    if (!drag) return;
    const next = { x: event.clientX - drag.x, y: event.clientY - drag.y };
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setPan(next));
  }, [drag]);

  const viewer = (
    <Card hover={false} className={cx(full && "fixed inset-4 z-50 overflow-auto bg-gray-950")}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-bold text-white">{mapa?.titulo || mapa?.materia}</h2>
          <p className="text-xs text-gray-500">{mapa?.concurso} · {mapa?.materia} · atualizado em {mapa?.atualizadoEm}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" icon={ZoomOut} onClick={() => setZoom(Math.max(0.65, zoom - 0.1))} />
          <Button size="sm" variant="secondary" icon={ZoomIn} onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} />
          <Button size="sm" variant="ghost" icon={Focus} onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}>Centralizar</Button>
          <Button size="sm" variant="ghost" icon={Maximize2} onClick={() => setFull((value) => !value)}>{full ? "Sair" : "Tela cheia"}</Button>
        </div>
      </div>

      <div
        className="h-[620px] cursor-grab overflow-auto rounded-lg border border-gray-800 bg-gray-900/60"
        onMouseDown={(event) => setDrag({ x: event.clientX - pan.x, y: event.clientY - pan.y })}
        onMouseMove={onMove}
        onMouseLeave={() => setDrag(null)}
        onMouseUp={() => setDrag(null)}
      >
        <svg width="1040" height="680" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center" }}>
          {points.map(({ branch, x, y, collapsed: isCollapsed }) => (
            <g key={branch.label}>
              <line x1="520" y1="330" x2={x} y2={y} stroke="#60a5fa" strokeWidth="2" />
              {!isCollapsed ? branch.children.map((child, childIndex) => {
                const spread = childIndex - (branch.children.length - 1) / 2;
                const childX = x + spread * 145;
                const childY = y + (y > 330 ? 100 : -100);
                return <line key={child.label} x1={x} y1={y} x2={childX} y2={childY} stroke="#94a3b8" strokeWidth="1.5" />;
              }) : null}
            </g>
          ))}
          <foreignObject x="400" y="280" width="240" height="110"><div className="grid h-full place-items-center rounded-lg bg-blue-600 p-4 text-center text-lg font-black text-white shadow-lg">{mapa?.root?.label}</div></foreignObject>
          {points.map(({ branch, x, y, collapsed: isCollapsed }) => (
            <g key={`${branch.label}-node`}>
              <foreignObject x={x - 88} y={y - 38} width="176" height="76">
                <button onClick={() => setCollapsed((current) => ({ ...current, [branch.label]: !current[branch.label] }))} className="grid h-full w-full place-items-center rounded-lg border border-blue-300 bg-gray-950 p-3 text-center text-sm font-bold text-gray-100">
                  {branch.label}
                </button>
              </foreignObject>
              {!isCollapsed ? branch.children.map((child, childIndex) => {
                const spread = childIndex - (branch.children.length - 1) / 2;
                const childX = x + spread * 145 - 72;
                const childY = y + (y > 330 ? 82 : -132);
                return <foreignObject key={child.label} x={childX} y={childY} width="145" height="66"><div className="grid h-full place-items-center rounded-lg border border-gray-700 bg-gray-950 p-2 text-center text-xs text-gray-200">{child.label}</div></foreignObject>;
              }) : null}
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Mapas mentais</p>
          <h1 className="text-3xl font-black text-white">Central visual de estudos</h1>
          <p className="mt-1 text-sm text-gray-400">Mapas no estilo XMind para revisar conceitos, conexoes e pontos de prova.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row"><Input icon={Search} placeholder="Buscar mapa" value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} /><Button icon={Sparkles} onClick={() => setModal(true)}>Gerar mapa</Button></div>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {[["Ultimos estudados", lastStudied[0]?.materia || "Aguardando progresso", CalendarCheck], ["Favoritos", enriched.find((item) => item.favorito)?.materia || "Marque seus mapas", Bookmark], ["Recomendados", recommended[0]?.materia || "Plano em dia", Brain], ["Plano de estudos", mapa?.assunto || "Revisao visual", FileText]].map(([label, value, Icon]) => (
          <Card hover={false} className="p-4" key={label}><Icon className="text-blue-300" size={18} /><p className="mt-3 text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p><strong className="mt-1 block text-base text-white">{value}</strong></Card>
        ))}
      </div>

      <Card hover={false} className="mb-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          <Select label="Concurso" placeholder="Todos" options={unique(enriched.map((item) => item.concurso))} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
          <Select label="Materia" placeholder="Todas" options={unique(enriched.map((item) => item.materia))} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
          <Select label="Assunto" placeholder="Todos" options={unique(enriched.map((item) => item.assunto))} value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
          <Select label="Banca" placeholder="Todas" options={unique(enriched.map((item) => item.banca))} value={filters.banca} onChange={(event) => setFilters((current) => ({ ...current, banca: event.target.value }))} />
          <Select label="Nivel" placeholder="Todos" options={unique(enriched.map((item) => item.nivel))} value={filters.nivel} onChange={(event) => setFilters((current) => ({ ...current, nivel: event.target.value }))} />
          <Select label="Favoritos" placeholder="Todos" options={[{ value: "sim", label: "Favoritos" }]} value={filters.favoritos} onChange={(event) => setFilters((current) => ({ ...current, favoritos: event.target.value }))} />
          <Select label="Ordenar" placeholder="Padrao" options={[{ value: "mais_acessados", label: "Mais acessados" }, { value: "recentes", label: "Recentes" }]} value={filters.ordenacao} onChange={(event) => setFilters((current) => ({ ...current, ordenacao: event.target.value }))} />
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[360px_1fr_300px]">
        <div className="space-y-3">
          {filtered.length ? visibleMaps.map((item) => (
            <button key={item.id} onClick={() => { setActive(item); setCollapsed({}); }} className={cx("w-full rounded-lg border p-4 text-left transition", mapa?.id === item.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-950 text-gray-300 hover:border-blue-400")}>
              <div className="mb-3 flex items-center justify-between gap-2"><strong className="text-base">{item.titulo || item.materia}</strong><Bookmark size={17} className={item.favorito ? "fill-current" : ""} /></div>
              <p className="text-sm opacity-85">{item.concurso} · {item.materia} · {item.assunto}</p>
              <div className="mt-3 flex flex-wrap gap-2">{(item.tags || []).slice(0, 3).map((tag) => <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold" key={tag}>{tag}</span>)}</div>
            </button>
          )) : <EmptyState icon={Search} title="Nenhum mapa encontrado" description="Ajuste os filtros para encontrar mapas relacionados ao seu plano." />}
        </div>

        {mapa ? viewer : null}

        <Card hover={false}>
          <h2 className="mb-3 font-bold text-white">Acoes do mapa</h2>
          <div className="grid gap-2">
            <Button variant="secondary" icon={Bookmark} onClick={() => setFavorites((current) => ({ ...current, [mapa?.id]: !(current[mapa?.id] ?? mapa?.favorito) }))}>Favoritar</Button>
            <Button variant="secondary" icon={Download} onClick={() => notify("Download iniciado", "O PDF do mapa foi preparado.")}>Baixar PDF</Button>
            <Button variant="secondary" icon={Printer} onClick={() => window.print()}>Imprimir</Button>
            <Button variant="secondary" icon={Share2} onClick={() => notify("Link copiado", "Compartilhamento pronto para envio.")}>Compartilhar</Button>
            <Button icon={CalendarCheck} onClick={markStudied}>Adicionar aos estudos</Button>
          </div>
          <div className="mt-5 border-t border-gray-800 pt-4">
            <h3 className="mb-3 text-sm font-bold text-white">Integracoes</h3>
            <div className="grid gap-2">
              <Button size="sm" variant="ghost" icon={Brain} onClick={() => notify("Flashcards gerados", "Cards criados a partir dos ramos principais.")}>Gerar flashcards</Button>
              <Button size="sm" variant="ghost" icon={FileText} onClick={() => notify("Resumo gerado", "Resumo rapido criado para revisao.")}>Gerar resumo</Button>
              <Button size="sm" variant="ghost" icon={Sparkles} onClick={() => notify("Revisao criada", "Revisao rapida adicionada a central.")}>Gerar revisao rapida</Button>
              <Button size="sm" variant="ghost" icon={FileQuestion} onClick={() => notify("Questoes relacionadas", "Lista de questoes conectada ao assunto.")}>Gerar questoes</Button>
            </div>
          </div>
          <div className="mt-5 space-y-3 border-t border-gray-800 pt-4">
            <h3 className="text-sm font-bold text-white">Ramos</h3>
            {branches.map((branch) => <div key={branch.label} className="rounded-lg bg-gray-900 p-3"><strong className="text-sm text-white">{branch.label}</strong><p className="mt-1 text-xs text-gray-400">{branch.children.map((child) => child.label).join(", ")}</p></div>)}
          </div>
        </Card>
      </div>

      <Modal open={modal} title="Gerar mapa com IA" onClose={() => setModal(false)} footer={<Button onClick={() => { setModal(false); notify("Mapa solicitado", "A estrutura visual sera criada com base no assunto informado."); }}>Construir mapa</Button>}>
        <div className="grid gap-3"><Input label="Concurso" placeholder="Ex.: PRF" /><Input label="Materia" placeholder="Ex.: CTB" /><Input label="Assunto" placeholder="Ex.: Competencia do CONTRAN" /></div>
      </Modal>
    </div>
  );
}
