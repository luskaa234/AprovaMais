import { useCallback, useMemo } from "react";
import { Clock, ClipboardList, Dumbbell, MessageCircleQuestion, Target, Zap } from "lucide-react";
import { AIPanel } from "../../ai";
import { Badge, Button, Card } from "../../components";
import { HeatmapCalendar, PerformanceChart, StudyTimeChart } from "../../charts";
import { useAsyncData } from "../../hooks";
import { questoesService, rankingService, revisaoService } from "../../services";
import { useInternalRouter, useUser } from "../../contexts";

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
  const loadQuestoes = useCallback(() => questoesService.getAll(), []);
  const loadRanking = useCallback(() => rankingService.getRanking(), []);
  const loadRevisoes = useCallback(() => revisaoService.getPendentes(), []);
  const { data: questoes } = useAsyncData(loadQuestoes, [loadQuestoes]);
  const { data: ranking } = useAsyncData(loadRanking, [loadRanking]);
  const { data: revisoes } = useAsyncData(loadRevisoes, [loadRevisoes]);
  const performance = useMemo(
    () => ["Seg", "Ter", "Qua", "Qui", "Sex"].map((label, index) => ({ label, acertos: 62 + index * 6 })),
    []
  );
  const tempo = useMemo(
    () => questoes.slice(0, 5).map((q, index) => ({ label: q.materia.split(" ")[0], valor: 5 + index * 2 })),
    [questoes]
  );
  const kpis = [
    ["Horas estudadas", user.stats.hours, Clock],
    ["Questoes resolvidas", user.stats.questions, ClipboardList],
    ["Taxa de acertos", `${user.stats.accuracy}%`, Target],
    ["Sequência", user.stats.streak, Zap],
    ["TAF", "9.0 aprovado", Dumbbell],
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
          <h2 className="mb-3 font-bold text-white">Evolução semanal</h2>
          <PerformanceChart data={performance} />
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Tempo por disciplina</h2>
          <StudyTimeChart data={tempo} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_0.8fr]">
        <Card>
          <h2 className="mb-3 font-bold text-white">Sequência</h2>
          <HeatmapCalendar />
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Próximas revisões</h2>
          {revisoes.slice(0, 4).map((item) => (
            <div key={item.id} className="mb-2 flex justify-between rounded-lg bg-gray-900 p-3 text-sm text-gray-300">
              <span>{item.frente}</span>
              <Badge variant="warning">{item.urgencia}</Badge>
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
