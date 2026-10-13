import type { Progress } from '../types';
import { Card } from '../components/Card';
import { CHECKLIST } from '../data/checklist';
import { OBJECTS } from '../data/objects';
import { coverage } from '../lib/mastery';
import { MIN_QUESTIONS } from '../data/curriculumPlan';

export function Checklist({ p, setChecked }: { p: Progress; setChecked: (k: string, v: boolean) => void }) {
  const rows: [string, string][] = [
    ...CHECKLIST,
    ...OBJECTS.map((o): [string, string] => ['obj:' + o.id, 'Object: ' + o.name]),
  ];
  return (
    <>
      <Card>
        <h2>Official Rules Checklist</h2>
        <p className="mu">Covered = at least one lesson (or object page) and at least 3 questions. Covered does not mean mastered-quality depth; see docs/COVERAGE.md. &quot;Uncovered&quot; means there is no material for it yet.</p>
      </Card>
      {rows.map(([key, label]) => {
        const [l, q] = coverage(key);
        const status = l && q >= MIN_QUESTIONS ? <span className="ok">Covered</span> : l || q ? <>Partial</> : <span className="bad">Uncovered</span>;
        return (
          <Card key={key}>
            <label>
              <input type="checkbox" checked={!!p.chk[key]} onChange={(e) => setChecked(key, e.target.checked)} /> {label}
            </label><br />
            <span className="mu">{status} · {l} lesson/page · {q} question(s)</span>
          </Card>
        );
      })}
    </>
  );
}
