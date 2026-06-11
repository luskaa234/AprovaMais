import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { adminErrorResponse, findTargetProfile, requireAdmin, supabaseErrorMessage, writeAdminLog } from "../_shared/admin.ts";
import { getAdminClient } from "../_shared/supabase.ts";

const selectProfile = "id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at";
const farFutureExpiration = "9999-12-31T23:59:59.000Z";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  try {
    const admin = await requireAdmin(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const target = await findTargetProfile(supabase, body);

    const payload = {
      plano: "pro",
      status_plano: "vitalicio",
      plano_ativo: true,
      plano_expira_em: null,
      em_teste: false,
      vitalicio: true,
      updated_at: new Date().toISOString(),
    };

    let { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", target.id)
      .select(selectProfile)
      .single();

    if (error && /null|not-null|violates|constraint/i.test(supabaseErrorMessage(error))) {
      const retry = await supabase
        .from("profiles")
        .update({ ...payload, plano_expira_em: farFutureExpiration })
        .eq("id", target.id)
        .select(selectProfile)
        .single();
      data = retry.data;
      error = retry.error;
    }

    if (error) throw new Error(`Falha ao tornar vitalicio: ${supabaseErrorMessage(error)}`);
    await writeAdminLog(supabase, admin, "admin-set-vitalicio", target.id, { email: target.email, plano_expira_em: data?.plano_expira_em });

    return jsonResponse({ usuario: data });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
