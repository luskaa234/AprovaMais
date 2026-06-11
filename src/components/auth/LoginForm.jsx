import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LockKeyhole, Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useUser } from "../../contexts";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const loginSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
  remember: z.boolean().optional(),
});

function LoginForm() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useUser();
  const {
    register,
    control,
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

  const onSubmit = async ({ email, password, remember }) => {
    try {
      await login(email, password);
      localStorage.setItem(
        "aprovamais-session",
        JSON.stringify({
          email,
          remember: Boolean(remember),
          loggedAt: new Date().toISOString(),
        }),
      );
      toast.success("Login realizado com sucesso.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Não foi possível entrar.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast.error(error.message || "Não foi possível entrar com Google.");
    }
  };

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
      <button className="auth-google-button" type="button" onClick={handleGoogleLogin}>
        <span>G</span>
        Entrar com Google
      </button>

      <div className="auth-divider"><span>ou entre com e-mail</span></div>

      <div className="auth-field-group">
        <Label htmlFor="email">E-mail</Label>
        <div className="auth-input-wrap">
          <Mail size={18} />
          <Input id="email" type="email" placeholder="voce@email.com" {...register("email")} />
        </div>
        {errors.email ? <p className="auth-error">{errors.email.message}</p> : null}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="password">Senha</Label>
        <div className="auth-input-wrap">
          <LockKeyhole size={18} />
          <Input id="password" type="password" placeholder="Sua senha" {...register("password")} />
          <Eye size={17} className="auth-input-action" />
        </div>
        {errors.password ? <p className="auth-error">{errors.password.message}</p> : null}
      </div>

      <div className="auth-form-row">
        <label className="auth-check-label">
          <Controller
            control={control}
            name="remember"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <span>Lembrar de mim</span>
        </label>
        <Link to="/esqueci-senha">Esqueci minha senha</Link>
      </div>

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        Entrar
      </Button>

      <Separator />

      <p className="auth-switch-text">
        Ainda não tem uma conta? <Link to="/criar-conta">Criar conta</Link>
      </p>
    </form>
  );
}

export default LoginForm;
