import { normalize } from "../utils";
import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useQuestoesStore } from "../stores";

const letras = ["a", "b", "c", "d", "e"];
let localQuestoesCache = null;
let localOabQuestoesCache = null;
let localMilitarQuestoesCache = null;
let localStatsCache = null;
let localCatalogCache = null;
const localChunkCache = new Map();
const FILTER_CHUNK_LIMIT = 18;
const AREA_LABELS = {
  oab: "OAB",
  militar: "Concursos militares",
  geral: "Geral",
};

const SUBJECT_LABELS = {
  "Matematica e Raciocinio Logico": "Matematica/RL",
  "Historia, Geografia e Atualidades": "Atualidades",
  "Legislacao Especial, Penal e Processual Penal": "Legislacao Especial",
  "Legislacao PM e Direito Militar": "Direito Militar",
  "Nocoes de Direito": "Direito",
  "Nocoes de Direito e Sociologia": "Direito",
  "Conhecimentos Basicos": "Conhecimentos Basicos",
  "Conhecimentos Gerais": "Conhecimentos Gerais",
};

const CONTEST_LABELS = {
  CBMAL: "Bombeiros AL",
  CBMAM: "Bombeiros AM",
  PMAL: "PM AL",
  PMAM: "PM AM",
  "PM-BA": "PM BA",
  PMCE: "PM CE",
  PMMA: "PM MA",
  PMPI: "PM PI",
  "PM-PB": "PM PB",
  PMPB: "PM PB",
  "PM-SE": "PM SE",
  PMSP: "PM SP",
  PMTO: "PM TO",
  PMAC: "PM AC",
  PMERJ: "PM RJ",
  PCRJ: "Policia Civil RJ",
  PCRN: "Policia Civil RN",
  PCSC: "Policia Civil SC",
  PCAM: "Policia Civil AM",
};

function normalizeArea(area) {
  const value = normalize(area);
  if (["oab", "ordem"].some((term) => value.includes(term))) return "oab";
  if (["pm", "pmsp", "pmma", "policia", "militar", "bombeiro", "cbm"].some((term) => value.includes(term))) return "militar";
  return "geral";
}

function resolveAreaFromUser(user = {}) {
  const objective = normalize(user.objective || user.diagnosticPlan?.objective);
  const target = normalize(user.targetContest || user.contestName || user.diagnosticPlan?.objectiveLabel || user.customObjective);
  if (objective.includes("oab") || target.includes("oab")) return "oab";
  if (objective.includes("concurso") || ["pm", "policia", "militar", "bombeiro", "cbm", "prf"].some((term) => target.includes(term))) return "militar";
  return "geral";
}

function getAreaLabel(area) {
  return AREA_LABELS[normalizeArea(area)] || AREA_LABELS.geral;
}

function getSubjectLabel(value = "") {
  return SUBJECT_LABELS[value] || value;
}

function getContestLabel(value = "") {
  return CONTEST_LABELS[value] || value;
}

function isCorrectAnswer(questao, alternativaId) {
  if (String(questao?.gabarito || "").toLowerCase() === "anulada") return true;
  return String(questao?.gabarito || "").toLowerCase() === String(alternativaId).toLowerCase();
}

function shouldRetryWithoutOptionalColumns(error) {
  const message = normalize(`${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`);
  return message.includes("materia") || message.includes("data") || message.includes("column") || message.includes("schema cache");
}

async function insertTentativaSupabase({ userId, questao, alternativaId, acertou, tempo }) {
  const payload = {
    user_id: userId,
    questao_id: questao.id,
    resposta: alternativaId,
    acertou,
    tempo_gasto: tempo,
    materia: questao.materiaLabel || questao.materia || "Nao informada",
    data: new Date().toISOString(),
  };
  const { error } = await supabase.from("tentativas").insert(payload);
  if (!error) return;
  if (!shouldRetryWithoutOptionalColumns(error)) throw error;
  const legacyPayload = { ...payload };
  delete legacyPayload.materia;
  delete legacyPayload.data;
  const retry = await supabase.from("tentativas").insert(legacyPayload);
  if (retry.error) throw retry.error;
}

