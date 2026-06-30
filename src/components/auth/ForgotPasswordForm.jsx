import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail válido."),
});

function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const redirectTo = `${window.location.origin}/auth/callback?next=/recuperar-senha`;
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) throw error;
      }
      setSentEmail(email);
      setSent(true);
    } catch (error) {
      toast.error(error.message || "Não foi possível enviar o link. Tente novamente.");
    }
  };

  if (sent) {
    return (
      <div className="auth-saas-form">
        <div style={{ display: "grid", gap: "10px", padding: "8px 0 4px", textAlign: "center" }}>
          <CheckCircle2
            size={44}
            style={{ margin: "0 auto", color: "var(--status-success, #16a34a)" }}
          />
          <strong style={{ fontSize: "1.1rem", color: "var(--aprova-ink, #0f172a)" }}>
            Link enviado com sucesso!
          </strong>
          <p style={{ color: "var(--aprova-muted, #64748b)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Verifique sua caixa de entrada em{" "}
            <strong style={{ color: "var(--aprova-ink, #0f172a)" }}>{sentEmail}</strong>{" "}
            e clique no link para criar uma nova senha.
          </p>
          <p style={{ color: "var(--aprova-muted, #64748b)", fontSize: "0.82rem" }}>
            Não recebeu? Confira a pasta de spam ou aguarde alguns minutos.
          </p>
        </div>

        <Separator />

        <p className="auth-switch-text">
          Lembrou sua senha? <Link to="/login">Voltar ao login</Link>
        </p>
      </div>
    );
  }

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-field-group">
        <Label htmlFor="forgot-email">E-mail cadastrado</Label>
        <div className="auth-input-wrap">
          <Mail size={18} />
          <Input
            id="forgot-email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        {errors.email && <p className="auth-error">{errors.email.message}</p>}
      </div>

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
      </Button>

      <Separator />

      <p className="auth-switch-text">
        Lembrou sua senha? <Link to="/login">Voltar ao login</Link>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
