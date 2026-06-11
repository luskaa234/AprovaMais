import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function ResetPassword() {
  return (
    <AuthLayout
      title="Recuperar senha"
      description="Crie uma nova senha segura para voltar ao seu plano."
    >
      <form className="auth-saas-form">
        <div className="auth-field-group">
          <Label htmlFor="new-password">Nova senha</Label>
          <div className="auth-input-wrap">
            <Input id="new-password" type="password" placeholder="Mínimo de 6 caracteres" required />
          </div>
        </div>

        <div className="auth-field-group">
          <Label htmlFor="confirm-new-password">Confirmar nova senha</Label>
          <div className="auth-input-wrap">
            <Input id="confirm-new-password" type="password" placeholder="Repita sua senha" required />
          </div>
        </div>

        <Button className="auth-primary-button" type="submit">
          Salvar nova senha
        </Button>

        <p className="auth-switch-text">
          Ja redefiniu? <Link to="/login">Entrar agora</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
