import { AnimatePresence, motion } from "framer-motion";
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
  const { route } = useInternalRouter();
  const { isLoading, user } = useUser();
  const View =
    (route === "oab" && !isOabFocus(user)) || route === "militar"
      ? DashboardPage
      : views[route] || DashboardPage;

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
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
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
