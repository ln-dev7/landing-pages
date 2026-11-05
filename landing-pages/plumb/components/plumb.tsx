"use client";
import { useEffect, useState } from "react";
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CodeXml,
  Database,
  Eye,
  Globe,
  Lock,
  Mail,
  Menu,
  Play,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { AskDemo } from "./ask-demo";
import { Logo } from "./logo";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE =
  "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/plumb";

const links = [
  { href: "#product", label: "Product" },
  { href: "#ask", label: "How it answers" },
  { href: "#pricing", label: "Pricing" },
  { href: "#changelog", label: "Changelog" },
];

const concept = () =>
  toast("Plumb is a concept by LN", {
    description: "There is no account to create. Explore the demo instead.",
  });

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => (el.dataset.visible = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const sources = [
  { icon: Globe, label: "Web SDK", side: "l", x: 3, y: 6 },
  { icon: Smartphone, label: "iOS & Android", side: "l", x: 8.5, y: 30 },
  { icon: CodeXml, label: "Server events", side: "l", x: 14, y: 54 },
  { icon: Database, label: "Warehouse", side: "r", x: 97, y: 6 },
  { icon: AppWindow, label: "Product database", side: "r", x: 91.5, y: 30 },
  { icon: Mail, label: "Email & lifecycle", side: "r", x: 86, y: 54 },
] as const;

function Beams() {
  // Paths are drawn in a 1000 × 600 box that stretches with the hero.
  const target = (side: string, i: number) =>
    side === "l" ? 300 + i * 40 : 700 - i * 40;
  return (
    <svg
      className="beams"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {sources.map((s, i) => {
        const sx = s.x * 10;
        const sy = s.y * 6 + 44;
        const tx = target(s.side, i % 3);
        const d = `M${sx},${sy} C${sx},${sy + 260} ${tx},${430} ${tx},600`;
        return (
          <g key={s.label}>
            <path
              d={d}
              className="beam"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
            />
            <path
              d={d}
              className="beam-pulse"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{ animationDelay: `${1.8 + i * 0.55}s` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

const examples = [
  {
    id: "drop",
    tab: "A sudden drop",
    question: "Why did onboarding drop on Tuesday?",
    query: [
      "funnel onboarding_started → team_invited → first_chart",
      "  where date >= 2026-10-27",
      "  compare to previous 7 days",
      "  break down by platform, app_version, plan",
      "  rank segments by contribution",
    ],
    chart: [62, 64, 63, 65, 64, 52, 50],
    result: "Android · app 5.8 explains 92% of the drop.",
    reason:
      "The invite step fails after the 5.8 release. 1,204 errors logged since Tuesday 09:40.",
  },
  {
    id: "conversion",
    tab: "A comparison",
    question: "Which trials turn into paying teams?",
    query: [
      "cohort trials started last 90 days",
      "  outcome subscription_started within 21 days",
      "  break down by plan, first_week_actions",
      "  keep segments with n >= 200",
    ],
    chart: [38, 44, 52, 58, 61, 66, 72],
    result: "Connecting a warehouse in week one: 3.1× more conversions.",
    reason: "The effect holds across all plans and sizes, on 7,306 trials.",
  },
  {
    id: "experiment",
    tab: "An experiment",
    question: "Is the new checklist worth keeping?",
    query: [
      "experiment onboarding_checklist_v2",
      "  metric onboarding_completed",
      "  guardrails support_tickets, time_to_first_chart",
      "  report confidence and sample size",
    ],
    chart: [40, 41, 43, 44, 46, 47, 48],
    result: "+4.8 pts completion at 95% confidence.",
    reason: "No guardrail moved. Support tickets per team stayed flat.",
  },
];

const plans = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    note: "For side projects and first launches.",
    features: [
      "1M events a month",
      "50 questions a month",
      "Funnels & retention",
      "7-day history for watchers",
    ],
    cta: "Get started",
  },
  {
    name: "Team",
    monthly: 59,
    yearly: 49,
    note: "For product teams shipping every week.",
    features: [
      "10M events a month",
      "Unlimited questions",
      "Watchers with alerts",
      "Experiments & guardrails",
      "Warehouse sync",
    ],
    cta: "Start a 14-day trial",
    featured: true,
  },
  {
    name: "Company",
    monthly: null,
    yearly: null,
    note: "For many products and strict reviews.",
    features: [
      "Custom event volume",
      "SSO & audit log",
      "Data residency choice",
      "A named analyst on call",
    ],
    cta: "Talk to us",
  },
];

const changelog = [
  {
    date: "Oct 29, 2026",
    tag: "New",
    title: "Watchers explain themselves",
    body: "Every alert now arrives with the segment and the likely cause, not just the number that moved.",
  },
  {
    date: "Oct 14, 2026",
    tag: "Improved",
    title: "Answers twice as fast",
    body: "Questions over 90 days of data now return in under two seconds for most workspaces.",
  },
  {
    date: "Sep 30, 2026",
    tag: "New",
    title: "Follow-up questions",
    body: "Ask “and on iOS?” after any answer. Plumb keeps the context of the thread.",
  },
];

const faqs = [
  {
    q: "Do I need to write SQL?",
    a: "No. You ask in plain words and Plumb writes the query. Every answer shows the query it ran, so you can check it or copy it.",
  },
  {
    q: "What happens when Plumb isn't sure?",
    a: "It says so. Answers with small samples or weak signals are labelled, and Plumb suggests what to measure next instead of guessing.",
  },
  {
    q: "Can Plumb change my data?",
    a: "No. In this concept, Plumb only reads. Warehouse connections use read-only credentials and nothing is written back.",
  },
  {
    q: "Is any of this real?",
    a: "Plumb is a fictional product designed by LN. The workspace, customers, numbers and prices on this page are invented for the demo.",
  },
];

export default function Plumb() {
  const [menu, setMenu] = useState(false);
  const [yearly, setYearly] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Plumb home">
            <Logo />
            Plumb
          </a>
          <nav aria-label="Main" className="nav-links">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} data-first={i === 0}>
                {l.label}
              </a>
            ))}
            <a href={LN}>Docs</a>
          </nav>
          <div className="nav-actions">
            <button type="button" className="text-button" onClick={concept}>
              Sign in
            </button>
            <Button onClick={concept}>Get started</Button>
            <Button
              variant="unstyled"
              className="menu-button"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent>
          <SheetTitle>Plumb</SheetTitle>
          <SheetDescription>
            Product analytics you can question.
          </SheetDescription>
          <nav aria-label="Mobile" className="sheet-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
                {l.label}
              </a>
            ))}
            <a href={LN}>Docs</a>
          </nav>
          <Button
            onClick={() => {
              setMenu(false);
              concept();
            }}
          >
            Get started
          </Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="frame" aria-hidden="true">
            <span className="corner tl" />
            <span className="corner tr" />
          </div>
          <div className="hero-stage">
            <div className="hero-sources">
              <ul className="sr-only">
                {sources.map((s) => (
                  <li key={s.label}>{s.label}</li>
                ))}
              </ul>
              {sources.map(({ icon: Icon, label, x, y }, i) => (
                <span
                  key={label}
                  className="source"
                  title={label}
                  aria-hidden="true"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDelay: `${1.1 + i * 0.08}s`,
                  }}
                >
                  <Icon size={19} strokeWidth={1.6} />
                </span>
              ))}
              <Beams />
            </div>
            <div className="hero-copy">
              <h1>
                <span className="rise" style={{ animationDelay: ".35s" }}>
                  Ask Your Metrics
                </span>
                <span className="rise" style={{ animationDelay: ".5s" }}>
                  Why
                  <span className="spark" aria-hidden="true">
                    <Sparkles size={30} strokeWidth={1.8} />
                  </span>
                  They Moved
                </span>
              </h1>
              <p className="rise" style={{ animationDelay: ".75s" }}>
                Type a question like you would ask a teammate. Plumb returns the
                chart, the segment behind it and the cause.
              </p>
              <div className="hero-ctas rise" style={{ animationDelay: ".9s" }}>
                <Button size="lg" onClick={concept}>
                  Get started{" "}
                  <span className="cta-note">Free up to 1M events</span>
                  <ArrowRight size={16} />
                </Button>
                <a className="button button-outline button-lg" href="#ask">
                  <Play size={14} /> Watch it think
                </a>
              </div>
            </div>
          </div>
          <div className="hero-app">
            <AskDemo />
          </div>
        </section>

        <section className="teams" aria-label="Fictional customers" data-reveal>
          <p>Product teams who stopped waiting on dashboards</p>
          <div className="wordmarks" aria-hidden="true">
            <span className="wm wm-1">Lanternfish</span>
            <span className="wm wm-2">MOSSCAP</span>
            <span className="wm wm-3">tidewell</span>
            <span className="wm wm-4">Cinderpath</span>
            <span className="wm wm-5">Halfmoon°</span>
            <span className="wm wm-6">orrery</span>
          </div>
        </section>

        <section className="section" id="ask">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">HOW IT ANSWERS</span>
            <h2>Every answer shows its work.</h2>
            <p>
              Plumb turns your question into a query, runs it on your events and
              ranks what changed. You see each step, so you can trust the result
              or challenge it.
            </p>
          </div>
          <Tabs defaultValue="drop" className="examples" data-reveal>
            <TabsList className="example-tabs">
              {examples.map((e) => (
                <TabsTrigger key={e.id} value={e.id}>
                  {e.tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {examples.map((e) => (
              <TabsContent key={e.id} value={e.id} className="example">
                <div className="step">
                  <span className="step-n mono">01 · YOU ASK</span>
                  <p className="step-question">“{e.question}”</p>
                </div>
                <div className="step">
                  <span className="step-n mono">02 · PLUMB QUERIES</span>
                  <pre className="mono">
                    {e.query.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </pre>
                </div>
                <div className="step step-answer">
                  <span className="step-n mono">03 · YOU GET THE WHY</span>
                  <div className="mini-bars" aria-hidden="true">
                    {e.chart.map((v, i) => (
                      <span
                        key={i}
                        style={{ height: `${v}%` }}
                        data-low={e.id === "drop" && i > 4}
                      />
                    ))}
                  </div>
                  <strong>{e.result}</strong>
                  <p>{e.reason}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="section" id="product">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRODUCT</span>
            <h2>The whole toolkit, one question away.</h2>
            <p>
              Funnels, retention and experiments are still here. You just don’t
              have to build them first.
            </p>
          </div>
          <div className="bento">
            <article className="tile tile-funnel" data-reveal>
              <div className="tile-visual funnel" aria-hidden="true">
                {[100, 72, 51, 38].map((v, i) => (
                  <span key={v} style={{ width: `${v}%` }}>
                    <em className="mono">
                      {["Signed up", "Invited", "First chart", "Shared"][i]}
                    </em>
                    <b className="mono">{v}%</b>
                  </span>
                ))}
              </div>
              <h3>Funnels that point at the leak</h3>
              <p>
                Plumb marks the step losing the most people and the segment it’s
                losing them from.
              </p>
            </article>
            <article className="tile tile-retention" data-reveal>
              <div className="tile-visual heat" aria-hidden="true">
                {Array.from({ length: 36 }, (_, i) => {
                  const row = Math.floor(i / 6);
                  const col = i % 6;
                  const hidden = col > 5 - row;
                  return (
                    <span
                      key={i}
                      style={{
                        opacity: hidden ? 0 : 1 - col * 0.14 - row * 0.03,
                      }}
                    />
                  );
                })}
              </div>
              <h3>Retention by any cohort</h3>
              <p>
                Weekly curves for every plan, channel or feature, built from a
                sentence.
              </p>
            </article>
            <article className="tile tile-watch" data-reveal>
              <div className="tile-visual alert" aria-hidden="true">
                <span className="alert-icon">
                  <Bell size={14} />
                </span>
                <div>
                  <strong>Checkout errors up 3.2×</strong>
                  <span>
                    Safari 18 · since 14:05 · likely cause: payment form update
                  </span>
                </div>
              </div>
              <h3>Watchers that explain themselves</h3>
              <p>
                Plumb keeps an eye on the metrics you care about and tells you
                what moved them.
              </p>
            </article>
            <article className="tile tile-exp" data-reveal>
              <div className="tile-visual exp" aria-hidden="true">
                <div>
                  <span className="mono">CONTROL</span>
                  <i style={{ width: "58%" }} />
                  <b>41.2%</b>
                </div>
                <div>
                  <span className="mono">VARIANT</span>
                  <i style={{ width: "66%" }} data-win="true" />
                  <b>46.0%</b>
                </div>
              </div>
              <h3>Experiments with guardrails</h3>
              <p>
                Results arrive with confidence, sample size and the metrics that
                must not get worse.
              </p>
            </article>
            <article className="tile tile-share" data-reveal>
              <div className="tile-visual share" aria-hidden="true">
                <span className="share-chip">#growth</span>
                <span className="share-card">
                  <Sparkles size={13} /> Onboarding −5.6 pts · Android 5.8
                </span>
              </div>
              <h3>Answers your team can reuse</h3>
              <p>
                Pin a question to a board or send it to a channel. It refreshes
                itself every morning.
              </p>
            </article>
          </div>
        </section>

        <section className="section trust">
          <div className="trust-grid">
            {[
              {
                icon: Eye,
                title: "Shows the query",
                body: "Every chart links to the exact query behind it. Copy it, edit it, or run it yourself.",
              },
              {
                icon: Lock,
                title: "Reads, never writes",
                body: "Plumb connects with read-only access. Your events and warehouse stay exactly as they are.",
              },
              {
                icon: Check,
                title: "Says when it’s unsure",
                body: "Small samples and weak signals are flagged, with a suggestion for what to measure next.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="trust-item" data-reveal>
                <span className="trust-icon">
                  <Icon size={17} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRICING</span>
            <h2>Pay for events, not for seats.</h2>
            <p>
              Invite the whole company. Everyone can ask questions on every
              plan.
            </p>
            <div className="billing" role="group" aria-label="Billing period">
              <button
                type="button"
                aria-pressed={!yearly}
                onClick={() => setYearly(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={yearly}
                onClick={() => setYearly(true)}
              >
                Yearly <em>−17%</em>
              </button>
            </div>
          </div>
          <div className="plans">
            {plans.map((p) => {
              const price = yearly ? p.yearly : p.monthly;
              return (
                <article
                  className="plan"
                  key={p.name}
                  data-featured={p.featured}
                  data-reveal
                >
                  <header>
                    <h3>{p.name}</h3>
                    {p.featured && <span className="badge">Most teams</span>}
                  </header>
                  <p className="plan-note">{p.note}</p>
                  <p className="price">
                    {price === null ? (
                      <strong>Custom</strong>
                    ) : (
                      <>
                        <strong>${price}</strong>
                        <span>
                          / month{price > 0 && yearly ? ", billed yearly" : ""}
                        </span>
                      </>
                    )}
                  </p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={14} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={p.featured ? "default" : "outline"}
                    onClick={concept}
                  >
                    {p.cta}
                  </Button>
                </article>
              );
            })}
          </div>
          <p className="fine">
            Fictional prices for a concept product. Nothing is billed.
          </p>
        </section>

        <section className="section split" id="changelog">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">CHANGELOG</span>
            <h2>Shipped lately.</h2>
          </div>
          <ol className="changelog">
            {changelog.map((c) => (
              <li key={c.title} data-reveal>
                <span className="mono">{c.date}</span>
                <div>
                  <em data-tag={c.tag}>{c.tag}</em>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section split" id="faq">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">QUESTIONS</span>
            <h2>Before you ask Plumb.</h2>
          </div>
          <Accordion className="faq" data-reveal>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="closing" data-reveal>
          <span className="closing-mark" aria-hidden="true">
            <Logo />
          </span>
          <h2>Your first answer is five minutes away.</h2>
          <p>Paste one snippet, ask one question. Plumb does the digging.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>
              Get started <ArrowRight size={16} />
            </Button>
            <a className="button button-outline button-lg" href="#top">
              Try the demo again
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand">
            <Logo /> Plumb
          </a>
          <nav aria-label="Footer">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href={LN}>Docs</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            Plumb is a fictional product. The workspace, customers, figures and
            prices are invented for this demo.
          </p>
          <p>
            Designed and developed by <a href={LN}>LN</a> ·{" "}
            <a href={SOURCE}>Source</a> ·{" "}
            <a href={SUPPORT}>
              Support the project <ArrowUpRight size={12} />
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </>
  );
}
