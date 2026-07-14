# Filtro por objetivo

Toda consulta pedagogica deve receber contexto de objetivo.

## Conceitos

- active_objective_id.
- objetivos permitidos.
- conteudo exclusivo.
- conteudo compartilhado.
- conteudo generico legitimo.
- excecoes administrativas.
- conteudo sem objetivo fica invisivel ao aluno.

## Servicos propostos

getActiveObjective(), buildObjectiveScope(), applyObjectiveFilter(), canAccessContent(), validateContentScope().

## Camadas

Banco/RLS, services, stores/contexts, paginas, busca, biblioteca, questoes, provas, flashcards, mapas, leis, plano de estudos e mentoria IA.

## Politicas Supabase propostas

Usuario autenticado le apenas conteudo publicado, no objetivo permitido e fora de quarentena. Admin ve tudo. Publico ve apenas publico. Premium exige plano ativo. Conteudo compartilhado exige regra explicita. Conteudo sem classificacao fica invisivel. Service role importa com logs.
