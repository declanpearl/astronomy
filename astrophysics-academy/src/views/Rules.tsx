import { Card } from '../components/Card';
import { RULES } from '../data/rules';

export function Rules() {
  return (
    <>
      <Card>
        <h2>Official Rules (original wording)</h2>
        <p>{RULES.desc}</p>
        <h3>Event Parameters</h3>
        {RULES.params.map((t, i) => <p key={i}>{t}</p>)}
        <h3>The Competition</h3>
        <p>{RULES.comp}</p>
        <h3>Scoring</h3>
        <p>{RULES.score}</p>
      </Card>
      <Card>
        <span className="mu">Everything outside this page is educational or supplemental, not official. This app must not be used to answer questions during the event.</span>
      </Card>
    </>
  );
}
