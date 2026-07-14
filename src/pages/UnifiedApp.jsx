import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts";
import { DashboardSkeleton } from "../components";
import Home from "./Home";

const InternalApp = lazy(() => import("./InternalApp"));

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

export default function UnifiedApp() {
  const { isAuthenticated, isLoading } = useUser();
  const shouldUseAppOnlyMode = isPwaLaunch();

  if (isLoading) {
    return shouldUseAppOnlyMode ? null : <Home />;
  }

  if (!isAuthenticated && shouldUseAppOnlyMode) {
    return <Navigate to="/login" replace />;
  }

  return (
    isAuthenticated ? (
      <Suspense fallback={<DashboardSkeleton />}>
        <InternalApp />
      </Suspense>
    ) : (
      <Home />
    )
  );
}
