import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ChatMessage from './ChatMessage.jsx';
import { getChatMessages } from '../data/messages.js';
import { prefersReducedMotion } from '../hooks/useTypewriter.js';

export default function ChatBox({ onComplete, sender = 'Prem', receiver = 'XYZ' }) {
  const [index, setIndex] = useState(0);
  const boxRef = useRef(null);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  const scrollDown = useCallback(() => {
    const box = boxRef.current;
    if (box) {
      box.scrollTo({
        top: box.scrollHeight,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
  }, []);

  const messages = useMemo(() => getChatMessages(sender, receiver), [sender, receiver]);

  const handleDone = useCallback(() => {
    setIndex((i) => {
      if (i < messages.length - 1) return i + 1;
      // Defer so we never set parent state during this updater.
      queueMicrotask(() => completeRef.current?.());
      return i;
    });
  }, [messages.length]);

  return (
    <div className="chat-box" ref={boxRef} role="log" aria-label="Conversation">
      {messages.slice(0, index + 1).map((m, i) => (
        <ChatMessage
          key={i}
          message={m}
          active={i === index}
          onDone={i === index ? handleDone : undefined}
          onGrow={scrollDown}
        />
      ))}
    </div>
  );
}
