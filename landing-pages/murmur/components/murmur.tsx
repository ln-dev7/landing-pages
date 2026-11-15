"use client";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  Menu,
  PhoneIncoming,
  Play,
  Route,
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
import { CallConsole } from "./call-console";
import { CountIn, Pill, spring, useActiveSection } from "./motion-kit";
import { Logo } from "./logo";
import { Orb } from "./orb";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE =
  "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/murmur";

const links = [
  { href: "#demo", label: "Hear a call" },
  { href: "#voices", label: "Voices" },
  { href: "#industries", label: "Industries" },
  { href: "#pricing", label: "Pricing" },
];
const sections = ["demo", "voices", "industries", "pricing", "faq"];

const concept = () =>
  toast("Murmur is a concept by LN", {
    description:
      "No number to forward and no trial to start. The calls above are a demo.",
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

const voices = [
  {
    id: "ama",
    name: "Ama",
    feel: "Warm and unhurried",
    colors: ["#ffc285", "#ff6f61", "#8f75ff"],
    line: "Hi, thanks for calling Bright Smile. This is Ama, how can I help today?",
  },
  {
    id: "leo",
    name: "Leo",
    feel: "Calm, low and steady",
    colors: ["#8de6ff", "#4c7dff", "#2b2f86"],
    line: "Good evening, Ace Plumbing. I'm Leo. Tell me what's going on.",
  },
  {
    id: "nova",
    name: "Nova",
    feel: "Bright and quick",
    colors: ["#f6ff8f", "#5cf2b5", "#2aa7ff"],
    line: "Hey! Nonna's Kitchen, Nova speaking. Booking a table tonight?",
  },
  {
    id: "sol",
    name: "Sol",
    feel: "Deep and reassuring",
    colors: ["#ffd9a8", "#d0703c", "#5a2a1d"],
    line: "Hello, you've reached Hart & Vale. I'm Sol. Are you calling about a new matter?",
  },
];

const industries = [
  {
    id: "clinics",
    label: "Clinics",
    title: "Patients get booked, not put on hold.",
    body: "Murmur books, moves and confirms appointments, sends reminders, and passes anything that sounds urgent straight to your staff.",
    caller: "Can I move my cleaning to next week?",
    reply: "Of course. Thursday at 9:00 or Friday at 2:30?",
    stat: { value: 0.38, label: "fewer no-shows", percent: true },
    does: [
      "Books into your calendar",
      "Sends text reminders",
      "Flags urgent symptoms",
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    title: "Every table, even during the rush.",
    body: "Reservations, opening hours, allergies and large parties, handled while your team stays on the floor.",
    caller: "Are you open on Sunday for brunch?",
    reply: "We are, from 10 to 3. Would you like a table?",
    stat: {
      value: 212,
      label: "covers booked a week, average",
      percent: false,
    },
    does: ["Takes reservations", "Notes allergies", "Answers menu questions"],
  },
  {
    id: "home",
    label: "Home services",
    title: "Emergencies reach you. Tire kickers don't.",
    body: "Murmur qualifies the job, quotes your call-out fee, books the visit and pages your on-call tech when it can't wait.",
    caller: "My boiler stopped working, it's freezing.",
    reply: "Let's get someone out today. What's the address?",
    stat: { value: 0.27, label: "more jobs booked", percent: true },
    does: ["Qualifies the job", "Books site visits", "Pages on-call staff"],
  },
  {
    id: "law",
    label: "Law offices",
    title: "New clients screened before you pick up.",
    body: "Murmur gathers the facts, checks for conflicts against your list and books a consultation. It never gives legal advice.",
    caller: "I need help with a rental dispute.",
    reply: "I can set up a consultation. When did the issue start?",
    stat: { value: 14, label: "minutes saved per inquiry", percent: false },
    does: [
      "Collects intake details",
      "Checks a conflict list",
      "Books consultations",
    ],
  },
];

const plans = [
  { name: "Solo", price: 29, minutes: 150, note: "One line, one location." },
  { name: "Studio", price: 99, minutes: 750, note: "For busy front desks." },
  {
    name: "Team",
    price: 249,
    minutes: 2500,
    note: "Several lines and locations.",
  },
];
const EXTRA = 0.12;

const faqs = [
  {
    q: "Will callers know they're talking to an AI?",
    a: "Yes. Murmur introduces itself as an assistant at the start of every call. People mostly care that someone answered and solved their problem.",
  },
  {
    q: "What if Murmur doesn't know the answer?",
    a: "It says so, takes a message or transfers the call to you, depending on your rules. It never invents prices, diagnoses or legal advice.",
  },
  {
    q: "Can I listen to calls?",
    a: "In this concept, every call comes with a transcript and a short summary. You can take over any live call with one tap.",
  },
  {
    q: "Is any of this real?",
    a: "Murmur is a fictional product designed by LN. Businesses, callers, numbers and prices on this page are invented. No call is placed.",
  },
];

export default function Murmur() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [voice, setVoice] = useState(voices[0]);
  const [speakingKey, setSpeakingKey] = useState(0);
  const [industry, setIndustry] = useState(industries[0].id);
  const [calls, setCalls] = useState(60);
  const [live, setLive] = useState(2481);
  const { active, select } = useActiveSection(sections);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = window.setInterval(
      () => setLive((n) => n + 1 + Math.round(Math.random() * 2)),
      2600,
    );
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(tick);
    };
  }, []);

  const minutes = Math.round(calls * 2.5);
  const plan =
    plans.find((p) => minutes <= p.minutes) ?? plans[plans.length - 1];
  const extra = Math.max(0, minutes - plan.minutes);
  const estimate = Math.round(plan.price + extra * EXTRA);
  const orbVars = {
    "--orb-a": voice.colors[0],
    "--orb-b": voice.colors[1],
    "--orb-c": voice.colors[2],
  } as React.CSSProperties;

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Murmur home">
            <Logo /> Murmur
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
            <a href={LN}>
              <span>Docs</span>
            </a>
          </nav>
          <div className="nav-actions">
            <button type="button" className="text-button" onClick={concept}>
              Log in
            </button>
            <Button onClick={concept}>Start free</Button>
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
          <SheetTitle>Murmur</SheetTitle>
          <SheetDescription>Every call, answered.</SheetDescription>
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
            Start free
          </Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-orb">
            <Orb size={520} />
          </div>
          <motion.p
            className="live"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            <i aria-hidden="true" />
            <NumberFlow value={live} locales="en-US" /> calls answered today
          </motion.p>
          <h1>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...spring, duration: 0.9, delay: 0.3 }}
            >
              Every call,
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...spring, duration: 0.9, delay: 0.48 }}
            >
              answered.
            </motion.em>
          </h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.7 }}
          >
            Murmur is the AI receptionist for small businesses. It picks up in
            under a second, books the appointment and texts you the summary.
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.85 }}
          >
            <Button size="lg" onClick={concept}>
              Start free <ArrowRight size={16} />
            </Button>
            <a
              className="button button-outline button-lg"
              href="#demo"
              onClick={() => select("demo")}
            >
              <Play size={14} /> Hear a call
            </a>
          </motion.div>
          <motion.div
            id="demo"
            className="hero-console"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, duration: 1.1, delay: 1 }}
          >
            <CallConsole />
          </motion.div>
        </section>

        <section className="trust" aria-label="Fictional customers" data-reveal>
          <p>Picking up for 4,000 small businesses that hate voicemail</p>
          <div className="wordmarks" aria-hidden="true">
            <span className="wm wm-1">Bright Smile</span>
            <span className="wm wm-2">NONNA’S</span>
            <span className="wm wm-3">Ace Plumbing</span>
            <span className="wm wm-4">Hart &amp; Vale</span>
            <span className="wm wm-5">fernhill vets</span>
            <span className="wm wm-6">Kilnworks</span>
          </div>
        </section>

        <section className="section stats" aria-label="Murmur in numbers">
          {[
            {
              v: 0.4,
              suffix: " s",
              label: "to pick up, on average",
              f: { minimumFractionDigits: 1 },
            },
            { v: 31, suffix: "", label: "languages, switched mid-call", f: {} },
            {
              v: 0.94,
              suffix: "",
              label: "of calls resolved without you",
              f: { style: "percent" as const },
            },
            {
              v: 24,
              suffix: "/7",
              label: "including holidays and 3 a.m.",
              f: {},
            },
          ].map((s) => (
            <div key={s.label} className="stat" data-reveal>
              <CountIn
                className="stat-value"
                value={s.v}
                suffix={s.suffix}
                format={s.f}
              />
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        <section className="section features">
          <div className="section-head" data-reveal>
            <span className="eyebrow">What it does</span>
            <h2>
              Sounds like your best front desk. <em>Works like software.</em>
            </h2>
          </div>
          <div className="feature-grid">
            <motion.article className="feature" data-reveal whileHover="hover">
              <div className="feature-visual ring" aria-hidden="true">
                <motion.span
                  variants={{ hover: { scale: 1.08 } }}
                  transition={spring}
                >
                  <PhoneIncoming size={22} />
                </motion.span>
                <i />
                <i />
                <i />
              </div>
              <h3>Picks up before the second ring</h3>
              <p>
                No hold music, no phone tree. Murmur answers every line at once,
                day and night.
              </p>
            </motion.article>
            <motion.article className="feature" data-reveal whileHover="hover">
              <div className="feature-visual cal" aria-hidden="true">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                  <span key={d} className="cal-day">
                    <small>{d}</small>
                    {[0, 1, 2].map((r) => (
                      <motion.i
                        key={r}
                        data-booked={i === 1 && r === 1}
                        variants={
                          i === 1 && r === 1
                            ? { hover: { scale: 1.12, rotate: -3 } }
                            : undefined
                        }
                        transition={spring}
                      />
                    ))}
                  </span>
                ))}
              </div>
              <h3>Books for real, into your calendar</h3>
              <p>
                Murmur sees your actual availability, holds the slot and sends
                the confirmation text while the caller is still on the line.
              </p>
            </motion.article>
            <motion.article className="feature" data-reveal whileHover="hover">
              <div className="feature-visual handoff" aria-hidden="true">
                <span className="hand-node">
                  <Logo />
                </span>
                <motion.span
                  className="hand-line"
                  variants={{ hover: { scaleX: 1.15 } }}
                  transition={spring}
                >
                  <Route size={14} />
                </motion.span>
                <span className="hand-node hand-you">You</span>
              </div>
              <h3>Knows when a human should take it</h3>
              <p>
                Emergencies, VIPs or anything off-script go straight to you,
                with the context already written down.
              </p>
            </motion.article>
          </div>
        </section>

        <section className="section voices" id="voices">
          <div className="voices-visual" style={orbVars} data-reveal>
            <div
              className="voices-orb"
              data-speaking={speakingKey > 0}
              key={speakingKey}
            >
              <Orb size={300} />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={voice.id + speakingKey}
                className="voice-line"
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
                transition={spring}
              >
                “{voice.line}”
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="voices-copy" data-reveal>
            <span className="eyebrow">Voices</span>
            <h2>
              Pick the voice <em>your customers hear.</em>
            </h2>
            <p>
              Four voices, each tuned for a different kind of business. All of
              them can switch language when your caller does.
            </p>
            <div className="voice-list" role="radiogroup" aria-label="Voice">
              {voices.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={voice.id === v.id}
                  onClick={() => {
                    setVoice(v);
                    setSpeakingKey((k) => k + 1);
                  }}
                >
                  {voice.id === v.id && (
                    <Pill id="voice-pill" className="pill voice-pill" />
                  )}
                  <span
                    className="swatch"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${v.colors[0]}, ${v.colors[1]} 55%, ${v.colors[2]})`,
                    }}
                  />
                  <span className="voice-text">
                    <strong>{v.name}</strong>
                    <small>{v.feel}</small>
                  </span>
                </button>
              ))}
            </div>
            <p className="fine">
              Previews are visual in this demo. No audio plays.
            </p>
          </div>
        </section>

        <section className="section" id="industries">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Industries</span>
            <h2>
              Trained for the calls <em>you actually get.</em>
            </h2>
          </div>
          <Tabs
            value={industry}
            onValueChange={(v) => setIndustry(String(v))}
            className="industries"
            data-reveal
          >
            <TabsList className="industry-tabs">
              {industries.map((it) => (
                <TabsTrigger key={it.id} value={it.id}>
                  {industry === it.id && (
                    <Pill id="industry-pill" className="pill industry-pill" />
                  )}
                  <span>{it.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {industries.map((it) => (
              <TabsContent key={it.id} value={it.id} className="industry">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                  className="industry-copy"
                >
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                  <ul>
                    {it.does.map((d) => (
                      <li key={d}>
                        <Check size={14} /> {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="industry-call"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.08 }}
                >
                  <p className="bubble bubble-caller">{it.caller}</p>
                  <motion.p
                    className="bubble bubble-murmur"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: 0.45 }}
                  >
                    {it.reply}
                  </motion.p>
                  <div className="industry-stat">
                    <strong>
                      <NumberFlow
                        value={it.stat.value}
                        format={it.stat.percent ? { style: "percent" } : {}}
                        prefix={it.stat.percent ? "" : ""}
                      />
                    </strong>
                    <span>{it.stat.label}</span>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="section how">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Set up</span>
            <h2>
              Live in an afternoon. <em>No new phone number.</em>
            </h2>
          </div>
          <ol className="steps">
            {[
              {
                n: "1",
                t: "Forward your line",
                b: "Keep your number. Send unanswered or after-hours calls to Murmur, or all of them.",
              },
              {
                n: "2",
                t: "Teach it your business",
                b: "Paste your FAQ, link your calendar and set the rules for urgent calls.",
              },
              {
                n: "3",
                t: "Read the summaries",
                b: "Every call ends with a transcript, a two-line summary and anything it booked.",
              },
            ].map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ ...spring, delay: i * 0.1 }}
              >
                <span className="step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="section" id="pricing">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Pricing</span>
            <h2>
              Cheaper than one missed customer. <em>Usually.</em>
            </h2>
          </div>
          <div className="estimator" data-reveal>
            <label htmlFor="calls">
              <span>Calls a month</span>
              <strong>
                <NumberFlow value={calls} locales="en-US" />
              </strong>
            </label>
            <input
              id="calls"
              type="range"
              min={10}
              max={1400}
              step={10}
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              style={
                {
                  "--fill": `${((calls - 10) / 1390) * 100}%`,
                } as React.CSSProperties
              }
            />
            <p>
              About <NumberFlow value={minutes} locales="en-US" /> minutes. We’d
              suggest <strong>{plan.name}</strong> at about{" "}
              <strong>
                <NumberFlow
                  value={estimate}
                  format={{
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }}
                  locales="en-US"
                />
              </strong>{" "}
              a month.
            </p>
          </div>
          <div className="plans">
            {plans.map((p) => (
              <motion.article
                key={p.name}
                className="plan"
                data-picked={p.name === plan.name}
                data-reveal
                whileHover={{ y: -4 }}
                transition={spring}
              >
                <header>
                  <h3>{p.name}</h3>
                  <AnimatePresence>
                    {p.name === plan.name && (
                      <motion.span
                        className="badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={spring}
                      >
                        Fits you
                      </motion.span>
                    )}
                  </AnimatePresence>
                </header>
                <p className="plan-note">{p.note}</p>
                <p className="price">
                  <strong>${p.price}</strong>
                  <span>/ month</span>
                </p>
                <ul>
                  <li>
                    <Check size={14} /> {p.minutes.toLocaleString("en-US")}{" "}
                    minutes included
                  </li>
                  <li>
                    <Check size={14} /> ${EXTRA.toFixed(2)} per extra minute
                  </li>
                  <li>
                    <Check size={14} /> Transcripts and summaries
                  </li>
                </ul>
                <Button
                  variant={p.name === plan.name ? "default" : "outline"}
                  onClick={concept}
                >
                  Choose {p.name}
                </Button>
              </motion.article>
            ))}
          </div>
          <p className="fine">
            Fictional prices for a concept product. Nothing is billed.
          </p>
        </section>

        <section className="section split" id="faq">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Questions</span>
            <h2>
              Before you <em>forward the line.</em>
            </h2>
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
          <div className="closing-orb">
            <Orb size={360} />
          </div>
          <h2>
            Stop sending customers <em>to voicemail.</em>
          </h2>
          <p>Forward one line today. Murmur picks up the next call.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>
              Start free <ArrowRight size={16} />
            </Button>
            <a className="button button-outline button-lg" href="#demo">
              <CalendarCheck size={15} /> Hear another call
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand">
            <Logo /> Murmur
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
            Murmur is a fictional product. Businesses, callers, phone numbers
            and prices are invented for this demo.
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
