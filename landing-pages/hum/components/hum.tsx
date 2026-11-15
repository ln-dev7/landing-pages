"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BellOff,
  Check,
  Clock,
  Globe2,
  Headphones,
  Lock,
  Menu,
  Minus,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Pill, spring, useActiveSection, CountIn } from "./motion-kit";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { Face, HumApp } from "./hum-app";
import { Logo } from "./logo";
import { workflows, type Who } from "./data";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE = "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/hum";

const links = [
  { href: "#catchup", label: "Catch up" },
  { href: "#focus", label: "Focus" },
  { href: "#workflows", label: "Workflows" },
  { href: "#pricing", label: "Pricing" },
  { href: "#changelog", label: "Changelog" },
];
const sections = ["catchup", "focus", "workflows", "product", "pricing", "changelog", "faq"];
const lift = { whileHover: { y: -4 }, transition: spring };

const concept = () =>
  toast("Hum is a concept by LN", {
    description: "There is no workspace to create. Chat in the demo instead.",
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

const bubbles: { who: Who; text: string; x: number; y: number }[] = [
  { who: "mina", text: "Huddle?", x: 4, y: 64 },
  { who: "theo", text: "LGTM", x: 86, y: 10 },
  { who: "sam", text: "Customer is happy", x: 80, y: 76 },
];

function CatchupDemo() {
  const [n, setN] = useState(180);
  const raw = Math.round((n * 9) / 60);
  const lines = Math.min(8, Math.max(2, Math.round(Math.log2(n))));
  const chans = [
    { name: "launch", share: 0.38 },
    { name: "support", share: 0.27 },
    { name: "design", share: 0.2 },
    { name: "random", share: 0.15 },
  ];
  return (
    <div className="cu" data-reveal>
      <div className="cu-control">
        <label htmlFor="unread" className="cu-label">
          Unread messages <b><NumberFlow value={n} /></b>
        </label>
        <input id="unread" type="range" min={20} max={600} step={10} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ ["--p" as string]: `${((n - 20) / 580) * 100}%` }} />
        <div className="cu-stats">
          <span>
            <em>Reading it all</em>
            <b><NumberFlow value={raw} /> min</b>
          </span>
          <span className="hot">
            <em>Reading the catch-up</em>
            <b><NumberFlow value={30} /> s</b>
          </span>
          <span>
            <em>Lines in the summary</em>
            <b><NumberFlow value={lines} /></b>
          </span>
        </div>
        <ul className="cu-bars">
          {chans.map((c) => (
            <li key={c.name}>
              <span className="mono">#{c.name}</span>
              <i><motion.b animate={{ width: `${c.share * 100}%` }} transition={spring} /></i>
              <em><NumberFlow value={Math.round(n * c.share)} /></em>
            </li>
          ))}
        </ul>
      </div>
      <div className="cu-card">
        <p className="cu-card-head"><Sparkles size={14} /> Your catch-up</p>
        <ul>
          <AnimatePresence initial={false}>
            {[
              "Friday's release is on track. One bug left, fixed and approved.",
              "Support promised euro invoices for next week.",
              "Design dropped the confetti from onboarding.",
              "Mina shared the final launch video, 1 min 48 s.",
              "Sam briefs support on the new plans at 3:00.",
              "Theo is out Thursday afternoon.",
              "Brightloom asked for a call about exports.",
              "The team lunch moved to Friday.",
            ]
              .slice(0, lines)
              .map((l) => (
                <motion.li key={l} layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={spring}>
                  <Check size={13} /> {l}
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function FocusDemo() {
  const [on, setOn] = useState([false, false, false, false, false, true, true]);
  const [start, setStart] = useState(19);
  const [end, setEnd] = useState(9);
  const [urgent, setUrgent] = useState(true);
  const fmt = (h: number) => `${String(h).padStart(2, "0")}:00`;
  const notes: { who: Who; text: string; urgent?: boolean }[] = [
    { who: "theo", text: "Can you look at the deck tomorrow?" },
    { who: "sam", text: "URGENT: checkout is down for Brightloom", urgent: true },
    { who: "ana", text: "Lunch on Friday?" },
  ];
  const quiet = on.filter(Boolean).length;
  return (
    <div className="focus" data-reveal>
      <div className="focus-controls">
        <p className="mono f-label">QUIET ALL DAY ON</p>
        <div className="f-days" role="group" aria-label="Quiet days">
          {days.map((d, i) => (
            <button key={d} type="button" aria-pressed={on[i]} onClick={() => setOn((o) => o.map((v, k) => (k === i ? !v : v)))}>
              {d}
            </button>
          ))}
        </div>
        <p className="mono f-label">AND EVERY EVENING</p>
        <div className="f-times">
          <div>
            <em>From</em>
            <div className="stepper">
              <button type="button" aria-label="Earlier start" onClick={() => setStart((s) => Math.max(16, s - 1))}><Minus size={12} /></button>
              <b className="mono">{fmt(start)}</b>
              <button type="button" aria-label="Later start" onClick={() => setStart((s) => Math.min(23, s + 1))}><Plus size={12} /></button>
            </div>
          </div>
          <div>
            <em>Until</em>
            <div className="stepper">
              <button type="button" aria-label="Earlier end" onClick={() => setEnd((s) => Math.max(6, s - 1))}><Minus size={12} /></button>
              <b className="mono">{fmt(end)}</b>
              <button type="button" aria-label="Later end" onClick={() => setEnd((s) => Math.min(11, s + 1))}><Plus size={12} /></button>
            </div>
          </div>
        </div>
        <button type="button" role="switch" aria-checked={urgent} className="h-switch" onClick={() => setUrgent((u) => !u)}>
          <span className="track"><motion.span className="thumb" layout transition={spring} /></span>
          Let urgent messages through
        </button>
        <p className="f-sum">
          Quiet <b><NumberFlow value={(24 - start + end) * (7 - quiet) + quiet * 24} /> hours</b> a week.
        </p>
      </div>
      <div className="phone" aria-label="Notification preview">
        <p className="phone-time mono">
          <Moon size={12} /> {fmt(start + 2 > 23 ? 23 : start + 2)} · Quiet hours
        </p>
        <ul>
          {notes.map((n) => {
            const through = n.urgent && urgent;
            return (
              <motion.li key={n.text} layout data-through={through} transition={spring}>
                <Face who={n.who} size={26} />
                <span>
                  <strong>Hum</strong>
                  {n.text}
                </span>
                <em className="mono">{through ? "now" : `held till ${fmt(end)}`}</em>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function WorkflowsDemo() {
  const [on, setOn] = useState<string[]>(["gh"]);
  return (
    <div className="wf" data-reveal>
      <ul className="wf-list">
        {workflows.map((w) => {
          const active = on.includes(w.id);
          return (
            <li key={w.id} data-on={active}>
              <span className="wf-app" style={{ background: w.color }}>{w.app[0]}</span>
              <span className="wf-text">
                <strong>{w.when}</strong>
                <small>{w.app} → {w.to}</small>
              </span>
              <button type="button" role="switch" aria-checked={active} aria-label={`${w.when} to ${w.to}`} className="h-switch bare" onClick={() => setOn((o) => (o.includes(w.id) ? o.filter((x) => x !== w.id) : [...o, w.id]))}>
                <span className="track"><motion.span className="thumb" layout transition={spring} /></span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="wf-feed">
        <p className="mono f-label">WHAT LANDS IN HUM</p>
        <AnimatePresence initial={false}>
          {workflows.filter((w) => on.includes(w.id)).map((w) => (
            <motion.div key={w.id} layout className="wf-msg" initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={spring}>
              <span className="wf-app" style={{ background: w.color }}>{w.app[0]}</span>
              <span>
                <strong>{w.app}</strong> <em className="mono">{w.to}</em>
                <br />
                {w.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {on.length === 0 && <p className="wf-empty">Turn on a workflow to see what it posts.</p>}
      </div>
    </div>
  );
}

const plans = [
  { name: "Free", monthly: 0, yearly: 0, note: "For small teams trying Hum.", features: ["90 days of history", "1:1 huddles", "10 app connections", "Catch-up for 3 channels"], cta: "Start a workspace" },
  { name: "Pro", monthly: 9, yearly: 7, note: "For teams who live in chat.", features: ["Unlimited history", "Group huddles with notes", "Unlimited workflows", "Catch-up everywhere", "Channels with other companies"], cta: "Start a 14-day trial", featured: true },
  { name: "Business", monthly: 15, yearly: 12, note: "For companies with rules to follow.", features: ["SAML single sign-on", "Data exports for all messages", "99.99% uptime promise", "Admin and retention controls"], cta: "Talk to us" },
];

const changelog = [
  { date: "Nov 4, 2026", tag: "New", title: "Catch-up across channels", body: "One summary for everything you missed, with a jump to each message it mentions." },
  { date: "Oct 23, 2026", tag: "Improved", title: "Huddles write their own notes", body: "When a huddle ends, Hum posts the decisions and the follow-ups in the channel." },
  { date: "Oct 9, 2026", tag: "New", title: "Quiet hours with an urgent lane", body: "Pick your hours. Messages wait for you, unless someone marks them urgent." },
];

const faqs = [
  { q: "Does the catch-up read private channels?", a: "Only the ones you are in. Hum never summarizes a message you could not open yourself, and summaries are never used to train models." },
  { q: "What counts as an active member?", a: "Someone who opened Hum in the last 14 days. People on leave or who stopped using it are not billed." },
  { q: "Can we talk with other companies?", a: "Yes. A shared channel connects two workspaces, and each side keeps its own rules and history." },
  { q: "Is any of this real?", a: "Hum is a fictional product designed by LN. The workspace, people, messages and prices on this page are invented for the demo." },
];

export default function Hum() {
  const [menu, setMenu] = useState(false);
  const { active, select } = useActiveSection(sections);
  const [yearly, setYearly] = useState(true);
  const [members, setMembers] = useState(40);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const activeMembers = Math.round(members * 0.78);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Hum home">
            <Logo />
            hum
            <span className="nav-live" aria-hidden="true">
              <i /> 24 online
            </span>
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
            <button type="button" className="text-button" onClick={concept}>Sign in</button>
            <Button onClick={concept}>Get Hum free</Button>
            <Button variant="unstyled" className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent>
          <SheetTitle>Hum</SheetTitle>
          <SheetDescription>The team chat that keeps up with you.</SheetDescription>
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
          <Button onClick={() => { setMenu(false); concept(); }}>Get Hum free</Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="frame" aria-hidden="true">
            <span className="corner tl" />
            <span className="corner tr" />
          </div>
          <div className="hero-stage">
            <div className="rings" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ ["--i" as string]: i }} />
              ))}
            </div>
            <div className="bubbles" aria-hidden="true">
              {bubbles.map((b, i) => (
                <span key={b.text} className="bubble" style={{ left: `${b.x}%`, top: `${b.y}%`, animationDelay: `${1.3 + i * 0.15}s` }}>
                  <Face who={b.who} size={22} /> {b.text}
                </span>
              ))}
            </div>
            <div className="hero-copy hero-chat">
              <h1>
                <span className="chat-line chat-in rise" style={{ animationDelay: ".35s" }}>
                  <span className="chat-meta" aria-hidden="true">
                    <Face who="ana" size={22} /> <b>Ana</b> <time>9:41</time>
                  </span>
                  Where your team
                </span>
                <span className="chat-line chat-out rise" style={{ animationDelay: ".6s" }}>
                  <span className="chat-meta" aria-hidden="true">
                    <time>9:42</time> <b>You</b> <Face who="you" size={22} />
                  </span>
                  <span className="talks">talks</span> it through.
                </span>
              </h1>
              <p className="chat-typing rise" style={{ animationDelay: ".85s" }} aria-hidden="true">
                <Face who="theo" size={20} /> Theo is typing
                <i />
                <i />
                <i />
              </p>
              <p className="rise" style={{ animationDelay: ".75s" }}>
                Hum is the team chat that keeps up with you. Channels for the work, threads for the details, and a catch-up that reads the backlog for you.
              </p>
              <div className="hero-ctas rise" style={{ animationDelay: ".9s" }}>
                <Button size="lg" onClick={concept}>
                  Get Hum free <span className="cta-note">For teams up to 10</span>
                  <ArrowRight size={16} />
                </Button>
                <a className="button button-outline button-lg" href="#catchup">
                  <Sparkles size={14} /> Catch me up
                </a>
              </div>
            </div>
          </div>
          <div className="hero-app">
            <HumApp />
            <p className="hint mono">Send a message, react, open a thread, start a huddle or jump from the catch-up.</p>
          </div>
        </section>

        <section className="teams" aria-label="Fictional customers" data-reveal>
          <p>Teams who stopped scrolling back</p>
          <div className="wordmarks" aria-hidden="true">
            <span className="wm wm-1">Tidepool</span>
            <span className="wm wm-2">MERIDIAN</span>
            <span className="wm wm-3">foxglove</span>
            <span className="wm wm-4">Kiln&amp;Co</span>
            <span className="wm wm-5">Parallax°</span>
            <span className="wm wm-6">bolt/hq</span>
          </div>
        </section>

        <section className="section" id="catchup">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">CATCH UP</span>
            <h2>Back from lunch? Read the 30-second version.</h2>
            <p>However much piled up, Hum reads it first and tells you what changed, what was decided and what needs you.</p>
          </div>
          <CatchupDemo />
        </section>

        <section className="section" id="focus">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">FOCUS</span>
            <h2>Quiet hours that actually stay quiet.</h2>
            <p>Pick when Hum holds your notifications. Teammates see you are away, and urgent messages still find you.</p>
          </div>
          <FocusDemo />
        </section>

        <section className="section" id="workflows">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">WORKFLOWS</span>
            <h2>Your other tools, talking in the right channel.</h2>
            <p>Connect the apps you already use. Each event lands where the people who care about it already are.</p>
          </div>
          <WorkflowsDemo />
        </section>

        <section className="section" id="product">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRODUCT</span>
            <h2>Less chasing. More talking.</h2>
            <p>Everything a team needs to talk it through, from quick questions to calls with other companies.</p>
          </div>
          <div className="bento">
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual huddle-tile" aria-hidden="true">
                <span className="ht-row"><Headphones size={14} /> Huddle in #design <b className="mono">12:40</b></span>
                <span className="ht-note"><Sparkles size={13} /> Notes: keep the progress bar, drop the confetti, Theo prototypes the invite step.</span>
              </div>
              <h3>Huddles that take their own notes</h3>
              <p>Jump on a quick call from any channel. When you hang up, the decisions are already posted.</p>
            </motion.article>
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual search-tile" aria-hidden="true">
                <span className="st-q"><Search size={13} /> when do euro invoices ship?</span>
                <motion.span className="st-a" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.3 }}>
                  <Sparkles size={13} /> Next week, said Ana in #support on Tuesday.
                </motion.span>
              </div>
              <h3>Search that answers</h3>
              <p>Ask a question in plain words. Hum answers with the message it came from.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual shared" aria-hidden="true">
                <span className="ws ws-a">P</span>
                <span className="link-line" />
                <span className="ws ws-b">B</span>
                <em className="mono">#pennant-brightloom</em>
              </div>
              <h3>Channels with other companies</h3>
              <p>Work with agencies and clients in one shared channel, not twenty email threads.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual stat" aria-hidden="true">
                <Zap size={16} />
                <strong><CountIn value={41} suffix="%" /></strong>
                <span>fewer meetings after a quarter</span>
              </div>
              <h3>Fewer meetings</h3>
              <p>Teams settle small things in a thread and save the calls for what needs them.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual stat" aria-hidden="true">
                <Globe2 size={16} />
                <strong><CountIn value={28} /></strong>
                <span>languages, translated in line</span>
              </div>
              <h3>Every language welcome</h3>
              <p>Read any message in your language with one click, and reply in yours.</p>
            </motion.article>
          </div>
        </section>

        <section className="section trust">
          <div className="trust-grid">
            {[
              { icon: Lock, title: "Encrypted, always", body: "Messages and files are encrypted in transit and at rest, on every plan." },
              { icon: ShieldCheck, title: "Summaries stay yours", body: "Catch-ups only use messages you can read, and nothing trains a model." },
              { icon: BellOff, title: "Respects your evenings", body: "Quiet hours, scheduled sends and focus modes are built in, not add-ons." },
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
            <h2>Pay only for people who show up.</h2>
            <p>Hum bills active members only. If someone stops using it, you stop paying for them, automatically.</p>
            <div className="billing" role="group" aria-label="Billing period">
              <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
                {!yearly && <Pill id="billing-pill" />}
                <span>Monthly</span>
              </button>
              <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
                {yearly && <Pill id="billing-pill" />}
                <span>Yearly <em>−22%</em></span>
              </button>
            </div>
          </div>
          <div className="active-calc" data-reveal>
            <label htmlFor="members">
              <Users size={15} /> Members in your workspace <b><NumberFlow value={members} /></b>
            </label>
            <input id="members" type="range" min={10} max={300} step={5} value={members} onChange={(e) => setMembers(Number(e.target.value))} style={{ ["--p" as string]: `${((members - 10) / 290) * 100}%` }} />
            <p>
              <span><Clock size={13} /> Active in the last 14 days: <b><NumberFlow value={activeMembers} /></b></span>
              <span className="hot">Billed for <b><NumberFlow value={activeMembers} /></b> of <NumberFlow value={members} /> members</span>
            </p>
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
                    <strong>
                      <NumberFlow value={price} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} locales="en-US" />
                    </strong>
                    <span>{price > 0 ? "per active member / month" : "forever"}</span>
                  </p>
                  {price > 0 && (
                    <p className="plan-total">
                      <NumberFlow value={price * activeMembers} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} locales="en-US" /> a month for your team
                    </p>
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
            <h2>Fresh in Hum.</h2>
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
            <h2>Before you invite the team.</h2>
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
            <motion.span className="swing" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}>
              <Logo />
            </motion.span>
          </span>
          <h2>Talk less about the work. Do more of it.</h2>
          <p>Bring the team, connect your tools, and let Hum keep everyone in the loop.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>Get Hum free <ArrowRight size={16} /></Button>
            <a className="button button-outline button-lg" href="#top">Back to the chat</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand"><Logo /> hum</a>
          <nav aria-label="Footer">
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Hum is a fictional product. The workspace, people, messages and prices are invented for this demo.</p>
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
