-- PLANEJAMENTO: NÃO EXECUTAR AUTOMATICAMENTE
-- Consultas de validacao para depois de migration real aprovada.

select 'conteudo_sem_objetivo_publicado' as check_name, count(*) as total
from content_items ci
where ci.status = 'published'
  and not exists (select 1 from content_objectives co where co.content_id = ci.id);

select 'conteudo_quarentena_publicado' as check_name, count(*) as total
from content_items
where status = 'published' and quarantine = true;

select 'leis_sem_versao' as check_name, count(*) as total
from laws l
where not exists (select 1 from law_versions lv where lv.law_id = l.id);
