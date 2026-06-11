import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { CreditCard, LockKeyhole, LogOut, ShieldCheck, Wrench } from "lucide-react";
import Onboarding from "./Onboarding";
import { InternalRouterProvider, useInternalRouter, useUser } from "../contexts";
import { useOnboarding } from "../hooks/useOnboarding";
import { AppShell } from "../layouts";
import { AdminLayout } from "../admin";
import { Button } from "../components";
import { isSupabaseConfigured } from "../lib/supabase";
import { adminService } from "../services";
import { paymentPlans, startCheckout } from "../services/paymentService";
import {
  AjudaPage,
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
  ajuda: AjudaPage,
  admin: AdminLayout,
};

function OnboardingBootstrap() {
  const { navigate } = useInternalRouter();
  useOnboarding({ navigate });
  return null;
}

function isOabFocus(user) {
  const objective = String(user?.objective || user?.diagnosticPlan?.objective || "").toLowerCase();
  const target = String(user?.targetContest || user?.contestName || user?.diagnosticPlan?.objectiveLabel || "").toLowerCase();
  return objective === "oab" || target.includes("oab");
}

function hasActiveAccess(user) {
  if (!isSupabaseConfigured) return true;
  if (user?.role === "admin") return true;
  if (!user) return false;
  if (!user.planoAtivo) return false;
  if (!user.planoExpiraEm) return true;
  return new Date(user.planoExpiraEm).getTime() > Date.now();
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function TrialExpiredGate() {
  const { logout, user } = useUser();
  const [loadingPlan, setLoadingPlan] = useState("");

  const choosePlan = async (planId) => {
    try {
      setLoadingPlan(planId);
      await startCheckout(planId, user);
    } finally {
      setLoadingPlan("");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(180deg,#f8fbff,#eaf3ff)] px-4 py-8 text-slate-950">
      <section className="w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl shadow-blue-100/70">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-blue-600 p-7 text-white sm:p-10">
            <div className="grid size-14 place-items-center rounded-2xl bg-white/15">
              <LockKeyhole size={28} />
            </div>
            <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">Seu teste gratis terminou.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-50">
              Os 7 dias de acesso completo acabaram{user?.planoExpiraEm ? ` em ${formatDate(user.planoExpiraEm)}` : ""}. Para continuar estudando com plano, questoes, simulados, revisoes e IA, escolha uma assinatura.
            </p>
            <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-blue-50">
              <ShieldCheck className="mb-2" size={20} />
              Seu progresso fica salvo. Assim que o pagamento for confirmado, o app libera novamente.
            </div>
            <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-50 hover:text-white" onClick={logout} type="button">
              <LogOut size={17} />
              Sair da conta
            </button>
          </div>

          <div className="grid gap-4 p-5 sm:p-7 lg:p-10">
            <div>
              <span className="text-xs font-black uppercase tracking-wide text-blue-600">Continuar no Aprova+</span>
              <h2 className="mt-2 text-2xl font-black">Escolha uma assinatura</h2>
              <p className="mt-1 text-sm text-slate-500">Sem perder dados, plano ou historico de estudo.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.values(paymentPlans).map((plan) => (
                <article className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm" key={plan.id}>
                  <span className="text-xs font-black uppercase text-blue-600">{plan.type}</span>
                  <h3 className="mt-2 text-xl font-black">{plan.name}</h3>
                  <strong className="mt-4 block text-3xl font-black">{plan.price}</strong>
                  <p className="mt-2 text-sm text-slate-500">Acesso por {plan.accessDays} dias.</p>
                  <Button className="mt-5 w-full" icon={CreditCard} loading={loadingPlan === plan.id} onClick={() => choosePlan(plan.id)}>
                    Assinar agora
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MaintenanceGate({ message }) {
  const { logout } = useUser();

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(180deg,#f8fbff,#eaf3ff)] px-4 py-8 text-center text-slate-950">
      <section className="w-full max-w-xl rounded-2xl border border-blue-100 bg-white p-8 shadow-2xl shadow-blue-100/70">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Wrench size={28} />
        </div>
        <h1 className="mt-5 text-3xl font-black">Estamos em manutencao</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          {message || "Estamos ajustando a plataforma para melhorar sua experiencia. Volte em instantes."}
        </p>
        <button className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700" onClick={logout} type="button">
          Sair da conta
        </button>
      </section>
    </main>
  );
}

function InternalRoutes() {
  const { route, direction } = useInternalRouter();
  const { isLoading, user } = useUser();
  const [maintenance, setMaintenance] = useState({ enabled: false, message: "" });
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

  useEffect(() => {
    let alive = true;
    adminService.getMaintenance().then((config) => {
      if (alive) setMaintenance(config);
    });
    return () => {
      alive = false;
    };
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

  if (maintenance.enabled && user?.role !== "admin" && route !== "admin") {
    return <MaintenanceGate message={maintenance.message} />;
  }

  if (!user?.onboardingComplete) {
    return <Onboarding />;
  }

  if (!hasActiveAccess(user)) {
    return <TrialExpiredGate />;
  }

  return (
    <AppShell onMobileRefresh={() => setRefreshToken((value) => value + 1)}>
      <OnboardingBootstrap />
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
