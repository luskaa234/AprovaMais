import { step } from "./tourUtils";

export const redacaoTour = [
  step(null, "Como usar Redação", "A ideia aqui é treinar com regularidade: escrever, receber correção, ajustar pontos fracos e comparar sua evolução.", {
    mascot: "welcome",
  }),
  step("tour-redacao-header", "Tipo de redação", "Confira o objetivo do treino antes de escrever. Isso ajuda a adaptar estrutura, linguagem e critério de avaliação."),
  step("tour-redacao-editor", "Editor e envio", "Escreva seu texto aqui. Quando terminar, envie para correção e veja nota, competências e comentários."),
  step("tour-redacao-history", "Histórico de notas", "Use o histórico para comparar notas antigas, identificar padrões e decidir qual competência precisa de mais treino."),
];
