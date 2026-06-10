import { useEffect, useRef } from "react";
import { hasCompletedOnboarding, startAppTour } from "../tours/onboardingManager";

export function useOnboarding({ enabled = true, navigate } = {}) {
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || startedRef.current || hasCompletedOnboarding()) return undefined;
    const timer = window.setTimeout(() => {
      startedRef.current = true;
      startAppTour({ navigate, delay: 500 });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [enabled, navigate]);
}
