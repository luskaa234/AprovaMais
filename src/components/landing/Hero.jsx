import { Safari } from "@/registry/magicui/safari";
import { CalendarCheck, ClipboardCheck, RefreshCw } from "lucide-react";
import BrandLogo from "../BrandLogo";

const avatarUsers = [
  { initials: "PM", color: "#3b82f6" },
  { initials: "CB", color: "#0f766e" },
  { initials: "PC", color: "#2e97d4" },
  { initials: "OAB", color: "#0ea5e9" },
  { initials: "PRF", color: "#0284c7" },
];

const heroNotifications = [
  {
    title: "Meta semanal concluída",
    text: "84% do plano finalizado",
    time: "agora",
    color: "#1d63c4",
    icon: CalendarCheck,
  },
  {
    title: "Revisão liberada",
    text: "Direito Constitucional",
    time: "2 min",
    color: "#1d63c4",
    icon: RefreshCw,
  },
  {
    title: "Simulado corrigido",
    text: "82% de aproveitamento",
    time: "5 min",
    color: "#1d63c4",
    icon: ClipboardCheck,
  },
];

const adminNavItems = [
  ["Dashboard", "DB", true],
  ["Banco de questões", "BQ"],
  ["Simulados", "SM"],
  ["TAF", "TAF"],
  ["Plano de estudos", "PE"],
  ["Central de revisão", "CR"],
  ["Flashcards", "FC"],
  ["Mapas mentais", "MM"],
  ["Redação", "RD"],
  ["Assistente", "AS"],
  ["Admin", "AD"],
];

const adminStats = [
  ["Horas estudadas", "128", "clock"],
  ["Questões resolvidas", "1840", "list"],
  ["Taxa de acertos", "82%", "target"],
  ["Sequência", "19", "zap"],
  ["TAF", "9.0 aprovado", "taf"],
];

const adminReviews = [
  "Direito Constitucional: conceito 1",
  "Direito Constitucional: conceito 2",
  "Direito Constitucional: conceito 3",
  "Português: conceito 1",
];

const adminRanking = [
  ["Constitucional", "9900"],
  ["Português", "9490"],
  ["Raciocínio lógico", "9080"],
  ["Direito Penal", "8670"],
  ["Legislação especial", "8260"],
];

function Hero() {
  return (
    <section className="aprova-hero" id="inicio">
      <div className="aprova-hero-left">
        <a className="aprova-hero-inline-logo" href="/" aria-label="VemAprovar - início">
          <BrandLogo />
        </a>

        <span className="aprova-hero-live-badge">
          <span className="aprova-hero-pulse" aria-hidden="true" />
          +3.000 questões oficiais no banco
        </span>

        <h1 className="aprova-hero-title">
          Sua aprovação começa com o <span>plano certo.</span>
        </h1>

        <p className="aprova-hero-subtitle">
          Assistente, questões e cronograma por edital, tudo em um método feito para
          passar de verdade.
        </p>

        <div className="aprova-hero-actions">
          <a className="aprova-hero-primary" href="/criar-conta">
            Montar meu plano grátis
          </a>
          <a className="aprova-hero-secondary" href="#sistema">
            Ver como funciona na prática
          </a>
        </div>

        <div className="aprova-hero-proof" aria-label="Concursos atendidos">
          <div className="aprova-hero-avatars" aria-hidden="true">
            {avatarUsers.map((user) => (
              <span style={{ backgroundColor: user.color }} key={user.initials}>
                {user.initials}
              </span>
            ))}
          </div>
          <strong>PM, Bombeiros, PC, PRF e OAB</strong>
          <span className="aprova-hero-separator">.</span>
          <span>7 dias grátis, sem cartão</span>
        </div>
      </div>

      <div className="aprova-hero-right" aria-label="Preview do app VemAprovar">
        <div className="aprova-hero-showcase">
          <div className="aprova-hero-glow" aria-hidden="true" />

          <Safari className="aprova-hero-safari" url="vemaprovar.com" mode="simple">
            <div className="aprova-hero-admin-preview">
              <aside className="aprova-hero-admin-sidebar">
                <BrandLogo width={100} height={26} />
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
                    <small>Aluno VemAprovar</small>
                  </div>
                </div>
              </aside>

              <main className="aprova-hero-admin-main">
                <header className="aprova-hero-admin-topbar">
                  <div>
                    <small>Área interna</small>
                    <strong>Dashboard</strong>
                  </div>
                  <div className="aprova-hero-admin-actions">
                    <span className="aprova-hero-admin-bell">3</span>
                    <strong>LA</strong>
                  </div>
                </header>

                <div className="aprova-hero-admin-search">
                  <span />
                  <p>Buscar módulo</p>
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
                      <h4>Evolução semanal</h4>
                      <div className="chart-grid">
                        <svg viewBox="0 0 440 150" aria-hidden="true">
                          <polyline points="18,112 116,98 224,82 330,68 426,52" fill="none" stroke="#1d63c4" strokeWidth="3" />
                          {[18, 116, 224, 330, 426].map((x, index) => (
                            <circle cx={x} cy={[112, 98, 82, 68, 52][index]} r="4" fill="#fff" stroke="#1d63c4" strokeWidth="3" key={x} />
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
                      <h4>Sequência</h4>
                      <div className="aprova-hero-heatmap">
                        {Array.from({ length: 45 }, (_, index) => (
                          <i className={`tone-${(index * 7) % 5}`} key={index} />
                        ))}
                      </div>
                    </article>

                    <article>
                      <h4>Próximas revisões</h4>
                      {adminReviews.map((review) => (
                        <p key={review}>
                          {review}
                          <b>hoje</b>
                        </p>
                      ))}
                    </article>

                    <article>
                      <h4>Prioridades</h4>
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
            <img src="/screenshots/iphone-landing-reference.png" alt="Preview mobile da landing VemAprovar" />
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
