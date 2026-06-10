import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type LawConfig = {
  id: string;
  nome: string;
  nome_curto: string;
  tipo: string;
  categoria: string;
  materia: string;
  fonte: string;
};

type ParsedArticle = {
  id: string;
  lei_id: string;
  lei_nome: string;
  secao: string;
  numero: number;
  numero_texto: string;
  texto: string;
  incisos: string[];
  paragrafos: string[];
  capitulo: string;
  importancia: number;
  tags: string[];
  revogado: boolean;
  cobrancas: number;
};

const STORAGE_ROOT = path.resolve(process.cwd(), "storage", "content", "leis");
const PUBLIC_ROOT = path.resolve(process.cwd(), "public", "leis");
const QUESTION_FILES = [
  path.resolve(process.cwd(), "public", "questoes", "oab.json"),
  path.resolve(process.cwd(), "public", "questoes", "militar.json"),
];

const LAWS: LawConfig[] = [
  { id: "cf88", nome: "Constituicao Federal de 1988", nome_curto: "CF/88", tipo: "Constituicao Federal", categoria: "Constitucional", materia: "Direito Constitucional", fonte: "planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
  { id: "estatuto-oab", nome: "Estatuto da OAB (Lei 8.906/94)", nome_curto: "Estatuto da OAB", tipo: "Estatuto", categoria: "OAB", materia: "Etica Profissional", fonte: "planalto.gov.br/ccivil_03/leis/l8906.htm" },
  { id: "codigo-etica-oab", nome: "Codigo de Etica e Disciplina da OAB", nome_curto: "Codigo de Etica OAB", tipo: "Codigo de Etica", categoria: "OAB", materia: "Etica Profissional", fonte: "oab.org.br/content/pdf/legislacaooab/codigodeetica.pdf" },
  { id: "regulamento-oab", nome: "Regulamento Geral da OAB", nome_curto: "Regulamento Geral OAB", tipo: "Regulamento", categoria: "OAB", materia: "Etica Profissional", fonte: "oab.org.br/content/pdf/legislacaooab/regulamentogeral.pdf" },
  { id: "codigo-civil", nome: "Codigo Civil", nome_curto: "Codigo Civil", tipo: "Codigo", categoria: "Civil", materia: "Direito Civil", fonte: "planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm" },
  { id: "cpc", nome: "Codigo de Processo Civil", nome_curto: "CPC", tipo: "Codigo", categoria: "Processo Civil", materia: "Processo Civil", fonte: "planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm" },
  { id: "codigo-penal", nome: "Codigo Penal", nome_curto: "Codigo Penal", tipo: "Codigo", categoria: "Penal", materia: "Direito Penal", fonte: "planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" },
  { id: "cpp", nome: "Codigo de Processo Penal", nome_curto: "CPP", tipo: "Codigo", categoria: "Processo Penal", materia: "Processo Penal", fonte: "planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm" },
  { id: "cdc", nome: "Codigo de Defesa do Consumidor", nome_curto: "CDC", tipo: "Codigo", categoria: "Consumidor", materia: "Direito do Consumidor", fonte: "planalto.gov.br/ccivil_03/leis/l8078compilado.htm" },
  { id: "clt", nome: "Consolidacao das Leis do Trabalho", nome_curto: "CLT", tipo: "Consolidacao", categoria: "Trabalho", materia: "Direito do Trabalho", fonte: "planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" },
  { id: "ctn", nome: "Codigo Tributario Nacional", nome_curto: "CTN", tipo: "Codigo", categoria: "Tributario", materia: "Direito Tributario", fonte: "planalto.gov.br/ccivil_03/leis/l5172compilado.htm" },
];

function log(message: string) {
  console.log(`[Leis Miner] ${message}`);
}

function relativePath(filePath: string) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, "/");
}

function normalize(value = "") {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function slugNumber(numeroTexto: string) {
  return normalize(numeroTexto).replace(/[^a-z0-9]+/g, "");
}

function decodeBasicEntities(value = "") {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&ordm;/gi, "º")
    .replace(/&deg;/gi, "°")
    .replace(/&sect;/gi, "§")
    .replace(/&ccedil;/gi, "ç")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó")
    .replace(/&uacute;/gi, "ú")
    .replace(/&atilde;/gi, "ã")
    .replace(/&otilde;/gi, "õ")
    .replace(/&ecirc;/gi, "ê")
    .replace(/&ocirc;/gi, "ô")
    .replace(/&[a-z]+;/gi, " ");
}

