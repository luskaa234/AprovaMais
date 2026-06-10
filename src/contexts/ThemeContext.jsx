/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("aprovamais-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("aprovamais-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const setThemeMode = useCallback((nextTheme) => {
    setTheme(nextTheme === "dark" ? "dark" : "light");
  }, []);

  const value = useMemo(() => ({ theme, isDark: theme === "dark", toggleTheme, setThemeMode }), [setThemeMode, theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useThemeMode = () => useContext(ThemeContext);
