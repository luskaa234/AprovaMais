import { useCallback, useMemo, useState } from "react";
import { Download, Focus, Search, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import { Button, Card, Input, Select, cx } from "../../components";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { mapasService } from "../../services";

export default function MapasMentaisPage() {
  const load = useCallback(() => mapasService.getMapas(), []);
  const { data: mapas = [] } = useAsyncData(load);
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [filters, setFilters] = useState({ search: "", materia: "" });
  const filtered = useMemo(() => mapas.filter((item) => {
    if (filters.materia && item.materia !== filters.materia) return false;
    if (filters.search && !JSON.stringify(item.root).toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  }), [filters, mapas]);
  const mapa = filtered.find((item) => item.id === active?.id) || filtered[0] || mapas[0];
  const branches = useMemo(() => mapa?.root.children || [], [mapa]);
  const points = useMemo(() => branches.map((branch, index) => {
    const angle = (index / Math.max(1, branches.length)) * Math.PI * 2 - Math.PI / 2;
    return { branch, x: 460 + Math.cos(angle) * 250, y: 300 + Math.sin(angle) * 190 };
  }), [branches]);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Mapas mentais</p>
          <h1 className="text-3xl font-black text-white">Mapa visual por assunto</h1>
          <p className="mt-1 text-sm text-gray-400">Organize conceitos, excecoes e pontos de prova em uma visao limpa.</p>
        </div>
        <Button icon={Sparkles} onClick={() => setModal(true)}>Gerar mapa</Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[320px_1fr_300px]">
        <div className="space-y-4">
          <Card hover={false}>
            <div className="grid gap-3">
              <Input icon={Search} label="Buscar" placeholder="Conceito ou ponto" value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} />
              <Select label="Materia" placeholder="Todas" options={[...new Set(mapas.map((item) => item.materia))]} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
            </div>
          </Card>
          <div className="space-y-2">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => setActive(item)} className={cx("w-full rounded-lg border p-3 text-left text-sm transition", mapa?.id === item.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-950 text-gray-300 hover:border-blue-400")}>
                <strong>{item.materia}</strong>
                <span className="mt-1 block text-xs opacity-75">{item.root.children.map((child) => child.label).join(" · ")}</span>
              </button>
            ))}
          </div>
        </div>

        <Card hover={false}>
          <div className="mb-3 flex flex-wrap justify-between gap-2">
            <h2 className="font-bold text-white">{mapa?.root.label}</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" icon={ZoomOut} onClick={() => setZoom(Math.max(0.75, zoom - 0.1))} />
              <Button size="sm" variant="secondary" icon={ZoomIn} onClick={() => setZoom(Math.min(1.35, zoom + 0.1))} />
              <Button size="sm" variant="ghost" icon={Focus} onClick={() => setZoom(1)}>Centralizar</Button>
            </div>
          </div>
          <div className="h-[620px] overflow-auto rounded-lg border border-gray-800 bg-gray-900/60">
            <svg width="920" height="620" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
              {points.map(({ branch, x, y }) => (
                <g key={branch.label}>
                  <line x1="460" y1="300" x2={x} y2={y} stroke="#60a5fa" strokeWidth="2" />
                  {branch.children.map((child, childIndex) => {
                    const childX = x + (childIndex ? 130 : -130);
                    const childY = y + (y > 300 ? 88 : -88);
                    return <line key={child.label} x1={x} y1={y} x2={childX} y2={childY} stroke="#94a3b8" strokeWidth="1.5" />;
                  })}
                </g>
              ))}
              <foreignObject x="350" y="250" width="220" height="100"><div className="grid h-full place-items-center rounded-lg bg-blue-600 p-4 text-center text-lg font-black text-white shadow-lg">{mapa?.root.label}</div></foreignObject>
              {points.map(({ branch, x, y }) => (
                <g key={`${branch.label}-node`}>
                  <foreignObject x={x - 82} y={y - 36} width="164" height="78"><div className="grid h-full place-items-center rounded-lg border border-blue-300 bg-gray-950 p-3 text-center text-sm font-bold text-gray-100">{branch.label}</div></foreignObject>
                  {branch.children.map((child, childIndex) => {
                    const childX = x + (childIndex ? 72 : -190);
                    const childY = y + (y > 300 ? 72 : -124);
                    return <foreignObject key={child.label} x={childX} y={childY} width="150" height="64"><div className="grid h-full place-items-center rounded-lg border border-gray-700 bg-gray-950 p-2 text-center text-xs text-gray-200">{child.label}</div></foreignObject>;
                  })}
                </g>
              ))}
            </svg>
          </div>
        </Card>

        <Card hover={false}>
          <h2 className="mb-3 font-bold text-white">Roteiro do mapa</h2>
          <div className="space-y-3">
            {branches.map((branch) => (
              <div key={branch.label} className="rounded-lg bg-gray-900 p-3">
                <strong className="text-sm text-white">{branch.label}</strong>
                <p className="mt-1 text-xs text-gray-400">{branch.children.map((child) => child.label).join(", ")}</p>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full" variant="secondary" icon={Download}>Exportar resumo</Button>
        </Card>
      </div>

      <Modal open={modal} title="Gerar mapa com IA" onClose={() => setModal(false)} footer={<Button onClick={() => setModal(false)}>Construir mapa</Button>}>
        <p className="text-sm text-gray-300">Informe o assunto e a IA monta os ramos principais, excecoes e pontos de prova.</p>
      </Modal>
    </div>
  );
}
