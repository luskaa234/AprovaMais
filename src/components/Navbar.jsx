import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

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
        <Link className="brand" to="/" aria-label="VemAprovar - início">
          <BrandLogo width={152} height={38} />
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="btn btn-ghost" to="/login" onClick={closeMenu}>
            Entrar
          </Link>
          <Link className="btn nav-cta" to="/criar-conta" onClick={closeMenu}>
            Começar grátis
          </Link>
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

      <div className={`nav-content ${isMenuOpen ? "is-open" : ""}`} id="mobile-navigation">
        <nav className="nav-links-mobile" aria-label="Navegação principal mobile">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <Link className="btn btn-ghost" to="/login" onClick={closeMenu}>
            Entrar
          </Link>
          <Link className="btn nav-cta" to="/criar-conta" onClick={closeMenu}>
            Começar grátis
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
