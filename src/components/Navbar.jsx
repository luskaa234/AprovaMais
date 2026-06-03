import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Matérias", href: "/#recursos" },
  { label: "Simulados", href: "/#sistema" },
  { label: "Planos", href: "/#planos" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a className="brand" href="/" aria-label="Aprova+ - início">
          <img
            src="/logo-light-readable.svg"
            alt="Aprova+"
            style={{ height: "32px", width: "auto" }}
          />
        </a>

        <nav className="nav-links" aria-label="Navegacao principal">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-ghost" href="/login" onClick={closeMenu}>
            Entrar
          </a>
          <a className="btn nav-cta" href="/criar-conta" onClick={closeMenu}>
            Começar grátis
          </a>
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`nav-content ${isMenuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
      >
        <nav className="nav-links-mobile" aria-label="Navegacao principal mobile">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
