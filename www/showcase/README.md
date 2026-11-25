# Showcase media

The collection previews are real browser captures. Plumb and Redline were captured on November 5, 2026 from production builds of source commit `5b091c3` (Node 24.20.0, Next.js webpack). The collection integration from `25ae3ee` is preserved.

- Covers: `plumb.jpg`, `redline.jpg`, 1920 × 1080 JPEG, using the same rounded browser frame, public URL, shadow and neutral background as previous showcases.
- Local videos: `videos/plumb-showcase-1920x1080.mp4` and `videos/redline-showcase-1920x1080.mp4`, 29 seconds, 1920 × 1080, 30 fps, H.264, no audio. Four seconds at the hero, 24 seconds of continuous scrolling, one second at the footer.
- Preview/download locally through `videos/index.html`. Capture details and checksums are in `videos/manifest.json` and `videos/plumb-redline-verification.json`.

The existing repository ignore rules intentionally keep the videos directory local. Only the presentation images and this provenance note are versioned.

Both production builds and TypeScript compilation passed. Each video has 870 frames, reaches the footer, passes a full decode check, and contains no broken images or browser errors. Collection checks cover desktop/mobile, both new images, all 18 cards, the Editorial filter and the index/gallery toggle.

Kudo, Mesa, Keel, Folio, Hum, Wren, Murmur, Knot, Nightshift and Tally were captured on November 15, 2026 from their local production builds (Node 22, Next.js 16).

- Covers: `kudo.jpg`, `mesa.jpg`, `keel.jpg`, `folio.jpg`, `hum.jpg`, `wren.jpg`, `murmur.jpg`, `knot.jpg`, `nightshift.jpg`, `tally.jpg`, 1920 × 1080 JPEG. Each page is captured at 1600 × 900 after its intro animations, then placed in the same rounded browser frame, public URL, shadow and neutral background as the other showcases.
- Collection checks cover all 28 cards, the three filters (10 immersive, 9 editorial, 9 playful), the featured stack and a 390 px mobile view without horizontal overflow.

Vesper and Tenth were captured on November 25, 2026 from their local production builds (Node 22, Next.js 16).

- Covers: `vesper.jpg`, `tenth.jpg`, 1920 × 1080 JPEG, captured at 1600 × 900 after the intro animations and placed in the same browser frame as the other showcases.
- Collection checks cover all 30 cards, the three filters (11 immersive, 10 editorial, 9 playful), the featured stack and a 390 px mobile view without horizontal overflow.
