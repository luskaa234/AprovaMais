import {
  useFlashcardsStore,
  useLeisStore,
  usePlanoStore,
  useQuestoesStore,
  useRankingStore,
  useRevisaoStore,
  useTafStore,
  useUserStore,
} from "../stores";

export function initApp() {
  if (typeof window === "undefined") return;

  [
    useUserStore,
    useQuestoesStore,
    useFlashcardsStore,
    usePlanoStore,
    useRevisaoStore,
    useTafStore,
    useLeisStore,
    useRankingStore,
  ].forEach((store) => {
    store.persist?.rehydrate?.();
  });
}

