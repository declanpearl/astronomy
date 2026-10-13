import { Card } from '../components/Card';
import { FORMULAS } from '../data/formulas';

export function Formulas() {
  return (
    <Card>
      <h2>Formulas</h2>
      <p className="mu">Period-luminosity and Tully–Fisher coefficients depend on the calibration used; they are not included yet (they will be supplied in problems).</p>
      <table>
        <tbody>
          {FORMULAS.map((f) => (
            <tr key={f.name}><td><b>{f.name}</b></td><td>{f.eq}<br /><span className="mu">{f.note}</span></td></tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
