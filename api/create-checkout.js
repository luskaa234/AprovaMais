/* global process */

const plans = {
  essencial: {
    title: "VemAprovar Essencial",
    description: "Acesso mensal ao plano de estudos, questoes, simulados, revisao, TAF e IA.",
    price: Number(process.env.MP_PRICE_ESSENCIAL || 39.9),
    plan: "essencial",
  },
  pro: {
    title: "VemAprovar Pro Anual",
    description: "Acesso anual ao VemAprovar com desconto.",
    price: Number(process.env.MP_PRICE_PRO || 298.8),
    plan: "pro",
  },
};

function getBaseUrl(req) {
  const configured = process.env.APP_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (configured) return configured.startsWith("http") ? configured : `https://${configured}`;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${host}`;
}

function send(res, status, payload) {
  res.setHeader("Content-Type", "application/json");
  res.status(status).send(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return send(res, 405, { error: "Metodo nao permitido." });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return send(res, 503, { error: "MP_ACCESS_TOKEN nao configurado no ambiente da Vercel." });
  }
  const webhookUrl = process.env.MP_WEBHOOK_URL;
  if (!webhookUrl || !/^https:\/\//i.test(webhookUrl)) {
    return send(res, 503, { error: "MP_WEBHOOK_URL seguro (https) nao configurado. Checkout bloqueado para evitar webhook inseguro." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const selected = plans[body.plan] || plans.essencial;
  const baseUrl = getBaseUrl(req);
  const externalReference = JSON.stringify({
    plan: selected.plan,
    userId: body.userId || null,
    email: body.email || null,
  });

  const preference = {
    items: [
      {
        id: selected.plan,
        title: selected.title,
        description: selected.description,
        quantity: 1,
        currency_id: "BRL",
        unit_price: selected.price,
      },
    ],
    payer: body.email ? { email: body.email, name: body.name || undefined } : undefined,
    external_reference: externalReference,
    metadata: {
      plan: selected.plan,
      user_id: body.userId || "",
      email: body.email || "",
    },
    back_urls: {
      success: process.env.PAYMENT_SUCCESS_URL || `${baseUrl}/?payment=success&plan=${selected.plan}`,
      failure: process.env.PAYMENT_FAILURE_URL || `${baseUrl}/?payment=failure&plan=${selected.plan}`,
      pending: process.env.PAYMENT_PENDING_URL || `${baseUrl}/?payment=pending&plan=${selected.plan}`,
    },
    auto_return: "approved",
    statement_descriptor: "VEMAPROVAR",
    notification_url: webhookUrl,
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preference),
  });

  const data = await response.json();
  if (!response.ok) {
    return send(res, response.status, {
      error: data?.message || "Nao foi possivel criar o checkout.",
      details: data,
    });
  }

  return send(res, 200, {
    preferenceId: data.id,
    checkoutUrl: data.init_point || data.sandbox_init_point,
  });
}
