// Generated from the public PR history of PalisadoesFoundation/talawa-admin
// and talawa-api. Safe to edit by hand: every field below is plain data.

export type MediaType = 'image' | 'video';

export interface Media {
  /** Original GitHub URL. Signed /assets/ URLs expire after 5 min — see lib/shots.ts */
  url: string;
  /** Stable local filename under public/shots/ */
  file: string;
  type: MediaType;
  /** Markdown alt text from the PR body */
  alt: string;
  /** Nearest preceding heading in the PR body, if any */
  section: string | null;
}

export interface PullRequest {
  number: number;
  repo: 'talawa-admin' | 'talawa-api';
  title: string;
  url: string;
  created: string;
  closed: string;
  merged: boolean;
  comments: number;
  /** What it changed and why, condensed from the original PR description */
  note: string;
  media: Media[];
}

export interface Phase {
  id: string;
  name: string;
  when: string;
  blurb: string;
  prs: PullRequest[];
}

export const META = {
  contributor: 'Rishav Jha',
  handle: 'rishav-jha-mech',
  org: 'The Palisadoes Foundation',
  project: 'Admin: UI Redesign',
  year: 2023,
  mentors: ['Anwer Sayeed', 'Muskan Modi'],
  prCount: 27,
  commits2023: 258,
  scssPartials: 33,
} as const;

