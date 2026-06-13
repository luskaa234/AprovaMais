import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

const OPENROUTER_API = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODELS_API = "https://openrouter.ai/api/v1/models";
const OPENROUTER_REFERER = "https://aprovamais.com";
const OPENROUTER_TITLE = "Aprova+";

// Fallback conferido em https://openrouter.ai/api/v1/models em 2026-06-13.
// Em runtime a funcao busca a lista oficial e usa TODOS os modelos com preco zero.
// O OpenRouter aceita no maximo 3 itens no array `models`, entao a funcao percorre
// o pool gratuito completo em lotes de 3.
const OPENROUTER_FREE_MODELS_FALLBACK = [
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
  "google/lyria-3-clip-preview",
  "google/lyria-3-pro-preview",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "liquid/lfm-2.5-1.2b-thinking:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "nex-agi/nex-n2-pro:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "nvidia/nemotron-3.5-content-safety:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "openrouter/free",
  "openrouter/owl-alpha",
  "poolside/laguna-m.1:free",
  "poolside/laguna-xs.2:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
];

const MAX_OPENROUTER_MODELS_PER_REQUEST = 3;
const FREE_MODELS_CACHE_MS = 6 * 60 * 60 * 1000;
let freeModelsCache: { expiresAt: number; models: string[] } | null = null;

type ModelTier = "barato" | "forte";

const taskLimits: Record<string, number> = {
  chat: 700,
  text: 650,
  report: 1500,
  plan: 1500,
  summary: 900,
  explain_question: 750,
  essay: 2000,
  flashcards: 650,
};

// Teto global de saida (segura custo e evita resposta gigante).
const MAX_OUTPUT_TOKENS_CAP = 2048;

const systemPrompt = `
Voce e o Aprovinho, assistente de estudos do Aprova+.
Fale em portugues do Brasil, com tom claro, direto e encorajador.
Ajude apenas no que a plataforma oferece: OAB, concursos de seguranca, estudo geral, questoes, revisao, lei seca, flashcards, redacao, TAF e plano de estudos.
Use o contexto compacto recebido como fonte principal. Nao invente desempenho, metas, notas, atividades ou historico.
Se o contexto nao tiver dados suficientes, diga isso com honestidade e peca no maximo uma informacao essencial.
Para duvidas de conteudo, explique em passos curtos, com foco em prova e exemplos quando ajudar.
Para questoes, nunca chute gabarito sem alternativas/contexto. Explique a logica e a regra cobrada.
Para lei seca, cite artigo apenas quando ele estiver no contexto ou no pedido do aluno.
Nao prometa aprovacao, nao de aconselhamento juridico profissional e nao incentive burlar regras de prova.
Seja economico: responda com proximos passos claros e sem encher texto.
`;

function normalizeTask(task: unknown) {
  const value = String(task || "chat").trim().toLowerCase();
  return value.replace(/[^a-z0-9_-]/g, "") || "chat";
}

function normalizeTier(tier: unknown, task: string): ModelTier {
  const value = String(tier || "").trim().toLowerCase();
  if (value === "barato" || value === "forte") return value;
  if (["flashcards", "summary", "text"].includes(task)) return "barato";
  return "forte";
}

