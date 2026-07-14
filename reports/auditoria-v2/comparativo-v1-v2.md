# Comparativo V1 x V2

| Métrica | V1 | V2 | Por que mudou |
| --- | --- | --- | --- |
| arquivos analisados | 1669 | 1669 | V2 preserva inventário bruto, mas separa classes de arquivo. |
| conteúdos pedagógicos reais | 1522 | 865 | V1 misturava código/assets; V2 só conta classes pedagógicas/container. |
| arquivos técnicos |  | 248 | V2 criou classe técnica separada. |
| objetivos reais | 18 | 12 | V2 exclui não identificado/desenvolvimento/genérico como objetivo. |
| concursos reais | 243 | 156 | V2 não usa title/nome indiscriminadamente. |
| disciplinas reais | 41 | 34 | V2 remove formatos como Flashcards/TAF/Revisão de disciplina. |
| assuntos reais | 500 | 161 | V2 remove labels técnicos e não usa filename automaticamente. |
| questões brutas | 16227 | 11115 | V2 extrai objetos reais de questão. |
| questões únicas |  | 2073 | V2 calcula hash normalizado por questão. |
| flashcards reais | 578 | 18824 | V2 conta pares frente/verso e APKG real. |
| mapas reais | 4 | 1110 | V2 conta unidades de mapa, não menções. |
| leis únicas | 47 | 11 | V2 agrupa arquivos meta/artigos/texto por entidade legal. |
| arquivos legais |  | 33 | V2 mantém também contagem de arquivos legais. |
| provas únicas |  | 49 | V2 separa PDF de prova lógica. |
| PDFs de provas/gabaritos | 1017 | 541 | V2 diferencia provas e gabaritos. |
| conectados diretamente | 1219 | 129 | V2 exige cadeia conteúdo -> export -> serviço/store -> página/rota. |
| apenas referenciados |  | 0 | Novo estado V2. |
| órfãos pedagógicos/local-only | 102 | 736 | V2 separa local-only de órfão e não mistura asset técnico. |
| mocks | 40 | 13 | V2 conta classe mock separada. |
| grupos de duplicatas | 21 | 6 | V2 conta grupos, não cada membro. |
| erros de codificação |  | gerado em erros-codificacao.md | V2 varre os relatórios gerados. |
