import type { Progress } from '../types';
import { Card } from '../components/Card';
import { QUESTIONS } from '../data/questions';

export function Notebook({ p }: { p: Progress }) {
  const items = [...p.mist].reverse();
  return (
    <>
      <Card><h2>Mistake Notebook</h2></Card>
      {items.length === 0 && <Card><span className="mu">No mistakes yet.</span></Card>}
      {items.map((m, i) => {
        const q = QUESTIONS.find((x) => x.id === m.id);
        if (!q) return null;
        return (
          <Card key={i}>
            <span className="tag">{m.date}</span>{q.text}<br />
            <span className="bad">Your answer: {m.ans}</span><br />
            <span className="ok">Correct: {q.options ? q.options[q.answer] : q.answer}</span>
            <p className="mu">{q.explanation}</p>
          </Card>
        );
      })}
    </>
  );
}
