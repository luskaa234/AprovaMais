import { useCallback, useMemo, useState } from "react";
import { questoesService } from "../services";
import { useAsyncData } from "./useAsyncData";

export function useQuestoes(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const loader = useCallback(() => questoesService.getAll(), []);
  const { data, isLoading, error, refetch } = useAsyncData(loader, [loader]);
  const questoes = useMemo(() => questoesService.filter(data, filters), [data, filters]);
  const updateFilter = useCallback((key, value) => setFilters((current) => ({ ...current, [key]: value })), []);
  return { questoes, filters, updateFilter, isLoading, error, refetch };
}
