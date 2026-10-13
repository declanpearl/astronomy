import { Card } from '../components/Card';
import { OBJECTS } from '../data/objects';

export function Objects() {
  return (
    <>
      <Card>
        <h2>Required Objects</h2>
        <p className="mu">Official list entries. Facts are brief, approximate, and not yet source-cited; items marked TODO or &quot;Verify&quot; need research before you trust them.</p>
      </Card>
      {OBJECTS.map((o) => (
        <Card key={o.id}>
          <b>{o.name}</b>
          <p>{o.summary}</p>
          <p className="mu">Why it matters: {o.why}</p>
        </Card>
      ))}
    </>
  );
}
