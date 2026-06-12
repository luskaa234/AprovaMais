import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { BookOpen, CalendarCheck, ChevronRight, Clock, ClipboardList, Dumbbell, FileText, Flame, MessageCircleQuestion, Play, Target, X, Zap } from "lucide-react";
import { AIPanel } from "../../ai";
import { Badge, Button, Card, ProgressBar, cx } from "../../components";
import { useInternalRouter, useUser } from "../../contexts";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { aiService, questoesService } from "../../services";
import { usePlanoStore, useQuestoesStore, useRankingStore, useRevisaoStore } from "../../stores";

const PerformanceChart = lazy(() => import("../../charts").then((module) => ({ default: module.PerformanceChart })));
const StudyTimeChart = lazy(() => import("../../charts").then((module) => ({ default: module.StudyTimeChart })));
const HeatmapCalendar = lazy(() => import("../../charts").then((module) => ({ default: module.HeatmapCalendar })));

const KpiCard = ({ label, value, icon: Icon }) => (
  <Card>
    <Icon className="mb-4 text-blue-600" />
    <p className="text-sm text-gray-400">{label}</p>
    <strong className="mt-1 block text-3xl text-white">{value}</strong>
  </Card>
);

const MobileMetricTile = ({ label, value, icon: Icon, tone, featured = false }) => (
  <div className={cx("mobile-study-metric", tone, featured && "mobile-study-metric-featured")}>
    <div className="mobile-study-metric-icon">
      <Icon size={featured ? 22 : 18} strokeWidth={2.2} />
    </div>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const MobileQuickAction = ({ icon: Icon, label, detail, onClick, tone }) => (
  <button className={cx("mobile-study-action", tone)} onClick={onClick} type="button">
    <span className="mobile-study-action-icon">
      <Icon size={19} />
    </span>
    <span>
      <strong>{label}</strong>
      <small>{detail}</small>
    </span>
    <ChevronRight size={18} />
  </button>
);

function getObjectiveContent(user = {}) {
  const objective = String(user.objective || user.diagnosticPlan?.objective || "").toLowerCase();
  const target = String(user.targetContest || user.contestName || user.diagnosticPlan?.objectiveLabel || "").toLowerCase();

  if (objective === "oab" || target.includes("oab")) {
    return {
      title: "Conteúdos OAB",
      label: "OAB",
      subjects: ["Ética Profissional", "Direito Constitucional", "Direito Civil", "Processo Civil", "Direito Penal", "Direito do Trabalho"],
      actions: ["Questões FGV", "Simulado 1ª fase", "Treino de peça"],
    };
  }

  if (
    objective === "concurso" ||
    target.includes("pm") ||
    target.includes("policia") ||
    target.includes("bombeiro") ||
    target.includes("cbm") ||
    target.includes("prf")
  ) {
    return {
      title: "Conteúdos de segurança pública",
      label: user.targetContest || "PM/segurança",
      subjects: ["Português", "Matemática/RL", "Informática", "Atualidades", "Direito Constitucional", "Direito Penal", "Processo Penal", "Legislação Especial", "Direito Militar", "TAF"],
      actions: ["Questões oficiais", "Simulado por banca", "Treino TAF"],
    };
  }

  return {
    title: "Estudo geral",
    label: "Geral",
    subjects: user.diagnosticPlan?.prioritySubjects || ["Português", "Matemática", "Informática", "Atualidades", "Redação"],
    actions: ["Plano semanal", "Questões disponíveis", "Revisão"],
  };
}

const MobileDashboard = ({ kpis, performance, revisoes, ranking, navigate, user }) => {
  const [hours, questions, accuracy, streak, taf] = kpis;
  const todayAccuracy = Number.parseInt(String(accuracy[1]), 10) || 0;
  const tafValue = Number.parseFloat(String(taf[1])) || 0;
  const questionsValue = Number.parseInt(String(questions[1]), 10) || 0;
  const planProgress = Math.min(100, Math.round((todayAccuracy + Math.min(100, questionsValue * 10) + tafValue * 10) / 3));
  const todayHit = performance.at(-1)?.acertos ?? todayAccuracy;
  const firstName = user?.name?.split(" ")[0] || "Aluno";

  return (
    <div className="mobile-study-home xl:hidden" data-tour="tour-dashboard-overview">
      <section className="mobile-study-hero">
        <div>
          <span>Hoje</span>
          <h1>Bom estudo, {firstName}</h1>
          <p>Plano ativo para prova, revisão e TAF.</p>
        </div>
      </section>

      <section className="mobile-study-progress" data-tour="tour-dashboard-kpis">
        <div className="mobile-study-progress-top">
          <div>
            <span>Missão do dia</span>
            <strong>{planProgress}%</strong>
          </div>
        </div>
        <ProgressBar value={planProgress} color="bg-blue-600" />
        <div className="mobile-study-progress-goals">
          <span><BookOpen size={15} /> {questions[1]} questões</span>
          <span><Flame size={15} /> {streak[1]} dias</span>
          <span><Dumbbell size={15} /> TAF {taf[1]}</span>
        </div>
      </section>

      <div className="mobile-study-metrics" data-tour="tour-desempenho">
        <MobileMetricTile featured icon={Clock} label={hours[0]} tone="tone-blue" value={hours[1]} />
        <MobileMetricTile icon={Target} label={accuracy[0]} tone="tone-emerald" value={accuracy[1]} />
        <MobileMetricTile icon={ClipboardList} label={questions[0]} tone="tone-violet" value={questions[1]} />
        <MobileMetricTile icon={Dumbbell} label={taf[0]} tone="tone-amber" value={taf[1]} />
      </div>

      <div className="mobile-study-section-title">
        <h2>Ações rápidas</h2>
      </div>
      <div className="mobile-study-actions" data-tour="tour-dashboard-actions">
        <MobileQuickAction detail="Começar bloco agora" icon={Play} label="Estudar" onClick={() => navigate("plano")} tone="tone-blue" />
        <MobileQuickAction detail={`${revisoes.length} pendentes hoje`} icon={CalendarCheck} label="Revisar" onClick={() => navigate("revisao")} tone="tone-rose" />
        <MobileQuickAction detail={`${todayHit}% no último dia`} icon={Target} label="Questões" onClick={() => navigate("questoes")} tone="tone-emerald" />
      </div>

      <section className="mobile-study-card">
        <div className="mobile-study-card-header">
          <h2>Próximas revisões</h2>
          <button onClick={() => navigate("revisao")} type="button">Ver</button>
        </div>
        {revisoes.slice(0, 3).map((item) => (
          <div className="mobile-study-list-item" key={item.id || item.assuntoId}>
            <span>{item.frente || item.assunto}</span>
            <Badge variant="warning">{item.urgencia || item.proxima || "hoje"}</Badge>
          </div>
        ))}
      </section>

      <section className="mobile-study-card">
        <div className="mobile-study-card-header">
          <h2>Ranking</h2>
          <button onClick={() => navigate("perfil")} type="button">Perfil</button>
        </div>
        {ranking.slice(0, 3).map((item) => (
          <div className="mobile-study-rank" key={`${item.posicao}-${item.nome}-${item.pontos}`}>
            <strong>{item.posicao}</strong>
            <span>{item.nome}</span>
            <b>{item.pontos}</b>
          </div>
        ))}
      </section>
    </div>
  );
};

function ChartFallback() {
  return <div className="h-72 animate-pulse rounded-lg bg-gray-900" />;
}

export default function DashboardPage() {
  const { user } = useUser();
  const { navigate } = useInternalRouter();
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const questoes = useQuestoesStore((state) => state.questoes);
  const rankingLocal = useRankingStore((state) => state.ranking);
  const revisoesLocal = useRevisaoStore((state) => state.pendentesHoje);
  const progressoPorDisciplina = usePlanoStore((state) => state.progressoPorDisciplina);
  const usingSupabaseUser = isSupabaseConfigured && Boolean(user?.id);
  const [remote, setRemote] = useState({ profile: null, ranking: null, revisoes: null, performance: null, tentativas: null });
  const [relatorio, setRelatorio] = useState(null);
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false);
  const [materiasDoPerfil, setMateriasDoPerfil] = useState([]);
  const [chartsReady, setChartsReady] = useState(false);
  const diagnosticPlan = user?.diagnosticPlan;
  const objectiveContent = useMemo(() => getObjectiveContent(user), [user]);
  const objectiveArea = useMemo(() => questoesService.resolveAreaFromUser(user), [user]);

  const localPerformance = useMemo(() => {
    const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    return Array.from({ length: 7 }, (_, offset) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - offset));
      const key = date.toISOString().slice(0, 10);
      const doDia = tentativas.filter((item) => item.data?.slice(0, 10) === key);
      const acertos = doDia.filter((item) => item.acertou).length;
      return { label: labels[date.getDay()], acertos: doDia.length ? Math.round((acertos / doDia.length) * 100) : 0 };
    });
  }, [tentativas]);

  useEffect(() => {
    const showCharts = () => setChartsReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(showCharts, { timeout: 1200 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(showCharts, 300);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user?.id) return undefined;
    let alive = true;

    async function loadDashboard() {
      const hoje = new Date().toISOString().slice(0, 10);
      const seteDias = new Date();
      seteDias.setDate(seteDias.getDate() - 7);

      const [profileRes, revisoesRes, rankingRes, tentativasRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("revisoes").select("*").eq("user_id", user.id).lte("proxima", hoje).limit(5),
        supabase.from("ranking").select("pontos, profiles(name)").eq("user_id", user.id).limit(1),
        supabase.from("tentativas").select("questao_id, acertou, created_at").eq("user_id", user.id),
      ]);

      if (!alive) return;

      const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const tentativasUsuario = tentativasRes.data || [];
      const grouped = tentativasUsuario
        .filter((item) => new Date(item.created_at) >= seteDias)
        .reduce((acc, item) => {
        const label = labels[new Date(item.created_at).getDay()];
        acc[label] ||= { total: 0, acertos: 0 };
        acc[label].total += 1;
        if (item.acertou) acc[label].acertos += 1;
        return acc;
      }, {});

      setRemote({
        profile: profileRes.data || null,
        revisoes: revisoesRes.data || null,
        ranking: rankingRes.data?.map((item, index) => ({ posicao: index + 1, nome: item.profiles?.name || "Aluno", pontos: item.pontos })) || null,
        performance: Object.entries(grouped).map(([label, value]) => ({ label, acertos: value.total ? Math.round((value.acertos / value.total) * 100) : 0 })),
        tentativas: tentativasUsuario.map((item) => ({
          questaoId: item.questao_id,
          acertou: Boolean(item.acertou),
          data: item.created_at,
        })),
      });
    }

    loadDashboard().catch(() => {});
    return () => {
      alive = false;
    };
  }, [user?.id]);

  useEffect(() => {
    let alive = true;
    questoesService.getMateriasPorArea(objectiveArea)
      .then((materias) => {
        if (alive) setMateriasDoPerfil(materias);
      })
      .catch(() => {
        if (alive) setMateriasDoPerfil([]);
      });
    return () => {
      alive = false;
    };
  }, [objectiveArea]);

  const activeTentativas = useMemo(() => (usingSupabaseUser ? (remote.tentativas || []) : tentativas), [remote.tentativas, tentativas, usingSupabaseUser]);
  const tempo = useMemo(() => {
    if (usingSupabaseUser) return [];
    return Object.entries(progressoPorDisciplina).map(([label, valor]) => ({ label, valor }));
  }, [progressoPorDisciplina, usingSupabaseUser]);
  const stats = remote.profile || user.rawStats || {};
  const revisoes = usingSupabaseUser ? (remote.revisoes || []) : revisoesLocal;
  const ranking = usingSupabaseUser ? (remote.ranking || []) : rankingLocal;
  const performance = usingSupabaseUser ? (remote.performance || []) : localPerformance;
  const questoesResolvidas = activeTentativas.length;
  const acertos = activeTentativas.filter((item) => item.acertou).length;
  const taxaAcertos = questoesResolvidas ? Math.round((acertos / questoesResolvidas) * 100) : 0;
  const sequenciaTentativas = new Set(activeTentativas.map((item) => item.data?.slice(0, 10)).filter(Boolean)).size;
  const desempenhoIA = useMemo(() => {
    const porMateria = activeTentativas.reduce((acc, tentativa) => {
      const questao = questoes.find((item) => item.id === tentativa.questaoId);
      const materia = tentativa.materia || questao?.materiaLabel || questao?.materia;
      if (!materia || materia === "Nao informada" || materia === "Não informada") return acc;
      acc[materia] ||= { acertos: 0, total: 0, erros: 0 };
      acc[materia].total += 1;
      if (tentativa.acertou) acc[materia].acertos += 1;
      else acc[materia].erros += 1;
      return acc;
    }, {});
    const materiasFracas = Object.entries(porMateria)
      .sort((a, b) => b[1].erros - a[1].erros || a[1].acertos / Math.max(a[1].total, 1) - b[1].acertos / Math.max(b[1].total, 1))
      .slice(0, 4)
      .map(([materia]) => materia);

    return {
      questoesResolvidas,
      taxaAcertos,
      sequenciaDias: sequenciaTentativas,
      porMateria,
      materiasFracas,
    };
  }, [activeTentativas, questoes, questoesResolvidas, sequenciaTentativas, taxaAcertos]);
  const subjectsLiberados = materiasDoPerfil.length ? materiasDoPerfil : objectiveContent.subjects;

  const handleRelatorio = async () => {
    setGerandoRelatorio(true);
    try {
      const texto = await aiService.gerarRelatorio(user, desempenhoIA, "geral");
      setRelatorio(texto);
    } finally {
      setGerandoRelatorio(false);
    }
  };

  const kpis = [
    ["Horas estudadas", stats.horas_estudadas ?? stats.horasEstudadas ?? 0, Clock],
    ["Questões resolvidas", questoesResolvidas, ClipboardList],
    ["Taxa de acertos", `${taxaAcertos}%`, Target],
    ["Sequência", sequenciaTentativas, Zap],
    ["TAF", `${stats.taf_nota ?? stats.tafNota ?? 0}/10`, Dumbbell],
  ];

  return (
    <>
      <MobileDashboard kpis={kpis} navigate={navigate} performance={performance} ranking={ranking} revisoes={revisoes} user={user} />

      <div className="hidden xl:block">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between" data-tour="tour-dashboard-overview">
        <div>
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Panorama operacional do seu ciclo de estudos.</p>
        </div>
        <div className="flex flex-wrap gap-2" data-tour="tour-dashboard-actions">
          <Button icon={FileText} loading={gerandoRelatorio} onClick={handleRelatorio}>
            Gerar relatorio IA
          </Button>
          <Button icon={MessageCircleQuestion} onClick={() => navigate("ia")}>
            Abrir assistente
          </Button>
        </div>
      </div>

      {relatorio ? (
        <Card className="mb-4" hover={false}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-white">Relatorio de desempenho IA</h2>
              <p className="text-sm text-gray-400">Gerado pelo tutor com base nas suas tentativas e estatísticas atuais.</p>
            </div>
            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-900 hover:text-white" onClick={() => setRelatorio(null)} type="button" aria-label="Fechar relatorio">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg border border-gray-800 bg-gray-950 p-4 text-sm leading-relaxed text-gray-200">
            {relatorio}
          </div>
        </Card>
      ) : null}

      {diagnosticPlan ? (
        <Card className="mb-4" hover={false}>
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-blue-300">Diagnostico inicial</p>
              <h2 className="mt-1 text-xl font-black text-white">Plano personalizado para {diagnosticPlan.objectiveLabel}</h2>
              <p className="mt-1 text-sm text-gray-400">{diagnosticPlan.evolutionForecast}</p>
            </div>
            <Button size="sm" icon={CalendarCheck} onClick={() => navigate("plano")}>
              Ver cronograma
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
              <span className="text-xs text-gray-500">Meta semanal</span>
              <strong className="mt-1 block text-2xl text-white">{diagnosticPlan.weeklyHours}h</strong>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
              <span className="text-xs text-gray-500">Dias disponíveis</span>
              <strong className="mt-1 block text-2xl text-white">{diagnosticPlan.availableDays?.length || 0}</strong>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
              <span className="text-xs text-gray-500">Prioridades</span>
              <strong className="mt-1 block text-2xl text-white">{diagnosticPlan.prioritySubjects?.length || 0}</strong>
            </div>
            <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
              <span className="text-xs text-gray-500">Simulado sugerido</span>
              <strong className="mt-1 block truncate text-sm text-white">{diagnosticPlan.simulations?.[0]}</strong>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-bold text-white">Matérias prioritárias</h3>
              <div className="flex flex-wrap gap-2">
                {diagnosticPlan.prioritySubjects?.slice(0, 10).map((subject) => (
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-100" key={subject}>{subject}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-white">Metas da semana</h3>
              <div className="grid gap-2 text-sm text-gray-300">
                {diagnosticPlan.weeklyGoals?.slice(0, 4).map((goal) => <span key={goal}>{goal}</span>)}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="mb-4" hover={false}>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-300">Dashboard personalizado</p>
            <h2 className="mt-1 text-xl font-black text-white">{objectiveContent.title}</h2>
            <p className="mt-1 text-sm text-gray-400">Mostrando trilhas, matérias e simulados alinhados a {objectiveContent.label}.</p>
          </div>
          <Badge variant="success">{objectiveContent.label}</Badge>
        </div>

        <div className={cx("grid gap-4", subjectsLiberados.length ? "lg:grid-cols-2" : "lg:grid-cols-1")}>
          {subjectsLiberados.length ? (
            <div>
              <h3 className="mb-2 text-sm font-bold text-white">Matérias liberadas para este perfil</h3>
              <div className="flex flex-wrap gap-2">
                {subjectsLiberados.slice(0, 14).map((subject) => (
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-100" key={subject}>{subject}</span>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <h3 className="mb-2 text-sm font-bold text-white">Ações recomendadas</h3>
            <div className="grid gap-2 text-sm text-gray-300">
              {objectiveContent.actions.map((action) => <span key={action}>{action}</span>)}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" data-tour="tour-dashboard-kpis">
        {kpis.map(([label, value, icon]) => (
          <KpiCard key={label} label={label} value={value} icon={icon} />
        ))}
      </div>

      {!questoesResolvidas ? (
        <Card className="mt-4" hover={false}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-slate-950">Seu progresso começa nas questões</h2>
              <p className="mt-1 text-sm text-slate-500">Resolva uma questão para preencher acertos, erros, sequência e desempenho por matéria.</p>
              <Button className="mt-3" size="sm" onClick={() => navigate("questoes")}>Abrir questões</Button>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card data-tour="tour-desempenho">
          <h2 className="mb-3 font-bold text-white">Evolução semanal</h2>
          {chartsReady ? (
            <Suspense fallback={<ChartFallback />}>
              <PerformanceChart data={performance} />
            </Suspense>
          ) : (
            <ChartFallback />
          )}
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Tempo por disciplina</h2>
          {chartsReady && tempo.length ? (
            <Suspense fallback={<ChartFallback />}>
              <StudyTimeChart data={tempo} />
            </Suspense>
          ) : tempo.length ? (
            <ChartFallback />
          ) : (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-gray-800 text-center text-sm text-gray-400">
              Estude e resolva questões para ver a distribuição por disciplina.
            </div>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_0.8fr]">
        <Card>
          <h2 className="mb-3 font-bold text-white">Sequência</h2>
          {chartsReady ? (
            <Suspense fallback={<ChartFallback />}>
              <HeatmapCalendar entries={activeTentativas} />
            </Suspense>
          ) : (
            <ChartFallback />
          )}
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Próximas revisões</h2>
          {revisoes.length ? (
            revisoes.slice(0, 4).map((item) => (
              <div key={item.id || item.assuntoId} className="mb-2 flex justify-between rounded-lg bg-gray-900 p-3 text-sm text-gray-300">
                <span>{item.frente || item.assunto}</span>
                <Badge variant="warning">{item.urgencia || item.proxima || "hoje"}</Badge>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-gray-800 p-4 text-sm text-gray-400">Nenhuma revisão ainda. Elas aparecem depois que você resolve questões ou cria flashcards.</p>
          )}
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Ranking</h2>
          {ranking.length ? (
            ranking.slice(0, 5).map((item) => (
              <div key={`${item.posicao}-${item.nome}-${item.pontos}`} className="flex justify-between border-b border-gray-800 py-2 text-sm">
                <span>
                  {item.posicao}. {item.nome}
                </span>
                <strong className="text-blue-700">{item.pontos}</strong>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-gray-800 p-4 text-sm text-gray-400">Seu ranking aparece depois das primeiras questões.</p>
          )}
          <AIPanel
            text={questoesResolvidas ? "Sua prioridade hoje será calculada pelos seus erros, acertos e revisões pendentes." : "Resolva algumas questões para o assistente identificar suas prioridades reais."}
            action={
              <Button size="sm" onClick={() => navigate("taf")}>
                Abrir TAF
              </Button>
            }
          />
        </Card>
      </div>
      </div>
    </>
  );
}
