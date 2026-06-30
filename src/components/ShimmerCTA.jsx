import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

function ShimmerCTA({
  children = "Comecar agora",
  href,
  className,
  shimmerColor = "#ffffff",
  background = "#1d63c4",
  ...props
}) {
  const Component = href ? "a" : "button";

  return (
    <Component
      className={cn("shimmer-cta", className)}
      href={href}
      type={href ? undefined : "button"}
      style={{
        "--shimmer-color": shimmerColor,
        "--shimmer-bg": background,
      }}
      {...props}
    >
      <span className="shimmer-cta-spark" aria-hidden="true" />
      <span className="shimmer-cta-backdrop" aria-hidden="true" />
      <span className="shimmer-cta-icon">
        <ArrowRight size={18} />
      </span>
      <span className="shimmer-cta-label">{children}</span>
    </Component>
  );
}

export default ShimmerCTA;
