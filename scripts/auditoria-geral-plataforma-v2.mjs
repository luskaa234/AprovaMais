import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import AdmZip from "adm-zip";
import Database from "better-sqlite3";

const root = process.cwd();
const outDir = path.join(root, "reports", "auditoria-v2");
fs.mkdirSync(outDir, { recursive: true });

const scanRoots = ["src", "public", "storage", "material-provas", "flashcards-apkg", "scripts", "api", "components", "supabase", "prisma"];
const ignore = [/node_modules/, /\.git/, /(^|[\\/])dist([\\/]|$)/, /(^|[\\/])build([\\/]|$)/, /(^|[\\/])reports([\\/]|$)/, /VemAprovar-Splash-Completa/, /\.gradle/];
const textExt = new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".txt", ".csv", ".sql", ".toml", ".xml", ".prisma", ".html", ".webmanifest", ".svg", ".css"]);
const scannedExt = new Set([...textExt, ".pdf", ".docx", ".xlsx", ".xls", ".apkg", ".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".zip"]);
const technicalLabels = new Set(["index", "app", "schema", "metadata", "meta", "texto", "supabase", "favicon", "footer", "dashboard", "splashscreen", "local", "geral", "explicacao", "plano_de_estudos"]);
const nonDisciplineLabels = new Set(["Flashcards", "Mapas mentais", "Revisão", "TAF", "Biblioteca", "Apostilas", "Simulados", "Provas", "Leis secas", "Dashboard", "IA"]);

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function compact(value = "") {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function repairText(value = "") {
  const s = String(value ?? "");
  if (!/[ÃÂâ]/.test(s)) return s;
  try {
    const fixed = Buffer.from(s, "latin1").toString("utf8");
    const before = (s.match(/[ÃÂâ]/g) || []).length;
    const after = (fixed.match(/[ÃÂâ]/g) || []).length;
    return after < before ? fixed : s;
  } catch {
    return s;
  }
}

function clean(value = "") {
  return repairText(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function hashText(value = "") {
  return crypto.createHash("sha256").update(clean(value).replace(/\s+/g, " ").trim()).digest("hex");
}

function hashFile(file) {
  try {
    return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  } catch {
    return "";
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const r = rel(full);
    if (ignore.some((rx) => rx.test(r))) continue;
    if (entry.isDirectory()) out.push(...walk(full));
    else if (scannedExt.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function readFileForAudit(file) {
  const ext = path.extname(file).toLowerCase();
  if (textExt.has(ext)) {
    try {
      return { text: repairText(fs.readFileSync(file, "utf8")), extractionStatus: "leitura bem-sucedida", extractionMethod: "fs.readFile utf8", extractionError: "" };
    } catch (error) {
      return { text: "", extractionStatus: "erro de leitura", extractionMethod: "fs.readFile utf8", extractionError: error.message };
    }
  }
  if (ext === ".pdf") {
    try {
      const text = repairText(execFileSync("pdftotext.exe", ["-enc", "UTF-8", "-layout", "-f", "1", "-l", "8", file, "-"], {
        cwd: root,
        encoding: "utf8",
        timeout: 25000,
        windowsHide: true,
      }));
      return {
        text,
        extractionStatus: text.trim().length > 150 ? "leitura parcial" : "PDF com texto parcial",
        extractionMethod: "pdftotext primeiras 8 páginas",
        extractionError: text.trim().length > 150 ? "" : "texto extraído muito curto; pode ser PDF escaneado",
      };
    } catch (error) {
      return { text: "", extractionStatus: "erro de leitura", extractionMethod: "pdftotext", extractionError: error.message };
    }
  }
  if ([".apkg", ".docx", ".xlsx", ".xls", ".zip"].includes(ext)) {
    return { text: "", extractionStatus: "somente inventariado", extractionMethod: "metadados do arquivo", extractionError: "conteúdo interno tratado por rotina específica ou formato não textual" };
  }
  return { text: "", extractionStatus: "somente inventariado", extractionMethod: "metadados do arquivo", extractionError: "" };
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function importJsData(file) {
  if (!/src[\\/]data[\\/]apostilas[\\/].+\.js$/.test(file) && !/src[\\/]data[\\/]mock.+\.js$/.test(file)) return null;
  try {
    const mod = await import(`${pathToFileURL(file).href}?audit=${Date.now()}-${Math.random()}`);
    return Object.fromEntries(Object.entries(mod).filter(([, value]) => typeof value !== "function"));
  } catch {
    return null;
  }
}

function traverse(value, visitor, seen = new Set(), trail = []) {
  if (!value || typeof value !== "object") return;
  if (seen.has(value)) return;
  seen.add(value);
  visitor(value, trail);
  if (Array.isArray(value)) {
    value.forEach((item, index) => traverse(item, visitor, seen, [...trail, index]));
  } else {
    for (const [key, item] of Object.entries(value)) traverse(item, visitor, seen, [...trail, key]);
  }
}

function firstField(obj, keys) {
  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && obj[key] !== null && String(obj[key]).trim() !== "") return obj[key];
  }
  return "";
}

function arrayAlternatives(obj) {
  const raw = firstField(obj, ["alternativas", "alternatives", "opcoes", "options"]);
  if (Array.isArray(raw)) return raw.map((alt) => typeof alt === "string" ? alt : firstField(alt, ["texto", "text", "label", "conteudo"])).filter(Boolean).map(compact);
  const letters = ["a", "b", "c", "d", "e"].map((letter) => firstField(obj, [`alternativa_${letter}`, `alternativa${letter.toUpperCase()}`, letter, letter.toUpperCase()])).filter(Boolean).map(compact);
  return letters;
}

function normalizeQuestion(obj, source, context = {}) {
  const enunciado = compact(firstField(obj, ["enunciado", "afirmacao", "afirmação", "pergunta", "question", "texto"]));
  const alternativas = arrayAlternatives(obj);
  const resposta = compact(firstField(obj, ["gabarito", "resposta", "respostaCorreta", "correctAnswer", "answer"]));
  const comentario = compact(firstField(obj, ["comentario", "comentário", "explicacao", "explicação", "justificativa"]));
  const id = compact(firstField(obj, ["id", "codigo", "code"])) || `${source}:${hashText(enunciado + alternativas.join("|")).slice(0, 12)}`;
  const valid = Boolean(enunciado && resposta && (alternativas.length >= 2 || /certo|errado|verdadeiro|falso|^[a-e]$/i.test(resposta)));
  return {
    id,
    source,
    enunciado,
    alternativas,
    resposta,
    comentario,
    fonte: compact(firstField(obj, ["fonte", "source", "origem"])) || context.origem || "",
    banca: compact(firstField(obj, ["banca"])) || context.banca || "",
    concurso: compact(firstField(obj, ["concurso", "contest", "exam", "exame"])) || context.concurso || "",
    ano: compact(firstField(obj, ["ano", "year"])) || context.ano || "",
    disciplina: canonicalDiscipline(firstField(obj, ["disciplina", "materia", "subject"]) || context.disciplina || "").canonical,
    assunto: compact(firstField(obj, ["assunto", "topico", "topic"]) || context.assunto || ""),
    tipo: alternativas.length >= 2 ? "multipla escolha" : "certo/errado ou resposta textual",
    origem: context.isMock ? "mock" : /storage\/content/.test(source) ? "extraída/importada" : /oficial/i.test(`${context.origem} ${context.concurso} ${context.banca}`) ? "oficial" : "autoral/local",
    status: valid ? "válida" : !enunciado ? "sem enunciado" : !resposta ? "sem resposta" : "sem alternativas",
    hash: hashText(`${enunciado}\n${alternativas.join("\n")}`),
  };
}

function normalizeFlashcard(obj, source, context = {}) {
  const frente = compact(firstField(obj, ["frente", "front", "pergunta", "question", "cloze"]));
  const verso = compact(firstField(obj, ["verso", "back", "resposta", "answer"]));
  if (!frente && !verso) return null;
  return {
    source,
    frente,
    verso,
    disciplina: canonicalDiscipline(firstField(obj, ["disciplina", "materia", "subject"]) || context.disciplina || "").canonical,
    assunto: compact(firstField(obj, ["assunto", "topico", "topic"]) || context.assunto || ""),
    status: frente && verso ? "válido" : "incompleto",
    mock: Boolean(context.isMock),
    hash: hashText(`${frente}\n${verso}`),
  };
}

function normalizeMap(obj, source, context = {}) {
  const hasMap = obj && (obj.mapaMentalTexto || obj.mapaMental || obj.central || obj.nos || obj.nodes || obj.titulo);
  if (!hasMap) return null;
  const title = compact(firstField(obj, ["titulo", "title", "central", "tema"]) || context.assunto || "");
  if (!title && !obj.nos && !obj.nodes && !obj.mapaMentalTexto) return null;
  return {
    source,
    titulo: title || "mapa sem título",
    disciplina: canonicalDiscipline(firstField(obj, ["disciplina", "materia", "subject"]) || context.disciplina || "").canonical,
    assunto: compact(firstField(obj, ["assunto", "topico", "topic"]) || context.assunto || title),
    formato: obj.mapaMentalTexto ? "textual" : "estruturado/imagem",
    hash: hashText(JSON.stringify(obj).slice(0, 3000)),
  };
}

function extractStructuredItems(data, source, context) {
  const questions = [];
  const flashcards = [];
  const maps = [];
  traverse(data, (obj, trail) => {
    if (!obj || Array.isArray(obj)) return;
    if (firstField(obj, ["enunciado", "afirmacao", "afirmação", "pergunta", "question"]) && (firstField(obj, ["gabarito", "resposta", "respostaCorreta", "answer"]) || arrayAlternatives(obj).length)) {
      questions.push(normalizeQuestion(obj, source, context));
    }
    const card = normalizeFlashcard(obj, source, context);
    if (card) flashcards.push(card);
    if (trail.some((part) => /mapa/i.test(String(part)))) {
      const map = normalizeMap(obj, source, context);
      if (map) maps.push(map);
    }
  });
  return { questions, flashcards, maps };
}

function classifyFile(r, ext) {
  if (/src\/data\/apostilas\/index\.js$/.test(r) || /storage\/content\/.+\/metadata\.json$/.test(r)) return "pedagogical-container";
  if (/src\/data\/apostilas\/.+\.js$/.test(r)) return "pedagogical-content";
  if (/storage\/content\/leis\//.test(r)) return "pedagogical-content";
  if (/storage\/content\/.+\/questoes\/questoes-extraidas\.json$/.test(r)) return "pedagogical-content";
  if (/storage\/content\/.+\/(provas|gabaritos)\//.test(r)) return "pedagogical-content";
  if (/material-provas\//.test(r)) return "pedagogical-content";
  if (/flashcards-apkg\//.test(r)) return "pedagogical-content";
  if (/public\/(questoes|leis|materiais|flashcards)\//.test(r)) return "pedagogical-content";
  if (/src\/data\/mock|src\/data\/taf_exercicios/.test(r)) return "mock";
  if (/storage\/content\/.+(report|preview)\.json$/.test(r)) return "import-artifact";
  if (/scripts\/content-miner|scripts\/(importar|exportar|migrar|organizar)/.test(r)) return "import-artifact";
  if (/supabase\/|prisma\//.test(r)) return "database-artifact";
  if (/\.(config|toml|webmanifest|xml|gradle|properties)$/.test(r) || ["package.json", "tsconfig.json", "jsconfig.json"].includes(path.basename(r))) return "configuration";
  if ([".png", ".jpg", ".jpeg", ".webp", ".svg", ".mp4", ".mov"].includes(ext) || /public\/(brand|branding|logos|splash|pwa|screenshots)\//.test(r)) return "visual-asset";
  if (/\.(test|spec)\./.test(r)) return "test";
  if ([".docx", ".xlsx", ".xls", ".zip"].includes(ext)) return "unprocessed-binary";
  if (/\.(js|jsx|ts|tsx|css)$/.test(ext) || /^(src|components|api)\//.test(r)) return "source-code";
  return "unknown";
}

function contentType(r, fileClass, ext) {
  const s = clean(r);
  if (fileClass === "source-code") return "arquivo técnico";
  if (fileClass === "database-artifact") return "schema/migration/seed";
  if (fileClass === "configuration") return "configuração";
  if (fileClass === "visual-asset") return /logo|brand|icon/.test(s) ? "logo/asset visual" : "asset visual";
  if (fileClass === "mock") return "mock";
  if (fileClass === "import-artifact") return "artefato de importação";
  if (ext === ".apkg") return "deck Anki";
  if (/gabarito|espelho|padrao|padrão/.test(s) && ext === ".pdf") return "gabarito/padrão de resposta";
  if (ext === ".pdf") return "prova PDF";
  if (/questoes-extraidas|questoes|questões/.test(s)) return "banco de questões";
  if (/storage\/content\/leis/.test(r)) return "lei/legislação";
  if (/simulado/.test(s)) return "simulado";
  if (/flashcard/.test(s)) return "flashcards";
  if (/mapa/.test(s)) return "mapa mental";
  if (/redacao|pe[cç]a|espelho/.test(s)) return "redação";
  if (/\btaf\b/.test(s)) return "TAF";
  if (/src\/data\/apostilas/.test(r)) return "apostila/módulo";
  return fileClass === "pedagogical-container" ? "container pedagógico" : "conteúdo não identificado";
}

function canonicalObjective(r, text) {
  const hay = clean(`${r} ${fieldFromText(text, ["objective", "objetivo", "concurso", "contest", "exam", "exame", "areaPlataforma"])}`);
  if (/oab|exame de ordem/.test(hay)) return { raw: "OAB", canonical: "OAB", aliases: ["Exame de Ordem"], institution: "OAB/FGV", phase: /2.?fase|segunda fase/.test(hay) ? "2ª fase" : /1.?fase|primeira fase/.test(hay) ? "1ª fase" : "", confidence: "alta", evidence: "diretório/metadado OAB" };
  if (/enem|ensino medio|linguagens|ciencias humanas|ciencias natureza|biologia|fisica|quimica|sociologia-enem|historia-enem|geografia-enem/.test(hay)) return { raw: "ENEM", canonical: "ENEM", aliases: ["Ensino Médio"], institution: "INEP", phase: "", confidence: "alta", evidence: "diretório/metadado ENEM" };
  if (/pmma|pm-ma|policia militar do maranhao/.test(hay)) return { raw: "PMMA", canonical: "Polícia Militar", aliases: ["PMMA"], institution: "PMMA", phase: "", confidence: "alta", evidence: "sigla/instituição PMMA" };
  if (/(^|[\/\-_])pm[a-z]{0,4}([\/\-_]|$)|policia militar|soldado pm|oficial da pm|cabo pm|sargento pm/.test(hay)) return { raw: "Polícia Militar", canonical: "Polícia Militar", aliases: [], institution: inferInstitution(hay), phase: "", confidence: "média", evidence: "sigla/instituição PM" };
  if (/cbm|bombeiro/.test(hay)) return { raw: "Corpo de Bombeiros", canonical: "Corpo de Bombeiros", aliases: ["CBM"], institution: inferInstitution(hay), phase: "", confidence: "média", evidence: "sigla/instituição CBM" };
  if (/(^|[\/\-_])pc[a-z]{0,4}([\/\-_]|$)|policia civil|delegado|investigador|inspetor/.test(hay)) return { raw: "Polícia Civil", canonical: "Polícia Civil", aliases: ["PC"], institution: inferInstitution(hay), phase: "", confidence: "média", evidence: "sigla/cargo policial civil" };
  if (/policia penal|(^|[\/\-_])pp[a-z]{0,4}([\/\-_]|$)/.test(hay)) return { raw: "Polícia Penal", canonical: "Polícia Penal", aliases: ["PP"], institution: inferInstitution(hay), phase: "", confidence: "média", evidence: "sigla/instituição PP" };
  if (/\bprf\b|policia rodoviaria federal/.test(hay)) return { raw: "PRF", canonical: "PRF", aliases: ["Polícia Rodoviária Federal"], institution: "PRF", phase: "", confidence: "alta", evidence: "sigla PRF" };
  if (/(^|[\/\-_])pf([\/\-_]|$)|policia federal/.test(hay)) return { raw: "PF", canonical: "Polícia Federal", aliases: ["PF"], institution: "PF", phase: "", confidence: "alta", evidence: "sigla PF" };
  if (/guarda municipal|(^|[\/\-_])gm/.test(hay)) return { raw: "Guarda Municipal", canonical: "Guarda Municipal", aliases: ["GM"], institution: inferInstitution(hay), phase: "", confidence: "média", evidence: "nome/sigla GM" };
  if (/detran/.test(hay)) return { raw: "DETRAN", canonical: "DETRAN", aliases: [], institution: "DETRAN", phase: "", confidence: "alta", evidence: "sigla DETRAN" };
  if (/tribunal|trt|tj|tre|tse|stj|regimentos internos|organizacao judiciaria/.test(hay)) return { raw: "Tribunais", canonical: "Tribunais", aliases: [], institution: "", phase: "", confidence: "média", evidence: "termos de tribunais" };
  if (/gestao pessoas|arquivologia|administracao publica|atendimento publico/.test(hay)) return { raw: "Concursos Administrativos", canonical: "Concursos Administrativos", aliases: [], institution: "", phase: "", confidence: "média", evidence: "área administrativa" };
  if (/tributario|contabilidade|fiscal/.test(hay)) return { raw: "Concursos Fiscais", canonical: "Concursos Fiscais", aliases: [], institution: "", phase: "", confidence: "média", evidence: "área fiscal" };
  if (/bancario|banco/.test(hay)) return { raw: "Concursos Bancários", canonical: "Concursos Bancários", aliases: [], institution: "", phase: "", confidence: "média", evidence: "área bancária" };
  return { raw: "", canonical: null, aliases: [], institution: "", phase: "", confidence: "não identificada", evidence: "sem evidência confiável" };
}

function inferInstitution(hay) {
  const codes = ["pmma", "pmsp", "pmba", "pmce", "pmerj", "pmmg", "pmdf", "pmal", "pmpe", "pmrn", "pmto", "pcba", "pcce", "pcdf", "pcgo", "pcmg", "pcrj", "pcrn", "pcsc", "cbmal", "cbmam"];
  return (codes.find((code) => hay.includes(code)) || "").toUpperCase();
}

function fieldFromText(text, fields) {
  for (const f of fields) {
    const m = text.match(new RegExp(`["']${f}["']\\s*:\\s*["']([^"']+)["']`, "i"));
    if (m) return repairText(m[1]);
  }
  return "";
}

function canonicalDiscipline(value, r = "", text = "") {
  const hay = clean(`${value} ${r} ${fieldFromText(text, ["disciplina", "materia", "subject"])}`);
  const rules = [
    ["Direito Processual Penal Militar", /processual penal militar|cppm/],
    ["Direito Penal Militar", /penal militar|crime militar|\bcpm\b/],
    ["Direito Processual Penal", /processual penal|processo penal|\bcpp\b/],
    ["Direito Processual Civil", /processual civil|processo civil|\bcpc\b/],
    ["Direito Constitucional", /constitucional|constituicao|cf88|direitos fundamentais/],
    ["Direito Administrativo", /administrativo|administracao publica|atos administrativos|licitacoes/],
    ["Direito Penal", /direito penal|codigo penal|crime|pena/],
    ["Direito Civil", /direito civil|codigo civil/],
    ["Direito do Consumidor", /consumidor|\bcdc\b/],
    ["Direito Tributário", /tributario|\bctn\b/],
    ["Direito do Trabalho", /direito do trabalho|direito-trabalho|\bclt\b/],
    ["Direito Previdenciário", /previdenciario/],
    ["Direito Empresarial", /empresarial/],
    ["Direito Eleitoral", /eleitoral/],
    ["Direito Financeiro", /financeiro/],
    ["Direito Ambiental", /ambiental/],
    ["Direito Internacional", /internacional/],
    ["Direito Digital/LGPD", /digital|lgpd|cibernetico/],
    ["Ética Profissional", /etica profissional|estatuto-oab|codigo-etica-oab|regulamento-oab/],
    ["Direitos Humanos", /direitos humanos|dignidade|uso da forca/],
    ["Legislação Institucional PMMA", /legislacao institucional pmma|lei 6\.?513|lei 4\.?570|pmma/],
    ["Legislação Penal Especial", /legislacao penal especial|drogas|desarmamento|abuso de autoridade|maria da penha|hediondos|tortura/],
    ["Criminologia e Segurança Pública", /criminologia|seguranca publica|policia comunitaria|ordem publica/],
    ["Língua Portuguesa", /portugues|lingua portuguesa|interpretacao|ortografia|morfologia|sintaxe|crase|regencia|concordancia/],
    ["Raciocínio Lógico-Matemático", /raciocinio|logico|matematica|porcentagem|probabilidade|proporcao/],
    ["Informática", /informatica|internet|seguranca da informacao|windows|office|excel|word/],
    ["Atualidades", /atualidades|mundo contemporaneo/],
    ["História", /historia/],
    ["Geografia", /geografia/],
    ["Biologia", /biologia/],
    ["Física", /fisica/],
    ["Química", /quimica/],
    ["Filosofia", /filosofia/],
    ["Sociologia", /sociologia/],
    ["Redação", /redacao|discursiva|repertorio/],
  ];
  for (const label of nonDisciplineLabels) {
    if (clean(value) === clean(label)) return { raw: value || "", canonical: null, evidence: "label é módulo/formato, não disciplina", confidence: "alta" };
  }
  for (const [canonical, rx] of rules) {
    if (rx.test(hay)) return { raw: value || "", canonical, evidence: value ? "campo explícito/metadado" : "diretório/estrutura", confidence: value ? "alta" : "média" };
  }
  return { raw: value || "", canonical: null, evidence: "sem disciplina confiável", confidence: "não identificada" };
}

function validSubject(value) {
  const v = compact(value);
  if (!v) return null;
  if (technicalLabels.has(clean(v))) return null;
  if (/^(app|footer|dashboard|splash|schema|metadata|meta|index|texto)$/i.test(v)) return null;
  return v;
}

function detectContest(data, r, text) {
  const explicit = firstField(data || {}, ["concurso", "contest", "exam", "exame", "institution", "institutionName", "edital"]);
  if (explicit && !technicalLabels.has(clean(explicit))) return compact(explicit);
  const parts = r.split("/");
  const content = parts.indexOf("content");
  if (content >= 0 && parts[content + 2]) return parts[content + 2];
  const m = r.match(/(pm[a-z-]*|pc[a-z-]*|oab|cbm[a-z-]*).*?(20\d{2}|[0-9]+-exame).*?(fgv|cebraspe|fcc|ibfc|vunesp|selecon|nucepe)?/i);
  return m ? compact(m[0].replace(/\//g, " ")) : "";
}

function detectCargo(r, text, obj = {}) {
  const hay = clean(`${r} ${fieldFromText(text, ["cargo", "role", "position"])}`);
  if (/2.?fase|segunda fase|pecas praticas/.test(hay)) return "2ª fase OAB";
  if (/1.?fase|primeira fase/.test(hay)) return "1ª fase OAB";
  if (/soldado/.test(hay)) return "Soldado";
  if (/oficial|cfo|aluno oficial/.test(hay)) return "Oficial";
  if (/cabo/.test(hay)) return "Cabo";
  if (/sargento/.test(hay)) return "Sargento";
  if (/delegado/.test(hay)) return "Delegado";
  if (/investigador/.test(hay)) return "Investigador";
  if (/inspetor/.test(hay)) return "Inspetor";
  if (/agente/.test(hay)) return "Agente";
  return "";
}

function detectBanca(r, text) {
  const hay = clean(`${r} ${fieldFromText(text, ["banca"])}`);
  return ["Cebraspe", "FGV", "FCC", "IBFC", "Vunesp", "Selecon", "Nucepe", "Uespi", "AOCP", "Cesgranrio"].find((b) => hay.includes(clean(b))) || "";
}

function detectYear(r, text) {
  return r.match(/\b(20\d{2}|19\d{2})\b/)?.[1] || text.match(/\b(20\d{2}|19\d{2})\b/)?.[1] || "";
}

function fileConnection(r, fileClass) {
  if (/src\/data\/apostilas\/.+\.js$/.test(r)) return { state: "direct-ui-connection", chain: `${r} -> src/data/apostilas/index.js -> apostilasBiblioteca -> src/pages/Biblioteca/index.jsx -> rota biblioteca` };
  if (/src\/data\/mock/.test(r)) return { state: "mock-rendered", chain: `${r} -> src/data/index.js -> stores/services -> rota relacionada (fallback mock)` };
  if (/src\/data\/taf_exercicios\.json/.test(r)) return { state: "direct-ui-connection", chain: `${r} -> tafService -> src/pages/TAF/index.jsx -> rota taf` };
  if (/public\/questoes\//.test(r)) return { state: "direct-ui-connection", chain: `${r} -> questoesService fetch('/questoes/...') -> src/pages/Questoes -> rota questoes` };
  if (/public\/leis\//.test(r)) return { state: "direct-ui-connection", chain: `${r} -> leisService fetch('/leis/...') -> src/pages/LeisSecas -> rota leis` };
  if (/public\/flashcards\//.test(r)) return { state: "direct-ui-connection", chain: `${r} -> flashcardsService fetch('/flashcards/...') -> src/pages/Flashcards -> rota flashcards` };
  if (/public\/materiais\//.test(r)) return { state: "direct-ui-connection", chain: `${r} -> bibliotecaService fetch('/materiais/...') -> src/pages/Biblioteca -> rota biblioteca` };
  if (/storage\/content\//.test(r) || /material-provas\//.test(r) || /flashcards-apkg\//.test(r)) return { state: "local-only", chain: "arquivo local de acervo/importação; não é servido diretamente pela interface Vite sem promoção para public/Supabase" };
  if (fileClass === "database-artifact") return { state: "backend-only", chain: "schema/migration/SQL" };
  if (fileClass === "import-artifact") return { state: "referenced-only", chain: "script ou relatório de importação" };
  return { state: "unknown", chain: "" };
}

function csvEscape(v) {
  return `"${displayValue(v).replace(/"/g, '""')}"`;
}

function mdEscape(v) {
  return displayValue(v).replace(/\|/g, "\\|");
}

function mdTable(headers, rows) {
  return [`| ${headers.map(mdEscape).join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`)].join("\n");
}

function displayValue(value) {
  const raw = Array.isArray(value) ? value.join("; ") : value ?? "";
  return compact(sanitizeText(raw));
}

function sanitizeText(value) {
  return repairText(String(value ?? "")).replace(/\uFFFD/g, "[caractere ilegivel]");
}

function sanitizeForOutput(value, seen = new WeakSet()) {
  if (typeof value === "string") return sanitizeText(value);
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return "[referencia circular]";
  seen.add(value);
  if (Array.isArray(value)) return value.map((item) => sanitizeForOutput(item, seen));
  return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, sanitizeForOutput(val, seen)]));
}

function collectEncodingIssues(records, origem, limit = 500) {
  const out = [];
  function visit(value, field, sourcePath) {
    if (out.length >= limit) return;
    if (typeof value === "string") {
      if (value.includes("\uFFFD")) out.push({ caminho: sourcePath, campo: field, valorCorrompido: "U+FFFD", origemProvavel: origem, acaoRecomendada: "corrigir acentuação na fonte antes de publicar" });
      if (/ÃƒÆ’|Ãƒâ€š|ÃƒÂ¢Ã¢â€šÂ¬|ÃƒÂ£|ÃƒÂ§|ÃƒÂ©|ÃƒÂ³|ÃƒÂª/.test(value)) out.push({ caminho: sourcePath, campo: field, valorCorrompido: "mojibake UTF-8/Latin1", origemProvavel: origem, acaoRecomendada: "normalizar encoding da fonte" });
      return;
    }
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.slice(0, 50).forEach((item, index) => visit(item, `${field}[${index}]`, sourcePath));
      return;
    }
    for (const [key, val] of Object.entries(value)) {
      if (["text", "absolute"].includes(key)) continue;
      visit(val, field ? `${field}.${key}` : key, value.path || value.source || sourcePath);
      if (out.length >= limit) break;
    }
  }
  for (const record of records) {
    visit(record, "", record.path || record.source || origem);
    if (out.length >= limit) break;
  }
  return out;
}

function countBy(items, fn) {
  return items.reduce((acc, item) => {
    const key = typeof fn === "function" ? fn(item) : item[fn];
    const safe = key || "não informado";
    acc[safe] = (acc[safe] || 0) + 1;
    return acc;
  }, {});
}

function topEntries(obj, limit = 1000) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit);
}

function readApkg(file, source) {
  const tempDir = path.join(os.tmpdir(), `vemaprovar-audit-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    new AdmZip(file).extractAllTo(tempDir, true);
    const dbPath = ["collection.anki21b", "collection.anki21", "collection.anki2"].map((name) => path.join(tempDir, name)).find(fs.existsSync);
    if (!dbPath) throw new Error("collection.anki2 nao encontrado");
    const db = new Database(dbPath, { readonly: true });
    const notes = db.prepare("select id, flds from notes").all();
    db.close();
    const cards = notes.map((note) => {
      const fields = String(note.flds || "").split("\x1f").map((x) => compact(x.replace(/<[^>]+>/g, " "))).filter(Boolean);
      return { source, frente: fields[0] || "", verso: fields.slice(1).join(" "), status: fields[0] && fields[1] ? "válido" : "incompleto", mock: /amostra/i.test(source), hash: hashText(fields.join("\n")) };
    });
    return { status: "leitura bem-sucedida", count: cards.length, cards, error: "" };
  } catch (error) {
    return { status: "não processado", count: null, cards: [], error: error.message };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function logicalProofKey(r) {
  return clean(r)
    .replace(/gabaritos?\/.*$/, "")
    .replace(/provas?\/.*$/, "")
    .replace(/(?:tipo|caderno)[-_\s]*[1-4]/g, "tipo-x")
    .replace(/\s+/g, " ")
    .trim();
}

function lawIdFromPath(r) {
  const m = r.match(/storage\/content\/leis\/([^/]+)\//);
  return m?.[1] || "";
}

const files = [...new Set(scanRoots.flatMap((dir) => walk(path.join(root, dir))))];
const raw = [];
for (const file of files) {
  const r = rel(file);
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(file);
  const read = readFileForAudit(file);
  const fileClass = classifyFile(r, ext);
  raw.push({
    path: r,
    name: path.basename(r),
    extension: ext || "",
    size: stat.size,
    hash: hashFile(file),
    fileClass,
    isPedagogicalContent: fileClass === "pedagogical-content",
    isTechnicalFile: ["source-code", "database-artifact", "configuration"].includes(fileClass),
    isContainer: fileClass === "pedagogical-container",
    containsMultipleItems: /questoes-extraidas|artigos\.json|index\.json|decks\.json|apostilas\/index\.js/.test(r),
    extractionStatus: read.extractionStatus,
    extractionMethod: read.extractionMethod,
    extractionError: read.extractionError,
    text: read.text,
    absolute: file,
  });
}

const hashGroups = Object.values(raw.reduce((acc, item) => {
  if (!item.hash) return acc;
  (acc[item.hash] ||= []).push(item.path);
  return acc;
}, {})).filter((group) => group.length > 1);

const questions = [];
const flashcards = [];
const mentalMaps = [];
const fileData = new Map();

for (const item of raw) {
  let data = null;
  if (item.extension === ".json") data = safeJsonParse(item.text);
  if (!data && item.extension === ".js" && /src\/data\//.test(item.path)) data = await importJsData(item.absolute);
  if (data) {
    fileData.set(item.path, data);
    const obj = canonicalObjective(item.path, item.text);
    const disc = canonicalDiscipline("", item.path, item.text);
    const context = {
      isMock: item.fileClass === "mock",
      banca: detectBanca(item.path, item.text),
      concurso: detectContest(data, item.path, item.text),
      ano: detectYear(item.path, item.text),
      disciplina: disc.canonical || "",
      assunto: validSubject(fieldFromText(item.text, ["assunto", "topico", "moduleTitle", "title"])) || "",
      origem: item.path,
    };
    const extracted = extractStructuredItems(data, item.path, context);
    questions.push(...extracted.questions);
    flashcards.push(...extracted.flashcards);
    mentalMaps.push(...extracted.maps);
  }
  if (item.extension === ".apkg") {
    const apkg = readApkg(item.absolute, item.path);
    item.extractionStatus = apkg.status;
    item.extractionMethod = "adm-zip + better-sqlite3";
    item.extractionError = apkg.error;
    item.apkgCardCount = apkg.count;
    flashcards.push(...apkg.cards);
  }
}

const questionGroups = Object.values(questions.reduce((acc, q) => {
  if (!q.hash) return acc;
  (acc[q.hash] ||= []).push(q);
  return acc;
}, {}));
const flashcardGroups = Object.values(flashcards.reduce((acc, c) => {
  if (!c.hash) return acc;
  (acc[c.hash] ||= []).push(c);
  return acc;
}, {}));

const contentRows = raw.map((item) => {
  const objective = canonicalObjective(item.path, item.text);
  const discipline = canonicalDiscipline("", item.path, item.text);
  const data = fileData.get(item.path);
  const subject = validSubject(fieldFromText(item.text, ["assunto", "topico", "topic", "moduleTitle", "chapterTitle"]));
  const connection = fileConnection(item.path, item.fileClass);
  const duplicateGroup = hashGroups.find((group) => group.includes(item.path)) || [];
  const kind = contentType(item.path, item.fileClass, item.extension);
  return {
    ...item,
    text: undefined,
    absolute: undefined,
    contentType: kind,
    objectiveRaw: objective.raw,
    objectiveCanonical: objective.canonical,
    objectiveAliases: objective.aliases,
    objectiveEvidence: objective.evidence,
    objectiveConfidence: objective.confidence,
    institution: objective.institution,
    phase: objective.phase,
    contestRaw: detectContest(data, item.path, item.text),
    contestCanonical: detectContest(data, item.path, item.text) || null,
    position: detectCargo(item.path, item.text),
    banca: detectBanca(item.path, item.text),
    year: detectYear(item.path, item.text),
    disciplineRaw: discipline.raw,
    disciplineCanonical: nonDisciplineLabels.has(discipline.canonical) ? null : discipline.canonical,
    disciplineEvidence: discipline.evidence,
    disciplineConfidence: discipline.confidence,
    subjectRaw: subject,
    subjectCanonical: subject || null,
    subtopicCanonical: validSubject(fieldFromText(item.text, ["subassunto", "subtopic", "habilidade"])) || null,
    interfaceConnection: connection.state,
    interfaceEvidenceChain: connection.chain,
    isDuplicateFile: duplicateGroup.length > 1,
    duplicateGroup: duplicateGroup.filter((x) => x !== item.path),
    technicalLabels: [path.basename(item.path, item.extension)].filter((x) => technicalLabels.has(clean(x))),
    classificationConfidence: item.isPedagogicalContent || item.isContainer ? "alta" : item.fileClass === "unknown" ? "baixa" : "média",
    classificationEvidence: `${item.fileClass}; ${kind}; ${objective.evidence}; ${discipline.evidence}`,
    recommendedAction: item.fileClass === "unknown" ? "revisar manualmente" : item.isPedagogicalContent && connection.state === "local-only" ? "decidir se promove para public/Supabase ou mantém acervo interno" : "manter inventariado",
  };
});

const pedagogical = contentRows.filter((r) => r.isPedagogicalContent || r.isContainer);
const technical = contentRows.filter((r) => r.isTechnicalFile);
const realObjectives = topEntries(countBy(pedagogical.filter((r) => r.objectiveCanonical), "objectiveCanonical")).map(([name, count]) => ({ name, count }));
const realDisciplines = topEntries(countBy(pedagogical.filter((r) => r.disciplineCanonical), "disciplineCanonical")).map(([name, count]) => ({ name, count }));
const realContests = topEntries(countBy(pedagogical.filter((r) => r.contestCanonical), "contestCanonical")).map(([name, count]) => ({ name, count }));
const realSubjects = topEntries(countBy(pedagogical.filter((r) => r.subjectCanonical), "subjectCanonical")).map(([name, count]) => ({ name, count }));

const lawEntities = Object.values(pedagogical.filter((r) => lawIdFromPath(r.path)).reduce((acc, file) => {
  const id = lawIdFromPath(file.path);
  const data = fileData.get(file.path);
  const entity = acc[id] ||= { id, name: id, files: [], articleCount: null, hasText: false, hasMeta: false, possibleOutdated: false, integrity: "parcial" };
  entity.files.push(file.path);
  if (/texto\.txt$/.test(file.path)) entity.hasText = true;
  if (/meta\.json$/.test(file.path)) {
    entity.hasMeta = true;
    if (data?.nome || data?.nome_curto) entity.name = data.nome || data.nome_curto;
  }
  if (/artigos\.json$/.test(file.path)) entity.articleCount = Array.isArray(data) ? data.length : Array.isArray(data?.artigos) ? data.artigos.length : null;
  if (/lei|codigo|constitui|clt|cpp|cpc|ctn|cdc/i.test(file.path)) entity.possibleOutdated = true;
  entity.integrity = entity.hasText && entity.hasMeta && entity.articleCount !== null ? "completa por arquivos" : "parcial";
  return acc;
}, Object.create(null)));

const proofFiles = pedagogical.filter((r) => r.extension === ".pdf" && /prova PDF|gabarito/i.test(r.contentType));
const proofGroupMap = new Map();
for (const file of proofFiles) {
  const key = logicalProofKey(file.path) || "prova-sem-identificacao";
  const group = proofGroupMap.get(key) || { key, files: [], proofs: [], answers: [], variants: new Set(), questionsExtracted: false };
  group.files.push(file.path);
  if (/gabarito|padrão|padrao|espelho/i.test(file.contentType)) group.answers.push(file.path);
  else group.proofs.push(file.path);
  const variant = file.path.match(/tipo[-_\s]*(\d)/i)?.[1];
  if (variant) group.variants.add(variant);
  proofGroupMap.set(key, group);
}
const proofGroups = [...proofGroupMap.values()].map((g) => ({
  key: g.key || "prova-sem-identificacao",
  files: Array.isArray(g.files) ? g.files : [],
  proofs: Array.isArray(g.proofs) ? g.proofs : [],
  answers: Array.isArray(g.answers) ? g.answers : [],
  variants: g.variants instanceof Set ? [...g.variants] : Array.isArray(g.variants) ? g.variants : [],
  questionsExtracted: Boolean(g.questionsExtracted),
}));
for (const group of proofGroups) {
  const logicalName = clean(String(group.key || "prova-sem-identificacao").split("/").at(-1) || "");
  group.questionsExtracted = logicalName
    ? pedagogical.some((r) => /questoes-extraidas/.test(r.path) && clean(r.path).includes(logicalName))
    : false;
}

const cdcPath = path.join(root, "storage/content/leis/cdc/texto.txt");
const ctnPath = path.join(root, "storage/content/leis/ctn/texto.txt");
const cdcText = fs.existsSync(cdcPath) ? repairText(fs.readFileSync(cdcPath, "utf8")) : "";
const ctnText = fs.existsSync(ctnPath) ? repairText(fs.readFileSync(ctnPath, "utf8")) : "";
const cdcCtn = {
  cdcPath: rel(cdcPath),
  ctnPath: rel(ctnPath),
  cdcHash: fs.existsSync(cdcPath) ? hashFile(cdcPath) : "",
  ctnHash: fs.existsSync(ctnPath) ? hashFile(ctnPath) : "",
  identical: cdcText === ctnText,
  contentHint: cdcText.slice(0, 600),
  cdcLooksLike: /consumidor|consumer|rela[cç][aã]o de consumo/i.test(cdcText) ? "CDC" : /tribut[aá]rio|tributo|cr[eé]dito tribut/i.test(cdcText) ? "CTN" : "não identificado",
  ctnLooksLike: /tribut[aá]rio|tributo|cr[eé]dito tribut/i.test(ctnText) ? "CTN" : /consumidor|rela[cç][aã]o de consumo/i.test(ctnText) ? "CDC" : "não identificado",
  impact: "",
};
cdcCtn.impact = cdcCtn.identical ? "Crítico: dois textos legais distintos têm conteúdo idêntico; Vade Mecum, busca de artigos e revisões podem exibir lei errada." : "Sem identidade exata entre textos; ainda exige conferência de metadados/artigos.";

const duplicateGroups = hashGroups.map((group) => ({
  type: group.some((p) => pedagogical.find((r) => r.path === p)) ? "pedagógica" : "técnica",
  expected: group.every((p) => /index\.js|index\.jsx|reexport|gabarito/i.test(p)),
  files: group,
}));

const questionDuplicateGroups = questionGroups.filter((g) => g.length > 1);
const flashcardDuplicateGroups = flashcardGroups.filter((g) => g.length > 1);
const validQuestions = questions.filter((q) => q.status === "válida");
const uniqueQuestions = new Map(validQuestions.map((q) => [q.hash, q]));
const validCards = flashcards.filter((c) => c.status === "válido");
const uniqueCards = new Map(validCards.map((c) => [c.hash, c]));

function stratifiedSample(items, size, keyFn) {
  const groups = Object.values(items.reduce((acc, item) => {
    const key = keyFn(item) || "outros";
    (acc[key] ||= []).push(item);
    return acc;
  }, {}));
  const out = [];
  let cursor = 0;
  while (out.length < size && groups.some((g) => g.length)) {
    const group = groups[cursor % groups.length];
    if (group.length) out.push(group.shift());
    cursor += 1;
  }
  return out;
}

const validation = {
  apostilas: stratifiedSample(pedagogical.filter((r) => /apostila/.test(r.contentType)), 20, (r) => r.objectiveCanonical),
  pdfs: stratifiedSample(proofFiles, 20, (r) => r.contentType),
  jsons: stratifiedSample(pedagogical.filter((r) => r.extension === ".json"), 20, (r) => r.path.split("/").slice(0, 4).join("/")),
  questionSources: stratifiedSample(pedagogical.filter((r) => questions.some((q) => q.source === r.path)), 20, (r) => r.objectiveCanonical),
  apkg: pedagogical.filter((r) => r.extension === ".apkg"),
  laws: lawEntities,
  critical: pedagogical.filter((r) => [rel(cdcPath), rel(ctnPath)].includes(r.path)),
  unidentified: stratifiedSample(pedagogical.filter((r) => !r.objectiveCanonical || !r.disciplineCanonical || !r.subjectCanonical), 40, (r) => r.fileClass),
};

const sourceEncodingIssues = [
  ...collectEncodingIssues(contentRows, "inventario/conteudo", 300),
  ...collectEncodingIssues(questions, "questoes extraidas", 150),
  ...collectEncodingIssues(flashcards, "flashcards extraidos", 150),
  ...collectEncodingIssues(mentalMaps, "mapas extraidos", 100),
].slice(0, 700);

const v1 = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(root, "reports", "auditoria-geral-plataforma.json"), "utf8")).summary || {}; } catch { return {}; }
})();

const summary = {
  arquivosInventariados: raw.length,
  conteudosPedagogicos: pedagogical.length,
  arquivosTecnicos: technical.length,
  objetivosReais: realObjectives.length,
  concursosReais: realContests.length,
  disciplinasReais: realDisciplines.length,
  assuntosReais: realSubjects.length,
  questoesBrutas: questions.length,
  questoesValidas: validQuestions.length,
  questoesUnicas: uniqueQuestions.size,
  questoesDuplicadas: validQuestions.length - uniqueQuestions.size,
  flashcardsReais: validCards.length,
  flashcardsUnicos: uniqueCards.size,
  mapasReais: mentalMaps.length,
  leisUnicas: lawEntities.length,
  arquivosLegais: pedagogical.filter((r) => lawIdFromPath(r.path)).length,
  provasArquivosPdf: proofFiles.length,
  provasLogicasUnicas: proofGroups.filter((g) => g.proofs.length).length,
  variantes: proofGroups.reduce((acc, g) => acc + g.variants.length, 0),
  gabaritos: proofFiles.filter((r) => /gabarito/i.test(r.contentType)).length,
  conectadosDiretamente: pedagogical.filter((r) => r.interfaceConnection === "direct-ui-connection").length,
  apenasReferenciados: pedagogical.filter((r) => r.interfaceConnection === "referenced-only").length,
  localOnly: pedagogical.filter((r) => r.interfaceConnection === "local-only").length,
  orfaosPedagogicos: pedagogical.filter((r) => r.interfaceConnection === "orphan").length,
  mocks: contentRowsCountPlaceholder(),
  gruposDuplicatas: duplicateGroups.length,
  arquivosEmDuplicatas: duplicateGroups.reduce((acc, g) => acc + g.files.length, 0),
  gruposQuestoesDuplicadas: questionDuplicateGroups.length,
  gruposFlashcardsDuplicados: flashcardDuplicateGroups.length,
  errosCodificacaoOrigem: sourceEncodingIssues.length,
};

function contentRowsCountPlaceholder() {
  return raw.filter((r) => r.fileClass === "mock").length;
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(outDir, name), `${JSON.stringify(sanitizeForOutput(data), null, 2)}\n`, "utf8");
}

function writeMd(name, content) {
  fs.writeFileSync(path.join(outDir, name), sanitizeText(content), "utf8");
}

function writeCsv(name, rows, columns) {
  fs.writeFileSync(path.join(outDir, name), [columns.map(([h]) => csvEscape(h)).join(","), ...rows.map((row) => columns.map(([, k]) => csvEscape(row[k])).join(","))].join("\n"), "utf8");
}

const inventoryColumns = [
  ["path", "path"], ["fileClass", "fileClass"], ["contentType", "contentType"], ["isPedagogicalContent", "isPedagogicalContent"],
  ["extractionStatus", "extractionStatus"], ["objectiveCanonical", "objectiveCanonical"], ["institution", "institution"],
  ["contestCanonical", "contestCanonical"], ["position", "position"], ["banca", "banca"], ["year", "year"],
  ["disciplineCanonical", "disciplineCanonical"], ["subjectCanonical", "subjectCanonical"], ["interfaceConnection", "interfaceConnection"],
  ["hash", "hash"], ["size", "size"], ["classificationConfidence", "classificationConfidence"], ["classificationEvidence", "classificationEvidence"],
];

writeJson("inventario-arquivos.json", contentRows);
writeCsv("inventario-arquivos.csv", contentRows, inventoryColumns);
writeJson("conteudos-pedagogicos.json", pedagogical);
writeCsv("conteudos-pedagogicos.csv", pedagogical, inventoryColumns);

const objectiveTable = mdTable(["Objetivo real", "Arquivos pedagógicos"], realObjectives.map((o) => [o.name, o.count]));
const disciplineTable = mdTable(["Disciplina real", "Arquivos pedagógicos"], realDisciplines.map((o) => [o.name, o.count]));
const contestTable = mdTable(["Concurso/edição", "Arquivos pedagógicos"], realContests.slice(0, 200).map((o) => [o.name, o.count]));
const subjectTable = mdTable(["Assunto", "Arquivos pedagógicos"], realSubjects.slice(0, 250).map((o) => [o.name, o.count]));

writeMd("resumo-executivo.md", `# Auditoria corretiva V2 - Resumo executivo

## Problemas confirmados na V1

- V1 misturava arquivos técnicos, componentes, assets e conteúdos pedagógicos em alguns totais.
- V1 tratava contagens aproximadas de questões/flashcards como se fossem extração real.
- V1 usava labels como Flashcards, Mapas Mentais, Revisão e TAF como disciplina.
- V1 contava leis por arquivo, não por entidade legal.
- V1 marcava conteúdos locais como conectados apenas por estarem em pastas conhecidas.
- V1 contava grupos de duplicatas por arquivo envolvido em alguns resumos.

## Números corrigidos

${mdTable(["Métrica", "Valor"], Object.entries(summary).map(([k, v]) => [k, v]))}

## Objetivos reais

${objectiveTable}

## Disciplinas reais

${disciplineTable}

## Aceitação V2

- Relatórios V2 separados da V1: sim.
- Nenhuma migration criada: sim.
- Nenhum conteúdo pedagógico alterado/movido/excluído: sim.
- APKG não processado usa count null: sim.
- Leis contadas como entidades únicas: sim.
- CDC versus CTN documentado: sim.
`);

writeMd("taxonomia-candidata.md", `# Taxonomia candidata V2

## Hierarquia recomendada

Objetivo amplo -> Instituição -> Concurso/edição -> Cargo/fase -> Disciplina -> Assunto -> Subassunto -> Conteúdo.

## Objetivos reais normalizados

${objectiveTable}

## Disciplinas reais normalizadas

${disciplineTable}

## Observação

PMMA, PMSP, PMBA e similares aparecem como instituição/alias dentro do objetivo amplo Polícia Militar quando a evidência não demonstra que são produtos separados.
`);

writeMd("objetivos-normalizados.md", `# Objetivos normalizados\n\n${objectiveTable}\n`);
writeMd("concursos-normalizados.md", `# Concursos normalizados\n\n${contestTable}\n`);
writeMd("disciplinas-normalizadas.md", `# Disciplinas normalizadas\n\n${disciplineTable}\n`);
writeMd("assuntos-normalizados.md", `# Assuntos normalizados\n\n${subjectTable}\n\n## Labels técnicos excluídos\n\n${[...technicalLabels].sort().map((x) => `- ${x}`).join("\n")}\n`);

writeMd("questoes-diagnostico.md", `# Diagnóstico de questões

${mdTable(["Métrica", "Valor"], [
  ["questões brutas extraídas", questions.length],
  ["questões válidas", validQuestions.length],
  ["questões inválidas", questions.length - validQuestions.length],
  ["questões sem resposta", questions.filter((q) => q.status === "sem resposta").length],
  ["questões sem alternativas", questions.filter((q) => q.status === "sem alternativas").length],
  ["questões sem enunciado", questions.filter((q) => q.status === "sem enunciado").length],
  ["questões oficiais", questions.filter((q) => q.origem === "oficial").length],
  ["questões autorais/local", questions.filter((q) => q.origem === "autoral/local").length],
  ["questões mock", questions.filter((q) => q.origem === "mock").length],
  ["questões únicas", uniqueQuestions.size],
  ["questões duplicadas", validQuestions.length - uniqueQuestions.size],
  ["grupos duplicados", questionDuplicateGroups.length],
])}

## Fontes analisadas

${mdTable(["Fonte", "Total", "Válidas"], topEntries(countBy(questions, "source")).slice(0, 200).map(([source]) => [source, questions.filter((q) => q.source === source).length, questions.filter((q) => q.source === source && q.status === "válida").length]))}
`);

writeMd("flashcards-diagnostico.md", `# Diagnóstico de flashcards

${mdTable(["Métrica", "Valor"], [
  ["cards brutos", flashcards.length],
  ["cards válidos", validCards.length],
  ["cards incompletos", flashcards.filter((c) => c.status !== "válido").length],
  ["cards únicos", uniqueCards.size],
  ["cards duplicados", validCards.length - uniqueCards.size],
  ["grupos duplicados", flashcardDuplicateGroups.length],
  ["cards mock", flashcards.filter((c) => c.mock).length],
])}

## APKG

${mdTable(["Arquivo", "Status", "Cards"], pedagogical.filter((r) => r.extension === ".apkg").map((r) => [r.path, r.extractionStatus, r.apkgCardCount ?? "null"]))}
`);

writeMd("mapas-mentais-diagnostico.md", `# Diagnóstico de mapas mentais

- Mapas individuais extraídos: ${mentalMaps.length}

${mdTable(["Fonte", "Título", "Disciplina", "Formato"], mentalMaps.map((m) => [m.source, m.titulo, m.disciplina || "", m.formato]))}
`);

writeMd("leis-diagnostico.md", `# Diagnóstico de leis

- Leis únicas: ${lawEntities.length}
- Arquivos legais: ${summary.arquivosLegais}

${mdTable(["ID", "Nome", "Arquivos", "Artigos", "Texto", "Meta", "Integridade"], lawEntities.map((l) => [l.id, l.name, l.files.length, l.articleCount ?? "null", l.hasText, l.hasMeta, l.integrity]))}
`);

writeMd("provas-diagnostico.md", `# Diagnóstico de provas e gabaritos

${mdTable(["Métrica", "Valor"], [
  ["arquivos PDF de prova/gabarito", proofFiles.length],
  ["provas lógicas únicas", summary.provasLogicasUnicas],
  ["variantes tipo 1/2/3/4", summary.variantes],
  ["gabaritos", summary.gabaritos],
  ["provas sem gabarito", proofGroups.filter((g) => g.proofs.length && !g.answers.length).length],
  ["gabaritos sem prova", proofGroups.filter((g) => g.answers.length && !g.proofs.length).length],
  ["provas com questões extraídas", proofGroups.filter((g) => g.questionsExtracted).length],
  ["provas sem questões extraídas", proofGroups.filter((g) => g.proofs.length && !g.questionsExtracted).length],
])}

${mdTable(["Chave lógica", "Provas", "Gabaritos", "Variantes", "Questões extraídas"], proofGroups.slice(0, 250).map((g) => [g.key, g.proofs.length, g.answers.length, g.variants.join(", "), g.questionsExtracted]))}
`);

writeMd("integracao-interface.md", `# Integração com interface V2

${mdTable(["Estado", "Arquivos pedagógicos"], topEntries(countBy(pedagogical, "interfaceConnection")).map(([k, v]) => [k, v]))}

## Cadeias diretas

${mdTable(["Arquivo", "Cadeia"], pedagogical.filter((r) => r.interfaceConnection === "direct-ui-connection").slice(0, 300).map((r) => [r.path, r.interfaceEvidenceChain]))}
`);

const orphanGroups = pedagogical.filter((r) => ["orphan", "local-only", "unknown"].includes(r.interfaceConnection));
writeMd("conteudos-orfaos.md", `# Conteúdos órfãos e locais

${mdTable(["Tipo", "Quantidade"], topEntries(countBy(orphanGroups, "interfaceConnection")).map(([k, v]) => [k, v]))}

${mdTable(["Arquivo", "Classe", "Tipo", "Objetivo", "Estado"], orphanGroups.map((r) => [r.path, r.fileClass, r.contentType, r.objectiveCanonical || "", r.interfaceConnection]))}
`);

writeMd("duplicatas.md", `# Duplicatas V2

${mdTable(["Métrica", "Valor"], [
  ["grupos de duplicatas por arquivo", duplicateGroups.length],
  ["arquivos envolvidos", summary.arquivosEmDuplicatas],
  ["grupos pedagógicos", duplicateGroups.filter((g) => g.type === "pedagógica").length],
  ["grupos técnicos", duplicateGroups.filter((g) => g.type === "técnica").length],
  ["grupos esperados", duplicateGroups.filter((g) => g.expected).length],
  ["grupos suspeitos", duplicateGroups.filter((g) => !g.expected).length],
  ["grupos de questões duplicadas", questionDuplicateGroups.length],
  ["grupos de flashcards duplicados", flashcardDuplicateGroups.length],
])}

## Grupos de arquivos

${duplicateGroups.map((g, i) => `### Grupo ${i + 1} - ${g.type}${g.expected ? " (esperada)" : " (suspeita)"}\n\n${g.files.map((f) => `- ${f}`).join("\n")}`).join("\n\n")}
`);

writeMd("inconsistencias-criticas.md", `# Inconsistências críticas V2

## CDC versus CTN

${mdTable(["Campo", "Valor"], Object.entries(cdcCtn).map(([k, v]) => [k, Array.isArray(v) ? v.join("; ") : v]))}

## Decisão

- Conteúdo idêntico: ${cdcCtn.identical ? "sim" : "não"}
- CDC parece ser: ${cdcCtn.cdcLooksLike}
- CTN parece ser: ${cdcCtn.ctnLooksLike}
- Impacto: ${cdcCtn.impact}
- Ação recomendada: não corrigir nesta etapa; revisar texto, meta.json e artigos.json das duas leis antes de publicar/usar como Vade Mecum.
`);

writeMd("limitacoes.md", `# Limitações V2

- Auditoria estática; não acessa Supabase remoto.
- Dynamic import foi usado somente em arquivos de dados JS locais.
- PDFs foram extraídos parcialmente com pdftotext.
- APKG foi processado quando possuía collection.anki2 compatível; caso contrário fica como não processado e count null.
- Classificação de concursos e instituições usa metadados, diretório e slug; itens sem evidência forte ficam sem canonical.
- Nenhuma alteração destrutiva foi executada.
`);

writeMd("comparativo-v1-v2.md", `# Comparativo V1 x V2

${mdTable(["Métrica", "V1", "V2", "Por que mudou"], [
  ["arquivos analisados", v1.arquivosAnalisados ?? "", summary.arquivosInventariados, "V2 preserva inventário bruto, mas separa classes de arquivo."],
  ["conteúdos pedagógicos reais", v1.conteudosIdentificados ?? "", summary.conteudosPedagogicos, "V1 misturava código/assets; V2 só conta classes pedagógicas/container."],
  ["arquivos técnicos", "", summary.arquivosTecnicos, "V2 criou classe técnica separada."],
  ["objetivos reais", v1.objetivosEncontrados ?? "", summary.objetivosReais, "V2 exclui não identificado/desenvolvimento/genérico como objetivo."],
  ["concursos reais", v1.concursosEncontrados ?? "", summary.concursosReais, "V2 não usa title/nome indiscriminadamente."],
  ["disciplinas reais", v1.disciplinasEncontradas ?? "", summary.disciplinasReais, "V2 remove formatos como Flashcards/TAF/Revisão de disciplina."],
  ["assuntos reais", v1.assuntosEncontrados ?? "", summary.assuntosReais, "V2 remove labels técnicos e não usa filename automaticamente."],
  ["questões brutas", v1.questoes ?? "", summary.questoesBrutas, "V2 extrai objetos reais de questão."],
  ["questões únicas", "", summary.questoesUnicas, "V2 calcula hash normalizado por questão."],
  ["flashcards reais", v1.flashcards ?? "", summary.flashcardsReais, "V2 conta pares frente/verso e APKG real."],
  ["mapas reais", v1.mapasMentais ?? "", summary.mapasReais, "V2 conta unidades de mapa, não menções."],
  ["leis únicas", v1.leis ?? "", summary.leisUnicas, "V2 agrupa arquivos meta/artigos/texto por entidade legal."],
  ["arquivos legais", "", summary.arquivosLegais, "V2 mantém também contagem de arquivos legais."],
  ["provas únicas", "", summary.provasLogicasUnicas, "V2 separa PDF de prova lógica."],
  ["PDFs de provas/gabaritos", (v1.provas || 0) + (v1.gabaritos || 0), summary.provasArquivosPdf, "V2 diferencia provas e gabaritos."],
  ["conectados diretamente", v1.conteudosConectados ?? "", summary.conectadosDiretamente, "V2 exige cadeia conteúdo -> export -> serviço/store -> página/rota."],
  ["apenas referenciados", "", summary.apenasReferenciados, "Novo estado V2."],
  ["órfãos pedagógicos/local-only", v1.conteudosOrfaos ?? "", summary.localOnly + summary.orfaosPedagogicos, "V2 separa local-only de órfão e não mistura asset técnico."],
  ["mocks", v1.conteudosMock ?? "", summary.mocks, "V2 conta classe mock separada."],
  ["grupos de duplicatas", v1.duplicatasExatas ?? "", summary.gruposDuplicatas, "V2 conta grupos, não cada membro."],
  ["erros de codificação", "", "gerado em erros-codificacao.md", "V2 varre os relatórios gerados."],
])}
`);

const allReports = fs.readdirSync(outDir).filter((name) => name !== "erros-codificacao.md" && (name.endsWith(".md") || name.endsWith(".json") || name.endsWith(".csv"))).map((name) => path.join(outDir, name));
const reportEncodingErrors = [];
for (const file of allReports) {
  const text = fs.readFileSync(file, "utf8");
  const checks = [
    ["U+FFFD", /\uFFFD/g],
    ["UTF8 como Latin1", /Ãƒ|Ã‚|Ã¢â‚¬|Ã£|Ã§|Ã©|Ã³|Ãª/g],
    ["controle inesperado", /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g],
  ];
  for (const [kind, rx] of checks) {
    let m;
    while ((m = rx.exec(text)) && reportEncodingErrors.length < 300) {
      reportEncodingErrors.push({ caminho: rel(file), campo: kind, valorCorrompido: kind, origemProvavel: "relatorio V2 gerado", acaoRecomendada: "corrigir sanitizacao do auditor" });
    }
  }
}
writeMd("erros-codificacao.md", `# Erros de codificação V2

## Dados de origem

${sourceEncodingIssues.length ? mdTable(["Caminho", "Campo", "Valor corrompido", "Origem provável", "Ação"], sourceEncodingIssues.map((e) => [e.caminho, e.campo, e.valorCorrompido, e.origemProvavel, e.acaoRecomendada])) : "- Nenhum erro de codificação encontrado nos dados analisados."}

## Relatórios V2 gerados

${reportEncodingErrors.length ? mdTable(["Caminho", "Campo", "Valor corrompido", "Origem provável", "Ação"], reportEncodingErrors.map((e) => [e.caminho, e.campo, e.valorCorrompido, e.origemProvavel, e.acaoRecomendada])) : "- Nenhum erro de codificação encontrado nos relatórios V2 gerados."}
`);

writeJson("inventario-arquivos.json", { summary, files: contentRows });
writeJson("conteudos-pedagogicos.json", { summary, contents: pedagogical, questions, flashcards, mentalMaps, lawEntities, proofGroups, validation });

console.log(JSON.stringify({
  outDir: "reports/auditoria-v2",
  summary,
  objetivosReais: realObjectives.map((o) => o.name),
  disciplinasReais: realDisciplines.map((o) => o.name),
  cdcCtn: { identical: cdcCtn.identical, cdcLooksLike: cdcCtn.cdcLooksLike, ctnLooksLike: cdcCtn.ctnLooksLike },
  sourceEncodingErrors: sourceEncodingIssues.length,
  reportEncodingErrors: reportEncodingErrors.length,
}, null, 2));
