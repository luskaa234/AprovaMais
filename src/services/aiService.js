import { isSupabaseConfigured, requireSupabase } from "../lib/supabase";
import { montarContextoAluno } from "../ai/tutorPrompt";

const modelName = "gemini-2.5-flash";
let lastAIStatus = { source: isSupabaseConfigured ? "edge-ready" : "local-fallback", modelName, error: "" };
let edgeDisabledUntil = 0;

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

function defaultSubjectsFor(objective = "") {
  const text = normalizeText(objective);
  if (text.includes("oab")) return ["Etica Profissional", "Direito Constitucional", "Direito Civil", "Processo Civil"];
  if (text.includes("pm") || text.includes("policia") || text.includes("prf")) return ["Portugues", "Matematica/RL", "Direito Constitucional", "Direito Penal"];
  return ["Portugues", "Raciocinio Logico", "Direito Constitucional"];
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

function localTutorResponse(mensagem = "", perfil = {}, desempenho = {}) {
  const text = normalizeText(mensagem);
  const context = buildCompactContext(perfil, desempenho);
  const firstName = context.perfil.nome?.split(" ")?.[0] || "por aqui";
  const objective = context.perfil.objetivoLabel || context.perfil.concurso || context.perfil.objetivo || "seu objetivo";
  const subjects = uniqueSubjects([
    ...(context.desempenho.materiasFracas || []),
    ...(context.perfil.materiasDificeis || []),
    ...(context.perfil.planoPrioridades || []),
  ]);
  const priorities = subjects.length ? subjects : defaultSubjectsFor(objective);

  if (text.includes("quantas quest") || text.includes("questoes resolvi") || text.includes("questoes eu fiz")) {
    return `Voce resolveu ${context.desempenho.questoesResolvidas || 0} questoes registradas ate agora.`;
  }

  if (text.includes("taxa") || text.includes("percentual") || text.includes("aproveitamento")) {
    return `Sua taxa de acerto registrada e ${context.desempenho.taxaAcertos || 0}%.`;
  }

  if (text.includes("pior materia") || text.includes("materia mais fraca") || text.includes("materias fracas")) {
    if (!context.desempenho.questoesResolvidas) {
      return "Ainda nao ha questoes resolvidas suficientes para apontar uma materia fraca real. Resolva um bloco de questoes e eu recalculo sem gastar IA.";
    }
    return `Pelos seus dados, suas prioridades agora sao: ${priorities.slice(0, 5).join(", ")}. Comece pela primeira com teoria curta + questoes + revisao dos erros.`;
  }

  if (/^(oi|ola|opa|bom dia|boa tarde|boa noite)\b/.test(text)) {
    return `Oi, ${firstName}. Posso montar um bloco de estudo, explicar uma questao ou analisar seus pontos fracos para ${objective}.`;
  }

  if (text.includes("taf") || text.includes("teste fisico")) {
    return "Plano simples de TAF: 3 treinos de corrida na semana, 2 blocos de forca e 1 dia leve. Registre tempo/repeticoes para ajustar pelo seu resultado real.";
  }

  return `Entendi. Para ${objective}, eu focaria agora em ${priorities.slice(0, 3).join(", ")}. Se quiser uma explicacao mais detalhada, eu chamo a IA com esse contexto resumido.`;
}

function isDeterministicQuestion(mensagem = "") {
  const text = normalizeText(mensagem);
  return [
    "quantas quest",
    "questoes resolvi",
    "questoes eu fiz",
    "taxa",
    "percentual",
    "aproveitamento",
    "pior materia",
    "materia mais fraca",
    "materias fracas",
  ].some((term) => text.includes(term));
}

function cleanJsonText(text = "") {
  return String(text || "").replace(/```json|```/g, "").trim();
}

async function invokeAI({ task = "chat", prompt = "", perfil = {}, desempenho = {}, responseFormat = "text", maxOutputTokens, cache = false, cacheKey = "", cacheTtlDays = 30, historico = [] }) {
  if (!isSupabaseConfigured) {
    lastAIStatus = { source: "local-fallback", modelName, error: "Supabase nao configurado" };
    return { text: localTutorResponse(prompt, perfil, desempenho), source: "local-fallback", model: modelName };
  }

  if (Date.now() < edgeDisabledUntil) {
    return { text: localTutorResponse(prompt, perfil, desempenho), source: "fallback-edge-cooldown", model: modelName };
  }

  const client = requireSupabase();
  const context = {
    ...buildCompactContext(perfil, desempenho),
    historico: (historico || []).slice(-6).map((item) => ({
      role: item.role || (item.text ? "user" : "model"),
      text: String(item.text || item.content || "").slice(0, 800),
    })),
  };

  let data;
  let error;
  try {
    const response = await client.functions.invoke("ia-aprova", {
      body: { task, prompt, context, responseFormat, maxOutputTokens, cache, cacheKey, cacheTtlDays },
    });
    data = response.data;
    error = response.error;
  } catch (caught) {
    error = caught;
  }

  if (error || data?.error) {
    const message = data?.error || error?.message || "Falha ao consultar IA.";
    if (/failed to fetch|cors|non-2xx|not found|network/i.test(message)) {
      edgeDisabledUntil = Date.now() + 10 * 60 * 1000;
    }
    lastAIStatus = { source: "edge-error", modelName, error: message };
    return { text: localTutorResponse(prompt, perfil, desempenho), source: "fallback-error", model: modelName };
  }

  lastAIStatus = { source: data.source || "edge", modelName: data.model || modelName, error: "" };
  return { text: data.text || "", source: data.source || "edge", model: data.model || modelName };
}

export const aiService = {
  isConfigured: isSupabaseConfigured,
  modelName: "Edge Function + Gemini",
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
    });
    return result.text;
  },

  async enviarMensagem(mensagem, historico = [], perfil = {}, desempenho = {}) {
    if (isDeterministicQuestion(mensagem)) {
      lastAIStatus = { source: "code", modelName, error: "" };
      return localTutorResponse(mensagem, perfil, desempenho);
    }

    const result = await invokeAI({
      task: "chat",
      prompt: mensagem,
      perfil,
      desempenho,
      historico,
      maxOutputTokens: 700,
    });
    return result.text || localTutorResponse(mensagem, perfil, desempenho);
  },

  async gerarRelatorio(perfil, desempenho, tipo = "geral") {
    const context = buildCompactContext(perfil, desempenho);
    if (!context.desempenho.questoesResolvidas) {
      lastAIStatus = { source: "code", modelName, error: "" };
      return "Ainda nao ha questoes resolvidas suficientes para gerar um relatorio real. Resolva algumas questoes para eu calcular taxa, materias fracas e evolucao.";
    }
    const prompt = `Interprete estes numeros ja calculados e gere um relatorio ${tipo}. Nao recalcule nada; apenas explique prioridades e plano de acao.`;
    const result = await invokeAI({ task: "report", prompt, perfil, desempenho, maxOutputTokens: 900 });
    return result.text;
  },

  async gerarPlanoEstudos(perfil, planoBase) {
    const compact = compactProfile({ ...perfil, diagnosticPlan: planoBase });
    const prompt = `Refine o plano calculado em codigo. Mantenha a estrutura e apenas melhore orientacoes, metas e distribuicao textual. Plano base: ${JSON.stringify(planoBase)}`;
    try {
      const result = await invokeAI({
        task: "plan",
        prompt,
        perfil: compact,
        desempenho: {},
        responseFormat: "json",
        maxOutputTokens: 900,
      });
      const parsed = JSON.parse(cleanJsonText(result.text));
      return { ...planoBase, ...parsed, aiGenerated: true, createdAt: new Date().toISOString() };
    } catch {
      lastAIStatus = { source: "plan-code-fallback", modelName, error: "" };
      return { ...planoBase, aiGenerated: false, createdAt: new Date().toISOString() };
    }
  },

  async gerarResumo(assunto, materia, concurso) {
    return this.gerarTexto(`Crie um resumo objetivo de "${assunto}" da materia "${materia}" para ${concurso}. Maximo 220 palavras, em topicos.`, {
      task: "summary",
      maxOutputTokens: 500,
      cache: true,
      cacheKey: `summary:${normalizeText(concurso)}:${normalizeText(materia)}:${normalizeText(assunto)}`,
      cacheTtlDays: 120,
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
    return this.gerarTexto(prompt, { task: "explain_question", maxOutputTokens: 750, cache: Boolean(key), cacheKey: key, cacheTtlDays: 180 });
  },

  async corrigirRedacao(tema, texto, exame = "concurso") {
    const prompt = `Corrija a redacao em JSON. Exame: ${exame}. Tema: ${tema}. Texto: ${texto}`;
    return this.gerarTexto(prompt, { task: "essay", responseFormat: "json", maxOutputTokens: 1000 });
  },

  async gerarFlashcards(assunto, materia, quantidade = 5) {
    const text = await this.gerarTexto(`Gere ${quantidade} flashcards sobre "${assunto}" de "${materia}". JSON: [{"frente":"...","verso":"..."}]`, {
      task: "flashcards",
      responseFormat: "json",
      maxOutputTokens: 650,
      cache: true,
      cacheKey: `flashcards:${normalizeText(materia)}:${normalizeText(assunto)}:${quantidade}`,
      cacheTtlDays: 180,
    });
    return JSON.parse(cleanJsonText(text));
  },

  stream(prompt, onChunk, onDone, perfil = {}, desempenho = {}, historico = []) {
    let cancelled = false;
    this.enviarMensagem(prompt, historico, perfil, desempenho)
      .then((response) => {
        if (cancelled) return;
        onChunk(response);
        onDone?.(response);
      })
      .catch(() => {
        const response = localTutorResponse(prompt, perfil, desempenho);
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
