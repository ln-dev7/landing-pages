"use client";
import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ClipboardList,
  CreditCard,
  Database,
  FileText,
  FolderOpen,
  Globe,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  Plus,
  RotateCw,
  Sheet as SheetIcon,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { CanvasDemo } from "./canvas-demo";
import { Pill, spring, useActiveSection } from "./motion-kit";
import { Logo } from "./logo";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE =
  "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/knot";

const links = [
  { href: "#demo", label: "Try it" },
  { href: "#how", label: "How it works" },
  { href: "#recipes", label: "Recipes" },
  { href: "#guardrails", label: "Guardrails" },
  { href: "#pricing", label: "Pricing" },
];
const sections = ["demo", "how", "recipes", "guardrails", "pricing", "faq"];

const concept = () =>
  toast("Knot is a concept by LN", {
    description: "Nothing to sign up for. The canvas above is the whole demo.",
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
      { rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const apps = [
  { name: "Mail", icon: Mail, c: "pink" },
  { name: "Chat", icon: MessageSquare, c: "blue" },
  { name: "Sheets", icon: SheetIcon, c: "mint" },
  { name: "Payments", icon: CreditCard, c: "yellow" },
  { name: "Calendar", icon: CalendarDays, c: "orange" },
  { name: "CRM", icon: Users, c: "blue" },
  { name: "Docs", icon: FileText, c: "mint" },
  { name: "Forms", icon: ClipboardList, c: "pink" },
  { name: "Storage", icon: FolderOpen, c: "yellow" },
  { name: "Tickets", icon: Ticket, c: "orange" },
  { name: "Database", icon: Database, c: "pink" },
  { name: "Web", icon: Globe, c: "mint" },
];

const parts = [
  {
    id: "when",
    text: "When a form is submitted,",
    kind: "trigger",
    block: "Form submitted",
  },
  {
    id: "then",
    text: "add the answers to our sheet",
    kind: "action",
    block: "Add a row",
  },
  {
    id: "and",
    text: "and thank them by email.",
    kind: "ai",
    block: "Write + send thanks",
  },
];

const recipes = [
  {
    id: "r1",
    team: "Finance",
    title: "Chase failed payments",
    steps: ["Payment failed", "Write a kind email", "Send it", "Tell #billing"],
    flow: "payments",
    c: "yellow",
  },
  {
    id: "r2",
    team: "Ops",
    title: "Monday sign-up report",
    steps: [
      "Every Monday 9:00",
      "Count sign-ups",
      "Chart them",
      "Send to #team",
    ],
    flow: "weekly",
    c: "mint",
  },
  {
    id: "r3",
    team: "Sales",
    title: "Brief every demo",
    steps: [
      "Demo booked",
      "Research the company",
      "Check the size",
      "Brief the lead",
    ],
    flow: "demo",
    c: "pink",
  },
  {
    id: "r4",
    team: "Support",
    title: "Route angry tickets",
    steps: [
      "New ticket",
      "Read the tone",
      "If upset, tag urgent",
      "Page the lead",
    ],
    c: "blue",
  },
  {
    id: "r5",
    team: "Sales",
    title: "Log calls to the CRM",
    steps: ["Call ends", "Summarise it", "Update the deal", "Set a follow-up"],
    c: "orange",
  },
  {
    id: "r6",
    team: "Ops",
    title: "Archive old files",
    steps: [
      "Every Friday",
      "Find files over a year",
      "Move to archive",
      "Post a recap",
    ],
    c: "pink",
  },
  {
    id: "r7",
    team: "Support",
    title: "Answer FAQ emails",
    steps: [
      "Email arrives",
      "Match to the FAQ",
      "Draft a reply",
      "Wait for approval",
    ],
    c: "mint",
  },
  {
    id: "r8",
    team: "Finance",
    title: "Collect receipts",
    steps: [
      "Receipt in inbox",
      "Read the amount",
      "Add to the sheet",
      "Flag over $500",
    ],
    c: "yellow",
  },
];
const teams = ["All", "Sales", "Support", "Ops", "Finance"] as const;

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. You describe what should happen in a sentence. Knot builds the steps, and you can drag them around or switch them off without touching code.",
  },
  {
    q: "What happens when a step fails?",
    a: "Knot retries with a backoff, then pauses the knot and tells you, depending on your guardrails. Nothing keeps failing silently.",
  },
  {
    q: "Can Knot send things without asking?",
    a: "Only if you let it. Turn on approvals and every email or message waits for a thumbs-up first.",
  },
  {
    q: "Is any of this real?",
    a: "Knot is a fictional product designed by LN. Apps, customers, runs and prices on this page are invented. Nothing is connected or sent.",
  },
];

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="switch"
      onClick={() => onChange(!checked)}
    >
      <motion.i
        layout
        transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
      />
    </button>
  );
}

