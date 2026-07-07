/**
 * VemAprovar Top1 — Apostila Premium 10/10
 * Arquivo: matematica-basica.js
 * Módulo: Matemática para PMMA
 * Atualização pedagógica: 2026-07-07
 *
 * Foco: questões padrão 10/10 com 8 treinos por capítulo, alternativas comentadas,
 * diagnóstico por IA, armadilhas de banca e critérios de correção.
 */

export const matematicaBasica = [
  {
    "id": "operacoes-fundamentais-fracoes",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 1,
    "totalChapters": 10,
    "title": "Operações fundamentais e frações",
    "assunto": "Aritmética básica",
    "tecnica": "MMC para soma/subtração de frações com denominadores diferentes",
    "competencia": "Operar com frações e números decimais com segurança",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 3,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "mínimo múltiplo comum",
      "fração equivalente",
      "número decimal"
    ],
    "corpo": [
      "Fração representa uma parte de um todo, com numerador (a parte considerada) e denominador (em quantas partes o todo foi dividido). Para somar ou subtrair frações com denominadores diferentes, é preciso encontrar o mínimo múltiplo comum (MMC) dos denominadores, transformando as frações em equivalentes com o mesmo denominador antes de operar os numeradores.",
      "Multiplicação de frações é direta: multiplica-se numerador por numerador e denominador por denominador, sem precisar de denominador comum. Divisão de frações se resolve multiplicando a primeira fração pelo inverso da segunda (multiplica-se em cruz, ou 'inverte e multiplica').",
      "Número decimal é outra forma de representar uma fração, com o denominador sendo uma potência de 10 (10, 100, 1000...). Para transformar fração em decimal, basta dividir o numerador pelo denominador. Para transformar decimal em fração, coloca-se o número (sem a vírgula) como numerador, e uma potência de 10 correspondente à quantidade de casas decimais como denominador, simplificando quando possível."
    ],
    "pontosChave": [
      "Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar.",
      "Multiplicação de frações: direto, numerador × numerador, denominador × denominador.",
      "Divisão de frações: multiplica pelo inverso da segunda ('inverte e multiplica')."
    ],
    "checkRapido": {
      "pergunta": "Quanto é 1/3 + 1/4?",
      "opcoes": [
        "2/7",
        "7/12",
        "1/7"
      ],
      "correta": 1,
      "justificativa": "O MMC de 3 e 4 é 12. Transformando: 1/3 = 4/12 e 1/4 = 3/12. Somando: 4/12 + 3/12 = 7/12."
    },
    "oQueCobra": "Operar com frações (soma, subtração, multiplicação, divisão) e converter entre fração e decimal com segurança.",
    "precisaSaberAntes": "Saber calcular o MMC entre dois ou mais números (fatoração em primos, ou lista de múltiplos).",
    "explicacao": [
      {
        "titulo": "Erro clássico: somar frações sem igualar denominadores",
        "texto": "Um erro muito comum é somar numeradores e denominadores diretamente (1/3 + 1/4 = 2/7, errado) — a soma de frações NUNCA funciona assim; é obrigatório igualar os denominadores primeiro através do MMC."
      },
      {
        "titulo": "Simplificação de frações",
        "texto": "Sempre que possível, simplifique a fração resultante dividindo numerador e denominador pelo mesmo número (o máximo divisor comum entre eles) — bancas costumam apresentar a resposta já simplificada nas alternativas, então uma fração não simplificada pode não bater com nenhuma opção."
      }
    ],
    "comoIdentificar": "Questões que envolvem cálculo direto com frações, ou problemas que exigem conversão entre fração e decimal para comparação.",
    "pegadinhas": [
      "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
      "Esquecer de inverter a segunda fração na divisão.",
      "Não simplificar a fração final, deixando de encontrar a alternativa correta por estar em outro formato."
    ],
    "resumoFrase": "Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
    "proximoTitulo": "Porcentagem",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Operações fundamentais e frações\", a ideia principal é: Fração representa uma parte de um todo, com numerador (a parte considerada) e denominador (em quantas partes o todo foi dividido). Para estudar sem travar, guarde primeiro estas palavras-chave: mínimo múltiplo comum, fração equivalente, número decimal. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "mínimo múltiplo comum",
      "fração equivalente",
      "número decimal",
      "Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar.",
      "Multiplicação de frações: direto, numerador × numerador, denominador × denominador."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Quanto é 1/3 + 1/4? Assinale a alternativa correta.",
        "alternativas": [
          "7/12",
          "2/7",
          "1/7",
          "mínimo múltiplo comum",
          "fração equivalente"
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. O MMC de 3 e 4 é 12. Transformando: 1/3 = 4/12 e 1/4 = 3/12. Somando: 4/12 + 3/12 = 7/12."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          }
        ],
        "comentario": "O MMC de 3 e 4 é 12. Transformando: 1/3 = 4/12 e 1/4 = 3/12. Somando: 4/12 + 3/12 = 7/12.",
        "armadilhaDaBanca": "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "porqueCaiEmProva": "Operar com frações (soma, subtração, multiplicação, divisão) e converter entre fração e decimal com segurança.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
        "comentarioDetalhado": [
          "Ponto cobrado: Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração."
        ],
        "armadilhaDaBanca": "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
        "comentarioDetalhado": [
          "Armadilha explorada: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar."
        ],
        "armadilhaDaBanca": "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Operações fundamentais e frações, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
        "armadilhaDaBanca": "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
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
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Operações fundamentais e frações?",
        "alternativas": [
          "Soma/subtração de frações",
          "Multiplicação de frações",
          "Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
          "Reconhecer corretamente o termo-chave: mínimo múltiplo comum.",
          "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
        "armadilhaDaBanca": "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Operações fundamentais e frações em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração. Pegadinha a evitar: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal",
          "Soma e subtração de frações sempre exigem…",
          "multiplicação é direta"
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
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Multiplicação de frações\" e mostre por que \"Esquecer de inverter a segunda fração na divisão.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Multiplicação de frações: direto, numerador × numerador, denominador × denominador.. A armadilha deve ser recusada porque distorce o conteúdo: Esquecer de inverter a segunda fração na divisão.",
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
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 1: Operações fundamentais e frações",
        "habilidade": "Operar com frações e números decimais com segurança",
        "assunto": "Aritmética básica",
        "tags": [
          "Matemática",
          "Aritmética básica",
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "operacoes-fundamentais-fracoes-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Operações fundamentais e frações, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Operações fundamentais e frações. Núcleo obrigatório: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.. Pegadinha obrigatória: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Operações fundamentais e frações em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Operar com frações e números decimais com segurança",
      "Reconhecer como Operações fundamentais e frações aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Aritmética básica."
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
        "frente": "Qual é a ideia central de Operações fundamentais e frações?",
        "verso": "Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: mínimo múltiplo comum",
        "verso": "Explique mínimo múltiplo comum dentro do tema Operações fundamentais e frações.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Operações fundamentais e frações",
        "verso": "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Operações fundamentais e frações",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "mínimo múltiplo comum",
            "fração equivalente",
            "número decimal",
            "Soma/subtração de frações"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Operar com frações (soma, subtração, multiplicação, divisão) e converter entre fração e decimal com segurança.",
            "Questões que envolvem cálculo direto com frações, ou problemas que exigem conversão entre fração e decimal para comparação."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
            "Esquecer de inverter a segunda fração na divisão.",
            "Não simplificar a fração final, deixando de encontrar a alternativa correta por estar em outro formato."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Operações fundamentais e frações\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Operações fundamentais e frações para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Operações fundamentais e frações?",
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
      "Matemática",
      "Aritmética básica",
      "Operações fundamentais e frações",
      "mínimo múltiplo comum",
      "fração equivalente",
      "número decimal",
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
        "id": "operacoes-fundamentais-fracoes-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Operar com frações e números decimais com segurança",
        "enunciado": "Com base no capítulo \"Operações fundamentais e frações\", assinale a alternativa correta. Quanto é 1/3 + 1/4?",
        "alternativas": [
          "2/7",
          "7/12",
          "1/7",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "O MMC de 3 e 4 é 12. Transformando: 1/3 = 4/12 e 1/4 = 3/12. Somando: 4/12 + 3/12 = 7/12.",
        "comentarioDetalhado": [
          "O MMC de 3 e 4 é 12. Transformando: 1/3 = 4/12 e 1/4 = 3/12. Somando: 4/12 + 3/12 = 7/12.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: mínimo múltiplo comum, fração equivalente, número decimal, Soma/subtração de frações."
        ]
      },
      {
        "id": "operacoes-fundamentais-fracoes-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Soma/subtração de frações: precisa de MMC dos denominadores para igualar antes de operar.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "operacoes-fundamentais-fracoes-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Somar frações diretamente (numerador+numerador, denominador+denominador) sem igualar os denominadores primeiro.",
          "Forma correta de lembrar: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração."
        ]
      },
      {
        "id": "operacoes-fundamentais-fracoes-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Operações fundamentais e frações\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "mínimo múltiplo comum",
          "fração equivalente",
          "número decimal",
          "Soma/subtração de frações",
          "Multiplicação de frações"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "operacoes-fundamentais-fracoes-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Operações fundamentais e frações\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Operações fundamentais e frações\", a ideia principal é: Fração representa uma parte de um todo, com numerador (a parte considerada) e denominador (em quantas partes o todo foi dividido). Para estudar sem travar, guarde primeiro estas palavras-chave: mínimo múltiplo comum, fração equivalente, número decimal. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Soma e subtração de frações sempre exigem MMC dos denominadores; multiplicação é direta; divisão inverte a segunda fração.",
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
    }
  },
  {
    "id": "porcentagem",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 2,
    "totalChapters": 10,
    "title": "Porcentagem",
    "assunto": "Porcentagem",
    "tecnica": "Transformação de percentual em fator multiplicativo",
    "competencia": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 4
    },
    "termosChave": [
      "fator multiplicativo",
      "acréscimo percentual",
      "desconto percentual"
    ],
    "corpo": [
      "Porcentagem é uma fração de denominador 100 — x% significa x/100, ou x dividido por 100 em forma decimal. Para calcular x% de um valor A, basta multiplicar A pelo fator (x/100): 30% de 200 = 200 × 0,30 = 60. Essa é a técnica mais rápida e menos sujeita a erro, evitando montar regra de três para cálculos simples de porcentagem.",
      "Para acréscimo percentual, multiplica-se pelo fator (1 + taxa): um aumento de 20% sobre um valor A é A × 1,20. Para desconto percentual, multiplica-se pelo fator (1 - taxa): um desconto de 15% sobre um valor A é A × 0,85. Essa técnica do fator multiplicativo evita o erro comum de calcular a porcentagem e depois esquecer de somar/subtrair do valor original.",
      "Quando há variações percentuais sucessivas (ex.: um produto sobe 10% e depois desce 10%), os fatores se multiplicam entre si — nunca se somam. Um erro muito comum é achar que aumentar 10% e depois reduzir 10% volta ao valor original: na verdade, 1,10 × 0,90 = 0,99, ou seja, o valor final é 1% menor que o original, porque a segunda variação incide sobre um valor já alterado, não sobre o valor inicial."
    ],
    "pontosChave": [
      "x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três.",
      "Acréscimo: multiplica por (1 + taxa). Desconto: multiplica por (1 - taxa).",
      "Variações sucessivas SE MULTIPLICAM, nunca se somam — aumentar e depois reduzir a mesma % não volta ao valor original."
    ],
    "checkRapido": {
      "pergunta": "Um produto de R$ 200 recebe primeiro um desconto de 10% e depois um acréscimo de 10% sobre o novo valor. O valor final é:",
      "opcoes": [
        "R$ 200,00 (volta ao original)",
        "R$ 198,00",
        "R$ 202,00"
      ],
      "correta": 1,
      "justificativa": "200 × 0,90 (desconto de 10%) = 180. Depois, 180 × 1,10 (acréscimo de 10%) = 198. Os fatores se multiplicam (0,90 × 1,10 = 0,99), resultando em um valor final menor que o original, não igual."
    },
    "oQueCobra": "Aplicar o fator multiplicativo para calcular porcentagens, acréscimos, descontos e variações percentuais sucessivas.",
    "precisaSaberAntes": "Transformar porcentagem em número decimal (dividir por 100) com segurança.",
    "explicacao": [
      {
        "titulo": "Achando a porcentagem a partir da variação",
        "texto": "Se um valor passou de A para B, a variação percentual é: ((B - A) / A) × 100. Cuidado com o sinal: se B > A, a variação é positiva (aumento); se B < A, é negativa (redução) — e a base do cálculo é sempre o valor original A, nunca o valor final B."
      },
      {
        "titulo": "Porcentagem de porcentagem",
        "texto": "Quando a questão pede 'quantos por cento é 30 de 150', divida a parte pelo todo e multiplique por 100: (30/150) × 100 = 20%. É o caminho inverso de calcular x% de um valor."
      }
    ],
    "comoIdentificar": "Questões com aumento, desconto, ou variações sucessivas de preço, taxa ou quantidade testam esse conteúdo — presente em quase toda prova.",
    "pegadinhas": [
      "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
      "Calcular a variação percentual usando o valor final como base, em vez do valor original.",
      "Somar percentuais sucessivos em vez de multiplicar os fatores correspondentes."
    ],
    "resumoFrase": "Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
    "proximoTitulo": "Regra de três simples e composta",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Porcentagem\", a ideia principal é: Porcentagem é uma fração de denominador 100 — x% significa x/100, ou x dividido por 100 em forma decimal. Para estudar sem travar, guarde primeiro estas palavras-chave: fator multiplicativo, acréscimo percentual, desconto percentual. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "fator multiplicativo",
      "acréscimo percentual",
      "desconto percentual",
      "x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três.",
      "Acréscimo: multiplica por (1 + taxa). Desconto: multiplica por (1 - taxa)."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um produto de R$ 200 recebe primeiro um desconto de 10% e depois um acréscimo de 10% sobre o novo valor. O valor final é: Assinale a alternativa correta.",
        "alternativas": [
          "R$ 200,00 (volta ao original)",
          "R$ 198,00",
          "R$ 202,00",
          "fator multiplicativo",
          "acréscimo percentual"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. 200 × 0,90 (desconto de 10%) = 180. Depois, 180 × 1,10 (acréscimo de 10%) = 198. Os fatores se multiplicam (0,90 × 1,10 = 0,99), resultando em um valor final menor que o original, não igual."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          }
        ],
        "comentario": "200 × 0,90 (desconto de 10%) = 180. Depois, 180 × 1,10 (acréscimo de 10%) = 198. Os fatores se multiplicam (0,90 × 1,10 = 0,99), resultando em um valor final menor que o original, não igual.",
        "armadilhaDaBanca": "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
        "porqueCaiEmProva": "Aplicar o fator multiplicativo para calcular porcentagens, acréscimos, descontos e variações percentuais sucessivas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
        "comentarioDetalhado": [
          "Ponto cobrado: x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam."
        ],
        "armadilhaDaBanca": "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
        "comentarioDetalhado": [
          "Armadilha explorada: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três."
        ],
        "armadilhaDaBanca": "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Porcentagem, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
        "armadilhaDaBanca": "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
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
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Porcentagem?",
        "alternativas": [
          "aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original.",
          "x% de A = A × (x/100)",
          "Acréscimo",
          "Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
          "Reconhecer corretamente o termo-chave: fator multiplicativo."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
        "armadilhaDaBanca": "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Porcentagem em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam. Pegadinha a evitar: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual",
          "Vire cada porcentagem em fator e multiplique",
          "variações sucessivas se multiplicam"
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
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Acréscimo\" e mostre por que \"Calcular a variação percentual usando o valor final como base, em vez do valor original.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Acréscimo: multiplica por (1 + taxa). Desconto: multiplica por (1 - taxa).. A armadilha deve ser recusada porque distorce o conteúdo: Calcular a variação percentual usando o valor final como base, em vez do valor original.",
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
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 2: Porcentagem",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "assunto": "Porcentagem",
        "tags": [
          "Matemática",
          "Porcentagem",
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "porcentagem-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Porcentagem, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Porcentagem. Núcleo obrigatório: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.. Pegadinha obrigatória: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Porcentagem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
      "Reconhecer como Porcentagem aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Porcentagem."
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
        "frente": "Qual é a ideia central de Porcentagem?",
        "verso": "Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: fator multiplicativo",
        "verso": "Explique fator multiplicativo dentro do tema Porcentagem.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Porcentagem",
        "verso": "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Porcentagem",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "fator multiplicativo",
            "acréscimo percentual",
            "desconto percentual",
            "x% de A = A × (x/100)"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar o fator multiplicativo para calcular porcentagens, acréscimos, descontos e variações percentuais sucessivas.",
            "Questões com aumento, desconto, ou variações sucessivas de preço, taxa ou quantidade testam esse conteúdo — presente em quase toda prova."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
            "Calcular a variação percentual usando o valor final como base, em vez do valor original.",
            "Somar percentuais sucessivos em vez de multiplicar os fatores correspondentes."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Porcentagem\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Porcentagem para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Porcentagem?",
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
      "Matemática",
      "Porcentagem",
      "fator multiplicativo",
      "acréscimo percentual",
      "desconto percentual",
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
        "id": "porcentagem-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Calcular porcentagens, acréscimos, descontos e variações sucessivas",
        "enunciado": "Com base no capítulo \"Porcentagem\", assinale a alternativa correta. Um produto de R$ 200 recebe primeiro um desconto de 10% e depois um acréscimo de 10% sobre o novo valor. O valor final é:",
        "alternativas": [
          "R$ 200,00 (volta ao original)",
          "R$ 198,00",
          "R$ 202,00",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "200 × 0,90 (desconto de 10%) = 180. Depois, 180 × 1,10 (acréscimo de 10%) = 198. Os fatores se multiplicam (0,90 × 1,10 = 0,99), resultando em um valor final menor que o original, não igual.",
        "comentarioDetalhado": [
          "200 × 0,90 (desconto de 10%) = 180. Depois, 180 × 1,10 (acréscimo de 10%) = 198. Os fatores se multiplicam (0,90 × 1,10 = 0,99), resultando em um valor final menor que o original, não igual.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: fator multiplicativo, acréscimo percentual, desconto percentual, x% de A = A × (x/100)."
        ]
      },
      {
        "id": "porcentagem-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: x% de A = A × (x/100) — fator multiplicativo direto, sem precisar de regra de três.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "porcentagem-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Achar que aumentar X% e depois reduzir X% (ou vice-versa) sempre volta ao valor original — não volta, há uma pequena perda líquida.",
          "Forma correta de lembrar: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam."
        ]
      },
      {
        "id": "porcentagem-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Porcentagem\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "fator multiplicativo",
          "acréscimo percentual",
          "desconto percentual",
          "x% de A = A × (x/100)",
          "Acréscimo"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "porcentagem-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Porcentagem\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Porcentagem\", a ideia principal é: Porcentagem é uma fração de denominador 100 — x% significa x/100, ou x dividido por 100 em forma decimal. Para estudar sem travar, guarde primeiro estas palavras-chave: fator multiplicativo, acréscimo percentual, desconto percentual. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Vire cada porcentagem em fator e multiplique; variações sucessivas se multiplicam, nunca se somam.",
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
    }
  },
  {
    "id": "regra-de-tres",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 3,
    "totalChapters": 10,
    "title": "Regra de três simples e composta",
    "assunto": "Regra de três",
    "tecnica": "Identificação do tipo de proporcionalidade (direta ou inversa) antes de montar a equação",
    "competencia": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 4
    },
    "termosChave": [
      "proporcionalidade direta",
      "proporcionalidade inversa",
      "regra de três composta"
    ],
    "corpo": [
      "Regra de três simples relaciona duas grandezas: identificar se elas são diretamente proporcionais (quando uma aumenta, a outra também aumenta na mesma razão) ou inversamente proporcionais (quando uma aumenta, a outra diminui) é o passo mais importante, antes de montar qualquer conta. Em grandezas diretamente proporcionais, a equação se monta 'em linha' (multiplicação cruzada direta); em inversamente proporcionais, inverte-se uma das razões antes de multiplicar cruzado.",
      "Teste prático para saber se é direta ou inversa: pergunte-se 'se eu aumentar essa grandeza, a outra também aumenta (direta) ou diminui (inversa)?'. Exemplo clássico: mais operários (aumenta) constroem um muro em menos tempo (diminui) — são inversamente proporcionais. Mais horas trabalhadas (aumenta) produzem mais peças (aumenta) — são diretamente proporcionais.",
      "Regra de três composta envolve três ou mais grandezas simultaneamente — o procedimento é analisar a relação de cada grandeza com a grandeza-incógnita separadamente (mantendo as demais fixas), decidir se cada uma é direta ou inversa em relação à incógnita, e montar uma equação única multiplicando todas as razões (invertendo as inversamente proporcionais) de uma vez."
    ],
    "pontosChave": [
      "Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto.",
      "Grandezas inversamente proporcionais: uma aumenta, a outra diminui — inverte a razão antes de multiplicar.",
      "Regra de três composta: analise a relação de cada grandeza com a incógnita separadamente, antes de montar a equação única."
    ],
    "checkRapido": {
      "pergunta": "8 operários constroem um muro em 12 dias. Quantos dias levariam 6 operários para construir o mesmo muro, mantendo o ritmo de trabalho?",
      "opcoes": [
        "9 dias",
        "16 dias",
        "18 dias"
      ],
      "correta": 1,
      "justificativa": "Menos operários (redução) levam mais tempo (aumento) para o mesmo serviço — são inversamente proporcionais. Montando: 8 × 12 = 6 × x → 96 = 6x → x = 16 dias."
    },
    "oQueCobra": "Identificar corretamente o tipo de proporcionalidade entre as grandezas antes de montar e resolver a equação de regra de três.",
    "precisaSaberAntes": "Ter fluência em resolver equações simples do 1º grau (multiplicação cruzada, isolar a incógnita).",
    "explicacao": [
      {
        "titulo": "Erro mais comum: tratar tudo como direta",
        "texto": "A maior fonte de erro em regra de três é assumir automaticamente que a relação é direta, sem testar a lógica da situação — sempre pare e pergunte 'aumentando essa grandeza, o que acontece com a outra?' antes de montar a equação."
      },
      {
        "titulo": "Montagem da regra de três composta passo a passo",
        "texto": "Escreva as três (ou mais) grandezas em colunas, com a incógnita em uma linha. Para cada coluna que não é a da incógnita, decida se é direta ou inversa em relação à coluna da incógnita e, se for inversa, inverta a fração dessa coluna antes de multiplicar todas as razões e igualar à razão da coluna da incógnita."
      }
    ],
    "comoIdentificar": "Problemas com trabalhadores, tempo, velocidade, produção ou consumo, envolvendo duas ou mais grandezas relacionadas.",
    "pegadinhas": [
      "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
      "Em regra de três composta, esquecer de inverter apenas as colunas inversamente proporcionais, invertendo todas ou nenhuma.",
      "Confundir qual é a grandeza-incógnita ao montar as colunas."
    ],
    "resumoFrase": "Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
    "proximoTitulo": "Juros simples e compostos",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Regra de três simples e composta\", a ideia principal é: Regra de três simples relaciona duas grandezas: identificar se elas são diretamente proporcionais (quando uma aumenta, a outra também aumenta na mesma razão) ou inversamente proporcionais (quando uma aumenta, a outra diminui) é o passo mais importante, antes de montar qualquer conta. Para estudar sem travar, guarde primeiro estas palavras-chave: proporcionalidade direta, proporcionalidade inversa, regra de três composta. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "proporcionalidade direta",
      "proporcionalidade inversa",
      "regra de três composta",
      "Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto.",
      "Grandezas inversamente proporcionais: uma aumenta, a outra diminui — inverte a razão antes de multiplicar."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "8 operários constroem um muro em 12 dias. Quantos dias levariam 6 operários para construir o mesmo muro, mantendo o ritmo de trabalho? Assinale a alternativa correta.",
        "alternativas": [
          "9 dias",
          "18 dias",
          "proporcionalidade direta",
          "16 dias",
          "proporcionalidade inversa"
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Menos operários (redução) levam mais tempo (aumento) para o mesmo serviço — são inversamente proporcionais. Montando: 8 × 12 = 6 × x → 96 = 6x → x = 16 dias."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          }
        ],
        "comentario": "Menos operários (redução) levam mais tempo (aumento) para o mesmo serviço — são inversamente proporcionais. Montando: 8 × 12 = 6 × x → 96 = 6x → x = 16 dias.",
        "armadilhaDaBanca": "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "porqueCaiEmProva": "Identificar corretamente o tipo de proporcionalidade entre as grandezas antes de montar e resolver a equação de regra de três.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
        "comentarioDetalhado": [
          "Ponto cobrado: Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita."
        ],
        "armadilhaDaBanca": "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
        "comentarioDetalhado": [
          "Armadilha explorada: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto."
        ],
        "armadilhaDaBanca": "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Regra de três simples e composta, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
        "armadilhaDaBanca": "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
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
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Regra de três simples e composta?",
        "alternativas": [
          "Grandezas diretamente proporcionais",
          "Grandezas inversamente proporcionais",
          "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
          "Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
          "Reconhecer corretamente o termo-chave: proporcionalidade direta."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
        "armadilhaDaBanca": "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Regra de três simples e composta em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita. Pegadinha a evitar: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta",
          "Sempre teste a lógica (direta ou inversa)…",
          "inverta só as colunas inversamente…"
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
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Grandezas inversamente proporcionais\" e mostre por que \"Em regra de três composta, esquecer de inverter apenas as colunas inversamente proporcionais, invertendo todas ou nenhuma.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Grandezas inversamente proporcionais: uma aumenta, a outra diminui — inverte a razão antes de multiplicar.. A armadilha deve ser recusada porque distorce o conteúdo: Em regra de três composta, esquecer de inverter apenas as colunas inversamente proporcionais, invertendo todas ou nenhuma.",
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
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 3: Regra de três simples e composta",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "assunto": "Regra de três",
        "tags": [
          "Matemática",
          "Regra de três",
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "regra-de-tres-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Regra de três simples e composta, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Regra de três simples e composta. Núcleo obrigatório: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.. Pegadinha obrigatória: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Regra de três simples e composta em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
      "Reconhecer como Regra de três simples e composta aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Regra de três."
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
        "frente": "Qual é a ideia central de Regra de três simples e composta?",
        "verso": "Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: proporcionalidade direta",
        "verso": "Explique proporcionalidade direta dentro do tema Regra de três simples e composta.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Regra de três simples e composta",
        "verso": "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Regra de três simples e composta",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "proporcionalidade direta",
            "proporcionalidade inversa",
            "regra de três composta",
            "Grandezas diretamente proporcionais"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Identificar corretamente o tipo de proporcionalidade entre as grandezas antes de montar e resolver a equação de regra de três.",
            "Problemas com trabalhadores, tempo, velocidade, produção ou consumo, envolvendo duas ou mais grandezas relacionadas."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
            "Em regra de três composta, esquecer de inverter apenas as colunas inversamente proporcionais, invertendo todas ou nenhuma.",
            "Confundir qual é a grandeza-incógnita ao montar as colunas."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Regra de três simples e composta\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Regra de três simples e composta para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Regra de três simples e composta?",
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
      "Matemática",
      "Regra de três",
      "Regra de três simples e composta",
      "proporcionalidade direta",
      "proporcionalidade inversa",
      "regra de três composta",
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
        "id": "regra-de-tres-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Resolver problemas de regra de três simples e composta identificando corretamente a proporcionalidade",
        "enunciado": "Com base no capítulo \"Regra de três simples e composta\", assinale a alternativa correta. 8 operários constroem um muro em 12 dias. Quantos dias levariam 6 operários para construir o mesmo muro, mantendo o ritmo de trabalho?",
        "alternativas": [
          "9 dias",
          "16 dias",
          "18 dias",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Menos operários (redução) levam mais tempo (aumento) para o mesmo serviço — são inversamente proporcionais. Montando: 8 × 12 = 6 × x → 96 = 6x → x = 16 dias.",
        "comentarioDetalhado": [
          "Menos operários (redução) levam mais tempo (aumento) para o mesmo serviço — são inversamente proporcionais. Montando: 8 × 12 = 6 × x → 96 = 6x → x = 16 dias.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: proporcionalidade direta, proporcionalidade inversa, regra de três composta, Grandezas diretamente proporcionais."
        ]
      },
      {
        "id": "regra-de-tres-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Grandezas diretamente proporcionais: aumentam/diminuem juntas — multiplica cruzado direto.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "regra-de-tres-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Montar a equação como se a relação fosse direta quando na verdade é inversa (ou vice-versa).",
          "Forma correta de lembrar: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita."
        ]
      },
      {
        "id": "regra-de-tres-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Regra de três simples e composta\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "proporcionalidade direta",
          "proporcionalidade inversa",
          "regra de três composta",
          "Grandezas diretamente proporcionais",
          "Grandezas inversamente proporcionais"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "regra-de-tres-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Regra de três simples e composta\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Regra de três simples e composta\", a ideia principal é: Regra de três simples relaciona duas grandezas: identificar se elas são diretamente proporcionais (quando uma aumenta, a outra também aumenta na mesma razão) ou inversamente proporcionais (quando uma aumenta, a outra diminui) é o passo mais importante, antes de montar qualquer conta. Para estudar sem travar, guarde primeiro estas palavras-chave: proporcionalidade direta, proporcionalidade inversa, regra de três composta. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Sempre teste a lógica (direta ou inversa) antes de montar a conta — inverta só as colunas inversamente proporcionais à incógnita.",
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
    }
  },
  {
    "id": "juros-simples-compostos",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 4,
    "totalChapters": 10,
    "title": "Juros simples e compostos",
    "assunto": "Matemática financeira",
    "tecnica": "Distinção entre crescimento linear (simples) e exponencial (composto)",
    "competencia": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
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
      "juros simples",
      "juros compostos",
      "montante"
    ],
    "corpo": [
      "Juros simples são calculados sempre sobre o capital inicial (principal), sem incidir sobre juros anteriores acumulados — o crescimento é linear ao longo do tempo. A fórmula é J = C × i × t (juro = capital × taxa × tempo), e o montante final é M = C × (1 + i × t).",
      "Juros compostos incidem sobre o capital inicial mais os juros já acumulados em períodos anteriores ('juros sobre juros') — o crescimento é exponencial, mais acelerado quanto maior o tempo. A fórmula do montante é M = C × (1 + i)^t, onde t é o número de períodos.",
      "Para tempos curtos (poucos períodos), a diferença entre juros simples e compostos é pequena; para prazos longos, a diferença se torna muito significativa, já que o regime composto cresce de forma acelerada. Sempre confira se a taxa (i) e o tempo (t) estão na mesma unidade (ambos em meses, ou ambos em anos) antes de aplicar qualquer fórmula — é a fonte de erro mais comum nesse conteúdo."
    ],
    "pontosChave": [
      "Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t).",
      "Juros compostos: crescimento exponencial, juros sobre juros. Fórmula: M = C × (1+i)^t.",
      "Sempre unifique a unidade de taxa e tempo (meses com meses, anos com anos) antes de calcular."
    ],
    "checkRapido": {
      "pergunta": "Um capital de R$ 1.000 é aplicado a juros simples de 2% ao mês, por 5 meses. Qual o montante final?",
      "opcoes": [
        "R$ 1.100,00",
        "R$ 1.104,08",
        "R$ 1.200,00"
      ],
      "correta": 0,
      "justificativa": "Usando M = C × (1 + i×t): M = 1000 × (1 + 0,02×5) = 1000 × (1 + 0,10) = 1000 × 1,10 = R$ 1.100,00. Nos juros simples, o crescimento é linear, sem juros sobre juros."
    },
    "oQueCobra": "Calcular montante e juros nos regimes simples e composto, aplicando a fórmula correta conforme o enunciado especifica.",
    "precisaSaberAntes": "Ter domínio de porcentagem (fator multiplicativo) e de potenciação básica, para aplicar (1+i)^t no regime composto.",
    "explicacao": [
      {
        "titulo": "Como identificar o regime pelo enunciado",
        "texto": "Se o problema disser explicitamente 'juros simples' ou 'juros compostos', use a fórmula correspondente. Sem essa indicação explícita, o contexto de mercado financeiro real (empréstimos bancários, financiamentos) geralmente segue o regime composto — mas em prova, sempre confie no que o enunciado disser literalmente."
      },
      {
        "titulo": "Cálculo de juros compostos com calculadora básica",
        "texto": "Como (1+i)^t pode exigir potenciação de expoente não inteiro pequeno, bancas de concurso de nível médio costumam trabalhar com valores de t pequenos e i 'redondos', permitindo calcular por multiplicações sucessivas: M = C × (1+i) × (1+i) × ... (t vezes), sem precisar de calculadora científica."
      }
    ],
    "comoIdentificar": "Questões que mencionam capital, taxa de juros e período de tempo, pedindo o montante final ou o valor dos juros.",
    "pegadinhas": [
      "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
      "Não converter taxa e tempo para a mesma unidade antes de calcular (ex.: taxa mensal com tempo em anos).",
      "Esquecer que juros compostos incidem sobre o saldo já acumulado, calculando erroneamente como se fosse linear."
    ],
    "resumoFrase": "Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
    "proximoTitulo": "Equações do 1º grau",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Juros simples e compostos\", a ideia principal é: Juros simples são calculados sempre sobre o capital inicial (principal), sem incidir sobre juros anteriores acumulados — o crescimento é linear ao longo do tempo. Para estudar sem travar, guarde primeiro estas palavras-chave: juros simples, juros compostos, montante. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "juros simples",
      "juros compostos",
      "montante",
      "Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t).",
      "Juros compostos: crescimento exponencial, juros sobre juros. Fórmula: M = C × (1+i)^t."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um capital de R$ 1.000 é aplicado a juros simples de 2% ao mês, por 5 meses. Qual o montante final? Assinale a alternativa correta.",
        "alternativas": [
          "R$ 1.104,08",
          "R$ 1.200,00",
          "juros simples",
          "R$ 1.100,00",
          "juros compostos"
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Usando M = C × (1 + i×t): M = 1000 × (1 + 0,02×5) = 1000 × (1 + 0,10) = 1000 × 1,10 = R$ 1.100,00. Nos juros simples, o crescimento é linear, sem juros sobre juros."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          }
        ],
        "comentario": "Usando M = C × (1 + i×t): M = 1000 × (1 + 0,02×5) = 1000 × (1 + 0,10) = 1000 × 1,10 = R$ 1.100,00. Nos juros simples, o crescimento é linear, sem juros sobre juros.",
        "armadilhaDaBanca": "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "porqueCaiEmProva": "Calcular montante e juros nos regimes simples e composto, aplicando a fórmula correta conforme o enunciado especifica.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t).",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
        "comentarioDetalhado": [
          "Ponto cobrado: Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t).",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa."
        ],
        "armadilhaDaBanca": "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
        "comentarioDetalhado": [
          "Armadilha explorada: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t)."
        ],
        "armadilhaDaBanca": "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Juros simples e compostos, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
        "armadilhaDaBanca": "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
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
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Juros simples e compostos?",
        "alternativas": [
          "Juros simples",
          "Juros compostos",
          "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
          "Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
          "Reconhecer corretamente o termo-chave: juros simples."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
        "armadilhaDaBanca": "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Juros simples e compostos em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa. Pegadinha a evitar: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "juros simples",
          "juros compostos",
          "montante",
          "Simples é linear",
          "sempre sobre o capital inicial"
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
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Juros compostos\" e mostre por que \"Não converter taxa e tempo para a mesma unidade antes de calcular (ex.: taxa mensal com tempo em anos).\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Juros compostos: crescimento exponencial, juros sobre juros. Fórmula: M = C × (1+i)^t.. A armadilha deve ser recusada porque distorce o conteúdo: Não converter taxa e tempo para a mesma unidade antes de calcular (ex.: taxa mensal com tempo em anos).",
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
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 4: Juros simples e compostos",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "assunto": "Matemática financeira",
        "tags": [
          "Matemática",
          "Matemática financeira",
          "juros simples",
          "juros compostos",
          "montante"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "juros-simples-compostos-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Juros simples e compostos, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Juros simples e compostos. Núcleo obrigatório: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.. Pegadinha obrigatória: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Juros simples e compostos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
      "Reconhecer como Juros simples e compostos aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Matemática financeira."
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
        "frente": "Qual é a ideia central de Juros simples e compostos?",
        "verso": "Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: juros simples",
        "verso": "Explique juros simples dentro do tema Juros simples e compostos.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Juros simples e compostos",
        "verso": "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Juros simples e compostos",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "juros simples",
            "juros compostos",
            "montante",
            "Juros simples"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Calcular montante e juros nos regimes simples e composto, aplicando a fórmula correta conforme o enunciado especifica.",
            "Questões que mencionam capital, taxa de juros e período de tempo, pedindo o montante final ou o valor dos juros."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
            "Não converter taxa e tempo para a mesma unidade antes de calcular (ex.: taxa mensal com tempo em anos).",
            "Esquecer que juros compostos incidem sobre o saldo já acumulado, calculando erroneamente como se fosse linear."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Juros simples e compostos\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Juros simples e compostos para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Juros simples e compostos?",
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
      "Matemática",
      "Matemática financeira",
      "Juros simples e compostos",
      "juros simples",
      "juros compostos",
      "montante",
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
        "id": "juros-simples-compostos-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Calcular juros simples e compostos e diferenciar seus regimes de crescimento",
        "enunciado": "Com base no capítulo \"Juros simples e compostos\", assinale a alternativa correta. Um capital de R$ 1.000 é aplicado a juros simples de 2% ao mês, por 5 meses. Qual o montante final?",
        "alternativas": [
          "R$ 1.100,00",
          "R$ 1.104,08",
          "R$ 1.200,00",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 0,
        "comentario": "Usando M = C × (1 + i×t): M = 1000 × (1 + 0,02×5) = 1000 × (1 + 0,10) = 1000 × 1,10 = R$ 1.100,00. Nos juros simples, o crescimento é linear, sem juros sobre juros.",
        "comentarioDetalhado": [
          "Usando M = C × (1 + i×t): M = 1000 × (1 + 0,02×5) = 1000 × (1 + 0,10) = 1000 × 1,10 = R$ 1.100,00. Nos juros simples, o crescimento é linear, sem juros sobre juros.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: juros simples, juros compostos, montante, Juros simples."
        ]
      },
      {
        "id": "juros-simples-compostos-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t).",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Juros simples: crescimento linear, sempre sobre o capital inicial. Fórmula: M = C × (1 + i×t).",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "juros-simples-compostos-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Aplicar a fórmula de juros compostos em um problema de juros simples, ou vice-versa.",
          "Forma correta de lembrar: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa."
        ]
      },
      {
        "id": "juros-simples-compostos-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Juros simples e compostos\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "juros simples",
          "juros compostos",
          "montante",
          "Juros simples",
          "Juros compostos"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "juros-simples-compostos-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Juros simples e compostos\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Juros simples e compostos\", a ideia principal é: Juros simples são calculados sempre sobre o capital inicial (principal), sem incidir sobre juros anteriores acumulados — o crescimento é linear ao longo do tempo. Para estudar sem travar, guarde primeiro estas palavras-chave: juros simples, juros compostos, montante. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Simples é linear, sempre sobre o capital inicial; composto é exponencial, juros sobre juros — confira sempre a unidade de tempo e taxa.",
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
    }
  },
  {
    "id": "equacoes-primeiro-grau",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 5,
    "totalChapters": 10,
    "title": "Equações do 1º grau",
    "assunto": "Álgebra básica",
    "tecnica": "Isolamento da incógnita mantendo o equilíbrio da equação",
    "competencia": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 3,
      "ENEM": 3
    },
    "termosChave": [
      "incógnita",
      "equação do 1º grau",
      "tradução algébrica"
    ],
    "corpo": [
      "Equação do 1º grau é toda igualdade que envolve uma incógnita elevada apenas à primeira potência (sem quadrado, raiz, etc.), do tipo ax + b = c. Resolver a equação significa isolar a incógnita, sempre realizando a mesma operação nos dois lados da igualdade para manter o equilíbrio: o que se faz de um lado, precisa se fazer do outro.",
      "A parte mais desafiadora, na prática de concurso, não costuma ser resolver a equação em si, mas traduzir corretamente o enunciado de um problema para a linguagem algébrica — identificar o que é a incógnita, e transformar as informações do texto em uma equação matemática equivalente.",
      "Expressões comuns e sua tradução: 'o dobro de um número' é 2x; 'a metade' é x/2; 'um número a mais que o dobro de outro' é 2y + 1 (se y for o outro número); 'a soma de dois números consecutivos' é x + (x+1). Ler o problema com atenção e nomear claramente cada incógnita antes de montar a equação evita a maior parte dos erros."
    ],
    "pontosChave": [
      "Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados.",
      "O maior desafio é traduzir o enunciado do problema para a linguagem algébrica corretamente.",
      "Nomeie claramente a incógnita antes de montar a equação, e traduza expressões como 'dobro', 'metade', 'consecutivo' com cuidado."
    ],
    "checkRapido": {
      "pergunta": "A soma de um número com seu dobro é igual a 27. Qual é esse número?",
      "opcoes": [
        "9",
        "13,5",
        "18"
      ],
      "correta": 0,
      "justificativa": "Seja x o número. A equação é: x + 2x = 27 → 3x = 27 → x = 9."
    },
    "oQueCobra": "Traduzir corretamente um problema em linguagem natural para uma equação do 1º grau e resolvê-la isolando a incógnita.",
    "precisaSaberAntes": "Dominar as operações básicas (soma, subtração, multiplicação, divisão) com números inteiros e frações.",
    "explicacao": [
      {
        "titulo": "Números consecutivos — armadilha de tradução",
        "texto": "'Três números inteiros consecutivos' se traduz como x, x+1, x+2 (não x, 2x, 3x — erro muito comum). 'Três números pares consecutivos' se traduz como x, x+2, x+4 (pulando de 2 em 2, não de 1 em 1)."
      },
      {
        "titulo": "Verificação da resposta",
        "texto": "Depois de encontrar o valor da incógnita, sempre substitua de volta no enunciado original (não apenas na equação montada) para confirmar que a resposta realmente satisfaz todas as condições descritas no problema — isso evita erros de tradução que passariam despercebidos apenas verificando a equação."
      }
    ],
    "comoIdentificar": "Problemas com frases descrevendo relações entre números ('a soma de', 'o dobro de', 'consecutivos') pedem tradução para equação do 1º grau.",
    "pegadinhas": [
      "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
      "Não fazer a mesma operação nos dois lados da equação, quebrando o equilíbrio.",
      "Encontrar o valor da incógnita mas esquecer que o problema pedia outra informação derivada dela (ex.: pedia o dobro do número, não o número em si)."
    ],
    "resumoFrase": "O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
    "proximoTitulo": "Equações do 2º grau",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Equações do 1º grau\", a ideia principal é: Equação do 1º grau é toda igualdade que envolve uma incógnita elevada apenas à primeira potência (sem quadrado, raiz, etc.), do tipo ax + b = c. Para estudar sem travar, guarde primeiro estas palavras-chave: incógnita, equação do 1º grau, tradução algébrica. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "incógnita",
      "equação do 1º grau",
      "tradução algébrica",
      "Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados.",
      "O maior desafio é traduzir o enunciado do problema para a linguagem algébrica corretamente."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "A soma de um número com seu dobro é igual a 27. Qual é esse número? Assinale a alternativa correta.",
        "alternativas": [
          "13,5",
          "18",
          "9",
          "incógnita",
          "equação do 1º grau"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Seja x o número. A equação é: x + 2x = 27 → 3x = 27 → x = 9."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          }
        ],
        "comentario": "Seja x o número. A equação é: x + 2x = 27 → 3x = 27 → x = 9.",
        "armadilhaDaBanca": "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "porqueCaiEmProva": "Traduzir corretamente um problema em linguagem natural para uma equação do 1º grau e resolvê-la isolando a incógnita.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
        "comentarioDetalhado": [
          "Ponto cobrado: Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original."
        ],
        "armadilhaDaBanca": "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
        "comentarioDetalhado": [
          "Armadilha explorada: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados."
        ],
        "armadilhaDaBanca": "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Equações do 1º grau, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
        "armadilhaDaBanca": "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
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
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Equações do 1º grau?",
        "alternativas": [
          "Equação do 1º grau",
          "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
          "O maior desafio é traduzir o enunciado do problema para a linguagem algébrica corretamente.",
          "O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
          "Reconhecer corretamente o termo-chave: incógnita."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
        "armadilhaDaBanca": "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Equações do 1º grau em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original. Pegadinha a evitar: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica",
          "O desafio real é traduzir o enunciado pra…",
          "nomeie a incógnita com clareza e sempre…"
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
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"O maior desafio é traduzir o enunciado do problema para a linguagem algébrica corretamente.\" e mostre por que \"Não fazer a mesma operação nos dois lados da equação, quebrando o equilíbrio.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: O maior desafio é traduzir o enunciado do problema para a linguagem algébrica corretamente.. A armadilha deve ser recusada porque distorce o conteúdo: Não fazer a mesma operação nos dois lados da equação, quebrando o equilíbrio.",
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
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 5: Equações do 1º grau",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-primeiro-grau-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Equações do 1º grau, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Equações do 1º grau. Núcleo obrigatório: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.. Pegadinha obrigatória: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Equações do 1º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
      "Reconhecer como Equações do 1º grau aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Álgebra básica."
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
        "frente": "Qual é a ideia central de Equações do 1º grau?",
        "verso": "O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: incógnita",
        "verso": "Explique incógnita dentro do tema Equações do 1º grau.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Equações do 1º grau",
        "verso": "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Equações do 1º grau",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "incógnita",
            "equação do 1º grau",
            "tradução algébrica",
            "Equação do 1º grau"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Traduzir corretamente um problema em linguagem natural para uma equação do 1º grau e resolvê-la isolando a incógnita.",
            "Problemas com frases descrevendo relações entre números ('a soma de', 'o dobro de', 'consecutivos') pedem tradução para equação do 1º grau."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
            "Não fazer a mesma operação nos dois lados da equação, quebrando o equilíbrio.",
            "Encontrar o valor da incógnita mas esquecer que o problema pedia outra informação derivada dela (ex.: pedia o dobro do número, não o número em si)."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Equações do 1º grau\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Equações do 1º grau para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Equações do 1º grau?",
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
      "Matemática",
      "Álgebra básica",
      "Equações do 1º grau",
      "incógnita",
      "equação do 1º grau",
      "tradução algébrica",
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
        "id": "equacoes-primeiro-grau-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Resolver equações do 1º grau e traduzir problemas do enunciado para a linguagem algébrica",
        "enunciado": "Com base no capítulo \"Equações do 1º grau\", assinale a alternativa correta. A soma de um número com seu dobro é igual a 27. Qual é esse número?",
        "alternativas": [
          "9",
          "13,5",
          "18",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 0,
        "comentario": "Seja x o número. A equação é: x + 2x = 27 → 3x = 27 → x = 9.",
        "comentarioDetalhado": [
          "Seja x o número. A equação é: x + 2x = 27 → 3x = 27 → x = 9.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: incógnita, equação do 1º grau, tradução algébrica, Equação do 1º grau."
        ]
      },
      {
        "id": "equacoes-primeiro-grau-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Equação do 1º grau: incógnita na primeira potência — isole-a fazendo a mesma operação nos dois lados.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "equacoes-primeiro-grau-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Traduzir 'números consecutivos' incorretamente como múltiplos (x, 2x, 3x) em vez de somas sucessivas (x, x+1, x+2).",
          "Forma correta de lembrar: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original."
        ]
      },
      {
        "id": "equacoes-primeiro-grau-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Equações do 1º grau\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "incógnita",
          "equação do 1º grau",
          "tradução algébrica",
          "Equação do 1º grau",
          "O maior desafio é traduzir o enunciado do problema para a linguagem algébrica corretamente."
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "equacoes-primeiro-grau-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Equações do 1º grau\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Equações do 1º grau\", a ideia principal é: Equação do 1º grau é toda igualdade que envolve uma incógnita elevada apenas à primeira potência (sem quadrado, raiz, etc.), do tipo ax + b = c. Para estudar sem travar, guarde primeiro estas palavras-chave: incógnita, equação do 1º grau, tradução algébrica. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: O desafio real é traduzir o enunciado pra equação — nomeie a incógnita com clareza e sempre confira a resposta no problema original.",
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
    }
  },
  {
    "id": "equacoes-segundo-grau",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 6,
    "totalChapters": 10,
    "title": "Equações do 2º grau",
    "assunto": "Álgebra básica",
    "tecnica": "Aplicação da fórmula de Bhaskara com verificação do discriminante",
    "competencia": "Resolver equações do 2º grau e interpretar o discriminante",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 3,
      "FCC": 3,
      "ENEM": 3
    },
    "termosChave": [
      "discriminante",
      "fórmula de Bhaskara",
      "raízes da equação"
    ],
    "corpo": [
      "Equação do 2º grau tem a forma ax² + bx + c = 0 (com a ≠ 0). A fórmula de Bhaskara resolve qualquer equação desse tipo: x = (-b ± √Δ) / 2a, onde Δ (discriminante) = b² - 4ac. O sinal de Δ determina quantas soluções reais a equação tem, antes mesmo de calcular as raízes.",
      "Se Δ > 0, a equação tem duas raízes reais e distintas. Se Δ = 0, a equação tem uma raiz real (dita 'raiz dupla', tecnicamente duas raízes iguais). Se Δ < 0, a equação não tem raízes reais (só complexas, fora do escopo de prova de nível médio) — nesse caso, se o problema pede uma solução real, a resposta é 'não existe solução real'.",
      "Quando a equação tem termo 'b' ou 'c' igual a zero (equação incompleta), existe atalho mais rápido do que Bhaskara: se falta o termo c (ax² + bx = 0), fatora-se x(ax+b) = 0, obtendo x=0 ou x=-b/a diretamente. Se falta o termo b (ax² + c = 0), isola-se x² = -c/a e extrai-se a raiz quadrada dos dois lados."
    ],
    "pontosChave": [
      "Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac.",
      "Δ>0: duas raízes reais distintas. Δ=0: uma raiz real (dupla). Δ<0: nenhuma raiz real.",
      "Equação incompleta (sem b ou sem c) tem atalho mais rápido que Bhaskara — fatoração ou isolamento direto."
    ],
    "checkRapido": {
      "pergunta": "Qual o valor do discriminante (Δ) da equação x² - 5x + 6 = 0, e quantas raízes reais ela tem?",
      "opcoes": [
        "Δ = 1, uma raiz",
        "Δ = 1, duas raízes reais distintas",
        "Δ = -1, nenhuma raiz real"
      ],
      "correta": 1,
      "justificativa": "Δ = b² - 4ac = (-5)² - 4×1×6 = 25 - 24 = 1. Como Δ > 0, a equação tem duas raízes reais distintas (que, resolvendo, são x=2 e x=3)."
    },
    "oQueCobra": "Calcular o discriminante e aplicar a fórmula de Bhaskara, ou o atalho apropriado para equações incompletas.",
    "precisaSaberAntes": "Dominar potenciação e radiciação básica, além de operações com números negativos.",
    "explicacao": [
      {
        "titulo": "Relações de Girard — soma e produto das raízes",
        "texto": "Sem precisar calcular as raízes individualmente, é possível saber sua soma (-b/a) e seu produto (c/a) diretamente dos coeficientes — útil para verificar rapidamente se as raízes encontradas fazem sentido, ou para resolver problemas que só pedem soma/produto das soluções."
      },
      {
        "titulo": "Aplicação em problemas de área e produto",
        "texto": "Muitos problemas de concurso (área de terreno retangular, produto de dois números com soma/diferença conhecida) recaem em uma equação do 2º grau depois de montada a tradução algébrica — o desafio, como nas equações de 1º grau, costuma estar mais na tradução do que na resolução em si."
      }
    ],
    "comoIdentificar": "Questões que envolvem área, produto de números relacionados, ou pedem diretamente a resolução de uma equação quadrática.",
    "pegadinhas": [
      "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
      "Aplicar Bhaskara completo em uma equação incompleta, quando o atalho de fatoração seria mais rápido e seguro.",
      "Esquecer o ± na fórmula de Bhaskara, encontrando apenas uma das duas raízes possíveis."
    ],
    "resumoFrase": "O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
    "proximoTitulo": "Progressões aritméticas e geométricas",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Equações do 2º grau\", a ideia principal é: Equação do 2º grau tem a forma ax² + bx + c = 0 (com a ≠ 0). Para estudar sem travar, guarde primeiro estas palavras-chave: discriminante, fórmula de Bhaskara, raízes da equação. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "discriminante",
      "fórmula de Bhaskara",
      "raízes da equação",
      "Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac.",
      "Δ>0: duas raízes reais distintas. Δ=0: uma raiz real (dupla). Δ<0: nenhuma raiz real."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Qual o valor do discriminante (Δ) da equação x² - 5x + 6 = 0, e quantas raízes reais ela tem? Assinale a alternativa correta.",
        "alternativas": [
          "Δ = 1, uma raiz",
          "Δ = 1, duas raízes reais distintas",
          "Δ = -1, nenhuma raiz real",
          "discriminante",
          "fórmula de Bhaskara"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Δ = b² - 4ac = (-5)² - 4×1×6 = 25 - 24 = 1. Como Δ > 0, a equação tem duas raízes reais distintas (que, resolvendo, são x=2 e x=3)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          }
        ],
        "comentario": "Δ = b² - 4ac = (-5)² - 4×1×6 = 25 - 24 = 1. Como Δ > 0, a equação tem duas raízes reais distintas (que, resolvendo, são x=2 e x=3).",
        "armadilhaDaBanca": "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "porqueCaiEmProva": "Calcular o discriminante e aplicar a fórmula de Bhaskara, ou o atalho apropriado para equações incompletas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
        "comentarioDetalhado": [
          "Ponto cobrado: Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara."
        ],
        "armadilhaDaBanca": "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
        "comentarioDetalhado": [
          "Armadilha explorada: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac."
        ],
        "armadilhaDaBanca": "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Equações do 2º grau, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
        "armadilhaDaBanca": "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
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
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Equações do 2º grau?",
        "alternativas": [
          "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
          "Bhaskara",
          "Δ>0",
          "O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
          "Reconhecer corretamente o termo-chave: discriminante."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
        "armadilhaDaBanca": "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Equações do 2º grau em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara. Pegadinha a evitar: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação",
          "O sinal do discriminante já revela quantas…",
          "e equação incompleta tem atalho mais rápido…"
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
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Δ>0\" e mostre por que \"Aplicar Bhaskara completo em uma equação incompleta, quando o atalho de fatoração seria mais rápido e seguro.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Δ>0: duas raízes reais distintas. Δ=0: uma raiz real (dupla). Δ<0: nenhuma raiz real.. A armadilha deve ser recusada porque distorce o conteúdo: Aplicar Bhaskara completo em uma equação incompleta, quando o atalho de fatoração seria mais rápido e seguro.",
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
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 6: Equações do 2º grau",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "assunto": "Álgebra básica",
        "tags": [
          "Matemática",
          "Álgebra básica",
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "equacoes-segundo-grau-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Equações do 2º grau, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Equações do 2º grau. Núcleo obrigatório: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.. Pegadinha obrigatória: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Equações do 2º grau em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Resolver equações do 2º grau e interpretar o discriminante",
      "Reconhecer como Equações do 2º grau aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Álgebra básica."
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
        "frente": "Qual é a ideia central de Equações do 2º grau?",
        "verso": "O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: discriminante",
        "verso": "Explique discriminante dentro do tema Equações do 2º grau.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Equações do 2º grau",
        "verso": "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Equações do 2º grau",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "discriminante",
            "fórmula de Bhaskara",
            "raízes da equação",
            "Bhaskara"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Calcular o discriminante e aplicar a fórmula de Bhaskara, ou o atalho apropriado para equações incompletas.",
            "Questões que envolvem área, produto de números relacionados, ou pedem diretamente a resolução de uma equação quadrática."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
            "Aplicar Bhaskara completo em uma equação incompleta, quando o atalho de fatoração seria mais rápido e seguro.",
            "Esquecer o ± na fórmula de Bhaskara, encontrando apenas uma das duas raízes possíveis."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Equações do 2º grau\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Equações do 2º grau para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Equações do 2º grau?",
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
      "Matemática",
      "Álgebra básica",
      "Equações do 2º grau",
      "discriminante",
      "fórmula de Bhaskara",
      "raízes da equação",
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
        "id": "equacoes-segundo-grau-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Resolver equações do 2º grau e interpretar o discriminante",
        "enunciado": "Com base no capítulo \"Equações do 2º grau\", assinale a alternativa correta. Qual o valor do discriminante (Δ) da equação x² - 5x + 6 = 0, e quantas raízes reais ela tem?",
        "alternativas": [
          "Δ = 1, uma raiz",
          "Δ = 1, duas raízes reais distintas",
          "Δ = -1, nenhuma raiz real",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Δ = b² - 4ac = (-5)² - 4×1×6 = 25 - 24 = 1. Como Δ > 0, a equação tem duas raízes reais distintas (que, resolvendo, são x=2 e x=3).",
        "comentarioDetalhado": [
          "Δ = b² - 4ac = (-5)² - 4×1×6 = 25 - 24 = 1. Como Δ > 0, a equação tem duas raízes reais distintas (que, resolvendo, são x=2 e x=3).",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: discriminante, fórmula de Bhaskara, raízes da equação, Bhaskara."
        ]
      },
      {
        "id": "equacoes-segundo-grau-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Bhaskara: x = (-b ± √Δ)/2a, com Δ = b² - 4ac.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "equacoes-segundo-grau-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Errar o sinal ao calcular Δ = b².",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Errar o sinal ao calcular Δ = b² - 4ac, especialmente quando b ou c são negativos.",
          "Forma correta de lembrar: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara."
        ]
      },
      {
        "id": "equacoes-segundo-grau-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Equações do 2º grau\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "discriminante",
          "fórmula de Bhaskara",
          "raízes da equação",
          "Bhaskara",
          "Δ>0"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "equacoes-segundo-grau-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Equações do 2º grau\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Equações do 2º grau\", a ideia principal é: Equação do 2º grau tem a forma ax² + bx + c = 0 (com a ≠ 0). Para estudar sem travar, guarde primeiro estas palavras-chave: discriminante, fórmula de Bhaskara, raízes da equação. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: O sinal do discriminante já revela quantas raízes existem antes de calcular — e equação incompleta tem atalho mais rápido que Bhaskara.",
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
    }
  },
  {
    "id": "progressoes-pa-pg",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 7,
    "totalChapters": 10,
    "title": "Progressões aritméticas e geométricas",
    "assunto": "Sequências numéricas",
    "tecnica": "Identificação da razão constante (diferença ou quociente)",
    "competencia": "Calcular termo geral e soma de progressões aritméticas e geométricas",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "progressão aritmética",
      "progressão geométrica",
      "termo geral"
    ],
    "corpo": [
      "Progressão aritmética (PA) é uma sequência em que a diferença entre termos consecutivos é sempre constante (a razão r). O termo geral é: an = a1 + (n-1)×r. A soma dos n primeiros termos é: Sn = (a1 + an) × n / 2 — a média entre o primeiro e o último termo, multiplicada pela quantidade de termos.",
      "Progressão geométrica (PG) é uma sequência em que o quociente entre termos consecutivos é sempre constante (a razão q). O termo geral é: an = a1 × q^(n-1). A soma dos n primeiros termos (para q≠1) é: Sn = a1 × (q^n - 1) / (q - 1).",
      "Para diferenciar rapidamente PA de PG ao analisar uma sequência: calcule a diferença entre os dois primeiros termos e compare com a diferença entre os dois seguintes — se forem iguais, é candidata a PA (confirme com mais um par). Calcule o quociente entre os dois primeiros e compare com o quociente entre os dois seguintes — se forem iguais, é candidata a PG."
    ],
    "pontosChave": [
      "PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2.",
      "PG: razão constante (q, por divisão). Termo geral: an = a1×q^(n-1). Soma: Sn = a1×(q^n-1)/(q-1), para q≠1.",
      "Teste a diferença entre termos para PA; teste o quociente entre termos para PG."
    ],
    "checkRapido": {
      "pergunta": "Em uma PA com primeiro termo 5 e razão 3, qual é o 10º termo?",
      "opcoes": [
        "27",
        "32",
        "35"
      ],
      "correta": 1,
      "justificativa": "Usando an = a1 + (n-1)×r: a10 = 5 + (10-1)×3 = 5 + 27 = 32."
    },
    "oQueCobra": "Aplicar corretamente as fórmulas de termo geral e soma para progressões aritméticas e geométricas.",
    "precisaSaberAntes": "Ter noção de potenciação (para PG) e de médias (para a fórmula da soma da PA).",
    "explicacao": [
      {
        "titulo": "PG infinita — soma de termos que tende a um valor",
        "texto": "Quando a razão q está entre -1 e 1 (excluindo 0), e a PG tem infinitos termos, a soma converge para um valor finito: S∞ = a1 / (1 - q) — usado em problemas que descrevem processos que se repetem indefinidamente, mas com efeito cada vez menor (ex.: uma bola que quica com altura decrescente)."
      },
      {
        "titulo": "Problemas de juros compostos são PG disfarçada",
        "texto": "Uma sequência de capitais em juros compostos (C, C×(1+i), C×(1+i)², ...) é uma progressão geométrica de razão (1+i) — relacionando diretamente esse conteúdo ao capítulo de juros compostos já estudado."
      }
    ],
    "comoIdentificar": "Questões que apresentam uma sequência com padrão constante de diferença (PA) ou proporção (PG) e pedem um termo específico ou a soma de termos.",
    "pegadinhas": [
      "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
      "Errar o expoente na fórmula do termo geral da PG (é n-1, não n).",
      "Esquecer que a fórmula da soma de PG não se aplica quando q=1 (nesse caso, a soma é simplesmente a1 × n)."
    ],
    "resumoFrase": "PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
    "proximoTitulo": "Geometria plana: áreas e perímetros",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__recomendada_conferencia_juridica_periodica",
    "riscoAtualizacao": "medio",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "exatas",
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Progressões aritméticas e geométricas\", a ideia principal é: Progressão aritmética (PA) é uma sequência em que a diferença entre termos consecutivos é sempre constante (a razão r). Para estudar sem travar, guarde primeiro estas palavras-chave: progressão aritmética, progressão geométrica, termo geral. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "progressão aritmética",
      "progressão geométrica",
      "termo geral",
      "PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2.",
      "PG: razão constante (q, por divisão). Termo geral: an = a1×q^(n-1). Soma: Sn = a1×(q^n-1)/(q-1), para q≠1."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Em uma PA com primeiro termo 5 e razão 3, qual é o 10º termo? Assinale a alternativa correta.",
        "alternativas": [
          "27",
          "35",
          "32",
          "progressão aritmética",
          "progressão geométrica"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Usando an = a1 + (n-1)×r: a10 = 5 + (10-1)×3 = 5 + 27 = 32."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          }
        ],
        "comentario": "Usando an = a1 + (n-1)×r: a10 = 5 + (10-1)×3 = 5 + 27 = 32.",
        "armadilhaDaBanca": "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
        "porqueCaiEmProva": "Aplicar corretamente as fórmulas de termo geral e soma para progressões aritméticas e geométricas.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
        "comentarioDetalhado": [
          "Ponto cobrado: PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula."
        ],
        "armadilhaDaBanca": "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa).",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
        "comentarioDetalhado": [
          "Armadilha explorada: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2."
        ],
        "armadilhaDaBanca": "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Progressões aritméticas e geométricas, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
        "armadilhaDaBanca": "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
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
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Progressões aritméticas e geométricas?",
        "alternativas": [
          "PA",
          "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa).",
          "PG",
          "PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
          "Reconhecer corretamente o termo-chave: progressão aritmética."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
        "armadilhaDaBanca": "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Progressões aritméticas e geométricas em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula. Pegadinha a evitar: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "progressão aritmética",
          "progressão geométrica",
          "termo geral",
          "PA soma diferença constante",
          "PG multiplica razão constante"
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
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"PG\" e mostre por que \"Errar o expoente na fórmula do termo geral da PG (é n-1, não n).\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: PG: razão constante (q, por divisão). Termo geral: an = a1×q^(n-1). Soma: Sn = a1×(q^n-1)/(q-1), para q≠1.. A armadilha deve ser recusada porque distorce o conteúdo: Errar o expoente na fórmula do termo geral da PG (é n-1, não n).",
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
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 7: Progressões aritméticas e geométricas",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "assunto": "Sequências numéricas",
        "tags": [
          "Matemática",
          "Sequências numéricas",
          "progressão aritmética",
          "progressão geométrica",
          "termo geral"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "progressoes-pa-pg-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Progressões aritméticas e geométricas, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Progressões aritméticas e geométricas. Núcleo obrigatório: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.. Pegadinha obrigatória: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Progressões aritméticas e geométricas em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Calcular termo geral e soma de progressões aritméticas e geométricas",
      "Reconhecer como Progressões aritméticas e geométricas aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Sequências numéricas."
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
        "frente": "Qual é a ideia central de Progressões aritméticas e geométricas?",
        "verso": "PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: progressão aritmética",
        "verso": "Explique progressão aritmética dentro do tema Progressões aritméticas e geométricas.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Progressões aritméticas e geométricas",
        "verso": "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Progressões aritméticas e geométricas",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "progressão aritmética",
            "progressão geométrica",
            "termo geral",
            "PA"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar corretamente as fórmulas de termo geral e soma para progressões aritméticas e geométricas.",
            "Questões que apresentam uma sequência com padrão constante de diferença (PA) ou proporção (PG) e pedem um termo específico ou a soma de termos."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
            "Errar o expoente na fórmula do termo geral da PG (é n-1, não n).",
            "Esquecer que a fórmula da soma de PG não se aplica quando q=1 (nesse caso, a soma é simplesmente a1 × n)."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Progressões aritméticas e geométricas\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Progressões aritméticas e geométricas para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Progressões aritméticas e geométricas?",
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
      "Matemática",
      "Sequências numéricas",
      "Progressões aritméticas e geométricas",
      "progressão aritmética",
      "progressão geométrica",
      "termo geral",
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
        "id": "progressoes-pa-pg-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Calcular termo geral e soma de progressões aritméticas e geométricas",
        "enunciado": "Com base no capítulo \"Progressões aritméticas e geométricas\", assinale a alternativa correta. Em uma PA com primeiro termo 5 e razão 3, qual é o 10º termo?",
        "alternativas": [
          "27",
          "32",
          "35",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Usando an = a1 + (n-1)×r: a10 = 5 + (10-1)×3 = 5 + 27 = 32.",
        "comentarioDetalhado": [
          "Usando an = a1 + (n-1)×r: a10 = 5 + (10-1)×3 = 5 + 27 = 32.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: progressão aritmética, progressão geométrica, termo geral, PA."
        ]
      },
      {
        "id": "progressoes-pa-pg-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: PA: diferença constante (r). Termo geral: an = a1 + (n-1)r. Soma: Sn = (a1+an)×n/2.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "progressoes-pa-pg-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa).",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Aplicar fórmula de PA em uma sequência que é, na verdade, PG (ou vice-versa) — sempre teste antes qual padrão está presente.",
          "Forma correta de lembrar: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula."
        ]
      },
      {
        "id": "progressoes-pa-pg-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Progressões aritméticas e geométricas\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "progressão aritmética",
          "progressão geométrica",
          "termo geral",
          "PA",
          "PG"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "progressoes-pa-pg-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Progressões aritméticas e geométricas\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Progressões aritméticas e geométricas\", a ideia principal é: Progressão aritmética (PA) é uma sequência em que a diferença entre termos consecutivos é sempre constante (a razão r). Para estudar sem travar, guarde primeiro estas palavras-chave: progressão aritmética, progressão geométrica, termo geral. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: PA soma diferença constante; PG multiplica razão constante — sempre teste qual padrão está presente antes de aplicar a fórmula.",
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
    }
  },
  {
    "id": "geometria-plana",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 8,
    "totalChapters": 10,
    "title": "Geometria plana: áreas e perímetros",
    "assunto": "Geometria plana",
    "tecnica": "Decomposição de figuras compostas em formas conhecidas",
    "competencia": "Calcular área e perímetro das principais figuras planas",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 4
    },
    "termosChave": [
      "área",
      "perímetro",
      "Teorema de Pitágoras"
    ],
    "corpo": [
      "Perímetro é a soma de todos os lados de uma figura (a 'volta' em torno dela); área é a medida da superfície interna, sempre em unidades ao quadrado. Fórmulas principais: retângulo (área = base × altura, perímetro = 2×(base+altura)); quadrado (área = lado², perímetro = 4×lado); triângulo (área = base×altura/2); círculo (área = π×r², perímetro/circunferência = 2×π×r).",
      "O Teorema de Pitágoras (a² = b² + c², em que a é a hipotenusa e b, c são os catetos) é ferramenta essencial em triângulos retângulos, usado para encontrar um lado desconhecido quando os outros dois são conhecidos — muito comum em problemas que envolvem escadas apoiadas em paredes, diagonais de retângulos, ou distâncias em linha reta entre pontos.",
      "Para figuras compostas (formas irregulares que combinam retângulos, triângulos, semicírculos), a estratégia é sempre decompor a figura em formas geométricas conhecidas, calcular a área de cada parte separadamente, e somar (ou subtrair, se uma parte for um 'buraco' na figura) os resultados parciais."
    ],
    "pontosChave": [
      "Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²).",
      "Teorema de Pitágoras: a² = b² + c² (hipotenusa² = soma dos quadrados dos catetos) — só vale em triângulo retângulo.",
      "Figuras compostas: decomponha em formas conhecidas, calcule cada área separadamente e some (ou subtraia)."
    ],
    "checkRapido": {
      "pergunta": "Uma escada está apoiada em uma parede, formando um triângulo retângulo: a base no chão mede 3 metros e a escada (hipotenusa) mede 5 metros. Qual a altura que a escada alcança na parede?",
      "opcoes": [
        "2 metros",
        "4 metros",
        "8 metros"
      ],
      "correta": 1,
      "justificativa": "Usando Pitágoras: 5² = 3² + altura² → 25 = 9 + altura² → altura² = 16 → altura = 4 metros."
    },
    "oQueCobra": "Aplicar as fórmulas de área e perímetro das figuras planas mais comuns, e o Teorema de Pitágoras em triângulos retângulos.",
    "precisaSaberAntes": "Ter noção de radiciação (raiz quadrada) para resolver o Teorema de Pitágoras.",
    "explicacao": [
      {
        "titulo": "Trio pitagórico — atalho de memorização",
        "texto": "Alguns conjuntos de lados satisfazem Pitágoras exatamente, sem precisar de raiz quadrada 'feia': 3-4-5, 6-8-10, 5-12-13 (e seus múltiplos) — reconhecer esses trios agiliza muito a resolução quando os números da questão batem com um deles."
      },
      {
        "titulo": "Área do trapézio",
        "texto": "Área do trapézio = (base maior + base menor) × altura / 2 — outra figura frequentemente cobrada, que combina a lógica de 'média das bases' com a altura, de forma parecida com a fórmula da soma de PA."
      }
    ],
    "comoIdentificar": "Questões com plantas de terrenos, medidas de parede/escada, ou figuras geométricas com medidas dadas testam esse conteúdo.",
    "pegadinhas": [
      "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
      "Aplicar Pitágoras em triângulo que não é retângulo.",
      "Em figuras compostas, esquecer de subtrair a área de uma parte que é um 'vazio' dentro da figura maior."
    ],
    "resumoFrase": "Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
    "proximoTitulo": "Geometria espacial: volumes",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Geometria plana: áreas e perímetros\", a ideia principal é: Perímetro é a soma de todos os lados de uma figura (a 'volta' em torno dela); área é a medida da superfície interna, sempre em unidades ao quadrado. Para estudar sem travar, guarde primeiro estas palavras-chave: área, perímetro, Teorema de Pitágoras. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "área",
      "perímetro",
      "Teorema de Pitágoras",
      "Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²).",
      "Teorema de Pitágoras: a² = b² + c² (hipotenusa² = soma dos quadrados dos catetos) — só vale em triângulo retângulo."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Uma escada está apoiada em uma parede, formando um triângulo retângulo: a base no chão mede 3 metros e a escada (hipotenusa) mede 5 metros. Qual a altura que a escada alcança na parede? Assinale a alternativa correta.",
        "alternativas": [
          "4 metros",
          "2 metros",
          "8 metros",
          "área",
          "perímetro"
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. Usando Pitágoras: 5² = 3² + altura² → 25 = 9 + altura² → altura² = 16 → altura = 4 metros."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          }
        ],
        "comentario": "Usando Pitágoras: 5² = 3² + altura² → 25 = 9 + altura² → altura² = 16 → altura = 4 metros.",
        "armadilhaDaBanca": "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
        "porqueCaiEmProva": "Aplicar as fórmulas de área e perímetro das figuras planas mais comuns, e o Teorema de Pitágoras em triângulos retângulos.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²).",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
        "comentarioDetalhado": [
          "Ponto cobrado: Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²).",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil."
        ],
        "armadilhaDaBanca": "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: área e perímetro, aplicando a fórmula errada para o que foi pedido. são conceitos equivalentes para fins de prova.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
        "comentarioDetalhado": [
          "Armadilha explorada: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²)."
        ],
        "armadilhaDaBanca": "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Geometria plana: áreas e perímetros, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
        "alternativas": [
          "Marcar a alternativa pela palavra-chave mais conhecida, sem conferir o contexto.",
          "Ignorar exceções porque a regra geral sempre resolve todas as questões.",
          "Aplicar a regra do capítulo ao caso concreto, conferindo requisito, competência, exceção e consequência.",
          "Usar uma regra parecida de outro capítulo sem verificar se ela se aplica ao caso.",
          "Escolher a alternativa mais longa, mesmo que ela altere o requisito principal."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
        "armadilhaDaBanca": "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
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
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Geometria plana: áreas e perímetros?",
        "alternativas": [
          "Perímetro é a soma dos lados (contorno)",
          "Teorema de Pitágoras",
          "Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
          "Reconhecer corretamente o termo-chave: área.",
          "área e perímetro, aplicando a fórmula errada para o que foi pedido. são conceitos equivalentes para fins de prova."
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
        "armadilhaDaBanca": "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Geometria plana: áreas e perímetros em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil. Pegadinha a evitar: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "área",
          "perímetro",
          "Teorema de Pitágoras",
          "Perímetro é contorno",
          "área é superfície"
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
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Teorema de Pitágoras\" e mostre por que \"Aplicar Pitágoras em triângulo que não é retângulo.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Teorema de Pitágoras: a² = b² + c² (hipotenusa² = soma dos quadrados dos catetos) — só vale em triângulo retângulo.. A armadilha deve ser recusada porque distorce o conteúdo: Aplicar Pitágoras em triângulo que não é retângulo.",
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
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 8: Geometria plana: áreas e perímetros",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "assunto": "Geometria plana",
        "tags": [
          "Matemática",
          "Geometria plana",
          "área",
          "perímetro",
          "Teorema de Pitágoras"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-plana-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Geometria plana: áreas e perímetros, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Geometria plana: áreas e perímetros. Núcleo obrigatório: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.. Pegadinha obrigatória: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Geometria plana: áreas e perímetros em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Calcular área e perímetro das principais figuras planas",
      "Reconhecer como Geometria plana: áreas e perímetros aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Geometria plana."
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
        "frente": "Qual é a ideia central de Geometria plana: áreas e perímetros?",
        "verso": "Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: área",
        "verso": "Explique área dentro do tema Geometria plana: áreas e perímetros.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Geometria plana: áreas e perímetros",
        "verso": "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Geometria plana: áreas e perímetros",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "área",
            "perímetro",
            "Teorema de Pitágoras",
            "Perímetro é a soma dos lados (contorno)"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar as fórmulas de área e perímetro das figuras planas mais comuns, e o Teorema de Pitágoras em triângulos retângulos.",
            "Questões com plantas de terrenos, medidas de parede/escada, ou figuras geométricas com medidas dadas testam esse conteúdo."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
            "Aplicar Pitágoras em triângulo que não é retângulo.",
            "Em figuras compostas, esquecer de subtrair a área de uma parte que é um 'vazio' dentro da figura maior."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Geometria plana: áreas e perímetros\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Geometria plana: áreas e perímetros para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Geometria plana: áreas e perímetros?",
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
      "Matemática",
      "Geometria plana",
      "Geometria plana: áreas e perímetros",
      "área",
      "perímetro",
      "Teorema de Pitágoras",
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
        "id": "geometria-plana-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Calcular área e perímetro das principais figuras planas",
        "enunciado": "Com base no capítulo \"Geometria plana: áreas e perímetros\", assinale a alternativa correta. Uma escada está apoiada em uma parede, formando um triângulo retângulo: a base no chão mede 3 metros e a escada (hipotenusa) mede 5 metros. Qual a altura que a escada alcança na parede?",
        "alternativas": [
          "2 metros",
          "4 metros",
          "8 metros",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Usando Pitágoras: 5² = 3² + altura² → 25 = 9 + altura² → altura² = 16 → altura = 4 metros.",
        "comentarioDetalhado": [
          "Usando Pitágoras: 5² = 3² + altura² → 25 = 9 + altura² → altura² = 16 → altura = 4 metros.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: área, perímetro, Teorema de Pitágoras, Perímetro é a soma dos lados (contorno)."
        ]
      },
      {
        "id": "geometria-plana-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²).",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Perímetro é a soma dos lados (contorno); área é a medida da superfície (sempre em unidade²).",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "geometria-plana-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Área e perímetro, aplicando a fórmula errada para o que foi pedido. são a mesma coisa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Confundir área com perímetro, aplicando a fórmula errada para o que foi pedido.",
          "Forma correta de lembrar: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil."
        ]
      },
      {
        "id": "geometria-plana-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Geometria plana: áreas e perímetros\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "área",
          "perímetro",
          "Teorema de Pitágoras",
          "Perímetro é a soma dos lados (contorno)",
          "Figuras compostas"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "geometria-plana-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Geometria plana: áreas e perímetros\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Geometria plana: áreas e perímetros\", a ideia principal é: Perímetro é a soma de todos os lados de uma figura (a 'volta' em torno dela); área é a medida da superfície interna, sempre em unidades ao quadrado. Para estudar sem travar, guarde primeiro estas palavras-chave: área, perímetro, Teorema de Pitágoras. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Perímetro é contorno, área é superfície — Pitágoras só vale em triângulo retângulo, e os trios 3-4-5/6-8-10/5-12-13 são atalho útil.",
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
    }
  },
  {
    "id": "geometria-espacial-volumes",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 9,
    "totalChapters": 10,
    "title": "Geometria espacial: volumes",
    "assunto": "Geometria espacial",
    "tecnica": "Associação de cada sólido à sua fórmula de volume",
    "competencia": "Calcular o volume dos principais sólidos geométricos",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 3,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "volume",
      "prisma",
      "cilindro"
    ],
    "corpo": [
      "Volume mede o espaço ocupado por um sólido tridimensional, em unidades ao cubo. Para prismas (incluindo o paralelepípedo/caixa retangular e o cubo), a fórmula geral é: volume = área da base × altura. No cubo, como todas as arestas são iguais, o volume se simplifica para aresta³.",
      "Cilindro segue a mesma lógica de prisma (área da base circular × altura): volume = π × r² × altura, onde r é o raio da base circular. Cone e pirâmide têm volume igual a um terço do prisma/cilindro de mesma base e altura: volume = (área da base × altura) / 3.",
      "Esfera tem fórmula própria, sem base plana: volume = (4/3) × π × r³. É importante lembrar que o expoente do raio muda conforme a dimensão: em área (2D) o raio aparece ao quadrado (r²); em volume (3D), aparece ao cubo (r³) — essa diferença de expoente é um erro comum de confusão entre área de círculo e volume de esfera."
    ],
    "pontosChave": [
      "Prisma/cilindro: volume = área da base × altura. Cubo: aresta³.",
      "Cone/pirâmide: volume = (área da base × altura) / 3 — um terço do prisma/cilindro correspondente.",
      "Esfera: volume = (4/3) × π × r³ — raio ao cubo, não ao quadrado (diferente da área do círculo)."
    ],
    "checkRapido": {
      "pergunta": "Qual o volume de um cilindro com raio da base igual a 2 metros e altura igual a 5 metros? (use π ≈ 3)",
      "opcoes": [
        "30 m³",
        "60 m³",
        "20 m³"
      ],
      "correta": 1,
      "justificativa": "Volume do cilindro = π × r² × altura = 3 × 2² × 5 = 3 × 4 × 5 = 60 m³."
    },
    "oQueCobra": "Aplicar corretamente a fórmula de volume de cada sólido geométrico, sem confundir os expoentes do raio.",
    "precisaSaberAntes": "Ter fixado bem as fórmulas de área plana (capítulo anterior), já que a maioria dos volumes parte da 'área da base × altura'.",
    "explicacao": [
      {
        "titulo": "Relação entre cone/pirâmide e o sólido de mesma base",
        "texto": "Sempre que a questão descrever cone e cilindro (ou pirâmide e prisma) de mesma base e mesma altura, o volume do cone/pirâmide é exatamente um terço do volume do cilindro/prisma correspondente — um atalho útil para checar rapidamente se a resposta calculada faz sentido."
      },
      {
        "titulo": "Problemas de capacidade — conversão de unidades",
        "texto": "Muitos problemas de volume pedem a resposta em litros, não em metros cúbicos — lembre-se da conversão: 1 m³ = 1000 litros. Esse é um passo final que costuma ser esquecido, levando a uma resposta numericamente correta, mas na unidade errada."
      }
    ],
    "comoIdentificar": "Questões que descrevem reservatórios, caixas, tanques ou embalagens com formato geométrico e pedem capacidade ou volume.",
    "pegadinhas": [
      "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
      "Esquecer de dividir por 3 no volume de cone/pirâmide.",
      "Não converter a unidade final quando o problema pede litros, mas o cálculo foi feito em metros cúbicos."
    ],
    "resumoFrase": "Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
    "proximoTitulo": "Estatística básica: média, moda e mediana",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Geometria espacial: volumes\", a ideia principal é: Volume mede o espaço ocupado por um sólido tridimensional, em unidades ao cubo. Para estudar sem travar, guarde primeiro estas palavras-chave: volume, prisma, cilindro. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "volume",
      "prisma",
      "cilindro",
      "Prisma/cilindro: volume = área da base × altura. Cubo: aresta³.",
      "Cone/pirâmide: volume = (área da base × altura) / 3 — um terço do prisma/cilindro correspondente."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Qual o volume de um cilindro com raio da base igual a 2 metros e altura igual a 5 metros? (use π ≈ 3) Assinale a alternativa correta.",
        "alternativas": [
          "30 m³",
          "60 m³",
          "20 m³",
          "volume",
          "prisma"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Volume do cilindro = π × r² × altura = 3 × 2² × 5 = 3 × 4 × 5 = 60 m³."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          }
        ],
        "comentario": "Volume do cilindro = π × r² × altura = 3 × 2² × 5 = 3 × 4 × 5 = 60 m³.",
        "armadilhaDaBanca": "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "porqueCaiEmProva": "Aplicar corretamente a fórmula de volume de cada sólido geométrico, sem confundir os expoentes do raio.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Prisma/cilindro: volume = área da base × altura. Cubo: aresta³.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
        "comentarioDetalhado": [
          "Ponto cobrado: Prisma/cilindro: volume = área da base × altura. Cubo: aresta³.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³)."
        ],
        "armadilhaDaBanca": "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
        "comentarioDetalhado": [
          "Armadilha explorada: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Prisma/cilindro: volume = área da base × altura. Cubo: aresta³."
        ],
        "armadilhaDaBanca": "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Geometria espacial: volumes, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
        "armadilhaDaBanca": "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
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
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Geometria espacial: volumes?",
        "alternativas": [
          "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
          "Prisma/cilindro",
          "Cone/pirâmide",
          "Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros…",
          "Reconhecer corretamente o termo-chave: volume."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
        "armadilhaDaBanca": "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Geometria espacial: volumes em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³). Pegadinha a evitar: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "volume",
          "prisma",
          "cilindro",
          "Prisma/cilindro: base × altura",
          "Cone/pirâmide: um terço disso"
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
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Cone/pirâmide\" e mostre por que \"Esquecer de dividir por 3 no volume de cone/pirâmide.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Cone/pirâmide: volume = (área da base × altura) / 3 — um terço do prisma/cilindro correspondente.. A armadilha deve ser recusada porque distorce o conteúdo: Esquecer de dividir por 3 no volume de cone/pirâmide.",
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
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 9: Geometria espacial: volumes",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "assunto": "Geometria espacial",
        "tags": [
          "Matemática",
          "Geometria espacial",
          "volume",
          "prisma",
          "cilindro"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "geometria-espacial-volumes-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Geometria espacial: volumes, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Geometria espacial: volumes. Núcleo obrigatório: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).. Pegadinha obrigatória: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Geometria espacial: volumes em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Calcular o volume dos principais sólidos geométricos",
      "Reconhecer como Geometria espacial: volumes aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Geometria espacial."
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
        "frente": "Qual é a ideia central de Geometria espacial: volumes?",
        "verso": "Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: volume",
        "verso": "Explique volume dentro do tema Geometria espacial: volumes.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Geometria espacial: volumes",
        "verso": "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Geometria espacial: volumes",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³)."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "volume",
            "prisma",
            "cilindro",
            "Prisma/cilindro"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Aplicar corretamente a fórmula de volume de cada sólido geométrico, sem confundir os expoentes do raio.",
            "Questões que descrevem reservatórios, caixas, tanques ou embalagens com formato geométrico e pedem capacidade ou volume."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
            "Esquecer de dividir por 3 no volume de cone/pirâmide.",
            "Não converter a unidade final quando o problema pede litros, mas o cálculo foi feito em metros cúbicos."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Geometria espacial: volumes\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Geometria espacial: volumes para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Geometria espacial: volumes?",
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
      "Matemática",
      "Geometria espacial",
      "Geometria espacial: volumes",
      "volume",
      "prisma",
      "cilindro",
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
        "id": "geometria-espacial-volumes-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Calcular o volume dos principais sólidos geométricos",
        "enunciado": "Com base no capítulo \"Geometria espacial: volumes\", assinale a alternativa correta. Qual o volume de um cilindro com raio da base igual a 2 metros e altura igual a 5 metros? (use π ≈ 3)",
        "alternativas": [
          "30 m³",
          "60 m³",
          "20 m³",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Volume do cilindro = π × r² × altura = 3 × 2² × 5 = 3 × 4 × 5 = 60 m³.",
        "comentarioDetalhado": [
          "Volume do cilindro = π × r² × altura = 3 × 2² × 5 = 3 × 4 × 5 = 60 m³.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: volume, prisma, cilindro, Prisma/cilindro."
        ]
      },
      {
        "id": "geometria-espacial-volumes-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Prisma/cilindro: volume = área da base × altura. Cubo: aresta³.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Prisma/cilindro: volume = área da base × altura. Cubo: aresta³.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "geometria-espacial-volumes-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Usar r² em vez de r³ na fórmula da esfera (confundindo com a fórmula de área do círculo).",
          "Forma correta de lembrar: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³)."
        ]
      },
      {
        "id": "geometria-espacial-volumes-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Geometria espacial: volumes\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "volume",
          "prisma",
          "cilindro",
          "Prisma/cilindro",
          "Cone/pirâmide"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "geometria-espacial-volumes-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Geometria espacial: volumes\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Geometria espacial: volumes\", a ideia principal é: Volume mede o espaço ocupado por um sólido tridimensional, em unidades ao cubo. Para estudar sem travar, guarde primeiro estas palavras-chave: volume, prisma, cilindro. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Prisma/cilindro: base × altura. Cone/pirâmide: um terço disso. Esfera: raio ao CUBO, não ao quadrado — e confira a unidade pedida (litros x m³).",
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
    }
  },
  {
    "id": "estatistica-basica",
    "materialTitle": "Matemática para PMMA",
    "subject": "Matemática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Matemática Básica",
    "chapterIndex": 10,
    "totalChapters": 10,
    "title": "Estatística básica: média, moda e mediana",
    "assunto": "Estatística descritiva",
    "tecnica": "Ordenação dos dados antes de calcular a mediana",
    "competencia": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 3,
      "FCC": 4,
      "ENEM": 4
    },
    "termosChave": [
      "média aritmética",
      "moda",
      "mediana"
    ],
    "corpo": [
      "Média aritmética é a soma de todos os valores dividida pela quantidade de valores — a medida mais usada, mas sensível a valores muito extremos (outliers), que podem distorcer o resultado para cima ou para baixo. Moda é o valor que mais se repete no conjunto de dados — um conjunto pode não ter moda (nenhum valor se repete), ter uma moda (unimodal) ou mais de uma (bimodal, multimodal).",
      "Mediana é o valor que ocupa a posição central quando os dados são ordenados (crescente ou decrescente) — diferente da média, a mediana não é distorcida por valores extremos, sendo uma medida mais 'robusta' em conjuntos com grande variação. Se a quantidade de dados é ímpar, a mediana é o valor exatamente do meio; se é par, a mediana é a média aritmética dos dois valores centrais.",
      "Um erro muito comum é calcular a mediana sem ordenar os dados primeiro — a posição central só faz sentido depois que os valores estão organizados em ordem crescente ou decrescente. Também é importante notar que, em conjuntos de dados com grande dispersão ou valores extremos discrepantes, a mediana costuma representar melhor o 'valor típico' do conjunto do que a média."
    ],
    "pontosChave": [
      "Média: soma dividida pela quantidade — sensível a valores extremos.",
      "Moda: valor que mais se repete — pode não existir, ou haver mais de uma.",
      "Mediana: valor central após ORDENAR os dados — ímpar: valor do meio; par: média dos dois centrais."
    ],
    "checkRapido": {
      "pergunta": "Qual a mediana do conjunto de dados: 7, 2, 9, 4, 5?",
      "opcoes": [
        "9",
        "5",
        "4"
      ],
      "correta": 1,
      "justificativa": "Primeiro ordena-se o conjunto: 2, 4, 5, 7, 9. Como há 5 valores (quantidade ímpar), a mediana é o valor central, que ocupa a 3ª posição: 5."
    },
    "oQueCobra": "Calcular corretamente média, moda e mediana, com atenção especial à necessidade de ordenar os dados antes de encontrar a mediana.",
    "precisaSaberAntes": "Ter fluência em somar conjuntos de números e dividir para calcular médias.",
    "explicacao": [
      {
        "titulo": "Quando a média é distorcida — exemplo prático",
        "texto": "Em um grupo de 5 policiais com salários de R$ 3.000, R$ 3.200, R$ 3.100, R$ 3.300 e R$ 15.000 (um comandante), a média seria puxada para cima por esse único valor discrepante, não representando bem o salário 'típico' do grupo — nesse caso, a mediana (R$ 3.200) reflete melhor a realidade da maioria."
      },
      {
        "titulo": "Leitura de gráficos e tabelas simples",
        "texto": "Além dos cálculos, provas cobram interpretação direta de gráficos de barras, colunas e setores (pizza) — a dica é sempre ler atentamente os rótulos dos eixos e a legenda antes de tentar extrair qualquer conclusão numérica do gráfico."
      }
    ],
    "comoIdentificar": "Questões que fornecem um conjunto de valores e pedem média, moda ou mediana, ou que exigem leitura de gráfico/tabela.",
    "pegadinhas": [
      "Calcular a mediana sem ordenar os dados primeiro.",
      "Na quantidade par de dados, esquecer de tirar a média dos dois valores centrais (pegando só um deles por engano).",
      "Confundir moda (valor mais frequente) com média (valor calculado pela soma/quantidade)."
    ],
    "resumoFrase": "Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
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
    "explicacaoComoSeTivesse12": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Estatística básica: média, moda e mediana\", a ideia principal é: Média aritmética é a soma de todos os valores dividida pela quantidade de valores — a medida mais usada, mas sensível a valores muito extremos (outliers), que podem distorcer o resultado para cima ou para baixo. Para estudar sem travar, guarde primeiro estas palavras-chave: média aritmética, moda, mediana. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "média aritmética",
      "moda",
      "mediana",
      "Média: soma dividida pela quantidade — sensível a valores extremos.",
      "Moda: valor que mais se repete — pode não existir, ou haver mais de uma."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Qual a mediana do conjunto de dados: 7, 2, 9, 4, 5? Assinale a alternativa correta.",
        "alternativas": [
          "9",
          "4",
          "média aritmética",
          "5",
          "moda"
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Primeiro ordena-se o conjunto: 2, 4, 5, 7, 9. Como há 5 valores (quantidade ímpar), a mediana é o valor central, que ocupa a 3ª posição: 5."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          }
        ],
        "comentario": "Primeiro ordena-se o conjunto: 2, 4, 5, 7, 9. Como há 5 valores (quantidade ímpar), a mediana é o valor central, que ocupa a 3ª posição: 5.",
        "armadilhaDaBanca": "Calcular a mediana sem ordenar os dados primeiro.",
        "porqueCaiEmProva": "Calcular corretamente média, moda e mediana, com atenção especial à necessidade de ordenar os dados antes de encontrar a mediana.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Média: soma dividida pela quantidade — sensível a valores extremos.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
        "comentarioDetalhado": [
          "Ponto cobrado: Média: soma dividida pela quantidade — sensível a valores extremos.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido."
        ],
        "armadilhaDaBanca": "Calcular a mediana sem ordenar os dados primeiro.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Calcular a mediana sem ordenar os dados primeiro.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
        "comentarioDetalhado": [
          "Armadilha explorada: Calcular a mediana sem ordenar os dados primeiro.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Média: soma dividida pela quantidade — sensível a valores extremos."
        ],
        "armadilhaDaBanca": "Calcular a mediana sem ordenar os dados primeiro.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Estatística básica: média, moda e mediana, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
        "armadilhaDaBanca": "Calcular a mediana sem ordenar os dados primeiro.",
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
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Estatística básica: média, moda e mediana?",
        "alternativas": [
          "Média",
          "Moda",
          "Calcular a mediana sem ordenar os dados primeiro.",
          "Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
          "Reconhecer corretamente o termo-chave: média aritmética."
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Calcular a mediana sem ordenar os dados primeiro."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
        "armadilhaDaBanca": "Calcular a mediana sem ordenar os dados primeiro.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Estatística básica: média, moda e mediana em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido. Pegadinha a evitar: Calcular a mediana sem ordenar os dados primeiro.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "média aritmética",
          "moda",
          "mediana",
          "Sempre ORDENE antes de achar a mediana",
          "ela resiste a valores extremos melhor que a…"
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
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Moda\" e mostre por que \"Na quantidade par de dados, esquecer de tirar a média dos dois valores centrais (pegando só um deles por engano).\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Moda: valor que mais se repete — pode não existir, ou haver mais de uma.. A armadilha deve ser recusada porque distorce o conteúdo: Na quantidade par de dados, esquecer de tirar a média dos dois valores centrais (pegando só um deles por engano).",
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
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Matemática para PMMA > Capítulo 10: Estatística básica: média, moda e mediana",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "assunto": "Estatística descritiva",
        "tags": [
          "Matemática",
          "Estatística descritiva",
          "média aritmética",
          "moda",
          "mediana"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "estatistica-basica-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Estatística básica: média, moda e mediana, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Estatística básica: média, moda e mediana. Núcleo obrigatório: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.. Pegadinha obrigatória: Calcular a mediana sem ordenar os dados primeiro.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Estatística básica: média, moda e mediana em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
      "Reconhecer como Estatística básica: média, moda e mediana aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Estatística descritiva."
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
        "frente": "Qual é a ideia central de Estatística básica: média, moda e mediana?",
        "verso": "Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: média aritmética",
        "verso": "Explique média aritmética dentro do tema Estatística básica: média, moda e mediana.",
        "nivel": "conceito"
      },
      {
        "frente": "Pegadinha comum em Estatística básica: média, moda e mediana",
        "verso": "Calcular a mediana sem ordenar os dados primeiro.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Estatística básica: média, moda e mediana",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "média aritmética",
            "moda",
            "mediana",
            "Média"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Calcular corretamente média, moda e mediana, com atenção especial à necessidade de ordenar os dados antes de encontrar a mediana.",
            "Questões que fornecem um conjunto de valores e pedem média, moda ou mediana, ou que exigem leitura de gráfico/tabela."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Calcular a mediana sem ordenar os dados primeiro.",
            "Na quantidade par de dados, esquecer de tirar a média dos dois valores centrais (pegando só um deles por engano).",
            "Confundir moda (valor mais frequente) com média (valor calculado pela soma/quantidade)."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Estatística básica: média, moda e mediana\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Estatística básica: média, moda e mediana para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Estatística básica: média, moda e mediana?",
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
      "Matemática",
      "Estatística descritiva",
      "Estatística básica: média, moda e mediana",
      "média aritmética",
      "moda",
      "mediana",
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
        "id": "estatistica-basica-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Calcular média, moda e mediana de um conjunto de dados, e interpretar gráficos simples",
        "enunciado": "Com base no capítulo \"Estatística básica: média, moda e mediana\", assinale a alternativa correta. Qual a mediana do conjunto de dados: 7, 2, 9, 4, 5?",
        "alternativas": [
          "9",
          "5",
          "4",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Primeiro ordena-se o conjunto: 2, 4, 5, 7, 9. Como há 5 valores (quantidade ímpar), a mediana é o valor central, que ocupa a 3ª posição: 5.",
        "comentarioDetalhado": [
          "Primeiro ordena-se o conjunto: 2, 4, 5, 7, 9. Como há 5 valores (quantidade ímpar), a mediana é o valor central, que ocupa a 3ª posição: 5.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: média aritmética, moda, mediana, Média."
        ]
      },
      {
        "id": "estatistica-basica-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Média: soma dividida pela quantidade — sensível a valores extremos.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Média: soma dividida pela quantidade — sensível a valores extremos.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "estatistica-basica-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Calcular a mediana sem ordenar os dados primeiro.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Calcular a mediana sem ordenar os dados primeiro.",
          "Forma correta de lembrar: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido."
        ]
      },
      {
        "id": "estatistica-basica-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Estatística básica: média, moda e mediana\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "média aritmética",
          "moda",
          "mediana",
          "Média",
          "Moda"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "estatistica-basica-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Estatística básica: média, moda e mediana\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como montar uma escada: cada degrau depende do anterior, então a conta precisa seguir uma ordem. Neste capítulo, \"Estatística básica: média, moda e mediana\", a ideia principal é: Média aritmética é a soma de todos os valores dividida pela quantidade de valores — a medida mais usada, mas sensível a valores muito extremos (outliers), que podem distorcer o resultado para cima ou para baixo. Para estudar sem travar, guarde primeiro estas palavras-chave: média aritmética, moda, mediana. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Sempre ORDENE antes de achar a mediana; ela resiste a valores extremos melhor que a média — e moda é só o valor mais repetido.",
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
    }
  }
];

export default matematicaBasica;
