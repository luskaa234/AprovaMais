import { parse } from "csv-parse/sync";
import { Buffer } from "node:buffer";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import process from "node:process";

const CSV_FOLDER = process.env.QUESTOES_CSV_FOLDER || "./material-concurso";
const OUTPUT_FOLDER = "./public/questoes";
const SAMPLE_PER_FILE = Number(process.env.QUESTOES_SAMPLE_PER_FILE || 250);

const materiaMap = {
  "codigo-de-transito-brasileiro": "CTB",
  "direito-administrativo": "Direito Administrativo",
  "direito-constitucional": "Direito Constitucional",
  "direito-penal": "Direito Penal",
  "direito-processual-penal": "Direito Processual Penal",
  informatica: "Informatica",
  "legislacao-penal-especial": "Legislacao Penal Especial",
  portugues: "Portugues",
  "raciocinio-logico-e-matematica": "Raciocinio Logico",
};

function fixText(value = "") {
  const text = String(value || "").trim();
  const recovered = /[ÃÂ]/.test(text) ? Buffer.from(text, "latin1").toString("utf8") : text;
  return recovered.replace(/\uFFFD/g, "").replace(/\s+/g, " ").trim();
}

function decodeCsv(filepath) {
  const buffer = readFileSync(filepath);
  const utf8 = buffer.toString("utf8");
  const latin1 = buffer.toString("latin1");
  const score = (text) => (text.match(/�/g)?.length || 0) * 4 + (text.match(/[ÃÂ]/g)?.length || 0);
  return score(latin1) < score(utf8) ? latin1 : utf8;
}

function normalizeDifficulty(value = "") {
  const text = fixText(value).toLowerCase();
  if (text.includes("dif")) return "dificil";
  if (text.includes("m")) return "medio";
  return "facil";
}

function materiaFromFile(file) {
  const lower = file.toLowerCase();
  const key = Object.keys(materiaMap).find((item) => lower.includes(item));
  return key ? materiaMap[key] : "Geral";
}

function mapRow(row, materia, file, index) {
  const gabarito = fixText(row.gabarito).toLowerCase();
  return {
    id: `local-${basename(file, ".csv")}-${row.id || index + 1}`,
    codigo: fixText(row.codigo),
    banca: fixText(row.banca_referencia || row.banca || "PM"),
    materia,
    topico: fixText(row.topico),
    dificuldade: normalizeDifficulty(row.dificuldade),
    enunciado: fixText(row.enunciado),
    alternativa_a: fixText(row.alternativa_a),
    alternativa_b: fixText(row.alternativa_b),
    alternativa_c: fixText(row.alternativa_c),
    alternativa_d: fixText(row.alternativa_d),
    alternativa_e: fixText(row.alternativa_e),
    gabarito,
    comentario: fixText(row.comentario),
    concurso: "PM",
  };
}

function hasReplacement(row) {
  return Object.values(row).some((value) => typeof value === "string" && value.includes("\uFFFD"));
}

if (!existsSync(CSV_FOLDER)) throw new Error(`Pasta nao encontrada: ${CSV_FOLDER}`);
mkdirSync(OUTPUT_FOLDER, { recursive: true });

const sample = [];
const files = readdirSync(CSV_FOLDER).filter((file) => file.toLowerCase().endsWith(".csv")).sort();
const stats = { totalDisponivel: 0, arquivos: [] };

for (const file of files) {
  const filepath = join(CSV_FOLDER, file);
  const raw = decodeCsv(filepath);
  const rows = parse(raw, { columns: true, skip_empty_lines: true, relax_quotes: true, bom: true });
  const materia = materiaFromFile(file);
  const picked = [];
  for (let index = 0; index < rows.length && picked.length < SAMPLE_PER_FILE; index += 1) {
    const row = rows[index];
    if (hasReplacement(row)) continue;
    const mapped = mapRow(row, materia, file, index);
    if (mapped.enunciado && mapped.gabarito) picked.push(mapped);
  }
  sample.push(...picked);
  stats.totalDisponivel += rows.length;
  stats.arquivos.push({ arquivo: file, materia, total: rows.length, amostra: picked.length });
}

writeFileSync(join(OUTPUT_FOLDER, "sample.json"), `${JSON.stringify(sample, null, 2)}\n`, "utf8");
writeFileSync(join(OUTPUT_FOLDER, "stats.json"), `${JSON.stringify(stats, null, 2)}\n`, "utf8");

console.table(stats.arquivos);
console.log(`Amostra local: ${sample.length.toLocaleString("pt-BR")} questoes`);
console.log(`Total disponivel nos CSVs: ${stats.totalDisponivel.toLocaleString("pt-BR")} questoes`);
