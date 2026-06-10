export const routeLabels = {
  dashboard: "Dashboard",
  plano: "Plano de estudos",
  simulados: "Simulados",
  questoes: "Banco de questões",
  redacao: "Redação",
  ia: "IA Aprovinho",
  ajuda: "Central de Ajuda",
  flashcards: "Flashcards",
  mapas: "Mapas mentais",
  leis: "Leis Secas",
  perfil: "Perfil",
  taf: "TAF",
  biblioteca: "Biblioteca",
  revisao: "Central de revisão",
  erros: "Caderno de erros",
};

export function step(target, title, description, options = {}) {
  return {
    target,
    popover: {
      title,
      description,
      side: options.side || "bottom",
      align: options.align || "center",
    },
    ...options,
  };
}
