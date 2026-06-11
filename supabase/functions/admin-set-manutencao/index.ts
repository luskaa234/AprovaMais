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
    const enabled = Boolean(body.enabled);
    const message = String(body.message || "").trim().slice(0, 500);
    const value = { enabled, message };

    const { data, error } = await supabase
      .from("app_config")
      .upsert({
        key: "maintenance_mode",
        value,
        updated_at: new Date().toISOString(),
        updated_by: admin.id,
      })
      .select("key,value,updated_at,updated_by")
      .single();

    if (error) throw error;
    await writeAdminLog(supabase, admin, "admin-set-manutencao", null, value);

    return jsonResponse({ config: data });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
