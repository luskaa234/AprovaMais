import { useCallback, useEffect, useState } from "react";
import { questoesService } from "../services";

export function useQuestoes({ page = 1, pageSize = 5, initialFilters = {} } = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [questoes, setQuestoes] = useState([]);
  const [stats, setStats] = useState(null);
  const [filterOptions, setFilterOptions] = useState({ materias: {}, bancas: {}, dificuldades: {}, anos: {}, assuntos: {}, concursos: {} });
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await questoesService.getPage({ page, pageSize, filters });
      setQuestoes(result.items);
      setTotal(result.total);
      setStats(result.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, pageSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
      questoesService.getFilterOptions().then(setFilterOptions).catch(() => {});
    }, 0);
    return () => clearTimeout(timer);
  }, [refetch]);

  const updateFilter = useCallback((key, value) => setFilters((current) => ({ ...current, [key]: value })), []);
  const clearFilters = useCallback(() => setFilters({}), []);

  return { questoes, filters, updateFilter, clearFilters, isLoading, error, refetch, total, stats, filterOptions };
}
