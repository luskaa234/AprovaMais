import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    question: "A Aprova+ serve para diferentes concursos?",
    answer:
      "Sim. A plataforma ajuda a organizar matérias, revisões, simulados e metas conforme o edital escolhido.",
  },
  {
    question: "O cronograma muda quando eu atraso uma tarefa?",
    answer:
      "A proposta é reorganizar prioridades para manter o plano realista, preservando revisões importantes e assuntos de maior incidência.",
  },
  {
    question: "Os simulados têm relatório de desempenho?",
    answer:
      "Sim. O aluno acompanha acertos, tempo, evolução por disciplina e pontos que precisam entrar no próximo ciclo de estudo.",
  },
  {
    question: "Posso estudar pelo celular?",
    answer:
      "Sim. A landing e a experiência foram planejadas para funcionar bem em telas menores, com cards e painéis responsivos.",
  },
  {
    question: "A plataforma ajuda quem ainda está desorganizado?",
    answer:
      "Sim. O foco é transformar edital, prazo e tempo disponível em uma rotina clara para estudar com constância.",
  },
];

function FAQ() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="section-shell faq-section" id="faq" ref={sectionRef}>
      <div className="section-heading">
        <span className="eyebrow">FAQ</span>
        <h2>Perguntas frequentes</h2>
        <p>
          Respostas rápidas sobre acesso, simulados, cronograma e preparação
          para passar em concurso.
        </p>
      </div>

      <div className="faq-list">
        {questions.map((item, index) => (
          <details className="faq-item" key={item.question} open={index === 0}>
            <summary>
              {item.question}
              <ChevronDown size={20} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
