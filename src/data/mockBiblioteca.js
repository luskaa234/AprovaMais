export const mockBiblioteca = Array.from({ length: 15 }, (_, index) => ({
  id: `m${index + 1}`,
  tipo: ["PDF", "Apostila", "Resumo", "Lei seca"][index % 4],
  titulo: ["CF88 comentada", "Português essencial", "Informática aplicada", "Lei seca marcada", "Mapas de revisão"][index % 5] + ` ${index + 1}`,
  materia: ["Constitucional", "Português", "Informática", "Administrativo"][index % 4],
  descricao: "Material objetivo com foco em recorrência de banca e revisão rápida.",
}));
