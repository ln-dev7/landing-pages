# Nightshift

A fictional AI on-call engineer. It reads the alert, investigates with your metrics and logs, fixes what your runbooks allow and only wakes a human when it has to. Styled as a glowing CRT terminal.

## Run

```sh
pnpm install
pnpm dev --port 3196
```

Next.js · React · Tailwind CSS · fully customized shadcn/ui (Base UI). The terminal, incident tabs, night scrubber, runbook checkboxes, plan rows, steppers, FAQ and mobile navigation work with the keyboard. Motion respects reduced-motion preferences: incidents print instantly and the screen stops flickering. Fonts are local.

## Interactive demo

The hero is a working terminal. An incident starts on its own: the alert lands, Nightshift queries metrics, draws ASCII graphs, diffs the deploy and asks whether to roll back. Answer with the buttons or type y or n, then keep typing: help, status, incidents, open 2, graph, ack, whoami, sleep, clear (arrow keys recall history). Three incidents are included: a bad deploy, a full disk and a noisy alert. Further down, scrub through last night hour by hour, tick what Nightshift may do on its own and watch the policy file rewrite itself, and size a plan by number of services.

Services, incidents, people and prices are invented. Commands only print text on this page; nothing reaches a server. The install command points at an example domain.

## Credits

VT323 and Space Mono: SIL Open Font License, included alongside the font files. Icons: Lucide (ISC). Animated numbers: [NumberFlow](https://number-flow.barvian.me) (MIT). Micro-interactions: [Motion](https://motion.dev) (MIT). Original ASCII art. Code: MIT.

Designed and developed by [LN](https://lndev.me). [Support the project](https://lndev.mychariow.shop/prd_3cu1s0).
