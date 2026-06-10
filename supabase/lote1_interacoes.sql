create extension if not exists "uuid-ossp";

create table if not exists public.tentativas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  questao_id text references public.questoes(id),
  resposta text not null,
  acertou boolean not null,
  tempo_gasto integer default 0,
  sessao_id uuid,
  materia text,
  data timestamptz default now(),
  created_at timestamptz default now()
);

alter table public.tentativas add column if not exists materia text;
alter table public.tentativas add column if not exists data timestamptz default now();

create table if not exists public.questoes_salvas (
  user_id uuid references public.profiles(id) on delete cascade,
  questao_id text references public.questoes(id),
  data timestamptz default now(),
  created_at timestamptz default now(),
  primary key (user_id, questao_id)
);

alter table public.questoes_salvas add column if not exists data timestamptz default now();

create table if not exists public.caderno_erros (
  user_id uuid references public.profiles(id) on delete cascade,
  questao_id text references public.questoes(id),
  data timestamptz default now(),
  created_at timestamptz default now(),
  primary key (user_id, questao_id)
);

alter table public.caderno_erros add column if not exists data timestamptz default now();

create index if not exists tentativas_user_data_idx on public.tentativas(user_id, data desc);
create index if not exists tentativas_user_materia_idx on public.tentativas(user_id, materia);
create index if not exists caderno_erros_user_data_idx on public.caderno_erros(user_id, data desc);
create index if not exists questoes_salvas_user_data_idx on public.questoes_salvas(user_id, data desc);

alter table public.tentativas enable row level security;
alter table public.questoes_salvas enable row level security;
alter table public.caderno_erros enable row level security;

drop policy if exists "proprias_tentativas" on public.tentativas;
create policy "proprias_tentativas"
on public.tentativas
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "proprias_salvas" on public.questoes_salvas;
create policy "proprias_salvas"
on public.questoes_salvas
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "proprio_caderno" on public.caderno_erros;
create policy "proprio_caderno"
on public.caderno_erros
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
