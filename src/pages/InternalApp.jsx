import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Onboarding from "./Onboarding";
import { InternalRouterProvider, useInternalRouter, useUser } from "../contexts";
import { AppShell } from "../layouts";
import { AdminLayout } from "../admin";
import {
  BibliotecaPage,
  CadernoErrosPage,
  DashboardPage,
  FlashcardsPage,
  IAPage,
  LeisSecasPage,
  MapasMentaisPage,
  OABPage,
  PerfilPage,
  PlanoPage,
  QuestoesPage,
  RedacaoPage,
  RevisaoPage,
  SimuladosPage,
  TAFPage,
} from "./index";

const views = {
  dashboard: DashboardPage,
  oab: OABPage,
  questoes: QuestoesPage,
  simulados: SimuladosPage,
  taf: TAFPage,
  plano: PlanoPage,
  revisao: RevisaoPage,
  flashcards: FlashcardsPage,
  mapas: MapasMentaisPage,
  redacao: RedacaoPage,
  erros: CadernoErrosPage,
  biblioteca: BibliotecaPage,
  leis: LeisSecasPage,
  ia: IAPage,
  perfil: PerfilPage,
  admin: AdminLayout,
};

function isOabFocus(user) {
  const objective = String(user?.objective || user?.diagnosticPlan?.objective || "").toLowerCase();
  const target = String(user?.targetContest || user?.contestName || user?.diagnosticPlan?.objectiveLabel || "").toLowerCase();
  return objective === "oab" || target.includes("oab");
}

function InternalRoutes() {
  const { route, direction } = useInternalRouter();
  const { isLoading, user } = useUser();
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  const [refreshToken, setRefreshToken] = useState(0);
  const View =
    (route === "oab" && !isOabFocus(user)) || route === "militar"
      ? DashboardPage
      : views[route] || DashboardPage;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const pageMotion = useMemo(() => {
    if (!isMobile) {
      return {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.22 },
      };
    }
    const offset = direction === "back" ? -34 : 34;
    return {
      initial: { opacity: 0, x: offset },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -offset },
      transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
    };
  }, [direction, isMobile]);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-gray-950 p-6 text-center text-white">
        <div>
          <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <p className="text-sm text-gray-300">Carregando sua area de estudos...</p>
        </div>
      </div>
    );
  }

  if (!user?.onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <AppShell onMobileRefresh={() => setRefreshToken((value) => value + 1)}>
      <AnimatePresence mode="wait">
        <motion.div key={`${route}-${refreshToken}`} {...pageMotion}>
          <View />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

export default function InternalApp() {
  return (
    <InternalRouterProvider>
      <InternalRoutes />
    </InternalRouterProvider>
  );
}
