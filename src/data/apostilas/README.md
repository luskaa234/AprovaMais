# Apostilas - Biblioteca VemAprovar

## Modulos disponiveis (38 apostilas)

1. Portugues PMMA - Ortografia e Morfologia
2. Portugues PMMA - Interpretacao
3. Portugues PMMA - Sintaxe
4. Direito Penal - Parte Geral
5. Direito Processual Penal
6. Direito Processual Civil
7. Direito Processual do Trabalho
8. Direito Processual Penal Militar
9. Direitos Humanos
10. Legislacao Penal Especial
11. Legislacao Institucional PMMA
12. Legislacao Institucional PMMA Avancada
13. Direito Administrativo
14. Direito Constitucional
15. Direito Civil
16. Direito do Trabalho
17. Direito Tributario
18. Etica Profissional OAB
19. Direito Empresarial
20. Direito do Consumidor
21. ECA
22. Direito Ambiental
23. Filosofia do Direito
24. Direito Previdenciario
25. Direito Financeiro
26. Direito Eleitoral
27. Direito Internacional
28. Direito Digital, LGPD e Crimes Ciberneticos
29. Criminologia e Seguranca Publica Avancada
30. CTB - Codigo de Transito Brasileiro
31. Direito Penal Militar
32. Atualidades
33. Etica
34. Informatica
35. Matematica Basica
36. Raciocinio Logico
37. Redacao
38. TAF

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
