import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS } from '../src/data/questions.ts';
import { LESSONS } from '../src/data/lessons.ts';
import { OBJECTS } from '../src/data/objects.ts';
import { CHECKLIST } from '../src/data/checklist.ts';

const dupes = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i);

test('IDs are unique (stable IDs matter for progress and sync)', () => {
  assert.deepEqual(dupes(QUESTIONS.map((q) => q.id)), []);
  assert.deepEqual(dupes(LESSONS.map((l) => l.id)), []);
  assert.deepEqual(dupes(OBJECTS.map((o) => o.id)), []);
  assert.deepEqual(dupes(CHECKLIST.map((c) => c[0])), []);
});

test('every question is well formed and references real lessons and checklist tags', () => {
  const lessonIds = new Set(LESSONS.map((l) => l.id));
  const tags = new Set([...CHECKLIST.map((c) => c[0]), ...OBJECTS.map((o) => 'obj:' + o.id)]);
  for (const q of QUESTIONS) {
    assert.ok(q.text.length > 5 && q.explanation.length > 5, q.id);
    assert.ok(q.tags.length > 0, `${q.id} has no tags`);
    for (const t of q.tags) assert.ok(tags.has(t), `${q.id} uses unknown tag ${t}`);
    if (q.lesson) assert.ok(lessonIds.has(q.lesson), `${q.id} references missing lesson ${q.lesson}`);
    if (q.options) {
      assert.ok(q.options.length >= 2, q.id);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${q.id} answer index out of range`);
    } else {
      assert.ok(Number.isFinite(q.answer), q.id);
      assert.ok((q.tolerance ?? 0.02) > 0 && (q.tolerance ?? 0.02) <= 0.1, `${q.id} tolerance`);
    }
  }
});

test('lesson tags are known checklist keys', () => {
  const keys = new Set(CHECKLIST.map((c) => c[0]));
  for (const l of LESSONS) for (const t of l.tags) assert.ok(keys.has(t), `${l.id} uses unknown tag ${t}`);
});

test('question quality rules', () => {
  for (const q of QUESTIONS) {
    assert.ok([1, 2, 3, 4].includes(q.level), `${q.id} level`);
    assert.ok(/^q\d+$/.test(q.id), `${q.id} id format`);
    if (q.options) assert.equal(new Set(q.options).size, q.options.length, `${q.id} has duplicate options`);
  }
  const texts = QUESTIONS.map((q) => q.text.trim().toLowerCase());
  assert.deepEqual(dupes(texts), [], 'duplicate question text');
});

test('Units 1-3 coverage and difficulty balance', () => {
  const unit13 = LESSONS.filter((l) => (l.unit ?? 99) <= 3);
  assert.ok(unit13.length >= 8);
  for (const l of unit13) assert.ok(QUESTIONS.filter((q) => q.lesson === l.id).length >= 2, `${l.id} has fewer than 2 questions`);
  for (const lv of [1, 2, 3, 4]) assert.ok(QUESTIONS.filter((q) => q.level === lv).length >= 2, `level ${lv} too thin`);
  assert.ok(QUESTIONS.length >= 40);
});

test('lessons have real content and a unit/order for sorting', () => {
  for (const l of LESSONS) {
    assert.ok(l.body.length > 200, `${l.id} body too short`);
    assert.ok(typeof l.unit === 'number' && typeof l.order === 'number', `${l.id} needs unit and order`);
  }
  assert.deepEqual(dupes(LESSONS.map((l) => String(l.order))), [], 'duplicate lesson order values');
});

test('Batch 4 lessons each have at least 3 linked questions and every lesson has at least 2', () => {
  for (const l of LESSONS) assert.ok(QUESTIONS.filter((q) => q.lesson === l.id).length >= 2, `${l.id} has fewer than 2 questions`);
  for (const l of LESSONS.filter((x) => /^[VDO][1-5]$/.test(x.id))) assert.ok(QUESTIONS.filter((q) => q.lesson === l.id).length >= 3, `${l.id} has fewer than 3 questions`);
  assert.ok(QUESTIONS.length >= 120);
});

test('supplied-calibration questions state their calibration (no hidden constants)', () => {
  for (const id of ['q81', 'q82', 'q118', 'q129']) {
    const q = QUESTIONS.find((x) => x.id === id)!;
    assert.ok(/Assume|supplied/.test(q.text), `${id} must state its calibration in the text`);
  }
});

test('questions that rely on an object or study excerpt supply the excerpt in the text', () => {
  for (const id of ['q187', 'q193', 'q194', 'q202', 'q203', 'q205']) {
    const q = QUESTIONS.find((x) => x.id === id)!;
    assert.ok(/Excerpt/.test(q.text), `${id} must include its source excerpt`);
  }
});


test('Batch 6 lessons have at least 3 linked questions each', () => {
  for (const l of LESSONS.filter((x) => /^G[1-7]$/.test(x.id))) assert.ok(QUESTIONS.filter((q) => q.lesson === l.id).length >= 3, `${l.id} has fewer than 3 questions`);
  assert.ok(QUESTIONS.length >= 200);
});

test('Batch 7 lessons have at least 3 linked questions and the bank is large enough', () => {
  for (const l of LESSONS.filter((x) => /^(N[12]|X1|S1|W1|M[12]|E1)$/.test(x.id))) assert.ok(QUESTIONS.filter((q) => q.lesson === l.id).length >= 3, `${l.id} has fewer than 3 questions`);
  assert.ok(QUESTIONS.length >= 250);
});

test('Excerpt-based questions state their source in the text and are never about unchecked objects', () => {
  const unchecked = OBJECTS.filter((o) => !o.status).map((o) => o.name.split(' (')[0]);
  for (const q of QUESTIONS.filter((x) => /^Excerpt/.test(x.text))) {
    assert.ok(q.text.length > 80, `${q.id} excerpt too short`);
    let t = q.text;
    for (const o of OBJECTS.filter((x) => x.status === 'checked')) t = t.split(o.name.split(' (')[0]).join('');
    for (const name of unchecked) assert.ok(!t.includes(name), `${q.id} cites unchecked object ${name}`);
  }
  for (const id of ['x1', 'x2', 'sn14j', 'gw']) assert.equal(OBJECTS.find((o) => o.id === id)!.status, 'checked');
});

test('required-object pages are complete and reference metadata is valid', () => {
  assert.equal(OBJECTS.length, 16);
  const ids = new Set(OBJECTS.map((o) => o.id));
  for (const o of OBJECTS) {
    assert.ok(o.aliases.length >= 1 && o.kind && o.location && o.distance && o.summary && o.why, `${o.id} missing basic fields`);
    assert.ok(o.facts.length >= 2 && o.recognize.length >= 1 && o.caveats.length >= 1, `${o.id} needs facts, recognition cues and caveats`);
    assert.ok(o.status === 'checked' || o.status === 'partial', `${o.id} needs a status`);
    assert.ok(o.sources.length >= 2 && o.sources.every((u) => u.startsWith('https://')), `${o.id} needs at least two https sources`);
    if (o.parent) assert.ok(ids.has(o.parent), `${o.id} has unknown parent`);
  }
  for (const id of ['x1', 'x2', 'sn14j']) assert.equal(OBJECTS.find((o) => o.id === id)!.parent, 'm82');
});

test('every required object has at least 3 object-tagged questions that point at valid objects', () => {
  const ids = new Set(OBJECTS.map((o) => 'obj:' + o.id));
  for (const q of QUESTIONS) for (const tag of q.tags.filter((x) => x.startsWith('obj:'))) assert.ok(ids.has(tag), `${q.id} uses unknown object tag ${tag}`);
  for (const o of OBJECTS) assert.ok(QUESTIONS.filter((q) => q.tags.includes('obj:' + o.id)).length >= 3, `${o.id} has fewer than 3 object questions`);
});

test('question IDs q1..q252 are all still present (stable IDs) and ids are sequential', () => {
  const have = new Set(QUESTIONS.map((q) => q.id));
  for (let n = 1; n <= 252; n++) assert.ok(have.has('q' + n), `q${n} missing`);
  assert.ok(QUESTIONS.length >= 305);
});
