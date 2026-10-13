import type { Lesson } from '../types';

// Units 11-12: compact objects, ULXs, SN Ia physics, gravitational waves, multi-wavelength and multi-messenger astronomy.
// Educational material, not official rule text. Object facts come only from sources listed in docs/VERIFICATION.md.
// Constants used by problems: G = 6.674e-11 N m^2/kg^2, c = 2.998e8 m/s, sigma = 5.670e-8 W m^-2 K^-4, M_sun = 1.989e30 kg,
// 1 Mpc = 3.086e22 m, 1 yr = 3.156e7 s, L_Edd = 1.26e38 erg/s x (M/M_sun) (taught here; problems restate it).
export const UNIT_11_12_LESSONS: Lesson[] = [
  { id: 'N1', unit: 11, order: 110, title: 'Unit 11: Neutron stars and pulsars', tags: ['ns'], body: `
<p><b>Objectives:</b> describe how neutron stars form and what they are like, and explain pulsars, spin and spin-down.</p>
<h4>Formation and structure</h4>
<p>When the iron core of a massive star collapses (Unit 5), protons and electrons are squeezed into neutrons. The remnant, a <b>neutron star</b>, has about 1.4 M☉ packed into a radius of roughly 10–12 km, so its mean density is of order 10¹⁷ kg/m³, comparable to an atomic nucleus. It is held up by neutron degeneracy pressure. The escape speed from its surface is a large fraction of the speed of light.</p>
<span class="f">ρ = M / (4/3 π R³) v_esc = √(2GM / R)</span>
<h4>Spin and magnetic field</h4>
<p>As the core shrinks, <b>angular momentum is conserved</b> (L ∝ MR²ω), so the rotation rate rises as 1/R²: a core that shrinks by a factor of 500 spins about 250 000 times faster. Magnetic flux is also compressed, giving very strong fields (typical radio pulsars are of order 10¹² gauss; the range is wide).</p>
<h4>Pulsars</h4>
<p>A <b>pulsar</b> is a rotating, magnetized neutron star whose beams of radiation (from near the magnetic poles) sweep across space like a lighthouse. We see a pulse once per rotation only if a beam crosses our line of sight, so many neutron stars are not seen as pulsars. Periods range from about a millisecond to several seconds; pulse timing is extremely regular.</p>
<h4>Spin-down and age</h4>
<p>Pulsars slowly lose rotational energy and their period P increases at a rate Ṗ. If braking is by a steady magnetic dipole and the initial spin was much faster than now, a <b>characteristic age</b> follows:</p>
<span class="f">τ = P / (2Ṗ)</span>
<p><b>Worked:</b> P = 0.033 s, Ṗ = 4.2×10⁻¹³ s/s: τ = 0.033 / (8.4×10⁻¹³) ≈ 3.9×10¹⁰ s ≈ 1.2×10³ yr. <b>Caution:</b> τ is a model-based estimate and can differ from the true age. <b>Millisecond pulsars</b> are old neutron stars spun up by accreting matter from a companion (recycling).</p>
<p><b>Misconceptions:</b> a neutron star is not a "ball of ice-cold neutrons"; pulsars do not blink on and off; the lighthouse beam is not a star pulsating in size.</p>` },
  { id: 'N2', unit: 11, order: 111, title: 'Unit 11: Neutron-star observations: what is measured and what is inferred', tags: ['ns', 'multiwl'], body: `
<p><b>Objectives:</b> separate direct measurements from model-dependent conclusions for neutron stars.</p>
<table><tbody>
<tr><td><b>Directly measured</b></td><td>pulse arrival times and period P, period change Ṗ, pulse shape, flux in each band, sky position, orbital period (from timing or Doppler shifts of a binary)</td></tr>
<tr><td><b>Inferred (needs a model)</b></td><td>magnetic field strength, characteristic age, radius from thermal X-ray spectra, mass (from binary orbits via Kepler's laws plus assumptions), the composition of the interior</td></tr></tbody></table>
<h4>Example: a radius from thermal emission</h4>
<p>If a neutron star's surface radiates like a blackbody, the Stefan–Boltzmann law gives R = √(L / (4πσT⁴)). This assumes the whole surface emits at one temperature, no atmosphere distorts the spectrum, and the distance (to convert flux to L) is right. Violating any assumption biases R.</p>
<p><b>Worked:</b> L = 1.03×10²⁶ W, T = 1.0×10⁶ K: R = √(1.03×10²⁶ / (4π × 5.67×10⁻⁸ × 10²⁴)) ≈ 1.2×10⁴ m = 12 km.</p>
<h4>Wavelengths</h4>
<p>Radio pulses reveal many pulsars; X-rays reveal hot surfaces and accretion; gamma rays reveal the most energetic emission. The same star can look different in each band.</p>
<p><b>Rule:</b> state a conclusion at the level of its evidence: "pulses with a 1.4 ms period" is measured; "magnetic field of 10⁸ G" is inferred.</p>` },
  { id: 'X1', unit: 11, order: 112, title: 'Unit 11: Ultraluminous X-ray sources (ULXs)', tags: ['ulx', 'ns'], body: `
<p><b>Objectives:</b> define ULXs, use the Eddington limit, and compare explanations (intermediate-mass black hole, super-Eddington accretion, neutron star).</p>
<h4>Definition</h4>
<p>A ULX is a point-like X-ray source outside a galaxy's nucleus whose X-ray luminosity exceeds about 10³⁹ erg/s (the threshold is conventional). They are powered by accretion onto a compact object, usually from a companion star.</p>
<h4>The Eddington limit</h4>
<p>When radiation pressure on infalling gas balances gravity, steady spherical accretion cannot get brighter:</p>
<span class="f">L_Edd ≈ 1.26×10³⁸ erg/s × (M / M☉)</span>
<p>A 10 M☉ black hole has L_Edd ≈ 1.3×10³⁹ erg/s. A source far above this needs either a more massive accretor, accretion beyond the simple Eddington limit (for example through a thick disk or with beaming), or both.</p>
<p><b>Worked:</b> L = 1×10⁴¹ erg/s at the Eddington limit needs M ≈ 10⁴¹ / 1.26×10³⁸ ≈ 790 M☉.</p>
<h4>Explanations and evidence</h4>
<p><b>Intermediate-mass black hole.</b> M82 X-1: Pasham et al. (2014) found twin X-ray oscillations at 3.32 and 5.07 Hz (a 3:2 ratio). Assuming the inverse scaling of such oscillations with mass seen in stellar-mass black holes, they estimated 428 ± 105 M☉ (and 415 ± 63 M☉ with another model). The estimate depends on extending a stellar-mass relation. <b>Neutron star.</b> M82 X-2: NuSTAR found coherent X-ray pulsations with mean period 1.37 s modulated with a 2.53-day period (orbital motion), identifying an accreting magnetized neutron star that is more than 100 times brighter than a 1.4 M☉ neutron star's Eddington limit (one review). <b>Timing</b> (pulses, oscillations) can identify the compact object; luminosity alone cannot.</p>
<h4>Why ULXs matter</h4>
<p>They test accretion physics at extreme rates and may reveal black holes between stellar and supermassive masses.</p>` },
  { id: 'S1', unit: 11, order: 113, title: 'Unit 11: Type Ia supernova physics (and how it differs from their use as distance indicators)', tags: ['ia'], body: `
<p><b>Objectives:</b> explain the physical mechanism and progenitors, and separate it from the empirical standardization used for distances (see Unit 7).</p>
<h4>Mechanism</h4>
<p>A Type Ia supernova is the thermonuclear explosion of a carbon–oxygen white dwarf. Its spectrum shows no hydrogen. Unlike a core-collapse supernova (Unit 5), it needs no massive-star iron core and is thought to leave no compact remnant. The expanding ejecta are heated by the radioactive decay of freshly made nickel-56 (to cobalt-56, then iron-56), which powers the light curve.</p>
<h4>Progenitor scenarios (still debated)</h4>
<p><b>Single-degenerate:</b> a white dwarf accretes matter from a non-degenerate companion star until it nears the explosion threshold (close to the Chandrasekhar mass, about 1.4 M☉). <b>Double-degenerate:</b> two white dwarfs merge. The true system or systems are not settled, and both have been discussed for individual events such as SN 2014J.</p>
<h4>From physics to a distance indicator</h4>
<p>Peak luminosities are similar but not identical; they correlate with how fast the supernova declines (Phillips relation) and with color. That correlation is <b>empirical</b>: it works even though the progenitors are uncertain. The distance then follows from the distance modulus with extinction.</p>
<h4>Case: SN 2014J</h4>
<p>Discovered 2014 January 21.8 in M82, about 3.3 Mpc away, it peaked at V ≈ 10.6, fainter than expected for that distance. Assuming a typical Type Ia luminosity, one analysis inferred A_V ≈ 2.0 ± 0.1 mag of extinction from dust reddening plus scattering by circumstellar material.</p>
<p><b>Worked:</b> M_V = m − 5 log₁₀(d) + 5 − A_V = 10.6 − 32.59 + 5 − 2.0 ≈ −19.0. Ignoring the extinction gives ≈ −17.0, about 6.3 times too faint in luminosity.</p>` },
  { id: 'W1', unit: 12, order: 114, title: 'Unit 12: Gravitational waves', tags: ['gw'], body: `
<p><b>Objectives:</b> explain the origin of gravitational waves, what detectors measure, and what a detection can and cannot establish.</p>
<h4>Origin</h4>
<p>Accelerating masses, especially compact binaries, radiate gravitational waves: ripples in spacetime that stretch and squeeze distances. As a binary loses energy its orbit shrinks, so the wave frequency and amplitude rise in a <b>chirp</b> until the objects merge. The wave frequency is <b>twice</b> the orbital frequency.</p>
<h4>Detection</h4>
<p>Laser interferometers such as LIGO (arms 4 km long) measure the <b>strain</b> h = ΔL/L, the fractional change in arm length. A typical detectable strain is h ~ 10⁻²¹, so ΔL ≈ 10⁻²¹ × 4000 m ≈ 4×10⁻¹⁸ m, far smaller than a proton. LIGO is sensitive to waves from tens of Hz to a few kHz, suiting stellar-mass mergers.</p>
<span class="f">h = ΔL / L f_GW = 2 f_orbit</span>
<h4>What a signal can establish</h4>
<p>The waveform constrains the component masses and the distance (the "luminosity distance", with uncertainty), and a network of detectors gives a sky region. It does not directly show the host galaxy, the chemical products or electromagnetic emission: that needs telescopes.</p>
<p><b>Case, GW170817:</b> detected 2017 Aug 17 (merger time 12:41:04 UTC) by LIGO and Virgo, initially localized to 31 deg² at 40 ± 8 Mpc, with component masses in the range 0.86–2.26 M☉, consistent with neutron stars. A gamma-ray burst followed about 1.7 s after the merger time.</p>
<p><b>Standard siren:</b> because the waveform gives a distance without the distance ladder, a gravitational-wave event with a known host redshift can measure H₀ independently.</p>` },
  { id: 'M1', unit: 12, order: 115, title: 'Unit 12: Multi-wavelength astronomy', tags: ['multiwl'], body: `
<p><b>Objectives:</b> state what each band reveals and what limits it, and avoid one-band-one-object claims.</p>
<table><tbody>
<tr><td><b>Radio</b></td><td>cold gas (H I 21-cm), synchrotron emission from fast electrons in magnetic fields, pulsars, supernova remnants; passes through dust; lower angular resolution unless interferometers are used</td></tr>
<tr><td><b>Infrared</b></td><td>dust warmed by stars, cool stars, regions hidden at optical wavelengths; penetrates dust better than visible light; much is absorbed by the atmosphere</td></tr>
<tr><td><b>Optical</b></td><td>stars, ionized gas lines (Hα), supernova light curves; dimmed and reddened by dust</td></tr>
<tr><td><b>Ultraviolet</b></td><td>hot young stars; strongly absorbed by dust and the atmosphere</td></tr>
<tr><td><b>X-ray</b></td><td>hot gas, accretion onto compact objects, supernova remnants; blocked by the atmosphere so observed from space</td></tr>
<tr><td><b>Gamma ray</b></td><td>most energetic processes: bursts, pulsars; also from space</td></tr></tbody></table>
<h4>Cautions</h4>
<p>No band reveals only one kind of object: X-ray emission can come from hot gas, a neutron star or a black hole; infrared dust emission can be heated by young stars or an active nucleus. Extinction changes with wavelength: for SN 2014J, dust dimmed the optical light by about 2 magnitudes. Combine bands before concluding.</p>
<p><b>Example:</b> a starburst galaxy can show young stars (optical, UV), warm dust (infrared), supernova remnants (radio) and X-ray binaries or ULXs (X-ray) at once. M82, described as a starburst galaxy, hosts the ULXs X-1 and X-2 and SN 2014J, which is why it is studied in several bands.</p>` },
  { id: 'M2', unit: 12, order: 116, title: 'Unit 12: Multi-messenger astronomy', tags: ['multimsg', 'gw'], body: `
<p><b>Objectives:</b> name the four messengers, say what each can carry, and show how independent messengers complement each other.</p>
<table><tbody>
<tr><td><b>Electromagnetic radiation</b></td><td>composition, temperature, location, host galaxy</td></tr>
<tr><td><b>Gravitational waves</b></td><td>masses and motion of compact objects; pass freely through matter</td></tr>
<tr><td><b>Neutrinos</b></td><td>escape dense cores; neutrinos from SN 1987A were detected; very hard to detect</td></tr>
<tr><td><b>Cosmic rays</b></td><td>charged particles bent by magnetic fields, so their arrival direction does not point back to the source</td></tr></tbody></table>
<h4>GW170817 as the model case</h4>
<p>Timeline from the discovery papers: merger and gravitational waves at 12:41:04 UTC; a short gamma-ray burst (GRB 170817A) about 1.7 s later; an optical transient (AT 2017gfo) in NGC 4993 found less than 11 hours later; X-ray emission about 9 days and radio emission about 16 days after the merger. The observations support a neutron-star merger followed by a short gamma-ray burst and a <b>kilonova</b> powered by the radioactive decay of r-process nuclei synthesized in the ejecta.</p>
<h4>Why independence matters</h4>
<p>Gravitational waves gave masses and distance; the optical counterpart gave the host galaxy and the chemistry; the gamma-ray burst linked the event to short bursts. A conclusion supported by independent messengers is stronger than one resting on a single data type.</p>` },
  { id: 'E1', unit: 12, order: 117, title: 'Unit 12: Evidence synthesis: choosing observations and weighing explanations', tags: ['multiwl', 'multimsg', 'ulx', 'gw', 'ns'], body: `
<p><b>Objectives:</b> match a question to the observation that can answer it, and weigh competing explanations.</p>
<h4>Question → observation</h4>
<table><tbody>
<tr><td>Is an X-ray source a neutron star?</td><td>high-time-resolution X-ray timing (pulsations)</td></tr>
<tr><td>How massive is the compact object?</td><td>binary orbit (Doppler + Kepler), oscillation scaling (model-dependent), or gravitational-wave waveform</td></tr>
<tr><td>How far away is it?</td><td>distance ladder methods, or the waveform of a gravitational wave</td></tr>
<tr><td>Is dust dimming it?</td><td>colors and infrared photometry; compare bands</td></tr>
<tr><td>Did a merger make heavy elements?</td><td>optical and infrared light-curve and spectral evolution (kilonova)</td></tr></tbody></table>
<h4>Weighing explanations</h4>
<p>For each explanation write its predictions, then find the observation that separates them. M82's two ULXs show why: luminosity alone could not distinguish a black hole from a neutron star, but pulsations identified X-2 as a neutron star while oscillation timing supports a black hole for X-1.</p>
<p><b>Rule:</b> separate observation, measurement, model-dependent inference and history, and attach uncertainty to each.</p>` },
];
