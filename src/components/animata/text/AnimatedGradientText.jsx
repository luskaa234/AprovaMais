function AnimatedGradientText({ className = "", children }) {
  return (
    <span className={`animated-gradient-text ${className}`}>
      {children}
    </span>
  );
}

export default AnimatedGradientText;
