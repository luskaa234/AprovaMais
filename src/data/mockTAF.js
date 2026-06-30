const scoreRows = [
  { min: 0, max: 1799, pontos: 0, eliminatorio: true },
  { min: 1800, max: 2199, pontos: 5 },
  { min: 2200, max: 2499, pontos: 7 },
  { min: 2500, max: 2799, pontos: 9 },
  { min: 2800, max: 9999, pontos: 10 },
];

export const mockEditaisTAF = [
  { id: "pmsp", nome: "PMSP Soldado PM", provas: [{ id: "corrida", nome: "Corrida 12min", tipo: "distancia", unidade: "m", minimo: 2200, tempo: 720, tabela: scoreRows }, { id: "flexao", nome: "Flexão", tipo: "repeticoes", unidade: "rep", minimo: 20, tempo: 60, tabela: [{ min: 0, max: 19, pontos: 0, eliminatorio: true }, { min: 20, max: 29, pontos: 7 }, { min: 30, max: 99, pontos: 10 }] }, { id: "abdominal", nome: "Abdominal", tipo: "repeticoes", unidade: "rep", minimo: 30, tempo: 60, tabela: [{ min: 0, max: 29, pontos: 0, eliminatorio: true }, { min: 30, max: 39, pontos: 7 }, { min: 40, max: 99, pontos: 10 }] }] },
  { id: "pcsp", nome: "PCSP Investigador", provas: [{ id: "corrida", nome: "Corrida 2400m", tipo: "tempo_minimo", unidade: "s", minimo: 780, tempo: 900, tabela: scoreRows }, { id: "flexao", nome: "Flexão", tipo: "repeticoes", unidade: "rep", minimo: 18, tempo: 60, tabela: scoreRows }, { id: "abdominal", nome: "Abdominal", tipo: "repeticoes", unidade: "rep", minimo: 28, tempo: 60, tabela: scoreRows }] },
  { id: "prf", nome: "PRF Policial Rodoviário Federal", provas: [{ id: "corrida", nome: "Corrida 12min", tipo: "distancia", unidade: "m", minimo: 2300, tempo: 720, tabela: scoreRows }, { id: "natacao", nome: "Natação 50m", tipo: "tempo_minimo", unidade: "s", minimo: 55, tempo: 90, tabela: scoreRows }, { id: "barra", nome: "Barra/Flexão", tipo: "repeticoes", unidade: "rep", minimo: 3, tempo: 60, tabela: scoreRows }] },
  { id: "eb", nome: "EB Sargento", provas: [{ id: "corrida", nome: "Corrida 3000m", tipo: "tempo_minimo", unidade: "s", minimo: 900, tempo: 1080, tabela: scoreRows }, { id: "barra", nome: "Barra", tipo: "repeticoes", unidade: "rep", minimo: 4, tempo: 60, tabela: scoreRows }, { id: "abdominal", nome: "Abdominal", tipo: "repeticoes", unidade: "rep", minimo: 32, tempo: 60, tabela: scoreRows }] },
];

export const mockHistoricoTAF = [
  { id: "t1", data: "2026-02-10", concurso: "PMSP", corrida: 1850, flexao: 18, abdominal: 28, nota: 4.8, situacao: "Reprovado" },
  { id: "t2", data: "2026-03-12", concurso: "PMSP", corrida: 2250, flexao: 24, abdominal: 34, nota: 7.5, situacao: "Aprovado" },
  { id: "t3", data: "2026-04-14", concurso: "PMSP", corrida: 2380, flexao: 28, abdominal: 38, nota: 8.0, situacao: "Aprovado" },
  { id: "t4", data: "2026-05-16", concurso: "PMSP", corrida: 2520, flexao: 31, abdominal: 42, nota: 8.5, situacao: "Aprovado" },
  { id: "t5", data: "2026-06-01", concurso: "PMSP", corrida: 2650, flexao: 35, abdominal: 45, nota: 9.0, situacao: "Aprovado" },
];

export const mockPlanoTAF = ["Adaptação", "Base", "Específico", "Pico"].map((fase, index) => ({
  semana: index + 1,
  fase,
  treinos: ["Seg", "Ter", "Qui", "Sáb"].map((dia, slot) => ({ dia, nome: ["Corrida intervalada", "Força superior", "Core e abdominal", "Longão leve"][slot], duracao: 45 + slot * 10, alvo: ["corrida", "musculacao", "abdominal", "corrida"][slot], done: slot < 2 })),
}));

export const mockDicasTAF = Array.from({ length: 10 }, (_, index) => ({
  id: `tip${index + 1}`,
  tipo: index % 3 ? "Artigo" : "Vídeo",
  categoria: ["Corrida", "Musculação", "Flexibilidade", "Nutrição", "Psicológico", "Técnica"][index % 6],
  titulo: `Preparação TAF ${index + 1}`,
  resumo: "Orientação objetiva para evoluir com segurança e consistência.",
  duracao: index % 3 ? `${4 + index} min de leitura` : "8:32",
}));
