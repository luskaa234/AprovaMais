import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../../contexts";
import { startCheckout } from "../../services/paymentService";

function AuthCheckoutPanel() {
  const { user } = useUser();

  const handleCheckout = async (plan) => {
    try {
      await startCheckout(plan, user);
    } catch (error) {
      toast.error(error.message || "Nao foi possivel abrir o pagamento.");
    }
  };

  return (
    <div className="auth-checkout-panel">
      <div>
        <span>
          <CreditCard size={15} />
          Assinatura
        </span>
        <strong>Ative seu acesso completo</strong>
      </div>
      <div className="auth-checkout-actions">
        <button type="button" onClick={() => handleCheckout("essencial")}>Mensal</button>
        <button type="button" onClick={() => handleCheckout("pro")}>Anual</button>
      </div>
    </div>
  );
}

export default AuthCheckoutPanel;
