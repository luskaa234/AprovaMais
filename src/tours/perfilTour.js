import { step } from "./tourUtils";

export const perfilTour = [
  step(null, "Como usar o Perfil", "O Perfil concentra dados pessoais, objetivo, localizacao, preferencias de estudo, tema e dados da conta.", {
    mascot: "welcome",
  }),
  step("tour-profile-summary", "Resumo do perfil", "Veja rapidamente seu objetivo, nivel, carga semanal, localizacao e percentual de preenchimento do perfil."),
  step("tour-profile-tabs", "Abas principais", "Use as abas para separar tarefas: editar dados, ajustar configuracoes ou gerenciar informacoes da conta."),
  step("tour-profile-form", "Editar perfil", "Complete nome, username, telefone, nascimento, genero, cidade, estado, pais, concurso, nivel, horas e data da prova."),
  step("tour-profile-settings-tab", "Configuracoes", "Clique nesta aba para ajustar modo escuro discreto, lembretes, meta diaria, modo de estudo, dias de estudo e primeiro dia da semana."),
];
