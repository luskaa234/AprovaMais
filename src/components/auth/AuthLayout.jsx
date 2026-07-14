import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const officialLogo = "/branding/vemaprovar-logo-completa.png";

function AuthLayout({ title, description, children }) {
  const pageKey = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <main className={`auth-saas-page auth-native-page auth-centered-page auth-saas-page-${pageKey}`}>
      <Navbar />

      <section className="auth-saas-shell auth-native-shell auth-centered-shell" aria-label={title}>
        <Card className="auth-saas-card auth-native-panel auth-centered-card">
          <CardHeader className="auth-saas-header">
            <Link className="auth-saas-logo auth-official-logo-link" to="/" aria-label="VemAprovar - início">
              <img
                className="auth-official-logo"
                src={officialLogo}
                alt="VemAprovar - Seu plano, sua aprovação"
                width="260"
                height="168"
                draggable="false"
              />
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
