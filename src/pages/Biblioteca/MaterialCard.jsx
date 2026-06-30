import { memo, useState } from "react";
import { Download, FileText, Heart, Maximize2, X } from "lucide-react";
import { Badge, Card, cx } from "../../components";

const tones = {
  Apostila: "bg-blue-50 text-blue-700",
  Ebook: "bg-blue-50 text-blue-700",
  "Prova oficial": "bg-blue-50 text-blue-700",
  Gabarito: "bg-blue-50 text-blue-700",
  "Mapas mentais": "bg-blue-50 text-blue-700",
  Imagem: "bg-blue-50 text-blue-700",
};

function MaterialCardBase({ material, favorite, onFavorite }) {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <>
      <Card>
        <div className={cx("grid h-28 place-items-center rounded-lg", tones[material.tipo] || "bg-blue-50 text-blue-700")}>
          <FileText size={36} />
        </div>
        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <h2 className="font-bold text-white">{material.titulo}</h2>
            <p className="text-xs text-gray-500">{material.materia}</p>
          </div>
          <Badge variant="neutral">{material.tipo}</Badge>
        </div>
        <p className="mt-2 text-sm text-gray-400">{material.descricao}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setViewerOpen(true)}
            className="inline-flex min-h-8 flex-1 items-center justify-center gap-2 rounded-lg bg-royal px-3 text-xs font-semibold text-white transition hover:bg-royal/90"
          >
            <Maximize2 size={14} />
            Visualizar
          </button>
          <a
            href={material.url}
            download
            title="Baixar"
            className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-lg bg-gray-800 px-3 text-xs font-semibold text-gray-300 transition hover:bg-gray-700"
          >
            <Download size={14} />
          </a>
          <button aria-label="Favoritar material" onClick={() => onFavorite(material.id)} className="rounded-lg bg-gray-900 p-2 text-gray-300 hover:text-red-300">
            <Heart fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
      </Card>

      {viewerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0a0f1a" }}>
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-gray-950 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-bold text-white">{material.titulo}</p>
              <p className="truncate text-xs text-gray-400">
                {material.materia}{material.categoria ? ` · ${material.categoria}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={material.url}
                download
                className="flex items-center gap-1.5 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-700"
              >
                <Download size={13} />
                Baixar
              </a>
              <button
                onClick={() => setViewerOpen(false)}
                className="flex items-center rounded-lg bg-gray-800 p-2 text-white transition hover:bg-gray-700"
                aria-label="Fechar visualizador"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <iframe
            src={material.url}
            title={material.titulo}
            className="min-h-0 w-full flex-1"
            style={{ border: 0 }}
          />
        </div>
      )}
    </>
  );
}

export const MaterialCard = memo(MaterialCardBase);
MaterialCard.displayName = "MaterialCard";
