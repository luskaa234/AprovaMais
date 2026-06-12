import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import process from "node:process";
import { hasEncodingSuspicion, normalizeContentObject, normalizeContentText } from "../src/utils/textEncoding.js";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const LIMIT = Number(process.env.ENCODING_DRY_RUN_LIMIT || 500);
const EXAMPLE_LIMIT = Number(process.env.ENCODING_DRY_RUN_EXAMPLES || 20);

const TABLES = [
  {
    name: "questoes",
    select: "id,enunciado,alternativa_a,alternativa_b,alternativa_c,alternativa_d,alternativa_e,comentario,materia,topico,banca,concurso",
    textFields: ["enunciado", "alternativa_a", "alternativa_b", "alternativa_c", "alternativa_d", "alternativa_e", "comentario", "materia", "topico", "banca", "concurso"],
  },
  {
    name: "leis",
    select: "id,nome,nome_curto,categoria",
    textFields: ["nome", "nome_curto", "categoria"],
  },
  {
    name: "leis_artigos",
    select: "id,lei_id,numero_texto,texto,capitulo,tags",
    textFields: ["numero_texto", "texto", "capitulo", "tags"],
  },
];

function flattenChangedFields(row, fields) {
  const normalized = normalizeContentObject(row);
  return fields
    .map((field) => ({
      field,
      before: row[field],
      after: normalized[field],
    }))
    .filter(({ before, after }) => JSON.stringify(before) !== JSON.stringify(after) || hasEncodingSuspicion(before));
}

async function scanTable(supabase, table) {
  const { data, error } = await supabase.from(table.name).select(table.select).limit(LIMIT);
  if (error) {
    return { table: table.name, error: error.message, changes: [] };
  }

  const changes = [];
  let suspectedRows = 0;
  for (const row of data || []) {
    const changedFields = flattenChangedFields(row, table.textFields);
    if (!changedFields.length) continue;
    suspectedRows += 1;
    if (changes.length >= EXAMPLE_LIMIT) continue;
    changes.push({
      id: row.id,
      fields: changedFields.map(({ field, before, after }) => ({
        field,
        before: normalizeContentText(Array.isArray(before) ? before.join(", ") : before).slice(0, 220),
        after: normalizeContentText(Array.isArray(after) ? after.join(", ") : after).slice(0, 220),
      })),
    });
  }

  return { table: table.name, totalRead: data?.length || 0, suspectedRows, examples: changes };
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY ou VITE_SUPABASE_ANON_KEY no .env.");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  const reports = [];
  for (const table of TABLES) {
    reports.push(await scanTable(supabase, table));
  }

  console.log(JSON.stringify({
    mode: "dry-run",
    wroteToDatabase: false,
    limitPerTable: LIMIT,
    exampleLimitPerTable: EXAMPLE_LIMIT,
    reports,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
