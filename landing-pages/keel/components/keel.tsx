"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
  GitMerge,
  Gauge,
  Inbox,
  Lock,
  Menu,
  Minus,
  Plus,
  Play,
  Download,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import { Pill, spring, useActiveSection, CountIn } from "./motion-kit";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { Avatar, KeelApp, PriorityIcon, StatusIcon } from "./keel-app";
import { Logo } from "./logo";
import { nextStatus, priorityLabel, statusLabel, type Person, type Priority, type Status } from "./data";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE = "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/keel";

const links = [
  { href: "#method", label: "Method" },
  { href: "#keyboard", label: "Keyboard" },
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#changelog", label: "Changelog" },
];
const sections = ["method", "keyboard", "product", "pricing", "changelog", "faq"];
const lift = { whileHover: { y: -4 }, transition: spring };

const concept = () =>
  toast("Keel is a concept by LN", {
    description: "There is no workspace to create. Play with the demo instead.",
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

// Roadmap lanes drawn behind the hero: left and width in %, a done share, and a status.
const lanes = [
  { y: 6, bars: [{ id: "HAL-198", l: 30, w: 22, done: 1 }, { id: "HAL-226", l: 58, w: 30, done: 0.2 }] },
  { y: 18, bars: [{ id: "HAL-207", l: 40, w: 34, done: 0.8 }] },
  { y: 30, bars: [{ id: "HAL-214", l: 50, w: 20, done: 0.55 }, { id: "HAL-231", l: 74, w: 22, done: 0 }] },
  { y: 42, bars: [{ id: "HAL-219", l: 62, w: 26, done: 0.35 }] },
];

function Lanes() {
  return (
    <div className="lanes" aria-hidden="true">
      {lanes.map((lane, r) => (
        <div key={r} className="lane" style={{ top: `${lane.y}%` }}>
          {lane.bars.map((b, i) => (
            <span
              key={b.id}
              className="lane-bar"
              data-done={b.done === 1 || undefined}
              style={{ left: `${b.l}%`, width: `${b.w}%`, animationDelay: `${1 + r * 0.14 + i * 0.1}s`, ["--done" as string]: `${b.done * 100}%` }}
            >
              <b className="mono">{b.id}</b>
            </span>
          ))}
        </div>
      ))}
      <span className="lane-today" style={{ left: "64%" }}>
        <i className="mono">Today</i>
      </span>
    </div>
  );
}

const flowMeta: Record<string, { key: string; status: string; sub: string }> = {
  triage: { key: "HAL-231", status: "Triaged", sub: "A report comes in" },
  cycles: { key: "Cycle 24", status: "Planned", sub: "The work gets planned" },
  roadmap: { key: "Q4 update", status: "On track", sub: "Everyone sees it ship" },
};

function sparkPts(v: number[]) {
  const max = Math.max(...v);
  return v.map((n, i) => [(i / (v.length - 1)) * 100, 37 - (n / max) * 30] as const);
}

const examples = [
  {
    id: "triage",
    tab: "Triage",
    question: "A customer says the coupon field breaks checkout.",
    steps: [
      "label        Bug · Checkout",
      "priority     Urgent, 41 customers affected",
      "duplicate    none found, similar to HAL-188",
      "owner        Ana Moretti, owns checkout.ts",
      "cycle        added to Cycle 24",
    ],
    chart: [20, 34, 52, 70, 88, 100],
    result: "Fixed and shipped in 2 days.",
    reason: "Keel filed it, sorted it and told the 41 customers when it shipped.",
  },
  {
    id: "cycles",
    tab: "Cycles",
    question: "Plan the next two weeks without a planning meeting.",
    steps: [
      "capacity     36 points, 5 people",
      "carry over   3 issues from Cycle 23",
      "pulled in    6 issues by priority",
      "at risk      Billing portal, 2 blocked",
      "starts       Monday 09:00",
    ],
    chart: [8, 18, 30, 44, 58, 72],
    result: "Cycle 24 is planned at 94% capacity.",
    reason: "Unfinished work rolls over on its own. Nobody copies tickets by hand.",
  },
  {
    id: "roadmap",
    tab: "Roadmaps",
    question: "Tell leadership where the quarter stands.",
    steps: [
      "projects     5 active, 1 at risk",
      "checkout v3  64%, on track for Dec 14",
      "offline      38%, slipping a week",
      "updates      written from this week's issues",
      "shared       #leadership, every Friday",
    ],
    chart: [64, 38, 52, 21, 8, 30],
    result: "One update, written from the work itself.",
    reason: "Project health comes from real progress, not from status meetings.",
  },
];

const plans = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    note: "For small teams getting started.",
    features: ["Up to 3 members", "Unlimited issues", "Cycles & board", "GitHub & GitLab sync"],
    cta: "Start for free",
  },
  {
    name: "Team",
    monthly: 11,
    yearly: 9,
    per: true,
    note: "For product teams shipping every week.",
    features: ["Unlimited members", "Roadmaps & projects", "Keel Assist triage", "Insights & cycle reports", "Customer requests"],
    cta: "Start a 14-day trial",
    featured: true,
  },
  {
    name: "Scale",
    monthly: null,
    yearly: null,
    note: "For many teams and strict reviews.",
    features: ["SSO & SCIM", "Audit log", "Data residency choice", "Dedicated success manager"],
    cta: "Talk to us",
  },
];

