import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useLeisStore } from "../stores";

function groupLeis(rows) {
  return rows.map((lei) => ({
    ...lei,
    nome: lei.nome,
    categoria: lei.categoria,
    capitulos: [
      {
        nome: lei.nome_curto || lei.nome,
        artigos: (lei.leis_artigos || []).map((artigo) => ({
          id: artigo.id,
          numero: artigo.numero_texto || artigo.numero,
          texto: artigo.texto,
          capitulo: artigo.capitulo || lei.nome_curto || lei.nome,
        })),
      },
    ],
  }));
}

export const leisService = {
  async getLeis() {
    if (!isSupabaseConfigured) return useLeisStore.getState().leis;
    const { data, error } = await supabase
      .from("leis")
      .select("*, leis_artigos(*)")
      .eq("ativo", true)
      .order("categoria")
      .order("numero", { referencedTable: "leis_artigos", ascending: true })
      .limit(300, { referencedTable: "leis_artigos" });
    if (error) throw error;
    return groupLeis(data || []);
  },

  async getArtigos(leiId, pagina = 1, porPagina = 40) {
    if (!isSupabaseConfigured) {
      const lei = useLeisStore.getState().leis.find((item) => item.id === leiId);
      const artigos = lei?.capitulos.flatMap((capitulo) => capitulo.artigos) || [];
      return { artigos, total: artigos.length };
    }
    const inicio = (pagina - 1) * porPagina;
    const { data, count, error } = await supabase
      .from("leis_artigos")
      .select("*", { count: "exact" })
      .eq("lei_id", leiId)
      .order("numero")
      .range(inicio, inicio + porPagina - 1);
    if (error) throw error;
    return { artigos: data || [], total: count || 0 };
  },

  async buscar(termo, leiId = null) {
    if (!isSupabaseConfigured) {
      return useLeisStore
        .getState()
        .leis.flatMap((lei) => lei.capitulos.flatMap((capitulo) => capitulo.artigos.map((artigo) => ({ ...artigo, lei_id: lei.id, lei: lei.nome }))))
        .filter((artigo) => artigo.texto.toLowerCase().includes(termo.toLowerCase()))
        .slice(0, 25);
    }
    let query = supabase.from("leis_artigos").select("*, leis(nome_curto)").textSearch("texto", termo, { config: "portuguese" }).limit(25);
    if (leiId) query = query.eq("lei_id", leiId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async importarDoPlanalto(leiId) {
    if (!isSupabaseConfigured) throw new Error("Supabase nao configurado.");
    const { data: lei, error } = await supabase.from("leis").select("url_planalto").eq("id", leiId).single();
    if (error) throw error;
    if (!lei?.url_planalto) throw new Error("URL do Planalto nao configurada.");

    const res = await fetch(lei.url_planalto);
    const html = await res.text();
    const artigos = [];
    const regex = /Art\.?\s+(\d+[\w-]*)(?:[ºo°])?[\s\S]*?(?=Art\.?\s+\d+|$)/gi;
    let match;
    let fallbackNumero = 0;
    while ((match = regex.exec(html)) !== null) {
      fallbackNumero += 1;
      const texto = match[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (texto.length < 20) continue;
      artigos.push({
        lei_id: leiId,
        numero: Number.parseInt(match[1], 10) || fallbackNumero,
        numero_texto: match[1],
        texto: texto.slice(0, 4000),
        importancia: fallbackNumero <= 10 ? 4 : 3,
      });
      if (artigos.length >= 1000) break;
    }

    for (let i = 0; i < artigos.length; i += 100) {
      const { error: upsertError } = await supabase.from("leis_artigos").upsert(artigos.slice(i, i + 100));
      if (upsertError) throw upsertError;
    }
    await supabase.from("leis").update({ total_artigos: artigos.length }).eq("id", leiId);
    return artigos.length;
  },

  async grifarArtigo(artigoId, cor = "yellow", userId = null) {
    if (!isSupabaseConfigured) {
      useLeisStore.getState().grifarArtigo(artigoId, cor);
      return cor;
    }
    const uid = userId || await getCurrentUserId();
    if (!uid) return null;
    await supabase.from("artigos_grifados").upsert({ user_id: uid, artigo_id: artigoId, cor });
    return cor;
  },

  async toggleFavorito(artigoId, userId = null) {
    if (!isSupabaseConfigured) {
      useLeisStore.getState().toggleFavorito(artigoId);
      return true;
    }
    const uid = userId || await getCurrentUserId();
    if (!uid) return false;
    const { data } = await supabase.from("artigos_favoritos").select("artigo_id").eq("user_id", uid).eq("artigo_id", artigoId).maybeSingle();
    if (data) {
      await supabase.from("artigos_favoritos").delete().eq("user_id", uid).eq("artigo_id", artigoId);
      return false;
    }
    await supabase.from("artigos_favoritos").insert({ user_id: uid, artigo_id: artigoId });
    return true;
  },

  async salvarNota(artigoId, nota, userId = null) {
    if (!isSupabaseConfigured) {
      useLeisStore.getState().salvarNota(artigoId, nota);
      return true;
    }
    const uid = userId || await getCurrentUserId();
    if (!uid) return false;
    await supabase.from("artigos_notas").upsert({ user_id: uid, artigo_id: artigoId, nota });
    return true;
  },
};
