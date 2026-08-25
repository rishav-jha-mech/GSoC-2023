'use client';

import { useEffect, useState } from 'react';

export interface RailItem {
  id: string;
  label: string;
}

/**
 * Fixed chapter rail on wide screens. Marks the chapter currently occupying the
 * middle of the viewport, which behaves better than "topmost visible" on a page
 * with chapters of very different heights.
 */
export function Rail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const pick = () => {
      const mid = window.innerHeight / 2;
      let best = items[0]?.id ?? '';
      let bestDist = Infinity;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Distance from viewport middle to the section's span.
        const dist =
          rect.top > mid ? rect.top - mid : rect.bottom < mid ? mid - rect.bottom : 0;
        if (dist < bestDist) {
          bestDist = dist;
          best = item.id;
        }
      }
      setActive(best);
    };

    pick();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('resize', pick);
    return () => {
      window.removeEventListener('scroll', pick);
      window.removeEventListener('resize', pick);
    };
  }, [items]);

  return (
    <nav className="rail" aria-label="Chapters">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} data-on={active === item.id ? '1' : '0'}>
          <span className="lbl">{item.label}</span>
          <span className="tick" />
        </a>
      ))}
    </nav>
  );
}
