# Apostilas - Biblioteca VemAprovar

## Modulos disponiveis (128 apostilas)

1. Administracao Financeira Orcamentaria
2. Administracao Publica Gestao Publica
3. Arquivologia
4. Atendimento Publico Qualidade Servico Publico
5. Atualidades Avancada
6. Atualidades
7. Banco Repertorios Redacao
8. Banco Temas Redacao Policial
9. Biologia ENEM
10. Caderno Erros Inteligente
11. Ciencias Humanas Simulados
12. Ciencias Natureza Simulados
13. Comentarios Questoes IA
14. Contabilidade Publica Basica
15. Criminologia Seguranca Publica Avancada
16. Criminologia Simulados Comentados
17. CTB Codigo Transito Brasileiro
18. CTB Simulados Comentados
19. Direito Administrativo Avancado
20. Direito Administrativo
21. Direito Ambiental Avancado
22. Direito Ambiental
23. Direito Civil Avancado
24. Direito Civil
25. Direito Constitucional Avancado
26. Direito Constitucional
27. Direito Consumidor Avancado
28. Direito Consumidor
29. Direito Digital LGPD Avancado
30. Direito Digital LGPD Crimes Ciberneticos
31. Direito Eleitoral Avancado
32. Direito Eleitoral
33. Direito Empresarial Avancado
34. Direito Empresarial
35. Direito Financeiro Avancado
36. Direito Financeiro
37. Direito Internacional Avancado
38. Direito Internacional
39. Direito Penal Militar Avancado
40. Direito Penal Militar
41. Direito Penal Parte Especial Avancado
42. Direito Penal Parte Geral Avancado
43. Direito Penal Parte Geral
44. Direito Previdenciario Avancado
45. Direito Previdenciario
46. Direito Processual Civil Avancado
47. Direito Processual Civil
48. Direito Processual Penal Avancado
49. Direito Processual Penal Militar Avancado
50. Direito Processual Penal Militar
51. Direito Processual Penal
52. Direito Processual Trabalho Avancado
53. Direito Processual Trabalho
54. Direito Trabalho Avancado
55. Direito Trabalho
56. Direito Tributario Avancado
57. Direito Tributario
58. Direitos Humanos Atividade Policial Casos Praticos
59. Direitos Humanos Avancado
60. Direitos Humanos
61. ECA Avancado
62. ECA
63. Etica Profissional OAB
64. Etica
65. Filosofia Direito
66. Filosofia ENEM
67. Fisica ENEM
68. Flashcards Premium Disciplina
69. Geografia ENEM
70. Gestao Pessoas Servico Publico
71. Governanca Integridade Compliance Publico
72. Guarda Municipal Base De Estudos
73. Historia ENEM
74. Informatica Avancada
75. Informatica
76. Legislacao Institucional PMMA Avancada
77. Legislacao Institucional PMMA Simulados Comentados
78. Legislacao Institucional PMMA
79. Legislacao Penal Especial Avancada
80. Legislacao Penal Especial
81. Legislacao PMMA Questoes Por Artigo
82. Licitacoes Contratos Modulo Exclusivo
83. Linguagens ENEM
84. Mapas Mentais Textuais Disciplina
85. Matematica Basica
86. Matematica ENEM
87. Matematica Raciocinio Logico Avancado
88. OAB 1a Fase Direito Administrativo
89. OAB 1a Fase Direito Civil
90. OAB 1a Fase Direito Constitucional
91. OAB 1a Fase Direito Penal
92. OAB 1a Fase Etica Comentada
93. OAB 1a Fase Processo Civil
94. OAB 1a Fase Processo Penal
95. OAB 1a Fase Simulado Completo
96. OAB 1a Fase Trabalho Processo Trabalho
97. OAB 2a Fase Espelhos Correcao
98. OAB 2a Fase Pecas Praticas
99. OAB 2a Fase Treino Discursivas
100. Ordem Publica Defesa Social Seguranca Cidada
101. Organizacao Judiciaria
102. Plano Estudo Por Objetivo
103. PMMA Caderno De Erros Inteligente
104. PMMA Revisao De Vespera
105. PMMA Simulado Final Completo
106. Policia Comunitaria Mediacao Conflitos
107. Policia Penal Base De Estudos
108. Portugues Avancado
109. Portugues PMMA Interpretacao
110. Portugues PMMA Ortografia Morfologia
111. Portugues PMMA Sintaxe
112. PRF Base De Estudos
113. Quimica ENEM
114. Raciocinio Logico
115. Redacao Concursos Policiais
116. Redacao ENEM
117. Redacao
118. Regimentos Internos Tribunais
119. Revisao 24h Prova
120. Revisao 7 Dias Prova
121. Revisao ENEM Vespera
122. Seguranca Publica Avancada Simulados
123. Simulados Por Banca
124. Simulados Por Concurso
125. Simulados Por Nivel
126. Sociologia ENEM
127. TAF
128. Uso Diferenciado Da Forca Atuacao Policial

## Estrutura dos arquivos

Cada arquivo de apostila exporta um array de capitulos:

```javascript
export const nomeModulo = [
  {
    id: "identificador-capitulo",
    materialTitle: "Titulo do Material",
    subject: "Materia",
    contest: "Concurso",
    role: "Cargo",
    moduleTitle: "Titulo do Modulo",
    chapterIndex: 1,
    totalChapters: 10,
    title: "Titulo do Capitulo",
    assunto: "Assunto",
    tecnica: "Tecnica de estudo",
    competencia: "Competencia desenvolvida",
    dificuldade: "Facil|Media|Dificil",
    tempoLeituraMin: 8,
    tempoExercicioMin: 5,
    bancaRatings: { FGV: 4, CESPE: 5, FCC: 4, ENEM: 1 },
    termosChave: ["termo1", "termo2"],
    corpo: ["paragrafo1", "paragrafo2"],
    pontosChave: ["ponto1", "ponto2"],
    checkRapido: {
      pergunta: "Pergunta?",
      opcoes: ["a", "b", "c"],
      correta: 0,
      justificativa: "Explicacao"
    },
    oQueCobra: "Conteudo a ser cobrado",
    precisaSaberAntes: "Pre-requisitos",
    explicacao: [{ titulo: "Titulo", texto: "Explicacao" }],
    comoIdentificar: "Como reconhecer em provas",
    pegadinhas: ["pegadinha1"],
    resumoFrase: "Resumo em uma frase",
    proximoTitulo: "Proximo capitulo"
  }
];
```

## Como adicionar novas apostilas

1. Criar arquivo `nome-apostila.js` em `src/data/apostilas/`.
2. Exportar uma constante com o array de capitulos.
3. Importar em `src/data/apostilas/index.js`.
4. Adicionar a lista `apostilasBiblioteca` usando `buildApostila()`.

```javascript
import { novaApostila } from "./nova-apostila";

buildApostila("apostila-nova-apostila", novaApostila),
```

## Integracao com a biblioteca

Todos os modulos sao consumidos por:

- `src/pages/Biblioteca/ApostilaChapterReader.jsx`
- `src/data/apostilas/index.js`

Cada modulo aparece uma unica vez na biblioteca.
