# Mercado Pago via Supabase Edge Functions

## 1. Banco

Rode o SQL completo em `supabase/mercado_pago.sql` no SQL Editor do Supabase.

Ele cria/atualiza:

- `planos`
- `assinaturas`
- `pagamentos`
- colunas em `profiles`: `plano_ativo`, `plano_expira_em`, `em_teste`
- RLS por `user_id`
- funcao `verificar_acesso`
- funcao `expirar_acessos_vencidos`
- trigger de novo usuario com 7 dias gratis

## 2. Secrets no Supabase

Configure no projeto Supabase:

```bash
supabase secrets set MP_ACCESS_TOKEN="TEST-..."
supabase secrets set MP_WEBHOOK_URL="https://SEU-PROJETO.supabase.co/functions/v1/webhook-mercadopago"
supabase secrets set MP_WEBHOOK_SECRET="assinatura-secreta-gerada-no-mercado-pago"
supabase secrets set APP_URL="https://seu-dominio.com"
```

O Supabase ja fornece `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` para as Edge Functions.

Nunca coloque `MP_ACCESS_TOKEN` no frontend, `.env` publico ou Vercel client env.

`MP_WEBHOOK_SECRET` e a assinatura secreta do webhook do Mercado Pago. A Edge Function valida os headers `x-signature` e `x-request-id` antes de processar qualquer pagamento.

## 3. Variaveis no frontend

No Vercel/site:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_MP_PUBLIC_KEY=TEST-...
```

Somente a Public Key do Mercado Pago fica no frontend.

## 4. Deploy das Edge Functions

```bash
supabase functions deploy criar-pagamento-pix
supabase functions deploy criar-assinatura-cartao
supabase functions deploy criar-pagamento-debito
supabase functions deploy webhook-mercadopago --no-verify-jwt
supabase functions deploy verificar-acesso
supabase functions deploy cancelar-assinatura
```

No painel do Mercado Pago, configure a URL de notificacoes/webhook para:

```text
https://SEU-PROJETO.supabase.co/functions/v1/webhook-mercadopago
```

## 5. Fluxo de seguranca

- Pix: frontend chama `criar-pagamento-pix`, mostra QR code e aguarda webhook.
- Cartao credito: frontend tokeniza pelo Mercado Pago.js e envia apenas o token para `criar-assinatura-cartao`.
- Cartao debito: frontend tokeniza pelo Mercado Pago.js e envia o token para `criar-pagamento-debito`.
- Acesso premium so e liberado quando o backend confirma pagamento/assinatura com a API do Mercado Pago.
- Cancelamento: frontend chama `cancelar-assinatura`; a Edge Function cancela a recorrencia no Mercado Pago e mantem o acesso ate o fim do periodo ja confirmado.

## 6. Checklist sandbox

1. Criar conta nova e conferir `profiles.plano_ativo=true`, `em_teste=true`, `plano_expira_em=agora+7 dias`.
2. Gerar Pix sandbox, aprovar no painel Mercado Pago e conferir `pagamentos.status=aprovado`.
3. Conferir `profiles.plano_ativo=true`, `em_teste=false`, `plano_expira_em` atualizado pelo plano.
4. Testar cartao aprovado.
5. Testar cartao recusado e confirmar que o acesso nao libera.
6. Testar webhook com evento duplicado para confirmar que nao duplica pagamento por `mp_payment_id`.
