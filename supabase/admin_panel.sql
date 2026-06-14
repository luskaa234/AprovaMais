-- Painel administrativo seguro do VemAprovar.
-- Rode este arquivo no SQL Editor do Supabase antes de usar as Edge Functions.

create extension if not exists "uuid-ossp";

alter table public.profiles
  add column if not exists vitalicio boolean not null default false,
  add column if not exists updated_at timestamptz default now();

create table if not exists public.app_config (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

insert into public.app_config (key, value)
values ('maintenance_mode', jsonb_build_object('enabled', false, 'message', ''))
on conflict (key) do nothing;

create table if not exists public.admin_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_user_id uuid references public.profiles(id) on delete set null,
  admin_email text not null,
  action text not null,
  target_user_id uuid references public.profiles(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_vitalicio_idx on public.profiles(vitalicio);
create index if not exists profiles_plano_ativo_expira_idx on public.profiles(plano_ativo, plano_expira_em);
create index if not exists admin_logs_admin_user_id_idx on public.admin_logs(admin_user_id);
create index if not exists admin_logs_target_user_id_idx on public.admin_logs(target_user_id);
create index if not exists admin_logs_created_at_idx on public.admin_logs(created_at desc);
create index if not exists app_config_key_idx on public.app_config(key);

alter table public.app_config enable row level security;
alter table public.admin_logs enable row level security;

drop policy if exists "app_config_read" on public.app_config;
create policy "app_config_read"
  on public.app_config
  for select
  to anon, authenticated
  using (key = 'maintenance_mode');

drop policy if exists "app_config_no_client_write" on public.app_config;
create policy "app_config_no_client_write"
  on public.app_config
  for all
  to authenticated
  using (false)
  with check (false);

drop policy if exists "admin_logs_no_client_access" on public.admin_logs;
create policy "admin_logs_no_client_access"
  on public.admin_logs
  for all
  to authenticated
  using (false)
  with check (false);

grant select on public.app_config to anon, authenticated;
revoke insert, update, delete on public.app_config from anon, authenticated;
revoke all on public.admin_logs from anon, authenticated;

-- Protege campos de plano/admin contra auto-promocao via cliente.
-- Edge Functions usam service_role e nao entram neste bloqueio.
create or replace function public.protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated' then
    if tg_op = 'INSERT' then
      new.role := 'student';
      new.plano := coalesce(new.plano, 'gratuito');
      new.status_plano := coalesce(new.status_plano, 'trial');
      new.plano_ativo := coalesce(new.plano_ativo, true);
      new.plano_expira_em := coalesce(new.plano_expira_em, now() + interval '7 days');
      new.em_teste := coalesce(new.em_teste, true);
      new.vitalicio := false;
    elsif tg_op = 'UPDATE' then
      new.role := old.role;
      new.plano := old.plano;
      new.status_plano := old.status_plano;
      new.plano_ativo := old.plano_ativo;
      new.plano_expira_em := old.plano_expira_em;
      new.em_teste := old.em_teste;
      new.vitalicio := old.vitalicio;
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_profile_admin_fields_trigger on public.profiles;
create trigger protect_profile_admin_fields_trigger
  before insert or update on public.profiles
  for each row
  execute function public.protect_profile_admin_fields();

-- Mantem leitura/insert/update do proprio perfil, mas a trigger acima impede
-- alteracao client-side dos campos sensiveis de plano/admin.
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
