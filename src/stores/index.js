import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockBiblioteca, mockDicasTAF, mockEditaisTAF, mockMapas, mockPlanoTAF } from "../data";
import { applySm2 } from "../utils";

const today = () => new Date().toISOString().slice(0, 10);
const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const makeAlt = (items, gabarito) =>
  items.map((texto, index) => {
    const id = String.fromCharCode(97 + index);
    return { id, letra: id.toUpperCase(), texto, correta: id === gabarito.toLowerCase() };
  });

export const questoesSeed = [
  ["q001", "Direito Constitucional", "De acordo com a CF/88, a Republica Federativa do Brasil constitui-se em Estado Democratico de Direito e tem como fundamento:", ["soberania", "censura previa", "voto indireto obrigatório", "unicidade sindical estatal", "intervencao permanente"], "a", "A soberania e fundamento expresso no art. 1o da CF/88."],
  ["q002", "Direito Constitucional", "Nos termos do art. 2o da CF/88, sao Poderes da Uniao, independentes e harmonicos entre si:", ["Legislativo, Executivo e Judiciario", "Ministerio Publico, Defensoria e Tribunais", "Uniao, Estados e Municipios", "Camara, Senado e TCU", "Policia, Receita e Forcas Armadas"], "a", "O art. 2o lista Legislativo, Executivo e Judiciario."],
  ["q003", "Direito Constitucional", "Constitui objetivo fundamental da Republica Federativa do Brasil:", ["erradicar a pobreza e a marginalizacao", "restringir direitos sociais", "abolir a separacao dos Poderes", "subordinar municipios aos estados", "impedir cooperacao internacional"], "a", "O art. 3o inclui erradicar pobreza e marginalizacao."],
  ["q004", "Direito Constitucional", "Nas relacoes internacionais, o Brasil rege-se pelo principio da:", ["prevalencia dos direitos humanos", "guerra de conquista", "colonizacao economica", "censura diplomatica", "dependencia nacional"], "a", "A prevalencia dos direitos humanos esta no art. 4o da CF/88."],
  ["q005", "Direito Constitucional", "Segundo o art. 5o da CF/88, todos sao iguais perante a lei, garantindo-se aos brasileiros e estrangeiros residentes no Pais a inviolabilidade do direito:", ["a vida, liberdade, igualdade, seguranca e propriedade", "apenas a propriedade privada", "somente a liberdade economica", "exclusivamente ao voto", "apenas ao trabalho"], "a", "O caput do art. 5o traz esses direitos."],
  ["q006", "Direito Constitucional", "O art. 6o da CF/88 classifica como direito social:", ["educacao", "extradicao", "estado de sitio", "foro privilegiado", "intervencao federal"], "a", "Educacao e direito social expresso no art. 6o."],
  ["q007", "Direito Constitucional", "E direito dos trabalhadores urbanos e rurais previsto no art. 7o:", ["decimo terceiro salario", "prisao administrativa", "censura sindical", "voto censitario", "confisco sem processo"], "a", "O 13o salario esta no art. 7o, VIII."],
  ["q008", "Direito Constitucional", "A administracao publica direta e indireta obedecera, entre outros, ao principio da:", ["legalidade", "hereditariedade", "sigilo absoluto", "pessoalidade", "irrecorribilidade"], "a", "O art. 37 caput traz legalidade, impessoalidade, moralidade, publicidade e eficiencia."],
  ["q009", "Portugues", "Assinale a alternativa em que ha concordancia verbal adequada.", ["Faz dois anos que estudo.", "Fazem dois anos que estudo.", "Houveram muitas duvidas.", "Existe muitas regras.", "Chegou os alunos."], "a", "O verbo fazer indicando tempo decorrido e impessoal."],
  ["q010", "Portugues", "Em 'Os candidatos estudaram muito; portanto, foram aprovados', o conectivo indica:", ["conclusao", "oposicao", "causa", "alternancia", "explicacao"], "a", "Portanto introduz conclusao."],
  ["q011", "Portugues", "A crase esta corretamente empregada em:", ["Entreguei o recurso a banca.", "Fui a Sao Paulo.", "Refiro-me a prova de ontem.", "Cheguei a uma conclusao.", "Obedeci a edital."], "c", "Refiro-me a prova admite a preposicao a mais artigo a."],
  ["q012", "Portugues", "A palavra 'rapidamente' exerce funcao de:", ["adverbio", "substantivo", "adjetivo", "preposicao", "conjuncao"], "a", "Termos terminados em -mente geralmente modificam verbo, adjetivo ou adverbio."],
  ["q013", "Portugues", "Em texto dissertativo, a tese corresponde:", ["ao ponto de vista defendido", "a citacao obrigatoria", "ao titulo", "a conclusao estatistica", "ao rodape"], "a", "Tese e a ideia central defendida."],
  ["q014", "Portugues", "A forma correta e:", ["para eu estudar", "para mim estudar", "entre eu e voce", "haviam provas", "menas questoes"], "a", "Eu e sujeito do verbo estudar."],
  ["q015", "Informatica", "No Microsoft Excel, a formula =SOMA(A1:A5) serve para:", ["somar os valores do intervalo", "contar apenas textos", "proteger a planilha", "abrir hyperlink", "formatar data"], "a", "SOMA agrega valores numericos do intervalo."],
  ["q016", "Informatica", "Phishing e uma tecnica usada para:", ["obter dados por fraude", "compactar arquivos", "formatar disco", "criar planilhas", "corrigir acentos"], "a", "Phishing tenta enganar a vitima para roubar credenciais/dados."],
  ["q017", "Informatica", "No Word, o recurso de controle de alteracoes permite:", ["registrar edicoes feitas no documento", "criptografar o roteador", "executar macro automaticamente", "limpar historico do navegador", "trocar hardware"], "a", "Controle de alteracoes marca insercoes, exclusoes e comentarios."],
  ["q018", "Informatica", "HTTPS indica, em regra:", ["comunicacao HTTP protegida por TLS", "site sem criptografia", "arquivo local", "rede offline", "protocolo de impressora"], "a", "HTTPS usa TLS para proteger a comunicacao."],
  ["q019", "Informatica", "Backup incremental copia:", ["arquivos alterados desde o ultimo backup", "todos os arquivos sempre", "somente arquivos apagados", "apenas sistema operacional", "somente emails lidos"], "a", "O incremental considera mudancas desde o ultimo backup."],
  ["q020", "Informatica", "Malware e:", ["software malicioso", "monitor de video", "tipo de planilha", "atalho do teclado", "navegador seguro"], "a", "Malware e categoria de software com finalidade maliciosa."],
  ["q021", "Raciocinio Logico", "Se todo servidor e aprovado e Ana e servidora, conclui-se logicamente que:", ["Ana e aprovada", "Ana nao e aprovada", "nenhum servidor e aprovado", "aprovados nao estudam", "Ana e banca"], "a", "Aplicacao direta de silogismo categorico."],
  ["q022", "Raciocinio Logico", "A negacao de 'todos estudam' e:", ["algum nao estuda", "todos nao estudam", "ninguem existe", "algum estuda", "estudar e impossivel"], "a", "Negar universal afirmativa gera existencia de contraexemplo."],
  ["q023", "Raciocinio Logico", "Na sequencia 2, 4, 8, 16, o proximo termo e:", ["32", "20", "24", "30", "64"], "a", "A sequencia dobra a cada passo."],
  ["q024", "Raciocinio Logico", "Se p -> q e p e verdadeiro, entao:", ["q e verdadeiro", "q e falso", "p e falso", "a proposicao e sempre falsa", "nada se conclui"], "a", "Modus ponens."],
  ["q025", "Raciocinio Logico", "A proposicao 'p e q' e verdadeira quando:", ["p e q sao verdadeiras", "p e falsa", "q e falsa", "ambas sao falsas", "p ou q e falsa"], "a", "Conjuncao exige ambas verdadeiras."],
  ["q026", "Administrativo", "Entre os principios expressos da administracao publica esta:", ["impessoalidade", "arbitrariedade", "sigilo como regra", "hereditariedade", "parcialidade"], "a", "Impessoalidade esta no art. 37 da CF/88."],
  ["q027", "Administrativo", "A licitacao busca, em regra:", ["selecionar proposta vantajosa e assegurar isonomia", "escolher sempre o fornecedor conhecido", "dispensar publicidade", "eliminar competicao", "substituir contrato"], "a", "A licitacao protege isonomia e vantajosidade."],
  ["q028", "Administrativo", "Poder hierarquico relaciona-se com:", ["ordenacao e controle interno da administracao", "punicao penal de particulares", "edicao de leis pelo Judiciario", "controle externo exclusivo", "competencia eleitoral"], "a", "Hierarquia envolve distribuicao, coordenacao e revisao interna."],
  ["q029", "Administrativo", "Nos termos da Lei 8.112/90, cargo publico e:", ["conjunto de atribuicoes e responsabilidades previstas na estrutura organizacional", "qualquer emprego privado", "funcao sem criacao legal", "contrato verbal", "beneficio previdenciario"], "a", "Definicao alinhada ao art. 3o da Lei 8.112."],
  ["q030", "Administrativo", "A anulacao do ato administrativo ocorre quando ha:", ["ilegalidade", "mera inconveniencia", "perda de oportunidade apenas", "ato perfeito obrigatorio", "conveniencia politica exclusiva"], "a", "Ilegalidade leva a anulacao; conveniencia e oportunidade levam a revogacao."],
].map(([id, materia, enunciado, alternativas, gabarito, comentario], index) => ({
  id,
  enunciado,
  tipo: "multipla_escolha",
  alternativas: makeAlt(alternativas, gabarito),
  gabarito,
  comentario,
  banca: ["CEBRASPE", "FCC", "FGV", "VUNESP", "IBFC"][index % 5],
  orgao: ["TRF", "INSS", "TJ-SP", "PRF", "Receita Federal"][index % 5],
  cargo: ["Analista", "Tecnico", "Auditor", "Escrevente"][index % 4],
  materia,
  assunto: materia,
  ano: 2021 + (index % 5),
  dificuldade: ["facil", "media", "dificil"][index % 3],
  tags: ["lei seca", "conceito", "prova"],
  estatisticas: { tentativas: 800 + index * 17, acertos: 55 + (index % 30) },
}));

