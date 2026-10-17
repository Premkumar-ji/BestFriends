import { useMemo } from 'react';

const EMOJIS = ['💖', '✨', '💗', '🤍', '🎀'];

export default function FloatingHearts({ count = 14, intense = false }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        left: Math.random() * 100,
        y: Math.random() * 90,
        size: 14 + Math.random() * (intense ? 26 : 16),
        delay: -Math.random() * 14,
        duration: (intense ? 7 : 11) + Math.random() * 8,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count, intense]
  );

  return (
    <div className="floaters" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="floater"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            '--y': `${it.y}%`,
            '--drift': `${it.drift}px`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
