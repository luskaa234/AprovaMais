/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { mockNotificacoes } from "../data";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(mockNotificacoes);
  const [toast, setToast] = useState(null);
  const addNotification = useCallback((notification) => {
    const next = { id: `local-${Date.now()}`, read: false, type: "info", ...notification };
    setNotifications((items) => [next, ...items]);
    setToast(next);
    setTimeout(() => setToast(null), 2200);
  }, []);
  const markAsRead = useCallback((id) => setNotifications((items) => items.map((n) => (n.id === id ? { ...n, read: true } : n))), []);
  const clearAll = useCallback(() => setNotifications([]), []);
  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const value = useMemo(() => ({ notifications, unreadCount, addNotification, markAsRead, clearAll, toast }), [notifications, unreadCount, addNotification, markAsRead, clearAll, toast]);
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => useContext(NotificationContext);