function stableHash(text = "") {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rotateModels(models: string[], seed: string) {
  if (!models.length) return [];
  const start = stableHash(seed) % models.length;
  return [...models.slice(start), ...models.slice(0, start)];
}

function isZeroPrice(value: unknown) {
  return Number(value || 0) === 0;
}

async function getOpenRouterFreeModels() {
  if (freeModelsCache && freeModelsCache.expiresAt > Date.now()) return freeModelsCache.models;

  try {
    const response = await fetch(OPENROUTER_MODELS_API);
    if (!response.ok) throw new Error(`OpenRouter models falhou com status ${response.status}`);
    const payload = await response.json();
    const models = (Array.isArray(payload?.data) ? payload.data : [])
      .filter((model: Record<string, unknown>) => {
        const pricing = model.pricing as Record<string, unknown> | undefined;
        return model.id && isZeroPrice(pricing?.prompt) && isZeroPrice(pricing?.completion);
      })
      .map((model: Record<string, unknown>) => String(model.id))
      .sort((a: string, b: string) => a.localeCompare(b));

    if (models.length) {
      freeModelsCache = { models, expiresAt: Date.now() + FREE_MODELS_CACHE_MS };
      return models;
    }
  } catch (error) {
    console.warn("[ia-aprova] Nao consegui atualizar a lista oficial de modelos gratuitos", {
      message: error instanceof Error ? error.message : String(error),
    });
  }

  return OPENROUTER_FREE_MODELS_FALLBACK;
}

async function modelBatchesForRequest(tier: ModelTier, seed: string) {
  const freeModels = await getOpenRouterFreeModels();
  const ordered = rotateModels(freeModels, `${tier}:${seed}`);
  const batches: string[][] = [];
  for (let index = 0; index < ordered.length; index += MAX_OPENROUTER_MODELS_PER_REQUEST) {
    batches.push(ordered.slice(index, index + MAX_OPENROUTER_MODELS_PER_REQUEST));
  }
  return { batches, freeModels };
}

async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function compactJson(value: unknown) {
  return JSON.stringify(value || {}, null, 0).slice(0, 4500);
}

function buildPrompt(task: string, prompt: string, context: unknown, responseFormat = "text") {
  const formatInstruction = responseFormat === "json"
    ? "Responda APENAS com JSON valido, sem markdown, sem cercas ```, sem texto antes ou depois."
    : "Responda em texto curto, claro e acionavel.";

  return [
    systemPrompt.trim(),
    "",
    `TAREFA: ${task}`,
    `FORMATO: ${formatInstruction}`,
    "",
    "CONTEXTO COMPACTO DO ALUNO E DOS DADOS JA CALCULADOS:",
    compactJson(context),
    "",
    "PEDIDO:",
    String(prompt || "").slice(0, 6000),
  ].join("\n");
}

function getOpenRouterText(payload: Record<string, unknown>) {
  const choice = Array.isArray(payload?.choices) ? payload.choices[0] as Record<string, unknown> | undefined : undefined;
  const message = choice?.message as Record<string, unknown> | undefined;
  return String(message?.content || "").trim();
}

// Extrai JSON de respostas "sujas" de modelos free:
// remove cercas ```json ... ``` e qualquer texto antes/depois do objeto/array.
function extractJson(raw: string): string {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const candidates = [s.indexOf("{"), s.indexOf("[")].filter((i) => i >= 0);
  if (candidates.length) {
    const start = Math.min(...candidates);
    const end = Math.max(s.lastIndexOf("}"), s.lastIndexOf("]"));
    if (end > start) s = s.slice(start, end + 1);
  }
  return s.trim();
}

async function callOpenRouter(fullPrompt: string, maxOutputTokens: number, responseFormat: string, tier: ModelTier) {
  const apiKey = Deno.env.get("OPENROUTER_API_KEY");
  if (!apiKey) throw new Error("OPENROUTER_API_KEY ausente nos secrets.");
  const { batches: modelBatches, freeModels } = await modelBatchesForRequest(tier, fullPrompt);

  let lastError = "";
  const triedModels: string[] = [];

  for (const models of modelBatches) {
    triedModels.push(...models);
    const response = await fetch(OPENROUTER_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": Deno.env.get("OPENROUTER_REFERER") || OPENROUTER_REFERER,
        // Nome de header correto do OpenRouter e "X-Title".
        "X-Title": Deno.env.get("OPENROUTER_TITLE") || OPENROUTER_TITLE,
      },
      body: JSON.stringify({
        models,
        messages: [{ role: "user", content: fullPrompt }],
        temperature: responseFormat === "json" ? 0.2 : 0.35,
        max_tokens: maxOutputTokens,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      lastError = payload?.error?.message || `OpenRouter falhou com status ${response.status}`;
      console.warn("[ia-aprova] Lote gratuito falhou", { models, message: lastError });
      continue;
    }

    let text = getOpenRouterText(payload);
    if (!text) {
      lastError = "OpenRouter retornou resposta vazia.";
      console.warn("[ia-aprova] Lote gratuito sem texto", { models });
      continue;
    }

    // Quando o cliente pediu JSON, limpamos e validamos ANTES de devolver/cachear,
    // pra nunca gravar nem entregar JSON quebrado ao frontend.
    if (responseFormat === "json") {
      text = extractJson(text);
      try {
        JSON.parse(text);
      } catch {
        lastError = "Modelo retornou JSON invalido.";
        console.warn("[ia-aprova] Lote gratuito retornou JSON invalido", { models });
        continue;
      }
    }

    return {
      text,
      model: String(payload?.model || models[0]),
      models,
      triedModels,
      freePoolSize: freeModels.length,
      freeModels,
    };
  }

  throw new Error(lastError || "Todos os modelos gratuitos do OpenRouter falharam.");
}

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  try {
    const user = await getAuthUser(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const task = normalizeTask(body.task);
    const prompt = String(body.prompt || "");
    const responseFormat = body.responseFormat === "json" ? "json" : "text";
    const tier = normalizeTier(body.tier, task);
    const useCache = Boolean(body.cacheKey || body.cache);
    const provider = "openrouter";
    const maxOutputTokens = Math.min(Number(body.maxOutputTokens) || taskLimits[task] || 650, MAX_OUTPUT_TOKENS_CAP);
    const fullPrompt = buildPrompt(task, prompt, body.context, responseFormat);
    const promptHash = await sha256(`${task}:${tier}:${fullPrompt}`);
    const cacheKey = body.cacheKey ? `${task}:${tier}:${String(body.cacheKey)}:${promptHash}` : useCache ? `${task}:${tier}:${promptHash}` : "";

    if (cacheKey) {
      const { data: cached } = await supabase
        .from("ai_cache")
        .select("response,expires_at")
        .eq("cache_key", cacheKey)
        .maybeSingle();

      if (cached?.response && (!cached.expires_at || new Date(cached.expires_at).getTime() > Date.now())) {
        await supabase.from("ai_usage_logs").insert({
          user_id: user.id,
          task,
          provider,
          model: "cache",
          used_cache: true,
          prompt_chars: fullPrompt.length,
          response_chars: String(cached.response).length,
        });
        const freeModels = await getOpenRouterFreeModels();
        return jsonResponse({ text: cached.response, source: "cache", model: "cache", models: freeModels, tier, freePoolSize: freeModels.length });
      }
    }

    const completion = await callOpenRouter(fullPrompt, maxOutputTokens, responseFormat, tier);
    const { text, model, models, triedModels, freePoolSize, freeModels } = completion;

    if (cacheKey && text) {
      const ttlDays = Math.min(Math.max(Number(body.cacheTtlDays) || 30, 1), 365);
      const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000).toISOString();
      await supabase.from("ai_cache").upsert({
        cache_key: cacheKey,
        task,
        provider,
        model,
        prompt_hash: promptHash,
        response: text,
        metadata: { responseFormat, tier, models, triedModels, freePoolSize, freeModels },
        expires_at: expiresAt,
      }, { onConflict: "cache_key" });
    }

    await supabase.from("ai_usage_logs").insert({
      user_id: user.id,
      task,
      provider,
      model,
      used_cache: false,
      prompt_chars: fullPrompt.length,
      response_chars: text.length,
    });

    return jsonResponse({ text, source: provider, model, models, triedModels, tier, freePoolSize, freeModels });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado na IA.";
    const lower = message.toLowerCase();
    const isAuthError = lower.includes("autenticado");
    const isConfigError = message.includes("OPENROUTER_API_KEY");
    const isJsonError = lower.includes("json invalido");
    console.error("[ia-aprova] Falha ao chamar IA", { message });
    const publicMessage = isAuthError
      ? "Usuario nao autenticado."
      : isConfigError
        ? "IA temporariamente indisponivel. Configure OPENROUTER_API_KEY nos secrets."
        : isJsonError
          ? "Nao consegui formatar a resposta agora. Tente novamente."
          : "Nao consegui gerar a resposta agora. Tente novamente em instantes.";
    const status = isAuthError ? 401 : isConfigError ? 503 : 502;
    return jsonResponse({ error: publicMessage }, status);
  }
});
