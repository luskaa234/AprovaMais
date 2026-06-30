import { BookOpenCheck, CalendarClock, ClipboardList, LineChart } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardList,
    title: "Escolha seu concurso",
    text: "Selecione o cargo desejado, edital, prazo e nível de domínio atual.",
  },
  {
    icon: CalendarClock,
    title: "Monte seu plano",
    text: "Receba uma rotina com blocos de estudo, revisão e simulados.",
  },
  {
    icon: BookOpenCheck,
    title: "Estude com questões",
    text: "Resolva listas e provas com foco nos assuntos de maior retorno.",
  },
  {
    icon: LineChart,
    title: "Acompanhe sua evolução",
    text: "Veja avanço por matéria, constância semanal e pontos de atenção.",
  },
];

function HowItWorks() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".step-card", {
        y: 44,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="section-shell how-section" id="como-funciona" ref={sectionRef}>
      <div className="section-heading">
        <span className="eyebrow">Como funciona</span>
        <h2>Um ciclo simples para estudar com precisão</h2>
        <p>
          Do edital ao relatório de desempenho, cada etapa existe para tirar
          dúvida da rotina e colocar energia no que gera resultado.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article className="step-card" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="card-icon">
                <Icon size={24} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;
