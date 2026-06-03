import { useCallback, useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Button, Card, Pagination, Select } from "../../components";
import { useNotifications } from "../../contexts";
import { useQuestoes } from "../../hooks";
import { questoesService } from "../../services";
import { QuestionCard } from "./QuestionCard";

export default function QuestoesPage() {
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const { questoes, updateFilter } = useQuestoes();
  const { addNotification } = useNotifications();
  const onAnswer = useCallback((id, alternativa) => questoesService.responder(id, alternativa), []);
  const onSave = useCallback(() => addNotification({ type: "success", title: "Questao salva", message: "A questao foi adicionada aos favoritos." }), [addNotification]);
  const onReport = useCallback(() => addNotification({ type: "warning", title: "Reporte enviado", message: "Nossa equipe revisara a questao." }), [addNotification]);
  const totalPages = Math.ceil(questoes.length / 6) || 1;
  const visible = useMemo(() => questoes.slice((page - 1) * 6, page * 6), [questoes, page]);
  return <div><div className="mb-5 flex justify-between gap-3"><div><h1 className="text-3xl font-black text-white">Banco de questoes</h1><p className="text-sm text-gray-400">Resolucao com gabarito, comentario e analise da IA.</p></div><Button icon={Filter} variant="secondary" onClick={() => setFiltersOpen((value) => !value)}>Filtros</Button></div>{filtersOpen ? <Card className="mb-4 grid gap-3 md:grid-cols-4"><Select label="Banca" options={["CESPE", "CEBRASPE", "FCC", "FGV", "VUNESP", "IBFC"]} onChange={(e) => updateFilter("banca", e.target.value)} /><Select label="Materia" options={["Direito Constitucional", "Portugues", "Informatica", "Raciocinio Logico", "Administrativo"]} onChange={(e) => updateFilter("materia", e.target.value)} /><Select label="Dificuldade" options={[{ value: "facil", label: "Facil" }, { value: "media", label: "Media" }, { value: "dificil", label: "Dificil" }]} onChange={(e) => updateFilter("dificuldade", e.target.value)} /><Select label="Tipo" options={[{ value: "multipla_escolha", label: "Multipla escolha" }, { value: "certo_errado", label: "Certo ou Errado" }]} onChange={(e) => updateFilter("tipo", e.target.value)} /><Select label="Ano" options={["2021", "2022", "2023", "2024", "2025"]} onChange={(e) => updateFilter("ano", e.target.value)} /></Card> : null}<div className="space-y-4">{visible.map((questao) => <QuestionCard key={questao.id} questao={questao} onAnswer={onAnswer} onSave={onSave} onReport={onReport} />)}</div><div className="mt-4"><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></div></div>;
}
