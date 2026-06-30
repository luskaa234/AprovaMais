import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { useLeisStore, useMiscStore, useNotificacoesStore, useRankingStore } from "../stores";

async function getManifest() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("materiais").select("*");
      if (!error && data?.length) return data;
    }
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
      .map((item, index) => ({
        id: item.id,
        titulo: item.titulo,
        materia: item.materia || item.titulo,
        concurso: item.concurso || (index % 2 ? "PRF" : "PM"),
        assunto: item.assunto || item.materia || "Revisão geral",
        banca: item.banca || ["FGV", "CEBRASPE", "IBFC"][index % 3],
        nivel: item.nivel || ["Básico", "Intermediário", "Avançado"][index % 3],
        atualizadoEm: item.atualizadoEm || "2026-06-09",
        tags: [item.tipo, item.categoria, item.materia].filter(Boolean),
        acessos: 40 + index * 7,
        favorito: index % 4 === 0,
        materialUrl: item.url,
        htmlUrl: item.htmlUrl,
        svgUrl: /\.svg($|\?)/i.test(item.url || "") ? item.url : item.svgUrl,
        root: {
          label: item.materia,
          children: [
            { label: "Resumo visual", children: [{ label: item.tipo, children: [] }, { label: item.categoria, children: [] }] },
            { label: "Aplicação em prova", children: [{ label: item.materia, children: [] }, { label: "Revisão rápida", children: [] }] },
          ],
        },
      }));
    const local = useMiscStore.getState().mapas.map((item, index) => ({
      ...item,
      titulo: item.titulo || item.materia,
      concurso: item.concurso || ["PM", "PRF", "TJ"][index % 3],
      assunto: item.assunto || item.root?.children?.[0]?.label || "Fundamentos",
      banca: item.banca || ["FGV", "Vunesp", "CEBRASPE"][index % 3],
      nivel: item.nivel || ["Básico", "Intermediário", "Avançado"][index % 3],
      atualizadoEm: item.atualizadoEm || "2026-06-09",
      tags: item.tags || ["mapa mental", item.materia, "revisão"].filter(Boolean),
      acessos: item.acessos || 25 + index * 9,
      favorito: Boolean(item.favorito),
    }));
    return imported.length ? imported : local;
  },
};
export const leisService = { async getLeis() { return useLeisStore.getState().leis; } };
export const notificacoesService = { async getAll() { return useNotificacoesStore.getState().notificacoes; } };
