import { useCallback, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Badge, Button, Card, Tabs } from "../../components";
import { useAsyncData } from "../../hooks";
import { revisaoService } from "../../services";

export default function RevisaoPage() {
  const [tab, setTab] = useState("Pendentes");
  const load = useCallback(() => revisaoService.getPendentes(), []);
  const { data: itens, setData } = useAsyncData(load, [load]);
  const tabs = ["Pendentes", "Revisao Espacada", "Erros", "Flashcards", "Mapas Mentais", "Resumos"];
  const ordered = useMemo(() => [...itens].sort((a, b) => (a.dueAt || "").localeCompare(b.dueAt || "")), [itens]);
  const avaliar = useCallback((item, quality) => setData((current) => current.map((card) => card.id === item.id ? revisaoService.avaliar(item, quality) : card)), [setData]);
  return <div><h1 className="text-3xl font-black text-white">Central de revisão</h1><p className="mb-5 text-sm text-gray-400">SM-2 simplificado, prioridade e sessões de revisão.</p><Tabs items={tabs} activeTab={tab} onChange={setTab} /><div className="mt-4 grid gap-4 lg:grid-cols-2">{ordered.map((item, index) => <Card key={item.id}><div className="flex items-center justify-between"><Badge variant={index < 2 ? "error" : "warning"}>{item.urgencia || "esta semana"}</Badge><Button size="sm" icon={Play}>Iniciar</Button></div><h2 className="mt-3 font-bold text-white">{item.materia}</h2><p className="mt-2 text-sm text-gray-400">{item.frente}</p><div className="mt-3 flex gap-2">{[1, 3, 4, 5].map((quality) => <Button key={quality} size="sm" variant="secondary" onClick={() => avaliar(item, quality)}>Nota {quality}</Button>)}</div></Card>)}</div></div>;
}
