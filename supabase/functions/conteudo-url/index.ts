import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

function sanitizePath(value: unknown) {
  const path = String(value || "").trim().replace(/^\/+/, "");
  if (!path || path.includes("..") || /[\u0000-\u001f]/.test(path)) {
    throw new Error("Caminho de arquivo invalido.");
  }
  return path;
}

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const user = await getAuthUser(req);
    const body = await req.json().catch(() => ({}));
    const path = sanitizePath(body.path);
    const bucket = String(body.bucket || "conteudo").trim() || "conteudo";
    const expiresIn = Math.max(60, Math.min(Number(body.expiresIn || 300), 900));

    if (bucket !== "conteudo") {
      return jsonResponse({ error: "Bucket nao permitido." }, 400);
    }

    const supabase = getAdminClient();
    const { data: allowed, error: accessError } = await supabase.rpc("has_active_access", { uid: user.id });
    if (accessError) throw accessError;
    if (!allowed) return jsonResponse({ error: "Acesso premium necessario." }, 403);

    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
    if (error || !data?.signedUrl) throw error || new Error("Nao foi possivel gerar URL segura.");

    console.info("[conteudo-url] signed-url", { userId: user.id, bucket, path, expiresIn });
    return jsonResponse({ signedUrl: data.signedUrl, expiresIn });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar URL segura.";
    const status = /autenticado/i.test(message) ? 401 : /premium|acesso/i.test(message) ? 403 : 400;
    console.warn("[conteudo-url] recusado", message);
    return jsonResponse({ error: message }, status);
  }
});
