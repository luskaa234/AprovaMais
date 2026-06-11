import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { adminErrorResponse, findTargetProfile, requireAdmin, writeAdminLog } from "../_shared/admin.ts";
import { getAdminClient } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  try {
    const admin = await requireAdmin(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const target = await findTargetProfile(supabase, body);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        plano: "vitalicio",
        status_plano: "vitalicio",
        plano_ativo: true,
        plano_expira_em: null,
        em_teste: false,
        vitalicio: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", target.id)
      .select("id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at")
      .single();

    if (error) throw error;
    await writeAdminLog(supabase, admin, "admin-set-vitalicio", target.id, { email: target.email });

    return jsonResponse({ usuario: data });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
