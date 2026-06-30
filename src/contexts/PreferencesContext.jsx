/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useLocalStorage("aprovamais-preferences", {
    studyMode: "foco",
    dailyGoalHours: 3,
    reminderEnabled: true,
    defaultFilter: "todas",
    studyDays: ["segunda", "terca", "quarta", "quinta", "sexta"],
    firstWeekDay: "domingo",
  });
  const updatePreference = useCallback((key, value) => setPreferences((current) => ({ ...current, [key]: value })), [setPreferences]);
  const value = useMemo(() => ({ ...preferences, updatePreference }), [preferences, updatePreference]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export const usePreferences = () => useContext(PreferencesContext);
