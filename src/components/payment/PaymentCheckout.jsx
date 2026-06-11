import { AlertCircle, CheckCircle2, Clock3, Copy, CreditCard, QrCode, ShieldCheck, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../../contexts";
import { supabase } from "../../lib/supabase";
import {
  createCardSubscription,
  createDebitPayment,
  createMercadoPagoCardToken,
  createPixPayment,
  paymentPlans,
  verifyPremiumAccess,
} from "../../services/paymentService";

const emptyCard = {
  cardNumber: "",
  cardholderName: "",
  expiration: "",
  securityCode: "",
  identificationType: "CPF",
  identificationNumber: "",
};

function PaymentCheckout() {
  const navigate = useNavigate();
  const { isAuthenticated, refreshProfile, user } = useUser();
  const [open, setOpen] = useState(false);
  const [planId, setPlanId] = useState("essencial");
  const [method, setMethod] = useState("pix");
  const [pix, setPix] = useState(null);
  const [card, setCard] = useState(emptyCard);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [paymentState, setPaymentState] = useState("idle");
  const [lastPaymentStatus, setLastPaymentStatus] = useState("");
  const [trackedPaymentId, setTrackedPaymentId] = useState("");

  const plan = useMemo(() => paymentPlans[planId] || paymentPlans.essencial, [planId]);
  const isSandboxPix = pix && pix.live_mode === false;
  let pixExpiration = "";
  if (pix?.date_of_expiration) {
    const date = new Date(pix.date_of_expiration);
    if (!Number.isNaN(date.getTime())) {
      pixExpiration = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    }
  }

  useEffect(() => {
    const openCheckout = (event) => {
      setPlanId(event.detail?.planId || "essencial");
      setMethod("pix");
      setPix(null);
      setStatusText("");
      setPaymentState("idle");
      setLastPaymentStatus("");
      setTrackedPaymentId("");
      setOpen(true);
    };
    window.addEventListener("aprova:open-checkout", openCheckout);
    return () => window.removeEventListener("aprova:open-checkout", openCheckout);
  }, []);

  const confirmBackendAccess = useCallback(async (successMessage = "Acesso liberado.") => {
    const access = await verifyPremiumAccess();
    if (access?.ativo) {
      await refreshProfile?.();
      setPaymentState("approved");
      setStatusText(successMessage);
      toast.success(successMessage);
      return true;
    }
    return false;
  }, [refreshProfile]);

  useEffect(() => {
    if (!trackedPaymentId || !supabase || !open) return undefined;
    const timer = window.setInterval(async () => {
      const { data } = await supabase
        .from("pagamentos")
        .select("status")
        .eq("mp_payment_id", trackedPaymentId)
        .maybeSingle();

      if (data?.status) setLastPaymentStatus(data.status);

      if (data?.status === "aprovado") {
        setPaymentState("confirming");
        setStatusText("Pagamento aprovado. Confirmando liberacao segura...");
        const released = await confirmBackendAccess("Pagamento aprovado. Seu acesso foi liberado.");
        if (released) window.clearInterval(timer);
      }

      if (data?.status === "recusado") {
        setPaymentState("rejected");
        setStatusText("Pagamento recusado pelo Mercado Pago. Tente outro metodo.");
        window.clearInterval(timer);
      }
    }, 6000);

    return () => window.clearInterval(timer);
  }, [confirmBackendAccess, open, trackedPaymentId]);

  const close = () => {
    setOpen(false);
    setLoading(false);
    setPix(null);
    setStatusText("");
    setPaymentState("idle");
    setLastPaymentStatus("");
    setTrackedPaymentId("");
    setCard(emptyCard);
  };

  const requireAccount = () => {
    window.localStorage.setItem("aprova-pending-plan", plan.id);
    toast.info("Crie sua conta para vincular o pagamento ao seu acesso.");
    close();
    navigate("/criar-conta");
  };

  const handlePix = async () => {
    if (!isAuthenticated || !user?.id) return requireAccount();
    try {
      setLoading(true);
      setStatusText("Gerando QR Code Pix...");
      setPaymentState("pending");
      const data = await createPixPayment(plan.id);
      setPix(data);
      setTrackedPaymentId(data.mp_payment_id || "");
      setLastPaymentStatus(data.status || "pendente");
      setStatusText(data.live_mode === false
        ? "Pix gerado em ambiente de teste. Banco real nao paga QR Code sandbox."
        : "Pix gerado. Aguardando confirmacao do Mercado Pago.");
    } catch (error) {
      toast.error(error.message || "Nao foi possivel gerar Pix.");
      setStatusText("");
      setPaymentState("idle");
    } finally {
      setLoading(false);
    }
  };

  const handleCard = async (mode) => {
    if (!isAuthenticated || !user?.id) return requireAccount();
    try {
      setLoading(true);
      setStatusText(mode === "credit" ? "Criando assinatura segura..." : "Criando pagamento seguro...");
      setPaymentState("pending");
      const token = await createMercadoPagoCardToken(card);
      const data = mode === "credit"
        ? await createCardSubscription(plan.id, token.id)
        : await createDebitPayment(plan.id, {
            card_token: token.id,
            payment_method_id: token.payment_method_id,
            issuer_id: token.issuer?.id,
            identification: {
              type: card.identificationType || "CPF",
              number: card.identificationNumber.replace(/\D/g, ""),
            },
          });

      setLastPaymentStatus(data.status || "pendente");
      if (data.mp_payment_id) setTrackedPaymentId(data.mp_payment_id);
      if (data.acesso_liberado) {
        const released = await confirmBackendAccess("Pagamento aprovado. Seu acesso foi liberado.");
        if (!released) {
          setStatusText("Pagamento aprovado. Aguardando sincronizacao do acesso.");
        }
      } else {
        toast.info("Pagamento enviado. O acesso libera quando o Mercado Pago confirmar.");
        setStatusText("Aguardando confirmacao do Mercado Pago.");
      }
    } catch (error) {
      toast.error(error.message || "Nao foi possivel processar o cartao.");
      setStatusText("");
      setPaymentState("idle");
    } finally {
      setLoading(false);
    }
  };

  const copyPix = async () => {
    if (!pix?.qr_code) return;
    await navigator.clipboard.writeText(pix.qr_code);
    toast.success("Codigo Pix copiado.");
  };

  if (!open) return null;

  return (
    <div className="payment-checkout-overlay" role="dialog" aria-modal="true" aria-label="Checkout Aprova+">
      <div className="payment-checkout-panel">
        <button className="payment-checkout-close" type="button" onClick={close} aria-label="Fechar checkout">
          <X size={18} />
        </button>

        <div className="payment-checkout-header">
          <span><ShieldCheck size={16} /> Checkout seguro</span>
          <h2>{plan.name}</h2>
          <p>{plan.price} - acesso por {plan.accessDays} dias. O acesso so libera apos confirmacao do Mercado Pago.</p>
        </div>

        <div className={`payment-status-card payment-status-card-${paymentState}`}>
          {paymentState === "approved" ? <CheckCircle2 size={20} /> : paymentState === "rejected" ? <AlertCircle size={20} /> : <Clock3 size={20} />}
          <div>
            <strong>
              {paymentState === "approved"
                ? "Acesso aprovado"
                : paymentState === "rejected"
                  ? "Pagamento recusado"
                  : paymentState === "idle"
                    ? "Escolha a forma de pagamento"
                    : "Aguardando confirmacao"}
            </strong>
            <p>
              {paymentState === "approved"
                ? "Seu perfil foi sincronizado com a confirmacao do backend."
                : paymentState === "rejected"
                  ? "Nenhum acesso foi liberado. Use Pix ou outro cartao."
                  : lastPaymentStatus
                    ? `Status atual: ${lastPaymentStatus}.`
                    : "Pix, credito e debito sao processados pelo Mercado Pago."}
            </p>
          </div>
        </div>

        <div className="payment-method-tabs">
          <button className={method === "pix" ? "active" : ""} type="button" onClick={() => setMethod("pix")}>
            <QrCode size={17} /> Pix
          </button>
          <button className={method === "credit" ? "active" : ""} type="button" onClick={() => setMethod("credit")}>
            <CreditCard size={17} /> Credito
          </button>
          <button className={method === "debit" ? "active" : ""} type="button" onClick={() => setMethod("debit")}>
            <CreditCard size={17} /> Debito
          </button>
        </div>

        {method === "pix" ? (
          <div className="payment-method-body">
            {pix?.qr_code_base64 ? (
              <div className="pix-result">
                {isSandboxPix ? (
                  <div className="payment-warning-card" role="alert">
                    <AlertCircle size={18} />
                    <div>
                      <strong>Pix de teste detectado</strong>
                      <p>
                        Esta cobranca veio do sandbox do Mercado Pago. Apps de banco reais nao pagam esse QR Code.
                        Troque o secret MP_ACCESS_TOKEN no Supabase por uma credencial de producao antes de vender.
                      </p>
                    </div>
                  </div>
                ) : null}
                <img src={`data:image/png;base64,${pix.qr_code_base64}`} alt="QR Code Pix" />
                {pixExpiration ? <p className="pix-expiration">Expira em {pixExpiration}</p> : null}
                <button className="payment-secondary-button" type="button" onClick={copyPix}>
                  <Copy size={16} /> Copiar codigo Pix
                </button>
                {pix.ticket_url ? (
                  <a className="payment-secondary-button payment-ticket-link" href={pix.ticket_url} target="_blank" rel="noreferrer">
                    Abrir cobranca no Mercado Pago
                  </a>
                ) : null}
              </div>
            ) : (
              <button className="payment-primary-button" type="button" onClick={handlePix} disabled={loading}>
                {loading ? "Gerando Pix..." : "Gerar QR Code Pix"}
              </button>
            )}
          </div>
        ) : (
          <div className="payment-card-form">
            <label>
              Numero do cartao
              <input inputMode="numeric" autoComplete="cc-number" value={card.cardNumber} onChange={(event) => setCard({ ...card, cardNumber: event.target.value })} placeholder="0000 0000 0000 0000" />
            </label>
            <label>
              Nome impresso
              <input autoComplete="cc-name" value={card.cardholderName} onChange={(event) => setCard({ ...card, cardholderName: event.target.value })} placeholder="Nome como no cartao" />
            </label>
            <div className="payment-card-row">
              <label>
                Validade
                <input inputMode="numeric" autoComplete="cc-exp" value={card.expiration} onChange={(event) => setCard({ ...card, expiration: event.target.value })} placeholder="MM/AA" />
              </label>
              <label>
                CVV
                <input inputMode="numeric" autoComplete="cc-csc" value={card.securityCode} onChange={(event) => setCard({ ...card, securityCode: event.target.value })} placeholder="123" />
              </label>
            </div>
            <label>
              CPF do titular
              <input inputMode="numeric" value={card.identificationNumber} onChange={(event) => setCard({ ...card, identificationNumber: event.target.value })} placeholder="000.000.000-00" />
            </label>
            <button className="payment-primary-button" type="button" disabled={loading} onClick={() => handleCard(method)}>
              {loading ? "Processando..." : method === "credit" ? "Assinar com credito" : "Pagar com debito"}
            </button>
          </div>
        )}

        {statusText ? <p className="payment-status">{statusText}</p> : null}
        <p className="payment-security-note">A chave secreta e a confirmacao de acesso ficam nas Edge Functions. O numero do cartao e tokenizado pelo SDK oficial do Mercado Pago.</p>
      </div>
    </div>
  );
}

export default PaymentCheckout;
