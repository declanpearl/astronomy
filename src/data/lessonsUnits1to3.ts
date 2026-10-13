import type { Lesson } from '../types';

// Units 1-3 lesson text. Educational material, not official rule text.
// VERIFY against your reference: solar constants, spectral-class temperature boundaries (approximate).
export const UNIT_1_3_LESSONS: Lesson[] = [
  { id: 'U1A', unit: 1, order: 10, title: 'Unit 1: Stellar properties, scales and the electromagnetic spectrum', tags: ['luminosity', 'multiwl'], body: `
<p><b>Objectives:</b> name the basic properties of a star, convert between astronomical distance units, order the EM spectrum, and separate what is measured from what is inferred.</p>
<h4>Basic stellar properties</h4>
<p><b>Mass</b>, <b>radius</b>, <b>surface (effective) temperature</b>, <b>luminosity</b> (total power output) and <b>composition</b> (by mass, most stars are roughly three-quarters hydrogen and one-quarter helium, with a small fraction of heavier elements). Reference values: <span class="f">M☉ ≈ 1.99×10³⁰ kg · R☉ ≈ 6.96×10⁸ m · L☉ ≈ 3.83×10²⁶ W · T☉ ≈ 5772 K</span></p>
<h4>Distance units</h4>
<span class="f">1 AU ≈ 1.496×10¹¹ m · 1 pc ≈ 206 265 AU ≈ 3.26 ly · 1 ly ≈ 9.46×10¹⁵ m</span>
<p>Scientific notation: write numbers as a×10ⁿ and keep units attached through every step. Convert first, then calculate.</p>
<h4>The electromagnetic spectrum (increasing wavelength)</h4>
<p>Gamma rays → X-rays → ultraviolet → optical (~400–700 nm) → infrared → radio. Shorter wavelength means higher photon energy. Different bands trace different physical conditions, but no band is "only" one kind of object.</p>
<h4>Direct vs inferred</h4>
<p><b>Directly measured:</b> position, apparent brightness through a filter, spectral line wavelengths, parallax angle. <b>Inferred:</b> luminosity, radius, mass, composition, distance (from a model or relation). Inferred values carry the assumptions of the method.</p>
<p><b>Misconception:</b> "a star's brightness tells you how powerful it is." Brightness depends on distance as well.</p>
<p><b>Key facts:</b> 1 pc ≈ 3.26 ly; optical is a narrow band; every inferred quantity has uncertainty.</p>` },
  { id: 'U1B', unit: 1, order: 11, title: 'Unit 1: Brightness, luminosity and the magnitude scale', tags: ['luminosity'], body: `
<p><b>Objectives:</b> use the inverse-square law, compare stars with magnitudes, and avoid confusing apparent brightness with luminosity.</p>
<h4>Flux and luminosity</h4>
<span class="f">F = L / (4π d²)</span>
<p>L is intrinsic (watts). F is what we receive (W/m²). Same star, double the distance → ¼ the flux. Equal-looking stars at different distances have different luminosities: L ∝ F d².</p>
<h4>Magnitudes</h4>
<p>Smaller (more negative) magnitude = brighter. Five magnitudes is a factor of exactly 100 in flux.</p>
<span class="f">m₁ − m₂ = −2.5 log₁₀(F₁/F₂) F₁/F₂ = 10^(−0.4 (m₁ − m₂))</span>
<p><b>Worked:</b> star A has m = 4.0 and star B has m = 7.0. m_A − m_B = −3.0, so F_A/F_B = 10^(1.2) ≈ 15.8. A is about 16 times brighter.</p>
<p><b>Apparent vs absolute:</b> m is as seen from Earth; M is the magnitude the star would have at 10 pc, so M compares true luminosities.</p>
<p><b>Misconceptions:</b> (1) a smaller magnitude means a <i>fainter</i> star: wrong. (2) an apparently brighter star is more luminous: not unless distances are equal. (3) magnitude differences multiply fluxes: they set a <i>ratio</i>, not a difference.</p>
<p><b>Key facts:</b> 5 mag = ×100; 1 mag ≈ ×2.512; flux ∝ 1/d².</p>` },
  { id: 'U2A', unit: 2, order: 20, title: 'Unit 2: Spectral classes and stellar temperature', tags: ['classification', 'spectral', 'wien'], body: `
<p><b>Objectives:</b> order the spectral classes, link class to temperature and color, and separate spectral type from luminosity class.</p>
<h4>The sequence (hottest to coolest): O B A F G K M</h4>
<table><tbody>
<tr><td><b>O</b></td><td>&gt; ~30 000 K</td><td>blue; ionized helium lines</td></tr>
<tr><td><b>B</b></td><td>~10 000–30 000 K</td><td>blue-white; neutral helium</td></tr>
<tr><td><b>A</b></td><td>~7 500–10 000 K</td><td>white; strongest hydrogen Balmer lines</td></tr>
<tr><td><b>F</b></td><td>~6 000–7 500 K</td><td>yellow-white; ionized calcium, metals strengthen</td></tr>
<tr><td><b>G</b></td><td>~5 200–6 000 K</td><td>yellow; Sun is G2</td></tr>
<tr><td><b>K</b></td><td>~3 700–5 200 K</td><td>orange; neutral metals</td></tr>
<tr><td><b>M</b></td><td>&lt; ~3 700 K</td><td>red; molecular bands such as TiO</td></tr></tbody></table>
<p class="mu">Boundaries are approximate and differ slightly between references: use the values supplied in a problem.</p>
<p>Each class is split into subclasses 0–9 (G2 is hotter than G8).</p>
<h4>Luminosity class (supplemental detail)</h4>
<p>I (supergiants), III (giants), V (main sequence), with II and IV between. Two stars of the same spectral type but different luminosity class have similar temperatures but very different radii and luminosities, because line widths respond to surface gravity.</p>
<h4>Temperature, color and luminosity are different things</h4>
<p>Temperature sets color and spectral type. Luminosity also depends on radius: L ∝ R²T⁴.</p>
<p><b>Using Wien:</b> T = b/λmax, then place the star in a class using given boundaries. Example: λmax = 500 nm → T ≈ 5800 K → G.</p>
<p><b>Misconceptions:</b> "O is the first letter so it is coolest"; "M stars are the most luminous because they are the biggest letter".</p>` },
  { id: 'U2B', unit: 2, order: 21, title: 'Unit 2: Spectroscopy, line formation and Doppler shifts', tags: ['spectroscopy', 'spectral'], body: `
<p><b>Objectives:</b> classify spectrum types, explain how lines form, and calculate radial velocity from a wavelength shift.</p>
<h4>Three kinds of spectra</h4>
<p><b>Continuous</b> (hot dense source), <b>emission lines</b> (hot thin gas seen against a dark background), <b>absorption lines</b> (cooler thin gas in front of a continuous source). A star's photosphere produces dark absorption lines on a continuum.</p>
<h4>Why lines appear</h4>
<p>Atoms absorb or emit photons only at energies matching electron transitions, so each element and ion has a fingerprint. Line strength depends on temperature (excitation and ionization) as well as abundance. Hydrogen Balmer lines peak at about 10 000 K because cooler atoms are rarely excited to n = 2 and hotter ones are mostly ionized.</p>
<h4>Doppler shift</h4>
<span class="f">Δλ / λ₀ = v_r / c (for v ≪ c) so v_r = c (λ_obs − λ₀)/λ₀</span>
<p>Positive shift (redshift) = receding. Negative (blueshift) = approaching. Only the line-of-sight (radial) component is measured.</p>
<p><b>Worked:</b> λ₀ = 500.0 nm, observed 500.2 nm, c = 3.00×10⁵ km/s: v = 3.00×10⁵ × 0.2/500 = 120 km/s, receding.</p>
<h4>Limitations</h4>
<p>Line broadening, blended lines, limited resolution and noise limit what a spectrum shows. Weak hydrogen lines in an M star do <i>not</i> mean it lacks hydrogen.</p>` },
  { id: 'U3A', unit: 3, order: 31, title: 'Unit 3: Blackbody radiation and stellar luminosity (extended)', tags: ['blackbody', 'wien', 'sb', 'luminosity'], body: `
<p><b>Objectives:</b> chain Wien and Stefan–Boltzmann together, and use solar-scaled ratios to avoid large powers of ten.</p>
<h4>Solar-scaled forms</h4>
<span class="f">L/L☉ = (R/R☉)² (T/T☉)⁴ R/R☉ = √(L/L☉) / (T/T☉)² T/T☉ = (L/L☉)^¼ / (R/R☉)^½</span>
<p>These hold when all quantities are expressed relative to the Sun, so units cancel. Stars are approximately, not perfectly, blackbodies; T here is the effective temperature.</p>
<h4>Typical chain</h4>
<p>Peak wavelength → T (Wien) → with R → L (Stefan–Boltzmann) → with d → flux.</p>
<p><b>Worked:</b> λmax = 290 nm and R = 3 R☉. T = 2.898×10⁻³ / 2.90×10⁻⁷ ≈ 10 000 K. T/T☉ = 10 000 / 5772 = 1.73. L/L☉ = 3² × 1.73⁴ ≈ 9 × 9.0 ≈ 81.</p>
<p><b>Common errors:</b> using Celsius; squaring T instead of R (or the reverse); mixing nm and m; forgetting that a hot star can be faint if it is tiny.</p>
<p><b>Key facts:</b> doubling T → ×16 L; doubling R → ×4 L; at fixed T, R ∝ √L.</p>` },
  { id: 'U3B', unit: 3, order: 33, title: 'Unit 3: Reading H-R diagrams', tags: ['hr', 'classification', 'sb'], body: `
<p><b>Objectives:</b> locate stellar groups, compare stars by position, and extract radius from luminosity and temperature.</p>
<h4>Axes and conventions</h4>
<p>Vertical axis: luminosity (or absolute magnitude, where brighter is <i>up</i> but numerically lower). Horizontal axis: temperature or spectral class, conventionally with hot on the <b>left</b>. <b>Always read the axis labels</b>: some diagrams reverse this.</p>
<h4>Regions</h4>
<p><b>Main sequence</b>: diagonal band, hot and luminous (upper left) to cool and dim (lower right). <b>Giants and supergiants</b>: cool but luminous, hence very large (upper right). <b>White dwarfs</b>: hot but faint, hence very small (lower left).</p>
<h4>Radius from position</h4>
<span class="f">R/R☉ = √(L/L☉) / (T/T☉)²</span>
<p><b>Worked:</b> T = 3500 K and L = 10⁵ L☉: R/R☉ = √(10⁵) / (3500/5772)² = 316 / 0.368 ≈ 860, a red supergiant.</p>
<p>Lines of constant radius run diagonally across the diagram: same R, hotter means more luminous.</p>
<p><b>Misconceptions:</b> "stars move along the main sequence as they age" (evolution is Unit 5); "cool means dim" (a cool star can be luminous if huge).</p>` },
];
