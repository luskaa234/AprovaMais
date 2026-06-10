-- Atividades reais do Plano de Estudos.
-- Aplicar no Supabase depois da validacao da tela.

create extension if not exists "pgcrypto";

create table if not exists public.plano_atividades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text,
  materia text not null,
  tipo text not null check (tipo in ('Questões', 'Revisão', 'Leitura', 'Flashcards', 'TAF', 'Simulado', 'Estudo', 'Questoes', 'Revisao')),
  data date not null,
  hora time not null,
  duracao integer not null default 60 check (duracao > 0),
  status text not null default 'Pendente' check (status in ('Pendente', 'Em andamento', 'Concluida', 'Concluída', 'Reagendada')),
  concurso text,
  gerado_por_ia boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists plano_atividades_user_data_idx
  on public.plano_atividades (user_id, data, hora);

alter table public.plano_atividades enable row level security;

drop policy if exists "plano_atividades_select_own" on public.plano_atividades;
drop policy if exists "plano_atividades_insert_own" on public.plano_atividades;
drop policy if exists "plano_atividades_update_own" on public.plano_atividades;
drop policy if exists "plano_atividades_delete_own" on public.plano_atividades;

create policy "plano_atividades_select_own"
  on public.plano_atividades for select
  using (auth.uid() = user_id);

create policy "plano_atividades_insert_own"
  on public.plano_atividades for insert
  with check (auth.uid() = user_id);

create policy "plano_atividades_update_own"
  on public.plano_atividades for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "plano_atividades_delete_own"
  on public.plano_atividades for delete
  using (auth.uid() = user_id);
