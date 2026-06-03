import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const loginSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail valido."),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
  remember: z.boolean().optional(),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = () => {
    toast.success("Login simulado com sucesso.");
  };

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-field-group">
        <Label htmlFor="email">E-mail</Label>
        <div className="auth-input-wrap">
          <Mail size={18} />
          <Input id="email" type="email" placeholder="voce@email.com" {...register("email")} />
        </div>
        {errors.email && <p className="auth-error">{errors.email.message}</p>}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="password">Senha</Label>
        <div className="auth-input-wrap">
          <LockKeyhole size={18} />
          <Input id="password" type="password" placeholder="Sua senha" {...register("password")} />
          <Eye size={17} className="auth-input-action" />
        </div>
        {errors.password && <p className="auth-error">{errors.password.message}</p>}
      </div>

      <div className="auth-form-row">
        <label className="auth-check-label">
          <Checkbox {...register("remember")} />
          <span>Lembrar de mim</span>
        </label>
        <Link to="/esqueci-senha">Esqueci minha senha</Link>
      </div>

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        Entrar
      </Button>

      <Separator />

      <p className="auth-switch-text">
        Ainda nao tem uma conta? <Link to="/criar-conta">Criar conta</Link>
      </p>
    </form>
  );
}

export default LoginForm;
