import { memo } from "react";
import { Download, Heart } from "lucide-react";
import { Badge, Button, Card } from "../../components";

export const MaterialCard = memo(({ material, favorite, onFavorite }) => <Card><div className="grid h-28 place-items-center rounded-lg bg-gray-900"><Download className="text-indigo-300" size={36} /></div><div className="mt-3 flex items-center justify-between gap-2"><h2 className="font-bold text-white">{material.titulo}</h2><Badge variant="neutral">{material.tipo}</Badge></div><p className="mt-2 text-sm text-gray-400">{material.descricao}</p><div className="mt-4 flex gap-2"><Button size="sm" icon={Download}>Abrir</Button><button aria-label="Favoritar material" onClick={() => onFavorite(material.id)} className="rounded-lg bg-gray-900 p-2 text-gray-300 hover:text-red-300"><Heart fill={favorite ? "currentColor" : "none"} /></button></div></Card>);
MaterialCard.displayName = "MaterialCard";
