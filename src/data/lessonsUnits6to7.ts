import type { Lesson } from '../types';

// Units 6-7: variable stars and the distance ladder. Educational material, not official rule text.
// Calibrations (period-luminosity, Tully-Fisher, SN Ia peak magnitudes, H0) are ILLUSTRATIVE: real problems must supply the relation they use.
export const UNIT_6_7_LESSONS: Lesson[] = [
  { id: 'V1', unit: 6, order: 60, title: 'Unit 6: Cepheid variables and the period–luminosity relation', tags: ['cepheid', 'pl', 'lightcurves'], body: `
<p><b>Objectives:</b> explain why Cepheids pulsate, state the period–luminosity (P–L) relation, and turn a period and an apparent magnitude into a distance.</p>
<h4>What a Cepheid is</h4>
<p>A Cepheid is a luminous, evolved, radially pulsating star. Its outer layers swell and shrink, so its radius, temperature and brightness vary smoothly and repeatedly. <b>Classical Cepheids</b> are young Population I stars with periods of roughly 1 to 100 days (approximate).</p>
<h4>The period–luminosity relation (Leavitt law)</h4>
<p>Larger, more luminous Cepheids pulsate more slowly, so longer period means greater luminosity. In magnitudes the relation is a straight line in log P:</p>
<span class="f">M = a log₁₀(P / day) + b (a is negative: longer P → smaller, i.e. brighter, M)</span>
<p>The coefficients <b>depend on the band and on the calibration used</b>, and Type II Cepheids follow a different (fainter) relation. Problems must supply a and b.</p>
<h4>Using it</h4>
<p>Measure the period from the light curve → get M → compare with the mean apparent magnitude m → <span class="f">d = 10^((m − M + 5)/5) pc</span></p>
<p><b>Worked</b> (supplied calibration M = −2.5 log₁₀P − 1.5): P = 10 d gives M = −4.0. If m = 24.0, then m − M = 28 and d = 10^(33/5) pc ≈ 3.98 Mpc.</p>
<p><b>Misconceptions:</b> the amplitude does not set the luminosity; the period does. A Cepheid's period does not change with its distance. Mixing up classical and Type II Cepheids gives wrong distances.</p>` },
  { id: 'V2', unit: 6, order: 61, title: 'Unit 6: RR Lyrae variables', tags: ['rrlyrae', 'pl', 'lightcurves'], body: `
<p><b>Objectives:</b> state the properties of RR Lyrae stars, contrast them with Cepheids, and use them for distances.</p>
<h4>Properties</h4>
<p>RR Lyrae stars are old, low-mass, metal-poor Population II stars that pulsate radially; they are horizontal-branch stars crossing the instability strip. Periods are short, about 0.2 to 0.9 day. They are found in globular clusters and in the halo and bulge, and trace old stellar populations.</p>
<h4>Standard candles</h4>
<p>In the visual band their mean absolute magnitude is nearly the same from star to star, roughly M_V ≈ +0.6 to +0.9 depending on metallicity (use the value a problem supplies). In the near-infrared they also follow a clear period–luminosity relation. They are far fainter than Cepheids (M of a few magnitudes versus about −2 to −6), so they are usable to smaller distances: the Milky Way and nearby galaxies.</p>
<p><b>Worked:</b> M_V = +0.6 (supplied) and m = 15.6 → m − M = 15 → d = 10⁴ pc = 10 kpc (no extinction).</p>
<h4>Cepheids vs RR Lyrae</h4>
<table><tbody><tr><td></td><td><b>Classical Cepheid</b></td><td><b>RR Lyrae</b></td></tr>
<tr><td>Population</td><td>young, disk</td><td>old, halo / globular clusters</td></tr>
<tr><td>Period</td><td>~1–100 d</td><td>~0.2–0.9 d</td></tr>
<tr><td>Luminosity</td><td>high, depends on P</td><td>lower, nearly constant in V</td></tr></tbody></table>
<p class="mu">Details of subtypes (RRab and RRc light-curve shapes) and exact absolute magnitudes need review against your own reference.</p>` },
  { id: 'V3', unit: 6, order: 62, title: 'Unit 6: Reading variable-star light curves', tags: ['lightcurves', 'cepheid', 'rrlyrae'], body: `
<p><b>Objectives:</b> extract period, amplitude and mean brightness from a light curve or data table and use them correctly.</p>
<h4>Key quantities</h4>
<p><b>Period P:</b> the time between identical points (for example successive maxima). Use several cycles and average. <b>Amplitude:</b> faintest magnitude minus brightest magnitude. Remember magnitudes run backwards: the <i>smallest</i> m is the brightest point. <b>Mean magnitude:</b> the average over a cycle, which is what the P–L relation uses.</p>
<span class="f">Flux ratio (max/min) = 10^(0.4 × amplitude) phase = ((t − t₀)/P) mod 1</span>
<h4>Reading data tables and graphs</h4>
<p>On a plot, check the axis: the magnitude axis is usually inverted so bright is up. Find the period from repeated features, not from a single point. A table of (phase, m) lets you locate maximum and minimum by comparing m values.</p>
<p><b>Worked:</b> maxima at t = 1.0, 3.5, 6.0 d → P = 2.5 d. Brightest m = 10.9, faintest m = 11.7 → amplitude 0.8 mag → flux ratio 10^0.32 ≈ 2.09.</p>
<h4>Cautions</h4>
<p>Sparse sampling can give a false period. Dust dims the mean magnitude but does not change the period. The period is intrinsic, so it does not depend on distance.</p>` },
  { id: 'D1', unit: 7, order: 71, title: 'Unit 7: Parallax, its limitations, and proper motion', tags: ['parallax', 'propermotion'], body: `
<p><b>Objectives:</b> convert angles, compute distances from parallax, judge reliability, and compute transverse velocity.</p>
<h4>Geometry</h4>
<p>As Earth orbits, a nearby star appears to shift against distant background stars. The parallax angle p is the shift corresponding to a baseline of 1 AU (half the shift between observations six months apart).</p>
<span class="f">d (pc) = 1 / p (arcsec) 1 arcsec = 1000 mas 1° = 3600 arcsec</span>
<h4>Limitations</h4>
<p>Parallax angles are tiny, so precision is the limit. The fractional distance error is about σ_p / p, which grows as p shrinks. Space astrometry reaches far smaller uncertainties than ground-based work, but parallax is still a method for the Milky Way, not for other galaxies. Very uncertain parallaxes give biased distances.</p>
<p><b>Worked:</b> p = 2.0 mas with σ = 0.2 mas → d = 500 pc with a 10% uncertainty.</p>
<h4>Proper motion</h4>
<p>Proper motion μ is the angular change of position across the sky per year. Combined with distance it gives the transverse velocity; radial velocity comes from the Doppler shift:</p>
<span class="f">v_t = 4.74 μ d (μ in arcsec/yr, d in pc, v_t in km/s) v = √(v_r² + v_t²)</span>
<p><b>Worked:</b> μ = 0.40"/yr, d = 25 pc: v_t = 4.74 × 0.40 × 25 = 47.4 km/s. With v_r = −30 km/s: v ≈ 56.1 km/s.</p>
<p><b>Common errors:</b> using mas as arcsec; forgetting that proper motion is not the radial velocity.</p>` },
  { id: 'D2', unit: 7, order: 72, title: 'Unit 7: The distance modulus in depth (with extinction)', tags: ['dm', 'luminosity'], body: `
<p><b>Objectives:</b> rearrange the distance modulus for any unknown, include extinction, and judge error sizes.</p>
<span class="f">m − M = 5 log₁₀(d) − 5 (+ A if dust dims the star by A magnitudes)</span>
<span class="f">M = m − 5 log₁₀(d) + 5 − A d = 10^((m − M − A + 5)/5) pc</span>
<p>The quantity m − M is the distance modulus. Useful anchors: m − M = 0 at 10 pc; 10 at 1 kpc; 25 at 1 Mpc.</p>
<p><b>Worked:</b> m = 10.0, M = −1.0, A = 0.4: 5 log d − 5 = 10.6 → log d = 3.12 → d ≈ 1318 pc. If you ignore A you get a larger distance (dimming is mistaken for distance).</p>
<h4>Error sizes</h4>
<p>An error δ in (m − M) changes distance by a factor 10^(δ/5): 0.1 mag ≈ 5%, 0.5 mag ≈ 26%, 1 mag ≈ 58%.</p>
<p><b>Misconceptions:</b> m − M negative is possible (closer than 10 pc); the modulus is not the distance.</p>` },
  { id: 'D3', unit: 7, order: 73, title: 'Unit 7: Spectroscopic parallax (not a real parallax)', tags: ['specpar', 'classification', 'dm'], body: `
<p><b>Objectives:</b> carry out the spectroscopic-parallax procedure and state how it differs from geometric parallax.</p>
<h4>Procedure</h4>
<p>1. From the spectrum get the <b>spectral type and luminosity class</b>. 2. Read the absolute magnitude M for that type and class from a calibrated H-R diagram or table. 3. Measure the apparent magnitude m. 4. Apply the distance modulus.</p>
<h4>Geometric vs spectroscopic</h4>
<table><tbody><tr><td><b>Geometric parallax</b></td><td>measures a tiny angle; no assumptions about the star; limited to nearby stars</td></tr>
<tr><td><b>Spectroscopic parallax</b></td><td>no angle is measured; luminosity is inferred from classification; reaches farther but is less certain</td></tr></tbody></table>
<p><b>Worked:</b> a G2 V star (M = +4.8, supplied) has m = 12.8: m − M = 8 → d = 10^(13/5) ≈ 398 pc.</p>
<h4>Uncertainties</h4>
<p>Misidentifying the luminosity class (a giant mistaken for a main-sequence star of the same spectral type underestimates the distance), the natural spread in M within a class, metallicity, binarity, and unaccounted dust. A 1 mag error in M is a 58% distance error.</p>` },
  { id: 'D4', unit: 7, order: 74, title: 'Unit 7: Type Ia supernovae as standardizable candles', tags: ['ia', 'dm'], body: `
<p><b>Objectives:</b> explain why Type Ia supernovae are distance indicators and use them to find distances.</p>
<h4>Origin and appearance</h4>
<p>A Type Ia supernova is the thermonuclear explosion of a white dwarf in a binary system. Its spectrum lacks hydrogen lines. Peak absolute magnitude is roughly −19 (value depends on band and calibration; use the one supplied).</p>
<h4>Standardizable, not identical</h4>
<p>Peak luminosities vary, but they correlate with the decline rate: <b>slower-declining supernovae are more luminous</b> (Phillips relation). A common parameter is Δm₁₅(B), the drop in B magnitude in the 15 days after maximum; typical values are near 1.1 mag. One published form is M_B,max = −21.726 + 2.698 Δm₁₅(B). Correcting for this makes them precise distance indicators.</p>
<p><b>Worked:</b> peak m = 15.7 with M = −19.3: m − M = 35.0 → d = 10^8 pc = 100 Mpc.</p>
<h4>Advantages and limits</h4>
<p>Very luminous, so visible across hundreds of Mpc and beyond. Limits: they are rare and must be caught near maximum; dust dims and reddens them (redder than expected colors reveal dust); the zero point must be calibrated, often from Cepheid distances to host galaxies; at large redshift the simple relation needs cosmological corrections.</p>` },
  { id: 'D5', unit: 7, order: 75, title: 'Unit 7: The Tully–Fisher relationship', tags: ['tf', 'dm'], body: `
<p><b>Objectives:</b> use rotation speed to infer luminosity of a spiral galaxy and then distance.</p>
<h4>The relation</h4>
<p>More massive spiral galaxies rotate faster and are more luminous. Empirically L ∝ v_rot^α with α near 4 (it depends on band and calibration; problems supply the form). In magnitudes this becomes M = −2.5 α log₁₀ v + constant.</p>
<h4>Getting the rotation speed</h4>
<p>The 21-cm hydrogen line from a rotating disk is broadened by the Doppler effect. The linewidth W gives <span class="f">v_rot = W / (2 sin i)</span> where i is the inclination (i = 90° edge-on, 0° face-on). A face-on galaxy shows almost no line-of-sight rotation, so inclination must be known.</p>
<h4>Distance</h4>
<p>Inferred luminosity + measured flux → d = √(L/(4πF)), or via m − M.</p>
<p><b>Worked</b> (supplied calibration M = −21.0 − 10 log₁₀(v/200 km/s)): v = 100 km/s → M = −17.99; m = 14.0 → m − M = 31.99 → d = 25.0 Mpc.</p>
<p><b>Limits:</b> applies to spiral (rotating-disk) galaxies; scatter; inclination and dust corrections; calibration through other distance methods.</p>` },
  { id: 'D6', unit: 7, order: 77, title: 'Unit 7: Hubble\u2019s law, redshift and its limitations', tags: ['hubble'], body: `
<p><b>Objectives:</b> convert redshift to velocity and distance, state the assumptions, and explain when the simple law fails.</p>
<span class="f">z = (λ_obs − λ₀)/λ₀ v ≈ cz (for z ≪ 1) v = H₀ d d = cz / H₀</span>
<p>Use H₀ as supplied (about 70 km/s/Mpc in this app's problems; measured values differ between methods, so never assume one number). The <b>Hubble time</b> 1/H₀ is a rough age scale: for H₀ = 70, 1/H₀ ≈ 14 Gyr.</p>
<p><b>Worked:</b> z = 0.02: v = 3.00×10⁵ × 0.02 = 6000 km/s; d = 6000/70 ≈ 85.7 Mpc.</p>
<h4>Limitations</h4>
<p><b>Peculiar velocities:</b> gravity gives galaxies motions of hundreds of km/s on top of the expansion. For nearby galaxies this swamps the expansion: Andromeda is approaching the Milky Way. <b>Large z:</b> v = cz fails and distance depends on the cosmological model. The law is calibrated by the rest of the distance ladder.</p>
<p><b>Misconception:</b> galaxies are not flying through space away from us; space between distant galaxies is expanding (the redshift is cosmological).</p>` },
  { id: 'D7', unit: 7, order: 78, title: 'Unit 7: The distance ladder: how the methods connect', tags: ['parallax', 'cepheid', 'ia', 'hubble', 'dm'], body: `
<p><b>Objectives:</b> order the methods, explain how each calibrates the next, and choose the right method for a situation.</p>
<table><tbody>
<tr><td><b>Method</b></td><td><b>Needs</b></td><td><b>Reach (approximate)</b></td></tr>
<tr><td>Geometric parallax</td><td>angle</td><td>Milky Way</td></tr>
<tr><td>Spectroscopic parallax</td><td>spectrum, m</td><td>Milky Way, further than parallax</td></tr>
<tr><td>RR Lyrae</td><td>m, M_V</td><td>Milky Way, Local Group</td></tr>
<tr><td>Cepheids</td><td>period, m</td><td>Local Group to tens of Mpc</td></tr>
<tr><td>Tully–Fisher</td><td>linewidth, i, m</td><td>spiral galaxies, tens to hundreds of Mpc</td></tr>
<tr><td>Type Ia</td><td>peak m, decline rate</td><td>hundreds of Mpc and beyond</td></tr>
<tr><td>Hubble's law</td><td>redshift, H₀</td><td>far galaxies</td></tr></tbody></table>
<p class="mu">Reach values are approximate textbook ranges; check your reference.</p>
<h4>The chain</h4>
<p>Parallax calibrates Cepheids and other standard candles; Cepheids in galaxies that also hosted Type Ia supernovae calibrate the supernova peak luminosity; Type Ia distances help calibrate H₀. Each rung inherits errors from the one below: a wrong Cepheid zero point shifts the Type Ia scale and the derived H₀.</p>
<p><b>Worked (multi-step):</b> SN Ia peak m = 16.2 (M = −19.3) → d = 10^(40.5/5) pc ≈ 125.9 Mpc. Host recession 8800 km/s → H₀ = 8800 / 125.9 ≈ 69.9 km/s/Mpc.</p>
<p><b>Choosing:</b> nearby star → parallax; star in another galaxy with a measurable period → Cepheid or RR Lyrae; distant galaxy with a supernova → Type Ia; very distant galaxy → Hubble's law.</p>` },
];
