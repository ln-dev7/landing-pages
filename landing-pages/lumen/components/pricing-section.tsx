"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";
import { RevealHeadline } from "./reveal-headline";
import { ArrowChip } from "./product-section";

const easeTransition = [0.33, 1, 0.68, 1] as const;

interface PricingPlan {
  name: string;
  price: string | null;
  unit?: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
  features: string[];
}

const PLANS: PricingPlan[] = [
  {
    name: "Pro",
    price: "$29",
    unit: "/ seat / month",
    body: "For product teams shipping daily. Everything you need to plan, build, and ship from a single surface.",
    cta: {
      label: "Start free trial",
      href: "#",
    },
    features: [
      "Unlimited projects & environments",
      "Real-time collaboration",
      "Branch previews & rollbacks",
      "GitHub, Slack, Linear integrations",
      "Standard support",
    ],
  },
  {
    name: "Enterprise",
    price: null,
    body: "For organizations with security, compliance, and scale requirements. Tailored to your delivery model.",
    cta: {
      label: "Contact sales",
      href: "mailto:sales@lumen.app",
    },
    features: [
      "Everything in Pro",
      "SSO, SCIM, audit logs",
      "SOC 2, HIPAA, custom DPA",
      "Dedicated infrastructure options",
      "Named CSM & 24/7 support",
    ],
  },
];

export function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative w-full bg-background text-foreground select-none"
    >
      <div className="max-w-[1680px] mx-auto px-10 max-[850px]:px-6 py-32 max-[850px]:py-24">
        <div className="grid grid-cols-12 gap-x-10 gap-y-6 max-[850px]:grid-cols-1">
          <div className="col-span-3 max-[1100px]:col-span-12 max-[850px]:col-span-1 pt-2">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: easeTransition }}
              className="inline-flex items-center rounded-md border border-foreground/[0.08] px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70"
            >
              Pricing
            </motion.span>
          </div>

          <div className="col-span-7 col-start-6 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
            <RevealHeadline
              id="pricing-heading"
              delay={0.05}
              className="text-balance text-[clamp(2rem,4.2vw,4rem)] font-medium leading-[0.85] tracking-tight"
            >
              Two plans. One simple promise, software that ships.
            </RevealHeadline>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: easeTransition, delay: 0.18 }}
              className="mt-6 max-w-[60ch] text-balance text-xl max-[850px]:text-lg font-light leading-snug text-foreground/60"
            >
              Start with Pro for fast-moving product teams. Move to Enterprise when scale, security, or procurement enter the picture.
            </motion.p>
          </div>
        </div>

        <div className="mt-20 max-[850px]:mt-12 grid grid-cols-2 gap-5 max-[1100px]:grid-cols-1 max-[1100px]:gap-4">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                ease: easeTransition,
                delay: 0.25 + 0.08 * i,
              }}
              className="relative flex"
            >
              <div className="group relative flex flex-1 flex-col rounded-2xl p-10 max-[850px]:p-7 bg-foreground/[0.04] hover:bg-foreground/[0.06] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div>
                  <h3 className="text-3xl max-[850px]:text-2xl font-medium leading-tight tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl max-[850px]:text-4xl font-medium tracking-tight">
                      {plan.price ?? "Custom"}
                    </span>
                    {plan.price && plan.unit && (
                      <span className="text-sm text-foreground/55">
                        {plan.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-foreground/60 max-w-[42ch]">
                    {plan.body}
                  </p>
                </div>

                <ul className="mt-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-foreground/85"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-2">
                  <Link
                    href={plan.cta.href}
                    className="group/cta inline-flex items-stretch gap-1"
                  >
                    <span className="px-5 py-3 rounded-md bg-foreground text-background text-xs font-medium tracking-widest uppercase">
                      {plan.cta.label}
                    </span>
                    <ArrowChip className="bg-foreground text-background" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
