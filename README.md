# GSoC 2023 — Talawa Admin UI Redesign

My work during Google Summer of Code 2023 with [The Palisadoes
Foundation](https://www.palisadoes.org/), redesigning the admin UI of
[Talawa](https://github.com/PalisadoesFoundation), an open-source community
management platform.

Mentors: Anwer Sayeed, Muskan Modi.

<p align="center">
    <img width="200" src="https://github.com/rishav-jha-mech/GSoC-2023/assets/76212518/14fdbd4c-5f9c-41e7-a5c6-f9ec03bfd6a7" />
</p>

## What changed

- Moved the admin console off Ant Design onto a self-authored Sass component
  system.
- Replaced the separate `AdminDashListCard` / `SuperDashListCard` components
  with a single reusable `OrgListCard` ([PR #950](https://github.com/PalisadoesFoundation/talawa-admin/pull/950)).
- Kept `talawa-api`'s GraphQL layer in sync with the redesigned frontend
  (org image resolver, checkAuth query, change-user-role mutation).
- 23 merged pull requests across `talawa-admin` and `talawa-api`, Feb–Dec
  2023 — see the timeline in this app, or the PRs directly:
  - [talawa-admin PRs](https://github.com/PalisadoesFoundation/talawa-admin/pulls?q=is%3Apr+author%3Arishav-jha-mech)
  - [talawa-api PRs](https://github.com/PalisadoesFoundation/talawa-api/pulls?q=is%3Apr+author%3Arishav-jha-mech)

## Running locally

```bash
yarn install
yarn dev
```

## Stack

Vite, React, TypeScript, Bootstrap, CSS Modules.
