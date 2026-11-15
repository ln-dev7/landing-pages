# Kudo

Standalone Next.js concept for a fictional suite of creator apps. Keep the dithered-print art direction: a near-black rounded hero card with a gradient headline and pixel-dither glows, thin vertical rails with section dividers, a white floating header pill with an apps menu and a separate black button, a tabbed creator page over a full-bleed dithered background that changes colour per app, dither-framed app previews, a dark support band and a giant dithered wordmark in the footer. Local Inter Tight and Geist Mono fonts. Patterns come from `components/halftone.tsx` (canvas, ordered dithering, paused off screen and for reduced motion). Animate numbers with NumberFlow and micro-interactions with Motion; keep them subtle. Everything runs on invented sample data; never imply a real account or payment. Run typecheck and a production build, and verify desktop/mobile layouts plus the apps menu, every tab and module, the hero tips, previews, support desk, FAQ, mobile menu card and reduced motion in the browser.

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
