# Redline

A fictional AI code reviewer. Redline reads every pull request in context, flags what would break and brings a patch you can accept in one click. Notes live in the margin, like the red one running down the page.

## Run

```sh
pnpm install
pnpm dev --port 3193
```

Next.js · React · Tailwind CSS · fully customized shadcn/ui (Base UI). Feature tabs, FAQ accordion, strictness levels, the seat calculator and mobile navigation are keyboard accessible. Motion respects reduced-motion preferences: the review appears complete, with no scanning or drawing. Fonts are local.

## Interactive demo

The hero is a live review of a demo pull request. Redline reads the files one by one, then pins its notes to the exact lines with drawn connectors. Commit a fix or apply a suggestion and the patch appears in the diff; switch files in the tree to see other notes, or files with nothing to flag. Further down, compare the same pull request at three strictness levels and estimate a team price with the seat slider.

The repository, code, customers and prices are invented. Nothing is pushed, posted or stored.

## Credits

Geist and Geist Mono: SIL Open Font License, included alongside the font files. Icons: Lucide (ISC). Original SVG logo. Code: MIT.

Designed and developed by [LN](https://lndev.me). [Support the project](https://lndev.mychariow.shop/prd_3cu1s0).
