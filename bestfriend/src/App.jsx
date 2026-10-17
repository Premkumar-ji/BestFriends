import { useCallback, useEffect, useState } from 'react';
import Intro from './components/Intro.jsx';
import ChatBox from './components/ChatBox.jsx';
import ActionButtons from './components/ActionButtons.jsx';
import Celebration from './components/Celebration.jsx';
import FloatingHearts from './components/FloatingHearts.jsx';

// phases: intro -> chat -> ready -> leaving -> celebrate
export default function App() {
  const [run, setRun] = useState(0); // bump to fully restart everything
  const [phase, setPhase] = useState('intro');

  const handleIntroDone = useCallback(() => setPhase('chat'), []);
  const handleChatDone = useCallback(
    () => setPhase((p) => (p === 'chat' ? 'ready' : p)),
    []
  );
  const handleYes = useCallback(
    () => setPhase((p) => (p === 'ready' ? 'leaving' : p)),
    []
  );
  const handleReplay = useCallback(() => {
    setRun((r) => r + 1);
    setPhase('intro');
  }, []);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const t = setTimeout(() => setPhase('celebrate'), 500);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === 'celebrate') {
    return <Celebration key={`c${run}`} onReplay={handleReplay} />;
  }

  const showButtons = phase === 'ready' || phase === 'leaving';

  return (
    <main className="stage" key={`m${run}`}>
      <FloatingHearts count={14} />
      <section className={`card${phase === 'leaving' ? ' is-leaving' : ''}`}>
        <Intro onDone={handleIntroDone} />
        {phase !== 'intro' && <ChatBox onComplete={handleChatDone} />}
        {showButtons && (
          <ActionButtons onYes={handleYes} disabled={phase === 'leaving'} />
        )}
      </section>
    </main>
  );
}
