# Taxonomia oficial proposta

## Hierarquia

objective -> institution -> contest -> edition -> position -> phase -> discipline -> subject -> subtopic.

## Definicoes

- objective: vertical de estudo visivel ao aluno.
- institution: orgao ou entidade, como PMMA, OAB/FGV, INEP ou DETRAN.
- contest: concurso ou exame.
- edition: ano, banca e versao do certame.
- position: cargo.
- phase: fase ou etapa.
- discipline: materia academica/juridica/pedagogica.
- subject: assunto.
- subtopic: recorte menor.
- formato de conteudo: PDF, JS, JSON, APKG, TXT, imagem.
- tipo de conteudo: apostila, questao, prova, gabarito, lei, flashcard, mapa, simulado.
- origem: local, importado, oficial, autoral, extraido, mock.

## Nao sao objetivos

Nao identificado, generico, multiplos objetivos, desenvolvimento/plataforma, mock e teste.

## Nao sao disciplinas

Flashcards, mapas mentais, revisao, TAF, provas, biblioteca, apostilas, simulados, leis secas e IA.

## Alternativa 1 - taxonomia enxuta com 10 objetivos

Usar apenas objetivos com massa e clareza suficientes. Orgaos especificos ficam em institution/contest. Impacto: menor risco de mistura e filtro mais simples, mas exige metadados melhores.

## Alternativa 2 - taxonomia expandida com 12 objetivos

Mantem os 12 candidatos da V2. Impacto: segmentacao comercial mais direta, porem maior risco de duplicidade entre objetivo amplo e orgao especifico.

## Recomendacao

Nao escolher silenciosamente. Para MVP, preferir taxonomia enxuta no filtro central e preservar os 12 candidatos como aliases/institutions ate decisao humana.
