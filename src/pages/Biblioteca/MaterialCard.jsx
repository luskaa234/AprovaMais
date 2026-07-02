import { memo, useCallback, useState } from "react";
import { Download, ExternalLink, FileText, Heart, Image, Map, Maximize2, X } from "lucide-react";
import { Badge, Card, HtmlFrameViewer, PdfFrameViewer, cx } from "../../components";
import { bibliotecaService } from "../../services";

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
          <HtmlFrameViewer url={url} title={titulo} sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
        ) : (
          /* PDF via Google Docs Viewer, com fallback pra abrir direto no mobile */
          <PdfFrameViewer key={url} url={url} title={titulo} />
        )}
      </div>
    </div>
  );
}

/* ── card ────────────────────────────────────────────── */

function MaterialCardBase({ material, favorite, onFavorite }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [secureMaterial, setSecureMaterial] = useState(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [urlError, setUrlError] = useState("");
  const Icon = typeIcon[material.tipo] || FileText;
  const color = typeColor[material.tipo] || "bg-blue-50 text-blue-600";
  const variant = badgeVariant[material.tipo] || "neutral";

  const prepareSecureMaterial = useCallback(async () => {
    setLoadingUrl(true);
    setUrlError("");
    try {
      const url = await bibliotecaService.getSecureUrl(material);
      const next = { ...material, url };
      setSecureMaterial(next);
      return next;
    } catch (error) {
      setUrlError(error?.message || "Não foi possível liberar o material.");
      return null;
    } finally {
      setLoadingUrl(false);
    }
  }, [material]);

  const handleOpen = useCallback(async () => {
    const next = await prepareSecureMaterial();
    if (next) setViewerOpen(true);
  }, [prepareSecureMaterial]);
  const handleClose = useCallback(() => setViewerOpen(false), []);
  const handleDownload = useCallback(async () => {
    const next = await prepareSecureMaterial();
    if (next?.url) window.open(next.url, "_blank", "noopener,noreferrer");
  }, [prepareSecureMaterial]);

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
            disabled={loadingUrl}
            className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Maximize2 size={13} />
            {loadingUrl ? "Liberando..." : "Visualizar"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={loadingUrl}
            title="Baixar"
            className="inline-flex min-h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-50"
          >
            <Download size={14} />
          </button>
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
        {urlError ? <p className="text-xs font-semibold text-red-600">{urlError}</p> : null}
      </Card>

      {viewerOpen && (
        <MaterialViewer material={secureMaterial || material} onClose={handleClose} />
      )}
    </>
  );
}

export const MaterialCard = memo(MaterialCardBase);
MaterialCard.displayName = "MaterialCard";
