import { isSupabaseConfigured, requireSupabase } from "../lib/supabase";
import { montarContextoAluno } from "../ai/tutorPrompt";
import { ASSISTENTE_ATIVO } from "../config/features";

const modelName = "Aprovinho";
const CHAT_DEFAULT_TIER = "barato";
const disabledMessage = "Assistente em breve. Recurso em desenvolvimento, sem chamadas de IA por enquanto.";
let lastAIStatus = { source: ASSISTENTE_ATIVO ? (isSupabaseConfigured ? "edge-ready" : "edge-missing-config") : "disabled", modelName, error: "" };

function normalizeText(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function usefulSubject(value) {
  const text = normalizeText(value);
  return text && !["nao informada", "informada", "geral", "undefined", "null"].includes(text);
}

function uniqueSubjects(items = []) {
  const seen = new Set();
  return items
    .map((item) => String(item || "").trim())
    .filter(usefulSubject)
    .filter((item) => {
      const key = normalizeText(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function compactPerformance(desempenho = {}) {
  const porMateria = desempenho.porMateria || {};
  const materias = Object.entries(porMateria)
    .map(([materia, stats]) => {
      const total = Number(stats.total || 0);
      const acertos = Number(stats.acertos || 0);
      const erros = Number(stats.erros || Math.max(total - acertos, 0));
      const taxa = total ? Math.round((acertos / total) * 100) : 0;
      return { materia, total, acertos, erros, taxa };
    })
    .filter((item) => usefulSubject(item.materia) && item.total > 0)
    .sort((a, b) => a.taxa - b.taxa || b.erros - a.erros);

  return {
    questoesResolvidas: Number(desempenho.questoesResolvidas || 0),
    taxaAcertos: Number(desempenho.taxaAcertos || 0),
    sequenciaDias: Number(desempenho.sequenciaDias || 0),
    materiasFracas: desempenho.materiasFracas?.length ? desempenho.materiasFracas.slice(0, 5) : materias.slice(0, 5).map((item) => item.materia),
    materiasFortes: materias.slice().sort((a, b) => b.taxa - a.taxa).slice(0, 4).map((item) => item.materia),
    porMateria: materias.slice(0, 12),
  };
}

function compactProfile(perfil = {}) {
  const plan = perfil.diagnosticPlan || {};
  return {
    nome: perfil.name || perfil.nome || "",
    objetivo: perfil.objective || plan.objective || perfil.targetContest || "",
    objetivoLabel: plan.objectiveLabel || perfil.contestName || perfil.targetContest || "",
    concurso: perfil.targetContest || perfil.contestName || "",
    nivel: perfil.nivel || perfil.currentLevel || "intermediario",
    dataProva: perfil.dataProva || perfil.examDate || "",
    horasSemanais: perfil.horasSemanais || perfil.hoursPerWeek || "",
    diasDisponiveis: perfil.diasDisponiveis || perfil.availableDays || [],
    materiasDificeis: uniqueSubjects([...(perfil.difficultSubjects || []), ...(plan.weakSubjects || [])]).slice(0, 8),
    planoPrioridades: uniqueSubjects(plan.prioritySubjects || []).slice(0, 8),
  };
}

function buildCompactContext(perfil = {}, desempenho = {}) {
  return {
    perfil: compactProfile(perfil),
    desempenho: compactPerformance(desempenho),
  };
}

function cleanJsonText(text = "") {
  return String(text || "").replace(/```json|```/g, "").trim();
}

function friendlyAIError(message = "", status) {
  if (status === 401 || /autenticado|jwt|session|auth|401|unauthorized/i.test(message)) {
    return "Preciso que voce esteja logado para conversar com o Aprovinho. Entre novamente e tente de novo.";
  }
  return "Nao consegui falar com a IA agora. Tente de novo em instantes.";
}

function getChatTier(_message = "", requestedTier = "") {
  if (requestedTier === "barato" || requestedTier === "forte") return requestedTier;
  return CHAT_DEFAULT_TIER;
}

async function invokeAI({ task = "chat", prompt = "", perfil = {}, desempenho = {}, responseFormat = "text", maxOutputTokens, cache = false, cacheKey = "", cacheTtlDays = 30, historico = [], tier, extraContext = {} }) {
  if (!ASSISTENTE_ATIVO) {
    lastAIStatus = { source: "disabled", modelName, error: "" };
    return { text: disabledMessage, source: "disabled", model: modelName };
  }

  if (!isSupabaseConfigured) {
    const message = "Supabase não configurado";
    lastAIStatus = { source: "edge-missing-config", modelName, error: message };
    return { text: friendlyAIError(message), source: "edge-missing-config", model: modelName };
  }

  const client = requireSupabase();
  const context = {
    ...buildCompactContext(perfil, desempenho),
    ...extraContext,
    historico: (historico || []).slice(-6).map((item) => ({
      role: item.role || (item.text ? "user" : "model"),
      text: String(item.text || item.content || "").slice(0, 800),
    })),
  };

  let data;
  let error;
  try {
    const response = await client.functions.invoke("ia-aprova", {
      body: { task, prompt, context, responseFormat, maxOutputTokens, cache, cacheKey, cacheTtlDays, tier },
    });
    data = response.data;
    error = response.error;
  } catch (caught) {
    error = caught;
  }

  if (error || data?.error) {
    const message = data?.error || error?.message || "Falha ao consultar IA.";
    const status = error?.context?.status || error?.status;
    lastAIStatus = { source: "edge-error", modelName, error: message };
    return { text: friendlyAIError(message, status), source: "edge-error", model: modelName };
  }

  lastAIStatus = { source: data.source || "edge", modelName: data.model || modelName, error: "" };
  return { text: data.text || "", source: data.source || "edge", model: data.model || modelName };
}

export const aiService = {
  isConfigured: ASSISTENTE_ATIVO && isSupabaseConfigured,
  isEnabled: ASSISTENTE_ATIVO,
  modelName,
  chatTier: CHAT_DEFAULT_TIER,
  getStatus() {
    return lastAIStatus;
  },
  getCompactContext(perfil, desempenho) {
    return buildCompactContext(perfil, desempenho);
  },

  async gerarTexto(prompt, options = {}) {
    const result = await invokeAI({
      task: options.task || "text",
      prompt,
      perfil: options.perfil,
      desempenho: options.desempenho,
      responseFormat: options.responseFormat || "text",
      maxOutputTokens: options.maxOutputTokens || 650,
      cache: options.cache,
      cacheKey: options.cacheKey,
      cacheTtlDays: options.cacheTtlDays,
      tier: options.tier,
      extraContext: options.extraContext,
    });
    return result.text;
  },

  async enviarMensagem(mensagem, historico = [], perfil = {}, desempenho = {}, options = {}) {
    if (!ASSISTENTE_ATIVO) {
      lastAIStatus = { source: "disabled", modelName, error: "" };
      return disabledMessage;
    }

    const result = await invokeAI({
      task: "chat",
      prompt: mensagem,
      perfil,
      desempenho,
      historico,
      responseFormat: "text",
      maxOutputTokens: 700,
      cache: false,
      tier: getChatTier(mensagem, options.tier),
      extraContext: options.extraContext,
    });
    return result.text || friendlyAIError();
  },

  async gerarRelatorio(perfil, desempenho, tipo = "geral") {
    if (!ASSISTENTE_ATIVO) {
      lastAIStatus = { source: "disabled", modelName, error: "" };
      return disabledMessage;
    }

    const context = buildCompactContext(perfil, desempenho);
    if (!context.desempenho.questoesResolvidas) {
      lastAIStatus = { source: "code", modelName, error: "" };
      return "Ainda não há questões resolvidas suficientes para gerar um relatório real. Resolva algumas questões para eu calcular taxa, matérias fracas e evolução.";
    }
    const prompt = `Interprete estes números já calculados e gere um relatório ${tipo}. Não recalcule nada; apenas explique prioridades e plano de ação.`;
    const result = await invokeAI({ task: "report", prompt, perfil, desempenho, maxOutputTokens: 900, tier: "forte" });
    return result.text;
  },

  async gerarPlanoEstudos(perfil, planoBase) {
    const compact = compactProfile({ ...perfil, diagnosticPlan: planoBase });
    const prompt = `Refine o plano calculado em código. Mantenha a estrutura e apenas melhore orientações, metas e distribuição textual. Plano base: ${JSON.stringify(planoBase)}`;
    try {
      const result = await invokeAI({
        task: "plan",
        prompt,
        perfil: compact,
        desempenho: {},
        responseFormat: "json",
        maxOutputTokens: 900,
        tier: "forte",
      });
      const parsed = JSON.parse(cleanJsonText(result.text));
      return { ...planoBase, ...parsed, aiGenerated: true, createdAt: new Date().toISOString() };
    } catch {
      lastAIStatus = { source: "plan-code-fallback", modelName, error: "" };
      return { ...planoBase, aiGenerated: false, createdAt: new Date().toISOString() };
    }
  },

  async gerarResumo(assunto, materia, concurso) {
    return this.gerarTexto(`Crie um resumo objetivo de "${assunto}" da matéria "${materia}" para ${concurso}. Máximo 220 palavras, em tópicos.`, {
      task: "summary",
      maxOutputTokens: 500,
      cache: true,
      cacheKey: `summary:${normalizeText(concurso)}:${normalizeText(materia)}:${normalizeText(assunto)}`,
      cacheTtlDays: 120,
      tier: "barato",
    });
  },

  async explicarQuestao(questao, respostaAluno, comentarioLegado) {
    const prompt = typeof questao === "string"
      ? `Explique esta questao. Enunciado: ${questao}. Gabarito: ${respostaAluno}. Comentario: ${comentarioLegado || ""}`
      : `Explique a questao, a resposta correta, a resposta do aluno e a pegadinha. Dados: ${JSON.stringify({
          enunciado: questao.enunciado,
          alternativas: questao.alternativas,
          gabarito: questao.gabarito,
          respostaAluno,
          comentario: comentarioLegado || questao.comentario,
        })}`;
    const key = typeof questao === "object" && questao?.id ? `questao:${questao.id}:explicacao:${String(respostaAluno || "").toLowerCase()}` : "";
    return this.gerarTexto(prompt, { task: "explain_question", maxOutputTokens: 750, cache: Boolean(key), cacheKey: key, cacheTtlDays: 180, tier: "barato" });
  },

  async corrigirRedacao(tema, texto, exame = "concurso") {
    const prompt = `Corrija a redação em JSON. Exame: ${exame}. Tema: ${tema}. Texto: ${texto}`;
    return this.gerarTexto(prompt, { task: "essay", responseFormat: "json", maxOutputTokens: 1000, tier: "forte" });
  },

  async gerarFlashcards(assunto, materia, quantidade = 5) {
    const text = await this.gerarTexto(`Gere ${quantidade} flashcards sobre "${assunto}" de "${materia}". JSON: [{"frente":"...","verso":"..."}]`, {
      task: "flashcards",
      responseFormat: "json",
      maxOutputTokens: 650,
      cache: true,
      cacheKey: `flashcards:${normalizeText(materia)}:${normalizeText(assunto)}:${quantidade}`,
      cacheTtlDays: 180,
      tier: "barato",
    });
    try {
      return JSON.parse(cleanJsonText(text));
    } catch {
      return [];
    }
  },

  stream(prompt, onChunk, onDone, perfil = {}, desempenho = {}, historico = [], options = {}) {
    let cancelled = false;
    this.enviarMensagem(prompt, historico, perfil, desempenho, options)
      .then((response) => {
        if (cancelled) return;
        onChunk(response);
        onDone?.(response);
      })
      .catch((error) => {
        const message = error?.message || "Falha ao consultar IA.";
        lastAIStatus = { source: "edge-error", modelName, error: message };
        const response = friendlyAIError(message);
        if (cancelled) return;
        onChunk(response);
        onDone?.(response);
      });

    return () => {
      cancelled = true;
    };
  },

  montarContextoAluno,
};
