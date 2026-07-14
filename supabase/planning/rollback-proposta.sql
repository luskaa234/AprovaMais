-- PLANEJAMENTO: NÃO EXECUTAR AUTOMATICAMENTE
-- Rollback proposto para migration real futura. Nao executar agora.

begin;

-- update app_config set value = 'legacy' where key = 'content_read_model';
-- delete from content_visibility_rules where import_id = :import_id;
-- delete from content_objectives where import_id = :import_id;
-- delete from content_items where import_id = :import_id;

rollback;
