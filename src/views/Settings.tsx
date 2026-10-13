import { useState } from 'react';
import { Card } from '../components/Card';
import { AccountPanel } from '../components/AccountPanel';
import type { useSync } from '../state/useSync';
import { parseStore } from '../lib/progressModel';
import type { ProgressStore } from '../lib/progressModel';

export function Settings({ store, importMerge, sync }: { store: ProgressStore; importMerge: (s: ProgressStore) => void; sync: ReturnType<typeof useSync> }) {
  const [msg, setMsg] = useState('');

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astrophysics-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const parsed = parseStore(JSON.parse(await file.text()));
      if (!parsed) { setMsg('That file is not a valid Astrophysics Academy backup. Nothing was changed.'); return; }
      importMerge(parsed);
      setMsg(`Imported and merged ${parsed.attempts.length} attempt(s). Existing progress was kept.`);
    } catch {
      setMsg('Could not read that file. Nothing was changed.');
    }
  };

  return (
    <>
      <Card>
        <h2>Settings and Sync</h2>
        <p className="mu">Device ID: {store.deviceId.slice(0, 8)} · Saved attempts: {store.attempts.length}</p>
      </Card>
      <AccountPanel {...sync} pendingLocal={store.attempts.length} />
      <Card>
        <h3>Backup</h3>
        <p className="mu">A JSON backup is a safety copy, not cloud sync. Importing <b>merges</b> into your current progress and never deletes anything.</p>
        <button className="b" onClick={exportJson}>Export backup (.json)</button>
        <p><input type="file" accept="application/json,.json" onChange={onFile} aria-label="Import backup file" /></p>
        {msg && <p role="status">{msg}</p>}
      </Card>
    </>
  );
}
