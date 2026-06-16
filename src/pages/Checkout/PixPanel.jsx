import { AlertCircle, CheckCircle2, Clock, Copy, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";

function useCountdown(expirationISO) {
  const getMs = () =>
    expirationISO ? Math.max(0, new Date(expirationISO).getTime() - Date.now()) : 30 * 60 * 1000;

  const [ms, setMs] = useState(getMs);

  useEffect(() => {
    if (ms <= 0) return;
    const id = setInterval(() => setMs(Math.max(0, new Date(expirationISO || "").getTime() - Date.now())), 1000);
    return () => clearInterval(id);
  }, [expirationISO, ms]);

  return {
    minutes: Math.floor(ms / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
    expired: ms <= 0,
  };
}

export default function PixPanel({ pixData, onSuccess, onCancel }) {
  const [status, setStatus] = useState("waiting"); // waiting | confirmed | rejected
  const [copied, setCopied] = useState(false);
  const { minutes, seconds, expired } = useCountdown(pixData?.date_of_expiration);
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => { onSuccessRef.current = onSuccess; }, [onSuccess]);

  /* Polling: verifica tabela pagamentos a cada 5 s */
  useEffect(() => {
    if (!pixData?.mp_payment_id || !supabase || status === "confirmed") return;

    const timer = setInterval(async () => {
      const { data } = await supabase
        .from("pagamentos")
        .select("status")
        .eq("mp_payment_id", pixData.mp_payment_id)
        .maybeSingle();

      if (data?.status === "aprovado") {
        setStatus("confirmed");
        clearInterval(timer);
        await onSuccessRef.current?.();
      } else if (data?.status === "recusado") {
        setStatus("rejected");
        clearInterval(timer);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [pixData?.mp_payment_id, status]);

  const handleCopy = async () => {
    if (!pixData?.qr_code) return;
    try {
      await navigator.clipboard.writeText(pixData.qr_code);
      setCopied(true);
      toast.success("Código Pix copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Não foi possível copiar. Selecione o código manualmente.");
    }
  };

  const isSandbox = pixData?.live_mode === false;

  return (
    <div className="space-y-4">
      {/* Aviso sandbox */}
      {isSandbox && (
        <div className="flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <p>
            <strong>Ambiente de teste.</strong> Este QR Code não pode ser pago por bancos reais.
            Configure o <code className="rounded bg-amber-100 px-1 text-xs">MP_ACCESS_TOKEN</code> de produção no Supabase.
          </p>
        </div>
      )}

      {/* Status badge */}
      {status === "waiting" && (
        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2.5 text-sm text-blue-700">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          Aguardando confirmação do pagamento...
        </div>
      )}
      {status === "confirmed" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700">
          <CheckCircle2 size={15} />
          Pagamento confirmado! Liberando seu acesso...
        </div>
      )}
      {status === "rejected" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          <AlertCircle size={15} />
          Pagamento recusado. Tente outro método.
        </div>
      )}

      {/* QR Code */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl border-2 border-blue-100 bg-white p-3 shadow-sm">
          <img
            src={`data:image/png;base64,${pixData.qr_code_base64}`}
            alt="QR Code Pix — escaneie com o aplicativo do seu banco"
            width={184}
            height={184}
            className="block"
          />
        </div>

        {/* Countdown */}
        {!expired ? (
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock size={13} />
            Expira em{" "}
            <span className="font-medium tabular-nums text-slate-700">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </p>
        ) : (
          <p className="text-xs font-medium text-red-500">QR Code expirado</p>
        )}
      </div>

      {/* Botão copiar */}
      {pixData.qr_code && (
        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-blue-50 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 active:bg-blue-200"
        >
          <Copy size={15} />
          {copied ? "Código copiado!" : "Copiar código Pix (copia e cola)"}
        </button>
      )}

      {/* Link boleto/cobrança */}
      {pixData.ticket_url && (
        <a
          href={pixData.ticket_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-slate-600"
        >
          <ExternalLink size={12} />
          Abrir cobrança no Mercado Pago
        </a>
      )}

      {/* Trocar método */}
      <button
        type="button"
        onClick={onCancel}
        className="w-full text-center text-xs text-slate-400 hover:text-slate-600"
      >
        ← Trocar forma de pagamento
      </button>
    </div>
  );
}
