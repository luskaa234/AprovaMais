function BrandLogo({ className = "", width = 154, height = 44, ...props }) {
  return (
    <span className={`brand-logo ${className}`} style={{ width, height }} aria-hidden="true" {...props}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 170 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-logo-svg"
      >
        <defs>
          <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1d63c4" />
            <stop offset="100%" stopColor="#2e97d4" />
          </linearGradient>
        </defs>

        <path d="M16 4L36 40H28L23 30H10L5 40H1L16 4Z" fill="#13386e" />
        <path
          d="M8 26L14 32L30 13L35 16L14 37L5 29L8 26Z"
          fill="url(#brandGradient)"
        />
        <rect x="42" y="10" width="6" height="24" rx="3" fill="#1d63c4" />
        <rect x="36" y="17" width="20" height="6" rx="3" fill="#1d63c4" />
        <text
          x="60"
          y="30"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="18"
          fontWeight="700"
          fill="#FFFFFF"
        >
          VemAprovar
        </text>
      </svg>
    </span>
  );
}

export default BrandLogo;
