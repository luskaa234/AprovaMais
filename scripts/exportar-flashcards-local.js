import AdmZip from "adm-zip";
import Database from "better-sqlite3";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { tmpdir } from "node:os";
import process from "node:process";

const APKG_FOLDER = process.env.FLASHCARDS_APKG_FOLDER || "./flashcards-apkg";
const OUTPUT_FILE = "./public/flashcards/decks.json";

function stripHtml(text = "") {
  return text
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(div|p|li|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromFile(file) {
  return basename(file, ".apkg")
    .replace(/^amostra[-_\s]+/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function materiaFromTitle(title) {
  if (title.includes("PF") || title.includes("PRF")) return "Carreiras Policiais";
  if (title.includes("PM")) return "Policia Militar";
  if (title.includes("PC")) return "Policia Civil";
  if (title.includes("PP")) return "Policia Penal";
  if (title.includes("DETRAN")) return "Transito";
  return "Concursos";
}

function extractApkg(filepath) {
  const tempDir = join(tmpdir(), `aprova-apkg-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(tempDir, { recursive: true });
  new AdmZip(filepath).extractAllTo(tempDir, true);
  const dbPath = ["collection.anki21b", "collection.anki21", "collection.anki2"].map((file) => join(tempDir, file)).find(existsSync);
  if (!dbPath) throw new Error(`Banco Anki nao encontrado em ${filepath}`);
  return { tempDir, dbPath };
}

function readCards(filepath, deckId) {
  const { tempDir, dbPath } = extractApkg(filepath);
  try {
    const db = new Database(dbPath, { readonly: true });
    const notes = db.prepare("select id, flds from notes").all();
    db.close();

    const seen = new Set();
    return notes
      .map((note, index) => {
        const fields = String(note.flds || "").split("\x1f").map(stripHtml).filter(Boolean);
        const frente = fields[0] || "";
        const verso = fields.slice(1).join(" ").trim();
        const key = `${frente}\n${verso}`.toLowerCase();
        if (!frente || !verso || seen.has(key)) return null;
        seen.add(key);
        return {
          id: `${deckId}-card-${note.id || index + 1}`,
          frente,
          verso,
          easeFactor: 2.5,
          interval: 1,
          repetitions: 0,
          dueAt: new Date().toISOString().slice(0, 10),
        };
      })
      .filter(Boolean);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

if (!existsSync(APKG_FOLDER)) throw new Error(`Pasta nao encontrada: ${APKG_FOLDER}`);

mkdirSync("./public/flashcards", { recursive: true });

const decks = readdirSync(APKG_FOLDER)
  .filter((file) => file.toLowerCase().endsWith(".apkg"))
  .sort((a, b) => a.localeCompare(b, "pt-BR"))
  .map((file, index) => {
    const titulo = titleFromFile(file);
    const id = `apkg-${index + 1}-${titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    const cards = readCards(join(APKG_FOLDER, file), id);
    return {
      id,
      titulo,
      materia: materiaFromTitle(titulo),
      concurso: titulo,
      origem: "apkg",
      retencao: 0,
      cards,
    };
  })
  .filter((deck) => deck.cards.length);

writeFileSync(OUTPUT_FILE, `${JSON.stringify(decks, null, 2)}\n`, "utf8");

console.table(decks.map((deck) => ({ deck: deck.titulo, cards: deck.cards.length })));
console.log(`Total: ${decks.reduce((sum, deck) => sum + deck.cards.length, 0).toLocaleString("pt-BR")} flashcards em ${decks.length} decks.`);
