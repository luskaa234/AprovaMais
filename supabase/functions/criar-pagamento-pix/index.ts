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
        metodo: "pix",
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
        description: `${plan.nome} - VemAprovar`,
        payment_method_id: "pix",
        payer: {
          email: profile?.email || user.email,
          first_name: profile?.name || user.user_metadata?.name || "Aluno",
        },
        external_reference: JSON.stringify({
          user_id: user.id,
          plano_id: plan.id,
          assinatura_id: assinatura.id,
          metodo: "pix",
        }),
        metadata: {
          user_id: user.id,
          plano_id: plan.id,
          assinatura_id: assinatura.id,
        },
        notification_url: Deno.env.get("MP_WEBHOOK_URL") || undefined,
      }),
    });

    await supabase
      .from("assinaturas")
      .update({ mp_payment_id: String(payment.id), atualizado_em: new Date().toISOString() })
      .eq("id", assinatura.id);

    await supabase.from("pagamentos").insert({
      user_id: user.id,
      assinatura_id: assinatura.id,
      valor_centavos: plan.preco_centavos,
      metodo: "pix",
      status: "pendente",
      mp_payment_id: String(payment.id),
      raw: payment,
    });

    const transactionData = payment?.point_of_interaction?.transaction_data || {};
    return jsonResponse({
      assinatura_id: assinatura.id,
      mp_payment_id: String(payment.id),
      status: payment.status,
      qr_code_base64: transactionData.qr_code_base64,
      qr_code: transactionData.qr_code,
      ticket_url: transactionData.ticket_url,
      live_mode: Boolean(payment.live_mode),
      date_of_expiration: payment.date_of_expiration,
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Falha ao criar Pix." }, 400);
  }
});
