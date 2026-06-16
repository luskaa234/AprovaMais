/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Dark mode removed — app is always light.
  // Clear any stored dark preference on first load.
  if (typeof window !== "undefined") {
    localStorage.removeItem("aprovamais-theme");
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
  }

  const toggleTheme = useCallback(() => {}, []);
  const setThemeMode = useCallback(() => {}, []);

  const value = useMemo(
    () => ({ theme: "light", isDark: false, toggleTheme, setThemeMode }),
    [toggleTheme, setThemeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useThemeMode = () => useContext(ThemeContext);
