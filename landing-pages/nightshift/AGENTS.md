# Nightshift

Standalone Next.js concept for a fictional AI on-call engineer. Keep the CRT terminal art direction: near-black screen with scanlines, phosphor amber text with glow, green/red/cyan only for status, square corners everywhere, VT323 headlines and Space Mono text, ASCII instead of illustrations. Use the custom shadcn/Base UI controls, NumberFlow for numbers and Motion for micro-interactions, and respect reduced motion. The terminal is a local demo: commands only print text on the page and never reach a server. Run typecheck and a production build, and verify desktop/mobile layouts plus the three incidents (y/n answers by click and keyboard), typed commands and history, the night scrubber, runbook checkboxes, pricing rows and stepper, the copy button, FAQ, mobile menu and reduced motion in the browser.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
