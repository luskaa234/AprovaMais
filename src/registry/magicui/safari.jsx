export function Safari({ children, className = "", mode = "simple", src, url = "app.aprova.plus", ...props }) {
  return (
    <div className={`magic-safari ${mode === "simple" ? "is-simple" : ""} ${className}`} {...props}>
      <div className="magic-safari-toolbar">
        <div className="magic-safari-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="magic-safari-url">{url}</div>
      </div>
      <div className="magic-safari-screen">
        {src ? <img src={src} alt="" /> : children}
      </div>
    </div>
  );
}
