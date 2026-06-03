import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const registerSchema = z
  .object({
    name: z.string().min(1, "Informe seu nome completo."),
    email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail valido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
    terms: z.boolean().refine((value) => value, "Voce precisa aceitar os termos."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

function RegisterForm() {
  const {
    register,
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

  const onSubmit = () => {
    toast.success("Conta criada com sucesso. Bem-vindo ao Aprova+.");
  };

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
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
          <Input id="register-password" type="password" placeholder="Minimo de 6 caracteres" {...register("password")} />
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
        <Checkbox {...register("terms")} />
        <span>Li e aceito os termos de uso da Aprova+.</span>
      </label>
      {errors.terms && <p className="auth-error">{errors.terms.message}</p>}

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        Criar conta
      </Button>

      <Separator />

      <p className="auth-switch-text">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
