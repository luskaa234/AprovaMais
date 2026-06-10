import { useCallback, useMemo, useState } from "react";
import { CheckCircle2, Clock, FileText, Map, RefreshCw, XCircle } from "lucide-react";
import { Badge, Button, Card, EmptyState, Tabs } from "../../components";
import { useAsyncData } from "../../hooks";
import { revisaoService } from "../../services";
import { useFlashcardsStore, useQuestoesStore } from "../../stores";

const tabs = ["Pendentes", "Revisao Espacada", "Erros", "Flashcards", "Mapas Mentais", "Resumos"];

function dueTone(date) {
  if (!date) return "warning";
  return date <= new Date().toISOString().slice(0, 10) ? "error" : "success";
}

export default function RevisaoPage() {
  const [tab, setTab] = useState("Pendentes");
  const load = useCallback(() => revisaoService.getPendentes(), []);
  const { data: itens = [], setData } = useAsyncData(load);
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const caderno = useQuestoesStore((state) => state.caderno);
  const questoes = useQuestoesStore((state) => state.questoes);
  const decks = useFlashcardsStore((state) => state.decks);

  const ordered = useMemo(() => [...itens].sort((a, b) => (a.proximaRevisao || a.dueAt || "").localeCompare(b.proximaRevisao || b.dueAt || "")), [itens]);
  const erros = useMemo(() => {
    const wrongIds = new Set([...caderno, ...tentativas.filter((item) => !item.acertou).map((item) => item.questaoId)]);
    return questoes.filter((questao) => wrongIds.has(questao.id));
  }, [caderno, questoes, tentativas]);
  const flashcards = useMemo(() => decks.flatMap((deck) => deck.cards.slice(0, 3).map((card) => ({ ...card, materia: deck.materia, deck: deck.titulo }))).slice(0, 8), [decks]);
  const mapas = useMemo(() => ordered.slice(0, 4).map((item) => ({ id: `map-${item.assuntoId || item.id}`, materia: item.materia, assunto: item.assunto || item.frente })), [ordered]);
  const resumos = useMemo(() => ordered.slice(0, 4).map((item) => ({ id: `res-${item.assuntoId || item.id}`, title: item.materia, text: `Revise ${item.assunto || item.frente}, refaca questoes do tema e anote a regra que mais caiu.` })), [ordered]);

  const avaliar = useCallback((item, quality) => {
    setData((current) => current.map((card) => card.assuntoId === item.assuntoId ? revisaoService.avaliar(item, quality) : card));
  }, [setData]);
  const adiar = useCallback((item) => {
    revisaoService.adiar(item.assuntoId || item.id);
    setData((current) => current.filter((card) => card.assuntoId !== item.assuntoId));
  }, [setData]);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Central de revisao</p>
        <h1 className="text-3xl font-black text-white">Fila inteligente de revisoes</h1>
        <p className="mt-1 text-sm text-gray-400">Pendencias, erros, flashcards, mapas e resumos em uma rotina unica.</p>
      </div>

      <Tabs items={tabs} activeTab={tab} onChange={setTab} />

      {tab === "Pendentes" || tab === "Revisao Espacada" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {ordered.length ? ordered.map((item) => (
            <Card hover={false} key={item.assuntoId || item.id}>
              <div className="flex items-center justify-between gap-2">
                <Badge variant={dueTone(item.proximaRevisao || item.dueAt)}>{item.urgencia || "agendada"}</Badge>
                <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={14} /> {item.proximaRevisao || item.dueAt || "hoje"}</span>
              </div>
              <h2 className="mt-3 font-bold text-white">{item.materia}</h2>
              <p className="mt-2 text-sm text-gray-400">{item.assunto || item.frente}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" icon={RefreshCw} onClick={() => avaliar(item, 3)}>Revisar</Button>
                <Button size="sm" variant="secondary" icon={CheckCircle2} onClick={() => avaliar(item, 5)}>Dominei</Button>
                <Button size="sm" variant="ghost" onClick={() => adiar(item)}>Adiar</Button>
              </div>
            </Card>
          )) : <EmptyState icon={CheckCircle2} title="Nada pendente agora" description="Quando voce errar questoes ou avaliar flashcards, novas revisoes entram aqui." />}
        </div>
      ) : null}

      {tab === "Erros" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {erros.length ? erros.map((item) => (
            <Card hover={false} key={item.id}>
              <div className="flex items-center justify-between gap-2"><Badge variant="error">{item.materia}</Badge><XCircle className="text-red-300" size={18} /></div>
              <p className="mt-3 text-sm text-gray-200">{item.enunciado}</p>
              <p className="mt-2 text-xs text-gray-500">Gabarito: {String(item.gabarito).toUpperCase()} · {item.assunto}</p>
            </Card>
          )) : <EmptyState icon={XCircle} title="Sem erros registrados" description="As questoes erradas entram automaticamente nesta aba." />}
        </div>
      ) : null}

      {tab === "Flashcards" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {flashcards.map((item) => <Card hover={false} key={item.id}><Badge>{item.materia}</Badge><h2 className="mt-3 font-bold text-white">{item.frente}</h2><p className="mt-2 text-sm text-gray-400">{item.verso}</p></Card>)}
        </div>
      ) : null}

      {tab === "Mapas Mentais" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {mapas.map((item) => <Card hover={false} key={item.id}><Map className="mb-3 text-blue-300" /><h2 className="font-bold text-white">{item.materia}</h2><p className="mt-2 text-sm text-gray-400">{item.assunto}</p></Card>)}
        </div>
      ) : null}

      {tab === "Resumos" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {resumos.map((item) => <Card hover={false} key={item.id}><FileText className="mb-3 text-blue-300" /><h2 className="font-bold text-white">{item.title}</h2><p className="mt-2 text-sm text-gray-400">{item.text}</p></Card>)}
        </div>
      ) : null}
    </div>
  );
}
