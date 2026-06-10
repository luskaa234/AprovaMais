import { memo } from "react";
import { Download, FileText, Heart } from "lucide-react";
import { Badge, Card, cx } from "../../components";

const tones = {
  Apostila: "bg-blue-50 text-blue-700",
  Ebook: "bg-blue-50 text-blue-700",
  "Prova oficial": "bg-blue-50 text-blue-700",
  Gabarito: "bg-blue-50 text-blue-700",
  "Mapas mentais": "bg-blue-50 text-blue-700",
  Imagem: "bg-blue-50 text-blue-700",
};

export const MaterialCard = memo(({ material, favorite, onFavorite }) => (
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
      <a
        href={material.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-8 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-500"
      >
        <Download size={16} />
        Abrir
      </a>
      <button aria-label="Favoritar material" onClick={() => onFavorite(material.id)} className="rounded-lg bg-gray-900 p-2 text-gray-300 hover:text-red-300">
        <Heart fill={favorite ? "currentColor" : "none"} />
      </button>
    </div>
  </Card>
));
MaterialCard.displayName = "MaterialCard";
