# Hollow

**The house at No. 13.** An original Halloween experience: walk through a haunted house, meet its residents, discover a moonlit conservatory and take an illustrated invitation home.

## Run

```sh
pnpm install
pnpm dev --port 3190
```

`pnpm typecheck`, `pnpm test`, `pnpm build`.

## Experience

Six chapters in one continuous Three.js environment. Native scrolling moves the camera through doors, a portrait gallery, a ghostly dinner and a moonlit conservatory with a reflecting pool, ferns, hanging lanterns and an open garden gate. Choose a lantern colour and carry that light into your illustrated ticket. The ending is an interactive keepsake, not a footer reveal. The house guide provides direct navigation. Sound is synthesized locally and starts only on request.

Next.js, TypeScript, Tailwind CSS and customized shadcn/ui Base UI controls. Local fonts; original procedural models, textures and portrait illustrations. No external image or model requests. WebGL initialization and shader compilation complete before the loader leaves. Includes a lightweight illustrated mode, reduced-motion support, ambient pause and capped mobile pixel density.

Deploy on Vercel with root directory `landing-pages/hollow`. The build filter only rebuilds this folder when it changes.

## References and credits

Research informed the idea of exploring a place rather than scrolling a product catalogue:
- [Paradise Chateau](https://paradisechateau.com/): haunted architecture and narrative discovery.
- [Lusion / Choo Choo World](https://lusion.co/projects/choo_choo_world/): playful environmental interaction.
- [Resn](https://resn.co.nz/): atmosphere-led immersive presentation.

No source, artwork or assets were copied from these references.

DM Serif Display and IBM Plex Mono are bundled under their SIL Open Font Licenses in `app/fonts/`. Models, textures, sound and story are original. Fictional house and invitation; no actual event or booking.

Developed by [LN](https://lndev.me). [Open source · MIT](https://github.com/ln-dev7/landing-pages). [Support the project](https://lndev.mychariow.shop/prd_3cu1s0).
