"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

interface Tier {
  name: string;
  blurb: string;
  cta: string;
  href: string;
  featured?: boolean;
  photoUrl: string;
  price: {
    monthly: number;
    annual: number;
  };
  allowance: {
    images: string;
    note: string;
  };
  features: string[];
}

const TIERS: Tier[] = [
  {
    name: "Solo",
    blurb: "For independent makers.",
    cta: "Start with Solo",
    href: "#pricing",
    photoUrl:
      "https://images.unsplash.com/photo-1756992293716-b843700b5ab0?w=112&h=112&q=75&auto=format&fit=crop",
    price: { monthly: 15, annual: 12 },
    allowance: {
      images: "1,500 images / mo",
      note: "About 50 a day, up to 2K",
    },
    features: [
      "Every model, day one",
      "Reference and style boards",
      "One brand kit",
      "Commercial licence",
      "30-day history",
    ],
  },
  {
    name: "Studio",
    blurb: "For small teams shipping weekly.",
    cta: "Start with Studio",
    href: "#pricing",
    featured: true,
    photoUrl:
      "https://images.unsplash.com/photo-1776662958125-893f153f592a?w=112&h=112&q=75&auto=format&fit=crop",
    price: { monthly: 49, annual: 39 },
    allowance: {
      images: "6,000 images / mo",
      note: "About 200 a day, up to 4K",
    },
    features: [
      "Everything in Solo",
      "Unlimited seats",
      "Shared libraries and brand kits",
      "Batch variations and resizes",
      "Upscale and background removal",
      "Figma and Adobe plugins",
    ],
  },
  {
    name: "Agency",
    blurb: "For high-volume production.",
    cta: "Start with Agency",
    href: "#pricing",
    photoUrl:
      "https://images.unsplash.com/photo-1785403241660-b8ac924e9142?w=112&h=112&q=75&auto=format&fit=crop",
    price: { monthly: 124, annual: 99 },
    allowance: {
      images: "20,000 images / mo",
      note: "About 670 a day, 4K and upscale",
    },
    features: [
      "Everything in Studio",
      "Custom-trained models",
      "Roles and approval flows",
      "API access",
      "SSO and audit log",
      "Priority rendering",
      "Dedicated support",
    ],
  },
];

const ENTERPRISE_COL_1 = [
  "Everything in Agency",
  "Private model hosting",
  "Custom data agreements",
  "SLA with uptime credits",
];

