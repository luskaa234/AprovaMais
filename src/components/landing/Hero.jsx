import { Safari } from "@/registry/magicui/safari";
import { CalendarCheck, ClipboardCheck, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import BrandLogo from "../BrandLogo";

const avatarUsers = [
  { initials: "LA", color: "#3b82f6" },
  { initials: "CM", color: "#0f766e" },
  { initials: "FS", color: "#60a5fa" },
  { initials: "BR", color: "#0ea5e9" },
  { initials: "AN", color: "#0284c7" },
];

const heroNotifications = [
  {
    title: "Meta semanal concluida",
    text: "84% do plano finalizado",
    time: "agora",
    color: "#16A34A",
    icon: CalendarCheck,
  },
  {
    title: "Revisao liberada",
    text: "Direito Constitucional",
    time: "2 min",
    color: "#0F766E",
    icon: RefreshCw,
  },
  {
    title: "Simulado corrigido",
    text: "82% de aproveitamento",
    time: "5 min",
    color: "#60A5FA",
    icon: ClipboardCheck,
  },
];

const adminNavItems = [
  ["Dashboard", "DB", true],
  ["Banco de questoes", "BQ"],
  ["Simulados", "SM"],
  ["TAF", "TF", false, "Novo"],
  ["Plano de estudos", "PE"],
  ["Central de revisao", "CR"],
  ["Flashcards", "FC"],
  ["Mapas mentais", "MM"],
  ["Redacao", "RD"],
  ["Assistente", "AS"],
  ["Admin", "AD"],
];

const adminStats = [
  ["Horas estudadas", "128", "clock"],
  ["Questoes resolvidas", "1840", "list"],
  ["Taxa de acertos", "82%", "target"],
  ["Sequencia", "19", "zap"],
  ["TAF", "9.0 aprovado", "taf"],
];

const adminReviews = [
  "Direito Constitucional: conceito 1",
  "Direito Constitucional: conceito 2",
  "Direito Constitucional: conceito 3",
  "Portugues: conceito 1",
];

const adminRanking = [
  ["Ana Lima", "9900"],
  ["Bruno Reis", "9490"],
  ["Carla Nunes", "9080"],
  ["Diego Maia", "8670"],
  ["Lucas Andrade", "8260"],
];

const getActiveStudents = () => Math.floor(Math.random() * 401) + 800;

function Hero() {
  const [activeStudents, setActiveStudents] = useState(994);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStudents(getActiveStudents());
    }, 10000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="aprova-hero" id="inicio">
      <div className="aprova-hero-left">
        <a className="aprova-hero-inline-logo" href="/" aria-label="Aprova+ - inicio">
          <BrandLogo />
        </a>

        <span className="aprova-hero-live-badge" aria-live="polite">
          <span className="aprova-hero-pulse" aria-hidden="true" />
          {activeStudents.toLocaleString("pt-BR")} alunos estudando agora
        </span>

        <h1 className="aprova-hero-title">
          Sua aprovacao comeca com o <span>plano certo.</span>
        </h1>

        <p className="aprova-hero-subtitle">
          Assistente, questoes e cronograma por edital, tudo em um metodo feito para
          passar de verdade.
        </p>

        <div className="aprova-hero-actions">
          <a className="aprova-hero-primary" href="/criar-conta">
            Montar meu plano gratis
          </a>
          <a className="aprova-hero-secondary" href="#como-funciona">
            Ver como funciona na pratica
          </a>
        </div>

        <div className="aprova-hero-proof" aria-label="Alunos em preparo">
          <div className="aprova-hero-avatars" aria-hidden="true">
            {avatarUsers.map((user) => (
              <span style={{ backgroundColor: user.color }} key={user.initials}>
                {user.initials}
              </span>
            ))}
          </div>
          <strong>+7.5k alunos em preparo</strong>
          <span className="aprova-hero-separator">.</span>
          <span>7 dias gratis, sem cartao</span>
        </div>
      </div>

      <div className="aprova-hero-right" aria-label="Preview do app Aprova+">
        <div className="aprova-hero-showcase">
          <div className="aprova-hero-glow" aria-hidden="true" />

          <Safari className="aprova-hero-safari" url="Aprova+.com" mode="simple">
            <div className="aprova-hero-admin-preview">
              <aside className="aprova-hero-admin-sidebar">
                <img src="/logo-light-readable.svg" alt="" />
                <nav>
                  {adminNavItems.map(([label, icon, active, badge]) => (
                    <span className={active ? "is-active" : ""} key={label}>
                      <i>{icon}</i>
                      {label}
                      {badge ? <b>{badge}</b> : null}
                    </span>
                  ))}
                </nav>
                <div className="aprova-hero-admin-user">
                  <strong>LA</strong>
                  <div>
                    <span>Lucas Andrade</span>
                    <small>Analista Judiciario</small>
                  </div>
                </div>
              </aside>

              <main className="aprova-hero-admin-main">
                <header className="aprova-hero-admin-topbar">
                  <div>
                    <small>Area interna</small>
                    <strong>Dashboard</strong>
                  </div>
                  <div className="aprova-hero-admin-actions">
                    <span className="aprova-hero-admin-bell">3</span>
                    <strong>LA</strong>
                  </div>
                </header>

                <div className="aprova-hero-admin-search">
                  <span />
                  <p>Buscar modulo</p>
                  <b>Ctrl K</b>
                </div>

                <section className="aprova-hero-admin-content">
                  <div className="aprova-hero-admin-title">
                    <div>
                      <h3>Dashboard</h3>
                      <p>Panorama operacional do seu ciclo de estudos.</p>
                    </div>
                    <button type="button">Abrir assistente</button>
                  </div>

                  <div className="aprova-hero-admin-stats">
                    {adminStats.map(([label, value, icon]) => (
                      <article key={label}>
                        <i className={`stat-${icon}`} />
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </article>
                    ))}
                  </div>

                  <div className="aprova-hero-admin-charts">
                    <article className="line-chart">
                      <h4>Evolucao semanal</h4>
                      <div className="chart-grid">
                        <svg viewBox="0 0 440 150" aria-hidden="true">
                          <polyline points="18,112 116,98 224,82 330,68 426,52" fill="none" stroke="#2563eb" strokeWidth="3" />
                          {[18, 116, 224, 330, 426].map((x, index) => (
                            <circle cx={x} cy={[112, 98, 82, 68, 52][index]} r="4" fill="#fff" stroke="#2563eb" strokeWidth="3" key={x} />
                          ))}
                        </svg>
                      </div>
                      <div className="chart-days">
                        <span>Seg</span>
                        <span>Ter</span>
                        <span>Qua</span>
                        <span>Qui</span>
                        <span>Sex</span>
                      </div>
                    </article>

                    <article className="bar-chart">
                      <h4>Tempo por disciplina</h4>
                      <div>
                        {[36, 50, 64, 78, 92].map((height, index) => (
                          <i style={{ height: `${height}%` }} key={height} className={`bar-${index + 1}`} />
                        ))}
                      </div>
                    </article>
                  </div>

                  <div className="aprova-hero-admin-bottom">
                    <article>
                      <h4>Sequencia</h4>
                      <div className="aprova-hero-heatmap">
                        {Array.from({ length: 45 }, (_, index) => (
                          <i className={`tone-${(index * 7) % 5}`} key={index} />
                        ))}
                      </div>
                    </article>

                    <article>
                      <h4>Proximas revisoes</h4>
                      {adminReviews.map((review) => (
                        <p key={review}>
                          {review}
                          <b>hoje</b>
                        </p>
                      ))}
                    </article>

                    <article>
                      <h4>Ranking</h4>
                      {adminRanking.map(([name, score], index) => (
                        <p key={name}>
                          {index + 1}. {name}
                          <strong>{score}</strong>
                        </p>
                      ))}
                    </article>
                  </div>
                </section>
              </main>
            </div>
          </Safari>

          <div className="aprova-hero-iphone-wrap">
            <img src="/screenshots/iphone-landing-reference.png" alt="Preview mobile da landing Aprova+" />
          </div>

          {heroNotifications.map((notification, index) => {
            const Icon = notification.icon;

            return (
              <div
                className={`aprova-hero-floating-note note-${index + 1}`}
                key={notification.title}
                style={{ "--note-color": notification.color }}
              >
                <span aria-hidden="true">
                  <Icon size={17} />
                </span>
                <div>
                  <strong>{notification.title}</strong>
                  <p>{notification.text}</p>
                </div>
                <time>{notification.time}</time>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
