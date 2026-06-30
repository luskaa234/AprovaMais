/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const RouterContext = createContext(null);

export function InternalRouterProvider({ children }) {
  const [{ route, stack, direction }, setRouter] = useState({ route: "dashboard", stack: [], direction: "forward" });
  const navigate = useCallback((nextRoute) => {
    setRouter((current) => {
      if (!nextRoute || nextRoute === current.route) return current;
      return { route: nextRoute, stack: [...current.stack, current.route].slice(-12), direction: "forward" };
    });
  }, []);
  const goBack = useCallback(() => {
    setRouter((current) => {
      const previous = current.stack.at(-1);
      if (!previous) return current;
      return { route: previous, stack: current.stack.slice(0, -1), direction: "back" };
    });
  }, []);
  const value = useMemo(() => ({ route, direction, canGoBack: stack.length > 0, navigate, goBack }), [direction, goBack, navigate, route, stack.length]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useInternalRouter = () => useContext(RouterContext);
