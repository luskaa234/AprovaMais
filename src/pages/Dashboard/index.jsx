import { useEffect, useMemo, useState } from "react";
import { Clock, ClipboardList, Dumbbell, MessageCircleQuestion, Target, Zap } from "lucide-react";
import { AIPanel } from "../../ai";
import { Badge, Button, Card } from "../../components";
import { HeatmapCalendar, PerformanceChart, StudyTimeChart } from "../../charts";
import { useInternalRouter, useUser } from "../../contexts";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { usePlanoStore, useQuestoesStore, useRankingStore, useRevisaoStore } from "../../stores";

const KpiCard = ({ label, value, icon: Icon }) => (
  <Card>
    <Icon className="mb-4 text-blue-600" />
    <p className="text-sm text-gray-400">{label}</p>
    <strong className="mt-1 block text-3xl text-white">{value}</strong>
  </Card>
);

export default function DashboardPage() {
  const { user } = useUser();
  const { navigate } = useInternalRouter();
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const rankingLocal = useRankingStore((state) => state.ranking);
  const revisoesLocal = useRevisaoStore((state) => state.pendentesHoje);
  const progressoPorDisciplina = usePlanoStore((state) => state.progressoPorDisciplina);
  const [remote, setRemote] = useState({ profile: null, ranking: null, revisoes: null, performance: null });

  const localPerformance = useMemo(() => {
    const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    return Array.from({ length: 7 }, (_, offset) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - offset));
      const key = date.toISOString().slice(0, 10);
      return { label: labels[date.getDay()], acertos: tentativas.filter((item) => item.acertou && item.data.slice(0, 10) === key).length };
    });
  }, [tentativas]);

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
        supabase.from("ranking").select("pontos, profiles(name)").order("pontos", { ascending: false }).limit(5),
        supabase.from("tentativas").select("acertou, created_at").eq("user_id", user.id).gte("created_at", seteDias.toISOString()),
      ]);

      if (!alive) return;

      const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const grouped = (tentativasRes.data || []).reduce((acc, item) => {
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
      });
    }

    loadDashboard().catch(() => {});
    return () => {
      alive = false;
    };
  }, [user?.id]);

  const tempo = useMemo(() => Object.entries(progressoPorDisciplina).map(([label, valor]) => ({ label, valor })), [progressoPorDisciplina]);
  const stats = remote.profile || user.rawStats || {};
  const revisoes = remote.revisoes || revisoesLocal;
  const ranking = remote.ranking || rankingLocal;
  const performance = remote.performance?.length ? remote.performance : localPerformance;
  const kpis = [
    ["Horas estudadas", stats.horas_estudadas ?? user.stats.hours, Clock],
    ["Questoes resolvidas", stats.questoes_resolvidas ?? user.stats.questions, ClipboardList],
    ["Taxa de acertos", `${stats.taxa_acertos ?? user.stats.accuracy}%`, Target],
    ["Sequencia", stats.sequencia_dias ?? user.stats.streak, Zap],
    ["TAF", `${stats.taf_nota ?? user.stats.taf}/10`, Dumbbell],
  ];

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Panorama operacional do seu ciclo de estudos.</p>
        </div>
        <Button icon={MessageCircleQuestion} onClick={() => navigate("ia")}>
          Abrir assistente
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map(([label, value, icon]) => (
          <KpiCard key={label} label={label} value={value} icon={icon} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <h2 className="mb-3 font-bold text-white">Evolucao semanal</h2>
          <PerformanceChart data={performance} />
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Tempo por disciplina</h2>
          <StudyTimeChart data={tempo} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_0.8fr]">
        <Card>
          <h2 className="mb-3 font-bold text-white">Sequencia</h2>
          <HeatmapCalendar />
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Proximas revisoes</h2>
          {revisoes.slice(0, 4).map((item) => (
            <div key={item.id || item.assuntoId} className="mb-2 flex justify-between rounded-lg bg-gray-900 p-3 text-sm text-gray-300">
              <span>{item.frente || item.assunto}</span>
              <Badge variant="warning">{item.urgencia || item.proxima || "hoje"}</Badge>
            </div>
          ))}
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Ranking</h2>
          {ranking.slice(0, 5).map((item) => (
            <div key={item.nome} className="flex justify-between border-b border-gray-800 py-2 text-sm">
              <span>
                {item.posicao}. {item.nome}
              </span>
              <strong className="text-blue-700">{item.pontos}</strong>
            </div>
          ))}
          <AIPanel
            text="Sua prioridade hoje: Constitucional, revisao dos erros e treino TAF de corrida."
            action={
              <Button size="sm" onClick={() => navigate("taf")}>
                Abrir TAF
              </Button>
            }
          />
        </Card>
      </div>
    </div>
  );
}
