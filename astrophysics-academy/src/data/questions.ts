import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  { id: 'q1', tags: ['wien', 'blackbody'], lesson: 'L1', level: 1, text: 'A star has T = 5800 K. Peak wavelength in nm? (b = 2.898×10⁻³ m·K)', answer: 500, tolerance: 0.02, explanation: 'λ = b/T = 5.0×10⁻⁷ m = 500 nm.' },
  { id: 'q2', tags: ['sb', 'luminosity'], lesson: 'L1', level: 1, text: 'Two stars have equal temperature; star B has twice the radius of A. L_B/L_A = ?', answer: 4, tolerance: 0.01, explanation: 'L ∝ R², so 2² = 4.' },
  { id: 'q3', tags: ['sb', 'luminosity'], lesson: 'L1', level: 2, text: 'Equal radii; star B\u2019s temperature is twice A\u2019s. L_B/L_A = ?', answer: 16, tolerance: 0.01, explanation: 'L ∝ T⁴ → 2⁴ = 16.' },
  { id: 'q4', tags: ['dm'], lesson: 'L2', level: 2, text: 'm = 15 and M = 0. Distance in parsecs?', answer: 10000, tolerance: 0.02, explanation: '5log d − 5 = 15 → log d = 4 → d = 10⁴ pc.' },
  { id: 'q5', tags: ['parallax'], lesson: 'L2', level: 1, text: 'A star has parallax 0.05 arcsec. Distance in parsecs?', answer: 20, tolerance: 0.02, explanation: 'd = 1/p = 20 pc.' },
  { id: 'q6', tags: ['hubble'], lesson: 'L5', level: 1, text: 'v = 1400 km/s, H₀ = 70 km/s/Mpc. Distance in Mpc?', answer: 20, tolerance: 0.02, explanation: 'd = v/H₀ = 20 Mpc.' },
  { id: 'q7', tags: ['orbital'], lesson: 'L3', level: 2, text: 'A planet orbits a 1 M☉ star at a = 4 AU. Period in years?', answer: 8, tolerance: 0.02, explanation: 'P² = a³ = 64 → P = 8 yr.' },
  { id: 'q8', tags: ['orbital'], lesson: 'L3', level: 2, text: 'Binary: a = 2 AU, P = 2 yr. Total mass in M☉?', answer: 2, tolerance: 0.02, explanation: 'M = a³/P² = 8/4 = 2.' },
  { id: 'q9', tags: ['luminosity'], lesson: 'L2', level: 1, text: 'If a star\u2019s distance doubles, its observed flux becomes what fraction?', answer: 0.25, tolerance: 0.02, explanation: 'Flux ∝ 1/d² → 1/4.' },
  { id: 'q10', tags: ['hr', 'classification'], lesson: 'L4', level: 1, text: 'On a standard H-R diagram, where do hot stars appear?', options: ['Left', 'Right', 'Bottom only', 'Depends on nothing; axes never matter'], answer: 0, explanation: 'Temperature increases to the left on the conventional diagram (check labels).' },
  { id: 'q11', tags: ['hr'], lesson: 'L4', level: 2, text: 'Which main-sequence star has the longest lifetime?', options: ['A high-mass O star', 'A solar-mass star', 'A low-mass red dwarf', 'All the same'], answer: 2, explanation: 'Lower mass burns fuel far more slowly, so lifetime is longer.' },
  { id: 'q12', tags: ['interactions', 'obj:ant'], lesson: '', level: 1, text: 'The Antennae Galaxies are best described as:', options: ['A single isolated elliptical', 'Two colliding galaxies with tidal tails', 'A globular cluster', 'A supernova remnant'], answer: 1, explanation: 'Two merging galaxies (NGC 4038/4039) with long tidal tails and intense star formation.' },
];