const ENTERPRISE_COL_2 = [
  "Volume pricing",
  "Onboarding and training",
  "Named account team",
  "Invoicing and procurement",
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const shouldReduceMotion = useReducedMotion();

  const toggleBilling = (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-grid auto-cols-fr grid-flow-col rounded-xl bg-muted p-1"
    >
      <button
        type="button"
        role="radio"
        aria-checked={billing === "monthly"}
        onClick={() => setBilling("monthly")}
        className={`relative h-9 rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ${
          billing === "monthly"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {billing === "monthly" && (
          <motion.span
            layoutId="billing-period"
            aria-hidden="true"
            className="absolute inset-0 rounded-lg bg-background shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:shadow-none dark:ring-1 dark:ring-white/10"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 40 }
            }
          />
        )}
        <span className="relative z-[1] inline-flex items-center gap-1.5">
          Monthly
        </span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={billing === "annual"}
        onClick={() => setBilling("annual")}
        className={`relative h-9 rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ${
          billing === "annual"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {billing === "annual" && (
          <motion.span
            layoutId="billing-period"
            aria-hidden="true"
            className="absolute inset-0 rounded-lg bg-background shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:shadow-none dark:ring-1 dark:ring-white/10"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 40 }
            }
          />
        )}
        <span className="relative z-[1] inline-flex items-center gap-1.5">
          Annual
          <span className="text-xs font-medium text-sky-700 dark:text-sky-300">
            −20%
          </span>
        </span>
      </button>
    </div>
  );

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 py-24 sm:py-32 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* Section Heading with Aside Billing Toggle */}
        <SectionHeading
          id="pricing-heading"
          title="Priced by output, not headcount."
          description="Every model and full commercial rights on every plan. Pick an image allowance and move up when the briefs do."
          aside={toggleBilling}
        />

        {/* 3 Tier Cards */}
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {TIERS.map((tier, idx) => {
            const price =
              billing === "annual" ? tier.price.annual : tier.price.monthly;

            return (
              <li key={tier.name} className="min-w-0">
                <Reveal inView delay={0.08 * idx} y={24} className="h-full">
                  {tier.featured ? (
                    <div className="relative h-full rounded-2xl shadow-[0_28px_60px_-32px_rgba(0,0,0,0.28)] dark:shadow-none">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl [background-size:200%_100%] motion-safe:animate-[spectrum-drift_14s_linear_infinite] bg-[linear-gradient(90deg,#ff5c7a,#ffb340,#ffe14d,#57e6a8,#4cc9ff,#8b7bff,#ff5cd3,#ff5c7a)]"
                      />
                      <div className="relative h-full p-px">
                        <div className="flex h-full flex-col rounded-[15px] bg-background p-6 sm:p-7">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-[1.375rem] leading-tight font-medium tracking-[-0.01em]">
                                {tier.name}
                              </h3>
                              <p className="mt-1 text-[15px] text-muted-foreground">
                                {tier.blurb}
                              </p>
                            </div>
                            <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md bg-foreground px-2 text-xs font-medium text-background">
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full [background-size:200%_100%] motion-safe:animate-[spectrum-drift_14s_linear_infinite] bg-[linear-gradient(90deg,#ff5c7a,#ffb340,#ffe14d,#57e6a8,#4cc9ff,#8b7bff,#ff5cd3,#ff5c7a)]"
                              />
                              Most chosen
                            </span>
                          </div>

                          <div className="mt-8 flex items-baseline gap-2.5">
                            <span className="font-serif text-[3.75rem] leading-none tracking-[-0.02em]">
                              ${price}
                            </span>
                            {billing === "annual" && (
                              <span className="font-serif text-2xl text-muted-foreground line-through decoration-1">
                                ${tier.price.monthly}
                              </span>
                            )}
                          </div>

                          <div className="mt-3 flex items-center gap-1.5">
                            <span className="inline-flex h-6 items-center rounded-md px-2 text-xs font-medium bg-muted text-muted-foreground">
                              per month
                            </span>
                            {billing === "annual" && (
                              <span className="inline-flex h-6 items-center rounded-md px-2 text-xs font-medium bg-sky-500/12 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                                Save 20%
                              </span>
                            )}
                          </div>

                          <div className="mt-7 rounded-xl bg-muted p-3.5">
                            <div className="flex items-center gap-3.5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                alt=""
                                width={48}
                                height={48}
                                className="h-12 w-12 shrink-0 rounded-lg object-cover"
                                src={tier.photoUrl}
                              />
                              <div className="min-w-0">
                                <p className="text-[15px] font-medium tabular-nums">
                                  {tier.allowance.images}
                                </p>
                                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                                  {tier.allowance.note}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-7 border-t border-border pt-6 pb-10">
                            <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                              Includes
                            </p>
                            <ul className="space-y-2.5 text-[15px] mt-4">
                              {tier.features.map((feat) => (
                                <li
                                  key={feat}
                                  className="flex items-start gap-2.5"
                                >
                                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-foreground/60 stroke-[2.25]" />
                                  <span className="text-foreground/85">
                                    {feat}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href={tier.href}
                            className="group mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-foreground text-background shadow-xs hover:opacity-85 text-[15px] font-medium transition-[opacity,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] cursor-pointer"
                          >
                            {tier.cta}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full rounded-2xl border border-border transition-colors hover:border-foreground/20">
                      <div className="flex h-full flex-col rounded-[15px] bg-background p-6 sm:p-7">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-[1.375rem] leading-tight font-medium tracking-[-0.01em]">
                              {tier.name}
                            </h3>
                            <p className="mt-1 text-[15px] text-muted-foreground">
                              {tier.blurb}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 flex items-baseline gap-2.5">
                          <span className="font-serif text-[3.75rem] leading-none tracking-[-0.02em]">
                            ${price}
                          </span>
                          {billing === "annual" && (
                            <span className="font-serif text-2xl text-muted-foreground line-through decoration-1">
                              ${tier.price.monthly}
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="inline-flex h-6 items-center rounded-md px-2 text-xs font-medium bg-muted text-muted-foreground">
                            per month
                          </span>
                          {billing === "annual" && (
                            <span className="inline-flex h-6 items-center rounded-md px-2 text-xs font-medium bg-sky-500/12 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                              Save 20%
                            </span>
                          )}
                        </div>

                        <div className="mt-7 rounded-xl bg-muted p-3.5">
                          <div className="flex items-center gap-3.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt=""
                              width={48}
                              height={48}
                              className="h-12 w-12 shrink-0 rounded-lg object-cover"
                              src={tier.photoUrl}
                            />
                            <div className="min-w-0">
                              <p className="text-[15px] font-medium tabular-nums">
                                {tier.allowance.images}
                              </p>
                              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                                {tier.allowance.note}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-7 border-t border-border pt-6 pb-10">
                          <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                            Includes
                          </p>
                          <ul className="space-y-2.5 text-[15px] mt-4">
                            {tier.features.map((feat) => (
                              <li
                                key={feat}
                                className="flex items-start gap-2.5"
                              >
                                <Check className="mt-[3px] h-4 w-4 shrink-0 text-foreground/60 stroke-[2.25]" />
                                <span className="text-foreground/85">
                                  {feat}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href={tier.href}
                          className="group mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-muted text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/15 text-[15px] font-medium transition-[opacity,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] cursor-pointer"
                        >
                          {tier.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Enterprise Card */}
        <Reveal inView y={24} className="mt-4 md:mt-5">
          <div className="grid gap-6 rounded-2xl border border-border bg-muted p-3 sm:p-4 lg:grid-cols-[300px_minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
            {/* 3 tilted interactive cards */}
            <div className="group relative flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-xl bg-foreground dark:bg-white/[0.06]">
              <div
                aria-hidden="true"
                className="absolute inset-0 [background-size:200%_100%] opacity-25 blur-3xl motion-safe:animate-[spectrum-drift_14s_linear_infinite] bg-[linear-gradient(90deg,#ff5c7a,#ffb340,#ffe14d,#57e6a8,#4cc9ff,#8b7bff,#ff5cd3,#ff5c7a)]"
              />
              <div className="absolute h-[104px] w-[104px] overflow-hidden rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-1 [transform:translateX(-46px)_rotate(-12deg)] motion-safe:group-hover:[transform:translateX(-62px)_rotate(-18deg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  width={104}
                  height={104}
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1752350434967-29fe9a749b37?w=224&h=224&q=75&auto=format&fit=crop"
                />
              </div>
              <div className="absolute h-[104px] w-[104px] overflow-hidden rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-2 transform-none motion-safe:group-hover:[transform:translateY(-4px)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  width={104}
                  height={104}
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1660399618104-53cf6b33339f?w=224&h=224&q=75&auto=format&fit=crop"
                />
              </div>
              <div className="absolute h-[104px] w-[104px] overflow-hidden rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-1 [transform:translateX(46px)_rotate(12deg)] motion-safe:group-hover:[transform:translateX(62px)_rotate(18deg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  width={104}
                  height={104}
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1785403241652-5289a59f6f86?w=224&h=224&q=75&auto=format&fit=crop"
                />
              </div>
            </div>

            {/* Middle Title & Pitch */}
            <div className="flex flex-col justify-center px-3 py-2 sm:px-4">
              <h3 className="font-serif text-[2.25rem] leading-none tracking-[-0.02em]">
                Enterprise
              </h3>
              <p className="mt-2 text-[15px] text-muted-foreground">
                For your own terms, your own models and your own cloud.
              </p>
              <a
                href="mailto:sales@imageworks.example.com"
                className="group mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-foreground pr-4 pl-5 text-[15px] font-medium text-background transition-[opacity,transform] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] cursor-pointer"
              >
                Talk to sales
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Right Features Grid */}
            <div className="px-3 py-2 sm:px-4 lg:border-l lg:border-border lg:pl-10">
              <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Includes
              </p>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
                <ul className="space-y-2.5 text-[15px]">
                  {ENTERPRISE_COL_1.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-foreground/60 stroke-[2.25]" />
                      <span className="text-foreground/85">{feat}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5 text-[15px] mt-2.5 sm:mt-0">
                  {ENTERPRISE_COL_2.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-foreground/60 stroke-[2.25]" />
                      <span className="text-foreground/85">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pricing Subtext Notice */}
        <Reveal
          inView
          y={16}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Prices in USD, before tax. Unused images roll over for one month.
          Students and non-profits get 40% off.
        </Reveal>
      </div>
    </section>
  );
}
