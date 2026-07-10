import { Navigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { useUser } from "../contexts";

function Login() {
  const { isAuthenticated, isLoading } = useUser();

  if (!isLoading && isAuthenticated) return <Navigate to="/" replace />;

  return (
    <AuthLayout
      title="Bem-vindo"
      description="Entre para continuar sua preparacao."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
