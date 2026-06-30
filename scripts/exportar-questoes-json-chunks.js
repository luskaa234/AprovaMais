import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const OUTPUT_FOLDER = "./public/questoes";
const CHUNK_FOLDER = join(OUTPUT_FOLDER, "chunks");
const CHUNK_SIZE = Number(process.env.QUESTOES_CHUNK_SIZE || 100);

const sources = [
  { file: "oab.json", area: "oab" },
  { file: "militar.json", area: "militar" },
];

function cleanKey(value = "") {
  return String(value || "geral")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "geral";
}

function addCount(target, key) {
  const value = String(key || "").trim();
  if (value) target[value] = (target[value] || 0) + 1;
}

function writeChunk(rows, catalog, source, materia, index, start) {
  if (!rows.length) return;
  const filename = `${source.area}-${cleanKey(materia)}-${String(index).padStart(3, "0")}.json`;
  const path = `/questoes/chunks/${filename}`;
  writeFileSync(join(CHUNK_FOLDER, filename), `${JSON.stringify(rows)}\n`, "utf8");
  catalog.chunks.push({
    path,
    area: source.area,
    materia: materia || "Geral",
    count: rows.length,
    start,
    end: start + rows.length - 1,
  });
}

mkdirSync(OUTPUT_FOLDER, { recursive: true });
mkdirSync(CHUNK_FOLDER, { recursive: true });
for (const file of readdirSync(CHUNK_FOLDER)) {
  if (file.toLowerCase().endsWith(".json")) rmSync(join(CHUNK_FOLDER, file), { force: true });
}

const catalog = {
  chunkSize: CHUNK_SIZE,
  totalDisponivel: 0,
  totalExportado: 0,
  chunks: [],
  materias: {},
  bancas: {},
  dificuldades: {},
  anos: {},
  topicos: {},
  concursos: {},
  areas: {
    geral: { total: 0, materias: {}, bancas: {}, dificuldades: {}, anos: {}, concursos: {} },
  },
  arquivos: [],
};

for (const source of sources) {
  const filepath = join(OUTPUT_FOLDER, source.file);
  if (!existsSync(filepath)) continue;

  const rows = JSON.parse(readFileSync(filepath, "utf8"));
  const areaStats = catalog.areas[source.area] || { total: 0, materias: {}, bancas: {}, dificuldades: {}, anos: {}, concursos: {} };
  const groups = new Map();

  rows.forEach((row) => {
    const materia = row.materia || row.materiaLabel || "Geral";
    if (!groups.has(materia)) groups.set(materia, []);
    groups.get(materia).push(row);

    addCount(catalog.materias, materia);
    addCount(catalog.bancas, row.banca);
    addCount(catalog.dificuldades, row.dificuldade);
    addCount(catalog.anos, row.ano);
    addCount(catalog.topicos, row.topico || row.assunto);
    addCount(catalog.concursos, row.concurso || row.orgao);

    addCount(areaStats.materias, materia);
    addCount(areaStats.bancas, row.banca);
    addCount(areaStats.dificuldades, row.dificuldade);
    addCount(areaStats.anos, row.ano);
    addCount(areaStats.concursos, row.concurso || row.orgao);
  });

  let exported = 0;
  for (const [materia, groupRows] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"))) {
    for (let offset = 0; offset < groupRows.length; offset += CHUNK_SIZE) {
      const chunk = groupRows.slice(offset, offset + CHUNK_SIZE);
      writeChunk(chunk, catalog, source, materia, Math.floor(offset / CHUNK_SIZE) + 1, catalog.totalExportado);
      catalog.totalExportado += chunk.length;
      exported += chunk.length;
    }
  }

  catalog.totalDisponivel += rows.length;
  catalog.areas[source.area] = { ...areaStats, total: rows.length };
  catalog.areas.geral.total += rows.length;
  catalog.arquivos.push({ arquivo: source.file, area: source.area, total: rows.length, exportado: exported });
  console.log(`${source.area}: ${exported.toLocaleString("pt-BR")} exportadas em chunks`);
}

writeFileSync(join(OUTPUT_FOLDER, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
writeFileSync(join(OUTPUT_FOLDER, "stats.json"), `${JSON.stringify({
  totalDisponivel: catalog.totalDisponivel,
  totalExportado: catalog.totalExportado,
  arquivos: catalog.arquivos,
}, null, 2)}\n`, "utf8");

console.log(`Chunks: ${catalog.chunks.length.toLocaleString("pt-BR")}`);
console.log(`Questoes exportadas: ${catalog.totalExportado.toLocaleString("pt-BR")}`);
