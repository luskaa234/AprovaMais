import { lazy, Suspense } from "react";
import { useUser } from "../contexts";
import { DashboardSkeleton } from "../components";
import Home from "./Home";

const InternalApp = lazy(() => import("./InternalApp"));

export default function UnifiedApp() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return <Home />;

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