function cleanRawText(value = "") {
  return decodeBasicEntities(value)
    .replace(/\r/g, "")
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(p|div|li|tr|h\d)\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/^\s*\d+\s*$/gm, "")
    .replace(/^\s*(?:pagina|página|page)\s+\d+.*$/gim, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeArticleMarkers(value = "") {
  return value.replace(
    /(^|\n)([ \t]*)(Art\.?)\s+(\d{1,3}(?:\.\d+)?)(\s*(?:º|°|Âº|Â°|o|O|ª|a))?(?:\s*[-–—]\s*([A-Z]))?\.?/g,
    (_match, lineStart, indent, _art, number, ordinal, suffix) => `${lineStart}${indent}Art. ${number}${ordinal ? "º" : ""}${suffix ? `-${suffix}` : ""}.`
  );
}

function normalizeArticleMarkersStrict(value = "") {
  return value.replace(
    /(^|\n)([ \t]*)(Art\.?)\s+(\d{1,3}(?:\.\d+)?)(\s*(?:Âº|Â°|Ã‚Âº|Ã‚Â°|o|O|Âª|a))?((?:\s*[-â€“â€”]\s*[A-Z]){1,2}(?=\s*\.))?\.?/g,
    (_match, lineStart, indent, _art, number, ordinal, suffix = "") => {
      const normalizedSuffix = suffix.replace(/\s+/g, "").replace(/[â€“â€”]/g, "-");
      return `${lineStart}${indent}Art. ${number}${ordinal ? "Âº" : ""}${normalizedSuffix}.`;
    }
  );
}

function cleanArticleText(value = "") {
  const cleaned = value
    .replace(/^\s*(?:Vide|Vig[eê]ncia|Produ[cç][aã]o de efeito|Regulamento).*$/gim, "")
    .replace(/\n\s*Brasília,\s*5\s+de\s+outubro[\s\S]*$/i, "")
    .replace(/\n\s*Este texto não substitui[\s\S]*$/i, "")
    .replace(/\s+\(Inclu[ií]do pela (?:Lei|Emenda Constitucional)[^)]*\)/gi, "")
    .replace(/\s+\(Reda[cç][aã]o dada pela (?:Lei|Emenda Constitucional)[^)]*\)/gi, "")
    .replace(/\s+\(Revogado pela (?:Lei|Emenda Constitucional)[^)]*\)/gi, " (Revogado)")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return stripTrailingHeadings(cleaned);
}

function isHeadingLine(line = "") {
  const text = line.trim();
  if (!text || /^Art\./i.test(text)) return false;
  if (/^(T[IÍ]TULO|CAP[IÍ]TULO|SE[CÇ][AÃ]O|SUBSE[CÇ][AÃ]O|LIVRO|PARTE)\b/i.test(text)) return true;
  return text.length <= 90 && text === text.toUpperCase() && /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(text);
}

function stripTrailingHeadings(text = "") {
  const lines = text.split("\n");
  while (lines.length > 1 && isHeadingLine(lines.at(-1) || "")) lines.pop();
  return lines.join("\n").trim();
}

function isRevokedArticle(text = "") {
  return /^Art\.?\s+\d{1,3}(?:\.\d+)?(?:-[A-Z])?\.?\s*(?:\([^)]*)?revogad[oa]/i.test(text);
}

function importanceFor(leiId: string, numero: number, text: string) {
  if (leiId === "cf88" && [1, 2, 3, 4, 5, 6, 7, 37, 144].includes(numero)) return 5;
  if (leiId === "estatuto-oab" && [1, 2, 3, 4, 7, 34, 35, 44].includes(numero)) return 5;
  if (/direitos fundamentais|advogado|inscri[cç][aã]o|infra[cç][aã]o|crime|pena|tribut/i.test(text)) return 4;
  return numero <= 10 ? 4 : 3;
}

function tagsFor(config: LawConfig, articleText: string) {
  const text = normalize(`${config.nome} ${config.materia} ${articleText}`);
  const tags = new Set([config.materia, config.categoria]);
  if (text.includes("direitos") && text.includes("fundament")) tags.add("direitos fundamentais");
  if (text.includes("igualdade")) tags.add("igualdade");
  if (text.includes("advogado") || text.includes("oab")) tags.add("advocacia");
  if (text.includes("administracao publica")) tags.add("administracao publica");
  if (text.includes("tribut")) tags.add("tributos");
  if (text.includes("consumidor")) tags.add("consumidor");
  if (text.includes("processo")) tags.add("processo");
  if (text.includes("pena") || text.includes("crime")) tags.add("penal");
  return [...tags];
}

