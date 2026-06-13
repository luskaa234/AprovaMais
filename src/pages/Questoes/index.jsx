import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BarChart3, BookOpenCheck, Filter, RotateCcw, Search, Sparkles, Target, Trophy } from "lucide-react";
import { Button, Card, EmptyState, Input, Select } from "../../components";
import { useNotifications, useUser } from "../../contexts";
import { useQuestoes } from "../../hooks";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { questoesService } from "../../services";
import { useQuestoesStore } from "../../stores";
import { QuestionCard } from "./QuestionCard";

const statusOptions = [
  { value: "respondidas", label: "Respondidas" },
  { value: "nao_respondidas", label: "Não respondidas" },
  { value: "erradas", label: "Erradas" },
  { value: "favoritas", label: "Favoritas" },
];

function labelForOption(value) {
  const labels = {
    facil: "Fácil",
    medio: "Média",
    media: "Média",
    dificil: "Difícil",
  };
  return labels[String(value || "").toLowerCase()] || value;
}

function filterOptionEntries(value) {
  if (Array.isArray(value)) return value.map((item) => typeof item === "object" ? item : { value: item, label: labelForOption(item) });
  return Object.entries(value || {})
    .filter(([option]) => Boolean(option))
    .map(([option, data]) => ({
      value: option,
      label: typeof data === "object" ? data.label || option : labelForOption(option),
      count: typeof data === "object" ? data.count || 0 : data,
    }))
    .sort((a, b) => String(a.label).localeCompare(String(b.label), "pt-BR"))
    .map((item) => ({ value: item.value, label: `${item.label} (${item.count})` }));
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
  const initialArea = "geral";
  const [articleTrainingFilter] = useState(() => {
    try {
      const saved = sessionStorage.getItem("aprova-questoes-artigo-filter");
      if (!saved) return null;
      sessionStorage.removeItem("aprova-questoes-artigo-filter");
      const parsed = JSON.parse(saved);
      return {
        materia: parsed.materia || "",
        assunto: parsed.assunto || "",
        search: parsed.search || "",
        questoesIds: Array.isArray(parsed.questoesIds) && parsed.questoesIds.length ? parsed.questoesIds : undefined,
      };
    } catch {
      return null;
    }
  });
  const [page, setPage] = useState(1);
  const batchSize = 6;
  const pageSize = page * batchSize;
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sessionSeed, setSessionSeed] = useState(() => `treino-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const baseTrainingFilters = useMemo(() => ({ area: initialArea, aleatorio: true, seed: sessionSeed, ...(articleTrainingFilter || {}) }), [articleTrainingFilter, initialArea, sessionSeed]);
  const { questoes, filters, updateFilter, clearFilters, isLoading, total, stats, filterOptions } = useQuestoes({ page: 1, pageSize, initialFilters: baseTrainingFilters });
  const loaderRef = useRef(null);
  const { addNotification } = useNotifications();
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const salvas = useQuestoesStore((state) => state.salvas);
  const caderno = useQuestoesStore((state) => state.caderno);
  const usingSupabaseUser = isSupabaseConfigured && Boolean(user?.id);
  const [remoteUserData, setRemoteUserData] = useState({ tentativas: [], salvas: [], caderno: [] });
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  useEffect(() => {
    if (!usingSupabaseUser) return undefined;
    let alive = true;
    async function loadUserQuestionState() {
      const [tentativasRes, salvasRes, cadernoRes] = await Promise.all([
        supabase.from("tentativas").select("questao_id, acertou, created_at").eq("user_id", user.id),
        supabase.from("questoes_salvas").select("questao_id").eq("user_id", user.id),
        supabase.from("caderno_erros").select("questao_id").eq("user_id", user.id),
      ]);
      if (!alive) return;
      setRemoteUserData({
        tentativas: (tentativasRes.data || []).map((item) => ({ questaoId: item.questao_id, acertou: Boolean(item.acertou), data: item.created_at })),
        salvas: (salvasRes.data || []).map((item) => item.questao_id).filter(Boolean),
        caderno: (cadernoRes.data || []).map((item) => item.questao_id).filter(Boolean),
      });
    }
    loadUserQuestionState().catch(() => {
      if (alive) setRemoteUserData({ tentativas: [], salvas: [], caderno: [] });
    });
    return () => {
      alive = false;
    };
  }, [user?.id, usingSupabaseUser]);

  const setFilter = useCallback((key, value) => {
    setPage(1);
    updateFilter(key, value);
  }, [updateFilter]);

  const resetTraining = useCallback((nextFilters = {}) => {
    setPage(1);
    clearFilters({ ...baseTrainingFilters, ...nextFilters });
  }, [baseTrainingFilters, clearFilters]);

  const shuffleTraining = useCallback(() => {
    const nextSeed = `treino-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setSessionSeed(nextSeed);
    setPage(1);
    clearFilters({ ...filters, aleatorio: true, seed: nextSeed });
  }, [clearFilters, filters]);

  const onAnswer = useCallback(async (id, alternativa) => {
    const result = await questoesService.responder(id, alternativa);
    if (usingSupabaseUser) {
      setRemoteUserData((current) => ({
        ...current,
        tentativas: [{ questaoId: id, acertou: Boolean(result.correta), data: new Date().toISOString() }, ...current.tentativas],
        caderno: result.correta || current.caderno.includes(id) ? current.caderno : [id, ...current.caderno],
      }));
    }
    addNotification({
      type: result.correta ? "success" : "error",
      title: result.correta ? "Correto! +10 pontos" : `Incorreto. Gabarito: ${String(result.gabarito).toUpperCase()}`,
      message: result.correta ? "Seus indicadores foram atualizados." : "A questão entrou no caderno de erros.",
    });
    return result;
  }, [addNotification, usingSupabaseUser]);

  const onSave = useCallback(async (id) => {
    const result = await questoesService.salvar(id);
    if (usingSupabaseUser) {
      setRemoteUserData((current) => ({
        ...current,
        salvas: result.saved ? [id, ...current.salvas.filter((item) => item !== id)] : current.salvas.filter((item) => item !== id),
      }));
    }
    addNotification({
      type: "success",
      title: result.saved ? "Questão salva" : "Questão removida",
      message: result.saved ? "Ela entrou nas favoritas." : "Ela saiu das favoritas.",
    });
  }, [addNotification, usingSupabaseUser]);

  const onAddCaderno = useCallback(async (id) => {
    const result = await questoesService.adicionarAoCaderno(id);
    if (usingSupabaseUser) {
      setRemoteUserData((current) => ({
        ...current,
        caderno: current.caderno.includes(id) ? current.caderno : [id, ...current.caderno],
      }));
    }
    addNotification({ type: "success", title: "Caderno atualizado", message: result.added ? "Questão adicionada ao caderno de erros." : "Esta questão já estava no caderno." });
  }, [addNotification, usingSupabaseUser]);

  const onReport = useCallback(() => addNotification({ type: "warning", title: "Reporte enviado", message: "Nossa equipe revisará a questão." }), [addNotification]);
  const generateAIQuestions = useCallback(async () => {
    if (generatingQuestions) return;
    setGeneratingQuestions(true);
    try {
      const rows = await questoesService.gerarQuestoesIA({
        assunto: filters.assunto || filters.search || filters.materia || "treino geral",
        materia: filters.materia || "",
        concurso: filters.concurso || questoesService.getAreaLabel(filters.area || "geral"),
        dificuldade: filters.dificuldade || "medio",
        quantidade: 3,
      });
      setGeneratedQuestions((current) => [...rows, ...current]);
      addNotification({ type: "success", title: "Questões geradas", message: `${rows.length} questões inéditas foram adicionadas ao topo do treino.` });
    } catch {
      addNotification({ type: "warning", title: "IA indisponível", message: "Não foi possível gerar questões agora." });
    } finally {
      setGeneratingQuestions(false);
    }
  }, [addNotification, filters, generatingQuestions]);

  const activeTentativas = usingSupabaseUser ? remoteUserData.tentativas : tentativas;
  const activeSalvas = usingSupabaseUser ? remoteUserData.salvas : salvas;
  const activeCaderno = usingSupabaseUser ? remoteUserData.caderno : caderno;
  const resolved = activeTentativas.length;
  const correct = activeTentativas.filter((item) => item.acertou).length;
  const accuracy = resolved ? Math.round((correct / resolved) * 100) : 0;
  const visible = useMemo(() => {
    const seen = new Set();
    return [...generatedQuestions, ...questoes].filter((questao) => {
      if (!questao?.id || seen.has(questao.id)) return false;
      seen.add(questao.id);
      return true;
    });
  }, [generatedQuestions, questoes]);
  const hasMore = visible.length < total;
  const isFirstLoading = isLoading && page === 1 && !visible.length;
  const visibleFilterCount = Object.entries(filters).filter(([key, value]) => !["area", "aleatorio", "seed", "questoesIds"].includes(key) && Boolean(value)).length;
  const totalAvailable = stats?.totalDisponivel || total || visible.length || questoes.length;
  const formatNumber = useCallback((value) => Number(value || 0).toLocaleString("pt-BR"), []);
  const materiaOptions = filterOptionEntries(filterOptions.materias);
  const bancaOptions = filterOptionEntries(filterOptions.bancas);
  const dificuldadeOptions = filterOptionEntries(filterOptions.dificuldades);
  const anoOptions = filterOptionEntries(filterOptions.anos);
  const concursoOptions = filterOptionEntries(filterOptions.concursos);

  const loadNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((current) => current + 1);
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadNextPage();
    }, { rootMargin: "420px 0px" });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadNextPage]);

  useEffect(() => {
    if (!visible.length || !hasMore || isLoading) return;
    const answered = new Set(activeTentativas.map((item) => item.questaoId));
    if (!visible.every((questao) => answered.has(questao.id))) return undefined;
    const timer = window.setTimeout(loadNextPage, 0);
    return () => window.clearTimeout(timer);
  }, [activeTentativas, hasMore, isLoading, loadNextPage, visible]);

  const filtersContent = (
    <>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(3,1fr)]">
        <Input icon={Search} label="Buscar" placeholder="Enunciado, matéria, banca..." value={filters.search || ""} onChange={(event) => setFilter("search", event.target.value)} />
        <Select
          label="Área"
          options={[
            { value: "geral", label: "Geral" },
            { value: "oab", label: "OAB" },
            { value: "militar", label: "Concursos militares" },
          ]}
          value={filters.area || "geral"}
          onChange={(event) => setFilter("area", event.target.value)}
        />
        <Select label="Concurso" placeholder="Todos" options={concursoOptions} value={filters.concurso || ""} onChange={(event) => setFilter("concurso", event.target.value)} />
        <Select label="Matéria" placeholder="Todas" options={materiaOptions} value={filters.materia || ""} onChange={(event) => setFilter("materia", event.target.value)} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <Select label="Banca" placeholder="Todas" options={bancaOptions} value={filters.banca || ""} onChange={(event) => setFilter("banca", event.target.value)} />
        <Select label="Dificuldade" placeholder="Todas" options={dificuldadeOptions} value={filters.dificuldade || ""} onChange={(event) => setFilter("dificuldade", event.target.value)} />
        <Select label="Ano" placeholder="Todos" options={anoOptions} value={filters.ano || ""} onChange={(event) => setFilter("ano", event.target.value)} />
        <Select label="Situação" placeholder="Todas" options={statusOptions} value={filters.status || ""} onChange={(event) => setFilter("status", event.target.value)} />
      </div>
    </>
  );

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between" data-tour="tour-questoes-header">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Banco de questões</p>
          <h1 className="text-3xl font-black text-white">Treino por banca, matéria e desempenho</h1>
          <p className="mt-1 text-sm text-gray-400">Resolva, confira o gabarito comentado e envie erros para revisão.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="xl:hidden" data-tour="tour-questoes-filters" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen((value) => !value)}>
            {mobileFiltersOpen ? "Fechar filtros" : "Filtros"}{visibleFilterCount ? ` · ${visibleFilterCount}` : ""}
          </Button>
          <Button className="hidden xl:inline-flex" data-tour="tour-questoes-filters-toggle" icon={Filter} variant="secondary" onClick={() => setFiltersOpen((value) => !value)}>{filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}</Button>
          <Button icon={Sparkles} variant="secondary" loading={generatingQuestions} onClick={generateAIQuestions}>Gerar questões IA</Button>
          <Button icon={RotateCcw} variant="secondary" onClick={shuffleTraining}>Misturar treino</Button>
          <Button icon={RotateCcw} variant="ghost" onClick={() => resetTraining({ area: initialArea })}>Limpar</Button>
        </div>
      </div>

      {filtersOpen ? (
        <Card hover={false} className="mb-4 hidden xl:block" data-tour="tour-questoes-filters">
          {filtersContent}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 pt-3 text-xs text-gray-500">
            <span>{visibleFilterCount ? `${visibleFilterCount} filtro(s) ativo(s)` : "Nenhum filtro ativo"} - área atual: {questoesService.getAreaLabel(filters.area || "geral")} - treino aleatório inteligente</span>
            <span>{formatNumber(visible.length)} de {formatNumber(total)} carregadas</span>
          </div>
        </Card>
      ) : null}

      {mobileFiltersOpen ? (
        <Card hover={false} className="question-mobile-filters mb-4 xl:hidden" data-tour="tour-questoes-filters">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-950">Filtros</h2>
              <p className="text-xs font-semibold text-slate-500">{formatNumber(totalAvailable)} questões disponíveis</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setMobileFiltersOpen(false)}>Fechar</Button>
          </div>
          {filtersContent}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-blue-100 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                resetTraining({ area: initialArea });
              }}
            >
              Limpar
            </Button>
            <Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>
          </div>
        </Card>
      ) : null}

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" data-tour="tour-questoes-stats">
        <StatCard icon={BookOpenCheck} label="Questões filtradas" value={formatNumber(total)} />
        <StatCard icon={BarChart3} label={stats?.amostraLocal ? "Acervo disponível" : "Acervo carregado"} value={formatNumber(totalAvailable)} tone="text-blue-300" />
        <StatCard icon={Target} label="Taxa de acerto" value={`${accuracy}%`} tone={accuracy >= 70 ? "text-emerald-500" : accuracy >= 50 ? "text-amber-500" : "text-red-500"} />
        <StatCard icon={Trophy} label="Resolvidas" value={resolved} tone="text-blue-300" />
      </div>

      {isFirstLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-lg bg-gray-900" />)}</div>
      ) : visible.length ? (
        <div className="space-y-4" data-tour="tour-questoes-list">
          {visible.map((questao, index) => (
            <QuestionCard
              key={questao.id}
              index={index}
              questao={questao}
              saved={activeSalvas.includes(questao.id)}
              inErrorBook={activeCaderno.includes(questao.id)}
              onAnswer={onAnswer}
              onSave={onSave}
              onAddCaderno={onAddCaderno}
              onReport={onReport}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="Nenhuma questão encontrada"
          description="Ajuste os filtros ou limpe a busca para voltar ao treino."
          action={<Button variant="secondary" onClick={() => resetTraining({ area: initialArea })}>Limpar filtros</Button>}
        />
      )}

      <div ref={loaderRef} className="mt-5 flex justify-center">
        {hasMore ? (
          <Button variant="secondary" loading={isLoading} onClick={loadNextPage}>
            {isLoading ? "Carregando..." : "Carregar mais automaticamente"}
          </Button>
        ) : visible.length ? (
          <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-500">Fim do treino filtrado</span>
        ) : null}
      </div>

    </div>
  );
}
