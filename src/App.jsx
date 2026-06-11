import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import UnifiedApp from "./pages/UnifiedApp";
import { AppProviders, useUser } from "./contexts";
import PaymentCheckout from "./components/payment/PaymentCheckout";
import { AdminLayout } from "./admin";

function AdminRoute() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
        <div>
          <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">Verificando acesso administrativo...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <main className="min-h-screen bg-slate-50">
      <AdminLayout standalone />
    </main>
  );
}

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
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
        <PaymentCheckout />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
