# Mesa

Standalone Next.js concept for a fictional suite of restaurant apps. Keep the warm round-dot halftone art direction: a split espresso hero card (left-aligned gradient headline and app tiles, the live floor plan bleeding off the right edge), thin vertical rails with section dividers, a white floating header pill with an apps menu and a separate black button, a menu-style app picker (vertical list of apps beside the restaurant site) over a full-bleed halftone background that changes colour per app, the hour-by-hour night grid, number panels, the restaurant stories switcher, the changelog as kitchen tickets, a dark support band and a giant halftone wordmark in the footer. Local Bricolage Grotesque and DM Mono fonts. Patterns come from `components/halftone.tsx` (canvas, ordered dithering with round dots, paused off screen and for reduced motion). Animate numbers with NumberFlow and micro-interactions with Motion; keep them subtle. Everything runs on invented sample data; never imply a real booking, order or payment. Run typecheck and a production build, and verify desktop/mobile layouts plus the floor plan, apps menu, every tab and module, stories, support desk, FAQ, mobile menu card and reduced motion in the browser.

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
