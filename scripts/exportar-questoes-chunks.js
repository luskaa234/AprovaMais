import { parse } from "csv-parse/sync";
import { Buffer } from "node:buffer";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import process from "node:process";

const CSV_FOLDER = process.env.QUESTOES_CSV_FOLDER || "./material-concurso";
const OUTPUT_FOLDER = "./public/questoes";
const CHUNK_FOLDER = join(OUTPUT_FOLDER, "chunks");
const CHUNK_SIZE = Number(process.env.QUESTOES_CHUNK_SIZE || 1000);

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
  const score = (text) => (text.match(/\uFFFD/g)?.length || 0) * 4 + (text.match(/[ÃÂ]/g)?.length || 0);
  return score(latin1) < score(utf8) ? latin1 : utf8;
}

function normalizeDifficulty(value = "") {
  const text = fixText(value).toLowerCase();
  if (text.includes("dif")) return "dificil";
  if (text.includes("m")) return "medio";
  return "facil";
}

function extractYear(row) {
  const explicit = fixText(row.ano);
  if (/^20\d{2}$/.test(explicit)) return explicit;
  const text = `${row.enunciado || ""} ${row.codigo || ""}`;
  const match = text.match(/\b(20\d{2})\b/);
  return match?.[1] || "";
}

function materiaFromFile(file) {
  const lower = file.toLowerCase();
  const key = Object.keys(materiaMap).find((item) => lower.includes(item));
  return key ? materiaMap[key] : "Geral";
}

function hasReplacement(row) {
  return Object.values(row).some((value) => typeof value === "string" && value.includes("\uFFFD"));
}

function mapRow(row, materia, file, index) {
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
    gabarito: fixText(row.gabarito).toLowerCase(),
    comentario: fixText(row.comentario),
    ano: extractYear(row),
    concurso: "PM",
  };
}

function writeChunk(chunk, chunks, globalStart, fileSlug, chunkIndex, materia) {
  if (!chunk.length) return;
  const filename = `${fileSlug}-${String(chunkIndex).padStart(3, "0")}.json`;
  const path = `/questoes/chunks/${filename}`;
  writeFileSync(join(CHUNK_FOLDER, filename), `${JSON.stringify(chunk)}\n`, "utf8");
  chunks.push({
    path,
    materia,
    count: chunk.length,
    start: globalStart,
    end: globalStart + chunk.length - 1,
  });
}

if (!existsSync(CSV_FOLDER)) throw new Error(`Pasta nao encontrada: ${CSV_FOLDER}`);
mkdirSync(OUTPUT_FOLDER, { recursive: true });
rmSync(CHUNK_FOLDER, { recursive: true, force: true });
mkdirSync(CHUNK_FOLDER, { recursive: true });

const files = readdirSync(CSV_FOLDER).filter((file) => file.toLowerCase().endsWith(".csv")).sort();
const catalog = {
  chunkSize: CHUNK_SIZE,
  totalDisponivel: 0,
  totalExportado: 0,
  chunks: [],
  materias: {},
  bancas: {},
  dificuldades: {},
  anos: {},
  arquivos: [],
};

for (const file of files) {
  const filepath = join(CSV_FOLDER, file);
  const materia = materiaFromFile(file);
  const fileSlug = basename(file, ".csv");
  const rows = parse(decodeCsv(filepath), { columns: true, skip_empty_lines: true, relax_quotes: true, bom: true });
  let chunk = [];
  let chunkIndex = 1;
  let exported = 0;

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (hasReplacement(row)) continue;
    const mapped = mapRow(row, materia, file, index);
    if (!mapped.enunciado || !mapped.gabarito) continue;

    chunk.push(mapped);
    exported += 1;
    catalog.materias[materia] = (catalog.materias[materia] || 0) + 1;
    catalog.bancas[mapped.banca] = (catalog.bancas[mapped.banca] || 0) + 1;
    catalog.dificuldades[mapped.dificuldade] = (catalog.dificuldades[mapped.dificuldade] || 0) + 1;
    if (mapped.ano) catalog.anos[mapped.ano] = (catalog.anos[mapped.ano] || 0) + 1;

    if (chunk.length >= CHUNK_SIZE) {
      writeChunk(chunk, catalog.chunks, catalog.totalExportado, fileSlug, chunkIndex, materia);
      catalog.totalExportado += chunk.length;
      chunk = [];
      chunkIndex += 1;
    }
  }

  writeChunk(chunk, catalog.chunks, catalog.totalExportado, fileSlug, chunkIndex, materia);
  catalog.totalExportado += chunk.length;
  catalog.totalDisponivel += rows.length;
  catalog.arquivos.push({ arquivo: file, materia, total: rows.length, exportado: exported });
  console.log(`${materia}: ${exported.toLocaleString("pt-BR")} exportadas de ${rows.length.toLocaleString("pt-BR")}`);
}

writeFileSync(join(OUTPUT_FOLDER, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
writeFileSync(join(OUTPUT_FOLDER, "stats.json"), `${JSON.stringify({ totalDisponivel: catalog.totalDisponivel, totalExportado: catalog.totalExportado, arquivos: catalog.arquivos }, null, 2)}\n`, "utf8");

console.log(`Chunks: ${catalog.chunks.length.toLocaleString("pt-BR")}`);
console.log(`Questoes exportadas: ${catalog.totalExportado.toLocaleString("pt-BR")}`);
console.log(`Questoes nos CSVs: ${catalog.totalDisponivel.toLocaleString("pt-BR")}`);
