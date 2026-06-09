import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import * as dotenv from "dotenv";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CSV_FOLDER = process.env.QUESTOES_CSV_FOLDER || "./material-concurso";
const BATCH_SIZE = Number(process.env.IMPORT_BATCH_SIZE || 500);

const MATERIA_MAP = {
  direito_constitucional: "Direito Constitucional",
  direito_administrativo: "Direito Administrativo",
  direito_penal: "Direito Penal",
  direito_processual_penal: "Direito Processual Penal",
  portugues: "Portugues",
  informatica: "Informatica",
  raciocinio_logico_e_matematica: "Raciocinio Logico",
  legislacao_penal_especial: "Legislacao Penal Especial",
  codigo_de_transito_brasileiro_ctb_lei_n_9_503_97: "CTB",
};

function normalizeDificuldade(value = "") {
  const raw = value.toLowerCase();
  if (raw.includes("dific")) return "dificil";
  if (raw.includes("medio") || raw.includes("médio")) return "medio";
  return "facil";
}

function detectMateria(filename) {
  const lower = filename.toLowerCase();
  const key = Object.keys(MATERIA_MAP).find((item) => lower.includes(item));
  return key ? MATERIA_MAP[key] : null;
}

function makeRow(row, materia) {
  return {
    id: String(row.id || row.codigo || crypto.randomUUID()),
    codigo: row.codigo || null,
    banca: row.banca_referencia || row.banca || null,
    materia,
    topico: row.topico || row.assunto || null,
    dificuldade: normalizeDificuldade(row.dificuldade),
    enunciado: row.enunciado,
    alternativa_a: row.alternativa_a,
    alternativa_b: row.alternativa_b,
    alternativa_c: row.alternativa_c,
    alternativa_d: row.alternativa_d,
    alternativa_e: row.alternativa_e,
    gabarito: String(row.gabarito || "").trim().toLowerCase(),
    comentario: row.comentario || null,
    concurso: row.concurso || "PM",
  };
}

async function importarCSV(supabase, filepath, materia) {
  console.log(`\nImportando ${materia}: ${filepath}`);
  const content = readFileSync(filepath, "utf-8");
  const rows = parse(content, { columns: true, skip_empty_lines: true, relax_quotes: true, bom: true });
  let total = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const lote = rows.slice(i, i + BATCH_SIZE).map((row) => makeRow(row, materia)).filter((row) => row.enunciado && row.gabarito);
    if (!lote.length) continue;
    const { error } = await supabase.from("questoes").upsert(lote, { onConflict: "id" });
    if (error) throw new Error(`Falha no lote ${i}-${i + BATCH_SIZE}: ${error.message}`);
    total += lote.length;
    process.stdout.write(`  ${total}/${rows.length}\r`);
  }

  console.log(`\nConcluido: ${total} questoes`);
  return total;
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) throw new Error("Preencha VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.");
  if (!existsSync(CSV_FOLDER)) throw new Error(`Pasta nao encontrada: ${CSV_FOLDER}`);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const files = readdirSync(CSV_FOLDER).filter((file) => file.toLowerCase().endsWith(".csv"));
  let totalGeral = 0;

  for (const file of files) {
    const materia = detectMateria(file);
    if (!materia) {
      console.log(`Pulando arquivo sem materia mapeada: ${file}`);
      continue;
    }
    totalGeral += await importarCSV(supabase, join(CSV_FOLDER, file), materia);
  }

  console.log(`\nImportacao concluida. Total: ${totalGeral.toLocaleString("pt-BR")} questoes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
