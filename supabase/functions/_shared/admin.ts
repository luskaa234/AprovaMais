import { getAuthUser } from "./supabase.ts";

function normalizeEmail(email?: string | null) {
  return String(email || "").trim().toLowerCase();
}

export function getAdminEmails() {
  return String(Deno.env.get("ADMIN_EMAILS") || "")
    .split(/[,\n;]/)
    .map(normalizeEmail)
    .filter(Boolean);
}

export async function requireAdmin(req: Request) {
  const user = await getAuthUser(req);
  const email = normalizeEmail(user.email);
  const admins = getAdminEmails();

  if (!email || !admins.includes(email)) {
    const error = new Error("Acesso restrito ao administrador.");
    error.name = "ForbiddenError";
    throw error;
  }

  return { id: user.id, email };
}

export function adminErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Erro inesperado.";
  const status = error instanceof Error && error.name === "ForbiddenError" ? 403 : message.includes("autenticado") ? 401 : 400;
  return { status, message };
}

export async function writeAdminLog(
  supabase: any,
  admin: { id: string; email: string },
  action: string,
  targetUserId?: string | null,
  payload: Record<string, unknown> = {}
) {
  await supabase.from("admin_logs").insert({
    admin_user_id: admin.id,
    admin_email: admin.email,
    action,
    target_user_id: targetUserId || null,
    payload,
  });
}

export async function findTargetProfile(supabase: any, body: Record<string, unknown>) {
  const userId = typeof body.userId === "string" ? body.userId.trim() : "";
  const email = normalizeEmail(typeof body.email === "string" ? body.email : "");

  let query = supabase
    .from("profiles")
    .select("id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at")
    .limit(1)
    .maybeSingle();

  if (userId) {
    query = supabase
      .from("profiles")
      .select("id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at")
      .eq("id", userId)
      .maybeSingle();
  } else if (email) {
    query = supabase
      .from("profiles")
      .select("id,email,name,role,plano,status_plano,plano_ativo,plano_expira_em,em_teste,vitalicio,created_at,updated_at")
      .eq("email", email)
      .maybeSingle();
  } else {
    throw new Error("Informe userId ou email.");
  }

  const { data, error } = await query;
  if (error) throw error;
  if (!data) throw new Error("Usuario nao encontrado.");
  return data;
}
