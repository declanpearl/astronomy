export type ViewId = 'dash' | 'learn' | 'prac' | 'obj' | 'form' | 'mist' | 'chk' | 'rules';

export interface Lesson { id: string; title: string; tags: string[]; body: string }
export interface Question {
  id: string; tags: string[]; lesson: string; level: 1 | 2 | 3 | 4;
  text: string; options?: string[];
  /** index of the correct option for multiple choice, or the numeric answer */
  answer: number; tolerance?: number; explanation: string;
}
export interface RequiredObject { id: string; name: string; summary: string; why: string }
export interface Formula { name: string; eq: string; note: string }
export interface QStat { box: number; att: number; ok: number }
export interface Mistake { id: string; ans: string; date: string }
export interface Progress {
  q: Record<string, QStat>;
  mist: Mistake[];
  chk: Record<string, boolean>;
  les: Record<string, boolean>;
  log: unknown[];
}
