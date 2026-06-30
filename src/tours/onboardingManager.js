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

function storageKey(userId) {
  return userId ? `${ONBOARDING_STORAGE_KEY}:${userId}` : ONBOARDING_STORAGE_KEY;
}

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

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForTourElement(target, timeout = 1800) {
  if (!target) return null;
  const started = performance.now();
  let element = findTourElement(target);
  while (!element && performance.now() - started < timeout) {
    await wait(80);
    element = findTourElement(target);
  }
  return element || null;
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

function setCompleted(userId) {
  if (userId) localStorage.setItem(storageKey(userId), "true");
  else localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
}

function finishTour(completed, onComplete, userId) {
  if (completed) {
    setCompleted(userId);
    onComplete?.();
  }
  dispatchMobileMenu(false);
  activeDriver?.destroy();
  activeDriver = null;
}

export function hasCompletedOnboarding(user) {
  if (user && Object.prototype.hasOwnProperty.call(user, "tourCompleto")) {
    return user.tourCompleto === true;
  }
  const userKey = user?.id || user?.email;
  if (userKey) return localStorage.getItem(storageKey(userKey)) === "true";
  return localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true";
}

export function resetOnboarding(userId) {
  localStorage.removeItem(storageKey(userId));
  if (!userId) localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}

export function startTour(rawSteps, options = {}) {
  if (typeof window === "undefined" || !rawSteps?.length) return;
  activeDriver?.destroy();

  const { navigate, onComplete, markCompleted = false, delay = 220, userId } = options;
  let instance;
  let finished = false;
  let moving = false;

  const moveTo = async (index, direction = 1) => {
    if (moving || finished) return;
    moving = true;
    const safeIndex = Math.max(0, Math.min(index, rawSteps.length - 1));
    const activeStep = rawSteps[safeIndex];
    prepareStep(activeStep, navigate);
    await wait(isMobile() ? 340 : 180);
    const element = activeStep?.target ? await waitForTourElement(activeStep.target) : null;

    if (activeStep?.target && !element) {
      moving = false;
      const nextIndex = safeIndex + direction;
      if (nextIndex < 0 || nextIndex >= rawSteps.length) {
        finished = true;
        finishTour(markCompleted, onComplete, userId);
        return;
      }
      await moveTo(nextIndex, direction);
      return;
    }

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: isMobile() ? "center" : "nearest", inline: "nearest" });
      await wait(isMobile() ? 260 : 140);
    }

    instance?.moveTo(safeIndex);
    window.setTimeout(() => instance?.refresh(), 120);
    moving = false;
  };

  const complete = () => {
    finished = true;
    finishTour(markCompleted, onComplete, userId);
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
    nextBtnText: "Próximo",
    prevBtnText: "Voltar",
    doneBtnText: "Concluir",
    onNextClick: (_, __, { driver: currentDriver }) => {
      if (currentDriver.isLastStep()) {
        complete();
        return;
      }
      moveTo((currentDriver.getActiveIndex() || 0) + 1, 1);
    },
    onPrevClick: (_, __, { driver: currentDriver }) => {
      moveTo((currentDriver.getActiveIndex() || 0) - 1, -1);
    },
    onCloseClick: () => {
      finished = true;
      finishTour(markCompleted, onComplete, userId);
    },
    onDestroyed: () => {
      dispatchMobileMenu(false);
      if (!finished && markCompleted) {
        setCompleted(userId);
        onComplete?.();
      }
    },
  });

  activeDriver = instance;
  window.setTimeout(() => {
    instance.drive(0);
    moveTo(0, 1);
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
