import { mockBiblioteca } from "../data";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { normalize } from "../utils";

let materialCache = null;

async function getMaterialManifest() {
  if (materialCache) return materialCache;
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("materiais").select("*");
      if (!error && data?.length) {
        materialCache = data.map(normalizeMaterialTitle);
        return materialCache;
      }
    }
    const response = await fetch("/materiais/manifest.json");
    if (!response.ok) throw new Error("Manifest não encontrado.");
    const base = (await response.json()).map(normalizeMaterialTitle);
    materialCache = base;
    return materialCache;
  } catch {
    materialCache = mockBiblioteca.map(normalizeMaterialTitle);
    return materialCache;
  }
}

function humanizeTitle(title = "") {
  const cleaned = String(title)
    .replace(/\.(pdf|docx?|xlsx?|txt|zip|png|jpe?g)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .split(" ")
    .filter((word) => !["compressed", "final"].includes(word.toLowerCase()))
    .map((word) => {
      const upper = word.toUpperCase();
      if (["PM", "PF", "PRF", "PC", "TJ", "RJ", "SP", "DF", "TRT", "IBFC", "VUNESP", "QC"].includes(upper)) return upper;
      if (/^\d{4}$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function normalizeMaterialTitle(material) {
  return {
    ...material,
    titulo: humanizeTitle(material.titulo || material.nome || material.id),
  };
}

function examOrder(material) {
  const sourcePath = String(material.sourcePath || "");
  const title = String(material.titulo || "");
  const match = sourcePath.match(/oab\/(\d+)-exame/i) || title.match(/\b(\d+)º?\s+Exame/i);
  if (match) return Number(match[1]);
  const yearEdition = sourcePath.match(/oab\/2010-(\d)-exame/i) || title.match(/2010\.(\d)/i);
  if (yearEdition) return Number(`0.${yearEdition[1]}`);
  return -1;
}

function sortMaterials(items) {
  return [...items].sort((a, b) => {
    const sourceCompare = normalize(b.source).localeCompare(normalize(a.source));
    if (sourceCompare) return sourceCompare;
    const orderCompare = examOrder(b) - examOrder(a);
    if (orderCompare) return orderCompare;
    const phaseCompare = normalize(a.materia).localeCompare(normalize(b.materia));
    if (phaseCompare) return phaseCompare;
    return normalize(a.titulo).localeCompare(normalize(b.titulo));
  });
}

export const bibliotecaService = {
  async getAll(filters = {}) {
    return sortMaterials(this.filter(await getMaterialManifest(), filters));
  },
  async favoritar() {
    return { success: true };
  },
  filter(materiais, filters = {}) {
    return sortMaterials(materiais.filter((item) =>
      Object.entries(filters).every(([key, value]) => !value || value === "Todos" || normalize(item[key]).includes(normalize(value)))
    ));
  },
};
