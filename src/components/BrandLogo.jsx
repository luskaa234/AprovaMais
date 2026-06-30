/*
 * BrandLogo — renderiza a identidade visual VemAprovar.
 *
 * Quando os assets oficiais PNG forem adicionados em public/brand/:
 *   public/brand/vemaprovar-logo-color.png  (fundo claro)
 *   public/brand/vemaprovar-logo-white.png  (fundo escuro)
 * substitua o bloco <svg> por:
 *   <img src={variant === "white" ? "/brand/vemaprovar-logo-white.png" : "/brand/vemaprovar-logo-color.png"}
 *        alt="VemAprovar" width={width} height={height} style={{ objectFit: "contain" }} />
 */

function BrandLogo({ className = "", width = 154, height = 44, variant = "color", ...props }) {
  const onDark = variant === "white";

  const vFill   = onDark ? "#FFFFFF"  : "#1D63C4";  // letra V: royal (claro) / branco (escuro)
  const aFill   = onDark ? "#BFDBFE"  : "#13386E";  // letra A: navy (claro) / azul-claro (escuro)
  const textFill = onDark ? "#FFFFFF" : "#13386E";  // texto: navy (claro) / branco (escuro)

  return (
    <span
      className={`brand-logo ${className}`}
      style={{ display: "inline-flex", alignItems: "center", width, height }}
      aria-hidden="true"
      {...props}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 170 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-logo-svg"
      >
        <defs>
          <linearGradient id="vaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D63C4" />
            <stop offset="100%" stopColor="#2E97D4" />
          </linearGradient>
        </defs>

        {/* Ícone VA — V com check interno */}
        <path d="M16 4L36 40H28L23 30H10L5 40H1L16 4Z" fill={vFill} />
        <path d="M8 26L14 32L30 13L35 16L14 37L5 29L8 26Z" fill="url(#vaGrad)" />

        {/* Separador + */}
        <rect x="42" y="10" width="6" height="24" rx="3" fill={vFill} opacity="0.7" />
        <rect x="36" y="17" width="20" height="6" rx="3" fill={vFill} opacity="0.7" />

        {/* Nome da marca */}
        <text
          x="62"
          y="30"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="18"
          fontWeight="700"
          fill={textFill}
        >
          VemAprovar
        </text>
      </svg>
    </span>
  );
}

export default BrandLogo;
