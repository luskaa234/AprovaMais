import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Download, ExternalLink, FileText, Heart, Image, Loader2, Map, Maximize2, X } from "lucide-react";
import { Badge, Card, cx } from "../../components";

/* ── tipos e estilos ─────────────────────────────────── */

const typeIcon = { "Mapas mentais": Map, Imagem: Image };

const typeColor = {
  Apostila: "bg-blue-50 text-blue-600",
  Ebook: "bg-violet-50 text-violet-600",
  "Prova oficial": "bg-amber-50 text-amber-700",
  Gabarito: "bg-emerald-50 text-emerald-700",
  "Mapas mentais": "bg-cyan-50 text-cyan-700",
  Imagem: "bg-pink-50 text-pink-600",
};

const badgeVariant = {
  Apostila: "info",
  Ebook: "info",
  "Prova oficial": "warning",
  Gabarito: "success",
  "Mapas mentais": "info",
  Imagem: "neutral",
};

/* ── detecção de conteúdo ────────────────────────────── */

function detectType(url = "", tipo = "") {
  const lower = url.toLowerCase();
  if (tipo === "Imagem" || /\.(png|jpe?g|gif|webp|svg)($|\?)/.test(lower)) return "image";
  if (/\.pdf($|\?)/.test(lower)) return "pdf";
  if (/\.html?($|\?)/.test(lower) || tipo === "Mapas mentais") return "html";
  return "pdf"; // padrão para tipos desconhecidos
}

function buildPdfUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  }
  return url;
}

/* ── viewer de HTML via blob (bypassa X-Frame-Options) ── */

function HtmlViewer({ url, title }) {
  const iframeRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const blobUrlRef = useRef(null);

  useEffect(() => {
    if (!url) { setStatus("error"); return; }
    setStatus("loading");

    let cancelled = false;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
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
    <div className="relative h-full w-full">
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
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        allow="fullscreen"
      />
    </div>
  );
}

/* ── viewer principal ────────────────────────────────── */

function MaterialViewer({ material, onClose }) {
  const { titulo, materia, categoria, url, tipo } = material;
  const contentType = detectType(url, tipo);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Topbar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">{titulo}</p>
          <p className="truncate text-xs text-slate-500">
            {[materia, categoria].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex"
          >
            <ExternalLink size={13} />
            Nova aba
          </a>
          <a
            href={url}
            download
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            <Download size={13} />
            Baixar
          </a>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Fechar visualizador"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="min-h-0 flex-1 bg-slate-100">
        {contentType === "image" ? (
          <div className="grid h-full place-items-center p-6">
            <img
              src={url}
              alt={titulo}
              className="max-h-full max-w-full rounded-xl object-contain shadow-lg"
            />
          </div>
        ) : contentType === "html" ? (
          <HtmlViewer url={url} title={titulo} />
        ) : (
          /* PDF via Google Docs Viewer */
          <iframe
            key={url}
            src={buildPdfUrl(url)}
            title={titulo}
            className="h-full w-full border-0"
            allow="fullscreen"
          />
        )}
      </div>
    </div>
  );
}

/* ── card ────────────────────────────────────────────── */

function MaterialCardBase({ material, favorite, onFavorite }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const Icon = typeIcon[material.tipo] || FileText;
  const color = typeColor[material.tipo] || "bg-blue-50 text-blue-600";
  const variant = badgeVariant[material.tipo] || "neutral";

  const handleOpen = useCallback(() => setViewerOpen(true), []);
  const handleClose = useCallback(() => setViewerOpen(false), []);

  return (
    <>
      <Card className="flex flex-col gap-3" hover={false}>
        {/* Thumbnail */}
        <div className={cx("grid h-24 place-items-center rounded-xl", color)}>
          <Icon size={30} strokeWidth={1.5} />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-bold leading-snug text-slate-900">{material.titulo}</h2>
            <Badge variant={variant}>{material.tipo}</Badge>
          </div>
          {material.materia ? (
            <p className="text-xs text-slate-500">{material.materia}</p>
          ) : null}
          {material.descricao ? (
            <p className="line-clamp-2 text-xs text-slate-500">{material.descricao}</p>
          ) : null}
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={handleOpen}
            className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Maximize2 size={13} />
            Visualizar
          </button>
          <a
            href={material.url}
            download
            title="Baixar"
            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-50"
          >
            <Download size={14} />
          </a>
          <button
            aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            onClick={() => onFavorite(material.id)}
            className={cx(
              "grid size-9 place-items-center rounded-xl border transition",
              favorite
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:text-red-400"
            )}
          >
            <Heart size={14} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </Card>

      {viewerOpen && (
        <MaterialViewer material={material} onClose={handleClose} />
      )}
    </>
  );
}

export const MaterialCard = memo(MaterialCardBase);
MaterialCard.displayName = "MaterialCard";
