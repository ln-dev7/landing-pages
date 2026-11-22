<!-- Adding a landing page? Read COMMUNITY.md first. One landing page per pull request. -->

## The page

<!-- Name, the fictional brand in one line, the art direction in one line. -->

**Live preview:** <!-- link to a deployment of your fork, if you have one -->

<!-- A desktop and a mobile screenshot. -->

## Third-party assets

<!-- Every image, font, icon, 3D model or Spline scene you did not make, with its source and licence. -->

## Checklist

- [ ] This pull request adds **one** landing page, and only touches `community/<slug>/`
- [ ] The design and the copy are mine (not a rebuild of an existing site or template), and the brand is fictional
- [ ] Every asset is in the project, may be redistributed, and is listed in the README's Credits
- [ ] Next.js 16.4.6, React 19.3.1, pnpm with `pnpm-lock.yaml`, `shadcn` CLI in `devDependencies`
- [ ] `pnpm build` passes and `pnpm audit --prod` finds no vulnerabilities
- [ ] Works from 360 px to 1920 px, no console errors, respects reduced motion
- [ ] `README.md`, `vercel.json` and `.gitignore` are included; no `node_modules` or `.next`