async function readOfficialQuestions() {
  const rows = [];
  for (const file of QUESTION_FILES) {
    try {
      rows.push(...JSON.parse(await readFile(file, "utf-8")));
    } catch {
      // A base pode ainda nao existir em projetos novos.
    }
  }
  return rows.map((question) => ({
    id: question.id,
    text: normalize([question.enunciado, question.comentario, question.materia, question.topico, question.assunto, question.concurso, question.banca].join(" ")),
  }));
}

function countQuestionMatches(article: ParsedArticle, questions: Array<{ id?: string; text: string }>) {
  const explicitArticleTerms = [
    `art. ${article.numero_texto}`,
    `art ${article.numero_texto}`,
    `artigo ${article.numero_texto}`,
    `art. ${article.numero}`,
    `artigo ${article.numero}`,
  ].map(normalize);
  const tags = article.tags.map(normalize).filter((tag) => tag.length > 4);
  const lawFirstTerm = normalize(article.lei_nome).split(" ")[0];

  let count = 0;
  for (const question of questions) {
    const explicit = explicitArticleTerms.some((term) => question.text.includes(term));
    const thematic = tags.length && tags.some((tag) => question.text.includes(tag)) && question.text.includes(lawFirstTerm);
    if (explicit || thematic) count += 1;
  }
  return count;
}

function currentHeading(lines: string[], fallback: string) {
  const headings = lines
    .map((line) => line.trim())
    .filter((line) => line && line.length < 120 && !/^Art\./i.test(line))
    .filter((line) => /^(T[IÍ]TULO|CAP[IÍ]TULO|SE[CÇ][AÃ]O|SUBSE[CÇ][AÃ]O|LIVRO|PARTE)\b/i.test(line) || line === line.toUpperCase());
  return headings.at(-1) || fallback;
}

function splitCfSections(text: string) {
  if (!text.trim()) return [{ label: "Parte principal", text }];
  const normalizedText = normalize(text);
  const adctNeedle = "ato das disposicoes constitucionais transitorias";
  const markers: number[] = [];
  let index = -1;
  while ((index = normalizedText.indexOf(adctNeedle, index + 1)) >= 0) markers.push(index);

  const mainArt250 = normalizedText.search(/(?:^|\n)\s*art\.?\s+250\b/i);
  const marker = markers.find((position) => position > Math.max(100_000, mainArt250));
  if (!marker) return [{ label: "Parte principal", text }];

  return [
    { label: "Parte principal", text: text.slice(0, marker) },
    { label: "ADCT", text: text.slice(marker) },
  ];
}

function parseSectionArticles(config: LawConfig, rawText: string, sectionLabel: string) {
  const text = normalizeArticleMarkersStrict(cleanRawText(rawText));
  const articleRegex = /(?:^|\n)\s*(Art\.?\s+(\d{1,3}(?:\.\d+)?)(?:\s*(?:º|°|Âº|Â°|o|O))?(?:-([A-Z]))?\.?\s*[\s\S]*?)(?=\n\s*Art\.?\s+\d{1,3}(?:\.\d+)?(?:\s*(?:º|°|Âº|Â°|o|O))?(?:-[A-Z])?\.?\s|$)/gi;
  const matches = [...text.matchAll(articleRegex)];
  const byArticle = new Map<string, ParsedArticle>();

  for (const match of matches) {
    let fullText = cleanArticleText(match[1]);
    if (fullText.length < 12) continue;
    const numero = Number.parseInt(match[2].replace(/\D/g, ""), 10);
    if (!numero) continue;
    const suffix = match[3] ? `-${match[3]}` : "";
    const numeroTextoMatch = fullText.match(/^Art\.?\s+(\d{1,3}(?:\.\d+)?(?:\s*(?:º|°|Âº|Â°|o|O))?(?:-[A-Z])?)/i);
    let numeroTexto = (numeroTextoMatch?.[1] || `${match[2]}º${suffix}`).replace(/\.$/, "").replace(/\s+/g, "");
    if (numero >= 10) {
      numeroTexto = numeroTexto.replace(/^(\d{2,3}(?:\.\d+)?)º(-[A-Z])?$/, "$1$2");
      fullText = fullText.replace(new RegExp(`^Art\\\\.?\\\\s+${numero}º(${suffix ? `-${suffix.replace("-", "")}` : ""})?\\\\.`, "i"), `Art. ${numeroTexto}.`);
    }
    const id = `${config.id}${sectionLabel === "ADCT" ? "-adct" : ""}-art${slugNumber(numeroTexto)}`;
    const prefix = text.slice(0, match.index || 0).split("\n").slice(-18);
    const capitulo = sectionLabel === "ADCT" ? "Ato das Disposições Constitucionais Transitórias" : currentHeading(prefix, config.nome_curto);
    const incisos = [...fullText.matchAll(/(?:^|\n)\s*([IVXLCDM]+)\s*[-–—]\s+([^\n]+)/g)].map((item) => `${item[1]} - ${item[2]}`);
    const paragrafos = [...fullText.matchAll(/(?:^|\n)\s*(§\s*\d+[º°]?|Par[aá]grafo único)\.?\s+([^\n]+)/gi)].map((item) => `${item[1]} ${item[2]}`);

    byArticle.set(id, {
      id,
      lei_id: config.id,
      lei_nome: config.nome,
      secao: sectionLabel,
      numero,
      numero_texto: numeroTexto,
      texto: fullText,
      incisos,
      paragrafos,
      capitulo,
      importancia: importanceFor(config.id, numero, fullText),
      tags: tagsFor(config, fullText),
      revogado: isRevokedArticle(fullText),
      cobrancas: 0,
    });
  }

  return [...byArticle.values()];
}

