import { step } from "./tourUtils";

export const questoesTour = [
  step(null, "Como usar o Banco de questoes", "Esta e a tela de treino principal. Filtre com cuidado, responda, salve questoes importantes e acompanhe sua taxa de acerto.", {
    mascot: "welcome",
  }),
  step("tour-questoes-header", "Busca e limpeza", "Use a busca para encontrar termos no enunciado. Se o resultado ficar estreito demais, use Limpar para voltar ao acervo do seu objetivo."),
  step("tour-questoes-stats", "Resumo do treino", "Antes de responder, confira quantas questoes foram filtradas, quantas existem no acervo e como esta sua taxa de acerto."),
  step("tour-questoes-filters", "Filtros inteligentes", "Os filtros mostram apenas opcoes que existem nas questoes carregadas. Isso evita escolher materia, banca ou ano sem questoes disponiveis."),
  step("tour-questoes-list", "Cartao da questao", "Em cada questao voce marca uma alternativa, confere o gabarito, salva como favorita ou envia para o caderno de erros para revisar depois."),
];
