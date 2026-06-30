import BrandLogo from "../BrandLogo";

const links = [
  { label: "Sobre", href: "#recursos" },
  { label: "Concursos", href: "#concursos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Termos", href: "#" },
  { label: "Privacidade", href: "#" },
  { label: "Contato", href: "#" },
];

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="section-shell landing-footer-inner">
        <div className="landing-footer-brand">
          <BrandLogo width={140} height={36} variant="white" />
          <p>Questões oficiais, plano por edital, TAF e IA.</p>
        </div>

        <nav className="landing-footer-links" aria-label="Links do rodapé">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="section-shell landing-footer-bottom">
        <span>© 2026 VemAprovar. Todos os direitos reservados.</span>
        <span>Questões oficiais, TAF e plano de estudos em uma rotina clara.</span>
      </div>
    </footer>
  );
}

export default Footer;
