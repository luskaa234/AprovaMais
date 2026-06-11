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

function ReviewCard({ item, onReview, onMaster, onDelay }) {
  return (
    <Card hover={false} className="review-card border-blue-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <Badge variant={dueTone(item.proximaRevisao || item.dueAt)}>{item.urgencia || "agendada"}</Badge>
        <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
          <Clock size={14} /> {item.proximaRevisao || item.dueAt || "hoje"}
        </span>
      </div>
      <h2 className="mt-3 font-black text-slate-950">{item.materia}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{item.assunto || item.frente}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button size="sm" icon={RefreshCw} onClick={onReview}>Revisar</Button>
        <Button size="sm" variant="secondary" icon={CheckCircle2} onClick={onMaster}>Dominei</Button>
        <Button size="sm" variant="ghost" onClick={onDelay}>Adiar</Button>
      </div>
    </Card>
  );
}

export default function RevisaoPage() {
  const [tab, setTab] = useState("Pendentes");
  const load = useCallback(() => revisaoService.getPendentes(), []);
  const { data: itens = [], setData } = useAsyncData(load);
  const tentativas = useQuestoesStore((state) => state.tentativas);
  const caderno = useQuestoesStore((state) => state.caderno);
  const questoes = useQuestoesStore((state) => state.questoes);
  const decks = useFlashcardsStore((state) => state.decks);
  const sessoesFlashcards = useFlashcardsStore((state) => state.sessoes);

  const today = new Date().toISOString().slice(0, 10);
  const ordered = useMemo(() => [...itens].sort((a, b) => (a.proximaRevisao || a.dueAt || "").localeCompare(b.proximaRevisao || b.dueAt || "")), [itens]);
  const dueToday = ordered.filter((item) => (item.proximaRevisao || item.dueAt || today) <= today);
  const nextItem = ordered[0];

  const erros = useMemo(() => {
    const wrongIds = new Set([...caderno, ...tentativas.filter((item) => !item.acertou).map((item) => item.questaoId)]);
    return questoes.filter((questao) => wrongIds.has(questao.id));
  }, [caderno, questoes, tentativas]);

  const flashcards = useMemo(() => {
    const reviewedIds = new Set(sessoesFlashcards.map((item) => item.cardId));
    if (!reviewedIds.size) return [];
    return decks
      .flatMap((deck) => deck.cards.filter((card) => reviewedIds.has(card.id)).slice(0, 3).map((card) => ({ ...card, materia: deck.materia, deck: deck.titulo })))
      .slice(0, 8);
  }, [decks, sessoesFlashcards]);
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
    <div className="review-center mx-auto max-w-[1500px] pb-10 text-slate-900">
      <section className="review-hero mb-4 rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-blue-600">Central de revisao</p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">Fila inteligente de revisoes</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Veja o que revisar hoje, ataque erros recentes e transforme flashcards, mapas e resumos em rotina curta.</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Hoje", dueToday.length],
              ["Erros", erros.length],
              ["Cards", flashcards.length],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-center">
                <strong className="block text-xl text-slate-950">{value}</strong>
                <span className="text-xs font-bold text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {nextItem ? (
        <Card hover={false} className="review-focus mb-4 border-blue-100 bg-white shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant={dueTone(nextItem.proximaRevisao || nextItem.dueAt)}>Proxima revisao</Badge>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Clock size={14} /> {nextItem.proximaRevisao || nextItem.dueAt || "hoje"}
                </span>
              </div>
              <h2 className="truncate text-xl font-black text-slate-950">{nextItem.materia}</h2>
              <p className="mt-1 text-sm text-slate-500">{nextItem.assunto || nextItem.frente}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 md:min-w-[300px]">
              <Button size="sm" icon={RefreshCw} onClick={() => avaliar(nextItem, 3)}>Revisar</Button>
              <Button size="sm" variant="secondary" icon={CheckCircle2} onClick={() => avaliar(nextItem, 5)}>Dominei</Button>
              <Button size="sm" variant="ghost" onClick={() => adiar(nextItem)}>Adiar</Button>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="review-tabs overflow-x-auto rounded-lg border border-blue-100 bg-white p-2 shadow-sm">
        <Tabs items={tabs} activeTab={tab} onChange={setTab} />
      </div>

      {tab === "Pendentes" || tab === "Revisao Espacada" ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {ordered.length ? ordered.map((item) => (
            <ReviewCard
              item={item}
              key={item.assuntoId || item.id}
              onDelay={() => adiar(item)}
              onMaster={() => avaliar(item, 5)}
              onReview={() => avaliar(item, 3)}
            />
          )) : <EmptyState icon={CheckCircle2} title="Nada pendente agora" description="Quando voce errar questoes ou avaliar flashcards, novas revisoes entram aqui." />}
        </div>
      ) : null}

      {tab === "Erros" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {erros.length ? erros.map((item) => (
            <Card hover={false} className="border-blue-100 bg-white shadow-sm" key={item.id}>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="error">{item.materia}</Badge>
                <XCircle className="text-red-400" size={18} />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.enunciado}</p>
              <p className="mt-2 text-xs font-bold text-slate-500">Gabarito: {String(item.gabarito).toUpperCase()} - {item.assunto}</p>
            </Card>
          )) : <EmptyState icon={XCircle} title="Sem erros registrados" description="As questoes erradas entram automaticamente nesta aba." />}
        </div>
      ) : null}

      {tab === "Flashcards" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {flashcards.length ? flashcards.map((item) => (
            <Card hover={false} className="border-blue-100 bg-white shadow-sm" key={item.id}>
              <Badge>{item.materia}</Badge>
              <h2 className="mt-3 font-black text-slate-950">{item.frente}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.verso}</p>
            </Card>
          )) : <EmptyState title="Sem flashcards em revisao" description="Depois que voce revisar cards, eles aparecem aqui na fila." />}
        </div>
      ) : null}

      {tab === "Mapas Mentais" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {mapas.length ? mapas.map((item) => (
            <Card hover={false} className="border-blue-100 bg-white shadow-sm" key={item.id}>
              <Map className="mb-3 text-blue-600" />
              <h2 className="font-black text-slate-950">{item.materia}</h2>
              <p className="mt-2 text-sm text-slate-500">{item.assunto}</p>
            </Card>
          )) : <EmptyState title="Sem mapas para revisar" description="Mapas entram aqui quando houver conteudo criado ou revisoes pendentes." />}
        </div>
      ) : null}

      {tab === "Resumos" ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {resumos.length ? resumos.map((item) => (
            <Card hover={false} className="border-blue-100 bg-white shadow-sm" key={item.id}>
              <FileText className="mb-3 text-blue-600" />
              <h2 className="font-black text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
            </Card>
          )) : <EmptyState title="Sem resumos pendentes" description="Quando voce gerar resumos ou tiver revisoes, eles aparecem aqui." />}
        </div>
      ) : null}
    </div>
  );
}
