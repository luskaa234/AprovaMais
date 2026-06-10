import { GoogleGenerativeAI } from "@google/generative-ai";
import { TUTOR_SYSTEM_PROMPT, montarContextoAluno } from "../ai/tutorPrompt";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({
  model: modelName,
  systemInstruction: TUTOR_SYSTEM_PROMPT,
});

function fallback(mensagem) {
  return `Configure VITE_GEMINI_API_KEY no .env para ativar o tutor. Pergunta recebida: "${mensagem}"`;
}

function isQuotaError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  return message.includes("429") || message.includes("quota") || message.includes("rate-limit") || message.includes("rate limit");
}

function localTutorResponse(mensagem = "", perfil = {}, desempenho = {}) {
  const text = mensagem.toLowerCase().trim();
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("aprova-user") || "{}")?.state?.user || {};
    } catch {
      return {};
    }
  })();
  const mergedPerfil = { ...perfil, ...storedUser };
  const firstName = mergedPerfil?.name?.split(" ")?.[0] || "por aqui";
  const plan = mergedPerfil?.diagnosticPlan;
  const weakSubjects = plan?.weakSubjects || desempenho?.materiasFracas || perfil?.difficultSubjects || [];
  const prioritySubjects = plan?.prioritySubjects || weakSubjects;
  const objective = plan?.objectiveLabel || mergedPerfil?.targetContest || mergedPerfil?.objective || "seu objetivo";

  if (/^(oi|ola|olá|opa|e ai|e aí|bom dia|boa tarde|boa noite)\b/.test(text)) {
    return `Oi, ${firstName}. Tudo certo. Posso te ajudar a montar o estudo de hoje, revisar uma materia dificil ou organizar questoes para ${objective}.`;
  }

  if (text.includes("tudo bem") || text.includes("como voce") || text.includes("como você")) {
    return `Tudo bem, ${firstName}. Estou pronto para te ajudar no estudo. Quer que eu monte um bloco rapido para hoje ou revise suas prioridades?`;
  }

  if (text.includes("plano") || text.includes("cronograma") || text.includes("estudar")) {
    const subjects = prioritySubjects.slice(0, 3).join(", ") || "sua materia mais importante";
    return [
      `Para ${objective}, eu faria assim hoje:`,
      "",
      `1. Teoria curta: 30 a 40 min em ${subjects}.`,
      "2. Questoes: 20 a 30 questoes do mesmo tema.",
      "3. Revisao: anote erros e volte neles amanha.",
      "",
      plan?.weeklyGoals?.length ? `Meta da semana: ${plan.weeklyGoals[0]}.` : "Mantenha uma meta pequena, mas diaria.",
    ].join("\n");
  }

  if (text.includes("materia") || text.includes("dificuldade") || text.includes("fraca") || text.includes("fraco")) {
    const subjects = weakSubjects.slice(0, 5);
    if (!subjects.length) return "Ainda nao tenho materias fracas registradas. Marque suas dificuldades no onboarding ou resolva algumas questoes para eu priorizar melhor.";
    return `Suas prioridades agora parecem ser: ${subjects.join(", ")}. Comece pela primeira, faca teoria curta e depois questoes comentadas.`;
  }

  if (text.includes("questao") || text.includes("questões") || text.includes("questoes")) {
    return "Para treinar questoes: escolha uma materia, resolva um bloco pequeno sem consulta, corrija na hora e salve os erros no caderno. O ganho vem da correcao ativa, nao so da quantidade.";
  }

  if (text.includes("simulado")) {
    return "Sugestao: faca um simulado curto primeiro, com tempo marcado. Depois separe os erros por materia e transforme os 3 temas mais errados em revisao da semana.";
  }

  return `Entendi. No modo local, posso te ajudar melhor se voce pedir algo como: "montar meu plano de hoje", "quais materias priorizar" ou "como revisar meus erros".`;
}

function friendlyAIError(error, mensagem = "") {
  if (isQuotaError(error)) {
    return localTutorResponse(mensagem);
  }

  return "Nao foi possivel consultar a IA agora. Tente novamente em instantes.";
}

function normalizeChatHistory(historico = []) {
  const normalized = historico
    .map((item) => ({
      role: item.role === "user" ? "user" : "model",
      text: String(item.content || item.text || "").trim(),
    }))
    .filter((item) => item.text);

  while (normalized[0]?.role === "model") normalized.shift();

  return normalized.reduce((items, item) => {
    const previous = items.at(-1);
    if (previous?.role === item.role) {
      previous.parts[0].text = `${previous.parts[0].text}\n\n${item.text}`;
      return items;
    }
    return [...items, { role: item.role, parts: [{ text: item.text }] }];
  }, []);
}

