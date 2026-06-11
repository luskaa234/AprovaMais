import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { mercadoPagoRequest } from "../_shared/mercadopago.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const user = await getAuthUser(req);
    const supabase = getAdminClient();

    const { data: assinatura, error } = await supabase
      .from("assinaturas")
      .select("*")
      .eq("user_id", user.id)
      .in("status", ["ativa", "pendente"])
      .order("criado_em", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!assinatura) return jsonResponse({ error: "Nenhuma assinatura ativa encontrada." }, 404);

    if (assinatura.mp_subscription_id) {
      await mercadoPagoRequest(`/preapproval/${assinatura.mp_subscription_id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "cancelled" }),
      });
    }

    await supabase
      .from("assinaturas")
      .update({ status: "cancelada", atualizado_em: new Date().toISOString() })
      .eq("id", assinatura.id);

    await supabase
      .from("profiles")
      .update({
        status_plano: "cancelado",
        em_teste: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return jsonResponse({
      ok: true,
      acesso_ate: assinatura.fim,
      message: "Assinatura cancelada. O acesso permanece ate o fim do periodo ja confirmado.",
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Falha ao cancelar assinatura." }, 400);
  }
});
