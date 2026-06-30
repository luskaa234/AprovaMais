import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import AuthLayout from "../components/auth/AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua nova senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  });

function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ password }) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      }
      toast.success("Senha redefinida com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Não foi possível redefinir a senha. Solicite um novo link.");
    }
  };

  return (
    <AuthLayout
      title="Redefinir senha"
      description="Crie uma nova senha segura para acessar sua conta."
    >
      <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-field-group">
          <Label htmlFor="new-password">Nova senha</Label>
          <div className="auth-input-wrap">
            <LockKeyhole size={18} />
            <Input
              id="new-password"
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
          {errors.password && <p className="auth-error">{errors.password.message}</p>}
        </div>

        <div className="auth-field-group">
          <Label htmlFor="confirm-new-password">Confirmar nova senha</Label>
          <div className="auth-input-wrap">
            <LockKeyhole size={18} />
            <Input
              id="confirm-new-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repita sua nova senha"
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
          {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword.message}</p>}
        </div>

        <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar nova senha"}
        </Button>

        <Separator />

        <p className="auth-switch-text">
          Já redefiniu? <Link to="/login">Entrar agora</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
