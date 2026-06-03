import { BookOpenCheck, CalendarClock, ClipboardList, LineChart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Escolha seu concurso",
    text: "Selecione cargo, edital, prazo e materias mais importantes.",
  },
  {
    icon: CalendarClock,
    title: "Monte seu plano",
    text: "Receba uma rotina com blocos de estudo, revisao e simulados.",
  },
  {
    icon: BookOpenCheck,
    title: "Treine com questoes",
    text: "Pratique os assuntos de maior retorno para sua prova.",
  },
  {
    icon: LineChart,
    title: "Acompanhe a evolucao",
    text: "Veja progresso, constancia e pontos que precisam de reforco.",
  },
];

function HowItWorks() {
  return (
    <section className="section-shell how-section" id="como-funciona">
      <div className="section-heading">
        <span className="eyebrow">Como funciona</span>
        <h2>Um ciclo simples para estudar com precisao</h2>
        <p>
          O metodo combina planejamento, pratica e analise para voce saber o que
          fazer hoje e como melhorar na proxima semana.
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
