export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Metodo nao permitido");

  res.setHeader("Cache-Control", "no-store");
  return res.status(410).send("Webhook legado desativado. Use a Supabase Edge Function webhook-mercadopago com assinatura HMAC.");
}
