import { useCallback, useRef, useState } from "react";
import { aiService } from "../services";

export function useAI() {
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const cancelRef = useRef(null);

  const sendPrompt = useCallback((prompt, onDone) => {
    cancelRef.current?.();
    setStreamText("");
    setIsStreaming(true);
    cancelRef.current = aiService.stream(prompt, setStreamText, (finalText) => {
      setIsStreaming(false);
      onDone?.(finalText);
    });
  }, []);

  return { streamText, isStreaming, sendPrompt };
}