export default function Knot() {
  const [menu, setMenu] = useState(false);
  const [flowId, setFlowId] = useState("payments");
  const [part, setPart] = useState<string | null>(null);
  const [team, setTeam] = useState<(typeof teams)[number]>("All");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [approve, setApprove] = useState(true);
  const [dryRun, setDryRun] = useState(false);
  const [pauseAfter, setPauseAfter] = useState(3);
  const [yearly, setYearly] = useState(true);
  const hero = useRef<HTMLElement>(null);
  const { active, select } = useActiveSection(sections);
  useReveal();

  const openFlow = (id: string) => {
    setFlowId(id);
    select("demo");
    document
      .getElementById("demo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const shown = recipes.filter((r) => team === "All" || r.team === team);
  const price = (m: number) => (yearly ? Math.round(m * 0.8) : m);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Knot home">
            <Logo /> knot
          </a>
          <nav aria-label="Main" className="nav-links">
            {links.map((l) => {
              const id = l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active === id ? "location" : undefined}
                  onClick={() => select(id)}
                >
                  {active === id && (
                    <Pill id="nav-pill" className="pill nav-pill" />
                  )}
                  <span>{l.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="nav-actions">
            <a className="text-link" href={LN}>
              Docs
            </a>
            <Button onClick={concept}>Get Knot free</Button>
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
          <SheetTitle>knot</SheetTitle>
          <SheetDescription>
            One sentence in. A working automation out.
          </SheetDescription>
          <nav aria-label="Mobile" className="sheet-links">
            {[...links, { href: LN, label: "Docs" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => {
                  if (l.href.startsWith("#")) select(l.href.slice(1));
                  setMenu(false);
                }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.06 + i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>
          <Button
            onClick={() => {
              setMenu(false);
              concept();
            }}
          >
            Get Knot free
          </Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top" ref={hero}>
          <div className="hero-copy">
            <motion.span
              className="tag"
              initial={{ opacity: 0, y: 10, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 0.7,
                delay: 0.1,
              }}
            >
              New · branches and approvals
            </motion.span>
            <h1>
              {["One", "sentence", "in."].map((w, i) => (
                <motion.span
                  key={w}
                  className={w === "sentence" ? "mark mark-yellow" : undefined}
                  initial={{ opacity: 0, y: 40, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.45,
                    duration: 0.8,
                    delay: 0.15 + i * 0.07,
                  }}
                >
                  {w}
                </motion.span>
              ))}
              <br />
              {["A", "working", "automation", "out."].map((w, i) => (
                <motion.span
                  key={w}
                  className={w === "automation" ? "mark mark-pink" : undefined}
                  initial={{ opacity: 0, y: 40, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.45,
                    duration: 0.8,
                    delay: 0.4 + i * 0.07,
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.75 }}
            >
              Tell Knot what should happen, the way you would tell a coworker.
              It wires your apps, tests the steps and keeps the chore running
              while you do something else.
            </motion.p>
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.85 }}
            >
              <Button size="lg" onClick={concept}>
                Get Knot free <ArrowRight size={16} />
              </Button>
              <a
                className="button button-outline button-lg"
                href="#demo"
                onClick={() => select("demo")}
              >
                Try the canvas
              </a>
            </motion.div>
          </div>
          {[
            { t: "No code", c: "mint", pos: { left: "6%", top: 330 }, r: -10 },
            { t: "★ 4.9 from 2,300 teams", c: "yellow", pos: { right: "5%", top: 70 }, r: 6 },
            { t: "Runs 24/7", c: "blue", pos: { right: "7%", top: 430 }, r: -6 },
            { t: "Undo anything", c: "orange", pos: { left: "9%", top: 560 }, r: 8 },
          ].map((s, i) => (
            <motion.span
              key={s.t}
              className="sticker"
              data-c={s.c}
              style={s.pos}
              drag
              dragConstraints={hero}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, rotate: 0, cursor: "grabbing" }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.4, rotate: s.r * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: s.r }}
              transition={{
                type: "spring",
                bounce: 0.55,
                duration: 0.8,
                delay: 1 + i * 0.12,
              }}
              aria-hidden="true"
            >
              {s.t}
            </motion.span>
          ))}
          <motion.div
            className="hero-demo"
            id="demo"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, duration: 0.9, delay: 0.9 }}
          >
            <CanvasDemo flowId={flowId} onFlowChange={setFlowId} />
          </motion.div>
        </section>

        <section className="apps" aria-label="Example apps">
          <p className="mono">
            Plays nicely with 400+ apps you already pay for
          </p>
          {[0, 1].map((row) => (
            <div key={row} className="marquee" data-reverse={row === 1}>
              <div className="marquee-track">
                {[...apps, ...apps].map((a, i) => {
                  const Icon = a.icon;
                  const item = row === 1 ? apps[(i + 5) % apps.length] : a;
                  const ItemIcon = row === 1 ? item.icon : Icon;
                  return (
                    <span
                      key={`${row}-${i}`}
                      className="app-tile"
                      data-c={item.c}
                      aria-hidden={i >= apps.length}
                    >
                      <ItemIcon size={16} /> {item.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="section how" id="how">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">How it works</span>
            <h2>Knot reads your sentence like a recipe.</h2>
            <p>
              Point at a part of the sentence to see the step it turns into.
            </p>
          </div>
          <div className="parser" data-reveal>
            <p className="sentence">
              {parts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="chunk"
                  data-kind={p.kind}
                  aria-pressed={part === p.id}
                  onMouseEnter={() => setPart(p.id)}
                  onMouseLeave={() => setPart(null)}
                  onFocus={() => setPart(p.id)}
                  onBlur={() => setPart(null)}
                  onClick={() => setPart(part === p.id ? null : p.id)}
                >
                  {p.text}
                </button>
              ))}
            </p>
            <div className="blocks" aria-hidden="true">
              {parts.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="block"
                  data-kind={p.kind}
                  animate={{
                    y: part === p.id ? -8 : 0,
                    rotate: part === p.id ? (i - 1) * 3 : 0,
                    opacity: part && part !== p.id ? 0.45 : 1,
                  }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                >
                  <span className="mono">{["When", "Then", "AI step"][i]}</span>
                  <strong>{p.block}</strong>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="how-cards">
            {[
              {
                n: "01",
                t: "It understands",
                b: "Knot finds the trigger, the steps and the conditions in plain words, in any language.",
                c: "yellow",
              },
              {
                n: "02",
                t: "It builds and tests",
                b: "Every knot runs once on sample data before it goes live, so you see what will happen.",
                c: "pink",
              },
              {
                n: "03",
                t: "It keeps watch",
                b: "Retries, alerts and a full history for every run. If an app changes, Knot tells you.",
                c: "mint",
              },
            ].map((c, i) => (
              <motion.article
                key={c.n}
                className="card"
                data-c={c.c}
                data-reveal
                style={{ rotate: (i - 1) * 1.5 }}
                whileHover={{ rotate: 0, y: -6 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
              >
                <span className="mono card-n">{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.b}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section recipes" id="recipes">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">Recipes</span>
            <h2>Steal a knot from another team.</h2>
          </div>
          <div
            className="filters"
            role="group"
            aria-label="Filter recipes by team"
            data-reveal
          >
            {teams.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={team === t}
                onClick={() => setTeam(t)}
              >
                {team === t && (
                  <Pill id="team-pill" className="pill team-pill" />
                )}
                <span>{t}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="recipe-grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  className="recipe"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                >
                  <motion.div
                    className="recipe-inner"
                    animate={{ rotateY: flipped[r.id] ? 180 : 0 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
                  >
                    <button
                      type="button"
                      className="recipe-face recipe-front"
                      data-c={r.c}
                      aria-hidden={Boolean(flipped[r.id])}
                      tabIndex={flipped[r.id] ? -1 : 0}
                      onClick={() =>
                        setFlipped((f) => ({ ...f, [r.id]: true }))
                      }
                    >
                      <span className="mono recipe-team">{r.team}</span>
                      <strong>{r.title}</strong>
                      <span className="recipe-meta mono">
                        {r.steps.length} steps · flip to see{" "}
                        <RotateCw size={12} />
                      </span>
                    </button>
                    <div
                      className="recipe-face recipe-back"
                      aria-hidden={!flipped[r.id]}
                    >
                      <ol>
                        {r.steps.map((s, i) => (
                          <li key={s}>
                            <span className="mono">{i + 1}</span> {s}
                          </li>
                        ))}
                      </ol>
                      <div className="recipe-actions">
                        {r.flow ? (
                          <button
                            type="button"
                            className="button button-sm"
                            tabIndex={flipped[r.id] ? 0 : -1}
                            onClick={() => openFlow(r.flow as string)}
                          >
                            Open in canvas
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="button button-sm"
                            tabIndex={flipped[r.id] ? 0 : -1}
                            onClick={() =>
                              toast(`“${r.title}” copied`, {
                                description:
                                  "In the demo, three recipes open in the canvas.",
                              })
                            }
                          >
                            Use recipe
                          </button>
                        )}
                        <button
                          type="button"
                          className="flip-back"
                          aria-label="Flip back"
                          tabIndex={flipped[r.id] ? 0 : -1}
                          onClick={() =>
                            setFlipped((f) => ({ ...f, [r.id]: false }))
                          }
                        >
                          <RotateCw size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="section guard" id="guardrails">
          <div className="guard-copy" data-reveal>
            <span className="eyebrow mono">Guardrails</span>
            <h2>Automation that asks before it acts.</h2>
            <p>
              Decide what Knot may do alone. The preview shows what lands in
              your inbox.
            </p>
            <ul className="guard-list">
              <li>
                <span>
                  <strong>Ask before sending</strong>
                  <small>Emails and messages wait for a thumbs-up.</small>
                </span>
                <Switch
                  checked={approve}
                  onChange={setApprove}
                  label="Ask before sending"
                />
              </li>
              <li>
                <span>
                  <strong>Dry run first</strong>
                  <small>New knots run on fake data for a day.</small>
                </span>
                <Switch
                  checked={dryRun}
                  onChange={setDryRun}
                  label="Dry run first"
                />
              </li>
              <li>
                <span>
                  <strong>Pause after failures</strong>
                  <small>Stop the knot and tell you.</small>
                </span>
                <span className="stepper">
                  <button
                    type="button"
                    aria-label="Fewer failures"
                    onClick={() => setPauseAfter((n) => Math.max(1, n - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <b>
                    <NumberFlow value={pauseAfter} />
                  </b>
                  <button
                    type="button"
                    aria-label="More failures"
                    onClick={() => setPauseAfter((n) => Math.min(9, n + 1))}
                  >
                    <Plus size={14} />
                  </button>
                </span>
              </li>
            </ul>
          </div>
          <div className="guard-preview" data-reveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${approve}-${dryRun}`}
                className="notice"
                data-c={dryRun ? "blue" : approve ? "yellow" : "mint"}
                initial={{ opacity: 0, y: 16, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -12, rotate: 2 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
              >
                <header>
                  <span className="notice-icon">
                    {dryRun ? (
                      <ShieldCheck size={16} />
                    ) : approve ? (
                      <Bell size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </span>
                  <strong>
                    {dryRun
                      ? "Dry run · nothing was sent"
                      : approve
                        ? "Knot wants to send an email"
                        : "Email sent automatically"}
                  </strong>
                </header>
                <p className="mono">
                  To dana@lumenco.example
                  <br />
                  “Hi Dana, your last payment didn’t go through…”
                </p>
                {approve && !dryRun ? (
                  <div className="notice-actions">
                    <motion.button
                      whileTap={{ scale: 0.95, x: 2, y: 2 }}
                      type="button"
                      className="button button-sm"
                      onClick={() =>
                        toast("Approved", {
                          description: "In the demo, nothing is sent.",
                        })
                      }
                    >
                      Approve
                    </motion.button>
                    <button
                      type="button"
                      className="button button-outline button-sm"
                      onClick={() =>
                        toast("Held for edits", { description: "Demo only." })
                      }
                    >
                      Edit first
                    </button>
                  </div>
                ) : (
                  <small className="notice-foot mono">
                    {dryRun
                      ? "Goes live tomorrow at 09:00"
                      : "Logged in run #1,285"}
                  </small>
                )}
              </motion.div>
            </AnimatePresence>
            <p className="guard-pause mono">
              Pauses after <NumberFlow value={pauseAfter} /> failed run
              {pauseAfter > 1 ? "s" : ""} in a row
            </p>
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">Pricing</span>
            <h2>Pay for runs, not for seats.</h2>
            <div className="billing" role="group" aria-label="Billing period">
              {[
                { v: false, l: "Monthly" },
                { v: true, l: "Yearly −20%" },
              ].map((o) => (
                <button
                  key={o.l}
                  type="button"
                  aria-pressed={yearly === o.v}
                  onClick={() => setYearly(o.v)}
                >
                  {yearly === o.v && (
                    <Pill id="bill-pill" className="pill bill-pill" />
                  )}
                  <span>{o.l}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="plans">
            {[
              {
                name: "Free",
                m: 0,
                runs: "100 runs a month",
                note: "For trying things out.",
                c: "paper",
                f: ["3 active knots", "All 400+ apps", "7-day run history"],
              },
              {
                name: "Maker",
                m: 15,
                runs: "2,000 runs a month",
                note: "For one busy person.",
                c: "yellow",
                f: [
                  "Unlimited knots",
                  "Branches and AI steps",
                  "30-day run history",
                ],
                hot: true,
              },
              {
                name: "Team",
                m: 60,
                runs: "20,000 runs a month",
                note: "For a whole team.",
                c: "pink",
                f: [
                  "Shared workspace",
                  "Approvals and roles",
                  "1-year run history",
                ],
              },
            ].map((p) => (
              <motion.article
                key={p.name}
                className="plan"
                data-c={p.c}
                data-reveal
                whileHover={{ x: -3, y: -3 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
              >
                {p.hot && (
                  <span className="sticker sticker-static" data-c="mint">
                    Most picked
                  </span>
                )}
                <h3>{p.name}</h3>
                <p className="plan-note">{p.note}</p>
                <p className="price">
                  <strong>
                    <NumberFlow
                      value={price(p.m)}
                      format={{
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }}
                      locales="en-US"
                    />
                  </strong>
                  <span className="mono">/ month</span>
                </p>
                <p className="plan-runs mono">{p.runs}</p>
                <ul>
                  {p.f.map((f) => (
                    <li key={f}>
                      <Check size={15} /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.hot ? "default" : "outline"}
                  onClick={concept}
                >
                  {p.m === 0 ? "Start free" : `Choose ${p.name}`}
                </Button>
              </motion.article>
            ))}
          </div>
          <p className="fine mono">
            Fictional prices for a concept product. Nothing is billed.
          </p>
        </section>

        <section className="section faq-wrap" id="faq">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">FAQ</span>
            <h2>Loose ends.</h2>
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
          <svg
            className="closing-knot"
            viewBox="0 0 400 140"
            aria-hidden="true"
          >
            <motion.path
              d="M10 100 C 80 100, 90 20, 160 30 S 230 130, 190 110 S 150 40, 220 40 S 330 120, 390 60"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
          <h2>What will you stop doing by hand?</h2>
          <p>Write the sentence. Knot does the rest, every time.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>
              Get Knot free <ArrowRight size={16} />
            </Button>
            <a className="button button-outline button-lg" href="#demo">
              Back to the canvas
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand">
            <Logo /> knot
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
            Knot is a fictional product. Apps, customers, runs and prices are
            invented for this demo.
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
    </MotionConfig>
  );
}
