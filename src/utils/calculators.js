export const calculateAccuracy = (questions) => {
  if (!questions.length) return 0;
  const total = questions.reduce((sum, q) => sum + q.estatisticas.acertos, 0);
  return Math.round(total / questions.length);
};

export const applySm2 = (card, quality) => {
  const repetitions = quality < 3 ? 0 : card.repetitions + 1;
  const easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const interval = repetitions <= 1 ? 1 : repetitions === 2 ? 6 : Math.round(card.interval * easeFactor);
  return { ...card, repetitions, easeFactor, interval, dueAt: new Date(Date.now() + interval * 86400000).toISOString().slice(0, 10) };
};
