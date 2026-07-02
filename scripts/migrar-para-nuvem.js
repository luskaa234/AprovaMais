/**
 * Script de migração: importa todo conteúdo local para o Supabase.
 *
 * Pré-requisito: execute supabase/migrate_to_cloud.sql no painel SQL do Supabase.
 *
 * Uso:
 *   node scripts/migrar-para-nuvem.js
 *
 * Variáveis necessárias no .env:
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { normalizeContentText, normalizeContentObject } from "../src/utils/textEncoding.js";

dotenv.config();

// Garante só a origem (remove /rest/v1/ ou qualquer sufixo de path)
const SUPABASE_URL = new URL(process.env.VITE_SUPABASE_URL).origin;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BATCH = 500;
// Usa process.cwd() para evitar problemas com espaços no caminho no Windows
const ROOT = process.cwd();

// ─── helpers ────────────────────────────────────────────────────────────────

function readJson(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  return JSON.parse(readFileSync(abs, "utf-8"));
}

async function upsertBatch(supabase, table, rows, conflict) {
  for (let i = 0; i < rows.length; i += BATCH) {
    const slice = rows.slice(i, i + BATCH);
    const { error } = await supabase.from(table).upsert(slice, { onConflict: conflict, ignoreDuplicates: true });
    if (error) throw new Error(`[${table}] lote ${i}: ${error.message}`);
    process.stdout.write(`  ${Math.min(i + BATCH, rows.length)}/${rows.length}\r`);
  }
}

async function ensurePrivateBucket(supabase, name) {
  const { error } = await supabase.storage.createBucket(name, { public: false });
  if (error && !error.message.includes("already exists")) throw error;

  const { error: updateError } = await supabase.storage.updateBucket(name, { public: false });
  if (updateError) throw updateError;
}

async function uploadFile(supabase, bucket, storagePath, filePath, mimeType) {
  const bytes = readFileSync(filePath);
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, bytes, { contentType: mimeType, upsert: true });
  if (error) throw new Error(`Upload ${storagePath}: ${error.message}`);
  return {
    bucket,
    storage_path: storagePath,
    filename: storagePath.split("/").pop(),
    mime_type: mimeType,
    size: bytes.length,
  };
}

// ─── 1. Questões OAB ────────────────────────────────────────────────────────

async function importarQuestoesOab(supabase) {
  console.log("\n[1/6] Questões OAB...");
  const raw = readJson("public/questoes/oab.json");
  if (!raw) return console.log("  Arquivo não encontrado, pulando.");

  const rows = raw
    .filter((q) => q.enunciado && q.gabarito)
    .map((q) => ({
      id: q.id,
      codigo: q.codigo || null,
      banca: normalizeContentText(q.banca || "FGV"),
      materia: normalizeContentText(q.materia),
      topico: normalizeContentText(q.topico || null),
      dificuldade: q.dificuldade || "medio",
      enunciado: normalizeContentText(q.enunciado),
      alternativa_a: normalizeContentText(q.alternativa_a || ""),
      alternativa_b: normalizeContentText(q.alternativa_b || ""),
      alternativa_c: normalizeContentText(q.alternativa_c || ""),
      alternativa_d: normalizeContentText(q.alternativa_d || ""),
      alternativa_e: normalizeContentText(q.alternativa_e || ""),
      gabarito: String(q.gabarito).trim().toLowerCase(),
      comentario: normalizeContentText(q.comentario || ""),
      concurso: normalizeContentText(q.concurso || "OAB"),
      formato: "multipla_escolha",
      origem: "oficial",
    }));

  await upsertBatch(supabase, "questoes", rows, "id");
  console.log(`\n  Concluído: ${rows.length} questões OAB`);
}

// ─── 2. Questões Militar ─────────────────────────────────────────────────────

function mapAlternativas(alternativas = []) {
  const letras = ["a", "b", "c", "d", "e"];
  const result = {};
  letras.forEach((l, i) => {
    const alt = alternativas[i];
    result[`alternativa_${l}`] = alt
      ? normalizeContentText(typeof alt === "string" ? alt : alt.texto || alt.conteudo || "")
      : "";
  });
  return result;
}

async function importarQuestoesMilitar(supabase) {
  console.log("\n[2/6] Questões Militar...");
  const raw = readJson("public/questoes/militar.json");
  if (!raw) return console.log("  Arquivo não encontrado, pulando.");

  const rows = raw
    .filter((q) => q.enunciado && q.gabarito)
    .map((q) => ({
      id: q.id,
      codigo: q.codigo || null,
      banca: normalizeContentText(q.banca || q.banca_selo || ""),
      materia: normalizeContentText(q.materia),
      topico: normalizeContentText(q.materia_original || q.topico || null),
      dificuldade: q.dificuldade || "medio",
      enunciado: normalizeContentText(q.enunciado),
      ...mapAlternativas(q.alternativas),
      gabarito: String(q.gabarito).trim().toLowerCase(),
      comentario: normalizeContentText(q.comentario || ""),
      concurso: normalizeContentText(q.concurso || "Militar"),
      // campos extras
      orgao: q.orgao || null,
      cargo: q.cargo || null,
      ano: q.ano || null,
      formato: q.formato || "multipla_escolha",
      afirmacao: normalizeContentText(q.afirmacao || ""),
      anulada: Boolean(q.anulada),
      origem: q.origem || "oficial",
      banca_selo: q.banca_selo || null,
      alternativas_json: q.alternativas?.length ? normalizeContentObject(q.alternativas) : null,
    }));

  await upsertBatch(supabase, "questoes", rows, "id");
  console.log(`\n  Concluído: ${rows.length} questões militar`);
}

// ─── 3. Leis ─────────────────────────────────────────────────────────────────

async function importarLeis(supabase) {
  console.log("\n[3/6] Leis...");
  const leis = readJson("public/leis/index.json");
  if (!leis) return console.log("  Arquivo não encontrado, pulando.");

  const rows = leis.map((lei) => ({
    id: lei.id,
    nome: normalizeContentText(lei.nome),
    nome_curto: normalizeContentText(lei.nome_curto),
    categoria: normalizeContentText(lei.categoria || lei.tipo || "Legislação"),
    total_artigos: lei.total_artigos || 0,
    url_planalto: lei.fonte || null,
    ativo: true,
    tipo: lei.tipo || null,
    materia: lei.materia || null,
    fonte: lei.fonte || null,
  }));

  const { error } = await supabase.from("leis").upsert(rows, { onConflict: "id", ignoreDuplicates: true });
  if (error) throw new Error(`[leis] ${error.message}`);
  console.log(`  Concluído: ${rows.length} leis`);
}

// ─── 4. Artigos de Leis ───────────────────────────────────────────────────────

async function importarArtigos(supabase) {
  console.log("\n[4/6] Artigos de leis...");
  const artigos = readJson("public/leis/artigos.json");
  if (!artigos) return console.log("  Arquivo não encontrado, pulando.");

  const rows = artigos.map((a) => ({
    lei_id: a.lei_id,
    lei_nome: normalizeContentText(a.lei_nome || ""),
    numero: Number(a.numero) || 0,
    numero_texto: normalizeContentText(a.numero_texto),
    texto: normalizeContentText(a.texto),
    capitulo: normalizeContentText(a.capitulo || ""),
    importancia: a.importancia || 3,
    tags: Array.isArray(a.tags) ? a.tags : [],
    secao: a.secao || null,
    incisos: a.incisos || [],
    paragrafos: a.paragrafos || [],
    revogado: Boolean(a.revogado),
    cobrancas: a.cobrancas || [],
  }));

  await upsertBatch(supabase, "leis_artigos", rows, "lei_id,numero_texto");
  console.log(`\n  Concluído: ${rows.length} artigos`);
}

// ─── 5. Arquivos para Storage ─────────────────────────────────────────────────

async function uploadStorage(supabase) {
  console.log("\n[5/6] Upload para Storage...");

  await ensurePrivateBucket(supabase, "conteudo");

  const storageMap = {};

  // PDFs das apostilas
  const apostilasDir = join(ROOT, "public/materiais/apostilas");
  if (existsSync(apostilasDir)) {
    const pdfs = readdirSync(apostilasDir).filter((f) => f.endsWith(".pdf"));
    console.log(`  Enviando ${pdfs.length} PDFs...`);
    for (const pdf of pdfs) {
      const metadata = await uploadFile(supabase, "conteudo", `materiais/apostilas/${pdf}`, join(apostilasDir, pdf), "application/pdf");
      storageMap[`/materiais/apostilas/${pdf}`] = metadata;
      process.stdout.write(`    ${pdf}\r`);
    }
    console.log(`\n  ${pdfs.length} PDFs enviados.`);
  }

  // HTML dos mapas mentais
  const mapasDir = join(ROOT, "public/mapas");
  if (existsSync(mapasDir)) {
    const htmls = readdirSync(mapasDir).filter((f) => f.endsWith(".html"));
    console.log(`  Enviando ${htmls.length} mapas mentais...`);
    for (const html of htmls) {
      const metadata = await uploadFile(supabase, "conteudo", `mapas/${html}`, join(mapasDir, html), "text/html");
      storageMap[`/mapas/${html}`] = metadata;
      process.stdout.write(`    ${html}\r`);
    }
    console.log(`\n  ${htmls.length} HTMLs enviados.`);
  }

  // decks.json de flashcards
  const decksPath = join(ROOT, "public/flashcards/decks.json");
  if (existsSync(decksPath)) {
    await uploadFile(supabase, "conteudo", "flashcards/decks.json", decksPath, "application/json");
    console.log("  decks.json enviado.");
  }

  return storageMap;
}

// ─── 6. Materiais (manifest → tabela) ────────────────────────────────────────

async function importarMateriais(supabase, storageMap) {
  console.log("\n[6/6] Materiais (manifest → tabela)...");
  const manifest = readJson("public/materiais/manifest.json");
  if (!manifest) return console.log("  Arquivo não encontrado, pulando.");

  const rows = manifest.map((item) => {
    const storage = storageMap[item.url] || {};
    const isPublic = item.is_public === true;

    return {
      id: item.id,
      tipo: item.tipo || null,
      categoria: item.categoria || null,
      titulo: normalizeContentText(item.titulo || item.id),
      materia: item.materia || null,
      descricao: item.descricao || null,
      url: isPublic ? item.url : null,
      public_url: null,
      bucket: storage.bucket || null,
      storage_path: storage.storage_path || null,
      filename: storage.filename || null,
      mime_type: storage.mime_type || null,
      size: storage.size || null,
      is_public: isPublic,
      source: item.source || null,
      source_path: item.sourcePath || null,
    };
  });

  const { error } = await supabase.from("materiais").upsert(rows, { onConflict: "id", ignoreDuplicates: true });
  if (error) throw new Error(`[materiais] ${error.message}`);
  console.log(`  Concluído: ${rows.length} materiais`);
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error("Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env");
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  console.log("=== Migração para Supabase ===");
  console.log(`URL: ${SUPABASE_URL}`);
  console.log(`ROOT: ${ROOT}`);
  const arquivos = ["public/questoes/oab.json", "public/questoes/militar.json", "public/leis/index.json", "public/leis/artigos.json", "public/materiais/manifest.json", "public/flashcards/decks.json"];
  for (const f of arquivos) {
    console.log(`  ${existsSync(join(ROOT, f)) ? "✓" : "✗"} ${f}`);
  }

  await importarQuestoesOab(supabase);
  await importarQuestoesMilitar(supabase);
  await importarLeis(supabase);
  await importarArtigos(supabase);
  const storageMap = await uploadStorage(supabase);
  await importarMateriais(supabase, storageMap);

  console.log("\n✓ Migração concluída!");

  if (process.argv.includes("--deletar-locais")) {
    const { rmSync } = await import("node:fs");
    const dirs = ["public/questoes", "public/leis", "public/materiais", "public/flashcards", "public/mapas"];
    console.log("\nDeletando arquivos locais...");
    for (const dir of dirs) {
      const abs = join(ROOT, dir);
      if (existsSync(abs)) {
        rmSync(abs, { recursive: true, force: true });
        console.log(`  Deletado: ${dir}`);
      }
    }
    console.log("Pronto! Arquivos locais removidos.");
  } else {
    console.log("  Para deletar os arquivos locais após confirmar a migração:");
    console.log("  npm run migrar:nuvem:deletar");
  }
}

main().catch((err) => {
  console.error("\n✗ Erro na migração:", err.message);
  process.exit(1);
});
