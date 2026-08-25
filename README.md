# GSoC 2023 — Talawa Admin UI Redesign

A case study of my Google Summer of Code 2023 project with [The Palisadoes
Foundation](https://www.palisadoes.org/): redesigning the admin UI of
[Talawa](https://github.com/PalisadoesFoundation), an open-source community
management platform.

Mentors: Anwer Sayeed, Muskan Modi.

Assembled from the public pull request history of
[`talawa-admin`](https://github.com/PalisadoesFoundation/talawa-admin) and
[`talawa-api`](https://github.com/PalisadoesFoundation/talawa-api) — 27
merged PRs, Feb–Oct 2023.

Next.js · App Router · TypeScript strict · static export · no runtime
dependencies beyond React.

---

## Quick start

```bash
npm install
npm run shots      # download the screenshots into public/shots — do this first
npm run dev        # http://localhost:3000
```

To produce the deployable static site:

```bash
npm run build      # emits ./out
```

Node 18+. `npm run shots` needs no token — both repos are public.

---

## Why `npm run shots` is not optional

The site builds and runs without it, but most screenshots render as dashed
placeholders. That's deliberate, and it isn't fixable by hotlinking.

GitHub serves pull request attachments from
`github.com/<org>/<repo>/assets/<uid>/<guid>`. That URL is not an image. It's
a 302 to a signed S3 link:

```
location: https://github-production-user-asset-6210df.s3.amazonaws.com/...
          ?X-Amz-Expires=300&X-Amz-Signature=...
```

`X-Amz-Expires=300` — five minutes. The signature is dead long before a
visitor loads the page, so those URLs can never work from a static site.
`scripts/fetch-shots.mjs` follows the redirect once and keeps the bytes.

The four oldest PRs (#498, #512, #534, #543) predate that scheme and sit on
`user-images.githubusercontent.com`, which is permanent. Those assets
hotlink fine, which is why the before/after sliders have working "before"
images out of the box.

**Commit `public/shots/` to the repo.** `.gitignore` deliberately does not
exclude it. These files cannot be reliably re-fetched later.

`public/shots` is read with `fs` in a server component at build time, so
whatever is on disk when you run `npm run build` is what ships. Add a
screenshot, rebuild, it appears — no manifest edit needed.

---

## Layout

```
app/
  layout.tsx           metadata, fonts, lightbox provider, scroll-reveal
  page.tsx             the case study — 9 chapters, server component
  globals.css          palette derived from the project's own design tokens
components/
  BeforeAfter.tsx      drag-to-compare slider          (client)
  Gallery.tsx          all assets                       (server)
  LightboxProvider.tsx context + overlay               (client)
  Rail.tsx             sticky chapter nav, ≥1400px     (client)
  Reveal.tsx           IntersectionObserver fade-up    (client)
  Shot.tsx             one screenshot, or a placeholder (client)
  Timeline.tsx         all 27 PRs by phase             (server)
lib/
  data.ts              typed PR dataset — 27 PRs
  format.ts            pure helpers, safe for client bundles
  shots.ts             build-time filesystem resolution, server only
scripts/
  fetch-shots.mjs      downloads the screenshots
  manifest.json        assets → stable local filenames
content/
  narration-script.md  spoken walkthrough, ~9 min, for a video version
```

### One structural rule

`lib/shots.ts` imports `node:fs`. Anything a `'use client'` component
imports gets bundled for the browser, so **client components must import
from `lib/format.ts`, never from `lib/shots.ts`.** That's why the two files
exist. Crossing that line is a build error, not a runtime surprise — which
is how it should be.

---

## Editing

**PR notes and phase blurbs** — `lib/data.ts`. Every PR has a `note`; every
phase a `blurb`. Plain strings, fully typed.

**Narrative prose** — `app/page.tsx`. Each chapter is a `<section
className="ch">` with an `id` matching an entry in `CHAPTERS` at the top of
the file. Add a chapter, add its id to that array, and it appears in the
rail automatically.

**A new before/after pair:**

```tsx
<div className="reveal">
  <BeforeAfter
    label="Organisation dashboard"
    before={side('pr512-02.png')}
    after={side('pr972-01.png')}
    note="What changed, and why it was the right call."
  />
</div>
```

`side()` resolves a filename against the dataset. If either file is absent
from `public/shots` the slider degrades to a labelled note instead of
breaking.

---

## Things I could not recover — fill these in

Marked on the site with a dashed amber `✎`. They're what turns a changelog
into a portfolio piece.

| Where | What's needed |
|---|---|
| Chapter 04 | More before/after pairs. Only four exist; it's the most persuasive section on the page. |
| Chapter 06 | The Figma file. Not in git history, not linked from any PR. Publish to web and paste the embed, or say plainly that it's gone. |
| Footer | What happened after GSoC, and a link to a final report or blog. |
| `content/narration-script.md` §06 | "What I'd do differently." The only section a reader can't get from the PR list. |

---

## Deploying

Static export, so anything that serves files works.

**Vercel** — import the repo. Zero config; it detects Next.js.

**Netlify** — build `npm run build`, publish `out`.

**GitHub Pages** — needs a base path, since the site lives under `/<repo>/`:

```bash
BASE_PATH=/GSoC-2023 npm run build
touch out/.nojekyll     # or Pages will hide the _next directory
```

Then publish `out/`. `next.config.mjs` reads `BASE_PATH` and threads it
through.

Run `npm run shots` and commit `public/shots/` **before** deploying, or the
live site ships with placeholders.

---

## Notes on choices

**Static export over SSR.** Nothing here is dynamic. `output: 'export'`
means it deploys anywhere and costs nothing to host.

**`<img>` over `next/image`.** Static export disables the image optimiser,
so `next/image` would add API surface for no benefit. The screenshots are
lazy-loaded and modestly sized. The ESLint rule is disabled inline where
that's deliberate.

**Fonts via `<link>`, not `next/font`.** `next/font` fetches from Google at
build time, which breaks builds in sandboxed or offline CI. Switch to
`next/font` if the build environment has network access — it's a strict
improvement when it works.

**Reduced motion.** Both the CSS and `Reveal.tsx` check
`prefers-reduced-motion`. Everything is visible and usable with animation
off.

---

## Verification

Numbers on the site were checked against git rather than the GitHub API:

- **27 PRs**, all merged — `is:pr org:PalisadoesFoundation
  author:rishav-jha-mech`, cross-checked against `refs/pull/<n>/head` for
  every PR number, since squash-merges on the default branch alone
  undercount PRs that were folded into a later batch merge
- **0 → 31 Sass partials** in PR #929, 33 by PR #1006 — `git ls-tree -r`
- **Card consolidation** — `AdminDashListCard` and `SuperDashListCard`
  present at PR #942, absent at PR #950, `OrgListCard` in their place
- **Reuse by others** — `LeftDrawerOrg` and `LeftDrawerEvent` exist at PR
  #1006 and were not authored by this contributor

Reproduce with:

```bash
git clone --filter=blob:none --no-checkout \
  https://github.com/PalisadoesFoundation/talawa-admin.git
cd talawa-admin
git fetch origin refs/pull/950/head:pr950
git ls-tree -r --name-only pr950 | grep components/
```

The default branch's 2023 history has been squashed, so `refs/pull/<n>/head`
is the only route back to that code.

Lines-changed statistics are deliberately absent from the narrative. GitHub
deletes `refs/pull/<n>/merge` once a PR closes, so exact diffs can't be
reconstructed from the squashed history for every PR — and an estimate
presented as a fact is worse than no number.
