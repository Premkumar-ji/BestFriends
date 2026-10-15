import { memo, useEffect } from 'react';
import useTypewriter from '../hooks/useTypewriter.js';

function ChatMessage({ message, active, onDone, onGrow }) {
  const text = useTypewriter(message.text, { speed: 50, active, onDone });

  useEffect(() => {
    onGrow?.();
  }, [text, onGrow]);

  return (
    <div className={`msg ${message.type}`}>
      <div className="name">{message.name}</div>
      <div className="text">{text}</div>
    </div>
  );
}

export default memo(ChatMessage);
