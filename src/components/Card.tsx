import type { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div className="c">{children}</div>;
}
