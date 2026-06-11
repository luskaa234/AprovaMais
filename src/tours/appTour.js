import { step } from "./tourUtils";

export const appTour = [
  step(
    null,
    "Bem-vindo ao Aprova Mais",
    "Este guia mostra o caminho principal: acompanhar desempenho, estudar pelo plano, resolver questoes, fazer simulados e ajustar seu perfil. Use Proximo para avancar ou Pular quando quiser."
  ),
  step("tour-dashboard", "Dashboard", "A primeira tela resume seu dia. Volte aqui para ver sua meta, sequencia, taxa de acerto, revisoes pendentes e atalhos para continuar estudando.", {
    route: "dashboard",
    mobileMenu: false,
  }),
  step("tour-estudos", "Planejamento", "No plano voce organiza a semana: cria atividades, acompanha o calendario, inicia cronometro e marca o que ja foi concluido.", {
    route: "plano",
    mobileMenu: false,
  }),
  step("tour-simulados", "Simulados", "Use esta area para montar treinos cronometrados com questoes oficiais. Escolha materia, tempo e tipo de questao antes de iniciar.", {
    route: "simulados",
    mobileMenu: false,
  }),
  step("tour-questoes", "Banco de questoes", "Aqui voce treina por filtros reais: concurso, materia, banca, dificuldade, ano e situacao. O app mostra apenas filtros que existem no banco.", {
    route: "questoes",
    mobileMenu: false,
  }),
  step("tour-flashcards-page", "Flashcards", "Revise por repeticao ativa: responda antes de virar o card e marque se errou, acertou ou quer fazer depois.", {
    route: "flashcards",
    mobileMenu: false,
  }),
  step("tour-mapas-page", "Mapas mentais", "Use mapas para revisar assuntos de forma visual, expandir ramos importantes e transformar conteudo em resumo ou flashcards.", {
    route: "mapas",
    mobileMenu: false,
  }),
  step("tour-leis-page", "Leis Secas", "Leia artigos oficiais, use grifos e notas, e conecte cada trecho a flashcards ou questoes para fixar a literalidade.", {
    route: "leis",
    mobileMenu: false,
  }),
  step("tour-redacao", "Redacao", "Escreva textos, envie para correcao e acompanhe seu historico. Use esta tela para treinar constancia e evolucao de nota.", {
    route: "redacao",
    mobileMenu: false,
  }),
  step("tour-aprovinho", "Assistente IA", "Use a IA para tirar duvidas, pedir resumos, organizar uma revisao ou gerar um bloco de estudo baseado no seu desempenho.", {
    route: "ia",
    mobileMenu: false,
  }),
  step("tour-desempenho", "Desempenho", "Os graficos mostram evolucao semanal, tempo por disciplina e padroes de estudo. Eles ajudam a decidir onde focar primeiro.", {
    route: "dashboard",
    mobileMenu: false,
  }),
  step("tour-perfil", "Perfil e configuracoes", "No topo fica seu perfil. Ali voce completa dados pessoais, cidade, estado, pais, preferencias de estudo e modo escuro discreto.", {
    mobileMenu: false,
  }),
  step(null, "Pronto para estudar", "Agora voce ja sabe onde fica cada recurso. Comece pelo Dashboard, siga o Plano e use Questoes e Simulados para medir sua evolucao."),
];
