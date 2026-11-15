# Tally

A fictional AI bookkeeper for freelancers. Tally reads every receipt, matches it to the bank, books it in the right category and says how much to set aside for tax. Swiss style: a visible grid, black rules and one signal orange.

## Run

```sh
pnpm install
pnpm dev --port 3197
```

Next.js · React · Tailwind CSS · fully customized shadcn/ui (Base UI). Receipts, categories, the tax slider and brackets, the invoice builder, pricing toggle, FAQ and mobile navigation work with the keyboard. Motion respects reduced motion: receipts book instantly and the scan beam is hidden. Fonts are local.

## Interactive demo

The hero holds a working ledger. Drag a receipt from the inbox onto the scanner (or click it, or tap it on a phone): the scan beam reads the paper, the fields fill in, Tally picks a category and matches the payment in the bank feed. Change the category and the deductible share, profit and tax pot update; the November bar moves with them. Further down, set your monthly profit and bracket to see what to put aside, build an invoice and watch it go from sent to opened to paid.

Merchants, clients, amounts and prices are invented. Nothing connects to a bank and nothing is stored. Tax figures are estimates, not advice.

## Credits

Schibsted Grotesk and Martian Mono: SIL Open Font License, included alongside the font files. Icons: Lucide (ISC). Animated numbers: [NumberFlow](https://number-flow.barvian.me) (MIT). Micro-interactions: [Motion](https://motion.dev) (MIT). Original SVG logo. Code: MIT.

Designed and developed by [LN](https://lndev.me). [Support the project](https://lndev.mychariow.shop/prd_3cu1s0).
