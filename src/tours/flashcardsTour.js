import { step } from "./tourUtils";

export const flashcardsTour = [
  step("tour-flashcards-header", "Flashcards", "Esta tela serve para revisao ativa. Use a busca para encontrar um tema e o botao Aleatorio para embaralhar a sessao."),
  step("tour-flashcards-study", "Sessao de estudo", "O card central mostra uma pergunta por vez. A barra indica sua posicao na sessao para voce saber quanto falta."),
  step("tour-flashcards-card", "Card principal", "Leia a pergunta e tente responder antes de virar. No celular, tambem da para deslizar o card depois de ver a resposta."),
  step("tour-flashcards-answer", "Resposta do aluno", "Digite sua resposta com suas palavras. Isso ajuda a evitar a falsa sensacao de que voce sabia o conteudo."),
  step("tour-flashcards-actions", "Avaliar revisao", "Depois de conferir o verso, marque Errei, Fazer depois ou Acertei. Essa avaliacao atualiza a proxima revisao."),
];
