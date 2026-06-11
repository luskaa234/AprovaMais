import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { adminErrorResponse, requireAdmin, writeAdminLog } from "../_shared/admin.ts";
import { getAdminClient } from "../_shared/supabase.ts";

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const admin = await requireAdmin(req);
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const email = normalizeEmail(body.email);
    const name = String(body.name || body.nome || "").trim();
    const vitalicio = Boolean(body.vitalicio);

    if (!email || !email.includes("@")) throw new Error("Informe um email valido.");

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id,email")
      .eq("email", email)
      .maybeSingle();
    if (existingProfile?.id) throw new Error("Ja existe um usuario com este email.");

    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "invite",
      email,
      options: {
        data: { name: name || email.split("@")[0] },
      },
    });
    if (linkError) throw new Error(`Falha ao criar convite: ${linkError.message}`);

    const user = linkData?.user;
    if (!user?.id) throw new Error("Convite criado sem usuario retornado pelo Supabase.");

    const expiresAt = vitalicio ? null : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email,
        name: name || email.split("@")[0],
        role: "student",
        plano: vitalicio ? "pro" : "gratuito",
        status_plano: vitalicio ? "vitalicio" : "trial",
        plano_ativo: true,
        plano_expira_em: expiresAt,
        em_teste: !vitalicio,
        vitalicio,
        onboarding_completo: false,
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" })
      .select("id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at")
      .single();

    if (profileError) throw new Error(`Usuario criado, mas profile falhou: ${profileError.message}`);

    await writeAdminLog(supabase, admin, "admin-criar-usuario", user.id, { email, vitalicio });

    return jsonResponse({
      usuario: profile,
      invite_url: linkData?.properties?.action_link || "",
      message: "Usuario criado. Envie o link de convite para ele definir a propria senha.",
    });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
