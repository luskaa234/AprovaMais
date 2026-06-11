import { step } from "./tourUtils";

export const appTour = [
  step(null, "Ola! Sou o Aprovinho", "Vou te mostrar a plataforma rapidinho."),
  step("tour-dashboard", "Dashboard", "Aqui voce acompanha seu progresso real.", {
    route: "dashboard",
  }),
  step("tour-questoes", "Banco de Questoes", "Resolva questoes oficiais filtradas por materia e banca.", {
    route: "questoes",
  }),
  step("tour-simulados", "Simulados", "Treine com provas cronometradas.", {
    route: "simulados",
    mobileMenu: true,
  }),
  step("tour-estudos", "Plano de Estudos", "Seu cronograma se adapta ao seu tempo.", {
    route: "plano",
  }),
  step("tour-leis", "Leis Secas", "Leia a lei e pratique questoes do artigo.", {
    route: "leis",
    mobileMenu: true,
  }),
  step("tour-flashcards", "Flashcards", "Use memorizacao ativa para revisar melhor.", {
    route: "flashcards",
    mobileMenu: true,
  }),
  step("tour-aprovinho", "Assistente IA", "Tire duvidas e peca explicacoes.", {
    route: "ia",
    mobileMenu: true,
  }),
  step("tour-perfil", "Perfil", "Aqui ficam seus dados e sua assinatura.", {
    route: "perfil",
  }),
  step(null, "Pronto!", "Bom estudo. Voce pode rever este tour na Central de Ajuda."),
];
