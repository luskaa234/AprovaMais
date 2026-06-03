export const mockMapas = ["Direito Constitucional", "Portugues", "Informatica"].map((materia, index) => ({
  id: `map${index + 1}`,
  materia,
  root: {
    label: materia,
    children: ["Fundamentos", "Conceitos", "Excecoes", "Jurisprudencia"].map((label, child) => ({
      label,
      children: [`Ponto ${child + 1}.1`, `Ponto ${child + 1}.2`].map((sub) => ({ label: sub, children: [] })),
    })),
  },
}));
