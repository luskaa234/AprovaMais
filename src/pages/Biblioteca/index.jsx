import { useCallback, useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Button, Card, Select } from "../../components";
import { useAsyncData, useLocalStorage } from "../../hooks";
import { Modal } from "../../modals";
import { bibliotecaService } from "../../services";
import { MaterialCard } from "./MaterialCard";

export default function BibliotecaPage() {
  const [filters, setFilters] = useState({ categoria: "", materia: "", favoritos: "" });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("aprovamais-favoritos", []);
  const load = useCallback(() => bibliotecaService.getAll(), []);
  const { data: materiais } = useAsyncData(load);
  const favoritosSet = useMemo(() => new Set(favorites), [favorites]);
  const categoriaOptions = useMemo(() => [...new Set(materiais.map((item) => item.categoria || item.tipo).filter(Boolean))].sort(), [materiais]);
  const materiaOptions = useMemo(() => [...new Set(materiais.map((item) => item.materia).filter(Boolean))].sort(), [materiais]);

  const visible = useMemo(() => {
    const filtered = bibliotecaService.filter(materiais, { categoria: filters.categoria, materia: filters.materia });
    return filters.favoritos === "Favoritos" ? filtered.filter((item) => favoritosSet.has(item.id)) : filtered;
  }, [favoritosSet, filters, materiais]);

  const toggleFavorite = useCallback((id) => setFavorites((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id])), [setFavorites]);
  const updateFilter = useCallback((key, value) => setFilters((current) => ({ ...current, [key]: value })), []);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const filtersContent = (
    <div className="grid gap-3 md:grid-cols-3">
      <Select label="Categoria" placeholder="Todas" options={categoriaOptions} value={filters.categoria} onChange={(event) => updateFilter("categoria", event.target.value)} />
      <Select label="Materia" placeholder="Todas" options={materiaOptions} value={filters.materia} onChange={(event) => updateFilter("materia", event.target.value)} />
      <Select label="Favoritos" options={["Todos", "Favoritos"]} value={filters.favoritos} onChange={(event) => updateFilter("favoritos", event.target.value)} />
    </div>
  );

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Biblioteca</h1>
          <p className="text-sm text-gray-400">{materiais.length} materiais organizados por categoria, materia e favoritos.</p>
        </div>
        <Button className="md:hidden" icon={Filter} variant="secondary" onClick={() => setMobileFiltersOpen(true)}>Filtros{activeFilterCount ? ` · ${activeFilterCount}` : ""}</Button>
      </div>
      <Card className="mb-4 hidden md:block">
        {filtersContent}
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visible.map((material) => (
          <MaterialCard key={material.id} material={material} favorite={favoritosSet.has(material.id)} onFavorite={toggleFavorite} />
        ))}
      </div>
      <Modal open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)} footer={<Button onClick={() => setMobileFiltersOpen(false)}>Aplicar</Button>}>
        {filtersContent}
      </Modal>
    </div>
  );
}