export const flashcardsSeed = ["Constitucional", "Portugues", "Informatica", "Raciocinio"].map((materia, deckIndex) => ({
  id: `deck-${deckIndex + 1}`,
  materia,
  titulo: `Deck ${materia}`,
  retencao: 65 + deckIndex * 7,
  cards: Array.from({ length: 10 }, (_, index) => ({
    id: `card-${deckIndex + 1}-${index + 1}`,
    frente: `${materia}: ponto-chave ${index + 1}`,
    verso: [
      "Fundamentos da Republica: soberania, cidadania, dignidade, valores sociais e pluralismo.",
      "Direitos sociais incluem educacao, saude, trabalho, moradia, transporte, lazer e seguranca.",
      "HTTPS usa TLS para proteger dados em transito.",
      "A negacao de todo A e B e existe A que nao e B.",
    ][deckIndex],
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    dueAt: today(),
  })),
}));

export const leisSeed = [
  {
    id: "cf88",
    nome: "Constituicao Federal de 1988",
    categoria: "Constitucional",
    capitulos: [{ nome: "Arts. 1 a 10", artigos: Array.from({ length: 10 }, (_, i) => ({ id: `cf-${i + 1}`, numero: i + 1, texto: `Art. ${i + 1}. Texto de estudo da Constituicao Federal sobre principios, direitos fundamentais, nacionalidade, direitos politicos e garantias constitucionais, mantido para leitura, grifo e anotacao local.` })) }],
  },
  {
    id: "cp",
    nome: "Codigo Penal",
    categoria: "Penal",
    capitulos: [{ nome: "Arts. 1 a 12", artigos: Array.from({ length: 12 }, (_, i) => ({ id: `cp-${i + 1}`, numero: i + 1, texto: `Art. ${i + 1}. Texto de estudo do Codigo Penal sobre aplicacao da lei penal, anterioridade, territorialidade, tempo e lugar do crime.` })) }],
  },
  {
    id: "cdc",
    nome: "Codigo de Defesa do Consumidor",
    categoria: "Consumidor",
    capitulos: [{ nome: "Arts. 1 a 7", artigos: Array.from({ length: 7 }, (_, i) => ({ id: `cdc-${i + 1}`, numero: i + 1, texto: `Art. ${i + 1}. Texto de estudo do CDC sobre protecao do consumidor, politica nacional, direitos basicos e reparacao de danos.` })) }],
  },
  {
    id: "lei8112",
    nome: "Lei 8.112/1990",
    categoria: "Administrativo",
    capitulos: [{ nome: "Arts. 1 a 5", artigos: Array.from({ length: 5 }, (_, i) => ({ id: `l8112-${i + 1}`, numero: i + 1, texto: `Art. ${i + 1}. Texto de estudo da Lei 8.112 sobre regime juridico dos servidores publicos civis da Uniao, cargo, requisitos e provimento.` })) }],
  },
];

