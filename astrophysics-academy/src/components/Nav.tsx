import type { ViewId } from '../types';

const TABS: { id: ViewId; label: string; big?: boolean }[] = [
  { id: 'dash', label: 'Dashboard' },
  { id: 'learn', label: 'Learn', big: true },
  { id: 'prac', label: 'Practice', big: true },
  { id: 'obj', label: 'Objects' },
  { id: 'form', label: 'Formulas' },
  { id: 'mist', label: 'Notebook' },
  { id: 'chk', label: 'Checklist' },
  { id: 'rules', label: 'Rules' },
];

export function Nav({ view, go }: { view: ViewId; go: (v: ViewId) => void }) {
  return (
    <nav aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`${t.big ? 'big ' : ''}${view === t.id ? 'on' : ''}`} onClick={() => go(t.id)}>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
