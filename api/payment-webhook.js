/* global process */

async function updateProfile({ userId, email, plan }) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey || !plan) return;

  const normalized = new URL(supabaseUrl).origin;
  const filter = userId ? `id=eq.${encodeURIComponent(userId)}` : `email=eq.${encodeURIComponent(email || "")}`;
  if (!userId && !email) return;

  await fetch(`${normalized}/rest/v1/profiles?${filter}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      plano: plan,
      status_plano: "ativo",
      updated_at: new Date().toISOString(),
    }),
  });
}

function parseExternalReference(reference) {
  try {
    return JSON.parse(reference || "{}");
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Metodo nao permitido");

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return res.status(200).send("MP_ACCESS_TOKEN ausente");

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const paymentId = body?.data?.id || body?.id;
  const topic = body?.type || body?.topic;

  if (!paymentId || !String(topic).includes("payment")) {
    return res.status(200).send("Evento ignorado");
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) return res.status(200).send("Pagamento nao encontrado");

  const payment = await response.json();
  if (payment.status === "approved") {
    const metadata = payment.metadata || {};
    const reference = parseExternalReference(payment.external_reference);
    await updateProfile({
      userId: metadata.user_id || reference.userId,
      email: metadata.email || reference.email || payment.payer?.email,
      plan: metadata.plan || reference.plan,
    });
  }

  return res.status(200).send("ok");
}
