import { useState } from 'react';
import type { Progress } from '../types';
import { Card } from '../components/Card';
import { LESSONS } from '../data/lessons';
import { QUESTIONS } from '../data/questions';
import { mastery } from '../lib/mastery';

export function Learn({ p, complete, goPractice }: { p: Progress; complete: (id: string) => void; goPractice: (lessonId?: string) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const sorted = [...LESSONS].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const lesson = LESSONS.find((l) => l.id === open);
  if (lesson) {
    const qs = QUESTIONS.filter((q) => q.lesson === lesson.id);
    return (
      <>
        <button className="b" onClick={() => setOpen(null)}>← Lessons</button>
        <Card>
          <h2>{lesson.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: lesson.body }} />
          <p className="mu">Official-rule checklist items: {lesson.tags.join(', ')}</p>
          <p className="mu">Practice questions linked to this lesson: {qs.length} ({qs.filter((q) => mastery(p, q.id) === 4).length} mastered)</p>
          <button className="b" onClick={() => complete(lesson.id)}>Mark complete</button>
          {qs.length > 0 && <button className="b" onClick={() => { complete(lesson.id); goPractice(lesson.id); }}>Complete and practice this lesson</button>}
        </Card>
      </>
    );
  }
  return (
    <>
      <Card>
        <h2>Learn</h2>
        <p className="mu">{sorted.length} lessons written so far, covering Units 1–3 plus early lessons for Units 7 and 8. Unwritten units show as uncovered in the Checklist. Lesson text is educational, not official rule wording; check constants against your own reference.</p>
      </Card>
      {sorted.map((l) => {
        const n = QUESTIONS.filter((q) => q.lesson === l.id).length;
        return (
          <Card key={l.id}>
            {l.unit ? <span className="tag">Unit {l.unit}</span> : null}<b>{l.title}</b> {p.les[l.id] ? <span className="ok">✓</span> : null}
            <span className="mu"> · {n} question{n === 1 ? '' : 's'}</span><br />
            <button className="b" onClick={() => setOpen(l.id)}>Open</button>
          </Card>
        );
      })}
    </>
  );
}
