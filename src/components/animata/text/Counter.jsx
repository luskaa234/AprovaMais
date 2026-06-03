import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

const Formatter = {
  number: (value) => Intl.NumberFormat("pt-BR").format(+value.toFixed(0)),
  currency: (value) =>
    Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(+value.toFixed(0)),
};

function Counter({
  format = Formatter.number,
  targetValue = 1000,
  direction = "up",
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const isGoingUp = direction === "up";
  const motionValue = useMotionValue(isGoingUp ? 0 : targetValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 80,
  });
  const isInView = useInView(ref, { margin: "0px", once: true });

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    const timer = setTimeout(() => {
      motionValue.set(isGoingUp ? targetValue : 0);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay, isGoingUp, targetValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (value) => {
      if (ref.current) {
        ref.current.textContent = format ? format(value) : String(value);
      }
    });

    return unsubscribe;
  }, [springValue, format]);

  const initialDisplay = format
    ? format(isGoingUp ? 0 : targetValue)
    : String(isGoingUp ? 0 : targetValue);

  return (
    <span ref={ref} className={`counter-value ${className}`}>
      {initialDisplay}
    </span>
  );
}

export default Counter;
