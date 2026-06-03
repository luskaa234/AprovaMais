import { useCallback, useEffect, useState } from "react";

export function useAsyncData(loader) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    const timer = setTimeout(refetch, 0);
    return () => clearTimeout(timer);
  }, [refetch]);

  return { data, isLoading, error, refetch, setData };
}
