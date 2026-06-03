import { AnimatePresence, motion } from "framer-motion";
import { AppProviders, InternalRouterProvider, useInternalRouter } from "../contexts";
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

function InternalRoutes() {
  const { route } = useInternalRouter();
  const View = views[route] || DashboardPage;
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
    <AppProviders>
      <InternalRouterProvider>
        <InternalRoutes />
      </InternalRouterProvider>
    </AppProviders>
  );
}
