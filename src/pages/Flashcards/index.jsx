import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Sparkles } from "lucide-react";
import { Button, Card, Input, Select } from "../../components";
import { RetentionRadarChart } from "../../charts";
import { Modal } from "../../modals";
import { useAsyncData } from "../../hooks";
import { flashcardsService } from "../../services";
import { useFlashcardsStore } from "../../stores";
import { DeckCard } from "./DeckCard";

export default function FlashcardsPage() {
  const load = useCallback(() => flashcardsService.getDecks(), []);
  const { data: decks, setData, refetch } = useAsyncData(load);
  const [deck, setDeck] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [modal, setModal] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [filters, setFilters] = useState({ concurso: "", materia: "", assunto: "", nivel: "", status: "" });
  const sessoes = useFlashcardsStore((state) => state.sessoes);
  const deckStatus = useCallback((item) => item.retencao >= 80 ? "Dominado" : item.retencao > 0 ? "Revisando" : "Novo", []);
  const deckLevel = useCallback((item) => item.retencao >= 75 ? "Avancado" : item.retencao >= 45 ? "Intermediario" : "Basico", []);
  const decoratedDecks = useMemo(() => decks.map((item, index) => ({
    ...item,
    concurso: index % 2 ? "PRF" : "PM",
    assunto: item.cards?.[0]?.frente || item.titulo,
    status: deckStatus(item),
    nivel: deckLevel(item),
  })), [deckLevel, deckStatus, decks]);
  const filteredDecks = useMemo(() => decoratedDecks.filter((item) => {
    if (filters.concurso && item.concurso !== filters.concurso) return false;
    if (filters.materia && item.materia !== filters.materia) return false;
    if (filters.assunto && !item.assunto.toLowerCase().includes(filters.assunto.toLowerCase()) && !item.titulo.toLowerCase().includes(filters.assunto.toLowerCase())) return false;
    if (filters.nivel && item.nivel !== filters.nivel) return false;
    if (filters.status && item.status !== filters.status) return false;
    return true;
  }), [decoratedDecks, filters]);
  const activeDeck = filteredDecks.find((item) => item.id === deck?.id) || filteredDecks[0];
  const radar = useMemo(() => filteredDecks.map((item) => ({ label: item.materia.split(" ")[0], valor: item.retencao })), [filteredDecks]);
  const currentCard = activeDeck?.cards[cardIndex % (activeDeck?.cards.length || 1)];

  const generate = useCallback(async () => {
    const next = await flashcardsService.gerarDeckIA("Direito Constitucional");
    setData((items) => [next, ...items]);
    setModal(false);
  }, [setData]);

  const rate = useCallback(async (quality) => {
    if (currentCard) await flashcardsService.avaliar(currentCard, quality);
    setCardIndex((value) => Math.min((activeDeck?.cards.length || 1) - 1, value + 1));
    setFlipped(false);
    refetch();
  }, [activeDeck?.cards.length, currentCard, refetch]);

  return (
    <div>
      <div className="mb-5 flex justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-white">Flashcards</h1>
          <p className="text-sm text-gray-400">Revisao ativa por materia, assunto, dificuldade e status.</p>
        </div>
        <Button icon={Sparkles} onClick={() => setModal(true)}>Gerar deck</Button>
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr_0.8fr]">
        <div className="space-y-3">
          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><Filter size={16} /> Filtros</div>
            <div className="grid gap-3">
              <Select label="Concurso" placeholder="Todos" options={["PM", "PRF"]} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
              <Select label="Materia" placeholder="Todas" options={[...new Set(decoratedDecks.map((item) => item.materia))]} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
              <Input label="Assunto" placeholder="Buscar assunto" value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
              <Select label="Nivel" placeholder="Todos" options={["Basico", "Intermediario", "Avancado"]} value={filters.nivel} onChange={(event) => setFilters((current) => ({ ...current, nivel: event.target.value }))} />
              <Select label="Status" placeholder="Todos" options={["Novo", "Revisando", "Dominado"]} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
            </div>
          </Card>
          <div className="max-h-[52vh] space-y-3 overflow-auto pr-1">
            {filteredDecks.map((item) => <DeckCard key={item.id} deck={item} active={activeDeck?.id === item.id} onSelect={(next) => { setDeck(next); setCardIndex(0); setFlipped(false); }} />)}
          </div>
        </div>
        <Card className="grid place-items-center">
          <p className="mb-3 text-sm font-semibold text-gray-400">{activeDeck?.materia || "Selecione um deck"}</p>
          <button onClick={() => setFlipped((value) => !value)} className="h-[26rem] w-full max-w-xl [perspective:1000px]" aria-label="Virar flashcard">
            <motion.div className="relative h-full w-full rounded-lg [transform-style:preserve-3d]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }}>
              <div className="absolute inset-0 grid place-items-center overflow-auto rounded-lg border border-indigo-500/40 bg-gray-950 p-5 text-center [backface-visibility:hidden] sm:p-8">
                <h2 className="whitespace-pre-wrap break-words text-lg font-black text-white sm:text-2xl">{currentCard?.frente}</h2>
              </div>
              <div className="absolute inset-0 grid place-items-center overflow-auto rounded-lg border border-blue-500/40 bg-gray-900 p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-100 sm:text-lg">{currentCard?.verso}</p>
              </div>
            </motion.div>
          </button>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[["errei", 1], ["dificil", 3], ["bom", 4], ["facil", 5]].map(([label, quality], index) => (
              <Button key={label} variant={index === 0 ? "danger" : "secondary"} onClick={() => rate(quality)}>{label}</Button>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 font-bold text-white">Retencao por deck</h2>
          <RetentionRadarChart data={radar} />
          <h3 className="mt-4 font-bold text-white">Historico de sessoes</h3>
          {sessoes.slice(0, 5).map((item, index) => <div key={item.id} className="border-b border-gray-800 py-2 text-sm text-gray-300">Sessao {index + 1}: qualidade {item.qualidade} em {item.data.slice(0, 10)}</div>)}
        </Card>
      </div>
      <Modal open={modal} title="Gerar deck com IA" onClose={() => setModal(false)} footer={<Button onClick={generate}>Confirmar geracao</Button>}>
        <p className="text-sm text-gray-300">A IA criara um deck com base nos assuntos de maior incidencia.</p>
      </Modal>
    </div>
  );
}
