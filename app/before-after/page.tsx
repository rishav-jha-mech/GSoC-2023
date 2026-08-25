import type { Metadata } from 'next';
import { ALL_MEDIA, META } from '@/lib/data';
import { buildShotMap } from '@/lib/shots';
import { BeforeAfter } from '@/components/BeforeAfter';

export const metadata: Metadata = {
  title: `Before / after — ${META.project}`,
  description: 'The same Talawa Admin screens, before and after the redesign — drag to compare.',
};

export default function BeforeAfterPage() {
  const shots = buildShotMap();

  const side = (file: string) => {
    const hit = ALL_MEDIA.find((m) => m.media.file === file);
    return hit ? { resolved: shots[file] ?? null, pr: hit.pr, file } : null;
  };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <span className="section-tag">Before / after</span>
          <h1>The same screens, seven months apart</h1>
          <p className="section-lede">
            Both sides of every pair are real screenshots from my own pull requests —
            &ldquo;before&rdquo; comes from the February and March PRs, while the old
            design was still live. Drag to compare.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap narrow">
          <BeforeAfter
            label="Organisations list"
            before={side('pr512-01.png')}
            after={side('pr950-06.png')}
            note="The screen a superadmin lands on. Before: a flat wall of cards, no search for admins, nothing to tell you it was loading. After: search for every role, shimmer while fetching, and an empty state that explains itself."
          />
          <BeforeAfter
            label="Organisation dashboard"
            before={side('pr512-02.png')}
            after={side('pr972-01.png')}
            note="Before: a dashboard whose most prominent control was Delete Organization. After: that button removed to Settings where it belongs, and the space given to the five most recent events, posts and membership requests."
          />
          <BeforeAfter
            label="Home and navigation"
            before={side('pr534-01.png')}
            after={side('pr956-01.png')}
            note="Before: a top navigation bar that overlapped its own content at narrower widths. After: the LeftDrawer that replaced it — a fixed sidebar with search, sort and filter on the Organizations screen it now anchors."
          />
          <BeforeAfter
            label="Members and users"
            before={side('pr543-01.png')}
            after={side('pr1006-07.png')}
            note="Before: the member profile page added in March, still inside the old chrome. After: the Users screen with infinite scroll, role changes within an organisation, and modals for organisations joined and organisations that blocked the user."
          />
        </div>
      </section>
    </>
  );
}
