import { lazy, Suspense } from "react";
import { useUser } from "../contexts";

const Home = lazy(() => import("./Home"));
const InternalApp = lazy(() => import("./InternalApp"));

function UnifiedFallback({ label = "Carregando Aprova+..." }) {
  return (
    <div className="grid min-h-screen place-items-center bg-gray-950 p-6 text-center text-white">
      <div>
        <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <p className="text-sm text-gray-300">{label}</p>
      </div>
    </div>
  );
}

export default function UnifiedApp() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <UnifiedFallback />;
  }

  return (
    <Suspense fallback={<UnifiedFallback label={isAuthenticated ? "Carregando sua area de estudos..." : "Carregando pagina inicial..."} />}>
      {isAuthenticated ? <InternalApp /> : <Home />}
    </Suspense>
  );
}