async function upsertCadernoSupabase({ userId, questaoId }) {
  const payload = { user_id: userId, questao_id: questaoId, data: new Date().toISOString() };
  const { error } = await supabase.from("caderno_erros").upsert(payload);
  if (!error) return;
  if (!shouldRetryWithoutOptionalColumns(error)) throw error;
  const legacyPayload = { ...payload };
  delete legacyPayload.data;
  const retry = await supabase.from("caderno_erros").upsert(legacyPayload);
  if (retry.error) throw retry.error;
}

async function removeCadernoSupabase({ userId, questaoId }) {
  const { error } = await supabase.from("caderno_erros").delete().eq("user_id", userId).eq("questao_id", questaoId);
  if (error) throw error;
}

async function syncSalvaSupabase({ userId, questaoId, saved }) {
  if (saved) {
    const payload = { user_id: userId, questao_id: questaoId, data: new Date().toISOString() };
    const { error } = await supabase.from("questoes_salvas").upsert(payload);
    if (!error) return;
    if (!shouldRetryWithoutOptionalColumns(error)) throw error;
    const legacyPayload = { ...payload };
    delete legacyPayload.data;
    const retry = await supabase.from("questoes_salvas").upsert(legacyPayload);
    if (retry.error) throw retry.error;
    return;
  }
  const { error } = await supabase.from("questoes_salvas").delete().eq("user_id", userId).eq("questao_id", questaoId);
  if (error) throw error;
}

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

async function getLocalOabQuestions() {
  if (localOabQuestoesCache) return localOabQuestoesCache;
  try {
    const response = await fetch("/questoes/oab.json");
    if (!response.ok) throw new Error("Banco local OAB indisponivel.");
    localOabQuestoesCache = (await response.json()).map(mapQuestao);
    return localOabQuestoesCache;
  } catch {
    localOabQuestoesCache = [];
    return localOabQuestoesCache;
  }
}

async function getLocalMilitarQuestions() {
  if (localMilitarQuestoesCache) return localMilitarQuestoesCache;
  try {
    const response = await fetch("/questoes/militar.json");
    if (!response.ok) throw new Error("Banco local militar indisponivel.");
    localMilitarQuestoesCache = (await response.json()).map(mapQuestao);
    return localMilitarQuestoesCache;
  } catch {
    localMilitarQuestoesCache = [];
    return localMilitarQuestoesCache;
  }
}

function hasActiveFilters(filters = {}) {
  const ignored = new Set(["area", "limit", "page", "pageSize", "aleatorio", "seed", "apenasOficiais"]);
  return Object.entries(filters).some(([key, value]) => Boolean(value) && !ignored.has(key));
}

function isOabFilter(filters = {}) {
  return [filters.concurso, filters.banca, filters.search, filters.materia, filters.assunto]
    .some((value) => normalize(value).includes("oab") || normalize(value).includes("fgv"));
}

function isMilitarFilter(filters = {}) {
  return [filters.concurso, filters.banca, filters.search, filters.materia, filters.assunto]
    .some((value) => ["pm", "pmsp", "policia", "polícia", "militar", "bombeiro", "cbm", "vunesp", "cebraspe"].some((term) => normalize(value).includes(normalize(term))));
}

function inferQuestionArea(questao = {}) {
  const haystack = [
    questao.id,
    questao.codigo,
    questao.origem,
    questao.concurso,
    questao.orgao,
    questao.cargo,
    questao.banca,
    ...(questao.tags || []),
  ].map(normalize).join(" ");

  if (haystack.includes("oab") || haystack.includes("exame de ordem")) return "oab";
  if (["pm", "pmsp", "pmma", "policia", "militar", "bombeiro", "cbm", "soldado"].some((term) => haystack.includes(normalize(term)))) return "militar";
  return "geral";
}

function matchesArea(questao = {}, area = "") {
  if (!area || normalizeArea(area) === "geral") return true;
  return inferQuestionArea(questao) === normalizeArea(area);
}

function uniqueById(questoes = []) {
  const seen = new Set();
  return questoes.filter((questao) => {
    if (!questao?.id || seen.has(questao.id)) return false;
    seen.add(questao.id);
    return true;
  });
}

