import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { addDays, assertProductionMercadoPagoToken, mercadoPagoRequest } from "../_shared/mercadopago.ts";
import { getAdminClient, getAuthUser } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;
  if (req.method !== "POST") return jsonResponse({ error: "Metodo nao permitido." }, 405);

  try {
    const user = await getAuthUser(req);
    const body = await req.json().catch(() => ({}));
    const planoId = body.plano_id || "essencial";
    const cardToken = body.card_token;
    if (!cardToken) return jsonResponse({ error: "Token do cartao ausente." }, 400);
    assertProductionMercadoPagoToken();

    const supabase = getAdminClient();
    const { data: plan, error: planError } = await supabase
      .from("planos")
      .select("*")
      .eq("id", planoId)
      .eq("ativo", true)
      .single();
    if (planError || !plan) return jsonResponse({ error: "Plano invalido ou inativo." }, 400);

    const { data: profile } = await supabase.from("profiles").select("email,name").eq("id", user.id).maybeSingle();
    const frequencyType = plan.tipo === "anual" ? "months" : "months";
    const frequency = plan.tipo === "anual" ? 12 : 1;

    const preapproval = await mercadoPagoRequest("/preapproval", {
      method: "POST",
      headers: { "X-Idempotency-Key": crypto.randomUUID() },
      body: JSON.stringify({
        reason: plan.nome,
        external_reference: JSON.stringify({ user_id: user.id, plano_id: plan.id, metodo: "cartao_recorrente" }),
        payer_email: profile?.email || user.email,
        card_token_id: cardToken,
        status: "authorized",
        back_url: Deno.env.get("APP_URL") || undefined,
        auto_recurring: {
          frequency,
          frequency_type: frequencyType,
          transaction_amount: plan.preco_centavos / 100,
          currency_id: "BRL",
          start_date: new Date(Date.now() + 60_000).toISOString(),
        },
      }),
    });

    const expiresAt = addDays(new Date(), plan.dias_acesso).toISOString();
    const isAuthorized = preapproval.status === "authorized";
    const { data: assinatura, error: assinaturaError } = await supabase
      .from("assinaturas")
      .insert({
        user_id: user.id,
        plano_id: plan.id,
        status: isAuthorized ? "ativa" : "pendente",
        metodo: "cartao_recorrente",
        inicio: new Date().toISOString(),
        fim: expiresAt,
        mp_subscription_id: String(preapproval.id),
      })
      .select("*")
      .single();
    if (assinaturaError) throw assinaturaError;

    if (isAuthorized) {
      await supabase
        .from("profiles")
        .update({
          plano: plan.id,
          status_plano: "ativo",
          plano_ativo: true,
          plano_expira_em: expiresAt,
          em_teste: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
    }

    return jsonResponse({
      assinatura_id: assinatura.id,
      mp_subscription_id: String(preapproval.id),
      status: preapproval.status,
      acesso_liberado: isAuthorized,
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Falha ao criar assinatura." }, 400);
  }
});