const changelog = [
  { date: "Nov 3, 2026", tag: "New", title: "Keel Assist triage", body: "New issues arrive with a label, a priority and a suggested owner. Accept or change them in one key." },
  { date: "Oct 20, 2026", tag: "Improved", title: "Board drag is twice as smooth", body: "Cards now follow the cursor at your screen's refresh rate, even with 2,000 issues on screen." },
  { date: "Oct 6, 2026", tag: "New", title: "Project updates from the work", body: "Keel drafts the Friday update from what actually moved this week. Edit it, then share it." },
];

const faqs = [
  { q: "Do we have to change how we work?", a: "No. Keel works with cycles, with a simple board or with neither. Start with a list of issues and add the rest when you need it." },
  { q: "Does Keel Assist change things on its own?", a: "Never. It suggests a label, a priority or an owner, and nothing changes until someone accepts it." },
  { q: "Can we bring our issues from another tool?", a: "In this concept, an importer copies issues, comments and labels in a few minutes. Nothing is deleted from the old tool." },
  { q: "Is any of this real?", a: "Keel is a fictional product designed by LN. The team, issues, customers and prices on this page are invented for the demo." },
];

const keys = [
  { k: "C", label: "Create issue" },
  { k: "S", label: "Change status" },
  { k: "P", label: "Set priority" },
  { k: "A", label: "Assign to me" },
  { k: "L", label: "Add label" },
  { k: "X", label: "Select" },
];

function KeyboardDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [pressed, setPressed] = useState<string | null>(null);
  const [last, setLast] = useState("Press a key, or click one.");
  const [rows, setRows] = useState<{ id: string; title: string; s: Status; p: Priority; who: Person; label: string; sel: boolean }[]>([
    { id: "HAL-240", title: "Export a cycle report as PDF", s: "todo", p: 2, who: "JK", label: "Feature", sel: true },
    { id: "HAL-238", title: "Remember the last board filter", s: "progress", p: 1, who: "AM", label: "Polish", sel: false },
    { id: "HAL-236", title: "Webhook for status changes", s: "review", p: 3, who: "RD", label: "Infra", sel: false },
  ]);
  const press = (k: string) => {
    setPressed(k);
    window.setTimeout(() => setPressed(null), 180);
    setRows((r) => {
      const [top, ...rest] = r;
      switch (k) {
        case "C": {
          const n = r.length - 2;
          setLast(`Created HAL-${240 + n}`);
          return [{ id: `HAL-${240 + n}`, title: ["Share a view with a link", "Bulk edit labels", "Pin a project to the sidebar"][n % 3], s: "backlog", p: 0, who: "RD", label: "Polish", sel: true }, ...r.map((x) => ({ ...x, sel: false }))];
        }
        case "S": {
          const s = nextStatus[top.s];
          setLast(`Status → ${statusLabel[s]}`);
          return [{ ...top, s }, ...rest];
        }
        case "P": {
          const p = ((top.p + 1) % 5) as Priority;
          setLast(`Priority → ${priorityLabel[p]}`);
          return [{ ...top, p }, ...rest];
        }
        case "A":
          setLast("Assigned to Lea Tran");
          return [{ ...top, who: "LT" }, ...rest];
        case "L": {
          const label = top.label === "Bug" ? "Feature" : "Bug";
          setLast(`Label → ${label}`);
          return [{ ...top, label }, ...rest];
        }
        case "X":
          setLast(top.sel ? "Selection cleared" : "1 issue selected");
          return [{ ...top, sel: !top.sel }, ...rest];
      }
      return r;
    });
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const k = e.key.toUpperCase();
      if (keys.some((x) => x.k === k)) press(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <div className="kbd-demo" ref={ref} data-reveal>
      <div className="keys">
        {keys.map(({ k, label }) => (
          <motion.button
            key={k}
            type="button"
            className="key"
            data-pressed={pressed === k}
            onClick={() => press(k)}
            whileTap={{ y: 3 }}
            transition={spring}
          >
            <kbd>{k}</kbd>
            <span>{label}</span>
          </motion.button>
        ))}
      </div>
      <div className="kbd-preview">
        <p className="mono kbd-last">
          <AnimatePresence mode="wait">
            <motion.span key={last} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              {last}
            </motion.span>
          </AnimatePresence>
        </p>
        <ul>
          <AnimatePresence initial={false}>
            {rows.slice(0, 4).map((r) => (
              <motion.li
                key={r.id}
                layout
                className="row"
                data-selected={r.sel}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={spring}
              >
                <PriorityIcon p={r.p} />
                <span className="row-id mono">{r.id}</span>
                <StatusIcon s={r.s} />
                <span className="row-title">{r.title}</span>
                <span className="label" data-label={r.label}>{r.label}</span>
                <Avatar who={r.who} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default function Keel() {
  const [menu, setMenu] = useState(false);
  const [example, setExample] = useState("triage");
  const { active, select } = useActiveSection(sections);
  const [yearly, setYearly] = useState(true);
  const [seats, setSeats] = useState(12);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const seat = yearly ? 9 : 11;

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Keel home">
            <Logo />
            Keel
          </a>
          <nav aria-label="Main" className="nav-links">
            {links.map((l) => {
              const id = l.href.slice(1);
              const on = active === id;
              return (
                <a key={l.href} href={l.href} aria-current={on ? "location" : undefined} onClick={() => select(id)}>
                  {on && <Pill id="nav-pill" className="pill nav-pill" />}
                  <span>{l.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="nav-actions">
            <button type="button" className="text-button" onClick={concept}>Log in</button>
            <Button onClick={concept}>Start building</Button>
            <Button variant="unstyled" className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent>
          <SheetTitle>Keel</SheetTitle>
          <SheetDescription>The issue tracker that keeps pace.</SheetDescription>
          <nav aria-label="Mobile" className="sheet-links">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                aria-current={active === l.href.slice(1) ? "location" : undefined}
                onClick={() => { select(l.href.slice(1)); setMenu(false); }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.08 + i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>
          <Button onClick={() => { setMenu(false); concept(); }}>Start building</Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="frame" aria-hidden="true">
            <span className="corner tl" />
            <span className="corner tr" />
          </div>
          <div className="hero-stage">
            <Lanes />
            <div className="hero-copy hero-split">
              <button type="button" className="announce rise" style={{ animationDelay: ".2s" }} onClick={() => document.getElementById("method")?.scrollIntoView()}>
                <em>New</em> Keel Assist now triages your inbox <ArrowRight size={13} />
              </button>
              <h1>
                <span className="rise" style={{ animationDelay: ".35s" }}>Keep every project</span>
                <span className="rise" style={{ animationDelay: ".5s" }}>
                  moving <span className="forward">forward.</span>
                </span>
              </h1>
              <div className="hero-side">
                <p className="rise" style={{ animationDelay: ".75s" }}>
                  Keel is the issue tracker for teams that ship every week. Plan cycles, triage bugs and watch the roadmap move, without leaving the keyboard.
                </p>
                <div className="hero-ctas rise" style={{ animationDelay: ".9s" }}>
                  <Button size="lg" onClick={concept}>
                    Start building <span className="cta-note">Free for 3 people</span>
                    <ArrowRight size={16} />
                  </Button>
                  <a className="button button-outline button-lg" href="#method">
                    <Play size={14} /> See it move
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-app">
            <KeelApp />
            <p className="hint mono">Click a status circle, drag a card on the board or press ⌘K.</p>
          </div>
        </section>

        <section className="teams" aria-label="Fictional customers" data-reveal>
          <p>Product teams who stopped losing tickets</p>
          <div className="wordmarks" aria-hidden="true">
            <span className="wm wm-1">Brightloom</span>
            <span className="wm wm-2">QUARRY</span>
            <span className="wm wm-3">fennel</span>
            <span className="wm wm-4">Oxbow</span>
            <span className="wm wm-5">Sablewood°</span>
            <span className="wm wm-6">nimbus/io</span>
          </div>
        </section>

        <section className="section" id="method">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">THE KEEL METHOD</span>
            <h2>From report to release, without the busywork.</h2>
            <p>Issues come in, get sorted, get planned and get shipped. Keel does the sorting and keeps everyone looking at the same picture.</p>
          </div>
          <Tabs value={example} onValueChange={(v) => setExample(String(v))} className="flow" data-reveal>
            <TabsList className="flow-track">
              {examples.map((e, i) => (
                <TabsTrigger key={e.id} value={e.id} className="flow-stage" data-done={examples.findIndex((x) => x.id === example) > i || undefined}>
                  <span className="flow-num mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flow-label">
                    <b>{e.tab}</b>
                    <small aria-hidden="true">{flowMeta[e.id].sub}</small>
                  </span>
                </TabsTrigger>
              ))}
              <span className="flow-line" aria-hidden="true">
                <motion.i animate={{ width: `${(examples.findIndex((x) => x.id === example) / (examples.length - 1)) * 100}%` }} transition={spring} />
              </span>
            </TabsList>
            {examples.map((e) => (
              <TabsContent key={e.id} value={e.id} className="flow-sheet">
                <div className="sheet-main">
                  <div className="sheet-head">
                    <span className="mono sheet-key">{flowMeta[e.id].key}</span>
                    <span className="sheet-status">
                      <i /> {flowMeta[e.id].status}
                    </span>
                  </div>
                  <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                    {e.question}
                  </motion.h3>
                  <dl className="sheet-props">
                    {e.steps.map((l, i) => {
                      const [k, ...rest] = l.split(/\s{2,}/);
                      return (
                        <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.12 + i * 0.07 }}>
                          <dt className="mono">{k}</dt>
                          <dd>{rest.join(" ")}</dd>
                        </motion.div>
                      );
                    })}
                  </dl>
                </div>
                <motion.aside className="sheet-out" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.2 }}>
                  <span className="mono sheet-out-k">
                    <Check size={12} /> Outcome
                  </span>
                  <strong>{e.result}</strong>
                  <p>{e.reason}</p>
                  <motion.svg
                    className="sheet-spark"
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    initial={{ opacity: 0, scaleY: 0.2 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ ...spring, delay: 0.3 }}
                  >
                    <path d={`M0 40 ${sparkPts(e.chart).map(([x, y]) => `L${x} ${y}`).join(" ")} L100 40 Z`} className="spark-area" />
                    <path d={sparkPts(e.chart).map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")} className="spark-line" />
                  </motion.svg>
                </motion.aside>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="section" id="keyboard">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">KEYBOARD FIRST</span>
            <h2>Your hands never leave the keys.</h2>
            <p>Every action has a shortcut and every shortcut answers in under 50 ms. Try them here, on your own keyboard.</p>
          </div>
          <KeyboardDemo />
        </section>

        <section className="section" id="product">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRODUCT</span>
            <h2>Everything the work needs. Nothing it doesn’t.</h2>
            <p>Triage, cycles, roadmaps and insights share one model of your work, so nothing drifts out of date.</p>
          </div>
          <div className="bento">
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual triage" aria-hidden="true">
                {[
                  { t: "Pay button greyed out after coupon", c: "Bug", w: "AM", d: 0 },
                  { t: "Allow PDF invoices per team", c: "Feature", w: "RD", d: 1 },
                  { t: "Typo in the welcome email", c: "Polish", w: "JK", d: 2 },
                ].map((r) => (
                  <motion.span
                    key={r.t}
                    className="triage-row"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: 0.15 + r.d * 0.12 }}
                  >
                    <Inbox size={12} /> {r.t}
                    <span className="label" data-label={r.c}>{r.c}</span>
                    <Avatar who={r.w as Person} size={18} />
                  </motion.span>
                ))}
              </div>
              <h3>An inbox that sorts itself</h3>
              <p>Reports from support, Slack and email land in one place, already labelled, prioritised and routed.</p>
            </motion.article>
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual insight" aria-hidden="true">
                <div className="insight-head">
                  <span className="mono">CYCLE TIME, DAYS</span>
                  <b><CountIn value={2.4} format={{ maximumFractionDigits: 1 }} /> <em>−38%</em></b>
                </div>
                <div className="insight-bars">
                  {[5.1, 4.6, 4.2, 3.9, 3.3, 3.0, 2.7, 2.4].map((v, i) => (
                    <motion.i key={i} initial={{ height: 0 }} whileInView={{ height: `${(v / 5.4) * 100}%` }} viewport={{ once: true }} transition={{ ...spring, delay: 0.1 + i * 0.05 }} />
                  ))}
                </div>
              </div>
              <h3>Insights without a dashboard project</h3>
              <p>Cycle time, scope creep and throughput, measured from the work your team already does.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual git" aria-hidden="true">
                <span><GitBranch size={13} /> lea/hal-219-offline-queue</span>
                <span><GitMerge size={13} /> PR #482 merged</span>
                <span className="git-done"><StatusIcon s="done" /> HAL-219 moved to Done</span>
              </div>
              <h3>Branches close their issues</h3>
              <p>Name a branch after an issue. Merge it, and Keel moves the issue for you.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual requests" aria-hidden="true">
                <MessageSquare size={14} />
                <strong><CountIn value={41} /> customers</strong>
                <span>asked for saved cards</span>
                <div className="faces">
                  {(["AM", "JK", "SP", "RD"] as Person[]).map((p) => <Avatar key={p} who={p} size={22} />)}
                </div>
              </div>
              <h3>Customer requests, counted</h3>
              <p>Every request links to the customer who asked, so you know who to tell when it ships.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual speed" aria-hidden="true">
                <Gauge size={16} />
                <strong><CountIn value={38} suffix=" ms" /></strong>
                <span>median time per action</span>
              </div>
              <h3>Fast on every screen</h3>
              <p>Keel keeps a copy of your workspace on your device and syncs in the background.</p>
            </motion.article>
          </div>
        </section>

        <section className="section trust">
          <div className="trust-grid">
            {[
              { icon: Gauge, title: "Instant by design", body: "Actions happen on your device first and sync after. Nothing waits on a spinner." },
              { icon: Lock, title: "Private by default", body: "Issues stay inside your workspace. Keel Assist never trains on your team’s work." },
              { icon: Download, title: "Yours to take", body: "Export every issue, comment and file at any time, in open formats." },
            ].map(({ icon: Icon, title, body }) => (
              <motion.div key={title} className="trust-item" data-reveal whileHover="hover">
                <motion.span className="trust-icon" variants={{ hover: { y: -3, rotate: -6 } }} transition={spring}>
                  <Icon size={17} />
                </motion.span>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRICING</span>
            <h2>Start free. Pay as the team grows.</h2>
            <p>Every plan includes unlimited issues and the full keyboard. Guests and viewers are always free.</p>
            <div className="billing" role="group" aria-label="Billing period">
              <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
                {!yearly && <Pill id="billing-pill" />}
                <span>Monthly</span>
              </button>
              <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
                {yearly && <Pill id="billing-pill" />}
                <span>Yearly <em>−18%</em></span>
              </button>
            </div>
          </div>
          <div className="plans">
            {plans.map((p) => {
              const price = yearly ? p.yearly : p.monthly;
              return (
                <motion.article className="plan" key={p.name} data-featured={p.featured} data-reveal {...lift}>
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
                        <strong>
                          <NumberFlow value={price} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} locales="en-US" />
                        </strong>
                        <span>{p.per ? "per member / month" : "forever"}</span>
                      </>
                    )}
                  </p>
                  {p.per && (
                    <div className="seats">
                      <span>Members</span>
                      <div className="stepper">
                        <button type="button" aria-label="Fewer members" onClick={() => setSeats((s) => Math.max(4, s - 1))}><Minus size={13} /></button>
                        <b><NumberFlow value={seats} /></b>
                        <button type="button" aria-label="More members" onClick={() => setSeats((s) => Math.min(200, s + 1))}><Plus size={13} /></button>
                      </div>
                      <em>
                        <NumberFlow value={seats * seat} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} locales="en-US" /> / month
                      </em>
                    </div>
                  )}
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}><Check size={14} /> {f}</li>
                    ))}
                  </ul>
                  <Button variant={p.featured ? "default" : "outline"} onClick={concept}>{p.cta}</Button>
                </motion.article>
              );
            })}
          </div>
          <p className="fine">Fictional prices for a concept product. Nothing is billed.</p>
        </section>

        <section className="section split" id="changelog">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">CHANGELOG</span>
            <h2>Shipped this month.</h2>
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
            <h2>Before you switch.</h2>
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
            <motion.span className="swing" animate={{ rotate: [-7, 7] }} transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}>
              <Logo />
            </motion.span>
          </span>
          <h2>Clear the backlog by Friday.</h2>
          <p>Import your issues in minutes. Keel sorts them before your first standup.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>Start building <ArrowRight size={16} /></Button>
            <a className="button button-outline button-lg" href="#top">Back to the demo</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand"><Logo /> Keel</a>
          <nav aria-label="Footer">
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Keel is a fictional product. The team, issues, customers and prices are invented for this demo.</p>
          <p>
            Designed and developed by <a href={LN}>LN</a> · <a href={SOURCE}>Source</a> ·{" "}
            <a href={SUPPORT}>Support the project <ArrowUpRight size={12} /></a>
          </p>
        </div>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}

