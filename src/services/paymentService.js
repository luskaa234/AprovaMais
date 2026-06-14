import { requireSupabase, supabase } from "../lib/supabase";

export const paymentPlans = {
  essencial: {
    id: "essencial",
    name: "VemAprovar Essencial",
    type: "mensal",
    price: "R$ 39,90",
    priceInCents: 3990,
    accessDays: 30,
    checkoutUrl: import.meta.env.VITE_CHECKOUT_ESSENCIAL_URL,
  },
  pro: {
    id: "pro",
    name: "VemAprovar Pro",
    type: "anual",
    price: "R$ 298,80",
    priceInCents: 29880,
    accessDays: 365,
    checkoutUrl: import.meta.env.VITE_CHECKOUT_PRO_URL,
  },
};

const apiBaseUrl = String(import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

function resolveApiUrl(endpoint) {
  if (!endpoint || /^https?:\/\//i.test(endpoint)) return endpoint;
  if (!apiBaseUrl) return endpoint;
  return `${apiBaseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
}

const checkoutEndpoint = resolveApiUrl(import.meta.env.VITE_PAYMENT_CHECKOUT_ENDPOINT || (import.meta.env.PROD ? "/api/create-checkout" : ""));
const mpPublicKey = import.meta.env.VITE_MP_PUBLIC_KEY;

function openCheckoutModal(planId) {
  if (typeof window === "undefined") return false;
  window.localStorage.setItem("aprova-pending-plan", planId);
  window.dispatchEvent(new CustomEvent("aprova:open-checkout", { detail: { planId } }));
  return true;
}

async function extractFunctionError(error, fallback) {
  if (!error) return fallback;
  const response = error.context;
  if (response && typeof response.json === "function") {
    try {
      const payload = await response.clone().json();
      if (payload?.error) return payload.error;
    } catch {
      // Mantem fallback abaixo.
    }
  }
  return error.message || fallback;
}

async function invokePaymentFunction(name, body, fallback) {
  const client = requireSupabase();
  try {
    const { data, error } = await client.functions.invoke(name, { body });
    if (error || data?.error) {
      throw new Error(data?.error || await extractFunctionError(error, fallback));
    }
    return data;
  } catch (error) {
    throw new Error(error.message || fallback, { cause: error });
  }
}

export async function startCheckout(planId = "essencial", user) {
  const plan = paymentPlans[planId] || paymentPlans.essencial;
  window.localStorage.setItem("aprova-pending-plan", plan.id);

  if (supabase && !user?.id) {
    window.location.assign("/criar-conta");
    return;
  }

  if (supabase) {
    openCheckoutModal(plan.id);
    return;
  }

  if (checkoutEndpoint) {
    const response = await fetch(checkoutEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: plan.id,
        userId: user?.id || null,
        email: user?.email || null,
        name: user?.name || null,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (plan.checkoutUrl) {
        window.location.assign(plan.checkoutUrl);
        return;
      }
      throw new Error(data.error || "Não foi possível iniciar o pagamento.");
    }

    if (data.checkoutUrl) {
      window.location.assign(data.checkoutUrl);
      return;
    }
  }

  if (plan.checkoutUrl) {
    window.location.assign(plan.checkoutUrl);
    return;
  }

  throw new Error("Checkout não configurado. Configure MP_ACCESS_TOKEN ou VITE_CHECKOUT_*_URL.");
}

export async function createPixPayment(planId = "essencial") {
  return invokePaymentFunction("criar-pagamento-pix", { plano_id: planId }, "Não foi possível gerar Pix.");
}

export async function createCardSubscription(planId = "essencial", cardToken) {
  return invokePaymentFunction("criar-assinatura-cartao", { plano_id: planId, card_token: cardToken }, "Não foi possível criar assinatura.");
}

export async function createDebitPayment(planId = "essencial", payload) {
  return invokePaymentFunction("criar-pagamento-debito", { plano_id: planId, ...payload }, "Não foi possível criar pagamento.");
}

export async function verifyPremiumAccess() {
  return invokePaymentFunction("verificar-acesso", {}, "Não foi possível verificar acesso.");
}

export async function cancelCurrentSubscription() {
  return invokePaymentFunction("cancelar-assinatura", {}, "Não foi possível cancelar a assinatura.");
}

export function loadMercadoPagoSdk() {
  if (!mpPublicKey) throw new Error("VITE_MP_PUBLIC_KEY não configurada.");
  if (typeof window === "undefined") throw new Error("Checkout indisponível fora do navegador.");
  if (window.MercadoPago) return Promise.resolve(new window.MercadoPago(mpPublicKey, { locale: "pt-BR" }));

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-mercadopago-sdk="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(new window.MercadoPago(mpPublicKey, { locale: "pt-BR" })), { once: true });
      existing.addEventListener("error", () => reject(new Error("Falha ao carregar SDK do Mercado Pago.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.dataset.mercadopagoSdk = "true";
    script.onload = () => resolve(new window.MercadoPago(mpPublicKey, { locale: "pt-BR" }));
    script.onerror = () => reject(new Error("Falha ao carregar SDK do Mercado Pago."));
    document.head.appendChild(script);
  });
}

export async function createMercadoPagoCardToken(card) {
  const mp = await loadMercadoPagoSdk();
  const [expirationMonth = "", expirationYear = ""] = String(card.expiration || "").split("/");
  const token = await mp.createCardToken({
    cardNumber: card.cardNumber.replace(/\D/g, ""),
    cardholderName: card.cardholderName,
    cardExpirationMonth: expirationMonth.trim(),
    cardExpirationYear: expirationYear.trim().length === 2 ? `20${expirationYear.trim()}` : expirationYear.trim(),
    securityCode: card.securityCode,
    identificationType: card.identificationType || "CPF",
    identificationNumber: card.identificationNumber.replace(/\D/g, ""),
  });

  if (!token?.id) {
    throw new Error(token?.message || "Não foi possível tokenizar o cartão.");
  }
  return token;
}

export const paymentService = {
  startCheckout,
  createPixPayment,
  createCardSubscription,
  createDebitPayment,
  createMercadoPagoCardToken,
  verifyPremiumAccess,
  cancelCurrentSubscription,
  paymentPlans,
};
