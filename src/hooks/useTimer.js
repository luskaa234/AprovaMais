import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds = 1800, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running || seconds <= 0) return undefined;
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds > 0) {
      completedRef.current = false;
      return;
    }
    if (!running || completedRef.current) return;
    completedRef.current = true;
    setRunning(false);
    onComplete?.();
  }, [onComplete, running, seconds]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback((next = initialSeconds) => {
    completedRef.current = false;
    setSeconds(next);
    setRunning(false);
  }, [initialSeconds]);

  return { seconds, running, start, stop, reset };
}
