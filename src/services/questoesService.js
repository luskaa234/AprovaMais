import { normalize } from "../utils";
import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useQuestoesStore } from "../stores";

const letras = ["a", "b", "c", "d", "e"];
let localQuestoesCache = null;
let localStatsCache = null;
let localCatalogCache = null;
const localChunkCache = new Map();

async function getLocalCatalog() {
  if (localCatalogCache) return localCatalogCache;
  const response = await fetch("/questoes/catalog.json");
  if (!response.ok) throw new Error("Catalogo local de questoes indisponivel.");
  localCatalogCache = await response.json();
  return localCatalogCache;
}

async function getLocalChunk(path) {
  if (localChunkCache.has(path)) return localChunkCache.get(path);
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Chunk de questoes indisponivel: ${path}`);
  const data = (await response.json()).map(mapQuestao);
  localChunkCache.set(path, data);
  if (localChunkCache.size > 20) localChunkCache.delete(localChunkCache.keys().next().value);
  return data;
}

function hasActiveFilters(filters = {}) {
  return Object.values(filters).some(Boolean);
}

function rowMatches(q, filters = {}) {
  const state = useQuestoesStore.getState();
  const isAnswered = state.tentativas.some((item) => item.questaoId === q.id);
  const isWrong = state.caderno.includes(q.id) || state.tentativas.some((item) => item.questaoId === q.id && !item.acertou);
  const isFavorite = state.salvas.includes(q.id);

  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    if (key === "search") {
      return [q.enunciado, q.comentario, q.materia, q.assunto, q.topico, q.banca, q.concurso, q.orgao].some((field) => normalize(field).includes(normalize(value)));
    }
    if (key === "dificuldade") {
      const current = normalize(q.dificuldade).replace("media", "medio");
      const expected = normalize(value).replace("media", "medio");
      return current.includes(expected);
    }
    if (key === "concurso") {
      return [q.concurso, q.orgao, q.cargo].some((field) => normalize(field).includes(normalize(value)));
    }
    if (key === "assunto") {
      return [q.assunto, q.topico, ...(q.tags || [])].some((field) => normalize(field).includes(normalize(value)));
    }
    if (key === "status") {
      if (value === "respondidas") return isAnswered;
      if (value === "nao_respondidas") return !isAnswered;
      if (value === "erradas") return isWrong;
      if (value === "favoritas") return isFavorite;
      return true;
    }
    return normalize(q[key]).includes(normalize(value));
  });
}

function mapQuestao(row) {
  const gabarito = String(row.gabarito || "").toLowerCase();
  return {
    id: row.id,
    codigo: row.codigo,
    enunciado: row.enunciado,
    tipo: "multipla_escolha",
    alternativas: letras
      .map((letra) => ({ id: letra, letra: letra.toUpperCase(), texto: row[`alternativa_${letra}`], correta: letra === gabarito }))
      .filter((alt) => alt.texto),
    gabarito,
    comentario: row.comentario || "Comentario ainda nao disponivel.",
    banca: row.banca || "PM",
    concurso: row.concurso || row.orgao || "PM",
    orgao: row.orgao || row.concurso || "PM",
    cargo: row.cargo || "Soldado",
    materia: row.materia,
    assunto: row.topico || row.materia,
    topico: row.topico,
    ano: row.ano,
    dificuldade: row.dificuldade || "medio",
    tags: [row.materia, row.topico].filter(Boolean),
    estatisticas: { tentativas: 0, acertos: 0 },
  };
}

/**
 * Future REST contract:
 * GET /questoes?banca=&orgao=&materia=&ano=&dificuldade=&page=&limit=
 * GET /questoes/:id
 * POST /questoes/:id/responder
 * POST /questoes/:id/salvar
 * POST /questoes/:id/reportar
 */
export const questoesService = {
  async getPage({ page = 1, pageSize = 5, filters = {} } = {}) {
    if (isSupabaseConfigured) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      let query = supabase.from("questoes").select("*", { count: "exact" }).range(from, to);
      if (filters.banca) query = query.ilike("banca", `%${filters.banca}%`);
      if (filters.concurso) query = query.ilike("concurso", `%${filters.concurso}%`);
      if (filters.materia) query = query.eq("materia", filters.materia);
      if (filters.assunto) query = query.ilike("topico", `%${filters.assunto}%`);
      if (filters.dificuldade) query = query.eq("dificuldade", filters.dificuldade);
      if (filters.ano) query = query.eq("ano", filters.ano);
      if (filters.search) query = query.textSearch("enunciado", filters.search, { config: "portuguese" });
      const { data, count, error } = await query;
      if (error) throw error;
      const stats = await this.getStats();
      return { items: data.map(mapQuestao), total: count || 0, stats };
    }

    const catalog = await getLocalCatalog();
    const stats = { totalDisponivel: catalog.totalDisponivel, totalExportado: catalog.totalExportado, amostraLocal: false };
    const offset = (page - 1) * pageSize;
    const activeFilters = hasActiveFilters(filters);

    if (!activeFilters) {
      const items = [];
      for (const chunk of catalog.chunks) {
        if (chunk.end < offset) continue;
        if (chunk.start > offset + pageSize - 1) break;
        const rows = await getLocalChunk(chunk.path);
        const start = Math.max(0, offset - chunk.start);
        const end = Math.min(rows.length, offset + pageSize - chunk.start);
        items.push(...rows.slice(start, end));
        if (items.length >= pageSize) break;
      }
      return { items, total: catalog.totalExportado, stats };
    }

    const chunks = filters.materia ? catalog.chunks.filter((chunk) => normalize(chunk.materia).includes(normalize(filters.materia))) : catalog.chunks;
    const items = [];
    let matched = 0;
    for (const chunk of chunks) {
      const rows = await getLocalChunk(chunk.path);
      for (const row of rows) {
        if (!rowMatches(row, filters)) continue;
        if (matched >= offset && items.length < pageSize) items.push(row);
        matched += 1;
      }
    }
    return { items, total: matched, stats };
  },
  async getAll(filters = {}) {
    if (!isSupabaseConfigured) {
      try {
        if (!localQuestoesCache) {
          const response = await fetch("/questoes/sample.json");
          if (!response.ok) throw new Error("Amostra local indisponivel.");
          localQuestoesCache = (await response.json()).map(mapQuestao);
        }
        return this.filter(localQuestoesCache, filters);
      } catch {
        return this.filter(useQuestoesStore.getState().questoes, filters);
      }
    }

    let query = supabase.from("questoes").select("*").limit(filters.limit || 120);
    if (filters.banca) query = query.ilike("banca", `%${filters.banca}%`);
    if (filters.concurso) query = query.ilike("concurso", `%${filters.concurso}%`);
    if (filters.materia) query = query.eq("materia", filters.materia);
    if (filters.dificuldade) query = query.eq("dificuldade", filters.dificuldade);
    if (filters.assunto || filters.topico) query = query.ilike("topico", `%${filters.assunto || filters.topico}%`);
    if (filters.ano) query = query.eq("ano", filters.ano);
    if (filters.search) query = query.textSearch("enunciado", filters.search, { config: "portuguese" });

    const { data, error } = await query;
    if (error) throw error;
    return data.map(mapQuestao);
  },
  async getStats() {
    if (isSupabaseConfigured) {
      const { count } = await supabase.from("questoes").select("id", { count: "exact", head: true });
      return { totalDisponivel: count || 0, amostraLocal: false };
    }
    try {
      if (!localStatsCache) {
        const response = await fetch("/questoes/stats.json");
        if (!response.ok) throw new Error("Stats locais indisponiveis.");
        localStatsCache = await response.json();
      }
      return { ...localStatsCache, amostraLocal: true };
    } catch {
      return { totalDisponivel: useQuestoesStore.getState().questoes.length, amostraLocal: true };
    }
  },
  async getFilterOptions() {
    if (isSupabaseConfigured) {
      return {
        materias: [],
        bancas: [],
        dificuldades: [],
        anos: [],
        assuntos: [],
        concursos: [],
      };
    }
    const catalog = await getLocalCatalog();
    return {
      materias: catalog.materias || {},
      bancas: catalog.bancas || {},
      dificuldades: catalog.dificuldades || {},
      anos: catalog.anos || {},
      assuntos: catalog.topicos || catalog.assuntos || {},
      concursos: catalog.concursos || catalog.orgaos || {},
    };
  },
  async getById(id) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("questoes").select("*").eq("id", id).single();
      if (error) throw error;
      return mapQuestao(data);
    }
    return useQuestoesStore.getState().questoes.find((questao) => questao.id === id);
  },
  async responder(id, alternativaId, tempo = 0) {
    if (isSupabaseConfigured) {
      const questao = await this.getById(id);
      const acertou = questao.gabarito === String(alternativaId).toLowerCase();
      const userId = await getCurrentUserId();
      if (userId) {
        await supabase.from("tentativas").insert({
          user_id: userId,
          questao_id: id,
          resposta: alternativaId,
          acertou,
          tempo_gasto: tempo,
        });
        if (!acertou) await supabase.from("caderno_erros").upsert({ user_id: userId, questao_id: id });
        await supabase.rpc("incrementar_pontos", { uid: userId, pts: acertou ? 10 : 2 });
      }
      return { correta: acertou, gabarito: questao.gabarito };
    }
    return useQuestoesStore.getState().responder(id, alternativaId);
  },
  async salvar(id) {
    if (isSupabaseConfigured) {
      const userId = await getCurrentUserId();
      if (!userId) return { success: false };
      await supabase.from("questoes_salvas").upsert({ user_id: userId, questao_id: id });
      return { success: true };
    }
    useQuestoesStore.getState().salvar(id);
    return { success: true };
  },
  async reportar() {
    return { success: true };
  },
  filter(questoes, filters = {}) {
    return questoes.filter((q) => Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "search") {
        return [q.enunciado, q.comentario, q.materia, q.assunto, q.topico, q.banca, q.concurso, q.orgao].some((field) => normalize(field).includes(normalize(value)));
      }
      if (key === "dificuldade") {
        const current = normalize(q.dificuldade).replace("media", "medio");
        const expected = normalize(value).replace("media", "medio");
        return current.includes(expected);
      }
      if (key === "concurso") {
        return [q.concurso, q.orgao, q.cargo].some((field) => normalize(field).includes(normalize(value)));
      }
      if (key === "assunto") {
        return [q.assunto, q.topico, ...(q.tags || [])].some((field) => normalize(field).includes(normalize(value)));
      }
      if (key === "status") {
        const state = useQuestoesStore.getState();
        const isAnswered = state.tentativas.some((item) => item.questaoId === q.id);
        const isWrong = state.caderno.includes(q.id) || state.tentativas.some((item) => item.questaoId === q.id && !item.acertou);
        const isFavorite = state.salvas.includes(q.id);
        if (value === "respondidas") return isAnswered;
        if (value === "nao_respondidas") return !isAnswered;
        if (value === "erradas") return isWrong;
        if (value === "favoritas") return isFavorite;
        return true;
      }
      return normalize(q[key]).includes(normalize(value));
    }));
  },
};
