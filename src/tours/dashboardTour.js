import { step } from "./tourUtils";

export const dashboardTour = [
  step(null, "Como usar o Dashboard", "Esta tela e seu painel de comando. Ela responde tres perguntas: o que fiz, como estou indo e qual e o proximo passo.", {
    mascot: "welcome",
  }),
  step("tour-dashboard-overview", "Resumo do dia", "Comece olhando esta area. Ela mostra o status do estudo de hoje e ajuda a decidir se voce deve revisar, resolver questoes ou seguir o plano."),
  step("tour-dashboard-kpis", "Indicadores principais", "Aqui ficam os numeros que importam: horas estudadas, questoes resolvidas, taxa de acerto, sequencia e TAF. Use para acompanhar progresso real."),
  step("tour-desempenho", "Graficos de desempenho", "Veja sua evolucao por semana e por disciplina. Se uma materia estiver baixa, priorize questoes e revisoes dela no plano."),
  step("tour-dashboard-actions", "Acoes rapidas", "Use estes botoes para gerar um relatorio com IA ou abrir o assistente quando quiser uma recomendacao do que estudar agora."),
];
