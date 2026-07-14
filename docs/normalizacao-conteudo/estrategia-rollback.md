# Estrategia de rollback

- Backup antes de migration real.
- Tabelas temporarias.
- Migration idempotente.
- Feature flag para leitura antiga/nova.
- Comparacao paralela.
- Reversao por flag antes de drop/rename.
- Nunca apagar arquivos de origem.
- Logs em content_imports e content_validation_logs.
- Auditoria por import_id.
