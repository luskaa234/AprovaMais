import { useCallback, useRef, useState } from "react";
import { aiService } from "../services";

export function useAI() {
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const cancelRef = useRef(null);

  const sendPrompt = useCallback((prompt, onDone, options = {}) => {
    cancelRef.current?.();
    setStreamText("");
    setIsStreaming(true);
    cancelRef.current = aiService.stream(prompt, setStreamText, (finalText) => {
      setIsStreaming(false);
      onDone?.(finalText);
    }, options.perfil, options.desempenho, options.historico, { tier: options.tier, extraContext: options.extraContext });
  }, []);

  return { streamText, isStreaming, sendPrompt };
}
