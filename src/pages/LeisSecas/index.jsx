import { useCallback, useMemo, useState } from "react";
import { Bookmark, Brain, CalendarPlus, CheckCircle2, FileQuestion, Filter, Highlighter, Layers, Search, StickyNote } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { useNotifications } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { leisService } from "../../services";
import { useLeisStore } from "../../stores";

const extraNormas = [
  {
    id: "cp",
    nome: "Codigo Penal",
    tipo: "Codigo",
    materia: "Direito Penal",
    concurso: "PF",
    area: "Penal",
    status: "mais_cobrada",
    capitulos: [
      { nome: "Parte Geral", secao: "Aplicacao da lei penal", artigos: [{ id: "cp-1", numero: "1", texto: "Nao ha crime sem lei anterior que o defina. Nao ha pena sem previa cominacao legal." }, { id: "cp-2", numero: "2", texto: "Ninguem pode ser punido por fato que lei posterior deixa de considerar crime." }] },
      { nome: "Crimes contra a administracao", secao: "Crimes praticados por funcionario publico", artigos: [{ id: "cp-312", numero: "312", texto: "Apropriar-se o funcionario publico de dinheiro, valor ou qualquer outro bem movel, publico ou particular, de que tem a posse em razao do cargo." }] },
    ],
  },
  {
    id: "cpp",
    nome: "Codigo de Processo Penal",
    tipo: "Codigo",
    materia: "Direito Processual Penal",
    concurso: "PC",
    area: "Processual Penal",
    status: "revisando",
    capitulos: [{ nome: "Inquerito policial", secao: "Disposicoes gerais", artigos: [{ id: "cpp-4", numero: "4", texto: "A policia judiciaria sera exercida pelas autoridades policiais no territorio de suas respectivas circunscricoes." }, { id: "cpp-6", numero: "6", texto: "Logo que tiver conhecimento da pratica da infracao penal, a autoridade policial devera dirigir-se ao local." }] }],
  },
  {
    id: "eap",
    nome: "Estatuto da Pessoa com Deficiencia",
    tipo: "Estatuto",
    materia: "Direitos Humanos",
    concurso: "TJ",
    area: "Estatutos",
    status: "nao_estudada",
    capitulos: [{ nome: "Disposicoes preliminares", secao: "Igualdade e nao discriminacao", artigos: [{ id: "epcd-4", numero: "4", texto: "Toda pessoa com deficiencia tem direito a igualdade de oportunidades com as demais pessoas e nao sofrera nenhuma especie de discriminacao." }] }],
  },
  {
    id: "sumulas-stj",
    nome: "Sumulas do STJ",
    tipo: "Sumula",
    materia: "Jurisprudencia",
    concurso: "Geral",
    area: "Sumulas",
    status: "mais_cobrada",
    capitulos: [{ nome: "Sumulas selecionadas", secao: "Direito Administrativo", artigos: [{ id: "stj-473", numero: "473", texto: "A administracao pode anular seus proprios atos quando eivados de vicios que os tornam ilegais, respeitados os direitos adquiridos." }] }],
  },
  {
    id: "info-stf",
    nome: "Informativos STF",
    tipo: "Informativo",
    materia: "Direito Constitucional",
    concurso: "Geral",
    area: "Informativos",
    status: "revisando",
    capitulos: [{ nome: "Temas recentes", secao: "Controle de constitucionalidade", artigos: [{ id: "info-stf-1", numero: "Tema 1", texto: "Entendimento recente sobre controle concentrado, modulacao de efeitos e protecao da seguranca juridica." }] }],
  },
];

const statusOptions = [
  { value: "estudada", label: "Estudada" },
  { value: "nao_estudada", label: "Nao estudada" },
  { value: "revisando", label: "Revisando" },
  { value: "mais_cobrada", label: "Mais cobrada" },
];

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function inferNorma(item) {
  const name = item.nome || "";
  const lower = normalize(name);
  const tipo = item.tipo || (lower.includes("constituicao") ? "Constituicao Federal" : lower.includes("codigo") ? "Codigo" : lower.includes("sumula") ? "Sumula" : lower.includes("informativo") ? "Informativo" : "Lei Especial");
  const materia = item.materia || (lower.includes("constit") ? "Direito Constitucional" : lower.includes("8.112") ? "Direito Administrativo" : lower.includes("consumidor") ? "Direito do Consumidor" : "Legislacao");
  return {
    ...item,
    tipo,
    materia,
    concurso: item.concurso || (lower.includes("8.112") ? "PF" : lower.includes("consumidor") ? "TJ" : "Geral"),
    area: item.area || materia.replace("Direito ", ""),
    status: item.status || "nao_estudada",
  };
}

function flattenArticles(lei) {
  return (lei?.capitulos || []).flatMap((capitulo) => (capitulo.artigos || []).map((artigo) => ({
    ...artigo,
    leiId: lei.id,
    lei: lei.nome,
    tipo: lei.tipo,
    materia: lei.materia,
    concurso: lei.concurso,
    area: lei.area,
    status: lei.status,
    capitulo: capitulo.nome,
    secao: capitulo.secao || capitulo.nome,
  })));
}

