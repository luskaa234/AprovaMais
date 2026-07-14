# Parecer de prontidão para normalização/migration

## Avaliação

- Confiabilidade das contagens: média/alta. Métricas de arquivo, PDFs, provas lógicas e interface foram confirmadas; questões, flashcards e mapas dependem de parser e foram recontados com regra independente.
- Qualidade da taxonomia: candidata, ainda exige revisão humana antes de virar banco.
- Conteúdo não servido: 736 itens precisam de importação, taxonomia ou conexão.
- Erros de codificação pedagógicos: 79 itens com evidência sanitizada.
- CDC versus CTN: inconsistência crítica mantida, sem correção nesta etapa.
- Duplicatas: há duplicatas de questões e flashcards; não há recomendação de exclusão automática.
- Integração com interface: 129 cadeias diretas revalidadas; filtros de objetivo ainda precisam ser validados em runtime/Supabase.
- Risco de mistura entre objetivos: médio, até a taxonomia canônica ser aplicada.

## Decisão

APROVADO COM RESSALVAS
