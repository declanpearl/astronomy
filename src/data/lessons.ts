import type { Lesson } from '../types';
import { UNIT_1_3_LESSONS } from './lessonsUnits1to3.ts';
import { UNIT_4_5_LESSONS } from './lessonsUnits4to5.ts';
import { UNIT_6_7_LESSONS } from './lessonsUnits6to7.ts';
import { UNIT_8_LESSONS } from './lessonsUnit8.ts';
import { UNIT_9_10_LESSONS } from './lessonsUnits9to10.ts';
import { UNIT_11_12_LESSONS } from './lessonsUnits11to12.ts';

// Bodies are trusted, repo-authored HTML (rendered with dangerouslySetInnerHTML).
const BASE_LESSONS: Lesson[] = [
  { id: 'L1', unit: 3, order: 30, title: 'Blackbody radiation: Wien and Stefan–Boltzmann', tags: ['blackbody', 'wien', 'sb', 'luminosity'], body: `<p>Hot objects emit a continuous spectrum. Hotter means a bluer peak and far more power per unit area.</p>
<b>Wien:</b><span class="f">λmax · T = b, b ≈ 2.898×10⁻³ m·K</span><b>Stefan–Boltzmann:</b><span class="f">L = 4πR²σT⁴, σ ≈ 5.670×10⁻⁸ W m⁻² K⁻⁴</span>
<p>Temperature must be in <b>kelvin</b>. Radius in metres for SI results.</p><p><b>Worked:</b> T = 5800 K → λmax = 2.898×10⁻³ / 5800 ≈ 5.0×10⁻⁷ m = 500 nm.</p>
<p><b>Ratios:</b> L₂/L₁ = (R₂/R₁)²(T₂/T₁)⁴. Doubling T gives 16× the luminosity.</p><p class="mu">Common errors: using °C, forgetting the 4th power, mixing nm and m.</p>` },
  { id: 'L2', unit: 1, order: 12, title: 'Magnitudes, distance modulus and parallax', tags: ['dm', 'parallax', 'luminosity'], body: `<p>Apparent magnitude m is how bright a star looks. Absolute magnitude M is its brightness at 10 pc. Smaller magnitude = brighter.</p>
<span class="f">m − M = 5 log₁₀(d) − 5, d in parsecs</span><span class="f">d = 10^((m−M+5)/5)</span><span class="f">d(pc) = 1 / p(arcsec)</span>
<p><b>Worked:</b> m = 15, M = 0 → m−M = 15 → d = 10^4 pc. Inverse-square: doubling distance cuts flux to ¼.</p><p class="mu">Parallax only works for relatively nearby stars; extinction can bias the distance modulus.</p>` },
  { id: 'L3', unit: 8, order: 80, title: 'Orbits: Kepler and circular motion', tags: ['orbital'], body: `<p>Newton's form of Kepler's third law for two bodies orbiting each other:</p><span class="f">P² = a³ / (M₁+M₂), P in years, a in AU, M in solar masses</span><span class="f">v = √(GM/r) (circular orbit)</span>
<p><b>Worked:</b> a = 2 AU, P = 2 yr → M = a³/P² = 8/4 = 2 M☉. The approximation: units must be years, AU and solar masses.</p><p class="mu">Galaxy rotation curves use the same idea: mass inside r ≈ v²r/G.</p>` },
  { id: 'L4', unit: 3, order: 32, title: 'H-R diagrams', tags: ['hr', 'classification'], body: `<p>An H-R diagram plots luminosity (or absolute magnitude) against temperature (or spectral class). <b>Temperature usually increases to the LEFT.</b> Always check axis labels.</p>
<p>Main sequence runs from hot, luminous (upper left) to cool, dim (lower right). Giants and supergiants sit above it; white dwarfs sit below. Higher-mass main-sequence stars are more luminous and live much shorter lives.</p>` },
  { id: 'L5', unit: 7, order: 76, title: 'Hubble\u2019s law and distance ladder', tags: ['hubble'], body: `<span class="f">v = H₀ d</span><p>With H₀ in km/s/Mpc, v in km/s gives d in Mpc. <b>Worked:</b> v = 1400 km/s, H₀ = 70 → d = 20 Mpc.</p><p class="mu">Assumes motion is dominated by cosmic expansion, not local peculiar velocity.</p>` },
];

export const LESSONS: Lesson[] = [...BASE_LESSONS, ...UNIT_1_3_LESSONS, ...UNIT_4_5_LESSONS, ...UNIT_6_7_LESSONS, ...UNIT_8_LESSONS, ...UNIT_9_10_LESSONS, ...UNIT_11_12_LESSONS];
