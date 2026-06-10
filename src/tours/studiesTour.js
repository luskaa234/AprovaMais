import { step } from "./tourUtils";

export const studiesTour = [
  step(null, "Como usar o Planejamento", "O plano transforma sua meta em tarefas concretas. Use esta tela para saber quando estudar, o que fazer e quanto falta concluir.", {
    mascot: "welcome",
  }),
  step("tour-studies-header", "Comandos do plano", "Aqui você volta para Hoje, cria uma nova atividade e abre filtros no mobile. Use quando precisar reorganizar sua semana."),
  step("tour-studies-filters", "Filtros do cronograma", "Filtre por matéria, tipo, status, concurso ou período. Bom para ver apenas pendências ou apenas simulados da semana."),
  step("tour-studies-calendar", "Calendário", "Clique em um dia para abrir a lista de atividades daquela data. A visualização mensal ajuda a enxergar carga e distribuição."),
  step("tour-studies-activities", "Atividades do dia", "Cada atividade pode ser iniciada, pausada, concluída ou reaberta. O cronômetro registra o tempo real de estudo."),
  step("tour-studies-progress", "Progresso semanal", "Acompanhe meta, horas estudadas, distribuição por tipo de tarefa e próximas atividades para manter constância."),
];
