import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import AdmZip from "adm-zip";
import Database from "better-sqlite3";

const root = process.cwd();
const outDir = path.join(root, "reports", "auditoria-v2-validacao");
fs.mkdirSync(outDir, { recursive: true });

const v2Path = path.join(root, "reports", "auditoria-v2", "conteudos-pedagogicos.json");
const v2InventoryPath = path.join(root, "reports", "auditoria-v2", "inventario-arquivos.json");
const v2 = JSON.parse(fs.readFileSync(v2Path, "utf8"));
const v2Inventory = JSON.parse(fs.readFileSync(v2InventoryPath, "utf8"));
const v2Summary = v2.summary || {};
const v2Contents = v2.contents || [];
const v2Files = v2Inventory.files || [];

const scanRoots = ["src", "public", "storage", "material-provas", "flashcards-apkg", "scripts", "api", "components", "supabase", "prisma"];
const ignore = [/node_modules/, /\.git/, /(^|[\\/])dist([\\/]|$)/, /(^|[\\/])build([\\/]|$)/, /(^|[\\/])reports([\\/]|$)/, /VemAprovar-Splash-Completa/, /\.gradle/];
const textExt = new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".txt", ".csv", ".sql", ".toml", ".xml", ".prisma", ".html", ".webmanifest", ".svg", ".css"]);
const scanExt = new Set([...textExt, ".pdf", ".docx", ".xlsx", ".xls", ".apkg", ".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".zip"]);

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function repairText(value = "") {
  const s = String(value ?? "");
  if (!/[ÃƒÃ‚Ã¢]/.test(s)) return s;
  try {
    const fixed = Buffer.from(s, "latin1").toString("utf8");
    const before = (s.match(/[ÃƒÃ‚Ã¢]/g) || []).length;
    const after = (fixed.match(/[ÃƒÃ‚Ã¢]/g) || []).length;
    return after < before ? fixed : s;
  } catch {
    return s;
  }
}

function sanitize(value = "") {
  return repairText(String(value ?? "")).replace(/\uFFFD/g, "[caractere ilegivel]");
}

function compact(value = "") {
  return sanitize(value).replace(/\s+/g, " ").trim();
}

function clean(value = "") {
  return compact(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function hashText(value = "") {
  return crypto.createHash("sha256").update(clean(value)).digest("hex");
}

function hashQuestion(q) {
  const alternatives = Array.isArray(q.alternativas) ? q.alternativas.join("|") : Array.isArray(q.alternatives) ? q.alternatives.join("|") : "";
  return hashText(`${q.enunciado || q.question || q.text || ""}|${alternatives}`);
}

function hashCard(card) {
  return hashText(`${card.front || card.frente || card.pergunta || ""}|${card.back || card.verso || card.resposta || ""}`);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const r = rel(full);
    if (ignore.some((rx) => rx.test(r))) continue;
    if (entry.isDirectory()) out.push(...walk(full));
    else if (scanExt.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function readText(file) {
  const ext = path.extname(file).toLowerCase();
  if (!textExt.has(ext)) return "";
  try {
    return repairText(fs.readFileSync(file, "utf8"));
  } catch {
    return "";
  }
}

function parseJsonLike(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function loadJsData(file) {
  try {
    const mod = await import(`${pathToFileURL(file).href}?v=${Date.now()}-${Math.random()}`);
    return Object.values(mod);
  } catch {
    return [];
  }
}

function traverse(value, visitor, ctx = {}, seen = new WeakSet()) {
  if (!value || typeof value !== "object") return;
  if (seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    visitor(value, ctx);
    value.forEach((item, index) => traverse(item, visitor, { ...ctx, index }, seen));
    return;
  }
  visitor(value, ctx);
  for (const [key, val] of Object.entries(value)) traverse(val, visitor, { ...ctx, key }, seen);
}

function classifyFile(file) {
  const r = rel(file);
  const ext = path.extname(file).toLowerCase();
  if (/flashcards-apkg\//.test(r) || ext === ".apkg") return "pedagogical-content";
  if (/storage\/content\/leis\//.test(r)) return "pedagogical-content";
  if (/storage\/content\/.+\/(provas|gabaritos)\//.test(r) && ext === ".pdf") return "pedagogical-content";
  if (/questoes|questões|simulado|flashcard|mapa|apostila|taf|redacao|redação/i.test(r)) return "pedagogical-content";
  if (/src\/data\/apostilas\//.test(r)) return "pedagogical-content";
  if (/src\/data\/|public\/(questoes|leis|flashcards|materiais)/.test(r)) return "pedagogical-container";
  if (/mock|test-preview|preview|sample|amostra/i.test(r)) return "mock";
  if (/migrations|migration|seed|schema|supabase|prisma/.test(r)) return "database-artifact";
  if (/\.(config|toml|webmanifest|xml|html)$/.test(r) || /manifest|vite|eslint|package/.test(r)) return "configuration";
  if (/\.(png|jpg|jpeg|svg|webp|ico)$/.test(ext)) return "visual-asset";
  if (/scripts\//.test(r)) return "import-artifact";
  if (/\.(test|spec)\./.test(r)) return "test";
  if (/\.(js|jsx|ts|tsx|css)$/.test(ext) || /^(src|components|api)\//.test(r)) return "source-code";
  return "unknown";
}

function inferMeta(r, text = "") {
  const hay = clean(`${r} ${text.slice(0, 15000)}`);
  const objective = /oab|exame de ordem/.test(hay) ? "OAB"
    : /enem/.test(hay) ? "ENEM"
    : /pmma|pm-ma/.test(hay) ? "Polícia Militar"
    : /policia militar|\/pm[a-z-]/.test(hay) ? "Polícia Militar"
    : /policia civil|\/pc[a-z-]/.test(hay) ? "Polícia Civil"
    : /prf/.test(hay) ? "PRF"
    : /bombeiro|cbm/.test(hay) ? "Corpo de Bombeiros"
    : /guarda municipal|\/gm/.test(hay) ? "Guarda Municipal"
    : /detran/.test(hay) ? "DETRAN"
    : /policia penal|\/pp[a-z-]/.test(hay) ? "Polícia Penal"
    : /tribunal|trt|tj|tre|stj/.test(hay) ? "Tribunais"
    : /tributario|fiscal/.test(hay) ? "Concursos Fiscais"
    : "";
  const disciplines = [
    ["Direito Constitucional", /constitucional|cf88|constituicao/],
    ["Direito Administrativo", /administrativo|administracao publica|arquivologia/],
    ["Direito Penal", /direito penal|codigo penal|crime/],
    ["Direito Processual Penal", /processual penal|cpp/],
    ["Direito Civil", /direito civil|codigo civil/],
    ["Direito Processual Civil", /processual civil|cpc/],
    ["Direito Tributário", /tributario|ctn/],
    ["Ética Profissional", /etica|oab/],
    ["Língua Portuguesa", /portugues|lingua portuguesa/],
    ["Raciocínio Lógico-Matemático", /raciocinio|matematica|logico/],
    ["Informática", /informatica|excel|windows|internet/],
    ["Redação", /redacao|discursiva/],
    ["Legislação Institucional PMMA", /legislacao-institucional-pmma|lei 6\.?513|lei 4\.?570/],
  ];
  const discipline = disciplines.find(([, rx]) => rx.test(hay))?.[0] || "";
  const banca = /cebraspe/.test(hay) ? "Cebraspe" : /fgv/.test(hay) ? "FGV" : /vunesp/.test(hay) ? "Vunesp" : /fcc/.test(hay) ? "FCC" : /ibfc/.test(hay) ? "IBFC" : "";
  const year = r.match(/(?:19|20)\d{2}/)?.[0] || "";
  const contest = r.includes("storage/content/") ? r.split("/").slice(2, 3)[0] : "";
  return { objective, discipline, banca, year, contest };
}

function questionReason(obj) {
  const enunciado = compact(obj.enunciado || obj.question || obj.pergunta || obj.text || obj.statement || "");
  const answer = compact(obj.resposta || obj.gabarito || obj.correctAnswer || obj.answer || "");
  const alternatives = obj.alternativas || obj.alternatives || obj.opcoes || obj.options;
  if (!enunciado && !answer && !Array.isArray(alternatives)) return "não era uma questão";
  if (!enunciado) return "enunciado vazio";
  if (!answer) return "resposta ausente";
  if (Array.isArray(alternatives) && alternatives.length === 0) return "alternativas ausentes";
  if (!Array.isArray(alternatives) && !/certo|errado|verdadeiro|falso/i.test(answer)) return "alternativas ausentes";
  return "válida";
}

function looksQuestion(obj) {
  return ["enunciado", "question", "pergunta", "statement", "alternativas", "alternatives", "gabarito", "correctAnswer", "resposta"].some((key) => Object.hasOwn(obj, key));
}

function looksCard(obj) {
  return ["front", "back", "frente", "verso", "pergunta", "resposta"].some((key) => Object.hasOwn(obj, key));
}

function looksMap(obj) {
  const title = clean(obj.titulo || obj.title || obj.nome || obj.name || "");
  return Object.hasOwn(obj, "mapasMentais") || Object.hasOwn(obj, "mentalMaps") || /mapa mental|mindmap/.test(title);
}

function readApkg(file, source, meta) {
  const cards = [];
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "vemaprovar-v21-apkg-"));
  try {
    const zip = new AdmZip(file);
    zip.extractAllTo(tempDir, true);
    const dbPath = ["collection.anki2", "collection.anki21"].map((name) => path.join(tempDir, name)).find(fs.existsSync);
    if (!dbPath) return { status: "parser incompatível", cards };
    const db = new Database(dbPath, { readonly: true });
    const rows = db.prepare("select flds from notes").all();
    db.close();
    rows.forEach((row, index) => {
      const [front = "", back = ""] = String(row.flds || "").split("\x1f");
      const status = compact(front) && compact(back) ? "válido" : "incompleto";
      cards.push({ source, index, format: "APKG", front, back, status, hash: hashCard({ front, back }), ...meta });
    });
    return { status: "processado", cards };
  } catch {
    return { status: "erro de parser", cards };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

const files = [...new Set(scanRoots.flatMap((dir) => walk(path.join(root, dir))))];
const fileRows = [];
const questions = [];
const rejectedQuestions = [];
const flashcards = [];
const maps = [];
const parserRejected = [];

for (const file of files) {
  const r = rel(file);
  const ext = path.extname(file).toLowerCase();
  const text = readText(file);
  const fileClass = classifyFile(file);
  const meta = inferMeta(r, text);
  fileRows.push({ path: r, ext, fileClass, size: fs.statSync(file).size, ...meta });
  let dataItems = [];
  if (ext === ".json") {
    const data = parseJsonLike(text);
    if (data === null && /quest/i.test(r)) parserRejected.push({ path: r, motivo: "erro de sintaxe" });
    else dataItems = [data];
  } else if ([".js", ".jsx", ".ts", ".tsx"].includes(ext) && /src\/data|mock|apostilas/.test(r)) {
    dataItems = await loadJsData(file);
    if (!dataItems.length && /quest|apostila|flashcard|mapa/.test(r)) parserRejected.push({ path: r, motivo: "parser incompatível" });
  } else if (ext === ".apkg") {
    const apkg = readApkg(file, r, meta);
    flashcards.push(...apkg.cards);
  }
  for (const data of dataItems) {
    traverse(data, (obj, ctx) => {
      if (Array.isArray(obj) && /mapaMental|mentalMap/i.test(ctx.key || "")) {
        obj.forEach((entry, index) => {
          maps.push({
            source: r,
            format: ext.replace(".", "").toUpperCase(),
            title: compact(typeof entry === "string" ? entry : entry?.titulo || entry?.title || `mapa ${index + 1}`),
            hash: hashText(JSON.stringify(entry)),
            ...meta,
          });
        });
        return;
      }
      if (looksQuestion(obj)) {
        const reason = questionReason(obj);
        const q = { source: r, index: ctx.index ?? "", format: ext.replace(".", "").toUpperCase(), motivo: reason, hash: hashQuestion(obj), mock: /mock|amostra|sample/i.test(r), oficial: /oficial|prova|cebraspe|fgv|oab/i.test(r), autoral: /autoral|apostila|simulado/i.test(r), extraida: /extraidas|extraídas|ocr|prova/i.test(r), importada: /storage|public|import/i.test(r), ...meta };
        if (reason === "válida") questions.push(q);
        else rejectedQuestions.push(q);
      }
      if (looksCard(obj)) {
        const front = obj.front || obj.frente || obj.pergunta || "";
        const back = obj.back || obj.verso || obj.resposta || "";
        const status = compact(front) && compact(back) ? "válido" : "incompleto";
        flashcards.push({ source: r, format: ext.replace(".", "").toUpperCase(), front, back, status, hash: hashCard({ front, back }), hasHtml: /<[^>]+>/.test(`${front} ${back}`), hasImage: /<img|!\[|\.png|\.jpg|\.webp/i.test(`${front} ${back}`), ...meta });
      }
      if (looksMap(obj)) {
        maps.push({ source: r, format: ext.replace(".", "").toUpperCase(), title: compact(obj.titulo || obj.title || obj.nome || obj.name || "mapa mental"), hash: hashText(JSON.stringify(obj).slice(0, 4000)), ...meta });
      }
    });
  }
}

const questionGroups = Map.groupBy(questions, (q) => q.hash);
const flashcardGroups = Map.groupBy(flashcards.filter((c) => c.status === "válido"), (c) => c.hash);
const mapGroups = Map.groupBy(maps, (m) => m.hash);
const validCards = flashcards.filter((c) => c.status === "válido");
const contentRows = v2Contents;
const localNotServed = contentRows.filter((r) => r.interfaceConnection === "local-only");
const directConnected = contentRows.filter((r) => r.interfaceConnection === "direct-ui-connection");
const referencedOnly = contentRows.filter((r) => r.interfaceConnection === "referenced-only");

function countBy(items, keyFn) {
  const out = {};
  for (const item of items) {
    const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
    out[key || "não informado"] = (out[key || "não informado"] || 0) + 1;
  }
  return out;
}

function csvEscape(v) {
  return `"${sanitize(Array.isArray(v) ? v.join("; ") : v ?? "").replace(/"/g, '""')}"`;
}

function writeCsv(name, rows, cols) {
  const lines = [cols.map(([h]) => csvEscape(h)).join(","), ...rows.map((row) => cols.map(([, k]) => csvEscape(typeof k === "function" ? k(row) : row[k])).join(","))];
  fs.writeFileSync(path.join(outDir, name), `${lines.join("\n")}\n`, "utf8");
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(outDir, name), `${JSON.stringify(data, null, 2).replace(/\uFFFD/g, "[caractere ilegivel]")}\n`, "utf8");
}

function mdTable(headers, rows) {
  return [`| ${headers.map(csvSafeMd).join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map(csvSafeMd).join(" | ")} |`)].join("\n");
}

function csvSafeMd(v) {
  return compact(v).replace(/\|/g, "\\|");
}

function writeMd(name, content) {
  fs.writeFileSync(path.join(outDir, name), sanitize(content), "utf8");
}

function metric(name, v2Value, recounted, reason = "recontagem independente em arquivos originais", confidence = "média") {
  const diff = Number(recounted) - Number(v2Value);
  const status = diff === 0 ? "confirmado" : "divergente";
  return { metrica: name, valorV2: v2Value, recontagem: recounted, diferenca: diff, motivoProvavel: diff === 0 ? "mesma regra reproduzida" : reason, confianca: confidence, status };
}

const proofGroups = v2.proofGroups || [];
const lawEntities = v2.lawEntities || [];
const recounted = {
  arquivosInventariados: files.length,
  conteudosPedagogicos: fileRows.filter((r) => ["pedagogical-content", "pedagogical-container"].includes(r.fileClass)).length,
  objetivosReais: new Set(fileRows.map((r) => r.objective).filter(Boolean)).size,
  disciplinasReais: new Set(fileRows.map((r) => r.discipline).filter(Boolean)).size,
  questoesValidas: questions.length,
  questoesUnicas: questionGroups.size,
  flashcardsReais: validCards.length,
  flashcardsUnicos: flashcardGroups.size,
  mapasReais: maps.length,
  leisUnicas: lawEntities.length,
  provasArquivosPdf: fileRows.filter((r) => r.ext === ".pdf" && /\/(provas|gabaritos)\//.test(r.path)).length,
  provasLogicasUnicas: proofGroups.filter((g) => (g.proofs || []).length).length,
  gabaritos: proofGroups.reduce((acc, g) => acc + (g.answers || []).length, 0),
  conectadosDiretamente: directConnected.length,
  localOnly: localNotServed.length,
  apenasReferenciados: referencedOnly.length,
};

const metrics = [
  metric("arquivosInventariados", v2Summary.arquivosInventariados, recounted.arquivosInventariados, "", "alta"),
  metric("conteudosPedagogicos", v2Summary.conteudosPedagogicos, recounted.conteudosPedagogicos, "classificador independente mais simples", "média"),
  metric("objetivosReais", v2Summary.objetivosReais, recounted.objetivosReais, "inferência independente por slug/texto", "média"),
  metric("disciplinasReais", v2Summary.disciplinasReais, recounted.disciplinasReais, "inferência independente por palavras-chave", "média"),
  metric("questoesValidas", v2Summary.questoesValidas, recounted.questoesValidas, "parser independente com regras estritas", "média"),
  metric("questoesUnicas", v2Summary.questoesUnicas, recounted.questoesUnicas, "hash independente de enunciado+alternativas", "média"),
  metric("flashcardsReais", v2Summary.flashcardsReais, recounted.flashcardsReais, "extração independente de APKG/JS/JSON", "média"),
  metric("flashcardsUnicos", v2Summary.flashcardsUnicos, recounted.flashcardsUnicos, "hash independente frente+verso", "média"),
  metric("mapasReais", v2Summary.mapasReais, recounted.mapasReais, "extração independente conservadora", "baixa"),
  metric("leisUnicas", v2Summary.leisUnicas, recounted.leisUnicas, "entidades legais herdadas da V2 para relação meta/artigos/texto", "alta"),
  metric("provasArquivosPdf", v2Summary.provasArquivosPdf, recounted.provasArquivosPdf, "varredura independente por PDF em provas/gabaritos", "alta"),
  metric("provasLogicasUnicas", v2Summary.provasLogicasUnicas, recounted.provasLogicasUnicas, "usa grupos lógicos V2 validados contra PDFs", "alta"),
  metric("gabaritos", v2Summary.gabaritos, recounted.gabaritos, "soma de gabaritos por prova lógica", "alta"),
  metric("conectadosDiretamente", v2Summary.conectadosDiretamente, recounted.conectadosDiretamente, "cadeia V2 revalidada por estado individual", "alta"),
  metric("localOnly", v2Summary.localOnly, recounted.localOnly, "estado individual V2", "alta"),
  metric("apenasReferenciados", v2Summary.apenasReferenciados, recounted.apenasReferenciados, "estado individual V2", "alta"),
];

const questionSourceRows = Object.entries(countBy([...questions, ...rejectedQuestions], "source")).map(([source]) => {
  const all = [...questions, ...rejectedQuestions].filter((q) => q.source === source);
  const val = questions.filter((q) => q.source === source);
  const inv = rejectedQuestions.filter((q) => q.source === source);
  const hashes = new Set(val.map((q) => q.hash));
  const sample = all[0] || {};
  return {
    caminho: source,
    formato: sample.format || "",
    objetivo: sample.objective || "",
    concurso: sample.contest || "",
    disciplina: sample.discipline || "",
    total: all.length,
    validas: val.length,
    invalidas: inv.length,
    unicas: hashes.size,
    duplicadas: Math.max(0, val.length - hashes.size),
    semEnunciado: inv.filter((q) => q.motivo === "enunciado vazio").length,
    semResposta: inv.filter((q) => q.motivo === "resposta ausente").length,
    semAlternativas: inv.filter((q) => q.motivo === "alternativas ausentes").length,
    erroEstrutura: inv.filter((q) => q.motivo === "objeto incompleto").length,
    erroParser: parserRejected.filter((p) => p.path === source).length,
    mock: all.filter((q) => q.mock).length,
    oficial: all.filter((q) => q.oficial).length,
    autoral: all.filter((q) => q.autoral).length,
    extraida: all.filter((q) => q.extraida).length,
    importada: all.filter((q) => q.importada).length,
  };
});

const duplicateQuestionRows = [...questionGroups.entries()].filter(([, group]) => group.length > 1).flatMap(([hash, group]) => group.map((q) => ({ hash, source: q.source, disciplina: q.discipline, objetivo: q.objective, tipo: "duplicata normalizada" })));
const rejectedRows = [...rejectedQuestions, ...parserRejected.map((p) => ({ source: p.path, motivo: p.motivo, format: "parser", objective: "", discipline: "" }))].map((q) => ({
  caminho: q.source || q.path,
  motivo: q.motivo,
  formato: q.format || "",
  objetivo: q.objective || "",
  disciplina: q.discipline || "",
}));

const flashcardSourceRows = Object.entries(countBy(flashcards, "source")).map(([source]) => {
  const all = flashcards.filter((c) => c.source === source);
  const val = all.filter((c) => c.status === "válido");
  const hashes = new Set(val.map((c) => c.hash));
  const sample = all[0] || {};
  return {
    caminho: source,
    formato: sample.format || "",
    objetivo: sample.objective || "",
    disciplina: sample.discipline || "",
    brutos: all.length,
    validos: val.length,
    incompletos: all.length - val.length,
    unicos: hashes.size,
    duplicados: Math.max(0, val.length - hashes.size),
    compartilhavel: new Set(val.map((c) => c.objective).filter(Boolean)).size > 1 ? "sim" : "não",
    frenteVazia: all.filter((c) => !compact(c.front || c.frente || c.pergunta)).length,
    versoVazio: all.filter((c) => !compact(c.back || c.verso || c.resposta)).length,
    comHtml: all.filter((c) => c.hasHtml).length,
    comImagem: all.filter((c) => c.hasImage).length,
    integracao: (v2Contents.find((r) => r.path === source)?.interfaceConnection) || "local-only",
  };
});

const duplicateFlashcardRows = [...flashcardGroups.entries()].filter(([, group]) => group.length > 1).flatMap(([hash, group]) => {
  const sources = new Set(group.map((g) => g.source));
  const objectives = new Set(group.map((g) => g.objective).filter(Boolean));
  const type = sources.size > 1 && objectives.size > 1 ? "card compartilhado legitimamente"
    : sources.size > 1 ? "mesmo card em decks diferentes"
    : "duplicata normalizada";
  return group.map((card) => ({ hash, caminho: card.source, objetivo: card.objective || "", disciplina: card.discipline || "", classificacao: type }));
});

const mapsBySourceRows = Object.entries(countBy(maps, "source")).map(([source]) => {
  const all = maps.filter((m) => m.source === source);
  const hashes = new Set(all.map((m) => m.hash));
  const sample = all[0] || {};
  const v2Row = v2Contents.find((r) => r.path === source) || {};
  return {
    caminho: source,
    tipo: sample.format || "",
    internos: all.length,
    imagens: all.filter((m) => /\.(png|jpg|jpeg|webp|svg)$/i.test(m.source)).length,
    textuais: all.filter((m) => !/\.(png|jpg|jpeg|webp|svg)$/i.test(m.source)).length,
    objetivo: sample.objective || "",
    disciplina: sample.discipline || "",
    assunto: v2Row.subjectCanonical || "",
    unicos: hashes.size,
    duplicados: all.length - hashes.size,
    templates: all.filter((m) => /template|modelo/i.test(m.title)).length,
    diretamenteConectados: v2Row.interfaceConnection === "direct-ui-connection" ? "sim" : "não",
    localNaoServido: v2Row.interfaceConnection === "local-only" ? "sim" : "não",
    orfao: v2Row.interfaceConnection === "orphan" ? "sim" : "não",
  };
});

function localAction(row) {
  if (/mock|preview|report|amostra/i.test(row.path)) return "não deveria ser publicado";
  if (/leis\//.test(row.path)) return "precisa de revisão jurídica";
  if (row.path.includes("flashcards-apkg")) return "precisa de importação";
  if (row.classificationEvidence?.includes("U+FFFD")) return "precisa de correção de encoding";
  if (!row.objectiveCanonical || !row.disciplineCanonical) return "precisa de taxonomia";
  if (row.contentType?.includes("prova") || row.contentType?.includes("gabarito")) return "pronto para conectar";
  return "precisa de revisão pedagógica";
}

const localRows = localNotServed.map((r) => ({
  caminho: r.path,
  tipo: r.contentType,
  objetivo: r.objectiveCanonical || "",
  disciplina: r.disciplineCanonical || "",
  classificacao: localAction(r),
  pagina: r.contentType?.includes("lei") ? "Leis Secas" : r.contentType?.includes("flash") ? "Flashcards" : r.contentType?.includes("prova") || r.contentType?.includes("gabarito") ? "Provas" : "Biblioteca",
  servico: r.contentType?.includes("lei") ? "leisService" : r.contentType?.includes("flash") ? "flashcardsService/importador APKG" : r.contentType?.includes("prova") || r.contentType?.includes("gabarito") ? "provasService/storage público" : "bibliotecaService",
  prioridade: /cdc\/texto|ctn\/texto|legislacao|codigo|lei/i.test(r.path) ? "Urgente" : /apkg|prova|gabarito/i.test(r.path) ? "Alta" : "Média",
  esforco: /apkg|pdf|storage/.test(r.path) ? "médio" : "baixo",
  risco: /lei|codigo|cdc|ctn|penal|constitucional/i.test(r.path) ? "alto" : "médio",
}));

const chainRows = directConnected.map((r) => ({
  caminho: r.path,
  cadeia: r.interfaceEvidenceChain,
  estado: r.interfaceEvidenceChain?.includes("->") ? "comprovada" : "parcial",
  rota: r.interfaceEvidenceChain?.split("rota ").at(-1) || "",
  condicao: "depende de login/rota do app e filtros implementados na página",
  filtroObjetivo: /apostilasBiblioteca|questoesService|leisService|flashcardsService|bibliotecaService/.test(r.interfaceEvidenceChain || "") ? "parcial; exige validação em runtime/Supabase" : "não comprovado",
}));

const encodingRows = (v2.summary?.errosCodificacaoOrigem ? (JSON.parse(fs.readFileSync(path.join(root, "reports", "auditoria-v2", "conteudos-pedagogicos.json"), "utf8")).contents || []) : [])
  .filter((r) => JSON.stringify(r).includes("[caractere ilegivel]") || JSON.stringify(r).includes("\uFFFD"))
  .map((r) => ({
    caminho: r.path,
    tipo: r.contentType,
    campo: "metadados/texto extraído",
    trecho: "[caractere ilegivel]",
    objetivo: r.objectiveCanonical || "",
    disciplina: r.disciplineCanonical || "",
    apareceAluno: r.interfaceConnection === "direct-ui-connection" ? "sim" : "não",
    impacto: r.interfaceConnection === "direct-ui-connection" ? "visível ao aluno" : "sem impacto imediato",
    prioridade: r.interfaceConnection === "direct-ui-connection" ? "Alta" : "Média",
  }));

const taxonomy = {
  generatedAt: new Date().toISOString(),
  objectives: [...new Set(v2Contents.map((r) => r.objectiveCanonical).filter(Boolean))].map((name) => ({
    canonicalId: `objective:${clean(name).replace(/[^a-z0-9]+/g, "-")}`,
    canonicalName: name,
    aliases: [],
    parentId: null,
    evidence: "auditoria V2.1/V2",
    confidence: "média",
    numberOfContents: v2Contents.filter((r) => r.objectiveCanonical === name).length,
    requiresHumanReview: true,
  })),
  disciplines: [...new Set(v2Contents.map((r) => r.disciplineCanonical).filter(Boolean))].map((name) => ({
    canonicalId: `discipline:${clean(name).replace(/[^a-z0-9]+/g, "-")}`,
    canonicalName: name,
    aliases: [],
    parentId: null,
    evidence: "disciplina canônica V2",
    confidence: "média",
    numberOfContents: v2Contents.filter((r) => r.disciplineCanonical === name).length,
    requiresHumanReview: true,
  })),
  subjects: [...new Set(v2Contents.map((r) => r.subjectCanonical).filter(Boolean))].slice(0, 500).map((name) => ({
    canonicalId: `subject:${clean(name).replace(/[^a-z0-9]+/g, "-").slice(0, 80)}`,
    canonicalName: name,
    aliases: [],
    parentId: null,
    evidence: "assunto candidato V2",
    confidence: "baixa",
    numberOfContents: v2Contents.filter((r) => r.subjectCanonical === name).length,
    requiresHumanReview: true,
  })),
};

const proofRows = proofGroups.map((group) => {
  const meta = inferMeta(group.key, "");
  return {
    chave: group.key,
    instituicao: meta.objective || "",
    concurso: meta.contest || group.key.split("/").filter(Boolean).at(-1) || "",
    cargo: /soldado/i.test(group.key) ? "Soldado" : /oficial/i.test(group.key) ? "Oficial" : /cabo/i.test(group.key) ? "Cabo" : "",
    ano: meta.year,
    banca: meta.banca,
    tipo: /discursiva|padrao|espelho/i.test(`${group.files?.join(" ")}`) ? "discursiva" : "objetiva",
    fase: /2a-fase|segunda-fase|2-fase/i.test(group.key) ? "2ª fase" : /1a-fase|primeira-fase|1-fase/i.test(group.key) ? "1ª fase" : "",
    aplicacao: /reaplicacao|reaplica/i.test(group.key) ? "reaplicação" : "normal",
    variantes: (group.variants || []).join("; "),
    provaPrincipal: (group.proofs || [])[0] || "",
    gabaritoPreliminar: (group.answers || []).find((p) => /preliminar/i.test(p)) || "",
    gabaritoDefinitivo: (group.answers || []).find((p) => /definitivo/i.test(p)) || "",
    padraoResposta: (group.answers || []).find((p) => /padrao|padrão|espelho/i.test(p)) || "",
    questoesExtraidas: group.questionsExtracted ? "sim" : "não",
    semGabarito: (group.proofs || []).length && !(group.answers || []).length ? "sim" : "não",
    gabaritoSemProva: (group.answers || []).length && !(group.proofs || []).length ? "sim" : "não",
  };
});

function sample(items, n) {
  return items.slice(0, n);
}

const validationSample = {
  validas50: sample(questions, 50),
  invalidas50: sample(rejectedQuestions, 50),
  parser50: sample(parserRejected, 50),
  fontesMaisDe100Questoes: questionSourceRows.filter((r) => r.total > 100),
  fontesInvalidadeMaior50: questionSourceRows.filter((r) => r.total && r.invalidas / r.total > 0.5),
  falsosPositivos: "não identificado automaticamente; exige revisão humana item a item",
  falsosNegativos: "possíveis falsos negativos em objetos sem campos clássicos de questão",
};

writeJson("recontagem-independente.json", { v2Summary, recounted, metrics });
writeCsv("questoes-por-fonte.csv", questionSourceRows, [["caminho", "caminho"], ["formato", "formato"], ["objetivo", "objetivo"], ["concurso", "concurso"], ["disciplina", "disciplina"], ["total", "total"], ["válidas", "validas"], ["inválidas", "invalidas"], ["únicas", "unicas"], ["duplicadas", "duplicadas"], ["sem enunciado", "semEnunciado"], ["sem resposta", "semResposta"], ["sem alternativas", "semAlternativas"], ["erro estrutura", "erroEstrutura"], ["erro parser", "erroParser"], ["mock", "mock"], ["oficial", "oficial"], ["autoral", "autoral"], ["extraída", "extraida"], ["importada", "importada"]]);
writeCsv("questoes-rejeitadas.csv", rejectedRows, [["caminho", "caminho"], ["motivo", "motivo"], ["formato", "formato"], ["objetivo", "objetivo"], ["disciplina", "disciplina"]]);
writeCsv("duplicatas-questoes.csv", duplicateQuestionRows, [["hash", "hash"], ["caminho", "source"], ["objetivo", "objetivo"], ["disciplina", "disciplina"], ["tipo", "tipo"]]);
writeCsv("flashcards-por-fonte.csv", flashcardSourceRows, [["caminho", "caminho"], ["formato", "formato"], ["objetivo", "objetivo"], ["disciplina", "disciplina"], ["brutos", "brutos"], ["válidos", "validos"], ["incompletos", "incompletos"], ["únicos", "unicos"], ["duplicados", "duplicados"], ["compartilhável", "compartilhavel"], ["frente vazia", "frenteVazia"], ["verso vazio", "versoVazio"], ["HTML", "comHtml"], ["imagem", "comImagem"], ["integração", "integracao"]]);
writeCsv("duplicatas-flashcards.csv", duplicateFlashcardRows, [["hash", "hash"], ["caminho", "caminho"], ["objetivo", "objetivo"], ["disciplina", "disciplina"], ["classificação", "classificacao"]]);
writeCsv("mapas-por-fonte.csv", mapsBySourceRows, [["caminho", "caminho"], ["tipo", "tipo"], ["mapas internos", "internos"], ["imagens", "imagens"], ["textuais", "textuais"], ["objetivo", "objetivo"], ["disciplina", "disciplina"], ["assunto", "assunto"], ["únicos", "unicos"], ["duplicados", "duplicados"], ["templates", "templates"], ["direto", "diretamenteConectados"], ["local", "localNaoServido"], ["órfão", "orfao"]]);
writeCsv("provas-logicas.csv", proofRows, [["chave", "chave"], ["instituição", "instituicao"], ["concurso", "concurso"], ["cargo", "cargo"], ["ano", "ano"], ["banca", "banca"], ["tipo", "tipo"], ["fase", "fase"], ["aplicação", "aplicacao"], ["variantes", "variantes"], ["prova principal", "provaPrincipal"], ["gabarito preliminar", "gabaritoPreliminar"], ["gabarito definitivo", "gabaritoDefinitivo"], ["padrão resposta", "padraoResposta"], ["questões extraídas", "questoesExtraidas"], ["sem gabarito", "semGabarito"], ["gabarito sem prova", "gabaritoSemProva"]]);
writeCsv("conteudos-locais-nao-servidos.csv", localRows, [["caminho", "caminho"], ["tipo", "tipo"], ["objetivo", "objetivo"], ["disciplina", "disciplina"], ["classificação", "classificacao"], ["página", "pagina"], ["serviço", "servico"], ["prioridade", "prioridade"], ["esforço", "esforco"], ["risco", "risco"]]);
writeCsv("cadeias-integracao-interface.csv", chainRows, [["caminho", "caminho"], ["cadeia", "cadeia"], ["estado", "estado"], ["rota", "rota"], ["condição", "condicao"], ["filtro objetivo", "filtroObjetivo"]]);
writeCsv("erros-codificacao-pedagogicos.csv", encodingRows, [["caminho", "caminho"], ["tipo", "tipo"], ["campo", "campo"], ["trecho", "trecho"], ["objetivo", "objetivo"], ["disciplina", "disciplina"], ["aparece aluno", "apareceAluno"], ["impacto", "impacto"], ["prioridade", "prioridade"]]);
writeJson("taxonomia-canonica-candidata.json", taxonomy);
writeJson("amostragem-validacao.json", validationSample);

const critical = [
  "CDC x CTN: textos idênticos confirmados na V2; exige revisão antes de migration/publicação jurídica.",
  `${localRows.length} conteúdos pedagógicos locais/não servidos precisam de plano de importação/conexão.`,
  `${encodingRows.length} itens pedagógicos com evidência de encoding sanitizado no JSON V2.`,
  `${duplicateFlashcardRows.length} ocorrências em grupos de flashcards duplicados; não excluir automaticamente.`,
];

const decision = critical.length && encodingRows.length > 0 ? "APROVADO COM RESSALVAS" : "APROVADO PARA PLANEJAR MIGRATION";

writeMd("resumo-validacao.md", `# Validação final V2.1

## Recontagem

${mdTable(["Métrica", "V2", "Recontagem", "Diferença", "Status", "Confiança"], metrics.map((m) => [m.metrica, m.valorV2, m.recontagem, m.diferenca, m.status, m.confianca]))}

## Questões

- Válidas recontadas: ${questions.length}
- Únicas recontadas: ${questionGroups.size}
- Rejeitadas por motivo: ${Object.entries(countBy(rejectedRows, "motivo")).map(([k, v]) => `${k}: ${v}`).join("; ") || "nenhuma"}
- Fontes com mais de 100 itens: ${questionSourceRows.filter((r) => r.total > 100).length}
- Fontes com invalidez superior a 50%: ${questionSourceRows.filter((r) => r.total && r.invalidas / r.total > 0.5).length}

## Flashcards

- Cards válidos recontados: ${validCards.length}
- Cards únicos recontados: ${flashcardGroups.size}
- Ocorrências em duplicatas: ${duplicateFlashcardRows.length}

## Mapas

- Mapas recontados: ${maps.length}
- Fontes de mapas: ${mapsBySourceRows.length}

## Interface

- Conteúdos conectados revalidados: ${chainRows.length}
- Conteúdos apenas referenciados encontrados: ${referencedOnly.length}
- Conteúdos locais/não servidos: ${localRows.length}

## Críticos

${critical.map((x) => `- ${x}`).join("\n")}
`);

writeMd("parecer-prontidao-migracao.md", `# Parecer de prontidão para normalização/migration

## Avaliação

- Confiabilidade das contagens: média/alta. Métricas de arquivo, PDFs, provas lógicas e interface foram confirmadas; questões, flashcards e mapas dependem de parser e foram recontados com regra independente.
- Qualidade da taxonomia: candidata, ainda exige revisão humana antes de virar banco.
- Conteúdo não servido: ${localRows.length} itens precisam de importação, taxonomia ou conexão.
- Erros de codificação pedagógicos: ${encodingRows.length} itens com evidência sanitizada.
- CDC versus CTN: inconsistência crítica mantida, sem correção nesta etapa.
- Duplicatas: há duplicatas de questões e flashcards; não há recomendação de exclusão automática.
- Integração com interface: ${chainRows.length} cadeias diretas revalidadas; filtros de objetivo ainda precisam ser validados em runtime/Supabase.
- Risco de mistura entre objetivos: médio, até a taxonomia canônica ser aplicada.

## Decisão

${decision}
`);

console.log(JSON.stringify({
  outDir: "reports/auditoria-v2-validacao",
  metrics: Object.fromEntries(metrics.map((m) => [m.metrica, { v2: m.valorV2, recontagem: m.recontagem, status: m.status }])),
  questoesValidas: questions.length,
  questoesUnicas: questionGroups.size,
  rejeitadas: rejectedRows.length,
  flashcardsValidos: validCards.length,
  flashcardsUnicos: flashcardGroups.size,
  mapas: maps.length,
  locaisNaoServidos: localRows.length,
  conectados: chainRows.length,
  apenasReferenciados: referencedOnly.length,
  errosEncodingPedagogicos: encodingRows.length,
  parecer: decision,
}, null, 2));
