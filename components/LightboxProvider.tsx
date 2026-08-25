'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export interface LightboxItem {
  src: string;
  isVideo: boolean;
  caption: string;
}

interface OpenState {
  items: LightboxItem[];
  index: number;
}

/**
 * `open` takes the full ordered list a thumbnail belongs to, plus which index
 * was activated — that's what lets the lightbox answer arrow-key navigation
 * without every caller having to know about its neighbours.
 */
const LightboxContext = createContext<(items: LightboxItem[], index: number) => void>(() => {});

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpenState | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const open = useCallback((items: LightboxItem[], index: number) => {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    setState({ items, index });
  }, []);

  const close = useCallback(() => {
    setState(null);
    returnFocusTo.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setState((s) => {
      if (!s) return s;
      const next = (s.index + delta + s.items.length) % s.items.length;
      return { ...s, index: next };
    });
  }, []);

  useEffect(() => {
    if (!state) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [state, close, step]);

  const item = state ? state.items[state.index] : null;
  const multi = !!state && state.items.length > 1;

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <div
        className={`lb${item ? ' on' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged screenshot"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {item && (
          <>
            <button className="x" ref={closeBtnRef} onClick={close} aria-label="Close">
              esc ✕
            </button>
            {multi && (
              <>
                <button
                  className="lb-nav prev"
                  onClick={() => step(-1)}
                  aria-label={`Previous (${state!.index} of ${state!.items.length})`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  className="lb-nav next"
                  onClick={() => step(1)}
                  aria-label={`Next (${state!.index + 2} of ${state!.items.length})`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
            <div style={{ display: 'grid', placeItems: 'center', maxWidth: 1100 }}>
              {item.isVideo ? (
                <video src={item.src} controls autoPlay playsInline />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={item.src} alt={item.caption} />
              )}
              <p className="cap">
                {item.caption}
                {multi && (
                  <span className="lb-count">
                    {' '}
                    · {state!.index + 1} / {state!.items.length}
                  </span>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </LightboxContext.Provider>
  );
}
