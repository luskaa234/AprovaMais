import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
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

const registerSchema = z
  .object({
    name: z.string().min(1, "Informe seu nome completo."),
    email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
    terms: z.boolean().refine((value) => value, "Você precisa aceitar os termos."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

function RegisterForm() {
  const navigate = useNavigate();
  const { loginWithGoogle, register: createAccount } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async ({ name, email, password }) => {
    try {
      await createAccount(name, email, password);
      toast.success("Conta criada! Seus 7 dias grátis foram iniciados.");
      navigate("/");
      setTimeout(() => {
        toast.info(`Confirme seu e-mail (${email}) quando puder — não é necessário para usar o app.`, {
          duration: 8000,
        });
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Não foi possível criar a conta.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast.error(error.message || "Não foi possível continuar com Google.");
    }
  };

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
      <button className="auth-google-button" type="button" onClick={handleGoogleLogin}>
        <span>G</span>
        Continuar com Google
      </button>

      <div className="auth-divider"><span>ou crie com e-mail</span></div>

      <div className="auth-trial-note">
        <strong>7 dias grátis para testar tudo.</strong>
        <span>Sem compromisso. Os planos pagos ficam na página inicial.</span>
      </div>

      <div className="auth-field-group">
        <Label htmlFor="name">Nome completo</Label>
        <div className="auth-input-wrap">
          <UserRound size={18} />
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            autoComplete="name"
            {...register("name")}
          />
        </div>
        {errors.name ? <p className="auth-error">{errors.name.message}</p> : null}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="register-email">E-mail</Label>
        <div className="auth-input-wrap">
          <Mail size={18} />
          <Input
            id="register-email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        {errors.email ? <p className="auth-error">{errors.email.message}</p> : null}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="register-password">Senha</Label>
        <div className="auth-input-wrap">
          <LockKeyhole size={18} />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo de 6 caracteres"
            autoComplete="new-password"
            {...register("password")}
          />
          <button
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={showPassword}
            className="auth-input-action"
            onClick={() => setShowPassword((v) => !v)}
            type="button"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.password ? <p className="auth-error">{errors.password.message}</p> : null}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="confirm-password">Confirmar senha</Label>
        <div className="auth-input-wrap">
          <LockKeyhole size={18} />
          <Input
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            placeholder="Repita sua senha"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          <button
            aria-label={showConfirm ? "Ocultar confirmação" : "Mostrar confirmação"}
            aria-pressed={showConfirm}
            className="auth-input-action"
            onClick={() => setShowConfirm((v) => !v)}
            type="button"
          >
            {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.confirmPassword ? <p className="auth-error">{errors.confirmPassword.message}</p> : null}
      </div>

      <label className="auth-check-label auth-terms">
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          )}
        />
        <span>Li e aceito os termos de uso do VemAprovar.</span>
      </label>
      {errors.terms ? <p className="auth-error">{errors.terms.message}</p> : null}

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Criando conta..." : "Começar teste grátis"}
      </Button>

      <Separator />

      <p className="auth-switch-text">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
