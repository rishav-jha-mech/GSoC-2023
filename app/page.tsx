import { ALL_MEDIA, META, PHASES } from '@/lib/data';
import { buildShotMap, shotStats } from '@/lib/shots';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Gallery } from '@/components/Gallery';
import { Rail } from '@/components/Rail';
import { Timeline } from '@/components/Timeline';

const CHAPTERS = [
  { id: 'chapter-00', label: 'Brief' },
  { id: 'chapter-01', label: 'Deleting' },
  { id: 'chapter-02', label: 'Theming' },
  { id: 'chapter-03', label: 'Primitives' },
  { id: 'chapter-04', label: 'Before / after' },
  { id: 'chapter-05', label: 'Shipping' },
  { id: 'chapter-06', label: 'Design' },
  { id: 'chapter-07', label: 'Log' },
  { id: 'chapter-08', label: 'Gallery' },
];

export default function Page() {
  const shots = buildShotMap();
  const { total, ready, missing } = shotStats(shots);

  /** Look a screenshot up by filename so before/after pairs stay declarative. */
  const side = (file: string) => {
    const hit = ALL_MEDIA.find((m) => m.media.file === file);
    return hit ? { resolved: shots[file] ?? null, pr: hit.pr, file } : null;
  };

  return (
    <>
      <Rail items={CHAPTERS} />

      <header className="hero">
        <div className="wrap">
          <span className="badge">
            <span className="dot" />
            Google Summer of Code {META.year} · completed
          </span>
          <h1>
            Admin<span className="c">:</span>
            <br />
            UI&nbsp;Redesign
          </h1>
          <p className="sub">
            Rebuilding the Talawa admin portal for {META.org} — one screen at a time, on a branch
            that had to stay mergeable for five months while six other people wrote features into
            it.
          </p>
          <div className="branchline">
            <span className="pill b">adminUI-redesign</span>
            <span className="arrow">→</span>
            <span className="pill">develop</span>
            <span className="arrow">→</span>
            <span className="pill">master</span>
          </div>
          <dl className="facts">
            <div className="fact">
              <dt>Contributor</dt>
              <dd>{META.contributor}</dd>
            </div>
            <div className="fact">
              <dt>Mentors</dt>
              <dd>
                {META.mentors[0]}
                <br />
                {META.mentors[1]}
              </dd>
            </div>
            <div className="fact">
              <dt>Pull requests</dt>
              <dd>
                <b>{META.prCount}</b>all merged
              </dd>
            </div>
            <div className="fact">
              <dt>Commits in {META.year}</dt>
              <dd>
                <b>{META.commits2023}</b>across both repos
              </dd>
            </div>
            <div className="fact">
              <dt>Stack</dt>
              <dd>
                React · TypeScript · GraphQL
                <br />
                Bootstrap 5 · Sass · Jest
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ── 00 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-00">
        <div className="wrap">
          {missing > 0 && (
            <div className="banner">
              <b>
                Screenshots not downloaded yet — {ready} of {total}
              </b>
              GitHub serves PR attachments from a URL that redirects to a signed S3 link with{' '}
              <code>X-Amz-Expires=300</code>. Five minutes. They cannot be hotlinked from a static
              page at all, so they have to live in this repo. Run <code>npm run shots</code> once,
              rebuild, and every placeholder below fills in.
            </div>
          )}

          <div className="ch-head reveal">
            <span className="ch-no">00</span>
            <div>
              <span className="eyebrow">The brief</span>
              <h2>What I was asked to fix</h2>
              <p className="lede">
                Talawa Admin is the browser portal that community organisations — clubs,
                congregations, volunteer groups, small non-profits — use to run themselves. The
                portal worked, roughly. It was just hard to find your way through: buttons that did
                nothing gave no sign they were disabled, and nothing adapted below desktop width.
              </p>
            </div>
          </div>

          <div className="prose narrow reveal">
            <p>
              The organisation didn&apos;t hand me a design. They handed me five constraints on{' '}
              <em>how</em> the fix was allowed to happen, and those constraints turned out to be the
              actual brief.
            </p>
          </div>

          <div className="ev reveal">
            {[
              ['Incremental', 'A screen at a time. No monolithic rewrite, and all tests pass at every step.'],
              ['Reusable layouts', 'Produce modular templates other contributors build their own features on.'],
              ['Every screen size', "Desktop, laptop, tablet, phone — adapt, don't just shrink."],
              ['Weekly cadence', 'Land changes weekly and tell the community what moved.'],
              ['Honest placeholders', 'Planned-but-unbuilt features stay visible and greyed out. No dead ends.'],
            ].map(([name, body], i) => (
              <div className="ev-i" key={name}>
                <div className="n" style={{ fontSize: 15, fontWeight: 700 }}>
                  {name}
                </div>
                <div className="l">{body}</div>
                <div className="src">constraint 0{i + 1}</div>
              </div>
            ))}
          </div>

          <div className="prose narrow reveal">
            <p>
              Constraint one is the hard one. A redesign branch that goes quiet for two months and
              comes back with forty conflicting files is a branch nobody merges. So I inverted the
              usual shape of the work: the redesign lived on a long-running branch, but I pulled{' '}
              <span className="k">develop</span> into it and pushed it back out roughly every two
              weeks. Nine merge PRs across the summer, each small enough that someone would actually
              review it.
            </p>
            <p>
              The side effect mattered more than the merges themselves. Because the new layout kept
              landing in <span className="k">develop</span>, the other GSoC contributors were always
              building <em>on</em> it rather than against it. By the end they had extended my drawer
              component into two of their own without asking me for anything.
            </p>
          </div>
        </div>
      </section>

      {/* ── 01 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-01">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">01</span>
            <div>
              <span className="eyebrow">Feb – Apr 2023</span>
              <h2>A month of not designing</h2>
              <p className="lede">
                Before selection and through community bonding, I didn&apos;t touch the visual
                design. I spent the time deleting things.
              </p>
            </div>
          </div>
          <div className="prose narrow reveal">
            <p>
              The codebase had two complete design systems installed at once — Ant Design and
              Bootstrap — so every new screen picked one, and the picks were inconsistent. There was
              a <span className="k">src/css</span> folder holding an unused Bootstrap <em>5</em>{' '}
              stylesheet while the project ran Bootstrap <em>4</em>. And there were two screen-list
              components, <span className="k">SuperDashListCard</span> and{' '}
              <span className="k">AdminDashListCard</span>, with the same markup and the same CSS,
              differing only in whether a button read &ldquo;Manage&rdquo; or &ldquo;View&rdquo;.
            </p>
            <p>
              Redesigning on top of that would have meant redesigning everything twice. So Ant
              Design came out entirely, the dead CSS went, the duplication got collapsed. Slower for
              four weeks. Much faster for the four months after.
            </p>
            <p>
              This is also where the pattern for the rest of the project got set:{' '}
              <em>when the frontend problem is actually a backend problem, go fix the backend.</em>{' '}
              Organisation images were rendering as broken because the API returned relative paths
              like <span className="k">image/{'{fileName}'}</span>, which fell apart the moment the
              server moved. I could have prefixed a base URL client-side. Instead I wrote the
              resolver in <span className="k">talawa-api</span>, with tests.
            </p>
          </div>
          <div className="ev reveal">
            <div className="ev-i">
              <div className="n">−1</div>
              <div className="l">design system removed — Ant Design out, Bootstrap the single source</div>
              <div className="src">PR #891</div>
            </div>
            <div className="ev-i">
              <div className="n">2 → 1</div>
              <div className="l">duplicate list-card components collapsed</div>
              <div className="src">PR #852, #950</div>
            </div>
            <div className="ev-i">
              <div className="n">3</div>
              <div className="l">backend fixes written rather than worked around</div>
              <div className="src">talawa-api #1100, #1376, #1411</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-02">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">02</span>
            <div>
              <span className="eyebrow">Jun 2023 · the theming layer</span>
              <h2>One file to change the brand</h2>
              <p className="lede">
                A redesign is only maintainable if the next contributor can change the primary
                colour in one place and have it propagate. That meant Bootstrap 5, and it meant
                compiling Bootstrap from source instead of overriding it from outside.
              </p>
            </div>
          </div>

          <div className="prose narrow reveal">
            <p>
              Bootstrap 5 drops class-based modals for component-based ones. Doing that upgrade{' '}
              <em>after</em> the redesign would have meant migrating every newly built screen a
              second time — so the upgrade came first: raw <span className="k">button</span> and{' '}
              <span className="k">input</span> elements swapped for <span className="k">Button</span>{' '}
              and <span className="k">Form.Control</span>, class-based modals swapped for
              react-bootstrap ones, <span className="k">popper.js</span> and{' '}
              <span className="k">react-modal</span> dropped from the tree.
            </p>
            <p>
              Then the part I&apos;m still happiest with. Instead of shipping a stylesheet that
              fights Bootstrap&apos;s defaults with more specific selectors, I inserted the
              project&apos;s own variables <em>between</em> Bootstrap&apos;s functions and
              Bootstrap&apos;s variables. Sass takes the first definition it sees, so declaring{' '}
              <span className="k">$primary</span> before importing Bootstrap&apos;s variables means
              Bootstrap builds itself in Talawa&apos;s colours. No overrides, no specificity war.
            </p>
          </div>

          <figure className="code reveal">
            <figcaption>
              <span className="path">src/assets/scss/app.scss</span>
              <span>the whole trick is the import order</span>
            </figcaption>
            <pre>
              <span className="t-com">{'// Importing Bootstrap SCSS Functions and Mixins'}</span>
              {'\n'}
              <span className="t-at">@import</span>{" '../../../node_modules/bootstrap/scss/functions';\n"}
              <span className="t-at">@import</span>{" '../../../node_modules/bootstrap/scss/mixins';\n\n"}
              <span className="t-com">
                {'// Importing Our Bootstrap SCSS Variables   ← ours land first, so they win'}
              </span>
              {'\n'}
              <span className="t-at">@import</span>{" './variables';\n\n"}
              <span className="t-com">{'// Importing Bootstrap Variables and SCSS'}</span>
              {'\n'}
              <span className="t-at">@import</span>{" '../../../node_modules/bootstrap/scss/variables';\n"}
              <span className="t-at">@import</span>{" '../../../node_modules/bootstrap/scss/variables-dark';\n"}
              <span className="t-at">@import</span>{" '../../../node_modules/bootstrap/scss/bootstrap.scss';\n\n"}
              <span className="t-com">{'// Importing Our Bootstrap SCSS Overrides'}</span>
              {'\n'}
              <span className="t-at">@import</span>{" './talawa';"}
            </pre>
          </figure>

          <figure className="code reveal">
            <figcaption>
              <span className="path">src/assets/scss/_variables.scss</span>
              <span>the tokens the portal is built from</span>
            </figcaption>
            <pre>
              <span className="t-com">{'// Colors'}</span>
              {'\n'}
              <span className="t-var">$primary</span>
              {':        '}
              <span className="t-val">#31bb6b</span>
              {';\n'}
              <span className="t-var">$secondary</span>
              {':      '}
              <span className="t-val">#707070</span>
              {';\n'}
              <span className="t-var">$success</span>
              {':        '}
              <span className="t-val">#31bb6b</span>
              {';\n'}
              <span className="t-var">$warning</span>
              {':        '}
              <span className="t-val">#febc59</span>
              {';\n'}
              <span className="t-var">$placeholder-bg</span>
              {': '}
              <span className="t-val">#f2f2f2</span>
              {';\n\n'}
              <span className="t-com">
                {'// Inputs and buttons — one rhythm for every control in the portal'}
              </span>
              {'\n'}
              <span className="t-var">$input-bg</span>
              {':           '}
              <span className="t-val">$placeholder-bg</span>
              {';\n'}
              <span className="t-var">$input-border-width</span>
              {': '}
              <span className="t-val">0</span>
              {';\n'}
              <span className="t-var">$input-btn-padding-y</span>
              {': '}
              <span className="t-val">0.7rem</span>
              {';\n'}
              <span className="t-var">$input-btn-padding-x</span>
              {': '}
              <span className="t-val">1rem</span>
              {';'}
            </pre>
          </figure>

          <div className="swatches reveal">
            {[
              ['#31bb6b', '$primary'],
              ['#febc59', '$warning'],
              ['#707070', '$secondary'],
              ['#f2f2f2', '$placeholder-bg'],
            ].map(([hex, name]) => (
              <span className="sw" key={name}>
                <i style={{ background: hex }} />
                {name} <span>{hex}</span>
              </span>
            ))}
          </div>

          <div className="prose narrow reveal" style={{ marginTop: 30 }}>
            <p>
              Underneath <span className="k">_talawa.scss</span> sits a partial per Bootstrap
              component — accordion, alert, badge, breadcrumb, buttons, card, dropdown, modal,
              navbar, pagination, spinners, plus forms and typography. It mirrors Bootstrap&apos;s
              own structure deliberately, so a contributor who knows where something lives in
              Bootstrap knows where to change it here. The whole layer went from nothing to 31 files
              in a single PR, and I documented how to use it in{' '}
              <span className="k">CODE_STYLE.md</span> in the same breath — an undocumented
              convention is a convention nobody follows.
            </p>
          </div>

          <div className="ev reveal">
            <div className="ev-i">
              <div className="n">0 → 31</div>
              <div className="l">Sass partials created in one PR; {META.scssPartials} by the end</div>
              <div className="src">PR #929 · verified in git</div>
            </div>
            <div className="ev-i">
              <div className="n">4 → 5</div>
              <div className="l">
                Bootstrap major version, with the breaking change flagged for the team rather than
                discovered by them
              </div>
              <div className="src">PR #925</div>
            </div>
            <div className="ev-i">
              <div className="n">−2</div>
              <div className="l">packages dropped: popper.js, react-modal</div>
              <div className="src">PR #925</div>
            </div>
          </div>

          <div className="prose narrow reveal">
            <p>
              One deliberate omission: I left the Organization Events screen unmigrated. Another
              GSoC contributor was rewriting that screen from scratch that same month, so fixing its
              failing tests would have been work thrown straight in the bin. I said so in the PR
              description instead of quietly leaving a gap.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-03">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">03</span>
            <div>
              <span className="eyebrow">Jul – Aug 2023 · layout primitives</span>
              <h2>Building the things other people build on</h2>
              <p className="lede">
                Constraint two asked for modular templates other contributors could use. This is the
                chapter where that either happened or didn&apos;t — and the file tree settles the
                argument.
              </p>
            </div>
          </div>

          <div className="prose narrow reveal">
            <p>
              PR #950 was the structural one. <span className="k">LeftDrawer</span> and{' '}
              <span className="k">SuperAdminScreen</span> were written from scratch, with tests. The
              two duplicate list cards were replaced by a single{' '}
              <span className="k">OrgListCard</span>, and the admin-versus-superadmin decision was
              lifted <em>up</em> into the parent screen — so a card either renders or it
              doesn&apos;t, rather than rendering itself into a disabled state. Same PR: admins had
              the organisation search box hidden from them for no reason I could find. Admins search
              for organisations too. It went back in.
            </p>
            <p>
              The evidence that constraint two was actually met isn&apos;t in my PRs. It&apos;s in
              what other people did with the component afterwards.
            </p>
          </div>

          <figure className="code reveal">
            <figcaption>
              <span className="path">git ls-tree src/components/</span>
              <span>the same query at three points in the project</span>
            </figcaption>
            <pre>
              <span className="t-com">{'# PR #942 — 5 Jul'}</span>
              {'\nAdminDashListCard/     '}
              <span className="t-com">{'← identical twins, one button label apart'}</span>
              {'\nSuperDashListCard/\n\n'}
              <span className="t-com">{'# PR #950 — 30 Jul   both gone, three primitives in their place'}</span>
              {'\n'}
              <span className="t-val">LeftDrawer/</span>
              {'\n'}
              <span className="t-val">OrgListCard/</span>
              {'\n'}
              <span className="t-val">SuperAdminScreen/</span>
              {'\n\n'}
              <span className="t-com">
                {'# PR #1006 — 24 Oct   other contributors extended the drawer themselves'}
              </span>
              {'\nLeftDrawer/\n'}
              <span className="t-var">LeftDrawerEvent/</span>
              {'          '}
              <span className="t-com">{'← not mine'}</span>
              {'\n'}
              <span className="t-var">LeftDrawerOrg/</span>
              {'            '}
              <span className="t-com">{'← not mine'}</span>
              {'\nOrgListCard/\nSuperAdminScreen/'}
            </pre>
          </figure>

          <div className="prose narrow reveal">
            <p>
              Two derivative drawers I never wrote, built by contributors who didn&apos;t need to
              ask me how. That&apos;s the constraint met, and it&apos;s the part of the project
              I&apos;d point at first.
            </p>
            <p>
              The rest of #950 was the unglamorous half of good UI: shimmer loading states, real
              empty states, and <em>no results for &ldquo;{'<query>'}&rdquo;</em> messaging across
              the Organizations, Requests and Roles screens — so a screen with nothing on it tells
              you why instead of just being blank.
            </p>
          </div>
        </div>
      </section>

      {/* ── 04 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-04">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">04</span>
            <div>
              <span className="eyebrow">Before / after</span>
              <h2>The same screens, seven months apart</h2>
              <p className="lede">
                Both sides of every pair below are real screenshots from my own pull requests — the
                &ldquo;before&rdquo; images come from the February and March PRs, taken while the old
                design was still live. Drag to compare.
              </p>
            </div>
          </div>

          <div className="reveal">
            <BeforeAfter
              label="Organisations list"
              before={side('pr512-01.png')}
              after={side('pr950-06.png')}
              note="The screen a superadmin lands on. Before: a flat wall of cards, no search for admins, nothing to tell you it was loading. After: search for every role, shimmer while fetching, and an empty state that explains itself."
            />
          </div>
          <div className="reveal">
            <BeforeAfter
              label="Organisation dashboard"
              before={side('pr512-02.png')}
              after={side('pr972-01.png')}
              note="Before: a dashboard whose most prominent control was Delete Organization. After: that button removed to Settings where it belongs, and the space given to the five most recent events, posts and membership requests — the things an administrator opens the dashboard to check."
            />
          </div>
          <div className="reveal">
            <BeforeAfter
              label="Home and navigation"
              before={side('pr534-01.png')}
              after={side('pr942-01.png')}
              note="Before: a top navigation bar that overlapped its own content at narrower widths. After: a responsive home screen and the beginnings of the left drawer pattern that replaced the top bar entirely."
            />
          </div>
          <div className="reveal">
            <BeforeAfter
              label="Members and users"
              before={side('pr543-01.png')}
              after={side('pr1006-07.png')}
              note="Before: the member profile page I'd added in March, still inside the old chrome. After: the Users screen with infinite scroll, role changes within an organisation, and modals for organisations joined and organisations that blocked the user."
            />
          </div>

          <div className="prose narrow reveal" style={{ marginTop: 34 }}>
            <p>
              <span className="edit">
                Your call on this one: if you have any screen recordings, or the pre-GSoC portal
                running locally, drop stills in public/shots and add a BeforeAfter to this chapter.
                The before/after is the single most persuasive thing on the page and right now it
                only has four pairs.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 05 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-05">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">05</span>
            <div>
              <span className="eyebrow">Sep – Oct 2023 · shipping</span>
              <h2>The last mile</h2>
            </div>
          </div>
          <div className="prose narrow reveal">
            <p>
              The final stretch was three screens and the things that only matter once a portal is
              genuinely used: infinite scroll on Organizations, Requests and Users; translations
              across every page; a redesigned forgot-password flow; a delete-organisation modal
              whose colour and wording made the consequence obvious.
            </p>
            <p>
              One small decision I&apos;d defend in any review. The language switcher had been
              sitting on <em>every single screen</em> of the portal. Language is a set-once
              preference — nobody changes the language they read in halfway through approving a
              membership request. It moved into Settings. One extra click for the rare person who
              switches; a quieter header on every screen for everyone else.
            </p>
            <p>
              Settings got restructured around the same logic: membership requests moved out to
              their own screen, the user-detail and credential tabs were handed to the contributor
              who owned that area, and what remained was the three things that genuinely belong to
              an organisation&apos;s settings.
            </p>
            <p>
              PR #1006 merged to <span className="k">master</span> on 24 October 2023. Its
              &ldquo;Other information&rdquo; field says, in full: <span className="k">GSoC 2023</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-06">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">06</span>
            <div>
              <span className="eyebrow">Design</span>
              <h2>Wireframes and Figma</h2>
            </div>
          </div>
          <div className="slot reveal">
            <h3>✎ Figma goes here</h3>
            <p>
              I couldn&apos;t recover this — Figma files aren&apos;t in the git history and
              aren&apos;t linked from any of your 27 PRs. If you still have the file, publish it to
              web and paste the embed below. If it&apos;s gone, say so plainly in a sentence here; a
              lost file is not a weak spot, but an unexplained gap is.
            </p>
            <pre>{`<iframe
  style={{ border: '1px solid var(--line)', borderRadius: 9 }}
  width="100%" height={520} allowFullScreen
  src="https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK"
/>`}</pre>
          </div>
        </div>
      </section>

      {/* ── 07 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-07">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">07</span>
            <div>
              <span className="eyebrow">The log</span>
              <h2>Every pull request</h2>
              <p className="lede">
                All {META.prCount}, in the order they were opened. Open any node for what it changed
                and why. Larger nodes are merges back into a shared branch; amber nodes are backend
                work in <span className="k">talawa-api</span>.
              </p>
            </div>
          </div>
          <Timeline phases={PHASES} shots={shots} />
        </div>
      </section>

      {/* ── 08 ─────────────────────────────────────────────── */}
      <section className="ch" id="chapter-08">
        <div className="wrap">
          <div className="ch-head reveal">
            <span className="ch-no">08</span>
            <div>
              <span className="eyebrow">Evidence</span>
              <h2>Every screenshot, recovered</h2>
              <p className="lede">
                All {total} assets posted across the pull request bodies at the time of review, with
                the captions written around them. Click to enlarge.
              </p>
            </div>
          </div>
          <Gallery shots={shots} />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span className="eyebrow">Afterwards</span>
          <h2>Where it went</h2>
          <div className="prose narrow" style={{ marginTop: 16 }}>
            <p>
              The primitives built here — <span className="k">LeftDrawer</span>,{' '}
              <span className="k">SuperAdminScreen</span>, <span className="k">OrgListCard</span>,
              and the themed Sass layer under all of them — became the base the rest of the portal
              was built on.{' '}
              <span className="edit">
                Add what happened after: whether you stayed on as a contributor or mentor, what
                shipped later, where Talawa Admin is today.
              </span>
            </p>
          </div>
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
              href="https://www.palisadoes.org/news/2023/05/04/5706/"
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
            <a
              className="lnk"
              href="#chapter-00"
              style={{ borderStyle: 'dashed', color: 'var(--warning)', borderColor: 'var(--warning)' }}
            >
              ✎ Add your final report
            </a>
          </div>
          <p className="colophon">
            Assembled from the public pull request history of PalisadoesFoundation/talawa-admin and
            talawa-api.
            <br />
            Code excerpts are from the repository at PR #1006. Commit and file counts verified
            against git, not the GitHub API.
            <br />
            Talawa is a project of The Palisadoes Foundation.
          </p>
        </div>
      </footer>
    </>
  );
}
