import { ALL_MEDIA } from '@/lib/data';
import type { ShotMap } from '@/lib/shots';
import { caption } from '@/lib/format';
import { Shot } from './Shot';
import type { LightboxItem } from './LightboxProvider';

export function Gallery({ shots }: { shots: ShotMap }) {
  const items = ALL_MEDIA.map(({ media, pr }) => ({
    media,
    caption: caption(media) || `Talawa Admin · PR #${pr.number}`,
    resolved: shots[media.file] ?? null,
  }));

  // Only resolved shots can be stepped through in the lightbox — a pending
  // placeholder has nothing to show, so it's excluded from the sibling list
  // and gets its own index-0 fallback in Shot.
  const siblings: LightboxItem[] = items
    .filter((i) => i.resolved)
    .map((i) => ({ src: i.resolved!.src, isVideo: i.resolved!.isVideo, caption: i.caption }));

  let resolvedIdx = 0;

  return (
    <div className="gal">
      {items.map((i) => {
        const idx = i.resolved ? resolvedIdx++ : 0;
        return (
          <Shot
            key={i.media.file}
            media={i.media}
            resolved={i.resolved}
            caption={i.caption}
            variant="gallery"
            index={idx}
            siblings={i.resolved ? siblings : undefined}
          />
        );
      })}
    </div>
  );
}
