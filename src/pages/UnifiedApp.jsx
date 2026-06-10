import Home from "./Home";
import InternalApp from "./InternalApp";
import { useUser } from "../contexts";

export default function UnifiedApp() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-gray-950 p-6 text-center text-white">
        <div>
          <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-gray-300">Carregando Aprova+...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <InternalApp /> : <Home />;
}