function hashSeed(value = "aprova") {
  return String(value).split("").reduce((hash, char) => {
    const next = ((hash << 5) - hash) + char.charCodeAt(0);
    return next >>> 0;
  }, 2166136261);
}

function seededRandom(seed) {
  let value = hashSeed(seed) || 1;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function shuffle(items = [], seed = Date.now()) {
  const random = seededRandom(seed);
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function orderForTraining(items = [], filters = {}) {
  if (!filters.aleatorio) return items;
  const state = useQuestoesStore.getState();
  const answered = new Set(state.tentativas.map((item) => item.questaoId));
  const wrong = new Set([
    ...state.caderno,
    ...state.tentativas.filter((item) => !item.acertou).map((item) => item.questaoId),
  ]);
  const random = seededRandom(filters.seed || Date.now());
  return [...items]
    .map((questao) => {
      const priority = (answered.has(questao.id) ? 0 : 2000) + (wrong.has(questao.id) ? 900 : 0);
      return { questao, score: priority + random() };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ questao }) => questao);
}

function withoutFilter(filters = {}, ignoredKey = "") {
  return Object.fromEntries(Object.entries(filters).filter(([key, value]) =>
    value && key !== ignoredKey && !["limit", "page", "pageSize", "aleatorio", "seed", "apenasOficiais", "status", "search", "questoesIds"].includes(key)
  ));
}

function countOptions(questoes = [], key) {
  return questoes.reduce((acc, questao) => {
    const value = questao[key];
    if (value) acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function countOptionsWithLabels(questoes = [], key, labelKey) {
  return questoes.reduce((acc, questao) => {
    const value = questao[key];
    if (!value) return acc;
    const label = questao[labelKey] || value;
    acc[value] = acc[value] || { count: 0, label };
    acc[value].count += 1;
    return acc;
  }, {});
}

function buildFilterOptions(questoes = [], filters = {}) {
  return {
    materias: countOptionsWithLabels(questoes.filter((questao) => rowMatches(questao, withoutFilter(filters, "materia"))), "materia", "materiaLabel"),
    bancas: countOptions(questoes.filter((questao) => rowMatches(questao, withoutFilter(filters, "banca"))), "banca"),
    dificuldades: countOptions(questoes.filter((questao) => rowMatches(questao, withoutFilter(filters, "dificuldade"))), "dificuldade"),
    anos: countOptions(questoes.filter((questao) => rowMatches(questao, withoutFilter(filters, "ano"))), "ano"),
    assuntos: countOptionsWithLabels(questoes.filter((questao) => rowMatches(questao, withoutFilter(filters, "assunto"))), "assunto", "assuntoLabel"),
    concursos: countOptionsWithLabels(questoes.filter((questao) => rowMatches(questao, withoutFilter(filters, "concurso"))), "concurso", "concursoLabel"),
  };
}

function rowMatches(q, filters = {}) {
  const state = useQuestoesStore.getState();
  const isAnswered = state.tentativas.some((item) => item.questaoId === q.id);
  const isWrong = state.caderno.includes(q.id) || state.tentativas.some((item) => item.questaoId === q.id && !item.acertou);
  const isFavorite = state.salvas.includes(q.id);

  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    if (key === "questoesIds") return Array.isArray(value) ? value.includes(q.id) : true;
    if (["limit", "page", "pageSize", "aleatorio", "seed", "apenasOficiais"].includes(key)) return true;
    if (key === "area") return matchesArea(q, value);
    if (key === "origin" || key === "origem") {
      if (value === "oficial") return q.official || normalize(q.origem).includes("oficial");
      return normalize(q.origem).includes(normalize(value));
    }
    if (key === "search") {
      return [q.enunciado, q.comentario, q.materia, q.materiaLabel, q.assunto, q.assuntoLabel, q.topico, q.banca, q.concurso, q.concursoLabel, q.orgao].some((field) => normalize(field).includes(normalize(value)));
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
  const ano = row.ano || String(row.enunciado || "").match(/\b(20\d{2})\b/)?.[1] || "";
  const rowAlternativas = Array.isArray(row.alternativas)
    ? Object.fromEntries(row.alternativas.map((item) => [`alternativa_${String(item.letra || "").toLowerCase()}`, item.texto]))
    : {};
  const isCertoErrado = row.formato === "certo_errado";
  const mapped = {
    id: row.id,
    codigo: row.codigo,
    enunciado: row.enunciado,
    tipo: isCertoErrado ? "certo_errado" : "multipla_escolha",
    alternativas: isCertoErrado
      ? [
        { id: "c", letra: "C", texto: "Certo", correta: gabarito === "c" },
        { id: "e", letra: "E", texto: "Errado", correta: gabarito === "e" },
      ]
      : letras
        .map((letra) => ({ id: letra, letra: letra.toUpperCase(), texto: row[`alternativa_${letra}`] || rowAlternativas[`alternativa_${letra}`], correta: letra === gabarito }))
        .filter((alt) => alt.texto),
    gabarito,
    comentario: row.comentario || "Comentario ainda nao disponivel.",
    banca: row.banca || "PM",
    concurso: row.concurso || row.orgao || "PM",
    orgao: row.orgao || row.concurso || "PM",
    cargo: row.cargo || "Soldado",
    materia: row.materia,
    assunto: row.topico || row.materia,
    materiaLabel: getSubjectLabel(row.materia),
    assuntoLabel: getSubjectLabel(row.materia),
    concursoLabel: getContestLabel(row.concurso || row.orgao || "PM"),
    topico: row.topico,
    ano,
    dificuldade: row.dificuldade || "medio",
    origem: row.origem,
    official: normalize(row.origem || row.comentario).includes("oficial"),
    tags: [row.materia, row.topico, row.origem].filter(Boolean),
    estatisticas: { tentativas: 0, acertos: 0 },
  };
  return { ...mapped, area: inferQuestionArea(mapped) };
}

function findCachedQuestaoById(id) {
  const fromStore = useQuestoesStore.getState().questoes.find((questao) => questao.id === id);
  if (fromStore) return fromStore;
  for (const rows of localChunkCache.values()) {
    const found = rows.find((questao) => questao.id === id);
    if (found) return found;
  }
  return null;
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
  resolveAreaFromUser,
  getAreaLabel,
  inferQuestionArea,
  getSubjectLabel,
  getContestLabel,
  async getPage({ page = 1, pageSize = 5, filters = {} } = {}) {
    if (filters.area) {
      const items = await this.getQuestoes({ ...filters, limit: 5000 });
      const offset = (page - 1) * pageSize;
      const stats = await this.getStats();
      return { items: items.slice(offset, offset + pageSize), total: items.length, stats };
    }

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
      if ((!data || data.length === 0) && isMilitarFilter(filters)) {
        const localMilitar = this.filter(await getLocalMilitarQuestions(), filters);
        const offset = (page - 1) * pageSize;
        const stats = await this.getStats();
        return { items: localMilitar.slice(offset, offset + pageSize), total: localMilitar.length, stats: { ...stats, militarLocal: localMilitar.length } };
      }
      if ((!data || data.length === 0) && (isOabFilter(filters) || count === 0)) {
        const localOab = this.filter(await getLocalOabQuestions(), filters);
        const offset = (page - 1) * pageSize;
        const stats = await this.getStats();
        return { items: localOab.slice(offset, offset + pageSize), total: localOab.length, stats: { ...stats, oabLocal: localOab.length } };
      }
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
    const candidateChunks = chunks.slice(0, FILTER_CHUNK_LIMIT);
    const items = [];
    let matched = 0;
    for (const chunk of candidateChunks) {
      const rows = await getLocalChunk(chunk.path);
      for (const row of rows) {
        if (!rowMatches(row, filters)) continue;
        if (matched >= offset && items.length < pageSize) items.push(row);
        matched += 1;
        if (items.length >= pageSize && matched >= offset + pageSize * 4) break;
      }
      if (items.length >= pageSize && matched >= offset + pageSize * 4) break;
    }
    return { items, total: Math.max(matched, items.length), stats };
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
        const fallback = [...(await getLocalOabQuestions()), ...(await getLocalMilitarQuestions()), ...useQuestoesStore.getState().questoes];
        return this.filter(fallback, filters);
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
    if ((!data || data.length === 0) && isOabFilter(filters)) return this.filter(await getLocalOabQuestions(), filters);
    if ((!data || data.length === 0) && isMilitarFilter(filters)) return this.filter(await getLocalMilitarQuestions(), filters);
    return data.map(mapQuestao);
  },
  async getQuestoes(filters = {}) {
    const limit = Number(filters.limit || 120);
    const candidates = [];

    if (isSupabaseConfigured) {
      let query = supabase.from("questoes").select("*").limit(Math.max(limit, 300));
      if (filters.banca) query = query.ilike("banca", `%${filters.banca}%`);
      if (filters.concurso) query = query.ilike("concurso", `%${filters.concurso}%`);
      if (filters.materia) query = query.eq("materia", filters.materia);
      if (filters.dificuldade) query = query.eq("dificuldade", filters.dificuldade);
      if (filters.assunto || filters.topico) query = query.ilike("topico", `%${filters.assunto || filters.topico}%`);
      if (filters.ano) query = query.eq("ano", filters.ano);
      if (filters.search) query = query.textSearch("enunciado", filters.search, { config: "portuguese" });
      const { data } = await query;
      if (data?.length) candidates.push(...data.map(mapQuestao));
    } else {
      try {
        const response = await fetch("/questoes/sample.json");
        if (response.ok) candidates.push(...(await response.json()).map(mapQuestao));
      } catch {
        // Os acervos oficiais abaixo continuam sendo carregados mesmo sem amostra local.
      }
    }

    candidates.push(...(await getLocalOabQuestions()), ...(await getLocalMilitarQuestions()), ...useQuestoesStore.getState().questoes.map(mapQuestao));
    const rows = this.filter(uniqueById(candidates), filters).filter((questao) => {
      if (filters.apenasOficiais) return questao.official;
      return true;
    });
    const ordered = filters.aleatorio ? orderForTraining(shuffle(rows, filters.seed || `${filters.area || "geral"}-${limit}`), filters) : rows;
    return ordered.slice(0, limit);
  },
  async getMateriasPorArea(area = "geral") {
    const questoes = await this.getQuestoes({ area, limit: 5000 });
    return [...new Set(questoes.map((questao) => questao.materia).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  },
  async getStats() {
    if (isSupabaseConfigured) {
      const { count } = await supabase.from("questoes").select("id", { count: "exact", head: true });
      const localOab = await getLocalOabQuestions();
      const localMilitar = await getLocalMilitarQuestions();
      return { totalDisponivel: count || localOab.length + localMilitar.length || 0, amostraLocal: !count && (localOab.length > 0 || localMilitar.length > 0), oabLocal: localOab.length, militarLocal: localMilitar.length };
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
  async getFilterOptions(filters = {}) {
    if (isSupabaseConfigured) {
      const area = filters.area || "geral";
      const rows = await this.getQuestoes({ area, limit: 10000 });
      return buildFilterOptions(rows, filters);
    }
    const catalog = await getLocalCatalog();
    if (!catalog.totalDisponivel && !catalog.totalExportado) {
      const official = [...(await getLocalOabQuestions()), ...(await getLocalMilitarQuestions()), ...useQuestoesStore.getState().questoes.map(mapQuestao)];
      return buildFilterOptions(official, filters);
    }
    const rows = await this.getQuestoes({ area: filters.area || "geral", limit: 10000 });
    return buildFilterOptions(rows, filters);
  },
  async getById(id) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from("questoes").select("*").eq("id", id).single();
      if (error) {
        const local = [...(await getLocalOabQuestions()), ...(await getLocalMilitarQuestions())].find((questao) => questao.id === id);
        if (local) return local;
        throw error;
      }
      return mapQuestao(data);
    }
    return findCachedQuestaoById(id) || [...(await getLocalOabQuestions()), ...(await getLocalMilitarQuestions())].find((questao) => questao.id === id) || useQuestoesStore.getState().questoes.find((questao) => questao.id === id);
  },
  async getByIds(ids = []) {
    const wanted = new Set(ids);
    const found = new Map();
    useQuestoesStore.getState().questoes.forEach((questao) => {
      if (wanted.has(questao.id)) found.set(questao.id, questao);
    });
    for (const rows of localChunkCache.values()) {
      rows.forEach((questao) => {
        if (wanted.has(questao.id)) found.set(questao.id, questao);
      });
    }
    const missingIds = () => ids.filter((id) => !found.has(id));
    if (isSupabaseConfigured && found.size < wanted.size) {
      const { data, error } = await supabase.from("questoes").select("*").in("id", missingIds());
      if (!error) {
        (data || []).map(mapQuestao).forEach((questao) => {
          if (wanted.has(questao.id)) found.set(questao.id, questao);
        });
      }
    }
    if (found.size < wanted.size) {
      const official = [...(await getLocalOabQuestions()), ...(await getLocalMilitarQuestions())];
      official.forEach((questao) => {
        if (wanted.has(questao.id)) found.set(questao.id, questao);
      });
    }
    if (found.size < wanted.size) {
      try {
        const catalog = await getLocalCatalog();
        for (const chunk of catalog.chunks.slice(0, FILTER_CHUNK_LIMIT)) {
          const rows = await getLocalChunk(chunk.path);
          rows.forEach((questao) => {
            if (wanted.has(questao.id)) found.set(questao.id, questao);
          });
          if (found.size >= wanted.size) break;
        }
      } catch {
        // Catalogo local eh opcional; o caderno continua com o que foi encontrado.
      }
    }
    return ids.map((id) => found.get(id)).filter(Boolean);
  },
  async responder(id, alternativaId, tempo = 0) {
    let questao = findCachedQuestaoById(id) || useQuestoesStore.getState().questoes.find((item) => item.id === id);
    if (!questao) {
      try {
        questao = await this.getById(id);
      } catch {
        questao = null;
      }
    }
    const result = useQuestoesStore.getState().responder(id, alternativaId, tempo, questao);
    if (!questao) return result;

    if (isSupabaseConfigured) {
      try {
        const userId = await getCurrentUserId();
        if (userId) {
          const acertou = isCorrectAnswer(questao, alternativaId);
          await insertTentativaSupabase({ userId, questao, alternativaId, acertou, tempo });
          if (!acertou) await upsertCadernoSupabase({ userId, questaoId: id });
          await supabase.rpc("incrementar_pontos", { uid: userId, pts: acertou ? 10 : 2 });
        }
      } catch (error) {
        console.warn("Falha ao sincronizar tentativa no Supabase.", error);
      }
    }
    return result;
  },
  async salvar(id) {
    const localResult = useQuestoesStore.getState().salvar(id);
    if (isSupabaseConfigured) {
      try {
        const userId = await getCurrentUserId();
        if (userId) await syncSalvaSupabase({ userId, questaoId: id, saved: localResult.saved });
      } catch (error) {
        console.warn("Falha ao sincronizar questao salva no Supabase.", error);
      }
    }
    return { success: true, saved: localResult.saved };
  },
  async adicionarAoCaderno(id) {
    const localResult = useQuestoesStore.getState().addCaderno(id);
    if (isSupabaseConfigured) {
      try {
        const userId = await getCurrentUserId();
        if (userId) await upsertCadernoSupabase({ userId, questaoId: id });
      } catch (error) {
        console.warn("Falha ao sincronizar caderno de erros no Supabase.", error);
      }
    }
    return { success: true, added: localResult.added };
  },
  async removerDoCaderno(id) {
    const localResult = useQuestoesStore.getState().removerCaderno(id);
    if (isSupabaseConfigured) {
      try {
        const userId = await getCurrentUserId();
        if (userId) await removeCadernoSupabase({ userId, questaoId: id });
      } catch (error) {
        console.warn("Falha ao remover questao do caderno no Supabase.", error);
      }
    }
    return { success: true, removed: localResult.removed };
  },
  async reportar() {
    return { success: true };
  },
  filter(questoes, filters = {}) {
    return questoes.filter((q) => Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "area") return matchesArea(q, value);
      if (key === "questoesIds") return Array.isArray(value) ? value.includes(q.id) : true;
      if (["limit", "page", "pageSize", "aleatorio", "seed", "apenasOficiais"].includes(key)) return true;
      if (key === "origin" || key === "origem") {
        if (value === "oficial") return q.official || normalize(q.origem).includes("oficial");
        return normalize(q.origem).includes(normalize(value));
      }
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
