import { useCallback, useMemo, useState } from "react";
import { Card, Select } from "../../components";
import { useAsyncData, useLocalStorage } from "../../hooks";
import { bibliotecaService } from "../../services";
import { MaterialCard } from "./MaterialCard";

export default function BibliotecaPage() {
  const [filters, setFilters] = useState({ categoria: "", materia: "", favoritos: "" });
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

  return (
    <div>
      <h1 className="text-3xl font-black text-white">Biblioteca</h1>
      <p className="mb-5 text-sm text-gray-400">{materiais.length} materiais organizados por categoria, materia e favoritos.</p>
      <Card className="mb-4 grid gap-3 md:grid-cols-3">
        <Select label="Categoria" placeholder="Todas" options={categoriaOptions} value={filters.categoria} onChange={(event) => updateFilter("categoria", event.target.value)} />
        <Select label="Materia" placeholder="Todas" options={materiaOptions} value={filters.materia} onChange={(event) => updateFilter("materia", event.target.value)} />
        <Select label="Favoritos" options={["Todos", "Favoritos"]} value={filters.favoritos} onChange={(event) => updateFilter("favoritos", event.target.value)} />
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visible.map((material) => (
          <MaterialCard key={material.id} material={material} favorite={favoritosSet.has(material.id)} onFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
}
