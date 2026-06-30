import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <AuthLayout
      title="Entrar"
      description="Acesse sua conta e continue seu plano de estudos."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
