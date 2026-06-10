import { step } from "./tourUtils";

export const aprovinhoTour = [
  step(null, "Como usar o Assistente IA", "A IA funciona melhor quando você pede algo objetivo: explicar um assunto, montar revisão, criar resumo ou organizar um bloco de estudo.", {
    mascot: "welcome",
  }),
  step("tour-aprovinho-header", "Contexto do aluno", "O assistente considera seu objetivo, questões resolvidas, taxa de acerto e matérias fracas para dar respostas mais direcionadas."),
  step("tour-aprovinho-chat", "Conversa guiada", "Pergunte de forma direta. Exemplo: 'monte uma revisão de Direito Constitucional em 30 minutos' ou 'explique esse assunto com exemplo'."),
];