const adaptPlano = (semana) =>
  Object.entries(semana).map(([dia, tarefas]) => ({
    dia: dia[0].toUpperCase() + dia.slice(1),
    blocos: tarefas.map((tarefa) => ({ hora: tarefa.hora, materia: tarefa.materia, duracao: tarefa.duracao, id: tarefa.id })),
    tarefas: tarefas.map((tarefa) => ({ id: tarefa.id, titulo: tarefa.titulo, minutos: tarefa.duracao, done: tarefa.done })),
  }));

export const useUserStore = create(
  persist(
    (set) => ({
      user: { id: "u1", name: "Lucas Silva", email: "lucas@aprova.local", role: "admin", targetContest: "PRF", nivel: "intermediario", horasSemanais: 18, dataProva: "2026-10-23", onboardingComplete: false },
      stats: { horasEstudadas: 0, questoesResolvidas: 0, taxaAcertos: 0, sequenciaDias: 0, tafNota: 0 },
      updateStats: (partial) => set((state) => ({ stats: { ...state.stats, ...partial } })),
      updateUser: (partial) => set((state) => ({ user: { ...state.user, ...partial } })),
    }),
    { name: "aprova-user" }
  )
);

export const useRankingStore = create(
  persist(
    (set) => ({
      ranking: [],
      pontos: 0,
      adicionarPontos: (qtd) =>
        set((state) => {
          const pontos = state.pontos + qtd;
          const ranking = state.ranking.map((item) => (item.nome === "Lucas Silva" ? { ...item, pontos } : item)).sort((a, b) => b.pontos - a.pontos).map((item, index) => ({ ...item, posicao: index + 1 }));
          return { pontos, ranking };
        }),
    }),
    {
      name: "aprova-ranking",
      version: 2,
      migrate: (persisted) => {
        const fakeNames = new Set(["Lucas Silva", "Ana Paula", "Rafael Costa", "Bianca Nunes", "Carlos Lima", "Marina Alves", "Joao Pedro", "Fernanda Reis", "Bruno Rocha", "Julia Mendes"]);
        const ranking = (persisted?.ranking || []).filter((item) => !fakeNames.has(item.nome));
        return { ...persisted, ranking, pontos: ranking.length ? persisted?.pontos || 0 : 0 };
      },
    }
  )
);

function toLocalDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function refreshQuestionStats(tentativas = []) {
  const resolvidas = tentativas.length;
  const acertos = tentativas.filter((item) => item.acertou).length;
  useUserStore.getState().updateStats({
    questoesResolvidas: resolvidas,
    taxaAcertos: resolvidas ? Math.round((acertos / resolvidas) * 100) : 0,
    sequenciaDias: new Set(tentativas.map((item) => item.data ? toLocalDate(item.data) : null).filter(Boolean)).size,
  });
}

export const useQuestoesStore = create(
  persist(
    (set, get) => ({
      questoes: questoesSeed,
      tentativas: [],
      salvas: [],
      caderno: [],
      errosSuperados: [],
      cacheQuestao: (questao) => {
        if (!questao?.id) return null;
        set((state) => state.questoes.some((item) => item.id === questao.id) ? state : { questoes: [questao, ...state.questoes] });
        return questao;
      },
      responder: (questaoId, resposta, tempo = 0, questaoSnapshot = null) => {
        const questao = questaoSnapshot || get().questoes.find((item) => item.id === questaoId);
        const gabarito = String(questao?.gabarito || "").toLowerCase();
        const acertou = gabarito === "anulada" || gabarito === String(resposta).toLowerCase();
        const tentativa = {
          questaoId,
          resposta,
          acertou,
          tempo,
          data: new Date().toISOString(),
          materia: questao?.materiaLabel || questao?.materia || "Nao informada",
          materiaOriginal: questao?.materia,
          banca: questao?.banca,
          concurso: questao?.concursoLabel || questao?.concurso || questao?.orgao,
        };
        set((state) => ({
          questoes: questao?.id && !state.questoes.some((item) => item.id === questao.id) ? [questao, ...state.questoes] : state.questoes,
          tentativas: [tentativa, ...state.tentativas],
          caderno: acertou || state.caderno.includes(questaoId) ? state.caderno : [questaoId, ...state.caderno],
          errosSuperados: acertou ? state.errosSuperados : state.errosSuperados.filter((id) => id !== questaoId),
        }));
        refreshQuestionStats(get().tentativas);
        useRankingStore.getState().adicionarPontos(acertou ? 10 : 2);
        useRevisaoStore.getState().registrarQuestao(questao);
        return { correta: acertou, gabarito: questao?.gabarito };
      },
      salvar: (questaoId) => {
        const saved = !get().salvas.includes(questaoId);
        set((state) => ({ salvas: saved ? [questaoId, ...state.salvas] : state.salvas.filter((id) => id !== questaoId) }));
        return { saved };
      },
      addCaderno: (questaoId) => {
        const added = !get().caderno.includes(questaoId);
        set((state) => ({
          caderno: state.caderno.includes(questaoId) ? state.caderno : [questaoId, ...state.caderno],
          errosSuperados: state.errosSuperados.filter((id) => id !== questaoId),
        }));
        return { added };
      },
      removerCaderno: (questaoId) => {
        const removed = get().caderno.includes(questaoId);
        set((state) => ({
          caderno: state.caderno.filter((id) => id !== questaoId),
          errosSuperados: state.errosSuperados.includes(questaoId) ? state.errosSuperados : [questaoId, ...state.errosSuperados],
        }));
        refreshQuestionStats(get().tentativas);
        return { removed };
      },
    }),
    { name: "aprova-questoes" }
  )
);

