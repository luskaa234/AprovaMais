import { step } from "./tourUtils";

export const simuladosTour = [
  step(null, "Como usar Simulados", "Simulados servem para medir desempenho sob tempo. Use depois de alguns blocos de estudo ou como diagnostico semanal.", {
    mascot: "welcome",
  }),
  step("tour-simulados-header", "Escolha o treino", "Veja quais modelos estao disponiveis para seu objetivo. Comece por um simulado curto se quiser diagnosticar rapido."),
  step("tour-simulados-config", "Configuracao antes de iniciar", "Escolha materia, tipo de questao e tempo. Questoes erradas ou nao respondidas sao boas para treinos direcionados."),
  step("tour-simulados-history", "Historico e evolucao", "Depois de finalizar, revise acertos por materia e acompanhe se sua porcentagem esta subindo ao longo do tempo."),
];
