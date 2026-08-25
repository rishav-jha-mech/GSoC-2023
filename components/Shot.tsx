'use client';

import type { Media } from '@/lib/data';
import type { ResolvedShot } from '@/lib/format';
import { useLightbox, type LightboxItem } from './LightboxProvider';

interface Props {
  media: Media;
  resolved: ResolvedShot | null;
  caption: string;
  /** Height class differs between the inline PR strip and the big gallery */
  variant?: 'strip' | 'gallery';
  /** This shot's position within its enclosing list, for lightbox arrow-key nav */
  index?: number;
  /** The full resolved list this shot belongs to — siblings the lightbox can step to */
  siblings?: LightboxItem[];
}

export function Shot({ media, resolved, caption, index = 0, siblings }: Props) {
  const open = useLightbox();

  // Not downloaded and not hotlinkable — say so instead of showing a broken box.
  if (!resolved) {
    return (
      <figure className="shot pend">
        <div className="ph">
          not downloaded yet
          <br />
          <b>{media.file}</b>
          <br />
          run <span style={{ color: 'var(--warning)' }}>npm run shots</span>
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  const self: LightboxItem = { src: resolved.src, isVideo: resolved.isVideo, caption };
  const openHere = () => open(siblings ?? [self], siblings ? index : 0);

  return (
    <figure
      className={`shot${resolved.isVideo ? ' vid' : ''}`}
      onClick={openHere}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openHere();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Enlarge: ${caption}`}
    >
      {resolved.isVideo ? (
        <video src={resolved.src} muted playsInline preload="metadata" />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={resolved.src} alt={caption} loading="lazy" />
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
