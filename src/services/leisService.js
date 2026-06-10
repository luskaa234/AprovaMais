import { aiService } from "./aiService";
import { flashcardsService } from "./flashcardsService";
import { questoesService } from "./questoesService";
import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { normalize } from "../utils";
import { useLeisStore, useQuestoesStore } from "../stores";

let localLeisCache = null;
let localArtigosCache = null;

function groupLeis(rows) {
  return rows.map((lei) => ({
    ...lei,
    nome: lei.nome,
    categoria: lei.categoria,
    capitulos: [
      {
        nome: lei.nome_curto || lei.nome,
        secao: lei.nome_curto || lei.nome,
        artigos: (lei.leis_artigos || []).map((artigo) => ({
          id: artigo.id,
          lei_id: artigo.lei_id,
          numero: artigo.numero_texto || artigo.numero,
          numero_texto: artigo.numero_texto || String(artigo.numero),
          texto: artigo.texto,
          capitulo: artigo.capitulo || lei.nome_curto || lei.nome,
          tags: artigo.tags || [],
          importancia: artigo.importancia || 3,
          cobrancas: artigo.cobrancas || 0,
        })),
      },
    ],
  }));
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Arquivo local indisponivel: ${path}`);
  return response.json();
}

async function getLocalLeis() {
  if (localLeisCache) return localLeisCache;
  try {
    localLeisCache = await fetchJson("/leis/index.json");
    localArtigosCache = localLeisCache.flatMap((lei) => (lei.capitulos || []).flatMap((capitulo) => (capitulo.artigos || []).map((artigo) => ({ ...artigo, lei }))));
    return localLeisCache;
  } catch {
    localLeisCache = useLeisStore.getState().leis;
    localArtigosCache = localLeisCache.flatMap((lei) => (lei.capitulos || []).flatMap((capitulo) => (capitulo.artigos || []).map((artigo) => ({ ...artigo, lei }))));
    return localLeisCache;
  }
}

async function getLocalArtigos() {
  if (localArtigosCache) return localArtigosCache;
  await getLocalLeis();
  return localArtigosCache || [];
}

function articleSearchTerms(artigo = {}) {
  const terms = new Set([...(artigo.tags || [])]);
  const text = normalize(`${artigo.lei_nome || artigo.lei?.nome || ""} ${artigo.texto || ""}`);
  if (text.includes("constituicao") || artigo.lei_id === "cf88") terms.add("Direito Constitucional");
  if (text.includes("direitos fundamentais")) terms.add("direitos fundamentais");
  if (text.includes("igualdade")) terms.add("igualdade");
  if (text.includes("advogado") || text.includes("oab")) terms.add("Etica Profissional");
  if (text.includes("administracao publica")) terms.add("Direito Administrativo");
  if (text.includes("crime") || text.includes("pena")) terms.add("Direito Penal");
  if (text.includes("processo civil")) terms.add("Processo Civil");
  if (text.includes("processo penal")) terms.add("Processo Penal");
  if (text.includes("tribut")) terms.add("Direito Tributario");
  return [...terms].filter(Boolean);
}

function parseJsonFromAi(text) {
  const cleaned = String(text || "").replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

function officialOnly(questao) {
  return questao?.official || normalize(questao?.origem || questao?.comentario || "").includes("oficial");
}

export const leisService = {
  async getLeis() {
    const local = await getLocalLeis();
    if (local.some((lei) => lei.hasText || lei.total_artigos)) return local;

    if (!isSupabaseConfigured) return local;
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
    const artigos = (await getLocalArtigos()).filter((artigo) => artigo.lei_id === leiId);
    if (artigos.length || !isSupabaseConfigured) {
      const inicio = (pagina - 1) * porPagina;
      return { artigos: artigos.slice(inicio, inicio + porPagina), total: artigos.length };
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
    const artigos = await getLocalArtigos();
    const local = artigos
      .filter((artigo) => (!leiId || artigo.lei_id === leiId) && normalize([artigo.texto, artigo.numero_texto, artigo.capitulo, artigo.lei?.nome].join(" ")).includes(normalize(termo)))
      .slice(0, 25);
    if (local.length || !isSupabaseConfigured) return local;

    let query = supabase.from("leis_artigos").select("*, leis(nome_curto)").textSearch("texto", termo, { config: "portuguese" }).limit(25);
    if (leiId) query = query.eq("lei_id", leiId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async questoesReaisDoArtigo(artigo) {
    const terms = articleSearchTerms(artigo).slice(0, 6);
    const found = new Map();

    for (const term of terms) {
      const rows = await questoesService.getAll({ search: term, limit: 30 });
      rows.filter(officialOnly).forEach((questao) => found.set(questao.id, questao));
      const rowsBySubject = await questoesService.getAll({ assunto: term, limit: 30 });
      rowsBySubject.filter(officialOnly).forEach((questao) => found.set(questao.id, questao));
    }

    const numero = artigo?.numero_texto || artigo?.numero;
    if (numero) {
      const literal = await questoesService.getAll({ search: `art. ${numero}`, limit: 30 });
      literal.filter(officialOnly).forEach((questao) => found.set(questao.id, questao));
    }

    return [...found.values()].slice(0, 12);
  },

  async gerarFlashcardsDeArtigo(artigo) {
    const prompt = `Voce e tutor de concursos. Transforme este artigo de lei em 3 a 5 flashcards de memorizacao.
Use a tecnica de lacuna (cloze) e pergunta direta. NAO invente conteudo alem do artigo.

ARTIGO: ${artigo.texto}

Responda APENAS em JSON, sem markdown:
[{"frente":"pergunta ou frase com lacuna","verso":"resposta exata conforme o artigo"}]`;

    let cards;
    try {
      const resposta = await aiService.gerarTexto(prompt);
      cards = parseJsonFromAi(resposta).slice(0, 5).map((card) => ({
        frente: card.frente,
        verso: card.verso,
        origem: "lei_seca",
        artigoId: artigo.id,
      }));
    } catch {
      cards = [{
        frente: `Explique o Art. ${artigo.numero_texto || artigo.numero} de ${artigo.lei || artigo.lei_nome || "lei seca"}.`,
        verso: artigo.texto,
        origem: "lei_seca",
        artigoId: artigo.id,
      }];
    }

    return flashcardsService.criarDeckLeiSeca({
      titulo: `Lei Seca - ${artigo.lei || artigo.lei_nome || "Artigo"}`,
      materia: artigo.materia || artigo.lei?.materia || "Legislacao",
      artigoId: artigo.id,
      cards,
    });
  },

  async gerarQuestaoDeArtigo(artigo) {
    const reais = await this.questoesReaisDoArtigo(artigo);
    if (reais.length) return { tipo: "oficiais", questoes: reais };

    const prompt = `Crie 1 questao de multipla escolha (A-E) sobre este artigo, estilo banca de concurso.
A resposta correta deve ser inequivoca e baseada SO no texto do artigo.

ARTIGO: ${artigo.texto}

JSON apenas: {"enunciado":"...","alternativas":[{"letra":"A","texto":"..."}],"gabarito":"X","comentario":"por que, citando o artigo"}`;
    const q = parseJsonFromAi(await aiService.gerarTexto(prompt));
    const questao = {
      id: `lei-${artigo.id}-${Date.now()}`,
      codigo: `LEI-${String(artigo.id).toUpperCase()}`,
      enunciado: q.enunciado,
      tipo: "multipla_escolha",
      alternativas: (q.alternativas || []).map((alt) => ({ id: String(alt.letra).toLowerCase(), letra: alt.letra, texto: alt.texto, correta: String(alt.letra).toLowerCase() === String(q.gabarito).toLowerCase() })),
      gabarito: String(q.gabarito || "").toLowerCase(),
      comentario: q.comentario,
      banca: "Inedita",
      concurso: "Lei Seca",
      materia: artigo.materia || artigo.lei?.materia || "Legislacao",
      assunto: artigo.capitulo || artigo.numero_texto,
      origem: "ia_lei",
      official: false,
      tags: ["lei_seca", artigo.id],
    };
    useQuestoesStore.setState((state) => ({ questoes: [questao, ...state.questoes] }));
    return { tipo: "ia", questao };
  },

  async explicarArtigo(artigo, objetivo = "concurso publico") {
    const prompt = `Explique este artigo de lei em linguagem simples, com foco em ${objetivo}.
Organize em: 1) ideia central, 2) como cai em prova, 3) pegadinha comum.
Nao invente regra fora do texto.

