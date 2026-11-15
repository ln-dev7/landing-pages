# Mesa

A fictional suite of six apps for independent restaurants: reservations, a waitlist, pickup orders, a stamp card, reviews and gift cards, sharing one guest list.

## Run

```sh
pnpm install
pnpm dev --port 3203
```

Next.js · React · Tailwind CSS · fully customized shadcn/ui (Base UI). The apps menu, tabs, restaurant site modules, floor plan, stories switcher, FAQ and the mobile menu card work with the keyboard. Motion respects reduced-motion preferences: the dot patterns stop moving and the dot transitions become instant. Fonts are local.

## Interactive demo

The hero shows tonight's floor: tap a free table to seat a walk-in, then serve dessert. In the app tabs, book a table (deposits appear from six guests), join the waitlist and wait for the text, build a pickup order, stamp a regular's card, draft a reply to a review or design a gift card. Each tab changes the headline and the round-dot background.

The halftone patterns are drawn on canvas with ordered dithering, including the giant wordmark in the footer.

The restaurants, guests, numbers and prices are invented. Nothing is saved and nothing leaves the page.

## Credits

Bricolage Grotesque and DM Mono: SIL Open Font License, included alongside the font files. Icons: Lucide (ISC). Animated numbers: [NumberFlow](https://number-flow.barvian.me) (MIT). Micro-interactions: [Motion](https://motion.dev) (MIT). Original SVG logo and illustrations. Code: MIT.

Designed and developed by [LN](https://lndev.me). [Support the project](https://lndev.mychariow.shop/prd_3cu1s0).
