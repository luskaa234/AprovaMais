create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  avatar_url text,
  role text default 'student' check (role in ('student','admin','reviewer')),
  plano text default 'gratuito' check (plano in ('gratuito','essencial','pro')),
  status_plano text default 'trial',
  concurso_alvo text default 'PM',
  data_prova date,
  nivel text default 'iniciante',
  horas_semanais integer default 10,
  dias_disponiveis text[] default array['segunda','terca','quarta','quinta','sexta'],
  onboarding_completo boolean default false,
  trial_inicio timestamptz default now(),
  horas_estudadas integer default 0,
  questoes_resolvidas integer default 0,
  taxa_acertos integer default 0,
  sequencia_dias integer default 0,
  taf_nota float default 0,
  pontos integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.questoes (
  id text primary key,
  codigo text,
  banca text,
  materia text not null,
  topico text,
  dificuldade text,
  enunciado text not null,
  alternativa_a text,
  alternativa_b text,
  alternativa_c text,
  alternativa_d text,
  alternativa_e text,
  gabarito text not null,
  comentario text,
  concurso text default 'PM',
  created_at timestamptz default now()
);

create index if not exists questoes_materia_idx on public.questoes(materia);
create index if not exists questoes_banca_idx on public.questoes(banca);
create index if not exists questoes_dificuldade_idx on public.questoes(dificuldade);
create index if not exists questoes_topico_idx on public.questoes(topico);
create index if not exists questoes_enunciado_fts on public.questoes using gin(to_tsvector('portuguese', enunciado));

create table if not exists public.tentativas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  questao_id text references public.questoes(id),
  resposta text not null,
  acertou boolean not null,
  tempo_gasto integer default 0,
  sessao_id uuid,
  created_at timestamptz default now()
);

create table if not exists public.questoes_salvas (
  user_id uuid references public.profiles(id) on delete cascade,
  questao_id text references public.questoes(id),
  created_at timestamptz default now(),
  primary key (user_id, questao_id)
);

create table if not exists public.caderno_erros (
  user_id uuid references public.profiles(id) on delete cascade,
  questao_id text references public.questoes(id),
  created_at timestamptz default now(),
  primary key (user_id, questao_id)
);

create table if not exists public.flashcard_decks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  titulo text not null,
  materia text,
  concurso text,
  origem text default 'manual' check (origem in ('manual','apkg','ia')),
  created_at timestamptz default now()
);

create table if not exists public.flashcards (
  id uuid primary key default uuid_generate_v4(),
  deck_id uuid references public.flashcard_decks(id) on delete cascade,
  frente text not null,
  verso text not null,
  ef float default 2.5,
  intervalo integer default 1,
  repeticoes integer default 0,
  proxima date default current_date,
  ultima_revisao timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.revisoes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  assunto text not null,
  materia text not null,
  proxima date not null default current_date + 1,
  intervalo integer default 1,
  ef float default 2.5,
  nivel text default 'fraco',
  acertos integer default 0,
  erros integer default 0,
  unique(user_id, assunto)
);

create table if not exists public.taf_treinos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  tipo text not null,
  valor float not null,
  unidade text not null,
  data date default current_date,
  created_at timestamptz default now()
);

create table if not exists public.taf_testes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  concurso text not null,
  nota float not null,
  situacao text not null,
  resultados jsonb not null,
  data date default current_date,
  created_at timestamptz default now()
);

create table if not exists public.leis (
  id text primary key,
  nome text not null,
  nome_curto text not null,
  categoria text not null,
  total_artigos integer default 0,
  url_planalto text,
  ativo boolean default true
);

create table if not exists public.leis_artigos (
  id uuid primary key default uuid_generate_v4(),
  lei_id text references public.leis(id) on delete cascade,
  numero integer not null,
  numero_texto text not null,
  texto text not null,
  capitulo text,
  importancia integer default 3,
  tags text[] default '{}',
  unique(lei_id, numero_texto)
);

create table if not exists public.artigos_grifados (
  user_id uuid references public.profiles(id) on delete cascade,
  artigo_id uuid references public.leis_artigos(id) on delete cascade,
  cor text default 'yellow',
  primary key (user_id, artigo_id)
);

create table if not exists public.artigos_favoritos (
  user_id uuid references public.profiles(id) on delete cascade,
  artigo_id uuid references public.leis_artigos(id) on delete cascade,
  primary key (user_id, artigo_id)
);

create table if not exists public.artigos_notas (
  user_id uuid references public.profiles(id) on delete cascade,
  artigo_id uuid references public.leis_artigos(id) on delete cascade,
  nota text not null,
  primary key (user_id, artigo_id)
);

