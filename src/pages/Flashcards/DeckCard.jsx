import { memo } from "react";
import { Card, ProgressRing } from "../../components";

export const DeckCard = memo(({ deck, active, onSelect }) => <Card className={active ? "ring-2 ring-indigo-500" : ""}><button onClick={() => onSelect(deck)} className="flex w-full items-center gap-4 text-left"><ProgressRing value={deck.retencao} /><div><h2 className="font-bold text-white">{deck.titulo}</h2><p className="text-sm text-gray-400">{deck.cards.length} cards · {deck.materia}</p></div></button></Card>);
DeckCard.displayName = "DeckCard";
