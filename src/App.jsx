import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import UnifiedApp from "./pages/UnifiedApp";
import { AppProviders } from "./contexts";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnifiedApp />} />
          <Route path="/app" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route path="/recuperar-senha" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
