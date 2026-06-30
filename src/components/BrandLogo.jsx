function BrandLogo({ className = "", width = 154, height = 44, variant = "color", showText, ...props }) {
  const onDark = variant === "white";
  const shouldShowText = showText ?? width >= 96;
  const markSrc = onDark ? "/brand/vemaprovar-monograma-white.png" : "/brand/vemaprovar-monograma.png";
  const markWidth = shouldShowText ? Math.min(Math.round(height * 1.25), Math.round(width * 0.32)) : width;
  const fontSize = Math.max(10, Math.min(19, Math.round(height * 0.36), Math.round(width / 10.3)));

  return (
    <span
      className={`brand-logo ${onDark ? "brand-logo-on-dark" : "brand-logo-on-light"} ${shouldShowText ? "" : "brand-logo-mark-only"} ${className}`}
      style={{
        "--brand-logo-width": `${width}px`,
        "--brand-logo-height": `${height}px`,
        "--brand-logo-mark-width": `${markWidth}px`,
        "--brand-logo-font-size": `${fontSize}px`,
        "--brand-logo-text": onDark ? "#ffffff" : "#13386e",
      }}
      aria-hidden="true"
      {...props}
    >
      <img className="brand-logo-mark" src={markSrc} alt="" draggable="false" />
      {shouldShowText ? <span className="brand-logo-word">VemAprovar</span> : null}
    </span>
  );
}

export default BrandLogo;
