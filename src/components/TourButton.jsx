import { HelpCircle } from "lucide-react";
import { Button } from "./AppUI";
import { useInternalRouter, useUser } from "../contexts";
import { hasCompletedOnboarding, startAppTour, startRouteTour } from "../tours/onboardingManager";

export default function TourButton({
  children = "Como usar esta página?",
  route,
  tour = "current",
  variant = "secondary",
  size = "sm",
  className = "",
  showWhenCompleted = false,
}) {
  const router = useInternalRouter();
  const { updateProfile, user } = useUser();
  const activeRoute = route || router?.route || "dashboard";
  const completed = typeof window !== "undefined" && hasCompletedOnboarding(user);

  if (completed && !showWhenCompleted) return null;

  const handleClick = () => {
    if (tour === "app") {
      startAppTour({
        navigate: router?.navigate,
        delay: 100,
        userId: user?.id || user?.email,
        onComplete: () => updateProfile?.({ tourCompleto: true }),
      });
      return;
    }
    if (route && router?.route !== activeRoute) {
      router?.navigate(activeRoute);
    }
    startRouteTour(activeRoute, { navigate: router?.navigate, delay: route ? 420 : 100 });
  };

  return (
    <Button className={className} data-tour="tour-page-help" icon={HelpCircle} onClick={handleClick} size={size} type="button" variant={variant}>
      {children}
    </Button>
  );
}
