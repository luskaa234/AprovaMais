const materias = ["Direito Constitucional", "Portugues", "Informatica", "Raciocinio Logico"];
const assuntos = ["Direitos e garantias", "Interpretacao de texto", "Seguranca da informacao", "Proposicoes logicas"];
const bancas = ["CEBRASPE", "IBFC", "FGV"];
const alternativaIds = ["a", "b", "c", "d"];

const textosPorMateria = [
  [
    "A regra apresentada esta correta e se aplica ao caso descrito.",
    "A afirmacao confunde competencia com atribuicao administrativa.",
    "O item esta incorreto porque ignora excecao prevista em lei.",
    "A alternativa limita indevidamente o alcance da norma.",
  ],
  [
    "O texto indica conclusao contraria ao comando do enunciado.",
    "A alternativa respeita a ideia central e a inferencia exigida.",
    "A resposta amplia o sentido original sem base no texto.",
    "O item troca causa por consequencia.",
  ],
  [
    "A conduta descrita reduz risco de exposicao indevida de dados.",
    "O procedimento elimina todos os riscos de seguranca.",
    "A ferramenta citada substitui politicas de acesso.",
    "A pratica recomendada dispensa autenticacao.",
  ],
  [
    "A proposicao composta e sempre verdadeira.",
    "A conclusao decorre da negacao simples das premissas.",
    "A equivalencia logica preserva o valor de verdade.",
    "A tabela-verdade torna o argumento invalido em todos os casos.",
  ],
];

export const mockSimulados = ["edital", "banca", "personalizado"].map((modo, index) => ({
  id: `s${index + 1}`,
  modo,
  nome: `Simulado por ${modo}`,
  tempoMinutos: 180 - index * 20,
  questoes: Array.from({ length: 12 }, (_, q) => {
    const materiaIndex = q % materias.length;
    const gabarito = alternativaIds[q % alternativaIds.length];
    return {
      id: `q${String(q + 1).padStart(3, "0")}`,
      enunciado: `Questao ${q + 1}. Em ${materias[materiaIndex]}, analise a situacao apresentada e escolha a alternativa correta conforme a banca.`,
      alternativas: textosPorMateria[materiaIndex].map((texto, altIndex) => ({
        id: alternativaIds[altIndex],
        letra: alternativaIds[altIndex].toUpperCase(),
        texto,
        correta: alternativaIds[altIndex] === gabarito,
      })),
      gabarito,
      comentario: `A resposta correta e a alternativa ${gabarito.toUpperCase()}, pois aplica o ponto central de ${assuntos[materiaIndex]} ao contexto do concurso.`,
      materia: materias[materiaIndex],
      assunto: assuntos[materiaIndex],
      banca: bancas[index % bancas.length],
      dificuldade: ["facil", "medio", "dificil"][q % 3],
      concurso: modo === "edital" ? "PM" : modo === "banca" ? "PRF" : "TJ",
    };
  }),
}));
