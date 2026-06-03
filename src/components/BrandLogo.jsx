function BrandLogo({ className = "" }) {
  return (
    <span className={`brand-logo ${className}`} aria-hidden="true">
      <img className="brand-logo-dark" src="/aprova-logo-dark.svg" alt="" />
      <img className="brand-logo-light" src="/aprova-logo-light.svg" alt="" />
    </span>
  );
}

export default BrandLogo;
