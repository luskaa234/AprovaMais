const materias = ["Direito Constitucional", "Portugues", "Informatica", "Raciocinio Logico", "Administrativo"];
const bancas = ["CESPE", "FCC", "FGV"];

export const mockQuestoes = Array.from({ length: 30 }, (_, index) => {
  const materia = materias[index % materias.length];
  const correta = ["a", "b", "c", "d"][index % 4];
  return {
    id: `q${String(index + 1).padStart(3, "0")}`,
    enunciado: `Em ${materia}, analise a situacao proposta pela banca e assinale a alternativa correta.`,
    tipo: index % 2 ? "certo_errado" : "multipla_escolha",
    alternativas: ["a", "b", "c", "d"].map((id) => ({ id, texto: `Alternativa ${id.toUpperCase()} com interpretacao tecnica do tema ${index + 1}.`, correta: id === correta })),
    gabarito: correta,
    comentario: `A resolucao exige separar regra geral e excecao em ${materia}, observando o comando do enunciado.`,
    banca: bancas[index % bancas.length],
    orgao: ["STJ", "TRT", "INSS", "TJ-SP"][index % 4],
    cargo: ["Analista", "Tecnico", "Auditor", "Escrevente"][index % 4],
    materia,
    assunto: ["Direitos Fundamentais", "Sintaxe", "Seguranca", "Porcentagem"][index % 4],
    ano: 2021 + (index % 5),
    dificuldade: ["facil", "media", "dificil"][index % 3],
    tags: ["lei seca", "jurisprudencia", "pegadinha"].slice(0, 1 + (index % 3)),
    estatisticas: { tentativas: 900 + index * 37, acertos: 54 + (index % 35) },
  };
});
