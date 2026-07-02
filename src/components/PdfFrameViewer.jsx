import { useCallback, useEffect, useRef, useState } from "react";
import { Download, FileText } from "lucide-react";
import { cx } from "./AppUI";
import { useMediaQuery } from "../hooks";

const LOAD_TIMEOUT_MS = 6000;

function buildViewerUrl(url) {
  if (!url) return "";
  return url.startsWith("http") ? `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true` : url;
}

/**
 * Google Docs Viewer falha silenciosamente (tela em branco) em muitos
 * navegadores mobile/WebView. No celular pulamos direto pro fallback de
 * abrir/baixar o arquivo; no desktop, damos um tempo pro iframe carregar
 * e caimos no mesmo fallback se o onLoad nao disparar a tempo.
 */
// Chame com `key={url}` no componente-pai: cada URL de PDF deve remontar o
// componente do zero, para o temporizador de fallback reiniciar corretamente.
export function PdfFrameViewer({ url, title, className }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [timedOut, setTimedOut] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isMobile) return undefined;
    timeoutRef.current = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timeoutRef.current);
  }, [isMobile]);

  const openDirect = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  const showFallback = isMobile || timedOut;

  if (showFallback) {
    return (
      <div className={cx("flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center", className)}>
        <FileText className="text-slate-300" size={44} />
        <div>
          <p className="font-bold text-slate-700">Apostila em PDF</p>
          <p className="mt-1 text-sm text-slate-500">Abra o arquivo direto para uma leitura confiável no celular.</p>
        </div>
        <button
          onClick={openDirect}
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Download size={14} />
          Abrir apostila
        </button>
      </div>
    );
  }

  return (
    <iframe
      key={url}
      src={buildViewerUrl(url)}
      title={title}
      className={cx("h-full w-full border-0", className)}
      allow="fullscreen"
      onLoad={() => window.clearTimeout(timeoutRef.current)}
    />
  );
}
