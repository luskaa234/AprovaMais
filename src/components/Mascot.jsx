import { memo } from "react";
import { cx } from "./AppUI";

const sizes = {
  sm: "size-9",
  md: "size-16",
  lg: "size-28",
  xl: "size-40",
};

const imageSizes = {
  sm: "w-14",
  md: "w-24",
  lg: "w-40",
  xl: "w-56",
};

const Mascot = memo(({ size = "md", className = "", framed = true }) => (
  <div
    className={cx(
      "relative grid shrink-0 place-items-center overflow-hidden",
      sizes[size] || sizes.md,
      framed ? "rounded-lg bg-blue-50 ring-1 ring-blue-100" : "",
      className
    )}
  >
    <img
      alt="Mascote Aprova+"
      className={cx("max-w-none object-contain", imageSizes[size] || imageSizes.md)}
      draggable="false"
      src="/aprova-mascot.png"
    />
  </div>
));

Mascot.displayName = "Mascot";

export default Mascot;
