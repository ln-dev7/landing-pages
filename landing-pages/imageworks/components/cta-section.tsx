"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { DotField } from "./dot-field";
import { ImageHelix } from "./image-helix";

export function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden pt-[14rem] pb-32 sm:pt-[25rem] sm:pb-40 select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <DotField stageId="cta-copy" alpha={0.6} />
      </div>
      <ImageHelix stageId="cta-heading" />
      <div
        id="cta-copy"
        className="relative mx-auto max-w-[1440px] px-4 text-center sm:px-6"
      >
        <Reveal inView scale={0.96} y={12} duration={0.9}>
          <div id="cta-stage">
            <h2
              id="cta-heading"
              className="mx-auto max-w-4xl font-serif text-[clamp(2.75rem,5.6vw,4.75rem)] leading-[1.0] tracking-[-0.025em] text-balance text-foreground"
            >
              The picture in your head,
              <br className="hidden sm:block" /> by lunch.
            </h2>
          </div>
        </Reveal>

        <Reveal inView delay={0.08} scale={0.96} y={12} duration={0.9}>
          <p className="mx-auto mt-7 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base">
            Start on the free plan, bring a real brief, and see the first take
            before the kettle boils. No card needed.
          </p>
        </Reveal>

        <Reveal
          inView
          delay={0.16}
          scale={0.96}
          y={12}
          duration={0.9}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="https://app.imageworks.example.com/sign-up"
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-foreground pr-4 pl-5 text-[15px] font-medium text-background shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_32px_-14px_rgba(0,0,0,0.45)] dark:shadow-[0_12px_32px_-14px_rgba(0,0,0,0.9)] transition-[transform,opacity] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] cursor-pointer"
          >
            Start creating for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-foreground/[0.06] hover:bg-foreground/[0.1] px-5 text-[15px] font-medium text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-white/[0.1] dark:hover:bg-white/[0.14] cursor-pointer"
          >
            See plans
          </a>
        </Reveal>
      </div>
    </section>
  );
}
