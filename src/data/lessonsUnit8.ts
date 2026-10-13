import type { Lesson } from '../types';

// Unit 8: orbital mechanics, Kepler, binaries, rotation curves. Educational material, not official rule text.
// Constants used in this app's problems: G = 6.674e-11 N m^2/kg^2, M_sun = 1.989e30 kg, 1 AU = 1.496e11 m,
// 1 pc = 3.086e16 m, 1 kpc = 3.086e19 m, 1 yr = 3.156e7 s. Problems state what they need.
export const UNIT_8_LESSONS: Lesson[] = [
  { id: 'O1', unit: 8, order: 81, title: 'Unit 8: Orbits, Newtonian gravity and orbital speed', tags: ['orbital', 'circular'], body: `
<p><b>Objectives:</b> distinguish period, radius, speed and acceleration, and use Newton's law of gravitation to link orbital motion to mass.</p>
<h4>Definitions</h4>
<p><b>Orbital radius r</b> (center to center for a circular orbit), <b>period T</b> (time for one revolution), <b>orbital speed v</b> (distance per time along the path), <b>acceleration a</b> (always toward the central body). They are different quantities: a planet farther out has a larger r and longer T, but a <i>lower</i> v.</p>
<h4>Gravity supplies the centripetal force</h4>
<span class="f">F = G M m / r² G M m / r² = m v² / r ⇒ v = √(GM / r)</span>
<span class="f">T = 2π r / v ⇒ M = 4π² r³ / (G T²)</span>
<p>Here M is the central mass (the orbiting body's mass cancels when it is much smaller). The last form is how orbital observations give masses: measure r and T, then compute M.</p>
<p><b>Worked:</b> Earth around the Sun: r = 1.496×10¹¹ m, M = 1.989×10³⁰ kg → v = √(6.674×10⁻¹¹ × 1.989×10³⁰ / 1.496×10¹¹) ≈ 2.98×10⁴ m/s ≈ 29.8 km/s.</p>
<p><b>Scaling:</b> v ∝ r^(−1/2) for a fixed central mass: double r and v drops by 1/√2; T ∝ r^(3/2).</p>
<p><b>Assumptions:</b> circular orbit, point or spherical central mass, orbiting mass negligible. <b>Common errors:</b> using diameter for r; mixing km and m; using the orbiter's mass instead of the central mass.</p>` },
  { id: 'O2', unit: 8, order: 82, title: 'Unit 8: Circular motion and centripetal acceleration', tags: ['circular', 'orbital'], body: `
<p><b>Objectives:</b> convert between period, angular speed and speed, and compute centripetal acceleration.</p>
<span class="f">ω = 2π / T v = ω r = 2π r / T a_c = v² / r = ω² r = 4π² r / T²</span>
<p>Angular speed ω is in rad/s; speed v in m/s; a_c in m/s². The acceleration points toward the center and changes the direction of the velocity, not its size.</p>
<p><b>Worked:</b> a point on a circle with T = 2 h = 7200 s: ω = 2π/7200 ≈ 8.73×10⁻⁴ rad/s. For r = 6.371×10⁶ m and T = 8.64×10⁴ s: a_c = 4π² × 6.371×10⁶ / (8.64×10⁴)² ≈ 0.0337 m/s².</p>
<p><b>Reading data:</b> if v is constant while r is large, the object takes longer per revolution (T = 2πr/v). A table of (r, v) for orbits around one central mass should show v² r ≈ constant (v ∝ r^−1/2).</p>
<p><b>Common errors:</b> forgetting to convert hours to seconds; using degrees instead of radians; squaring only part of the expression.</p>` },
  { id: 'O3', unit: 8, order: 83, title: 'Unit 8: Kepler\u2019s three laws with calculations', tags: ['kepler', 'orbital'], body: `
<p><b>Objectives:</b> state and apply Kepler's laws, including elliptical orbits.</p>
<p><b>1st law:</b> orbits are ellipses with the central body at one focus. <b>2nd law:</b> the line from the central body to the orbiting body sweeps out equal areas in equal times, so the body moves fastest at closest approach (perihelion) and slowest at the farthest point (aphelion). <b>3rd law:</b> the square of the period is proportional to the cube of the semi-major axis.</p>
<h4>Useful relations</h4>
<span class="f">P² = a³ (P in years, a in AU, central mass in M☉) P² = a³ / (M₁ + M₂) in the same units</span>
<span class="f">a = (r_peri + r_apo)/2 e = (r_apo − r_peri)/(r_apo + r_peri) v_peri / v_apo = r_apo / r_peri</span>
<p>The last relation comes from the equal-area law (angular momentum conservation) at the two apsides. Comparing two orbits around the same body: P₁²/P₂² = a₁³/a₂³, so no units conversion is needed.</p>
<p><b>Worked:</b> a comet with r_peri = 0.5 AU and r_apo = 31.5 AU: a = 16 AU, P = 16^1.5 = 64 yr, e = 31/32 ≈ 0.97, and it moves 63 times faster at perihelion than aphelion.</p>
<p><b>Common errors:</b> using a as the perihelion distance; applying P² = a³ with a in km or P in days; forgetting that a heavier central star shortens the period.</p>` },
  { id: 'O4', unit: 8, order: 84, title: 'Unit 8: Binary stars and stellar masses', tags: ['binaries', 'kepler', 'orbital'], body: `
<p><b>Objectives:</b> identify binary types and use their orbits to find stellar masses.</p>
<h4>Types</h4>
<p><b>Visual binaries</b>: both stars resolved; measure angular separation. <b>Spectroscopic binaries</b>: unresolved, but spectral lines shift back and forth with the orbit (Doppler). <b>Eclipsing binaries</b>: orbit nearly edge-on, so the stars periodically block each other, producing dips in the light curve that give period, relative radii and relative surface brightness (temperature). Systems can belong to more than one type.</p>
<h4>Masses</h4>
<span class="f">M₁ + M₂ = a³ / P² (AU, yr, M☉) M₁ a₁ = M₂ a₂ , a = a₁ + a₂ M₁/M₂ = v₂/v₁</span>
<p>Kepler's third law gives the <b>total</b> mass; the center-of-mass relation gives the <b>ratio</b> (the more massive star moves less). Combine them for each mass. For a visual binary the physical separation is <span class="f">a (AU) = α (arcsec) × d (pc)</span></p>
<p><b>Spectroscopic binary with circular orbits:</b> relative speed v = v₁ + v₂, a = v P / 2π, so M_total = v³ P / (2π G).</p>
<p><b>Worked:</b> a = 8 AU, P = 4 yr → M_total = 512/16 = 32 M☉. Star A is 2 AU from the center of mass, so M_A/M_B = 6/2 = 3 and M_A = 24 M☉.</p>
<p><b>Limits:</b> Doppler shifts give only v sin i, so spectroscopic masses are lower limits unless the inclination is known (eclipses require i near 90°). Real orbits may be elliptical.</p>` },
  { id: 'O5', unit: 8, order: 85, title: 'Unit 8: Galaxy rotation curves and mass distribution', tags: ['rotcurve', 'orbital', 'circular'], body: `
<p><b>Objectives:</b> interpret rotation curves, compute enclosed mass, and explain what flat curves imply.</p>
<h4>Rotation curve</h4>
<p>A plot of orbital speed v against distance r from the center, measured from Doppler shifts of stars and gas (for example 21-cm hydrogen emission).</p>
<h4>What different mass distributions predict</h4>
<table><tbody><tr><td>Uniform-density core</td><td>v ∝ r (rising, like solid-body rotation)</td></tr>
<tr><td>Nearly all mass inside r₀, looking outward</td><td>v ∝ r^(−1/2) (Keplerian fall-off)</td></tr>
<tr><td>Mass growing ∝ r</td><td>v roughly constant (flat)</td></tr></tbody></table>
<h4>Enclosed mass</h4>
<span class="f">M(&lt;r) ≈ v² r / G (spherical symmetry assumed)</span>
<p><b>Worked:</b> v = 220 km/s at r = 8 kpc (1 kpc = 3.086×10¹⁹ m): M ≈ (2.2×10⁵)² × 2.469×10²⁰ / 6.674×10⁻¹¹ ≈ 1.8×10⁴¹ kg ≈ 9.0×10¹⁰ M☉. Period at that radius T = 2πr/v ≈ 2.2×10⁸ yr.</p>
<h4>Observation and interpretation</h4>
<p>In spiral galaxies, rotation curves stay roughly flat far beyond the visible disk instead of falling in a Keplerian way. The standard interpretation is extended unseen mass (a dark matter halo). Estimates of the dark-to-visible ratio vary by galaxy and method, and alternative explanations have been proposed.</p>
<p><b>Limits:</b> disks are not spheres; M = v²r/G is an estimate; distances and inclination add uncertainty.</p>` },
  { id: 'O6', unit: 8, order: 86, title: 'Unit 8: Assumptions, units and common calculation mistakes', tags: ['orbital', 'kepler'], body: `
<p><b>Objectives:</b> choose the right form of each law, keep units consistent, and avoid classic errors.</p>
<h4>Which form when?</h4>
<table><tbody><tr><td>SI form (G, kg, m, s)</td><td>v = √(GM/r), M = 4π²r³/(GT²)</td></tr>
<tr><td>Solar-system units</td><td>P² = a³/(M₁+M₂) only with P in yr, a in AU, M in M☉</td></tr>
<tr><td>Ratios</td><td>compare two orbits of the same central mass; units cancel</td></tr></tbody></table>
<h4>Unit conversions to memorize or look up</h4>
<p>1 AU = 1.496×10¹¹ m; 1 pc = 3.086×10¹⁶ m = 206 265 AU; 1 yr ≈ 3.156×10⁷ s; 1 kpc = 3.086×10¹⁹ m; 1 M☉ = 1.989×10³⁰ kg. Check these against your own reference.</p>
<h4>Assumptions to state</h4>
<p>Circular orbit (or use a for ellipses); central mass much larger than the orbiter (otherwise use the total mass); spherical symmetry for rotation-curve masses; edge-on inclination for Doppler velocities.</p>
<h4>Checklist</h4>
<p>1. Is r a radius, not a diameter? 2. Are all quantities in one unit system? 3. Total mass or one mass? 4. Is a semi-major axis, not perihelion distance? 5. Is the answer reasonable (speeds of tens of km/s for planets, hundreds for galaxy discs)?</p>` },
];