export const useSimuladosStore = create(
  persist(
    (set, get) => ({
      simulados: [],
      ativo: null,
      registrarResultado: (resultado) => set((state) => ({
        simulados: [{ id: resultado.id || uid("sim-res"), data: resultado.data || today(), ...resultado }, ...state.simulados],
      })),
      criar: (config = {}) => {
        const questoes = useQuestoesStore.getState().questoes.slice(0, Number(config.quantidade || 12));
        const ativo = { id: uid("sim"), nome: config.nome || "Simulado personalizado", questoes, respostas: {}, tempoMinutos: Number(config.tempoMinutos || 180), tipo: config.tipo || "personalizado", startedAt: Date.now() };
        set({ ativo });
        return ativo;
      },
      responder: (questaoId, resposta) => set((state) => ({ ativo: { ...state.ativo, respostas: { ...(state.ativo?.respostas || {}), [questaoId]: resposta } } })),
      finalizar: () => {
        const ativo = get().ativo;
        if (!ativo) return null;
        const correct = ativo.questoes.filter((q) => String(ativo.respostas[q.id]).toLowerCase() === q.gabarito).length;
        const resultado = { ...ativo, data: today(), correct, total: ativo.questoes.length, percent: Math.round((correct / ativo.questoes.length) * 100) };
        set((state) => ({ simulados: [resultado, ...state.simulados], ativo: null }));
        useRankingStore.getState().adicionarPontos(resultado.percent);
        return resultado;
      },
    }),
    { name: "aprova-simulados" }
  )
);

