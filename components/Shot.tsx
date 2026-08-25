'use client';

import type { Media } from '@/lib/data';
import type { ResolvedShot } from '@/lib/format';
import { useLightbox } from './LightboxProvider';

interface Props {
  media: Media;
  resolved: ResolvedShot | null;
  caption: string;
  /** Height class differs between the inline PR strip and the big gallery */
  variant?: 'strip' | 'gallery';
}

export function Shot({ media, resolved, caption }: Props) {
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

  return (
    <figure
      className={`shot${resolved.isVideo ? ' vid' : ''}`}
      onClick={() => open({ src: resolved.src, isVideo: resolved.isVideo, caption })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open({ src: resolved.src, isVideo: resolved.isVideo, caption });
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
