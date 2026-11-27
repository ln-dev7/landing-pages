# Contributing a landing page

Shadcn Pages Free has a **Community** section: landing pages made by other people, listed on
[free.shadcnpages.dev](https://free.shadcnpages.dev) with your name and a link to your GitHub profile. This guide explains how to send
yours and what gets it accepted.

## The rule: one landing page per pull request

**Each pull request adds exactly one landing page.** If you made three pages, open three pull requests, each from
its own branch.

A pull request with several landing pages will be closed without review and you will be asked to split it. This is
not a formality:

- every page is tested on its own, in light and dark, on desktop and mobile, and is accepted or declined on its own;
- a problem in one page (a licence question, a bug, a heavy asset) must not block the others;
- one page per pull request keeps the history readable and the credit clear;
- a pull request that adds tens of thousands of lines across many projects cannot be reviewed properly.

```bash
git checkout master && git pull
git checkout -b community/<slug>      # one branch per page
# add community/<slug>/ and nothing else
git push -u origin community/<slug>   # then open the pull request
```

Planning a page? Open an issue first with the name and the idea in two lines, so two people do not build the same
thing.

## Where your page goes

Your page lives in its own folder, **`community/<slug>`**, where `<slug>` is the brand name in lowercase letters
(`nexbot`, `wellnest`). The pull request touches **only that folder**: do not edit `landing-pages/`, `www/`, the root
README or another project. Listing the page on the site and deploying it is done by the maintainer after the merge.

## What gets a page accepted

### Original work

- **Your design, your words.** Being inspired by a style is fine. Rebuilding an existing website, a Framer or Webflow
  template, a Dribbble shot or a paid theme, "pixel-perfect" or not, is not, and will be declined.
- **A fictional brand.** Invent the product, the company, the people, the customers and the numbers. No real
  companies, logos or trademarks, and no real people's photos presented as your customers.
- **Finished content.** No lorem ipsum, no "Feature 1", no dead sections.

### Assets you are allowed to share

- Images, videos, fonts, icons, 3D models and Spline scenes must have a licence that allows redistribution in an
  MIT-licensed repository. List each one with its source and licence in the README's **Credits** section.
- Ship files **inside the project** (`public/`), optimised (WebP or AVIF for photos), instead of loading them from
  someone else's server. Fonts are self-hosted (for example with Fontsource and `next/font/local`).
- Keep the project light: under **10 MB** in total. If a 3D scene needs more, explain why in the pull request.

### Stack

Follow the stack of the other pages so they can all be maintained the same way:

- Next.js **16.4.6** (App Router), React **19.3.1**, TypeScript, Tailwind CSS 4, shadcn/ui. Motion, Three.js and
  similar libraries are fine when the page uses them.
- **pnpm**, with `pnpm-lock.yaml` committed. The `shadcn` CLI goes in `devDependencies`.
- `pnpm audit --prod` reports **no known vulnerabilities**.
- No secrets, API keys, analytics or trackers. If the page needs environment variables, add a `.env.example`.

### Files in the folder

```
community/<slug>/
├─ README.md       what the brand is, the art direction, how to run it, Credits
├─ package.json    "name": "<slug>", "license": "MIT"
├─ pnpm-lock.yaml
├─ vercel.json     copy it from any project in landing-pages/
├─ .gitignore      node_modules, .next and build output are never committed
└─ app/, components/, lib/, public/ ...
```

### Quality

Before opening the pull request, check that:

- `pnpm install && pnpm build` passes, and `pnpm typecheck` if you have the script;
- the browser console shows no errors;
- the page works from 360 px to 1920 px wide with no horizontal scroll, and on a phone;
- images have alt text, everything is reachable with the keyboard, and animations calm down with
  `prefers-reduced-motion`.

## The pull request

- **Title:** `feat(community): add <Name> landing page`
- **Description:** two or three lines about the brand and the art direction, a desktop and a mobile screenshot, a
  live preview link if you have one (a Vercel deployment of your fork is perfect), and the list of third-party
  assets.
- Fill in the checklist of the pull request template.

## What happens next

The maintainer runs the page, may ask for changes, and accepts or declines it. Declining a page says nothing about
you: it can be a licence doubt, a page too close to an existing one or to another site, or simply not the right fit.
Once merged, the page is deployed and listed in the Community section of [free.shadcnpages.dev](https://free.shadcnpages.dev) with
your name and GitHub profile.

By contributing, you agree that your code is published under the repository's [MIT licence](LICENSE). Third-party
assets keep their own licences, as listed in your Credits.
