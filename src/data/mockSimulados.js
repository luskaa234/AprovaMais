export const mockSimulados = ["edital", "banca", "personalizado"].map((modo, index) => ({
  id: `s${index + 1}`,
  modo,
  nome: `Simulado por ${modo}`,
  tempoMinutos: 180 - index * 20,
  mediaTurma: 72 + index * 3,
  questoes: Array.from({ length: 12 }, (_, q) => ({ id: `q${String(q + 1).padStart(3, "0")}`, materia: ["Direito Constitucional", "Portugues", "Informatica", "Raciocinio Logico"][q % 4] })),
}));
