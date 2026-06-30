import { BookOpenCheck, CalendarClock, ClipboardList, LineChart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Escolha seu concurso",
    text: "Selecione cargo, edital, prazo e matérias mais importantes.",
  },
  {
    icon: CalendarClock,
    title: "Monte seu plano",
    text: "Receba uma rotina com blocos de estudo, revisão e simulados.",
  },
  {
    icon: BookOpenCheck,
    title: "Treine com questões",
    text: "Pratique os assuntos de maior retorno para sua prova.",
  },
  {
    icon: LineChart,
    title: "Acompanhe a evolução",
    text: "Veja progresso, constância e pontos que precisam de reforço.",
  },
];

function HowItWorks() {
  return (
    <section className="section-shell how-section" id="como-funciona">
      <div className="section-heading">
        <span className="eyebrow">Como funciona</span>
        <h2>Um ciclo simples para estudar com precisão</h2>
        <p>
          O método combina planejamento, prática e análise para você saber o que
          fazer hoje e como melhorar na próxima semana.
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
