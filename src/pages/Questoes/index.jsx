import { useCallback, useState } from "react";
import { BarChart3, BookOpenCheck, Filter, RotateCcw, Search, Target, Trophy } from "lucide-react";
import { Button, Card, EmptyState, Input, Pagination, Select } from "../../components";
import { useNotifications } from "../../contexts";
import { useQuestoes } from "../../hooks";
import { questoesService } from "../../services";
import { useQuestoesStore } from "../../stores";
import { QuestionCard } from "./QuestionCard";

const bancas = ["CESPE", "CEBRASPE", "FCC", "FGV", "VUNESP", "IBFC"];
const materias = [
  "CTB",
  "Direito Administrativo",
  "Direito Constitucional",
  "Direito Penal",
  "Direito Processual Penal",
  "Informatica",
  "Legislacao Penal Especial",
  "Portugues",
  "Raciocinio Logico",
];
const dificuldades = [
  { value: "facil", label: "Facil" },
  { value: "medio", label: "Media" },
  { value: "dificil", label: "Dificil" },
];

function StatCard({ icon: Icon, label, value, tone = "text-blue-300" }) {
  return (
    <Card hover={false} className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
          <strong className="mt-1 block text-2xl text-white">{value}</strong>
        </div>
        <span className="grid size-10 place-items-center rounded-lg bg-gray-900">
          <Icon className={tone} size={20} />
        </span>
      </div>
    </Card>
  );
}

export default function QuestoesPage() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [filtersOpen, setFiltersOpen] = useState(true);
  const { questoes, filters, updateFilter, clearFilters, isLoading, total, stats } = useQuestoes({ page, pageSize });
  const { addNotification } = useNotifications();
  const addCaderno = useQuestoesStore((state) => state.addCaderno);
  const tentativas = useQuestoesStore((state) => state.tentativas);

  const setFilter = useCallback((key, value) => {
    setPage(1);
    updateFilter(key, value);
  }, [updateFilter]);

  const onAnswer = useCallback(async (id, alternativa) => {
    const result = await questoesService.responder(id, alternativa);
    addNotification({
      type: result.correta ? "success" : "error",
      title: result.correta ? "Correto! +10 pontos" : `Incorreto. Gabarito: ${String(result.gabarito).toUpperCase()}`,
      message: result.correta ? "Seus indicadores foram atualizados." : "A questao entrou no caderno de erros.",
    });
    return result;
  }, [addNotification]);

  const onSave = useCallback(async (id) => {
    await questoesService.salvar(id);
    addNotification({ type: "success", title: "Questao salva", message: "Favoritos atualizados." });
  }, [addNotification]);

  const onAddCaderno = useCallback((id) => {
    addCaderno(id);
    addNotification({ type: "success", title: "Caderno atualizado", message: "Questao adicionada ao caderno de erros." });
  }, [addCaderno, addNotification]);

  const onReport = useCallback(() => addNotification({ type: "warning", title: "Reporte enviado", message: "Nossa equipe revisara a questao." }), [addNotification]);

  const resolved = tentativas.length;
  const correct = tentativas.filter((item) => item.acertou).length;
  const accuracy = resolved ? Math.round((correct / resolved) * 100) : 0;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const visible = questoes;
  const activeFilters = Object.values(filters).filter(Boolean).length;
  const totalAvailable = stats?.totalDisponivel || total || questoes.length;
  const formatNumber = useCallback((value) => Number(value || 0).toLocaleString("pt-BR"), []);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Banco de questoes</p>
          <h1 className="text-3xl font-black text-white">Treino por banca, materia e desempenho</h1>
          <p className="mt-1 text-sm text-gray-400">Resolva, confira o gabarito comentado e envie erros para revisao.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={Filter} variant="secondary" onClick={() => setFiltersOpen((value) => !value)}>{filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}</Button>
          <Button icon={RotateCcw} variant="ghost" onClick={() => { clearFilters(); setPage(1); }}>Limpar</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpenCheck} label="Questoes filtradas" value={formatNumber(total)} />
        <StatCard icon={BarChart3} label={stats?.amostraLocal ? "Acervo disponivel" : "Acervo carregado"} value={formatNumber(totalAvailable)} tone="text-indigo-300" />
        <StatCard icon={Target} label="Taxa de acerto" value={`${accuracy}%`} tone={accuracy >= 70 ? "text-emerald-300" : accuracy >= 50 ? "text-amber-300" : "text-red-300"} />
        <StatCard icon={Trophy} label="Resolvidas" value={resolved} tone="text-amber-300" />
      </div>

      {filtersOpen ? (
        <Card hover={false} className="mb-4">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
            <Input icon={Search} label="Buscar" placeholder="Enunciado, assunto, banca..." value={filters.search || ""} onChange={(event) => setFilter("search", event.target.value)} />
            <Select label="Banca" placeholder="Todas" options={bancas} value={filters.banca || ""} onChange={(event) => setFilter("banca", event.target.value)} />
            <Select label="Materia" placeholder="Todas" options={materias} value={filters.materia || ""} onChange={(event) => setFilter("materia", event.target.value)} />
            <Select label="Dificuldade" placeholder="Todas" options={dificuldades} value={filters.dificuldade || ""} onChange={(event) => setFilter("dificuldade", event.target.value)} />
            <Select label="Ano" placeholder="Todos" options={["2021", "2022", "2023", "2024", "2025"]} value={filters.ano || ""} onChange={(event) => setFilter("ano", event.target.value)} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 pt-3 text-xs text-gray-500">
            <span>{activeFilters ? `${activeFilters} filtro(s) ativo(s)` : "Nenhum filtro ativo"} - todas as {formatNumber(totalAvailable)} questoes disponiveis</span>
            <span>Pagina {page} de {totalPages}</span>
          </div>
        </Card>
      ) : null}

      {isLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-lg bg-gray-900" />)}</div>
      ) : visible.length ? (
        <div className="space-y-4">
          {visible.map((questao, index) => (
            <QuestionCard key={questao.id} index={(page - 1) * pageSize + index} questao={questao} onAnswer={onAnswer} onSave={onSave} onAddCaderno={onAddCaderno} onReport={onReport} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Search} title="Nenhuma questao encontrada" description="Ajuste os filtros ou limpe a busca para voltar ao treino." action={<Button variant="secondary" onClick={() => { clearFilters(); setPage(1); }}>Limpar filtros</Button>} />
      )}

      <div className="mt-5 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
