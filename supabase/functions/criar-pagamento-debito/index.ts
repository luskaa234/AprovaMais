import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { addDays, assertProductionMercadoPagoToken, mercadoPagoRequest, normalizeStatus } from "../_shared/mercadopago.ts";
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
    const expiresAt = addDays(new Date(), plan.dias_acesso).toISOString();
    const { data: assinatura, error: assinaturaError } = await supabase
      .from("assinaturas")
      .insert({
        user_id: user.id,
        plano_id: plan.id,
        status: "pendente",
        metodo: "debito",
        inicio: new Date().toISOString(),
        fim: expiresAt,
      })
      .select("*")
      .single();
    if (assinaturaError) throw assinaturaError;

    const payment = await mercadoPagoRequest("/v1/payments", {
      method: "POST",
      headers: { "X-Idempotency-Key": crypto.randomUUID() },
      body: JSON.stringify({
        transaction_amount: plan.preco_centavos / 100,
        token: cardToken,
        description: `${plan.nome} - Aprova+`,
        installments: 1,
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuer_id,
        payer: {
          email: profile?.email || user.email,
          identification: body.identification,
        },
        external_reference: JSON.stringify({
          user_id: user.id,
          plano_id: plan.id,
          assinatura_id: assinatura.id,
          metodo: "debito",
        }),
        metadata: {
          user_id: user.id,
          plano_id: plan.id,
          assinatura_id: assinatura.id,
        },
        notification_url: Deno.env.get("MP_WEBHOOK_URL") || undefined,
      }),
    });

    const dbStatus = normalizeStatus(payment.status);

    await supabase
      .from("assinaturas")
      .update({
        mp_payment_id: String(payment.id),
        status: dbStatus === "aprovado" ? "ativa" : dbStatus === "recusado" ? "cancelada" : "pendente",
        atualizado_em: new Date().toISOString(),
      })
      .eq("id", assinatura.id);

    await supabase.from("pagamentos").insert({
      user_id: user.id,
      assinatura_id: assinatura.id,
      valor_centavos: plan.preco_centavos,
      metodo: "cartao_debito",
      status: dbStatus,
      mp_payment_id: String(payment.id),
      raw: payment,
    });

    if (dbStatus === "aprovado") {
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
      mp_payment_id: String(payment.id),
      status: payment.status,
      acesso_liberado: dbStatus === "aprovado",
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Falha ao criar pagamento." }, 400);
  }
});
