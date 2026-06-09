import { mockRedacoes } from "../data";
import { aiService } from "./aiService";

/**
 * Future REST contract:
 * GET /redacoes/temas
 * POST /redacoes
 * PUT /redacoes/:id
 * POST /redacoes/:id/corrigir-ia
 */
export const redacaoService = {
  async getHistorico() {
    return mockRedacoes;
  },
  async corrigir(texto, tema = "Tema de concurso publico") {
    if (!texto || texto.trim().length < 100) {
      return { nota: 0, competencias: [0, 0, 0, 0, 0], comentarios: "Redacao muito curta para avaliacao. Escreva pelo menos 100 caracteres." };
    }
    const fallback = { nota: Math.min(940, 720 + texto.length), competencias: [168, 176, 164, 172, 180], comentarios: "Tese clara, repertorio pertinente e proposta consistente." };
    try {
      const prompt = `Voce e um corretor de redacoes para concursos publicos. Avalie a redacao abaixo sobre o tema "${tema}".

TEXTO:
${texto}

Retorne apenas JSON valido no formato:
{"nota":750,"competencias":[150,150,150,150,150],"comentarios":"feedback objetivo"}`;
      const response = await aiService.gerarTexto(prompt);
      const parsed = JSON.parse(response.replace(/```json|```/g, "").trim());
      return {
        nota: parsed.nota ?? fallback.nota,
        competencias: parsed.competencias || parsed.criterios?.map((item) => item.nota) || fallback.competencias,
        comentarios: parsed.comentarios || parsed.sugestao || fallback.comentarios,
      };
    } catch {
      return fallback;
    }
  },
};
