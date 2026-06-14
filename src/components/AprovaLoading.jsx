import BrandLogo from "./BrandLogo";

export function BrandSplash({ label = "Carregando VemAprovar" }) {
  return (
    <div className="aprova-loading-splash" role="status" aria-live="polite" aria-label={label}>
      <div className="aprova-loading-brand">
        <BrandLogo />
        <span>VemAprovar</span>
      </div>
      <div className="aprova-loading-bar" aria-hidden="true">
        <span />
      </div>
      <p>{label}</p>
    </div>
  );
}

function SkeletonBlock({ className = "", style }) {
  return <span className={`aprova-loading-skeleton ${className}`} style={style} aria-hidden="true" />;
}

export function DashboardSkeleton({ embedded = false, label = "Preparando sua area de estudos" }) {
  return (
    <div className={`aprova-dashboard-skeleton${embedded ? " is-embedded" : ""}`} role="status" aria-live="polite" aria-label={label}>
      {!embedded ? (
        <aside className="aprova-dashboard-skeleton-side">
          <div className="aprova-loading-brand is-small">
            <BrandLogo />
            <span>VemAprovar</span>
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="aprova-dashboard-skeleton-nav" key={index}>
              <SkeletonBlock className="is-icon" />
              <SkeletonBlock style={{ width: index % 3 === 0 ? 96 : 74 }} />
            </div>
          ))}
        </aside>
      ) : null}

      <main className="aprova-dashboard-skeleton-main">
        <div className="aprova-dashboard-skeleton-top">
          <div>
            <SkeletonBlock className="is-title" />
            <SkeletonBlock className="is-subtitle" />
          </div>
          <SkeletonBlock className="is-pill" />
        </div>

        <div className="aprova-dashboard-skeleton-cards">
          {Array.from({ length: 4 }).map((_, index) => (
            <section className="aprova-dashboard-skeleton-card" key={index}>
              <SkeletonBlock style={{ width: "58%" }} />
              <SkeletonBlock className="is-value" style={{ width: index % 2 ? "46%" : "36%" }} />
            </section>
          ))}
        </div>

        <section className="aprova-dashboard-skeleton-panel">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="aprova-dashboard-skeleton-row" key={index}>
              <SkeletonBlock className="is-avatar" />
              <SkeletonBlock style={{ width: `${44 + index * 8}%` }} />
              <SkeletonBlock style={{ width: 62 }} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export function DashboardGate({ ready, children }) {
  if (!ready) return <DashboardSkeleton embedded />;
  return <div className="aprova-loading-fade-in">{children}</div>;
}
