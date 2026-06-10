import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { appTour } from "./appTour";
import { dashboardTour } from "./dashboardTour";
import { studiesTour } from "./studiesTour";
import { simuladosTour } from "./simuladosTour";
import { questoesTour } from "./questoesTour";
import { redacaoTour } from "./redacaoTour";
import { aprovinhoTour } from "./aprovinhoTour";
import { ajudaTour } from "./ajudaTour";
import { perfilTour } from "./perfilTour";
import { flashcardsTour } from "./flashcardsTour";
import { mapasTour } from "./mapasTour";
import { leisTour } from "./leisTour";

export const ONBOARDING_STORAGE_KEY = "aprova_mais_onboarding_completed";

const routeTours = {
  dashboard: dashboardTour,
  plano: studiesTour,
  simulados: simuladosTour,
  questoes: questoesTour,
  redacao: redacaoTour,
  ia: aprovinhoTour,
  ajuda: ajudaTour,
  perfil: perfilTour,
  flashcards: flashcardsTour,
  mapas: mapasTour,
  leis: leisTour,
};

let activeDriver = null;

function isMobile() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

function isVisible(element) {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
}

function findTourElement(target) {
  if (!target || typeof document === "undefined") return undefined;
  const selectors = [`[data-tour="${target}"]`, `#${target}`];
  const matches = selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
  return matches.find(isVisible) || matches[0] || undefined;
}

function dispatchMobileMenu(open) {
  if (!isMobile()) return;
  window.dispatchEvent(new CustomEvent("aprova:mobile-menu", { detail: { open } }));
}

function prepareStep(step, navigate) {
  if (step?.route && typeof navigate === "function") {
    navigate(step.route);
  }
  dispatchMobileMenu(Boolean(step?.mobileMenu));
}

function decoratePopover(popover) {
  popover.closeButton.textContent = "Pular";
}

function buildDriverSteps(rawSteps) {
  return rawSteps.map(({ target, popover = {} }) => ({
    element: target ? () => findTourElement(target) || document.body : undefined,
    popover: {
      ...popover,
      showButtons: ["previous", "next", "close"],
      onPopoverRender: decoratePopover,
    },
  }));
}

function finishTour(completed, onComplete) {
  if (completed) {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    onComplete?.();
  }
  dispatchMobileMenu(false);
  activeDriver?.destroy();
  activeDriver = null;
}

export function hasCompletedOnboarding() {
  return localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true";
}

export function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}

export function startTour(rawSteps, options = {}) {
  if (typeof window === "undefined" || !rawSteps?.length) return;
  activeDriver?.destroy();

  const { navigate, onComplete, markCompleted = false, delay = 220 } = options;
  let instance;

  const moveTo = (index) => {
    const safeIndex = Math.max(0, Math.min(index, rawSteps.length - 1));
    prepareStep(rawSteps[safeIndex], navigate);
    window.setTimeout(() => {
      instance?.moveTo(safeIndex);
      window.setTimeout(() => instance?.refresh(), 80);
    }, isMobile() ? 260 : 120);
  };

  instance = driver({
    steps: buildDriverSteps(rawSteps),
    animate: true,
    smoothScroll: true,
    allowClose: true,
    overlayColor: "#020617",
    overlayOpacity: isMobile() ? 0.5 : 0.56,
    overlayClickBehavior: "close",
    stagePadding: isMobile() ? 4 : 10,
    stageRadius: isMobile() ? 10 : 14,
    popoverClass: "aprova-driver-popover",
    showButtons: ["previous", "next", "close"],
    showProgress: true,
    progressText: "{{current}} de {{total}}",
    nextBtnText: "Proximo",
    prevBtnText: "Voltar",
    doneBtnText: "Concluir",
    onNextClick: (_, __, { driver: currentDriver }) => {
      if (currentDriver.isLastStep()) {
        finishTour(markCompleted, onComplete);
        return;
      }
      moveTo((currentDriver.getActiveIndex() || 0) + 1);
    },
    onPrevClick: (_, __, { driver: currentDriver }) => {
      moveTo((currentDriver.getActiveIndex() || 0) - 1);
    },
    onCloseClick: () => finishTour(false),
    onDestroyed: () => {
      dispatchMobileMenu(false);
    },
  });

  activeDriver = instance;
  prepareStep(rawSteps[0], navigate);
  window.setTimeout(() => {
    instance.drive(0);
    window.setTimeout(() => instance.refresh(), 80);
  }, delay);
}

export function startAppTour(options = {}) {
  startTour(appTour, { ...options, markCompleted: true });
}

export function startRouteTour(route, options = {}) {
  const tour = routeTours[route] || appTour;
  startTour(tour, { ...options, markCompleted: false });
}

export function getRouteTour(route) {
  return routeTours[route];
}
