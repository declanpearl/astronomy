import { Card } from '../components/Card';
import { OBJECTS } from '../data/objects';
import type { RequiredObject } from '../types';

const STATUS_TEXT: Record<RequiredObject['status'], string> = {
  checked: 'sources checked',
  partial: 'partly checked (some secondary sources)',
};

function ObjectCard({ o, child }: { o: RequiredObject; child?: boolean }) {
  return (
    <Card>
      <div style={child ? { marginLeft: 12, borderLeft: '3px solid #33437a', paddingLeft: 10 } : undefined}>
        <b>{o.name}</b> <span className="tag">{STATUS_TEXT[o.status]}</span>
        {o.parent ? <span className="tag">part of M82</span> : null}
        <p>{o.summary}</p>
        <p className="mu"><b>Also known as:</b> {o.aliases.join('; ')}<br />
          <b>Type:</b> {o.kind}<br /><b>Location:</b> {o.location}<br /><b>Distance:</b> {o.distance}</p>
        <p><b>Key facts</b></p>
        <ul>{o.facts.map((f, i) => <li key={i}>{f}</li>)}</ul>
        <p><b>What to recognize</b></p>
        <ul>{o.recognize.map((f, i) => <li key={i}>{f}</li>)}</ul>
        <p><b>Caveats and interpretation</b></p>
        <ul>{o.caveats.map((f, i) => <li key={i} className="mu">{f}</li>)}</ul>
        <p className="mu">Why it matters: {o.why}</p>
        {o.sources.map((s) => <p key={s} className="mu" style={{ wordBreak: 'break-all' }}>Source: <a href={s} target="_blank" rel="noreferrer">{s}</a></p>)}
      </div>
    </Card>
  );
}

export function Objects() {
  const top = OBJECTS.filter((o) => !o.parent);
  return (
    <>
      <Card>
        <h2>Required Objects</h2>
        <p className="mu">The official rules name 13 items; this app lists 16 study entries because M82 is split into M82, X-1, X-2 and SN 2014J. Each page lists its sources. &quot;Partly checked&quot; pages rely on some secondary sources, and where reputable sources disagree the page says so rather than choosing one number.</p>
      </Card>
      {top.map((o) => (
        <div key={o.id}>
          <ObjectCard o={o} />
          {OBJECTS.filter((c) => c.parent === o.id).map((c) => <ObjectCard key={c.id} o={c} child />)}
        </div>
      ))}
    </>
  );
}
