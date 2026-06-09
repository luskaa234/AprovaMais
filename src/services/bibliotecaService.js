import { mockBiblioteca } from "../data";
import { normalize } from "../utils";

let materialCache = null;

async function getMaterialManifest() {
  if (materialCache) return materialCache;
  try {
    const response = await fetch("/materiais/manifest.json");
    if (!response.ok) throw new Error("Manifest nao encontrado.");
    materialCache = (await response.json()).map(normalizeMaterialTitle);
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

export const bibliotecaService = {
  async getAll(filters = {}) {
    return this.filter(await getMaterialManifest(), filters);
  },
  async favoritar() {
    return { success: true };
  },
  filter(materiais, filters = {}) {
    return materiais.filter((item) =>
      Object.entries(filters).every(([key, value]) => !value || value === "Todos" || normalize(item[key]).includes(normalize(value)))
    );
  },
};
