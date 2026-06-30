create table if not exists public.revisao_questoes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  questao_id text not null,
  status text not null default 'a_revisar'
    check (status in ('a_revisar', 'dominada', 'removida')),
  source text not null default 'manual'
    check (source in ('tentativa_errada', 'caderno', 'manual', 'refeita')),
  due_at date default current_date,
  last_reviewed_at timestamptz,
  attempts integer not null default 0,
  correct_count integer not null default 0,
  wrong_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, questao_id)
);

alter table public.revisao_questoes
  add column if not exists status text not null default 'a_revisar',
  add column if not exists source text not null default 'manual',
  add column if not exists due_at date default current_date,
  add column if not exists last_reviewed_at timestamptz,
  add column if not exists attempts integer not null default 0,
  add column if not exists correct_count integer not null default 0,
  add column if not exists wrong_count integer not null default 0,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create index if not exists revisao_questoes_user_status_idx
  on public.revisao_questoes(user_id, status);

create index if not exists revisao_questoes_user_due_idx
  on public.revisao_questoes(user_id, due_at);

alter table public.revisao_questoes enable row level security;

drop policy if exists "proprias_revisoes_questoes" on public.revisao_questoes;
create policy "proprias_revisoes_questoes"
  on public.revisao_questoes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update, delete on public.revisao_questoes to authenticated;
