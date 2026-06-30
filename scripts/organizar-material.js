import AdmZip from "adm-zip";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { extname, join, basename } from "node:path";
import process from "node:process";

const zipPath = process.argv[2] || "c:/Users/lucas/Downloads/material concurso[.zip";
const root = process.cwd();

const targetDirs = [
  "material-concurso",
  "flashcards-apkg",
  "public/materiais/apostilas",
  "public/materiais/ebooks",
  "public/materiais/provas",
  "public/materiais/gabaritos",
  "public/materiais/mapas-mentais",
  "public/materiais/imagens",
  "public/materiais/outros",
];

for (const dir of targetDirs) mkdirSync(join(root, dir), { recursive: true });

function removeDiacritics(text) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function slugFile(name) {
  const extension = extname(name).toLowerCase();
  const base = basename(name, extension);
  const slug = removeDiacritics(base)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "material"}${extension}`;
}

function titleFromName(name) {
  const raw = basename(name, extname(name));
  const normalized = raw
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\[?ebook\]?\s*/i, "Ebook - ")
    .trim();

  const compact = removeDiacritics(raw).toLowerCase();
  const numbered = compact.match(/^(pt|rc|geo|bio|fisicaeletrica)(\d+)$/);
  if (numbered) {
    const labels = {
      pt: "Português",
      rc: "Raciocínio Lógico",
      geo: "Geografia",
      bio: "Biologia",
      fisicaeletrica: "Física Elétrica",
    };
    return `${labels[numbered[1]]} - Parte ${numbered[2]}`;
  }

  return normalized
    .replace(/\bpm soldado portugues\b/i, "PM Soldado - Português")
    .replace(/\bcombo pf prf\b/i, "Combo PF + PRF")
    .replace(/\bpolicia\b/gi, "Polícia")
    .replace(/\bquestoes\b/gi, "Questões")
    .replace(/\baprovacao\b/gi, "Aprovação");
}

function classify(name) {
  const lower = name.toLowerCase();
  const extension = extname(name).toLowerCase();

  if (extension === ".csv") return { folder: "material-concurso", tipo: "Questões CSV", categoria: "Questões", visible: false };
  if (extension === ".apkg") return { folder: "flashcards-apkg", tipo: "Flashcards APKG", categoria: "Flashcards", visible: false };
  if ([".png", ".jpg", ".jpeg", ".webp"].includes(extension)) return { folder: "public/materiais/imagens", tipo: "Imagem", categoria: "Imagens", visible: true };
  if (extension === ".zip" && lower.includes("mapas")) return { folder: "public/materiais/mapas-mentais", tipo: "Mapas mentais", categoria: "Mapas mentais", visible: true };
  if (lower.includes("gabarito")) return { folder: "public/materiais/gabaritos", tipo: "Gabarito", categoria: "Gabaritos", visible: true };
  if (lower.includes("prova") || lower.includes("simulacao") || lower.includes("simulação")) return { folder: "public/materiais/provas", tipo: "Prova oficial", categoria: "Provas", visible: true };
  if (lower.includes("mapa") && lower.includes("mental")) return { folder: "public/materiais/mapas-mentais", tipo: "Mapas mentais", categoria: "Mapas mentais", visible: true };
  if (lower.includes("ebook") || lower.includes("e-book") || lower.includes("guia") || lower.includes("raio-x") || lower.includes("manual")) return { folder: "public/materiais/ebooks", tipo: "Ebook", categoria: "Ebooks", visible: true };
  if (/^(pt|rc|geo|bio|fisicaeletrica|pm-soldado)/i.test(name)) return { folder: "public/materiais/apostilas", tipo: "Apostila", categoria: "Apostilas", visible: true };
  return { folder: "public/materiais/outros", tipo: "Material", categoria: "Outros", visible: true };
}

function materiaFromName(name, categoria) {
  const lower = name.toLowerCase();
  if (lower.includes("portugues") || lower.includes("português") || /^pt\d+/i.test(name)) return "Português";
  if (lower.includes("raciocinio") || lower.includes("raciocínio") || /^rc\d+/i.test(name)) return "Raciocínio Lógico";
  if (lower.includes("geo")) return "Geografia";
  if (lower.includes("bio")) return "Biologia";
  if (lower.includes("fisica") || lower.includes("física")) return "Física";
  if (lower.includes("administrativo")) return "Direito Administrativo";
  if (lower.includes("constitucional")) return "Direito Constitucional";
  if (lower.includes("policia") || lower.includes("polícia") || lower.includes("pf") || lower.includes("prf") || lower.includes("pm")) return "Carreiras Policiais";
  if (lower.includes("tj") || lower.includes("tribunais") || lower.includes("trt")) return "Tribunais";
  if (categoria === "Gabaritos" || categoria === "Provas") return "Simulados";
  return "Geral";
}

function uniquePath(folder, file) {
  const extension = extname(file);
  const base = basename(file, extension);
  let candidate = join(root, folder, file);
  let index = 2;
  while (existsSync(candidate)) {
    candidate = join(root, folder, `${base}-${index}${extension}`);
    index += 1;
  }
  return candidate;
}

if (!existsSync(zipPath)) {
  throw new Error(`Arquivo nao encontrado: ${zipPath}`);
}

const zip = new AdmZip(zipPath);
const manifest = [];
let csv = 0;
let apkg = 0;
let skipped = 0;
let duplicates = 0;
const seenHashes = new Set();

for (const entry of zip.getEntries()) {
  if (entry.isDirectory) continue;
  const originalName = basename(entry.entryName);
  const extension = extname(originalName).toLowerCase();
  if (extension === ".crdownload") {
    skipped += 1;
    continue;
  }

  const meta = classify(originalName);
  const dest = uniquePath(meta.folder, slugFile(originalName));
  const data = entry.getData();
  const hash = createHash("sha256").update(data).digest("hex");
  if (seenHashes.has(hash)) {
    duplicates += 1;
    continue;
  }
  seenHashes.add(hash);
  writeFileSync(dest, data);

  if (extension === ".csv") csv += 1;
  if (extension === ".apkg") apkg += 1;

  if (meta.visible) {
    const relative = dest.slice(join(root, "public").length).replaceAll("\\", "/");
    manifest.push({
      id: `mat-${basename(dest, extname(dest)).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
      titulo: titleFromName(originalName),
      tipo: meta.tipo,
      categoria: meta.categoria,
      materia: materiaFromName(originalName, meta.categoria),
      descricao: `${meta.tipo} organizado a partir do pacote material concurso.`,
      url: relative,
      arquivo: basename(dest),
      tamanhoBytes: entry.header.size,
    });
  }
}

manifest.sort((a, b) => `${a.categoria}-${a.titulo}`.localeCompare(`${b.categoria}-${b.titulo}`, "pt-BR"));
writeFileSync(join(root, "public/materiais/manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.table([
  { categoria: "CSVs para importacao", total: csv },
  { categoria: "APKGs para importacao", total: apkg },
  { categoria: "Materiais na biblioteca", total: manifest.length },
  { categoria: "Ignorados incompletos", total: skipped },
  { categoria: "Duplicatas exatas removidas", total: duplicates },
]);
