import { useCallback, useMemo, useState } from "react";
import { Bookmark, Highlighter, StickyNote } from "lucide-react";
import { Button, Card, Input } from "../../components";
import { useAsyncData } from "../../hooks";
import { leisService } from "../../services";

export default function LeisSecasPage() {
  const [activeLei, setActiveLei] = useState(null);
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState({});
  const load = useCallback(() => leisService.getLeis(), []);
  const { data: leis } = useAsyncData(load, [load]);
  const lei = activeLei || leis[0];
  const artigos = useMemo(() => lei?.capitulos.flatMap((capitulo) => capitulo.artigos.map((artigo) => ({ ...artigo, capitulo: capitulo.nome }))) || [], [lei]);
  const visible = query ? artigos.filter((artigo) => artigo.texto.toLowerCase().includes(query.toLowerCase())) : artigos;
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (text) => safeQuery ? text.replace(new RegExp(`(${safeQuery})`, "ig"), "<mark>$1</mark>") : text;
  return <div><h1 className="text-3xl font-black text-white">Leis secas</h1><p className="mb-5 text-sm text-gray-400">Indice, busca, marcacao, favoritos e notas inline.</p><div className="grid gap-4 lg:grid-cols-[280px_1fr]"><Card>{leis.map((item) => <button key={item.id} onClick={() => setActiveLei(item)} className={`mb-2 w-full rounded-lg p-3 text-left text-sm font-semibold ${lei?.id === item.id ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-300"}`}>{item.nome}</button>)}</Card><Card><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar termo" className="mb-4" />{visible.map((artigo) => <article key={artigo.id} className={`mb-4 rounded-lg border border-gray-800 p-4 ${query ? "bg-indigo-500/10" : ""}`}><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><h2 className="font-bold text-white">{artigo.capitulo} · Art. {artigo.numero}</h2><div className="flex gap-2"><Button size="sm" variant="ghost" icon={Highlighter}>Marcar</Button><Button size="sm" variant="ghost" icon={Bookmark}>Favoritar</Button></div></div><p className="text-gray-300 [&_mark]:rounded [&_mark]:bg-amber-300 [&_mark]:px-1 [&_mark]:text-gray-950" dangerouslySetInnerHTML={{ __html: highlight(artigo.texto) }} /><Input icon={StickyNote} value={notes[artigo.id] || ""} onChange={(event) => setNotes((current) => ({ ...current, [artigo.id]: event.target.value }))} placeholder="Nota pessoal" className="mt-3" /></article>)}</Card></div></div>;
}
