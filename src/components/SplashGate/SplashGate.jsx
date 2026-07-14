import { useEffect, useRef, useState } from "react";
import SplashScreen from "../SplashScreen/SplashScreen";

const MOBILE_SPLASH_QUERY = "(max-width: 820px)";

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(MOBILE_SPLASH_QUERY).matches || window.innerWidth <= 820;
}

function isPwaLaunch() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("pwa") === "1" ||
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.matchMedia?.("(display-mode: fullscreen)")?.matches ||
    window.navigator?.standalone === true
  );
}

function shouldEnableSplash({ mobileOnly, pwaOnly }) {
  if (mobileOnly && !isMobileViewport()) return false;
  if (pwaOnly && !isPwaLaunch()) return false;
  return true;
}

export default function SplashGate({
  children,
  ready = true,
  minDuration = 700,
  maxDuration = 1200,
  fadeDuration = 260,
  message = "Abrindo VemAprovar",
  mobileOnly = false,
  pwaOnly = false,
  onSplashEnd,
}) {
  const [enabled] = useState(() => shouldEnableSplash({ mobileOnly, pwaOnly }));
  const [visible, setVisible] = useState(enabled);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(null);
  const finishing = useRef(false);

  useEffect(() => {
    if (!enabled || !visible || typeof document === "undefined") return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyBackground = body.style.background;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.background = "#061b3d";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.background = previousBodyBackground;
    };
  }, [enabled, visible]);

  useEffect(() => {
    if (!enabled || !visible) return undefined;

    let waitTimer;
    let removeTimer;

    if (startedAt.current === null) {
      startedAt.current = Date.now();
    }

    const finish = () => {
      if (finishing.current) return;
      finishing.current = true;
      setExiting(true);

      removeTimer = window.setTimeout(() => {
        setVisible(false);
        onSplashEnd?.();
      }, fadeDuration);
    };

    if (ready) {
      const elapsed = Date.now() - startedAt.current;
      const remainingMinimum = Math.max(0, minDuration - elapsed);
      waitTimer = window.setTimeout(finish, Math.min(maxDuration, remainingMinimum));
    }

    return () => {
      window.clearTimeout(waitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [enabled, ready, minDuration, maxDuration, fadeDuration, onSplashEnd, visible]);

  if (!enabled) return children;

  return (
    <>
      {visible ? <SplashScreen exiting={exiting} message={message} /> : null}
      {!visible ? children : null}
    </>
  );
}
