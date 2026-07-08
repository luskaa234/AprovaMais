/**
 * VemAprovar Top1 — Apostila Premium 10/10
 * Arquivo: informatica.js
 * Módulo: Informática para PMMA
 * Atualização pedagógica: 2026-07-07
 *
 * Foco: questões padrão 10/10 com 8 treinos por capítulo, alternativas comentadas,
 * diagnóstico por IA, armadilhas de banca e critérios de correção.
 */

export const informatica = [
  {
    "id": "hardware-software",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 1,
    "totalChapters": 10,
    "title": "Hardware e software: conceitos básicos",
    "assunto": "Conceitos básicos de informática",
    "tecnica": "Classificação de dispositivos por função",
    "competencia": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 4,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 3,
      "FCC": 3,
      "ENEM": 2
    },
    "termosChave": [
      "hardware",
      "software",
      "memória RAM"
    ],
    "corpo": [
      "Hardware é a parte física do computador — tudo que se pode tocar: processador, memória, placa-mãe, teclado, monitor. Software é o conjunto de instruções (programas) que fazem o hardware funcionar de forma útil — desde o sistema operacional até aplicativos como editores de texto e navegadores.",
      "Dispositivos de entrada enviam dados para o computador (teclado, mouse, scanner, microfone). Dispositivos de saída exibem ou emitem resultados processados (monitor, impressora, caixa de som). Alguns dispositivos são de entrada e saída ao mesmo tempo (tela touchscreen, pendrive, HD externo).",
      "Memória RAM (Random Access Memory) armazena dados temporariamente, apenas enquanto o computador está ligado — é rápida, mas volátil (perde tudo ao desligar). Armazenamento em disco (HD ou SSD) é permanente, guardando dados mesmo sem energia, mas com velocidade de acesso menor que a RAM (o SSD é significativamente mais rápido que o HD tradicional, por não ter partes mecânicas móveis)."
    ],
    "pontosChave": [
      "Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar.",
      "Entrada: envia dados ao computador. Saída: exibe/emite resultado. Alguns dispositivos são os dois (touchscreen, pendrive).",
      "RAM é temporária e volátil (rápida); disco (HD/SSD) é permanente (SSD mais rápido que HD, sem partes móveis)."
    ],
    "checkRapido": {
      "pergunta": "Um pendrive USB, ao mesmo tempo em que recebe arquivos do computador e permite que o computador leia arquivos dele, é classificado como dispositivo de:",
      "opcoes": [
        "Apenas entrada",
        "Apenas saída",
        "Entrada e saída"
      ],
      "correta": 2,
      "justificativa": "O pendrive recebe dados do computador (funcionando como saída, ao ser gravado) e também envia dados para o computador (funcionando como entrada, ao ser lido) — por isso é classificado como dispositivo de entrada e saída."
    },
    "oQueCobra": "Classificar corretamente hardware x software, e dispositivos como de entrada, saída, ou ambos.",
    "precisaSaberAntes": "Nenhum pré-requisito específico — é o ponto de partida da matéria.",
    "explicacao": [
      {
        "titulo": "Memória cache e memória ROM",
        "texto": "Cache é uma memória ainda mais rápida que a RAM, usada pelo processador para guardar dados de acesso muito frequente, reduzindo o tempo de espera. ROM (Read-Only Memory) armazena instruções básicas gravadas de fábrica (como a BIOS/UEFI, que inicia o computador antes mesmo do sistema operacional carregar) — diferente da RAM, não é apagada ao desligar."
      },
      {
        "titulo": "Processador (CPU) — o 'cérebro' do computador",
        "texto": "A CPU (Central Processing Unit) executa as instruções dos programas, sendo medida principalmente por clock (velocidade, em GHz) e número de núcleos (cores) — mais núcleos permitem processar mais tarefas simultaneamente, mas nem sempre significam desempenho proporcionalmente maior em qualquer tarefa."
      }
    ],
    "comoIdentificar": "Questões que listam componentes de computador e pedem para classificá-los, ou que perguntam a diferença entre memória temporária e permanente.",
    "pegadinhas": [
      "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
      "Achar que RAM guarda dados permanentemente, como o disco.",
      "Não reconhecer dispositivos híbridos (touchscreen, pendrive) como entrada E saída simultaneamente."
    ],
    "resumoFrase": "Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
    "proximoTitulo": "Sistemas operacionais: Windows e Linux básico",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Hardware e software: conceitos básicos\", a ideia principal é: Hardware é a parte física do computador — tudo que se pode tocar: processador, memória, placa-mãe, teclado, monitor. Para estudar sem travar, guarde primeiro estas palavras-chave: hardware, software, memória RAM. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "hardware",
      "software",
      "memória RAM",
      "Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar.",
      "Entrada: envia dados ao computador. Saída: exibe/emite resultado. Alguns dispositivos são os dois (touchscreen, pendrive)."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um pendrive USB, ao mesmo tempo em que recebe arquivos do computador e permite que o computador leia arquivos dele, é classificado como dispositivo de: Assinale a alternativa correta.",
        "alternativas": [
          "Apenas entrada",
          "Apenas saída",
          "Entrada e saída",
          "hardware",
          "software"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. O pendrive recebe dados do computador (funcionando como saída, ao ser gravado) e também envia dados para o computador (funcionando como entrada, ao ser lido) — por isso é classificado como dispositivo de entrada e saída."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          }
        ],
        "comentario": "O pendrive recebe dados do computador (funcionando como saída, ao ser gravado) e também envia dados para o computador (funcionando como entrada, ao ser lido) — por isso é classificado como dispositivo de entrada e saída.",
        "armadilhaDaBanca": "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "porqueCaiEmProva": "Classificar corretamente hardware x software, e dispositivos como de entrada, saída, ou ambos.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
        "comentarioDetalhado": [
          "Ponto cobrado: Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD)."
        ],
        "armadilhaDaBanca": "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
        "comentarioDetalhado": [
          "Armadilha explorada: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar."
        ],
        "armadilhaDaBanca": "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Hardware e software: conceitos básicos, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD)."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
        "armadilhaDaBanca": "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
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
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Hardware e software: conceitos básicos?",
        "alternativas": [
          "Hardware é físico",
          "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
          "Entrada",
          "Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
          "Reconhecer corretamente o termo-chave: hardware."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
        "armadilhaDaBanca": "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Hardware e software: conceitos básicos em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD). Pegadinha a evitar: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "hardware",
          "software",
          "memória RAM",
          "Hardware é físico",
          "software é instrução"
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
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Entrada\" e mostre por que \"RAM guarda dados permanentemente, como o disco.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Entrada: envia dados ao computador. Saída: exibe/emite resultado. Alguns dispositivos são os dois (touchscreen, pendrive).. A armadilha deve ser recusada porque distorce o conteúdo: Achar que RAM guarda dados permanentemente, como o disco.",
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
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 1: Hardware e software: conceitos básicos",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "assunto": "Conceitos básicos de informática",
        "tags": [
          "Informática",
          "Conceitos básicos de informática",
          "hardware",
          "software",
          "memória RAM"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "hardware-software-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Hardware e software: conceitos básicos, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Hardware e software: conceitos básicos. Núcleo obrigatório: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).. Pegadinha obrigatória: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Hardware e software: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
      "Reconhecer como Hardware e software: conceitos básicos aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Conceitos básicos de informática."
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
        "frente": "Qual é a ideia central de Hardware e software: conceitos básicos?",
        "verso": "Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: hardware",
        "verso": "hardware: Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar. Entrada: envia dados ao computador. Saída: exibe/emite resultado. Alguns dispositivos são os dois (touchscreen, pendrive). Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Hardware e software: conceitos básicos",
        "verso": "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Hardware e software: conceitos básicos",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD)."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "hardware",
            "software",
            "memória RAM",
            "Hardware é físico"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Classificar corretamente hardware x software, e dispositivos como de entrada, saída, ou ambos.",
            "Questões que listam componentes de computador e pedem para classificá-los, ou que perguntam a diferença entre memória temporária e permanente."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
            "Achar que RAM guarda dados permanentemente, como o disco.",
            "Não reconhecer dispositivos híbridos (touchscreen, pendrive) como entrada E saída simultaneamente."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Hardware e software: conceitos básicos\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Hardware e software: conceitos básicos para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Hardware e software: conceitos básicos?",
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
      "Informática",
      "Conceitos básicos de informática",
      "Hardware e software: conceitos básicos",
      "hardware",
      "software",
      "memória RAM",
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
        "id": "hardware-software-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Diferenciar hardware de software e classificar dispositivos de entrada, saída e armazenamento",
        "enunciado": "Com base no capítulo \"Hardware e software: conceitos básicos\", assinale a alternativa correta. Um pendrive USB, ao mesmo tempo em que recebe arquivos do computador e permite que o computador leia arquivos dele, é classificado como dispositivo de:",
        "alternativas": [
          "Apenas entrada",
          "Apenas saída",
          "Entrada e saída",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 2,
        "comentario": "O pendrive recebe dados do computador (funcionando como saída, ao ser gravado) e também envia dados para o computador (funcionando como entrada, ao ser lido) — por isso é classificado como dispositivo de entrada e saída.",
        "comentarioDetalhado": [
          "O pendrive recebe dados do computador (funcionando como saída, ao ser gravado) e também envia dados para o computador (funcionando como entrada, ao ser lido) — por isso é classificado como dispositivo de entrada e saída.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: hardware, software, memória RAM, Hardware é físico."
        ]
      },
      {
        "id": "hardware-software-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Hardware é físico; software é o conjunto de instruções/programas que o fazem funcionar.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "hardware-software-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Classificar o sistema operacional como hardware (é software, mesmo estando intimamente ligado ao funcionamento da máquina).",
          "Forma correta de lembrar: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD)."
        ]
      },
      {
        "id": "hardware-software-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Hardware e software: conceitos básicos\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "hardware",
          "software",
          "memória RAM",
          "Hardware é físico",
          "Entrada"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "hardware-software-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Hardware e software: conceitos básicos\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Hardware e software: conceitos básicos\", a ideia principal é: Hardware é a parte física do computador — tudo que se pode tocar: processador, memória, placa-mãe, teclado, monitor. Para estudar sem travar, guarde primeiro estas palavras-chave: hardware, software, memória RAM. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Hardware é físico, software é instrução — RAM é rápida e temporária, disco é permanente e mais lento (SSD mais rápido que HD).",
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
    "id": "sistemas-operacionais",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 2,
    "totalChapters": 10,
    "title": "Sistemas operacionais: Windows e Linux básico",
    "assunto": "Sistemas operacionais",
    "tecnica": "Reconhecimento de atalhos e comandos essenciais",
    "competencia": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 3,
      "ENEM": 2
    },
    "termosChave": [
      "sistema operacional",
      "atalho de teclado",
      "diretório"
    ],
    "corpo": [
      "Sistema operacional é o software responsável por gerenciar todos os recursos do computador (processador, memória, arquivos, dispositivos) e servir de intermediário entre o usuário e o hardware. Windows é o sistema operacional mais cobrado em prova de nível médio, organizando arquivos em pastas (diretórios) dentro de uma estrutura hierárquica, com a Área de Trabalho como ponto de partida visual.",
      "Atalhos de teclado mais cobrados no Windows: Ctrl+C (copiar), Ctrl+V (colar), Ctrl+X (recortar), Ctrl+Z (desfazer), Ctrl+Y (refazer), Ctrl+A (selecionar tudo), Alt+Tab (alternar entre janelas abertas), Windows+E (abrir o Explorador de Arquivos), Windows+D (mostrar a área de trabalho, minimizando tudo).",
      "Linux é um sistema operacional de código aberto, com estrutura de diretórios diferente do Windows (não usa letras de unidade como C:, e sim uma hierarquia única a partir da raiz '/'). Em provas de nível básico, o Linux costuma ser cobrado apenas em conceitos gerais: é multiusuário, multitarefa, tem diversas distribuições (Ubuntu, Debian, Fedora) e permissões de arquivo mais rígidas que o Windows (leitura, escrita, execução, para dono, grupo e outros usuários)."
    ],
    "pontosChave": [
      "Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas.",
      "Atalhos essenciais: Ctrl+C/V/X/Z/A, Alt+Tab, Windows+E, Windows+D.",
      "Linux: código aberto, multiusuário, hierarquia de diretórios a partir de '/', permissões de leitura/escrita/execução por usuário/grupo/outros."
    ],
    "checkRapido": {
      "pergunta": "Qual atalho de teclado no Windows abre o Explorador de Arquivos?",
      "opcoes": [
        "Windows+E",
        "Ctrl+E",
        "Alt+E"
      ],
      "correta": 0,
      "justificativa": "Windows+E é o atalho padrão para abrir o Explorador de Arquivos no sistema operacional Windows, permitindo navegação rápida pelas pastas e unidades do computador."
    },
    "oQueCobra": "Reconhecer atalhos de teclado essenciais do Windows e conceitos básicos de organização de arquivos em Windows e Linux.",
    "precisaSaberAntes": "Nenhum pré-requisito específico, mas ajuda ter familiaridade prática com um computador.",
    "explicacao": [
      {
        "titulo": "Diferença entre 'copiar/colar' e 'recortar/colar'",
        "texto": "Copiar (Ctrl+C) mantém o arquivo original no lugar de origem, apenas duplicando-o no destino. Recortar (Ctrl+X) remove o arquivo do local original ao ser colado no destino — a diferença é sutil, mas cobrada com frequência em questões sobre gerenciamento de arquivos."
      },
      {
        "titulo": "Permissões de arquivo no Linux — noção básica",
        "texto": "O sistema de permissões do Linux (representado por letras como 'rwx', para leitura/escrita/execução) se aplica separadamente ao dono do arquivo, ao grupo associado e aos demais usuários — um conceito mais granular de controle de acesso do que o padrão simplificado do Windows para usuários domésticos."
      }
    ],
    "comoIdentificar": "Questões que pedem o atalho para uma ação específica, ou que descrevem uma estrutura de pastas/permissões e pedem interpretação.",
    "pegadinhas": [
      "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
      "Achar que Linux usa letras de unidade (C:, D:) como o Windows — usa uma hierarquia única a partir de '/'.",
      "Não reconhecer Windows+D como atalho para mostrar a área de trabalho."
    ],
    "resumoFrase": "Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
    "proximoTitulo": "Pacote Office: Word e Excel essencial",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Sistemas operacionais: Windows e Linux básico\", a ideia principal é: Sistema operacional é o software responsável por gerenciar todos os recursos do computador (processador, memória, arquivos, dispositivos) e servir de intermediário entre o usuário e o hardware. Para estudar sem travar, guarde primeiro estas palavras-chave: sistema operacional, atalho de teclado, diretório. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "sistema operacional",
      "atalho de teclado",
      "diretório",
      "Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas.",
      "Atalhos essenciais: Ctrl+C/V/X/Z/A, Alt+Tab, Windows+E, Windows+D."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Qual atalho de teclado no Windows abre o Explorador de Arquivos? Assinale a alternativa correta.",
        "alternativas": [
          "Ctrl+E",
          "Windows+E",
          "Alt+E",
          "sistema operacional",
          "atalho de teclado"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Windows+E é o atalho padrão para abrir o Explorador de Arquivos no sistema operacional Windows, permitindo navegação rápida pelas pastas e unidades do computador."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          }
        ],
        "comentario": "Windows+E é o atalho padrão para abrir o Explorador de Arquivos no sistema operacional Windows, permitindo navegação rápida pelas pastas e unidades do computador.",
        "armadilhaDaBanca": "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
        "porqueCaiEmProva": "Reconhecer atalhos de teclado essenciais do Windows e conceitos básicos de organização de arquivos em Windows e Linux.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
        "comentarioDetalhado": [
          "Ponto cobrado: Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade."
        ],
        "armadilhaDaBanca": "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Ctrl+C (copiar, mantém original) e Ctrl+X (recortar, remove original). são conceitos equivalentes para fins de prova.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
        "comentarioDetalhado": [
          "Armadilha explorada: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas."
        ],
        "armadilhaDaBanca": "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Sistemas operacionais: Windows e Linux básico, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
        "armadilhaDaBanca": "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
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
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Sistemas operacionais: Windows e Linux básico?",
        "alternativas": [
          "Ctrl+C (copiar, mantém original) e Ctrl+X (recortar, remove original). são conceitos equivalentes para fins de prova.",
          "Sistema operacional gerencia hardware e serve de intermediário com o usuário",
          "Atalhos essenciais",
          "Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
          "Reconhecer corretamente o termo-chave: sistema operacional."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
        "armadilhaDaBanca": "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Sistemas operacionais: Windows e Linux básico em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade. Pegadinha a evitar: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "sistema operacional",
          "atalho de teclado",
          "diretório",
          "Copiar mantém o original",
          "recortar remove"
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
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Atalhos essenciais\" e mostre por que \"Linux usa letras de unidade (C:, D:) como o Windows.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Atalhos essenciais: Ctrl+C/V/X/Z/A, Alt+Tab, Windows+E, Windows+D.. A armadilha deve ser recusada porque distorce o conteúdo: Achar que Linux usa letras de unidade (C:, D:) como o Windows — usa uma hierarquia única a partir de '/'.",
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
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 2: Sistemas operacionais: Windows e Linux básico",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "assunto": "Sistemas operacionais",
        "tags": [
          "Informática",
          "Sistemas operacionais",
          "sistema operacional",
          "atalho de teclado",
          "diretório"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "sistemas-operacionais-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Sistemas operacionais: Windows e Linux básico, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Sistemas operacionais: Windows e Linux básico. Núcleo obrigatório: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.. Pegadinha obrigatória: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Sistemas operacionais: Windows e Linux básico em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
      "Reconhecer como Sistemas operacionais: Windows e Linux básico aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Sistemas operacionais."
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
        "frente": "Qual é a ideia central de Sistemas operacionais: Windows e Linux básico?",
        "verso": "Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: sistema operacional",
        "verso": "sistema operacional: Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas. Atalhos essenciais: Ctrl+C/V/X/Z/A, Alt+Tab, Windows+E, Windows+D. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Sistemas operacionais: Windows e Linux básico",
        "verso": "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original). Revisão ampliada: em Sistemas operacionais: Windows e Linux básico, o aluno deve identificar Sistemas operacionais, aplicar ao caso concreto, comparar com institutos próximos e justificar a resposta sem usar frase decorada.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Sistemas operacionais: Windows e Linux básico",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "sistema operacional",
            "atalho de teclado",
            "diretório",
            "Sistema operacional gerencia hardware e serve de intermediário com o usuário"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Reconhecer atalhos de teclado essenciais do Windows e conceitos básicos de organização de arquivos em Windows e Linux.",
            "Questões que pedem o atalho para uma ação específica, ou que descrevem uma estrutura de pastas/permissões e pedem interpretação."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
            "Achar que Linux usa letras de unidade (C:, D:) como o Windows — usa uma hierarquia única a partir de '/'.",
            "Não reconhecer Windows+D como atalho para mostrar a área de trabalho."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Sistemas operacionais: Windows e Linux básico\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Sistemas operacionais: Windows e Linux básico para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Sistemas operacionais: Windows e Linux básico?",
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
      "Informática",
      "Sistemas operacionais",
      "Sistemas operacionais: Windows e Linux básico",
      "sistema operacional",
      "atalho de teclado",
      "diretório",
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
        "id": "sistemas-operacionais-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Operar tarefas básicas em ambiente Windows e reconhecer conceitos elementares de Linux",
        "enunciado": "Com base no capítulo \"Sistemas operacionais: Windows e Linux básico\", assinale a alternativa correta. Qual atalho de teclado no Windows abre o Explorador de Arquivos?",
        "alternativas": [
          "Windows+E",
          "Ctrl+E",
          "Alt+E",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 0,
        "comentario": "Windows+E é o atalho padrão para abrir o Explorador de Arquivos no sistema operacional Windows, permitindo navegação rápida pelas pastas e unidades do computador.",
        "comentarioDetalhado": [
          "Windows+E é o atalho padrão para abrir o Explorador de Arquivos no sistema operacional Windows, permitindo navegação rápida pelas pastas e unidades do computador.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: sistema operacional, atalho de teclado, diretório, Sistema operacional gerencia hardware e serve de intermediário com o usuário."
        ]
      },
      {
        "id": "sistemas-operacionais-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Sistema operacional gerencia hardware e serve de intermediário com o usuário; Windows organiza arquivos em pastas hierárquicas.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "sistemas-operacionais-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Ctrl+C (copiar, mantém original) e Ctrl+X (recortar, remove original). são a mesma coisa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Confundir Ctrl+C (copiar, mantém original) com Ctrl+X (recortar, remove original).",
          "Forma correta de lembrar: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade."
        ]
      },
      {
        "id": "sistemas-operacionais-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Sistemas operacionais: Windows e Linux básico\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "sistema operacional",
          "atalho de teclado",
          "diretório",
          "Sistema operacional gerencia hardware e serve de intermediário com o usuário",
          "Atalhos essenciais"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "sistemas-operacionais-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Sistemas operacionais: Windows e Linux básico\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Sistemas operacionais: Windows e Linux básico\", a ideia principal é: Sistema operacional é o software responsável por gerenciar todos os recursos do computador (processador, memória, arquivos, dispositivos) e servir de intermediário entre o usuário e o hardware. Para estudar sem travar, guarde primeiro estas palavras-chave: sistema operacional, atalho de teclado, diretório. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Copiar mantém o original, recortar remove — e Linux organiza arquivos numa hierarquia única a partir de '/', sem letras de unidade.",
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
    "id": "pacote-office-word-excel",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 3,
    "totalChapters": 10,
    "title": "Pacote Office: Word e Excel essencial",
    "assunto": "Editores de texto e planilhas",
    "tecnica": "Reconhecimento de fórmulas e formatação básica",
    "competencia": "Operar formatação básica no Word e fórmulas essenciais no Excel",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 6,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 5,
      "FCC": 4,
      "ENEM": 2
    },
    "termosChave": [
      "fórmula SOMA",
      "referência relativa e absoluta",
      "mala direta"
    ],
    "corpo": [
      "No Word, os recursos mais cobrados incluem: formatação de fonte (negrito Ctrl+B/N, itálico Ctrl+I, sublinhado Ctrl+U/S — a letra do atalho pode variar conforme o idioma do Office instalado), estilos de parágrafo, cabeçalho e rodapé, inserção de tabelas, controle de quebra de página, e a ferramenta de mala direta (usada para gerar documentos personalizados em massa, como cartas ou etiquetas, combinando um modelo com uma lista de dados).",
      "No Excel, célula é a unidade básica, identificada por coluna (letra) e linha (número), como A1 ou B2. Fórmulas sempre começam com o sinal de igual (=). As funções mais cobradas: SOMA (=SOMA(A1:A10) soma o intervalo), MÉDIA (=MÉDIA(A1:A10)), SE (=SE(condição; valor_se_verdadeiro; valor_se_falso) — testa uma condição e retorna um valor ou outro), CONT.SE (conta quantas células de um intervalo atendem a uma condição), PROCV (procura um valor em uma coluna e retorna um valor correspondente de outra coluna).",
      "Referência relativa (ex.: A1) muda automaticamente quando a fórmula é copiada para outra célula, ajustando-se à nova posição. Referência absoluta (ex.: $A$1, com cifrão antes da coluna e da linha) permanece fixa, não importa para onde a fórmula seja copiada — usada quando se quer sempre referenciar a mesma célula (como uma taxa fixa em vários cálculos)."
    ],
    "pontosChave": [
      "Word: formatação de fonte, mala direta para gerar documentos personalizados em massa.",
      "Excel: fórmulas sempre começam com =; SOMA, MÉDIA, SE, CONT.SE e PROCV são as mais cobradas.",
      "Referência relativa (A1) muda ao copiar; referência absoluta ($A$1) permanece fixa ao copiar."
    ],
    "checkRapido": {
      "pergunta": "Em uma célula do Excel, a fórmula =SE(A1>=7;\"Aprovado\";\"Reprovado\") retorna 'Aprovado' quando:",
      "opcoes": [
        "O valor em A1 é maior ou igual a 7",
        "O valor em A1 é exatamente 7",
        "A célula A1 está vazia"
      ],
      "correta": 0,
      "justificativa": "A função SE testa a condição (A1>=7): se verdadeira, retorna o primeiro valor ('Aprovado'); se falsa, retorna o segundo ('Reprovado'). A condição '>=' inclui tanto valores maiores quanto iguais a 7, não apenas o valor exato."
    },
    "oQueCobra": "Interpretar e construir fórmulas básicas do Excel, e reconhecer recursos de formatação e automação do Word.",
    "precisaSaberAntes": "Ter noção de operadores de comparação (maior que, igual, menor que) para entender a função SE.",
    "explicacao": [
      {
        "titulo": "Diferença entre referência mista e as demais",
        "texto": "Além da relativa (A1) e absoluta ($A$1), existe a referência mista: $A1 (coluna fixa, linha muda) ou A$1 (linha fixa, coluna muda) — usada quando se quer 'travar' apenas uma dimensão da referência ao arrastar a fórmula para outras células."
      },
      {
        "titulo": "PROCV — sintaxe e cuidado com o último argumento",
        "texto": "=PROCV(valor_procurado; intervalo_tabela; num_coluna; [procurar_intervalo]) — o último argumento, se omitido ou definido como VERDADEIRO, busca correspondência aproximada (pode gerar resultado inesperado); definido como FALSO, exige correspondência exata, sendo a opção mais segura na maioria dos usos práticos."
      }
    ],
    "comoIdentificar": "Questões que apresentam uma fórmula do Excel e pedem o resultado, ou que descrevem uma tarefa no Word e perguntam a ferramenta adequada.",
    "pegadinhas": [
      "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
      "Interpretar mal o operador de comparação dentro da função SE (ex.: confundir '>' com '>=').",
      "Não reconhecer a mala direta como a ferramenta correta para gerar documentos personalizados em massa."
    ],
    "resumoFrase": "Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
    "proximoTitulo": "Internet: navegadores, e-mail e nuvem",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Pacote Office: Word e Excel essencial\", a ideia principal é: No Word, os recursos mais cobrados incluem: formatação de fonte (negrito Ctrl+B/N, itálico Ctrl+I, sublinhado Ctrl+U/S — a letra do atalho pode variar conforme o idioma do Office instalado), estilos de parágrafo, cabeçalho e rodapé, inserção de tabelas. Para estudar sem travar, guarde primeiro estas palavras-chave: fórmula SOMA, referência relativa e absoluta, mala direta. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "fórmula SOMA",
      "referência relativa e absoluta",
      "mala direta",
      "Word: formatação de fonte, mala direta para gerar documentos personalizados em massa.",
      "Excel: fórmulas sempre começam com =; SOMA, MÉDIA, SE, CONT.SE e PROCV são as mais cobradas."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Em uma célula do Excel, a fórmula =SE(A1>=7;\"Aprovado\";\"Reprovado\") retorna 'Aprovado' quando: Assinale a alternativa correta.",
        "alternativas": [
          "O valor em A1 é exatamente 7",
          "A célula A1 está vazia",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "O valor em A1 é maior ou igual a 7"
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. A função SE testa a condição (A1>=7): se verdadeira, retorna o primeiro valor ('Aprovado'); se falsa, retorna o segundo ('Reprovado'). A condição '>=' inclui tanto valores maiores quanto iguais a 7, não apenas o valor exato."
          }
        ],
        "comentario": "A função SE testa a condição (A1>=7): se verdadeira, retorna o primeiro valor ('Aprovado'); se falsa, retorna o segundo ('Reprovado'). A condição '>=' inclui tanto valores maiores quanto iguais a 7, não apenas o valor exato.",
        "armadilhaDaBanca": "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
        "porqueCaiEmProva": "Interpretar e construir fórmulas básicas do Excel, e reconhecer recursos de formatação e automação do Word.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Word: formatação de fonte, mala direta para gerar documentos personalizados em massa.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
        "comentarioDetalhado": [
          "Ponto cobrado: Word: formatação de fonte, mala direta para gerar documentos personalizados em massa.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE."
        ],
        "armadilhaDaBanca": "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: referência relativa e absoluta ao prever o resultado de uma fórmula copiada para outra… são conceitos equivalentes para fins de prova.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
        "comentarioDetalhado": [
          "Armadilha explorada: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Word: formatação de fonte, mala direta para gerar documentos personalizados em massa."
        ],
        "armadilhaDaBanca": "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Pacote Office: Word e Excel essencial, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
        "armadilhaDaBanca": "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
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
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Pacote Office: Word e Excel essencial?",
        "alternativas": [
          "Word",
          "Excel",
          "Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
          "referência relativa e absoluta ao prever o resultado de uma fórmula copiada para outra… são conceitos equivalentes para fins de prova.",
          "Reconhecer corretamente o termo-chave: fórmula SOMA."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
        "armadilhaDaBanca": "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Pacote Office: Word e Excel essencial em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE. Pegadinha a evitar: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta",
          "Fórmula sempre começa com =",
          "referência absoluta ($A$1) trava"
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
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Excel\" e mostre por que \"Interpretar mal o operador de comparação dentro da função SE (ex.: confundir '>' com '>=').\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Excel: fórmulas sempre começam com =; SOMA, MÉDIA, SE, CONT.SE e PROCV são as mais cobradas.. A armadilha deve ser recusada porque distorce o conteúdo: Interpretar mal o operador de comparação dentro da função SE (ex.: confundir '>' com '>=').",
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
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 3: Pacote Office: Word e Excel essencial",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "assunto": "Editores de texto e planilhas",
        "tags": [
          "Informática",
          "Editores de texto e planilhas",
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "pacote-office-word-excel-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Pacote Office: Word e Excel essencial, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Pacote Office: Word e Excel essencial. Núcleo obrigatório: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.. Pegadinha obrigatória: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Pacote Office: Word e Excel essencial em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Operar formatação básica no Word e fórmulas essenciais no Excel",
      "Reconhecer como Pacote Office: Word e Excel essencial aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Editores de texto e planilhas."
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
        "frente": "Qual é a ideia central de Pacote Office: Word e Excel essencial?",
        "verso": "Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: fórmula SOMA",
        "verso": "fórmula SOMA: Word: formatação de fonte, mala direta para gerar documentos personalizados em massa. Excel: fórmulas sempre começam com =; SOMA, MÉDIA, SE, CONT.SE e PROCV são as mais cobradas. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Pacote Office: Word e Excel essencial",
        "verso": "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Pacote Office: Word e Excel essencial",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "fórmula SOMA",
            "referência relativa e absoluta",
            "mala direta",
            "Word"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Interpretar e construir fórmulas básicas do Excel, e reconhecer recursos de formatação e automação do Word.",
            "Questões que apresentam uma fórmula do Excel e pedem o resultado, ou que descrevem uma tarefa no Word e perguntam a ferramenta adequada."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
            "Interpretar mal o operador de comparação dentro da função SE (ex.: confundir '>' com '>=').",
            "Não reconhecer a mala direta como a ferramenta correta para gerar documentos personalizados em massa."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Pacote Office: Word e Excel essencial\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Pacote Office: Word e Excel essencial para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Pacote Office: Word e Excel essencial?",
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
      "Informática",
      "Editores de texto e planilhas",
      "Pacote Office: Word e Excel essencial",
      "fórmula SOMA",
      "referência relativa e absoluta",
      "mala direta",
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
        "id": "pacote-office-word-excel-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Operar formatação básica no Word e fórmulas essenciais no Excel",
        "enunciado": "Com base no capítulo \"Pacote Office: Word e Excel essencial\", assinale a alternativa correta. Em uma célula do Excel, a fórmula =SE(A1>=7;\"Aprovado\";\"Reprovado\") retorna 'Aprovado' quando:",
        "alternativas": [
          "O valor em A1 é maior ou igual a 7",
          "O valor em A1 é exatamente 7",
          "A célula A1 está vazia",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 0,
        "comentario": "A função SE testa a condição (A1>=7): se verdadeira, retorna o primeiro valor ('Aprovado'); se falsa, retorna o segundo ('Reprovado'). A condição '>=' inclui tanto valores maiores quanto iguais a 7, não apenas o valor exato.",
        "comentarioDetalhado": [
          "A função SE testa a condição (A1>=7): se verdadeira, retorna o primeiro valor ('Aprovado'); se falsa, retorna o segundo ('Reprovado'). A condição '>=' inclui tanto valores maiores quanto iguais a 7, não apenas o valor exato.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: fórmula SOMA, referência relativa e absoluta, mala direta, Word."
        ]
      },
      {
        "id": "pacote-office-word-excel-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Word: formatação de fonte, mala direta para gerar documentos personalizados em massa.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Word: formatação de fonte, mala direta para gerar documentos personalizados em massa.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "pacote-office-word-excel-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Referência relativa e absoluta ao prever o resultado de uma fórmula copiada para outra célula. são a mesma coisa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Confundir referência relativa com absoluta ao prever o resultado de uma fórmula copiada para outra célula.",
          "Forma correta de lembrar: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE."
        ]
      },
      {
        "id": "pacote-office-word-excel-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Pacote Office: Word e Excel essencial\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "fórmula SOMA",
          "referência relativa e absoluta",
          "mala direta",
          "Word",
          "Excel"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "pacote-office-word-excel-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Pacote Office: Word e Excel essencial\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Pacote Office: Word e Excel essencial\", a ideia principal é: No Word, os recursos mais cobrados incluem: formatação de fonte (negrito Ctrl+B/N, itálico Ctrl+I, sublinhado Ctrl+U/S — a letra do atalho pode variar conforme o idioma do Office instalado), estilos de parágrafo, cabeçalho e rodapé, inserção de tabelas. Para estudar sem travar, guarde primeiro estas palavras-chave: fórmula SOMA, referência relativa e absoluta, mala direta. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Fórmula sempre começa com =; referência absoluta ($A$1) trava, relativa (A1) muda ao copiar — confira sempre o operador dentro do SE.",
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
    "id": "internet-navegadores-email-nuvem",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 4,
    "totalChapters": 10,
    "title": "Internet: navegadores, e-mail e nuvem",
    "assunto": "Internet e serviços web",
    "tecnica": "Reconhecimento de componentes de uma URL",
    "competencia": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
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
      "URL",
      "HTTPS",
      "cookies"
    ],
    "corpo": [
      "URL (Uniform Resource Locator) é o endereço de um recurso na internet, composto por protocolo (http:// ou https://), domínio (ex.: gov.br) e caminho do recurso específico. HTTPS é a versão segura do protocolo HTTP, com dados criptografados durante a transmissão — sites de bancos, órgãos públicos e qualquer serviço que peça login/senha devem sempre usar HTTPS (identificável pelo cadeado na barra de endereço do navegador).",
      "Cookies são pequenos arquivos de texto que sites armazenam no navegador do usuário, usados para lembrar preferências, manter sessão de login ativa, ou rastrear comportamento de navegação para fins de publicidade — podem ser apagados manualmente nas configurações do navegador, e sua desativação pode impedir o funcionamento correto de alguns sites.",
      "Armazenamento em nuvem (Google Drive, OneDrive, entre outros) permite guardar arquivos em servidores remotos, acessíveis de qualquer dispositivo conectado à internet, com sincronização automática entre múltiplos aparelhos — reduz a dependência de um único computador físico, mas levanta questões de segurança (quem tem acesso aos dados) e disponibilidade (dependência de conexão à internet para acesso)."
    ],
    "pontosChave": [
      "URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado).",
      "Cookies armazenam preferências e sessão de login — podem ser apagados, mas afetam o funcionamento de alguns sites.",
      "Nuvem: armazenamento remoto, sincronizado entre dispositivos, dependente de conexão à internet."
    ],
    "checkRapido": {
      "pergunta": "Um site que exibe o cadeado na barra de endereço do navegador está utilizando qual protocolo de comunicação segura?",
      "opcoes": [
        "FTP",
        "HTTPS",
        "SMTP"
      ],
      "correta": 1,
      "justificativa": "HTTPS é o protocolo que criptografa a comunicação entre o navegador e o servidor, sendo indicado visualmente pelo cadeado na barra de endereço — FTP é usado para transferência de arquivos e SMTP para envio de e-mails, não para navegação web segura."
    },
    "oQueCobra": "Reconhecer os componentes de segurança básicos da navegação web (HTTPS, cookies) e o funcionamento do armazenamento em nuvem.",
    "precisaSaberAntes": "Nenhum pré-requisito específico além de familiaridade básica com uso de internet.",
    "explicacao": [
      {
        "titulo": "Protocolos de e-mail — noção básica",
        "texto": "SMTP é usado para enviar e-mails; POP3 e IMAP são usados para recebê-los, com diferença importante: POP3 geralmente baixa e remove as mensagens do servidor (ficando só no dispositivo), enquanto IMAP mantém sincronização com o servidor, permitindo acesso à mesma caixa de entrada por múltiplos dispositivos."
      },
      {
        "titulo": "Cache do navegador x cookies",
        "texto": "Cache armazena arquivos temporários de páginas (imagens, scripts) para acelerar carregamentos futuros. Cookies armazenam dados específicos sobre a interação do usuário com o site (login, preferências) — são conceitos relacionados, mas com finalidades diferentes, frequentemente confundidos em prova."
      }
    ],
    "comoIdentificar": "Questões que pedem para identificar o protocolo seguro, ou que descrevem a função de cookies/cache/armazenamento em nuvem.",
    "pegadinhas": [
      "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
      "Confundir cache (arquivos temporários de página) com cookies (dados de sessão/preferência).",
      "Não saber a diferença entre POP3 (baixa e remove) e IMAP (sincroniza com o servidor)."
    ],
    "resumoFrase": "HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
    "proximoTitulo": "Segurança da informação: malware e phishing",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Internet: navegadores, e-mail e nuvem\", a ideia principal é: URL (Uniform Resource Locator) é o endereço de um recurso na internet, composto por protocolo (http:// ou https://), domínio (ex.: gov.br) e caminho do recurso específico. Para estudar sem travar, guarde primeiro estas palavras-chave: URL, HTTPS, cookies. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "URL",
      "HTTPS",
      "cookies",
      "URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado).",
      "Cookies armazenam preferências e sessão de login — podem ser apagados, mas afetam o funcionamento de alguns sites."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um site que exibe o cadeado na barra de endereço do navegador está utilizando qual protocolo de comunicação segura? Assinale a alternativa correta.",
        "alternativas": [
          "FTP",
          "SMTP",
          "HTTPS",
          "URL",
          "cookies"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. HTTPS é o protocolo que criptografa a comunicação entre o navegador e o servidor, sendo indicado visualmente pelo cadeado na barra de endereço — FTP é usado para transferência de arquivos e SMTP para envio de e-mails, não para navegação web segura."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          }
        ],
        "comentario": "HTTPS é o protocolo que criptografa a comunicação entre o navegador e o servidor, sendo indicado visualmente pelo cadeado na barra de endereço — FTP é usado para transferência de arquivos e SMTP para envio de e-mails, não para navegação web segura.",
        "armadilhaDaBanca": "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
        "porqueCaiEmProva": "Reconhecer os componentes de segurança básicos da navegação web (HTTPS, cookies) e o funcionamento do armazenamento em nuvem.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado).",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
        "comentarioDetalhado": [
          "Ponto cobrado: URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado).",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página."
        ],
        "armadilhaDaBanca": "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: HTTP e HTTPS, ignorando a diferença de criptografia entre os dois. são conceitos equivalentes para fins de prova.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
        "comentarioDetalhado": [
          "Armadilha explorada: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado)."
        ],
        "armadilhaDaBanca": "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Internet: navegadores, e-mail e nuvem, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
        "armadilhaDaBanca": "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
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
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Internet: navegadores, e-mail e nuvem?",
        "alternativas": [
          "URL",
          "HTTP e HTTPS, ignorando a diferença de criptografia entre os dois. são conceitos equivalentes para fins de prova.",
          "Cookies armazenam preferências e sessão de login",
          "HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
          "Reconhecer corretamente o termo-chave: URL."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
        "armadilhaDaBanca": "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Internet: navegadores, e-mail e nuvem em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página. Pegadinha a evitar: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "URL",
          "HTTPS",
          "cookies",
          "HTTPS criptografa a comunicação (cadeado na…",
          "cookies guardam sessão/preferência"
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
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Cookies armazenam preferências e sessão de login\" e mostre por que \"cache (arquivos temporários de página) e cookies (dados de sessão/preferência). são conceitos equivalentes para fins de prova.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Cookies armazenam preferências e sessão de login — podem ser apagados, mas afetam o funcionamento de alguns sites.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir cache (arquivos temporários de página) com cookies (dados de sessão/preferência).",
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
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 4: Internet: navegadores, e-mail e nuvem",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "assunto": "Internet e serviços web",
        "tags": [
          "Informática",
          "Internet e serviços web",
          "URL",
          "HTTPS",
          "cookies"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "internet-navegadores-email-nuvem-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Internet: navegadores, e-mail e nuvem, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Internet: navegadores, e-mail e nuvem. Núcleo obrigatório: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.. Pegadinha obrigatória: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Internet: navegadores, e-mail e nuvem em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
      "Reconhecer como Internet: navegadores, e-mail e nuvem aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Internet e serviços web."
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
        "frente": "Qual é a ideia central de Internet: navegadores, e-mail e nuvem?",
        "verso": "HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: URL",
        "verso": "URL: URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado). Cookies armazenam preferências e sessão de login — podem ser apagados, mas afetam o funcionamento de alguns sites. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Internet: navegadores, e-mail e nuvem",
        "verso": "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois. Revisão ampliada: em Internet: navegadores, e-mail e nuvem, o aluno deve identificar Internet e serviços web, aplicar ao caso concreto, comparar com institutos próximos e justificar a resposta sem usar frase decorada.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Internet: navegadores, e-mail e nuvem",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "URL",
            "HTTPS",
            "cookies",
            "Cookies armazenam preferências e sessão de login"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Reconhecer os componentes de segurança básicos da navegação web (HTTPS, cookies) e o funcionamento do armazenamento em nuvem.",
            "Questões que pedem para identificar o protocolo seguro, ou que descrevem a função de cookies/cache/armazenamento em nuvem."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
            "Confundir cache (arquivos temporários de página) com cookies (dados de sessão/preferência).",
            "Não saber a diferença entre POP3 (baixa e remove) e IMAP (sincroniza com o servidor)."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Internet: navegadores, e-mail e nuvem\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Internet: navegadores, e-mail e nuvem para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Internet: navegadores, e-mail e nuvem?",
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
      "Informática",
      "Internet e serviços web",
      "Internet: navegadores, e-mail e nuvem",
      "URL",
      "HTTPS",
      "cookies",
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
        "id": "internet-navegadores-email-nuvem-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer conceitos básicos de navegação, e-mail e armazenamento em nuvem",
        "enunciado": "Com base no capítulo \"Internet: navegadores, e-mail e nuvem\", assinale a alternativa correta. Um site que exibe o cadeado na barra de endereço do navegador está utilizando qual protocolo de comunicação segura?",
        "alternativas": [
          "FTP",
          "HTTPS",
          "SMTP",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "HTTPS é o protocolo que criptografa a comunicação entre o navegador e o servidor, sendo indicado visualmente pelo cadeado na barra de endereço — FTP é usado para transferência de arquivos e SMTP para envio de e-mails, não para navegação web segura.",
        "comentarioDetalhado": [
          "HTTPS é o protocolo que criptografa a comunicação entre o navegador e o servidor, sendo indicado visualmente pelo cadeado na barra de endereço — FTP é usado para transferência de arquivos e SMTP para envio de e-mails, não para navegação web segura.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: URL, HTTPS, cookies, Cookies armazenam preferências e sessão de login."
        ]
      },
      {
        "id": "internet-navegadores-email-nuvem-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado).",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: URL: protocolo + domínio + caminho. HTTPS é a versão criptografada e segura do HTTP (identificável pelo cadeado).",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "internet-navegadores-email-nuvem-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: HTTP e HTTPS, ignorando a diferença de criptografia entre os dois. são a mesma coisa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Confundir HTTP com HTTPS, ignorando a diferença de criptografia entre os dois.",
          "Forma correta de lembrar: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página."
        ]
      },
      {
        "id": "internet-navegadores-email-nuvem-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Internet: navegadores, e-mail e nuvem\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "URL",
          "HTTPS",
          "cookies",
          "Cookies armazenam preferências e sessão de login",
          "Nuvem"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "internet-navegadores-email-nuvem-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Internet: navegadores, e-mail e nuvem\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Internet: navegadores, e-mail e nuvem\", a ideia principal é: URL (Uniform Resource Locator) é o endereço de um recurso na internet, composto por protocolo (http:// ou https://), domínio (ex.: gov.br) e caminho do recurso específico. Para estudar sem travar, guarde primeiro estas palavras-chave: URL, HTTPS, cookies. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: HTTPS criptografa a comunicação (cadeado na barra); cookies guardam sessão/preferência; cache guarda arquivo temporário de página.",
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
    "id": "seguranca-malware-phishing",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 5,
    "totalChapters": 10,
    "title": "Segurança da informação: malware e phishing",
    "assunto": "Segurança da informação",
    "tecnica": "Associação de cada tipo de malware ao seu comportamento característico",
    "competencia": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 5,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "vírus",
      "ransomware",
      "phishing"
    ],
    "corpo": [
      "Malware (software malicioso) é qualquer programa criado para causar dano, roubar dados ou obter acesso não autorizado a um sistema. Vírus é um programa que se anexa a arquivos legítimos e precisa de ação do usuário (executar o arquivo infectado) para se espalhar. Worm (verme) se espalha automaticamente pela rede, sem precisar de ação do usuário, explorando vulnerabilidades de segurança.",
      "Trojan (cavalo de Troia) se disfarça de programa legítimo e útil, mas executa ações maliciosas ocultas em segundo plano (como abrir uma porta de acesso remoto para o invasor). Spyware monitora e coleta informações do usuário sem seu conhecimento (histórico de navegação, senhas digitadas). Ransomware criptografa os arquivos da vítima e exige pagamento de resgate para restaurar o acesso — uma das ameaças mais graves e financeiramente danosas atualmente.",
      "Phishing é a técnica de engenharia social (não é malware em si) que engana o usuário para que ele forneça voluntariamente dados sensíveis (senhas, números de cartão) através de mensagens ou sites falsos que imitam instituições confiáveis (bancos, órgãos públicos) — o golpe explora a confiança e a urgência psicológica, não uma falha técnica do sistema. Variações incluem spear phishing (ataque direcionado a uma pessoa/organização específica, com informações personalizadas) e smishing (phishing por SMS)."
    ],
    "pontosChave": [
      "Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede.",
      "Trojan se disfarça de programa legítimo; spyware monitora sem ser percebido; ransomware criptografa e exige resgate.",
      "Phishing é engenharia social (engana a pessoa), não falha técnica — spear phishing é a versão direcionada e personalizada."
    ],
    "checkRapido": {
      "pergunta": "Um e-mail, aparentemente de um banco, pede que o usuário clique em um link e digite sua senha para 'atualizar o cadastro', mas o link leva a um site falso idêntico ao do banco. Essa técnica é chamada de:",
      "opcoes": [
        "Ransomware",
        "Phishing",
        "Worm"
      ],
      "correta": 1,
      "justificativa": "Phishing é justamente a técnica de enganar a vítima, por meio de mensagens e sites falsos que imitam instituições confiáveis, para que ela forneça voluntariamente dados sensíveis — não envolve exploração de falha técnica, mas manipulação psicológica."
    },
    "oQueCobra": "Diferenciar os tipos de malware pelo comportamento característico, e reconhecer phishing como técnica de engenharia social.",
    "precisaSaberAntes": "Nenhum pré-requisito específico, além de atenção aos detalhes que diferenciam cada ameaça.",
    "explicacao": [
      {
        "titulo": "Diferença central: precisa de ação do usuário ou não?",
        "texto": "Essa é a pergunta-chave para diferenciar vírus (precisa) de worm (não precisa, se espalha sozinho explorando vulnerabilidade). Trojan também precisa que o usuário execute o programa disfarçado, mas, diferente do vírus, não se replica automaticamente para outros arquivos."
      },
      {
        "titulo": "Engenharia social vai além do phishing",
        "texto": "Engenharia social é o conceito mais amplo de manipular pessoas para obter informações ou acesso — inclui phishing, mas também pretexting (criar uma situação falsa para justificar um pedido de informação), baiting (deixar uma isca física, como um pendrive infectado, para que a vítima o conecte por curiosidade) e vishing (phishing por chamada de voz/telefone)."
      }
    ],
    "comoIdentificar": "Questões que descrevem o comportamento de um software malicioso, ou uma situação de engano por mensagem/link, testam a classificação correta.",
    "pegadinhas": [
      "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
      "Tratar phishing como tipo de malware técnico, quando na verdade é técnica de engenharia social.",
      "Não diferenciar ransomware (criptografa e exige resgate) de outros malwares que apenas roubam dados sem bloquear o acesso."
    ],
    "resumoFrase": "Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
    "proximoTitulo": "Segurança da informação: senhas, backup e firewall",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Segurança da informação: malware e phishing\", a ideia principal é: Malware (software malicioso) é qualquer programa criado para causar dano, roubar dados ou obter acesso não autorizado a um sistema. Para estudar sem travar, guarde primeiro estas palavras-chave: vírus, ransomware, phishing. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "vírus",
      "ransomware",
      "phishing",
      "Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede.",
      "Trojan se disfarça de programa legítimo; spyware monitora sem ser percebido; ransomware criptografa e exige resgate."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um e-mail, aparentemente de um banco, pede que o usuário clique em um link e digite sua senha para 'atualizar o cadastro', mas o link leva a um site falso idêntico ao do banco. Essa técnica é chamada de: Assinale a alternativa correta.",
        "alternativas": [
          "Ransomware",
          "Phishing",
          "Worm",
          "vírus",
          "vírus (precisa de ação do usuário) e worm (se espalha sozinho). são conceitos equivalentes para fins de prova."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Phishing é justamente a técnica de enganar a vítima, por meio de mensagens e sites falsos que imitam instituições confiáveis, para que ela forneça voluntariamente dados sensíveis — não envolve exploração de falha técnica, mas manipulação psicológica."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          }
        ],
        "comentario": "Phishing é justamente a técnica de enganar a vítima, por meio de mensagens e sites falsos que imitam instituições confiáveis, para que ela forneça voluntariamente dados sensíveis — não envolve exploração de falha técnica, mas manipulação psicológica.",
        "armadilhaDaBanca": "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
        "porqueCaiEmProva": "Diferenciar os tipos de malware pelo comportamento característico, e reconhecer phishing como técnica de engenharia social.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
        "comentarioDetalhado": [
          "Ponto cobrado: Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema."
        ],
        "armadilhaDaBanca": "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: vírus (precisa de ação do usuário) e worm (se espalha sozinho). são conceitos equivalentes para fins de prova.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
        "comentarioDetalhado": [
          "Armadilha explorada: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede."
        ],
        "armadilhaDaBanca": "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Segurança da informação: malware e phishing, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
        "armadilhaDaBanca": "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
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
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Segurança da informação: malware e phishing?",
        "alternativas": [
          "vírus (precisa de ação do usuário) e worm (se espalha sozinho). são conceitos equivalentes para fins de prova.",
          "Vírus precisa de ação do usuário para se espalhar",
          "Trojan se disfarça de programa legítimo",
          "Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
          "Reconhecer corretamente o termo-chave: vírus."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
        "armadilhaDaBanca": "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Segurança da informação: malware e phishing em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema. Pegadinha a evitar: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "vírus",
          "ransomware",
          "phishing",
          "Vírus precisa de ação do usuário",
          "worm se espalha sozinho"
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
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Trojan se disfarça de programa legítimo\" e mostre por que \"Tratar phishing como tipo de malware técnico, quando na verdade é técnica de engenharia social.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Trojan se disfarça de programa legítimo; spyware monitora sem ser percebido; ransomware criptografa e exige resgate.. A armadilha deve ser recusada porque distorce o conteúdo: Tratar phishing como tipo de malware técnico, quando na verdade é técnica de engenharia social.",
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
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 5: Segurança da informação: malware e phishing",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "vírus",
          "ransomware",
          "phishing"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-malware-phishing-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Segurança da informação: malware e phishing, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Segurança da informação: malware e phishing. Núcleo obrigatório: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.. Pegadinha obrigatória: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Segurança da informação: malware e phishing em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
      "Reconhecer como Segurança da informação: malware e phishing aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Segurança da informação."
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
        "frente": "Qual é a ideia central de Segurança da informação: malware e phishing?",
        "verso": "Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: vírus",
        "verso": "vírus: Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede. Trojan se disfarça de programa legítimo; spyware monitora sem ser percebido; ransomware criptografa e exige resgate. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Segurança da informação: malware e phishing",
        "verso": "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho). Revisão ampliada: em Segurança da informação: malware e phishing, o aluno deve identificar Segurança da informação, aplicar ao caso concreto, comparar com institutos próximos e justificar a resposta sem usar frase decorada.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Segurança da informação: malware e phishing",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "vírus",
            "ransomware",
            "phishing",
            "Vírus precisa de ação do usuário para se espalhar"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Diferenciar os tipos de malware pelo comportamento característico, e reconhecer phishing como técnica de engenharia social.",
            "Questões que descrevem o comportamento de um software malicioso, ou uma situação de engano por mensagem/link, testam a classificação correta."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
            "Tratar phishing como tipo de malware técnico, quando na verdade é técnica de engenharia social.",
            "Não diferenciar ransomware (criptografa e exige resgate) de outros malwares que apenas roubam dados sem bloquear o acesso."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Segurança da informação: malware e phishing\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Segurança da informação: malware e phishing para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Segurança da informação: malware e phishing?",
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
      "Informática",
      "Segurança da informação",
      "Segurança da informação: malware e phishing",
      "vírus",
      "ransomware",
      "phishing",
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
        "id": "seguranca-malware-phishing-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Diferenciar os principais tipos de malware e reconhecer técnicas de engenharia social",
        "enunciado": "Com base no capítulo \"Segurança da informação: malware e phishing\", assinale a alternativa correta. Um e-mail, aparentemente de um banco, pede que o usuário clique em um link e digite sua senha para 'atualizar o cadastro', mas o link leva a um site falso idêntico ao do banco. Essa técnica é chamada de:",
        "alternativas": [
          "Ransomware",
          "Phishing",
          "Worm",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Phishing é justamente a técnica de enganar a vítima, por meio de mensagens e sites falsos que imitam instituições confiáveis, para que ela forneça voluntariamente dados sensíveis — não envolve exploração de falha técnica, mas manipulação psicológica.",
        "comentarioDetalhado": [
          "Phishing é justamente a técnica de enganar a vítima, por meio de mensagens e sites falsos que imitam instituições confiáveis, para que ela forneça voluntariamente dados sensíveis — não envolve exploração de falha técnica, mas manipulação psicológica.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: vírus, ransomware, phishing, Vírus precisa de ação do usuário para se espalhar."
        ]
      },
      {
        "id": "seguranca-malware-phishing-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Vírus precisa de ação do usuário para se espalhar; worm se espalha sozinho pela rede.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "seguranca-malware-phishing-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Vírus (precisa de ação do usuário) e worm (se espalha sozinho). são a mesma coisa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Confundir vírus (precisa de ação do usuário) com worm (se espalha sozinho).",
          "Forma correta de lembrar: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema."
        ]
      },
      {
        "id": "seguranca-malware-phishing-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Segurança da informação: malware e phishing\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "vírus",
          "ransomware",
          "phishing",
          "Vírus precisa de ação do usuário para se espalhar",
          "Trojan se disfarça de programa legítimo"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "seguranca-malware-phishing-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Segurança da informação: malware e phishing\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Segurança da informação: malware e phishing\", a ideia principal é: Malware (software malicioso) é qualquer programa criado para causar dano, roubar dados ou obter acesso não autorizado a um sistema. Para estudar sem travar, guarde primeiro estas palavras-chave: vírus, ransomware, phishing. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Vírus precisa de ação do usuário; worm se espalha sozinho — phishing engana a pessoa, não explora falha técnica do sistema.",
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
    "id": "seguranca-senhas-backup-firewall",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 6,
    "totalChapters": 10,
    "title": "Segurança da informação: senhas, backup e firewall",
    "assunto": "Segurança da informação",
    "tecnica": "Reconhecimento de boas práticas de proteção preventiva",
    "competencia": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 3,
      "ENEM": 2
    },
    "termosChave": [
      "autenticação em dois fatores",
      "backup",
      "firewall"
    ],
    "corpo": [
      "Senhas fortes combinam letras maiúsculas e minúsculas, números e símbolos, evitando informações óbvias (data de nascimento, nome, sequências como '123456') e sendo únicas para cada serviço — reutilizar a mesma senha em vários sites significa que, se um deles vazar, todos os demais ficam vulneráveis. Autenticação em dois fatores (2FA) adiciona uma segunda camada de verificação além da senha (um código enviado por SMS, aplicativo autenticador, ou biometria), dificultando o acesso mesmo que a senha tenha sido comprometida.",
      "Backup é a cópia de segurança de dados, essencial para recuperação em caso de perda (falha de hardware, ataque de ransomware, exclusão acidental). A regra 3-2-1 é uma boa prática recomendada: manter 3 cópias dos dados, em 2 tipos de mídia diferentes, com 1 cópia armazenada em local externo (fora do local físico principal, incluindo a nuvem).",
      "Firewall é um sistema (de hardware ou software) que monitora e controla o tráfego de rede, permitindo ou bloqueando conexões conforme regras de segurança definidas — funciona como uma barreira entre a rede interna (confiável) e redes externas (como a internet), impedindo acessos não autorizados de entrarem ou dados sensíveis de saírem sem permissão."
    ],
    "pontosChave": [
      "Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha.",
      "Backup segue a regra 3-2-1: 3 cópias, 2 mídias diferentes, 1 fora do local principal.",
      "Firewall controla o tráfego de rede, permitindo ou bloqueando conexões conforme regras de segurança."
    ],
    "checkRapido": {
      "pergunta": "Segundo a regra 3-2-1 de backup, quantas cópias dos dados devem ser mantidas, no total?",
      "opcoes": [
        "1",
        "2",
        "3"
      ],
      "correta": 2,
      "justificativa": "A regra 3-2-1 recomenda manter 3 cópias totais dos dados (o original mais 2 backups), armazenadas em 2 tipos de mídia diferentes, com pelo menos 1 cópia mantida em local externo ao principal."
    },
    "oQueCobra": "Reconhecer boas práticas de segurança preventiva relacionadas a senha, backup e controle de tráfego de rede.",
    "precisaSaberAntes": "Nenhum pré-requisito específico além dos conceitos de malware já vistos no capítulo anterior.",
    "explicacao": [
      {
        "titulo": "Gerenciador de senhas",
        "texto": "Como criar e lembrar senhas únicas e complexas para cada serviço é difícil manualmente, gerenciadores de senha são ferramentas recomendadas que geram, armazenam e preenchem senhas fortes automaticamente, protegidas por uma única senha-mestra — reduzindo o risco de reutilização de senha entre serviços."
      },
      {
        "titulo": "Firewall não substitui antivírus",
        "texto": "Firewall controla conexões de rede (o que entra e sai), mas não analisa o conteúdo de arquivos em busca de malware já presente no sistema — essa é a função do antivírus. As duas ferramentas são complementares, não substitutas uma da outra."
      }
    ],
    "comoIdentificar": "Questões que descrevem uma prática de segurança e pedem para identificá-la, ou que testam o conhecimento da regra 3-2-1 de backup.",
    "pegadinhas": [
      "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
      "Não reconhecer 2FA como uma camada adicional à senha, e não um substituto dela.",
      "Errar os números da regra 3-2-1 de backup (3 cópias, 2 mídias, 1 externa)."
    ],
    "resumoFrase": "Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
    "proximoTitulo": "Redes de computadores: conceitos básicos",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Segurança da informação: senhas, backup e firewall\", a ideia principal é: Senhas fortes combinam letras maiúsculas e minúsculas, números e símbolos, evitando informações óbvias (data de nascimento, nome, sequências como '123456') e sendo únicas para cada serviço — reutilizar a mesma senha em vários sites significa que, se um deles vazar, todos os demais ficam vulneráveis. Para estudar sem travar, guarde primeiro estas palavras-chave: autenticação em dois fatores, backup, firewall. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "autenticação em dois fatores",
      "backup",
      "firewall",
      "Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha.",
      "Backup segue a regra 3-2-1: 3 cópias, 2 mídias diferentes, 1 fora do local principal."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Segundo a regra 3-2-1 de backup, quantas cópias dos dados devem ser mantidas, no total? Assinale a alternativa correta.",
        "alternativas": [
          "1",
          "2",
          "3",
          "autenticação em dois fatores",
          "backup"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A regra 3-2-1 recomenda manter 3 cópias totais dos dados (o original mais 2 backups), armazenadas em 2 tipos de mídia diferentes, com pelo menos 1 cópia mantida em local externo ao principal."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          }
        ],
        "comentario": "A regra 3-2-1 recomenda manter 3 cópias totais dos dados (o original mais 2 backups), armazenadas em 2 tipos de mídia diferentes, com pelo menos 1 cópia mantida em local externo ao principal.",
        "armadilhaDaBanca": "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
        "porqueCaiEmProva": "Reconhecer boas práticas de segurança preventiva relacionadas a senha, backup e controle de tráfego de rede.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
        "comentarioDetalhado": [
          "Ponto cobrado: Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1."
        ],
        "armadilhaDaBanca": "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: firewall e antivírus têm a mesma função.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
        "comentarioDetalhado": [
          "Armadilha explorada: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha."
        ],
        "armadilhaDaBanca": "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Segurança da informação: senhas, backup e firewall, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
        "armadilhaDaBanca": "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
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
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Segurança da informação: senhas, backup e firewall?",
        "alternativas": [
          "Senha forte",
          "firewall e antivírus têm a mesma função.",
          "Backup segue a regra 3-2-1",
          "Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
          "Reconhecer corretamente o termo-chave: autenticação em dois fatores."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo)."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
        "armadilhaDaBanca": "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Segurança da informação: senhas, backup e firewall em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1. Pegadinha a evitar: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "autenticação em dois fatores",
          "backup",
          "firewall",
          "Firewall controla tráfego de rede",
          "antivírus analisa conteúdo"
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
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Backup segue a regra 3-2-1\" e mostre por que \"O ponto \"2FA como uma camada adicional à senha, e não um substituto dela.\" é irrelevante para resolver questões do tema.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Backup segue a regra 3-2-1: 3 cópias, 2 mídias diferentes, 1 fora do local principal.. A armadilha deve ser recusada porque distorce o conteúdo: Não reconhecer 2FA como uma camada adicional à senha, e não um substituto dela.",
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
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 6: Segurança da informação: senhas, backup e firewall",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "assunto": "Segurança da informação",
        "tags": [
          "Informática",
          "Segurança da informação",
          "autenticação em dois fatores",
          "backup",
          "firewall"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "seguranca-senhas-backup-firewall-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Segurança da informação: senhas, backup e firewall, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Segurança da informação: senhas, backup e firewall. Núcleo obrigatório: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.. Pegadinha obrigatória: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Segurança da informação: senhas, backup e firewall em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
      "Reconhecer como Segurança da informação: senhas, backup e firewall aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Segurança da informação."
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
        "frente": "Qual é a ideia central de Segurança da informação: senhas, backup e firewall?",
        "verso": "Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: autenticação em dois fatores",
        "verso": "autenticação em dois fatores: Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha. Backup segue a regra 3-2-1: 3 cópias, 2 mídias diferentes, 1 fora do local principal. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Segurança da informação: senhas, backup e firewall",
        "verso": "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Segurança da informação: senhas, backup e firewall",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "autenticação em dois fatores",
            "backup",
            "firewall",
            "Senha forte"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Reconhecer boas práticas de segurança preventiva relacionadas a senha, backup e controle de tráfego de rede.",
            "Questões que descrevem uma prática de segurança e pedem para identificá-la, ou que testam o conhecimento da regra 3-2-1 de backup."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
            "Não reconhecer 2FA como uma camada adicional à senha, e não um substituto dela.",
            "Errar os números da regra 3-2-1 de backup (3 cópias, 2 mídias, 1 externa)."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Segurança da informação: senhas, backup e firewall\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Segurança da informação: senhas, backup e firewall para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Segurança da informação: senhas, backup e firewall?",
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
      "Informática",
      "Segurança da informação",
      "Segurança da informação: senhas, backup e firewall",
      "autenticação em dois fatores",
      "backup",
      "firewall",
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
        "id": "seguranca-senhas-backup-firewall-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer boas práticas de senha, backup e o papel do firewall e da autenticação em dois fatores",
        "enunciado": "Com base no capítulo \"Segurança da informação: senhas, backup e firewall\", assinale a alternativa correta. Segundo a regra 3-2-1 de backup, quantas cópias dos dados devem ser mantidas, no total?",
        "alternativas": [
          "1",
          "2",
          "3",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 2,
        "comentario": "A regra 3-2-1 recomenda manter 3 cópias totais dos dados (o original mais 2 backups), armazenadas em 2 tipos de mídia diferentes, com pelo menos 1 cópia mantida em local externo ao principal.",
        "comentarioDetalhado": [
          "A regra 3-2-1 recomenda manter 3 cópias totais dos dados (o original mais 2 backups), armazenadas em 2 tipos de mídia diferentes, com pelo menos 1 cópia mantida em local externo ao principal.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: autenticação em dois fatores, backup, firewall, Senha forte."
        ]
      },
      {
        "id": "seguranca-senhas-backup-firewall-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Senha forte: combina caracteres variados, evita óbvios, é única por serviço; 2FA adiciona camada extra além da senha.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "seguranca-senhas-backup-firewall-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Firewall e antivírus têm a mesma função.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Achar que firewall e antivírus têm a mesma função — são complementares, com focos diferentes (rede x conteúdo de arquivo).",
          "Forma correta de lembrar: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1."
        ]
      },
      {
        "id": "seguranca-senhas-backup-firewall-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Segurança da informação: senhas, backup e firewall\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "autenticação em dois fatores",
          "backup",
          "firewall",
          "Senha forte",
          "Backup segue a regra 3"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "seguranca-senhas-backup-firewall-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Segurança da informação: senhas, backup e firewall\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Segurança da informação: senhas, backup e firewall\", a ideia principal é: Senhas fortes combinam letras maiúsculas e minúsculas, números e símbolos, evitando informações óbvias (data de nascimento, nome, sequências como '123456') e sendo únicas para cada serviço — reutilizar a mesma senha em vários sites significa que, se um deles vazar, todos os demais ficam vulneráveis. Para estudar sem travar, guarde primeiro estas palavras-chave: autenticação em dois fatores, backup, firewall. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Firewall controla tráfego de rede; antivírus analisa conteúdo — são complementares. Backup segue a regra 3-2-1.",
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
    "id": "redes-de-computadores",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 7,
    "totalChapters": 10,
    "title": "Redes de computadores: conceitos básicos",
    "assunto": "Redes de computadores",
    "tecnica": "Diferenciação por escala geográfica e por tipo de acesso",
    "competencia": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 3,
      "ENEM": 2
    },
    "termosChave": [
      "LAN",
      "endereço IP",
      "VPN"
    ],
    "corpo": [
      "LAN (Local Area Network) é uma rede de abrangência local, restrita a um espaço físico limitado (uma casa, um escritório, um quartel) — geralmente conectada por cabos ou Wi-Fi. WAN (Wide Area Network) é uma rede de longa distância, conectando LANs em locais geograficamente distantes — a internet é o maior exemplo de WAN existente.",
      "Endereço IP (Internet Protocol) é o identificador numérico único de cada dispositivo conectado a uma rede, permitindo que os dados sejam corretamente endereçados e entregues — pode ser fixo (não muda) ou dinâmico (atribuído automaticamente e sujeito a mudança a cada nova conexão). DNS (Domain Name System) é o serviço que traduz nomes de domínio legíveis por humanos (como www.gov.br) para o endereço IP numérico correspondente, que os computadores realmente usam para se comunicar.",
      "VPN (Virtual Private Network) cria uma conexão criptografada entre o dispositivo do usuário e um servidor remoto, mascarando o endereço IP real e protegendo o tráfego de dados de possível interceptação — muito usada para acessar redes corporativas remotamente de forma segura, ou para proteger a privacidade em redes Wi-Fi públicas não confiáveis."
    ],
    "pontosChave": [
      "LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN).",
      "IP identifica cada dispositivo na rede; DNS traduz nome de domínio para o IP correspondente.",
      "VPN cria conexão criptografada, mascarando o IP real e protegendo dados em redes não confiáveis."
    ],
    "checkRapido": {
      "pergunta": "O serviço responsável por traduzir 'www.gov.br' para o endereço IP numérico correspondente é o:",
      "opcoes": [
        "DNS",
        "VPN",
        "Firewall"
      ],
      "correta": 0,
      "justificativa": "DNS (Domain Name System) é o serviço responsável por essa tradução — sem ele, os usuários precisariam memorizar sequências numéricas de IP em vez de nomes de domínio legíveis."
    },
    "oQueCobra": "Diferenciar LAN de WAN por escala, e reconhecer a função de IP, DNS e VPN em uma rede.",
    "precisaSaberAntes": "Nenhum pré-requisito específico além dos conceitos gerais de internet já vistos.",
    "explicacao": [
      {
        "titulo": "Intranet e extranet",
        "texto": "Intranet é uma rede privada, com a mesma tecnologia da internet, mas de acesso restrito aos membros de uma organização (ex.: rede interna de um batalgão). Extranet é uma extensão controlada da intranet, permitindo acesso limitado a parceiros externos específicos, mantendo o restante da rede interna protegido."
      },
      {
        "titulo": "Roteador e switch",
        "texto": "Roteador conecta diferentes redes entre si (por exemplo, a rede local à internet), decidindo o melhor caminho para os dados. Switch conecta dispositivos dentro da mesma rede local, direcionando o tráfego apenas para o destinatário correto dentro dessa rede, com mais eficiência do que um simples hub (que retransmite para todos os dispositivos conectados)."
      }
    ],
    "comoIdentificar": "Questões que descrevem a abrangência de uma rede, ou pedem a função de um componente/serviço específico (IP, DNS, VPN, roteador).",
    "pegadinhas": [
      "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
      "Confundir a função do DNS (tradução de nome para IP) com a de uma VPN (criptografia e mascaramento de IP).",
      "Não diferenciar roteador (conecta redes diferentes) de switch (conecta dispositivos na mesma rede)."
    ],
    "resumoFrase": "LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
    "proximoTitulo": "Lei Geral de Proteção de Dados (LGPD)",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Redes de computadores: conceitos básicos\", a ideia principal é: LAN (Local Area Network) é uma rede de abrangência local, restrita a um espaço físico limitado (uma casa, um escritório, um quartel) — geralmente conectada por cabos ou Wi-Fi. Para estudar sem travar, guarde primeiro estas palavras-chave: LAN, endereço IP, VPN. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "LAN",
      "endereço IP",
      "VPN",
      "LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN).",
      "IP identifica cada dispositivo na rede; DNS traduz nome de domínio para o IP correspondente."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "O serviço responsável por traduzir 'www.gov.br' para o endereço IP numérico correspondente é o: Assinale a alternativa correta.",
        "alternativas": [
          "VPN",
          "DNS",
          "Firewall",
          "LAN",
          "endereço IP"
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. DNS (Domain Name System) é o serviço responsável por essa tradução — sem ele, os usuários precisariam memorizar sequências numéricas de IP em vez de nomes de domínio legíveis."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          }
        ],
        "comentario": "DNS (Domain Name System) é o serviço responsável por essa tradução — sem ele, os usuários precisariam memorizar sequências numéricas de IP em vez de nomes de domínio legíveis.",
        "armadilhaDaBanca": "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
        "porqueCaiEmProva": "Diferenciar LAN de WAN por escala, e reconhecer a função de IP, DNS e VPN em uma rede.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN).",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
        "comentarioDetalhado": [
          "Ponto cobrado: LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN).",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real."
        ],
        "armadilhaDaBanca": "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: LAN e WAN, ou tratar a internet como uma LAN de grande porte, ignorando a… são conceitos equivalentes para fins de prova.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
        "comentarioDetalhado": [
          "Armadilha explorada: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN)."
        ],
        "armadilhaDaBanca": "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Redes de computadores: conceitos básicos, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
        "armadilhaDaBanca": "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
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
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Redes de computadores: conceitos básicos?",
        "alternativas": [
          "LAN e WAN, ou tratar a internet como uma LAN de grande porte, ignorando a… são conceitos equivalentes para fins de prova.",
          "LAN",
          "IP identifica cada dispositivo na rede",
          "LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
          "Reconhecer corretamente o termo-chave: LAN."
        ],
        "correta": 0,
        "gabaritoLetra": "A",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
        "armadilhaDaBanca": "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Redes de computadores: conceitos básicos em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real. Pegadinha a evitar: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "LAN",
          "endereço IP",
          "VPN",
          "LAN é local",
          "WAN é de longa distância (internet é a…"
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
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"IP identifica cada dispositivo na rede\" e mostre por que \"a função do DNS (tradução de nome para IP) e a de uma VPN (criptografia e mascaramento de IP). são conceitos equivalentes para fins de prova.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: IP identifica cada dispositivo na rede; DNS traduz nome de domínio para o IP correspondente.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir a função do DNS (tradução de nome para IP) com a de uma VPN (criptografia e mascaramento de IP).",
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
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 7: Redes de computadores: conceitos básicos",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "assunto": "Redes de computadores",
        "tags": [
          "Informática",
          "Redes de computadores",
          "LAN",
          "endereço IP",
          "VPN"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "redes-de-computadores-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Redes de computadores: conceitos básicos, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Redes de computadores: conceitos básicos. Núcleo obrigatório: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.. Pegadinha obrigatória: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Redes de computadores: conceitos básicos em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
      "Reconhecer como Redes de computadores: conceitos básicos aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Redes de computadores."
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
        "frente": "Qual é a ideia central de Redes de computadores: conceitos básicos?",
        "verso": "LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: LAN",
        "verso": "LAN: LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN). IP identifica cada dispositivo na rede; DNS traduz nome de domínio para o IP correspondente. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Redes de computadores: conceitos básicos",
        "verso": "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Redes de computadores: conceitos básicos",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "LAN",
            "endereço IP",
            "VPN",
            "IP identifica cada dispositivo na rede"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Diferenciar LAN de WAN por escala, e reconhecer a função de IP, DNS e VPN em uma rede.",
            "Questões que descrevem a abrangência de uma rede, ou pedem a função de um componente/serviço específico (IP, DNS, VPN, roteador)."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
            "Confundir a função do DNS (tradução de nome para IP) com a de uma VPN (criptografia e mascaramento de IP).",
            "Não diferenciar roteador (conecta redes diferentes) de switch (conecta dispositivos na mesma rede)."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Redes de computadores: conceitos básicos\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Redes de computadores: conceitos básicos para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Redes de computadores: conceitos básicos?",
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
      "Informática",
      "Redes de computadores",
      "Redes de computadores: conceitos básicos",
      "LAN",
      "endereço IP",
      "VPN",
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
        "id": "redes-de-computadores-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer os conceitos básicos de LAN, WAN, Wi-Fi, IP e VPN",
        "enunciado": "Com base no capítulo \"Redes de computadores: conceitos básicos\", assinale a alternativa correta. O serviço responsável por traduzir 'www.gov.br' para o endereço IP numérico correspondente é o:",
        "alternativas": [
          "DNS",
          "VPN",
          "Firewall",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 0,
        "comentario": "DNS (Domain Name System) é o serviço responsável por essa tradução — sem ele, os usuários precisariam memorizar sequências numéricas de IP em vez de nomes de domínio legíveis.",
        "comentarioDetalhado": [
          "DNS (Domain Name System) é o serviço responsável por essa tradução — sem ele, os usuários precisariam memorizar sequências numéricas de IP em vez de nomes de domínio legíveis.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: LAN, endereço IP, VPN, IP identifica cada dispositivo na rede."
        ]
      },
      {
        "id": "redes-de-computadores-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN).",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: LAN: rede local (casa, escritório). WAN: rede de longa distância (a internet é a maior WAN).",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "redes-de-computadores-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: LAN e WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala. são a mesma coisa.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Confundir LAN com WAN, ou tratar a internet como uma LAN de grande porte, ignorando a diferença conceitual de escala.",
          "Forma correta de lembrar: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real."
        ]
      },
      {
        "id": "redes-de-computadores-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Redes de computadores: conceitos básicos\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "LAN",
          "endereço IP",
          "VPN",
          "IP identifica cada dispositivo na rede",
          "VPN cria conexão criptografada, mascarando o IP real e protegendo dados em redes não confiáveis."
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "redes-de-computadores-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Redes de computadores: conceitos básicos\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Redes de computadores: conceitos básicos\", a ideia principal é: LAN (Local Area Network) é uma rede de abrangência local, restrita a um espaço físico limitado (uma casa, um escritório, um quartel) — geralmente conectada por cabos ou Wi-Fi. Para estudar sem travar, guarde primeiro estas palavras-chave: LAN, endereço IP, VPN. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: LAN é local, WAN é de longa distância (internet é a maior WAN); DNS traduz nome pra IP; VPN criptografa e mascara o IP real.",
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
    "id": "lgpd",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 8,
    "totalChapters": 10,
    "title": "Lei Geral de Proteção de Dados (LGPD)",
    "assunto": "LGPD",
    "tecnica": "Associação de cada princípio ao seu objetivo de proteção",
    "competencia": "Reconhecer os princípios e conceitos fundamentais da LGPD",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 4,
      "ENEM": 3
    },
    "termosChave": [
      "dado pessoal",
      "titular dos dados",
      "controlador e operador"
    ],
    "corpo": [
      "A Lei Geral de Proteção de Dados (Lei 13.709/2018) regula o tratamento de dados pessoais por pessoas físicas ou jurídicas, de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e privacidade das pessoas naturais. Dado pessoal é qualquer informação relacionada a pessoa natural identificada ou identificável (nome, CPF, endereço, e-mail). Dado pessoal sensível é uma categoria com proteção reforçada: origem racial ou étnica, convicção religiosa, opinião política, dado de saúde ou vida sexual, dado genético ou biométrico.",
      "Os principais agentes de tratamento são: controlador (quem toma as decisões sobre o tratamento dos dados — o que fazer, para quê) e operador (quem realiza o tratamento em nome do controlador, seguindo suas instruções). Titular dos dados é a pessoa natural a quem os dados pessoais se referem, titular dos direitos previstos na lei (acesso, correção, exclusão, portabilidade, entre outros).",
      "Os princípios da LGPD incluem: finalidade (o tratamento deve ter propósito legítimo e específico, informado ao titular), adequação (compatibilidade do tratamento com a finalidade informada), necessidade (limitação do tratamento ao mínimo necessário para a finalidade), transparência (informações claras sobre o tratamento), segurança (medidas técnicas para proteger os dados) e prevenção (adoção de medidas para prevenir danos). O tratamento de dados exige uma base legal específica (consentimento do titular, cumprimento de obrigação legal, execução de políticas públicas, entre outras hipóteses previstas em lei)."
    ],
    "pontosChave": [
      "Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada.",
      "Controlador decide sobre o tratamento; operador executa em nome do controlador; titular é a pessoa a quem os dados pertencem.",
      "Tratamento exige base legal específica (consentimento é uma delas, não a única) e deve seguir princípios como finalidade, necessidade e transparência."
    ],
    "checkRapido": {
      "pergunta": "Uma informação sobre a condição de saúde de uma pessoa, coletada por um hospital, é classificada pela LGPD como:",
      "opcoes": [
        "Dado pessoal comum",
        "Dado pessoal sensível",
        "Dado anonimizado"
      ],
      "correta": 1,
      "justificativa": "Dado de saúde está expressamente listado entre as categorias de dado pessoal sensível na LGPD, exigindo cuidados e bases legais mais restritivas para seu tratamento, em comparação com dados pessoais comuns."
    },
    "oQueCobra": "Classificar dados como pessoais ou sensíveis, e diferenciar os papéis de controlador, operador e titular no tratamento de dados.",
    "precisaSaberAntes": "Nenhum pré-requisito específico, mas ajuda relacionar com o direito à privacidade já visto em Direito Constitucional.",
    "explicacao": [
      {
        "titulo": "Consentimento não é a única base legal",
        "texto": "Muita gente acha que todo tratamento de dados pessoais exige consentimento explícito do titular — mas a LGPD prevê diversas outras bases legais igualmente válidas, como cumprimento de obrigação legal pelo controlador, execução de políticas públicas, exercício regular de direitos em processo, proteção da vida, entre outras, sem necessidade de consentimento em cada uma dessas hipóteses."
      },
      {
        "titulo": "ANPD — Autoridade Nacional de Proteção de Dados",
        "texto": "A ANPD é o órgão responsável por fiscalizar o cumprimento da LGPD, aplicar sanções administrativas, e editar normas complementares sobre proteção de dados — funciona de forma análoga a outros órgãos reguladores setoriais, mas com atuação transversal a todos os setores que tratam dados pessoais."
      }
    ],
    "comoIdentificar": "Questões que descrevem um tipo de dado ou uma situação de tratamento e pedem a classificação correta segundo a LGPD.",
    "pegadinhas": [
      "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
      "Confundir controlador (decide) com operador (executa as instruções do controlador).",
      "Não reconhecer dado biométrico ou genético como categoria de dado sensível."
    ],
    "resumoFrase": "Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
    "proximoTitulo": "Crimes cibernéticos e evidência digital",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Lei Geral de Proteção de Dados (LGPD)\", a ideia principal é: A Lei Geral de Proteção de Dados (Lei 13.709/2018) regula o tratamento de dados pessoais por pessoas físicas ou jurídicas, de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e privacidade das pessoas naturais. Para estudar sem travar, guarde primeiro estas palavras-chave: dado pessoal, titular dos dados, controlador e operador. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "dado pessoal",
      "titular dos dados",
      "controlador e operador",
      "Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada.",
      "Controlador decide sobre o tratamento; operador executa em nome do controlador; titular é a pessoa a quem os dados pertencem."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Uma informação sobre a condição de saúde de uma pessoa, coletada por um hospital, é classificada pela LGPD como: Assinale a alternativa correta.",
        "alternativas": [
          "Dado pessoal comum",
          "Dado anonimizado",
          "titular dos dados",
          "controlador e operador",
          "Dado pessoal sensível"
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Dado de saúde está expressamente listado entre as categorias de dado pessoal sensível na LGPD, exigindo cuidados e bases legais mais restritivas para seu tratamento, em comparação com dados pessoais comuns."
          }
        ],
        "comentario": "Dado de saúde está expressamente listado entre as categorias de dado pessoal sensível na LGPD, exigindo cuidados e bases legais mais restritivas para seu tratamento, em comparação com dados pessoais comuns.",
        "armadilhaDaBanca": "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
        "porqueCaiEmProva": "Classificar dados como pessoais ou sensíveis, e diferenciar os papéis de controlador, operador e titular no tratamento de dados.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
        "comentarioDetalhado": [
          "Ponto cobrado: Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única."
        ],
        "armadilhaDaBanca": "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: consentimento é a única base legal válida para qualquer tratamento de dados.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
        "comentarioDetalhado": [
          "Armadilha explorada: Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada."
        ],
        "armadilhaDaBanca": "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Lei Geral de Proteção de Dados (LGPD), o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
        "armadilhaDaBanca": "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
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
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Lei Geral de Proteção de Dados (LGPD)?",
        "alternativas": [
          "Dado pessoal identifica pessoa natural",
          "Controlador decide sobre o tratamento",
          "Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
          "consentimento é a única base legal válida para qualquer tratamento de dados.",
          "Reconhecer corretamente o termo-chave: dado pessoal."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que consentimento é a única base legal válida para qualquer tratamento de dados."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
        "armadilhaDaBanca": "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Lei Geral de Proteção de Dados (LGPD) em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única. Pegadinha a evitar: Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "dado pessoal",
          "titular dos dados",
          "controlador e operador",
          "Dado de saúde",
          "religião"
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
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Controlador decide sobre o tratamento\" e mostre por que \"controlador (decide) e operador (executa as instruções do controlador). são conceitos equivalentes para fins de prova.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Controlador decide sobre o tratamento; operador executa em nome do controlador; titular é a pessoa a quem os dados pertencem.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir controlador (decide) com operador (executa as instruções do controlador).",
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
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 8: Lei Geral de Proteção de Dados (LGPD)",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "assunto": "LGPD",
        "tags": [
          "Informática",
          "LGPD",
          "dado pessoal",
          "titular dos dados",
          "controlador e operador"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "lgpd-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Lei Geral de Proteção de Dados (LGPD), com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Lei Geral de Proteção de Dados (LGPD). Núcleo obrigatório: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.. Pegadinha obrigatória: Achar que consentimento é a única base legal válida para qualquer tratamento de dados.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Lei Geral de Proteção de Dados (LGPD) em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Reconhecer os princípios e conceitos fundamentais da LGPD",
      "Reconhecer como Lei Geral de Proteção de Dados (LGPD) aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre LGPD."
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
        "frente": "Qual é a ideia central de Lei Geral de Proteção de Dados (LGPD)?",
        "verso": "Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: dado pessoal",
        "verso": "dado pessoal: Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada. Controlador decide sobre o tratamento; operador executa em nome do controlador; titular é a pessoa a quem os dados pertencem. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Lei Geral de Proteção de Dados (LGPD)",
        "verso": "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Lei Geral de Proteção de Dados (LGPD)",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "dado pessoal",
            "titular dos dados",
            "controlador e operador",
            "Dado pessoal identifica pessoa natural"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Classificar dados como pessoais ou sensíveis, e diferenciar os papéis de controlador, operador e titular no tratamento de dados.",
            "Questões que descrevem um tipo de dado ou uma situação de tratamento e pedem a classificação correta segundo a LGPD."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
            "Confundir controlador (decide) com operador (executa as instruções do controlador).",
            "Não reconhecer dado biométrico ou genético como categoria de dado sensível."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Lei Geral de Proteção de Dados (LGPD)\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Lei Geral de Proteção de Dados (LGPD) para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Lei Geral de Proteção de Dados (LGPD)?",
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
      "Informática",
      "LGPD",
      "Lei Geral de Proteção de Dados (LGPD)",
      "dado pessoal",
      "titular dos dados",
      "controlador e operador",
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
        "id": "lgpd-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer os princípios e conceitos fundamentais da LGPD",
        "enunciado": "Com base no capítulo \"Lei Geral de Proteção de Dados (LGPD)\", assinale a alternativa correta. Uma informação sobre a condição de saúde de uma pessoa, coletada por um hospital, é classificada pela LGPD como:",
        "alternativas": [
          "Dado pessoal comum",
          "Dado pessoal sensível",
          "Dado anonimizado",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Dado de saúde está expressamente listado entre as categorias de dado pessoal sensível na LGPD, exigindo cuidados e bases legais mais restritivas para seu tratamento, em comparação com dados pessoais comuns.",
        "comentarioDetalhado": [
          "Dado de saúde está expressamente listado entre as categorias de dado pessoal sensível na LGPD, exigindo cuidados e bases legais mais restritivas para seu tratamento, em comparação com dados pessoais comuns.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: dado pessoal, titular dos dados, controlador e operador, Dado pessoal identifica pessoa natural."
        ]
      },
      {
        "id": "lgpd-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Dado pessoal identifica pessoa natural; dado sensível (raça, religião, saúde, biometria) tem proteção reforçada.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "lgpd-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Consentimento é a única base legal válida para qualquer tratamento de dados.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Achar que consentimento é a única base legal válida para qualquer tratamento de dados.",
          "Forma correta de lembrar: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única."
        ]
      },
      {
        "id": "lgpd-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Lei Geral de Proteção de Dados (LGPD)\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "dado pessoal",
          "titular dos dados",
          "controlador e operador",
          "Dado pessoal identifica pessoa natural",
          "Controlador decide sobre o tratamento"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "lgpd-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Lei Geral de Proteção de Dados (LGPD)\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Lei Geral de Proteção de Dados (LGPD)\", a ideia principal é: A Lei Geral de Proteção de Dados (Lei 13.709/2018) regula o tratamento de dados pessoais por pessoas físicas ou jurídicas, de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e privacidade das pessoas naturais. Para estudar sem travar, guarde primeiro estas palavras-chave: dado pessoal, titular dos dados, controlador e operador. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Dado de saúde, religião, biometria e afins são sensíveis; consentimento é só UMA das bases legais possíveis, não a única.",
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
    "id": "crimes-ciberneticos-evidencia-digital",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 9,
    "totalChapters": 10,
    "title": "Crimes cibernéticos e evidência digital",
    "assunto": "Crimes cibernéticos",
    "tecnica": "Reconhecimento dos crimes tipificados pela Lei Carolina Dieckmann",
    "competencia": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
    "dificuldade": "Média",
    "tempoLeituraMin": 7,
    "tempoExercicioMin": 5,
    "bancaRatings": {
      "FGV": 4,
      "CESPE": 4,
      "FCC": 3,
      "ENEM": 2
    },
    "termosChave": [
      "invasão de dispositivo informático",
      "evidência digital",
      "cadeia de custódia digital"
    ],
    "corpo": [
      "A chamada Lei Carolina Dieckmann (Lei 12.737/2012) tipificou o crime de invasão de dispositivo informático (art. 154-A do Código Penal): invadir dispositivo alheio, conectado ou não à rede, mediante violação indevida de mecanismo de segurança, com o fim de obter, adulterar ou destruir dados, ou instalar vulnerabilidades. A pena é agravada se resulta em obtenção de conteúdo de comunicação privada, segredo comercial/industrial, ou informação sigilosa, ou se há divulgação/comercialização dos dados obtidos.",
      "Estelionato digital (fraude eletrônica) enquadra-se, em regra, no crime de estelionato do Código Penal, praticado por meios eletrônicos (golpes por WhatsApp, clonagem de aplicativos bancários, phishing que resulta em transferência indevida de valores) — a modalidade eletrônica não cria um tipo penal totalmente novo na maioria dos casos, mas pode incidir causa de aumento de pena quando praticado por meio de redes sociais, transferência eletrônica de dados ou outro meio fraudulento eletrônico.",
      "Na atuação policial, a preservação de evidência digital exige cuidados específicos: evitar manusear diretamente o dispositivo apreendido (para não alterar metadados ou timestamps), documentar detalhadamente o estado em que o equipamento foi encontrado (ligado, bloqueado, aplicativos abertos), e acionar peritos especializados em informática forense assim que possível — a cadeia de custódia digital, tanto quanto a física, precisa ser rigorosamente documentada para que a prova mantenha validade em juízo."
    ],
    "pontosChave": [
      "Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados.",
      "Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado.",
      "Preservação de evidência digital exige não manusear diretamente o dispositivo e acionar perícia especializada rapidamente."
    ],
    "checkRapido": {
      "pergunta": "Um policial apreende um celular ligado, com aplicativo de mensagens aberto, em uma cena de crime. A conduta mais adequada para preservar a evidência digital é:",
      "opcoes": [
        "Navegar pelo aplicativo para verificar rapidamente o conteúdo antes de acionar a perícia",
        "Documentar o estado do dispositivo (ligado, aplicativo aberto) e acionar perícia especializada, evitando manuseio direto",
        "Desligar imediatamente o dispositivo para 'travar' as informações"
      ],
      "correta": 1,
      "justificativa": "A conduta correta é documentar cuidadosamente o estado em que o dispositivo foi encontrado e acionar perícia especializada o quanto antes — tanto navegar pelo aplicativo quanto desligar o dispositivo sem orientação técnica podem alterar dados, apagar informações temporárias ou comprometer a cadeia de custódia digital."
    },
    "oQueCobra": "Reconhecer o crime de invasão de dispositivo informático e os cuidados corretos de preservação de evidência digital em cena de crime.",
    "precisaSaberAntes": "Relembrar o conceito de cadeia de custódia, já visto em Direito Processual Penal, agora aplicado ao contexto digital.",
    "explicacao": [
      {
        "titulo": "Diferença entre invadir dispositivo e simplesmente acessar dado público",
        "texto": "O crime de invasão exige a violação de um mecanismo de segurança (senha, criptografia, autenticação) — acessar informação que está disponível publicamente, sem qualquer barreira de proteção, não configura o crime, por ausência desse elemento específico do tipo."
      },
      {
        "titulo": "Preservação de evidência em nuvem e redes sociais",
        "texto": "Além dos dispositivos físicos, evidências digitais frequentemente residem em contas de nuvem e redes sociais — nesses casos, a preservação pode exigir requisição judicial rápida às empresas provedoras (que podem excluir dados após certo período), e o registro (print, gravação de tela) do conteúdo encontrado, com metadados preservados sempre que possível."
      }
    ],
    "comoIdentificar": "Casos concretos de acesso não autorizado a dispositivo, ou situações de apreensão de equipamento eletrônico em cena de crime, testam esse conteúdo.",
    "pegadinhas": [
      "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
      "Manusear diretamente o dispositivo apreendido (navegar, tentar desbloquear) sem suporte de perícia especializada.",
      "Não reconhecer o estelionato digital como, em regra, uma modalidade do estelionato comum, com causa de aumento pelo meio eletrônico."
    ],
    "resumoFrase": "Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
    "proximoTitulo": "Inteligência artificial e ferramentas digitais",
    "padraoPlataforma": "VemAprovar Top1 — Premium 9/10",
    "versaoConteudo": "premium-2.0-top1",
    "ultimaAtualizacao": "2026-07-07",
    "statusRevisao": "premium_revisado_pedagogicamente__baixo_risco",
    "riscoAtualizacao": "baixo",
    "publicoAlvo": [
      "PMMA",
      "Concursos Militares"
    ],
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Crimes cibernéticos e evidência digital\", a ideia principal é: A chamada Lei Carolina Dieckmann (Lei 12.737/2012) tipificou o crime de invasão de dispositivo informático (art. Para estudar sem travar, guarde primeiro estas palavras-chave: invasão de dispositivo informático, evidência digital, cadeia de custódia digital. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "invasão de dispositivo informático",
      "evidência digital",
      "cadeia de custódia digital",
      "Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados.",
      "Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um policial apreende um celular ligado, com aplicativo de mensagens aberto, em uma cena de crime. A conduta mais adequada para preservar a evidência digital é: Assinale a alternativa correta.",
        "alternativas": [
          "Navegar pelo aplicativo para verificar rapidamente o conteúdo antes de acionar a perícia",
          "Desligar imediatamente o dispositivo para 'travar' as informações",
          "Documentar o estado do dispositivo (ligado, aplicativo aberto) e acionar perícia especializada, evitando manuseio direto",
          "invasão de dispositivo informático",
          "evidência digital"
        ],
        "correta": 2,
        "gabaritoLetra": "C",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "C",
            "correta": true,
            "comentario": "Correta. A conduta correta é documentar cuidadosamente o estado em que o dispositivo foi encontrado e acionar perícia especializada o quanto antes — tanto navegar pelo aplicativo quanto desligar o dispositivo sem orientação técnica podem alterar dados, apagar…"
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          }
        ],
        "comentario": "A conduta correta é documentar cuidadosamente o estado em que o dispositivo foi encontrado e acionar perícia especializada o quanto antes — tanto navegar pelo aplicativo quanto desligar o dispositivo sem orientação técnica podem alterar dados, apagar informações temporárias ou comprometer a cadeia de custódia digital.",
        "armadilhaDaBanca": "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "porqueCaiEmProva": "Reconhecer o crime de invasão de dispositivo informático e os cuidados corretos de preservação de evidência digital em cena de crime.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
        "comentarioDetalhado": [
          "Ponto cobrado: Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto."
        ],
        "armadilhaDaBanca": "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
        "comentarioDetalhado": [
          "Armadilha explorada: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados."
        ],
        "armadilhaDaBanca": "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Crimes cibernéticos e evidência digital, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
        "armadilhaDaBanca": "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
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
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Crimes cibernéticos e evidência digital?",
        "alternativas": [
          "Invasão de dispositivo informático (Lei Carolina Dieckmann)",
          "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
          "Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado.",
          "Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
          "Reconhecer corretamente o termo-chave: invasão de dispositivo informático."
        ],
        "correta": 1,
        "gabaritoLetra": "B",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
        "armadilhaDaBanca": "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Crimes cibernéticos e evidência digital em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto. Pegadinha a evitar: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital",
          "Invasão exige violar mecanismo de segurança",
          "e evidência digital se preserva…"
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
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado.\" e mostre por que \"Manusear diretamente o dispositivo apreendido (navegar, tentar desbloquear) sem suporte de perícia especializada.\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado.. A armadilha deve ser recusada porque distorce o conteúdo: Manusear diretamente o dispositivo apreendido (navegar, tentar desbloquear) sem suporte de perícia especializada.",
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
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 9: Crimes cibernéticos e evidência digital",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "assunto": "Crimes cibernéticos",
        "tags": [
          "Informática",
          "Crimes cibernéticos",
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "crimes-ciberneticos-evidencia-digital-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Crimes cibernéticos e evidência digital, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Crimes cibernéticos e evidência digital. Núcleo obrigatório: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.. Pegadinha obrigatória: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Crimes cibernéticos e evidência digital em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
      "Reconhecer como Crimes cibernéticos e evidência digital aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Crimes cibernéticos."
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
        "frente": "Qual é a ideia central de Crimes cibernéticos e evidência digital?",
        "verso": "Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: invasão de dispositivo informático",
        "verso": "invasão de dispositivo informático: Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados. Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Crimes cibernéticos e evidência digital",
        "verso": "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Crimes cibernéticos e evidência digital",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "invasão de dispositivo informático",
            "evidência digital",
            "cadeia de custódia digital",
            "Invasão de dispositivo informático (Lei Carolina Dieckmann)"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Reconhecer o crime de invasão de dispositivo informático e os cuidados corretos de preservação de evidência digital em cena de crime.",
            "Casos concretos de acesso não autorizado a dispositivo, ou situações de apreensão de equipamento eletrônico em cena de crime, testam esse conteúdo."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
            "Manusear diretamente o dispositivo apreendido (navegar, tentar desbloquear) sem suporte de perícia especializada.",
            "Não reconhecer o estelionato digital como, em regra, uma modalidade do estelionato comum, com causa de aumento pelo meio eletrônico."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Crimes cibernéticos e evidência digital\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Crimes cibernéticos e evidência digital para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Crimes cibernéticos e evidência digital?",
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
      "Informática",
      "Crimes cibernéticos",
      "Crimes cibernéticos e evidência digital",
      "invasão de dispositivo informático",
      "evidência digital",
      "cadeia de custódia digital",
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
        "id": "crimes-ciberneticos-evidencia-digital-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer os crimes cibernéticos mais comuns e os cuidados de preservação de evidência digital",
        "enunciado": "Com base no capítulo \"Crimes cibernéticos e evidência digital\", assinale a alternativa correta. Um policial apreende um celular ligado, com aplicativo de mensagens aberto, em uma cena de crime. A conduta mais adequada para preservar a evidência digital é:",
        "alternativas": [
          "Navegar pelo aplicativo para verificar rapidamente o conteúdo antes de acionar a perícia",
          "Documentar o estado do dispositivo (ligado, aplicativo aberto) e acionar perícia especializada, evitando manuseio direto",
          "Desligar imediatamente o dispositivo para 'travar' as informações",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "A conduta correta é documentar cuidadosamente o estado em que o dispositivo foi encontrado e acionar perícia especializada o quanto antes — tanto navegar pelo aplicativo quanto desligar o dispositivo sem orientação técnica podem alterar dados, apagar informações temporárias ou comprometer a cadeia de custódia digital.",
        "comentarioDetalhado": [
          "A conduta correta é documentar cuidadosamente o estado em que o dispositivo foi encontrado e acionar perícia especializada o quanto antes — tanto navegar pelo aplicativo quanto desligar o dispositivo sem orientação técnica podem alterar dados, apagar informações temporárias ou comprometer a cadeia de custódia digital.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: invasão de dispositivo informático, evidência digital, cadeia de custódia digital, Invasão de dispositivo informático (Lei Carolina Dieckmann)."
        ]
      },
      {
        "id": "crimes-ciberneticos-evidencia-digital-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: Invasão de dispositivo informático (Lei Carolina Dieckmann): violar mecanismo de segurança para obter/adulterar/destruir dados.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "crimes-ciberneticos-evidencia-digital-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Tratar qualquer acesso a informação eletrônica como crime, ignorando a exigência de violação de mecanismo de segurança.",
          "Forma correta de lembrar: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto."
        ]
      },
      {
        "id": "crimes-ciberneticos-evidencia-digital-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Crimes cibernéticos e evidência digital\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "invasão de dispositivo informático",
          "evidência digital",
          "cadeia de custódia digital",
          "Invasão de dispositivo informático (Lei Carolina Dieckmann)",
          "Estelionato digital, em regra, se enquadra no crime de estelionato comum, com causa de aumento pelo meio eletrônico empregado."
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "crimes-ciberneticos-evidencia-digital-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Crimes cibernéticos e evidência digital\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Crimes cibernéticos e evidência digital\", a ideia principal é: A chamada Lei Carolina Dieckmann (Lei 12.737/2012) tipificou o crime de invasão de dispositivo informático (art. Para estudar sem travar, guarde primeiro estas palavras-chave: invasão de dispositivo informático, evidência digital, cadeia de custódia digital. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: Invasão exige violar mecanismo de segurança — e evidência digital se preserva documentando e acionando perícia, nunca manuseando direto.",
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
    "id": "inteligencia-artificial-ferramentas-digitais",
    "materialTitle": "Informática para PMMA",
    "subject": "Informática",
    "contest": "Polícia Militar",
    "role": "Soldado",
    "moduleTitle": "Informática",
    "chapterIndex": 10,
    "totalChapters": 10,
    "title": "Inteligência artificial e ferramentas digitais",
    "assunto": "Inteligência artificial",
    "tecnica": "Reconhecimento de aplicações práticas de IA na segurança pública",
    "competencia": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
    "dificuldade": "Fácil",
    "tempoLeituraMin": 6,
    "tempoExercicioMin": 4,
    "bancaRatings": {
      "FGV": 3,
      "CESPE": 4,
      "FCC": 3,
      "ENEM": 3
    },
    "termosChave": [
      "inteligência artificial",
      "reconhecimento facial",
      "viés algorítmico"
    ],
    "corpo": [
      "Inteligência artificial (IA) é a área da computação que desenvolve sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana: reconhecimento de padrões, tomada de decisão, processamento de linguagem natural. Machine learning (aprendizado de máquina) é um subcampo da IA em que o sistema aprende padrões a partir de grandes volumes de dados, sem ser explicitamente programado para cada regra específica.",
      "Na segurança pública, aplicações de IA incluem: reconhecimento facial (identificação de pessoas a partir de câmeras de monitoramento, comparando com bancos de dados), análise preditiva de criminalidade (identificação de padrões geográficos e temporais de ocorrências, para otimizar alocação de efetivo), e chatbots/assistentes virtuais para atendimento inicial ao cidadão em canais digitais.",
      "Um ponto de atenção central, cada vez mais debatido: sistemas de IA podem reproduzir e até amplificar viés (bias) presente nos dados usados para treiná-los — se o histórico de dados reflete práticas policiais discriminatórias do passado, um sistema preditivo treinado com esses dados pode reforçar esse padrão, reforçando a necessidade de auditoria constante desses sistemas e de tratamento cuidadoso, ligando esse tema diretamente aos capítulos de Direitos Humanos já estudados (fundada suspeita, viés implícito)."
    ],
    "pontosChave": [
      "IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso.",
      "Aplicações em segurança pública: reconhecimento facial, análise preditiva de criminalidade, atendimento por chatbot.",
      "Viés algorítmico pode reproduzir discriminação histórica presente nos dados de treinamento — exige auditoria e cautela."
    ],
    "checkRapido": {
      "pergunta": "Um sistema de análise preditiva de criminalidade, treinado com dados históricos de abordagens policiais que refletiam desproporcionalidade racial, corre o risco de:",
      "opcoes": [
        "Ser sempre neutro, pois é uma máquina, não uma pessoa",
        "Reproduzir e até amplificar o viés presente nos dados históricos usados no treinamento",
        "Corrigir automaticamente qualquer desigualdade presente nos dados originais"
      ],
      "correta": 1,
      "justificativa": "Sistemas de IA aprendem os padrões presentes nos dados de treinamento — se esses dados refletem práticas discriminatórias históricas, o sistema tende a reproduzir e até amplificar esse viés em suas previsões e recomendações, não corrigi-lo automaticamente."
    },
    "oQueCobra": "Reconhecer conceitos básicos de IA e aplicações práticas na segurança pública, incluindo o risco de viés algorítmico.",
    "precisaSaberAntes": "Relacionar com o conceito de viés implícito e fundada suspeita, já vistos no módulo de Direitos Humanos.",
    "explicacao": [
      {
        "titulo": "IA generativa — o que é",
        "texto": "IA generativa é o tipo de sistema capaz de criar conteúdo novo (texto, imagem, áudio) a partir de padrões aprendidos, diferente de sistemas de IA voltados apenas para classificação ou previsão — assistentes de texto e geradores de imagem são exemplos populares desse tipo de IA."
      },
      {
        "titulo": "Deepfake — uso indevido de IA generativa",
        "texto": "Deepfake é conteúdo audiovisual manipulado por IA para simular que uma pessoa disse ou fez algo que não aconteceu de fato — tecnologia com aplicações legítimas (dublagem, efeitos visuais), mas também usada para golpes, desinformação e crimes contra a honra, exigindo atenção da atividade policial e pericial para sua identificação."
      }
    ],
    "comoIdentificar": "Questões que descrevem uma aplicação de IA na segurança pública e pedem para avaliar riscos ou benefícios, ou que testam conceitos gerais de IA.",
    "pegadinhas": [
      "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
      "Confundir machine learning (aprender padrões dos dados) com programação tradicional (regras explícitas definidas por humanos).",
      "Não reconhecer deepfake como aplicação problemática de IA generativa, relevante para crimes contra a honra e desinformação."
    ],
    "resumoFrase": "IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
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
    "areaPlataforma": "tecnologia",
    "explicacaoComoSeTivesse12": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Inteligência artificial e ferramentas digitais\", a ideia principal é: Inteligência artificial (IA) é a área da computação que desenvolve sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana: reconhecimento de padrões, tomada de decisão, processamento de linguagem natural. Para estudar sem travar, guarde primeiro estas palavras-chave: inteligência artificial, reconhecimento facial, viés algorítmico. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
    "comoEstudar": [
      "Leia o corpo do capítulo sem tentar decorar tudo na primeira passada.",
      "Depois leia os pontos-chave e transforme cada um em uma pergunta mental.",
      "Responda às questões de treino sem olhar a justificativa.",
      "Revise a pegadinha antes de passar para o próximo capítulo."
    ],
    "paraNaoEsquecer": [
      "inteligência artificial",
      "reconhecimento facial",
      "viés algorítmico",
      "IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso.",
      "Aplicações em segurança pública: reconhecimento facial, análise preditiva de criminalidade, atendimento por chatbot."
    ],
    "questoes": [
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q01-diagnostico-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/OAB/Concursos Militares",
        "nivel": "diagnostico",
        "eixoCognitivo": "identificacao",
        "comandoBanca": "assinale_a_correta",
        "enunciado": "Um sistema de análise preditiva de criminalidade, treinado com dados históricos de abordagens policiais que refletiam desproporcionalidade racial, corre o risco de: Assinale a alternativa correta.",
        "alternativas": [
          "Ser sempre neutro, pois é uma máquina, não uma pessoa",
          "Corrigir automaticamente qualquer desigualdade presente nos dados originais",
          "inteligência artificial",
          "reconhecimento facial",
          "Reproduzir e até amplificar o viés presente nos dados históricos usados no treinamento"
        ],
        "correta": 4,
        "gabaritoLetra": "E",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "E",
            "correta": true,
            "comentario": "Correta. Sistemas de IA aprendem os padrões presentes nos dados de treinamento — se esses dados refletem práticas discriminatórias históricas, o sistema tende a reproduzir e até amplificar esse viés em suas previsões e recomendações, não corrigi-lo automaticamente."
          }
        ],
        "comentario": "Sistemas de IA aprendem os padrões presentes nos dados de treinamento — se esses dados refletem práticas discriminatórias históricas, o sistema tende a reproduzir e até amplificar esse viés em suas previsões e recomendações, não corrigi-lo automaticamente.",
        "armadilhaDaBanca": "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "porqueCaiEmProva": "Reconhecer conceitos básicos de IA e aplicações práticas na segurança pública, incluindo o risco de viés algorítmico.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q02-cebraspe-regra",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "basico",
        "eixoCognitivo": "memorizacao_com_sentido",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso.",
        "correta": true,
        "gabarito": "Certo",
        "comentario": "Certo. O item reproduz o ponto central do capítulo. Frase de segurança: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
        "comentarioDetalhado": [
          "Ponto cobrado: IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso.",
          "A banca pode trocar sujeito, prazo, requisito, competência ou consequência.",
          "Resumo para revisão: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho."
        ],
        "armadilhaDaBanca": "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q03-cebraspe-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/CESPE",
        "nivel": "intermediario",
        "eixoCognitivo": "deteccao_de_armadilha",
        "comandoBanca": "julgue_o_item",
        "enunciado": "Julgue o item: sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "correta": false,
        "gabarito": "Errado",
        "comentario": "Errado. O item transforma uma armadilha em regra. Forma segura: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
        "comentarioDetalhado": [
          "Armadilha explorada: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
          "Desconfie de palavras absolutas e de frases que apagam requisito, exceção ou consequência.",
          "Releia: IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso."
        ],
        "armadilhaDaBanca": "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q04-caso-pratico-5alt",
        "tipo": "caso_pratico_multipla_escolha",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "eixoCognitivo": "aplicacao",
        "comandoBanca": "resolva_o_caso",
        "enunciado": "Em uma questão sobre Inteligência artificial e ferramentas digitais, o enunciado apresenta uma situação concreta e mistura conceitos parecidos. Qual estratégia leva à resposta correta?",
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
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "B",
            "correta": true,
            "comentario": "Correta. Em caso prático, resolva por regra + requisito + consequência. Núcleo: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "D",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          }
        ],
        "comentario": "Questão de aplicação: não basta decorar termo solto. A resposta exige conectar o caso ao núcleo do capítulo: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
        "armadilhaDaBanca": "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
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
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q05-armadilha-5alt",
        "tipo": "multipla_escolha",
        "bancaEstilo": "banca com pegadinha",
        "nivel": "intermediario",
        "eixoCognitivo": "analise_critica",
        "comandoBanca": "identifique_a_armadilha",
        "enunciado": "Qual alternativa representa uma armadilha comum ao estudar Inteligência artificial e ferramentas digitais?",
        "alternativas": [
          "IA realiza tarefas que exigiriam inteligência humana",
          "Aplicações em segurança pública",
          "IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo…",
          "sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
          "Reconhecer corretamente o termo-chave: inteligência artificial."
        ],
        "correta": 3,
        "gabaritoLetra": "D",
        "alternativasComentadas": [
          {
            "alternativa": "A",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "B",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "C",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "D",
            "correta": true,
            "comentario": "Correta. A armadilha é tratar como correto o seguinte erro: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          },
          {
            "alternativa": "E",
            "correta": false,
            "comentario": "Incorreta. Essa alternativa desvia da regra cobrada ou cai na armadilha: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'."
          }
        ],
        "comentario": "A banca costuma deixar a pegadinha parecida com a regra. Compare sempre com: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
        "armadilhaDaBanca": "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "diagnosticoIA": {
          "classificarErroEm": [
            "conceito",
            "pegadinha",
            "leitura_apressada",
            "memorizacao_fraca",
            "aplicacao_em_caso_concreto"
          ],
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q06-resposta-curta",
        "tipo": "resposta_curta",
        "bancaEstilo": "discursiva curta / revisão ativa",
        "nivel": "intermediario",
        "eixoCognitivo": "explicacao",
        "comandoBanca": "explique_objetivamente",
        "enunciado": "Explique Inteligência artificial e ferramentas digitais em até 5 linhas, usando linguagem simples e citando uma pegadinha de prova.",
        "respostaEsperada": "Regra central: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho. Pegadinha a evitar: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "criteriosCorrecao": [
          "explicou a regra sem inverter o sentido",
          "citou uma palavra-chave do capítulo",
          "apontou uma pegadinha concreta",
          "mostrou a consequência prática",
          "não misturou com outro assunto"
        ],
        "palavrasChaveEsperadas": [
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico",
          "IA aprende dos dados que recebe",
          "se os dados têm viés histórico"
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
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q07-comparacao",
        "tipo": "comparacao_conceitual",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "avancado",
        "eixoCognitivo": "diferenciacao",
        "comandoBanca": "diferencie",
        "enunciado": "Diferencie a regra correta da armadilha: explique \"Aplicações em segurança pública\" e mostre por que \"machine learning (aprender padrões dos dados) e programação tradicional (regras explícitas definidas por humanos). são conceitos equivalentes para fins de…\" pode levar ao erro.",
        "respostaEsperada": "A regra correta deve ser explicada a partir do capítulo: Aplicações em segurança pública: reconhecimento facial, análise preditiva de criminalidade, atendimento por chatbot.. A armadilha deve ser recusada porque distorce o conteúdo: Confundir machine learning (aprender padrões dos dados) com programação tradicional (regras explícitas definidas por humanos).",
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
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
          "seAcertarComDuvida": "pedir que o aluno justifique a alternativa correta em uma frase",
          "seAcertarComSeguranca": "liberar questão mais difícil ou revisão espaçada"
        }
      },
      {
        "versaoQuestao": "10.0",
        "fonteInterna": "Informática para PMMA > Capítulo 10: Inteligência artificial e ferramentas digitais",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "assunto": "Inteligência artificial",
        "tags": [
          "Informática",
          "Inteligência artificial",
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico"
        ],
        "criterioDominio": "Domínio real = acertar, justificar com as próprias palavras e reconhecer a armadilha sem olhar o comentário.",
        "tempoSugeridoSegundos": 90,
        "id": "inteligencia-artificial-ferramentas-digitais-q08-tutor-ia-adaptativa",
        "tipo": "tutor_ia_adaptativa",
        "bancaEstilo": "treino personalizado VemAprovar",
        "nivel": "adaptativo",
        "eixoCognitivo": "metacognicao",
        "comandoBanca": "treino_adaptativo",
        "enunciado": "Use a IA da plataforma para gerar uma questão inédita sobre Inteligência artificial e ferramentas digitais, com 5 alternativas, uma pegadinha e comentários de todas as alternativas.",
        "promptParaIA": "Crie uma questão inédita sobre Inteligência artificial e ferramentas digitais. Núcleo obrigatório: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.. Pegadinha obrigatória: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.. Faça 5 alternativas, apenas uma correta, com comentários individualizados. Se o aluno errar, explique como se ele tivesse 12 anos e gere uma questão de reforço.",
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
          "seErrar": "A IA deve explicar Inteligência artificial e ferramentas digitais em linguagem simples, mostrar a armadilha e gerar uma questão parecida com contexto diferente.",
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
      "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
      "Reconhecer como Inteligência artificial e ferramentas digitais aparece em questões de concurso.",
      "Evitar as pegadinhas mais comuns sobre Inteligência artificial."
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
        "frente": "Qual é a ideia central de Inteligência artificial e ferramentas digitais?",
        "verso": "IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
        "nivel": "essencial"
      },
      {
        "frente": "Palavra-chave: inteligência artificial",
        "verso": "inteligência artificial: IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso. Aplicações em segurança pública: reconhecimento facial, análise preditiva de criminalidade, atendimento por chatbot. Em prova, relacione o termo ao comando da banca e evite resposta decorada sem aplicação ao caso.",
        "nivel": "conceito",
        "corrigidoRevisaoQualidade": true
      },
      {
        "frente": "Pegadinha comum em Inteligência artificial e ferramentas digitais",
        "verso": "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "nivel": "banca"
      }
    ],
    "mapaMentalTexto": {
      "centro": "Inteligência artificial e ferramentas digitais",
      "ramos": [
        {
          "titulo": "Regra central",
          "itens": [
            "IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho."
          ]
        },
        {
          "titulo": "Palavras-chave",
          "itens": [
            "inteligência artificial",
            "reconhecimento facial",
            "viés algorítmico",
            "IA realiza tarefas que exigiriam inteligência humana"
          ]
        },
        {
          "titulo": "Como cai",
          "itens": [
            "Reconhecer conceitos básicos de IA e aplicações práticas na segurança pública, incluindo o risco de viés algorítmico.",
            "Questões que descrevem uma aplicação de IA na segurança pública e pedem para avaliar riscos ou benefícios, ou que testam conceitos gerais de IA."
          ]
        },
        {
          "titulo": "Pegadinhas",
          "itens": [
            "Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
            "Confundir machine learning (aprender padrões dos dados) com programação tradicional (regras explícitas definidas por humanos).",
            "Não reconhecer deepfake como aplicação problemática de IA generativa, relevante para crimes contra a honra e desinformação."
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
      "objetivo": "Ajudar o aluno a dominar o capítulo \"Inteligência artificial e ferramentas digitais\" sem decorar mecanicamente.",
      "comportamento": "Tutor socrático, direto, motivador e exigente: explica simples, pergunta, diagnostica erro e só depois entrega a resposta completa.",
      "promptSistema": "Você é o Tutor IA da VemAprovar. Ensine Inteligência artificial e ferramentas digitais para concursos. Comece com explicação simples, use exemplos, cobre o aluno com uma pergunta e corrija com base em banca. Não responda de forma genérica.",
      "quandoAlunoErrar": [
        "Identifique se o erro foi de conceito, leitura do enunciado, exceção, prazo, competência ou palavra absoluta.",
        "Explique o erro em até 4 linhas.",
        "Mostre a regra correta.",
        "Gere uma nova questão parecida, mas com uma pegadinha diferente."
      ],
      "perguntasDiagnostico": [
        "Qual palavra do enunciado mudaria completamente a resposta em Inteligência artificial e ferramentas digitais?",
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
      "Informática",
      "Inteligência artificial",
      "Inteligência artificial e ferramentas digitais",
      "inteligência artificial",
      "reconhecimento facial",
      "viés algorítmico",
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
        "id": "inteligencia-artificial-ferramentas-digitais-q1-premium",
        "tipo": "multipla_escolha",
        "bancaEstilo": "FGV/Cebraspe",
        "nivel": "fixacao_inteligente",
        "habilidade": "Reconhecer conceitos básicos de inteligência artificial e suas aplicações na segurança pública",
        "enunciado": "Com base no capítulo \"Inteligência artificial e ferramentas digitais\", assinale a alternativa correta. Um sistema de análise preditiva de criminalidade, treinado com dados históricos de abordagens policiais que refletiam desproporcionalidade racial, corre o risco de:",
        "alternativas": [
          "Ser sempre neutro, pois é uma máquina, não uma pessoa",
          "Reproduzir e até amplificar o viés presente nos dados históricos usados no treinamento",
          "Corrigir automaticamente qualquer desigualdade presente nos dados originais",
          "Apenas uma orientação sem efeito prático para a prova"
        ],
        "correta": 1,
        "comentario": "Sistemas de IA aprendem os padrões presentes nos dados de treinamento — se esses dados refletem práticas discriminatórias históricas, o sistema tende a reproduzir e até amplificar esse viés em suas previsões e recomendações, não corrigi-lo automaticamente.",
        "comentarioDetalhado": [
          "Sistemas de IA aprendem os padrões presentes nos dados de treinamento — se esses dados refletem práticas discriminatórias históricas, o sistema tende a reproduzir e até amplificar esse viés em suas previsões e recomendações, não corrigi-lo automaticamente.",
          "Estratégia: elimine alternativas absolutas, genéricas ou que troquem o conceito principal por outro parecido.",
          "Palavras-chave: inteligência artificial, reconhecimento facial, viés algorítmico, IA realiza tarefas que exigiriam inteligência humana."
        ]
      },
      {
        "id": "inteligencia-artificial-ferramentas-digitais-q2-cebraspe",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe",
        "nivel": "basico",
        "habilidade": "Reconhecer a regra central sem inverter o sentido.",
        "enunciado": "Julgue o item: IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso.",
        "correta": true,
        "comentario": "Certo. O item reproduz uma regra essencial do capítulo.",
        "comentarioDetalhado": [
          "Regra-base: IA realiza tarefas que exigiriam inteligência humana; machine learning aprende padrões a partir de dados, sem regras explícitas para cada caso.",
          "Na dúvida, volte aos pontos-chave e veja se o item alterou sujeito, prazo, competência ou consequência."
        ]
      },
      {
        "id": "inteligencia-artificial-ferramentas-digitais-q3-pegadinha",
        "tipo": "certo_errado",
        "bancaEstilo": "Cebraspe/pegadinha",
        "nivel": "intermediario",
        "habilidade": "Identificar inversão de conceito ou generalização indevida.",
        "enunciado": "Julgue o item: Sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
        "correta": false,
        "comentario": "Errado. Este item representa uma pegadinha comum ou uma generalização perigosa.",
        "comentarioDetalhado": [
          "Pegadinha que a banca explora: Achar que sistemas de IA são automaticamente neutros e livres de viés, por serem 'máquinas'.",
          "Forma correta de lembrar: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho."
        ]
      },
      {
        "id": "inteligencia-artificial-ferramentas-digitais-q4-caso-pratico",
        "tipo": "caso_pratico",
        "bancaEstilo": "FGV contextualizada",
        "nivel": "intermediario",
        "habilidade": "Aplicar a regra em uma situação concreta.",
        "enunciado": "Um candidato estudou \"Inteligência artificial e ferramentas digitais\" e precisa explicar a aplicação prática desse assunto em uma situação de prova. Em até 5 linhas, explique qual é a regra central e qual erro ele deve evitar.",
        "respostaEsperada": "IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
        "criteriosCorrecao": [
          "Mencionar a regra central do capítulo.",
          "Usar pelo menos uma palavra-chave do conteúdo.",
          "Apontar uma pegadinha ou erro comum.",
          "Responder de forma objetiva, sem fugir do tema."
        ],
        "palavrasChaveEsperadas": [
          "inteligência artificial",
          "reconhecimento facial",
          "viés algorítmico",
          "IA realiza tarefas que exigiriam inteligência humana",
          "Aplicações em segurança pública"
        ],
        "comentario": "Boa resposta combina regra + aplicação + cuidado de banca."
      },
      {
        "id": "inteligencia-artificial-ferramentas-digitais-q5-memorizacao",
        "tipo": "resposta_curta",
        "bancaEstilo": "revisao_ativa",
        "nivel": "revisao",
        "habilidade": "Memorizar o núcleo do capítulo com as próprias palavras.",
        "enunciado": "Explique \"Inteligência artificial e ferramentas digitais\" como se estivesse ensinando a um colega que nunca viu o assunto.",
        "respostaEsperada": "Imagine como entender o painel de um celular: cada botão tem uma função e a prova pergunta para que ele serve. Neste capítulo, \"Inteligência artificial e ferramentas digitais\", a ideia principal é: Inteligência artificial (IA) é a área da computação que desenvolve sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana: reconhecimento de padrões, tomada de decisão, processamento de linguagem natural. Para estudar sem travar, guarde primeiro estas palavras-chave: inteligência artificial, reconhecimento facial, viés algorítmico. Depois responda: o que a banca quer que eu reconheça? A frase de memória é: IA aprende dos dados que recebe — se os dados têm viés histórico, o sistema tende a reproduzir e amplificar esse viés, não corrigi-lo sozinho.",
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

export default informatica;
