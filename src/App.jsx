import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AppProviders, useUser } from "./contexts";
import PaymentCheckout from "./components/payment/PaymentCheckout";
import { BrandSplash } from "./components";
import UnifiedApp from "./pages/UnifiedApp";

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminLayout = lazy(() => import("./admin/AdminLayout").then((module) => ({ default: module.AdminLayout })));

function RouteFallback({ label = "Carregando..." }) {
  return (
    <div className="grid min-h-screen place-items-center bg-white p-6 text-center text-sm font-semibold text-slate-500">
      {label}
    </div>
  );
}

function AdminRoute() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <BrandSplash label="Verificando acesso administrativo..." />;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense fallback={<RouteFallback label="Carregando painel administrativo..." />}>
        <AdminLayout standalone />
      </Suspense>
    </main>
  );
}

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<UnifiedApp />} />
            <Route path="/app" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<Register />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/callback" element={<AuthCallback />} />
            <Route path="/esqueci-senha" element={<ForgotPassword />} />
            <Route path="/recuperar-senha" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <PaymentCheckout />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
