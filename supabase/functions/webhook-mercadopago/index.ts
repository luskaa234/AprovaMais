import { jsonResponse } from "../_shared/cors.ts";
import { addDays, mercadoPagoRequest, normalizeStatus, parseReference } from "../_shared/mercadopago.ts";
import { getAdminClient } from "../_shared/supabase.ts";

function parseSignatureHeader(signatureHeader: string | null) {
  return String(signatureHeader || "")
    .split(",")
    .map((part) => part.trim().split("="))
    .reduce<Record<string, string>>((acc, [key, value]) => {
      if (key && value) acc[key] = value;
      return acc;
    }, {});
}

async function hmacSha256Hex(secret: string, message: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqualHex(a: string, b: string) {
  if (!a || !b || a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

async function validateMercadoPagoSignature(req: Request, url: URL, body: Record<string, unknown>) {
  const secret = Deno.env.get("MP_WEBHOOK_SECRET");
  if (!secret) {
    console.error("MP_WEBHOOK_SECRET ausente. Webhook recusado.");
    return false;
  }

  const signature = parseSignatureHeader(req.headers.get("x-signature"));
  const requestId = req.headers.get("x-request-id");
  const data = body.data && typeof body.data === "object" ? body.data as Record<string, unknown> : {};
  const dataId = String(url.searchParams.get("data.id") || url.searchParams.get("id") || data.id || body.id || "").toLowerCase();
  const manifestParts = [
    dataId ? `id:${dataId}` : "",
    requestId ? `request-id:${requestId}` : "",
    signature.ts ? `ts:${signature.ts}` : "",
  ].filter(Boolean);

  if (!signature.v1 || !manifestParts.length) return false;

  const manifest = `${manifestParts.join(";")};`;
  const expected = await hmacSha256Hex(secret, manifest);
  return timingSafeEqualHex(expected, signature.v1);
}

async function activateAccess(supabase: ReturnType<typeof getAdminClient>, userId: string, planId: string, assinaturaId?: string) {
  const { data: plan, error } = await supabase.from("planos").select("*").eq("id", planId).single();
  if (error || !plan) throw new Error("Plano do pagamento nao encontrado.");

  const expiresAt = addDays(new Date(), plan.dias_acesso).toISOString();
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
    .eq("id", userId);

  if (assinaturaId) {
    await supabase
      .from("assinaturas")
      .update({ status: "ativa", fim: expiresAt, atualizado_em: new Date().toISOString() })
      .eq("id", assinaturaId);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Metodo nao permitido", { status: 405 });

  try {
    const url = new URL(req.url);
    const body = await req.json().catch(() => ({}));
    const validSignature = await validateMercadoPagoSignature(req, url, body);
    if (!validSignature) return jsonResponse({ error: "Assinatura do webhook invalida." }, 401);

    const topic = body.type || body.topic || url.searchParams.get("topic");
    const id = body?.data?.id || body.id || url.searchParams.get("id");

    if (!id || !String(topic || "").includes("payment")) {
      return new Response("Evento ignorado", { status: 200 });
    }

    const supabase = getAdminClient();
    const payment = await mercadoPagoRequest(`/v1/payments/${id}`);
    const reference = parseReference(payment.external_reference);
    const metadata = payment.metadata || {};
    const userId = metadata.user_id || reference.user_id;
    const planId = metadata.plano_id || reference.plano_id;
    const assinaturaId = metadata.assinatura_id || reference.assinatura_id;

    if (!userId || !planId) return new Response("Pagamento sem referencia interna", { status: 200 });

    const normalized = normalizeStatus(payment.status);
    const dbStatus = normalized === "aprovado" ? "aprovado" : normalized === "recusado" ? "recusado" : "pendente";

    const { data: existingPayment } = await supabase
      .from("pagamentos")
      .select("id, assinatura_id")
      .eq("mp_payment_id", String(payment.id))
      .maybeSingle();

    if (existingPayment) {
      await supabase
        .from("pagamentos")
        .update({ status: dbStatus, raw: payment, data: new Date().toISOString() })
        .eq("id", existingPayment.id);
    } else {
      const { data: plan } = await supabase.from("planos").select("preco_centavos").eq("id", planId).single();
      await supabase.from("pagamentos").insert({
        user_id: userId,
        assinatura_id: assinaturaId || null,
        valor_centavos: plan?.preco_centavos || Math.round(Number(payment.transaction_amount || 0) * 100),
        metodo: payment.payment_method_id === "pix" ? "pix" : "cartao_debito",
        status: dbStatus,
        mp_payment_id: String(payment.id),
        raw: payment,
      });
    }

    if (assinaturaId) {
      await supabase
        .from("assinaturas")
        .update({
          status: dbStatus === "aprovado" ? "ativa" : dbStatus === "recusado" ? "cancelada" : "pendente",
          mp_payment_id: String(payment.id),
          atualizado_em: new Date().toISOString(),
        })
        .eq("id", assinaturaId);
    }

    if (dbStatus === "aprovado") {
      await activateAccess(supabase, userId, planId, assinaturaId);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("ok", { status: 200 });
  }
});
