import { step } from "./tourUtils";

export const ajudaTour = [
  step(null, "Como usar a Central de Ajuda", "Esta central guarda os tutoriais da plataforma. Use quando esquecer onde fica alguma função ou quiser rever um fluxo.", {
    mascot: "welcome",
  }),
  step("tour-ajuda-page", "Tutoriais por módulo", "Escolha o módulo que quer aprender. Cada tutorial destaca os botões e explica o que fazer naquela tela."),
  step("tour-page-help", "Ajuda contextual", "Este botão aparece nas telas internas. Ele abre o tutorial específico da página atual sem reiniciar todo o guia."),
];
