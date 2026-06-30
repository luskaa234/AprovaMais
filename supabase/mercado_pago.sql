create extension if not exists "uuid-ossp";

alter table public.profiles
  add column if not exists plano text default 'gratuito',
  add column if not exists status_plano text default 'trial',
  add column if not exists plano_ativo boolean not null default false,
  add column if not exists plano_expira_em timestamptz,
  add column if not exists em_teste boolean not null default false,
  add column if not exists trial_inicio timestamptz;

update public.profiles
set
  status_plano = 'trial',
  plano_ativo = true,
  em_teste = true,
  trial_inicio = coalesce(trial_inicio, now()),
  plano_expira_em = coalesce(plano_expira_em, now() + interval '7 days')
where coalesce(plano, 'gratuito') = 'gratuito'
  and plano_expira_em is null
  and coalesce(status_plano, 'trial') in ('trial', 'gratuito');

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

create index if not exists planos_ativo_idx on public.planos(ativo);
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

insert into public.planos (id, nome, tipo, preco_centavos, dias_acesso, ativo)
values
  ('essencial', 'VemAprovar Essencial', 'mensal', 3990, 30, true),
  ('pro', 'VemAprovar Pro Anual', 'anual', 29880, 365, true)
on conflict (id) do update set
  nome = excluded.nome,
  tipo = excluded.tipo,
  preco_centavos = excluded.preco_centavos,
  dias_acesso = excluded.dias_acesso,
  ativo = excluded.ativo,
  atualizado_em = now();

create or replace function public.verificar_acesso(uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = uid
      and p.plano_ativo = true
      and (p.plano_expira_em is null or p.plano_expira_em > now())
  );
$$;

create or replace function public.expirar_acessos_vencidos()
returns void
language sql
security definer
set search_path = public
as $$
  update public.profiles
  set plano_ativo = false,
      em_teste = false,
      status_plano = 'expirado',
      updated_at = now()
  where plano_ativo = true
    and plano_expira_em is not null
    and plano_expira_em <= now();
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    name,
    email,
    plano,
    status_plano,
    plano_ativo,
    plano_expira_em,
    em_teste,
    trial_inicio
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    new.email,
    'gratuito',
    'trial',
    true,
    now() + interval '7 days',
    true,
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(public.profiles.name, excluded.name);

  insert into public.ranking (user_id, pontos) values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
