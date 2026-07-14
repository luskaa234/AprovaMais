# Auditoria corretiva V2 - Resumo executivo

## Problemas confirmados na V1

- V1 misturava arquivos técnicos, componentes, assets e conteúdos pedagógicos em alguns totais.
- V1 tratava contagens aproximadas de questões/flashcards como se fossem extração real.
- V1 usava labels como Flashcards, Mapas Mentais, Revisão e TAF como disciplina.
- V1 contava leis por arquivo, não por entidade legal.
- V1 marcava conteúdos locais como conectados apenas por estarem em pastas conhecidas.
- V1 contava grupos de duplicatas por arquivo envolvido em alguns resumos.

## Números corrigidos

| Métrica | Valor |
| --- | --- |
| arquivosInventariados | 1669 |
| conteudosPedagogicos | 865 |
| arquivosTecnicos | 248 |
| objetivosReais | 12 |
| concursosReais | 156 |
| disciplinasReais | 34 |
| assuntosReais | 161 |
| questoesBrutas | 11115 |
| questoesValidas | 2130 |
| questoesUnicas | 2073 |
| questoesDuplicadas | 57 |
| flashcardsReais | 18824 |
| flashcardsUnicos | 11744 |
| mapasReais | 1110 |
| leisUnicas | 11 |
| arquivosLegais | 33 |
| provasArquivosPdf | 541 |
| provasLogicasUnicas | 49 |
| variantes | 120 |
| gabaritos | 80 |
| conectadosDiretamente | 129 |
| apenasReferenciados | 0 |
| localOnly | 736 |
| orfaosPedagogicos | 0 |
| mocks | 13 |
| gruposDuplicatas | 6 |
| arquivosEmDuplicatas | 21 |
| gruposQuestoesDuplicadas | 34 |
| gruposFlashcardsDuplicados | 2047 |
| errosCodificacaoOrigem | 583 |

## Objetivos reais

| Objetivo real | Arquivos pedagógicos |
| --- | --- |
| OAB | 571 |
| Polícia Militar | 101 |
| Polícia Civil | 36 |
| ENEM | 13 |
| Corpo de Bombeiros | 10 |
| Guarda Municipal | 6 |
| PRF | 6 |
| Tribunais | 6 |
| Concursos Fiscais | 2 |
| Concursos Administrativos | 1 |
| DETRAN | 1 |
| Polícia Penal | 1 |

## Disciplinas reais

| Disciplina real | Arquivos pedagógicos |
| --- | --- |
| Direito Penal | 45 |
| Direito Constitucional | 43 |
| Ética Profissional | 42 |
| Direito Administrativo | 40 |
| Direito Tributário | 39 |
| Direito Empresarial | 36 |
| Língua Portuguesa | 21 |
| Legislação Institucional PMMA | 14 |
| Redação | 11 |
| Direito Penal Militar | 7 |
| Direito do Trabalho | 6 |
| Direito Processual Civil | 6 |
| Direito Processual Penal | 6 |
| Direito do Consumidor | 5 |
| Direito Civil | 4 |
| Raciocínio Lógico-Matemático | 4 |
| Criminologia e Segurança Pública | 3 |
| Direitos Humanos | 3 |
| Atualidades | 2 |
| Direito Ambiental | 2 |
| Direito Eleitoral | 2 |
| Direito Financeiro | 2 |
| Direito Internacional | 2 |
| Direito Previdenciário | 2 |
| Direito Processual Penal Militar | 2 |
| Filosofia | 2 |
| Informática | 2 |
| Biologia | 1 |
| Direito Digital/LGPD | 1 |
| Física | 1 |
| Geografia | 1 |
| História | 1 |
| Química | 1 |
| Sociologia | 1 |

## Aceitação V2

- Relatórios V2 separados da V1: sim.
- Nenhuma migration criada: sim.
- Nenhum conteúdo pedagógico alterado/movido/excluído: sim.
- APKG não processado usa count null: sim.
- Leis contadas como entidades únicas: sim.
- CDC versus CTN documentado: sim.
