import { BriefcaseBusiness, Camera, Code2 } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Materias", href: "#recursos" },
  { label: "Simulados", href: "#sistema" },
  { label: "Planos", href: "#planos" },
];

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="section-shell landing-footer-inner">
        <div className="landing-footer-brand">
          <img className="landing-footer-logo" src="/logo-light-readable.svg" alt="Aprova+" />
          <p>
            Plataforma de estudos para transformar edital, questoes, metas e
            revisoes em uma rotina clara para passar em concurso.
          </p>
        </div>

        <nav className="landing-footer-links" aria-label="Links do rodape">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="landing-footer-social" aria-label="Redes sociais">
          <a href="#" aria-label="Instagram">
            <Camera size={18} />
          </a>
          <a href="#" aria-label="LinkedIn">
            <BriefcaseBusiness size={18} />
          </a>
          <a href="#" aria-label="GitHub">
            <Code2 size={18} />
          </a>
        </div>
      </div>
      <div className="section-shell landing-footer-bottom">
        <span>Aprova+ 2026. Todos os direitos reservados.</span>
        <span>Planejamento, disciplina e progresso visivel.</span>
      </div>
    </footer>
  );
}

export default Footer;
