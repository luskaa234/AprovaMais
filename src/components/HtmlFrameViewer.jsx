import { useEffect, useRef, useState } from "react";
import { ExternalLink, FileText, Loader2 } from "lucide-react";
import { cx } from "./AppUI";

/**
 * Renderiza HTML remoto via blob (contorna X-Frame-Options).
 * Supabase Storage serve arquivos .html como text/plain (protecao anti-XSS
 * deles), entao forcamos o type do Blob para text/html para o navegador
 * renderizar em vez de mostrar o codigo-fonte como texto puro.
 */
export function HtmlFrameViewer({ url, title, className, sandbox = "allow-scripts allow-same-origin" }) {
  const iframeRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const blobUrlRef = useRef(null);

  useEffect(() => {
    if (!url) { setStatus("error"); return undefined; }
    setStatus("loading");

    let cancelled = false;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((html) => {
        if (cancelled) return;
        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        if (iframeRef.current) iframeRef.current.src = blobUrl;
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [url]);

  return (
    <div className={cx("relative h-full w-full", className)}>
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50">
          <Loader2 className="animate-spin text-blue-600" size={28} />
          <p className="text-sm text-slate-500">Carregando visualização…</p>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center">
          <FileText className="text-slate-300" size={44} />
          <div>
            <p className="font-bold text-slate-700">Não foi possível carregar o arquivo</p>
            <p className="mt-1 text-sm text-slate-500">Abra em uma nova aba para visualizar.</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <ExternalLink size={14} />
            Abrir em nova aba
          </a>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title={title}
        className={cx("h-full w-full border-0 transition-opacity duration-200", status !== "ready" && "opacity-0")}
        sandbox={sandbox}
        allow="fullscreen"
      />
    </div>
  );
}