create table if not exists public.ranking (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  pontos integer default 0,
  posicao integer,
  updated_at timestamptz default now()
);

create table if not exists public.notificacoes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  tipo text not null,
  titulo text not null,
  texto text,
  lida boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.questoes enable row level security;
alter table public.tentativas enable row level security;
alter table public.questoes_salvas enable row level security;
alter table public.caderno_erros enable row level security;
alter table public.flashcard_decks enable row level security;
alter table public.flashcards enable row level security;
alter table public.revisoes enable row level security;
alter table public.taf_treinos enable row level security;
alter table public.taf_testes enable row level security;
alter table public.leis enable row level security;
alter table public.leis_artigos enable row level security;
alter table public.artigos_grifados enable row level security;
alter table public.artigos_favoritos enable row level security;
alter table public.artigos_notas enable row level security;
alter table public.ranking enable row level security;
alter table public.notificacoes enable row level security;

drop policy if exists "proprio_perfil" on public.profiles;
create policy "proprio_perfil" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "questoes_publicas" on public.questoes;
create policy "questoes_publicas" on public.questoes for select using (auth.role() = 'authenticated');
drop policy if exists "leis_publicas" on public.leis;
create policy "leis_publicas" on public.leis for select using (auth.role() = 'authenticated');
drop policy if exists "artigos_publicos" on public.leis_artigos;
create policy "artigos_publicos" on public.leis_artigos for select using (auth.role() = 'authenticated');

drop policy if exists "proprias_tentativas" on public.tentativas;
create policy "proprias_tentativas" on public.tentativas for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprias_salvas" on public.questoes_salvas;
create policy "proprias_salvas" on public.questoes_salvas for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprio_caderno" on public.caderno_erros;
create policy "proprio_caderno" on public.caderno_erros for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprios_decks" on public.flashcard_decks;
create policy "proprios_decks" on public.flashcard_decks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprios_flashcards" on public.flashcards;
create policy "proprios_flashcards" on public.flashcards for all using (exists (select 1 from public.flashcard_decks where id = flashcards.deck_id and user_id = auth.uid()));
drop policy if exists "proprias_revisoes" on public.revisoes;
create policy "proprias_revisoes" on public.revisoes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprios_treinos" on public.taf_treinos;
create policy "proprios_treinos" on public.taf_treinos for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprios_testes" on public.taf_testes;
create policy "proprios_testes" on public.taf_testes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprios_grifos" on public.artigos_grifados;
create policy "proprios_grifos" on public.artigos_grifados for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprios_favoritos" on public.artigos_favoritos;
create policy "proprios_favoritos" on public.artigos_favoritos for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "proprias_notas_artigo" on public.artigos_notas;
create policy "proprias_notas_artigo" on public.artigos_notas for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "ranking_leitura" on public.ranking;
create policy "ranking_leitura" on public.ranking for select using (auth.role() = 'authenticated');
drop policy if exists "proprias_notificacoes" on public.notificacoes;
create policy "proprias_notificacoes" on public.notificacoes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)), new.email)
  on conflict (id) do nothing;
  insert into public.ranking (user_id, pontos) values (new.id, 0)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.incrementar_pontos(uid uuid, pts integer)
returns void language plpgsql security definer as $$
begin
  insert into public.ranking (user_id, pontos) values (uid, pts)
  on conflict (user_id) do update set pontos = ranking.pontos + pts, updated_at = now();
  update public.profiles set pontos = coalesce(pontos, 0) + pts where id = uid;
end;
$$;

insert into public.leis (id, nome, nome_curto, categoria, url_planalto) values
  ('cf88','Constituicao Federal de 1988','CF/88','constitucional','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
  ('cp','Codigo Penal','CP','penal','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),
  ('cpp','Codigo de Processo Penal','CPP','processual','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'),
  ('lei8112','Lei 8.112/1990','L. 8.112','administrativa','https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm'),
  ('cdc','Codigo de Defesa do Consumidor','CDC','especial','https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm'),
  ('lei9099','Lei 9.099/1995','L. 9.099','especial','https://www.planalto.gov.br/ccivil_03/leis/l9099.htm'),
  ('lei9503','Codigo de Transito Brasileiro','CTB','especial','https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm'),
  ('lei7210','Lei de Execucao Penal','LEP','penal','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm'),
  ('lei11343','Lei de Drogas','L. 11.343','penal','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm'),
  ('eca','Estatuto da Crianca e do Adolescente','ECA','especial','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm'),
  ('cc','Codigo Civil','CC','civil','https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm')
on conflict (id) do update set nome = excluded.nome, nome_curto = excluded.nome_curto, categoria = excluded.categoria, url_planalto = excluded.url_planalto;
