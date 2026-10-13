import type { Formula } from '../types';

export const FORMULAS: Formula[] = [
  { name: 'Wien\u2019s law', eq: 'λmax T = b, b = 2.898×10⁻³ m·K', note: 'T in K' },
  { name: 'Stefan–Boltzmann', eq: 'L = 4πR²σT⁴', note: 'σ = 5.670×10⁻⁸ W m⁻² K⁻⁴' },
  { name: 'Inverse square', eq: 'F = L/(4πd²)', note: 'Flux falls as 1/d²' },
  { name: 'Distance modulus', eq: 'm − M = 5 log d − 5', note: 'd in pc' },
  { name: 'Parallax', eq: 'd(pc) = 1/p(arcsec)', note: '' },
  { name: 'Hubble\u2019s law', eq: 'v = H₀ d', note: 'H₀ in km/s/Mpc' },
  { name: 'Kepler III (Newton)', eq: 'P² = a³/(M₁+M₂)', note: 'yr, AU, M☉' },
  { name: 'Circular orbit', eq: 'v = √(GM/r)', note: 'SI units' },
];