export const useFlashcardsStore = create(
  persist(
    (set) => ({
      decks: flashcardsSeed,
      sessoes: [],
      avaliar: (cardId, qualidade) => {
        let updated;
        set((state) => ({
          decks: state.decks.map((deck) => ({ ...deck, cards: deck.cards.map((card) => {
            if (card.id !== cardId) return card;
            updated = applySm2(card, qualidade);
            return updated;
          }) })),
          sessoes: [{ id: uid("sessao"), cardId, qualidade, data: new Date().toISOString() }, ...state.sessoes],
        }));
        return updated;
      },
      criarDeck: (titulo, materia) => set((state) => ({ decks: [{ id: uid("deck"), titulo, materia, retencao: 0, cards: [] }, ...state.decks] })),
      criarCard: (deckId, frente, verso) => set((state) => ({ decks: state.decks.map((deck) => deck.id === deckId ? { ...deck, cards: [...deck.cards, { id: uid("card"), frente, verso, easeFactor: 2.5, interval: 1, repetitions: 0, dueAt: today() }] } : deck) })),
      gerarDeckIA: (prompt) => {
        const deck = { id: uid("deck-ia"), titulo: `Deck IA: ${prompt || "Novo tema"}`, materia: prompt || "Geral", retencao: 50, cards: flashcardsSeed[0].cards.map((card, index) => ({ ...card, id: uid(`ia-card-${index}`) })) };
        set((state) => ({ decks: [deck, ...state.decks] }));
        return deck;
      },
    }),
    { name: "aprova-flashcards" }
  )
);

export const usePlanoStore = create(
  persist(
    (set, get) => ({
      semana: {},
      atividades: [],
      tarefasHoje: [],
      progressoPorDisciplina: {},
      getPlano: () => adaptPlano(get().semana),
      getAtividades: () => get().atividades,
      setAtividades: (atividades) => set({ atividades }),
      criarAtividade: (atividade) => {
        const next = {
          id: atividade.id || uid("plano"),
          title: atividade.title || `${atividade.type || atividade.tipo || "Estudo"} - ${atividade.materia || "Geral"}`,
          materia: atividade.materia || "Geral",
          type: atividade.type || atividade.tipo || "Estudo",
          date: atividade.date || atividade.data || today(),
          hour: atividade.hour || atividade.hora || "08:00",
          duration: Number(atividade.duration || atividade.duracao || 60),
          status: atividade.status || "Pendente",
          concurso: atividade.concurso || "Geral",
          generated: Boolean(atividade.generated),
          createdAt: atividade.createdAt || atividade.criado_em || new Date().toISOString(),
        };
        set((state) => ({ atividades: [next, ...state.atividades.filter((item) => item.id !== next.id)] }));
        return next;
      },
      atualizarAtividade: (id, patch) => set((state) => ({
        atividades: state.atividades.map((item) => item.id === id ? {
          ...item,
          ...patch,
          type: patch.type || patch.tipo || item.type,
          date: patch.date || patch.data || item.date,
          hour: patch.hour || patch.hora || item.hour,
          duration: patch.duration || patch.duracao || item.duration,
        } : item),
      })),
      removerAtividade: (id) => set((state) => ({ atividades: state.atividades.filter((item) => item.id !== id) })),
      alternarAtividade: (id) => set((state) => ({
        atividades: state.atividades.map((item) => item.id === id ? { ...item, status: item.status === "Concluida" ? "Pendente" : "Concluida" } : item),
      })),
      concluir: (tarefaId) => set((state) => ({ semana: Object.fromEntries(Object.entries(state.semana).map(([dia, tarefas]) => [dia, tarefas.map((tarefa) => tarefa.id === tarefaId ? { ...tarefa, done: !tarefa.done } : tarefa)])) })),
      reagendar: (tarefaId, novoDia) => set((state) => {
        let moved;
        const semana = Object.fromEntries(Object.entries(state.semana).map(([dia, tarefas]) => [dia, tarefas.filter((tarefa) => {
          if (tarefa.id === tarefaId) {
            moved = tarefa;
            return false;
          }
          return true;
        })]));
        if (moved && semana[novoDia]) semana[novoDia] = [...semana[novoDia], moved];
        return { semana };
      }),
    }),
    {
      name: "aprova-plano",
      version: 3,
      migrate: (persisted) => ({
        ...persisted,
        semana: {},
        atividades: persisted?.atividades || [],
        progressoPorDisciplina: {},
      }),
    }
  )
);

