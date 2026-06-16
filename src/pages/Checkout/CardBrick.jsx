import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createCardSubscription, loadMercadoPagoSdk } from "../../services/paymentService";

/**
 * Renderiza o Mercado Pago CardPayment Brick com botão próprio para controle de loading.
 * O cartão é tokenizado pelo SDK do MP no browser; nunca enviamos o número ao backend.
 */
export default function CardBrick({ plan, validate, user, onSuccess }) {
  const containerRef = useRef(null);
  const controllerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brickError, setBrickError] = useState(null);
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => { onSuccessRef.current = onSuccess; }, [onSuccess]);

  useEffect(() => {
    let alive = true;

    async function init() {
      try {
        const mp = await loadMercadoPagoSdk();
        if (!alive) return;

        const controller = await mp.bricks().create("cardPayment", "mp-card-brick-container", {
          initialization: {
            amount: plan.priceInCents / 100,
            payer: { email: user?.email || "" },
          },
          customization: {
            visual: {
              hidePayButton: true, // usamos nosso próprio botão
              style: { theme: "default" },
            },
            paymentMethods: {
              maxInstallments: 1, // assinaturas são sem parcelamento
            },
          },
          callbacks: {
            onReady: () => {
              if (!alive) return;
              setReady(true);
            },
            onError: (err) => {
              if (!alive) return;
              const msg = err?.message || "Erro no formulário do cartão.";
              setBrickError(msg);
              toast.error(msg);
            },
            onSubmit: async ({ formData }) => {
              if (!alive) return;
              setLoading(true);
              try {
                const data = await createCardSubscription(plan.id, formData.token);
                if (data?.acesso_liberado) {
                  await onSuccessRef.current?.();
                } else {
                  toast.info("Pagamento enviado. O acesso é liberado após confirmação do Mercado Pago.");
                }
              } catch (err) {
                const msg = err?.message || "Não foi possível processar o cartão.";
                toast.error(msg);
                throw err; // necessário para o Brick resetar ao estado de erro
              } finally {
                if (alive) setLoading(false);
              }
            },
          },
        });

        if (alive) controllerRef.current = controller;
      } catch (err) {
        if (!alive) return;
        const msg = err?.message || "Não foi possível carregar o formulário de cartão.";
        setBrickError(msg);
      }
    }

    init();

    return () => {
      alive = false;
      try { controllerRef.current?.unmount?.(); } catch { /* silencia erros de desmonte */ }
      controllerRef.current = null;
    };
  }, []); // executa só na montagem — o plano e user não mudam dentro do checkout

  const handleSubmit = async () => {
    if (!validate()) {
      // Rola até o primeiro campo com erro
      document.getElementById("ck-name")?.closest("section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!controllerRef.current) {
      toast.error("Formulário ainda carregando. Aguarde.");
      return;
    }
    setLoading(true);
    try {
      // submit() aciona o callback onSubmit do Brick (com tokenização MP)
      await controllerRef.current.submit();
    } catch {
      // Erros já tratados no onSubmit; só garantir que loading sai
      setLoading(false);
    }
  };

  if (brickError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <strong>Erro ao carregar formulário:</strong> {brickError}
        <p className="mt-1 text-xs text-red-500">
          Verifique se <code>VITE_MP_PUBLIC_KEY</code> está configurada.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Skeleton enquanto o Brick carrega */}
      {!ready && (
        <div className="space-y-3 py-2">
          {[88, 60, 96].map((w) => (
            <div
              key={w}
              className="h-10 animate-pulse rounded-lg bg-slate-100"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      )}

      {/* Container injetado pelo SDK do Mercado Pago */}
      <div id="mp-card-brick-container" ref={containerRef} style={{ display: ready ? "block" : "none" }} />

      {ready && (
        <>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <span>🔒</span>
            Não armazenamos dados do seu cartão. Tokenização feita pelo Mercado Pago.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["VISA", "MASTER", "ELO", "AMEX", "HIPERCARD"].map((f) => (
              <span
                key={f}
                className="rounded border border-slate-200 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-500"
              >
                {f}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processando...
              </span>
            ) : (
              `Pagar ${plan.price}`
            )}
          </button>
        </>
      )}
    </div>
  );
}
