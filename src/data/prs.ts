export type PullRequest = {
  number: number;
  repo: "talawa-admin" | "talawa-api";
  date: string;
  title: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
  url: string;
};

/**
 * Verified against `git log --author=rishav-jha-mech` on the default branches
 * of PalisadoesFoundation/talawa-admin and PalisadoesFoundation/talawa-api.
 * Line counts are exact (`git show --stat` on the squash-merge commit), not
 * estimates.
 */
export const pullRequests: PullRequest[] = [
  { number: 498, repo: "talawa-admin", date: "2023-02-26", title: "Added dropdown for AppLanguage in UserUpdation form", filesChanged: 7, insertions: 21, deletions: 19, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/498" },
  { number: 512, repo: "talawa-admin", date: "2023-03-02", title: "Display and choose Organisation image", filesChanged: 12, insertions: 471, deletions: 97, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/512" },
  { number: 534, repo: "talawa-admin", date: "2023-03-06", title: "Fixed navbar, added tests", filesChanged: 8, insertions: 29, deletions: 12, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/534" },
  { number: 543, repo: "talawa-admin", date: "2023-03-10", title: "Profile page for members", filesChanged: 18, insertions: 1226, deletions: 31, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/543" },
  { number: 1100, repo: "talawa-api", date: "2023-03-03", title: "Org image link resolver, with tests", filesChanged: 4, insertions: 108, deletions: 0, url: "https://github.com/PalisadoesFoundation/talawa-api/pull/1100" },
  { number: 852, repo: "talawa-admin", date: "2023-04-09", title: "Code duplication removed", filesChanged: 22, insertions: 96, deletions: 139, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/852" },
  { number: 860, repo: "talawa-admin", date: "2023-04-09", title: "Unused packages removed, flag-icons updated", filesChanged: 6, insertions: 14, deletions: 359, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/860" },
  { number: 862, repo: "talawa-admin", date: "2023-04-18", title: "Fixed crashing on error in Block/Unblock page", filesChanged: 3, insertions: 89, deletions: 7, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/862" },
  { number: 890, repo: "talawa-admin", date: "2023-04-18", title: "Fixed auth header getting copied on login", filesChanged: 1, insertions: 5, deletions: 2, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/890" },
  { number: 891, repo: "talawa-admin", date: "2023-04-18", title: "Removed and replaced Ant Design from the project", filesChanged: 7, insertions: 6, deletions: 1385, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/891" },
  { number: 896, repo: "talawa-admin", date: "2023-04-21", title: "Documentation updated, redundant CSS files removed", filesChanged: 4, insertions: 24, deletions: 9489, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/896" },
  { number: 927, repo: "talawa-admin", date: "2023-06-14", title: "Merge latest AdminUI Redesign into Develop", filesChanged: 43, insertions: 1219, deletions: 1307, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/927" },
  { number: 934, repo: "talawa-admin", date: "2023-07-02", title: "Merge latest Admin UI Redesign into Develop", filesChanged: 53, insertions: 15910, deletions: 68, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/934" },
  { number: 946, repo: "talawa-admin", date: "2023-07-17", title: "Make Talawa Admin mutations in sync with the backend", filesChanged: 4, insertions: 17, deletions: 164, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/946" },
  { number: 947, repo: "talawa-admin", date: "2023-07-21", title: "Merge AdminUI-Redesign into Develop", filesChanged: 48, insertions: 904, deletions: 1288, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/947" },
  { number: 1376, repo: "talawa-api", date: "2023-08-17", title: "Added absolute URL for checkAuth query", filesChanged: 2, insertions: 4, deletions: 0, url: "https://github.com/PalisadoesFoundation/talawa-api/pull/1376" },
  { number: 950, repo: "talawa-admin", date: "2023-08-12", title: "Merge latest AdminUI-Redesign — AdminDashListCard/SuperDashListCard replaced by OrgListCard", filesChanged: 48, insertions: 2644, deletions: 2362, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/950" },
  { number: 956, repo: "talawa-admin", date: "2023-08-29", title: "Merge latest AdminUI Redesign into develop", filesChanged: 78, insertions: 3578, deletions: 2991, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/956" },
  { number: 972, repo: "talawa-admin", date: "2023-09-09", title: "Merge latest AdminUI Redesign into develop", filesChanged: 60, insertions: 2116, deletions: 2242, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/972" },
  { number: 1006, repo: "talawa-admin", date: "2023-10-31", title: "Merge latest AdminUI Redesign into Master", filesChanged: 42, insertions: 3424, deletions: 1134, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/1006" },
  { number: 1411, repo: "talawa-api", date: "2023-10-24", title: "Added Change User Role in Organization mutation", filesChanged: 10, insertions: 777, deletions: 3, url: "https://github.com/PalisadoesFoundation/talawa-api/pull/1411" },
  { number: 1320, repo: "talawa-admin", date: "2023-12-30", title: "Refactor / improve UI org list", filesChanged: 1, insertions: 1, deletions: 1, url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/1320" },
];