export const useRevisaoStore = create(
  persist(
    (set, get) => ({
      revisoes: [],
      get pendentesHoje() {
        return get().revisoes.filter((item) => item.proximaRevisao <= today());
      },
      registrarQuestao: (questao) => {
        if (!questao) return;
        set((state) => state.revisoes.some((item) => item.assuntoId === questao.materia) ? state : { revisoes: [{ assuntoId: questao.materia, assunto: questao.assunto, frente: questao.assunto, materia: questao.materia, proximaRevisao: today(), intervalo: 1, nivel: 0, urgencia: "hoje", easeFactor: 2.5, repetitions: 0 }, ...state.revisoes] });
      },
      concluir: (assuntoId, qualidade = 4) => set((state) => ({ revisoes: state.revisoes.map((item) => {
        if (item.assuntoId !== assuntoId) return item;
        const next = applySm2({ ...item, interval: item.intervalo || 1, repetitions: item.repetitions || 0, easeFactor: item.easeFactor || 2.5 }, qualidade);
        return { ...item, intervalo: next.interval, proximaRevisao: next.dueAt, nivel: qualidade, easeFactor: next.easeFactor, repetitions: next.repetitions, urgencia: "agendada" };
      }) })),
      adiar: (assuntoId) => set((state) => ({ revisoes: state.revisoes.map((item) => item.assuntoId === assuntoId ? { ...item, proximaRevisao: new Date(Date.now() + 86400000).toISOString().slice(0, 10), urgencia: "amanha" } : item) })),
    }),
    {
      name: "aprova-revisao",
      version: 2,
      migrate: (persisted) => ({
        ...persisted,
        revisoes: (persisted?.revisoes || []).filter((item) => !/^rev-\d+$/.test(String(item.assuntoId || ""))),
      }),
    }
  )
);

export const useTafStore = create(
  persist(
    (set, get) => ({
      historico: [],
      treinos: [],
      metas: { corrida: 2400, flexao: 30, abdominal: 40, barra: 8 },
      atual: { corrida: 0, flexao: 0, abdominal: 0, barra: 0 },
      exerciciosHoje: [],
      editais: mockEditaisTAF,
      plano: mockPlanoTAF,
      dicas: mockDicasTAF,
      registrarTreino: (tipo, valor) => set((state) => ({ treinos: [{ id: uid("treino"), tipo, valor: Number(valor), data: new Date().toISOString() }, ...state.treinos], atual: { ...state.atual, [tipo]: Number(valor) } })),
      registrarTeste: (resultados) => {
        const metas = get().metas;
        const nota = Math.round((Object.entries(metas).reduce((sum, [tipo, meta]) => sum + Math.min(10, (Number(resultados[tipo] || 0) / meta) * 10), 0) / Object.keys(metas).length) * 10) / 10;
        const teste = { id: uid("taf"), data: today(), concurso: "Local", ...resultados, nota, situacao: nota >= 7 ? "Aprovado" : "Reprovado" };
        set((state) => ({ historico: [...state.historico, teste] }));
        useUserStore.getState().updateStats({ tafNota: nota });
        return nota;
      },
      setExerciciosHoje: (exerciciosHoje) => set({ exerciciosHoje }),
    }),
    {
      name: "aprova-taf",
      version: 2,
      migrate: (persisted) => {
        const historico = (persisted?.historico || []).filter((item) => !["t1", "t2"].includes(item.id));
        const hasRealHistory = historico.length > 0;
        return {
          ...persisted,
          historico,
          atual: hasRealHistory ? persisted.atual : { corrida: 0, flexao: 0, abdominal: 0, barra: 0 },
        };
      },
    }
  )
);

