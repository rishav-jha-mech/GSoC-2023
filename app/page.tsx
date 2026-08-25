import Link from 'next/link';
import { META, PHASES } from '@/lib/data';
import { buildShotMap, shotStats } from '@/lib/shots';
import { BeforeAfter } from '@/components/BeforeAfter';
import { ALL_MEDIA } from '@/lib/data';

export default function Page() {
  const shots = buildShotMap();
  const { total, ready, missing } = shotStats(shots);

  const side = (file: string) => {
    const hit = ALL_MEDIA.find((m) => m.media.file === file);
    return hit ? { resolved: shots[file] ?? null, pr: hit.pr, file } : null;
  };

  const mergeCount = PHASES.flatMap((p) => p.prs).filter((pr) => pr.mergesToMainline).length;

  return (
    <>
      <header className="hero">
        <div className="wrap hero-in">
          <div className="hero-main">
            <p className="hero-kicker">Google Summer of Code {META.year} — {META.org}</p>
            <h1 className="hero-h1">
              Five months on one branch,
              <br />
              merged back <em>eight times</em> so it never went stale.
            </h1>
            <p className="hero-sub">
              Talawa Admin is the browser console community groups use to run
              themselves. I rebuilt it screen by screen over Google Summer of
              Code — {META.prCount} pull requests across two repos, none of them
              landing as one big rewrite.
            </p>

            <div className="hero-actions">
              <Link href="/timeline/" className="hero-cta">
                Walk the branch history
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/before-after/" className="hero-cta ghost">
                See the screens change
              </Link>
            </div>
          </div>

          <div className="hero-badge-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-gsoc-logo" src="/gsoc-badge.svg" alt="Google Summer of Code" />
          </div>
        </div>

        <div className="hero-stats wrap">
          <div>
            <b>{META.prCount}</b>
            <span>pull requests, all merged</span>
          </div>
          <div>
            <b>{mergeCount}</b>
            <span>merges back into develop / master</span>
          </div>
          <div>
            <b>{META.commits2023}</b>
            <span>commits across both repos</span>
          </div>
          <div>
            <b>{META.scssPartials}</b>
            <span>Sass partials in the theme layer</span>
          </div>
        </div>
      </header>

      {missing > 0 && (
        <div className="wrap">
          <div className="banner">
            <b>Screenshots not downloaded yet — {ready} of {total}</b>
            GitHub serves PR attachments from a signed URL that expires after five
            minutes, so they can&apos;t be hotlinked. Run <code>npm run shots</code> once
            and rebuild.
          </div>
        </div>
      )}

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">01 — the constraint</span>
            <h2>They didn&apos;t hand me a design. They handed me rules.</h2>
          </div>
          <p className="section-lede">
            Incremental, screen at a time. Reusable layouts other contributors build
            on. Every screen size. A weekly cadence the community could see. Honest,
            greyed-out placeholders instead of dead ends. The hard one was staying
            incremental on a branch that had to survive five months of six other
            people writing features into the same codebase — which is the story the
            timeline tells.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">02 — proof</span>
            <h2>The same screens, seven months apart</h2>
            <p className="section-lede">Drag to compare. Both sides are real screenshots pulled from my own pull requests.</p>
          </div>
          <BeforeAfter
            label="Organisations list"
            before={side('pr512-01.png')}
            after={side('pr950-06.png')}
            note="Before: a flat wall of cards, no search for admins, nothing to tell you it was loading. After: search for every role, shimmer while fetching, an empty state that explains itself."
          />
          <div style={{ marginTop: 22, textAlign: 'right' }}>
            <Link href="/before-after/" className="text-link">
              See all four pairs →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">03 — the branch</span>
            <h2>Eight merges, drawn as they actually happened</h2>
            <p className="section-lede">
              A git-graph of every PR across both repos — the redesign lane running
              alongside develop and master, merging back in on a cadence rather than
              disappearing for months.
            </p>
          </div>
          <Link href="/timeline/" className="graph-teaser">
            <span>Open the full timeline</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span className="section-tag">Afterwards</span>
          <h2>Where it went</h2>
          <p className="section-lede" style={{ marginTop: 14 }}>
            The primitives built here — <span className="k">LeftDrawer</span>,{' '}
            <span className="k">SuperAdminScreen</span>, <span className="k">OrgListCard</span>,
            and the themed Sass layer under all of them — became the base the rest
            of the portal was built on.
          </p>
          <div className="links">
            <a
              className="lnk"
              href={`https://github.com/PalisadoesFoundation/talawa-admin/pulls?q=is%3Apr+author%3A${META.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              All PRs → talawa-admin
            </a>
            <a
              className="lnk"
              href={`https://github.com/PalisadoesFoundation/talawa-api/pulls?q=is%3Apr+author%3A${META.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              All PRs → talawa-api
            </a>
            <a
              className="lnk"
              href="https://www.palisadoes.org/2023/05/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GSoC 2023 announcement
            </a>
            <a
              className="lnk"
              href={`https://github.com/${META.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/{META.handle}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