ARTIGO:
${artigo.texto}`;
    return aiService.gerarTexto(prompt);
  },

  async grifarArtigo({ leiId, artigoId, trecho = "", cor = "yellow" }, userId = null) {
    if (!isSupabaseConfigured) {
      useLeisStore.getState().grifarArtigo(artigoId, cor, trecho);
      return cor;
    }
    const uid = userId || await getCurrentUserId();
    if (!uid) {
      useLeisStore.getState().grifarArtigo(artigoId, cor, trecho);
      return cor;
    }
    const { error } = await supabase.from("grifos").insert({ user_id: uid, lei_id: leiId, artigo_id: artigoId, trecho, cor });
    if (error) {
      useLeisStore.getState().grifarArtigo(artigoId, cor, trecho);
    }
    return cor;
  },

  async removerGrifo({ grifoId, artigoId }, userId = null) {
    useLeisStore.getState().removerGrifo(artigoId, grifoId);
    if (!isSupabaseConfigured) return true;
    const uid = userId || await getCurrentUserId();
    if (!uid) return true;
    await supabase.from("grifos").delete().eq("id", grifoId).eq("user_id", uid);
    return true;
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
    if (!uid) {
      useLeisStore.getState().salvarNota(artigoId, nota);
      return true;
    }
    const { error } = await supabase.from("notas").upsert({ user_id: uid, artigo_id: artigoId, nota }, { onConflict: "user_id,artigo_id" });
    if (error) useLeisStore.getState().salvarNota(artigoId, nota);
    return true;
  },

  async marcarLido({ leiId, artigoId, lido }, userId = null) {
    useLeisStore.getState().marcarLido(artigoId, lido);
    if (!isSupabaseConfigured) return true;
    const uid = userId || await getCurrentUserId();
    if (!uid) return true;
    await supabase.from("leitura_progresso").upsert({ user_id: uid, lei_id: leiId, artigo_id: artigoId, lido, data: new Date().toISOString() }, { onConflict: "user_id,artigo_id" });
    return true;
  },
};
