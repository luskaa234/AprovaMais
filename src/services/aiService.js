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

export const aiService = {
  async gerarTexto(prompt) {
    if (!model) return fallback(prompt);
    const result = await model.generateContent(prompt);
    return result.response.text();
  },

  async enviarMensagem(mensagem, historico = [], perfil = {}, desempenho = {}) {
    if (!model) return fallback(mensagem);
    const contexto = montarContextoAluno(perfil, desempenho);

    const chat = model.startChat({
      history: historico.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content || h.text || "" }],
      })),
      generationConfig: { maxOutputTokens: 1500 },
    });

    const result = await chat.sendMessage(`${contexto}\n\nPERGUNTA DO ALUNO: ${mensagem}`);
    return result.response.text();
  },

  async gerarRelatorio(perfil, desempenho, tipo = "geral") {
    if (!model) return fallback("relatorio");
    const contexto = montarContextoAluno(perfil, desempenho);
    const detalhe = JSON.stringify(desempenho, null, 2);
    const prompt = `${contexto}

DADOS DETALHADOS DE DESEMPENHO:
${detalhe}

Gere um relatorio ${tipo === "semanal" ? "semanal" : "completo"} de desempenho seguindo a estrutura da sua funcao de relatorios: resumo executivo, pontos fortes, pontos fracos ordenados por impacto, padroes de erro, evolucao e plano de acao com numeros concretos. Seja direto e pratico.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  },

  async gerarResumo(assunto, materia, concurso) {
    if (!model) return fallback(`resumo de ${assunto}`);
    const result = await model.generateContent(
      `Crie um resumo objetivo de "${assunto}" da materia "${materia}" para o concurso ${concurso}. Maximo 300 palavras, em topicos.`
    );
    return result.response.text();
  },

  async explicarQuestao(questao, respostaAluno, comentarioLegado) {
    if (!model) return fallback("explicacao de questao");
    if (typeof questao === "string") {
      const result = await model.generateContent(
        `Explique esta questao de concurso:\n\nEnunciado: ${questao}\nGabarito correto: ${respostaAluno}\nComentario oficial: ${comentarioLegado || ""}\n\nExplique por que o gabarito esta correto e de uma dica de memorizacao.`
      );
      return result.response.text();
    }
    const alternativas = (questao.alternativas || []).map((alt) => `${alt.letra || alt.id}) ${alt.texto || alt.label || alt}`).join("\n");
    const result = await model.generateContent(
      `Explique esta questao para o aluno:

ENUNCIADO: ${questao.enunciado}
${alternativas}
GABARITO: ${String(questao.gabarito).toUpperCase()}
RESPOSTA DO ALUNO: ${String(respostaAluno).toUpperCase()}

Explique por que o gabarito esta correto, por que a resposta do aluno esta certa ou errada, aponte a pegadinha e de uma dica de memorizacao. Se voce discordar do gabarito com base na lei/doutrina, diga isso com clareza.`
    );
    return result.response.text();
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
