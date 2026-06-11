export const paymentPlans = {
  essencial: {
    id: "essencial",
    name: "Aprova+ Essencial",
    checkoutUrl: import.meta.env.VITE_CHECKOUT_ESSENCIAL_URL,
  },
  pro: {
    id: "pro",
    name: "Aprova+ Pro",
    checkoutUrl: import.meta.env.VITE_CHECKOUT_PRO_URL,
  },
};

const checkoutEndpoint = import.meta.env.VITE_PAYMENT_CHECKOUT_ENDPOINT || "/api/create-checkout";

export async function startCheckout(planId = "essencial", user) {
  const plan = paymentPlans[planId] || paymentPlans.essencial;
  window.localStorage.setItem("aprova-pending-plan", plan.id);

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
      throw new Error(data.error || "Nao foi possivel iniciar o pagamento.");
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

  throw new Error("Checkout nao configurado. Configure MP_ACCESS_TOKEN ou VITE_CHECKOUT_*_URL.");
}

export const paymentService = {
  startCheckout,
  paymentPlans,
};
