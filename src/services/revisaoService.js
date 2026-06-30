import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { useQuestoesStore } from "../stores";
import { questoesService } from "./questoesService";

const REVIEW_TABLE = "revisao_questoes";
const ACTIVE_STATUS = "a_revisar";
const MASTERED_STATUS = "dominada";
const REMOVED_STATUS = "removida";

const today = () => new Date().toISOString().slice(0, 10);

function normalize(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function statusLabel(status) {
  if (status === MASTERED_STATUS) return "Dominada";
  if (status === REMOVED_STATUS) return "Removida";
  return "A revisar";
}

function applyFilters(items = [], filters = {}) {
  return items.filter((item) => {
    if (filters.materia && item.questao?.materia !== filters.materia && item.questao?.materiaLabel !== filters.materia) return false;
    if (filters.banca && item.questao?.banca !== filters.banca) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.search) {
      const query = normalize(filters.search);
      const haystack = [
        item.questao?.enunciado,
        item.questao?.materia,
        item.questao?.materiaLabel,
        item.questao?.assunto,
        item.questao?.assuntoLabel,
        item.questao?.banca,
      ].map(normalize).join(" ");
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

function buildStats(items = []) {
  const visibleItems = items.filter((item) => item.status !== REMOVED_STATUS);
  const revisar = visibleItems.filter((item) => item.status === ACTIVE_STATUS).length;
  const dominadas = visibleItems.filter((item) => item.status === MASTERED_STATUS).length;
  const total = revisar + dominadas;
  return {
    revisar,
    dominadas,
    total,
    progresso: total ? Math.round((dominadas / total) * 100) : 0,
  };
}

function sortReviewItems(items = []) {
  return [...items].sort((a, b) => {
    if (a.status !== b.status) return a.status === ACTIVE_STATUS ? -1 : 1;
    return String(a.dueAt || "").localeCompare(String(b.dueAt || ""));
  });
}

function mapQuestionWithState({ questao, state, wrongAttempt, cadernoDate }) {
  const status = state?.status || ACTIVE_STATUS;
  const source = state?.source || (cadernoDate ? "caderno" : "tentativa_errada");
  return {
    id: questao.id,
    questao,
    status,
    statusLabel: statusLabel(status),
    source,
    dueAt: state?.due_at || state?.proxima_revisao || cadernoDate?.slice?.(0, 10) || wrongAttempt?.created_at?.slice?.(0, 10) || today(),
    lastReviewedAt: state?.last_reviewed_at || null,
    lastWrongAnswer: wrongAttempt?.resposta || "",
    attempts: Number(state?.attempts || 0),
    correctCount: Number(state?.correct_count || 0),
    wrongCount: Number(state?.wrong_count || (wrongAttempt ? 1 : 0)),
  };
}

async function safeReviewRows(userId) {
  const { data, error } = await supabase
    .from(REVIEW_TABLE)
    .select("questao_id,status,due_at,last_reviewed_at,source,attempts,correct_count,wrong_count")
    .eq("user_id", userId);
  if (error) {
    console.warn("Tabela revisao_questoes indisponivel. Rode o SQL fornecido para persistir status da revisao.", error);
    return [];
  }
  return data || [];
}

async function loadRemote(filters = {}) {
  const userId = await getCurrentUserId();
  if (!userId) return { items: [], allItems: [], stats: buildStats([]), missingAuth: true };

  const [tentativasRes, cadernoRes, reviewRows] = await Promise.all([
    supabase
      .from("tentativas")
      .select("questao_id,resposta,acertou,created_at")
      .eq("user_id", userId)
      .eq("acertou", false)
      .order("created_at", { ascending: false })
      .limit(600),
    supabase
      .from("caderno_erros")
      .select("questao_id,created_at")
      .eq("user_id", userId),
    safeReviewRows(userId),
  ]);

  if (tentativasRes.error) throw tentativasRes.error;
  if (cadernoRes.error) throw cadernoRes.error;

  const wrongAttempts = new Map();
  (tentativasRes.data || []).forEach((item) => {
    if (item.questao_id && !wrongAttempts.has(item.questao_id)) wrongAttempts.set(item.questao_id, item);
  });

  const cadernoDates = new Map();
  (cadernoRes.data || []).forEach((item) => {
    if (item.questao_id) cadernoDates.set(item.questao_id, item.created_at || today());
  });

  const stateByQuestion = new Map();
  reviewRows.forEach((item) => {
    if (item.questao_id) stateByQuestion.set(item.questao_id, item);
  });

  const ids = unique([
    ...wrongAttempts.keys(),
    ...cadernoDates.keys(),
    ...reviewRows.filter((item) => item.status !== REMOVED_STATUS).map((item) => item.questao_id),
  ]);
  const questoes = await questoesService.getByIds(ids);
  const allItems = sortReviewItems(questoes
    .map((questao) => mapQuestionWithState({
      questao,
      state: stateByQuestion.get(questao.id),
      wrongAttempt: wrongAttempts.get(questao.id),
      cadernoDate: cadernoDates.get(questao.id),
    }))
    .filter((item) => item.status !== REMOVED_STATUS));

  return {
    items: applyFilters(allItems, filters),
    allItems,
    stats: buildStats(allItems),
    missingAuth: false,
  };
}

async function loadLocal(filters = {}) {
  const state = useQuestoesStore.getState();
  const wrongAttempts = new Map(state.tentativas.filter((item) => !item.acertou).map((item) => [item.questaoId, item]));
  const ignored = new Set(state.errosSuperados || []);
  const ids = unique([...state.caderno, ...wrongAttempts.keys()]).filter((id) => !ignored.has(id));
  const questoes = await questoesService.getByIds(ids);
  const allItems = sortReviewItems(questoes.map((questao) => mapQuestionWithState({
    questao,
    state: { status: ACTIVE_STATUS, source: state.caderno.includes(questao.id) ? "caderno" : "tentativa_errada" },
    wrongAttempt: wrongAttempts.get(questao.id),
    cadernoDate: today(),
  })));
  return {
    items: applyFilters(allItems, filters),
    allItems,
    stats: buildStats(allItems),
    missingAuth: false,
  };
}

async function upsertStatus({ questaoId, status, source = "manual", acertou = null }) {
  if (!isSupabaseConfigured) return;
  const userId = await getCurrentUserId();
  if (!userId) return;

  const patch = {
    user_id: userId,
    questao_id: questaoId,
    status,
    source,
    due_at: status === ACTIVE_STATUS ? today() : null,
    last_reviewed_at: new Date().toISOString(),
    attempts: 1,
    correct_count: acertou === true ? 1 : 0,
    wrong_count: acertou === false ? 1 : 0,
  };

  const { error } = await supabase
    .from(REVIEW_TABLE)
    .upsert(patch, { onConflict: "user_id,questao_id" });
  if (error) throw error;
}

async function removeFromErrorBook(questaoId) {
  useQuestoesStore.getState().removerCaderno(questaoId);
  if (!isSupabaseConfigured) return;
  const userId = await getCurrentUserId();
  if (!userId) return;
  const { error } = await supabase.from("caderno_erros").delete().eq("user_id", userId).eq("questao_id", questaoId);
  if (error) throw error;
}

export const revisaoService = {
  statuses: {
    ACTIVE_STATUS,
    MASTERED_STATUS,
    REMOVED_STATUS,
  },
  async getCentral(filters = {}) {
    if (!isSupabaseConfigured) return loadLocal(filters);
    return loadRemote(filters);
  },
  async responder(questaoId, alternativaId) {
    const result = await questoesService.responder(questaoId, alternativaId);
    if (result.correta) {
      await upsertStatus({ questaoId, status: MASTERED_STATUS, source: "refeita", acertou: true });
      await removeFromErrorBook(questaoId);
    } else {
      await upsertStatus({ questaoId, status: ACTIVE_STATUS, source: "refeita", acertou: false });
    }
    return result;
  },
  async marcarDominada(questaoId) {
    await upsertStatus({ questaoId, status: MASTERED_STATUS, source: "manual", acertou: true });
    await removeFromErrorBook(questaoId);
    return { success: true };
  },
  async removerDaRevisao(questaoId) {
    await upsertStatus({ questaoId, status: REMOVED_STATUS, source: "manual" });
    await removeFromErrorBook(questaoId);
    return { success: true };
  },
  async reabrir(questaoId) {
    await upsertStatus({ questaoId, status: ACTIVE_STATUS, source: "manual" });
    useQuestoesStore.getState().addCaderno(questaoId);
    return { success: true };
  },
};
