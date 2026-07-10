import { Link } from "react-router-dom";
import BrandLogo from "../BrandLogo";

function AuthLayout({ title, description, children }) {
  const pageKey = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <main className={`auth-native-page auth-saas-page auth-saas-page-${pageKey}`}>
      <div className="auth-native-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <header className="auth-native-top">
        <Link className="auth-native-brand" to="/" aria-label="VemAprovar - inicio">
          <BrandLogo variant="white" width={168} height={46} />
        </Link>
      </header>

      <section className="auth-native-shell" aria-label={title}>
        <aside className="auth-native-preview" aria-hidden="true">
          <div className="auth-native-phone">
            <div className="auth-native-phone-top">
              <img src="/brand/vemaprovar-monograma-white.png" alt="" draggable="false" />
              <span />
            </div>
            <div className="auth-native-meter">
              <strong>86</strong>
              <span />
            </div>
            <div className="auth-native-stack">
              <i />
              <i />
              <i />
            </div>
            <div className="auth-native-dock">
              <span />
              <span />
              <span />
            </div>
          </div>
        </aside>

        <section className="auth-native-panel auth-saas-card">
          <div className="auth-saas-header">
            <Link className="auth-saas-logo" to="/" aria-label="VemAprovar - inicio">
              <BrandLogo variant="white" width={132} height={38} />
            </Link>
            <h1 className="auth-saas-title">{title}</h1>
            <p className="auth-saas-description">{description}</p>
          </div>
          <div className="auth-saas-content">{children}</div>
        </section>
      </section>
    </main>
  );
}

export default AuthLayout;
