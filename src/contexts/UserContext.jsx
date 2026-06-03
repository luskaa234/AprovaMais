/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { mockUsers } from "../data";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(mockUsers[0]);
  const login = useCallback(async () => setUser(mockUsers[0]), []);
  const logout = useCallback(() => setUser(null), []);
  const updateProfile = useCallback((profile) => setUser((current) => ({ ...current, ...profile })), []);
  const value = useMemo(() => ({ user, isAdmin: user?.role === "admin", isLoading: false, login, logout, updateProfile }), [user, login, logout, updateProfile]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
