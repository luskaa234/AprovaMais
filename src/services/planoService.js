import { usePlanoStore } from "../stores";
import { getCurrentUserId, isSupabaseConfigured, supabase } from "../lib/supabase";
import { aiService } from "./aiService";

const dayIndexToName = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function slug(value = "") {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeActivityType(value = "") {
  const key = normalize(value);
  const labels = {
    questoes: "Questões",
    questao: "Questões",
    revisao: "Revisão",
    leitura: "Leitura",
    flashcards: "Flashcards",
    taf: "TAF",
    simulado: "Simulado",
    estudo: "Estudo",
  };
  return labels[key] || value || "Estudo";
}

function subjectsForUser(user = {}) {
  const target = normalize(`${user.targetContest || ""} ${user.objective || ""} ${user.contestName || ""} ${user.diagnosticPlan?.objective || ""} ${user.diagnosticPlan?.objectiveLabel || ""}`);
  const focus = user.focusSubject ? [user.focusSubject] : [];
  if (target.includes("oab")) {
    return [...focus, "Etica Profissional", "Constitucional", "Civil", "Processo Civil", "Penal", "Trabalho"].filter(Boolean);
  }
  if (target.includes("enem")) {
    return [...focus, "Linguagens", "Matematica", "Ciencias Humanas", "Ciencias da Natureza", "Redacao"].filter(Boolean);
  }
  if (target.includes("pmma")) {
    const taf = user.includeTaf === false ? [] : ["TAF"];
    return [...focus, "Portugues", "Raciocinio Logico", "Informatica", "Constitucional", "Penal", "Processual Penal", "Legislacao Institucional PMMA", ...taf].filter(Boolean);
  }
  if (target.includes("prf")) {
    const taf = user.includeTaf === false ? [] : ["TAF"];
    return [...focus, "Portugues", "Raciocinio Logico", "Informatica", "Constitucional", "Administrativo", "Legislacao de Transito", "Direitos Humanos", ...taf].filter(Boolean);
  }
  if (target.includes("pm") || target.includes("policia") || target.includes("militar")) {
    const taf = user.includeTaf === false ? [] : ["TAF"];
    return [...focus, "Portugues", "Matematica/RL", "Constitucional", "Penal", "Processual Penal", "Legislacao Especial", "Informatica", ...taf].filter(Boolean);
  }
  return [...focus, "Portugues", "Constitucional", "Administrativo", "Informatica", "Raciocinio Logico", "Atualidades"].filter(Boolean);
}

function availableDaysForUser(user = {}) {
  const explicit = user.availableDays || user.diasDisponiveis || user.daysAvailable;
  if (Array.isArray(explicit) && explicit.length) return explicit.map(normalize);
  const daysPerWeek = Number(user.daysPerWeek || 6);
  return dayIndexToName.slice(1, Math.min(7, daysPerWeek + 1));
}

function buildSmartWeek(user = {}, startDate = new Date()) {
  const start = addDays(startDate, -startDate.getDay());
  const subjects = subjectsForUser(user);
  const availableDays = new Set(availableDaysForUser(user));
  const weeklyHours = Number(user.horasSemanais || user.hoursPerWeek || (user.hoursPerDay && user.daysPerWeek ? user.hoursPerDay * user.daysPerWeek : 18));
  const studyDays = Array.from({ length: 7 }, (_, index) => addDays(start, index)).filter((date) => availableDays.has(dayIndexToName[date.getDay()]));
  const days = studyDays.length ? studyDays : Array.from({ length: 6 }, (_, index) => addDays(start, index + 1));
  const minutesPerDay = Math.max(45, Math.round((weeklyHours * 60) / days.length));
  const blocksPerDay = minutesPerDay >= 180 ? 3 : minutesPerDay >= 100 ? 2 : 1;
  const blockMinutes = Math.max(35, Number(user.sessionLength || Math.round(minutesPerDay / blocksPerDay)));
  const targetContest = user.targetContest || user.contestName || user.diagnosticPlan?.objectiveLabel || "Geral";
  const startHour = Number(String(user.preferredStart || "08:00").split(":")[0]) || 8;

  return days.flatMap((date, dayIndex) => Array.from({ length: blocksPerDay }, (_, blockIndex) => {
    const subject = subjects[(dayIndex * blocksPerDay + blockIndex) % subjects.length];
    const isLastBlock = blockIndex === blocksPerDay - 1;
    const type = date.getDay() === 6 && isLastBlock ? "Simulado" : isLastBlock ? "Questões" : blockIndex === 0 ? "Estudo" : "Revisão";
    const hour = `${String(Math.min(22, startHour + blockIndex * 2)).padStart(2, "0")}:00`;
    return {
      id: `smart-${isoDate(date)}-${blockIndex}-${slug(subject)}`,
      date: isoDate(date),
      hour,
      title: `${type} - ${subject}`,
      materia: subject,
      type,
      duration: type === "Simulado" ? Math.max(90, blockMinutes) : blockMinutes,
      status: "Pendente",
      concurso: targetContest,
      generated: true,
    };
  }));
}

function normalizeActivity(row = {}) {
  return {
    id: row.id,
    title: row.title || row.titulo || `${normalizeActivityType(row.type || row.tipo || "Estudo")} - ${row.materia || "Geral"}`,
    materia: row.materia || "Geral",
    type: normalizeActivityType(row.type || row.tipo || "Estudo"),
    date: row.date || row.data || isoDate(new Date()),
    hour: row.hour || row.hora || "08:00",
    duration: Number(row.duration || row.duracao || 60),
    status: row.status || "Pendente",
    concurso: row.concurso || row.objetivo || "Geral",
    generated: Boolean(row.generated || row.gerado_por_ia),
    createdAt: row.createdAt || row.criado_em || new Date().toISOString(),
  };
}

function toDbPayload(activity, userId) {
  const normalized = normalizeActivity(activity);
  return {
    user_id: userId,
    titulo: normalized.title,
    materia: normalized.materia,
    tipo: normalized.type,
    data: normalized.date,
    hora: normalized.hour,
    duracao: normalized.duration,
    status: normalized.status,
    concurso: normalized.concurso,
    gerado_por_ia: normalized.generated,
  };
}

function saveLocal(activity) {
  return usePlanoStore.getState().criarAtividade(normalizeActivity(activity));
}

function updateLocal(id, patch) {
  usePlanoStore.getState().atualizarAtividade(id, patch);
  return usePlanoStore.getState().atividades.find((item) => item.id === id);
}

function deleteLocal(id) {
  usePlanoStore.getState().removerAtividade(id);
  return true;
}

function parseAiActivities(text = "", user = {}, startDate = new Date()) {
  const clean = String(text).replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  const rows = Array.isArray(parsed) ? parsed : parsed.atividades || parsed.activities || [];
  return rows.map((item, index) => normalizeActivity({
    id: item.id || `ai-${isoDate(startDate)}-${index}-${slug(item.materia || item.subject || "atividade")}`,
    title: item.titulo || item.title,
    materia: item.materia || item.subject,
    type: item.tipo || item.type,
    date: item.data || item.date,
    hour: item.hora || item.hour,
    duration: item.duracao || item.duration,
    status: "Pendente",
    concurso: user.targetContest || user.contestName || "Geral",
    generated: true,
  })).filter((item) => item.materia && item.date);
}

/**
 * Future REST contract:
 * GET /plano
 * POST /plano/gerar
 * PUT /plano/progresso
 */
export const planoService = {
  async getPlano() {
    return usePlanoStore.getState().getPlano();
  },
  async getAtividades() {
    const local = usePlanoStore.getState().getAtividades();
    if (!isSupabaseConfigured) return local;
    const userId = await getCurrentUserId();
    if (!userId) {
      usePlanoStore.getState().setAtividades([]);
      return [];
    }
    const { data, error } = await supabase
      .from("plano_atividades")
      .select("*")
      .eq("user_id", userId)
      .order("data", { ascending: true })
      .order("hora", { ascending: true });
    if (error) {
      throw new Error(error.message || "Falha ao carregar plano na nuvem.");
    }
    const rows = (data || []).map(normalizeActivity);
    usePlanoStore.getState().setAtividades(rows);
    return rows;
  },
  async criarAtividade(activity) {
    const local = saveLocal(activity);
    if (!isSupabaseConfigured) return local;
    const userId = await getCurrentUserId();
    if (!userId) return local;
    const { data, error } = await supabase
      .from("plano_atividades")
      .insert(toDbPayload(local, userId))
      .select("*")
      .single();
    if (error) {
      const wrapped = new Error(error.message || "Falha ao criar atividade na nuvem.");
      wrapped.localResult = local;
      throw wrapped;
    }
    const saved = normalizeActivity(data);
    usePlanoStore.setState((state) => ({ atividades: state.atividades.map((item) => item.id === local.id ? saved : item) }));
    return saved;
  },
  async atualizarAtividade(id, patch) {
    const local = updateLocal(id, patch);
    if (!isSupabaseConfigured) return local;
    const userId = await getCurrentUserId();
    if (!userId) return local;
    const { data, error } = await supabase
      .from("plano_atividades")
      .update(toDbPayload({ ...local, ...patch }, userId))
      .eq("id", id)
      .eq("user_id", userId)
      .select("*")
      .maybeSingle();
    if (error) {
      const wrapped = new Error(error.message || "Falha ao atualizar atividade na nuvem.");
      wrapped.localResult = local;
      throw wrapped;
    }
    const saved = data ? normalizeActivity(data) : local;
    updateLocal(id, saved);
    return saved;
  },
  async alternarAtividade(id) {
    const current = usePlanoStore.getState().atividades.find((item) => item.id === id);
    const status = current?.status === "Concluida" ? "Pendente" : "Concluida";
    return this.atualizarAtividade(id, { status });
  },
  async removerAtividade(id) {
    deleteLocal(id);
    if (!isSupabaseConfigured) return true;
    const userId = await getCurrentUserId();
    if (!userId) return true;
    const { error } = await supabase.from("plano_atividades").delete().eq("id", id).eq("user_id", userId);
    if (error) throw new Error(error.message || "Falha ao remover atividade na nuvem.");
    return true;
  },
  async gerarSemanaInteligente({ user = {}, startDate = new Date() } = {}) {
    const fallback = buildSmartWeek(user, startDate);
    const objectiveScope = user.targetContest || user.contestName || user.objective || user.diagnosticPlan?.objectiveLabel || "Concurso publico";
    const prompt = `Crie atividades reais de plano de estudos para uma semana.
Responda APENAS em JSON valido no formato:
{"atividades":[{"materia":"...","tipo":"Questões|Revisão|Leitura|Flashcards|TAF|Simulado","data":"AAAA-MM-DD","hora":"HH:mm","duracao":60,"titulo":"..."}]}

Perfil do aluno:
${JSON.stringify({
  objetivo: objectiveScope,
  nivel: user.nivel || user.level || "intermediario",
  horasSemanais: user.horasSemanais || user.hoursPerWeek || 18,
  diasDisponiveis: user.availableDays || user.diasDisponiveis || "segunda a sabado",
  dataProva: user.dataProva || user.examDate || "",
}, null, 2)}

Data inicial da semana: ${isoDate(startDate)}
Pedido especifico do aluno: ${user.aiPedido || "sem pedido adicional"}
Regras: respeite estritamente o objetivo ativo "${objectiveScope}", nao misture disciplinas incompatíveis, distribua matérias importantes, alterne teoria/questões/revisão e inclua TAF somente quando for objetivo policial ou militar.`;
    try {
      const text = await aiService.gerarTexto(prompt, {
        task: "plan",
        responseFormat: "json",
        maxOutputTokens: 900,
        perfil: user,
        cache: false,
        tier: "barato",
      });
      const parsed = parseAiActivities(text, user, startDate);
      return parsed.length ? parsed : fallback;
    } catch (error) {
      console.warn("[planoService] IA falhou ao gerar plano, usando fallback:", error.message);
      return fallback;
    }
  },
  async gerarPlanoCompleto({ user = {}, startDate = new Date(), weeks = 8 } = {}) {
    const totalWeeks = Math.max(1, Math.min(16, Number(weeks) || 8));
    return Array.from({ length: totalWeeks }, (_, index) => buildSmartWeek(user, addDays(startDate, index * 7))).flat();
  },
  async criarAtividadesEmLote(activities = []) {
    const saved = [];
    for (const activity of activities) {
      saved.push(await this.criarAtividade(activity));
    }
    return saved;
  },
  async aplicarPedidoDoAssistente({ pedido = "", user = {}, startDate = new Date(), replaceGenerated = true } = {}) {
    const atuais = await this.getAtividades();
    if (replaceGenerated) {
      const geradas = atuais.filter((item) => item.generated);
      for (const activity of geradas) {
        await this.removerAtividade(activity.id);
      }
    }
    const atividades = await this.gerarSemanaInteligente({
      user: { ...user, aiPedido: pedido },
      startDate,
    });
    const saved = await this.criarAtividadesEmLote(atividades);
    return {
      action: "plano_atualizado",
      savedCount: saved.length,
      replacedGenerated: replaceGenerated,
      preview: saved.slice(0, 6).map((item) => ({
        date: item.date,
        hour: item.hour,
        title: item.title,
        materia: item.materia,
        type: item.type,
      })),
    };
  },
  async getSugestao() {
    return "Redistribua 20 min de Informatica para Constitucional nesta semana.";
  },
};
