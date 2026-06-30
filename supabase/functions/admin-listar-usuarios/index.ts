import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { adminErrorResponse, requireAdmin, writeAdminLog } from "../_shared/admin.ts";
import { getAdminClient } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  try {
    const admin = await requireAdmin(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const search = String(body.search || "").trim();
    const limit = Math.min(Math.max(Number(body.limit) || 100, 1), 500);
    const page = Math.max(Number(body.page) || 1, 1);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("profiles")
      .select(
        "id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at,horas_estudadas,questoes_resolvidas,taxa_acertos,sequencia_dias",
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      const pattern = `%${search.replaceAll("%", "\\%").replaceAll("_", "\\_")}%`;
      query = query.or(`email.ilike.${pattern},name.ilike.${pattern}`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    await writeAdminLog(supabase, admin, "admin-listar-usuarios", null, { search, page, limit });

    return jsonResponse({ usuarios: data || [], count: count || 0, page, limit });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
