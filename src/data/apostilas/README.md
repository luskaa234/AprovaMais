# Apostilas - Biblioteca VemAprovar

## Modulos disponiveis (47 apostilas)

1. Portugues PMMA - Ortografia e Morfologia
2. Portugues PMMA - Interpretacao
3. Portugues PMMA - Sintaxe
4. Portugues Avancado
5. Direito Penal - Parte Geral
6. Direito Penal - Parte Geral Avancado
7. Direito Processual Penal
8. Direito Processual Civil
9. Direito Processual do Trabalho
10. Direito Processual Penal Militar
11. Direitos Humanos
12. Direitos Humanos Avancado
13. Legislacao Penal Especial
14. Legislacao Institucional PMMA
15. Legislacao Institucional PMMA Avancada
16. Direito Administrativo
17. Direito Administrativo Avancado
18. Direito Constitucional
19. Direito Constitucional Avancado
20. Direito Civil
21. Direito do Trabalho
22. Direito Tributario
23. Etica Profissional OAB
24. Direito Empresarial
25. Direito do Consumidor
26. ECA
27. Direito Ambiental
28. Filosofia do Direito
29. Direito Previdenciario
30. Direito Financeiro
31. Direito Eleitoral
32. Direito Internacional
33. Direito Digital, LGPD e Crimes Ciberneticos
34. Criminologia e Seguranca Publica Avancada
35. CTB - Codigo de Transito Brasileiro
36. Direito Penal Militar
37. Atualidades
38. Atualidades Avancada
39. Etica
40. Informatica
41. Informatica Avancada
42. Matematica Basica
43. Matematica e Raciocinio Logico Avancado
44. Raciocinio Logico
45. Redacao
46. Redacao para Concursos Policiais
47. TAF

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
