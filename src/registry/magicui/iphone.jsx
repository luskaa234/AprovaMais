import BrandLogo from "../../components/BrandLogo";

export function Iphone({ children, className = "", src, ...props }) {
  return (
    <div className={`magic-iphone ${className}`} {...props}>
      <div className="magic-iphone-screen">
        {src ? <img src={src} alt="" /> : children || <DefaultIphoneScreen />}
      </div>
      <div className="magic-iphone-notch" aria-hidden="true" />
    </div>
  );
}

function DefaultIphoneScreen() {
  return (
    <div className="magic-iphone-default-screen">
      <div className="magic-iphone-status">
        <strong>23:49</strong>
        <div aria-hidden="true">
          <span className="signal" />
          <span className="wifi" />
          <span className="battery" />
        </div>
      </div>

      <main className="magic-iphone-page">
        <header className="magic-iphone-mobile-nav">
          <BrandLogo width={100} height={26} />
          <a href="/criar-conta">Comecar gratis</a>
          <button type="button" aria-label="Menu">
            <i />
            <i />
            <i />
          </button>
        </header>

        <section className="magic-iphone-hero-copy">
          <span className="magic-iphone-live">
            <i />
            830 alunos estudando agora
          </span>
          <h3>
            Sua aprovação começa com o <span>plano certo.</span>
          </h3>
          <p>
            Assistente, questoes e cronograma por edital, tudo em um metodo
            feito para passar de verdade.
          </p>
          <a className="magic-iphone-primary" href="/criar-conta">
            Montar meu plano grátis
          </a>
          <a className="magic-iphone-secondary" href="#como-funciona">
            Ver como funciona na prática
          </a>

          <div className="magic-iphone-proof">
            <div>
              {["LA", "CM", "FS", "BR", "AN"].map((initials) => (
                <b key={initials}>{initials}</b>
              ))}
            </div>
            <strong>+7.5k alunos em preparo</strong>
            <small>7 dias grátis, sem cartão</small>
          </div>
        </section>

        <section className="magic-iphone-next-section">
          <span>Ver na pratica</span>
          <h4>Veja o metodo em minutos</h4>
        </section>
      </main>

      <div className="magic-iphone-browser-bar" aria-hidden="true">
        <button type="button">‹</button>
        <span>vemaprovar.com</span>
        <button type="button">↻</button>
        <button type="button">...</button>
      </div>
    </div>
  );
}
