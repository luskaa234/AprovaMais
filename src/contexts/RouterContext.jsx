/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const RouterContext = createContext(null);

export function InternalRouterProvider({ children }) {
  const [route, setRoute] = useState("dashboard");
  const navigate = useCallback((nextRoute) => setRoute(nextRoute), []);
  const value = useMemo(() => ({ route, navigate }), [route, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useInternalRouter = () => useContext(RouterContext);
