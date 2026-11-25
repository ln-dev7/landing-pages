"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { CountIn, spring } from "@/components/motion-kit";
import { Credit, Faq, MobileMenu, concept } from "@/components/kit";
import { Bloom, Fireflies, Hills, Stars } from "@/components/scene";

const links = [
  { href: "#page", label: "The page" },
  { href: "#evening", label: "The evening" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Questions" },
];
const start = () =>
  concept("Vesper", "There is no workspace to connect. Sign the team off in the demo instead.");

type Column = "shipped" | "stuck" | "tomorrow";
const columns: { id: Column; title: string; color: string; empty: string }[] = [
  { id: "shipped", title: "Shipped", color: "#f5946a", empty: "Nothing yet. People are still working." },
  { id: "stuck", title: "Stuck", color: "#c0627f", empty: "Nobody is blocked so far." },
  { id: "tomorrow", title: "Tomorrow", color: "#e0a94e", empty: "Fills in as calendars settle." },
];
const team: {
  name: string;
  role: string;
  at: string;
  color: string;
  lines: { col: Column; text: string; src: string }[];
}[] = [
  {
    name: "Maya",
    role: "Design",
    at: "17:38",
    color: "#c0627f",
    lines: [{ col: "shipped", text: "New onboarding screens are live for everyone", src: "Design file" }],
  },
  {
    name: "Idris",
    role: "Backend",
    at: "17:44",
    color: "#5f55a8",
    lines: [
      { col: "shipped", text: "Rate limits merged for the public API", src: "Repository" },
      { col: "stuck", text: "Data export wording is waiting on legal", src: "Tracker · 3 days" },
    ],
  },
  {
    name: "Chen",
    role: "Mobile",
    at: "17:51",
    color: "#d9774f",
    lines: [{ col: "shipped", text: "Version 4.2.1 is out to beta testers", src: "Release notes" }],
  },
  {
    name: "Ana",
    role: "Support",
    at: "17:57",
    color: "#3f7f78",
    lines: [
      { col: "tomorrow", text: "9:30 call with Northwind about single sign-on", src: "Calendar" },
      { col: "tomorrow", text: "Refund policy draft is due Friday", src: "Tracker" },
    ],
  },
];

function Mark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2c.7 4.3 2.9 6.5 7.2 7.2-4.3.7-6.5 2.900-7.200 7.200-.7-4.3-2.9-6.5-7.2-7.200C9.100 8.500 11.300 6.300 12 2z"
        fill="var(--ember)"
      />
      <path d="M3.5 20.5h17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Digest({ off, toggle, replay }: { off: boolean[]; toggle: (i: number) => void; replay: () => void }) {
  const done = off.every(Boolean);
  const count = off.filter(Boolean).length;
  return (
    <div className="digest" role="group" aria-label="Tonight's digest, a working demo">
      <div className="digest-bar">
        <p className="digest-title">Tonight&rsquo;s digest</p>
        <p className="digest-date">Thursday · Product team</p>
        <span className="chip" data-sent={done}>
          {done ? <Send size={13} /> : null}
          {done ? "Sent to the team at 18:00" : `${count} of ${team.length} signed off`}
        </span>
        <button type="button" className="replay" onClick={replay} aria-label="Replay the evening">
          <RotateCcw size={15} />
        </button>
      </div>
      <div className="digest-body">
        <div className="team">
          <h3>Sign-offs</h3>
          {team.map((m, i) => (
            <button
              key={m.name}
              type="button"
              className="member"
              aria-pressed={off[i]}
              onClick={() => toggle(i)}
            >
              <span className="avatar" style={{ background: m.color }}>
                {m.name[0]}
              </span>
              <span className="member-text">
                <b>{m.name}</b>
                <small>{off[i] ? `Signed off ${m.at}` : `${m.role} · still on`}</small>
              </span>
              <span className="tick" aria-hidden="true">
                {off[i] ? <Check size={14} strokeWidth={3} /> : null}
              </span>
            </button>
          ))}
        </div>
        <div className="sheet-page">
          {columns.map((c) => {
            const lines = team.flatMap((m, i) =>
              off[i] ? m.lines.filter((l) => l.col === c.id).map((l) => ({ ...l, who: m.name })) : [],
            );
            return (
              <div className="col" key={c.id}>
                <h4>
                  <i style={{ background: c.color }} />
                  {c.title}
                  <span>{lines.length}</span>
                </h4>
                <AnimatePresence initial={false} mode="popLayout">
                  {lines.length === 0 ? (
                    <motion.p
                      key="empty"
                      className="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {c.empty}
                    </motion.p>
                  ) : (
                    lines.map((l) => (
                      <motion.div
                        key={l.text}
                        layout
                        className="line"
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={spring}
                      >
                        {l.text}
                        <small>
                          {l.who} · {l.src}
                        </small>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const slips = [
  {
    color: "#f5946a",
    title: "Shipped",
    text: "Merged work, released versions and closed tickets, written as plain sentences a manager can read on a phone.",
    rows: [
      ["Checkout redesign is live", "Repository"],
      ["14 support tickets closed", "Helpdesk"],
      ["Q3 pricing page approved", "Docs"],
    ],
  },
  {
    color: "#c0627f",
    title: "Stuck",
    text: "Anything that has not moved in two days, with the person it waits on. One tap sends them a polite nudge.",
    rows: [
      ["Vendor contract, with legal", "5 days"],
      ["iOS review, with Apple", "2 days"],
      ["Brand photos, with the agency", "2 days"],
    ],
  },
  {
    color: "#e0a94e",
    title: "Tomorrow",
    text: "First meeting, due dates and who is away, so the morning starts with a plan and not with a search.",
    rows: [
      ["9:30 customer call", "Calendar"],
      ["Roadmap review due", "Tracker"],
      ["Idris is off until Monday", "Time off"],
    ],
  },
];
const evening = [
  { time: "17:00", title: "Vesper starts reading", text: "It looks at today in the tools you connected. Nobody fills in a form and nothing is tracked by the minute." },
  { time: "17:40", title: "One question, only if needed", text: "When a status is unclear, the owner gets a single message: done, moving or stuck? One tap answers it." },
  { time: "18:00", title: "The page goes out", text: "One short page lands in the channel and in the inbox. It takes about four minutes to read." },
  { time: "08:30", title: "A two-line morning note", text: "What changed overnight and the first thing on the calendar. Then Vesper stays quiet until evening." },
];
const stats = [
  { value: 4, suffix: " min", label: "to read the whole day" },
  { value: 92, suffix: "%", label: "open it before they leave" },
  { value: 0, suffix: "", label: "status meetings on the calendar" },
];
const plans = [
  {
    name: "Small team",
    price: "$0",
    note: "up to 10 people, for good",
    features: ["One digest every evening", "Three connected tools", "30 days of history"],
    cta: "Start with tonight",
    featured: false,
  },
  {
    name: "Company",
    price: "$4",
    note: "per person, per month",
    features: ["A digest per team and one for the company", "Unlimited tools and history", "Nudges, morning notes and exports"],
    cta: "Start a 30-day trial",
    featured: true,
  },
];
const faq = [
  { q: "Does Vesper track how long people work?", a: "No. It reads what changed in your tools, never screens, keystrokes or hours. A sign-off is only a signal that someone is done for the day." },
  { q: "What if someone forgets to sign off?", a: "The page still goes out at six with what Vesper found. Their part is marked as still open and updates if they sign off later." },
  { q: "Which tools can it read?", a: "In this concept: your code host, your tracker, your helpdesk, your calendar and your documents. Each one is read-only." },
  { q: "Can we change the time?", a: "Yes. Each team picks its own hour and time zone, and remote teams can get one page per region." },
  { q: "Is any of this real?", a: "The page you are reading is a design concept. The demo above runs in your browser with invented people and work." },
];
const marks = ["Halden", "Pearlwork", "Quillbay", "Tamarin", "Northfold"];

export default function Vesper() {
  const reduce = useReducedMotion();
  const [off, setOff] = useState<boolean[]>(() => team.map(() => false));
  const [auto, setAuto] = useState(true);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = off.filter(Boolean).length;

  // The evening plays once: one teammate signs off after another.
  useEffect(() => {
    if (!auto) return;
    if (reduce) {
      setOff(team.map(() => true));
      setAuto(false);
      return;
    }
    if (count >= team.length) {
      setAuto(false);
      return;
    }
    const id = window.setTimeout(
      () => setOff((o) => o.map((v, i) => (i === count ? true : v))),
      count === 0 ? 1400 : 1700,
    );
    return () => window.clearTimeout(id);
  }, [auto, count, reduce]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = (i: number) => {
    setAuto(false);
    setOff((o) => o.map((v, j) => (j === i ? !v : v)));
  };
  const replay = () => {
    setOff(team.map(() => false));
    setAuto(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header" data-scrolled={scrolled}>
        <div className="wrap header-in">
          <a href="#top" className="brand">
            <Mark /> Vesper
          </a>
          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <button type="button" className="text-button nav-extra" onClick={start}>
              Log in
            </button>
            <Button size="sm" className="nav-extra" onClick={start}>
              Start tonight
            </Button>
            <button type="button" className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menu}
        onOpenChange={setMenu}
        name="Vesper"
        tagline="The day, wrapped up before you leave."
        links={links}
        cta="Start tonight"
        onCta={start}
      />

      <main id="main">
        <section className="hero" id="top" style={{ "--t": count / team.length } as React.CSSProperties}>
          <div className="sky" aria-hidden="true">
            <div className="sun" />
          </div>
          <Stars />
          <Hills />
          <div className="wrap hero-copy">
            <p className="pill">An end-of-day digest for teams</p>
            <h1>
              The day, wrapped up
              <br />
              before you <em>leave.</em>
            </h1>
            <p className="hero-sub">
              Vesper reads what your team shipped, what got stuck and what is due tomorrow. At six, everyone gets
              one short page.
            </p>
            <div className="hero-actions">
              <Button size="lg" onClick={start}>
                Start with tonight&rsquo;s digest <ArrowRight size={17} />
              </Button>
              <p className="hero-note">Free for teams of up to 10</p>
            </div>
          </div>
          <Digest off={off} toggle={toggle} replay={replay} />
          <Bloom />
          <Fireflies />
          <div className="hero-logos">
            <div className="wrap">
              <p>
                Teams that close the day
                <br />
                with Vesper
              </p>
              <ul>
                {marks.map((m, i) => (
                  <li key={m} data-style={i}>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="page">
          <div className="wrap">
            <div className="head center">
              <h2>One page, three answers.</h2>
              <p className="lede">
                Every evening the same three questions get answered, in the same order, so the page takes minutes
                and never needs a meeting.
              </p>
            </div>
            <div className="slips">
              {slips.map((s) => (
                <motion.article
                  className="slip"
                  key={s.title}
                  style={{ "--c": s.color } as React.CSSProperties}
                  whileHover={{ y: -6 }}
                  transition={spring}
                >
                  <h3>
                    <i />
                    {s.title}
                  </h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.rows.map(([a, b]) => (
                      <li key={a}>
                        {a}
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section evening" id="evening">
          <div className="wrap evening-grid">
            <div className="head">
              <h2>
                How the evening <em>goes.</em>
              </h2>
              <p className="lede">Four moments, the same every day. Nobody has to remember to do anything.</p>
            </div>
            <ol className="timeline">
              {evening.map((e) => (
                <li key={e.time}>
                  <time>{e.time}</time>
                  <div>
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section proof">
          <div className="wrap">
            <blockquote>
              <p>&ldquo;We cancelled the 5:30 status meeting in the second week. The page says it better.&rdquo;</p>
              <footer>Head of Product at Halden, a team of 34</footer>
            </blockquote>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>
                    <CountIn value={s.value} suffix={s.suffix} />
                  </dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="wrap">
            <div className="head center">
              <h2>Two plans. One evening each.</h2>
              <p className="lede">Start free with one team. Pay when the whole company wants its evenings back.</p>
            </div>
            <div className="plans">
              {plans.map((p) => (
                <article className="plan" key={p.name} data-featured={p.featured}>
                  <h3>{p.name}</h3>
                  <p className="price">
                    {p.price} <span>{p.note}</span>
                  </p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={16} strokeWidth={2.4} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.featured ? "default" : "outline"} onClick={start}>
                    {p.cta}
                  </Button>
                </article>
              ))}
            </div>
            <p className="fine">Prices are invented for this concept. Nothing is billed.</p>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap faq-grid">
            <div className="head">
              <h2>Questions people ask first.</h2>
            </div>
            <Faq items={faq} />
          </div>
        </section>

        <section className="dawn">
          <div className="wrap">
            <h2>
              Tomorrow starts <em>clear.</em>
            </h2>
            <p>Connect one team tonight. The first page arrives at six.</p>
            <Button size="lg" onClick={start}>
              Start with tonight&rsquo;s digest <ArrowRight size={17} />
            </Button>
          </div>
          <Hills className="hills dawn-hills" />
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <a href="#top" className="brand">
              <Mark /> Vesper
            </a>
            <nav aria-label="Footer">
              {links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <Credit slug="vesper" name="Vesper" note="The team, the work and the prices are invented for this demo." />
        </div>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}
