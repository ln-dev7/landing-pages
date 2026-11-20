"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "confidentiality",
    question: "Is therapy confidential?",
    answer:
      "Yes. Your privacy is our top priority. All sessions are strictly confidential and handled according to professional ethical guidelines.",
  },
  {
    id: "duration",
    question: "How long does therapy take?",
    answer:
      "The duration of therapy varies depending on your personal goals and needs. Some people benefit from short-term focused sessions (8–12 weeks), while others prefer ongoing support for long-term growth.",
  },
  {
    id: "booking",
    question: "How do I book an appointment?",
    answer:
      "Booking is simple and fully digital. You can request a session directly through our platform, choose your preferred specialist, and schedule a time that fits your weekly routine.",
  },
  {
    id: "issues",
    question: "What types of issues do you treat?",
    answer:
      "Our licensed clinical team specializes in anxiety, depression, trauma & PTSD recovery, stress management, interpersonal relationship counseling, burnout, and life transitions.",
  },
  {
    id: "insurance",
    question: "Do you accept insurance?",
    answer:
      "We partner with major healthcare networks and also provide detailed superbills for out-of-network reimbursement. Our intake team can assist in checking your coverage prior to your first session.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("confidentiality");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="w-full bg-[#26370e] py-24 sm:py-32 text-white scroll-mt-6">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Title & Contact Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-normal text-white/80 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-white/80" />
              <span>FAQs</span>
            </div>

            {/* Main Heading in luminous lime */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#d7f943] leading-[1.12] mb-12 sm:mb-16">
              Frequently Asked <br />
              Questions
            </h2>

            {/* Contact / Help Subtitle & Button */}
            <div className="space-y-4 max-w-md pt-4">
              <h3 className="text-lg sm:text-xl font-normal text-white">
                Looking for solutions? We&apos;re here to help!
              </h3>
              <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed pb-3">
                Here are frequently asked questions. If you need more help,
                don&apos;t hesitate to contact us!
              </p>

              <div>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#d7f943] hover:bg-[#c6e835] text-[#0d1711] px-7 py-3 rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column — Accordion List */}
          <div className="lg:col-span-7 divide-y divide-white/15">
            {faqData.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-lg sm:text-xl font-normal text-white/95 group-hover:text-white transition-colors pr-6">
                      {item.question}
                    </span>
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                      {isOpen ? (
                        <Minus className="w-5 h-5 stroke-[1.8]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[1.8]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm sm:text-base font-light text-white/75 leading-relaxed pr-8">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
