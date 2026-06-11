-- Correção do erro: "Plano invalido ou inativo."
-- Motivo: as Edge Functions de pagamento consultam public.planos
-- pelos IDs 'essencial' e 'pro'. Se a tabela/linhas não existem,
-- o checkout para antes de chamar o Mercado Pago.

create extension if not exists "uuid-ossp";

alter table public.profiles
  add column if not exists plano text default 'gratuito',
  add column if not exists status_plano text default 'trial',
  add column if not exists plano_ativo boolean not null default true,
  add column if not exists plano_expira_em timestamptz,
  add column if not exists em_teste boolean not null default true,
  add column if not exists trial_inicio timestamptz;

create table if not exists public.planos (
  id text primary key,
  nome text not null,
  tipo text not null check (tipo in ('mensal', 'anual')),
  preco_centavos integer not null check (preco_centavos > 0),
  dias_acesso integer not null check (dias_acesso > 0),
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

insert into public.planos (id, nome, tipo, preco_centavos, dias_acesso, ativo)
values
  ('essencial', 'Aprova+ Essencial', 'mensal', 3990, 30, true),
  ('pro', 'Aprova+ Pro Anual', 'anual', 29880, 365, true)
on conflict (id) do update set
  nome = excluded.nome,
  tipo = excluded.tipo,
  preco_centavos = excluded.preco_centavos,
  dias_acesso = excluded.dias_acesso,
  ativo = true,
  atualizado_em = now();

create index if not exists planos_ativo_idx on public.planos (ativo);

create table if not exists public.assinaturas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plano_id text not null references public.planos(id),
  status text not null default 'pendente' check (status in ('ativa', 'cancelada', 'pendente', 'expirada')),
  metodo text not null check (metodo in ('cartao_recorrente', 'pix', 'debito')),
  inicio timestamptz not null default now(),
  fim timestamptz,
  mp_subscription_id text,
  mp_payment_id text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table if not exists public.pagamentos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  assinatura_id uuid references public.assinaturas(id) on delete set null,
  valor_centavos integer not null check (valor_centavos > 0),
  metodo text not null check (metodo in ('pix', 'cartao_credito', 'cartao_debito')),
  status text not null default 'pendente' check (status in ('aprovado', 'pendente', 'recusado')),
  mp_payment_id text unique,
  data timestamptz not null default now(),
  raw jsonb not null default '{}'::jsonb
);

create index if not exists assinaturas_user_id_idx on public.assinaturas(user_id);
create index if not exists assinaturas_plano_id_idx on public.assinaturas(plano_id);
create index if not exists assinaturas_status_idx on public.assinaturas(status);
create index if not exists assinaturas_mp_subscription_id_idx on public.assinaturas(mp_subscription_id);
create index if not exists assinaturas_mp_payment_id_idx on public.assinaturas(mp_payment_id);
create index if not exists pagamentos_user_id_idx on public.pagamentos(user_id);
create index if not exists pagamentos_assinatura_id_idx on public.pagamentos(assinatura_id);
create index if not exists pagamentos_status_idx on public.pagamentos(status);
create index if not exists pagamentos_mp_payment_id_idx on public.pagamentos(mp_payment_id);
create index if not exists profiles_plano_ativo_expira_idx on public.profiles(plano_ativo, plano_expira_em);

alter table public.planos enable row level security;
alter table public.assinaturas enable row level security;
alter table public.pagamentos enable row level security;

drop policy if exists "planos_leitura_autenticada" on public.planos;
create policy "planos_leitura_autenticada"
  on public.planos for select
  using (auth.role() = 'authenticated' and ativo = true);

drop policy if exists "assinaturas_do_usuario" on public.assinaturas;
create policy "assinaturas_do_usuario"
  on public.assinaturas for select
  using (auth.uid() = user_id);

drop policy if exists "pagamentos_do_usuario" on public.pagamentos;
create policy "pagamentos_do_usuario"
  on public.pagamentos for select
  using (auth.uid() = user_id);

notify pgrst, 'reload schema';

select id, nome, tipo, preco_centavos, dias_acesso, ativo
from public.planos
order by id;
