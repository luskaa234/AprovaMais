import { useLeisStore, useMiscStore, useNotificacoesStore, useRankingStore } from "../stores";

async function getManifest() {
  try {
    const response = await fetch("/materiais/manifest.json");
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

/**
 * Future REST contract:
 * GET /concursos?estado=&orgao=&area=
 * GET /concursos/:id/edital
 * GET /concursos/:id/materias
 */
export const rankingService = { async getRanking() { return useRankingStore.getState().ranking; } };
export const mapasService = {
  async getMapas() {
    const imported = (await getManifest())
      .filter((item) => item.categoria === "Mapas mentais")
      .map((item) => ({
        id: item.id,
        materia: item.titulo,
        materialUrl: item.url,
        root: {
          label: item.materia,
          children: [
            { label: "Resumo visual", children: [{ label: item.tipo, children: [] }, { label: item.categoria, children: [] }] },
            { label: "Aplicacao em prova", children: [{ label: item.materia, children: [] }, { label: "Revisao rapida", children: [] }] },
          ],
        },
      }));
    return [...imported, ...useMiscStore.getState().mapas];
  },
};
export const leisService = { async getLeis() { return useLeisStore.getState().leis; } };
export const notificacoesService = { async getAll() { return useNotificacoesStore.getState().notificacoes; } };