function parseArticles(config: LawConfig, rawText: string) {
  const cleaned = cleanRawText(rawText);
  const sections = config.id === "cf88" ? splitCfSections(cleaned) : [{ label: config.nome_curto, text: cleaned }];
  return sections.flatMap((section) => parseSectionArticles(config, section.text, section.label));
}

function groupArticles(config: LawConfig, articles: ParsedArticle[]) {
  const groups = config.id === "cf88"
    ? [
      { nome: "Constituição Federal", secao: "Parte principal", artigos: articles.filter((article) => article.secao === "Parte principal") },
      { nome: "ADCT", secao: "Ato das Disposições Constitucionais Transitórias", artigos: articles.filter((article) => article.secao === "ADCT") },
    ]
    : [{ nome: config.nome_curto, secao: config.nome, artigos: articles }];

  return groups.filter((group) => group.artigos.length || config.id !== "cf88");
}

async function ensureLawFiles(config: LawConfig) {
  const root = path.join(STORAGE_ROOT, config.id);
  const textPath = path.join(root, "texto.txt");
  const metaPath = path.join(root, "meta.json");
  await mkdir(root, { recursive: true });

  let rawText = "";
  try {
    rawText = await readFile(textPath, "utf-8");
  } catch {
    await writeFile(textPath, "", "utf-8");
  }

  try {
    await readFile(metaPath, "utf-8");
  } catch {
    await writeFile(metaPath, JSON.stringify(config, null, 2), "utf-8");
  }

  return { root, textPath, rawText };
}

async function main() {
  const laws = [];
  const allArticles: ParsedArticle[] = [];
  const questions = await readOfficialQuestions();
  await mkdir(PUBLIC_ROOT, { recursive: true });

  for (const config of LAWS) {
    const { root, textPath, rawText } = await ensureLawFiles(config);
    const articles = rawText.trim() ? parseArticles(config, rawText).filter((article) => !article.revogado) : [];
    articles.forEach((article) => {
      article.cobrancas = countQuestionMatches(article, questions);
    });

    const law = {
      ...config,
      total_artigos: articles.length,
      parsedAt: new Date().toISOString(),
      hasText: Boolean(rawText.trim()),
      storagePath: path.relative(process.cwd(), root).replace(/\\/g, "/"),
      capitulos: groupArticles(config, articles),
    };

    await writeFile(path.join(root, "artigos.json"), JSON.stringify(articles, null, 2), "utf-8");
    laws.push(law);
    allArticles.push(...articles);
    if (!rawText.trim()) {
      log(`${config.id}: aguardando texto em ${relativePath(textPath)}`);
    } else {
      const details = config.id === "cf88"
        ? `Parte principal: ${articles.filter((article) => article.secao === "Parte principal").length}; ADCT: ${articles.filter((article) => article.secao === "ADCT").length}`
        : `${articles.length} artigos`;
      log(`${config.id}: ${details} (${rawText.length.toLocaleString("pt-BR")} caracteres lidos)`);
    }
  }

  await writeFile(path.join(STORAGE_ROOT, "index.json"), JSON.stringify(laws, null, 2), "utf-8");
  await writeFile(path.join(PUBLIC_ROOT, "index.json"), JSON.stringify(laws, null, 2), "utf-8");
  await writeFile(path.join(PUBLIC_ROOT, "artigos.json"), JSON.stringify(allArticles, null, 2), "utf-8");
  log(`Total: ${allArticles.length} artigos ativos`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
