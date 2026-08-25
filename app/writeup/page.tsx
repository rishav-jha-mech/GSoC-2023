import type { Metadata } from 'next';
import { META } from '@/lib/data';
import { buildShotMap, shotStats } from '@/lib/shots';
import { Gallery } from '@/components/Gallery';

export const metadata: Metadata = {
  title: `Write-up — ${META.project}`,
  description: 'The full story of the Talawa Admin redesign: the brief, the theming layer, the primitives, and how it shipped.',
};

export default function WriteupPage() {
  const shots = buildShotMap();
  const { total } = shotStats(shots);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <span className="section-tag">Write-up</span>
          <h1>What actually happened, in full</h1>
          <p className="section-lede">
            The brief, the theming trick, the primitives other people built on, and
            how it shipped without ever going quiet.
          </p>
        </div>
      </header>

      <section className="section" id="brief">
        <div className="wrap narrow">
          <h2>What I was asked to fix</h2>
          <p className="prose">
            Talawa Admin is the browser portal that community organisations — clubs,
            congregations, volunteer groups, small non-profits — use to run
            themselves. The portal worked, roughly. It was just hard to find your
            way through: buttons that did nothing gave no sign they were disabled,
            and nothing adapted below desktop width.
          </p>
          <p className="prose">
            The organisation didn&apos;t hand me a design. They handed me five
            constraints on <em>how</em> the fix was allowed to happen, and those
            constraints turned out to be the actual brief.
          </p>

          <div className="rules">
            {[
              ['Incremental', 'A screen at a time. No monolithic rewrite, and all tests pass at every step.'],
              ['Reusable layouts', 'Produce modular templates other contributors build their own features on.'],
              ['Every screen size', "Desktop, laptop, tablet, phone — adapt, don't just shrink."],
              ['Weekly cadence', 'Land changes weekly and tell the community what moved.'],
              ['Honest placeholders', 'Planned-but-unbuilt features stay visible and greyed out. No dead ends.'],
            ].map(([name, body], i) => (
              <div className="rule" key={name}>
                <span className="rule-n">0{i + 1}</span>
                <div>
                  <div className="rule-t">{name}</div>
                  <div className="rule-b">{body}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="prose">
            Constraint one is the hard one. A redesign branch that goes quiet for
            two months and comes back with forty conflicting files is a branch
            nobody merges. So I inverted the usual shape of the work: the redesign
            lived on a long-running branch, but I pulled <span className="k">develop</span>{' '}
            into it and pushed it back out roughly every two weeks. Eight merge PRs
            across the summer, each small enough that someone would actually review
            it.
          </p>
          <p className="prose">
            The side effect mattered more than the merges themselves. Because the
            new layout kept landing in <span className="k">develop</span>, the other
            GSoC contributors were always building <em>on</em> it rather than against
            it. By the end they had extended my drawer component into two of their
            own without asking me for anything.
          </p>
        </div>
      </section>

      <section className="section alt" id="deleting">
        <div className="wrap narrow">
          <span className="section-tag">Feb – Apr 2023</span>
          <h2>A month of not designing</h2>
          <p className="prose">
            Before selection and through community bonding, I didn&apos;t touch the
            visual design. I spent the time deleting things. The codebase had two
            complete design systems installed at once — Ant Design and Bootstrap —
            so every new screen picked one, and the picks were inconsistent. There
            was a <span className="k">src/css</span> folder holding an unused
            Bootstrap <em>5</em> stylesheet while the project ran Bootstrap{' '}
            <em>4</em>. And there were two screen-list components,{' '}
            <span className="k">SuperDashListCard</span> and{' '}
            <span className="k">AdminDashListCard</span>, with the same markup and
            the same CSS, differing only in whether a button read
            &ldquo;Manage&rdquo; or &ldquo;View&rdquo;.
          </p>
          <p className="prose">
            Redesigning on top of that would have meant redesigning everything
            twice. So Ant Design came out entirely, the dead CSS went, the
            duplication got collapsed. Slower for four weeks. Much faster for the
            four months after.
          </p>
          <p className="prose">
            This is also where the pattern for the rest of the project got set:{' '}
            <em>when the frontend problem is actually a backend problem, go fix the
            backend.</em> Organisation images were rendering as broken because the
            API returned relative paths like <span className="k">image/{'{fileName}'}</span>,
            which fell apart the moment the server moved. I could have prefixed a
            base URL client-side. Instead I wrote the resolver in{' '}
            <span className="k">talawa-api</span>, with tests.
          </p>
        </div>
      </section>

      <section className="section" id="theming">
        <div className="wrap narrow">
          <span className="section-tag">Jun 2023 · the theming layer</span>
          <h2>One file to change the brand</h2>
          <p className="prose">
            A redesign is only maintainable if the next contributor can change the
            primary colour in one place and have it propagate. That meant Bootstrap
            5, and it meant compiling Bootstrap from source instead of overriding it
            from outside.
          </p>
          <p className="prose">
            Bootstrap 5 drops class-based modals for component-based ones. Doing
            that upgrade <em>after</em> the redesign would have meant migrating
            every newly built screen a second time — so the upgrade came first: raw{' '}
            <span className="k">button</span> and <span className="k">input</span>{' '}
            elements swapped for <span className="k">Button</span> and{' '}
            <span className="k">Form.Control</span>, class-based modals swapped for
            react-bootstrap ones, <span className="k">popper.js</span> and{' '}
            <span className="k">react-modal</span> dropped from the tree.
          </p>
          <p className="prose">
            Then the part I&apos;m still happiest with. Instead of shipping a
            stylesheet that fights Bootstrap&apos;s defaults with more specific
            selectors, I inserted the project&apos;s own variables <em>between</em>{' '}
            Bootstrap&apos;s functions and Bootstrap&apos;s variables. Sass takes
            the first definition it sees, so declaring{' '}
            <span className="k">$primary</span> before importing Bootstrap&apos;s
            variables means Bootstrap builds itself in Talawa&apos;s colours. No
            overrides, no specificity war.
          </p>

          <figure className="code">
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

          <figure className="code">
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

          <div className="swatches">
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

          <p className="prose" style={{ marginTop: 30 }}>
            Underneath <span className="k">_talawa.scss</span> sits a partial per
            Bootstrap component — accordion, alert, badge, breadcrumb, buttons,
            card, dropdown, modal, navbar, pagination, spinners, plus forms and
            typography. It mirrors Bootstrap&apos;s own structure deliberately, so a
            contributor who knows where something lives in Bootstrap knows where to
            change it here. The whole layer went from nothing to 31 files in a
            single PR, and I documented how to use it in{' '}
            <span className="k">CODE_STYLE.md</span> in the same breath — an
            undocumented convention is a convention nobody follows.
          </p>
          <p className="prose">
            One deliberate omission: I left the Organization Events screen
            unmigrated. Another GSoC contributor was rewriting that screen from
            scratch that same month, so fixing its failing tests would have been
            work thrown straight in the bin. I said so in the PR description
            instead of quietly leaving a gap.
          </p>
        </div>
      </section>

      <section className="section alt" id="primitives">
        <div className="wrap narrow">
          <span className="section-tag">Jul – Aug 2023 · layout primitives</span>
          <h2>Building the things other people build on</h2>
          <p className="prose">
            Constraint two asked for modular templates other contributors could
            use. This is the chapter where that either happened or didn&apos;t —
            and the file tree settles the argument.
          </p>
          <p className="prose">
            PR #950 was the structural one. <span className="k">LeftDrawer</span>{' '}
            and <span className="k">SuperAdminScreen</span> were written from
            scratch, with tests. The two duplicate list cards were replaced by a
            single <span className="k">OrgListCard</span>, and the
            admin-versus-superadmin decision was lifted <em>up</em> into the parent
            screen — so a card either renders or it doesn&apos;t, rather than
            rendering itself into a disabled state. Same PR: admins had the
            organisation search box hidden from them for no reason I could find.
            Admins search for organisations too. It went back in.
          </p>
          <p className="prose">
            The evidence that constraint two was actually met isn&apos;t in my PRs.
            It&apos;s in what other people did with the component afterwards.
          </p>

          <figure className="code">
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

          <p className="prose">
            Two derivative drawers I never wrote, built by contributors who
            didn&apos;t need to ask me how. That&apos;s the constraint met, and
            it&apos;s the part of the project I&apos;d point at first.
          </p>
          <p className="prose">
            The rest of #950 was the unglamorous half of good UI: shimmer loading
            states, real empty states, and <em>no results for &ldquo;{'<query>'}&rdquo;</em>{' '}
            messaging across the Organizations, Requests and Roles screens — so a
            screen with nothing on it tells you why instead of just being blank.
          </p>
        </div>
      </section>

      <section className="section" id="shipping">
        <div className="wrap narrow">
          <span className="section-tag">Sep – Oct 2023 · shipping</span>
          <h2>The last mile</h2>
          <p className="prose">
            The final stretch was three screens and the things that only matter
            once a portal is genuinely used: infinite scroll on Organizations,
            Requests and Users; translations across every page; a redesigned
            forgot-password flow; a delete-organisation modal whose colour and
            wording made the consequence obvious.
          </p>
          <p className="prose">
            One small decision I&apos;d defend in any review. The language switcher
            had been sitting on <em>every single screen</em> of the portal.
            Language is a set-once preference — nobody changes the language they
            read in halfway through approving a membership request. It moved into
            Settings. One extra click for the rare person who switches; a quieter
            header on every screen for everyone else.
          </p>
          <p className="prose">
            Settings got restructured around the same logic: membership requests
            moved out to their own screen, the user-detail and credential tabs were
            handed to the contributor who owned that area, and what remained was
            the three things that genuinely belong to an organisation&apos;s
            settings.
          </p>
          <p className="prose">
            PR #1006 merged to <span className="k">master</span> on 24 October 2023.
            Its &ldquo;Other information&rdquo; field says, in full:{' '}
            <span className="k">GSoC 2023</span>.
          </p>
        </div>
      </section>

      <section className="section" id="design">
        <div className="wrap narrow">
          <span className="section-tag">Design</span>
          <h2>Wireframes and Figma</h2>
          <p className="prose">
            The redesign started as low-fidelity wireframes before any code
            changed — the Figma file below is where the drawer layout, the
            organisation cards, and the settings restructuring were worked out
            first.
          </p>
          <div className="figma-embed">
            <iframe
              title="Talawa Admin UI Redesign — Figma"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FdTGr5CnGHvkilU5nwnRXg2%2FTalawa-Admin-UI-Redesign"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="section alt" id="gallery">
        <div className="wrap">
          <span className="section-tag">Evidence</span>
          <h2>Every screenshot, recovered</h2>
          <p className="section-lede">
            All {total} assets posted across the pull request bodies at the time of
            review, with the captions written around them. Click to enlarge.
          </p>
          <div style={{ marginTop: 28 }}>
            <Gallery shots={shots} />
          </div>
        </div>
      </section>
    </>
  );
}
