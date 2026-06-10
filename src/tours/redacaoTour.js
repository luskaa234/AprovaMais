import { step } from "./tourUtils";

export const redacaoTour = [
  step(null, "Como usar Redacao", "A ideia aqui e treinar com regularidade: escrever, receber correcao, ajustar pontos fracos e comparar sua evolucao.", {
    mascot: "welcome",
  }),
  step("tour-redacao-header", "Tipo de redacao", "Confira o objetivo do treino antes de escrever. Isso ajuda a adaptar estrutura, linguagem e criterio de avaliacao."),
  step("tour-redacao-editor", "Editor e envio", "Escreva seu texto aqui. Quando terminar, envie para correcao e veja nota, competencias e comentarios."),
  step("tour-redacao-history", "Historico de notas", "Use o historico para comparar notas antigas, identificar padroes e decidir qual competencia precisa de mais treino."),
];
