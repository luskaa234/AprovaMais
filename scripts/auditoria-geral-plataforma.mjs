import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const outDir = path.join(root, "reports");
fs.mkdirSync(outDir, { recursive: true });

const ROOTS = [
  "src",
  "public",
  "storage",
  "material-provas",
  "flashcards-apkg",
  "scripts",
  "api",
  "components",
  "supabase",
  "prisma",
];

const IGNORE = [
  /(^|[\\/])node_modules([\\/]|$)/,
  /(^|[\\/])\.git([\\/]|$)/,
  /(^|[\\/])dist([\\/]|$)/,
  /(^|[\\/])build([\\/]|$)/,
  /(^|[\\/])\.gradle([\\/]|$)/,
  /(^|[\\/])reports([\\/]|$)/,
  /(^|[\\/])VemAprovar-Splash-Completa([\\/]|$)/,
  /\.cache/i,
  /tmp/i,
];

const TEXT_EXT = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".txt", ".csv", ".sql", ".toml", ".xml", ".prisma", ".html", ".webmanifest", ".svg", ".css",
]);

const SCAN_EXT = new Set([
  ...TEXT_EXT,
  ".pdf", ".docx", ".xlsx", ".xls", ".apkg", ".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".zip",
]);

const ROUTES = {
  dashboard: "Dashboard",
  checkout: "Checkout",
  oab: "OAB",
  questoes: "Questões",
  simulados: "Simulados",
  taf: "TAF",
  plano: "Plano de estudos",
  revisao: "Revisão",
  flashcards: "Flashcards",
  mapas: "Mapas mentais",
  redacao: "Redação",
  erros: "Caderno de erros",
  biblioteca: "Biblioteca",
  leis: "Leis secas",
  ia: "Mentoria IA",
  perfil: "Perfil",
  ajuda: "Ajuda",
  admin: "Admin",
};

const DISCIPLINE_RULES = [
  ["Direito Processual Penal Militar", /processual[-_\s]*penal[-_\s]*militar|cppm/i],
  ["Direito Penal Militar", /penal[-_\s]*militar|crime militar|\bcpm\b/i],
  ["Direito Processual Penal", /processual[-_\s]*penal|processo[-_\s]*penal|\bcpp\b/i],
  ["Direito Processual Civil", /processual[-_\s]*civil|processo[-_\s]*civil|\bcpc\b/i],
  ["Direito Processual do Trabalho", /processual[-_\s]*trabalho|processo[-_\s]*trabalho/i],
  ["Direito Constitucional", /constitucional|constitui[cç][aã]o|cf88|direitos fundamentais/i],
  ["Direito Administrativo", /administrativo|administra[cç][aã]o p[úu]blica|atos administrativos|licita[cç][oõ]es/i],
  ["Direito Penal", /direito[-_\s]*penal|c[oó]digo[-_\s]*penal|codigo[-_\s]*penal|crime|pena/i],
  ["Direito Civil", /direito[-_\s]*civil|c[oó]digo[-_\s]*civil|codigo[-_\s]*civil/i],
  ["Direito do Consumidor", /consumidor|\bcdc\b/i],
  ["Direito Tributário", /tribut[aá]rio|\bctn\b/i],
  ["Direito do Trabalho", /direito[-_\s]*trabalho|\bclt\b/i],
  ["Direito Previdenciário", /previdenci[aá]rio/i],
  ["Direito Empresarial", /empresarial/i],
  ["Direito Eleitoral", /eleitoral/i],
  ["Direito Financeiro", /financeiro/i],
  ["Direito Ambiental", /ambiental/i],
  ["Direito Internacional", /internacional/i],
  ["Direito Digital/LGPD", /digital|lgpd|cibern[eé]tico/i],
  ["Ética Profissional", /[eé]tica profissional|estatuto[-_\s]*oab|c[oó]digo[-_\s]*[eé]tica[-_\s]*oab|regulamento[-_\s]*oab/i],
  ["Direitos Humanos", /direitos[-_\s]*humanos|dignidade|uso[-_\s]*da[-_\s]*for[cç]a/i],
  ["Legislação Institucional PMMA", /legisla[cç][aã]o[-_\s]*institucional[-_\s]*pmma|lei[-_\s]*6\.?513|lei[-_\s]*4\.?570|pmma/i],
  ["Legislação Penal Especial", /legisla[cç][aã]o[-_\s]*penal[-_\s]*especial|drogas|desarmamento|abuso[-_\s]*de[-_\s]*autoridade|maria[-_\s]*da[-_\s]*penha|hediondos|tortura/i],
  ["Criminologia e Segurança Pública", /criminologia|seguran[cç]a[-_\s]*p[úu]blica|pol[ií]cia[-_\s]*comunit[aá]ria|ordem[-_\s]*p[úu]blica/i],
  ["Língua Portuguesa", /portugu[eê]s|l[ií]ngua[-_\s]*portuguesa|interpreta[cç][aã]o|ortografia|morfologia|sintaxe|crase|reg[eê]ncia|concord[aâ]ncia/i],
  ["Raciocínio Lógico-Matemático", /racioc[ií]nio|l[oó]gico|matem[aá]tica|porcentagem|probabilidade|propor[cç][aã]o/i],
  ["Informática", /inform[aá]tica|internet|seguran[cç]a[-_\s]*da[-_\s]*informa[cç][aã]o|windows|office|excel|word/i],
  ["Atualidades", /atualidades|mundo[-_\s]*contempor[aâ]neo/i],
  ["História", /hist[oó]ria/i],
  ["Geografia", /geografia/i],
  ["Biologia", /biologia/i],
  ["Física", /f[ií]sica/i],
  ["Química", /qu[ií]mica/i],
  ["Filosofia", /filosofia/i],
  ["Sociologia", /sociologia/i],
  ["Redação", /reda[cç][aã]o|discursiva|repert[oó]rio|tema[-_\s]*reda[cç][aã]o/i],
  ["TAF", /\btaf\b|teste[-_\s]*de[-_\s]*aptid[aã]o[-_\s]*f[ií]sica|corrida|flex[aã]o|abdominal/i],
  ["Mapas mentais", /mapa[-_\s]*mental|mapas[-_\s]*mentais/i],
  ["Flashcards", /flashcard|deck|anki|apkg/i],
  ["Revisão", /revis[aã]o|v[eé]spera|caderno[-_\s]*de[-_\s]*erros/i],
];

