import { step } from "./tourUtils";

export const flashcardsTour = [
  step("tour-flashcards-header", "Flashcards", "Esta tela serve para revisão ativa. Use a busca para encontrar um tema e o botão Aleatório para embaralhar a sessão."),
  step("tour-flashcards-study", "Sessão de estudo", "O card central mostra uma pergunta por vez. A barra indica sua posição na sessão para você saber quanto falta."),
  step("tour-flashcards-card", "Card principal", "Leia a pergunta e tente responder antes de virar. No celular, também dá para deslizar o card depois de ver a resposta."),
  step("tour-flashcards-answer", "Resposta do aluno", "Digite sua resposta com suas palavras. Isso ajuda a evitar a falsa sensação de que você sabia o conteúdo."),
  step("tour-flashcards-actions", "Avaliar revisão", "Depois de conferir o verso, marque Errei, Fazer depois ou Acertei. Essa avaliação atualiza a próxima revisão."),
];
