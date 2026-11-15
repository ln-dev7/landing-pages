"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpenText,
  Brain,
  ChartColumn,
  CodeXml,
  GraduationCap,
  PenLine,
  Check,
  CircleHelp,
  EyeOff,
  FileText,
  LineChart,
  Menu,
  Mic,
  Minus,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
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
import { WrenApp } from "./wren-app";
import { Logo } from "./logo";
import { contextFiles, styleTexts, uses } from "./data";

const LN = "https://lndev.me/";
const useIcons = { write: PenLine, analyze: ChartColumn, code: CodeXml, learn: GraduationCap };
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE = "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/wren";

const links = [
  { href: "#styles", label: "Styles" },
  { href: "#projects", label: "Projects" },
  { href: "#uses", label: "Use cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#changelog", label: "Changelog" },
];
const sections = ["styles", "projects", "uses", "product", "pricing", "changelog", "faq"];
const lift = { whileHover: { y: -4 }, transition: spring };

const concept = () =>
  toast("Wren is a concept by LN", {
    description: "There is no account to create. Talk to the demo instead.",
  });

const typedPhrases = ["real work.", "hard questions.", "first drafts.", "big decisions."];

// Types each phrase, holds it, erases it, then moves on. Width stays fixed on the widest phrase.
function Typed() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(typedPhrases[0].length);
  const [phase, setPhase] = useState<"hold" | "erase" | "type">("hold");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = typedPhrases[i];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "hold") t = setTimeout(() => setPhase("erase"), 2600);
    else if (phase === "erase") {
      if (n > 0) t = setTimeout(() => setN(n - 1), 34);
      else t = setTimeout(() => { setI((i + 1) % typedPhrases.length); setPhase("type"); }, 220);
    } else {
      if (n < word.length) t = setTimeout(() => setN(n + 1), 62);
      else setPhase("hold");
    }
    return () => clearTimeout(t!);
  }, [i, n, phase]);
  return (
    <span className="typed">
      {typedPhrases.map((p) => (
        <em key={p} className="typed-ghost" aria-hidden="true">{p}</em>
      ))}
      <em className="typed-live" aria-hidden="true">
        {typedPhrases[i].slice(0, n)}
        <span className="typed-caret" />
      </em>
    </span>
  );
}

// Topographic contour lines behind the hero, built once from a few sine waves.
function Contours() {
  const paths = useMemo(() => {
    const out: string[] = [];
    const N = 14;
    for (let k = 0; k < 12; k++) {
      const r0 = 46 + k * 40;
      const cx = 640 - k * 9;
      const cy = 330 + k * 5;
      const pts: [number, number][] = [];
      for (let j = 0; j < N; j++) {
        const a = (j / N) * Math.PI * 2;
        const r = r0 * (1 + 0.16 * Math.sin(3 * a + k * 0.45) + 0.08 * Math.sin(5 * a + 1.3 + k * 0.28));
        pts.push([cx + Math.cos(a) * r * 1.35, cy + Math.sin(a) * r * 0.82]);
      }
      let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let j = 0; j < N; j++) {
        const p0 = pts[(j - 1 + N) % N], p1 = pts[j], p2 = pts[(j + 1) % N], p3 = pts[(j + 2) % N];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      out.push(d + "Z");
    }
    return out;
  }, []);
  return (
    <svg className="contours" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g>
        {paths.map((d, k) => (
          <path key={k} d={d} pathLength={1} data-major={k % 4 === 3 || undefined} style={{ ["--k" as string]: k }} />
        ))}
      </g>
    </svg>
  );
}

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

