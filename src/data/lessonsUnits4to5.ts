import type { Lesson } from '../types';

// Units 4-5. Educational material, not official rule text.
// NEEDS REVIEW: mass thresholds (~8 solar masses, ~1.4 for white dwarfs) and the M^3.5 relation are approximate textbook values.
export const UNIT_4_5_LESSONS: Lesson[] = [
  { id: 'U4A', unit: 4, order: 40, title: 'Unit 4: H-R diagrams of star clusters, turnoff and main-sequence fitting', tags: ['hr', 'classification', 'evolution', 'dm'], body: `
<p><b>Objectives:</b> read a cluster H-R (color–magnitude) diagram, estimate relative age from the turnoff, and find distance by main-sequence fitting.</p>
<h4>Why clusters are special</h4>
<p>Stars in a cluster formed together and sit at nearly the same distance. So differences in <i>apparent</i> magnitude between cluster stars equal differences in <i>absolute</i> magnitude, and the whole diagram shows stars of one age but many masses.</p>
<h4>The main-sequence turnoff</h4>
<p>Massive stars leave the main sequence first. The brightest main-sequence star still present marks the <b>turnoff</b>. A turnoff high and blue means a young cluster; a turnoff low and red means an old one. Open clusters tend to be young and lie in the disk; globular clusters are old and populate the halo and bulge.</p>
<h4>Main-sequence fitting</h4>
<p>Slide the cluster's main sequence vertically until it matches a calibrated main sequence in absolute magnitude. The shift is the distance modulus: <span class="f">m − M = 5 log₁₀(d) − 5</span></p>
<p><b>Worked:</b> Sun-like main-sequence stars (M = +4.8) appear at m = 14.8, so m − M = 10 and d = 10^((10+5)/5) = 10³ pc = 1000 pc (extinction ignored).</p>
<h4>Absolute magnitude to luminosity</h4>
<span class="f">L/L☉ = 10^(0.4 (M☉ − M)), M☉ ≈ 4.83</span>
<p><b>Misconceptions:</b> "a cluster's brightest star is its most massive": giants that evolved from earlier massive stars can outshine the turnoff. Dust dims and reddens stars, biasing fitted distances.</p>` },
  { id: 'U4B', unit: 4, order: 41, title: 'Unit 4: Main-sequence physics, mass–luminosity and lifetimes', tags: ['hr', 'evolution', 'luminosity'], body: `
<p><b>Objectives:</b> explain hydrostatic equilibrium, why massive stars are short-lived, and estimate lifetimes.</p>
<h4>Hydrostatic equilibrium</h4>
<p>At every layer, outward pressure from hot gas (and radiation) balances inward gravity. Hydrogen fusion in the core supplies the energy that keeps the pressure up. If fusion slows, the core contracts and heats until balance returns.</p>
<h4>Mass controls everything</h4>
<p>Higher mass → higher core temperature → much faster fusion. Empirically, for intermediate masses <span class="f">L/L☉ ≈ (M/M☉)^3.5 (approximate; use the exponent a problem gives)</span> The fuel supply grows roughly as M but the burn rate as M^3.5, so:</p>
<span class="f">t ≈ 10 Gyr × (M/M☉) / (L/L☉) ≈ 10 Gyr × (M/M☉)^−2.5</span>
<p><b>Worked:</b> M = 10 M☉: L ≈ 10^3.5 ≈ 3160 L☉, t ≈ 10 × 10 / 3160 ≈ 0.032 Gyr = 32 Myr. The Sun's ~10 Gyr is the reference value.</p>
<h4>Protostars and the start of the main sequence</h4>
<p>A collapsing cloud fragment heats as it contracts. The star joins the main sequence when its core is hot enough for steady hydrogen fusion.</p>
<h4>Leaving the main sequence</h4>
<p>When core hydrogen is exhausted, a star becomes a red giant: it moves up and to the right (more luminous, cooler, larger). The details differ by mass (next lesson).</p>
<p><b>Misconceptions:</b> "more fuel means a longer life" (burn rate wins); "stars move along the main sequence as they age" (they stay near their spot until they leave).</p>` },
  { id: 'U5A', unit: 5, order: 50, title: 'Unit 5: Star formation and the fate of low- and intermediate-mass stars', tags: ['evolution', 'hr'], body: `
<p><b>Objectives:</b> describe the path from molecular cloud to white dwarf and explain what supports a white dwarf.</p>
<h4>Sequence for stars up to roughly 8 solar masses (approximate threshold)</h4>
<p>1. <b>Molecular cloud</b> fragment collapses → 2. <b>protostar</b> → 3. <b>main sequence</b> (core hydrogen fusion) → 4. <b>red giant</b>: hydrogen fuses in a shell around an inert helium core, outer layers expand and cool → 5. helium fusion in the core (after a helium flash in lower-mass stars) → 6. late giant phases → 7. outer layers ejected as a <b>planetary nebula</b> → 8. the hot core remains as a <b>white dwarf</b>.</p>
<h4>White dwarfs</h4>
<p>No fusion. Supported against gravity by <b>electron degeneracy pressure</b>. Typical mass ~0.6 M☉ in a volume near Earth's size, giving densities of order 10⁸–10⁹ kg/m³. There is a maximum mass, the <b>Chandrasekhar limit ≈ 1.4 M☉</b>. As a white dwarf cools it moves down and to the right on the H-R diagram while its radius stays nearly constant.</p>
<p><b>Worked:</b> M = 0.6 M☉ = 1.19×10³⁰ kg, R = 7000 km: ρ = M / (4/3 π R³) ≈ 8.3×10⁸ kg/m³.</p>
<p><b>Misconceptions:</b> the Sun will not explode as a supernova and will not become a black hole; "planetary nebulae have to do with planets" (name is historical).</p>` },
  { id: 'U5B', unit: 5, order: 51, title: 'Unit 5: Massive stars, core collapse and compact remnants', tags: ['evolution', 'ns'], body: `
<p><b>Objectives:</b> follow a massive star to core collapse, compare remnants, and compute density and Schwarzschild radius.</p>
<h4>Massive-star evolution</h4>
<p>Above roughly 8 M☉ (approximate), stars fuse successively heavier elements (hydrogen → helium → carbon → … → silicon) in shells, ending with an <b>iron core</b>. Fusing iron does not release net energy, so the core can no longer hold itself up: it collapses in under a second, rebounds, and the star explodes as a <b>core-collapse supernova</b>. Most of the collapse energy is carried off by neutrinos; neutrinos from SN 1987A were detected.</p>
<h4>Remnants: not one fixed outcome</h4>
<p>The core can leave a <b>neutron star</b> (about 1.4 M☉ within a radius of order 10 km, supported by neutron degeneracy pressure) or a <b>black hole</b> for more massive cores. Which one depends on initial mass and also on mass loss (affected by metallicity), rotation and binary interaction. Exact boundaries are uncertain.</p>
<h4>Two useful formulas</h4>
<span class="f">ρ = M / (4/3 π R³) R_s = 2GM / c² ≈ 2.95 km × (M/M☉)</span>
<p><b>Worked:</b> neutron star, M = 1.4 M☉ = 2.78×10³⁰ kg, R = 10 km: ρ ≈ 6.6×10¹⁷ kg/m³ (more than nuclear density order of 10¹⁷).</p>
<p><b>Misconceptions:</b> "all massive stars become black holes"; "a supernova always leaves a neutron star". Type Ia supernovae are a different mechanism (white dwarf in a binary), covered later.</p>` },
];
