import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { Avatar, Input, Toast, cx } from "../components";
import BrandLogo from "../components/BrandLogo";
import { useInternalRouter, useNotifications, useUser } from "../contexts";
import { navItems } from "./navigation";

const Sidebar = memo(({ mobile = false, onNavigate }) => {
  const { route, navigate } = useInternalRouter();
  const { user, isAdmin } = useUser();
  const items = useMemo(() => navItems.filter((item) => item.key !== "admin" || isAdmin), [isAdmin]);

  const handleNavigate = useCallback(
    (key) => {
      navigate(key);
      onNavigate?.();
    },
    [navigate, onNavigate]
  );

  return (
    <aside
      className={cx(
        "flex h-full flex-col bg-gray-950",
        mobile ? "w-full p-4" : "w-20 border-r border-gray-800 p-3 xl:w-72 xl:p-4"
      )}
    >
      <div className={cx("flex min-h-12 items-center", mobile ? "mb-4 pr-12" : "mb-6 px-2")}>
        <BrandLogo className="internal-brand-logo" />
      </div>

      <nav className={cx("flex-1 overflow-auto pr-1", mobile ? "space-y-1.5" : "space-y-1")}>
        {items.map(({ key, label, icon: Icon, badge }) => (
          <button
            className={cx(
              "flex w-full items-center gap-3 rounded-xl text-left font-semibold transition",
              mobile ? "min-h-11 px-3 py-2.5 text-sm" : "justify-center px-3 py-2.5 text-sm xl:justify-start",
              route === key
                ? "internal-nav-active bg-blue-600 text-white shadow-lg shadow-blue-950/20"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            )}
            key={key}
            onClick={() => handleNavigate(key)}
            type="button"
          >
            <Icon size={mobile ? 18 : 16} strokeWidth={1.7} />
            <span className={cx("min-w-0 flex-1 truncate", mobile ? "block" : "hidden xl:block")}>{label}</span>
            {badge ? (
              <span
                className={cx(
                  "rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-black text-white",
                  mobile ? "inline-flex" : "hidden xl:inline-flex"
                )}
              >
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-3">
        <Avatar name={user?.name} online />
        <div className={cx("min-w-0", mobile ? "block" : "hidden xl:block")}>
          <p className="truncate text-sm font-bold text-white">{user?.name}</p>
          <p className="truncate text-xs text-gray-500">{user?.targetContest}</p>
        </div>
      </div>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";

const Topbar = memo(({ onMenu }) => {
  const { route, navigate } = useInternalRouter();
  const { user } = useUser();
  const { notifications, unreadCount, markAsRead, clearAll, toast } = useNotifications();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchRef = useRef(null);
  const current = navItems.find((item) => item.key === route);
  const results = useMemo(
    () => navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 6),
    [query]
  );

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/92 px-3 py-2.5 backdrop-blur md:px-4 md:py-3">
      <Toast toast={toast} />

      <div className="flex items-center gap-2 md:gap-3">
        <button
          aria-label="Abrir menu"
          className="grid size-10 place-items-center rounded-xl text-gray-300 hover:bg-gray-800 lg:hidden"
          onClick={onMenu}
          type="button"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="hidden text-xs text-gray-500 sm:block">Area interna</p>
          <h1 className="truncate text-base font-black text-white md:text-lg">{current?.label || "Dashboard"}</h1>
        </div>

        <div className="relative">
          <button
            aria-label="Notificacoes"
            className="relative grid size-10 place-items-center rounded-xl text-gray-300 hover:bg-gray-800"
            onClick={() => setNotificationsOpen((value) => !value)}
            type="button"
          >
            <Bell size={20} />
            {unreadCount ? (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {notificationsOpen ? (
            <div className="absolute right-0 top-full z-40 mt-2 w-[min(20rem,calc(100vw-1rem))] rounded-2xl border border-gray-800 bg-gray-950 p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between gap-3">
                <strong className="text-sm text-white">Notificacoes</strong>
                <button className="text-xs text-blue-600" onClick={clearAll} type="button">
                  Marcar como lidas
                </button>
              </div>
              {notifications.slice(0, 5).map((item) => (
                <button
                  className="mb-2 block w-full rounded-xl bg-gray-900 p-3 text-left text-sm"
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  type="button"
                >
                  <span className="font-bold text-white">{item.title}</span>
                  <p className="text-gray-400">{item.message}</p>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-gray-900 p-1 md:flex">
          <Avatar name={user?.name} />
          <ChevronDown className="text-gray-500" size={16} />
        </div>
      </div>

      <div className="relative mt-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <Input
          className="w-full pl-9 pr-3 md:pr-20"
          onChange={(event) => {
            setQuery(event.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Buscar modulo"
          ref={searchRef}
          value={query}
        />
        <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-gray-400 md:block">
          Ctrl K
        </span>

        {searchOpen && query ? (
          <div className="absolute left-0 top-full z-40 mt-2 w-full rounded-2xl border border-gray-800 bg-gray-950 p-2 shadow-xl">
            <p className="px-2 py-1 text-xs font-bold text-gray-500">Modulos</p>
            {results.map((item) => (
              <button
                className="flex w-full items-center gap-2 rounded-xl p-2 text-left text-sm text-gray-300 hover:bg-gray-900"
                key={item.key}
                onClick={() => {
                  navigate(item.key);
                  setSearchOpen(false);
                  setQuery("");
                }}
                type="button"
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
});
Topbar.displayName = "Topbar";

export const AppShell = memo(({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);

  return (
    <div
      className={cx(
        "internal-app min-h-screen",
        "internal-app-light bg-gray-100 text-gray-950"
      )}
    >
      <aside className="fixed left-0 top-0 hidden h-screen lg:block">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ x: 0 }}
              className="h-full w-[min(88vw,360px)]"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 360 }}
            >
              <button
                aria-label="Fechar menu"
                className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-xl bg-gray-900 text-gray-300 shadow-lg"
                onClick={closeMobile}
                type="button"
              >
                <X size={21} />
              </button>
              <Sidebar mobile onNavigate={closeMobile} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="lg:pl-20 xl:pl-72">
        <Topbar onMenu={openMobile} />
        <main className="min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_top_right,#2563eb22,transparent_35rem)] p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
});
AppShell.displayName = "AppShell";