type Tone = keyof typeof styleTexts;
function StylesDemo() {
  const [tone, setTone] = useState<Tone>("Plain");
  const [len, setLen] = useState(1);
  const text = styleTexts[tone][len];
  return (
    <div className="styles-demo" data-reveal>
      <div className="sd-controls">
        <p className="mono sd-label">THE MESSAGE</p>
        <p className="sd-brief">“Tell trial users their trial ends Friday.”</p>
        <p className="mono sd-label">TONE</p>
        <div className="seg big" role="group" aria-label="Tone">
          {(Object.keys(styleTexts) as Tone[]).map((t) => (
            <button key={t} type="button" aria-pressed={tone === t} onClick={() => setTone(t)}>
              {tone === t && <Pill id="tone-pill" />}
              <span>{t}</span>
            </button>
          ))}
        </div>
        <p className="mono sd-label">LENGTH</p>
        <div className="seg big" role="group" aria-label="Length">
          {["Short", "Medium", "Long"].map((l, i) => (
            <button key={l} type="button" aria-pressed={len === i} onClick={() => setLen(i)}>
              {len === i && <Pill id="len-pill" />}
              <span>{l}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="sd-out">
        <div className="sd-out-head">
          <span><Sparkles size={13} /> Wren</span>
          <em className="mono"><NumberFlow value={text.split(" ").length} /> words</em>
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={tone + len} initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectsDemo() {
  const [added, setAdded] = useState<string[]>(["brand"]);
  const used = contextFiles.filter((f) => added.includes(f.id));
  const total = used.reduce((a, f) => a + f.tokens, 0);
  const answer =
    used.length === 0
      ? "Add a file and I will answer from it, with the page it came from."
      : `Based on ${used.map((f) => f.name.replace(/\.(pdf|xlsx|md)$/, "")).join(", ")}: ${
          added.includes("interviews")
            ? "customers want setup help more than new features. 9 of 12 interviews mention it. "
            : ""
        }${added.includes("pricing") ? "A setup call fits the Team plan at no extra price. " : ""}${
          added.includes("roadmap") ? "It can ship before the March release. " : ""
        }${added.includes("brand") ? "I will write it in your calm, plain brand voice." : ""}`;
  return (
    <div className="proj" data-reveal>
      <div className="proj-files">
        <p className="mono sd-label">PROJECT · ONBOARDING REVAMP</p>
        <ul>
          {contextFiles.map((f) => {
            const on = added.includes(f.id);
            return (
              <li key={f.id}>
                <button type="button" data-on={on} aria-pressed={on} onClick={() => setAdded((a) => (on ? a.filter((x) => x !== f.id) : [...a, f.id]))}>
                  <FileText size={15} />
                  <span>{f.name}</span>
                  <em className="mono">{f.tokens}k</em>
                  <motion.i animate={{ rotate: on ? 45 : 0 }} transition={spring}>
                    <Plus size={14} />
                  </motion.i>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="meter">
          <span>Context in use</span>
          <b><NumberFlow value={total} />k / 200k</b>
          <i><motion.b animate={{ width: `${(total / 200) * 100 * 2.5}%` }} transition={spring} /></i>
        </div>
      </div>
      <div className="proj-answer">
        <p className="turn-q">What should we build first?</p>
        <AnimatePresence mode="wait">
          <motion.div key={added.join()} className="proj-a" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring}>
            <span className="wren-mark"><Logo small /></span>
            <p>{answer}</p>
          </motion.div>
        </AnimatePresence>
        <div className="proj-cites">
          {used.map((f) => (
            <motion.span key={f.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring}>
              <FileText size={11} /> {f.name}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

const ideas = ["Draft my resignation letter, kindly", "Explain this contract clause", "Plan a three-day trip to Lisbon", "Find the bug in this function"];
function TypeIdeas() {
  const ref = useRef<HTMLFormElement>(null);
  const inView = useInView(ref);
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (!inView || value) return;
    const full = ideas[i];
    const t = window.setTimeout(
      () => {
        if (n < full.length) setN(n + 1);
        else {
          setN(0);
          setI((i + 1) % ideas.length);
        }
      },
      n < full.length ? 45 : 1500,
    );
    return () => window.clearTimeout(t);
  }, [inView, n, i, value]);
  return (
    <form
      ref={ref}
      className="closing-prompt"
      onSubmit={(e) => {
        e.preventDefault();
        toast("Wren is a concept by LN", { description: value ? `“${value}” would start a new chat.` : "Type anything to start a chat." });
        setValue("");
      }}
    >
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={ideas[i].slice(0, n) || " "} aria-label="Ask Wren anything" />
      <button type="submit" aria-label="Start"><ArrowUp size={16} /></button>
    </form>
  );
}

const plans = [
  { name: "Free", monthly: 0, yearly: 0, note: "For trying Wren on everyday questions.", features: ["Chat on web and mobile", "Upload files and photos", "Daily message allowance", "Three projects"], cta: "Try Wren free" },
  { name: "Plus", monthly: 20, yearly: 16, note: "For people who think with Wren daily.", features: ["5× more messages", "Unlimited projects", "Drafts and versions", "Voice conversations", "Early features"], cta: "Get Plus", featured: true },
  { name: "Team", monthly: 30, yearly: 25, per: true, note: "For teams sharing projects.", features: ["Everything in Plus", "Shared projects and drafts", "Admin and SSO", "No training on your data, ever"], cta: "Start a team trial" },
];

const changelog = [
  { date: "Nov 5, 2026", tag: "New", title: "Drafts with versions", body: "Ask for a shorter or warmer version and keep both. Compare them side by side, then copy the one you like." },
  { date: "Oct 22, 2026", tag: "Improved", title: "Steps you can read", body: "Wren now shows what it read and checked before answering, in short plain lines you can expand." },
  { date: "Oct 7, 2026", tag: "New", title: "Projects remember", body: "Files, notes and instructions you add to a project shape every chat inside it." },
];

const faqs = [
  { q: "Will Wren use my chats to train models?", a: "No. In this concept, chats and files are never used for training, on any plan. You can delete a chat and its files at any time." },
  { q: "What happens when Wren doesn’t know?", a: "It says so, and tells you what would help: a file, a number or a clearer question. It would rather ask than guess." },
  { q: "Can Wren see my other apps?", a: "Only the ones you connect, and only for the chat you connect them to. You can disconnect them at any moment." },
  { q: "Is any of this real?", a: "Wren is a fictional product designed by LN. The company, files, answers and prices on this page are invented for the demo." },
];

export default function Wren() {
  const [menu, setMenu] = useState(false);
  const [use, setUse] = useState("write");
  const { active, select } = useActiveSection(sections);
  const [yearly, setYearly] = useState(true);
  const [seats, setSeats] = useState(8);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Wren home">
            <Logo />
            Wren
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
            <Button onClick={concept}>Try Wren</Button>
            <Button variant="unstyled" className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent>
          <SheetTitle>Wren</SheetTitle>
          <SheetDescription>A thinking partner for real work.</SheetDescription>
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
          <Button onClick={() => { setMenu(false); concept(); }}>Try Wren</Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="frame" aria-hidden="true">
            <span className="corner tl" />
            <span className="corner tr" />
          </div>
          <div className="hero-stage">
            <Contours />
            <div className="hero-hints" aria-hidden="true">
              <span className="hh hh-1 rise" style={{ animationDelay: "1.2s" }}><Check size={13} /> Reading Q3-results.pdf</span>
              <span className="hh hh-2 rise" style={{ animationDelay: "1.35s" }}><CircleHelp size={13} /> Which number should I trust?</span>
              <span className="hh hh-3 rise" style={{ animationDelay: "1.5s" }}><Sparkles size={13} /> Draft v2 · 41 words</span>
            </div>
            <div className="hero-copy hero-think">
              <h1 aria-label="A thinking partner for real work">
                <span className="rise" style={{ animationDelay: ".35s" }} aria-hidden="true">A thinking partner</span>
                <span className="rise typed-line" style={{ animationDelay: ".5s" }} aria-hidden="true">
                  for <Typed />
                </span>
              </h1>
              <p className="rise" style={{ animationDelay: ".75s" }}>
                Wren reads what you share, asks before it assumes and writes alongside you. Drafts, decisions and analysis, with the reasoning in plain view.
              </p>
              <div className="hero-ctas rise" style={{ animationDelay: ".9s" }}>
                <Button size="lg" onClick={concept}>
                  Try Wren free <span className="cta-note">No card needed</span>
                  <ArrowRight size={16} />
                </Button>
                <a className="button button-outline button-lg" href="#uses">
                  <Play size={14} /> See it think
                </a>
              </div>
            </div>
          </div>
          <div className="hero-app">
            <WrenApp />
            <p className="hint mono">Pick a prompt, change the style, add the risks to the draft or switch versions.</p>
          </div>
        </section>

        <section className="teams" aria-label="Fictional customers" data-reveal>
          <p>People who think a little clearer with Wren</p>
          <div className="wordmarks" aria-hidden="true">
            <span className="wm wm-1">Northfold</span>
            <span className="wm wm-2">ATLAS LAW</span>
            <span className="wm wm-3">greenhouse</span>
            <span className="wm wm-4">Quillmark</span>
            <span className="wm wm-5">Sundial°</span>
            <span className="wm wm-6">lab/42</span>
          </div>
        </section>

        <section className="section" id="styles">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">STYLES</span>
            <h2>Same thought, <em>your voice.</em></h2>
            <p>Tell Wren how you like to read and write. The facts stay the same, the tone and length follow you.</p>
          </div>
          <StylesDemo />
        </section>

        <section className="section" id="projects">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PROJECTS</span>
            <h2>It remembers <em>what matters.</em></h2>
            <p>Put your files and notes in a project. Every chat inside it starts from what you already know.</p>
          </div>
          <ProjectsDemo />
        </section>

        <section className="section" id="uses">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">USE CASES</span>
            <h2>Shows its work, <em>every time.</em></h2>
            <p>Writing, numbers, code or a new subject: Wren tells you what it read and checked before it answers.</p>
          </div>
          <Tabs value={use} onValueChange={(v) => setUse(String(v))} orientation="vertical" className="convo" data-reveal>
            <TabsList className="convo-list">
              {uses.map((u) => {
                const Icon = useIcons[u.id as keyof typeof useIcons];
                return (
                  <TabsTrigger key={u.id} value={u.id} className="convo-tab">
                    {use === u.id && <Pill id="use-pill" className="pill convo-pill" />}
                    <span className="convo-tab-in">
                      <i className="convo-ico">
                        <Icon size={16} />
                      </i>
                      <b>{u.tab}</b>
                      <small aria-hidden="true">{u.ask}</small>
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {uses.map((u) => (
              <TabsContent key={u.id} value={u.id} className="convo-panel">
                <div className="convo-bar mono">
                  <span className="convo-dot" /> New chat · {u.tab}
                  <span className="convo-bar-r">Balanced</span>
                </div>
                <div className="convo-body">
                  <motion.p className="bubble-user" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={spring}>
                    {u.ask}
                  </motion.p>
                  <motion.div className="thought" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.18 }}>
                    <span className="thought-head mono">
                      <Sparkles size={13} /> Thought through {u.think.length} steps
                    </span>
                    <ol>
                      {u.think.map((t, i) => (
                        <motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.32 + i * 0.16 }}>
                          <span className="thought-tick">
                            <Check size={11} />
                          </span>
                          {t}
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                  <motion.div className="answer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.4 + u.think.length * 0.16 }}>
                    <span className="answer-mark" aria-hidden="true">
                      <Logo />
                    </span>
                    <div className="answer-text">
                      <strong>{u.result}</strong>
                      <p>{u.detail}</p>
                    </div>
                    <div className="answer-chart" aria-hidden="true">
                      {u.bars.map((v, i) => (
                        <motion.span key={i} initial={{ height: "0%" }} animate={{ height: `${v}%` }} transition={{ ...spring, delay: 0.55 + u.think.length * 0.16 + i * 0.05 }} />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="section" id="product">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRODUCT</span>
            <h2>Built for the long, <em>careful kind of work.</em></h2>
            <p>Long documents, real numbers and honest answers. Wren is made for the work you can’t get wrong.</p>
          </div>
          <div className="bento">
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual longdoc" aria-hidden="true">
                <div className="pages">
                  {Array.from({ length: 9 }, (_, i) => (
                    <motion.i key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.05 * i }} />
                  ))}
                </div>
                <span><BookOpenText size={14} /> <b><CountIn value={480} /></b> pages read, every clause cited</span>
              </div>
              <h3>Reads the whole thing</h3>
              <p>Contracts, reports and books, start to end. Ask about page 312 and Wren quotes it back.</p>
            </motion.article>
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual analysis" aria-hidden="true">
                <svg viewBox="0 0 300 110" preserveAspectRatio="none">
                  <motion.path d="M0,90 C40,80 60,40 100,48 S160,85 200,52 S260,18 300,24" fill="none" stroke="var(--accent)" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} vectorEffect="non-scaling-stroke" />
                  <motion.path d="M0,96 C50,94 90,78 140,82 S230,62 300,58" fill="none" stroke="var(--faint)" strokeDasharray="4 4" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }} vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="an-note"><LineChart size={13} /> Paid search explains 82% of the August dip</span>
              </div>
              <h3>Analysis you can check</h3>
              <p>Drop a spreadsheet. Wren charts it, explains it and links every number to its rows.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual voice" aria-hidden="true">
                <span className="voice-orb"><Mic size={18} /></span>
                <span className="voice-wave">{[0, 1, 2, 3, 4, 5, 6].map((i) => <i key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}</span>
              </div>
              <h3>Talk it through</h3>
              <p>Think out loud on a walk. Wren keeps up, then hands you notes.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual memory" aria-hidden="true">
                {["Prefers short answers", "Writes in British English", "Works in fintech"].map((m) => (
                  <span key={m}><Brain size={12} /> {m} <X size={11} /></span>
                ))}
              </div>
              <h3>Memory you control</h3>
              <p>See what Wren remembers about you. Edit or delete any line.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual honest" aria-hidden="true">
                <CircleHelp size={16} />
                <strong>“I’m not sure.”</strong>
                <span>Two sources disagree. Here is each one.</span>
              </div>
              <h3>Honest when unsure</h3>
              <p>When the facts are thin, Wren says so and shows you why.</p>
            </motion.article>
          </div>
        </section>

        <section className="section trust">
          <div className="trust-grid">
            {[
              { icon: EyeOff, title: "Not training data", body: "Your chats and files are never used to train models. Not on Free, not on Team." },
              { icon: ShieldCheck, title: "Careful by default", body: "Wren checks its sources, flags what it is unsure of and asks before acting for you." },
              { icon: Brain, title: "You hold the memory", body: "Turn memory off, edit it or wipe it. Projects only know what you put in them." },
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
            <h2>Start free. <em>Think bigger later.</em></h2>
            <p>Every plan keeps your work private. Pay more only when you need more room.</p>
            <div className="billing" role="group" aria-label="Billing period">
              <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
                {!yearly && <Pill id="billing-pill" />}
                <span>Monthly</span>
              </button>
              <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
                {yearly && <Pill id="billing-pill" />}
                <span>Yearly <em>−20%</em></span>
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
                    {p.featured && <span className="badge">Most people</span>}
                  </header>
                  <p className="plan-note">{p.note}</p>
                  <p className="price">
                    <strong>
                      <NumberFlow value={price} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} locales="en-US" />
                    </strong>
                    <span>{price === 0 ? "forever" : p.per ? "per seat / month" : "per month"}</span>
                  </p>
                  {p.per && (
                    <div className="seats">
                      <span>Seats</span>
                      <div className="stepper">
                        <button type="button" aria-label="Fewer seats" onClick={() => setSeats((s) => Math.max(5, s - 1))}><Minus size={13} /></button>
                        <b><NumberFlow value={seats} /></b>
                        <button type="button" aria-label="More seats" onClick={() => setSeats((s) => Math.min(150, s + 1))}><Plus size={13} /></button>
                      </div>
                      <em>
                        <NumberFlow value={seats * price} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} locales="en-US" /> / month
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
            <h2>Lately, <em>in Wren.</em></h2>
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
            <h2>Fair <em>questions.</em></h2>
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
            <motion.span className="swing" animate={{ rotate: [-6, 6] }} transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}>
              <Logo />
            </motion.span>
          </span>
          <h2>What are you <em>working on?</em></h2>
          <p>Bring a messy draft, a hard question or a spreadsheet. Wren will think it through with you.</p>
          <TypeIdeas />
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand"><Logo /> Wren</a>
          <nav aria-label="Footer">
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Wren is a fictional product. The company, files, answers and prices are invented for this demo.</p>
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
