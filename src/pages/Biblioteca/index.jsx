import { useCallback, useMemo, useState } from "react";
import { BookOpenCheck, FilePlus2, FileText, Filter, Heart, Library, Search, Sparkles, Trash2 } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Select, cx } from "../../components";
import { useUser } from "../../contexts";
import { apostilasBiblioteca } from "../../data/apostilas";
import { useAsyncData, useLocalStorage } from "../../hooks";
import { Modal } from "../../modals";
import { bibliotecaService } from "../../services";
import { MaterialCard } from "./MaterialCard";

const emptyFilters = { materia: "", favoritos: "", search: "" };
const emptyDraft = { titulo: "", materia: "", descricao: "", url: "" };

function unique(items) {
  return [...new Set(items.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "pt-BR"));
}

function includesText(item, query) {
  const text = [item.titulo, item.descricao, item.materia, item.source]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

function isApostila(item) {
  return [item.tipo, item.categoria, item.titulo]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes("apostila"));
}

function normalizeAdminMaterial(draft) {
  return {
    id: `apostila-admin-${Date.now()}`,
    tipo: "Apostila",
    categoria: "Apostila",
    titulo: draft.titulo.trim(),
    materia: draft.materia.trim() || "Geral",
    descricao: draft.descricao.trim() || "Apostila adicionada pela administracao.",
    url: draft.url.trim(),
    source: "Admin",
  };
}

