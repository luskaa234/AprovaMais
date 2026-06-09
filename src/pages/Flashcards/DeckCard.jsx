import { memo } from "react";
import { BookOpen } from "lucide-react";
import { Badge, Card } from "../../components";

export const DeckCard = memo(({ deck, active, onSelect }) => <Card hover={false} className={active ? "ring-2 ring-blue-500" : ""}><button onClick={() => onSelect(deck)} className="flex w-full items-center gap-4 text-left"><span className="grid size-12 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><BookOpen size={22} /></span><div className="min-w-0"><h2 className="truncate font-bold text-white">{deck.titulo}</h2><p className="mt-1 text-sm text-gray-400">{deck.materia}</p><div className="mt-2"><Badge variant={deck.status === "Dominado" ? "success" : deck.status === "Revisando" ? "warning" : "neutral"}>{deck.status || "Novo"}</Badge></div></div></button></Card>);
DeckCard.displayName = "DeckCard";