export const PHASES: Phase[] = [
  {
    id: "00",
    name: "Getting in",
    when: "feb – apr 2023",
    blurb:
      "Contributions made before and around selection. Most of this is cleanup: the codebase had two competing design systems, dead CSS and duplicated screens. Removing that was the precondition for redesigning anything.",
    prs: [
      {
        number: 498,
        repo: "talawa-admin",
        title: "Added dropdown for Applanguage in UserUpdation form",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/498",
        created: "2023-02-23",
        closed: "2023-02-25",
        merged: true,
        comments: 5,
        note:
          "Application language was a free-text field. Replaced it with a constrained dropdown so the value always matches a supported locale.",
        media: [
          {
            file: "pr498-01.png",
            type: "image",
            alt: "Talawa Setting - Google Chrome 23-02-2023 05_25_40",
            section: null,
            url: "https://user-images.githubusercontent.com/76212518/220811508-d52f866c-1b96-40ea-bbac-e96758694dd0.png",
          },
        ],
      },
      {
        number: 512,
        repo: "talawa-admin",
        title: "Display and choose Organisation image",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/512",
        created: "2023-02-26",
        closed: "2023-03-01",
        merged: true,
        comments: 4,
        note:
          "Organisation images were not rendering across screens. Added display + upload, and a placeholder for organisations with no image set.",
        media: [
          {
            file: "pr512-01.png",
            type: "image",
            alt: "Organisation List",
            section: "When image exists",
            url: "https://user-images.githubusercontent.com/76212518/221405826-f420cddf-7e26-4168-a64a-cad418dd02f2.png",
          },
          {
            file: "pr512-02.png",
            type: "image",
            alt: "Organisation dashboard",
            section: "When image exists",
            url: "https://user-images.githubusercontent.com/76212518/221405831-b5401133-9d0a-416f-aed1-601f0e1c3622.png",
          },
          {
            file: "pr512-03.png",
            type: "image",
            alt: "Talawa Dashboard - Google Chrome 26-02-2023 16_34_02",
            section: "When image does not exist",
            url: "https://user-images.githubusercontent.com/76212518/221406619-c41a81cd-8c80-467f-81fc-a1b413f3b3fa.png",
          },
        ],
      },
      {
        number: 1100,
        repo: "talawa-api",
        title: "Org image link resolver made with tests",
        url: "https://github.com/PalisadoesFoundation/talawa-api/pull/1100",
        created: "2023-03-01",
        closed: "2023-03-03",
        merged: true,
        comments: 5,
        note:
          "Backend fix behind the image work: the API returned relative paths like image/{fileName}, which broke once the server moved. Added a resolver to return absolute URLs, with tests.",
        media: [],
      },
      {
        number: 534,
        repo: "talawa-admin",
        title: "Fixed navbar added tests",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/534",
        created: "2023-03-06",
        closed: "2023-03-06",
        merged: true,
        comments: 1,
        note:
          "Navbar was broken on several routes. Fixed it and backfilled tests so the regression couldn't return silently.",
        media: [
          {
            file: "pr534-01.png",
            type: "image",
            alt: "Talawa Dashboard",
            section: null,
            url: "https://user-images.githubusercontent.com/76212518/223024399-fb69bbaa-e661-4072-80a7-b2c15ddf8cfb.png",
          },
        ],
      },
      {
        number: 543,
        repo: "talawa-admin",
        title: "Profile Page for Members",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/543",
        created: "2023-03-07",
        closed: "2023-03-09",
        merged: true,
        comments: 6,
        note:
          "Added a member profile page so an admin could actually see who a user is, instead of a row in a table.",
        media: [
          {
            file: "pr543-01.png",
            type: "image",
            alt: "User Details - Google Chrome 07-03-2023 17_14_36",
            section: null,
            url: "https://user-images.githubusercontent.com/76212518/223413436-7f732b9f-1dcf-43d5-9478-b1913e37a06f.png",
          },
          {
            file: "pr543-02.png",
            type: "image",
            alt: "User Details - Google Chrome 07-03-2023 17_14_43",
            section: null,
            url: "https://user-images.githubusercontent.com/76212518/223413003-aa9703ce-5cf6-4482-931e-d3ed9dacb776.png",
          },
        ],
      },
      {
        number: 852,
        repo: "talawa-admin",
        title: "Code duplicacy removed",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/852",
        created: "2023-04-06",
        closed: "2023-04-09",
        merged: true,
        comments: 2,
        note:
          "Removed duplicated code across screens ahead of the redesign — less surface area to redesign twice.",
        media: [],
      },
      {
        number: 860,
        repo: "talawa-admin",
        title: "Unused packages removed, flag icons package updated to latest version",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/860",
        created: "2023-04-09",
        closed: "2023-04-09",
        merged: true,
        comments: 9,
        note:
          "Dropped unused packages and updated the flag-icons dependency. Shrinking the dependency tree before adding to it.",
        media: [],
      },
      {
        number: 862,
        repo: "talawa-admin",
        title: "Fixed crashing on error in Block/Unblock page",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/862",
        created: "2023-04-09",
        closed: "2023-04-18",
        merged: true,
        comments: 24,
        note:
          "Block/Unblock page crashed on a failed query instead of showing an error state.",
        media: [],
      },
      {
        number: 890,
        repo: "talawa-admin",
        title: "Fixed Authorization header getting copied on login",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/890",
        created: "2023-04-18",
        closed: "2023-04-18",
        merged: true,
        comments: 2,
        note:
          "The Authorization header was being carried over on login, causing stale-auth bugs.",
        media: [],
      },
      {
        number: 891,
        repo: "talawa-admin",
        title: "Removed and Replaced Ant Design from the project",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/891",
        created: "2023-04-18",
        closed: "2023-04-18",
        merged: true,
        comments: 5,
        note:
          "Ant Design and Bootstrap were both in the tree, two design systems fighting each other. Removed Ant Design entirely so there was one system to redesign against.",
        media: [],
      },
      {
        number: 896,
        repo: "talawa-admin",
        title: "Documentation updated, Redundant css files removed",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/896",
        created: "2023-04-20",
        closed: "2023-04-21",
        merged: true,
        comments: 2,
        note:
          "Removed a stray css folder holding an unused Bootstrap 5 stylesheet while the project ran Bootstrap 4 — actively misleading for anyone new to the codebase.",
        media: [],
      },
    ],
  },
  {
    id: "01",
    name: "Foundations",
    when: "jun 2023",
    blurb:
      "Coding period opens. Rather than start on screens, the first month went into the substrate: conventions, a current Bootstrap, and themeable Sass — so every later screen could be changed in one place.",
    prs: [
      {
        number: 917,
        repo: "talawa-admin",
        title: "Updated CODE_STYLE.md",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/917",
        created: "2023-06-01",
        closed: "2023-06-04",
        merged: true,
        comments: 9,
        note:
          "Documented the conventions the redesign would follow, in CODE_STYLE.md, before writing redesign code.",
        media: [],
      },
      {
        number: 925,
        repo: "talawa-admin",
        title: "Upgrade and Migrate from Bootstrap 4 to Bootstrap 5",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/925",
        created: "2023-06-10",
        closed: "2023-06-12",
        merged: true,
        comments: 6,
        note:
          "Migrated Bootstrap 4 to 5 and react-bootstrap to latest. Swapped raw HTML for component equivalents (button to Button, input to Form.Control, class-based modals to react-bootstrap Modals). Removed popper.js and react-modal. Deliberately left the Organization Events screen alone — another GSoC contributor was rewriting it, so fighting its failing tests would have been wasted work.",
        media: [],
      },
      {
        number: 926,
        repo: "talawa-admin",
        title: "Fixed Merge conflict with the develop branch",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/926",
        created: "2023-06-13",
        closed: "2023-06-14",
        merged: true,
        comments: 4,
        note:
          "Resolved conflicts between the long-running redesign branch and develop.",
        media: [],
      },
      {
        number: 927,
        repo: "talawa-admin",
        title: "Merge latest adminUI-Redesign into Develop",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/927",
        created: "2023-06-14",
        closed: "2023-06-14",
        merged: true,
        comments: 3,
        note:
          "First merge of the redesign branch back into develop.",
        media: [],
      },
      {
        number: 929,
        repo: "talawa-admin",
        title: "Customised Bootstrap",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/929",
        created: "2023-06-21",
        closed: "2023-06-23",
        merged: true,
        comments: 3,
        note:
          "Added customisable Sass and a compiler so Bootstrap's variables could be themed centrally instead of overridden screen by screen. Documented how in CODE_STYLE.md.",
        media: [],
      },
      {
        number: 934,
        repo: "talawa-admin",
        title: "Merge latest Admin UI Redesign into Develop",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/934",
        created: "2023-06-28",
        closed: "2023-07-01",
        merged: true,
        comments: 4,
        note:
          "Second merge back into develop.",
        media: [],
      },
    ],
  },
  {
    id: "02",
    name: "Screens",
    when: "jul – aug 2023",
    blurb:
      "The layout primitives (LeftDrawer, SuperAdminScreen) and the first redesigned screens, merged back to develop in slices so other contributors could build on them mid-flight.",
    prs: [
      {
        number: 938,
        repo: "talawa-admin",
        title: "Merge conflict fixed, merge latest develop into adminUI-redesign",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/938",
        created: "2023-07-01",
        closed: "2023-07-01",
        merged: true,
        comments: 2,
        note:
          "Pulled develop back into the redesign branch and fixed conflicts — keeping the branch shallow rather than letting it drift.",
        media: [],
      },
      {
        number: 942,
        repo: "talawa-admin",
        title: "Merge Revamped Homepage into adminUI-redesign",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/942",
        created: "2023-07-05",
        closed: "2023-07-17",
        merged: true,
        comments: 6,
        note:
          "Revamped, fully responsive home screen. Temporarily fixed the top navigation overlap, flagged in the PR as a stopgap to be properly fixed later rather than quietly left.",
        media: [
          {
            file: "pr942-01.png",
            type: "image",
            alt: "Talawa Admin - Google Chrome 05-07-2023 14_30_20",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/5083442a-611f-4006-910d-387491a78c9f",
          },
          {
            file: "pr942-02.png",
            type: "image",
            alt: "Talawa Admin - Google Chrome 05-07-2023 14_30_33",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/f69e6d37-572e-4eda-bfbb-5385e334adee",
          },
          {
            file: "pr942-03.png",
            type: "image",
            alt: "Screenshot_2023-07-05-14-35-27-523_com android chrome",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/69002758-7cc6-46a0-a6ba-3fa1a7e20d02",
          },
          {
            file: "pr942-04.png",
            type: "image",
            alt: "Screenshot_2023-07-05-14-36-05-816_com android chrome",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/53fe9aa8-f8d0-4ff1-a749-d42895b372f7",
          },
          {
            file: "pr942-05.png",
            type: "image",
            alt: "Screenshot_2023-07-05-14-36-08-492_com android chrome",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/265695eb-1d5c-4366-aadf-41ce304204d1",
          },
        ],
      },
      {
        number: 946,
        repo: "talawa-admin",
        title: "Make Talawa-Admin mutations in sync with the backend",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/946",
        created: "2023-07-13",
        closed: "2023-07-17",
        merged: true,
        comments: 4,
        note:
          "Frontend mutations had drifted from the API. Removed updateSpamNotification, which no longer existed backend-side and was silently breaking the notification modal.",
        media: [],
      },
      {
        number: 947,
        repo: "talawa-admin",
        title: "Merge AdminUI-Redesign into Develop",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/947",
        created: "2023-07-20",
        closed: "2023-07-20",
        merged: true,
        comments: 3,
        note:
          "Third merge back into develop.",
        media: [],
      },
      {
        number: 950,
        repo: "talawa-admin",
        title: "Merge latest adminUI-Redesign",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/950",
        created: "2023-07-30",
        closed: "2023-08-12",
        merged: true,
        comments: 5,
        note:
          "The big structural PR. Built LeftDrawer and SuperAdminScreen from scratch with tests. Collapsed SuperDashListCard and AdminDashListCard — identical except for one button label — into a single OrgListCard, and moved the admin/superadmin branching up into the parent. Gave admins the organisation search that had been hidden from them. Added shimmer loading, empty states, and no-results-for-this-query messaging across Organizations, Requests and Roles.",
        media: [
          {
            file: "pr950-01.mp4",
            type: "video",
            alt: "",
            section: "New login experience for Superadmin",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/a86a35af-4a80-4ad1-9eef-00856f29d194",
          },
          {
            file: "pr950-02.mp4",
            type: "video",
            alt: "",
            section: "When organizations are present for Superadmin",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/5e98d6a5-51db-43ec-b518-5865e91cd315",
          },
          {
            file: "pr950-03.png",
            type: "image",
            alt: "No results in Organizations Screen",
            section: "When no results available for a search",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/186cef42-727f-4a37-8a47-394fdcf03513",
          },
          {
            file: "pr950-04.png",
            type: "image",
            alt: "No results in Requests Screen",
            section: "When no results available for a search",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/1f78700c-1089-4b18-bca5-78a7c19652af",
          },
          {
            file: "pr950-05.png",
            type: "image",
            alt: "No results in Roles Screen",
            section: "When no results available for a search",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/b4917f2a-beb2-4182-bf95-df2a8a65b670",
          },
          {
            file: "pr950-06.png",
            type: "image",
            alt: "Organizations screen",
            section: "Organizations, Requests and Roles screen for Superadmin with data",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/3392cadb-9a5d-4fea-99d3-a4e4c32c5d2d",
          },
          {
            file: "pr950-07.png",
            type: "image",
            alt: "Requests screen",
            section: "Organizations, Requests and Roles screen for Superadmin with data",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/f0dedd70-77b7-45fa-8e7b-af7bd0990ef9",
          },
          {
            file: "pr950-08.png",
            type: "image",
            alt: "Roles screen",
            section: "Organizations, Requests and Roles screen for Superadmin with data",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/6bd00fe9-55c3-4808-864b-0d51695e64ab",
          },
          {
            file: "pr950-09.png",
            type: "image",
            alt: "Empty orgs screen for admin",
            section: "Organizations screen for Admin when user is not an Admin for any organization",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/be8ce3e4-1507-4e15-864a-103bd018de90",
          },
          {
            file: "pr950-10.png",
            type: "image",
            alt: "orgs for admin",
            section: "Organizations screen for Admin when he is Admin for some organizations",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/c6e2c0a0-24a8-4528-b493-eedbc8230ef9",
          },
        ],
      },
      {
        number: 1376,
        repo: "talawa-api",
        title: "[Talawa AdminUI-Redesign] Added absolute url for checkAuth query",
        url: "https://github.com/PalisadoesFoundation/talawa-api/pull/1376",
        created: "2023-08-13",
        closed: "2023-08-17",
        merged: true,
        comments: 1,
        note:
          "API-side fix so checkAuth returned an absolute URL for the redesigned client.",
        media: [],
      },
      {
        number: 956,
        repo: "talawa-admin",
        title: "Merge latest AdminUI Redesign into develop",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/956",
        created: "2023-08-13",
        closed: "2023-08-29",
        merged: true,
        comments: 5,
        note:
          "Merged the new layout scaffolding into develop so other contributors could build their screens on top of it.",
        media: [
          {
            file: "pr956-01.png",
            type: "image",
            alt: "Screenshot (19)",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/a4d5bba0-0e36-45c2-8f8e-15c5e5f9f61d",
          },
          {
            file: "pr956-02.png",
            type: "image",
            alt: "Screenshot (20)",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/fc2b5c62-8f8a-42e7-a1f0-a59e5bc30705",
          },
          {
            file: "pr956-03.png",
            type: "image",
            alt: "Screenshot (21)",
            section: null,
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/aa1876d3-017a-4be4-8a6c-5c0fd6b01ed4",
          },
        ],
      },
    ],
  },
  {
    id: "03",
    name: "Shipping",
    when: "sep – oct 2023",
    blurb:
      "Remaining screens, the API work they depended on, and the final merge to master.",
    prs: [
      {
        number: 972,
        repo: "talawa-admin",
        title: "Merge latest AdminUI Redesign into develop",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/972",
        created: "2023-09-06",
        closed: "2023-09-09",
        merged: true,
        comments: 3,
        note:
          "Redesigned three screens. Dashboard got shimmer loading and cards for the 5 latest events, posts and membership requests. Block/Unblock got loading and empty states. Settings was restructured: language moved here from every screen in the app, since it is a set-once preference, and user-detail tabs were handed to the contributor who owned that screen.",
        media: [
          {
            file: "pr972-01.png",
            type: "image",
            alt: "image",
            section: "1. Organization Dashboard",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/06a19d21-b1e3-4197-8ee3-f1705036f64f",
          },
          {
            file: "pr972-02.png",
            type: "image",
            alt: "image",
            section: "2. Organization Block/Unblock User",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/e036eb5c-5f60-491d-b34a-e027e4898981",
          },
          {
            file: "pr972-03.png",
            type: "image",
            alt: "image",
            section: "3. Organization Settings",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/2963b0a9-cc53-4440-8d51-74057d070bfa",
          },
        ],
      },
      {
        number: 1411,
        repo: "talawa-api",
        title: "Added Change User Role In Organization Mutation",
        url: "https://github.com/PalisadoesFoundation/talawa-api/pull/1411",
        created: "2023-10-20",
        closed: "2023-10-23",
        merged: true,
        comments: 3,
        note:
          "API mutation for changing a user's role within an organisation, plus pagination and filter args for users — the backend the redesigned Users screen needed.",
        media: [],
      },
      {
        number: 1006,
        repo: "talawa-admin",
        title: "Merge latest AdminUI Redesign into Master",
        url: "https://github.com/PalisadoesFoundation/talawa-admin/pull/1006",
        created: "2023-10-24",
        closed: "2023-10-31",
        merged: true,
        comments: 4,
        note:
          "Final merge to master. Infinite scroll on Organizations, Requests and Users. Translations across all pages. Animated logo on first login load, redesigned forgot-password flow, reworked delete-organisation modal, and Joined Organizations / Blocked By modals with search.",
        media: [
          {
            file: "pr1006-01.png",
            type: "image",
            alt: "Login",
            section: "Login (Animated Talawa Logo on first Load and made the form in middle)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/d83f94fa-39c7-40d8-a0f7-450bf540f1fe",
          },
          {
            file: "pr1006-02.png",
            type: "image",
            alt: "Register",
            section: "Register Screen (Margin from top fixed for mobile devices)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/5967a964-207d-4180-8f74-fd1100dbead6",
          },
          {
            file: "pr1006-03.png",
            type: "image",
            alt: "Forgot Password 1",
            section: "Newly Designed Made Forgot Password Screen",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/b4db33b2-ff2e-48f1-9c6d-316195a9e1df",
          },
          {
            file: "pr1006-04.png",
            type: "image",
            alt: "Forgot Password 2",
            section: "Newly Designed Made Forgot Password Screen",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/2229379b-44f6-42ad-b15a-bac0939d57f2",
          },
          {
            file: "pr1006-05.png",
            type: "image",
            alt: "Delete Org",
            section: "Delete Organization Modal (Message and colors changed)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/b3b6e949-b3cb-4e27-b1f1-43d6ea1659aa",
          },
          {
            file: "pr1006-06.png",
            type: "image",
            alt: "Delete Org Modal",
            section: "Delete Organization Modal (Message and colors changed)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/6ccf79d3-b99e-4950-b23d-7d7dca552ee1",
          },
          {
            file: "pr1006-07.png",
            type: "image",
            alt: "Users",
            section: "Users screen (Added Joined Orgs and Orgs Blocked By Modal, with Change Role Within Organization and Remove User from Organization Feature)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/58671634-c2f3-43e4-a156-7d841b13adb2",
          },
          {
            file: "pr1006-08.png",
            type: "image",
            alt: "Users Joined Orgs",
            section: "Users screen (Added Joined Orgs and Orgs Blocked By Modal, with Change Role Within Organization and Remove User from Organization Feature)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/ac2fa705-57ba-496a-93e7-d5ee69440bf2",
          },
          {
            file: "pr1006-09.png",
            type: "image",
            alt: "Users Blocked By Orgs",
            section: "Users screen (Added Joined Orgs and Orgs Blocked By Modal, with Change Role Within Organization and Remove User from Organization Feature)",
            url: "https://github.com/PalisadoesFoundation/talawa-admin/assets/76212518/07678524-9296-4670-96b8-3c104f362bf7",
          },
        ],
      },
    ],
  },
];

export const ALL_PRS: PullRequest[] = PHASES.flatMap((p) => p.prs);
export const ALL_MEDIA: { media: Media; pr: PullRequest }[] = ALL_PRS.flatMap(
  (pr) => pr.media.map((media) => ({ media, pr })),
);
