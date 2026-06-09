import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: "gemini-1.5-flash" });

function fallbackResposta(mensagem) {
  return `Ainda nao encontrei uma chave Gemini configurada. Para responder "${mensagem}", preencha VITE_GEMINI_API_KEY no .env e reinicie o Vite.`;
}

export const aiService = {
  async gerarTexto(prompt) {
    if (!model) return fallbackResposta(prompt);
    const result = await model.generateContent(prompt);
    return result.response.text();
  },

  async enviarMensagem(mensagem, historico = [], contextoAluno = {}) {
    if (!model) return fallbackResposta(mensagem);

    const systemPrompt = `Voce e o tutor do Aprova+, plataforma de estudos para concursos publicos.
Aluno: ${contextoAluno.nome || "Aluno"}
Concurso-alvo: ${contextoAluno.concurso || "PM"}
Nivel: ${contextoAluno.nivel || "intermediario"}
Responda sempre em portugues, de forma clara e focada no concurso do aluno.`;

    const chat = model.startChat({
      history: historico.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content || h.text || "" }],
      })),
      generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessage(`${systemPrompt}\n\n${mensagem}`);
    return result.response.text();
  },

  async gerarResumo(assunto, materia, concurso) {
    if (!model) return fallbackResposta(`resumo de ${assunto}`);
    const result = await model.generateContent(
      `Crie um resumo objetivo de "${assunto}" da materia "${materia}" para o concurso ${concurso}. Maximo 300 palavras, em topicos.`
    );
    return result.response.text();
  },

  async explicarQuestao(enunciado, gabarito, respostaAluno, comentario) {
    if (!model) return fallbackResposta("explicacao de questao");
    const result = await model.generateContent(
      `Explique esta questao de concurso:\n\nEnunciado: ${enunciado}\nGabarito correto: ${gabarito}\nResposta do aluno: ${respostaAluno}\nComentario oficial: ${comentario}\n\nExplique por que o gabarito esta correto e de uma dica de memorizacao.`
    );
    return result.response.text();
  },

  async gerarFlashcards(assunto, materia, quantidade = 5) {
    if (!model) return [];
    const result = await model.generateContent(
      `Gere ${quantidade} flashcards sobre "${assunto}" de "${materia}". Retorne APENAS JSON valido: [{"frente":"...","verso":"..."}]`
    );
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  },

  stream(prompt, onChunk, onDone) {
    let cancelled = false;

    this.enviarMensagem(prompt)
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
