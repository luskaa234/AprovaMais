# Estrategia de migracao

Nao executar nesta etapa.

1. Criar staging temporario com dados das auditorias.
2. Importar taxonomia candidata sem substituir modelo atual.
3. Validar totais estaveis.
4. Bloquear conteudo sem taxonomia e quarentena.
5. Popular tabelas normalizadas em dry-run.
6. Comparar leitura antiga e nova via feature flag.
7. Liberar por objetivo em ondas.

Migrations propostas ficam em supabase/planning e nao devem ser executadas ainda.
