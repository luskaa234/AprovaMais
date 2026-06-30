-- Isolamento de dados por usuario.
-- Rode no SQL Editor do Supabase depois do schema principal.

alter table public.ranking enable row level security;

drop policy if exists "ranking_leitura" on public.ranking;
drop policy if exists "ranking_select_own" on public.ranking;
drop policy if exists "ranking_insert_own" on public.ranking;
drop policy if exists "ranking_update_own" on public.ranking;

create policy "ranking_select_own"
  on public.ranking
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "ranking_insert_own"
  on public.ranking
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "ranking_update_own"
  on public.ranking
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.tentativas enable row level security;
drop policy if exists "proprias_tentativas" on public.tentativas;
create policy "proprias_tentativas"
  on public.tentativas
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.questoes_salvas enable row level security;
drop policy if exists "proprias_salvas" on public.questoes_salvas;
create policy "proprias_salvas"
  on public.questoes_salvas
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.caderno_erros enable row level security;
drop policy if exists "proprio_caderno" on public.caderno_erros;
create policy "proprio_caderno"
  on public.caderno_erros
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

alter table public.plano_atividades enable row level security;
drop policy if exists "plano_atividades_select_own" on public.plano_atividades;
drop policy if exists "plano_atividades_insert_own" on public.plano_atividades;
drop policy if exists "plano_atividades_update_own" on public.plano_atividades;
drop policy if exists "plano_atividades_delete_own" on public.plano_atividades;

create policy "plano_atividades_select_own"
  on public.plano_atividades
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "plano_atividades_insert_own"
  on public.plano_atividades
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "plano_atividades_update_own"
  on public.plano_atividades
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "plano_atividades_delete_own"
  on public.plano_atividades
  for delete
  to authenticated
  using (auth.uid() = user_id);
