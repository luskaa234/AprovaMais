export const mockRedacoes = Array.from({ length: 6 }, (_, index) => ({
  id: `r${index + 1}`,
  titulo: ["Educacao digital", "Seguranca publica", "Etica estatal", "Cidadania", "Saneamento", "Tecnologia"][index],
  tipo: ["ENEM", "Concurso", "OAB"][index % 3],
  dificuldade: ["facil", "media", "dificil"][index % 3],
  data: `2026-0${index + 1}-12`,
  nota: 720 + index * 38,
  competencias: [140 + index * 4, 150 + index * 5, 132 + index * 6, 148 + index * 4, 144 + index * 5],
}));
