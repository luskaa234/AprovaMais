# Validação final V2.1

## Recontagem

| Métrica | V2 | Recontagem | Diferença | Status | Confiança |
| --- | --- | --- | --- | --- | --- |
| arquivosInventariados | 1669 | 1669 | 0 | confirmado | alta |
| conteudosPedagogicos | 865 | 754 | -111 | divergente | média |
| objetivosReais | 12 | 10 | -2 | divergente | média |
| disciplinasReais | 34 | 12 | -22 | divergente | média |
| questoesValidas | 2130 | 4449 | 2319 | divergente | média |
| questoesUnicas | 2073 | 2382 | 309 | divergente | média |
| flashcardsReais | 18824 | 14988 | -3836 | divergente | média |
| flashcardsUnicos | 11744 | 6911 | -4833 | divergente | média |
| mapasReais | 1110 | 7820 | 6710 | divergente | baixa |
| leisUnicas | 11 | 11 | 0 | confirmado | alta |
| provasArquivosPdf | 541 | 453 | -88 | divergente | alta |
| provasLogicasUnicas | 49 | 49 | 0 | confirmado | alta |
| gabaritos | 80 | 80 | 0 | confirmado | alta |
| conectadosDiretamente | 129 | 129 | 0 | confirmado | alta |
| localOnly | 736 | 736 | 0 | confirmado | alta |
| apenasReferenciados | 0 | 0 | 0 | confirmado | alta |

## Questões

- Válidas recontadas: 4449
- Únicas recontadas: 2382
- Rejeitadas por motivo: alternativas ausentes: 10262; resposta ausente: 20940; enunciado vazio: 40; parser incompatível: 1; erro de sintaxe: 18
- Fontes com mais de 100 itens: 130
- Fontes com invalidez superior a 50%: 190

## Flashcards

- Cards válidos recontados: 14988
- Cards únicos recontados: 6911
- Ocorrências em duplicatas: 14948

## Mapas

- Mapas recontados: 7820
- Fontes de mapas: 70

## Interface

- Conteúdos conectados revalidados: 129
- Conteúdos apenas referenciados encontrados: 0
- Conteúdos locais/não servidos: 736

## Críticos

- CDC x CTN: textos idênticos confirmados na V2; exige revisão antes de migration/publicação jurídica.
- 736 conteúdos pedagógicos locais/não servidos precisam de plano de importação/conexão.
- 79 itens pedagógicos com evidência de encoding sanitizado no JSON V2.
- 14948 ocorrências em grupos de flashcards duplicados; não excluir automaticamente.
