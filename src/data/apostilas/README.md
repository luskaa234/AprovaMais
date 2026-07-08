# Apostilas - Biblioteca VemAprovar

## Modulos disponiveis (56 apostilas)

1. Portugues PMMA - Ortografia e Morfologia
2. Portugues PMMA - Interpretacao
3. Portugues PMMA - Sintaxe
4. Portugues Avancado
5. Direito Penal - Parte Geral
6. Direito Penal - Parte Geral Avancado
7. Direito Processual Penal
8. Direito Processual Penal Avancado
9. Direito Processual Civil
10. Direito Processual do Trabalho
11. Direito Processual Penal Militar
12. Direito Processual Penal Militar Avancado
13. Direitos Humanos
14. Direitos Humanos Avancado
15. Legislacao Penal Especial
16. Legislacao Penal Especial Avancada
17. Legislacao Institucional PMMA
18. Legislacao Institucional PMMA Avancada
19. Legislacao Institucional PMMA - Simulados Comentados
20. Direito Administrativo
21. Direito Administrativo Avancado
22. Direito Constitucional
23. Direito Constitucional Avancado
24. Direito Civil
25. Direito do Trabalho
26. Direito Tributario
27. Etica Profissional OAB
28. Direito Empresarial
29. Direito do Consumidor
30. ECA
31. Direito Ambiental
32. Filosofia do Direito
33. Direito Previdenciario
34. Direito Financeiro
35. Direito Eleitoral
36. Direito Internacional
37. Direito Digital, LGPD e Crimes Ciberneticos
38. Criminologia e Seguranca Publica Avancada
39. CTB - Codigo de Transito Brasileiro
40. Direito Penal Militar
41. Direito Penal Militar Avancado
42. Direito Penal - Parte Especial Avancado
43. Ordem Publica, Defesa Social e Seguranca Cidada
44. Policia Comunitaria e Mediacao de Conflitos
45. Uso Diferenciado da Forca e Atuacao Policial
46. Atualidades
47. Atualidades Avancada
48. Etica
49. Informatica
50. Informatica Avancada
51. Matematica Basica
52. Matematica e Raciocinio Logico Avancado
53. Raciocinio Logico
54. Redacao
55. Redacao para Concursos Policiais
56. TAF

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
