import { memo } from "react";
import { BookOpen } from "lucide-react";
import { Badge, Card, cx } from "../../components";

export const DeckCard = memo(({ deck, active, onSelect }) => (
  <Card hover={false} className={cx("deck-card", active && "is-active")}>
    <button onClick={() => onSelect(deck)} className="deck-card-button" type="button">
      <span className="deck-card-icon"><BookOpen size={22} /></span>
      <span className="deck-card-copy">
        <h2>{deck.titulo}</h2>
        <p>{deck.materia}</p>
        <span className="deck-card-badge">
          <Badge variant={deck.status === "Dominado" ? "success" : deck.status === "Revisando" ? "warning" : "neutral"}>{deck.status || "Novo"}</Badge>
        </span>
      </span>
    </button>
  </Card>
));
DeckCard.displayName = "DeckCard";
