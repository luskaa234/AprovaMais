import { useCallback, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  CheckCircle2,
  FileQuestion,
  Flame,
  Highlighter,
  List,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Badge, Button, Card, DashboardSkeleton, EmptyState, Input, Textarea, cx } from "../../components";
import { useInternalRouter, useNotifications, useUser } from "../../contexts";
import { useAsyncData } from "../../hooks";
import { leisService } from "../../services";
import { useLeisStore } from "../../stores";

const chips = [
  { id: "edital", label: "Do meu edital" },
  { id: "cobradas", label: "Mais cobradas" },
  { id: "favoritas", label: "Favoritas" },
  { id: "todas", label: "Todas" },
];

const highlightColors = {
  yellow: "#FFF3A8",
  green: "#BFF3D9",
  pink: "#FFD2E0",
};

const EMPTY_LEITURA = {};

const importantByLaw = {
  cf88: {
    5: 132,
    37: 96,
    144: 84,
    6: 48,
    7: 42,
  },
};

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function flexibleTextPattern(value = "") {
  return String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(escapeRegExp)
    .join("\\s+");
}

function getArticleNumber(value = "") {
  const match = String(value).match(/Art\.?\s*(\d+)/i) || String(value).match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

function splitArticleText(rawArticle, lei, chapter) {
  const text = String(rawArticle.texto || "").trim();
  const pieces = text.split(/\n(?=Art\.?\s*\d+)/i).filter(Boolean);
  const sourcePieces = pieces.length > 1 ? pieces : [text || `Art. ${rawArticle.numero_texto || rawArticle.numero}. Texto indisponível.`];

  return sourcePieces.map((piece, index) => {
    const numero = getArticleNumber(piece) || Number(rawArticle.numero) + index || index + 1;
    const id = index === 0 ? rawArticle.id : `${rawArticle.id}-p${index}`;
    const cobrancas = rawArticle.cobrancas || importantByLaw[lei.id]?.[numero] || 0;
    return {
      ...rawArticle,
      id,
      leiId: lei.id,
      lei_id: lei.id,
      lei: lei.nome,
      leiCurta: lei.nome_curto || lei.nome,
      area: lei.categoria || lei.materia || "Legislacao",
      materia: lei.materia || lei.categoria || "Legislacao",
      tipo: lei.tipo || "Lei",
      numero,
      numero_texto: String(numero || rawArticle.numero_texto || rawArticle.numero || ""),
      texto: piece.trim(),
      secao: rawArticle.secao || chapter.secao || chapter.nome || "Parte principal",
      capitulo: rawArticle.capitulo || chapter.nome || chapter.secao || "Parte principal",
      cobrancas,
      importancia: rawArticle.importancia || (cobrancas ? 5 : 3),
      tags: rawArticle.tags || [],
    };
  });
}

function flattenArticles(lei) {
  const expanded = (lei?.capitulos || []).flatMap((chapter) =>
    (chapter.artigos || []).flatMap((article) => splitArticleText(article, lei, chapter))
  );
  const seen = new Set();
  return expanded
    .filter((article) => {
      const key = `${article.leiId}-${article.numero}-${normalize(article.texto).slice(0, 90)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => Number(a.numero || 0) - Number(b.numero || 0));
}

function getDisplayTotal(lei, articles) {
  if (lei.id === "cf88") return "250 artigos + 148 ADCT";
  return `${articles.length} artigos`;
}

function buildLawView(lei, leitura = {}) {
  const articles = flattenArticles(lei);
  const read = articles.filter((article) => leitura[article.id]).length;
  const total = articles.length;
  const progress = total ? Math.round((read / total) * 100) : 0;
  return {
    ...lei,
    area: lei.categoria || lei.materia || "Legislacao",
    materia: lei.materia || lei.categoria || "Legislacao",
    tipo: lei.tipo || "Lei",
    articles,
    read,
    total,
    progress,
    displayTotal: getDisplayTotal(lei, articles),
    hotCount: articles.reduce((sum, item) => sum + Number(item.cobrancas || 0), 0),
  };
}

function buildSections(articles) {
  const grouped = new Map();
  articles.forEach((article) => {
    const name = article.capitulo || article.secao || "Parte principal";
    if (!grouped.has(name)) grouped.set(name, []);
    grouped.get(name).push(article);
  });
  return [...grouped.entries()].map(([name, items], index) => ({
    id: `${index}-${normalize(name).replace(/\s+/g, "-")}`,
    name,
    articles: items,
    start: items[0]?.numero_texto || items[0]?.numero,
    end: items.at(-1)?.numero_texto || items.at(-1)?.numero,
    hot: items.some((item) => item.cobrancas > 0 || item.importancia >= 5),
    questions: items.reduce((sum, item) => sum + Number(item.cobrancas || 0), 0),
  }));
}

function excerpt(article, maxLength = 220) {
  const clean = String(article.texto || "").replace(/\s+/g, " ").replace(/^Art\.?\s*\d+\.?\s*/i, "").trim();
  if (!clean) return article.capitulo || "Texto do artigo";
  if (!maxLength || clean.length <= maxLength) return clean;
  const clipped = clean.slice(0, maxLength + 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const safeText = clipped.slice(0, lastSpace > maxLength * 0.65 ? lastSpace : maxLength).trim();
  return `${safeText}...`;
}

function applyMarks(text, marks = [], query = "") {
  let html = escapeHtml(text);
  marks
    .filter((mark) => mark?.trecho)
    .slice()
    .sort((a, b) => String(b.trecho).length - String(a.trecho).length)
    .forEach((mark) => {
      const color = highlightColors[mark.cor] || highlightColors.yellow;
      const pattern = new RegExp(flexibleTextPattern(escapeHtml(mark.trecho)), "g");
      html = html.replace(pattern, `<mark style="background:${color}">$&</mark>`);
    });
  if (query) {
    html = html.replace(new RegExp(`(${escapeRegExp(escapeHtml(query))})`, "ig"), '<mark class="law-search-mark">$1</mark>');
  }
  return html;
}

function formatArticleHtml(article, marks, query) {
  const readableText = String(article.texto || "")
    .replace(/\s+(?=(?:§|Â§)\s*\d)/g, "\n")
    .replace(/\s+(?=Paragrafo unico|Parágrafo único)/gi, "\n")
    .replace(/\s+(?=(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)\s*-)/g, "\n")
    .replace(/\s+(?=[a-z]\)\s)/g, "\n");

  return applyMarks(readableText, marks, query)
    .split(/\n+/)
    .map((line) => {
      const trimmed = line.trim();
      const isIndent = /^(I|V|X|L|C|D|M)+\s*-|^[a-z]\)/i.test(trimmed) || /^§/.test(trimmed);
      return `<p class="${isIndent ? "law-reader-indent" : ""}">${trimmed}</p>`;
    })
    .join("");
}

function levelTitle(level) {
  if (level === "laws") return "Leis";
  if (level === "structure") return "Estrutura";
  if (level === "articles") return "Artigos";
  return "Leitor";
}

export default function LeisSecasPage() {
  const load = useCallback(() => leisService.getLeis(), []);
  const { data: rawLaws = [], isLoading } = useAsyncData(load);
  const { addNotification } = useNotifications();
  const { navigate } = useInternalRouter();
  const { user } = useUser();
  const notas = useLeisStore((state) => state.notas);
  const grifos = useLeisStore((state) => state.grifos);
  const favoritos = useLeisStore((state) => state.favoritos);
  const leitura = useLeisStore((state) => state.leitura || EMPTY_LEITURA);
  const salvarNota = useLeisStore((state) => state.salvarNota);
  const grifarArtigo = useLeisStore((state) => state.grifarArtigo);
  const removerGrifo = useLeisStore((state) => state.removerGrifo);
  const toggleFavorito = useLeisStore((state) => state.toggleFavorito);
  const marcarLidoLocal = useLeisStore((state) => state.marcarLido);

  const [level, setLevel] = useState("laws");
  const [chip, setChip] = useState("edital");
  const [structureChip, setStructureChip] = useState("estrutura");
  const [query, setQuery] = useState("");
  const [selectedLawId, setSelectedLawId] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");

  const laws = useMemo(() => rawLaws.map((law) => buildLawView(law, leitura)), [leitura, rawLaws]);
  const allArticles = useMemo(() => laws.flatMap((law) => law.articles), [laws]);
  const hotArticles = useMemo(() => [...allArticles].sort((a, b) => (b.cobrancas || 0) - (a.cobrancas || 0)).filter((item) => item.cobrancas || item.importancia >= 5), [allArticles]);
  const selectedLaw = laws.find((law) => law.id === selectedLawId) || laws[0];
  const sections = useMemo(() => buildSections(selectedLaw?.articles || []), [selectedLaw]);
  const selectedSection = sections.find((section) => section.id === selectedSectionId) || sections[0];
  const articleList = structureChip === "todos"
    ? selectedLaw?.articles || []
    : selectedSection?.articles || selectedLaw?.articles || [];
  const selectedArticle = allArticles.find((article) => article.id === selectedArticleId) || articleList[0] || allArticles[0];
  const selectedIndex = selectedLaw?.articles.findIndex((article) => article.id === selectedArticle?.id) ?? -1;
  const articleMarks = Array.isArray(grifos[selectedArticle?.id]) ? grifos[selectedArticle?.id] : [];

  const filteredLaws = useMemo(() => {
    const q = normalize(query);
    let source = laws;
    if (chip === "favoritas") source = laws.filter((law) => law.articles.some((article) => favoritos.includes(article.id)));
    if (chip === "cobradas") source = laws.filter((law) => law.hotCount > 0);
    if (chip === "edital") source = laws.filter((law) => ["Constitucional", "Penal", "Processual", "Militar", "Legislacao", "Administrativo"].some((term) => normalize(law.area).includes(normalize(term)) || normalize(law.materia).includes(normalize(term))));
    if (!q) return source;
    return source.filter((law) =>
      normalize(`${law.nome} ${law.nome_curto} ${law.area} ${law.materia}`).includes(q) ||
      law.articles.some((article) => normalize(`${article.numero_texto} ${article.texto} ${article.capitulo}`).includes(q))
    );
  }, [chip, favoritos, laws, query]);

  const groupedLaws = useMemo(() => filteredLaws.reduce((acc, law) => {
    const key = law.area || "Legislacao";
    acc[key] = acc[key] || [];
    acc[key].push(law);
    return acc;
  }, {}), [filteredLaws]);

  const searchHits = useMemo(() => {
    if (!query) return [];
    const q = normalize(query);
    return allArticles.filter((article) => normalize(`${article.numero_texto} ${article.texto} ${article.capitulo} ${article.lei}`).includes(q)).slice(0, 12);
  }, [allArticles, query]);

  const notify = useCallback((title, message, type = "success") => addNotification({ title, message, type }), [addNotification]);

  const openLaw = useCallback((lawId) => {
    const law = laws.find((item) => item.id === lawId);
    setSelectedLawId(lawId);
    setSelectedSectionId("");
    setSelectedArticleId("");
    setLevel((law?.articles || []).length ? "structure" : "laws");
  }, [laws]);

  const openSection = useCallback((sectionId) => {
    const section = sections.find((item) => item.id === sectionId);
    setSelectedSectionId(sectionId);
    setSelectedArticleId(section?.articles[0]?.id || "");
    setLevel("articles");
  }, [sections]);

  const openArticle = useCallback((articleId) => {
    const article = allArticles.find((item) => item.id === articleId);
    if (article) {
      setSelectedLawId(article.leiId);
      const nextSection = buildSections(laws.find((law) => law.id === article.leiId)?.articles || []).find((section) => section.articles.some((item) => item.id === article.id));
      setSelectedSectionId(nextSection?.id || "");
      setSelectedArticleId(articleId);
      setLevel("reader");
      setSheetOpen(false);
      setExplanation("");
    }
  }, [allArticles, laws]);

  const goBack = useCallback(() => {
    if (level === "reader") return setLevel("articles");
    if (level === "articles") return setLevel("structure");
    if (level === "structure") return setLevel("laws");
    return null;
  }, [level]);

  const goSibling = useCallback((direction) => {
    if (!selectedLaw || selectedIndex < 0) return;
    const next = selectedLaw.articles[selectedIndex + direction];
    if (next) openArticle(next.id);
  }, [openArticle, selectedIndex, selectedLaw]);

  const readCurrentSelection = useCallback(() => {
    const selection = window.getSelection?.();
    const text = selection?.toString().replace(/\s+/g, " ").trim() || "";
    return text.slice(0, 600);
  }, []);

  const handleSelection = useCallback(() => {
    window.setTimeout(() => {
      const text = readCurrentSelection();
      if (text) setSelectedText(text);
    }, 80);
  }, [readCurrentSelection]);

  const saveHighlight = useCallback(async (cor) => {
    if (!selectedArticle) return;
    const trecho = readCurrentSelection() || selectedText || selectedArticle.texto.slice(0, 180);
    grifarArtigo(selectedArticle.id, cor, trecho);
    await leisService.grifarArtigo({ leiId: selectedArticle.leiId, artigoId: selectedArticle.id, trecho, cor }).catch(() => {});
    window.getSelection?.().removeAllRanges?.();
    setSelectedText("");
    notify("Grifo salvo", "O trecho ficou salvo neste artigo.");
  }, [grifarArtigo, notify, readCurrentSelection, selectedArticle, selectedText]);

  const saveNote = useCallback((value) => {
    if (!selectedArticle) return;
    salvarNota(selectedArticle.id, value);
    leisService.salvarNota(selectedArticle.id, value).catch(() => {});
  }, [salvarNota, selectedArticle]);

  const toggleRead = useCallback(async () => {
    if (!selectedArticle) return;
    const next = !leitura[selectedArticle.id];
    marcarLidoLocal(selectedArticle.id, next);
    await leisService.marcarLido({ leiId: selectedArticle.leiId, artigoId: selectedArticle.id, lido: next }).catch(() => {});
    notify(next ? "Artigo marcado como lido" : "Leitura removida", "Seu progresso foi atualizado.");
  }, [leitura, marcarLidoLocal, notify, selectedArticle]);

  const generateFlashcard = useCallback(async () => {
    if (!selectedArticle) return;
    setLoadingAction("flashcard");
    try {
      await leisService.gerarFlashcardsDeArtigo(selectedArticle);
      notify("Flashcard criado", "O card entrou no deck de Lei Seca.");
    } finally {
      setLoadingAction("");
    }
  }, [notify, selectedArticle]);

  const practiceQuestions = useCallback(async () => {
    if (!selectedArticle) return;
    setLoadingAction("questoes");
    try {
      const result = await leisService.gerarQuestaoDeArtigo(selectedArticle);
      sessionStorage.setItem("aprova-questoes-artigo-filter", JSON.stringify({
        artigoId: selectedArticle.id,
        materia: selectedArticle.materia,
        assunto: selectedArticle.capitulo,
        search: `art. ${selectedArticle.numero_texto || selectedArticle.numero}`,
        questoesIds: result.questoes?.map((item) => item.id) || (result.questao ? [result.questao.id] : []),
      }));
      navigate("questoes");
      notify("Filtro preparado", "Abrindo o banco de questões com foco neste artigo.");
    } finally {
      setLoadingAction("");
    }
  }, [navigate, notify, selectedArticle]);

  const explainArticle = useCallback(async () => {
    if (!selectedArticle) return;
    setLoadingAction("explicar");
    try {
      const text = await leisService.explicarArtigo(selectedArticle, user?.targetContest || user?.objective || "concurso publico");
      setExplanation(text);
    } finally {
      setLoadingAction("");
    }
  }, [selectedArticle, user]);

  if (isLoading) return <DashboardSkeleton embedded label="Carregando leis secas" />;

  const readerHtml = selectedArticle ? formatArticleHtml(selectedArticle, articleMarks, query) : "";

  return (
    <div className="leis-study-page mx-auto max-w-[1680px] pb-10 text-slate-900" data-level={level}>
      <header className="leis-study-top">
        <div className="leis-study-title">
          {level !== "laws" ? (
            <button className="leis-back-button" onClick={goBack} type="button" aria-label="Voltar">
              <ArrowLeft size={18} />
            </button>
          ) : null}
          <div>
            <span>{levelTitle(level)}</span>
            <h1>Lei seca para estudar</h1>
          </div>
        </div>
        <div className="leis-study-meta" aria-label="Resumo da lei selecionada">
          <span>{selectedLaw?.displayTotal || `${allArticles.length} artigos`}</span>
          <strong>{selectedLaw?.progress || 0}% lido</strong>
          <span>{selectedLaw?.hotCount || hotArticles.length} cobrancas</span>
        </div>
        <Input icon={Search} placeholder="Buscar lei, artigo ou palavra..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </header>

      {query && searchHits.length ? (
        <section className="leis-search-results">
          {searchHits.map((article) => (
            <button key={article.id} type="button" onClick={() => openArticle(article.id)}>
              <strong>{article.leiCurta} - Art. {article.numero_texto}</strong>
              <span>{excerpt(article)}</span>
            </button>
          ))}
        </section>
      ) : null}

      <div className="leis-desktop-shell">
        <section className={cx("leis-layer leis-laws-layer", level === "laws" && "is-current")}>
          <div className="leis-chip-row">
            {chips.map((item) => <button key={item.id} className={cx(chip === item.id && "is-active")} onClick={() => setChip(item.id)} type="button">{item.label}</button>)}
          </div>
          <div className="leis-law-groups">
            {Object.entries(groupedLaws).map(([area, items]) => (
              <div key={area} className="leis-law-group">
                <h2>{area}</h2>
                {items.map((law) => (
                  <button key={law.id} className={cx("leis-law-card", selectedLaw?.id === law.id && "is-active", law.progress === 100 && "is-read")} onClick={() => openLaw(law.id)} type="button">
                    <span className="leis-law-icon"><BookOpen size={20} /></span>
                    <span className="leis-law-main">
                      <strong>{law.nome}</strong>
                      <small>{law.displayTotal} - lido {law.read}</small>
                      <i><em style={{ width: `${law.progress}%` }} /></i>
                    </span>
                    {law.progress === 100 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
                  </button>
                ))}
              </div>
            ))}
            {!filteredLaws.length ? <EmptyState icon={Search} title="Nada encontrado" description="Tente outro termo ou veja todas as leis." /> : null}
          </div>
        </section>

        <section className={cx("leis-layer leis-structure-layer", level === "structure" && "is-current")}>
          <div className="leis-breadcrumb">{selectedLaw?.nome}</div>
          <div className="leis-chip-row">
            {[
              ["estrutura", "Estrutura"],
              ["cobrados", "Mais cobrados"],
              ["todos", "Todos os artigos"],
            ].map(([id, label]) => <button key={id} className={cx(structureChip === id && "is-active")} onClick={() => setStructureChip(id)} type="button">{label}</button>)}
          </div>
          {structureChip === "todos" ? (
            <div className="leis-article-list compact">
              {selectedLaw?.articles.map((article) => <ArticleButton key={article.id} article={article} active={selectedArticle?.id === article.id} read={leitura[article.id]} onClick={() => openArticle(article.id)} />)}
            </div>
          ) : (
            <div className="leis-section-list">
              {(structureChip === "cobrados" ? sections.filter((section) => section.hot) : sections).map((section) => (
                <button key={section.id} className={cx("leis-section-card", selectedSection?.id === section.id && "is-active")} onClick={() => openSection(section.id)} type="button">
                  <span>
                    <strong>{section.name}</strong>
                    <small>Art. {section.start} a {section.end}</small>
                  </span>
                  {section.hot ? <Badge variant="warning"><Flame size={12} /> {section.questions || "cai muito"}</Badge> : <ArrowRight size={17} />}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className={cx("leis-layer leis-articles-layer", level === "articles" && "is-current")}>
          <div className="leis-breadcrumb">{selectedLaw?.nome_curto || selectedLaw?.nome} &gt; {selectedSection?.name || "Artigos"}</div>
          <div className="leis-article-list">
            {articleList.map((article) => <ArticleButton key={article.id} article={article} active={selectedArticle?.id === article.id} read={leitura[article.id]} onClick={() => openArticle(article.id)} />)}
          </div>
        </section>

        <section className={cx("leis-layer leis-reader-layer", level === "reader" && "is-current")}>
          {selectedArticle ? (
            <>
              <div className="leis-reader-kicker">
                <span>{selectedArticle.materia}</span>
                <span>{selectedArticle.cobrancas || 0} questoes</span>
                {leitura[selectedArticle.id] ? <span>Lido</span> : null}
              </div>
              <div className="leis-reader-header">
                <div>
                  <div className="leis-breadcrumb">{selectedArticle.leiCurta} &gt; {selectedArticle.capitulo}</div>
                  <h2>Art. {selectedArticle.numero_texto}</h2>
                  <p>{selectedIndex + 1} / {selectedLaw?.articles.length || 0}</p>
                </div>
                <button className="leis-jump-button" onClick={() => setSheetOpen(true)} type="button" aria-label="Salto rapido"><List size={20} /></button>
              </div>

              <div className="leis-reader-actions">
                <Button variant="secondary" icon={Highlighter} onClick={() => saveHighlight("yellow")}>Amarelo</Button>
                <Button variant="secondary" icon={Highlighter} onClick={() => saveHighlight("green")}>Verde</Button>
                <Button variant="secondary" icon={Highlighter} onClick={() => saveHighlight("pink")}>Rosa</Button>
                <Button variant="secondary" icon={Bookmark} onClick={() => toggleFavorito(selectedArticle.id)}>{favoritos.includes(selectedArticle.id) ? "Favorito" : "Favoritar"}</Button>
                <Button variant={leitura[selectedArticle.id] ? "primary" : "secondary"} icon={CheckCircle2} onClick={toggleRead}>{leitura[selectedArticle.id] ? "Lido" : "Marcar lido"}</Button>
              </div>

              {selectedText ? <div className="leis-selection-note">Trecho selecionado: {selectedText.slice(0, 90)}...</div> : null}

              <article
                className="leis-article-reader"
                dangerouslySetInnerHTML={{ __html: readerHtml }}
                onKeyUp={handleSelection}
                onMouseUp={handleSelection}
                onPointerUp={handleSelection}
                onTouchEnd={handleSelection}
              />

              <div className="leis-reader-nav">
                <Button variant="secondary" disabled={selectedIndex <= 0} onClick={() => goSibling(-1)}>Art. anterior</Button>
                <Button variant="secondary" disabled={selectedIndex >= (selectedLaw?.articles.length || 1) - 1} onClick={() => goSibling(1)}>Art. proximo</Button>
              </div>

              <Card hover={false} className="leis-study-actions">
                <Button loading={loadingAction === "flashcard"} icon={Plus} onClick={generateFlashcard}>Gerar flashcard</Button>
                <Button loading={loadingAction === "questoes"} variant="secondary" icon={FileQuestion} onClick={practiceQuestions}>{selectedArticle.cobrancas || 0} questões</Button>
                <Button loading={loadingAction === "explicar"} variant="secondary" icon={MessageCircle} onClick={explainArticle}>Aprovinho explica</Button>
              </Card>

              {explanation ? <Card hover={false} className="leis-explanation"><h3>Aprovinho explica</h3><p>{explanation}</p></Card> : null}

              <Card hover={false} className="leis-note-card">
                <Textarea label="Nota pessoal" value={notas[selectedArticle.id] || ""} onChange={(event) => saveNote(event.target.value)} placeholder="Escreva sua anotação sobre este artigo." />
              </Card>

              {articleMarks.length ? (
                <Card hover={false} className="leis-marks-card">
                  <h3>Grifos deste artigo</h3>
                  {articleMarks.map((mark) => (
                    <div key={mark.id} className="leis-mark-item">
                      <span style={{ background: highlightColors[mark.cor] }}>{mark.trecho}</span>
                      <button onClick={() => { removerGrifo(selectedArticle.id, mark.id); leisService.removerGrifo({ grifoId: mark.id, artigoId: selectedArticle.id }).catch(() => {}); }} type="button"><X size={14} /></button>
                    </div>
                  ))}
                </Card>
              ) : null}
            </>
          ) : (
            <EmptyState icon={BookOpen} title="Selecione um artigo" description="Escolha uma lei e avance ate o leitor." />
          )}
        </section>
      </div>

      {sheetOpen ? (
        <div className="leis-bottom-sheet">
          <button className="leis-sheet-backdrop" onClick={() => setSheetOpen(false)} type="button" aria-label="Fechar" />
          <div className="leis-sheet-panel">
            <div className="leis-sheet-header">
              <strong>Salto rapido</strong>
              <button onClick={() => setSheetOpen(false)} type="button"><X size={18} /></button>
            </div>
            <h3>Artigos</h3>
            <div className="leis-jump-grid">
              {selectedLaw?.articles.map((article) => (
                <button key={article.id} className={cx(article.id === selectedArticle?.id && "is-active", leitura[article.id] && "is-read")} onClick={() => openArticle(article.id)} type="button">{article.numero_texto}</button>
              ))}
            </div>
            <h3>Favoritos</h3>
            <div className="leis-sheet-list">
              {selectedLaw?.articles.filter((article) => favoritos.includes(article.id)).map((article) => <button key={article.id} onClick={() => openArticle(article.id)} type="button">Art. {article.numero_texto} - {excerpt(article).slice(0, 70)}</button>)}
              {!selectedLaw?.articles.some((article) => favoritos.includes(article.id)) ? <span>Nenhum favorito nesta lei ainda.</span> : null}
            </div>
          </div>
        </div>
      ) : null}

      {level === "laws" && hotArticles.length ? (
        <section className="leis-hot-strip">
          <div><Sparkles size={18} /><strong>Comece pelo que mais cai</strong></div>
          <div>
            {hotArticles.slice(0, 6).map((article) => <button key={article.id} onClick={() => openArticle(article.id)} type="button">{article.leiCurta} Art. {article.numero_texto}</button>)}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ArticleButton({ article, active, read, onClick }) {
  return (
    <button className={cx("leis-article-card", active && "is-active", read && "is-read")} onClick={onClick} type="button">
      <span>
        <strong>Art. {article.numero_texto}</strong>
        <small>{excerpt(article)}</small>
      </span>
      <em>{article.cobrancas ? <><Flame size={13} /> {article.cobrancas} q.</> : read ? <CheckCircle2 size={15} /> : <ArrowRight size={16} />}</em>
    </button>
  );
}
