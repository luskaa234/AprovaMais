import "./SplashScreen.css";

export default function SplashScreen({
  exiting = false,
  message = "Abrindo VemAprovar",
  showMessage = true,
}) {
  return (
    <section
      className={`va-splash ${exiting ? "va-splash--exiting" : ""}`}
      aria-label="VemAprovar está carregando"
      aria-live="polite"
      role="status"
    >
      <div className="va-splash__content">
        <img
          className="va-splash__logo"
          src="/branding/vemaprovar-logo-completa.png"
          alt="VemAprovar - Seu plano, sua aprovação"
          width="1296"
          height="840"
          draggable="false"
        />

        <div className="va-splash__loading">
          <span className="va-splash__track" aria-hidden="true">
            <span className="va-splash__progress" />
          </span>
          {showMessage ? <p className="va-splash__message">{message}</p> : null}
        </div>
      </div>
    </section>
  );
}
