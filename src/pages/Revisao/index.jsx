import { useCallback, useMemo, useState } from "react";
import { CheckCircle2, Filter, RefreshCw, RotateCcw, Search, Trash2, XCircle } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select } from "../../components";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { questoesService, revisaoService } from "../../services";
import { QuestionCard } from "../Questoes/QuestionCard";

const statusOptions = [
  { value: revisaoService.statuses.ACTIVE_STATUS, label: "A revisar" },
  { value: revisaoService.statuses.MASTERED_STATUS, label: "Dominadas" },
];

function sourceLabel(source) {
  if (source === "caderno") return "Caderno de erros";
  if (source === "refeita") return "Refeita";
  if (source === "manual") return "Manual";
  return "Tentativa errada";
}

function StatBox({ label, value, helper }) {
  return (
    <div className="rounded-lg border border-royal/20 bg-royal/10 p-3">
      <strong className="block text-2xl text-slate-950">{value}</strong>
      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}

function ReviewItem({ item, expanded, busy, onAnswer, onExpand, onMaster, onRemove, onReopen, onSave, onReport }) {
  const questao = item.questao;
  const isMastered = item.status === revisaoService.statuses.MASTERED_STATUS;

  return (
    <Card hover={false} className="overflow-hidden p-0">
      <div className="border-b border-royal/20 bg-white px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={isMastered ? "success" : "warning"}>{item.statusLabel}</Badge>
              <Badge variant="neutral">{sourceLabel(item.source)}</Badge>
              <Badge>{questao.banca || "Banca"}</Badge>
              <Badge variant="neutral">{questao.materiaLabel || questao.materia || "Matéria"}</Badge>
            </div>
            <h2 className="mt-3 line-clamp-2 text-base font-black text-slate-950">{questao.enunciado}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {questao.assuntoLabel || questao.assunto || "Assunto não informado"} · próxima revisão: {item.dueAt || "hoje"}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {!isMastered ? <Button size="sm" icon={RefreshCw} onClick={onExpand}>{expanded ? "Fechar" : "Refazer"}</Button> : null}
            {isMastered ? (
              <Button size="sm" variant="secondary" icon={RotateCcw} loading={busy} onClick={onReopen}>Reabrir</Button>
            ) : (
              <Button size="sm" variant="secondary" icon={CheckCircle2} loading={busy} onClick={onMaster}>Dominei</Button>
            )}
            <Button size="sm" variant="ghost" icon={Trash2} loading={busy} onClick={onRemove}>Remover</Button>
          </div>
        </div>
      </div>

      {expanded ? (
        <div className="border-t border-royal/20 bg-slate-50 p-3">
          <QuestionCard
            questao={questao}
            saved={false}
            inErrorBook={!isMastered}
            onAnswer={onAnswer}
            onSave={onSave}
            onAddCaderno={() => onReopen()}
            onReport={onReport}
          />
        </div>
      ) : null}
    </Card>
  );
}

export default function RevisaoPage() {
  const { addNotification } = useNotifications();
  const [filters, setFilters] = useState({ search: "", materia: "", banca: "", status: revisaoService.statuses.ACTIVE_STATUS });
  const [expandedId, setExpandedId] = useState("");
  const [busyId, setBusyId] = useState("");
  const load = useCallback(() => revisaoService.getCentral(filters), [filters]);
  const { data = {}, isLoading, error, refetch } = useAsyncData(load);

  const items = useMemo(() => data.items || [], [data.items]);
  const allItems = useMemo(() => data.allItems || [], [data.allItems]);
  const stats = data.stats || { revisar: 0, dominadas: 0, total: 0, progresso: 0 };
  const materias = useMemo(() => [...new Set(allItems.map((item) => item.questao?.materiaLabel || item.questao?.materia).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")), [allItems]);
  const bancas = useMemo(() => [...new Set(allItems.map((item) => item.questao?.banca).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")), [allItems]);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const updateFilter = useCallback((key, value) => {
    setExpandedId("");
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const runAction = useCallback(async (id, action, successMessage) => {
    setBusyId(id);
    try {
      await action();
      addNotification({ type: "success", title: "Revisão atualizada", message: successMessage });
      await refetch();
    } catch (err) {
      addNotification({ type: "error", title: "Não foi possível atualizar", message: err.message || "Tente novamente." });
    } finally {
      setBusyId("");
    }
  }, [addNotification, refetch]);

  const onAnswer = useCallback(async (questaoId, alternativaId) => {
    const result = await revisaoService.responder(questaoId, alternativaId);
    addNotification({
      type: result.correta ? "success" : "error",
      title: result.correta ? "Questão dominada" : `Ainda precisa revisar: ${String(result.gabarito).toUpperCase()}`,
      message: result.correta ? "Ela saiu da fila de revisão." : "A questão permanece na revisão.",
    });
    await refetch();
    return result;
  }, [addNotification, refetch]);

  const onSave = useCallback(async (questaoId) => {
    const result = await questoesService.salvar(questaoId);
    addNotification({ type: "success", title: result.saved ? "Questão salva" : "Questão removida", message: result.saved ? "Ela entrou nas favoritas." : "Ela saiu das favoritas." });
  }, [addNotification]);

  const onReport = useCallback(() => {
    addNotification({ type: "warning", title: "Reporte enviado", message: "Nossa equipe revisará a questão." });
  }, [addNotification]);

  const filtersContent = (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(3,1fr)]">
      <Input icon={Search} label="Buscar" placeholder="Enunciado, matéria, banca..." value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} />
      <Select label="Matéria" placeholder="Todas" options={materias} value={filters.materia} onChange={(event) => updateFilter("materia", event.target.value)} />
      <Select label="Banca" placeholder="Todas" options={bancas} value={filters.banca} onChange={(event) => updateFilter("banca", event.target.value)} />
      <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => updateFilter("status", event.target.value)} />
    </div>
  );

  return (
    <div className="mx-auto max-w-[1500px] pb-10">
      <section className="mb-4 rounded-lg border border-royal/20 bg-white p-4 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1fr_440px] xl:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-royal">Central de revisão</p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">Questões reais para revisar</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              A fila usa suas tentativas erradas e o caderno de erros. Refazer, dominar ou remover fica salvo na sua conta.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <StatBox label="A revisar" value={stats.revisar} />
            <StatBox label="Dominadas" value={stats.dominadas} />
            <StatBox label="Progresso" value={`${stats.progresso}%`} helper={`${stats.total} no ciclo`} />
          </div>
        </div>
      </section>

      <Card hover={false} className="mb-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
            <Filter size={16} /> Filtros {activeFilterCount ? `· ${activeFilterCount}` : ""}
          </div>
          <Button size="sm" variant="ghost" icon={RotateCcw} onClick={() => setFilters({ search: "", materia: "", banca: "", status: "" })}>Limpar</Button>
        </div>
        {filtersContent}
      </Card>

      {error ? (
        <Card hover={false} className="mb-4 border-red-200 bg-red-50 text-sm font-semibold text-red-700">
          {error}
        </Card>
      ) : null}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-lg bg-royal/15" />)}
        </div>
      ) : items.length ? (
        <div className="space-y-3">
          {items.map((item) => (
            <ReviewItem
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              busy={busyId === item.id}
              onAnswer={onAnswer}
              onExpand={() => setExpandedId((current) => current === item.id ? "" : item.id)}
              onMaster={() => runAction(item.id, () => revisaoService.marcarDominada(item.id), "A questão saiu da fila de revisão.")}
              onRemove={() => runAction(item.id, () => revisaoService.removerDaRevisao(item.id), "A questão foi removida da revisão.")}
              onReopen={() => runAction(item.id, () => revisaoService.reabrir(item.id), "A questão voltou para a fila de revisão.")}
              onSave={onSave}
              onReport={onReport}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={stats.total ? XCircle : CheckCircle2}
          title={stats.total ? "Nenhuma questão neste filtro" : "Você não tem questões para revisar agora"}
          description={stats.total ? "Ajuste os filtros para ver outros itens da sua revisão." : "Resolva questões para alimentar sua revisão."}
          action={stats.total ? <Button variant="secondary" onClick={() => setFilters({ search: "", materia: "", banca: "", status: "" })}>Limpar filtros</Button> : null}
        />
      )}
    </div>
  );
}