const OBJECTIVE_RULES = [
  ["OAB", /(^|[\/\-_])oab([\/\-_]|$)|exame[-_\s]*de[-_\s]*ordem|1.?fase|2.?fase|ética profissional/i],
  ["ENEM", /(^|[\/\-_])enem([\/\-_]|$)|ensino[-_\s]*m[eé]dio|linguagens|ci[eê]ncias[-_\s]*humanas|ci[eê]ncias[-_\s]*natureza|biologia|f[ií]sica|qu[ií]mica|sociologia[-_\s]*enem|hist[oó]ria[-_\s]*enem|geografia[-_\s]*enem/i],
  ["PMMA", /pmma|pol[ií]cia[-_\s]*militar[-_\s]*do[-_\s]*maranh[aã]o|pm[-_\s]*ma/i],
  ["Polícia Militar", /(^|[\/\-_])pm[a-z]{0,4}([\/\-_]|$)|pol[ií]cia[-_\s]*militar|soldado[-_\s]*pm|oficial[-_\s]*da[-_\s]*pm|cabo[-_\s]*pm|sargento[-_\s]*pm/i],
  ["Corpo de Bombeiros", /cbm|bombeiro/i],
  ["Polícia Civil", /(^|[\/\-_])pc[a-z]{0,4}([\/\-_]|$)|pol[ií]cia[-_\s]*civil|delegado|investigador|inspetor/i],
  ["Polícia Penal", /pol[ií]cia[-_\s]*penal|(^|[\/\-_])pp[a-z]{0,4}([\/\-_]|$)/i],
  ["Guarda Municipal", /guarda[-_\s]*municipal|(^|[\/\-_])gm[a-z]{0,4}([\/\-_]|$)/i],
  ["PRF", /\bprf\b|pol[ií]cia[-_\s]*rodovi[aá]ria[-_\s]*federal/i],
  ["Polícia Federal", /(^|[\/\-_])pf([\/\-_]|$)|pol[ií]cia[-_\s]*federal/i],
  ["DETRAN", /detran/i],
  ["Tribunais", /tribunal|trt|tj|stj|tse|tre|organiza[cç][aã]o[-_\s]*judici[aá]ria|regimentos[-_\s]*internos/i],
  ["Concursos Administrativos", /administra[cç][aã]o[-_\s]*p[úu]blica|gest[aã]o[-_\s]*pessoas|arquivologia|atendimento[-_\s]*p[úu]blico/i],
  ["Concursos Jurídicos", /jur[ií]dico|direito[-_\s]*(constitucional|administrativo|penal|civil|processual)/i],
  ["Concursos Fiscais", /fiscal|tribut[aá]rio|contabilidade/i],
  ["Concursos Bancários", /banc[aá]rio|banco/i],
  ["Concursos de Educação", /educa[cç][aã]o|professor|pedagogia/i],
  ["Concursos de Saúde", /sa[uú]de|enfermagem|sus/i],
];

