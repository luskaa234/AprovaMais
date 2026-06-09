import { memo } from "react";
import { Download, FileText, Heart } from "lucide-react";
import { Badge, Card, cx } from "../../components";

const tones = {
  Apostila: "bg-blue-500/10 text-blue-200",
  Ebook: "bg-purple-500/10 text-purple-200",
  "Prova oficial": "bg-emerald-500/10 text-emerald-200",
  Gabarito: "bg-amber-500/10 text-amber-200",
  "Mapas mentais": "bg-indigo-500/10 text-indigo-200",
  Imagem: "bg-pink-500/10 text-pink-200",
};

export const MaterialCard = memo(({ material, favorite, onFavorite }) => (
  <Card>
    <div className={cx("grid h-28 place-items-center rounded-lg", tones[material.tipo] || "bg-gray-900 text-indigo-200")}>
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
