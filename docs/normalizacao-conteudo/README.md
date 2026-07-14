# Plano de normalizacao e implantacao de conteudo - VemAprovar

Este pacote e uma especificacao de planejamento baseada nas Auditorias V1, V2 e Validacao V2.1. Nenhuma migration foi executada, nenhum dado remoto foi alterado, nenhum conteudo pedagogico foi corrigido e nenhuma interface foi modificada.

## Numeros estaveis

- 1669 arquivos inventariados.
- 11 leis unicas.
- 49 provas logicas.
- 80 gabaritos.
- 129 conteudos diretamente conectados.
- 736 conteudos locais ou nao servidos.
- 0 conteudos apenas referenciados.
- Inconsistencia CDC x CTN confirmada.

## Numeros divergentes, nao oficiais

Conteudos pedagogicos 865/754; objetivos 12/10; disciplinas 34/12; questoes validas 2130/4449; questoes unicas 2073/2382; flashcards validos 18824/14988; flashcards unicos 11744/6911; mapas 1110/7820; PDFs 541/453.

## Arquitetura proposta

Separar taxonomia, arquivos, conteudos pedagogicos, questoes, flashcards, mapas, leis, provas, visibilidade e logs de validacao. Toda leitura pedagogica deve passar por contexto de objetivo ativo e por regra de quarentena.

## Ordem segura de implementacao

1. Congelar contratos de contagem e taxonomia.
2. Resolver bloqueadores: CDC x CTN, encoding visivel e quarentena.
3. Criar staging/dry-run com tabelas temporarias.
4. Comparar totais antigos e normalizados.
5. Implementar filtro por objetivo em servico antes da UI.
6. Rodar migration real somente apos aprovacao humana.

## Proximo comando recomendado

Revisar docs/normalizacao-conteudo/decisoes-pendentes.md e aprovar uma alternativa de taxonomia antes de transformar os SQLs de planning em migrations reais.
