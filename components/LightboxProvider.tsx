'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export interface LightboxItem {
  src: string;
  isVideo: boolean;
  caption: string;
}

const LightboxContext = createContext<(item: LightboxItem) => void>(() => {});

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const open = useCallback((next: LightboxItem) => setItem(next), []);
  const close = useCallback(() => setItem(null), []);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    // Stop the page scrolling behind the overlay.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [item, close]);

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
            <button className="x" onClick={close} aria-label="Close">
              esc ✕
            </button>
            <div style={{ display: 'grid', placeItems: 'center', maxWidth: 1100 }}>
              {item.isVideo ? (
                <video src={item.src} controls autoPlay playsInline />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={item.src} alt={item.caption} />
              )}
              <p className="cap">{item.caption}</p>
            </div>
          </>
        )}
      </div>
    </LightboxContext.Provider>
  );
}
