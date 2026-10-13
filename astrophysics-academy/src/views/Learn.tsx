import { useState } from 'react';
import type { Progress } from '../types';
import { Card } from '../components/Card';
import { LESSONS } from '../data/lessons';

export function Learn({ p, complete, goPractice }: { p: Progress; complete: (id: string) => void; goPractice: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const lesson = LESSONS.find((l) => l.id === open);
  if (lesson) {
    return (
      <>
        <button className="b" onClick={() => setOpen(null)}>← Lessons</button>
        <Card>
          <h2>{lesson.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: lesson.body }} />
          <p className="mu">Official-rule checklist items: {lesson.tags.join(', ')}</p>
          <button className="b" onClick={() => { complete(lesson.id); goPractice(); }}>Mark complete and practice</button>
        </Card>
      </>
    );
  }
  return (
    <>
      <Card>
        <h2>Learn</h2>
        <p className="mu">{LESSONS.length} of the planned 13 units are written. Units not yet written show as uncovered in the Checklist.</p>
      </Card>
      {LESSONS.map((l) => (
        <Card key={l.id}>
          <b>{l.title}</b> {p.les[l.id] ? <span className="ok">✓</span> : null}<br />
          <button className="b" onClick={() => setOpen(l.id)}>Open</button>
        </Card>
      ))}
    </>
  );
}
