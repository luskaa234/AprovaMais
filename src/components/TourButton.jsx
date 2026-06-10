import { HelpCircle } from "lucide-react";
import { Button } from "./AppUI";
import { useInternalRouter } from "../contexts";
import { startAppTour, startRouteTour } from "../tours/onboardingManager";

export default function TourButton({
  children = "Como usar esta pagina?",
  route,
  tour = "current",
  variant = "secondary",
  size = "sm",
  className = "",
}) {
  const router = useInternalRouter();
  const activeRoute = route || router?.route || "dashboard";

  const handleClick = () => {
    if (tour === "app") {
      startAppTour({ navigate: router?.navigate, delay: 100 });
      return;
    }
    startRouteTour(activeRoute, { navigate: router?.navigate, delay: 100 });
  };

  return (
    <Button className={className} data-tour="tour-page-help" icon={HelpCircle} onClick={handleClick} size={size} type="button" variant={variant}>
      {children}
    </Button>
  );
}
