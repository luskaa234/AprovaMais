const artigosCf = Array.from({ length: 5 }, (_, index) => ({ id: `cf${index + 1}`, numero: index + 1, texto: `Art. ${index + 1} da Constituição Federal com texto resumido para estudo dirigido e marcacoes pessoais.` }));
const artigos8112 = Array.from({ length: 3 }, (_, index) => ({ id: `l8112-${index + 1}`, numero: index + 1, texto: `Art. ${index + 1} da Lei 8.112 com regras sobre servidores publicos federais.` }));
const artigosCdc = Array.from({ length: 3 }, (_, index) => ({ id: `cdc-${index + 1}`, numero: index + 1, texto: `Art. ${index + 1} do CDC com protecao basica ao consumidor.` }));

export const mockLeis = [
  { id: "cf88", nome: "Constituicao Federal de 1988", capitulos: [{ nome: "Principios Fundamentais", artigos: artigosCf }] },
  { id: "lei8112", nome: "Lei 8.112", capitulos: [{ nome: "Regime juridico", artigos: artigos8112 }] },
  { id: "cdc", nome: "Codigo de Defesa do Consumidor", capitulos: [{ nome: "Direitos basicos", artigos: artigosCdc }] },
];