function LibraryStat({ icon: Icon, label, value, tone = "blue" }) {
  return (
    <div className={cx("library-stat", `library-stat-${tone}`)}>
      <span>
        <Icon size={18} />
      </span>
      <div>
        <strong>{value}</strong>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default function BibliotecaPage() {
  const { isAdmin } = useUser();
  const [filters, setFilters] = useState(emptyFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [favorites, setFavorites] = useLocalStorage("aprovamais-favoritos", []);
  const [adminMaterials, setAdminMaterials] = useLocalStorage("aprovamais-biblioteca-admin-apostilas", []);
  const [deletedMaterials, setDeletedMaterials] = useLocalStorage("aprovamais-biblioteca-deleted-apostilas", []);

  const load = useCallback(() => bibliotecaService.getAll(), []);
  const { data: sourceMaterials = [] } = useAsyncData(load);

  const favoritosSet = useMemo(() => new Set(favorites), [favorites]);
  const deletedSet = useMemo(() => new Set(deletedMaterials), [deletedMaterials]);
  const officialIds = useMemo(() => new Set(apostilasBiblioteca.map((item) => item.id)), []);
  const materiais = useMemo(() => {
    const oficiais = apostilasBiblioteca.map((item) => ({ ...item, tipo: "Apostila", categoria: "Apostila" }));
    const extras = [...sourceMaterials.filter(isApostila), ...adminMaterials]
      .filter((item) => item?.id && !officialIds.has(item.id) && !deletedSet.has(item.id))
      .map((item) => ({ ...item, tipo: "Apostila", categoria: "Apostila" }));

    return [...oficiais, ...extras];
  }, [adminMaterials, deletedSet, officialIds, sourceMaterials]);
  const materiaOptions = useMemo(() => unique(materiais.map((item) => item.materia)), [materiais]);

  const visible = useMemo(() => {
    const filtered = bibliotecaService.filter(materiais, { materia: filters.materia });
    return filtered.filter((item) => {
      if (filters.favoritos === "Favoritos" && !favoritosSet.has(item.id)) return false;
      if (filters.search && !includesText(item, filters.search)) return false;
      return true;
    });
  }, [favoritosSet, filters, materiais]);

  const stats = useMemo(() => {
    const totalMaterias = unique(materiais.map((item) => item.materia)).length;
    const totalAdmin = materiais.filter((item) => item.source === "Admin").length;
    return [
      { icon: Library, label: "apostilas", value: materiais.length, tone: "blue" },
      { icon: BookOpenCheck, label: "materias", value: totalMaterias, tone: "green" },
      { icon: FileText, label: "do admin", value: totalAdmin, tone: "violet" },
      { icon: Heart, label: "favoritos", value: favoritosSet.size, tone: "rose" },
    ];
  }, [favoritosSet.size, materiais]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }, [setFavorites]);

  const updateFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => setFilters(emptyFilters), []);
  const updateDraft = useCallback((key, value) => setDraft((current) => ({ ...current, [key]: value })), []);
  const canSaveDraft = draft.titulo.trim() && draft.url.trim();

  const saveMaterial = useCallback(() => {
    if (!isAdmin || !canSaveDraft) return;
    setAdminMaterials((items) => [normalizeAdminMaterial(draft), ...items]);
    setDraft(emptyDraft);
    setAdminModalOpen(false);
  }, [canSaveDraft, draft, isAdmin, setAdminMaterials]);

  const deleteMaterial = useCallback((id) => {
    if (!isAdmin) return;
    setAdminMaterials((items) => items.filter((item) => item.id !== id));
    setDeletedMaterials((items) => items.includes(id) ? items : [...items, id]);
    setFavorites((items) => items.filter((item) => item !== id));
  }, [isAdmin, setAdminMaterials, setDeletedMaterials, setFavorites]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const filtersContent = (
    <div className="library-filters-grid">
      <Select label="Materia" placeholder="Todas" options={materiaOptions} value={filters.materia} onChange={(event) => updateFilter("materia", event.target.value)} />
      <Select label="Favoritos" placeholder="Todos" options={["Favoritos"]} value={filters.favoritos} onChange={(event) => updateFilter("favoritos", event.target.value)} />
    </div>
  );

  return (
    <div className="library-page mx-auto max-w-[1900px] pb-10" data-tour="tour-biblioteca-page">
      <section className="library-hero">
        <div className="library-hero-copy">
          <p className="library-eyebrow"><Sparkles size={14} /> Acervo de estudo</p>
          <h1>Biblioteca</h1>
          <p>Apostilas organizadas por materia para revisao e estudo dirigido.</p>
        </div>
        <div className="library-stats" aria-label="Resumo da biblioteca">
          {stats.map((stat) => <LibraryStat key={stat.label} {...stat} />)}
        </div>
      </section>

      <div className="library-toolbar">
        <Input
          className="library-search"
          icon={Search}
          placeholder="Buscar por titulo ou materia..."
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
        />
        <div className="library-toolbar-actions">
          {activeFilterCount > 0 ? <Button variant="ghost" onClick={clearFilters}>Limpar</Button> : null}
          {isAdmin ? <Button icon={FilePlus2} onClick={() => setAdminModalOpen(true)}>Adicionar</Button> : null}
          <Button className="xl:hidden" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>
            Filtros{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </Button>
        </div>
      </div>

      <Card hover={false} className="library-filters mb-4 hidden xl:block">
        {filtersContent}
      </Card>

      <div className="library-result-line">
        <span>{visible.length} de {materiais.length} apostilas</span>
        {activeFilterCount > 0 ? <Badge variant="info">{activeFilterCount} filtro{activeFilterCount > 1 ? "s" : ""}</Badge> : null}
      </div>

      {visible.length ? (
        <div className="library-grid">
          {visible.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              favorite={favoritosSet.has(material.id)}
              canDelete={isAdmin && material.source === "Admin"}
              onDelete={deleteMaterial}
              onFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon={Search} title="Nenhuma apostila encontrada" description="Ajuste a busca ou limpe os filtros para ver as apostilas disponiveis." action={<Button onClick={clearFilters}>Limpar filtros</Button>} />
      )}

      <Modal open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)} footer={<Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>}>
        {filtersContent}
      </Modal>

      {isAdmin ? (
        <Modal
          open={adminModalOpen}
          title="Adicionar apostila"
          onClose={() => setAdminModalOpen(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setAdminModalOpen(false)}>Cancelar</Button>
              <Button icon={FilePlus2} disabled={!canSaveDraft} onClick={saveMaterial}>Salvar apostila</Button>
            </>
          }
        >
          <div className="library-admin-form">
            <Input label="Titulo" value={draft.titulo} onChange={(event) => updateDraft("titulo", event.target.value)} placeholder="Ex: Apostila de Direito Penal" />
            <Input label="Materia" value={draft.materia} onChange={(event) => updateDraft("materia", event.target.value)} placeholder="Ex: Direito Penal" />
            <Input label="URL do arquivo" value={draft.url} onChange={(event) => updateDraft("url", event.target.value)} placeholder="https://... ou /materiais/apostila.pdf" />
            <Input label="Descricao" value={draft.descricao} onChange={(event) => updateDraft("descricao", event.target.value)} placeholder="Resumo curto da apostila" />
            <div className="library-admin-note">
              <Trash2 size={15} />
              Apenas apostilas adicionadas manualmente pelo admin podem ser apagadas.
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
