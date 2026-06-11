import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useUser } from "../../contexts";
import AuthCheckoutPanel from "./AuthCheckoutPanel";
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
      localStorage.setItem("aprovamais-session", JSON.stringify({ email, name, loggedAt: new Date().toISOString() }));
      toast.success("Conta criada com sucesso. Bem-vindo ao Aprova+.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Não foi possível criar a conta.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast.error(error.message || "Nao foi possivel continuar com Google.");
    }
  };

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
      <button className="auth-google-button" type="button" onClick={handleGoogleLogin}>
        <span>G</span>
        Continuar com Google
      </button>

      <div className="auth-divider"><span>ou crie com e-mail</span></div>

      <div className="auth-field-group">
        <Label htmlFor="name">Nome completo</Label>
        <div className="auth-input-wrap">
          <UserRound size={18} />
          <Input id="name" type="text" placeholder="Seu nome" {...register("name")} />
        </div>
        {errors.name && <p className="auth-error">{errors.name.message}</p>}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="register-email">E-mail</Label>
        <div className="auth-input-wrap">
          <Mail size={18} />
          <Input id="register-email" type="email" placeholder="voce@email.com" {...register("email")} />
        </div>
        {errors.email && <p className="auth-error">{errors.email.message}</p>}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="register-password">Senha</Label>
        <div className="auth-input-wrap">
          <LockKeyhole size={18} />
          <Input id="register-password" type="password" placeholder="Mínimo de 6 caracteres" {...register("password")} />
        </div>
        {errors.password && <p className="auth-error">{errors.password.message}</p>}
      </div>

      <div className="auth-field-group">
        <Label htmlFor="confirm-password">Confirmar senha</Label>
        <div className="auth-input-wrap">
          <LockKeyhole size={18} />
          <Input id="confirm-password" type="password" placeholder="Repita sua senha" {...register("confirmPassword")} />
        </div>
        {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword.message}</p>}
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
        <span>Li e aceito os termos de uso da Aprova+.</span>
      </label>
      {errors.terms && <p className="auth-error">{errors.terms.message}</p>}

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        Criar conta
      </Button>

      <Separator />

      <AuthCheckoutPanel />

      <p className="auth-switch-text">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
