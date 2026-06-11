import { step } from "./tourUtils";

export const questoesTour = [
  step(null, "Como usar o Banco de questões", "Esta é a tela de treino principal. Filtre com cuidado, responda, salve questões importantes e acompanhe sua taxa de acerto.", {
  }),
  step("tour-questoes-header", "Busca e limpeza", "Use a busca para encontrar termos no enunciado. Se o resultado ficar estreito demais, use Limpar para voltar ao acervo do seu objetivo."),
  step("tour-questoes-stats", "Resumo do treino", "Antes de responder, confira quantas questões foram filtradas, quantas existem no acervo e como está sua taxa de acerto."),
  step("tour-questoes-filters", "Filtros inteligentes", "Os filtros mostram apenas opções que existem nas questões carregadas. Isso evita escolher matéria, banca ou ano sem questões disponíveis."),
  step("tour-questoes-list", "Cartão da questão", "Em cada questão você marca uma alternativa, confere o gabarito, salva como favorita ou envia para o caderno de erros para revisar depois."),
];
