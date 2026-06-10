import { useCallback, useMemo, useState } from "react";
import { BarChart3, BookOpenCheck, Filter, RotateCcw, Search, Target, Trophy } from "lucide-react";
import { Button, Card, EmptyState, Input, Pagination, Select } from "../../components";
import { useNotifications, useUser } from "../../contexts";
import { useQuestoes } from "../../hooks";
import { Modal } from "../../modals";
import { questoesService } from "../../services";
import { useQuestoesStore } from "../../stores";
import { QuestionCard } from "./QuestionCard";

const statusOptions = [
  { value: "respondidas", label: "Respondidas" },
  { value: "nao_respondidas", label: "Nao respondidas" },
  { value: "erradas", label: "Erradas" },
  { value: "favoritas", label: "Favoritas" },
];

function labelForOption(value) {
  const labels = {
    facil: "Facil",
    medio: "Media",
    media: "Media",
    dificil: "Dificil",
  };
  return labels[String(value || "").toLowerCase()] || value;
}

function filterOptionEntries(value) {
  if (Array.isArray(value)) return value.map((item) => typeof item === "object" ? item : { value: item, label: labelForOption(item) });
  return Object.entries(value || {})
    .filter(([option]) => Boolean(option))
    .sort(([a], [b]) => String(a).localeCompare(String(b), "pt-BR"))
    .map(([option, count]) => ({ value: option, label: `${labelForOption(option)} (${count})` }));
}

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
  const { user } = useUser();
  const initialArea = useMemo(() => questoesService.resolveAreaFromUser(user), [user]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { questoes, filters, updateFilter, clearFilters, isLoading, total, stats, filterOptions } = useQuestoes({ page, pageSize, initialFilters: { area: initialArea } });
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
  const activeFilters = Object.entries(filters).filter(([, value]) => Boolean(value)).length;
  const visibleFilterCount = Object.entries(filters).filter(([key, value]) => key !== "area" && Boolean(value)).length;
  const totalAvailable = stats?.totalDisponivel || total || questoes.length;
  const formatNumber = useCallback((value) => Number(value || 0).toLocaleString("pt-BR"), []);
  const materiaOptions = filterOptionEntries(filterOptions.materias);
  const bancaOptions = filterOptionEntries(filterOptions.bancas);
  const dificuldadeOptions = filterOptionEntries(filterOptions.dificuldades);
  const anoOptions = filterOptionEntries(filterOptions.anos);
  const assuntoOptions = filterOptionEntries(filterOptions.assuntos);
  const concursoOptions = filterOptionEntries(filterOptions.concursos);

  const filtersContent = (
    <>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
        <Input icon={Search} label="Buscar" placeholder="Enunciado, assunto, banca..." value={filters.search || ""} onChange={(event) => setFilter("search", event.target.value)} />
        <Select
          label="Area"
          options={[
            { value: "geral", label: "Geral" },
            { value: "oab", label: "OAB" },
            { value: "militar", label: "Concursos militares" },
          ]}
          value={filters.area || "geral"}
          onChange={(event) => setFilter("area", event.target.value)}
        />
        <Select label="Concurso" placeholder="Todos" options={concursoOptions} value={filters.concurso || ""} onChange={(event) => setFilter("concurso", event.target.value)} />
        <Select label="Materia" placeholder="Todas" options={materiaOptions} value={filters.materia || ""} onChange={(event) => setFilter("materia", event.target.value)} />
        <Select label="Assunto" placeholder="Todos" options={assuntoOptions} value={filters.assunto || ""} onChange={(event) => setFilter("assunto", event.target.value)} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <Select label="Banca" placeholder="Todas" options={bancaOptions} value={filters.banca || ""} onChange={(event) => setFilter("banca", event.target.value)} />
        <Select label="Dificuldade" placeholder="Todas" options={dificuldadeOptions} value={filters.dificuldade || ""} onChange={(event) => setFilter("dificuldade", event.target.value)} />
        <Select label="Ano" placeholder="Todos" options={anoOptions} value={filters.ano || ""} onChange={(event) => setFilter("ano", event.target.value)} />
        <Select label="Situacao" placeholder="Todas" options={statusOptions} value={filters.status || ""} onChange={(event) => setFilter("status", event.target.value)} />
      </div>
    </>
  );

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Banco de questoes</p>
          <h1 className="text-3xl font-black text-white">Treino por banca, materia e desempenho</h1>
          <p className="mt-1 text-sm text-gray-400">Resolva, confira o gabarito comentado e envie erros para revisao.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="md:hidden" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>Filtros{visibleFilterCount ? ` · ${visibleFilterCount}` : ""}</Button>
          <Button className="hidden md:inline-flex" icon={Filter} variant="secondary" onClick={() => setFiltersOpen((value) => !value)}>{filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}</Button>
          <Button icon={RotateCcw} variant="ghost" onClick={() => { clearFilters({ area: initialArea }); setPage(1); }}>Limpar</Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpenCheck} label="Questoes filtradas" value={formatNumber(total)} />
        <StatCard icon={BarChart3} label={stats?.amostraLocal ? "Acervo disponivel" : "Acervo carregado"} value={formatNumber(totalAvailable)} tone="text-indigo-300" />
        <StatCard icon={Target} label="Taxa de acerto" value={`${accuracy}%`} tone={accuracy >= 70 ? "text-emerald-300" : accuracy >= 50 ? "text-amber-300" : "text-red-300"} />
        <StatCard icon={Trophy} label="Resolvidas" value={resolved} tone="text-amber-300" />
      </div>

      {filtersOpen ? (
        <Card hover={false} className="mb-4 hidden md:block">
          {filtersContent}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 pt-3 text-xs text-gray-500">
            <span>{activeFilters ? `${activeFilters} filtro(s) ativo(s)` : "Nenhum filtro ativo"} - area atual: {questoesService.getAreaLabel(filters.area || "geral")} - {formatNumber(totalAvailable)} questoes disponiveis</span>
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
        <EmptyState icon={Search} title="Nenhuma questao encontrada" description="Ajuste os filtros ou limpe a busca para voltar ao treino." action={<Button variant="secondary" onClick={() => { clearFilters({ area: initialArea }); setPage(1); }}>Limpar filtros</Button>} />
      )}

      <div className="mt-5 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)} footer={<Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>}>
        {filtersContent}
      </Modal>
    </div>
  );
}
