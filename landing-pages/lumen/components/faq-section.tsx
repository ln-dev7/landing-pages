"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Plus } from "lucide-react";
import { RevealHeadline } from "./reveal-headline";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "How does the free trial work?",
    a: "Every workspace starts on Pro for 14 days, no card required. You get the full feature set, unlimited projects, and real collaboration. When the trial ends you can downgrade, switch to Enterprise, or keep going on Pro.",
  },
  {
    q: "Can I bring my existing tools?",
    a: "Yes. Lumen connects to GitHub, GitLab, Slack, Linear, Jira, and Figma out of the box. Anything else, the public API and webhooks cover. Most teams are wired up in under an hour.",
  },
  {
    q: "What does pricing look like at scale?",
    a: "Pro stays at $29 per seat regardless of headcount. Enterprise pricing depends on your security model, support tier, and infrastructure footprint. We will quote a flat annual commitment, never a metered surprise.",
  },
  {
    q: "How is my data handled?",
    a: "Data is encrypted in transit and at rest, isolated per workspace, and stored in the region you pick at signup. Enterprise plans add SSO, SCIM, audit logs, custom DPAs, and SOC 2 Type II reports on request.",
  },
  {
    q: "Do you support self-hosting?",
    a: "Self-hosted deployments are available on Enterprise. You run Lumen inside your own VPC on AWS, GCP, or Azure, we handle upgrades through a managed control plane. Talk to sales for a reference architecture.",
  },
  {
    q: "What if I need to cancel?",
    a: "Cancel anytime from billing settings. You keep access through the end of the current period and can export every project, file, and asset as a single archive. No retention games.",
  },
];

const easeTransition = [0.33, 1, 0.68, 1] as const;
const easeAccordion = [0.22, 1, 0.36, 1] as const;

function FaqRow({
  item,
  index,
  open,
  onToggle,
  inView,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.7,
        ease: easeTransition,
        delay: 0.25 + 0.06 * index,
      }}
      className="border-t border-foreground/[0.08] last:border-b"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group block w-full text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-foreground/[0.03]"
      >
        <div className="relative flex items-center gap-6 px-2 py-7 max-[850px]:py-6">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/40 tabular-nums shrink-0 w-10 max-[850px]:w-8">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 text-xl max-[850px]:text-lg font-medium tracking-tight leading-snug">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className="relative flex h-9 w-9 max-[850px]:h-8 max-[850px]:w-8 shrink-0 items-center justify-center rounded-full border border-foreground/[0.12] text-foreground/70 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-foreground/30 group-hover:text-foreground"
          >
            <motion.span
              initial={false}
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.5, ease: easeAccordion }}
              className="flex items-center justify-center"
            >
              <Plus className="h-4 w-4" strokeWidth={1.6} />
            </motion.span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.55, ease: easeAccordion },
              opacity: { duration: 0.4, ease: easeAccordion, delay: 0.08 },
            }}
            className="overflow-hidden"
          >
            <div className="flex gap-6 px-2 pb-8 max-[850px]:pb-6">
              <span
                className="w-10 max-[850px]:w-8 shrink-0"
                aria-hidden="true"
              />
              <p className="max-w-[68ch] text-base max-[850px]:text-sm leading-relaxed text-foreground/65 pr-12">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-heading"
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
              FAQ
            </motion.span>
          </div>

          <div className="col-span-7 col-start-6 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
            <RevealHeadline
              id="faq-heading"
              delay={0.05}
              className="text-balance text-[clamp(2rem,4.2vw,4rem)] font-medium leading-[0.85] tracking-tight"
            >
              The questions teams ask before switching to Lumen.
            </RevealHeadline>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: easeTransition, delay: 0.18 }}
              className="mt-6 max-w-[60ch] text-balance text-xl max-[850px]:text-lg font-light leading-snug text-foreground/60"
            >
              Short answers to the things that come up in every procurement call. If you need more, our team replies in hours, not days.
            </motion.p>
          </div>
        </div>

        <div className="mt-20 max-[850px]:mt-12 grid grid-cols-12 gap-x-10 max-[850px]:grid-cols-1">
          <div className="col-span-10 col-start-2 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
            <div role="list">
              {FAQS.map((faq, i) => (
                <FaqRow
                  key={faq.q}
                  item={faq}
                  index={i}
                  open={openIndex === i}
                  onToggle={() =>
                    setOpenIndex((curr) => (curr === i ? null : i))
                  }
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
