import { step } from "./tourUtils";

export const studiesTour = [
  step(null, "Como usar o Planejamento", "O plano transforma sua meta em tarefas concretas. Use esta tela para saber quando estudar, o que fazer e quanto falta concluir.", {
    mascot: "welcome",
  }),
  step("tour-studies-header", "Comandos do plano", "Aqui voce volta para Hoje, cria uma nova atividade e abre filtros no mobile. Use quando precisar reorganizar sua semana."),
  step("tour-studies-filters", "Filtros do cronograma", "Filtre por materia, tipo, status, concurso ou periodo. Bom para ver apenas pendencias ou apenas simulados da semana."),
  step("tour-studies-calendar", "Calendario", "Clique em um dia para abrir a lista de atividades daquela data. A visualizacao mensal ajuda a enxergar carga e distribuicao."),
  step("tour-studies-activities", "Atividades do dia", "Cada atividade pode ser iniciada, pausada, concluida ou reaberta. O cronometro registra o tempo real de estudo."),
  step("tour-studies-progress", "Progresso semanal", "Acompanhe meta, horas estudadas, distribuicao por tipo de tarefa e proximas atividades para manter constancia."),
];
