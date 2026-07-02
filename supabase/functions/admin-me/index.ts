import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { isAdminEmail } from "../_shared/admin.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const user = await getAuthUser(req);
    const email = String(user.email || "").trim().toLowerCase();
    const isAdmin = isAdminEmail(email);
    const supabase = getAdminClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("role,email")
      .eq("id", user.id)
      .maybeSingle();

    return jsonResponse({
      isAdmin,
      role: isAdmin ? "admin" : profile?.role || "student",
      email,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao verificar administrador.";
    const status = /autenticado/i.test(message) ? 401 : 400;
    return jsonResponse({ error: message, isAdmin: false }, status);
  }
});
