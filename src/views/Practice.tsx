import { useState } from 'react';
import type { Progress, Question } from '../types';
import { Card } from '../components/Card';
import { QUESTIONS } from '../data/questions';
import { LESSONS } from '../data/lessons';
import { mastery } from '../lib/mastery';

export function Practice({ p, record, initialLesson }: { p: Progress; record: (q: Question, given: string, ok: boolean) => void; initialLesson: string | null }) {
  const [lessonFilter, setLessonFilter] = useState<string>(initialLesson ?? '');
  const [queue, setQueue] = useState<Question[]>([]);
  const [cur, setCur] = useState<Question | null>(null);
  const [fb, setFb] = useState<boolean | null>(null);
  const [sel, setSel] = useState<number | null>(null);
  const [num, setNum] = useState('');

  const show = (q: Question | null, rest: Question[]) => { setCur(q); setQueue(rest); setFb(null); setSel(null); setNum(''); };
  const start = () => {
    const pool = lessonFilter ? QUESTIONS.filter((q) => q.lesson === lessonFilter) : QUESTIONS;
    const s = [...pool].sort((a, b) => mastery(p, a.id) - mastery(p, b.id) || Math.random() - 0.5).slice(0, 10);
    show(s[0] ?? null, s.slice(1));
  };
  const next = () => show(queue[0] ?? null, queue.slice(1));

  const submit = () => {
    if (!cur) return;
    let ok: boolean; let given: string;
    if (cur.options) {
      if (sel === null) return;
      ok = sel === cur.answer; given = cur.options[sel];
    } else {
      if (num === '') return;
      ok = Math.abs(Number(num) - cur.answer) <= Math.abs(cur.answer) * (cur.tolerance ?? 0.02);
      given = num;
    }
    record(cur, given, ok);
    setFb(ok);
  };

  if (!cur) {
    return (
      <Card>
        <h2>Practice</h2>
        <p>{QUESTIONS.length} original questions. Weakest questions come first (10 per session).</p>
        <label>Lesson: <select value={lessonFilter} onChange={(e) => setLessonFilter(e.target.value)}>
          <option value="">All lessons</option>
          {LESSONS.filter((l) => QUESTIONS.some((q) => q.lesson === l.id)).map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
        </select></label><br />
        <button className="b" onClick={start}>Start session</button>
      </Card>
    );
  }
  return (
    <>
      <Card>
        <span className="tag">{cur.id}</span><span className="tag">Level {cur.level}</span>
        <h3>{cur.text}</h3>
        {fb !== null ? (
          <>
            <p className={fb ? 'ok' : 'bad'}><b>{fb ? 'Correct' : 'Incorrect'}</b></p>
            <p>{cur.explanation}</p>
            <button className="b" onClick={next}>Next</button>
          </>
        ) : (
          <>
            {cur.options ? cur.options.map((o, i) => (
              <label className="o" key={i}>
                <input type="radio" name="a" checked={sel === i} onChange={() => setSel(i)} /> {o}
              </label>
            )) : (
              <input type="number" step="any" aria-label="Answer" value={num} onChange={(e) => setNum(e.target.value)} />
            )}
            <button className="b" onClick={submit}>Submit</button>
          </>
        )}
      </Card>
      <button className="b" onClick={() => show(null, [])}>End session</button>
    </>
  );
}
