import { Link } from "react-router-dom";
import BrandLogo from "../BrandLogo";
import Navbar from "../Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

function AuthLayout({ title, description, children }) {
  return (
    <main className="auth-saas-page">
      <Navbar />

      <section className="auth-saas-shell" aria-label={title}>
        <div className="auth-saas-copy">
          <Link className="auth-saas-copy-logo" to="/" aria-label="Aprova+ - inicio">
            <BrandLogo />
          </Link>
          <span className="auth-saas-badge">Area do candidato</span>
          <h1>Entre no ritmo certo para passar.</h1>
          <p>
            Acesse seu plano, acompanhe metas, revise conteudos e mantenha sua
            rotina de estudos organizada em um so lugar.
          </p>
        </div>

        <Card className="auth-saas-card">
          <CardHeader className="auth-saas-header">
            <Link className="auth-saas-logo" to="/" aria-label="Aprova+ - inicio">
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
