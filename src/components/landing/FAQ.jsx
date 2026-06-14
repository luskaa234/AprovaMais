import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "A VemAprovar serve para qualquer concurso?",
    answer:
      "Sim. A plataforma foi pensada para concursos em geral, com cronograma por edital, matérias, revisões e simulados ajustáveis ao seu objetivo.",
  },
  {
    question: "Os simulados são corrigidos automaticamente?",
    answer:
      "Nesta etapa o fluxo é simulado no frontend, mas a experiência já está preparada para mostrar desempenho, acertos e pontos de melhoria.",
  },
  {
    question: "Consigo acompanhar minha evolução por matéria?",
    answer:
      "Sim. O dashboard organiza progresso, metas da semana, tarefas pendentes e desempenho por matéria para ajudar na tomada de decisão.",
  },
  {
    question: "A plataforma substitui meu planejamento manual?",
    answer:
      "A ideia é reduzir a desorganização. Você ainda decide prioridades, mas a VemAprovar transforma edital, revisões e metas em um plano visual.",
  },
  {
    question: "Tem área para redação e TAF?",
    answer:
      "Sim. A landing já apresenta esses módulos como parte da experiência do produto, mantendo a identidade de preparação completa.",
  },
];

function FAQ() {
  return (
    <section className="section-shell landing-faq-section" id="faq">
      <div className="section-heading">
        <span className="section-kicker">
          <HelpCircle size={16} />
          Perguntas frequentes
        </span>
        <h2>Respostas rápidas antes de começar.</h2>
        <p>O essencial sobre acesso, planejamento, simulados e rotina de estudos.</p>
      </div>

      <div className="landing-faq-list">
        {faqs.map((faq, index) => (
          <details className="landing-faq-item" key={faq.question} open={index === 0}>
            <summary>
              <span>{faq.question}</span>
              <ChevronDown size={18} />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
