import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, BookOpen, CalendarDays, ChevronsLeft, ChevronsRight, Home, MoreHorizontal, PlusCircle, Search, X } from "lucide-react";
import { Avatar, Input, Toast, cx } from "../components";
import BrandLogo from "../components/BrandLogo";
import TourButton from "../components/TourButton";
import { useInternalRouter, useNotifications, useUser } from "../contexts";
import { navItems } from "./navigation";

function isOabFocus(user) {
  const objective = String(user?.objective || user?.diagnosticPlan?.objective || "").toLowerCase();
  const target = String(user?.targetContest || user?.contestName || user?.diagnosticPlan?.objectiveLabel || "").toLowerCase();
  return objective === "oab" || target.includes("oab");
}

function visibleNavItems(user, isAdmin) {
  return navItems.filter((item) => {
    if (item.key === "ajuda") return false;
    if (item.key === "admin" && !isAdmin) return false;
    if (item.requiresObjective === "oab" && !isOabFocus(user)) return false;
    return true;
  });
}

const mobilePrimaryTabs = ["dashboard", "biblioteca", "questoes", "plano"];

const Sidebar = memo(({ mobile = false, onNavigate, collapsed = false, onToggle }) => {
  const { route, navigate } = useInternalRouter();
  const { user, isAdmin } = useUser();
  const items = useMemo(() => {
    const visible = visibleNavItems(user, isAdmin);
    return mobile
      ? visible.filter((item) => !mobilePrimaryTabs.includes(item.key))
      : visible.filter((item) => item.key !== "perfil");
  }, [isAdmin, mobile, user]);

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
        "flex h-full flex-col",
        mobile
          ? "mobile-more-menu w-full bg-white p-5 pt-4"
          : cx("w-20 border-r border-slate-200 bg-white p-3", !collapsed && "xl:w-72 xl:p-4")
      )}
      style={!mobile ? { transition: "width 200ms ease, padding 200ms ease" } : undefined}
    >
      <div className={cx("flex min-h-12 items-center", mobile ? "mb-3 pr-12" : "mb-6 px-2")}>
        {mobile ? (
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-royal">VemAprovar</p>
            <h2 className="text-2xl font-black text-slate-950">Atalhos</h2>
          </div>
        ) : !collapsed ? (
          <BrandLogo className="internal-brand-logo" />
        ) : null}
      </div>

      <nav className={cx("flex-1 overflow-auto pr-1", mobile ? "space-y-1.5" : "space-y-1")}>
        {items.map(({ key, label, icon: Icon, badge, tourId }) => (
          <button
            className={cx(
              "flex w-full items-center gap-3 rounded-xl text-left font-semibold transition",
              mobile ? "min-h-11 px-3 py-2.5 text-sm" : cx("justify-center px-3 py-2.5 text-sm", !collapsed && "xl:justify-start"),
              route === key
                ? "internal-nav-active bg-royal text-white shadow-lg shadow-royal/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            )}
            data-tour={tourId}
            id={!mobile && tourId ? tourId : undefined}
            key={key}
            onClick={() => handleNavigate(key)}
            type="button"
          >
            <Icon size={mobile ? 18 : 16} strokeWidth={1.7} />
            <span className={cx("min-w-0 flex-1 truncate", mobile ? "block" : collapsed ? "hidden" : "hidden xl:block")}>{label}</span>
            {badge ? (
              <span
                className={cx(
                  "rounded-full bg-royal px-2 py-0.5 text-[10px] font-black text-white",
                  mobile ? "inline-flex" : collapsed ? "hidden" : "hidden xl:inline-flex"
                )}
              >
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      {!mobile && (
        <div className="mt-2 border-t border-slate-100 pt-2">
          <button
            aria-label={collapsed ? "Expandir menu" : "Minimizar menu"}
            className="flex w-full items-center justify-center rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onToggle}
            type="button"
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        </div>
      )}
    </aside>
  );
});
Sidebar.displayName = "Sidebar";

const Topbar = memo(() => {
  const { route, navigate } = useInternalRouter();
  const { user, isAdmin } = useUser();
  const { notifications, unreadCount, markAsRead, clearAll, toast } = useNotifications();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const items = useMemo(() => visibleNavItems(user, isAdmin), [isAdmin, user]);
  const current = items.find((item) => item.key === route);
  const results = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 6),
    [items, query]
  );

  useEffect(() => { setSelectedIndex(0); }, [results]);

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

  const openRoute = useCallback(
    (item) => {
      navigate(item.key);
      setSearchOpen(false);
      setQuery("");
    },
    [navigate]
  );

  const handleSearchKey = useCallback((event) => {
    if (!searchOpen || !results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[selectedIndex] || results[0];
      if (target) openRoute(target);
    }
  }, [openRoute, results, searchOpen, selectedIndex]);

  const searchResults = query ? (
    <div className="topbar-search-results absolute left-0 top-full z-40 mt-2 w-full rounded-2xl p-2 shadow-xl">
      <p className="px-2 py-1 text-xs font-bold">Módulos</p>
      {results.length ? (
        results.map((item, idx) => (
          <button
            className={cx(
              "flex w-full items-center gap-2 rounded-xl p-2 text-left text-sm transition",
              idx === selectedIndex && "bg-royal/10 text-navy"
            )}
            key={item.key}
            onClick={() => openRoute(item)}
            onMouseEnter={() => setSelectedIndex(idx)}
            type="button"
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))
      ) : (
        <p className="px-2 py-2 text-sm">Nenhum módulo encontrado.</p>
      )}
    </div>
  ) : null;

  return (
    <header className="internal-topbar sticky top-0 z-30">
      <Toast toast={toast} />

      <div className="internal-topbar-row">
        <button
          aria-label="Abrir perfil"
            className="mobile-top-profile flex min-w-0 flex-1 items-center gap-2 rounded-xl p-1.5 text-left md:hidden"
          data-tour="tour-perfil"
          onClick={() => navigate("perfil")}
          type="button"
        >
          <Avatar name={user?.name} src={user?.avatarUrl} size="sm" />
          <span className="min-w-0">
            <strong className="block truncate text-sm font-black">{user?.name?.split(" ")?.[0] || "Aluno"}</strong>
            <small className="block truncate text-[11px] font-semibold">{current?.label || "Dashboard"}</small>
          </span>
        </button>

        <div className="internal-topbar-heading hidden min-w-0 md:block">
          <p className="internal-topbar-eyebrow hidden text-xs sm:block">Área interna</p>
          <h1 className="internal-topbar-title truncate text-base font-black md:text-lg">{current?.label || "Dashboard"}</h1>
        </div>

        <div className="topbar-search-wrap relative hidden min-w-0 flex-1 lg:block">
          <Search className="topbar-search-icon absolute left-3 top-1/2 -translate-y-1/2" size={16} />
          <Input
            className="topbar-search-input w-full pl-9 pr-3 xl:pr-16"
            onChange={(event) => {
              setQuery(event.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={handleSearchKey}
            placeholder="Buscar módulo"
            ref={searchRef}
            value={query}
          />
          <span className="topbar-search-shortcut absolute right-3 top-1/2 hidden -translate-y-1/2 rounded px-2 py-1 text-xs xl:block">
            Ctrl K
          </span>
          {searchOpen ? searchResults : null}
        </div>

        <div className="topbar-actions">
          <button
            aria-label={searchOpen ? "Fechar busca" : "Abrir busca"}
            className="topbar-icon-button lg:hidden"
            onClick={() => {
              setSearchOpen((value) => !value);
              window.requestAnimationFrame(() => searchRef.current?.focus());
            }}
            type="button"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <div className="relative">
            <button
              aria-label="Notificações"
              className="topbar-icon-button relative"
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
              <div className="notification-panel absolute right-0 top-full z-40 mt-2 w-[min(20rem,calc(100vw-1rem))] rounded-2xl p-3 shadow-xl">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <strong className="text-sm">Notificações</strong>
                  <button className="text-xs font-bold text-royal" onClick={clearAll} type="button">
                    Marcar como lidas
                  </button>
                </div>
                {notifications.slice(0, 5).map((item) => (
                  <button
                    className="notification-item mb-2 block w-full rounded-xl p-3 text-left text-sm"
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    type="button"
                  >
                    <span className="font-bold">{item.title}</span>
                    <p>{item.message}</p>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <TourButton className="hidden xl:inline-flex" />

          <button
            aria-label="Abrir perfil"
            className="topbar-profile-button hidden min-h-10 items-center gap-2 rounded-xl p-1 pr-3 text-left transition xl:flex"
            data-tour="tour-perfil"
            id="tour-perfil"
            onClick={() => navigate("perfil")}
            type="button"
          >
            <Avatar name={user?.name} src={user?.avatarUrl} />
            <span className="hidden min-w-0 xl:block">
              <strong className="block max-w-32 truncate text-xs font-black">{user?.name || "Aluno"}</strong>
              <small className="block max-w-32 truncate text-[11px] font-semibold">{user?.targetContest || "Perfil"}</small>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="topbar-mobile-search relative lg:hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
          >
            <Search className="topbar-search-icon absolute left-3 top-1/2 -translate-y-1/2" size={16} />
            <Input
              className="topbar-search-input w-full pl-9 pr-3"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKey}
              placeholder="Buscar módulo"
              ref={searchRef}
              value={query}
            />
            {searchResults}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
});
Topbar.displayName = "Topbar";

const BottomNav = memo(({ onMore }) => {
  const { route, navigate } = useInternalRouter();
  const items = useMemo(() => [
    { key: "dashboard", label: "Início", icon: Home, tourId: "tour-dashboard", action: () => navigate("dashboard") },
    { key: "biblioteca", label: "Edital", icon: BookOpen, action: () => navigate("biblioteca") },
    { key: "questoes", label: "Questões", icon: PlusCircle, tourId: "tour-questoes", action: () => navigate("questoes") },
    { key: "plano", label: "Plano", icon: CalendarDays, tourId: "tour-estudos", action: () => navigate("plano") },
    { key: "more", label: "Ver mais", icon: MoreHorizontal, action: onMore },
  ], [navigate, onMore]);

  return (
    <nav className="mobile-bottom-nav xl:hidden" aria-label="Navegação principal">
      {items.map(({ key, label, icon: Icon, action, tourId }) => {
        const active = key === "more" ? !mobilePrimaryTabs.includes(route) : route === key;
        return (
          <motion.button aria-current={active ? "page" : undefined} className={cx(active && "is-active")} data-tour={tourId} key={key} onClick={action} type="button" whileTap={{ scale: 0.94 }}>
            <Icon size={20} strokeWidth={active ? 2.4 : 2} />
            <span>{label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
});
BottomNav.displayName = "BottomNav";

const refreshRoutes = new Set(["dashboard", "questoes"]);

export const AppShell = memo(({ children, onMobileRefresh }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("aprova-sidebar-collapsed") === "true"
  );
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => {
    setSheetMounted(true);
    setMobileOpen(true);
  }, []);
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((v) => {
      const next = !v;
      localStorage.setItem("aprova-sidebar-collapsed", String(next));
      return next;
    });
  }, []);
  const { route, canGoBack, goBack } = useInternalRouter();
  const touchRef = useRef({ x: 0, y: 0, pulling: false, edge: false });

  const resetPull = useCallback(() => {
    window.setTimeout(() => setPullDistance(0), 180);
  }, []);

  const handleTouchStart = useCallback((event) => {
    if (window.innerWidth >= 1280) return;
    const touch = event.touches[0];
    touchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      pulling: refreshRoutes.has(route) && window.scrollY <= 2,
      edge: touch.clientX <= 24,
    };
  }, [route]);

  const handleTouchMove = useCallback((event) => {
    if (window.innerWidth >= 1280) return;
    const touch = event.touches[0];
    const deltaY = touch.clientY - touchRef.current.y;
    const deltaX = touch.clientX - touchRef.current.x;
    if (touchRef.current.pulling && deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
      setPullDistance(Math.min(96, deltaY * 0.48));
    }
  }, []);

  const handleTouchEnd = useCallback((event) => {
    if (window.innerWidth >= 1280) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.x;
    const deltaY = touch.clientY - touchRef.current.y;
    if (touchRef.current.edge && canGoBack && deltaX > 86 && Math.abs(deltaY) < 72) {
      goBack();
      setPullDistance(0);
      return;
    }
    if (pullDistance > 68) {
      setRefreshing(true);
      onMobileRefresh?.();
      window.setTimeout(() => {
        setRefreshing(false);
        resetPull();
      }, 560);
      return;
    }
    resetPull();
  }, [canGoBack, goBack, onMobileRefresh, pullDistance, resetPull]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onTourMenu = (event) => {
      const open = Boolean(event.detail?.open);
      if (open) { setSheetMounted(true); setMobileOpen(true); }
      else { setMobileOpen(false); }
    };
    window.addEventListener("aprova:mobile-menu", onTourMenu);
    return () => window.removeEventListener("aprova:mobile-menu", onTourMenu);
  }, []);

  return (
    <div
      className={cx(
        "internal-app min-h-screen",
        "internal-app-light bg-gray-100 text-gray-950"
      )}
    >
      <aside className="fixed left-0 top-0 hidden h-screen md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </aside>

      {sheetMounted && (
        <motion.div
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm xl:hidden"
          initial={{ opacity: 0 }}
          onClick={closeMobile}
          onAnimationComplete={() => { if (!mobileOpen) setSheetMounted(false); }}
          style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ y: mobileOpen ? 0 : "100%" }}
            className="mobile-more-sheet absolute inset-x-0 bottom-0 max-h-[82svh] rounded-t-[2rem] bg-white shadow-2xl"
            initial={{ y: "100%" }}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: "spring", damping: 30, stiffness: 360 }}
          >
            <div className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-slate-300" />
            <button
              aria-label="Fechar menu"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-500 shadow-sm"
              onClick={closeMobile}
              type="button"
            >
              <X size={21} />
            </button>
            <Sidebar mobile onNavigate={closeMobile} />
          </motion.div>
        </motion.div>
      )}

      <div
        className={cx("md:pl-20", sidebarCollapsed ? "xl:pl-20" : "xl:pl-72")}
        style={{ transition: "padding-left 200ms ease" }}
      >
        <Topbar />
        <main
          className="min-h-[calc(100svh-73px)] bg-slate-50 p-3 sm:p-4 md:p-6"
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          style={{ "--pull-distance": `${pullDistance}px` }}
        >
          <div className={cx("native-pull-indicator", (pullDistance > 8 || refreshing) && "is-visible", refreshing && "is-refreshing")}>
            <span />
            {refreshing ? "Atualizando" : "Puxe para atualizar"}
          </div>
          {children}
        </main>
      </div>
      <BottomNav onMore={openMobile} />
    </div>
  );
});
AppShell.displayName = "AppShell";
