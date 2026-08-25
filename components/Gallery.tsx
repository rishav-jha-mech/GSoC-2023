import { ALL_MEDIA } from '@/lib/data';
import type { ShotMap } from '@/lib/shots';
import { caption } from '@/lib/format';
import { Shot } from './Shot';

export function Gallery({ shots }: { shots: ShotMap }) {
  return (
    <div className="gal">
      {ALL_MEDIA.map(({ media, pr }) => (
        <Shot
          key={media.file}
          media={media}
          resolved={shots[media.file] ?? null}
          caption={caption(media) || `Talawa Admin · PR #${pr.number}`}
          variant="gallery"
        />
      ))}
    </div>
  );
}
