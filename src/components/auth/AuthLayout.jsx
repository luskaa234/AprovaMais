import { Link } from "react-router-dom";
import BrandLogo from "../BrandLogo";
import Navbar from "../Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

function AuthLayout({ title, description, children }) {
  const pageKey = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <main className={`auth-saas-page auth-saas-page-${pageKey}`}>
      <Navbar />

      <section className="auth-saas-shell" aria-label={title}>
        <div className="auth-saas-copy">
          <Link className="auth-saas-copy-logo" to="/" aria-label="VemAprovar - início">
            <BrandLogo variant="white" />
          </Link>
          <span className="auth-saas-badge">Área do candidato</span>
          <h1>Entre no ritmo certo para passar.</h1>
          <p>
            Acesse seu plano, acompanhe metas, revise conteúdos e mantenha sua
            rotina de estudos organizada em um só lugar.
          </p>
        </div>

        <Card className="auth-saas-card">
          <CardHeader className="auth-saas-header">
            <Link className="auth-saas-logo" to="/" aria-label="VemAprovar - início">
              <BrandLogo />
            </Link>
            <CardTitle className="auth-saas-title">{title}</CardTitle>
            <CardDescription className="auth-saas-description">{description}</CardDescription>
          </CardHeader>
          <CardContent className="auth-saas-content">{children}</CardContent>
        </Card>
      </section>
    </main>
  );
}

export default AuthLayout;
