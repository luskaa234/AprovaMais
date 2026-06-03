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
  const onSave = useCallback(() => addNotification({ type: "success", title: "Questão salva", message: "A questão foi adicionada aos favoritos." }), [addNotification]);
  const onReport = useCallback(() => addNotification({ type: "warning", title: "Reporte enviado", message: "Nossa equipe revisará a questão." }), [addNotification]);
  const totalPages = Math.ceil(questoes.length / 6) || 1;
  const visible = useMemo(() => questoes.slice((page - 1) * 6, page * 6), [questoes, page]);
  return <div><div className="mb-5 flex justify-between gap-3"><div><h1 className="text-3xl font-black text-white">Banco de questões</h1><p className="text-sm text-gray-400">Resolução com gabarito, comentário e análise da IA.</p></div><Button icon={Filter} variant="secondary" onClick={() => setFiltersOpen((value) => !value)}>Filtros</Button></div>{filtersOpen ? <Card className="mb-4 grid gap-3 md:grid-cols-4"><Select label="Banca" options={["CESPE", "CEBRASPE", "FCC", "FGV", "VUNESP", "IBFC"]} onChange={(e) => updateFilter("banca", e.target.value)} /><Select label="Matéria" options={["Direito Constitucional", "Português", "Informática", "Raciocínio Lógico", "Administrativo"]} onChange={(e) => updateFilter("materia", e.target.value)} /><Select label="Dificuldade" options={[{ value: "fácil", label: "Fácil" }, { value: "média", label: "Média" }, { value: "difícil", label: "Difícil" }]} onChange={(e) => updateFilter("dificuldade", e.target.value)} /><Select label="Tipo" options={[{ value: "multipla_escolha", label: "Múltipla escolha" }, { value: "certo_errado", label: "Certo ou Errado" }]} onChange={(e) => updateFilter("tipo", e.target.value)} /><Select label="Ano" options={["2021", "2022", "2023", "2024", "2025"]} onChange={(e) => updateFilter("ano", e.target.value)} /></Card> : null}<div className="space-y-4">{visible.map((questao) => <QuestionCard key={questao.id} questao={questao} onAnswer={onAnswer} onSave={onSave} onReport={onReport} />)}</div><div className="mt-4"><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></div></div>;
}
