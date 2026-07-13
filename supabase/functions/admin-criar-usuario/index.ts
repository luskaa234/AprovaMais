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
    const password = String(body.password || body.senha || "");
    const name = String(body.name || body.nome || "").trim() || email.split("@")[0] || "Aluno";
    const vitalicio = Boolean(body.vitalicio);

    if (!email || !email.includes("@")) throw new Error("Informe um email valido.");
    if (password.trim().length < 6) throw new Error("Informe uma senha com pelo menos 6 caracteres.");

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id,email")
      .eq("email", email)
      .maybeSingle();
    if (existingProfile?.id) throw new Error("Ja existe um usuario com este email.");

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });
    if (authError) throw new Error(`Falha ao criar usuario: ${authError.message}`);

    const user = authData?.user;
    if (!user?.id) throw new Error("Usuario criado sem retorno do Supabase.");

    const expiresAt = vitalicio ? null : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email,
        name,
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
      login: { email },
      message: "Usuario criado. Envie apenas o login informado para acesso.",
    });
  } catch (error) {
    const { status, message } = adminErrorResponse(error);
    return jsonResponse({ error: message }, status);
  }
});
