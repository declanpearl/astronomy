import type { Progress } from '../types';
import { LESSONS } from '../data/lessons';
import { QUESTIONS } from '../data/questions';

export const MASTERY_LABELS = ['Not started', 'Learning', 'Developing', 'Proficient', 'Mastered'];

/** 0 = not started ... 4 = mastered (3 correct in a row). One correct answer never means mastered. */
export function mastery(p: Progress, id: string): number {
  const r = p.q[id];
  if (!r) return 0;
  return r.box >= 3 ? 4 : r.box >= 2 ? 3 : r.box >= 1 ? 2 : 1;
}

/** [lessonCount, questionCount] carrying this checklist tag. Object keys ('obj:xxx') count the object page as 1. */
export function coverage(key: string): [number, number] {
  const q = QUESTIONS.filter((x) => x.tags.includes(key)).length;
  if (key.startsWith('obj:')) return [1, q];
  return [LESSONS.filter((x) => x.tags.includes(key)).length, q];
}
