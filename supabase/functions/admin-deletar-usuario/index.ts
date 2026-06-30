import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { adminErrorResponse, findTargetProfile, isAdminEmail, requireAdmin, writeAdminLog } from "../_shared/admin.ts";
import { getAdminClient } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const admin = await requireAdmin(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const target = await findTargetProfile(supabase, body);
    const confirmationEmail = String(body.confirmationEmail || body.confirmacaoEmail || "").trim().toLowerCase();

    if (target.id === admin.id) throw new Error("O administrador nao pode deletar a propria conta.");
    if (isAdminEmail(target.email)) throw new Error("Nao e permitido deletar outro administrador.");
    if (!confirmationEmail || confirmationEmail !== String(target.email || "").trim().toLowerCase()) {
      throw new Error("Digite o email do usuario para confirmar a exclusao.");
    }

    const { error: deleteError } = await supabase.auth.admin.deleteUser(target.id);
    if (deleteError) throw new Error(`Falha ao deletar usuario no Auth: ${deleteError.message}`);

    await supabase.from("profiles").delete().eq("id", target.id);
    await writeAdminLog(supabase, admin, "admin-deletar-usuario", target.id, { email: target.email });

    return jsonResponse({ ok: true, deleted_user_id: target.id });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
