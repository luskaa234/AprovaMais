import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, Bookmark, Brain, CheckCircle2, FileQuestion, Filter, Highlighter, Search, Sparkles } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, Textarea, cx } from "../../components";
import { useInternalRouter, useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { Modal } from "../../modals";
import { leisService } from "../../services";
import { useLeisStore } from "../../stores";

const statusOptions = [
  { value: "com_texto", label: "Com texto" },
  { value: "sem_texto", label: "Aguardando texto" },
  { value: "mais_cobrada", label: "Mais cobrada" },
];

const readerSizes = [
  { value: "md", label: "A" },
  { value: "lg", label: "A+" },
  { value: "xl", label: "A++" },
];

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function flattenArticles(lei) {
  return (lei?.capitulos || []).flatMap((capitulo) => (capitulo.artigos || []).map((artigo) => ({
    ...artigo,
    leiId: lei.id,
    lei_id: artigo.lei_id || lei.id,
    lei: lei.nome,
    tipo: lei.tipo,
    materia: lei.materia,
    concurso: lei.concurso || "Geral",
    area: lei.categoria || lei.materia,
    status: lei.status || (lei.hasText ? "com_texto" : "sem_texto"),
    capitulo: artigo.capitulo || capitulo.nome,
    secao: capitulo.secao || capitulo.nome,
    cobrancas: artigo.cobrancas || 0,
  })));
}

function normalizeLei(lei) {
  return {
    ...lei,
    tipo: lei.tipo || "Lei",
    materia: lei.materia || lei.categoria || "Legislacao",
    concurso: lei.concurso || "Geral",
    area: lei.categoria || lei.materia || "Legislacao",
    status: lei.total_artigos > 0 ? "com_texto" : "sem_texto",
  };
}

function sourceHint(lei) {
  if (!lei?.fonte) return "";
  return `Fonte para copiar: ${lei.fonte}`;
}

export default function LeisSecasPage() {
  const load = useCallback(() => leisService.getLeis(), []);
  const { data: baseLeis = [], isLoading } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const { navigate } = useInternalRouter();
  const notas = useLeisStore((state) => state.notas);
  const grifos = useLeisStore((state) => state.grifos);
  const favoritos = useLeisStore((state) => state.favoritos);
  const salvarNota = useLeisStore((state) => state.salvarNota);
  const grifarArtigo = useLeisStore((state) => state.grifarArtigo);
  const toggleFavorito = useLeisStore((state) => state.toggleFavorito);
  const [activeLeiId, setActiveLeiId] = useState("");
  const [activeArticleId, setActiveArticleId] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ materia: "", assunto: "", tipo: "", status: "" });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [studied, setStudied] = useState({});
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [actionLoading, setActionLoading] = useState("");
  const [readerScale, setReaderScale] = useState("lg");

  const normas = useMemo(() => baseLeis.map(normalizeLei), [baseLeis]);
  const filteredNormas = useMemo(() => normas.filter((lei) => {
    const articles = flattenArticles(lei);
    const text = [lei.nome, lei.nome_curto, lei.tipo, lei.materia, lei.area, lei.concurso].join(" ");
    if (query && !normalize(text).includes(normalize(query)) && !articles.some((artigo) => normalize([artigo.numero_texto, artigo.texto, artigo.capitulo, artigo.secao].join(" ")).includes(normalize(query)))) return false;
    if (filters.materia && lei.materia !== filters.materia) return false;
    if (filters.tipo && lei.tipo !== filters.tipo) return false;
    if (filters.status === "com_texto" && !lei.total_artigos) return false;
    if (filters.status === "sem_texto" && lei.total_artigos) return false;
    if (filters.status === "mais_cobrada" && !articles.some((artigo) => artigo.cobrancas > 0 || artigo.importancia >= 5)) return false;
    if (filters.assunto && !articles.some((artigo) => normalize([artigo.capitulo, artigo.secao, artigo.texto, ...(artigo.tags || [])].join(" ")).includes(normalize(filters.assunto)))) return false;
    return true;
  }), [filters, normas, query]);

  const activeLei = filteredNormas.find((lei) => lei.id === activeLeiId) || filteredNormas.find((lei) => lei.total_artigos) || filteredNormas[0] || normas[0];
  const articles = useMemo(() => flattenArticles(activeLei).filter((artigo) => {
    if (!query) return true;
    return normalize([artigo.numero_texto, artigo.texto, artigo.capitulo, artigo.secao, artigo.lei, ...(artigo.tags || [])].join(" ")).includes(normalize(query));
  }).sort((a, b) => (b.cobrancas || 0) - (a.cobrancas || 0) || a.numero - b.numero), [activeLei, query]);
  const activeArticle = articles.find((artigo) => artigo.id === activeArticleId) || articles[0];
  const revisoes = useMemo(() => activeArticle ? [`Revisar ${activeArticle.lei} hoje`, `Resolver questoes oficiais ligadas a ${activeArticle.materia}`] : [], [activeArticle]);
  const stats = useMemo(() => ({
    normas: normas.length,
    comTexto: normas.filter((lei) => lei.total_artigos > 0).length,
    artigos: normas.reduce((sum, lei) => sum + flattenArticles(lei).length, 0),
    favoritos: favoritos.length,
  }), [favoritos.length, normas]);
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = useCallback((text = "") => safeQuery ? text.replace(new RegExp(`(${safeQuery})`, "ig"), "<mark>$1</mark>") : text, [safeQuery]);
  const notify = useCallback((title, message, type = "success") => addNotification({ type, title, message }), [addNotification]);
  const activeFilterCount = [query, ...Object.values(filters)].filter(Boolean).length;
  const articleTextSize = {
    md: "text-base leading-8",
    lg: "text-lg leading-9",
    xl: "text-xl leading-10",
  }[readerScale];

  const filtersContent = (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
      <Input icon={Search} label="Pesquisa" placeholder="Artigo, lei, palavra-chave ou numero" value={query} onChange={(event) => setQuery(event.target.value)} />
      <Select label="Materia" placeholder="Todas" options={[...new Set(normas.map((lei) => lei.materia).filter(Boolean))]} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
      <Input label="Assunto" placeholder="Capitulo, tag ou termo" value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
      <Select label="Tipo" placeholder="Todos" options={[...new Set(normas.map((lei) => lei.tipo).filter(Boolean))]} value={filters.tipo} onChange={(event) => setFilters((current) => ({ ...current, tipo: event.target.value }))} />
      <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
    </div>
  );

  useEffect(() => {
    let cancelled = false;
    if (!activeArticle) return undefined;
    leisService.questoesReaisDoArtigo(activeArticle)
      .then((items) => {
        if (!cancelled) setRelatedQuestions(items);
      })
      .catch(() => {
        if (!cancelled) setRelatedQuestions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [activeArticle]);

  const markStudied = useCallback((artigoId) => {
    setStudied((current) => ({ ...current, [artigoId]: !current[artigoId] }));
    notify("Artigo atualizado", "Status de estudo registrado.");
  }, [notify]);

  const handleNote = useCallback((artigoId, value) => {
    salvarNota(artigoId, value);
    leisService.salvarNota(artigoId, value).catch(() => {});
  }, [salvarNota]);

  const handleFlashcards = useCallback(async () => {
    if (!activeArticle) return;
    setActionLoading("flashcards");
    try {
      const deck = await leisService.gerarFlashcardsDeArtigo(activeArticle);
      notify("Flashcards criados", `${deck.cards.length} cards adicionados ao SM-2 em ${deck.titulo}.`);
    } catch {
      notify("Nao foi possivel gerar flashcards", "Confira a chave/cota da IA ou tente novamente.", "warning");
    } finally {
      setActionLoading("");
    }
  }, [activeArticle, notify]);

  const handlePractice = useCallback(async () => {
    if (!activeArticle) return;
    setActionLoading("questoes");
    try {
      const result = await leisService.gerarQuestaoDeArtigo(activeArticle);
      if (result.tipo === "oficiais") {
        notify("Questoes oficiais encontradas", `${result.questoes.length} questoes reais relacionadas ao artigo.`);
      } else {
        notify("Questao inedita criada", "Ela foi marcada como Inedita - da lei.");
      }
      navigate("questoes");
    } catch {
      notify("Nao foi possivel preparar questoes", "Tente novamente em instantes.", "warning");
    } finally {
      setActionLoading("");
    }
  }, [activeArticle, navigate, notify]);

  if (isLoading) return <div className="h-96 animate-pulse rounded-lg bg-gray-900" />;

  return (
    <div className="mx-auto flex max-w-[1680px] flex-col gap-4 pb-10 xl:h-[calc(100vh-8.5rem)] xl:overflow-hidden xl:pb-0">
      <div className="grid shrink-0 gap-4 rounded-lg border border-gray-800 bg-gray-950/80 p-4 md:p-5 xl:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Leis Secas</p>
          <h1 className="mt-1 text-3xl font-black text-white md:text-4xl">Leitor de lei seca</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">Texto oficial por artigo, com grifos, notas, flashcards e questoes conectadas. Use o indice lateral para navegar rapido sem perder a leitura.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:w-[520px]">
          {[
            ["Normas", stats.normas],
            ["Com texto", stats.comTexto],
            ["Artigos", stats.artigos],
            ["Favoritos", stats.favoritos],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-3">
              <span className="block text-xs font-semibold text-gray-500">{label}</span>
              <strong className="mt-1 block text-2xl text-white">{value}</strong>
            </div>
          ))}
        </div>
        <Button className="md:hidden" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>Filtros{activeFilterCount ? ` - ${activeFilterCount}` : ""}</Button>
      </div>

      <Card hover={false} className="hidden shrink-0 md:block">
        {filtersContent}
      </Card>

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[340px_minmax(0,1fr)_320px] xl:overflow-hidden 2xl:grid-cols-[360px_minmax(0,1fr)_330px]">
        <aside className="min-h-0 space-y-4 xl:flex xl:h-full xl:flex-col xl:gap-4 xl:space-y-0 xl:overflow-hidden">
          <Card hover={false} className="p-0 xl:flex xl:h-[34%] xl:min-h-0 xl:flex-col">
            <div className="border-b border-gray-800 p-4">
              <div className="flex items-center gap-2 text-base font-bold text-white"><BookOpen size={18} /> Normas</div>
              <p className="mt-1 text-xs text-gray-500">{filteredNormas.length} itens encontrados</p>
            </div>
            <div className="max-h-[280px] space-y-2 overflow-y-auto p-3 pr-2 xl:min-h-0 xl:flex-1 xl:max-h-none">
              {filteredNormas.map((lei) => (
                <button key={lei.id} onClick={() => { setActiveLeiId(lei.id); setActiveArticleId(""); }} className={cx("w-full rounded-lg border p-3 text-left transition", activeLei?.id === lei.id ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-950/30" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400 hover:bg-gray-800")}>
                  <strong className="block text-sm leading-5">{lei.nome}</strong>
                  <span className="mt-2 flex items-center justify-between gap-2 text-xs opacity-80">
                    <span>{lei.tipo}</span>
                    <span>{lei.total_artigos || 0} artigos</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card hover={false} className="p-0 xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
            <div className="border-b border-gray-800 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-white">Artigos</h2>
                  <p className="mt-1 text-xs text-gray-500">{activeLei?.nome_curto || activeLei?.nome}</p>
                </div>
                <Badge variant={activeLei?.total_artigos ? "success" : "neutral"}>{articles.length}</Badge>
              </div>
            </div>
            {articles.length ? (
              <nav className="max-h-[430px] space-y-2 overflow-y-auto p-3 pr-2 xl:min-h-0 xl:flex-1 xl:max-h-none">
                {articles.map((artigo) => (
                  <button key={artigo.id} onClick={() => setActiveArticleId(artigo.id)} className={cx("w-full rounded-lg border p-3 text-left transition", activeArticle?.id === artigo.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400")}>
                    <span className="flex items-center justify-between gap-2">
                      <strong className="text-base">Art. {artigo.numero_texto || artigo.numero}</strong>
                      {favoritos.includes(artigo.id) ? <Bookmark size={14} className="text-amber-200" /> : null}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-5 opacity-75">{artigo.capitulo}</span>
                    {artigo.cobrancas ? <span className="mt-2 inline-flex rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-200">{artigo.cobrancas} cobrancas</span> : null}
                  </button>
                ))}
              </nav>
            ) : (
              <div className="p-3">
                <EmptyState icon={Search} title="Sem artigos" description="Cole o texto oficial e rode o minerador de leis." />
              </div>
            )}
          </Card>
        </aside>

        <main className="min-w-0 rounded-lg border border-gray-800 bg-gray-950/75 xl:flex xl:h-full xl:min-h-0 xl:flex-col xl:overflow-hidden">
          <div className="border-b border-gray-800 p-4 md:p-5 xl:shrink-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-300">{activeLei?.tipo} - {activeLei?.materia}</p>
                <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">{activeLei?.nome}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">{sourceHint(activeLei) || "Texto organizado por artigos para leitura, revisao e pratica."}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 p-1">
                {readerSizes.map((item) => (
                  <button key={item.value} type="button" onClick={() => setReaderScale(item.value)} className={cx("min-h-9 rounded-md px-3 text-sm font-bold transition", readerScale === item.value ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white")}>{item.label}</button>
                ))}
              </div>
            </div>
          </div>

          {activeArticle ? (
            <article className={cx("min-h-[680px] p-4 md:p-7 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:p-9", grifos[activeArticle.id] && "bg-amber-500/5")}>
              <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-300">{activeArticle.capitulo}</p>
                    <h3 className="mt-2 text-3xl font-black text-white md:text-4xl">Art. {activeArticle.numero_texto || activeArticle.numero}</h3>
                    {activeArticle.tags?.length ? <p className="mt-2 text-sm text-gray-500">{activeArticle.tags.join(" - ")}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" icon={Highlighter} onClick={() => grifarArtigo(activeArticle.id, grifos[activeArticle.id] ? undefined : "yellow")}>Grifar</Button>
                    <Button size="sm" variant="outline" icon={Bookmark} onClick={() => toggleFavorito(activeArticle.id)}>{favoritos.includes(activeArticle.id) ? "Favorito" : "Favoritar"}</Button>
                    <Button size="sm" variant="outline" icon={CheckCircle2} onClick={() => markStudied(activeArticle.id)}>{studied[activeArticle.id] ? "Estudado" : "Marcar estudado"}</Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-800 bg-gray-900/70 px-5 py-6 md:px-8 md:py-8">
                <p className={cx("whitespace-pre-wrap text-gray-100 [&_mark]:rounded [&_mark]:bg-amber-300 [&_mark]:px-1 [&_mark]:text-gray-950", articleTextSize)} dangerouslySetInnerHTML={{ __html: highlight(activeArticle.texto) }} />
              </div>

              <div className="mt-5 rounded-lg border border-gray-800 bg-gray-950 p-4">
                <Textarea label="Anotacao vinculada" value={notas[activeArticle.id] || ""} onChange={(event) => handleNote(activeArticle.id, event.target.value)} placeholder="Escreva uma observacao sobre este artigo" />
              </div>
            </article>
          ) : (
            <div className="p-4 xl:overflow-y-auto">
              <EmptyState icon={Search} title="Nenhum artigo parseado" description="Cole o texto oficial em texto.txt desta lei e rode npm run miner:leis." />
            </div>
          )}
        </main>

        <aside className="min-h-0 space-y-4 xl:h-full xl:overflow-y-auto xl:pr-1">
          <Card hover={false}>
            <h2 className="mb-3 text-lg font-bold text-white">Estudar este artigo</h2>
            <div className="grid gap-2">
              <Button size="md" variant="secondary" icon={Brain} onClick={handleFlashcards} disabled={!activeArticle || actionLoading === "flashcards"}>Gerar flashcards</Button>
              <Button size="md" variant="secondary" icon={FileQuestion} onClick={handlePractice} disabled={!activeArticle || actionLoading === "questoes"}>Praticar questoes</Button>
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="mb-2 text-lg font-bold text-white">Questoes oficiais</h2>
            <p className="mb-3 text-sm leading-5 text-gray-500">{activeArticle ? `${relatedQuestions.length} questoes oficiais relacionadas a este artigo.` : "Selecione um artigo."}</p>
            <div className="space-y-2">
              {relatedQuestions.slice(0, 5).map((item) => (
                <button key={item.id} className="w-full rounded-lg border border-gray-800 bg-gray-900 p-3 text-left text-sm text-gray-300 hover:border-blue-400 hover:bg-gray-800" onClick={() => navigate("questoes")} type="button">
                  <FileQuestion className="mb-2 text-blue-300" size={16} />
                  <strong>{item.banca || "Oficial"}</strong>
                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-gray-400">{item.enunciado}</p>
                  <span className="mt-2 inline-flex"><Badge variant="success">Oficial</Badge></span>
                </button>
              ))}
              {!relatedQuestions.length ? <p className="rounded-lg border border-dashed border-gray-800 bg-gray-900 p-3 text-sm leading-5 text-gray-500">Sem vinculos oficiais ainda. A pratica pode criar uma questao inedita marcada como IA.</p> : null}
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="mb-3 text-lg font-bold text-white">Mais importantes</h2>
            <div className="space-y-2">
              {articles.filter((item) => item.cobrancas || item.importancia >= 5).slice(0, 6).map((item) => (
                <button key={item.id} type="button" onClick={() => setActiveArticleId(item.id)} className="w-full rounded-lg border border-gray-800 bg-gray-900 p-3 text-left text-sm text-gray-300 hover:border-amber-300">
                  <Sparkles className="mb-2 text-amber-300" size={16} />
                  <strong>Art. {item.numero_texto || item.numero}</strong>
                  <p className="mt-1 text-xs text-gray-500">{item.cobrancas || 0} questoes oficiais relacionadas</p>
                </button>
              ))}
              {!articles.filter((item) => item.cobrancas || item.importancia >= 5).length ? <p className="rounded-lg bg-gray-900 p-3 text-sm text-gray-500">Sem ranking de cobranca para esta norma ainda.</p> : null}
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="mb-3 text-lg font-bold text-white">Revisoes</h2>
            <div className="space-y-2">
              {revisoes.map((item) => <div key={item} className="rounded-lg bg-gray-900 p-3 text-sm leading-5 text-gray-300">{item}</div>)}
            </div>
          </Card>
        </aside>
      </div>

      <Modal open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)} footer={<Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>}>
        {filtersContent}
      </Modal>
    </div>
  );
}
