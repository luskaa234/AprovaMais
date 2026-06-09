import { createClient } from "@supabase/supabase-js";
import AdmZip from "adm-zip";
import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, join } from "node:path";
import { tmpdir } from "node:os";
import process from "node:process";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const USER_ID = process.env.FLASHCARDS_USER_ID;
const APKG_FOLDER = process.env.FLASHCARDS_APKG_FOLDER || "./flashcards-apkg";
const BATCH_SIZE = Number(process.env.IMPORT_BATCH_SIZE || 500);

function stripHtml(text = "") {
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractApkg(filepath) {
  const tempDir = join(tmpdir(), `aprova-apkg-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(tempDir, { recursive: true });
  new AdmZip(filepath).extractAllTo(tempDir, true);
  const dbPath = ["collection.anki21b", "collection.anki21", "collection.anki2"].map((file) => join(tempDir, file)).find(existsSync);
  if (!dbPath) throw new Error(`Banco Anki nao encontrado em ${filepath}`);
  return { tempDir, dbPath };
}

function readCards(filepath) {
  const { tempDir, dbPath } = extractApkg(filepath);
  try {
    const db = new Database(dbPath, { readonly: true });
    const notes = db.prepare("select flds from notes").all();
    db.close();
    return notes
      .map((note) => {
        const [front, back] = String(note.flds || "").split("\x1f");
        return { frente: stripHtml(front), verso: stripHtml(back) };
      })
      .filter((card) => card.frente && card.verso);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

async function importApkg(supabase, filepath) {
  const title = basename(filepath, ".apkg").replace(/[_-]+/g, " ");
  console.log(`\nImportando deck: ${title}`);
  const cards = readCards(filepath);
  const { data: deck, error: deckError } = await supabase
    .from("flashcard_decks")
    .insert({ user_id: USER_ID, titulo: title, materia: title, concurso: "PM", origem: "apkg" })
    .select("id")
    .single();
  if (deckError) throw deckError;

  let total = 0;
  for (let i = 0; i < cards.length; i += BATCH_SIZE) {
    const lote = cards.slice(i, i + BATCH_SIZE).map((card) => ({ deck_id: deck.id, ...card }));
    const { error } = await supabase.from("flashcards").insert(lote);
    if (error) throw error;
    total += lote.length;
    process.stdout.write(`  ${total}/${cards.length}\r`);
  }
  console.log(`\nConcluido: ${total} flashcards`);
  return total;
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) throw new Error("Preencha VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.");
  if (!USER_ID) throw new Error("Preencha FLASHCARDS_USER_ID com o id do usuario dono dos decks.");
  if (!existsSync(APKG_FOLDER)) throw new Error(`Pasta nao encontrada: ${APKG_FOLDER}`);

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const files = readdirSync(APKG_FOLDER).filter((file) => file.toLowerCase().endsWith(".apkg"));
  let total = 0;
  for (const file of files) total += await importApkg(supabase, join(APKG_FOLDER, file));
  console.log(`\nImportacao concluida. Total: ${total.toLocaleString("pt-BR")} flashcards.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
