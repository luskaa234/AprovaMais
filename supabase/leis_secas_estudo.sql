-- Persistencia do modo de estudo da Lei Seca.
-- Aplicar no Supabase depois da validacao visual da tela.

create extension if not exists "pgcrypto";

create table if not exists public.grifos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lei_id text not null,
  artigo_id text not null,
  trecho text not null,
  cor text not null default 'yellow' check (cor in ('yellow', 'green', 'pink')),
  data timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists grifos_user_artigo_idx
  on public.grifos (user_id, artigo_id, data desc);

alter table public.grifos enable row level security;

drop policy if exists "grifos_select_own" on public.grifos;
drop policy if exists "grifos_insert_own" on public.grifos;
drop policy if exists "grifos_update_own" on public.grifos;
drop policy if exists "grifos_delete_own" on public.grifos;

create policy "grifos_select_own"
  on public.grifos for select
  using (auth.uid() = user_id);

create policy "grifos_insert_own"
  on public.grifos for insert
  with check (auth.uid() = user_id);

create policy "grifos_update_own"
  on public.grifos for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "grifos_delete_own"
  on public.grifos for delete
  using (auth.uid() = user_id);

create table if not exists public.notas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  artigo_id text not null,
  nota text not null default '',
  data timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, artigo_id)
);

create index if not exists notas_user_artigo_idx
  on public.notas (user_id, artigo_id);

alter table public.notas enable row level security;

drop policy if exists "notas_select_own" on public.notas;
drop policy if exists "notas_insert_own" on public.notas;
drop policy if exists "notas_update_own" on public.notas;
drop policy if exists "notas_delete_own" on public.notas;

create policy "notas_select_own"
  on public.notas for select
  using (auth.uid() = user_id);

create policy "notas_insert_own"
  on public.notas for insert
  with check (auth.uid() = user_id);

create policy "notas_update_own"
  on public.notas for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "notas_delete_own"
  on public.notas for delete
  using (auth.uid() = user_id);

create table if not exists public.leitura_progresso (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lei_id text not null,
  artigo_id text not null,
  lido boolean not null default true,
  data timestamptz not null default now(),
  unique (user_id, artigo_id)
);

create index if not exists leitura_progresso_user_lei_idx
  on public.leitura_progresso (user_id, lei_id, artigo_id);

alter table public.leitura_progresso enable row level security;

drop policy if exists "leitura_select_own" on public.leitura_progresso;
drop policy if exists "leitura_insert_own" on public.leitura_progresso;
drop policy if exists "leitura_update_own" on public.leitura_progresso;
drop policy if exists "leitura_delete_own" on public.leitura_progresso;

create policy "leitura_select_own"
  on public.leitura_progresso for select
  using (auth.uid() = user_id);

create policy "leitura_insert_own"
  on public.leitura_progresso for insert
  with check (auth.uid() = user_id);

create policy "leitura_update_own"
  on public.leitura_progresso for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "leitura_delete_own"
  on public.leitura_progresso for delete
  using (auth.uid() = user_id);
