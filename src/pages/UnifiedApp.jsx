import { lazy, Suspense } from "react";
import { useUser } from "../contexts";
import { BrandSplash, DashboardSkeleton } from "../components";

const Home = lazy(() => import("./Home"));
const InternalApp = lazy(() => import("./InternalApp"));

function UnifiedFallback({ label = "Carregando Aprova+..." }) {
  return <BrandSplash label={label} />;
}

export default function UnifiedApp() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <UnifiedFallback />;
  }

  return (
    <Suspense fallback={isAuthenticated ? <DashboardSkeleton /> : <UnifiedFallback label="Carregando pagina inicial..." />}>
      {isAuthenticated ? <InternalApp /> : <Home />}
    </Suspense>
  );
}
