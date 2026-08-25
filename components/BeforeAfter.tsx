'use client';

import { useCallback, useRef, useState } from 'react';
import type { PullRequest } from '@/lib/data';
import type { ResolvedShot } from '@/lib/format';
import { formatDate } from '@/lib/format';

interface Side {
  resolved: ResolvedShot | null;
  pr: PullRequest;
  file: string;
}

interface Props {
  label: string;
  note: string;
  before: Side | null;
  after: Side | null;
}

/**
 * Drag-to-compare. Pointer events cover mouse, touch and pen in one path, and the
 * range input underneath is the keyboard-accessible control — arrow keys move the
 * split, which is why it's a real <input> and not a styled div.
 */
export function BeforeAfter({ label, note, before, after }: Props) {
  const [split, setSplit] = useState(50);
  const stage = useRef<HTMLDivElement>(null);

  const trackPointer = useCallback((clientX: number) => {
    const el = stage.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(0, Math.min(100, pct)));
  }, []);

  if (!before?.resolved || !after?.resolved) {
    const need = [before?.file, after?.file].filter(Boolean).join(' and ');
    return (
      <figure className="ba missing">
        <div className="ba-h">
          <span className="l">{label}</span>
          <span className="r">before / after</span>
        </div>
        <div className="ba-stage">
          needs <b>{need || 'two screenshots'}</b>
          <br />
          run <span style={{ color: 'var(--warning)' }}>npm run shots</span>
        </div>
        <figcaption>{note}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="ba">
      <div className="ba-h">
        <span className="l">{label}</span>
        <span className="r">
          PR #{before.pr.number} · {formatDate(before.pr.created)} → PR #{after.pr.number} ·{' '}
          {formatDate(after.pr.created)}
        </span>
      </div>

      <div
        className="ba-stage"
        ref={stage}
        style={{ ['--split' as string]: `${split}%` }}
        onPointerMove={(e) => {
          if (e.pointerType === 'mouse' && e.buttons === 0) return;
          trackPointer(e.clientX);
        }}
        onPointerDown={(e) => {
          // Capture so the drag keeps tracking even once the pointer leaves the
          // stage bounds or passes over the handle icon — without this, a drag
          // that starts on the ⇄ handle can stall after the first move event.
          e.currentTarget.setPointerCapture(e.pointerId);
          trackPointer(e.clientX);
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <img className="bef" src={before.resolved.src} alt={`Before — ${label}`} draggable={false} />
        <img className="aft" src={after.resolved.src} alt={`After — ${label}`} draggable={false} />
        {/* eslint-enable @next/next/no-img-element */}
        <span className="tagl">before</span>
        <span className="tagr">after</span>
        <span className="ba-bar" style={{ left: `${split}%` }} />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label={`Reveal the redesigned ${label}`}
      />

      <figcaption>{note}</figcaption>
    </figure>
  );
}
