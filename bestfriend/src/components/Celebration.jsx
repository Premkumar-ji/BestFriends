import { useMemo } from 'react';
import FloatingHearts from './FloatingHearts.jsx';
import { celebrationText } from '../data/messages.js';

const COLORS = ['#ff2d55', '#ff7eb3', '#ffd6ec', '#ffffff', '#ffb703'];

export default function Celebration({ onReplay }) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: -Math.random() * 6,
        duration: 4 + Math.random() * 4,
        rot: 360 + Math.random() * 720,
        w: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <section className="celebrate" aria-live="polite">
      <FloatingHearts count={22} intense />
      <div className="confetti" aria-hidden="true">
        {confetti.map((c) => (
          <i
            key={c.id}
            style={{
              left: `${c.left}%`,
              width: c.w,
              height: c.w * 1.6,
              background: c.color,
              '--rot': `${c.rot}deg`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="celebrate-card">
        <h2>Best Friend Unlocked 🎉</h2>
        <p>{celebrationText}</p>
        <button type="button" className="btn btn-yes" onClick={onReplay}>
          Replay ↺
        </button>
      </div>
    </section>
  );
}
