import { useCallback, useMemo, useState } from "react";
import { Bookmark, Filter, Highlighter, StickyNote } from "lucide-react";
import { Button, Card, Input, Select } from "../../components";
import { useAsyncData } from "../../hooks";
import { leisService } from "../../services";
import { useLeisStore } from "../../stores";

export default function LeisSecasPage() {
  const [activeLei, setActiveLei] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ concurso: "", area: "", materia: "", assunto: "", tipo: "", status: "" });
  const notas = useLeisStore((state) => state.notas);
  const grifos = useLeisStore((state) => state.grifos);
  const favoritos = useLeisStore((state) => state.favoritos);
  const salvarNota = useLeisStore((state) => state.salvarNota);
  const grifarArtigo = useLeisStore((state) => state.grifarArtigo);
  const toggleFavorito = useLeisStore((state) => state.toggleFavorito);
  const load = useCallback(() => leisService.getLeis(), []);
  const { data: leis } = useAsyncData(load);

  const getTipo = useCallback((nome = "") => {
    const normalized = nome.toLowerCase();
    if (normalized.includes("constituicao")) return "Constituicao";
    if (normalized.includes("codigo")) return "Codigo";
    return "Lei";
  }, []);
  const getArea = useCallback((nome = "") => {
    const normalized = nome.toLowerCase();
    if (normalized.includes("constit")) return "Constitucional";
    if (normalized.includes("consumidor")) return "Consumidor";
    if (normalized.includes("servidor") || normalized.includes("8.112")) return "Administrativo";
    return "Geral";
  }, []);
  const withMeta = useMemo(() => leis.map((item) => ({
    ...item,
    area: getArea(item.nome),
    tipo: getTipo(item.nome),
    materia: item.nome.includes("Constituicao") ? "Direito Constitucional" : item.nome.includes("8.112") ? "Direito Administrativo" : "Legislacao",
    concurso: item.nome.includes("8.112") ? "PF" : item.nome.includes("Consumidor") ? "TJ" : "PM/PRF",
  })), [getArea, getTipo, leis]);
  const filteredLeis = useMemo(() => withMeta.filter((item) => {
    if (filters.concurso && !item.concurso.toLowerCase().includes(filters.concurso.toLowerCase())) return false;
    if (filters.area && item.area !== filters.area) return false;
    if (filters.materia && item.materia !== filters.materia) return false;
    if (filters.tipo && item.tipo !== filters.tipo) return false;
    return true;
  }), [filters, withMeta]);
  const lei = filteredLeis.find((item) => item.id === activeLei?.id) || filteredLeis[0] || withMeta[0];
  const artigos = useMemo(() => lei?.capitulos.flatMap((capitulo) => capitulo.artigos.map((artigo) => ({ ...artigo, capitulo: capitulo.nome, lei: lei.nome }))) || [], [lei]);
  const visible = useMemo(() => artigos.filter((artigo) => {
    const textMatch = query ? [artigo.texto, artigo.capitulo, artigo.lei].some((field) => field.toLowerCase().includes(query.toLowerCase())) : true;
    const assuntoMatch = filters.assunto ? artigo.capitulo.toLowerCase().includes(filters.assunto.toLowerCase()) || artigo.texto.toLowerCase().includes(filters.assunto.toLowerCase()) : true;
    const hasNote = Boolean(notas[artigo.id]);
    const hasMark = Boolean(grifos[artigo.id]);
    const isFavorite = favoritos.includes(artigo.id);
    const statusMatch = !filters.status
      || (filters.status === "estudada" && isFavorite)
      || (filters.status === "revisando" && (hasMark || hasNote))
      || (filters.status === "nao_estudada" && !isFavorite && !hasMark && !hasNote);
    return textMatch && assuntoMatch && statusMatch;
  }), [artigos, favoritos, filters.assunto, filters.status, grifos, notas, query]);
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (text) => safeQuery ? text.replace(new RegExp(`(${safeQuery})`, "ig"), "<mark>$1</mark>") : text;
  const handleGrifar = useCallback((artigoId) => {
    const cor = grifos[artigoId] ? undefined : "yellow";
    grifarArtigo(artigoId, cor);
    leisService.grifarArtigo(artigoId, cor).catch(() => {});
  }, [grifos, grifarArtigo]);
  const handleFavorito = useCallback((artigoId) => {
    toggleFavorito(artigoId);
    leisService.toggleFavorito(artigoId).catch(() => {});
  }, [toggleFavorito]);
  const handleNota = useCallback((artigoId, nota) => {
    salvarNota(artigoId, nota);
    leisService.salvarNota(artigoId, nota).catch(() => {});
  }, [salvarNota]);

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Leis secas</p>
        <h1 className="text-3xl font-black text-white">Leitura objetiva por norma e assunto</h1>
        <p className="mt-1 text-sm text-gray-400">Filtre, leia, marque pontos importantes e mantenha suas notas no proprio artigo.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><Filter size={16} /> Filtros</div>
            <div className="grid gap-3">
              <Select label="Concurso" placeholder="Todos" options={["PM", "PRF", "PF", "TJ"]} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
              <Select label="Area" placeholder="Todas" options={["Constitucional", "Administrativo", "Consumidor", "Geral"]} value={filters.area} onChange={(event) => setFilters((current) => ({ ...current, area: event.target.value }))} />
              <Select label="Materia" placeholder="Todas" options={["Direito Constitucional", "Direito Administrativo", "Legislacao"]} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
              <Input label="Assunto" value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} placeholder="Ex.: principios, regime..." />
              <Select label="Tipo de norma" placeholder="Todos" options={["Constituicao", "Codigo", "Lei"]} value={filters.tipo} onChange={(event) => setFilters((current) => ({ ...current, tipo: event.target.value }))} />
              <Select label="Status" placeholder="Todos" options={[{ value: "estudada", label: "Estudada" }, { value: "nao_estudada", label: "Nao estudada" }, { value: "revisando", label: "Revisando" }]} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
            </div>
          </Card>
          <Card hover={false}>
            <h2 className="mb-3 text-sm font-bold text-white">Normas</h2>
            <div className="space-y-2">
              {filteredLeis.map((item) => (
                <button key={item.id} onClick={() => setActiveLei(item)} className={`w-full rounded-lg border p-3 text-left text-sm transition ${lei?.id === item.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400"}`}>
                  <strong className="block">{item.nome}</strong>
                  <span className="mt-1 block text-xs opacity-75">{item.area} · {item.tipo}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
        <Card hover={false}>
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar termo no texto da norma" label="Busca na norma" />
            <Button variant="ghost" onClick={() => { setQuery(""); setFilters({ concurso: "", area: "", materia: "", assunto: "", tipo: "", status: "" }); }}>Limpar</Button>
          </div>
          {visible.map((artigo) => (
            <article key={artigo.id} className={`mb-4 rounded-lg border border-gray-800 p-4 ${grifos[artigo.id] ? "bg-amber-500/10" : query ? "bg-indigo-500/10" : ""}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-white">{artigo.capitulo} - Art. {artigo.numero}</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" icon={Highlighter} onClick={() => handleGrifar(artigo.id)}>Marcar</Button>
                  <Button size="sm" variant="ghost" icon={Bookmark} onClick={() => handleFavorito(artigo.id)}>{favoritos.includes(artigo.id) ? "Favorito" : "Favoritar"}</Button>
                </div>
              </div>
              <p className="text-gray-300 [&_mark]:rounded [&_mark]:bg-amber-300 [&_mark]:px-1 [&_mark]:text-gray-950" dangerouslySetInnerHTML={{ __html: highlight(artigo.texto) }} />
              <Input icon={StickyNote} value={notas[artigo.id] || ""} onChange={(event) => handleNota(artigo.id, event.target.value)} placeholder="Nota pessoal" className="mt-3" />
            </article>
          ))}
        </Card>
      </div>
    </div>
  );
}
