import { useEffect, useRef, useState } from 'react';
import SplashScreen from '../SplashScreen/SplashScreen';

/**
 * Mantém a splash pelo tempo mínimo, mas não deixa o app preso indefinidamente.
 *
 * ready: true quando autenticação, sessão e dados iniciais terminarem.
 * minDuration: tempo mínimo visível.
 * maxDuration: fallback de segurança.
 */
export default function SplashGate({
  children,
  ready = true,
  minDuration = 1400,
  maxDuration = 5000,
  fadeDuration = 420,
  message,
  onSplashEnd,
}) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(Date.now());
  const finishing = useRef(false);

  useEffect(() => {
    let waitTimer;
    let removeTimer;

    const finish = () => {
      if (finishing.current) return;
      finishing.current = true;
      setExiting(true);

      removeTimer = window.setTimeout(() => {
        setVisible(false);
        onSplashEnd?.();
      }, fadeDuration);
    };

    if (ready) {
      const elapsed = Date.now() - startedAt.current;
      waitTimer = window.setTimeout(finish, Math.max(0, minDuration - elapsed));
    }

    const safetyTimer = window.setTimeout(finish, maxDuration);

    return () => {
      window.clearTimeout(waitTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [ready, minDuration, maxDuration, fadeDuration, onSplashEnd]);

  return (
    <>
      {children}
      {visible && <SplashScreen exiting={exiting} message={message} />}
    </>
  );
}