function toRel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function shouldIgnore(file) {
  const rel = toRel(file);
  return IGNORE.some((rx) => rx.test(rel));
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (shouldIgnore(full)) continue;
    if (entry.isDirectory()) out.push(...walk(full));
    else if (SCAN_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function repairText(value) {
  const s = String(value ?? "");
  if (!/[ÃÂâ]/.test(s)) return s;
  try {
    const fixed = Buffer.from(s, "latin1").toString("utf8");
    const badBefore = (s.match(/[ÃÂâ]/g) || []).length;
    const badAfter = (fixed.match(/[ÃÂâ]/g) || []).length;
    return badAfter < badBefore ? fixed : s;
  } catch {
    return s;
  }
}

function strip(s) {
  return repairText(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function compact(s) {
  return repairText(s).replace(/\s+/g, " ").trim();
}

function truncate(s, n = 180) {
  const text = compact(s);
  return text.length > n ? `${text.slice(0, n - 1)}...` : text;
}

function readText(file) {
  const ext = path.extname(file).toLowerCase();
  try {
    if (ext === ".pdf") {
      return repairText(execFileSync("pdftotext.exe", ["-enc", "UTF-8", "-layout", "-f", "1", "-l", "5", file, "-"], {
        cwd: root,
        encoding: "utf8",
        timeout: 20000,
        windowsHide: true,
      }));
    }
    if (TEXT_EXT.has(ext)) return repairText(fs.readFileSync(file, "utf8")).slice(0, 250000);
  } catch {
    return "";
  }
  return "";
}

function sha256(file) {
  try {
    return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  } catch {
    return "";
  }
}

function jsonField(text, fields) {
  const list = Array.isArray(fields) ? fields : [fields];
  for (const field of list) {
    const quoted = text.match(new RegExp(`["']${field}["']\\s*:\\s*["']([^"']+)["']`, "i"));
    if (quoted?.[1]) return compact(quoted[1]);
    const bare = text.match(new RegExp(`${field}\\s*[:=]\\s*["']([^"']+)["']`, "i"));
    if (bare?.[1]) return compact(bare[1]);
  }
  return "";
}

function countRegex(text, rx) {
  return (text.match(rx) || []).length;
}

function detectObjective(rel, text) {
  const metadata = [jsonField(text, ["objetivo", "objective", "objective_id", "area", "categoria", "contest", "concurso"]), rel].join(" ");
  const evidenceText = strip(metadata);
  for (const [name, rx] of OBJECTIVE_RULES) {
    if (rx.test(evidenceText)) return { value: name, confidence: evidenceText.includes(strip(name)) ? "alta" : "média", evidence: "metadados/diretório/nome" };
  }
  if (/src\/data\/mock|mock/i.test(rel)) return { value: "aplicável a múltiplos objetivos", confidence: "média", evidence: "mock local" };
  if (/supabase|prisma|api|scripts/i.test(rel)) return { value: "desenvolvimento/plataforma", confidence: "média", evidence: "diretório técnico" };
  return { value: "não identificado", confidence: "não identificada", evidence: "sem metadados suficientes" };
}

function detectDiscipline(rel, text, kind) {
  if (kind === "prova" || kind === "gabarito") return { value: "multidisciplinar ou não identificada", confidence: "baixa", evidence: "PDF de prova/gabarito" };
  const weighted = [
    jsonField(text, ["disciplina", "materia", "subject", "moduleTitle", "materialTitle", "title"]),
    rel,
  ].join(" ");
  for (const [name, rx] of DISCIPLINE_RULES) {
    if (rx.test(weighted)) return { value: name, confidence: "alta", evidence: "metadados/título/nome" };
  }
  const body = text.slice(0, 50000);
  for (const [name, rx] of DISCIPLINE_RULES) {
    if (rx.test(body)) return { value: name, confidence: "baixa", evidence: "palavras-chave no conteúdo" };
  }
  return { value: "não identificado", confidence: "não identificada", evidence: "sem evidência" };
}

function detectContentType(rel, ext, text) {
  const hay = strip(`${rel} ${jsonField(text, ["tipo", "type", "categoria", "title", "materialTitle", "moduleTitle"])}`);
  if (ext === ".apkg") return ["deck Anki", "APKG"];
  if (ext === ".pdf" && /gabarito|resposta|espelho/.test(hay)) return ["gabarito", hay.includes("espelho") ? "espelho de correção" : hay.includes("preliminar") ? "gabarito preliminar" : "gabarito definitivo"];
  if (ext === ".pdf" && /discursiva|redacao|redacao/.test(hay)) return ["prova", "prova discursiva"];
  if (ext === ".pdf") return ["prova", "prova completa/multidisciplinar"];
  if (/storage\/content\/leis|\/leis\//.test(rel)) return ["lei seca", ext === ".txt" ? "texto legal" : "metadados/artigos"];
  if (/questoes-extraidas|quest[oõ]es|question/.test(hay)) return ["banco de questões", "questões extraídas/importadas"];
  if (/simulado/.test(hay)) return ["simulado", "simulado"];
  if (/flashcard|deck/.test(hay)) return ["flashcard", "flashcards internos"];
  if (/mapa[-_\s]*mental|mapas[-_\s]*mentais/.test(hay)) return ["mapa mental", "mapa mental textual/arquivo"];
  if (/revis[aã]o|vespera|v[eé]spera/.test(hay)) return ["revisão", hay.includes("vespera") ? "revisão de véspera" : "revisão"];
  if (/redacao|reda[cç][aã]o|repertorio|pe[cç]a|espelho/.test(hay)) return ["redação", "redação/repertório/peça"];
  if (/\btaf\b|aptidao-fisica/.test(hay)) return ["material TAF", "treino/edital TAF"];
  if (/mock/.test(hay)) return ["mock", "mock/desenvolvimento"];
  if (/seed/.test(hay)) return ["seed", "seed/banco"];
  if (/preview|report/.test(hay)) return ["preview", "preview/relatório de importação"];
  if (/apostilas|moduleTitle|materialTitle|chapters/.test(`${rel} ${text.slice(0, 12000)}`)) return ["apostila", "módulo/apostila"];
  if ([".png", ".jpg", ".jpeg", ".svg", ".webp"].includes(ext)) return [hay.includes("logo") || rel.includes("logos") || rel.includes("brand") ? "logo" : "imagem", "asset visual"];
  if ([".sql", ".prisma", ".toml"].includes(ext)) return ["arquivo de desenvolvimento", "schema/configuração"];
  if ([".js", ".jsx", ".ts", ".tsx"].includes(ext) && /service|component|page|hook|store|context|script/.test(hay)) return ["arquivo de desenvolvimento", "código-fonte"];
  if (ext === ".mp4") return ["videoaula", "vídeo/link de demonstração"];
  return ["conteúdo não identificado", "não identificado"];
}

function detectBanca(rel, text) {
  const hay = strip(`${rel} ${text.slice(0, 40000)}`);
  const rules = ["Cebraspe", "FGV", "FCC", "IBFC", "Vunesp", "Selecon", "Nucepe", "Uespi", "AOCP", "Cesgranrio"];
  return rules.find((b) => hay.includes(strip(b))) || "não identificada";
}

function detectYear(rel, text) {
  return rel.match(/\b(20\d{2}|19\d{2})\b/)?.[1] || text.match(/\b(20\d{2}|19\d{2})\b/)?.[1] || "";
}

function detectCargo(rel, text) {
  const hay = strip(`${rel} ${jsonField(text, ["cargo", "role", "position", "exame", "title"])}`);
  const rules = [
    ["Soldado", /soldado/],
    ["Oficial", /oficial|cfo|aluno[-_\s]*oficial/],
    ["Cabo", /cabo/],
    ["Sargento", /sargento/],
    ["Delegado", /delegado/],
    ["Investigador", /investigador/],
    ["Inspetor", /inspetor/],
    ["Agente", /agente/],
    ["1ª Fase OAB", /1.?fase|primeira[-_\s]*fase/],
    ["2ª Fase OAB", /2.?fase|segunda[-_\s]*fase|pe[cç]as[-_\s]*praticas/],
  ];
  return rules.find(([, rx]) => rx.test(hay))?.[0] || "não identificado";
}

function detectContest(rel, text, objective) {
  const explicit = jsonField(text, ["concurso", "contest", "exam", "exame", "nome", "titulo"]);
  if (explicit) return explicit;
  const parts = rel.split("/");
  const contentIndex = parts.indexOf("content");
  if (contentIndex >= 0 && parts[contentIndex + 2]) return parts[contentIndex + 2];
  if (objective !== "não identificado") return objective;
  return "não identificado";
}

function extractTitle(rel, text) {
  return jsonField(text, ["materialTitle", "moduleTitle", "title", "titulo", "nome", "exame"]) ||
    path.basename(rel, path.extname(rel)).replace(/[-_]+/g, " ");
}

function extractDescription(text) {
  return jsonField(text, ["descricao", "description", "resumo", "summary"]) || "";
}

function extractSubject(rel, text) {
  return jsonField(text, ["assunto", "topico", "topic", "moduleTitle", "title"]) ||
    path.basename(rel, path.extname(rel)).replace(/[-_]+/g, " ");
}

function extractSubsubject(text) {
  return jsonField(text, ["subassunto", "subtopic", "habilidade", "competencia", "capitulo", "chapterTitle"]);
}

function extractLaws(text) {
  const found = new Set();
  const rx = /\b(?:Lei|Decreto|EC|Emenda Constitucional|Código|Codigo|CF\/88|CLT|CPP|CPM|CP|CPC|CTN|CDC)\s*(?:n[ºo.]*\s*)?[\d./-]+(?:\/\d{2,4})?|\bCF\/88\b|\bCLT\b|\bCPP\b|\bCPM\b|\bCPC\b|\bCTN\b|\bCDC\b/gi;
  let m;
  while ((m = rx.exec(text)) && found.size < 20) found.add(compact(m[0]));
  return [...found];
}

function questionStats(text) {
  const total = Math.max(
    countRegex(text, /"enunciado"\s*:/g),
    countRegex(text, /enunciado\s*:/g),
  );
  const alternatives = countRegex(text, /alternativa[_-]?[a-e]|"alternativas"\s*:/gi);
  const answer = countRegex(text, /gabarito|respostaCorreta|correct|answer/gi);
  const comments = countRegex(text, /comentario|comentário|explicacao|explicação|justificativa/gi);
  const source = countRegex(text, /fonte|source|origem|oficial/gi);
  const valid = total ? Math.min(total, answer) : 0;
  return {
    total,
    validas: valid,
    invalidas: Math.max(0, total - valid),
    alternativas: alternatives > 0,
    respostaCorreta: answer > 0,
    comentario: comments > 0,
    fonte: source > 0,
  };
}

function extractCodeFacts(codeFiles) {
  const routes = [];
  const components = [];
  const tables = new Set();
  const imports = new Map();
  const codeTexts = [];

  for (const item of codeFiles) {
    const text = item.text;
    codeTexts.push({ rel: item.rel, text });
    if (/\.(jsx|tsx|js|ts)$/.test(item.rel)) {
      if (/src\/pages|components\//.test(item.rel)) components.push({ path: item.rel, name: path.basename(item.rel), kind: item.rel.includes("pages/") ? "page" : "component" });
      for (const m of text.matchAll(/(?:from\s+["']([^"']+)["']|import\(["']([^"']+)["']\))/g)) {
        const ref = m[1] || m[2];
        if (!imports.has(ref)) imports.set(ref, []);
        imports.get(ref).push(item.rel);
      }
      for (const m of text.matchAll(/from\(["']([^"']+)["']\)/g)) tables.add(m[1]);
      for (const m of text.matchAll(/<Route[^>]+path=["']([^"']+)["']/g)) routes.push({ route: m[1], source: item.rel, type: "react-router" });
      for (const m of text.matchAll(/^\s*([a-zA-Z0-9_-]+):\s*lazy\(\(\)\s*=>\s*import\(["']([^"']+)["']\)/gm)) {
        routes.push({ route: m[1], source: item.rel, type: "internal", component: m[2] });
      }
    }
    if (/\.(sql|prisma)$/.test(item.rel)) {
      for (const m of text.matchAll(/create\s+table\s+(?:if\s+not\s+exists\s+)?(?:public\.)?([a-zA-Z0-9_]+)/gi)) tables.add(m[1]);
      for (const m of text.matchAll(/model\s+([A-Za-z0-9_]+)/g)) tables.add(m[1]);
    }
  }

  return {
    routes,
    components,
    tables: [...tables].sort().map((name) => ({ name, source: codeTexts.filter((c) => c.text.includes(name)).slice(0, 5).map((c) => c.rel) })),
    imports,
    codeTexts,
  };
}

function findReferences(rel, basename, codeFacts) {
  const noExt = basename.replace(/\.[^.]+$/, "");
  const normRel = rel.replace(/^src\//, "../").replace(/^public\//, "/");
  const needles = [rel, basename, noExt, normRel].filter((x) => x && x.length > 3);
  const hits = [];
  for (const file of codeFacts.codeTexts) {
    if (file.rel === rel) continue;
    if (needles.some((needle) => file.text.includes(needle))) hits.push(file.rel);
    if (hits.length >= 8) break;
  }
  return hits;
}

function routeForType(type, rel) {
  if (/quest/i.test(type) || /questoes-extraidas/.test(rel)) return "questoes";
  if (/simulado/i.test(type)) return "simulados";
  if (/flashcard|deck Anki/i.test(type)) return "flashcards";
  if (/mapa/i.test(type)) return "mapas";
  if (/lei|legislação/.test(type)) return "leis";
  if (/redação|redacao|peça|espelho/.test(type)) return "redacao";
  if (/TAF|taf/.test(type)) return "taf";
  if (/apostila|módulo|prova|gabarito/.test(type)) return "biblioteca";
  if (/IA|ia/i.test(type)) return "ia";
  return "";
}

function statusFor(item) {
  const statuses = [];
  if (item.connectedToInterface) statuses.push(item.availableToStudent ? "disponível ao aluno" : "conectado à plataforma");
  if (!item.connectedToInterface && item.kind !== "arquivo de desenvolvimento") statuses.push("órfão");
  if (item.isMock) statuses.push("mock");
  if (item.isDuplicate) statuses.push("duplicado");
  if (item.needsUpdate) statuses.push("desatualizado");
  if (item.needsHumanReview) statuses.push("requer revisão humana");
  if (item.confidence === "alta" && item.connectedToInterface && !item.needsHumanReview) statuses.push("pronto tecnicamente");
  return statuses.length ? statuses.join("; ") : "identificado automaticamente";
}

function actionFor(item) {
  if (item.isDuplicate) return "Revisar duplicidade antes de publicar ou importar.";
  if (item.needsHumanReview) return "Revisar manualmente metadados, objetivo e uso na interface.";
  if (item.isOrphan) return "Decidir se deve ser importado, exposto na interface ou arquivado como acervo interno.";
  if (item.needsUpdate) return "Conferir versão legal/pedagógica e atualizar antes de usar como conteúdo principal.";
  if (item.connectedToInterface) return "Manter e revisar qualidade editorial conforme prioridade do objetivo.";
  return "Inventariado; aguardar decisão de produto.";
}

function mdEscape(value) {
  return compact(value).replace(/\|/g, "\\|");
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "não identificado";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function topList(obj, limit = 40) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit);
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`),
  ].join("\n");
}

const files = [...new Set(ROOTS.flatMap((dir) => walk(path.join(root, dir))))];
const raw = files.map((file) => {
  const rel = toRel(file);
  const stat = fs.statSync(file);
  const ext = path.extname(file).toLowerCase();
  const text = readText(file);
  return { file, rel, ext, size: stat.size, hash: sha256(file), text };
});

const codeFacts = extractCodeFacts(raw.filter((item) => TEXT_EXT.has(item.ext)));
const hashGroups = raw.reduce((acc, item) => {
  if (!item.hash) return acc;
  acc[item.hash] ||= [];
  acc[item.hash].push(item.rel);
  return acc;
}, {});

const materials = raw.map((item) => {
  const [kind, subtype] = detectContentType(item.rel, item.ext, item.text);
  const objective = detectObjective(item.rel, item.text);
  const discipline = detectDiscipline(item.rel, item.text, kind);
  const qStats = questionStats(item.text);
  const refs = findReferences(item.rel, path.basename(item.rel), codeFacts);
  const explicitConnected =
    refs.length > 0 ||
    /src\/data\/apostilas\//.test(item.rel) ||
    /src\/data\/mock|src\/data\/taf_exercicios/.test(item.rel) ||
    /public\/leis|public\/questoes|public\/materiais|public\/flashcards/.test(item.rel);
  const route = routeForType(kind, item.rel);
  const isMock = /(^|\/)mock|mock[A-Z]|sample|amostra/i.test(item.rel);
  const duplicateList = (hashGroups[item.hash] || []).filter((rel) => rel !== item.rel);
  const needsUpdate = /vers[aã]o antiga|desatualizad|risco atualiza|texto consolidado|conferir edital|lei\s+n?[ºo.]?\s*\d|c[oó]digo|cf\/88/i.test(item.text);
  const unreadable = item.text === "" && ![".png", ".jpg", ".jpeg", ".webp", ".apkg", ".xlsx", ".docx", ".mp4", ".zip"].includes(item.ext);
  const confidence = objective.confidence === "alta" || discipline.confidence === "alta" || /metadata\.json|src\/data\/apostilas|src\/data\/mock|schema\.sql|schema\.prisma/.test(item.rel)
    ? "alta"
    : objective.confidence === "média" || discipline.confidence === "média"
      ? "média"
      : "baixa";
  const needsHumanReview =
    unreadable ||
    objective.value === "não identificado" ||
    discipline.value === "não identificado" ||
    kind === "conteúdo não identificado" ||
    item.ext === ".apkg" ||
    item.ext === ".docx" ||
    item.ext === ".xlsx";

  const material = {
    caminho: item.rel,
    nomeArquivo: path.basename(item.rel),
    extensao: item.ext || "sem extensão",
    tamanho: item.size,
    hash: item.hash,
    origem: item.rel.split("/")[0] || "raiz",
    formato: item.ext.replace(".", "").toUpperCase() || "arquivo",
    tipoConteudo: kind,
    subtipo: subtype,
    objetivo: objective.value,
    concurso: detectContest(item.rel, item.text, objective.value),
    cargo: detectCargo(item.rel, item.text),
    banca: detectBanca(item.rel, item.text),
    ano: detectYear(item.rel, item.text),
    disciplina: discipline.value,
    assunto: extractSubject(item.rel, item.text),
    subassunto: extractSubsubject(item.text) || "não identificado",
    titulo: extractTitle(item.rel, item.text),
    descricao: extractDescription(item.text),
    quantidadeCapitulos: Math.max(countRegex(item.text, /chapterIndex|chapterTitle|capitulo|capítulo|moduleTitle/g), Number(jsonField(item.text, "totalChapters") || 0)),
    quantidadeQuestoes: qStats.total,
    quantidadeFlashcards: Math.max(countRegex(item.text, /"frente"\s*:|"verso"\s*:|flashcards/g), item.ext === ".apkg" ? 0 : 0),
    quantidadeMapas: countRegex(item.text, /mapaMental|mapa mental|mapasMentais/gi),
    quantidadeSimulados: countRegex(item.text, /simulado|simulados/gi),
    leisCitadas: extractLaws(item.text),
    dataVersao: detectYear(item.rel, item.text) || "não identificada",
    situacao: "",
    nivelConfianca: confidence,
    evidenciaUtilizada: [objective.evidence, discipline.evidence, refs.length ? `referenciado por ${refs.slice(0, 3).join(", ")}` : ""].filter(Boolean).join("; "),
    componenteQueUtiliza: refs.filter((r) => /components|pages/.test(r)).slice(0, 6),
    rotaOndeAparece: route ? ROUTES[route] || route : "não identificada",
    tabelaBancoRelacionada: [...codeFacts.tables].map((t) => t.name).filter((name) => {
      const n = strip(name);
      const k = strip(kind);
      return (k.includes("quest") && n.includes("quest")) ||
        (k.includes("flash") && n.includes("flash")) ||
        (k.includes("lei") && n.includes("lei")) ||
        (k.includes("taf") && n.includes("taf")) ||
        (k.includes("revis") && n.includes("revis")) ||
        (k.includes("apostila") && /materiais|content/i.test(n));
    }),
    conectadoInterface: explicitConnected,
    disponivelAluno: explicitConnected && Boolean(route) && !/scripts|supabase|prisma|api|components\/animata/.test(item.rel),
    orfao: !explicitConnected && !/scripts|supabase|prisma|api|components|src\/pages|src\/services|src\/hooks|src\/contexts/.test(item.rel),
    duplicado: duplicateList.length > 0,
    duplicatas: duplicateList,
    mock: isMock,
    precisaAtualizacao: needsUpdate,
    precisaRevisaoHumana: needsHumanReview,
    acaoRecomendada: "",
    unreadable,
    questionStats: qStats,
  };
  material.situacao = statusFor({
    connectedToInterface: material.conectadoInterface,
    availableToStudent: material.disponivelAluno,
    kind,
    isMock,
    isDuplicate: material.duplicado,
    needsUpdate,
    needsHumanReview,
    isOrphan: material.orfao,
    confidence,
  });
  material.acaoRecomendada = actionFor({
    ...material,
    connectedToInterface: material.conectadoInterface,
    isDuplicate: material.duplicado,
    needsUpdate,
    needsHumanReview,
    isOrphan: material.orfao,
  });
  return material;
});

const questionSources = materials.filter((m) => /quest/i.test(`${m.tipoConteudo} ${m.subtipo} ${m.caminho}`) || m.quantidadeQuestoes > 0).map((m) => ({
  caminho: m.caminho,
  objetivo: m.objetivo,
  concurso: m.concurso,
  banca: m.banca,
  ano: m.ano,
  disciplina: m.disciplina,
  assunto: m.assunto,
  total: m.quantidadeQuestoes,
  validas: m.questionStats.validas,
  invalidas: m.questionStats.invalidas,
  duplicadas: 0,
  alternativas: m.questionStats.alternativas,
  respostaCorreta: m.questionStats.respostaCorreta,
  comentario: m.questionStats.comentario,
  fonte: m.questionStats.fonte,
  formato: m.questionStats.alternativas ? "múltipla escolha" : m.questionStats.respostaCorreta ? "certo/errado ou resposta textual" : "não identificado",
  integracao: m.conectadoInterface ? "conectado/local ou backend" : "órfão ou importação pendente",
}));

const exams = materials.filter((m) => ["prova", "gabarito"].includes(m.tipoConteudo)).map((m) => ({
  caminho: m.caminho,
  instituicao: m.objetivo,
  concurso: m.concurso,
  cargo: m.cargo,
  banca: m.banca,
  ano: m.ano,
  tipoProva: m.subtipo,
  versao: m.caminho.match(/tipo[-_\s]*(\d)/i)?.[1] || "não identificada",
  numeroQuestoes: m.quantidadeQuestoes || "não identificado",
  disciplinas: m.disciplina,
  gabaritoRelacionado: "",
  questoesExtraidas: "",
}));
for (const exam of exams) {
  const base = strip(exam.caminho).replace(/provas?.*/, "").replace(/gabaritos?.*/, "");
  exam.gabaritoRelacionado = exams.find((other) => other.tipoProva.includes("gabarito") && strip(other.caminho).startsWith(base))?.caminho || "";
  exam.questoesExtraidas = materials.find((m) => /questoes-extraidas/.test(m.caminho) && strip(m.caminho).startsWith(base))?.caminho || "";
}

const flashcards = materials.filter((m) => /flashcard|deck Anki/.test(`${m.tipoConteudo} ${m.subtipo} ${m.caminho}`));
const mentalMaps = materials.filter((m) => /mapa/.test(`${m.tipoConteudo} ${m.subtipo} ${m.caminho}`));
const laws = materials.filter((m) => /lei|leis|legislação|legislacao/.test(`${m.tipoConteudo} ${m.subtipo} ${m.caminho}`));
const simulations = materials.filter((m) => /simulado/.test(`${m.tipoConteudo} ${m.subtipo} ${m.caminho}`));
const pedagogicalTypes = new Set(["apostila", "banco de questões", "simulado", "prova", "gabarito", "lei seca", "redação", "material TAF", "revisão", "mapa mental", "flashcard", "deck Anki", "videoaula"]);
const pedagogicalMaterials = materials.filter((m) => pedagogicalTypes.has(m.tipoConteudo));
const orphanContent = materials.filter((m) => m.orfao);
const duplicates = materials.filter((m) => m.duplicado).map((m) => ({ caminho: m.caminho, hash: m.hash, duplicatas: m.duplicatas, tipo: "duplicata exata por hash" }));
const possibleDuplicates = Object.values(materials.reduce((acc, m) => {
  const key = strip(`${m.titulo} ${m.objetivo} ${m.concurso}`).replace(/\btipo\s*[1-4]\b/g, "").replace(/\s+/g, " ").trim();
  if (key.length > 12) (acc[key] ||= []).push(m.caminho);
  return acc;
}, {})).filter((group) => group.length > 1).slice(0, 200);

const objectives = topList(countBy(materials, "objetivo"), 200).map(([nome, quantidade]) => ({ nome, quantidade }));
const contests = topList(countBy(materials, "concurso"), 300).map(([nome, quantidade]) => ({ nome, quantidade }));
const positions = topList(countBy(materials, "cargo"), 100).map(([nome, quantidade]) => ({ nome, quantidade }));
const disciplines = topList(countBy(materials, "disciplina"), 200).map(([nome, quantidade]) => ({ nome, quantidade }));
const subjects = topList(countBy(materials, "assunto"), 500).map(([nome, quantidade]) => ({ nome, quantidade }));
const subtopics = topList(countBy(materials, "subassunto"), 500).map(([nome, quantidade]) => ({ nome, quantidade }));

function gapsByObjective() {
  return objectives.map((objective) => {
    const rows = materials.filter((m) => m.objetivo === objective.nome);
    const hasApostila = rows.some((m) => m.tipoConteudo === "apostila");
    const hasQuestions = rows.some((m) => m.quantidadeQuestoes > 0 || /quest/.test(m.tipoConteudo));
    const hasFlashcards = rows.some((m) => /flashcard|deck Anki/.test(m.tipoConteudo));
    const hasMaps = rows.some((m) => /mapa/.test(m.tipoConteudo));
    const hasSimulados = rows.some((m) => /simulado/.test(m.tipoConteudo));
    const hasLaws = rows.some((m) => /lei|legislação/.test(m.tipoConteudo));
    const lacunas = [
      !hasApostila && "sem apostilas identificadas",
      !hasQuestions && "sem banco de questões identificado",
      !hasFlashcards && "sem flashcards/decks identificados",
      !hasMaps && "sem mapas mentais identificados",
      !hasSimulados && "sem simulados identificados",
      !hasLaws && "sem leis/legislação vinculadas",
      rows.some((m) => m.orfao) && "possui conteúdos órfãos",
      rows.some((m) => m.precisaRevisaoHumana) && "possui itens que exigem revisão humana",
    ].filter(Boolean);
    return { objetivo: objective.nome, total: rows.length, lacunas };
  });
}

const gaps = gapsByObjective();

function sampleItem(m) {
  return {
    caminho: m.caminho,
    tipo: m.tipoConteudo,
    objetivo: m.objetivo,
    concurso: m.concurso,
    disciplina: m.disciplina,
    assunto: m.assunto,
    situacao: m.situacao,
    confianca: m.nivelConfianca,
    evidencia: m.evidenciaUtilizada,
  };
}

const manualValidation = {
  apostilasAmostra20: materials.filter((m) => m.tipoConteudo === "apostila").slice(0, 20).map(sampleItem),
  pdfsAmostra20: materials.filter((m) => m.extensao === ".pdf").slice(0, 20).map(sampleItem),
  jsonAmostra20: materials.filter((m) => m.extensao === ".json").slice(0, 20).map(sampleItem),
  questoesAmostra20: questionSources.slice(0, 20),
  todosApkg: materials.filter((m) => m.extensao === ".apkg").map(sampleItem),
  todasLeis: laws.map(sampleItem),
  todosObjetivos: objectives,
  prontosTecnicamente: materials.filter((m) => m.situacao.includes("pronto tecnicamente")).map(sampleItem),
  naoIdentificados: materials.filter((m) => m.tipoConteudo === "conteúdo não identificado" || m.objetivo === "não identificado" || m.disciplina === "não identificado").map(sampleItem),
};

const filterFindings = {
  objectiveIdMentions: codeFacts.codeTexts.filter((c) => /objective_id|objetivo_id|objectiveId|user\.objective|concurso_alvo|targetContest/.test(c.text)).map((c) => c.rel),
  tableHasObjectives: codeFacts.tables.some((t) => /objectives|objetivos/i.test(t.name)),
  tableHasMaterials: codeFacts.tables.some((t) => /materiais|materials|content/i.test(t.name)),
  queryFilesWithoutObjectiveFilter: codeFacts.codeTexts
    .filter((c) => /supabase\.from\(["'](questoes|materiais|leis|flashcard_decks|flashcards)["']\)/.test(c.text) && !/objective_id|objetivo_id|concurso_alvo|targetContest|concurso/.test(c.text))
    .map((c) => c.rel),
};

const summary = {
  arquivosAnalisados: materials.length,
  conteudosIdentificados: materials.filter((m) => m.tipoConteudo !== "conteúdo não identificado").length,
  objetivosEncontrados: objectives.length,
  concursosEncontrados: contests.length,
  cargosEncontrados: positions.length,
  bancasEncontradas: new Set(materials.map((m) => m.banca).filter((x) => x !== "não identificada")).size,
  disciplinasEncontradas: disciplines.length,
  assuntosEncontrados: subjects.length,
  subassuntosEncontrados: subtopics.length,
  apostilas: materials.filter((m) => m.tipoConteudo === "apostila").length,
  questoes: questionSources.reduce((acc, q) => acc + Number(q.total || 0), 0),
  fontesDeQuestoes: questionSources.length,
  provas: materials.filter((m) => m.tipoConteudo === "prova").length,
  gabaritos: materials.filter((m) => m.tipoConteudo === "gabarito").length,
  flashcards: flashcards.reduce((acc, m) => acc + Number(m.quantidadeFlashcards || 0), 0),
  decksOuFontesFlashcards: flashcards.length,
  mapasMentais: mentalMaps.length,
  leis: laws.length,
  simulados: simulations.length,
  conteudosConectados: pedagogicalMaterials.filter((m) => m.conectadoInterface).length,
  conteudosOrfaos: orphanContent.length,
  conteudosMock: materials.filter((m) => m.mock).length,
  duplicatasExatas: duplicates.length,
  possiveisDuplicatas: possibleDuplicates.length,
  conteudosNaoIdentificados: materials.filter((m) => m.tipoConteudo === "conteúdo não identificado" || m.objetivo === "não identificado").length,
  precisamAtualizacao: materials.filter((m) => m.precisaAtualizacao).length,
  requeremRevisaoHumana: materials.filter((m) => m.precisaRevisaoHumana).length,
  arquivosNaoLidos: materials.filter((m) => m.unreadable).length,
};

const json = {
  summary,
  objectives,
  contests,
  positions,
  disciplines,
  subjects,
  subtopics,
  materials,
  questions: questionSources,
  exams,
  flashcards,
  mentalMaps,
  laws,
  simulations,
  orphanContent,
  duplicates: [...duplicates, ...possibleDuplicates.map((group) => ({ tipo: "possível duplicata por título/objetivo", itens: group }))],
  gaps,
  databaseTables: codeFacts.tables,
  routes: codeFacts.routes,
  components: codeFacts.components,
  manualValidation,
  filterFindings,
  warnings: [
    "Auditoria estática: não acessa Supabase remoto nem storage privado.",
    "APKG, DOCX e planilhas foram inventariados, mas não tiveram conteúdo interno extraído.",
    "PDFs foram lidos por pdftotext nas primeiras páginas; PDFs escaneados podem ficar como não verificados.",
    "Classificações por caminho/nome/título são inferidas e exigem revisão humana quando a confiança não é alta.",
    "Tipos 1, 2, 3 e 4 de provas não foram excluídos nem tratados como duplicata por regra; apenas hash exato indica duplicata exata.",
    "A tabela normalizada de objetivos/objectives não foi presumida; o relatório lista apenas tabelas reais encontradas nos SQL/Prisma.",
  ],
};

const cols = [
  ["caminho", "caminho"],
  ["nome do arquivo", "nomeArquivo"],
  ["extensão", "extensao"],
  ["tamanho", "tamanho"],
  ["hash", "hash"],
  ["origem", "origem"],
  ["formato", "formato"],
  ["tipo", "tipoConteudo"],
  ["subtipo", "subtipo"],
  ["objetivo", "objetivo"],
  ["concurso", "concurso"],
  ["cargo", "cargo"],
  ["banca", "banca"],
  ["ano", "ano"],
  ["disciplina", "disciplina"],
  ["assunto", "assunto"],
  ["subassunto", "subassunto"],
  ["título", "titulo"],
  ["descrição", "descricao"],
  ["capítulos", "quantidadeCapitulos"],
  ["questões", "quantidadeQuestoes"],
  ["flashcards", "quantidadeFlashcards"],
  ["mapas", "quantidadeMapas"],
  ["simulados", "quantidadeSimulados"],
  ["leis citadas", "leisCitadas"],
  ["data/versão", "dataVersao"],
  ["situação", "situacao"],
  ["confiança", "nivelConfianca"],
  ["evidência", "evidenciaUtilizada"],
  ["componentes", "componenteQueUtiliza"],
  ["rota", "rotaOndeAparece"],
  ["tabelas", "tabelaBancoRelacionada"],
  ["conectado", "conectadoInterface"],
  ["órfão", "orfao"],
  ["duplicado", "duplicado"],
  ["mock", "mock"],
  ["precisa atualização", "precisaAtualizacao"],
  ["revisão humana", "precisaRevisaoHumana"],
  ["ação", "acaoRecomendada"],
];

function materialRow(m) {
  return cols.map(([, key]) => Array.isArray(m[key]) ? m[key].join("; ") : m[key]);
}

const inventoryTable = mdTable(cols.map(([h]) => h), materials.map(materialRow));
const objectiveTable = mdTable(["Objetivo", "Arquivos", "Apostilas", "Questões", "Provas", "Flashcards/decks", "Leis", "Órfãos"], objectives.map((o) => {
  const rows = materials.filter((m) => m.objetivo === o.nome);
  return [
    o.nome,
    rows.length,
    rows.filter((m) => m.tipoConteudo === "apostila").length,
    rows.reduce((acc, m) => acc + Number(m.quantidadeQuestoes || 0), 0),
    rows.filter((m) => m.tipoConteudo === "prova").length,
    rows.filter((m) => /flashcard|deck Anki/.test(m.tipoConteudo)).length,
    rows.filter((m) => /lei|legislação/.test(m.tipoConteudo)).length,
    rows.filter((m) => m.orfao).length,
  ];
}));
const disciplineTable = mdTable(["Disciplina", "Itens", "Objetivos principais"], disciplines.map((d) => {
  const rows = materials.filter((m) => m.disciplina === d.nome);
  const objs = topList(countBy(rows, "objetivo"), 5).map(([k, v]) => `${k} (${v})`).join(", ");
  return [d.nome, d.quantidade, objs];
}));

const validationSection = `## Validação manual e amostragem

Esta seção registra a amostragem exigida. A lista completa fica no JSON em \`manualValidation\`.

### 20 apostilas

${mdTable(["Caminho", "Objetivo", "Disciplina", "Situação", "Confiança"], manualValidation.apostilasAmostra20.map((m) => [m.caminho, m.objetivo, m.disciplina, m.situacao, m.confianca]))}

### 20 PDFs

${mdTable(["Caminho", "Tipo", "Objetivo", "Concurso", "Situação"], manualValidation.pdfsAmostra20.map((m) => [m.caminho, m.tipo, m.objetivo, m.concurso, m.situacao]))}

### 20 JSON

${mdTable(["Caminho", "Tipo", "Objetivo", "Disciplina", "Situação"], manualValidation.jsonAmostra20.map((m) => [m.caminho, m.tipo, m.objetivo, m.disciplina, m.situacao]))}

### 20 fontes de questões

${mdTable(["Caminho", "Objetivo", "Banca", "Disciplina", "Total", "Válidas"], manualValidation.questoesAmostra20.map((q) => [q.caminho, q.objetivo, q.banca, q.disciplina, q.total, q.validas]))}

### Todos os APKG

${mdTable(["Caminho", "Objetivo", "Situação"], manualValidation.todosApkg.map((m) => [m.caminho, m.objetivo, m.situacao]))}

### Todas as leis

${mdTable(["Caminho", "Objetivo", "Disciplina", "Situação"], manualValidation.todasLeis.map((m) => [m.caminho, m.objetivo, m.disciplina, m.situacao]))}

### Objetivos detectados

${mdTable(["Objetivo", "Quantidade"], manualValidation.todosObjetivos.map((o) => [o.nome, o.quantidade]))}

### Itens não identificados

Total: ${manualValidation.naoIdentificados.length}. Ver lista completa no JSON.
`;

const executive = `# Resumo executivo de conteúdo - VemAprovar

## Números gerais

- Arquivos analisados: ${summary.arquivosAnalisados}
- Conteúdos identificados: ${summary.conteudosIdentificados}
- Objetivos encontrados: ${summary.objetivosEncontrados}
- Concursos encontrados: ${summary.concursosEncontrados}
- Cargos encontrados: ${summary.cargosEncontrados}
- Bancas encontradas: ${summary.bancasEncontradas}
- Disciplinas encontradas: ${summary.disciplinasEncontradas}
- Assuntos encontrados: ${summary.assuntosEncontrados}
- Subassuntos encontrados: ${summary.subassuntosEncontrados}
- Apostilas: ${summary.apostilas}
- Questões estimadas em fontes locais: ${summary.questoes}
- Fontes de questões: ${summary.fontesDeQuestoes}
- Provas: ${summary.provas}
- Gabaritos: ${summary.gabaritos}
- Fontes/decks de flashcards: ${summary.decksOuFontesFlashcards}
- Mapas mentais: ${summary.mapasMentais}
- Leis/arquivos legislativos: ${summary.leis}
- Simulados: ${summary.simulados}
- Conteúdos conectados: ${summary.conteudosConectados}
- Conteúdos órfãos: ${summary.conteudosOrfaos}
- Conteúdos mock: ${summary.conteudosMock}
- Duplicatas exatas: ${summary.duplicatasExatas}
- Possíveis duplicatas: ${summary.possiveisDuplicatas}
- Conteúdos não identificados: ${summary.conteudosNaoIdentificados}
- Conteúdos que precisam de atualização: ${summary.precisamAtualizacao}
- Requerem revisão humana: ${summary.requeremRevisaoHumana}
- Arquivos não lidos internamente: ${summary.arquivosNaoLidos}

## Objetivos

${objectiveTable}

## Disciplinas

${disciplineTable}

## Limitações

${json.warnings.map((w) => `- ${w}`).join("\n")}

## Filtro por objetivo

- Arquivos com menções a objetivo/concurso do usuário: ${filterFindings.objectiveIdMentions.length}
- Tabela \`objectives/objetivos\` encontrada: ${filterFindings.tableHasObjectives ? "sim" : "não"}
- Tabela \`materiais/materials/content\` encontrada: ${filterFindings.tableHasMaterials ? "sim" : "não"}
- Consultas críticas sem filtro objetivo/concurso detectadas automaticamente: ${filterFindings.queryFilesWithoutObjectiveFilter.length}

${validationSection}
`;

const mainReport = `# Auditoria geral de conteúdo da plataforma VemAprovar

${executive}

## Tabela completa de inventário

${inventoryTable}
`;

const hierarchy = objectives.map((o) => {
  const rows = materials.filter((m) => m.objetivo === o.nome);
  const byContest = topList(countBy(rows, "concurso"), 80);
  return `## ${o.nome}\n\n${byContest.map(([contest]) => {
    const cRows = rows.filter((m) => m.concurso === contest);
    const byCargo = topList(countBy(cRows, "cargo"), 30);
    return `### ${contest}\n\n${byCargo.map(([cargo]) => {
      const cargoRows = cRows.filter((m) => m.cargo === cargo);
      const byDisc = topList(countBy(cargoRows, "disciplina"), 30);
      return `#### ${cargo}\n\n${byDisc.map(([disc]) => {
        const discRows = cargoRows.filter((m) => m.disciplina === disc);
        const bySubject = topList(countBy(discRows, "assunto"), 20);
        return `- ${disc}\n${bySubject.map(([subject, count]) => `  - ${subject}: ${count} conteúdo(s)`).join("\n")}`;
      }).join("\n")}`;
    }).join("\n\n")}`;
  }).join("\n\n")}`;
}).join("\n\n");

const bySubjectReport = mdTable(["Assunto", "Itens", "Objetivos", "Disciplinas"], subjects.map((s) => {
  const rows = materials.filter((m) => m.assunto === s.nome);
  return [
    s.nome,
    s.quantidade,
    topList(countBy(rows, "objetivo"), 5).map(([k, v]) => `${k} (${v})`).join(", "),
    topList(countBy(rows, "disciplina"), 5).map(([k, v]) => `${k} (${v})`).join(", "),
  ];
}));

const orphanReport = `# Conteúdos órfãos

Critério: arquivo de conteúdo sem referência direta em código/manifesto local e fora de diretórios puramente técnicos.

${mdTable(["Caminho", "Tipo", "Objetivo", "Disciplina", "Motivo", "Ação"], orphanContent.map((m) => [m.caminho, m.tipoConteudo, m.objetivo, m.disciplina, m.situacao, m.acaoRecomendada]))}
`;

const duplicatesReport = `# Duplicatas de conteúdo

## Duplicatas exatas por hash

${duplicates.length ? mdTable(["Caminho", "Duplicatas"], duplicates.map((d) => [d.caminho, d.duplicatas.join("; ")])) : "- Nenhuma duplicata exata encontrada."}

## Possíveis duplicatas por título/objetivo

${possibleDuplicates.length ? possibleDuplicates.map((group) => `- ${group.join("; ")}`).join("\n") : "- Nenhuma possível duplicata relevante encontrada."}
`;

const gapsReport = `# Lacunas por objetivo

${gaps.map((g) => `## ${g.objetivo}\n\n- Total de itens: ${g.total}\n${g.lacunas.length ? g.lacunas.map((x) => `- ${x}`).join("\n") : "- Nenhuma lacuna estrutural detectada automaticamente."}`).join("\n\n")}
`;

const integrationReport = `# Integração conteúdo-interface

## Rotas detectadas

${mdTable(["Rota", "Tipo", "Fonte", "Componente"], codeFacts.routes.map((r) => [r.route, r.type, r.source, r.component || ""]))}

## Tabelas detectadas

${mdTable(["Tabela/modelo", "Fontes"], codeFacts.tables.map((t) => [t.name, t.source.join("; ")]))}

## Conteúdos conectados

${mdTable(["Caminho", "Tipo", "Rota", "Componentes/serviços"], materials.filter((m) => m.conectadoInterface).map((m) => [m.caminho, m.tipoConteudo, m.rotaOndeAparece, m.componenteQueUtiliza.join("; ")]))}

## Conteúdos com possível risco de mistura de objetivos

${mdTable(["Caminho", "Objetivo", "Evidência", "Ação"], materials.filter((m) => m.objetivo === "aplicável a múltiplos objetivos" || (m.conectadoInterface && m.objetivo === "não identificado")).map((m) => [m.caminho, m.objetivo, m.evidenciaUtilizada, "verificar filtro por objetivo na tela/serviço"]))}

## Filtros por objetivo

- Arquivos com menção a objetivo/concurso do usuário: ${filterFindings.objectiveIdMentions.join("; ") || "nenhum"}
- Tabela objectives/objetivos encontrada: ${filterFindings.tableHasObjectives ? "sim" : "não"}
- Consultas sem filtro objetivo/concurso detectadas: ${filterFindings.queryFilesWithoutObjectiveFilter.join("; ") || "nenhuma"}
`;

const byDisciplineReport = `# Mapa de conteúdos por disciplina\n\n${disciplineTable}\n`;
const byObjectiveReport = `# Mapa de conteúdos por objetivo\n\n${objectiveTable}\n\n${hierarchy}\n`;
const byAssuntoReport = `# Mapa de conteúdos por assunto\n\n${bySubjectReport}\n`;

fs.writeFileSync(path.join(outDir, "auditoria-geral-plataforma.json"), JSON.stringify(json, null, 2), "utf8");
fs.writeFileSync(path.join(outDir, "auditoria-geral-plataforma.csv"), [cols.map(([h]) => csvEscape(h)).join(","), ...materials.map((m) => materialRow(m).map(csvEscape).join(","))].join("\n"), "utf8");
fs.writeFileSync(path.join(outDir, "auditoria-geral-plataforma.md"), mainReport, "utf8");
fs.writeFileSync(path.join(outDir, "mapa-conteudos-por-objetivo.md"), byObjectiveReport, "utf8");
fs.writeFileSync(path.join(outDir, "mapa-conteudos-por-disciplina.md"), byDisciplineReport, "utf8");
fs.writeFileSync(path.join(outDir, "mapa-conteudos-por-assunto.md"), byAssuntoReport, "utf8");
fs.writeFileSync(path.join(outDir, "conteudos-orfaos.md"), orphanReport, "utf8");
fs.writeFileSync(path.join(outDir, "duplicatas-conteudo.md"), duplicatesReport, "utf8");
fs.writeFileSync(path.join(outDir, "lacunas-por-objetivo.md"), gapsReport, "utf8");
fs.writeFileSync(path.join(outDir, "integracao-conteudo-interface.md"), integrationReport, "utf8");
fs.writeFileSync(path.join(outDir, "resumo-executivo-conteudo.md"), executive, "utf8");

console.log(JSON.stringify({
  arquivosCriados: [
    "reports/auditoria-geral-plataforma.md",
    "reports/auditoria-geral-plataforma.csv",
    "reports/auditoria-geral-plataforma.json",
    "reports/mapa-conteudos-por-objetivo.md",
    "reports/mapa-conteudos-por-disciplina.md",
    "reports/mapa-conteudos-por-assunto.md",
    "reports/conteudos-orfaos.md",
    "reports/duplicatas-conteudo.md",
    "reports/lacunas-por-objetivo.md",
    "reports/integracao-conteudo-interface.md",
    "reports/resumo-executivo-conteudo.md",
  ],
  summary,
  objetivos: objectives.map((o) => o.nome),
}, null, 2));
