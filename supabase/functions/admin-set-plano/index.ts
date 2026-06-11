import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { adminErrorResponse, findTargetProfile, requireAdmin, writeAdminLog } from "../_shared/admin.ts";
import { getAdminClient } from "../_shared/supabase.ts";

const allowedPlans = new Set(["gratuito", "essencial", "pro"]);

function nullableDate(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) throw new Error("Data de expiracao invalida.");
  return date.toISOString();
}

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  try {
    const admin = await requireAdmin(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const target = await findTargetProfile(supabase, body);

    const statusPlano = String(body.status_plano || body.statusPlano || target.status_plano || "manual").trim();
    const vitalicio = Boolean(body.vitalicio);
    const requestedPlan = String(body.plano || target.plano || "gratuito").trim();
    const plano = vitalicio ? "pro" : allowedPlans.has(requestedPlan) ? requestedPlan : "gratuito";
    const planoExpiraEm = vitalicio ? null : nullableDate(body.plano_expira_em ?? body.planoExpiraEm);
    const planoAtivo = typeof body.plano_ativo === "boolean" ? body.plano_ativo : typeof body.planoAtivo === "boolean" ? body.planoAtivo : true;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        plano,
        status_plano: statusPlano,
        plano_ativo: planoAtivo,
        plano_expira_em: planoExpiraEm,
        em_teste: Boolean(body.em_teste ?? body.emTeste ?? false),
        vitalicio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", target.id)
      .select("id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at")
      .single();

    if (error) throw error;
    await writeAdminLog(supabase, admin, "admin-set-plano", target.id, {
      email: target.email,
      plano,
      status_plano: statusPlano,
      plano_ativo: planoAtivo,
      plano_expira_em: planoExpiraEm,
      vitalicio,
    });

    return jsonResponse({ usuario: data });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
