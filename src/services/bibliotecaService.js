import { mockBiblioteca } from "../data";
import { normalize } from "../utils";

let materialCache = null;

async function getMaterialManifest() {
  if (materialCache) return materialCache;
  try {
    const response = await fetch("/materiais/manifest.json");
    if (!response.ok) throw new Error("Manifest nao encontrado.");
    materialCache = await response.json();
    return materialCache;
  } catch {
    materialCache = mockBiblioteca;
    return materialCache;
  }
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
