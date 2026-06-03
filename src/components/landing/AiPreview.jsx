import { BookOpenCheck, MessageCircle, Send, UserRound } from "lucide-react";
import { useState } from "react";

const suggestionResponses = {
  "Gerar resumo": {
    prompt: "Gere um resumo rápido de controle de constitucionalidade.",
    answer:
      "Controle de constitucionalidade é a verificação se uma lei ou ato está de acordo com a Constituição. Pode ser preventivo, antes da norma entrar em vigor, ou repressivo, depois. Na prova, observe quem propõe, qual órgão julga e se o controle é difuso ou concentrado.",
  },
  "Explicar questão": {
    prompt: "Explique uma questão sobre controle concentrado.",
    answer:
      "Se a questão fala em ADI, ADC, ADPF ou ADO, pense em controle concentrado. Ele discute a validade da norma em tese, normalmente perante o STF, e a decisão tende a ter efeito para todos. Marque atenção nos legitimados do art. 103 da Constituição.",
  },
  "Criar simulado": {
    prompt: "Crie um mini simulado de revisão.",
    answer:
      "Mini simulado sugerido: 5 questões de Constitucional, 5 de Português e 5 de Raciocínio Lógico. Faça em 25 minutos, corrija logo depois e transforme cada erro em um flashcard para revisar amanhã.",
  },
  "Montar cronograma": {
    prompt: "Monte um cronograma para esta semana.",
    answer:
      "Cronograma da semana: segunda e quarta para Constitucional, terça para Português, quinta para Raciocínio Lógico, sexta para revisão dos erros e sábado para simulado. Separe blocos de 50 minutos com 10 minutos de pausa.",
  },
};

const suggestions = Object.keys(suggestionResponses);

function AiPreview() {
  const [activeSuggestion, setActiveSuggestion] = useState("Explicar questão");
  const activeConversation = suggestionResponses[activeSuggestion];

  return (
    <section className="section-shell ai-preview-section">
      <div className="ai-preview-copy">
        <span className="eyebrow">
          <BookOpenCheck size={15} />
          Assistente de estudos
        </span>
        <h2>Um assistente para estudar com você</h2>
        <p>
          Tire dúvidas, peça resumos, gere simulados e transforme temas difíceis
          em explicações simples sem sair do seu plano.
        </p>
      </div>

      <div className="ai-chat-card" aria-label="Chat do assistente em janela de MacBook">
        <div className="ai-mac-topbar">
          <div className="ai-mac-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <img src="/logo-light-readable.svg" alt="Aprova+" />
          <small>online</small>
        </div>

        <div className="ai-chat-screen">
          <div className="ai-chat-date">Hoje, 09:42</div>

          <div className="ai-message is-user" key={`user-${activeSuggestion}`}>
            <span>
              <UserRound size={16} />
            </span>
            <p>{activeConversation.prompt}</p>
          </div>

          <div className="ai-message is-bot" key={`bot-${activeSuggestion}`}>
            <span>
              <MessageCircle size={16} />
            </span>
            <p>{activeConversation.answer}</p>
          </div>

          <div className="ai-suggestions">
            {suggestions.map((suggestion) => (
              <button
                className={suggestion === activeSuggestion ? "is-active" : ""}
                type="button"
                key={suggestion}
                onClick={() => setActiveSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="ai-input-fake">
            <span>Digite uma dúvida sobre seu edital...</span>
            <Send size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiPreview;
