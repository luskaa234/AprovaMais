-- PLANEJAMENTO: NÃO EXECUTAR AUTOMATICAMENTE
-- Dry-run conceitual com tabelas temporarias. Nao gravar dados definitivos.

begin;

create temporary table staging_content_files (
  source_path text,
  content_type text,
  objective_slug text,
  discipline_slug text,
  quarantine_reason text
) on commit drop;

-- copy staging_content_files from 'reports/normalizacao-conteudo/mapeamento-conteudos.csv' with csv header;

select count(*) as sem_objetivo from staging_content_files where nullif(objective_slug, '') is null;
select count(*) as sem_disciplina from staging_content_files where nullif(discipline_slug, '') is null;
select count(*) as em_quarentena from staging_content_files where nullif(quarantine_reason, '') is not null;

rollback;
