import AuthLayout from "../components/auth/AuthLayout";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <AuthLayout
      title="Esqueci minha senha"
      description="Informe seu e-mail para receber um link de recuperacao."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPassword;
