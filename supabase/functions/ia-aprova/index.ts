import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

const GEMINI_API = "https://generativelanguage.googleapis.com/v1beta/models";

const taskLimits: Record<string, number> = {
  chat: 700,
  text: 650,
  report: 900,
  plan: 900,
  summary: 500,
  explain_question: 750,
  essay: 1000,
  flashcards: 650,
};

const systemPrompt = `
Voce e o assistente de estudos do Aprova+.
Responda em portugues do Brasil, com foco em prova, questoes, revisao, lei seca, OAB e concursos de seguranca.
Use apenas o contexto compacto recebido. Nao invente dados de desempenho.
Se for analise, interprete numeros ja calculados; nao recalcule metricas.
Se faltar dado, seja honesto e peça no maximo uma informacao essencial.
Seja direto, pratico e economico: respostas curtas, com proximos passos claros.
`;

function normalizeTask(task: unknown) {
  const value = String(task || "chat").trim().toLowerCase();
  return value.replace(/[^a-z0-9_-]/g, "") || "chat";
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
    ? "Responda APENAS com JSON valido, sem markdown."
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

async function callGemini(fullPrompt: string, maxOutputTokens: number, responseFormat: string) {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  const model = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash";
  if (!apiKey) throw new Error("GEMINI_API_KEY ausente nos secrets.");

  const response = await fetch(`${GEMINI_API}/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: responseFormat === "json" ? 0.2 : 0.35,
        maxOutputTokens,
        ...(responseFormat === "json" ? { responseMimeType: "application/json" } : {}),
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error?.message || `Gemini falhou com status ${response.status}`);
  }

  return String(payload?.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();
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
    const useCache = Boolean(body.cacheKey || body.cache);
    const provider = "gemini";
    const model = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash";
    const maxOutputTokens = Math.min(Number(body.maxOutputTokens) || taskLimits[task] || 650, 1200);
    const fullPrompt = buildPrompt(task, prompt, body.context, responseFormat);
    const promptHash = await sha256(fullPrompt);
    const cacheKey = body.cacheKey ? String(body.cacheKey) : useCache ? `${task}:${promptHash}` : "";

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
          model,
          used_cache: true,
          prompt_chars: fullPrompt.length,
          response_chars: String(cached.response).length,
        });
        return jsonResponse({ text: cached.response, source: "cache", model });
      }
    }

    const text = await callGemini(fullPrompt, maxOutputTokens, responseFormat);

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
        metadata: { responseFormat },
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

    return jsonResponse({ text, source: provider, model });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado na IA.";
    const status = message.toLowerCase().includes("autenticado") ? 401 : message.includes("GEMINI_API_KEY") ? 503 : 400;
    return jsonResponse({ error: message }, status);
  }
});
