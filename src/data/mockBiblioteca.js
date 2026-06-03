export const mockBiblioteca = Array.from({ length: 15 }, (_, index) => ({
  id: `m${index + 1}`,
  tipo: ["PDF", "Apostila", "Resumo", "Lei seca"][index % 4],
  titulo: ["CF88 comentada", "Portugues essencial", "Informatica aplicada", "Lei seca marcada", "Mapas de revisao"][index % 5] + ` ${index + 1}`,
  materia: ["Constitucional", "Portugues", "Informatica", "Administrativo"][index % 4],
  descricao: "Material objetivo com foco em recorrencia de banca e revisao rapida.",
}));
