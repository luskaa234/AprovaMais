-- Adiciona suporte ao formato rico de questões (alternativas com motivo,
-- rótulo, fundamento, assunto/competência em texto livre e trilha explícita).
-- Não altera nenhuma policy de RLS: escrita em public.questoes continua
-- exigindo service_role/SQL direto, como hoje (nenhuma policy de
-- INSERT/UPDATE/DELETE existe ou é criada aqui).

alter table if exists public.questoes
  add column if not exists rotulo text,
  add column if not exists fundamento text,
  add column if not exists assunto text,
  add column if not exists competencia text,
  add column if not exists trilha text;

alter table if exists public.questoes
  drop constraint if exists questoes_trilha_check;

alter table if exists public.questoes
  add constraint questoes_trilha_check check (trilha is null or trilha in ('militar', 'oab', 'geral'));

comment on column public.questoes.alternativas_json is
  'Alternativas no formato rico: [{"letra":"a","texto":"...","correta":bool,"motivo":"..."}]. Usada quando presente; alternativa_a..e continuam servindo de fallback pras questões antigas.';
comment on column public.questoes.trilha is
  'Trilha explícita (militar/oab/geral). Se nulo, o app infere pela palavra-chave em banca/orgao/cargo/concurso — mantido só pra compatibilidade com questões antigas que nunca tiveram esse campo.';
comment on column public.questoes.assunto is
  'Assunto em texto livre. Se nulo, o app cai pro topico (compatibilidade com questões antigas que só tinham topico).';
comment on column public.questoes.competencia is
  'Competência em texto livre, sem tabela própria (decisão de escopo: sem FK/normalização).';
comment on column public.questoes.rotulo is
  'Rótulo de exibição da questão, ex.: "Oficial · ESA".';
comment on column public.questoes.fundamento is
  'Fundamento/bibliografia da questão (separado do comentário/resolução).';
