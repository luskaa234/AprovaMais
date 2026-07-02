import { requireSupabase } from "../lib/supabase";

async function extractFunctionErrorMessage(error, fallback) {
  const response = error?.context;
  if (response && typeof response.json === "function") {
    try {
      const payload = await response.clone().json();
      if (payload?.error) return payload.error;
    } catch {
      // Mantem fallback abaixo.
    }
  }
  return error?.message || fallback;
}

export async function getSignedContentUrl(path, { bucket = "conteudo", expiresIn = 300 } = {}) {
  const client = requireSupabase();
  const cleanPath = String(path || "").trim().replace(/^\/+/, "");
  if (!cleanPath) throw new Error("Arquivo de conteúdo não informado.");

  const { data, error } = await client.functions.invoke("conteudo-url", {
    body: { bucket, path: cleanPath, expiresIn },
  });

  if (error || data?.error || !data?.signedUrl) {
    const fallback = "Não foi possível gerar acesso seguro ao conteúdo.";
    throw new Error(data?.error || (await extractFunctionErrorMessage(error, fallback)));
  }

  return data.signedUrl;
}

export function getContentPath(item = {}) {
  const path = item.storage_path || item.storagePath || item.sourcePath || item.path || "";
  if (path) return String(path).replace(/^\/+/, "");

  const url = String(item.url || "");
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const marker = "/conteudo/";
    const markerIndex = parsed.pathname.indexOf(marker);
    if (markerIndex >= 0) return decodeURIComponent(parsed.pathname.slice(markerIndex + marker.length));
    return decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  } catch {
    return url.replace(/^\/+/, "");
  }
}
