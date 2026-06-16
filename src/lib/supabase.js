import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const configuredAuthRedirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL || import.meta.env.VITE_SITE_URL || import.meta.env.VITE_APP_URL;

function normalizeSupabaseUrl(url) {
  if (!url) return "";
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

const normalizedSupabaseUrl = normalizeSupabaseUrl(supabaseUrl);

function normalizeAuthRedirectUrl(url, path) {
  if (!url) return "";
  try {
    const withProtocol = String(url).startsWith("http") ? url : `https://${url}`;
    const parsed = new URL(withProtocol);
    const hasExplicitPath = parsed.pathname && parsed.pathname !== "/";

    parsed.search = "";
    parsed.hash = "";

    if (hasExplicitPath) return parsed.toString();
    return `${parsed.origin}${path}`;
  } catch {
    return "";
  }
}

export const isSupabaseConfigured = Boolean(normalizedSupabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(normalizedSupabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, flowType: "pkce" },
    })
  : null;

export function getAuthRedirectUrl(path = "/auth/callback") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const configuredUrl = normalizeAuthRedirectUrl(configuredAuthRedirectUrl, normalizedPath);
  if (configuredUrl) return configuredUrl;

  if (typeof window === "undefined") return normalizedPath;
  return `${window.location.origin}${normalizedPath}`;
}

export async function getCurrentUserId() {
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id || null;
}

export function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase não configurado. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}
