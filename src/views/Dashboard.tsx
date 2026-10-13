import type { Progress, ViewId } from '../types';
import { Card } from '../components/Card';
import { SyncStatus } from '../components/SyncStatus';
import { CHECKLIST } from '../data/checklist';
import { OBJECTS } from '../data/objects';
import { LESSONS } from '../data/lessons';

export function Dashboard({ p, go }: { p: Progress; go: (v: ViewId) => void }) {
  const stats = Object.values(p.q);
  const att = stats.reduce((a, r) => a + r.att, 0);
  const ok = stats.reduce((a, r) => a + r.ok, 0);
  const done = Object.values(p.chk).filter(Boolean).length;
  const total = CHECKLIST.length + OBJECTS.length;
  const lessonsDone = Object.values(p.les).filter(Boolean).length;
  return (
    <>
      <Card>
        <h2>Astrophysics Academy</h2>
        <p className="mu">Science Olympiad: Stellar Evolution in Normal and Starburst Galaxies.</p>
        <SyncStatus />
      </Card>
      <Card>
        <b>Questions attempted:</b> {att} · <b>Accuracy:</b> {att ? Math.round((100 * ok) / att) : 0}%<br />
        <b>Mistakes in notebook:</b> {p.mist.length}<br />
        <b>Checklist done:</b> {done}/{total}
        <div className="bar"><i style={{ width: `${(100 * done) / total}%` }} /></div><br />
        <b>Lessons completed:</b> {lessonsDone}/{LESSONS.length}
      </Card>
      <Card>
        <button className="b" onClick={() => go('learn')}>Start learning</button>
        <button className="b" onClick={() => go('prac')}>Practice</button>
      </Card>
      <Card>
        <span className="mu"><b>Mastery rule:</b> each question has a box 0–3+. A correct answer raises the box by 1; a wrong answer resets it to 0. &quot;Mastered&quot; needs box ≥ 3 (three correct in a row), so one right answer never counts as mastery. Spacing between reviews is not yet enforced.</span>
      </Card>
    </>
  );
}
