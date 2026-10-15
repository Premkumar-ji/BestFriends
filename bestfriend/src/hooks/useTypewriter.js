import { useEffect, useMemo, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Types `text` one character at a time. Calls onDone `doneDelay` ms after the
 * last character. When `active` is false the full text is shown immediately.
 * All timers are cleared on unmount / re-run.
 */
export default function useTypewriter(
  text,
  { speed = 40, active = true, onDone, doneDelay = 700 } = {}
) {
  const chars = useMemo(() => Array.from(text), [text]); // emoji-safe
  const [count, setCount] = useState(active ? 0 : chars.length);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!active) {
      setCount(chars.length);
      return undefined;
    }
    let interval;
    let timeout;
    const finish = () => {
      timeout = setTimeout(() => doneRef.current?.(), doneDelay);
    };

    if (prefersReducedMotion()) {
      setCount(chars.length);
      finish();
      return () => clearTimeout(timeout);
    }

    let n = 0;
    setCount(0);
    interval = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= chars.length) {
        clearInterval(interval);
        finish();
      }
    }, speed);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active, chars, speed, doneDelay]);

  return chars.slice(0, count).join('');
}
