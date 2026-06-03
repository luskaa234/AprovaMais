import { useCallback, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button, Card } from "../../components";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { mapasService } from "../../services";

export default function MapasMentaisPage() {
  const load = useCallback(() => mapasService.getMapas(), []);
  const { data: mapas } = useAsyncData(load);
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);
  const mapa = active || mapas[0];
  const branches = useMemo(() => mapa?.root.children || [], [mapa]);
  const points = useMemo(() => branches.map((branch, index) => {
    const angle = (index / Math.max(1, branches.length)) * Math.PI * 2;
    return { branch, x: 430 + Math.cos(angle) * 250, y: 270 + Math.sin(angle) * 180 };
  }), [branches]);
  const onMove = useCallback((event) => {
    if (!drag) return;
    setPan({ x: event.clientX - drag.x, y: event.clientY - drag.y });
  }, [drag]);
  return <div><div className="mb-5 flex justify-between gap-3"><div><h1 className="text-3xl font-black text-white">Mapas mentais</h1><p className="text-sm text-gray-400">Nos conectados, pan por arraste e zoom por scroll.</p></div><Button icon={Sparkles} onClick={() => setModal(true)}>Gerar mapa</Button></div><div className="grid gap-4 lg:grid-cols-[280px_1fr]"><Card>{mapas.map((item) => <button key={item.id} onClick={() => setActive(item)} className={`mb-2 w-full rounded-lg p-3 text-left text-sm font-semibold ${mapa?.id === item.id ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-300"}`}>{item.materia}</button>)}</Card><Card><div className="mb-3 flex justify-end gap-2"><Button variant="secondary" onClick={() => setZoom(Math.max(0.7, zoom - 0.1))}>-</Button><Button variant="secondary" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}>+</Button></div><div className="h-[560px] overflow-hidden rounded-lg bg-gray-900" onWheel={(event) => setZoom((value) => Math.min(1.6, Math.max(0.7, value + (event.deltaY > 0 ? -0.05 : 0.05))))} onMouseDown={(event) => setDrag({ x: event.clientX - pan.x, y: event.clientY - pan.y })} onMouseMove={onMove} onMouseUp={() => setDrag(null)} onMouseLeave={() => setDrag(null)}><svg width="900" height="560" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center" }}><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#6366f1" /></marker></defs>{points.map(({ branch, x, y }) => <g key={branch.label}><line x1="430" y1="270" x2={x} y2={y} stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />{branch.children.map((child, childIndex) => <line key={child.label} x1={x} y1={y} x2={x + (childIndex ? 125 : -125)} y2={y + 90} stroke="#64748b" strokeWidth="1.5" />)}</g>)}<foreignObject x="350" y="220" width="160" height="100"><div className="rounded-lg bg-indigo-600 p-4 text-center font-black text-white">{mapa?.root.label}</div></foreignObject>{points.map(({ branch, x, y }) => <g key={`${branch.label}-node`}><foreignObject x={x - 70} y={y - 32} width="140" height="70"><div className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-center text-sm font-bold text-gray-100">{branch.label}</div></foreignObject>{branch.children.map((child, childIndex) => <foreignObject key={child.label} x={x + (childIndex ? 80 : -180)} y={y + 78} width="120" height="58"><div className="rounded-lg border border-gray-700 bg-gray-950 p-2 text-center text-xs text-gray-200">{child.label}</div></foreignObject>)}</g>)}</svg></div></Card></div><Modal open={modal} title="Gerar mapa com IA" onClose={() => setModal(false)} footer={<Button onClick={() => setModal(false)}>Construir mapa</Button>}><p className="text-sm text-gray-300">A construcao animada sera simulada com base no tema selecionado.</p></Modal></div>;
}
