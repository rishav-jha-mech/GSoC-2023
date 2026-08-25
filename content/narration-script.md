# Narration script — "Redesigning Talawa Admin"

A spoken walkthrough of the project, roughly 8–9 minutes at a normal pace.
Written to be read aloud, so the sentences are shorter than the ones on the site.

`[SCREEN: …]` cues tell you what to show. Filenames refer to `shots/`, which
`node scripts/fetch-shots.mjs` populates.

Everything in **bold brackets** is a gap only you can fill. Don't record around
them — they're the parts that make it yours rather than a summary of a changelog.

---

## 00 · Cold open (0:00 – 0:35)

`[SCREEN: shots/pr512-01.png — the old organisations list, held for a few seconds]`

> This is the Talawa admin portal in February 2023.
>
> Talawa is an open source app for community organisations — clubs, congregations,
> volunteer groups, small non-profits. This screen is what an administrator sees
> first. And there is a lot wrong with it. There's no way to search. Nothing tells
> you it's loading. Several of these buttons do nothing at all, and nothing about
> them says so.
>
> I spent five months rebuilding this, as a Google Summer of Code contributor with
> The Palisadoes Foundation. This is what I changed and, more usefully, why.

**[Say your name here, and one sentence on where you were at the time — student,
first open source project, whatever's true. People trust a voice with a position.]**

---

## 01 · The brief that wasn't a design (0:35 – 1:40)

`[SCREEN: the five constraints, chapter 00 of the site]`

> Here's the thing that shaped the whole project. Nobody gave me a design to build.
> They gave me five constraints on how the work was allowed to happen.
>
> Ship a screen at a time. Keep all the tests passing. Make layouts other people can
> reuse. Work at every screen size. Land changes weekly and tell everyone what moved.
> And leave unbuilt features visible but greyed out, so nobody clicks into a dead end.
>
> The first one is the hard one. Because I wasn't working alone — six other Summer
> of Code contributors were writing features into this same codebase at the same time.
>
> And a redesign branch that goes quiet for two months and comes back with forty
> conflicting files is a branch nobody merges. Ever. I've seen it happen.

**[If you had a moment early on where you realised the branch strategy mattered more
than the design — a conflict that took a day to untangle, a mentor pushing back on
scope — this is where it goes. 30 seconds. It's the most relatable part of the story.]**

---

## 02 · A month of deleting things (1:40 – 3:00)

`[SCREEN: PR #891 on GitHub, "Removed and Replaced Ant Design from the project"]`

> So the first month, I didn't design anything. I deleted things.
>
> The project had two complete design systems installed at the same time — Ant Design
> and Bootstrap. Which meant every new screen picked one, and the picks were
> inconsistent. There was a CSS folder with an unused Bootstrap 5 stylesheet sitting
> in a project that ran Bootstrap 4. Actively misleading for anyone new.
>
> And there were two components — `SuperDashListCard` and `AdminDashListCard` — with
> the same markup, the same CSS, and one difference: whether a button said "Manage"
> or "View".

`[SCREEN: chapter 03 of the site, the git ls-tree comparison]`

> If I'd started redesigning on top of that, I'd have redesigned everything twice.
> So Ant Design came out. The dead CSS went. The duplicate collapsed into one
> component.
>
> Four weeks that produced no visible change at all. And it's the reason the
> remaining four months went as fast as they did.

---

## 03 · The theming layer (3:00 – 4:45)

`[SCREEN: assets/scss/app.scss, chapter 02 of the site]`

> Now the part I'm still happiest with.
>
> A redesign is only worth anything if the next person can change the brand colour in
> one place. The obvious way to do that is to write a stylesheet that overrides
> Bootstrap's defaults. Which works, until you're four levels of specificity deep and
> writing `!important` to win a fight with a framework.
>
> So I did it the other way. Look at the import order here.
>
> Bootstrap's functions and mixins come in first. Then *our* variables. Then
> Bootstrap's own variables, and then Bootstrap itself.
>
> Sass keeps the first definition it sees. So by declaring `$primary` before Bootstrap
> declares it, Bootstrap compiles itself in Talawa's colours from the inside out.
> There's no override. There's no specificity war. Every button, badge, and form
> control in the portal is green because one variable at the top of one file says
> `#31bb6b`.

`[SCREEN: the swatches, then the file tree of scss partials]`

> Underneath that there's a partial per Bootstrap component — buttons, modals,
> navbar, forms, typography. It mirrors Bootstrap's own folder structure on purpose,
> so if you know where a thing lives in Bootstrap you know where to change it here.
>
> That went from zero files to thirty-one in a single pull request. And I wrote the
> documentation for it in the same PR, because an undocumented convention is a
> convention nobody follows.

**[Optional, but strong: change `$primary` live on camera, recompile, show the whole
portal shift colour. Fifteen seconds of screen recording that proves the entire
point of this chapter better than the explanation does.]**

---

## 04 · Building for other people (4:45 – 6:10)

`[SCREEN: PR #950]`

> Constraint two asked for layouts other contributors could reuse. That's the kind of
> goal that's easy to claim and hard to prove.
>
> This PR is where I built the primitives. `LeftDrawer` — the side navigation that
> replaced the top bar. `SuperAdminScreen` — the shell that houses it. And
> `OrgListCard`, replacing those two duplicate cards.
>
> One decision in there I'd defend in any review. The old cards rendered themselves
> into a disabled state when a user didn't have access. I moved that decision up into
> the parent screen. So now a card either renders, or it doesn't exist. A component
> shouldn't have to know who's looking at it.
>
> Also: admins had the organisation search box hidden from them. For no reason I could
> find. Admins search for organisations too. I put it back.

`[SCREEN: the git ls-tree comparison, chapter 03]`

> But here's the actual proof, and it isn't in my pull requests at all.
>
> By October, that drawer component had two children — `LeftDrawerOrg` and
> `LeftDrawerEvent`. I didn't write either of them. Other contributors extended my
> component without needing to ask me how it worked.
>
> That's the constraint met. Not because I said I'd met it.

---

## 05 · The unglamorous half (6:10 – 7:20)

`[SCREEN: before/after slider, chapter 04 — drag it slowly]`

> The visible redesign is the part that photographs well. Most of the actual work was
> states.
>
> Shimmer effects while data loads. Real empty states. And messaging that distinguishes
> "you have no organisations" from "your search for *this specific thing* found nothing" —
> because those are completely different situations and the old portal showed you the
> same blank screen for both.

`[SCREEN: shots/pr972-01.png]`

> The dashboard's most prominent control used to be Delete Organization. I moved that
> to Settings, where destructive actions belong, and gave the space to the five most
> recent events, posts and membership requests — the things you actually opened the
> dashboard to check.
>
> And the language switcher. It was on every single screen. But language is a set-once
> preference. Nobody changes the language they read in halfway through approving a
> membership request. So it moved into Settings. One extra click for the rare person
> who switches, a quieter header on every screen for everyone else.

---

## 06 · What I'd do differently (7:20 – 8:30)

**[This whole section is yours. Do not skip it — it's the part that separates a
portfolio piece from a changelog, and it's the only part a hiring manager can't get
by reading your PR list.]**

Prompts, pick two or three:

- What took far longer than you estimated, and what did you misjudge about it?
- Was there a decision a mentor pushed back on where they turned out to be right?
- The Organization Events screen you deliberately left unmigrated — was that the
  right call, or did it cost someone later?
- You wrote backend PRs on a frontend-scoped project. Was that scope creep or the
  correct instinct?
- What would you tell someone starting a redesign inside a codebase five other
  people are actively changing?

---

## 07 · Close (8:30 – 9:00)

`[SCREEN: the full timeline, chapter 07, scrolling]`

> Twenty-seven pull requests. All merged. Two hundred and fifty-eight commits across
> the frontend and the backend, between February and October 2023.
>
> The final one went to `master` on the 24th of October. In the "other information"
> field I wrote two words: GSoC 2023.

**[Then say where people can find you, and what you're doing now.]**

---

## Recording notes

- Screen-record at 1920×1080 and zoom to 125% in the browser before capturing — code
  is unreadable on a phone otherwise.
- Read the whole script aloud once before recording. Anything you stumble on is
  written wrong, not read wrong. Rewrite it in your own words; the ideas matter,
  the phrasing doesn't.
- Your voice will be more convincing on chapter 06 than on chapter 03, because you
  lived one and are explaining the other. Let that be true rather than flattening
  the whole thing to one tone.
