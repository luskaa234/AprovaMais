import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  KeyRound,
  LineChart,
  LogIn,
  Sparkles,
  UserPlus,
} from "lucide-react";
import BrandLogo from "./BrandLogo";

const authLinks = [
  { label: "Login", href: "/login", icon: LogIn },
  { label: "Criar conta", href: "/criar-conta", icon: UserPlus },
  { label: "Esqueci senha", href: "/esqueci-senha", icon: KeyRound },
  { label: "Recuperar senha", href: "/recuperar-senha", icon: CheckCircle2 },
];

function AuthLayout({ title, message, children, footer }) {
  const { pathname } = useLocation();

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label={title}>
        <aside className="auth-sidebar">
          <div className="auth-sidebar-top">
            <Link className="brand" to="/" aria-label="VemAprovar - início">
              <BrandLogo />
            </Link>
          </div>

          <Link className="auth-back-link" to="/">
            <ArrowLeft size={17} />
            Voltar para o site
          </Link>

          <div className="auth-spotlight">
            <span className="eyebrow">
              <Sparkles size={15} />
              Área do candidato
            </span>
            <h1>Entre no ritmo certo para passar em concurso</h1>
            <p>
              Acesse seu plano, acompanhe metas, revise conteúdos e continue
              estudando com clareza em qualquer etapa da jornada.
            </p>

            <div className="auth-benefits">
              <span>
                <CheckCircle2 size={17} />
                Plano por edital
              </span>
              <span>
                <BookOpenCheck size={17} />
                Revisões guiadas
              </span>
              <span>
                <LineChart size={17} />
                Evolução visível
              </span>
            </div>
          </div>

          <nav className="auth-sidebar-nav" aria-label="Navegação de autenticação">
            {authLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  className={`auth-sidebar-link ${isActive ? "is-active" : ""}`}
                  to={item.href}
                  key={item.href}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="auth-preview-card" aria-hidden="true">
            <div className="auth-preview-top">
              <span />
              <span />
              <span />
            </div>
            <div className="auth-preview-score">
              <small>Meta da semana</small>
              <strong>82%</strong>
            </div>
            <div className="auth-preview-bars">
              <i style={{ width: "88%" }} />
              <i style={{ width: "66%" }} />
              <i style={{ width: "74%" }} />
            </div>
            <div className="auth-preview-row">
              <span>Simulado</span>
              <strong>+14 pts</strong>
            </div>
          </div>
        </aside>

        <div className="auth-main">
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <p className="auth-title">{title}</p>
            <p className="auth-message">{message}</p>
            {children}
            {footer}
          </form>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
