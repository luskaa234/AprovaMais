export const mockMapas = ["Direito Constitucional", "Português", "Informática"].map((materia, index) => ({
  id: `map${index + 1}`,
  materia,
  root: {
    label: materia,
    children: ["Fundamentos", "Conceitos", "Exceções", "Jurisprudência"].map((label, child) => ({
      label,
      children: [`Ponto ${child + 1}.1`, `Ponto ${child + 1}.2`].map((sub) => ({ label: sub, children: [] })),
    })),
  },
}));
