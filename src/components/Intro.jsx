import useTypewriter from '../hooks/useTypewriter.js';
import { introText } from '../data/messages.js';

export default function Intro({ onDone }) {
  const text = useTypewriter(introText, { speed: 70, onDone, doneDelay: 700 });
  return (
    <h1 className="intro" aria-label={introText}>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </h1>
  );
}
