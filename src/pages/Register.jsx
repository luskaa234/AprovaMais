import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <AuthLayout
      title="Criar conta"
      description="Cadastre-se para montar sua rotina e acompanhar sua evolução."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
