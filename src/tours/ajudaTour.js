import { step } from "./tourUtils";

export const ajudaTour = [
  step(null, "Como usar a Central de Ajuda", "Esta central guarda os tutoriais da plataforma. Use quando esquecer onde fica alguma funcao ou quiser rever um fluxo.", {
    mascot: "welcome",
  }),
  step("tour-ajuda-page", "Tutoriais por modulo", "Escolha o modulo que quer aprender. Cada tutorial destaca os botoes e explica o que fazer naquela tela."),
  step("tour-page-help", "Ajuda contextual", "Este botao aparece nas telas internas. Ele abre o tutorial especifico da pagina atual sem reiniciar todo o guia."),
];
