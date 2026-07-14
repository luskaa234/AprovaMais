import './SplashScreen.css';

/**
 * Camada visual da splash screen.
 * O controle de tempo/saída fica no SplashGate.
 */
export default function SplashScreen({
  exiting = false,
  message = 'Preparando sua aprovação...',
  showMessage = true,
}) {
  return (
    <section
      className={`va-splash ${exiting ? 'va-splash--exiting' : ''}`}
      aria-label="VemAprovar está carregando"
      aria-live="polite"
    >
      <div className="va-splash__orb va-splash__orb--top" aria-hidden="true" />
      <div className="va-splash__orb va-splash__orb--bottom" aria-hidden="true" />
      <div className="va-splash__grid va-splash__grid--top" aria-hidden="true" />
      <div className="va-splash__grid va-splash__grid--bottom" aria-hidden="true" />
      <div className="va-splash__line va-splash__line--one" aria-hidden="true" />
      <div className="va-splash__line va-splash__line--two" aria-hidden="true" />

      <div className="va-splash__content">
        <div className="va-splash__logo-wrap">
          <div className="va-splash__halo" aria-hidden="true" />
          <img
            className="va-splash__logo"
            src="/branding/vemaprovar-logo-completa.png"
            alt="VemAprovar — Seu plano, sua aprovação"
            draggable="false"
          />
        </div>

        <div className="va-splash__loading" role="status">
          <div className="va-splash__track" aria-hidden="true">
            <span className="va-splash__progress" />
          </div>

          {showMessage && <p className="va-splash__message">{message}</p>}

          <div className="va-splash__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <p className="va-splash__footer">ESTUDE COM ESTRATÉGIA</p>
    </section>
  );
}
