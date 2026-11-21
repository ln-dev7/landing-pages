"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Who owns the images?",
    a: "You and your client. Every image generated on any plan includes full commercial rights, globally and in perpetuity. There are no royalty tiers or usage restrictions.",
  },
  {
    q: "Is my work used to train the models?",
    a: "No. Your prompts, references, brand kits and renders stay in your workspace and are never used for training. Workspace data is deleted within thirty days of closing an account.",
  },
  {
    q: "What counts as one image?",
    a: "One finished render at any size, including all the formats you export from it. Variations count individually; upscales and background removal on an existing render are free.",
  },
  {
    q: "How do brand rules work?",
    a: "You set safe areas, logo clearance, approved colours and typography once per brand kit. Every render is checked against them before you see it, and anything that breaks a rule is flagged with the reason.",
  },
  {
    q: "Can I use my own photography as a reference?",
    a: "Yes, and it is the best way to work. Pin your own shoots to a reference board and new renders inherit their light, lens and palette. References are never shared across workspaces.",
  },
  {
    q: "What happens if I go over my allowance?",
    a: "Rendering keeps working. Extra images are billed at your plan's per-image rate at the end of the month, and you get a notice at eighty and one hundred percent so nothing surprises finance.",
  },
  {
    q: "Do you offer invoicing and procurement paperwork?",
    a: "On Agency and Enterprise. We support annual invoicing, purchase orders, security questionnaires and data processing agreements, and can sign your own paper where it is reasonable.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 py-24 sm:py-32 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left Sticky Column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="faq-heading"
              title="The questions that come up before the first render."
              description="Anything missing, write to us. A person answers within a working day."
            />
          </div>

          {/* Right Accordions Column */}
          <Reveal inView delay={0.1}>
            <ul className="flex flex-col gap-3">
              {FAQS.map((item, idx) => {
                const isOpen = openIdx === idx;
                const id = `faq-${idx}`;

                return (
                  <li
                    key={item.q}
                    className="overflow-hidden rounded-2xl bg-muted"
                  >
                    <h3>
                      <button
                        type="button"
                        id={`${id}-header`}
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel`}
                        onClick={() => toggle(idx)}
                        className="group flex w-full items-center justify-between p-6 text-left transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                      >
                        <span className="font-serif text-[1.375rem] leading-[1.2] tracking-[-0.01em] text-foreground sm:text-[1.5rem]">
                          {item.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/80 text-foreground transition-transform duration-200"
                        >
                          <Plus
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isOpen ? "rotate-45" : "rotate-0"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`${id}-panel`}
                          role="region"
                          aria-labelledby={`${id}-header`}
                          initial={
                            shouldReduceMotion ? undefined : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            shouldReduceMotion ? undefined : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <div className="px-6 pb-6 text-[15px] leading-7 text-muted-foreground">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
