/**
 * Future REST contract:
 * POST /ai/chat
 * POST /ai/gerar-flashcards
 * POST /ai/gerar-mapa-mental
 * POST /ai/gerar-plano
 * GET /ai/chat/:sessionId/historico
 */
export const aiService = {
  stream(prompt, onChunk, onDone) {
    const responses = {
      "Explique essa questão": "Vamos por partes: identifique o comando da banca, marque as palavras restritivas e compare a regra geral com a excecao. A alternativa correta normalmente preserva exatamente esses limites.",
      "Gere flashcards sobre Constitucional": "Criei um roteiro de deck: direitos fundamentais, controle de constitucionalidade, poderes da Uniao, organizacao do Estado e remedios constitucionais. Priorize cards curtos com uma pegadinha por verso.",
      "Crie mapa mental de Português": "Mapa sugerido: Sintaxe no centro, ramificando para sujeito, predicado, concordancia, regencia, crase e pontuacao. Conecte cada ramo a exemplos cobrados por banca.",
      "Monte plano de estudos": "Plano sugerido: 2 blocos teoricos, 1 bloco de questoes e 1 revisao curta por dia. A cada 48h, refaca erros e atualize sua prioridade por taxa de acerto.",
      "Corrija minha redação": "Na correção, eu avaliaria tese, repertorio, progressão, coesão e proposta. O ponto de melhoria mais comum e tornar a intervenção mais concreta.",
      "Monte meu plano de TAF": "Com base no seu último teste (8.0 - PMSP), voce tem 18 semanas. Sugiro 4 treinos semanais com foco em corrida (54% da meta) e manutenção de flexão (82% da meta).",
    };
    const response = responses[prompt] || `Analisei "${prompt}". Recomendo revisar a teoria-base, resolver 10 questões similares e agendar nova revisão em 48 horas.`;
    let index = 0;
    const timer = setInterval(() => {
      index += 3;
      onChunk(response.slice(0, index));
      if (index >= response.length) {
        clearInterval(timer);
        onDone(response);
      }
    }, 35);
    return () => clearInterval(timer);
  },
};
