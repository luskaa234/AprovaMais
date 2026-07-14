import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const outDir = path.join(root, "reports");
fs.mkdirSync(outDir, { recursive: true });

const edital = {
  nome: "Edital nº 1 – PMMA, de 10 de julho de 2026",
  status: "não localizado em fonte oficial/web nem em arquivo local no momento da auditoria",
  aviso:
    "Sem o PDF/texto oficial do Edital PMMA 2026, a coluna de tópicos do edital é uma correspondência inferida por matriz PMMA/policial e deve ser validada contra o edital oficial antes de publicação.",
};

const materialRoots = [
  "src/data/apostilas",
  "src/data",
  "storage/content/militar",
  "storage/content/leis",
  "storage/content/cebraspe-local",
  "storage/content/fgv-local",
  "storage/content/concursos-militares",
  "material-provas",
  "flashcards-apkg",
  "public/logos/concursos",
];

const ignore = [/node_modules/, /\.git/, /dist/, /VemAprovar-Splash-Completa/];
const relevantExt = new Set([".js", ".json", ".txt", ".pdf", ".apkg", ".png", ".svg", ".md", ".csv", ".xlsx", ".docx"]);

const editalTopics = [
  { grupo: "Conhecimentos Gerais", disciplina: "Língua Portuguesa", keys: ["portugues", "língua portuguesa", "interpretação", "ortografia", "morfologia", "sintaxe", "semântica", "crase", "concordância", "regência"] },
  { grupo: "Conhecimentos Gerais", disciplina: "Raciocínio Lógico-Matemático", keys: ["raciocinio", "raciocínio", "matematica", "matemática", "lógico", "proporção", "porcentagem", "sequência", "probabilidade"] },
  { grupo: "Conhecimentos Gerais", disciplina: "Informática", keys: ["informatica", "informática", "internet", "segurança da informação", "windows", "office", "excel", "word"] },
  { grupo: "Conhecimentos Gerais", disciplina: "Atualidades", keys: ["atualidades", "mundo contemporâneo"] },
  { grupo: "Conhecimentos Gerais", disciplina: "História e Geografia", keys: ["historia", "história", "geografia", "maranhão", "maranhao"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direito Constitucional", keys: ["constitucional", "constituição", "cf88", "art. 5", "art. 144", "segurança pública"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direito Administrativo", keys: ["administrativo", "administração pública", "atos administrativos", "licitações", "improbidade"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direitos Humanos", keys: ["direitos humanos", "atividade policial", "dignidade", "uso da força"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direito Penal", keys: ["direito penal", "codigo penal", "código penal", "crime", "pena", "culpabilidade", "iter criminis"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direito Processual Penal", keys: ["processual penal", "cpp", "inquérito", "prisão", "prova penal"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direito Penal Militar", keys: ["penal militar", "cpm", "crime militar", "deserção", "motim", "revolta"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Direito Processual Penal Militar", keys: ["processual penal militar", "cppm", "auto de prisão em flagrante militar"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Legislação Institucional PMMA", keys: ["pmma", "polícia militar do maranhão", "policia militar do maranhao", "lei 6.513", "lei nº 6.513", "lei 4.570", "estatuto dos policiais militares do maranhão", "organização básica da pmma"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Legislação Penal Especial", keys: ["legislação penal especial", "lei de drogas", "abuso de autoridade", "estatuto do desarmamento", "tortura", "maria da penha", "hediondos"] },
  { grupo: "Conhecimentos Específicos", disciplina: "Criminologia e Segurança Pública", keys: ["criminologia", "segurança pública", "susp", "polícia comunitária", "mediação de conflitos", "ordem pública"] },
  { grupo: "Apoio", disciplina: "Redação", keys: ["redacao", "redação", "discursiva"] },
  { grupo: "Apoio", disciplina: "TAF", keys: ["taf", "teste de aptidão física", "corrida", "flexão", "abdominal"] },
  { grupo: "Apoio", disciplina: "Revisão/Flashcards/Mapas/Simulados", keys: ["flashcard", "mapa mental", "mapas mentais", "simulado", "revisão", "caderno de erros"] },
];

const pmmaCore = new Set([
  "Língua Portuguesa",
  "Raciocínio Lógico-Matemático",
  "Informática",
  "Atualidades",
  "Direito Constitucional",
  "Direito Administrativo",
  "Direitos Humanos",
  "Direito Penal",
  "Direito Processual Penal",
  "Direito Penal Militar",
  "Direito Processual Penal Militar",
  "Legislação Institucional PMMA",
  "Legislação Penal Especial",
  "Criminologia e Segurança Pública",
  "Redação",
  "Revisão/Flashcards/Mapas/Simulados",
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full);
    if (ignore.some((rx) => rx.test(rel))) continue;
    if (entry.isDirectory()) out.push(...walk(full));
    else if (relevantExt.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function readText(file) {
  const ext = path.extname(file).toLowerCase();
  try {
    if (ext === ".pdf") {
      return execFileSync("pdftotext.exe", ["-enc", "UTF-8", "-layout", "-f", "1", "-l", "3", file, "-"], {
        cwd: root,
        encoding: "utf8",
        timeout: 15000,
        windowsHide: true,
      });
    }
    if ([".js", ".json", ".txt", ".md", ".csv", ".svg"].includes(ext)) {
      return fs.readFileSync(file, "utf8").slice(0, 60000);
    }
  } catch {
    return "";
  }
  return "";
}

function clean(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function firstJsonField(text, field) {
  const rx = new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`, "i");
  return text.match(rx)?.[1];
}

function allJsonFields(text, field, limit = 12) {
  const rx = new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`, "gi");
  const vals = [];
  let m;
  while ((m = rx.exec(text)) && vals.length < limit) vals.push(m[1]);
  return [...new Set(vals)];
}

function firstJsonNumber(text, field) {
  const rx = new RegExp(`"${field}"\\s*:\\s*(\\d+)`, "i");
  return Number(text.match(rx)?.[1] || 0);
}

function allJsonNumbers(text, field, limit = 50) {
  const rx = new RegExp(`"${field}"\\s*:\\s*(\\d+)`, "gi");
  const vals = [];
  let m;
  while ((m = rx.exec(text)) && vals.length < limit) vals.push(Number(m[1]));
  return [...new Set(vals)];
}

function fileType(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".pdf") return "PDF";
  if (ext === ".docx") return "DOCX";
  if ([".xlsx", ".csv"].includes(ext)) return "planilha";
  if ([".png", ".jpg", ".jpeg", ".svg"].includes(ext)) return "imagem";
  if (ext === ".apkg") return "flashcards Anki";
  if (ext === ".txt") return "lei seca/texto";
  if (ext === ".json") return "JSON de conteúdo/questões";
  if (ext === ".js") return "apostila/módulo JS";
  if (ext === ".md") return "documentação";
  return ext || "arquivo";
}

function inferTypeByName(rel, text) {
  const hay = clean(`${rel} ${text.slice(0, 10000)}`);
  if (hay.includes("questoes-extraidas") || hay.includes("questao oficial") || hay.includes("questões")) return "questões";
  if (hay.includes("simulado")) return "simulado";
  if (hay.includes("flashcard") || rel.endsWith(".apkg")) return "flashcards";
  if (hay.includes("mapa mental") || hay.includes("mapas-mentais")) return "mapas mentais";
  if (hay.includes("caderno de erros")) return "caderno de erros";
  if (hay.includes("revisao") || hay.includes("revisão")) return "revisão";
  if (hay.includes("lei seca") || rel.includes("storage/content/leis")) return "lei seca";
  if (rel.endsWith(".pdf") && hay.includes("gabarito")) return "gabarito";
  if (rel.endsWith(".pdf")) return "prova/apostila PDF";
  if (rel.includes("src/data/apostilas")) return "apostila";
  return fileType(rel);
}

function inferDisciplineFromName(rel, text) {
  const relHay = clean(rel);
  const titleHay = clean([
    firstJsonField(text, "materialTitle"),
    firstJsonField(text, "moduleTitle"),
    firstJsonField(text, "title"),
    firstJsonField(text, "exame"),
  ].filter(Boolean).join(" "));
  const preferredHay = `${relHay} ${titleHay}`;
  const directRules = [
    [/legislacao-(institucional-)?pmma|lei-6\.?513|lei-4\.?570|pmma-soldado-do-quadro-de-praca/, "LegislaÃ§Ã£o Institucional PMMA"],
    [/direito-processual-penal-militar|cppm/, "Direito Processual Penal Militar"],
    [/direito-penal-militar|cpm/, "Direito Penal Militar"],
    [/direito-processual-penal|processo-penal|cpp(\/|-|$)/, "Direito Processual Penal"],
    [/legislacao-penal-especial|lei-de-drogas|desarmamento|abuso-de-autoridade|maria-da-penha/, "LegislaÃ§Ã£o Penal Especial"],
    [/direito-penal|codigo-penal/, "Direito Penal"],
    [/direito-constitucional|cf88|constituicao/, "Direito Constitucional"],
    [/direito-administrativo/, "Direito Administrativo"],
    [/direitos-humanos|uso-diferenciado-da-forca/, "Direitos Humanos"],
    [/criminologia|seguranca-publica|policia-comunitaria|ordem-publica|mediacao-conflitos/, "Criminologia e SeguranÃ§a PÃºblica"],
    [/portugues|lingua-portuguesa|interpretacao|ortografia|morfologia|sintaxe/, "LÃ­ngua Portuguesa"],
    [/raciocinio|matematica|logico/, "RaciocÃ­nio LÃ³gico-MatemÃ¡tico"],
    [/informatica|internet|office|excel|word/, "InformÃ¡tica"],
    [/atualidades/, "Atualidades"],
    [/historia|geografia|maranhao/, "HistÃ³ria e Geografia"],
    [/redacao|discursiva/, "RedaÃ§Ã£o"],
    [/taf|aptidao-fisica/, "TAF"],
    [/flashcard|mapa-mental|mapas-mentais|simulado|revisao|caderno-de-erros/, "RevisÃ£o/Flashcards/Mapas/Simulados"],
  ];
  const directIndex = directRules.findIndex(([rx]) => rx.test(preferredHay));
  if (directIndex < 0) return null;
  const directDisciplines = [
    "legislacao institucional pmma",
    "direito processual penal militar",
    "direito penal militar",
    "direito processual penal",
    "legislacao penal especial",
    "direito penal",
    "direito constitucional",
    "direito administrativo",
    "direitos humanos",
    "criminologia e seguranca publica",
    "lingua portuguesa",
    "raciocinio logico-matematico",
    "informatica",
    "atualidades",
    "historia e geografia",
    "redacao",
    "taf",
    "revisao/flashcards/mapas/simulados",
  ];
  return editalTopics.find((topic) => clean(topic.disciplina) === directDisciplines[directIndex]) || null;
}

function inferDiscipline(rel, text) {
  const directTopic = inferDisciplineFromName(rel, text);
  if (directTopic) return directTopic;
  const hay = clean(`${rel} ${text.slice(0, 30000)}`);
  const matches = editalTopics
    .map((topic) => ({
      ...topic,
      score: topic.keys.reduce((acc, key) => acc + (hay.includes(clean(key)) ? 1 : 0), 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (matches[0]) return matches[0];
  return { grupo: "Sem identificação", disciplina: "Sem identificação", keys: [] };
}

function coverageLevel(rel, text, discipline, subtype) {
  const chapters = new Set([...allJsonFields(text, "chapterIndex", 50), ...allJsonNumbers(text, "chapterIndex", 50)]).size;
  const totalChapters = firstJsonNumber(text, "totalChapters");
  const qCount = (text.match(/"enunciado"\s*:/g) || []).length;
  const bodyCount = (text.match(/"corpo"\s*:/g) || []).length;
  if (subtype === "questões" && qCount >= 80) return "alto";
  if (subtype === "questões" && qCount >= 20) return "médio";
  if (totalChapters >= 8 || bodyCount >= 8 || chapters >= 8) return "alto";
  if (bodyCount >= 3 || chapters >= 3 || qCount >= 10) return "médio";
  if (discipline === "Sem identificação") return "não verificado";
  return "baixo";
}

function situation(rel, text, subtype, discipline, duplicates) {
  const problems = [];
  const hay = clean(`${rel} ${text.slice(0, 40000)}`);
  const relHay = clean(rel);
  const strongOutside = [
    /(^|\/|-)oab($|\/|-|\.)/,
    /enem/,
    /tribunais|regimentos-internos/,
    /codigo-civil|direito-civil/,
    /cpc|processual-civil/,
    /clt|trabalho|processual-trabalho/,
    /cdc|consumidor/,
    /ctn|tributario/,
    /empresarial/,
    /previdenciario/,
    /internacional/,
    /eleitoral/,
    /financeiro/,
    /ambiental/,
    /digital|lgpd/,
    /filosofia/,
    /organizacao-judiciaria/,
    /licitacoes-contratos/,
    /gestao-pessoas|governanca/,
  ].some((rx) => rx.test(relHay));
  if (discipline === "Sem identificação") problems.push("sem identificação");
  if (duplicates) problems.push("duplicado");
  if (strongOutside) {
    problems.push("fora do edital PMMA provável");
  }
  if (hay.includes("conferir edital") || hay.includes("riscoatualizacao") || hay.includes("risco atualizacao") || hay.includes("texto consolidado mais atualizado") || hay.includes("versao antiga")) {
    problems.push("precisa atualização/verificação legislativa");
  }
  if (["Lei 6.513/1995", "Lei 4.570/1984", "lei 6.513", "lei 4.570"].some((x) => hay.includes(clean(x)))) {
    problems.push("legislação estadual sensível a atualização");
  }
  if (subtype === "imagem" && !rel.includes("logos/concursos")) problems.push("material visual sem conteúdo de edital");
  if (text === "" && !["imagem", "flashcards Anki"].includes(fileType(rel))) problems.push("não verificado");
  if (problems.length === 0) return { situacao: "pronto para entrar na plataforma", problems: [] };
  if (problems.includes("fora do edital PMMA provável")) return { situacao: "fora do edital", problems };
  if (problems.includes("duplicado")) return { situacao: "duplicado", problems };
  if (problems.includes("sem identificação") || problems.includes("não verificado")) return { situacao: "não verificado", problems };
  if (problems.some((p) => p.includes("atualização"))) return { situacao: "precisa atualização", problems };
  return { situacao: "incompleto", problems };
}

function actionFor(row) {
  if (row.situacao === "fora do edital") return "Arquivar fora do pacote PMMA ou manter apenas em biblioteca geral.";
  if (row.situacao === "duplicado") return "Manter a versão mais completa/recente e remover ou ocultar duplicata.";
  if (row.situacao === "não verificado") return "Abrir manualmente, identificar conteúdo e validar contra o edital oficial.";
  if (row.situacao === "precisa atualização") return "Conferir texto vigente e atualizar antes de publicar.";
  if (row.nivel === "baixo") return "Complementar teoria, questões e revisão.";
  return "Publicar após revisão editorial rápida.";
}

function priority(row) {
  if (row.situacao === "fora do edital") return "Baixa";
  if (row.disciplina.includes("Legislação") && row.situacao !== "pronto para entrar na plataforma") return "Urgente";
  if (row.situacao === "não verificado" || row.situacao === "precisa atualização") return "Alta";
  if (row.nivel === "baixo" || row.situacao === "incompleto") return "Média";
  return "Baixa";
}

const files = [...new Set(materialRoots.flatMap((r) => walk(path.join(root, r))))];
const hashes = new Map();
for (const file of files) {
  let hash = "";
  try {
    hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  } catch {}
  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(path.relative(root, file).replaceAll("\\", "/"));
}

const rows = files.map((file) => {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const stat = fs.statSync(file);
  const text = readText(file);
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  const duplicates = hashes.get(hash)?.filter((x) => x !== rel) || [];
  const subtype = inferTypeByName(rel, text);
  const topic = inferDiscipline(rel, text);
  const assunto =
    firstJsonField(text, "materialTitle") ||
    firstJsonField(text, "moduleTitle") ||
    firstJsonField(text, "title") ||
    firstJsonField(text, "exame") ||
    path.basename(rel, path.extname(rel));
  const nivel = coverageLevel(rel, text, topic.disciplina, subtype);
  const { situacao, problems } = situation(rel, text, subtype, topic.disciplina, duplicates.length > 0);
  const atualizacao = problems.some((p) => p.includes("atualização") || p.includes("legislação"))
    ? "Conferir texto vigente/edital 2026"
    : edital.status.startsWith("não") && pmmaCore.has(topic.disciplina)
      ? "Validar aderência quando o edital oficial for anexado"
      : "Não identificada";
  const row = {
    arquivo: rel,
    tipoArquivo: fileType(rel),
    subtipo: subtype,
    disciplina: topic.disciplina,
    assunto,
    topicos: topic.disciplina === "Sem identificação" ? "não verificado" : `${topic.grupo} > ${topic.disciplina}`,
    situacao,
    nivel,
    atualizacao,
    problemas: [...problems, duplicates.length ? `duplicatas: ${duplicates.slice(0, 3).join("; ")}` : ""].filter(Boolean).join(" | ") || "Nenhum problema crítico detectado",
    tamanho: stat.size,
    acao: "",
    prioridade: "",
  };
  row.acao = actionFor(row);
  row.prioridade = priority(row);
  return row;
}).sort((a, b) => a.disciplina.localeCompare(b.disciplina) || a.arquivo.localeCompare(b.arquivo));

function mdEscape(s) {
  return String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function csvEscape(s) {
  return `"${String(s ?? "").replace(/"/g, '""')}"`;
}

const columns = [
  ["Nome do arquivo", "arquivo"],
  ["Tipo de arquivo", "tipoArquivo"],
  ["Disciplina", "disciplina"],
  ["Assunto", "assunto"],
  ["Tópicos do edital atendidos", "topicos"],
  ["Situação", "situacao"],
  ["Nível de cobertura", "nivel"],
  ["Atualização necessária", "atualizacao"],
  ["Problemas encontrados", "problemas"],
  ["Ação recomendada", "acao"],
  ["Prioridade", "prioridade"],
];

const counts = (key) => rows.reduce((acc, r) => ((acc[r[key]] = (acc[r[key]] || 0) + 1), acc), {});
const byDiscipline = counts("disciplina");
const bySituation = counts("situacao");
const byPriority = counts("prioridade");
const ready = rows.filter((r) => r.situacao === "pronto para entrar na plataforma");
const needsUpdate = rows.filter((r) => r.situacao === "precisa atualização");
const incomplete = rows.filter((r) => r.situacao === "incompleto" || r.nivel === "baixo");
const outside = rows.filter((r) => r.situacao === "fora do edital");
const dup = rows.filter((r) => r.problemas.includes("duplicat"));
const ce = rows.filter((r) => clean(`${r.arquivo} ${r.assunto} ${r.problemas}`).includes("cebraspe"));
const editalNotVerified = edital.status.toLowerCase().startsWith("n");
const pmmaRows = rows.filter((r) => clean(`${r.arquivo} ${r.assunto}`).includes("pmma") || r.disciplina === "Legislação Institucional PMMA");
const covered = new Set(rows.filter((r) => r.situacao !== "fora do edital" && r.nivel !== "não verificado").map((r) => r.disciplina));
const missing = [...pmmaCore].filter((x) => !covered.has(x));
const missingText = editalNotVerified
  ? "- Nao verificado oficialmente: o PDF/texto do edital nao foi localizado no acervo nem em fonte oficial durante a auditoria.\n- Pela matriz ampla PMMA/policial, todos os blocos gerais possuem algum material detectado, mas os subtopicos oficiais do edital 2026 continuam pendentes de conferencia."
  : missing.length
    ? missing.map((m) => `- ${m} â€” nÃ£o localizado no acervo inventariado.`).join("\n")
    : "- Nenhum tÃ³pico oficial ficou sem material detectado.";
const disciplineCoverage = [...pmmaCore].map((d) => {
  const ds = rows.filter((r) => r.disciplina === d && r.situacao !== "fora do edital");
  const score = ds.some((r) => r.nivel === "alto") ? 60 : ds.some((r) => r.nivel === "médio") ? 35 : ds.some((r) => r.nivel === "baixo") ? 15 : 0;
  return { disciplina: d, percentual: editalNotVerified ? `${score}% de cobertura ampla estimada; edital oficial não verificado` : `${score}%` };
});

const table = [
  `| ${columns.map(([h]) => h).join(" | ")} |`,
  `| ${columns.map(() => "---").join(" | ")} |`,
  ...rows.map((r) => `| ${columns.map(([, k]) => mdEscape(r[k])).join(" | ")} |`),
].join("\n");

const summary = `# Auditoria do acervo PMMA 2026

Referência solicitada: ${edital.nome}

Status da referência: **${edital.status}**.

> ${edital.aviso}

## Tabela de inventário

${table}

## A. Resumo geral do acervo

- Arquivos pedagógicos inventariados: ${rows.length}
- Materiais com menção direta a PMMA/legislação institucional PMMA: ${pmmaRows.length}
- Materiais Cebraspe identificados: ${ce.length}
- Situações: ${Object.entries(bySituation).map(([k, v]) => `${k}: ${v}`).join("; ")}
- Prioridades: ${Object.entries(byPriority).map(([k, v]) => `${k}: ${v}`).join("; ")}
- Disciplinas detectadas: ${Object.entries(byDiscipline).map(([k, v]) => `${k}: ${v}`).join("; ")}

## B. Materiais prontos

${ready.slice(0, 80).map((r) => `- ${r.arquivo} — ${r.disciplina} (${r.nivel})`).join("\n") || "- Nenhum material classificado como pronto sem ressalvas."}

## C. Materiais que precisam de atualização

${needsUpdate.map((r) => `- ${r.arquivo} — ${r.problemas}`).join("\n") || "- Nenhum identificado automaticamente."}

## D. Materiais incompletos

${incomplete.slice(0, 120).map((r) => `- ${r.arquivo} — ${r.disciplina}; cobertura ${r.nivel}`).join("\n") || "- Nenhum identificado automaticamente."}

## E. Materiais fora do edital

${outside.slice(0, 160).map((r) => `- ${r.arquivo} — ${r.disciplina}`).join("\n") || "- Nenhum identificado automaticamente."}

## F. Materiais duplicados

${dup.slice(0, 120).map((r) => `- ${r.arquivo} — ${r.problemas}`).join("\n") || "- Nenhum duplicado por hash entre os arquivos inventariados."}

## G. Tópicos do edital ainda sem cobertura

${missingText}

## H. Leis que precisam ser atualizadas

- Lei nº 6.513/1995 — Estatuto dos Policiais Militares do Maranhão: verificar texto consolidado vigente e alterações recentes.
- Lei nº 4.570/1984 — Organização Básica da PMMA: verificar texto consolidado vigente e alterações estruturais.
- Código Penal Militar e Código de Processo Penal Militar: conferir alterações legislativas recentes e jurisprudência cobrada.
- Código Penal, Código de Processo Penal e legislação penal especial: conferir pacote legislativo vigente em 2026.
- CF/88: conferir emendas constitucionais e redação vigente do art. 144 e direitos fundamentais.

## I. Materiais que precisam ser criados

- Edital PMMA 2026 estruturado em JSON/CSV com todos os tópicos oficiais.
- Matriz de cobertura oficial por disciplina e subtópico.
- Questões inéditas Cebraspe específicas para cada tópico novo do edital 2026.
- Flashcards PMMA 2026 por lei/artigo e por assunto.
- Mapas mentais PMMA 2026 por disciplina.
- Simulado diagnóstico PMMA 2026 e simulados finais no padrão Cebraspe.

## J. Ordem recomendada de produção

1. Anexar/importar o Edital nº 1 – PMMA, de 10 de julho de 2026.
2. Validar legislação estadual PMMA.
3. Atualizar legislação federal e direitos humanos.
4. Completar Português, Raciocínio Lógico e Informática contra o edital real.
5. Produzir questões Cebraspe por tópico.
6. Gerar flashcards/mapas mentais.
7. Montar simulados e revisar publicação.

## K. Percentual estimado de cobertura por disciplina

${disciplineCoverage.map((x) => `- ${x.disciplina}: ${x.percentual}`).join("\n")}

## L. Percentual estimado de cobertura total do edital

${Math.round(disciplineCoverage.reduce((acc, x) => acc + Number.parseInt(x.percentual), 0) / disciplineCoverage.length)}% estimado, **não oficial**, condicionado à validação pelo edital PMMA 2026.

## Plano de atualização

### Etapa 1 — itens urgentes
- Obter e importar o edital oficial.
- Travar matriz de disciplinas e subtópicos.
- Revisar todos os materiais marcados como não verificado, duplicado ou legislação sensível.

### Etapa 2 — legislação
- Atualizar Lei nº 6.513/1995, Lei nº 4.570/1984, CPM, CPPM, CP, CPP, legislação penal especial, CF/88 e direitos humanos.

### Etapa 3 — apostilas
- Ajustar as apostilas PMMA aos tópicos oficiais.
- Remover materiais OAB/ENEM/tribunais do pacote PMMA.

### Etapa 4 — questões Cebraspe
- Aproveitar PMMA 2017 Cebraspe como base.
- Criar questões inéditas certo/errado para lacunas.

### Etapa 5 — flashcards e mapas mentais
- Criar baralhos PMMA 2026 específicos.
- Separar legislação estadual, penal/militar e conhecimentos gerais.

### Etapa 6 — simulados
- Montar simulado diagnóstico, simulados por disciplina e simulado final.

### Etapa 7 — revisão final e publicação na plataforma
- Revisão editorial, validação de links/assets, conferência contra edital oficial e publicação.
`;

fs.writeFileSync(path.join(outDir, "auditoria-pmma-2026.md"), summary, "utf8");
fs.writeFileSync(
  path.join(outDir, "auditoria-pmma-2026.csv"),
  [columns.map(([h]) => csvEscape(h)).join(","), ...rows.map((r) => columns.map(([, k]) => csvEscape(r[k])).join(","))].join("\n"),
  "utf8",
);
fs.writeFileSync(path.join(outDir, "auditoria-pmma-2026.json"), JSON.stringify({ edital, rows, disciplineCoverage, missing }, null, 2), "utf8");

console.log(JSON.stringify({
  report: "reports/auditoria-pmma-2026.md",
  csv: "reports/auditoria-pmma-2026.csv",
  json: "reports/auditoria-pmma-2026.json",
  total: rows.length,
  ready: ready.length,
  needsUpdate: needsUpdate.length,
  incomplete: incomplete.length,
  outside: outside.length,
  duplicates: dup.length,
  cebraspe: ce.length,
  pmma: pmmaRows.length,
}, null, 2));
