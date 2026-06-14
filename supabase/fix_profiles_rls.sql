-- Corrige a tabela public.profiles para cadastro/login com RLS ativo.
-- Rode este arquivo no SQL Editor do Supabase.

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  avatar_url text,
  role text default 'student',
  plano text default 'gratuito',
  status_plano text default 'trial',
  concurso_alvo text default 'PM',
  data_prova date,
  nivel text default 'iniciante',
  horas_semanais integer default 10,
  dias_disponiveis text[] default array['segunda','terca','quarta','quinta','sexta'],
  onboarding_completo boolean default false,
  trial_inicio timestamptz default now(),
  plano_ativo boolean default true,
  plano_expira_em timestamptz default (now() + interval '7 days'),
  em_teste boolean default true,
  horas_estudadas integer default 0,
  questoes_resolvidas integer default 0,
  taxa_acertos integer default 0,
  sequencia_dias integer default 0,
  taf_nota float default 0,
  pontos integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists avatar_url text,
  add column if not exists role text default 'student',
  add column if not exists plano text default 'gratuito',
  add column if not exists status_plano text default 'trial',
  add column if not exists concurso_alvo text default 'PM',
  add column if not exists data_prova date,
  add column if not exists nivel text default 'iniciante',
  add column if not exists horas_semanais integer default 10,
  add column if not exists dias_disponiveis text[] default array['segunda','terca','quarta','quinta','sexta'],
  add column if not exists onboarding_completo boolean default false,
  add column if not exists trial_inicio timestamptz default now(),
  add column if not exists plano_ativo boolean default true,
  add column if not exists plano_expira_em timestamptz default (now() + interval '7 days'),
  add column if not exists em_teste boolean default true,
  add column if not exists horas_estudadas integer default 0,
  add column if not exists questoes_resolvidas integer default 0,
  add column if not exists taxa_acertos integer default 0,
  add column if not exists sequencia_dias integer default 0,
  add column if not exists taf_nota float default 0,
  add column if not exists pontos integer default 0,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

alter table public.profiles
  alter column name set default 'Aluno VemAprovar',
  alter column role set default 'student',
  alter column plano set default 'gratuito',
  alter column status_plano set default 'trial',
  alter column plano_ativo set default true,
  alter column em_teste set default true,
  alter column plano_expira_em set default (now() + interval '7 days');

update public.profiles
set
  name = coalesce(nullif(name, ''), split_part(email, '@', 1), 'Aluno VemAprovar'),
  plano = coalesce(plano, 'gratuito'),
  status_plano = coalesce(status_plano, 'trial'),
  plano_ativo = coalesce(plano_ativo, true),
  em_teste = coalesce(em_teste, true),
  trial_inicio = coalesce(trial_inicio, created_at, now()),
  plano_expira_em = coalesce(plano_expira_em, now() + interval '7 days');

alter table public.profiles enable row level security;

drop policy if exists "proprio_perfil" on public.profiles;
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles
  for delete
  to authenticated
  using (auth.uid() = id);

grant select, insert, update, delete on public.profiles to authenticated;

create table if not exists public.ranking (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  pontos integer default 0,
  posicao integer,
  updated_at timestamptz default now()
);

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
    trial_inicio,
    onboarding_completo
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'Aluno VemAprovar'),
    new.email,
    'gratuito',
    'trial',
    true,
    now() + interval '7 days',
    true,
    now(),
    false
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(nullif(public.profiles.name, ''), excluded.name),
    updated_at = now();

  insert into public.ranking (user_id, pontos)
  values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_plano_ativo_expira_idx on public.profiles(plano_ativo, plano_expira_em);
