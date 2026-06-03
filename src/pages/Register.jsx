import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <AuthLayout
      title="Criar conta"
      description="Cadastre-se para montar sua rotina e acompanhar sua evolucao."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
