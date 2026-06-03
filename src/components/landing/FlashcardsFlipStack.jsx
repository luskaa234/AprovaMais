import { useCallback, useMemo, useState } from "react";
import { CheckCircle2, Grab, PanelsTopLeft } from "lucide-react";

const flashcards = [
  {
    topic: "Português",
    question: "Quando ocorre crase antes de palavra feminina?",
    answer:
      "Ocorre quando há fusão da preposição 'a' com o artigo feminino 'a'.",
    color: "#2563eb",
  },
  {
    topic: "Direito Constitucional",
    question: "O que significa controle de constitucionalidade?",
    answer:
      "É a verificação de compatibilidade de uma norma com a Constituicao.",
    color: "#38bdf8",
  },
  {
    topic: "Raciocínio Lógico",
    question: "Como negar a proposição 'P e Q'?",
    answer: "Pela lei de De Morgan: não P ou não Q.",
    color: "#1d4ed8",
  },
  {
    topic: "Informática",
    question: "Qual a função principal de um firewall?",
    answer: "Controlar o tráfego de rede com base em regras de segurança.",
    color: "#93c5fd",
  },
];

function Flashcard({ card, isThrowing, isTop, mastered, position, onActivate }) {
  const depth = flashcards.length - 1 - position;
  const shouldThrow = isTop && isThrowing;

  return (
    <article
      aria-label={`${card.topic}: ${card.question}`}
      className={`flashcard-stack-card ${isTop ? "is-top" : ""} ${shouldThrow ? "is-throwing" : ""}`}
      onClick={() => isTop && onActivate()}
      onKeyDown={(event) => {
        if (!isTop) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate();
        }
      }}
      role={isTop ? "button" : undefined}
      tabIndex={isTop ? 0 : -1}
      style={{
        "--flashcard-color": card.color,
        "--flashcard-y": `${-depth * 12}px`,
        "--flashcard-rotate": `${depth * -4}deg`,
        "--flashcard-scale": 1 - depth * 0.025,
        zIndex: position,
        transform: shouldThrow ? "translate(340px, -48px) rotate(14deg) scale(0.94)" : undefined,
        opacity: shouldThrow ? 0 : 1,
      }}
    >
      <div className="flashcard-stack-inner">
        <div className="flashcard-face flashcard-front">
          <div className="flashcard-face-top">
            <span>{card.topic}</span>
            {mastered ? <CheckCircle2 size={18} /> : <Grab size={18} />}
          </div>
          <h3>{card.question}</h3>
          <p>{card.answer}</p>
        </div>
      </div>
    </article>
  );
}

function FlashcardsFlipStack() {
  const [cardOrder, setCardOrder] = useState(() => flashcards.map((_, index) => index));
  const [isThrowing, setIsThrowing] = useState(false);
  const [reviewedCards, setReviewedCards] = useState(() => new Set());

  const topCard = cardOrder[cardOrder.length - 1];
  const currentPosition = flashcards.findIndex((_, index) => index === topCard) + 1;
  const reviewedCount = reviewedCards.size;
  const progress = Math.round((reviewedCount / flashcards.length) * 100);

  const orderedCards = useMemo(
    () =>
      flashcards.map((card, index) => ({
        card,
        index,
        position: cardOrder.indexOf(index),
      })),
    [cardOrder]
  );

  const rotateCard = useCallback(() => {
    setIsThrowing(false);
    setCardOrder((current) => {
      const next = [...current];
      const active = next.pop();
      next.unshift(active);
      return next;
    });
  }, []);

  const activateCard = useCallback(() => {
    if (isThrowing) return;

    setReviewedCards((current) => new Set(current).add(topCard));
    setIsThrowing(true);
    window.setTimeout(rotateCard, 460);
  }, [isThrowing, rotateCard, topCard]);

  return (
    <section className="section-shell flashcards-section" id="flashcards">
      <div className="flashcards-copy">
        <span className="section-kicker">
          <PanelsTopLeft size={16} />
          Flashcards inteligentes
        </span>
        <h2>Revise conteúdos importantes com cards que deslizam.</h2>
        <p>
          Use o modo flashcard para memorizar conceitos, revisar pontos fracos e
          transformar erros em repetição ativa.
        </p>

        <div className="flashcards-progress-panel" aria-label="Progresso nos flashcards">
          <div>
            <span>Progresso</span>
            <strong>{progress}%</strong>
          </div>
          <div className="flashcards-progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            {reviewedCount} de {flashcards.length} revisados · clique no card para deslizar
          </p>
        </div>
      </div>

      <div className="flashcards-study-panel">
        <div className="flashcard-stack-stage" aria-label="Flashcards interativos">
          {orderedCards.map(({ card, index, position }) => (
            <Flashcard
              card={card}
              isThrowing={isThrowing}
              isTop={index === topCard}
              key={card.topic}
              mastered={reviewedCards.has(index)}
              onActivate={activateCard}
              position={position}
            />
          ))}
        </div>

        <div className="flashcards-session-footer">
          <span>
            Card {currentPosition} de {flashcards.length}
          </span>
          <span>Clique para deslizar</span>
        </div>
      </div>
    </section>
  );
}

export default FlashcardsFlipStack;
