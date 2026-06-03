import { useCallback, useMemo, useState } from "react";
import { Layers, RefreshCw } from "lucide-react";
import { Badge, Button, Card, Select } from "../../components";
import { StudyTimeChart } from "../../charts";
import { useNotifications } from "../../contexts";
import { questoesService } from "../../services";
import { useAsyncData } from "../../hooks";
import { groupCount } from "../../utils";

export default function CadernoErrosPage() {
  const [materia, setMateria] = useState("");
  const { addNotification } = useNotifications();
  const load = useCallback(() => questoesService.getAll(), []);
  const { data } = useAsyncData(load, [load]);
  const erros = useMemo(() => data.filter((q) => !materia || q.materia === materia).slice(0, 10), [data, materia]);
  const chart = useMemo(() => Object.entries(groupCount(erros, "materia")).map(([label, valor]) => ({ label, valor })), [erros]);
  return <div><h1 className="text-3xl font-black text-white">Caderno de erros</h1><p className="mb-5 text-sm text-gray-400">Erros filtrados, explicação e conversão em flashcard.</p><Select className="mb-4 max-w-sm" label="Matéria" options={[...new Set(data.map((q) => q.materia))]} onChange={(event) => setMateria(event.target.value)} /><div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]"><div className="space-y-3">{erros.map((item) => <Card key={item.id}><div className="flex justify-between gap-2"><Badge>{item.materia}</Badge><span className="text-xs text-gray-500">{item.ano}</span></div><p className="mt-3 text-gray-200">{item.enunciado}</p><p className="mt-2 text-sm text-gray-400">Sua resposta: A · Gabarito: {item.gabarito.toUpperCase()} · motivo: leitura apressada.</p><div className="mt-3 flex gap-2"><Button size="sm" icon={RefreshCw}>Revisar</Button><Button size="sm" variant="ghost" icon={Layers} onClick={() => addNotification({ type: "success", title: "Flashcard criado", message: "Erro convertido em card." })}>Flashcard</Button><Button size="sm" variant="ghost">Superado</Button></div></Card>)}</div><Card><h2 className="mb-3 font-bold text-white">Distribuição de erros</h2><StudyTimeChart data={chart} layout="vertical" /></Card></div></div>;
}