export const useRedacaoStore = create(
  persist(
    (set) => ({
      redacoes: [],
      temas: ["Seguranca publica e cidadania", "Tecnologia no servico publico", "Educacao e desigualdade social"],
      salvar: (tema, texto) => set((state) => ({ redacoes: [{ id: uid("redacao"), tema, texto, data: new Date().toISOString(), nota: null }, ...state.redacoes] })),
      avaliar: (redacaoId) => {
        const nota = 720 + Math.floor(Math.random() * 180);
        set((state) => ({ redacoes: state.redacoes.map((item) => item.id === redacaoId ? { ...item, nota, feedback: "Boa estrutura, repertorio pertinente e conclusao com proposta clara." } : item) }));
        return nota;
      },
    }),
    { name: "aprova-redacao" }
  )
);

export const useLeisStore = create(
  persist(
    (set, get) => ({
      leis: leisSeed,
      grifos: {},
      favoritos: [],
      notas: {},
      leitura: {},
      grifarArtigo: (artigoId, cor = "yellow", trecho = "") => set((state) => {
        if (!trecho) return { grifos: { ...state.grifos, [artigoId]: cor } };
        const current = Array.isArray(state.grifos[artigoId]) ? state.grifos[artigoId] : [];
        const exists = current.some((item) => item.trecho === trecho && item.cor === cor);
        return {
          grifos: {
            ...state.grifos,
            [artigoId]: exists ? current : [{ id: uid("grifo"), trecho, cor, data: new Date().toISOString() }, ...current],
          },
        };
      }),
      removerGrifo: (artigoId, grifoId) => set((state) => ({
        grifos: {
          ...state.grifos,
          [artigoId]: Array.isArray(state.grifos[artigoId]) ? state.grifos[artigoId].filter((item) => item.id !== grifoId) : [],
        },
      })),
      toggleFavorito: (artigoId) => set((state) => ({ favoritos: state.favoritos.includes(artigoId) ? state.favoritos.filter((id) => id !== artigoId) : [artigoId, ...state.favoritos] })),
      salvarNota: (artigoId, nota) => set((state) => ({ notas: { ...state.notas, [artigoId]: nota } })),
      marcarLido: (artigoId, value = null) => set((state) => ({ leitura: { ...state.leitura, [artigoId]: value ?? !state.leitura[artigoId] } })),
      isLido: (artigoId) => Boolean(get().leitura[artigoId]),
    }),
    {
      name: "aprova-leis",
      version: 2,
      migrate: (persisted) => ({
        ...persisted,
        leitura: persisted?.leitura || {},
      }),
    }
  )
);

export const useNotificacoesStore = create(
  persist(
    (set, get) => ({
      notificacoes: [],
      get naoLidas() {
        return get().notificacoes.filter((item) => !item.read).length;
      },
      marcarLida: (id) => set((state) => ({ notificacoes: state.notificacoes.map((item) => item.id === id ? { ...item, read: true } : item) })),
      adicionar: (notif) => set((state) => ({ notificacoes: [{ id: uid("notif"), read: false, type: "info", ...notif }, ...state.notificacoes] })),
      limpar: () => set({ notificacoes: [] }),
    }),
    {
      name: "aprova-notificacoes",
      version: 2,
      migrate: (persisted) => ({
        ...persisted,
        notificacoes: (persisted?.notificacoes || []).filter((item) => item.id !== "n1" && item.title !== "Revisao pendente"),
      }),
    }
  )
);

export const useMiscStore = create(
  persist(
    () => ({ mapas: mockMapas, biblioteca: mockBiblioteca }),
    { name: "aprova-misc" }
  )
);

export const useMapasStore = create(
  persist(
    (set) => ({
      localMaps: [],
      overrides: {},
      deleted: [],
      activeId: null,
      addMap: (map) => set((state) => ({ localMaps: [map, ...state.localMaps] })),
      setOverride: (id, patch) => set((state) => ({ overrides: { ...state.overrides, [id]: { ...(state.overrides[id] || {}), ...patch } } })),
      removeMap: (id) => set((state) => ({ deleted: [...state.deleted, id] })),
      setActiveId: (activeId) => set({ activeId }),
    }),
    { name: "aprova-mapas" }
  )
);
