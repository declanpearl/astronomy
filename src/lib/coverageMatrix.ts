import { CHECKLIST } from '../data/checklist.ts';
import { OBJECTS } from '../data/objects.ts';
import { LESSONS } from '../data/lessons.ts';
import { QUESTIONS } from '../data/questions.ts';
import { MIN_QUESTIONS, PLAN, THIN_QUESTIONS } from '../data/curriculumPlan.ts';

export type Status = 'covered' | 'partial' | 'gap';
export interface Row { key: string; label: string; lessons: string[]; questions: string[]; status: Status; plan: number | undefined; depth: 'solid' | 'thin' | '-' }

export function buildMatrix(): Row[] {
  const items: [string, string][] = [...CHECKLIST, ...OBJECTS.map((o): [string, string] => ['obj:' + o.id, 'Object: ' + o.name])];
  return items.map(([key, label]) => {
    const lessons = key.startsWith('obj:') ? ['object page'] : LESSONS.filter((l) => l.tags.includes(key)).map((l) => l.id);
    const questions = QUESTIONS.filter((q) => q.tags.includes(key)).map((q) => q.id);
    const status: Status = lessons.length && questions.length >= MIN_QUESTIONS ? 'covered' : lessons.length || questions.length ? 'partial' : 'gap';
    const levels = new Set(QUESTIONS.filter((q) => q.tags.includes(key)).map((q) => q.level));
    const depth = status === 'gap' ? '-' : questions.length >= THIN_QUESTIONS && levels.size >= 3 ? 'solid' : 'thin';
    return { key, label, lessons, questions, status, plan: PLAN[key], depth } as Row;
  });
}
