import { useCallback, useEffect, useState } from "react";

export function useTimer(initialSeconds = 1800) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return undefined;
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [running, seconds]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback((next = initialSeconds) => {
    setSeconds(next);
    setRunning(false);
  }, [initialSeconds]);

  return { seconds, running, start, stop, reset };
}
