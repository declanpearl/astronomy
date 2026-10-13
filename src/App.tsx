import { useState } from 'react';
import type { ViewId } from './types';
import { useProgress } from './state/useProgress';
import { Nav } from './components/Nav';
import { Dashboard } from './views/Dashboard';
import { Learn } from './views/Learn';
import { Practice } from './views/Practice';
import { Objects } from './views/Objects';
import { Formulas } from './views/Formulas';
import { Notebook } from './views/Notebook';
import { Checklist } from './views/Checklist';
import { Rules } from './views/Rules';
import { Settings } from './views/Settings';
import { useSync } from './state/useSync';

export default function App() {
  const [view, setView] = useState<ViewId>('dash');
  const { p, store, version, absorb, recordAnswer, completeLesson, setChecked, importMerge } = useProgress();
  const sync = useSync(store, version, absorb);
  const [practiceLesson, setPracticeLesson] = useState<string | null>(null);
  const go = (v: ViewId) => { setView(v); window.scrollTo(0, 0); };
  return (
    <>
      <Nav view={view} go={go} />
      <main>
        {view === 'dash' && <Dashboard p={p} go={go} />}
        {view === 'learn' && <Learn p={p} complete={completeLesson} goPractice={(id) => { setPracticeLesson(id ?? null); go('prac'); }} />}
        {view === 'prac' && <Practice p={p} record={recordAnswer} initialLesson={practiceLesson} />}
        {view === 'obj' && <Objects />}
        {view === 'form' && <Formulas />}
        {view === 'mist' && <Notebook p={p} />}
        {view === 'chk' && <Checklist p={p} setChecked={setChecked} />}
        {view === 'rules' && <Rules />}
        {view === 'settings' && <Settings store={store} importMerge={importMerge} sync={sync} />}
      </main>
    </>
  );
}
