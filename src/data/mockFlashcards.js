export const mockFlashcards = ["Direito Constitucional", "Português", "Informática", "Raciocínio Lógico"].map((materia, index) => ({
  id: `d${index + 1}`,
  materia,
  titulo: `Deck ${materia}`,
  retencao: 62 + index * 8,
  cards: Array.from({ length: 10 }, (_, card) => ({ id: `fc${index + 1}${card + 1}`, frente: `${materia}: conceito ${card + 1}`, verso: `Explicação objetiva, exemplo de prova e alerta de pegadinha ${card + 1}.`, easeFactor: 2.5, interval: 1, repetitions: 0 })),
}));
