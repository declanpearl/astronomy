// Planning data used by tests and docs/COVERAGE.md. Edit when batches are delivered.
export const CURRENT_BATCH = 8;
/** A checklist item counts as "covered" with >= 1 lesson and >= this many questions. */
export const MIN_QUESTIONS = 3;
/** "Solid" depth needs at least this many questions spanning at least 3 difficulty levels; otherwise the item is reported as "thin". */
export const THIN_QUESTIONS = 6;

/** key -> batch by which the item is planned to be fully covered. Objects use 'obj:<id>'. */
export const PLAN: Record<string, number> = {
  classification: 2, spectral: 2, luminosity: 2, blackbody: 2, spectroscopy: 2, hr: 3, evolution: 3,
  cepheid: 4, rrlyrae: 4, lightcurves: 4, propermotion: 4, ia: 4, ns: 7, ulx: 7, gw: 7, morph: 6, structure: 6, populations: 6, globular: 6, starburst: 6, interactions: 6,
  orbital: 5, circular: 5, kepler: 5, binaries: 5, rotcurve: 5, parallax: 2, specpar: 4, dm: 2, pl: 4, tf: 4, hubble: 4, sb: 2, wien: 2, multiwl: 7, multimsg: 7,
  'obj:m31': 8, 'obj:m104': 8, 'obj:m51': 8, 'obj:n4536': 8, 'obj:mcg': 8, 'obj:n1569': 8, 'obj:ant': 8, 'obj:a143': 8,
  'obj:a147': 8, 'obj:cart': 8, 'obj:m82': 8, 'obj:x1': 8, 'obj:x2': 8, 'obj:sn14j': 8, 'obj:gw': 8, 'obj:t5': 8,
};

export const BATCHES: { id: number; title: string; target: number }[] = [
  { id: 1, title: 'App foundation, rules, checklist, progress model', target: 12 },
  { id: 2, title: 'Units 1-3: properties, magnitudes, spectra, blackbody', target: 45 },
  { id: 3, title: 'Units 4-5: H-R diagrams, clusters, stellar evolution, remnants', target: 79 },
  { id: 4, title: 'Units 6-7: variable stars and the distance ladder (incl. Type Ia, Tully-Fisher, Hubble)', target: 130 },
  { id: 5, title: 'Unit 8: orbital mechanics, Kepler, binaries, rotation curves', target: 166 },
  { id: 6, title: 'Units 9-10: galaxy morphology, populations, globular clusters, starbursts, mergers, tidal disruption', target: 209 },
  { id: 7, title: 'Units 11-12: neutron stars, ULXs, Type Ia physics, gravitational waves, multi-wavelength and multi-messenger', target: 252 },
  { id: 8, title: 'Required Objects deep pages (verified sources) and object-identification questions', target: 305 },
  { id: 9, title: 'Figures and data interpretation: SVG H-R diagrams, spectra, light curves, tables', target: 345 },
  { id: 10, title: 'Unit 13 integrated problems, timed Mock Competition, Daily Challenge, spaced-review timing', target: 390 },
];
