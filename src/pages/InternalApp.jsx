import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { CreditCard, LockKeyhole, LogOut, ShieldCheck, Wrench } from "lucide-react";
import Onboarding from "./Onboarding";
import { InternalRouterProvider, useInternalRouter, useUser } from "../contexts";
import { useOnboarding } from "../hooks/useOnboarding";
import { AppShell } from "../layouts";
import { Button, DashboardSkeleton } from "../components";
import { isSupabaseConfigured } from "../lib/supabase";
import { adminService } from "../services";
import { paymentPlans, startCheckout } from "../services/paymentService";

const DashboardPage = lazy(() => import("./Dashboard"));
const CheckoutPage = lazy(() => import("./Checkout"));
const views = {
  dashboard: DashboardPage,
  checkout: CheckoutPage,
  oab: lazy(() => import("./OAB")),
  questoes: lazy(() => import("./Questoes")),
  simulados: lazy(() => import("./Simulados")),
  taf: lazy(() => import("./TAF")),
  plano: lazy(() => import("./Plano")),
  revisao: lazy(() => import("./Revisao")),
  flashcards: lazy(() => import("./Flashcards")),
  mapas: lazy(() => import("./MapasMentais")),
  redacao: lazy(() => import("./Redacao")),
  erros: lazy(() => import("./CadernoErros")),
  biblioteca: lazy(() => import("./Biblioteca")),
  leis: lazy(() => import("./LeisSecas")),
  ia: lazy(() => import("./IA")),
  perfil: lazy(() => import("./Perfil")),
  ajuda: lazy(() => import("./Ajuda")),
  admin: lazy(() => import("../admin/AdminLayout").then((module) => ({ default: module.AdminLayout }))),
};

function OnboardingBootstrap() {
  const { navigate } = useInternalRouter();
  useOnboarding({ navigate });
  return null;
}

function PageFallback() {
  return <DashboardSkeleton embedded label="Carregando tela" />;
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
  if (user.vitalicio) return true;
  if (!user.planoExpiraEm) return false;
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
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8 text-slate-950">
      <section className="w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl shadow-blue-100/70">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-r border-blue-100 bg-white p-7 text-slate-950 sm:p-10">
            <div className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <LockKeyhole size={28} />
            </div>
            <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">Seu teste grátis terminou.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Os 7 dias de acesso completo acabaram{user?.planoExpiraEm ? ` em ${formatDate(user.planoExpiraEm)}` : ""}. Para continuar estudando com plano, questões, simulados, revisões e IA, escolha uma assinatura.
            </p>
            <div className="mt-6 rounded-xl border border-blue-100 bg-slate-50 p-4 text-sm text-slate-600">
              <ShieldCheck className="mb-2" size={20} />
              Seu progresso fica salvo. Assim que o pagamento for confirmado, o app libera novamente.
            </div>
            <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700" onClick={logout} type="button">
              <LogOut size={17} />
              Sair da conta
            </button>
          </div>

          <div className="grid gap-4 p-5 sm:p-7 lg:p-10">
            <div>
              <span className="text-xs font-black uppercase tracking-wide text-blue-600">Continuar no VemAprovar</span>
              <h2 className="mt-2 text-2xl font-black">Escolha uma assinatura</h2>
              <p className="mt-1 text-sm text-slate-500">Sem perder dados, plano ou histórico de estudo.</p>
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
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8 text-center text-slate-950">
      <section className="w-full max-w-xl rounded-2xl border border-blue-100 bg-white p-8 shadow-2xl shadow-blue-100/70">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Wrench size={28} />
        </div>
        <h1 className="mt-5 text-3xl font-black">Estamos em manutenção</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          {message || "Estamos ajustando a plataforma para melhorar sua experiência. Volte em instantes."}
        </p>
        <button className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700" onClick={logout} type="button">
          Sair da conta
        </button>
      </section>
    </main>
  );
}

function InternalRoutes() {
  const { route, direction, navigate } = useInternalRouter();
  const { isLoading, user } = useUser();

  /* Escuta o evento de navegação para checkout — funciona mesmo sem AppShell (ex.: TrialExpiredGate) */
  useEffect(() => {
    const handler = () => navigate("checkout");
    window.addEventListener("aprova:navigate-checkout", handler);
    return () => window.removeEventListener("aprova:navigate-checkout", handler);
  }, [navigate]);
  const [maintenance, setMaintenance] = useState({ enabled: false, message: "" });
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 1279px)").matches);
  const [refreshToken, setRefreshToken] = useState(0);
  const View =
    (route === "oab" && !isOabFocus(user)) || route === "militar"
      ? DashboardPage
      : views[route] || DashboardPage;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1279px)");
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

  if (isLoading) return <DashboardSkeleton label="Carregando sua area de estudos" />;

  if (maintenance.enabled && user?.role !== "admin" && route !== "admin") {
    return <MaintenanceGate message={maintenance.message} />;
  }

  if (!user?.onboardingComplete) {
    return <Onboarding />;
  }

  /* Checkout: página full-screen sem AppShell, acessível mesmo sem acesso ativo */
  if (route === "checkout") {
    return (
      <Suspense fallback={<PageFallback />}>
        <CheckoutPage />
      </Suspense>
    );
  }

  if (!hasActiveAccess(user)) {
    return <TrialExpiredGate />;
  }

  return (
    <AppShell onMobileRefresh={() => setRefreshToken((value) => value + 1)}>
      <OnboardingBootstrap />
      <AnimatePresence mode="wait">
        <motion.div key={`${route}-${refreshToken}`} {...pageMotion}>
          <Suspense fallback={<PageFallback />}>
            <View />
          </Suspense>
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
