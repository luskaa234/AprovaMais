import { step } from "./tourUtils";

export const appTour = [
  step(null, "Bem-vindo ao Aprova Mais", "Este guia mostra o caminho principal: acompanhar desempenho, estudar pelo plano, resolver questões, fazer simulados e ajustar seu perfil. Use Próximo para avançar ou Pular quando quiser.", {
    mascot: "welcome",
  }),
  step("tour-dashboard", "Dashboard", "A primeira tela resume seu dia. Volte aqui para ver sua meta, sequência, taxa de acerto, revisões pendentes e os atalhos para continuar estudando.", {
    route: "dashboard",
    mobileMenu: false,
  }),
  step("tour-estudos", "Planejamento", "No plano você organiza a semana: cria atividades, acompanha o calendário, inicia cronômetro e marca o que já foi concluído.", {
    route: "plano",
    mobileMenu: false,
  }),
  step("tour-simulados", "Simulados", "Use esta área para montar treinos cronometrados com questões oficiais. Escolha matéria, tempo e tipo de questão antes de iniciar.", {
    route: "simulados",
    mobileMenu: false,
  }),
  step("tour-questoes", "Banco de questões", "Aqui você treina por filtros reais: concurso, matéria, banca, dificuldade, ano e situação. O app mostra apenas filtros que existem no banco.", {
    route: "questoes",
    mobileMenu: false,
  }),
  step("tour-flashcards-page", "Flashcards", "Revise por repetição ativa: responda antes de virar o card e marque se errou, acertou ou quer fazer depois.", {
    route: "flashcards",
    mobileMenu: false,
  }),
  step("tour-mapas-page", "Mapas mentais", "Use mapas para revisar assuntos de forma visual, expandir ramos importantes e transformar conteúdo em resumo ou flashcards.", {
    route: "mapas",
    mobileMenu: false,
  }),
  step("tour-leis-page", "Leis Secas", "Leia artigos oficiais, use grifos e notas, e conecte cada trecho a flashcards ou questões para fixar a literalidade.", {
    route: "leis",
    mobileMenu: false,
  }),
  step("tour-redacao", "Redação", "Escreva textos, envie para correção e acompanhe seu histórico. Use esta tela para treinar constância e evolução de nota.", {
    route: "redacao",
    mobileMenu: false,
  }),
  step("tour-aprovinho", "Assistente IA", "Use a IA para tirar dúvidas, pedir resumos, organizar uma revisão ou gerar um bloco de estudo baseado no seu desempenho.", {
    route: "ia",
    mobileMenu: false,
  }),
  step("tour-desempenho", "Desempenho", "Os gráficos mostram evolução semanal, tempo por disciplina e padrões de estudo. Eles ajudam a decidir onde focar primeiro.", {
    route: "dashboard",
    mobileMenu: false,
  }),
  step("tour-perfil", "Perfil e configurações", "No topo fica seu perfil. Ali você completa dados pessoais, cidade, estado, país, preferências de estudo e modo escuro discreto.", {
    mobileMenu: false,
  }),
  step("tour-ajuda", "Central de Ajuda", "Abra a Ajuda para rever o tutorial geral ou iniciar um guia específico da tela em que estiver.", {
    route: "ajuda",
    mobileMenu: false,
  }),
  step(null, "Pronto para estudar", "Agora você já sabe onde fica cada recurso. Comece pelo Dashboard, siga o Plano e use Questões e Simulados para medir sua evolução.", {
    mascot: "done",
  }),
];
