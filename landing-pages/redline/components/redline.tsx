"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FlaskConical,
  GitPullRequest,
  KeyRound,
  Menu,
  MessageSquare,
  Play,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trash2,
  Hand,
} from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Pill, spring, useActiveSection } from "./motion-kit";
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
import { ReviewDemo } from "./review-demo";
import { Logo } from "./logo";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE =
  "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/redline";

const links = [
  { href: "#flow", label: "Review flow" },
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#changelog", label: "Changelog" },
];

const concept = () =>
  toast("Redline is a concept by LN", {
    description: "There is no app to install. The review above is a live demo.",
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

const languages = [
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Kotlin",
  "Ruby",
  "Swift",
  "Elixir",
  "PHP",
  "C#",
];

const sampleNotes = [
  {
    level: 0,
    severity: "Blocking",
    where: "refund.ts:34",
    text: "A rerun refunds the customer twice.",
  },
  {
    level: 1,
    severity: "Risk",
    where: "entries.ts:9",
    text: "Two writes at once can race on the running total.",
  },
  {
    level: 2,
    severity: "Nit",
    where: "refund.ts:36",
    text: "Retries happen without a log line.",
  },
  {
    level: 2,
    severity: "Nit",
    where: "scheduler.ts:13",
    text: "`key` reads better as `dedupeKey` here.",
  },
];
const levels = [
  { id: "quiet", label: "Quiet", hint: "Only what would break in production." },
  {
    id: "balanced",
    label: "Balanced",
    hint: "Breakage plus real risks. The default.",
  },
  {
    id: "thorough",
    label: "Thorough",
    hint: "Everything, including style and naming.",
  },
];

const steps = [
  {
    n: "01",
    title: "Reads the whole change",
    body: "Redline follows every call your diff touches, across files and services, before it says a word.",
  },
  {
    n: "02",
    title: "Flags what would break",
    body: "Notes are ranked by impact. Blocking issues come first, style comes last or not at all.",
  },
  {
    n: "03",
    title: "Hands you the patch",
    body: "Each note carries a fix that already passes your tests. Accept it, edit it or reply with why not.",
  },
];

const changelog = [
  {
    date: "Oct 30, 2026",
    tag: "New",
    title: "Fixes that run your tests first",
    body: "Suggested patches now run against your CI before they appear. Failing fixes are never shown.",
  },
  {
    date: "Oct 16, 2026",
    tag: "Improved",
    title: "Half the noise on large diffs",
    body: "Repeated findings are grouped into one note with every location listed underneath.",
  },
  {
    date: "Oct 2, 2026",
    tag: "New",
    title: "House rules in plain English",
    body: "Write your conventions in a .redline file. Redline applies them on the next pull request.",
  },
];

const faqs = [
  {
    q: "Does Redline approve or merge pull requests?",
    a: "Never. Redline leaves notes and suggests patches. Approving and merging always stays with a person on your team.",
  },
  {
    q: "Is my code used to train models?",
    a: "Not in this concept. Code is read for the review, kept for the life of the pull request, then deleted.",
  },
  {
    q: "How noisy is it?",
    a: "You choose. Quiet mode only speaks up when something would break. Most teams stay on Balanced.",
  },
  {
    q: "Is any of this real?",
    a: "Redline is a fictional product designed by LN. The repository, code, customers and prices on this page are invented for the demo.",
  },
];

const sections = ["flow", "product", "pricing", "changelog", "faq"];
const lift = { whileHover: { y: -4 }, transition: spring };
const featureTabs = [
  { id: "rules", icon: ScrollText, label: "House rules" },
  { id: "tests", icon: FlaskConical, label: "Tested fixes" },
  { id: "summary", icon: Sparkles, label: "Summaries" },
  { id: "security", icon: KeyRound, label: "Secrets" },
  { id: "thread", icon: MessageSquare, label: "Ask why" },
];

export default function Redline() {
  const [menu, setMenu] = useState(false);
  const [feature, setFeature] = useState("rules");
  const [hovered, setHovered] = useState<string | null>(null);
  const { active, select } = useActiveSection(sections);
  const [scrolled, setScrolled] = useState(false);
  const [level, setLevel] = useState(1);
  const [seats, setSeats] = useState(12);
  const [yearly, setYearly] = useState(true);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const seatPrice = yearly ? 20 : 24;
  const visibleNotes = sampleNotes.filter((n) => n.level <= level);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Redline home">
            <Logo />
            Redline
          </a>
          <nav
            aria-label="Main"
            className="nav-links"
            onMouseLeave={() => setHovered(null)}
          >
            {[...links, { href: LN, label: "Docs" }].map((l) => {
              const id = l.href.startsWith("#") ? l.href.slice(1) : "docs";
              const on = active === id;
              const shown = (hovered ?? active) === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={on ? "location" : undefined}
                  onMouseEnter={() => setHovered(id)}
                  onFocus={() => setHovered(id)}
                  onClick={() => id !== "docs" && select(id)}
                >
                  {shown && <Pill id="nav-pill" className="pill nav-pill" />}
                  <span>{l.label}</span>
                  {on && (
                    <motion.i
                      layoutId="nav-mark"
                      className="nav-mark"
                      transition={spring}
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>
          <div className="nav-actions">
            <button type="button" className="text-button" onClick={concept}>
              Sign in
            </button>
            <Button onClick={concept}>
              <GitPullRequest size={15} /> Add to repo
            </Button>
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
          <SheetTitle>Redline</SheetTitle>
          <SheetDescription>
            The reviewer who reads every line.
          </SheetDescription>
          <nav aria-label="Mobile" className="sheet-links">
            {[...links, { href: LN, label: "Docs" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                aria-current={
                  active === l.href.slice(1) ? "location" : undefined
                }
                onClick={() => {
                  if (l.href.startsWith("#")) select(l.href.slice(1));
                  setMenu(false);
                }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.08 + i * 0.05 }}
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
            <GitPullRequest size={15} /> Add to repo
          </Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>
              <span className="rise" style={{ animationDelay: ".3s" }}>
                The Reviewer Who
              </span>
              <span className="rise" style={{ animationDelay: ".45s" }}>
                Reads <span className="underline">Every Line</span>
              </span>
            </h1>
            <p className="rise" style={{ animationDelay: ".7s" }}>
              Redline studies each change in the context of your codebase,
              points to what will fail in production and writes the patch you
              accept in one click.
            </p>
            <div className="hero-ctas rise" style={{ animationDelay: ".85s" }}>
              <Button size="lg" onClick={concept}>
                <GitPullRequest size={16} /> Add to your repo
              </Button>
              <a className="button button-outline button-lg" href="#flow">
                <Play size={14} /> See how it reviews
              </a>
            </div>
          </div>
          <div className="hero-app">
            <ReviewDemo />
          </div>
        </section>

        <section className="langs" aria-label="Supported languages" data-reveal>
          <p>Fluent in the languages you ship</p>
          <div className="lang-row">
            {languages.map((l, i) => (
              <motion.span
                key={l}
                className="mono"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ ...spring, delay: i * 0.035 }}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </section>

        <section className="section" id="flow">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">REVIEW FLOW</span>
            <h2>Notes in the margin, not a wall of comments.</h2>
            <p>
              Redline reviews like your most careful teammate on a good day: it
              reads first, speaks only when it matters and brings the fix with
              it.
            </p>
          </div>
          <ol className="steps">
            {steps.map((s) => (
              <motion.li
                key={s.n}
                data-reveal
                whileHover="hover"
                variants={{ hover: { y: -4 } }}
                transition={spring}
              >
                <span className="mono step-n">
                  {s.n}
                  <motion.i
                    className="step-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    variants={{ hover: { scaleX: 1.6 } }}
                    transition={{ ...spring, duration: 0.8, delay: 0.2 }}
                  />
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="strictness" data-reveal>
            <div className="strictness-copy">
              <h3>You decide how much it talks.</h3>
              <p>
                Pick a level per repository. Here is the same pull request at
                each setting.
              </p>
              <div
                className="level"
                role="radiogroup"
                aria-label="Review strictness"
              >
                {levels.map((l, i) => (
                  <button
                    key={l.id}
                    type="button"
                    role="radio"
                    aria-checked={level === i}
                    onClick={() => setLevel(i)}
                  >
                    {level === i && (
                      <Pill id="level-ring" className="pill level-ring" />
                    )}
                    <strong>{l.label}</strong>
                    <span>{l.hint}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="strictness-panel">
              <header className="mono">
                PR #317 · <NumberFlow value={visibleNotes.length} /> note
                {visibleNotes.length > 1 ? "s" : ""}
              </header>
              <ul aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleNotes.map((n) => (
                    <motion.li
                      key={n.where + n.text}
                      data-severity={n.severity}
                      layout
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.15 },
                      }}
                      transition={spring}
                    >
                      <span className="sev">{n.severity}</span>
                      <code className="mono">{n.where}</code>
                      <p>{n.text}</p>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="product">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRODUCT</span>
            <h2>Everything a careful review needs.</h2>
          </div>
          <Tabs
            value={feature}
            onValueChange={(v) => setFeature(String(v))}
            className="features"
            data-reveal
          >
            <TabsList className="feature-tabs">
              {featureTabs.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id}>
                  {feature === id && (
                    <Pill id="feature-pill" className="pill feature-pill" />
                  )}
                  <span>
                    <Icon size={15} /> {label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="rules" className="feature">
              <div>
                <h3>Learns how your team writes code.</h3>
                <p>
                  Describe your conventions in plain sentences. Redline checks
                  every pull request against them, and cites the rule when it
                  leaves a note.
                </p>
              </div>
              <pre className="mono file-card">
                <span className="file-name">.redline</span>
                <span>
                  <b>#</b> Money is always stored in integer cents.
                </span>
                <span>
                  <b>#</b> Jobs must be safe to run twice.
                </span>
                <span>
                  <b>#</b> No new dependency without a note in the PR.
                </span>
                <span>
                  <b>#</b> Ignore naming nits in /scripts.
                </span>
              </pre>
            </TabsContent>
            <TabsContent value="tests" className="feature">
              <div>
                <h3>Fixes that already pass your tests.</h3>
                <p>
                  Before a suggestion appears, Redline applies it on a scratch
                  branch and runs your test suite. If a fix fails, you never see
                  it.
                </p>
              </div>
              <div className="checks">
                {[
                  ["refund.test.ts", "14 passed", "2.1 s"],
                  ["ledger.test.ts", "9 passed", "0.8 s"],
                  ["typecheck", "no errors", "4.6 s"],
                ].map(([name, result, time]) => (
                  <div key={name}>
                    <Check size={14} />
                    <code className="mono">{name}</code>
                    <span>{result}</span>
                    <em className="mono">{time}</em>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="summary" className="feature">
              <div>
                <h3>A summary your reviewers actually read.</h3>
                <p>
                  Every pull request opens with three lines: what changed, what
                  could go wrong and where to look first.
                </p>
              </div>
              <div className="summary-card">
                <span className="mono">SUMMARY · #317</span>
                <p>
                  <b>Changed</b> Refund jobs lock the order and retry after five
                  minutes.
                </p>
                <p>
                  <b>Could go wrong</b> Reruns refund twice without an early
                  return.
                </p>
                <p>
                  <b>Look first</b> src/jobs/refund.ts, lines 32 to 36.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="security" className="feature">
              <div>
                <h3>A first pass on every secret.</h3>
                <p>
                  Keys, tokens and private URLs are caught before they reach
                  your main branch, with a link to rotate them.
                </p>
              </div>
              <div className="secret-card">
                <header>
                  <span className="sev" data-severity="Blocking">
                    Blocking
                  </span>
                  <code className="mono">config/payments.ts:4</code>
                </header>
                <pre className="mono">
                  <span data-kind="add">
                    + const key = &quot;sk_test_••••••••••••3f9a&quot;
                  </span>
                </pre>
                <p>
                  Looks like a payment API key. Move it to your secrets manager.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="thread" className="feature">
              <div>
                <h3>Ask why, get an answer in the thread.</h3>
                <p>
                  Disagree with a note? Reply. Redline explains its reasoning,
                  or withdraws the note when you are right.
                </p>
              </div>
              <div className="thread">
                <p className="thread-msg">
                  <b>maya</b> We dedupe at the queue level, so a rerun can’t
                  happen.
                </p>
                <p className="thread-msg thread-bot">
                  <b>
                    <Logo /> Redline
                  </b>
                  The queue dedupes scheduled jobs, but{" "}
                  <code className="mono">retryLater</code> bypasses it on line
                  36. The double refund is still possible from a retry.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="section principles">
          {[
            {
              icon: Hand,
              title: "You merge. Always.",
              body: "Redline suggests and explains. It never approves, pushes to main or merges on its own.",
            },
            {
              icon: Trash2,
              title: "Code leaves no trace",
              body: "Read for the review, deleted when the pull request closes. Never used for training.",
            },
            {
              icon: ShieldCheck,
              title: "Least access",
              body: "Read access to code, write access to comments. Nothing else is requested.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <motion.div key={title} data-reveal whileHover="hover">
              <motion.span
                className="principle-icon"
                variants={{ hover: { y: -3, rotate: -8 } }}
                transition={spring}
              >
                <Icon size={17} />
              </motion.span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.div>
          ))}
        </section>

        <section className="section" id="pricing">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRICING</span>
            <h2>Priced per developer who opens pull requests.</h2>
            <p>Reviewers, managers and bots are free. So is open source.</p>
          </div>
          <div className="pricing" data-reveal>
            <motion.article className="plan" {...lift}>
              <h3>Open source</h3>
              <p className="plan-note">For public repositories.</p>
              <p className="price">
                <strong>$0</strong>
                <span>forever</span>
              </p>
              <ul>
                {[
                  "Unlimited public repositories",
                  "Every review feature",
                  "Community support",
                ].map((f) => (
                  <li key={f}>
                    <Check size={14} /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" onClick={concept}>
                Add to a public repo
              </Button>
            </motion.article>
            <motion.article className="plan plan-team" {...lift}>
              <header>
                <h3>Team</h3>
                <div
                  className="billing"
                  role="group"
                  aria-label="Billing period"
                >
                  <button
                    type="button"
                    aria-pressed={!yearly}
                    onClick={() => setYearly(false)}
                  >
                    {!yearly && <Pill id="billing-pill" />}
                    <span>Monthly</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={yearly}
                    onClick={() => setYearly(true)}
                  >
                    {yearly && <Pill id="billing-pill" />}
                    <span>Yearly</span>
                  </button>
                </div>
              </header>
              <p className="plan-note">
                For private repositories and growing teams.
              </p>
              <div className="calc">
                <label htmlFor="seats">
                  Developers{" "}
                  <output htmlFor="seats">
                    <NumberFlow value={seats} />
                  </output>
                </label>
                <input
                  id="seats"
                  type="range"
                  min={1}
                  max={150}
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  style={
                    {
                      "--fill": `${((seats - 1) / 149) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
              <p className="price">
                <strong>
                  <NumberFlow
                    value={seats * seatPrice}
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                    locales="en-US"
                  />
                </strong>
                <span>
                  / month ·{" "}
                  <NumberFlow
                    value={seatPrice}
                    format={{
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }}
                    locales="en-US"
                  />{" "}
                  per developer
                  {yearly ? ", billed yearly" : ""}
                </span>
              </p>
              <ul>
                {[
                  "Private repositories",
                  "House rules",
                  "Tested fixes",
                  "Summaries & secret scan",
                ].map((f) => (
                  <li key={f}>
                    <Check size={14} /> {f}
                  </li>
                ))}
              </ul>
              <Button onClick={concept}>Start a 14-day trial</Button>
            </motion.article>
            <motion.article className="plan" {...lift}>
              <h3>Enterprise</h3>
              <p className="plan-note">For regulated code and many teams.</p>
              <p className="price">
                <strong>Custom</strong>
              </p>
              <ul>
                {[
                  "Self-hosted runner",
                  "SSO & audit log",
                  "Custom retention",
                  "A named engineer",
                ].map((f) => (
                  <li key={f}>
                    <Check size={14} /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" onClick={concept}>
                Talk to us
              </Button>
            </motion.article>
          </div>
          <p className="fine">
            Fictional prices for a concept product. Nothing is billed.
          </p>
        </section>

        <section className="section split" id="changelog">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">CHANGELOG</span>
            <h2>Recently merged.</h2>
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
            <h2>Before your first review.</h2>
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
          <h2>
            Your next pull request <br />
            deserves a <span className="underline">second pair of eyes.</span>
          </h2>
          <p>Install once. Redline reviews the next PR you open.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>
              <GitPullRequest size={16} /> Add to your repo
            </Button>
            <a className="button button-outline button-lg" href="#top">
              Back to the review <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand">
            <Logo /> Redline
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
            Redline is a fictional product. The repository, code, customers and
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
    </MotionConfig>
  );
}
