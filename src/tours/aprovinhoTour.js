import { step } from "./tourUtils";

export const aprovinhoTour = [
  step(null, "Como usar o Assistente IA", "A IA funciona melhor quando voce pede algo objetivo: explicar um assunto, montar revisao, criar resumo ou organizar um bloco de estudo.", {
    mascot: "welcome",
  }),
  step("tour-aprovinho-header", "Contexto do aluno", "O assistente considera seu objetivo, questoes resolvidas, taxa de acerto e materias fracas para dar respostas mais direcionadas."),
  step("tour-aprovinho-chat", "Conversa guiada", "Pergunte de forma direta. Exemplo: 'monte uma revisao de Direito Constitucional em 30 minutos' ou 'explique esse assunto com exemplo'."),
];
