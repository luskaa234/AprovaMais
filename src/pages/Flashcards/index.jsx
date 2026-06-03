import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button, Card } from "../../components";
import { RetentionRadarChart } from "../../charts";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { flashcardsService } from "../../services";
import { DeckCard } from "./DeckCard";

export default function FlashcardsPage() {
  const load = useCallback(() => flashcardsService.getDecks(), []);
  const { data: decks, setData } = useAsyncData(load, [load]);
  const [deck, setDeck] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [modal, setModal] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const activeDeck = deck || decks[0];
  const radar = useMemo(() => decks.map((item) => ({ label: item.materia.split(" ")[0], valor: item.retencao })), [decks]);
  const generate = useCallback(async () => {
    const next = await flashcardsService.gerarDeckIA("Direito Constitucional");
    setData((items) => [next, ...items]);
    setModal(false);
  }, [setData]);
  const currentCard = activeDeck?.cards[cardIndex % (activeDeck?.cards.length || 1)];
  return <div><div className="mb-5 flex justify-between gap-3"><div><h1 className="text-3xl font-black text-white">Flashcards</h1><p className="text-sm text-gray-400">Decks, flip 3D, retencao e geracao por IA.</p></div><Button icon={Sparkles} onClick={() => setModal(true)}>Gerar deck</Button></div><div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr_0.8fr]"><div className="space-y-3">{decks.map((item) => <DeckCard key={item.id} deck={item} active={activeDeck?.id === item.id} onSelect={(next) => { setDeck(next); setCardIndex(0); setFlipped(false); }} />)}</div><Card className="grid place-items-center"><p className="mb-3 text-sm font-semibold text-gray-400">Card {cardIndex + 1} de {activeDeck?.cards.length || 0}</p><button onClick={() => setFlipped((value) => !value)} className="h-80 w-full max-w-md [perspective:1000px]" aria-label="Virar flashcard"><motion.div className="relative h-full w-full rounded-lg [transform-style:preserve-3d]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }}><div className="absolute inset-0 grid place-items-center rounded-lg border border-indigo-500/40 bg-gray-950 p-8 text-center [backface-visibility:hidden]"><h2 className="text-2xl font-black text-white">{currentCard?.frente}</h2></div><div className="absolute inset-0 grid place-items-center rounded-lg border border-blue-500/40 bg-gray-900 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"><p className="text-lg text-gray-100">{currentCard?.verso}</p></div></motion.div></button><div className="mt-4 flex flex-wrap justify-center gap-2">{["errei", "dificil", "bom", "facil"].map((item, index) => <Button key={item} variant={index === 0 ? "danger" : "secondary"} onClick={() => { setCardIndex((value) => Math.min((activeDeck?.cards.length || 1) - 1, value + 1)); setFlipped(false); }}>{item}</Button>)}</div></Card><Card><h2 className="mb-3 font-bold text-white">Retencao por deck</h2><RetentionRadarChart data={radar} /><h3 className="mt-4 font-bold text-white">Historico de sessoes</h3>{["12 cards revisados", "18 cards revisados", "10 cards revisados"].map((item, index) => <div key={item} className="border-b border-gray-800 py-2 text-sm text-gray-300">Sessao {index + 1}: {item}</div>)}</Card></div><Modal open={modal} title="Gerar deck com IA" onClose={() => setModal(false)} footer={<Button onClick={generate}>Confirmar geracao</Button>}><p className="text-sm text-gray-300">A IA criara um deck com base nos assuntos de maior incidencia.</p></Modal></div>;
}
