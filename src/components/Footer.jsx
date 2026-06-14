import { Camera, PlayCircle, Share2 } from "lucide-react";
import BrandLogo from "./BrandLogo";

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Matérias", href: "#recursos" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

const socialLinks = [
  { label: "Instagram", href: "#instagram", icon: Camera },
  { label: "YouTube", href: "#youtube", icon: PlayCircle },
  { label: "LinkedIn", href: "#linkedin", icon: Share2 },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#inicio" aria-label="VemAprovar - início">
            <BrandLogo />
          </a>
          <p>
            Plataforma de planejamento, questões, simulados e acompanhamento
            para candidatos que querem uma preparação mais disciplinada para concursos.
          </p>
        </div>

        <nav className="footer-links" aria-label="Links do rodape">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-social" aria-label="Redes sociais">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a href={social.href} key={social.label} aria-label={social.label}>
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="section-shell footer-bottom">
        <span>© 2026 VemAprovar. Todos os direitos reservados.</span>
        <span>Estudo com estratégia, constância e aprovação.</span>
      </div>
    </footer>
  );
}

export default Footer;