export const aiService = {
  async gerarTexto(prompt) {
    if (!model) return fallback(prompt);
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      return friendlyAIError(error, prompt);
    }
  },

  async enviarMensagem(mensagem, historico = [], perfil = {}, desempenho = {}) {
    if (!model) return fallback(mensagem);
    const contexto = montarContextoAluno(perfil, desempenho);

    const chat = model.startChat({
      history: normalizeChatHistory(historico),
      generationConfig: { maxOutputTokens: 1500 },
    });

    try {
      const result = await chat.sendMessage(`${contexto}\n\nPERGUNTA DO ALUNO: ${mensagem}`);
      return result.response.text();
    } catch (error) {
      return isQuotaError(error) ? localTutorResponse(mensagem, perfil, desempenho) : friendlyAIError(error, mensagem);
    }
  },

  async gerarRelatorio(perfil, desempenho, tipo = "geral") {
    if (!model) return fallback("relatorio");
    const contexto = montarContextoAluno(perfil, desempenho);
    const detalhe = JSON.stringify(desempenho, null, 2);
    const prompt = `${contexto}

DADOS DETALHADOS DE DESEMPENHO:
${detalhe}

Gere um relatorio ${tipo === "semanal" ? "semanal" : "completo"} de desempenho seguindo a estrutura da sua funcao de relatorios: resumo executivo, pontos fortes, pontos fracos ordenados por impacto, padroes de erro, evolucao e plano de acao com numeros concretos. Seja direto e pratico.`;
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      return isQuotaError(error) ? localTutorResponse("relatorio de desempenho", perfil, desempenho) : friendlyAIError(error, "relatorio de desempenho");
    }
  },

  async gerarPlanoEstudos(perfil, planoBase) {
    if (!model) return { ...planoBase, aiGenerated: false };
    const prompt = `Voce e uma IA de planejamento de estudos. Use o diagnostico do aluno para refinar um plano semanal.

PERFIL:
${JSON.stringify(perfil, null, 2)}

PLANO BASE:
${JSON.stringify(planoBase, null, 2)}

Regras:
- Se objetivo for OAB, inclua apenas conteudos da OAB.
- Se objetivo for concurso, inclua apenas conteudos relacionados ao concurso informado.
- Se objetivo for ENEM, inclua apenas conteudos do ENEM.
- Se objetivo for ensino medio, inclua apenas materias escolares.
- Se objetivo for vestibular, inclua conteudos do vestibular informado.
- Seja pratico e respeite horas/dias disponiveis.

Responda APENAS em JSON valido, sem markdown, mantendo esta estrutura:
{
  "objective": "...",
  "objectiveLabel": "...",
  "weeklyHours": numero,
  "availableDays": ["..."],
  "prioritySubjects": ["..."],
  "weakSubjects": ["..."],
  "weeklySchedule": [{"day":"...", "blocks":[{"type":"Teoria|Questoes|Revisao|Simulado", "subject":"...", "minutes":numero}]}],
  "track": ["..."],
  "simulations": ["..."],
  "weeklyGoals": ["..."],
  "evolutionForecast": "..."
}`;
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().replace(/```json|```/g, "").trim();
      return { ...planoBase, ...JSON.parse(text), aiGenerated: true, createdAt: new Date().toISOString() };
    } catch {
      return { ...planoBase, aiGenerated: false };
    }
  },

  async gerarResumo(assunto, materia, concurso) {
    if (!model) return fallback(`resumo de ${assunto}`);
    const prompt = `Crie um resumo objetivo de "${assunto}" da materia "${materia}" para o concurso ${concurso}. Maximo 300 palavras, em topicos.`;
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      return friendlyAIError(error, prompt);
    }
  },

  async explicarQuestao(questao, respostaAluno, comentarioLegado) {
    if (!model) return fallback("explicacao de questao");
    if (typeof questao === "string") {
      const prompt = `Explique esta questao de concurso:\n\nEnunciado: ${questao}\nGabarito correto: ${respostaAluno}\nComentario oficial: ${comentarioLegado || ""}\n\nExplique por que o gabarito esta correto e de uma dica de memorizacao.`;
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        return friendlyAIError(error, "explicacao de questao");
      }
    }
    const alternativas = (questao.alternativas || []).map((alt) => `${alt.letra || alt.id}) ${alt.texto || alt.label || alt}`).join("\n");
    const prompt = `Explique esta questao para o aluno:

ENUNCIADO: ${questao.enunciado}
${alternativas}
GABARITO: ${String(questao.gabarito).toUpperCase()}
RESPOSTA DO ALUNO: ${String(respostaAluno).toUpperCase()}

Explique por que o gabarito esta correto, por que a resposta do aluno esta certa ou errada, aponte a pegadinha e de uma dica de memorizacao. Se voce discordar do gabarito com base na lei/doutrina, diga isso com clareza.`;
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      return friendlyAIError(error, "explicacao de questao");
    }
  },

  async corrigirRedacao(tema, texto, exame = "concurso") {
    if (!model) return JSON.stringify({ nota: 0, erro: "Gemini nao configurado" });
    const grade = exame === "enem"
      ? "Use as 5 competencias do ENEM (0-200 cada, total 1000)."
      : exame === "oab"
        ? "Avalie estrutura da peca/dissertativa, fundamentacao juridica e tecnica."
        : "Use criterio conservador de concurso (aderencia, estrutura, argumentacao, coesao, gramatica).";
    const prompt = `Corrija esta redacao. ${grade}

TEMA: ${tema}
TEXTO:
${texto}

Responda APENAS em JSON valido, sem markdown:
{"nota": numero, "criterios": [{"nome":"...","nota":numero,"max":numero,"feedback":"..."}], "pontos_fortes":["..."], "pontos_fracos":["..."], "sugestao":"..."}`;
    const result = await model.generateContent(prompt);
    return result.response.text().replace(/```json|```/g, "").trim();
  },

  async gerarFlashcards(assunto, materia, quantidade = 5) {
    if (!model) return [];
    const result = await model.generateContent(
      `Gere ${quantidade} flashcards sobre "${assunto}" de "${materia}". Retorne APENAS JSON valido: [{"frente":"...","verso":"..."}]`
    );
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  },

  stream(prompt, onChunk, onDone, perfil = {}, desempenho = {}, historico = []) {
    let cancelled = false;

    this.enviarMensagem(prompt, historico, perfil, desempenho)
      .then((response) => {
        if (cancelled) return;
        onChunk(response);
        onDone?.(response);
      })
      .catch((error) => {
        const message = error.message || "Nao foi possivel consultar o Gemini agora.";
        if (cancelled) return;
        onChunk(message);
        onDone?.(message);
      });

    return () => {
      cancelled = true;
    };
  },
};
