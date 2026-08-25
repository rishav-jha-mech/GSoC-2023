'use client';

import { useEffect } from 'react';

/**
 * Fades chapters up as they enter view. Mounted once at the page root rather than
 * wrapping every section, so the markup stays readable.
 *
 * Anything already on screen at load is revealed immediately — no blank hero — and
 * prefers-reduced-motion short-circuits the whole thing (the CSS also defends
 * against it, so this is belt and braces).
 */
export function Reveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!targets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.04 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