export default function LeisSecasPage() {
  const load = useCallback(() => leisService.getLeis(), []);
  const { data: baseLeis = [] } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const notas = useLeisStore((state) => state.notas);
  const grifos = useLeisStore((state) => state.grifos);
  const favoritos = useLeisStore((state) => state.favoritos);
  const salvarNota = useLeisStore((state) => state.salvarNota);
  const grifarArtigo = useLeisStore((state) => state.grifarArtigo);
  const toggleFavorito = useLeisStore((state) => state.toggleFavorito);
  const [activeLeiId, setActiveLeiId] = useState("");
  const [activeArticleId, setActiveArticleId] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ concurso: "", materia: "", assunto: "", tipo: "", status: "" });
  const [studied, setStudied] = useState({});

  const normas = useMemo(() => [...baseLeis.map(inferNorma), ...extraNormas.map(inferNorma)], [baseLeis]);
  const filteredNormas = useMemo(() => normas.filter((lei) => {
    const text = [lei.nome, lei.tipo, lei.materia, lei.area, lei.concurso].join(" ");
    if (query && !normalize(text).includes(normalize(query)) && !flattenArticles(lei).some((artigo) => normalize([artigo.numero, artigo.texto, artigo.capitulo, artigo.secao].join(" ")).includes(normalize(query)))) return false;
    if (filters.concurso && lei.concurso !== filters.concurso && lei.concurso !== "Geral") return false;
    if (filters.materia && lei.materia !== filters.materia) return false;
    if (filters.tipo && lei.tipo !== filters.tipo) return false;
    if (filters.status && lei.status !== filters.status) return false;
    if (filters.assunto && !flattenArticles(lei).some((artigo) => normalize([artigo.capitulo, artigo.secao, artigo.texto].join(" ")).includes(normalize(filters.assunto)))) return false;
    return true;
  }), [filters, normas, query]);
  const activeLei = filteredNormas.find((lei) => lei.id === activeLeiId) || filteredNormas[0] || normas[0];
  const articles = useMemo(() => flattenArticles(activeLei).filter((artigo) => {
    if (!query) return true;
    return normalize([artigo.numero, artigo.texto, artigo.capitulo, artigo.secao, artigo.lei].join(" ")).includes(normalize(query));
  }), [activeLei, query]);
  const activeArticle = articles.find((artigo) => artigo.id === activeArticleId) || articles[0];
  const relatedQuestions = useMemo(() => activeArticle ? [
    { id: "q1", banca: "FGV", label: `${activeArticle.materia} - artigo ${activeArticle.numero}` },
    { id: "q2", banca: "CEBRASPE", label: `Aplicacao literal em ${activeArticle.secao}` },
  ] : [], [activeArticle]);
  const revisoes = useMemo(() => activeArticle ? [`Revisar ${activeArticle.lei} hoje`, `Refazer questoes de ${activeArticle.materia}`] : [], [activeArticle]);
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = useCallback((text = "") => safeQuery ? text.replace(new RegExp(`(${safeQuery})`, "ig"), "<mark>$1</mark>") : text, [safeQuery]);
  const notify = useCallback((title, message) => addNotification({ type: "success", title, message }), [addNotification]);

  const markStudied = useCallback((artigoId) => {
    setStudied((current) => ({ ...current, [artigoId]: !current[artigoId] }));
    notify("Artigo atualizado", "Status de estudo registrado.");
  }, [notify]);

  const handleNote = useCallback((artigoId, value) => {
    salvarNota(artigoId, value);
    leisService.salvarNota(artigoId, value).catch(() => {});
  }, [salvarNota]);

  return (
    <div className="mx-auto max-w-[1500px] pb-10">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Leis Secas</p>
        <h1 className="text-3xl font-black text-white">Vade Mecum de concursos</h1>
        <p className="mt-1 text-sm text-gray-400">Constituicao, codigos, estatutos, leis especiais, sumulas, informativos e normas mais cobradas.</p>
      </div>

      <Card hover={false} className="mb-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(5,1fr)]">
          <Input icon={Search} label="Pesquisa" placeholder="Artigo, lei, palavra-chave ou numero" value={query} onChange={(event) => setQuery(event.target.value)} />
          <Select label="Concurso" placeholder="Todos" options={[...new Set(normas.map((lei) => lei.concurso))]} value={filters.concurso} onChange={(event) => setFilters((current) => ({ ...current, concurso: event.target.value }))} />
          <Select label="Materia" placeholder="Todas" options={[...new Set(normas.map((lei) => lei.materia))]} value={filters.materia} onChange={(event) => setFilters((current) => ({ ...current, materia: event.target.value }))} />
          <Input label="Assunto" placeholder="Capitulo, secao ou termo" value={filters.assunto} onChange={(event) => setFilters((current) => ({ ...current, assunto: event.target.value }))} />
          <Select label="Tipo" placeholder="Todos" options={[...new Set(normas.map((lei) => lei.tipo))]} value={filters.tipo} onChange={(event) => setFilters((current) => ({ ...current, tipo: event.target.value }))} />
          <Select label="Status" placeholder="Todos" options={statusOptions} value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} />
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[310px_1fr_320px]">
        <aside className="space-y-4">
          <Card hover={false}>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><Filter size={16} /> Indice das normas</div>
            <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
              {filteredNormas.map((lei) => (
                <button key={lei.id} onClick={() => { setActiveLeiId(lei.id); setActiveArticleId(""); }} className={cx("w-full rounded-lg border p-3 text-left text-sm transition", activeLei?.id === lei.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400")}>
                  <strong className="block">{lei.nome}</strong>
                  <span className="mt-1 block text-xs opacity-75">{lei.tipo} · {lei.materia}</span>
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <main className="rounded-lg border border-gray-800 bg-gray-950/75">
          <div className="border-b border-gray-800 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-white">{activeLei?.nome}</h2>
                <p className="mt-1 text-sm text-gray-400">{activeLei?.tipo} · {activeLei?.materia} · {activeLei?.concurso}</p>
              </div>
              <Badge variant={activeLei?.status === "mais_cobrada" ? "warning" : "neutral"}>{activeLei?.status === "mais_cobrada" ? "Mais cobrada" : activeLei?.status || "Norma"}</Badge>
            </div>
          </div>

          <div className="grid gap-4 p-4 lg:grid-cols-[220px_1fr]">
            <nav className="max-h-[680px] space-y-2 overflow-y-auto pr-1">
              {articles.map((artigo) => (
                <button key={artigo.id} onClick={() => setActiveArticleId(artigo.id)} className={cx("w-full rounded-lg border p-3 text-left text-sm transition", activeArticle?.id === artigo.id ? "border-blue-500 bg-blue-600 text-white" : "border-gray-800 bg-gray-900 text-gray-300 hover:border-blue-400")}>
                  <strong>Art. {artigo.numero}</strong>
                  <span className="mt-1 line-clamp-2 block text-xs opacity-75">{artigo.secao}</span>
                </button>
              ))}
            </nav>

            {activeArticle ? (
              <article className={cx("min-h-[560px] rounded-lg border border-gray-800 bg-gray-900 p-5", grifos[activeArticle.id] && "bg-amber-500/10")}>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-300">{activeArticle.capitulo} · {activeArticle.secao}</p>
                    <h3 className="mt-1 text-2xl font-black text-white">Art. {activeArticle.numero}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="ghost" icon={Highlighter} onClick={() => grifarArtigo(activeArticle.id, grifos[activeArticle.id] ? undefined : "yellow")}>Marcar</Button>
                    <Button size="sm" variant="ghost" icon={Bookmark} onClick={() => toggleFavorito(activeArticle.id)}>{favoritos.includes(activeArticle.id) ? "Favorito" : "Favoritar"}</Button>
                    <Button size="sm" variant="ghost" icon={CheckCircle2} onClick={() => markStudied(activeArticle.id)}>{studied[activeArticle.id] ? "Estudado" : "Estudar"}</Button>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-lg leading-8 text-gray-100 [&_mark]:rounded [&_mark]:bg-amber-300 [&_mark]:px-1 [&_mark]:text-gray-950" dangerouslySetInnerHTML={{ __html: highlight(activeArticle.texto) }} />
                <div className="mt-6 rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <Input icon={StickyNote} label="Anotacao vinculada" value={notas[activeArticle.id] || ""} onChange={(event) => handleNote(activeArticle.id, event.target.value)} placeholder="Escreva uma observacao sobre este artigo" />
                </div>
              </article>
            ) : <EmptyState icon={Search} title="Nenhum artigo encontrado" description="Ajuste a pesquisa ou selecione outra norma." />}
          </div>
        </main>

        <aside className="space-y-4">
          <Card hover={false}>
            <h2 className="mb-3 font-bold text-white">Acoes do artigo</h2>
            <div className="grid gap-2">
              <Button size="sm" variant="secondary" icon={Brain} onClick={() => notify("Flashcard criado", "Artigo convertido em flashcard de revisao.")}>Criar flashcard</Button>
              <Button size="sm" variant="secondary" icon={Layers} onClick={() => notify("Mapa mental criado", "Artigo adicionado ao mapa mental da materia.")}>Criar mapa mental</Button>
              <Button size="sm" variant="secondary" icon={CalendarPlus} onClick={() => notify("Plano atualizado", "Artigo adicionado ao plano de estudos.")}>Adicionar ao plano</Button>
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="mb-3 font-bold text-white">Questoes relacionadas</h2>
            <div className="space-y-2">
              {relatedQuestions.map((item) => <div key={item.id} className="rounded-lg bg-gray-900 p-3 text-sm text-gray-300"><FileQuestion className="mb-2 text-blue-300" size={16} /><strong>{item.banca}</strong><p className="mt-1 text-xs text-gray-400">{item.label}</p></div>)}
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="mb-3 font-bold text-white">Revisoes pendentes</h2>
            <div className="space-y-2">
              {revisoes.map((item) => <div key={item} className="rounded-lg bg-gray-900 p-3 text-sm text-gray-300">{item}</div>)}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
