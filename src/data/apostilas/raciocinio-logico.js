/**
 * VemAprovar Top1 — Apostila Premium 10/10
 * Arquivo: raciocinio-logico.js
 * Módulo: Raciocínio Lógico para PMMA
 * Atualização pedagógica: 2026-07-07
 *
 * Foco: questões padrão 10/10 com 8 treinos por capítulo, alternativas comentadas,
 * diagnóstico por IA, armadilhas de banca e critérios de correção.
 */

export const raciocinioLogico = [
  {
    "id": "proposicoes-conectivos",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 1,
    "totalChapters": 10,
    "title": "Proposições e conectivos lógicos",
    "assunto": "Lógica proposicional",
    "tecnica": "Classificação do tipo de sentença lógica",
    "competencia": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 5,
      "FCC": 4,
      "ENEM": 2
    },
    "termosChave": [
      "proposição",
      "conectivo lógico",
      "valor lógico"
    ],
    "corpo": [
      "Proposição é toda sentença declarativa que pode ser julgada como verdadeira (V) ou falsa (F), nunca as duas coisas ao mesmo tempo — esse é o princípio do terceiro excluído, base de toda a lógica clássica. Frases exclamativas, interrogativas, imperativas ou que exprimem opinião subjetiva ('Que dia lindo!', 'Feche a porta', 'Este filme é bom') não são proposições, porque não têm valor lógico definido de forma objetiva.",
      "Proposições simples (ou atômicas) não contêm nenhum conectivo lógico — expressam uma única ideia ('Pedro é policial'). Proposições compostas (ou moleculares) combinam duas ou mais proposições simples por meio de conectivos. Os cinco conectivos fundamentais são: negação (não), conjunção (e), disjunção (ou), condicional (se... então) e bicondicional (se e somente se).",
      "Cada conectivo tem uma regra própria de atribuição de valor lógico ao resultado, que será estudada em detalhe na tabela-verdade (próximo capítulo) — por enquanto, o essencial é reconhecer qual conectivo está presente em uma frase e traduzi-la para a notação lógica (p, q, r... para as proposições simples; ∧ para 'e', ∨ para 'ou', → para 'se...então', ↔ para 'se e somente se', ~ para 'não')."
    ],
    "pontosChave": [
      "Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva.",
      "Proposição simples: uma ideia, sem conectivo. Proposição composta: duas ou mais proposições ligadas por conectivo.",
      "Cinco conectivos: negação (~), conjunção (∧, 'e'), disjunção (∨, 'ou'), condicional (→, 'se...então'), bicondicional (↔, 'se e somente se')."
    ],
    "checkRapido": {
      "pergunta": "Qual das frases abaixo é uma proposição lógica?",
      "opcoes": [
        "'Que horas são?'",
        "'O suspeito foi preso em flagrante.'",
        "'Corra até a viatura!'"
      ],
      "correta": 1,
      "justificativa": "Apenas 'O suspeito foi preso em flagrante' é uma sentença declarativa, que pode ser objetivamente julgada verdadeira ou falsa. Perguntas e ordens (imperativos) não têm valor lógico e, por isso, não são proposições."
    },
    "oQueCobra": "Identificar se uma frase é ou não uma proposição lógica, e reconhecer qual conectivo une proposições compostas.",
    "precisaSaberAntes": "Nenhum pré-requisito específico — é o ponto de partida da lógica proposicional.",
    "explicacao": [
      {
        "titulo": "Diferença entre 'ou' inclusivo e 'ou' exclusivo",
        "texto": "Na lógica formal, 'ou' (disjunção inclusiva, ∨) é verdadeiro quando pelo menos uma das partes é verdadeira, incluindo quando ambas são. 'Ou... ou' (disjunção exclusiva) exige que exatamente uma das partes seja verdadeira, nunca as duas ao mesmo tempo — bancas exploram essa diferença sutil entre 'ou' comum e 'ou exclusivo'."
      },
      {
        "titulo": "Sentenças abertas não são proposições",
        "texto": "Frases como 'x é maior que 5' não são proposições, porque seu valor lógico depende do valor de x (variável não determinada) — só se tornam proposições quando x recebe um valor específico ('7 é maior que 5', que é V)."
      }
    ],
    "comoIdentificar": "Questões que pedem para classificar frases como proposições (ou não), ou para traduzir uma frase composta em notação lógica.",
    "pegadinhas": [
      "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
      "Confundir 'ou' inclusivo (padrão) com 'ou exclusivo' ('ou... ou'), que tem regra de valor lógico diferente.",
      "Não perceber que uma sentença aberta (com variável) só vira proposição quando a variável é substituída por valor definido."
    ],
    "resumoFrase": "Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
    "proximoTitulo": "Tabela-verdade",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Proposições e conectivos lógicos\", a ideia principal é: Proposição é toda sentença declarativa que pode ser julgada como verdadeira (V) ou falsa (F), nunca as duas coisas ao mesmo tempo — esse é o princípio do terceiro excluído, base de toda a lógica clássica. Para estudar sem travar, guarde primeiro estas palavras-chave: proposição, conectivo lógico, valor lógico. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "proposição",
      "conectivo lógico",
      "valor lógico",
      "Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva.",
      "Proposição simples: uma ideia, sem conectivo. Proposição composta: duas ou mais proposições ligadas por conectivo."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Qual das frases abaixo é uma proposição lógica? Assinale a alternativa correta.",
        "alternativas": [
          "'Que horas são?'",
          "'Corra até a viatura!'",
          "'O suspeito foi preso em flagrante.'",
          "proposição",
          "conectivo lógico"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Apenas 'O suspeito foi preso em flagrante' é uma sentença declarativa, que pode ser objetivamente julgada verdadeira ou falsa. Perguntas e ordens (imperativos) não têm valor lógico e, por isso, não são proposições."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          }
        ],
        "comentario": "Apenas 'O suspeito foi preso em flagrante' é uma sentença declarativa, que pode ser objetivamente julgada verdadeira ou falsa. Perguntas e ordens (imperativos) não têm valor lógico e, por isso, não são proposições.",
        "armadilhaDaBanca": "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "porqueCaiEmProva": "Identificar se uma frase é ou não uma proposição lógica, e reconhecer qual conectivo une proposições compostas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "comentarioDetalhado": [
          "Ponto cobrado: Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições."
        ],
        "armadilhaDaBanca": "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "comentarioDetalhado": [
          "Armadilha explorada: Tratar pergunta retórica ou frase de opinião como proposição lógica.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva."
        ],
        "armadilhaDaBanca": "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Proposições e conectivos lógicos, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência."
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "armadilhaDaBanca": "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Proposições e conectivos lógicos?",
        "alternativas": [
          "Proposição",
          "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
          "Proposição simples",
          "Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
          "Reconhecer corretamente o termo-chave: proposição."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar pergunta retórica ou frase de opinião como proposição lógica."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "armadilhaDaBanca": "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Proposições e conectivos lógicos em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições. Pegadinha a evitar: Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "proposição",
          "conectivo lógico",
          "valor lógico",
          "Proposição sempre tem valor lógico único (V…",
          "perguntas"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Proposição simples\" e mostre por que \"'ou' inclusivo (padrão) e 'ou exclusivo' ('ou... ou'), que tem regra de valor lógico diferente. são conceitos equivalentes para fins de prova.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Proposição simples: uma ideia, sem conectivo. Proposição composta: duas ou mais proposições ligadas por conectivo.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir 'ou' inclusivo (padrão) com 'ou exclusivo' ('ou... ou'), que tem regra de valor lógico diferente.",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 1: Proposições e conectivos lógicos",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "proposição",
          "conectivo lógico",
          "valor lógico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "proposicoes-conectivos-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Proposições e conectivos lógicos, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Proposições e conectivos lógicos. Núcleo obrigatório: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.. Pegadinha obrigatória: Tratar pergunta retórica ou frase de opinião como proposição lógica.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Proposições e conectivos lógicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
      "Reconhecer como Proposições e conectivos lógicos aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Lógica proposicional."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Proposições e conectivos lógicos?",
        "verso": "Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: proposição",
        "verso": "proposição: Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva. Proposição simples: uma ideia, sem conectivo. Proposição composta: duas ou mais proposições ligadas por conectivo. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Proposições e conectivos lógicos",
        "verso": "Tratar pergunta retórica ou frase de opinião como proposição lógica. Revisão ampliada: em Proposições e conectivos lógicos, o aluno deve identificar Lógica proposicional, aplicar ao caso concreto, comparar com institutos próximos e justificar a resposta sem usar frase decorada.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Proposições e conectivos lógicos",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "proposição",
            "conectivo lógico",
            "valor lógico",
            "Proposição"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Identificar se uma frase é ou não uma proposição lógica, e reconhecer qual conectivo une proposições compostas.",
            "Questões que pedem para classificar frases como proposições (ou não), ou para traduzir uma frase composta em notação lógica."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Tratar pergunta retórica ou frase de opinião como proposição lógica.",
            "Confundir 'ou' inclusivo (padrão) com 'ou exclusivo' ('ou... ou'), que tem regra de valor lógico diferente.",
            "Não perceber que uma sentença aberta (com variável) só vira proposição quando a variável é substituída por valor definido."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Proposições e conectivos lógicos\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Proposições e conectivos lógicos para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Proposições e conectivos lógicos?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Lógica proposicional",
      "Proposições e conectivos lógicos",
      "proposição",
      "conectivo lógico",
      "valor lógico",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "proposicoes-conectivos-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer proposições lógicas e os cinco conectivos fundamentais",
        "enunciado": "Com base no capítulo \"Proposições e conectivos lógicos\", assinale a alternativa correta. Qual das frases abaixo é uma proposição lógica?",
        "alternativas": [
          "'Que horas são?'",
          "'O suspeito foi preso em flagrante.'",
          "'Corra até a viatura!'",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Apenas 'O suspeito foi preso em flagrante' é uma sentença declarativa, que pode ser objetivamente julgada verdadeira ou falsa. Perguntas e ordens (imperativos) não têm valor lógico e, por isso, não são proposições.",
        "comentarioDetalhado": [
          "Apenas 'O suspeito foi preso em flagrante' é uma sentença declarativa, que pode ser objetivamente julgada verdadeira ou falsa. Perguntas e ordens (imperativos) não têm valor lógico e, por isso, não são proposições.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: proposição, conectivo lógico, valor lógico, Proposição."
        ]
      },
      {
        "id": "proposicoes-conectivos-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Proposição: sentença declarativa com valor lógico único (V ou F) — nunca frases exclamativas, interrogativas ou de opinião subjetiva.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "proposicoes-conectivos-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Tratar pergunta retórica ou frase de opinião como proposição lógica.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Tratar pergunta retórica ou frase de opinião como proposição lógica.",
          "Forma correta de lembrar: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições."
        ]
      },
      {
        "id": "proposicoes-conectivos-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Proposições e conectivos lógicos\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "proposição",
          "conectivo lógico",
          "valor lógico",
          "Proposição",
          "Proposição simples"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "proposicoes-conectivos-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Proposições e conectivos lógicos\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Proposições e conectivos lógicos\", a ideia principal é: Proposição é toda sentença declarativa que pode ser julgada como verdadeira (V) ou falsa (F), nunca as duas coisas ao mesmo tempo — esse é o princípio do terceiro excluído, base de toda a lógica clássica. Para estudar sem travar, guarde primeiro estas palavras-chave: proposição, conectivo lógico, valor lógico. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Proposição sempre tem valor lógico único (V ou F) — perguntas, ordens e opiniões nunca são proposições.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "tabela-verdade",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 2,
    "totalChapters": 10,
    "title": "Tabela-verdade",
    "assunto": "Lógica proposicional",
    "tecnica": "Construção sistemática linha por linha",
    "competencia": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
    "dificuldade": "Média",
    "tempoLeituraMin": 8,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 5,
      "CESPE": 5,
      "FCC": 5,
      "ENEM": 2
    },
    "termosChave": [
      "tabela-verdade",
      "condicional",
      "bicondicional"
    ],
    "corpo": [
      "Tabela-verdade é a ferramenta que mostra todos os valores lógicos possíveis de uma proposição composta, a partir de todas as combinações de valores das proposições simples que a formam. Com n proposições simples, a tabela tem 2ⁿ linhas (com 2 proposições, 4 linhas; com 3, 8 linhas).",
      "Negação (~p) inverte o valor: se p é V, ~p é F, e vice-versa. Conjunção (p ∧ q) só é verdadeira quando as duas partes são verdadeiras — basta uma ser falsa para o todo ser falso ('e' é exigente). Disjunção (p ∨ q) só é falsa quando as duas partes são falsas — basta uma ser verdadeira para o todo ser verdadeiro ('ou' é mais fácil de satisfazer).",
      "Condicional (p → q) só é falsa em um único caso: quando o antecedente (p) é verdadeiro e o consequente (q) é falso — em todos os outros três casos, a condicional é verdadeira (inclusive quando o antecedente é falso, por mais estranho que pareça à intuição comum). Bicondicional (p ↔ q) é verdadeira quando as duas partes têm o mesmo valor lógico (ambas V ou ambas F), e falsa quando têm valores diferentes."
    ],
    "pontosChave": [
      "Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F.",
      "Condicional (→): só é F quando antecedente V e consequente F — em qualquer outro caso, é V.",
      "Bicondicional (↔): V quando os dois lados têm o mesmo valor (V-V ou F-F); F quando são diferentes."
    ],
    "checkRapido": {
      "pergunta": "Se a proposição 'Se chover, então o desfile será cancelado' tem o antecedente falso (não choveu) e o consequente também falso (o desfile não foi cancelado), o valor lógico da condicional é:",
      "opcoes": [
        "Falso",
        "Verdadeiro",
        "Indeterminado"
      ],
      "correta": 1,
      "justificativa": "A condicional só é falsa em um único caso: antecedente verdadeiro e consequente falso. Em todos os demais casos — incluindo antecedente falso e consequente falso — a condicional é considerada verdadeira, por convenção da lógica formal."
    },
    "oQueCobra": "Construir a tabela-verdade de uma proposição composta e determinar seu valor lógico final para uma combinação específica de valores.",
    "precisaSaberAntes": "Memorizar as quatro regras (negação, conjunção, disjunção, condicional, bicondicional) antes de tentar construir tabelas mais complexas.",
    "explicacao": [
      {
        "titulo": "O caso mais difícil de aceitar: condicional com antecedente falso",
        "texto": "Muita gente acha estranho que 'Se 2+2=5, então a Terra é redonda' seja considerada verdadeira pela lógica formal — mas a convenção é justamente essa: quando o antecedente é falso, a condicional não faz nenhuma afirmação sobre a relação real entre as partes, e por convenção é sempre tratada como verdadeira ('condicional com premissa falsa é sempre verdadeira, vacuamente')."
      },
      {
        "titulo": "Ordem de montagem da tabela",
        "texto": "Para montar a tabela de uma proposição composta, primeiro liste todas as combinações de V/F das proposições simples (metade V, metade F, alternando em blocos decrescentes de potência de 2), depois resolva os conectivos internos (parênteses) antes dos externos, coluna por coluna."
      }
    ],
    "comoIdentificar": "Questões que pedem para determinar o valor lógico final de uma proposição composta, dados os valores das proposições simples.",
    "pegadinhas": [
      "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
      "Confundir a regra da conjunção (exigente, precisa de ambas V) com a da disjunção (mais fácil, basta uma V).",
      "Errar a ordem de resolução em proposições com parênteses aninhados."
    ],
    "resumoFrase": "Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
    "proximoTitulo": "Equivalências lógicas e negação de proposições compostas",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Tabela-verdade\", a ideia principal é: Tabela-verdade é a ferramenta que mostra todos os valores lógicos possíveis de uma proposição composta, a partir de todas as combinações de valores das proposições simples que a formam. Para estudar sem travar, guarde primeiro estas palavras-chave: tabela-verdade, condicional, bicondicional. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "tabela-verdade",
      "condicional",
      "bicondicional",
      "Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F.",
      "Condicional (→): só é F quando antecedente V e consequente F — em qualquer outro caso, é V."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Se a proposição 'Se chover, então o desfile será cancelado' tem o antecedente falso (não choveu) e o consequente também falso (o desfile não foi cancelado), o valor lógico da condicional é: Assinale a alternativa correta.",
        "alternativas": [
          "Falso",
          "Indeterminado",
          "tabela-verdade",
          "condicional",
          "Verdadeiro"
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. A condicional só é falsa em um único caso: antecedente verdadeiro e consequente falso. Em todos os demais casos — incluindo antecedente falso e consequente falso — a condicional é considerada verdadeira, por convenção da lógica formal."
          }
        ],
        "comentario": "A condicional só é falsa em um único caso: antecedente verdadeiro e consequente falso. Em todos os demais casos — incluindo antecedente falso e consequente falso — a condicional é considerada verdadeira, por convenção da lógica formal.",
        "armadilhaDaBanca": "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "porqueCaiEmProva": "Construir a tabela-verdade de uma proposição composta e determinar seu valor lógico final para uma combinação específica de valores.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "comentarioDetalhado": [
          "Ponto cobrado: Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira."
        ],
        "armadilhaDaBanca": "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: condicional com antecedente falso é sempre falsa.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "comentarioDetalhado": [
          "Armadilha explorada: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F."
        ],
        "armadilhaDaBanca": "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Tabela-verdade, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "armadilhaDaBanca": "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Tabela-verdade?",
        "alternativas": [
          "Conjunção (∧, 'e')",
          "Condicional (→)",
          "Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
          "condicional com antecedente falso é sempre falsa.",
          "Reconhecer corretamente o termo-chave: tabela-verdade."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "armadilhaDaBanca": "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Tabela-verdade em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira. Pegadinha a evitar: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "tabela-verdade",
          "condicional",
          "bicondicional",
          "Condicional só é falsa com antecedente V e…",
          "em qualquer outro caso"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Condicional (→)\" e mostre por que \"a regra da conjunção (exigente, precisa de ambas V) e a da disjunção (mais fácil, basta uma V). são conceitos equivalentes para fins de prova.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Condicional (→): só é F quando antecedente V e consequente F — em qualquer outro caso, é V.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir a regra da conjunção (exigente, precisa de ambas V) com a da disjunção (mais fácil, basta uma V).",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 2: Tabela-verdade",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "assunto": "Lógica proposicional",
        "tags": [
          "Raciocínio Lógico",
          "Lógica proposicional",
          "tabela-verdade",
          "condicional",
          "bicondicional"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "tabela-verdade-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Tabela-verdade, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Tabela-verdade. Núcleo obrigatório: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.. Pegadinha obrigatória: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Tabela-verdade em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
      "Reconhecer como Tabela-verdade aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Lógica proposicional."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Tabela-verdade?",
        "verso": "Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: tabela-verdade",
        "verso": "tabela-verdade: Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F. Condicional (→): só é F quando antecedente V e consequente F — em qualquer outro caso, é V. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Tabela-verdade",
        "verso": "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Tabela-verdade",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "tabela-verdade",
            "condicional",
            "bicondicional",
            "Conjunção (∧, 'e')"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Construir a tabela-verdade de uma proposição composta e determinar seu valor lógico final para uma combinação específica de valores.",
            "Questões que pedem para determinar o valor lógico final de uma proposição composta, dados os valores das proposições simples."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
            "Confundir a regra da conjunção (exigente, precisa de ambas V) com a da disjunção (mais fácil, basta uma V).",
            "Errar a ordem de resolução em proposições com parênteses aninhados."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Tabela-verdade\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Tabela-verdade para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Tabela-verdade?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Lógica proposicional",
      "Tabela-verdade",
      "tabela-verdade",
      "condicional",
      "bicondicional",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "tabela-verdade-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Construir e interpretar tabelas-verdade dos cinco conectivos lógicos",
        "enunciado": "Com base no capítulo \"Tabela-verdade\", assinale a alternativa correta. Se a proposição 'Se chover, então o desfile será cancelado' tem o antecedente falso (não choveu) e o consequente também falso (o desfile não foi cancelado), o valor lógico da condicional é:",
        "alternativas": [
          "Falso",
          "Verdadeiro",
          "Indeterminado",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "A condicional só é falsa em um único caso: antecedente verdadeiro e consequente falso. Em todos os demais casos — incluindo antecedente falso e consequente falso — a condicional é considerada verdadeira, por convenção da lógica formal.",
        "comentarioDetalhado": [
          "A condicional só é falsa em um único caso: antecedente verdadeiro e consequente falso. Em todos os demais casos — incluindo antecedente falso e consequente falso — a condicional é considerada verdadeira, por convenção da lógica formal.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: tabela-verdade, condicional, bicondicional, Conjunção (∧, 'e')."
        ]
      },
      {
        "id": "tabela-verdade-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Conjunção (∧, 'e'): só V se ambas V. Disjunção (∨, 'ou'): só F se ambas F.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "tabela-verdade-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Condicional com antecedente falso é sempre falsa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Achar que condicional com antecedente falso é sempre falsa — é sempre verdadeira nesse caso.",
          "Forma correta de lembrar: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira."
        ]
      },
      {
        "id": "tabela-verdade-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Tabela-verdade\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "tabela-verdade",
          "condicional",
          "bicondicional",
          "Conjunção (∧, 'e')",
          "Condicional (→)"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "tabela-verdade-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Tabela-verdade\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Tabela-verdade\", a ideia principal é: Tabela-verdade é a ferramenta que mostra todos os valores lógicos possíveis de uma proposição composta, a partir de todas as combinações de valores das proposições simples que a formam. Para estudar sem travar, guarde primeiro estas palavras-chave: tabela-verdade, condicional, bicondicional. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Condicional só é falsa com antecedente V e consequente F — em qualquer outro caso, mesmo com antecedente falso, é sempre verdadeira.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "equivalencias-negacao",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 3,
    "totalChapters": 10,
    "title": "Equivalências lógicas e negação de proposições compostas",
    "assunto": "Equivalência lógica",
    "tecnica": "Aplicação das leis de De Morgan",
    "competencia": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
    "dificuldade": "Difícil",
    "tempoLeituraMin": 8,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 5,
      "CESPE": 5,
      "FCC": 5,
      "ENEM": 2
    },
    "termosChave": [
      "negação de conjunção",
      "negação de disjunção",
      "leis de De Morgan"
    ],
    "corpo": [
      "Duas proposições são logicamente equivalentes quando têm exatamente a mesma tabela-verdade — ou seja, assumem os mesmos valores V/F em todas as combinações possíveis das proposições simples. Esse conceito é a base para negar corretamente proposições compostas, um dos tópicos mais cobrados em prova.",
      "As Leis de De Morgan estabelecem como negar conjunção e disjunção: a negação de 'p e q' (~( p ∧ q)) é equivalente a 'não p ou não q' (~p ∨ ~q) — a negação 'abre' a conjunção em disjunção, negando cada parte. A negação de 'p ou q' (~(p ∨ q)) é equivalente a 'não p e não q' (~p ∧ ~q) — a negação 'fecha' a disjunção em conjunção, negando cada parte.",
      "A negação da condicional (~(p → q)) é equivalente a 'p e não q' (p ∧ ~q) — regra frequentemente esquecida: nega-se mantendo o antecedente afirmado e negando apenas o consequente. A condicional (p → q) é logicamente equivalente à sua contrapositiva (~q → ~p) — trocar e negar os dois termos preserva o valor lógico original, uma equivalência muito explorada em prova."
    ],
    "pontosChave": [
      "Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
      "Negação de 'se p então q' = 'p e não q' — mantém o antecedente, nega só o consequente.",
      "Condicional (p→q) é equivalente à contrapositiva (~q→~p) — mesmo valor lógico, sempre."
    ],
    "checkRapido": {
      "pergunta": "A negação de 'O suspeito confessou o crime e foi liberado' é:",
      "opcoes": [
        "O suspeito não confessou o crime e não foi liberado",
        "O suspeito não confessou o crime ou não foi liberado",
        "Se o suspeito confessou, então não foi liberado"
      ],
      "correta": 1,
      "justificativa": "Pela lei de De Morgan, a negação de uma conjunção ('e') vira uma disjunção ('ou') com cada parte negada: 'não confessou OU não foi liberado' — basta uma das duas partes ser falsa para a negação ser verdadeira, diferente de exigir que as duas sejam falsas ao mesmo tempo."
    },
    "oQueCobra": "Aplicar as leis de De Morgan e a regra de negação da condicional para negar corretamente proposições compostas.",
    "precisaSaberAntes": "Dominar bem as regras de valor lógico de conjunção, disjunção e condicional (capítulo anterior) antes de negar.",
    "explicacao": [
      {
        "titulo": "Negação do bicondicional",
        "texto": "A negação de 'p se e somente se q' (~(p ↔ q)) é equivalente a uma disjunção exclusiva entre p e q — ou seja, 'p e não q, ou não p e q' (exatamente uma das duas partes é verdadeira, não as duas juntas nem nenhuma delas)."
      },
      {
        "titulo": "Truque de memorização — 'e' vira 'ou' e vice-versa",
        "texto": "Regra prática: ao negar, o conectivo central sempre troca (e ↔ ou), e cada proposição simples dentro dele é individualmente negada. Só a condicional foge dessa troca direta, transformando-se em uma conjunção específica (mantém p, nega q)."
      }
    ],
    "comoIdentificar": "Questões que pedem 'a negação lógica da frase é...' ou 'qual afirmação é equivalente a...' testam diretamente esse conteúdo.",
    "pegadinhas": [
      "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
      "Negar os dois termos da condicional igualmente, esquecendo que o antecedente permanece afirmado na negação.",
      "Não reconhecer a equivalência entre condicional e contrapositiva como uma equivalência válida."
    ],
    "resumoFrase": "Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
    "proximoTitulo": "Argumentos válidos e silogismos",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Equivalências lógicas e negação de proposições compostas\", a ideia principal é: Duas proposições são logicamente equivalentes quando têm exatamente a mesma tabela-verdade — ou seja, assumem os mesmos valores V/F em todas as combinações possíveis das proposições simples. Para estudar sem travar, guarde primeiro estas palavras-chave: negação de conjunção, negação de disjunção, leis de De Morgan. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "negação de conjunção",
      "negação de disjunção",
      "leis de De Morgan",
      "Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
      "Negação de 'se p então q' = 'p e não q' — mantém o antecedente, nega só o consequente."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "A negação de 'O suspeito confessou o crime e foi liberado' é: Assinale a alternativa correta.",
        "alternativas": [
          "O suspeito não confessou o crime e não foi liberado",
          "O suspeito não confessou o crime ou não foi liberado",
          "Se o suspeito confessou, então não foi liberado",
          "negação de conjunção",
          "negação de disjunção"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Pela lei de De Morgan, a negação de uma conjunção ('e') vira uma disjunção ('ou') com cada parte negada: 'não confessou OU não foi liberado' — basta uma das duas partes ser falsa para a negação ser verdadeira, diferente de exigir que as duas sejam falsas ao…"
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          }
        ],
        "comentario": "Pela lei de De Morgan, a negação de uma conjunção ('e') vira uma disjunção ('ou') com cada parte negada: 'não confessou OU não foi liberado' — basta uma das duas partes ser falsa para a negação ser verdadeira, diferente de exigir que as duas sejam falsas ao mesmo tempo.",
        "armadilhaDaBanca": "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "porqueCaiEmProva": "Aplicar as leis de De Morgan e a regra de negação da condicional para negar corretamente proposições compostas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "comentarioDetalhado": [
          "Ponto cobrado: Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente."
        ],
        "armadilhaDaBanca": "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "comentarioDetalhado": [
          "Armadilha explorada: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan)."
        ],
        "armadilhaDaBanca": "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Equivalências lógicas e negação de proposições compostas, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "armadilhaDaBanca": "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Equivalências lógicas e negação de proposições compostas?",
        "alternativas": [
          "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
          "Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
          "Negação de 'se p então q' = 'p e não q'",
          "Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
          "Reconhecer corretamente o termo-chave: negação de conjunção."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e')."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "armadilhaDaBanca": "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Equivalências lógicas e negação de proposições compostas em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente. Pegadinha a evitar: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan",
          "Negar troca 'e' por 'ou' (e vice-versa)",
          "negando cada parte"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Negação de 'se p então q' = 'p e não q'\" e mostre por que \"Negar os dois termos da condicional igualmente, esquecendo que o antecedente permanece afirmado na negação.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Negação de 'se p então q' = 'p e não q' — mantém o antecedente, nega só o consequente.. A armadilha deve ser recusada porque distorce o conteúdo: Negar os dois termos da condicional igualmente, esquecendo que o antecedente permanece afirmado na negação.",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 3: Equivalências lógicas e negação de proposições compostas",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "assunto": "Equivalência lógica",
        "tags": [
          "Raciocínio Lógico",
          "Equivalência lógica",
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equivalencias-negacao-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Equivalências lógicas e negação de proposições compostas, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Equivalências lógicas e negação de proposições compostas. Núcleo obrigatório: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.. Pegadinha obrigatória: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equivalências lógicas e negação de proposições compostas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
      "Reconhecer como Equivalências lógicas e negação de proposições compostas aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Equivalência lógica."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Equivalências lógicas e negação de proposições compostas?",
        "verso": "Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: negação de conjunção",
        "verso": "negação de conjunção: Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan). Negação de 'se p então q' = 'p e não q' — mantém o antecedente, nega só o consequente. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Equivalências lógicas e negação de proposições compostas",
        "verso": "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Equivalências lógicas e negação de proposições compostas",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "negação de conjunção",
            "negação de disjunção",
            "leis de De Morgan",
            "Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan)."
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar as leis de De Morgan e a regra de negação da condicional para negar corretamente proposições compostas.",
            "Questões que pedem 'a negação lógica da frase é...' ou 'qual afirmação é equivalente a...' testam diretamente esse conteúdo."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
            "Negar os dois termos da condicional igualmente, esquecendo que o antecedente permanece afirmado na negação.",
            "Não reconhecer a equivalência entre condicional e contrapositiva como uma equivalência válida."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Equivalências lógicas e negação de proposições compostas\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Equivalências lógicas e negação de proposições compostas para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Equivalências lógicas e negação de proposições compostas?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Equivalência lógica",
      "Equivalências lógicas e negação de proposições compostas",
      "negação de conjunção",
      "negação de disjunção",
      "leis de De Morgan",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "equivalencias-negacao-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Negar corretamente proposições compostas e reconhecer equivalências lógicas",
        "enunciado": "Com base no capítulo \"Equivalências lógicas e negação de proposições compostas\", assinale a alternativa correta. A negação de 'O suspeito confessou o crime e foi liberado' é:",
        "alternativas": [
          "O suspeito não confessou o crime e não foi liberado",
          "O suspeito não confessou o crime ou não foi liberado",
          "Se o suspeito confessou, então não foi liberado",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Pela lei de De Morgan, a negação de uma conjunção ('e') vira uma disjunção ('ou') com cada parte negada: 'não confessou OU não foi liberado' — basta uma das duas partes ser falsa para a negação ser verdadeira, diferente de exigir que as duas sejam falsas ao mesmo tempo.",
        "comentarioDetalhado": [
          "Pela lei de De Morgan, a negação de uma conjunção ('e') vira uma disjunção ('ou') com cada parte negada: 'não confessou OU não foi liberado' — basta uma das duas partes ser falsa para a negação ser verdadeira, diferente de exigir que as duas sejam falsas ao mesmo tempo.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: negação de conjunção, negação de disjunção, leis de De Morgan, Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).."
        ]
      },
      {
        "id": "equivalencias-negacao-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "equivalencias-negacao-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Negar 'e' mantendo 'e' (deveria virar 'ou'), ou negar 'ou' mantendo 'ou' (deveria virar 'e').",
          "Forma correta de lembrar: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente."
        ]
      },
      {
        "id": "equivalencias-negacao-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Equivalências lógicas e negação de proposições compostas\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "negação de conjunção",
          "negação de disjunção",
          "leis de De Morgan",
          "Negação de 'p e q' = 'não p ou não q' (De Morgan). Negação de 'p ou q' = 'não p e não q' (De Morgan).",
          "Negação de 'se p então q' = 'p e não q'"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "equivalencias-negacao-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Equivalências lógicas e negação de proposições compostas\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Equivalências lógicas e negação de proposições compostas\", a ideia principal é: Duas proposições são logicamente equivalentes quando têm exatamente a mesma tabela-verdade — ou seja, assumem os mesmos valores V/F em todas as combinações possíveis das proposições simples. Para estudar sem travar, guarde primeiro estas palavras-chave: negação de conjunção, negação de disjunção, leis de De Morgan. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Negar troca 'e' por 'ou' (e vice-versa), negando cada parte — negar condicional mantém o antecedente e só nega o consequente.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "argumentos-validos-silogismos",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 4,
    "totalChapters": 10,
    "title": "Argumentos válidos e silogismos",
    "assunto": "Argumentação lógica",
    "tecnica": "Verificação da validade pela impossibilidade de premissas verdadeiras com conclusão falsa",
    "competencia": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
    "dificuldade": "Difícil",
    "tempoLeituraMin": 8,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 5,
      "FCC": 4,
      "ENEM": 2
    },
    "termosChave": [
      "modus ponens",
      "modus tollens",
      "argumento válido"
    ],
    "corpo": [
      "Um argumento é composto por premissas (afirmações dadas como ponto de partida) e uma conclusão (o que se pretende provar a partir delas). Um argumento é válido quando é impossível que todas as premissas sejam verdadeiras e a conclusão seja falsa ao mesmo tempo — repare que validade não depende do conteúdo ser verdadeiro na realidade, mas da estrutura lógica: se as premissas garantem logicamente a conclusão.",
      "Modus ponens é a regra de inferência mais básica: de 'se p então q' e 'p' (afirmação do antecedente), conclui-se 'q'. Modus tollens: de 'se p então q' e 'não q' (negação do consequente), conclui-se 'não p'. Ambas são formas válidas de argumento.",
      "Duas falácias muito exploradas em prova, que parecem válidas mas não são: afirmar o consequente (de 'se p então q' e 'q', concluir 'p' — inválido, pois q poderia ser verdadeiro por outra razão que não p) e negar o antecedente (de 'se p então q' e 'não p', concluir 'não q' — inválido, pelo mesmo motivo: q pode ser verdadeiro mesmo sem p)."
    ],
    "pontosChave": [
      "Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual.",
      "Modus ponens: (p→q), p ⊢ q. Modus tollens: (p→q), ~q ⊢ ~p. Ambos válidos.",
      "Afirmar o consequente e negar o antecedente são falácias — parecem válidas, mas não são."
    ],
    "checkRapido": {
      "pergunta": "Premissas: 'Se o suspeito é culpado, então ele mente no interrogatório' e 'O suspeito mentiu no interrogatório'. É válido concluir que 'o suspeito é culpado'?",
      "opcoes": [
        "Sim, é modus ponens válido",
        "Não, é a falácia de afirmar o consequente",
        "Sim, é modus tollens válido"
      ],
      "correta": 1,
      "justificativa": "A premissa afirma o consequente ('ele mente') em vez do antecedente — isso é a falácia de afirmar o consequente. O suspeito pode mentir por diversos outros motivos além da culpa, então a conclusão não é logicamente garantida pelas premissas."
    },
    "oQueCobra": "Avaliar se um argumento apresentado segue uma regra de inferência válida (modus ponens/tollens) ou uma falácia comum.",
    "precisaSaberAntes": "Ter fixado bem a regra da condicional (capítulo 2) antes de avaliar argumentos que a envolvem.",
    "explicacao": [
      {
        "titulo": "Silogismo categórico — outra estrutura clássica",
        "texto": "Silogismo categórico usa quantificadores (todo, algum, nenhum): 'Todo A é B; Todo B é C; logo, todo A é C' é válido. Mas 'Algum A é B; Algum B é C; logo, algum A é C' NÃO é válido — quantificadores particulares ('algum') não garantem a mesma transitividade dos universais ('todo')."
      },
      {
        "titulo": "Silogismo disjuntivo",
        "texto": "De 'p ou q' e 'não p', conclui-se validamente 'q' (e vice-versa) — é uma forma válida de argumento por eliminação, muito usada em questões que combinam disjunção com negação de uma das alternativas."
      }
    ],
    "comoIdentificar": "Questões que apresentam duas premissas e uma conclusão, pedindo para avaliar se o argumento é válido ou se comete alguma falácia.",
    "pegadinhas": [
      "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
      "Aplicar transitividade de silogismo categórico universal ('todo') a premissas com quantificador particular ('algum').",
      "Confundir modus ponens (afirma o antecedente, conclui o consequente) com modus tollens (nega o consequente, conclui a negação do antecedente)."
    ],
    "resumoFrase": "Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
    "proximoTitulo": "Diagramas lógicos e conjuntos",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Argumentos válidos e silogismos\", a ideia principal é: Um argumento é composto por premissas (afirmações dadas como ponto de partida) e uma conclusão (o que se pretende provar a partir delas). Para estudar sem travar, guarde primeiro estas palavras-chave: modus ponens, modus tollens, argumento válido. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "modus ponens",
      "modus tollens",
      "argumento válido",
      "Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual.",
      "Modus ponens: (p→q), p ⊢ q. Modus tollens: (p→q), ~q ⊢ ~p. Ambos válidos."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Premissas: 'Se o suspeito é culpado, então ele mente no interrogatório' e 'O suspeito mentiu no interrogatório'. É válido concluir que 'o suspeito é culpado'? Assinale a alternativa correta.",
        "alternativas": [
          "Sim, é modus ponens válido",
          "Sim, é modus tollens válido",
          "modus ponens",
          "modus tollens",
          "Não, é a falácia de afirmar o consequente"
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. A premissa afirma o consequente ('ele mente') em vez do antecedente — isso é a falácia de afirmar o consequente. O suspeito pode mentir por diversos outros motivos além da culpa, então a conclusão não é logicamente garantida pelas premissas."
          }
        ],
        "comentario": "A premissa afirma o consequente ('ele mente') em vez do antecedente — isso é a falácia de afirmar o consequente. O suspeito pode mentir por diversos outros motivos além da culpa, então a conclusão não é logicamente garantida pelas premissas.",
        "armadilhaDaBanca": "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "porqueCaiEmProva": "Avaliar se um argumento apresentado segue uma regra de inferência válida (modus ponens/tollens) ou uma falácia comum.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "comentarioDetalhado": [
          "Ponto cobrado: Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares."
        ],
        "armadilhaDaBanca": "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "comentarioDetalhado": [
          "Armadilha explorada: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual."
        ],
        "armadilhaDaBanca": "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Argumentos válidos e silogismos, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "armadilhaDaBanca": "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Argumentos válidos e silogismos?",
        "alternativas": [
          "Argumento válido",
          "Modus ponens",
          "Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
          "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
          "Reconhecer corretamente o termo-chave: modus ponens."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "armadilhaDaBanca": "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Argumentos válidos e silogismos em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares. Pegadinha a evitar: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "modus ponens",
          "modus tollens",
          "argumento válido",
          "Modus ponens e modus tollens são válidos",
          "afirmar o consequente e negar o antecedente…"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Modus ponens\" e mostre por que \"Aplicar transitividade de silogismo categórico universal ('todo') a premissas com quantificador particular ('algum').\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Modus ponens: (p→q), p ⊢ q. Modus tollens: (p→q), ~q ⊢ ~p. Ambos válidos.. A armadilha deve ser recusada porque distorce o conteúdo: Aplicar transitividade de silogismo categórico universal ('todo') a premissas com quantificador particular ('algum').",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 4: Argumentos válidos e silogismos",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "assunto": "Argumentação lógica",
        "tags": [
          "Raciocínio Lógico",
          "Argumentação lógica",
          "modus ponens",
          "modus tollens",
          "argumento válido"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "argumentos-validos-silogismos-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Argumentos válidos e silogismos, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Argumentos válidos e silogismos. Núcleo obrigatório: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.. Pegadinha obrigatória: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Argumentos válidos e silogismos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
      "Reconhecer como Argumentos válidos e silogismos aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Argumentação lógica."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Argumentos válidos e silogismos?",
        "verso": "Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: modus ponens",
        "verso": "modus ponens: Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual. Modus ponens: (p→q), p ⊢ q. Modus tollens: (p→q), ~q ⊢ ~p. Ambos válidos. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Argumentos válidos e silogismos",
        "verso": "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente. Revisão ampliada: em Argumentos válidos e silogismos, o aluno deve identificar Argumentação lógica, aplicar ao caso concreto, comparar com institutos próximos e justificar a resposta sem usar frase decorada.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Argumentos válidos e silogismos",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "modus ponens",
            "modus tollens",
            "argumento válido",
            "Argumento válido"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Avaliar se um argumento apresentado segue uma regra de inferência válida (modus ponens/tollens) ou uma falácia comum.",
            "Questões que apresentam duas premissas e uma conclusão, pedindo para avaliar se o argumento é válido ou se comete alguma falácia."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
            "Aplicar transitividade de silogismo categórico universal ('todo') a premissas com quantificador particular ('algum').",
            "Confundir modus ponens (afirma o antecedente, conclui o consequente) com modus tollens (nega o consequente, conclui a negação do antecedente)."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Argumentos válidos e silogismos\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Argumentos válidos e silogismos para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Argumentos válidos e silogismos?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Argumentação lógica",
      "Argumentos válidos e silogismos",
      "modus ponens",
      "modus tollens",
      "argumento válido",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "argumentos-validos-silogismos-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Avaliar a validade de argumentos e reconhecer as principais regras de inferência",
        "enunciado": "Com base no capítulo \"Argumentos válidos e silogismos\", assinale a alternativa correta. Premissas: 'Se o suspeito é culpado, então ele mente no interrogatório' e 'O suspeito mentiu no interrogatório'. É válido concluir que 'o suspeito é culpado'?",
        "alternativas": [
          "Sim, é modus ponens válido",
          "Não, é a falácia de afirmar o consequente",
          "Sim, é modus tollens válido",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "A premissa afirma o consequente ('ele mente') em vez do antecedente — isso é a falácia de afirmar o consequente. O suspeito pode mentir por diversos outros motivos além da culpa, então a conclusão não é logicamente garantida pelas premissas.",
        "comentarioDetalhado": [
          "A premissa afirma o consequente ('ele mente') em vez do antecedente — isso é a falácia de afirmar o consequente. O suspeito pode mentir por diversos outros motivos além da culpa, então a conclusão não é logicamente garantida pelas premissas.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: modus ponens, modus tollens, argumento válido, Argumento válido."
        ]
      },
      {
        "id": "argumentos-validos-silogismos-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Argumento válido: impossível ter todas as premissas verdadeiras e a conclusão falsa — é sobre estrutura, não sobre verdade factual.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "argumentos-validos-silogismos-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Aceitar como válida a falácia de afirmar o consequente ou negar o antecedente.",
          "Forma correta de lembrar: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares."
        ]
      },
      {
        "id": "argumentos-validos-silogismos-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Argumentos válidos e silogismos\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "modus ponens",
          "modus tollens",
          "argumento válido",
          "Argumento válido",
          "Modus ponens"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "argumentos-validos-silogismos-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Argumentos válidos e silogismos\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Argumentos válidos e silogismos\", a ideia principal é: Um argumento é composto por premissas (afirmações dadas como ponto de partida) e uma conclusão (o que se pretende provar a partir delas). Para estudar sem travar, guarde primeiro estas palavras-chave: modus ponens, modus tollens, argumento válido. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Modus ponens e modus tollens são válidos; afirmar o consequente e negar o antecedente são falácias — nunca confunda os dois pares.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "diagramas-logicos-conjuntos",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 5,
    "totalChapters": 10,
    "title": "Diagramas lógicos e conjuntos",
    "assunto": "Teoria dos conjuntos aplicada",
    "tecnica": "Representação visual com diagramas de Venn",
    "competencia": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 5,
      "ENEM": 3
    },
    "termosChave": [
      "diagrama de Venn",
      "interseção",
      "união de conjuntos"
    ],
    "corpo": [
      "Diagramas de Venn representam visualmente conjuntos e suas relações (união, interseção, diferença, complemento), facilitando a resolução de problemas que envolvem grupos de pessoas ou itens com características sobrepostas — muito comum em questões do tipo 'quantas pessoas praticam apenas um esporte, quantas praticam os dois, quantas não praticam nenhum'.",
      "A fórmula fundamental para dois conjuntos é: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) — o número de elementos na união é a soma dos dois conjuntos, subtraindo a interseção (que, senão, seria contada duas vezes). Para três conjuntos, a fórmula se expande: n(A∪B∪C) = n(A)+n(B)+n(C) - n(A∩B) - n(A∩C) - n(B∩C) + n(A∩B∩C) — a tripla interseção é somada de volta, porque foi subtraída três vezes nas interseções duplas.",
      "A estratégia mais segura para resolver esses problemas é sempre montar o diagrama de dentro para fora: primeiro preencha a interseção de todos os conjuntos (o centro), depois as interseções duplas (subtraindo o que já foi preenchido no centro), depois as regiões exclusivas de cada conjunto (subtraindo tudo que já foi preenchido em cada círculo)."
    ],
    "pontosChave": [
      "Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B).",
      "Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção.",
      "Estratégia segura: preencher o diagrama de dentro para fora, começando pela interseção mais interna."
    ],
    "checkRapido": {
      "pergunta": "Em um batalhão, 40 policiais fazem musculação, 30 fazem corrida, e 15 fazem as duas atividades. Quantos fazem pelo menos uma das duas?",
      "opcoes": [
        "70",
        "55",
        "85"
      ],
      "correta": 1,
      "justificativa": "Aplicando a fórmula n(A∪B) = n(A) + n(B) - n(A∩B): 40 + 30 - 15 = 55. Sem subtrair a interseção, os 15 que fazem as duas atividades seriam contados duas vezes."
    },
    "oQueCobra": "Aplicar a fórmula de união de conjuntos (dois ou três conjuntos) para resolver problemas de sobreposição de grupos.",
    "precisaSaberAntes": "Entender os conceitos básicos de conjunto, interseção e união.",
    "explicacao": [
      {
        "titulo": "'Apenas A' x 'A e B' — cuidado com a interpretação do enunciado",
        "texto": "'Fazem musculação e corrida' geralmente se refere à interseção (quem faz as duas). 'Fazem apenas musculação' se refere à região exclusiva do conjunto A (musculação menos a interseção com corrida) — bancas adoram testar se o candidato confunde 'apenas' com o total do conjunto."
      },
      {
        "titulo": "Elementos que não pertencem a nenhum conjunto",
        "texto": "Se o problema informa o total do universo (ex.: total de policiais do batalhão) e pede quantos não praticam nenhuma das atividades, calcule: total do universo menos n(A∪B) — a região do diagrama fora de todos os círculos."
      }
    ],
    "comoIdentificar": "Questões que descrevem grupos com características sobrepostas (esportes, idiomas, preferências) e pedem quantidades específicas testam esse conteúdo.",
    "pegadinhas": [
      "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
      "Confundir 'apenas A' (região exclusiva) com 'A' (conjunto inteiro, incluindo a interseção).",
      "Na fórmula de três conjuntos, esquecer de somar de volta a interseção tripla depois de subtrair as duplas."
    ],
    "resumoFrase": "União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
    "proximoTitulo": "Sequências lógicas: números e figuras",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Diagramas lógicos e conjuntos\", a ideia principal é: Diagramas de Venn representam visualmente conjuntos e suas relações (união, interseção, diferença, complemento), facilitando a resolução de problemas que envolvem grupos de pessoas ou itens com características sobrepostas — muito comum em questões do tipo. Para estudar sem travar, guarde primeiro estas palavras-chave: diagrama de Venn, interseção, união de conjuntos. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "diagrama de Venn",
      "interseção",
      "união de conjuntos",
      "Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B).",
      "Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Em um batalhão, 40 policiais fazem musculação, 30 fazem corrida, e 15 fazem as duas atividades. Quantos fazem pelo menos uma das duas? Assinale a alternativa correta.",
        "alternativas": [
          "70",
          "85",
          "55",
          "diagrama de Venn",
          "interseção"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Aplicando a fórmula n(A∪B) = n(A) + n(B) - n(A∩B): 40 + 30 - 15 = 55. Sem subtrair a interseção, os 15 que fazem as duas atividades seriam contados duas vezes."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          }
        ],
        "comentario": "Aplicando a fórmula n(A∪B) = n(A) + n(B) - n(A∩B): 40 + 30 - 15 = 55. Sem subtrair a interseção, os 15 que fazem as duas atividades seriam contados duas vezes.",
        "armadilhaDaBanca": "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "porqueCaiEmProva": "Aplicar a fórmula de união de conjuntos (dois ou três conjuntos) para resolver problemas de sobreposição de grupos.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B).",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "comentarioDetalhado": [
          "Ponto cobrado: Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B).",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro."
        ],
        "armadilhaDaBanca": "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "comentarioDetalhado": [
          "Armadilha explorada: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B)."
        ],
        "armadilhaDaBanca": "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Diagramas lógicos e conjuntos, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência."
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "armadilhaDaBanca": "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Diagramas lógicos e conjuntos?",
        "alternativas": [
          "Fórmula de dois conjuntos",
          "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
          "Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção.",
          "União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
          "Reconhecer corretamente o termo-chave: diagrama de Venn."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "armadilhaDaBanca": "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Diagramas lógicos e conjuntos em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro. Pegadinha a evitar: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "diagrama de Venn",
          "interseção",
          "união de conjuntos",
          "União de dois conjuntos sempre subtrai a…",
          "'apenas A' nunca é o mesmo que o conjunto A…"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção.\" e mostre por que \"'apenas A' (região exclusiva) e 'A' (conjunto inteiro, incluindo a interseção). são conceitos equivalentes para fins de prova.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir 'apenas A' (região exclusiva) com 'A' (conjunto inteiro, incluindo a interseção).",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 5: Diagramas lógicos e conjuntos",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "assunto": "Teoria dos conjuntos aplicada",
        "tags": [
          "Raciocínio Lógico",
          "Teoria dos conjuntos aplicada",
          "diagrama de Venn",
          "interseção",
          "união de conjuntos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "diagramas-logicos-conjuntos-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Diagramas lógicos e conjuntos, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Diagramas lógicos e conjuntos. Núcleo obrigatório: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.. Pegadinha obrigatória: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Diagramas lógicos e conjuntos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
      "Reconhecer como Diagramas lógicos e conjuntos aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Teoria dos conjuntos aplicada."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Diagramas lógicos e conjuntos?",
        "verso": "União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: diagrama de Venn",
        "verso": "diagrama de Venn: Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B). Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Diagramas lógicos e conjuntos",
        "verso": "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Diagramas lógicos e conjuntos",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "diagrama de Venn",
            "interseção",
            "união de conjuntos",
            "Fórmula de dois conjuntos"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar a fórmula de união de conjuntos (dois ou três conjuntos) para resolver problemas de sobreposição de grupos.",
            "Questões que descrevem grupos com características sobrepostas (esportes, idiomas, preferências) e pedem quantidades específicas testam esse conteúdo."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
            "Confundir 'apenas A' (região exclusiva) com 'A' (conjunto inteiro, incluindo a interseção).",
            "Na fórmula de três conjuntos, esquecer de somar de volta a interseção tripla depois de subtrair as duplas."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Diagramas lógicos e conjuntos\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Diagramas lógicos e conjuntos para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Diagramas lógicos e conjuntos?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Teoria dos conjuntos aplicada",
      "Diagramas lógicos e conjuntos",
      "diagrama de Venn",
      "interseção",
      "união de conjuntos",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "diagramas-logicos-conjuntos-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Resolver problemas de conjuntos usando diagramas de Venn e a fórmula da união",
        "enunciado": "Com base no capítulo \"Diagramas lógicos e conjuntos\", assinale a alternativa correta. Em um batalhão, 40 policiais fazem musculação, 30 fazem corrida, e 15 fazem as duas atividades. Quantos fazem pelo menos uma das duas?",
        "alternativas": [
          "70",
          "55",
          "85",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Aplicando a fórmula n(A∪B) = n(A) + n(B) - n(A∩B): 40 + 30 - 15 = 55. Sem subtrair a interseção, os 15 que fazem as duas atividades seriam contados duas vezes.",
        "comentarioDetalhado": [
          "Aplicando a fórmula n(A∪B) = n(A) + n(B) - n(A∩B): 40 + 30 - 15 = 55. Sem subtrair a interseção, os 15 que fazem as duas atividades seriam contados duas vezes.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: diagrama de Venn, interseção, união de conjuntos, Fórmula de dois conjuntos."
        ]
      },
      {
        "id": "diagramas-logicos-conjuntos-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B).",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Fórmula de dois conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B).",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "diagramas-logicos-conjuntos-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Esquecer de subtrair a interseção na fórmula da união, contando elementos em comum duas vezes.",
          "Forma correta de lembrar: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro."
        ]
      },
      {
        "id": "diagramas-logicos-conjuntos-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Diagramas lógicos e conjuntos\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "diagrama de Venn",
          "interseção",
          "união de conjuntos",
          "Fórmula de dois conjuntos",
          "Fórmula de três conjuntos soma os três, subtrai as interseções duplas, soma de volta a tripla interseção."
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "diagramas-logicos-conjuntos-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Diagramas lógicos e conjuntos\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Diagramas lógicos e conjuntos\", a ideia principal é: Diagramas de Venn representam visualmente conjuntos e suas relações (união, interseção, diferença, complemento), facilitando a resolução de problemas que envolvem grupos de pessoas ou itens com características sobrepostas — muito comum em questões do tipo. Para estudar sem travar, guarde primeiro estas palavras-chave: diagrama de Venn, interseção, união de conjuntos. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: União de dois conjuntos sempre subtrai a interseção uma vez; 'apenas A' nunca é o mesmo que o conjunto A inteiro.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "sequencias-logicas",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 6,
    "totalChapters": 10,
    "title": "Sequências lógicas: números e figuras",
    "assunto": "Sequências e padrões",
    "tecnica": "Teste sistemático de diferenças, razões e padrões alternados",
    "competencia": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "sequência numérica",
      "padrão alternado",
      "diferença entre termos"
    ],
    "corpo": [
      "Questões de sequência lógica pedem para identificar o padrão que rege uma série de números ou figuras e prever o próximo elemento. A primeira coisa a testar é sempre a diferença entre termos consecutivos: se a diferença é constante, é uma progressão aritmética; se a razão (divisão entre termos consecutivos) é constante, é uma progressão geométrica.",
      "Quando a diferença entre termos não é constante, teste se as próprias diferenças formam um padrão (diferença das diferenças) — muito comum em sequências que crescem de forma acelerada, como quadrados perfeitos (1, 4, 9, 16... diferenças 3, 5, 7, aumentando de 2 em 2). Outro padrão frequente é a sequência com dois padrões alternados intercalados (posições ímpares seguem uma regra, posições pares seguem outra).",
      "Em sequências de figuras, observe separadamente cada elemento visual que pode variar: posição/rotação, quantidade de elementos, cor/preenchimento, tamanho — normalmente cada um desses aspectos segue seu próprio padrão cíclico ou progressivo, e a resposta correta precisa satisfazer todos os padrões simultaneamente, não apenas um deles isoladamente."
    ],
    "pontosChave": [
      "Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
      "Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares).",
      "Em figuras, cada aspecto visual (posição, quantidade, cor) pode seguir seu próprio padrão — verifique todos simultaneamente."
    ],
    "checkRapido": {
      "pergunta": "Qual o próximo número da sequência: 2, 6, 12, 20, 30, ___?",
      "opcoes": [
        "36",
        "40",
        "42"
      ],
      "correta": 2,
      "justificativa": "As diferenças entre os termos são 4, 6, 8, 10 (aumentando de 2 em 2) — a próxima diferença é 12, então 30 + 12 = 42. (Nota: essa sequência corresponde a n×(n+1), com n=1,2,3,4,5,6: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.)"
    },
    "oQueCobra": "Identificar o padrão correto de uma sequência (aritmético, geométrico, ou de segunda ordem) e aplicá-lo para prever o próximo termo.",
    "precisaSaberAntes": "Reconhecer progressão aritmética (diferença constante) e progressão geométrica (razão constante) — conteúdo de matemática básica.",
    "explicacao": [
      {
        "titulo": "Quando testar 'diferença das diferenças'",
        "texto": "Se a primeira diferença entre termos não é constante, calcule a diferença entre essas diferenças — se essa segunda diferença for constante, a sequência é regida por uma função quadrática (padrão muito comum em provas, ligado a sequências como quadrados perfeitos ou termos do tipo n²+n)."
      },
      {
        "titulo": "Sequências alternadas — dica de identificação",
        "texto": "Se nenhum padrão simples parece se encaixar olhando a sequência inteira, separe os termos em duas subsequências (posições ímpares: 1ª, 3ª, 5ª...; posições pares: 2ª, 4ª, 6ª...) e teste o padrão em cada uma isoladamente — é comum haver duas PAs ou PGs diferentes intercaladas."
      }
    ],
    "comoIdentificar": "Questões que apresentam uma sequência incompleta e pedem o próximo termo, seguido ou não de alternativas de resposta.",
    "pegadinhas": [
      "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
      "Não considerar a possibilidade de padrão alternado (duas subsequências intercaladas).",
      "Em figuras, focar em só um aspecto visual (ex.: rotação) e ignorar outro que também muda (ex.: quantidade de elementos)."
    ],
    "resumoFrase": "Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
    "proximoTitulo": "Problemas de verdades e mentiras",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Sequências lógicas: números e figuras\", a ideia principal é: Questões de sequência lógica pedem para identificar o padrão que rege uma série de números ou figuras e prever o próximo elemento. Para estudar sem travar, guarde primeiro estas palavras-chave: sequência numérica, padrão alternado, diferença entre termos. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "sequência numérica",
      "padrão alternado",
      "diferença entre termos",
      "Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
      "Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares)."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Qual o próximo número da sequência: 2, 6, 12, 20, 30, ___? Assinale a alternativa correta.",
        "alternativas": [
          "36",
          "40",
          "sequência numérica",
          "42",
          "padrão alternado"
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. As diferenças entre os termos são 4, 6, 8, 10 (aumentando de 2 em 2) — a próxima diferença é 12, então 30 + 12 = 42. (Nota: essa sequência corresponde a n×(n+1), com n=1,2,3,4,5,6: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.)"
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          }
        ],
        "comentario": "As diferenças entre os termos são 4, 6, 8, 10 (aumentando de 2 em 2) — a próxima diferença é 12, então 30 + 12 = 42. (Nota: essa sequência corresponde a n×(n+1), com n=1,2,3,4,5,6: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.)",
        "armadilhaDaBanca": "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "porqueCaiEmProva": "Identificar o padrão correto de uma sequência (aritmético, geométrico, ou de segunda ordem) e aplicá-lo para prever o próximo termo.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "comentarioDetalhado": [
          "Ponto cobrado: Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados."
        ],
        "armadilhaDaBanca": "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "comentarioDetalhado": [
          "Armadilha explorada: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos."
        ],
        "armadilhaDaBanca": "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Sequências lógicas: números e figuras, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "armadilhaDaBanca": "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Sequências lógicas: números e figuras?",
        "alternativas": [
          "Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
          "Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares).",
          "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
          "Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
          "Reconhecer corretamente o termo-chave: sequência numérica."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "armadilhaDaBanca": "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Sequências lógicas: números e figuras em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados. Pegadinha a evitar: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos",
          "Teste diferença constante",
          "depois razão constante"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares).\" e mostre por que \"Não considerar a possibilidade de padrão alternado (duas subsequências intercaladas).\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares).. A armadilha deve ser recusada porque distorce o conteúdo: Não considerar a possibilidade de padrão alternado (duas subsequências intercaladas).",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 6: Sequências lógicas: números e figuras",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "assunto": "Sequências e padrões",
        "tags": [
          "Raciocínio Lógico",
          "Sequências e padrões",
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sequencias-logicas-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Sequências lógicas: números e figuras, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Sequências lógicas: números e figuras. Núcleo obrigatório: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.. Pegadinha obrigatória: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sequências lógicas: números e figuras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
      "Reconhecer como Sequências lógicas: números e figuras aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Sequências e padrões."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Sequências lógicas: números e figuras?",
        "verso": "Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: sequência numérica",
        "verso": "sequência numérica: Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos. Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares). Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Sequências lógicas: números e figuras",
        "verso": "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Sequências lógicas: números e figuras",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "sequência numérica",
            "padrão alternado",
            "diferença entre termos",
            "Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos."
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Identificar o padrão correto de uma sequência (aritmético, geométrico, ou de segunda ordem) e aplicá-lo para prever o próximo termo.",
            "Questões que apresentam uma sequência incompleta e pedem o próximo termo, seguido ou não de alternativas de resposta."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
            "Não considerar a possibilidade de padrão alternado (duas subsequências intercaladas).",
            "Em figuras, focar em só um aspecto visual (ex.: rotação) e ignorar outro que também muda (ex.: quantidade de elementos)."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Sequências lógicas: números e figuras\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Sequências lógicas: números e figuras para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Sequências lógicas: números e figuras?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Sequências e padrões",
      "Sequências lógicas: números e figuras",
      "sequência numérica",
      "padrão alternado",
      "diferença entre termos",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "sequencias-logicas-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Identificar o padrão de uma sequência numérica ou de figuras e prever o próximo termo",
        "enunciado": "Com base no capítulo \"Sequências lógicas: números e figuras\", assinale a alternativa correta. Qual o próximo número da sequência: 2, 6, 12, 20, 30, ___?",
        "alternativas": [
          "36",
          "40",
          "42",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 2,
        "comentario": "As diferenças entre os termos são 4, 6, 8, 10 (aumentando de 2 em 2) — a próxima diferença é 12, então 30 + 12 = 42. (Nota: essa sequência corresponde a n×(n+1), com n=1,2,3,4,5,6: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.)",
        "comentarioDetalhado": [
          "As diferenças entre os termos são 4, 6, 8, 10 (aumentando de 2 em 2) — a próxima diferença é 12, então 30 + 12 = 42. (Nota: essa sequência corresponde a n×(n+1), com n=1,2,3,4,5,6: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.)",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: sequência numérica, padrão alternado, diferença entre termos, Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.."
        ]
      },
      {
        "id": "sequencias-logicas-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "sequencias-logicas-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Não testar a diferença das diferenças quando a primeira diferença não é constante, desistindo cedo demais do padrão.",
          "Forma correta de lembrar: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados."
        ]
      },
      {
        "id": "sequencias-logicas-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Sequências lógicas: números e figuras\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "sequência numérica",
          "padrão alternado",
          "diferença entre termos",
          "Teste primeiro a diferença constante (PA) e a razão constante (PG) entre termos consecutivos.",
          "Se não for constante, teste a diferença das diferenças, ou padrões alternados (posições ímpares x pares)."
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "sequencias-logicas-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Sequências lógicas: números e figuras\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Sequências lógicas: números e figuras\", a ideia principal é: Questões de sequência lógica pedem para identificar o padrão que rege uma série de números ou figuras e prever o próximo elemento. Para estudar sem travar, guarde primeiro estas palavras-chave: sequência numérica, padrão alternado, diferença entre termos. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Teste diferença constante, depois razão constante, depois diferença das diferenças — e sempre considere padrões alternados intercalados.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "verdades-e-mentiras",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 7,
    "totalChapters": 10,
    "title": "Problemas de verdades e mentiras",
    "assunto": "Lógica de verdades e mentiras",
    "tecnica": "Teste de hipóteses por suposição e verificação de consistência",
    "competencia": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
    "dificuldade": "Difícil",
    "tempoLeituraMin": 8,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "testemunha que sempre mente",
      "testemunha que sempre fala a verdade",
      "teste de hipótese"
    ],
    "corpo": [
      "Nesse tipo de problema, cada personagem é classificado como alguém que sempre fala a verdade ou alguém que sempre mente — não existe meio-termo, e essa é a regra que resolve tudo. A técnica mais eficiente e segura, sem exceção, é o teste de hipóteses: suponha que um personagem específico é o 'verdadeiro' (ou o 'mentiroso'), veja quais consequências isso gera nas afirmações dos demais, e verifique se tudo permanece consistente.",
      "Se a suposição gerar uma contradição (por exemplo, o suposto mentiroso acabaria dizendo uma verdade, ou vice-versa), essa hipótese está errada, e você testa a hipótese alternativa. Em problemas com poucos personagens (2 ou 3), normalmente basta testar uma ou duas hipóteses até encontrar a única consistente com todas as afirmações dadas.",
      "Uma armadilha clássica: uma pessoa que sempre mente, ao ser perguntada sobre algo verdadeiro, sempre nega; e ao ser perguntada sobre algo falso, sempre afirma o oposto (ou seja, afirma algo falso como se fosse verdade). É crucial aplicar essa regra consistentemente a cada afirmação feita pelo personagem suposto mentiroso, não apenas à primeira frase dele."
    ],
    "pontosChave": [
      "Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema.",
      "Técnica de resolução: suponha uma hipótese, teste a consistência de todas as afirmações; se gerar contradição, teste a hipótese oposta.",
      "Mentiroso nega o que é verdadeiro e afirma o que é falso — aplique essa regra a TODAS as frases dele, não só à primeira."
    ],
    "checkRapido": {
      "pergunta": "A diz: 'B mente'. B diz: 'A e eu somos ambos mentirosos'. Sabendo que cada um sempre mente ou sempre fala a verdade, quem é o mentiroso?",
      "opcoes": [
        "Apenas A",
        "Apenas B",
        "Ambos são mentirosos"
      ],
      "correta": 1,
      "justificativa": "Suponha que B fala a verdade: então 'A e eu somos ambos mentirosos' seria verdade, o que significa que B é mentiroso — mas isso contradiz a suposição de que B fala a verdade. Logo, B mente. Como B mente, a afirmação dele ('ambos são mentirosos') é falsa — ou seja, não é verdade que ambos mentem, então A fala a verdade. Conferindo: A disse 'B mente', o que é verdade (compatível com A falar a verdade). Consistente: A é verdadeiro, B é mentiroso."
    },
    "oQueCobra": "Aplicar o método de teste de hipóteses para determinar quem, entre os personagens, mente e quem fala a verdade.",
    "precisaSaberAntes": "Ter fixado bem a negação de proposições (capítulo 3), já que o mentiroso sempre nega o valor lógico real da afirmação.",
    "explicacao": [
      {
        "titulo": "Por que começar sempre pela afirmação mais 'autorreferente'",
        "texto": "Afirmações em que um personagem fala sobre si mesmo (ou sobre si e outro) tendem a gerar contradição mais rápido quando testadas — é estrategicamente mais eficiente começar o teste de hipótese por essas frases autorreferentes, em vez de afirmações que só falam de terceiros."
      },
      {
        "titulo": "Problemas com 'pelo menos um mente' ou 'pelo menos um fala a verdade'",
        "texto": "Variações desse tipo de problema trazem frases quantificadas ('pelo menos um de nós mente') em vez de identificar diretamente quem mente — a técnica continua a mesma (testar hipóteses), mas exige atenção redobrada para verificar se a hipótese satisfaz a condição quantificada em jogo."
      }
    ],
    "comoIdentificar": "Questões que descrevem personagens fazendo afirmações uns sobre os outros, identificados como sempre verdadeiros ou sempre mentirosos.",
    "pegadinhas": [
      "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
      "Não testar a hipótese alternativa quando a primeira gera contradição, parando a resolução no meio.",
      "Confundir 'pelo menos um mente' com 'exatamente um mente' — são condições diferentes."
    ],
    "resumoFrase": "Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
    "proximoTitulo": "Problemas com calendários e datas",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Problemas de verdades e mentiras\", a ideia principal é: Nesse tipo de problema, cada personagem é classificado como alguém que sempre fala a verdade ou alguém que sempre mente — não existe meio-termo, e essa é a regra que resolve tudo. Para estudar sem travar, guarde primeiro estas palavras-chave: testemunha que sempre mente, testemunha que sempre fala a verdade, teste de hipótese. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "testemunha que sempre mente",
      "testemunha que sempre fala a verdade",
      "teste de hipótese",
      "Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema.",
      "Técnica de resolução: suponha uma hipótese, teste a consistência de todas as afirmações; se gerar contradição, teste a hipótese oposta."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "A diz: 'B mente'. B diz: 'A e eu somos ambos mentirosos'. Sabendo que cada um sempre mente ou sempre fala a verdade, quem é o mentiroso? Assinale a alternativa correta.",
        "alternativas": [
          "Apenas A",
          "Ambos são mentirosos",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "Apenas B"
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Suponha que B fala a verdade: então 'A e eu somos ambos mentirosos' seria verdade, o que significa que B é mentiroso — mas isso contradiz a suposição de que B fala a verdade. Logo, B mente. Como B mente, a afirmação dele ('ambos são mentirosos') é falsa — ou…"
          }
        ],
        "comentario": "Suponha que B fala a verdade: então 'A e eu somos ambos mentirosos' seria verdade, o que significa que B é mentiroso — mas isso contradiz a suposição de que B fala a verdade. Logo, B mente. Como B mente, a afirmação dele ('ambos são mentirosos') é falsa — ou seja, não é verdade que ambos mentem, então A fala a verdade. Conferindo: A disse 'B mente', o que é verdade (compatível com A falar a verdade). Consistente: A é verdadeiro, B é mentiroso.",
        "armadilhaDaBanca": "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "porqueCaiEmProva": "Aplicar o método de teste de hipóteses para determinar quem, entre os personagens, mente e quem fala a verdade.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "comentarioDetalhado": [
          "Ponto cobrado: Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele."
        ],
        "armadilhaDaBanca": "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "comentarioDetalhado": [
          "Armadilha explorada: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema."
        ],
        "armadilhaDaBanca": "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Problemas de verdades e mentiras, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "armadilhaDaBanca": "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Problemas de verdades e mentiras?",
        "alternativas": [
          "Cada personagem é sempre verdadeiro ou sempre mentiroso",
          "Técnica de resolução",
          "Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
          "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
          "Reconhecer corretamente o termo-chave: testemunha que sempre mente."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "armadilhaDaBanca": "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Problemas de verdades e mentiras em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele. Pegadinha a evitar: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese",
          "Teste hipóteses sistematicamente",
          "se gerar contradição"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Técnica de resolução\" e mostre por que \"Não testar a hipótese alternativa quando a primeira gera contradição, parando a resolução no meio.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Técnica de resolução: suponha uma hipótese, teste a consistência de todas as afirmações; se gerar contradição, teste a hipótese oposta.. A armadilha deve ser recusada porque distorce o conteúdo: Não testar a hipótese alternativa quando a primeira gera contradição, parando a resolução no meio.",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 7: Problemas de verdades e mentiras",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "assunto": "Lógica de verdades e mentiras",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de verdades e mentiras",
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "verdades-e-mentiras-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Problemas de verdades e mentiras, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Problemas de verdades e mentiras. Núcleo obrigatório: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.. Pegadinha obrigatória: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas de verdades e mentiras em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
      "Reconhecer como Problemas de verdades e mentiras aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Lógica de verdades e mentiras."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Problemas de verdades e mentiras?",
        "verso": "Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: testemunha que sempre mente",
        "verso": "testemunha que sempre mente: Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema. Técnica de resolução: suponha uma hipótese, teste a consistência de todas as afirmações; se gerar contradição, teste a hipótese oposta. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Problemas de verdades e mentiras",
        "verso": "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Problemas de verdades e mentiras",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "testemunha que sempre mente",
            "testemunha que sempre fala a verdade",
            "teste de hipótese",
            "Cada personagem é sempre verdadeiro ou sempre mentiroso"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar o método de teste de hipóteses para determinar quem, entre os personagens, mente e quem fala a verdade.",
            "Questões que descrevem personagens fazendo afirmações uns sobre os outros, identificados como sempre verdadeiros ou sempre mentirosos."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
            "Não testar a hipótese alternativa quando a primeira gera contradição, parando a resolução no meio.",
            "Confundir 'pelo menos um mente' com 'exatamente um mente' — são condições diferentes."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Problemas de verdades e mentiras\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Problemas de verdades e mentiras para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Problemas de verdades e mentiras?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Lógica de verdades e mentiras",
      "Problemas de verdades e mentiras",
      "testemunha que sempre mente",
      "testemunha que sempre fala a verdade",
      "teste de hipótese",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "verdades-e-mentiras-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Resolver problemas em que personagens dizem sempre a verdade ou sempre mentem",
        "enunciado": "Com base no capítulo \"Problemas de verdades e mentiras\", assinale a alternativa correta. A diz: 'B mente'. B diz: 'A e eu somos ambos mentirosos'. Sabendo que cada um sempre mente ou sempre fala a verdade, quem é o mentiroso?",
        "alternativas": [
          "Apenas A",
          "Apenas B",
          "Ambos são mentirosos",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Suponha que B fala a verdade: então 'A e eu somos ambos mentirosos' seria verdade, o que significa que B é mentiroso — mas isso contradiz a suposição de que B fala a verdade. Logo, B mente. Como B mente, a afirmação dele ('ambos são mentirosos') é falsa — ou seja, não é verdade que ambos mentem, então A fala a verdade. Conferindo: A disse 'B mente', o que é verdade (compatível com A falar a verdade). Consistente: A é verdadeiro, B é mentiroso.",
        "comentarioDetalhado": [
          "Suponha que B fala a verdade: então 'A e eu somos ambos mentirosos' seria verdade, o que significa que B é mentiroso — mas isso contradiz a suposição de que B fala a verdade. Logo, B mente. Como B mente, a afirmação dele ('ambos são mentirosos') é falsa — ou seja, não é verdade que ambos mentem, então A fala a verdade. Conferindo: A disse 'B mente', o que é verdade (compatível com A falar a verdade). Consistente: A é verdadeiro, B é mentiroso.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: testemunha que sempre mente, testemunha que sempre fala a verdade, teste de hipótese, Cada personagem é sempre verdadeiro ou sempre mentiroso."
        ]
      },
      {
        "id": "verdades-e-mentiras-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Cada personagem é sempre verdadeiro ou sempre mentiroso — nunca varia dentro do mesmo problema.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "verdades-e-mentiras-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Aplicar a regra do mentiroso apenas à primeira afirmação dele, esquecendo de negar TODAS as frases que ele disser.",
          "Forma correta de lembrar: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele."
        ]
      },
      {
        "id": "verdades-e-mentiras-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Problemas de verdades e mentiras\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "testemunha que sempre mente",
          "testemunha que sempre fala a verdade",
          "teste de hipótese",
          "Cada personagem é sempre verdadeiro ou sempre mentiroso",
          "Técnica de resolução"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "verdades-e-mentiras-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Problemas de verdades e mentiras\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Problemas de verdades e mentiras\", a ideia principal é: Nesse tipo de problema, cada personagem é classificado como alguém que sempre fala a verdade ou alguém que sempre mente — não existe meio-termo, e essa é a regra que resolve tudo. Para estudar sem travar, guarde primeiro estas palavras-chave: testemunha que sempre mente, testemunha que sempre fala a verdade, teste de hipótese. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Teste hipóteses sistematicamente; se gerar contradição, descarte e teste a oposta — aplique a regra do mentiroso a TODAS as frases dele.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "problemas-calendarios",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 8,
    "totalChapters": 10,
    "title": "Problemas com calendários e datas",
    "assunto": "Lógica de calendário",
    "tecnica": "Cálculo de resto na divisão por 7",
    "competencia": "Determinar o dia da semana de uma data a partir de uma data de referência",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 2
    },
    "termosChave": [
      "dia da semana",
      "resto da divisão por 7",
      "ano bissexto"
    ],
    "corpo": [
      "Problemas de calendário pedem para descobrir o dia da semana de uma data, a partir de outra data conhecida como referência. A técnica central é simples: como a semana tem 7 dias, o padrão se repete a cada 7 dias corridos — então, para saber quantas posições 'andar' no calendário, basta calcular quantos dias separam as duas datas e tirar o resto da divisão desse total por 7.",
      "Se o resto for 0, o dia da semana é o mesmo da data de referência. Se o resto for r (diferente de 0), conta-se r dias da semana a partir do dia de referência (para datas futuras) ou volta-se r dias (para datas passadas, com atenção ao sentido da contagem).",
      "Ano bissexto é fundamental nesses cálculos: ocorre a cada 4 anos, exceto em anos múltiplos de 100 que não sejam também múltiplos de 400 (2000 foi bissexto, mas 1900 e 2100 não são) — em ano bissexto, fevereiro tem 29 dias em vez de 28, o que precisa ser somado corretamente ao contar dias entre datas que atravessam um mês de fevereiro bissexto."
    ],
    "pontosChave": [
      "A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7.",
      "Resto 0 = mesmo dia da semana; resto r = conte r dias a partir da referência, no sentido correto (futuro ou passado).",
      "Ano bissexto (múltiplo de 4, exceto múltiplos de 100 não múltiplos de 400) tem fevereiro com 29 dias — soma um dia a mais na contagem."
    ],
    "checkRapido": {
      "pergunta": "Se hoje é quarta-feira, que dia da semana será daqui a 17 dias?",
      "opcoes": [
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
      ],
      "correta": 2,
      "justificativa": "17 dividido por 7 dá resto 3 (7×2=14, sobram 3). Contando 3 dias a partir de quarta-feira: +1 = quinta, +2 = sexta, +3 = sábado. Portanto, daqui a 17 dias será sábado."
    },
    "oQueCobra": "Calcular corretamente o resto da divisão do total de dias por 7 e aplicar essa contagem ao dia da semana de referência.",
    "precisaSaberAntes": "Saber a quantidade de dias de cada mês e identificar corretamente anos bissextos.",
    "explicacao": [
      {
        "titulo": "Contando dias entre datas com meses de durações diferentes",
        "texto": "Ao calcular a diferença de dias entre duas datas em meses diferentes, some os dias restantes do primeiro mês, os dias completos dos meses intermediários (usando 28/29, 30 ou 31 conforme o mês), e os dias já passados no mês final — erros de contagem geralmente vêm de esquecer a variação de dias entre os meses."
      },
      {
        "titulo": "Sentido da contagem: futuro x passado",
        "texto": "Para datas futuras, ande para frente no calendário (segunda, terça, quarta...). Para datas passadas, ande para trás (segunda, domingo, sábado...) — inverter o sentido da contagem por descuido é o erro mais comum nesse tipo de questão."
      }
    ],
    "comoIdentificar": "Questões que fornecem uma data com dia da semana conhecido e pedem o dia da semana de outra data, futura ou passada.",
    "pegadinhas": [
      "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
      "Esquecer de considerar o dia 29 de fevereiro em ano bissexto ao contar a diferença total de dias.",
      "Errar a regra de bissexto em anos de virada de século (1900 não é bissexto, mas 2000 é)."
    ],
    "resumoFrase": "Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
    "proximoTitulo": "Associação lógica: quadros de relacionamento",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Problemas com calendários e datas\", a ideia principal é: Problemas de calendário pedem para descobrir o dia da semana de uma data, a partir de outra data conhecida como referência. Para estudar sem travar, guarde primeiro estas palavras-chave: dia da semana, resto da divisão por 7, ano bissexto. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "dia da semana",
      "resto da divisão por 7",
      "ano bissexto",
      "A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7.",
      "Resto 0 = mesmo dia da semana; resto r = conte r dias a partir da referência, no sentido correto (futuro ou passado)."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Se hoje é quarta-feira, que dia da semana será daqui a 17 dias? Assinale a alternativa correta.",
        "alternativas": [
          "Quinta-feira",
          "Sábado",
          "Sexta-feira",
          "dia da semana",
          "resto da divisão por 7"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. 17 dividido por 7 dá resto 3 (7×2=14, sobram 3). Contando 3 dias a partir de quarta-feira: +1 = quinta, +2 = sexta, +3 = sábado. Portanto, daqui a 17 dias será sábado."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          }
        ],
        "comentario": "17 dividido por 7 dá resto 3 (7×2=14, sobram 3). Contando 3 dias a partir de quarta-feira: +1 = quinta, +2 = sexta, +3 = sábado. Portanto, daqui a 17 dias será sábado.",
        "armadilhaDaBanca": "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "porqueCaiEmProva": "Calcular corretamente o resto da divisão do total de dias por 7 e aplicar essa contagem ao dia da semana de referência.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "comentarioDetalhado": [
          "Ponto cobrado: A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto."
        ],
        "armadilhaDaBanca": "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "comentarioDetalhado": [
          "Armadilha explorada: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7."
        ],
        "armadilhaDaBanca": "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Problemas com calendários e datas, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "armadilhaDaBanca": "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Problemas com calendários e datas?",
        "alternativas": [
          "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
          "A semana se repete a cada 7 dias",
          "Resto 0 = mesmo dia da semana",
          "Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido…",
          "Reconhecer corretamente o termo-chave: dia da semana."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "armadilhaDaBanca": "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Problemas com calendários e datas em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto. Pegadinha a evitar: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto",
          "Calcule o total de dias entre as datas",
          "tire o resto da divisão por 7"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Resto 0 = mesmo dia da semana\" e mostre por que \"Esquecer de considerar o dia 29 de fevereiro em ano bissexto ao contar a diferença total de dias.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Resto 0 = mesmo dia da semana; resto r = conte r dias a partir da referência, no sentido correto (futuro ou passado).. A armadilha deve ser recusada porque distorce o conteúdo: Esquecer de considerar o dia 29 de fevereiro em ano bissexto ao contar a diferença total de dias.",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 8: Problemas com calendários e datas",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "assunto": "Lógica de calendário",
        "tags": [
          "Raciocínio Lógico",
          "Lógica de calendário",
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "problemas-calendarios-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Problemas com calendários e datas, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Problemas com calendários e datas. Núcleo obrigatório: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.. Pegadinha obrigatória: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Problemas com calendários e datas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Determinar o dia da semana de uma data a partir de uma data de referência",
      "Reconhecer como Problemas com calendários e datas aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Lógica de calendário."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Problemas com calendários e datas?",
        "verso": "Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: dia da semana",
        "verso": "dia da semana: A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7. Resto 0 = mesmo dia da semana; resto r = conte r dias a partir da referência, no sentido correto (futuro ou passado). Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Problemas com calendários e datas",
        "verso": "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Problemas com calendários e datas",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "dia da semana",
            "resto da divisão por 7",
            "ano bissexto",
            "A semana se repete a cada 7 dias"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Calcular corretamente o resto da divisão do total de dias por 7 e aplicar essa contagem ao dia da semana de referência.",
            "Questões que fornecem uma data com dia da semana conhecido e pedem o dia da semana de outra data, futura ou passada."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
            "Esquecer de considerar o dia 29 de fevereiro em ano bissexto ao contar a diferença total de dias.",
            "Errar a regra de bissexto em anos de virada de século (1900 não é bissexto, mas 2000 é)."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Problemas com calendários e datas\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Problemas com calendários e datas para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Problemas com calendários e datas?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Lógica de calendário",
      "Problemas com calendários e datas",
      "dia da semana",
      "resto da divisão por 7",
      "ano bissexto",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "problemas-calendarios-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Determinar o dia da semana de uma data a partir de uma data de referência",
        "enunciado": "Com base no capítulo \"Problemas com calendários e datas\", assinale a alternativa correta. Se hoje é quarta-feira, que dia da semana será daqui a 17 dias?",
        "alternativas": [
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 2,
        "comentario": "17 dividido por 7 dá resto 3 (7×2=14, sobram 3). Contando 3 dias a partir de quarta-feira: +1 = quinta, +2 = sexta, +3 = sábado. Portanto, daqui a 17 dias será sábado.",
        "comentarioDetalhado": [
          "17 dividido por 7 dá resto 3 (7×2=14, sobram 3). Contando 3 dias a partir de quarta-feira: +1 = quinta, +2 = sexta, +3 = sábado. Portanto, daqui a 17 dias será sábado.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: dia da semana, resto da divisão por 7, ano bissexto, A semana se repete a cada 7 dias."
        ]
      },
      {
        "id": "problemas-calendarios-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: A semana se repete a cada 7 dias — calcule a diferença total de dias entre as datas e tire o resto da divisão por 7.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "problemas-calendarios-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Contar o sentido errado (andar para frente quando deveria andar para trás, ou vice-versa).",
          "Forma correta de lembrar: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto."
        ]
      },
      {
        "id": "problemas-calendarios-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Problemas com calendários e datas\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "dia da semana",
          "resto da divisão por 7",
          "ano bissexto",
          "A semana se repete a cada 7 dias",
          "Resto 0 = mesmo dia da semana"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "problemas-calendarios-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Problemas com calendários e datas\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Problemas com calendários e datas\", a ideia principal é: Problemas de calendário pedem para descobrir o dia da semana de uma data, a partir de outra data conhecida como referência. Para estudar sem travar, guarde primeiro estas palavras-chave: dia da semana, resto da divisão por 7, ano bissexto. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Calcule o total de dias entre as datas, tire o resto da divisão por 7, e conte esse resto a partir do dia conhecido — sempre no sentido correto.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "associacao-logica",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 9,
    "totalChapters": 10,
    "title": "Associação lógica: quadros de relacionamento",
    "assunto": "Problemas de associação",
    "tecnica": "Construção de tabela cruzada e eliminação sistemática",
    "competencia": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
    "dificuldade": "Difícil",
    "tempoLeituraMin": 8,
    "tempoExercicioMin": 7,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 5,
      "ENEM": 3
    },
    "termosChave": [
      "tabela cruzada",
      "eliminação lógica",
      "associação um-para-um"
    ],
    "corpo": [
      "Problemas de associação lógica apresentam um conjunto de pessoas (ou itens) e um conjunto de características (profissão, cor, cargo, cidade), com pistas que relacionam parcialmente uns aos outros — a tarefa é descobrir a associação completa e correta entre cada pessoa e cada característica, uma relação um-para-um.",
      "A ferramenta mais eficiente é a tabela cruzada: linhas representam um conjunto (pessoas), colunas representam o outro (características), e você marca X (impossível) ou ✓ (confirmado) em cada célula, conforme as pistas vão sendo processadas. Cada pista elimina possibilidades diretamente (ex.: 'João não mora em Fortaleza' marca X na célula João-Fortaleza) ou indiretamente, por eliminação de outras opções.",
      "A técnica de resolução segue esta ordem: primeiro marque diretamente tudo que as pistas afirmam ou negam explicitamente; depois, aplique a lógica de exclusão — se uma pessoa só pode ter uma característica de um conjunto, e todas as outras já foram descartadas para ela, a única restante é confirmada; use essa nova confirmação para eliminar essa característica das demais pessoas na mesma coluna, e repita o processo até preencher toda a tabela."
    ],
    "pontosChave": [
      "Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista.",
      "Cada associação é um-para-um: se uma pessoa é confirmada com uma característica, essa característica é eliminada para todas as demais pessoas.",
      "Processe as pistas diretas primeiro, depois use eliminação lógica repetidamente até fechar toda a tabela."
    ],
    "checkRapido": {
      "pergunta": "Três policiais (Ana, Bruno, Carla) trabalham em turnos diferentes (manhã, tarde, noite). Sabe-se que Ana não trabalha de manhã, e Bruno não trabalha à noite nem de manhã. Qual o turno de Bruno?",
      "opcoes": [
        "Manhã",
        "Tarde",
        "Noite"
      ],
      "correta": 1,
      "justificativa": "Bruno não trabalha de manhã nem à noite — por eliminação, só resta a tarde para ele. (E, com essa informação, também se conclui que Ana trabalha à noite, já que não trabalha de manhã e a tarde já está ocupada por Bruno — restando a manhã para Carla, por eliminação final.)"
    },
    "oQueCobra": "Aplicar sistematicamente a eliminação lógica em uma tabela cruzada para determinar a associação correta entre pessoas e características.",
    "precisaSaberAntes": "Ter paciência e método — não existe atalho, é preciso processar as pistas de forma ordenada e sistemática.",
    "explicacao": [
      {
        "titulo": "Quando há mais de duas categorias por pessoa",
        "texto": "Problemas mais complexos associam cada pessoa a duas ou mais características simultâneas (cargo E cidade E cor do carro, por exemplo) — nesse caso, é preciso usar múltiplas tabelas cruzadas (pessoa x cargo, pessoa x cidade, cargo x cidade), e as conclusões de uma tabela podem alimentar deduções nas outras."
      },
      {
        "titulo": "Pistas condicionais dentro do problema",
        "texto": "Algumas pistas vêm em forma condicional ('se Ana trabalha de manhã, então Bruno trabalha à tarde') — nesses casos, pode ser necessário testar hipóteses (como no capítulo de verdades e mentiras) além da eliminação direta, combinando as duas técnicas."
      }
    ],
    "comoIdentificar": "Questões que descrevem um conjunto de pessoas com características a associar, fornecendo pistas parciais sobre quem tem o quê.",
    "pegadinhas": [
      "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
      "Não processar todas as pistas disponíveis antes de tentar 'adivinhar' a resposta.",
      "Em problemas com múltiplas categorias, esquecer de cruzar as conclusões entre as diferentes tabelas."
    ],
    "resumoFrase": "Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
    "proximoTitulo": "Análise combinatória e probabilidade lógica básica",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Associação lógica: quadros de relacionamento\", a ideia principal é: Problemas de associação lógica apresentam um conjunto de pessoas (ou itens) e um conjunto de características (profissão, cor, cargo, cidade), com pistas que relacionam parcialmente uns aos outros — a tarefa é descobrir a associação completa e correta entre cada pessoa e cada característica, uma relação um-para-um. Para estudar sem travar, guarde primeiro estas palavras-chave: tabela cruzada, eliminação lógica, associação um-para-um. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "tabela cruzada",
      "eliminação lógica",
      "associação um-para-um",
      "Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista.",
      "Cada associação é um-para-um: se uma pessoa é confirmada com uma característica, essa característica é eliminada para todas as demais pessoas."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Três policiais (Ana, Bruno, Carla) trabalham em turnos diferentes (manhã, tarde, noite). Sabe-se que Ana não trabalha de manhã, e Bruno não trabalha à noite nem de manhã. Qual o turno de Bruno? Assinale a alternativa correta.",
        "alternativas": [
          "Manhã",
          "Noite",
          "Tarde",
          "tabela cruzada",
          "eliminação lógica"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Bruno não trabalha de manhã nem à noite — por eliminação, só resta a tarde para ele. (E, com essa informação, também se conclui que Ana trabalha à noite, já que não trabalha de manhã e a tarde já está ocupada por Bruno — restando a manhã para Carla, por…"
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          }
        ],
        "comentario": "Bruno não trabalha de manhã nem à noite — por eliminação, só resta a tarde para ele. (E, com essa informação, também se conclui que Ana trabalha à noite, já que não trabalha de manhã e a tarde já está ocupada por Bruno — restando a manhã para Carla, por eliminação final.)",
        "armadilhaDaBanca": "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "porqueCaiEmProva": "Aplicar sistematicamente a eliminação lógica em uma tabela cruzada para determinar a associação correta entre pessoas e características.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "comentarioDetalhado": [
          "Ponto cobrado: Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo."
        ],
        "armadilhaDaBanca": "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "comentarioDetalhado": [
          "Armadilha explorada: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista."
        ],
        "armadilhaDaBanca": "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Associação lógica: quadros de relacionamento, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência."
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "armadilhaDaBanca": "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Associação lógica: quadros de relacionamento?",
        "alternativas": [
          "Tabela cruzada",
          "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
          "Cada associação é um-para-um",
          "Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até…",
          "Reconhecer corretamente o termo-chave: tabela cruzada."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "armadilhaDaBanca": "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Associação lógica: quadros de relacionamento em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo. Pegadinha a evitar: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um",
          "Cada confirmação elimina a mesma…",
          "processe pistas diretas primeiro"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Cada associação é um-para-um\" e mostre por que \"Não processar todas as pistas disponíveis antes de tentar 'adivinhar' a resposta.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Cada associação é um-para-um: se uma pessoa é confirmada com uma característica, essa característica é eliminada para todas as demais pessoas.. A armadilha deve ser recusada porque distorce o conteúdo: Não processar todas as pistas disponíveis antes de tentar 'adivinhar' a resposta.",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 9: Associação lógica: quadros de relacionamento",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "assunto": "Problemas de associação",
        "tags": [
          "Raciocínio Lógico",
          "Problemas de associação",
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "associacao-logica-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Associação lógica: quadros de relacionamento, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Associação lógica: quadros de relacionamento. Núcleo obrigatório: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.. Pegadinha obrigatória: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Associação lógica: quadros de relacionamento em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
      "Reconhecer como Associação lógica: quadros de relacionamento aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Problemas de associação."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Associação lógica: quadros de relacionamento?",
        "verso": "Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: tabela cruzada",
        "verso": "tabela cruzada: Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista. Cada associação é um-para-um: se uma pessoa é confirmada com uma característica, essa característica é eliminada para todas as demais pessoas. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Associação lógica: quadros de relacionamento",
        "verso": "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Associação lógica: quadros de relacionamento",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "tabela cruzada",
            "eliminação lógica",
            "associação um-para-um",
            "Tabela cruzada"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar sistematicamente a eliminação lógica em uma tabela cruzada para determinar a associação correta entre pessoas e características.",
            "Questões que descrevem um conjunto de pessoas com características a associar, fornecendo pistas parciais sobre quem tem o quê."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
            "Não processar todas as pistas disponíveis antes de tentar 'adivinhar' a resposta.",
            "Em problemas com múltiplas categorias, esquecer de cruzar as conclusões entre as diferentes tabelas."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Associação lógica: quadros de relacionamento\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Associação lógica: quadros de relacionamento para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Associação lógica: quadros de relacionamento?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Problemas de associação",
      "Associação lógica: quadros de relacionamento",
      "tabela cruzada",
      "eliminação lógica",
      "associação um-para-um",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "associacao-logica-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Resolver problemas de associação entre pessoas, itens e características usando tabela cruzada",
        "enunciado": "Com base no capítulo \"Associação lógica: quadros de relacionamento\", assinale a alternativa correta. Três policiais (Ana, Bruno, Carla) trabalham em turnos diferentes (manhã, tarde, noite). Sabe-se que Ana não trabalha de manhã, e Bruno não trabalha à noite nem de manhã. Qual o turno de Bruno?",
        "alternativas": [
          "Manhã",
          "Tarde",
          "Noite",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Bruno não trabalha de manhã nem à noite — por eliminação, só resta a tarde para ele. (E, com essa informação, também se conclui que Ana trabalha à noite, já que não trabalha de manhã e a tarde já está ocupada por Bruno — restando a manhã para Carla, por eliminação final.)",
        "comentarioDetalhado": [
          "Bruno não trabalha de manhã nem à noite — por eliminação, só resta a tarde para ele. (E, com essa informação, também se conclui que Ana trabalha à noite, já que não trabalha de manhã e a tarde já está ocupada por Bruno — restando a manhã para Carla, por eliminação final.)",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: tabela cruzada, eliminação lógica, associação um-para-um, Tabela cruzada."
        ]
      },
      {
        "id": "associacao-logica-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Tabela cruzada: linhas = um conjunto, colunas = outro conjunto — marque X (impossível) e ✓ (confirmado) a cada pista.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "associacao-logica-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Esquecer de eliminar uma característica das demais linhas/colunas depois de confirmá-la para uma pessoa específica.",
          "Forma correta de lembrar: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo."
        ]
      },
      {
        "id": "associacao-logica-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Associação lógica: quadros de relacionamento\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "tabela cruzada",
          "eliminação lógica",
          "associação um-para-um",
          "Tabela cruzada",
          "Cada associação é um"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "associacao-logica-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Associação lógica: quadros de relacionamento\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Associação lógica: quadros de relacionamento\", a ideia principal é: Problemas de associação lógica apresentam um conjunto de pessoas (ou itens) e um conjunto de características (profissão, cor, cargo, cidade), com pistas que relacionam parcialmente uns aos outros — a tarefa é descobrir a associação completa e correta entre cada pessoa e cada característica, uma relação um-para-um. Para estudar sem travar, guarde primeiro estas palavras-chave: tabela cruzada, eliminação lógica, associação um-para-um. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Cada confirmação elimina a mesma característica das demais linhas — processe pistas diretas primeiro, depois repita a eliminação até fechar tudo.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  },
  {
    "id": "combinatoria-probabilidade-basica",
    "materialTitle": "Raciocínio Lógico para PMMA",
    "subject": "Raciocínio Lógico",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Raciocínio Lógico",
    "chapterIndex": 10,
    "totalChapters": 10,
    "title": "Análise combinatória e probabilidade lógica básica",
    "assunto": "Combinatória e probabilidade",
    "tecnica": "Princípio fundamental da contagem e distinção entre arranjo e combinação",
    "competencia": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
    "dificuldade": "Difícil",
    "tempoLeituraMin": 8,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "princípio fundamental da contagem",
      "arranjo",
      "combinação"
    ],
    "corpo": [
      "O princípio fundamental da contagem estabelece que, se uma decisão pode ser tomada em m etapas independentes, com n1 possibilidades na primeira, n2 na segunda, e assim por diante, o total de possibilidades é o produto n1 × n2 × n3 × ... — é a base de praticamente todo problema de contagem, incluindo senhas, placas de veículo, formação de comissões e escalas de serviço.",
      "A diferença central entre arranjo e combinação é se a ordem importa. Arranjo é usado quando a ordem dos elementos escolhidos importa (formar um pódio com 1º, 2º e 3º lugares entre 5 candidatos — trocar a ordem gera um resultado diferente). Combinação é usada quando a ordem não importa (escolher 3 policiais entre 5 para uma equipe, sem distinção de função — o grupo {A,B,C} é o mesmo que {C,B,A}).",
      "Probabilidade simples de um evento é calculada por: número de casos favoráveis dividido pelo número total de casos possíveis, sempre considerando que cada caso possível tem a mesma chance de ocorrer (espaço amostral equiprovável). Em eventos independentes (o resultado de um não afeta o outro), a probabilidade de ambos ocorrerem é o produto das probabilidades individuais."
    ],
    "pontosChave": [
      "Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente.",
      "Arranjo: ordem importa (pódio, senha). Combinação: ordem não importa (formar grupo/equipe).",
      "Probabilidade = casos favoráveis / casos possíveis; eventos independentes multiplicam suas probabilidades."
    ],
    "checkRapido": {
      "pergunta": "De um grupo de 5 policiais, quantas equipes diferentes de 2 pessoas podem ser formadas para uma patrulha, sem distinção de função entre eles?",
      "opcoes": [
        "20",
        "10",
        "5"
      ],
      "correta": 1,
      "justificativa": "Como não há distinção de função (a ordem não importa — a dupla {A,B} é a mesma que {B,A}), usa-se combinação: C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10 equipes diferentes possíveis."
    },
    "oQueCobra": "Diferenciar quando usar arranjo (ordem importa) ou combinação (ordem não importa), e calcular probabilidades simples e compostas.",
    "precisaSaberAntes": "Ter noção de fatorial (n! = n×(n-1)×(n-2)×...×1) para aplicar as fórmulas de arranjo e combinação.",
    "explicacao": [
      {
        "titulo": "Fórmulas de arranjo e combinação",
        "texto": "Arranjo de n elementos tomados p a p: A(n,p) = n!/(n-p)!. Combinação de n elementos tomados p a p: C(n,p) = n!/(p!×(n-p)!) — a diferença entre as duas fórmulas é justamente a divisão adicional por p! na combinação, que 'desconta' as ordenações repetidas que não fazem diferença quando a ordem não importa."
      },
      {
        "titulo": "Probabilidade condicional simples",
        "texto": "Quando um evento depende do resultado de outro já ocorrido (sem reposição, por exemplo), a probabilidade do segundo evento é calculada sobre o espaço amostral já reduzido pelo primeiro evento — é diferente de eventos independentes, que mantêm o espaço amostral original a cada etapa."
      }
    ],
    "comoIdentificar": "Questões que pedem para contar possibilidades (formação de grupos, senhas, pódios) ou calcular a chance de um evento ocorrer testam esse conteúdo.",
    "pegadinhas": [
      "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
      "Esquecer de dividir por p! ao calcular combinação, superestimando o resultado (contando ordenações repetidas como diferentes).",
      "Multiplicar probabilidades de eventos que na verdade são dependentes (sem reposição), sem ajustar o espaço amostral."
    ],
    "resumoFrase": "Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
    "proximoTitulo": null,
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Análise combinatória e probabilidade lógica básica\", a ideia principal é: O princípio fundamental da contagem estabelece que, se uma decisão pode ser tomada em m etapas independentes, com n1 possibilidades na primeira, n2 na segunda, e assim por diante, o total de possibilidades é o produto n1 × n2 × n3 × ... Para estudar sem travar, guarde primeiro estas palavras-chave: princípio fundamental da contagem, arranjo, combinação. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "princípio fundamental da contagem",
      "arranjo",
      "combinação",
      "Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente.",
      "Arranjo: ordem importa (pódio, senha). Combinação: ordem não importa (formar grupo/equipe)."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "De um grupo de 5 policiais, quantas equipes diferentes de 2 pessoas podem ser formadas para uma patrulha, sem distinção de função entre eles? Assinale a alternativa correta.",
        "alternativas": [
          "20",
          "5",
          "princípio fundamental da contagem",
          "10",
          "arranjo"
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Como não há distinção de função (a ordem não importa — a dupla {A,B} é a mesma que {B,A}), usa-se combinação: C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10 equipes diferentes possíveis."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          }
        ],
        "comentario": "Como não há distinção de função (a ordem não importa — a dupla {A,B} é a mesma que {B,A}), usa-se combinação: C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10 equipes diferentes possíveis.",
        "armadilhaDaBanca": "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "porqueCaiEmProva": "Diferenciar quando usar arranjo (ordem importa) ou combinação (ordem não importa), e calcular probabilidades simples e compostas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "comentarioDetalhado": [
          "Ponto cobrado: Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis."
        ],
        "armadilhaDaBanca": "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "comentarioDetalhado": [
          "Armadilha explorada: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente."
        ],
        "armadilhaDaBanca": "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Análise combinatória e probabilidade lógica básica, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "armadilhaDaBanca": "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "criterioCorrecaoIA": [
          "identificou a regra",
          "conferiu requisito ou exceção",
          "apontou a consequência",
          "não confundiu com tema vizinho"
        ],
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Análise combinatória e probabilidade lógica básica?",
        "alternativas": [
          "Princípio fundamental da contagem",
          "Arranjo",
          "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
          "Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre…",
          "Reconhecer corretamente o termo-chave: princípio fundamental da contagem."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "armadilhaDaBanca": "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        },
        "qualidadeQuestao": {
          "gabaritoValidado": true,
          "alternativasNormalizadas": true,
          "dataRevisao": "2026-07-07"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Análise combinatória e probabilidade lógica básica em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis. Pegadinha a evitar: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "princípio fundamental da contagem",
          "arranjo",
          "combinação",
          "Ordem importa = arranjo",
          "ordem não importa = combinação (que sempre…"
        ],
        "comentario": "Quem consegue explicar de forma simples geralmente domina mais do que quem apenas decorou.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Arranjo\" e mostre por que \"Esquecer de dividir por p! ao calcular combinação, superestimando o resultado (contando ordenações repetidas como diferentes).\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Arranjo: ordem importa (pódio, senha). Combinação: ordem não importa (formar grupo/equipe).. A armadilha deve ser recusada porque distorce o conteúdo: Esquecer de dividir por p! ao calcular combinação, superestimando o resultado (contando ordenações repetidas como diferentes).",
        "criteriosCorrecao": [
          "diferenciou regra e erro",
          "apontou consequência prática",
          "não tratou pegadinha como regra",
          "respondeu com base no capítulo"
        ],
        "comentario": "Essa questão mede maturidade de prova: o aluno aprende a comparar alternativas parecidas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Raciocínio Lógico para PMMA > Capítulo 10: Análise combinatória e probabilidade lógica básica",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "assunto": "Combinatória e probabilidade",
        "tags": [
          "Raciocínio Lógico",
          "Combinatória e probabilidade",
          "princípio fundamental da contagem",
          "arranjo",
          "combinação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "combinatoria-probabilidade-basica-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Análise combinatória e probabilidade lógica básica, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Análise combinatória e probabilidade lógica básica. Núcleo obrigatório: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.. Pegadinha obrigatória: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
        "respostaEsperada": "O aluno deve resolver a questão gerada, justificar a resposta e revisar a pegadinha.",
        "criteriosCorrecao": [
          "questão tem comando claro",
          "5 alternativas e apenas uma correta",
          "comentários individualizados",
          "pegadinha alinhada ao capítulo",
          "explicação simples em caso de erro"
        ],
        "comentario": "A IA vira treinador de questões, não apenas explicador. Isso permite treino infinito com diagnóstico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Análise combinatória e probabilidade lógica básica em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      }
    ],
    "revisaoProgramada": {
      "primeira": {
        "quando": "24 horas depois",
        "tarefa": "refazer q2 e q3 + revisar flashcards"
      },
      "segunda": {
        "quando": "7 dias depois",
        "tarefa": "resolver q1 sem olhar comentário + explicar o resumoFrase"
      },
      "terceira": {
        "quando": "30 dias depois",
        "tarefa": "fazer q4 ou pedir questão inédita à IA"
      },
      "gatilhoErro": "se errar q3 ou q4, voltar para explicacaoComoSeTivesse12 e gerar nova questão pela IA",
      "criterioDominio": "domínio ideal: 90% de acerto + explicação simples correta + identificação da pegadinha"
    },
    "linhaConteudo": "militares",
    "nivelProduto": "plataforma_paga",
    "objetivosAprendizagem": [
      "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
      "Reconhecer como Análise combinatória e probabilidade lógica básica aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Combinatória e probabilidade."
    ],
    "metodologiaVemAprovar": {
      "fase1_entender": "Ler a explicação simples e dizer em voz alta o que o capítulo resolve.",
      "fase2_grifar": "Marcar palavras-chave, competência/autoridade, prazo, exceção e consequência.",
      "fase3_praticar": "Resolver q1 a q3 sem olhar comentário.",
      "fase4_aplicar": "Responder caso prático q4 e comparar com critérios de correção.",
      "fase5_ia": "Pedir para a IA gerar uma questão nova com base no erro do aluno.",
      "fase6_revisar": "Revisar flashcards em 24h, 7 dias e 30 dias."
    },
    "flashcards": [
      {
        "frente": "Qual é a ideia central de Análise combinatória e probabilidade lógica básica?",
        "verso": "Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: princípio fundamental da contagem",
        "verso": "princípio fundamental da contagem: Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente. Arranjo: ordem importa (pódio, senha). Combinação: ordem não importa (formar grupo/equipe). Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Análise combinatória e probabilidade lógica básica",
        "verso": "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa. Revisão ampliada: em Análise combinatória e probabilidade lógica básica, o aluno deve identificar Combinatória e probabilidade, aplicar ao caso concreto, comparar com institutos próximos e justificar a resposta sem usar frase decorada.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Análise combinatória e probabilidade lógica básica",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "princípio fundamental da contagem",
            "arranjo",
            "combinação",
            "Princípio fundamental da contagem"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Diferenciar quando usar arranjo (ordem importa) ou combinação (ordem não importa), e calcular probabilidades simples e compostas.",
            "Questões que pedem para contar possibilidades (formação de grupos, senhas, pódios) ou calcular a chance de um evento ocorrer testam esse conteúdo."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
            "Esquecer de dividir por p! ao calcular combinação, superestimando o resultado (contando ordenações repetidas como diferentes).",
            "Multiplicar probabilidades de eventos que na verdade são dependentes (sem reposição), sem ajustar o espaço amostral."
          ]
        }
      ]
    },
    "rubricaDominio": {
      "nivel1_reconhece": "O aluno identifica o tema e as palavras-chave principais.",
      "nivel2_explica": "O aluno explica a regra com as próprias palavras, sem copiar o texto.",
      "nivel3_aplica": "O aluno resolve questão contextualizada e justifica a alternativa correta.",
      "nivel4_nao_cai_em_pegadinha": "O aluno identifica a troca de conceito, exceção ou generalização usada pela banca.",
      "dominioMinimo": "70% de acerto nas questões do capítulo + resposta curta coerente.",
      "dominioIdeal": "90% de acerto + explicação simples + identificação de pelo menos uma pegadinha."
    },
    "tutorIA": {
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Análise combinatória e probabilidade lógica básica\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Análise combinatória e probabilidade lógica básica para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Análise combinatória e probabilidade lógica básica?",
        "Explique a diferença entre a regra e a pegadinha mais comum deste capítulo.",
        "Dê um exemplo prático de como esse assunto pode aparecer na prova."
      ],
      "acoesAdaptativas": {
        "seAcertou": "Liberar próxima questão e pedir explicação curta para consolidar.",
        "seErrou": "Voltar para explicação simples, destacar a pegadinha e repetir com nova questão.",
        "seDemorouMuito": "Mostrar dica progressiva antes da resposta.",
        "seAcertou3Seguidas": "Marcar domínio parcial e agendar revisão em 7 dias."
      },
      "limites": "Não inventar dados; usar o conteúdo do capítulo como base."
    },
    "tagsBusca": [
      "Raciocínio Lógico",
      "Combinatória e probabilidade",
      "Análise combinatória e probabilidade lógica básica",
      "princípio fundamental da contagem",
      "arranjo",
      "combinação",
      "PMMA",
      "Concursos Militares"
    ],
    "seloQualidade": {
      "pedagógico": "revisado_para_estudo_ativo",
      "questoes": "questoes_com_comentario_e_criterio",
      "ia": "pronto_para_tutor_ia_adaptativo",
      "observacao": "manter_revisao_periodica"
    },
    "questoesLegado_9_10": [
      {
        "id": "combinatoria-probabilidade-basica-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Aplicar o princípio multiplicativo da contagem e calcular probabilidades simples",
        "enunciado": "Com base no capítulo \"Análise combinatória e probabilidade lógica básica\", assinale a alternativa correta. De um grupo de 5 policiais, quantas equipes diferentes de 2 pessoas podem ser formadas para uma patrulha, sem distinção de função entre eles?",
        "alternativas": [
          "20",
          "10",
          "5",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Como não há distinção de função (a ordem não importa — a dupla {A,B} é a mesma que {B,A}), usa-se combinação: C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10 equipes diferentes possíveis.",
        "comentarioDetalhado": [
          "Como não há distinção de função (a ordem não importa — a dupla {A,B} é a mesma que {B,A}), usa-se combinação: C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10 equipes diferentes possíveis.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: princípio fundamental da contagem, arranjo, combinação, Princípio fundamental da contagem."
        ]
      },
      {
        "id": "combinatoria-probabilidade-basica-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Princípio fundamental da contagem: multiplique o número de possibilidades de cada etapa independente.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "combinatoria-probabilidade-basica-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Usar arranjo quando a ordem não importa (deveria ser combinação), ou vice-versa.",
          "Forma correta de lembrar: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis."
        ]
      },
      {
        "id": "combinatoria-probabilidade-basica-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Análise combinatória e probabilidade lógica básica\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "princípio fundamental da contagem",
          "arranjo",
          "combinação",
          "Princípio fundamental da contagem",
          "Arranjo"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "combinatoria-probabilidade-basica-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Análise combinatória e probabilidade lógica básica\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Análise combinatória e probabilidade lógica básica\", a ideia principal é: O princípio fundamental da contagem estabelece que, se uma decisão pode ser tomada em m etapas independentes, com n1 possibilidades na primeira, n2 na segunda, e assim por diante, o total de possibilidades é o produto n1 × n2 × n3 × ... Para estudar sem travar, guarde primeiro estas palavras-chave: princípio fundamental da contagem, arranjo, combinação. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Ordem importa = arranjo; ordem não importa = combinação (que sempre divide por p! a mais) — probabilidade é sempre favoráveis sobre possíveis.",
        "criteriosCorrecao": [
          "Explicou em linguagem simples.",
          "Não trocou o conceito por outro assunto.",
          "Incluiu a frase de memória ou ideia equivalente.",
          "Demonstrou entender o que a banca costuma cobrar."
        ],
        "comentario": "A IA da plataforma pode comparar a resposta do aluno com estes critérios e pedir uma reescrita mais clara."
      }
    ],
    "questoesSchemaVersion": "10.0",
    "padraoQuestoes": "VemAprovar Top1 10/10 — 8 questões por capítulo, 5 alternativas nas objetivas, comentários por alternativa e IA adaptativa",
    "metricasQuestoes": {
      "total": 8,
      "multiplasEscolha5Alternativas": 3,
      "certoErrado": 2,
      "abertasOuDiscursivas": 2,
      "adaptativasIA": 1
    },
    "rubricaQuestoes10": {
      "bronze": "acerta q1 e q2, mas ainda depende do comentário",
      "prata": "acerta q1 a q5 e identifica a armadilha principal",
      "ouro": "acerta pelo menos 90% e explica q6/q7 com as próprias palavras",
      "diamante": "gera questão inédita com IA, comenta alternativas e resolve sem ajuda"
    },
    "qualidadeConteudo": {
      "revisaoAutomaticaCampos": true,
      "mcComGabaritoObrigatorio": true,
      "flashcardsSemPlaceholder": true,
      "dataRevisaoQualidade": "2026-07-07"
    }
  }
];

export default raciocinioLogico;
