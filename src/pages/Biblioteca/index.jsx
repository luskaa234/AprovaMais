import { useCallback, useMemo } from "react";
import { Card, Select } from "../../components";
import { useLocalStorage, useAsyncData } from "../../hooks";
import { bibliotecaService } from "../../services";
import { MaterialCard } from "./MaterialCard";

export default function BibliotecaPage() {
  const [favorites, setFavorites] = useLocalStorage("aprovamais-favoritos", []);
  const load = useCallback(() => bibliotecaService.getAll(), []);
  const { data: materiais } = useAsyncData(load, [load]);
  const favoritosSet = useMemo(() => new Set(favorites), [favorites]);
  const toggleFavorite = useCallback((id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]), [setFavorites]);
  return <div><h1 className="text-3xl font-black text-white">Biblioteca</h1><p className="mb-5 text-sm text-gray-400">Materiais com filtros e favoritos persistidos.</p><Card className="mb-4 grid gap-3 md:grid-cols-3"><Select label="Categoria" options={["PDF", "Apostila", "Resumo", "Lei seca"]} /><Select label="Materia" options={["Constitucional", "Portugues", "Informatica"]} /><Select label="Favoritos" options={["Todos", "Favoritos"]} /></Card><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{materiais.map((material) => <MaterialCard key={material.id} material={material} favorite={favoritosSet.has(material.id)} onFavorite={toggleFavorite} />)}</div></div>;
}
