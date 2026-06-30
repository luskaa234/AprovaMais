const MP_API = "https://api.mercadopago.com";

export function getMercadoPagoToken() {
  const token = Deno.env.get("MP_ACCESS_TOKEN");
  if (!token) throw new Error("MP_ACCESS_TOKEN ausente nos secrets do Supabase.");
  return token;
}

export function assertProductionMercadoPagoToken() {
  const token = getMercadoPagoToken().trim();
  const allowSandbox = Deno.env.get("ALLOW_MP_SANDBOX") === "true";

  if (!allowSandbox && token.startsWith("TEST-")) {
    throw new Error(
      "MP_ACCESS_TOKEN esta em modo teste. Configure uma credencial de producao do Mercado Pago (APP_USR-...) para gerar Pix pagavel.",
    );
  }
}

export async function mercadoPagoRequest(path: string, init: RequestInit = {}) {
  const token = getMercadoPagoToken();
  const response = await fetch(`${MP_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || data?.error || `Mercado Pago retornou ${response.status}.`);
  }
  return data;
}

export function normalizeStatus(status: string | undefined) {
  if (status === "approved" || status === "authorized") return "aprovado";
  if (status === "rejected" || status === "cancelled" || status === "cancelled_process" || status === "charged_back") {
    return "recusado";
  }
  return "pendente";
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function parseReference(reference: string | null | undefined) {
  try {
    return JSON.parse(reference || "{}");
  } catch {
    return {};
  }
}
