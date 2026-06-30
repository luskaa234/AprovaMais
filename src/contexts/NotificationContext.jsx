/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useNotificacoesStore } from "../stores";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [toast, setToast] = useState(null);
  const notifications = useNotificacoesStore((state) => state.notificacoes);
  const adicionar = useNotificacoesStore((state) => state.adicionar);
  const marcarLida = useNotificacoesStore((state) => state.marcarLida);
  const limpar = useNotificacoesStore((state) => state.limpar);
  const addNotification = useCallback((notification) => {
    const next = { id: `local-${Date.now()}`, read: false, type: "info", ...notification };
    adicionar(next);
    setToast(next);
    setTimeout(() => setToast(null), 2200);
  }, [adicionar]);
  const markAsRead = useCallback((id) => marcarLida(id), [marcarLida]);
  const clearAll = useCallback(() => limpar(), [limpar]);
  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const value = useMemo(() => ({ notifications, unreadCount, addNotification, markAsRead, clearAll, toast }), [notifications, unreadCount, addNotification, markAsRead, clearAll, toast]);
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => useContext(NotificationContext);
