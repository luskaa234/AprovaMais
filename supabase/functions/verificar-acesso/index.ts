import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const user = await getAuthUser(req);
    const supabase = getAdminClient();
    await supabase.rpc("expirar_acessos_vencidos");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("plano, status_plano, plano_ativo, plano_expira_em, em_teste")
      .eq("id", user.id)
      .single();
    if (error) throw error;

    const active = Boolean(profile?.plano_ativo && (!profile.plano_expira_em || new Date(profile.plano_expira_em) > new Date()));
    return jsonResponse({ ativo: active, ...profile });
  } catch (error) {
    return jsonResponse({ error: error.message || "Falha ao verificar acesso." }, 400);
  }
});
