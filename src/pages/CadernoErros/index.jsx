import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Filter, Layers, RefreshCw, Search, XCircle } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select } from "../../components";

const StudyTimeChart = lazy(() => import("../../charts").then((m) => ({ default: m.StudyTimeChart })));
import { useInternalRouter, useNotifications, useUser } from "../../contexts";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { Modal } from "../../modals";
import { flashcardsService, questoesService } from "../../services";
import { useAsyncData } from "../../hooks";
import { useQuestoesStore } from "../../stores";
import { groupCount } from "../../utils";

export default function CadernoErrosPage() {
  const [filters, setFilters] = useState({ search: "", materia: "", banca: "", status: "" });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [extraQuestoes, setExtraQuestoes] = useState([]);
  const [superadas, setSuperadas] = useState([]);
  const { addNotification } = useNotifications();
  const { navigate } = useInternalRouter();
  const { user } = useUser();
  const caderno = useQuestoesStore((state) => state.caderno);
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const errosSuperados = useQuestoesStore((state) => state.errosSuperados);
  const load = useCallback(() => questoesService.getAll(), []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user?.id) return undefined;
    let alive = true;
    Promise.all([
      supabase.from("tentativas").select("questao_id, acertou, created_at").eq("user_id", user.id),
      supabase.from("caderno_erros").select("questao_id").eq("user_id", user.id),
    ]).then(([tentativasRes, cadernoRes]) => {
      if (!alive) return;
      useQuestoesStore.setState({
        tentativas: (tentativasRes.data || []).map((item) => ({ questaoId: item.questao_id, acertou: Boolean(item.acertou), data: item.created_at })),
        caderno: (cadernoRes.data || []).map((item) => item.questao_id).filter(Boolean),
      });
    }).catch(() => {});
    return () => { alive = false; };
  }, [user?.id]);
  const { data = [] } = useAsyncData(load);

  const wrongMap = useMemo(() => new Map(tentativas.filter((item) => !item.acertou).map((item) => [item.questaoId, item])), [tentativas]);
  const wrongIds = useMemo(() => new Set([...caderno, ...wrongMap.keys()].filter((id) => !superadas.includes(id) && !errosSuperados.includes(id))), [caderno, errosSuperados, superadas, wrongMap]);
  useEffect(() => {
    questoesService.getByIds([...wrongIds]).then(setExtraQuestoes).catch(() => setExtraQuestoes([]));
  }, [wrongIds]);
  const baseErros = useMemo(() => {
    const merged = new Map([...data, ...extraQuestoes].map((questao) => [questao.id, questao]));
    return [...merged.values()].filter((q) => wrongIds.has(q.id));
  }, [data, extraQuestoes, wrongIds]);
  const erros = useMemo(() => baseErros.filter((q) => {
    if (filters.search && ![q.enunciado, q.assunto, q.assuntoLabel, q.materia, q.materiaLabel].some((field) => String(field || "").toLowerCase().includes(filters.search.toLowerCase()))) return false;
    if (filters.materia && q.materia !== filters.materia) return false;
    if (filters.banca && q.banca !== filters.banca) return false;
    if (filters.status === "manual" && !caderno.includes(q.id)) return false;
    if (filters.status === "respondida" && !wrongMap.has(q.id)) return false;
    return true;
  }), [baseErros, caderno, filters, wrongMap]);
  const chart = useMemo(() => Object.entries(groupCount(erros.map((item) => ({ ...item, materiaGrafico: item.materiaLabel || item.materia })), "materiaGrafico")).map(([label, valor]) => ({ label, valor })), [erros]);
  const materias = useMemo(() => [...new Set(baseErros.map((q) => q.materia).filter(Boolean))], [baseErros]);
  const bancas = useMemo(() => [...new Set(baseErros.map((q) => q.banca).filter(Boolean))], [baseErros]);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const filtersContent = (
    <div className="grid gap-3 md:grid-cols-4">
      <Input icon={Search} label="Buscar" placeholder="Enunciado ou assunto" value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} />
      <Select label="Matéria" placeholder="Todas" options={materias} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
      <Select label="Banca" placeholder="Todas" options={bancas} value={filters.banca} onChange={(event) => setFilters((current) => ({ ...current, banca: event.target.value }))} />
      <Select label="Origem" placeholder="Todas" options={[{ value: "respondida", label: "Erro respondido" }, { value: "manual", label: "Marcada manualmente" }]} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
    </div>
  );

  const superado = useCallback(async (id) => {
    await questoesService.removerDoCaderno(id);
    setSuperadas((current) => current.includes(id) ? current : [...current, id]);
    addNotification({ type: "success", title: "Erro superado", message: "A questão saiu do caderno de erros." });
  }, [addNotification]);

  const revisarAgora = useCallback((item) => {
    sessionStorage.setItem("aprova-questoes-artigo-filter", JSON.stringify({ questoesIds: [item.id] }));
    navigate("questoes");
  }, [navigate]);

  const criarFlashcard = useCallback(async (item) => {
    await flashcardsService.criarFlashcard({ frente: item.enunciado, verso: item.comentario || item.gabarito, materia: item.materia });
    addNotification({ type: "success", title: "Flashcard criado", message: "Erro convertido em card de revisão." });
  }, [addNotification]);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Caderno de erros</p>
          <h1 className="text-3xl font-black text-white">Revisão dos pontos fracos</h1>
          <p className="mt-1 text-sm text-gray-400">Erros respondidos e itens marcados manualmente ficam organizados para retreino.</p>
        </div>
        <Button className="xl:hidden" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>Filtros{activeFilterCount ? ` · ${activeFilterCount}` : ""}</Button>
      </div>

      <Card hover={false} className="mb-4 hidden xl:block">
        {filtersContent}
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {erros.length ? erros.map((item) => {
            const tentativa = wrongMap.get(item.id);
            return (
              <Card hover={false} key={item.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2"><Badge variant="error">{item.materiaLabel || item.materia}</Badge><Badge variant="neutral">{item.banca}</Badge><Badge variant="neutral">{item.assuntoLabel || item.assunto}</Badge></div>
                  <XCircle className="text-red-300" size={18} />
                </div>
                <p className="mt-3 text-gray-200">{item.enunciado}</p>
                <p className="mt-2 text-sm text-gray-400">Sua resposta: {String(tentativa?.resposta || "-").toUpperCase()} · Gabarito: {String(item.gabarito).toUpperCase()}</p>
                <p className="mt-2 rounded-lg bg-gray-900 p-3 text-sm text-gray-300">{item.comentario}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" icon={RefreshCw} onClick={() => revisarAgora(item)}>Revisar agora</Button>
                  <Button size="sm" variant="ghost" icon={Layers} onClick={() => criarFlashcard(item)}>Criar flashcard</Button>
                  <Button size="sm" variant="ghost" icon={CheckCircle2} onClick={() => superado(item.id)}>Superado</Button>
                </div>
              </Card>
            );
          }) : (
            <EmptyState
              icon={CheckCircle2}
              title="Nenhum erro na lista"
              description="Erros respondidos e questões marcadas aparecem aqui automaticamente."
            />
          )}
        </div>
        <Card hover={false}>
          <h2 className="mb-3 font-bold text-white">Distribuição de erros</h2>
          {chart.length ? <Suspense fallback={<div style={{ height: 200 }} />}><StudyTimeChart data={chart} layout="vertical" /></Suspense> : <p className="text-sm text-gray-400">Sem dados suficientes para montar o gráfico.</p>}
        </Card>
      </div>
      <Modal open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)} footer={<Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>}>
        {filtersContent}
      </Modal>
    </div>
  );
}
