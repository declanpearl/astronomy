import type { Lesson } from '../types';

// Units 9-10: galaxies, populations, globular clusters, starbursts, interactions. Educational material, not official rule text.
// Object examples cite only facts checked in docs/VERIFICATION.md; everything else is generic teaching.
export const UNIT_9_10_LESSONS: Lesson[] = [
  { id: 'G1', unit: 9, order: 90, title: 'Unit 9: Galaxy morphology: spirals, bars, ellipticals and irregulars', tags: ['morph', 'structure'], body: `
<p><b>Objectives:</b> classify galaxies by appearance, know what each class usually contains, and avoid reading morphology as a full history.</p>
<h4>Main classes (Hubble scheme)</h4>
<table><tbody>
<tr><td><b>Elliptical (E0–E7)</b></td><td>smooth, featureless, ellipsoidal; mostly old, red stars; little cold gas or dust; little current star formation. The number reflects apparent flattening.</td></tr>
<tr><td><b>Lenticular (S0)</b></td><td>disk and bulge but no obvious spiral arms; intermediate between ellipticals and spirals.</td></tr>
<tr><td><b>Spiral (Sa–Sc)</b></td><td>flat disk with spiral arms and a bulge; gas, dust and ongoing star formation. Sa: large bulge, tightly wound arms; Sc: small bulge, loose arms.</td></tr>
<tr><td><b>Barred spiral (SBa–SBc)</b></td><td>spiral with a bar of stars through the center; arms start at the bar ends.</td></tr>
<tr><td><b>Irregular (Irr)</b></td><td>no regular shape; often low-mass and gas-rich, with active star formation.</td></tr></tbody></table>
<p>"Early-type" (ellipticals, lenticulars) and "late-type" (spirals, irregulars) are historical labels, <b>not</b> an evolutionary order.</p>
<h4>Cautions</h4>
<p>Viewing angle matters: a face-on disk shows arms; the same disk edge-on shows a thin line with a dust lane and no arms. Dust and the band of observation change the appearance. Morphology describes shape; it does not by itself prove age, formation history or mass.</p>
<p><b>Worked (size from angle):</b> a galaxy of angular diameter 4.0 arcmin at 20 Mpc: θ = 4.0 × 2.909×10⁻⁴ rad = 1.164×10⁻³ rad; D = θd = 1.164×10⁻³ × 20 000 kpc ≈ 23 kpc.</p>` },
  { id: 'G2', unit: 9, order: 91, title: 'Unit 9: Galactic structure: disk, bulge, halo, spiral arms, gas and dust', tags: ['structure', 'morph'], body: `
<p><b>Objectives:</b> describe the components of a spiral galaxy and what each contains.</p>
<table><tbody>
<tr><td><b>Disk</b></td><td>thin, rotating, contains most of the gas and dust and the young stars and star-forming regions; blue-ish light.</td></tr>
<tr><td><b>Bulge</b></td><td>central spheroidal swelling of mostly older stars; redder; more random orbital motions.</td></tr>
<tr><td><b>Halo</b></td><td>roughly spherical, faint extended region with old, metal-poor stars and globular clusters; also the region where extended unseen mass is inferred from rotation curves.</td></tr></tbody></table>
<h4>Spiral arms and gas</h4>
<p>Arms are bright because they host young, luminous, hot stars and star-forming regions; they are patterns that may be only modest density enhancements. Star formation requires cold, dense gas, so gas-poor galaxies form few stars. Dust dims and reddens starlight but glows in the infrared.</p>
<p><b>Rotation:</b> disks rotate in near-circular orbits (see Unit 8); bulges and halos are supported more by random motions.</p>
<p><b>Common errors:</b> thinking a bright arm means a much more massive arm; assuming the halo is empty because it is faint; confusing the bulge with the central black hole.</p>` },
  { id: 'G3', unit: 9, order: 92, title: 'Unit 9: Stellar populations, age and metallicity', tags: ['populations', 'structure'], body: `
<p><b>Objectives:</b> distinguish Population I and II, use metallicity, and say what populations suggest about a galaxy's history.</p>
<h4>Metallicity</h4>
<p>Astronomers call every element heavier than helium a "metal". Heavy elements are made in stars and returned to the gas by winds and supernovae, so later generations of stars form from enriched gas.</p>
<span class="f">[Fe/H] = log₁₀[(Fe/H)_star / (Fe/H)_Sun] (so [Fe/H] = −1 means 10% of the solar ratio)</span>
<h4>Populations</h4>
<table><tbody>
<tr><td><b>Population I</b></td><td>younger, metal-rich; in disks and spiral arms; includes the Sun.</td></tr>
<tr><td><b>Population II</b></td><td>older, metal-poor; in halos, globular clusters and bulges.</td></tr></tbody></table>
<p>This is a useful simplification: real galaxies have a continuous range of ages and metallicities.</p>
<h4>Reading a galaxy's history</h4>
<p>A red, smooth galaxy with old stars and little gas stopped forming stars long ago (how and why is a separate question). A blue galaxy with young stars is forming stars now. A halo of old, metal-poor stars suggests early formation, but accreted dwarf galaxies can also contribute: several histories can give similar populations.</p>
<p><b>Worked:</b> [Fe/H] = −2.0 → 10^−2 = 1% of the solar ratio. [Fe/H] = +0.3 → 10^0.3 ≈ 2.0 times solar.</p>` },
  { id: 'G4', unit: 9, order: 93, title: 'Unit 9: Globular clusters', tags: ['globular', 'populations', 'hr'], body: `
<p><b>Objectives:</b> describe globular clusters, interpret their color–magnitude diagrams, and use them as tracers of stellar evolution and galaxy history.</p>
<h4>Properties</h4>
<p>Dense, roughly spherical clusters of very many stars (typically of order 10⁵; approximate), bound by their own gravity. In our Galaxy they orbit in the halo and bulge. Their stars are old and generally metal-poor, and within one cluster most stars formed at about the same time with nearly the same composition (though some clusters show multiple populations).</p>
<h4>Color–magnitude diagram (CMD)</h4>
<p>One age and one distance give clean sequences: a main sequence ending at a <b>turnoff</b>, a red giant branch, a horizontal branch (where RR Lyrae variables lie) and often white dwarfs. The turnoff gives the age:</p>
<span class="f">t ≈ 10 Gyr × (M_turnoff / M☉)^−2.5 (approximate; use the relation a problem supplies)</span>
<p>Main-sequence fitting and RR Lyrae stars give the cluster's distance (Units 4 and 6).</p>
<p><b>Worked:</b> turnoff at 0.9 M☉ → t ≈ 10 × 0.9^−2.5 ≈ 13 Gyr. A turnoff at m = 17.9 for stars of M = +4.0 gives m − M = 13.9 → d ≈ 6.0 kpc.</p>
<h4>Formation link</h4>
<p>Massive "super star clusters" born in galaxy collisions may be young analogs of globular clusters; NASA text on the Antennae says only a small fraction of such clusters survive long term.</p>` },
  { id: 'G5', unit: 10, order: 94, title: 'Unit 10: Starburst galaxies', tags: ['starburst', 'populations'], body: `
<p><b>Objectives:</b> define a starburst, list observational evidence, state triggers and limits, and compute simple timescales.</p>
<h4>Definition</h4>
<p>A starburst galaxy forms stars at a rate far above its long-term average and at a pace that would use up its gas in a time much shorter than the age of the universe. "Starburst" is defined relative to a galaxy's gas supply and history, not by one threshold.</p>
<h4>Evidence (multi-wavelength)</h4>
<table><tbody>
<tr><td>Ultraviolet / Hα</td><td>hot young stars and ionized gas</td></tr>
<tr><td>Infrared</td><td>dust heated by young stars (but active nuclei also heat dust)</td></tr>
<tr><td>Radio / X-ray</td><td>supernovae and their remnants, hot outflowing gas</td></tr>
<tr><td>Optical images</td><td>blue clumps, super star clusters</td></tr></tbody></table>
<h4>Simple quantities</h4>
<span class="f">Gas depletion time = M_gas / SFR SFR ≈ L(Hα) / 1.26×10⁴¹ erg s⁻¹ (M☉/yr; illustrative calibration, a problem will supply its own)</span>
<p><b>Worked:</b> M_gas = 4×10⁹ M☉, SFR = 40 M☉/yr → 10⁸ yr = 100 Myr.</p>
<h4>Triggers and limits</h4>
<p>Common triggers: galaxy interactions and mergers, inflow along bars, gas compression. But not every starburst has an obvious interaction partner: ESA/Hubble describes MCG+07-33-027 as an isolated field galaxy whose starburst cause is still uncertain. NGC 1569 was long assumed isolated; a revised distance (3.36 ± 0.20 Mpc versus an assumed 2.2 Mpc) put it in the IC 342 group and made the inferred starburst even stronger, because luminosity and SFR scale with distance squared. Starbursts self-limit: supernovae and winds heat and expel gas.</p>` },
  { id: 'G6', unit: 10, order: 95, title: 'Unit 10: Galaxy interactions, mergers and tidal disruption', tags: ['interactions', 'starburst'], body: `
<p><b>Objectives:</b> explain tidal forces, interpret tails, bridges and rings, and estimate simple timescales and sizes.</p>
<h4>Tidal forces</h4>
<p>A tide is a <i>difference</i> in gravitational pull across an object. For a companion of mass M at distance d, the tidal effect on a nearby object scales as M/d³: halve the distance and it grows eightfold. Strong tides pull stars and gas into long <b>tidal tails</b> and <b>bridges</b>, and can strip or disrupt small galaxies and clusters.</p>
<h4>Collisions and mergers</h4>
<p>Stars are so far apart that individual stars rarely collide; gas clouds do collide and are compressed, which triggers star formation and can create super star clusters. Interactions may end in a merger. A fast, nearly head-on passage of a smaller galaxy through a disk can produce an expanding ring of star formation (a ring galaxy).</p>
<h4>Examples with checked source text</h4>
<p><b>Antennae (NGC 4038/4039):</b> NASA describes two spiral galaxies that began interacting a few hundred million years ago, with tidal tails formed in the initial encounter 200–300 million years ago, many super star clusters and a high star-formation rate. <b>Arp 147:</b> STScI says the blue ring of star formation was "most probably" formed when the galaxy at left passed through the one at right (an interpretation, not a measurement). <b>Arp 143:</b> a bridge of gas and young blue stars links NGC 2445 and NGC 2444.</p>
<h4>Simple estimates</h4>
<span class="f">size = θ (rad) × d t ≈ d / v (a crude age scale for a feature moving at speed v)</span>
<p><b>Worked:</b> a tail 3.0 arcmin long at 20 Mpc: θ = 8.727×10⁻⁴ rad → 17.5 kpc. At 250 km/s: t = 17.5 kpc / 250 km/s ≈ 6.8×10⁷ yr ≈ 68 Myr (order of magnitude only).</p>` },
  { id: 'G7', unit: 10, order: 96, title: 'Unit 10: Inferring structure and history from observations (without overclaiming)', tags: ['morph', 'interactions', 'starburst', 'structure'], body: `
<p><b>Objectives:</b> separate what is seen from what is inferred, list alternative explanations, and choose follow-up observations.</p>
<h4>An evidence ladder</h4>
<p>1. <b>Observation</b>: what the image or spectrum literally shows (shape, colors, brightness). 2. <b>Measurement</b>: distance, size, redshift, line strengths. 3. <b>Interpretation</b>: what physical process could cause it (tides, collision, bar inflow). 4. <b>History</b>: when and how it happened. Each step is less certain than the one before.</p>
<h4>Single image cautions</h4>
<p>Two galaxies that look close may only lie along the same line of sight (projection). Tidal tails and bridges strongly suggest a past gravitational interaction, but timing and mass ratio need models. A ring suggests a collision with a ring-forming passage but other mechanisms exist. Blue color indicates young stars, but dust and age-metallicity effects blur this.</p>
<h4>Follow-up tests</h4>
<p>Redshifts or velocities (do both galaxies share a similar velocity?), spectra (star-formation indicators, ages), multi-wavelength imaging (infrared dust, X-ray gas, radio), and velocity maps (disturbed kinematics).</p>
<h4>Distinguishing "interaction" from "starburst"</h4>
<p>Interaction evidence: tails, bridges, distorted shapes, close companions. Starburst evidence: a high star-formation rate relative to gas and history. The two often occur together, but neither proves the other (MCG+07-33-027 is a starburst without an obvious partner; an interacting pair need not be bursting).</p>
<p><b>Rule:</b> write claims at the level the evidence supports ("consistent with", "most probably", "suggests").</p>` },
];
