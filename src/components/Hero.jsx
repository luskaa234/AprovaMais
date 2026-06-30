import { Check, CheckSquare, Clock, Target, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const avatars = [
  { initials: "LS", color: "#1d63c4" },
  { initials: "MA", color: "#1d63c4" },
  { initials: "JP", color: "#7c3aed" },
  { initials: "BR", color: "#f59e0b" },
  { initials: "CF", color: "#ef4444" },
];

const metrics = [
  { icon: Clock, label: "Horas estudadas", value: "128" },
  { icon: CheckSquare, label: "Questões", value: "1.840" },
  { icon: Target, label: "Taxa de acertos", value: "82%" },
  { icon: Zap, label: "Sequência", value: "19 dias" },
];

const tickerItems = [
  "Planos por edital",
  "Questões comentadas",
  "Simulados inteligentes",
  "Revisão com IA",
  "Evolução em tempo real",
];

function getStudentCount() {
  return Math.floor(Math.random() * 401) + 800;
}

function Hero() {
  const [studentCount, setStudentCount] = useState(994);

  useEffect(() => {
    const timer = setInterval(() => {
      setStudentCount(getStudentCount());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="aprova-hero" id="inicio">
        <svg className="aprova-hero-circle aprova-hero-circle-large" viewBox="0 0 600 600" aria-hidden="true">
          <circle cx="300" cy="300" r="298" />
        </svg>
        <svg className="aprova-hero-circle aprova-hero-circle-small" viewBox="0 0 300 300" aria-hidden="true">
          <circle cx="150" cy="150" r="148" />
        </svg>

        <div className="aprova-hero-inner">
          <div className="aprova-hero-copy">
            <div className="aprova-hero-badges">
              <span className="aprova-hero-live-badge">
                <span className="aprova-hero-pulse" aria-hidden="true" />
                {studentCount} alunos estudando agora
              </span>

              <span className="aprova-hero-credit-badge">
                <Check size={13} aria-hidden="true" />
                Criado por quem estuda para concursos
              </span>
            </div>

            <h1 className="aprova-hero-title">
              Transforme sua rotina em{" "}
              <span>aprovação</span>{" "}
              no concurso.
            </h1>

            <p className="aprova-hero-subtitle">
              Planeje por edital, resolva questões, faça simulados e acompanhe sua
              evolução - tudo com IA integrada, feito para quem quer passar de verdade.
            </p>

            <div className="aprova-hero-actions">
              <a className="aprova-hero-primary" href="/criar-conta">
                Montar meu plano de estudos grátis
              </a>
              <a className="aprova-hero-secondary" href="#como-funciona">
                Ver como funciona na prática
              </a>
            </div>

            <div className="aprova-hero-proof">
              <div className="aprova-hero-avatars" aria-hidden="true">
                {avatars.map((avatar) => (
                  <span key={avatar.initials} style={{ backgroundColor: avatar.color }}>
                    {avatar.initials}
                  </span>
                ))}
              </div>
              <strong>+7.5k alunos em preparo</strong>
              <span className="aprova-hero-separator">·</span>
              <span>7 dias grátis · sem cartão</span>
            </div>
          </div>

          <div className="aprova-hero-panel" aria-label="Dashboard VemAprovar">
            <div className="aprova-hero-panel-topbar">
              <div className="aprova-hero-window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>app.aprova.plus</span>
            </div>

            <h2>Dashboard</h2>

            <div className="aprova-hero-metrics">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div className="aprova-hero-metric-card" key={metric.label}>
                    <div>
                      <Icon size={16} aria-hidden="true" />
                      <span>{metric.label}</span>
                    </div>
                    <strong>{metric.value}</strong>
                  </div>
                );
              })}
            </div>

            <div className="aprova-hero-weekly">
              <div>
                <span>Meta semanal</span>
                <strong>84%</strong>
              </div>
              <div className="aprova-hero-progress" aria-hidden="true">
                <span />
              </div>
            </div>

            <div className="aprova-hero-review">
              <span>Próxima revisão</span>
              <strong>hoje</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="aprova-hero-ticker" aria-label="Recursos da VemAprovar">
        <div>
          {tickerItems.map((item) => (
            <span key={item}>
              <Check size={14} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
