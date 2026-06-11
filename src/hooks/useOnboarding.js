import { useEffect, useRef } from "react";
import { useUser } from "../contexts";
import { hasCompletedOnboarding, startAppTour } from "../tours/onboardingManager";

export function useOnboarding({ enabled = true, navigate } = {}) {
  const startedRef = useRef(false);
  const { isLoading, updateProfile, user } = useUser();

  useEffect(() => {
    if (!enabled || isLoading || startedRef.current || !user?.onboardingComplete || hasCompletedOnboarding(user)) return undefined;
    const timer = window.setTimeout(() => {
      startedRef.current = true;
      startAppTour({
        navigate,
        delay: 500,
        userId: user?.id || user?.email,
        onComplete: () => updateProfile?.({ tourCompleto: true }),
      });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [enabled, isLoading, navigate, updateProfile, user]);
}
