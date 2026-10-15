import { useCallback, useEffect, useRef, useState } from 'react';
import { noLines } from '../data/messages.js';
import { prefersReducedMotion } from '../hooks/useTypewriter.js';

const MARGIN = 12;
const MAX_SCALE = 1.8;

const viewport = () => ({
  w: document.documentElement.clientWidth,
  h: document.documentElement.clientHeight,
});

const overlaps = (a, b, pad) =>
  a.left < b.right + pad &&
  a.right > b.left - pad &&
  a.top < b.bottom + pad &&
  a.bottom > b.top - pad;

export default function ActionButtons({ onYes, disabled }) {
  const [noCount, setNoCount] = useState(0);
  const [pos, setPos] = useState(null); // { x, y } once the NO button has moved
  const [slot, setSlot] = useState(null); // keeps layout space after it leaves
  const noRef = useRef(null);
  const yesRef = useRef(null);

  const yesScale = Math.min(1 + noCount * 0.1, MAX_SCALE);
  const noLabel = noCount === 0 ? 'No' : noLines[(noCount - 1) % noLines.length];

  const pickPosition = useCallback(() => {
    const noEl = noRef.current;
    if (!noEl) return null;
    const { width, height } = noEl.getBoundingClientRect();
    const { w, h } = viewport();
    const maxX = Math.max(MARGIN, w - width - MARGIN);
    const maxY = Math.max(MARGIN, h - height - MARGIN);
    const yes = yesRef.current?.getBoundingClientRect();

    let x = MARGIN;
    let y = MARGIN;
    for (let tries = 0; tries < 14; tries += 1) {
      x = MARGIN + Math.random() * (maxX - MARGIN);
      y = MARGIN + Math.random() * (maxY - MARGIN);
      const box = { left: x, top: y, right: x + width, bottom: y + height };
      if (!yes || !overlaps(box, yes, 24)) break;
    }
    return { x, y, width, height };
  }, []);

  const trigger = (fromHover) => {
    if (disabled) return;
    const reduced = prefersReducedMotion();
    if (fromHover && reduced) return;

    setNoCount((c) => c + 1);
    if (reduced) return; // label + YES growth only, no dodging

    const next = pickPosition();
    if (next) {
      setSlot((s) => s ?? { width: next.width, height: next.height });
      setPos({ x: next.x, y: next.y });
    }
  };

  // Keep the moved NO button inside the viewport on resize / rotation.
  useEffect(() => {
    if (!pos) return undefined;
    const onResize = () => {
      const noEl = noRef.current;
      if (!noEl) return;
      const { width, height } = noEl.getBoundingClientRect();
      const { w, h } = viewport();
      setPos((p) =>
        p && {
          x: Math.min(p.x, Math.max(MARGIN, w - width - MARGIN)),
          y: Math.min(p.y, Math.max(MARGIN, h - height - MARGIN)),
        }
      );
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [pos]);

  return (
    <div className="buttons">
      <button
        ref={yesRef}
        type="button"
        className="btn btn-yes"
        style={{ transform: `scale(${yesScale})` }}
        onClick={onYes}
        disabled={disabled}
        aria-label="Yes, let's be best friends"
      >
        YES 🤝
      </button>

      <span className="no-slot" style={slot ? { width: slot.width, height: slot.height } : undefined}>
        <button
          ref={noRef}
          type="button"
          className={`btn btn-no${pos ? ' is-moved' : ''}`}
          style={pos ? { left: pos.x, top: pos.y } : undefined}
          onPointerEnter={(e) => e.pointerType === 'mouse' && trigger(true)}
          onClick={() => trigger(false)}
          disabled={disabled}
        >
          {noLabel}
        </button>
      </span>
    </div>
  );
}
