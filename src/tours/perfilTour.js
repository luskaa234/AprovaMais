import { step } from "./tourUtils";

export const perfilTour = [
  step(null, "Como usar o Perfil", "O Perfil concentra dados pessoais, objetivo, localização, preferências de estudo, tema e dados da conta.", {
    mascot: "welcome",
  }),
  step("tour-profile-summary", "Resumo do perfil", "Veja rapidamente seu objetivo, nível, carga semanal, localização e percentual de preenchimento do perfil."),
  step("tour-profile-tabs", "Abas principais", "Use as abas para separar tarefas: editar dados, ajustar configurações ou gerenciar informações da conta."),
  step("tour-profile-form", "Editar perfil", "Complete nome, username, telefone, nascimento, gênero, cidade, estado, país, concurso, nível, horas e data da prova."),
  step("tour-profile-settings-tab", "Configurações", "Clique nesta aba para ajustar modo escuro discreto, lembretes, meta diária, modo de estudo, dias de estudo e primeiro dia da semana."),
];
