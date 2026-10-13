import type { RequiredObject } from '../types';

// Facts are brief and approximate. "TODO"/"Verify" = needs checking against NASA/observatory/peer-reviewed sources.
export const OBJECTS: RequiredObject[] = [
  { id: 'm31', name: 'Andromeda Galaxy (M31)', summary: 'Large spiral galaxy; nearest large galaxy to the Milky Way, roughly 2.5 million light-years away (approx.).', why: 'Cepheid-based distance work; stellar populations; galactic structure.' },
  { id: 'm104', name: 'Sombrero Galaxy (M104)', summary: 'Galaxy with a bright bulge and a prominent dust lane seen nearly edge-on.', why: 'Morphology; bulge/disk/halo structure; globular clusters. Verify exact classification and distance.' },
  { id: 'm51', name: 'M51 (Whirlpool Galaxy)', summary: 'Face-on spiral interacting with a smaller companion (NGC 5195).', why: 'Spiral structure and interaction evidence. Verify distance.' },
  { id: 'n4536', name: 'NGC 4536', summary: 'Spiral galaxy in the Virgo region; hosted SN 1981B, a Type Ia supernova.', why: 'Link between Cepheid distances and Type Ia calibration. Verify details.' },
  { id: 'mcg', name: 'MCG+07-33-027', summary: 'Listed object; flagged for further research.', why: 'TODO: verify type, distance and starburst evidence from reliable sources before studying facts.' },
  { id: 'n1569', name: 'NGC 1569', summary: 'Dwarf irregular galaxy with strong starburst activity and super star clusters.', why: 'Starburst in a low-mass galaxy; feedback. Verify distance.' },
  { id: 'ant', name: 'Antennae Galaxies (NGC 4038/4039)', summary: 'Pair of colliding galaxies with long tidal tails and intense star formation.', why: 'Merger and interaction-triggered star formation; young clusters.' },
  { id: 'a143', name: 'Arp 143', summary: 'Interacting galaxy system from the Arp catalog.', why: 'TODO: verify components, morphology and star-formation evidence.' },
  { id: 'a147', name: 'Arp 147', summary: 'Interacting pair that includes a ring-shaped galaxy.', why: 'Collision-produced ring; star formation along the ring. Verify details.' },
  { id: 'cart', name: 'Cartwheel Galaxy', summary: 'Ring galaxy formed by a collision with a smaller galaxy.', why: 'Collisional ring; expanding wave of star formation. Verify distance.' },
  { id: 'm82', name: 'M82 (Cigar Galaxy)', summary: 'Nearby starburst galaxy with a strong outflow (superwind), roughly 12 million light-years away (approx.).', why: 'Parent of X-1, X-2 and SN 2014J; multi-wavelength starburst evidence.' },
  { id: 'x1', name: 'M82 X-1', summary: 'Ultra-luminous X-ray source in M82, discussed as an intermediate-mass black hole candidate (interpretation, not settled).', why: 'ULX physics; accretion. Verify mass estimates.' },
  { id: 'x2', name: 'M82 X-2', summary: 'ULX in M82 in which X-ray pulsations showed the compact object is a neutron star (reported ~2014).', why: 'Shows ULXs can be neutron stars; super-Eddington accretion.' },
  { id: 'sn14j', name: 'SN 2014J', summary: 'Type Ia supernova in M82, discovered in January 2014.', why: 'Standardizable candle; extinction by host dust. Verify peak values.' },
  { id: 'gw', name: 'GW170817', summary: 'Binary neutron star merger detected by gravitational waves in August 2017, with gamma-ray, optical (kilonova) and other follow-up; host NGC 4993.', why: 'Multi-wavelength/multi-messenger astronomy; neutron stars; heavy-element production.' },
  { id: 't5', name: 'Terzan 5', summary: 'Dense stellar system toward the Galactic bulge with multiple stellar populations and many millisecond pulsars.', why: 'Globular-cluster-like system; stellar populations. Verify classification.' },
];
