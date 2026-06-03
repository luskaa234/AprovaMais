import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail.").email("Informe um e-mail valido."),
});

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    toast.success("Link de recuperacao enviado. Verifique seu e-mail.");
  };

  return (
    <form className="auth-saas-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth-field-group">
        <Label htmlFor="forgot-email">E-mail cadastrado</Label>
        <div className="auth-input-wrap">
          <Mail size={18} />
          <Input id="forgot-email" type="email" placeholder="voce@email.com" {...register("email")} />
        </div>
        {errors.email && <p className="auth-error">{errors.email.message}</p>}
      </div>

      <Button className="auth-primary-button" type="submit" disabled={isSubmitting}>
        Enviar link de recuperacao
      </Button>

      <Separator />

      <p className="auth-switch-text">
        Lembrou sua senha? <Link to="/login">Voltar ao login</Link>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
