import { step } from "./tourUtils";

export const dashboardTour = [
  step(null, "Como usar o Dashboard", "Esta tela é seu painel de comando. Ela responde três perguntas: o que fiz, como estou indo e qual é o próximo passo.", {
  }),
  step("tour-dashboard-overview", "Resumo do dia", "Comece olhando esta área. Ela mostra o status do estudo de hoje e ajuda a decidir se você deve revisar, resolver questões ou seguir o plano."),
  step("tour-dashboard-kpis", "Indicadores principais", "Aqui ficam os números que importam: horas estudadas, questões resolvidas, taxa de acerto, sequência e TAF. Use para acompanhar progresso real."),
  step("tour-desempenho", "Gráficos de desempenho", "Veja sua evolução por semana e por disciplina. Se uma matéria estiver baixa, priorize questões e revisões dela no plano."),
  step("tour-dashboard-actions", "Ações rápidas", "Use estes botões para gerar um relatório com IA ou abrir o assistente quando quiser uma recomendação do que estudar agora."),
];
