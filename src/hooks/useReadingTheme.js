import { useLocalStorage } from "./useLocalStorage";

/* Preferência de leitura noturna, isolada do tema global (que permanece sempre light).
   Compartilhada entre o leitor de apostilas e o visualizador de mapas mentais. */
export function useReadingTheme() {
  const [readingDark, setReadingDark] = useLocalStorage("vemaprovar-reading-dark", false);
  return [readingDark, setReadingDark];
}
