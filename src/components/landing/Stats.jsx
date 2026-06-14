import { BarChart3, BookOpenCheck, ClipboardCheck, TrendingUp } from "lucide-react";
import Counter from "../animata/text/Counter";

const stats = [
  {
    icon: BookOpenCheck,
    targetValue: 18,
    format: (value) => `${value.toFixed(0)}k+`,
    label: "questões por banca",
    text: "listas filtradas por assunto, banca e dificuldade.",
  },
  {
    icon: ClipboardCheck,
    targetValue: 420,
    format: (value) => `${value.toFixed(0)}+`,
    label: "simulados guiados",
    text: "provas montadas para treinar ritmo e estratégia.",
  },
  {
    icon: BarChart3,
    targetValue: 7.5,
    format: (value) => `${value.toFixed(1)}k`,
    label: "alunos em preparo",
    text: "rotinas acompanhadas com metas semanais.",
  },
  {
    icon: TrendingUp,
    targetValue: 91,
    format: (value) => `${value.toFixed(0)}%`,
    label: "evolução monitorada",
    text: "indicadores para ajustar o estudo antes da prova.",
  },
];

function Stats() {
  return (
    <section className="section-shell landing-stats-section" aria-label="Números da VemAprovar">
      <div className="landing-stats-grid">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <article className="premium-card landing-stat-card" key={item.label}>
              <div className="card-icon compact">
                <Icon size={21} />
              </div>
              <strong>
                <Counter targetValue={item.targetValue} format={item.format} delay={index * 100} />
              </strong>
              <span>{item.label}</span>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;
