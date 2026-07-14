import { Navigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { useUser } from "../contexts";

function Login() {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <main className="auth-route-pending" role="status" aria-live="polite">
        Verificando sessão...
      </main>
    );
  }

  if (!isLoading && isAuthenticated) return <Navigate to="/" replace />;

  return (
    <AuthLayout
      title="Bem-vindo"
      description="Entre para continuar sua preparação."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
