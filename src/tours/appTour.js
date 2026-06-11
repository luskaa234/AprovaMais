import { step } from "./tourUtils";

export const appTour = [
  step(null, "Olá! Sou o Aprovinho", "Vou te mostrar a plataforma rapidinho."),
  step("tour-dashboard", "Dashboard", "Aqui você acompanha seu progresso real.", {
    route: "dashboard",
  }),
  step("tour-questoes", "Banco de Questões", "Resolva questões oficiais filtradas por matéria e banca.", {
    route: "questoes",
  }),
  step("tour-simulados", "Simulados", "Treine com provas cronometradas.", {
    route: "simulados",
    mobileMenu: true,
  }),
  step("tour-estudos", "Plano de Estudos", "Seu cronograma se adapta ao seu tempo.", {
    route: "plano",
  }),
  step("tour-leis", "Leis Secas", "Leia a lei e pratique questões do artigo.", {
    route: "leis",
    mobileMenu: true,
  }),
  step("tour-flashcards", "Flashcards", "Use memorização ativa para revisar melhor.", {
    route: "flashcards",
    mobileMenu: true,
  }),
  step("tour-aprovinho", "Assistente IA", "Tire dúvidas e peça explicações.", {
    route: "ia",
    mobileMenu: true,
  }),
  step("tour-perfil", "Perfil", "Aqui ficam seus dados e sua assinatura.", {
    route: "perfil",
  }),
  step(null, "Pronto!", "Bom estudo. Você pode rever este tour na Central de Ajuda."),
];
