"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  Check,
  ChevronRight,
  GripVertical,
  Plus,
  CloudOff,
  Download,
  Lock,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, Reorder, motion } from "motion/react";
import { Pill, spring, useActiveSection, CountIn } from "./motion-kit";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { Database, FolioApp, Owner, PageIcon } from "./folio-app";
import { Logo } from "./logo";
import { tasks as seedTasks, templates, type Task } from "./data";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE = "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/folio";

const links = [
  { href: "#blocks", label: "Blocks" },
  { href: "#databases", label: "Databases" },
  { href: "#templates", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#changelog", label: "Changelog" },
];
const sections = ["blocks", "databases", "templates", "product", "pricing", "changelog", "faq"];
const lift = { whileHover: { y: -4 }, transition: spring };

const concept = () =>
  toast("Folio is a concept by LN", {
    description: "There is no account to create. Write in the demo instead.",
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

type Kind = "Text" | "Heading" | "Quote" | "Callout" | "To-do";
const kinds: Kind[] = ["Text", "Heading", "To-do", "Quote", "Callout"];

function BlocksDemo() {
  const [items, setItems] = useState([
    { id: "a", kind: "Heading" as Kind, text: "Why we are changing the onboarding" },
    { id: "b", kind: "Text" as Kind, text: "Half of new teams never invite a second person. The invite step comes too early." },
    { id: "c", kind: "Callout" as Kind, text: "Decision needed by Thursday." },
    { id: "d", kind: "To-do" as Kind, text: "Prototype the invite after the first project" },
    { id: "e", kind: "Quote" as Kind, text: "I didn’t know who to invite yet. — a beta tester" },
  ]);
  const [sel, setSel] = useState("b");
  const [done, setDone] = useState(false);
  const current = items.find((i) => i.id === sel)!;
  return (
    <div className="blocks-demo" data-reveal>
      <div className="bd-side">
        <p className="mono bd-label">TURN “{current.text.slice(0, 18)}…” INTO</p>
        <div className="bd-kinds" role="group" aria-label="Block type">
          {kinds.map((k) => (
            <button key={k} type="button" aria-pressed={current.kind === k} onClick={() => setItems((it) => it.map((i) => (i.id === sel ? { ...i, kind: k } : i)))}>
              {current.kind === k && <Pill id="kind-pill" className="pill kind-pill" />}
              <span>{k}</span>
            </button>
          ))}
        </div>
        <p className="bd-help">Drag the handles to reorder. Click a block, then change what it is. The words stay put.</p>
      </div>
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="bd-doc">
        {items.map((i) => (
          <Reorder.Item key={i.id} value={i} className="bd-item" data-sel={sel === i.id} data-kind={i.kind} onPointerDown={() => setSel(i.id)} whileDrag={{ scale: 1.02, boxShadow: "0 18px 40px -18px #1a1a1a55" }} transition={spring}>
            <span className="bd-grip" aria-hidden="true">⋮⋮</span>
            <button type="button" className="bd-body" onClick={() => setSel(i.id)} aria-label={`Select block: ${i.text}`}>
              {i.kind === "To-do" && (
                <span className="bd-box" data-done={done} onClick={(e) => { e.stopPropagation(); setDone((d) => !d); }}>
                  {done && <Check size={10} strokeWidth={3} />}
                </span>
              )}
              <motion.span layout="position" className="bd-text">{i.text}</motion.span>
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

function TemplateGallery() {
  const cats = ["All", "Engineering", "Design", "People", "Personal"];
  const [cat, setCat] = useState("All");
  const [added, setAdded] = useState<string[]>([]);
  const shown = templates.filter((t) => cat === "All" || t.cat === cat);
  return (
    <div data-reveal>
      <div className="tpl-cats" role="group" aria-label="Template category">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {cat === c && <Pill id="cat-pill" className="pill cat-pill" />}
            <span>{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="tpl-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((t) => {
            const on = added.includes(t.name);
            return (
              <motion.article
                key={t.name}
                layout
                className="tpl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={spring}
                whileHover={{ y: -4 }}
              >
                <div className="tpl-preview" style={{ ["--c" as string]: t.color }}>
                  <PageIcon icon={t.icon} color={t.color} size={16} />
                  <i /><i /><i />
                </div>
                <h3>{t.name}</h3>
                <p className="mono">{t.cat} · {(t.uses / 1000).toFixed(1)}k uses</p>
                <button
                  type="button"
                  data-on={on}
                  onClick={() => {
                    setAdded((a) => (a.includes(t.name) ? a : [...a, t.name]));
                    toast(`“${t.name}” added`, { description: "It’s waiting in your sidebar, ready to fill in." });
                  }}
                >
                  {on ? <><Check size={13} /> Added</> : "Use template"}
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const plans = [
  { name: "Free", monthly: 0, yearly: 0, note: "For your own notes and plans.", features: ["Unlimited pages and blocks", "Share with up to 10 guests", "7-day page history", "Web, desktop and mobile"], cta: "Start writing" },
  { name: "Plus", monthly: 12, yearly: 10, note: "For small teams writing together.", features: ["Unlimited members", "Databases with every view", "30-day page history", "Verified wiki pages", "Guests without limits"], cta: "Start a 14-day trial", featured: true },
  { name: "Business", monthly: 22, yearly: 18, note: "For companies with many spaces.", features: ["SAML single sign-on", "Private team spaces", "90-day page history", "Audit log & exports"], cta: "Talk to us" },
];

const changelog = [
  { date: "Nov 2, 2026", tag: "New", title: "Answers cite their blocks", body: "Every answer from Folio links to the exact blocks it read. Hover a number to see the source light up." },
  { date: "Oct 21, 2026", tag: "Improved", title: "Databases load four times faster", body: "Tables with 50,000 rows open in under a second, on any device." },
  { date: "Oct 8, 2026", tag: "New", title: "Verified pages", body: "Mark a wiki page as verified until a date. Folio reminds the owner when it needs another look." },
];

const faqs = [
  { q: "Is Folio a wiki, a docs tool or a database?", a: "All three, on purpose. Every page is made of blocks, and any block can be a table, a board or a calendar. Your wiki and your project tracker finally live together." },
  { q: "Does Folio read my private pages?", a: "Folio only answers from pages you are allowed to open. Private pages stay private, and nothing you write is used to train models." },
  { q: "Can I bring my docs from elsewhere?", a: "In this concept, you can import Markdown, Word files and exports from other note apps. Links between pages are kept." },
  { q: "Is any of this real?", a: "Folio is a fictional product designed by LN. The company, pages, people and prices on this page are invented for the demo." },
];

export default function Folio() {
  const [menu, setMenu] = useState(false);
  const { active, select } = useActiveSection(sections);
  const [yearly, setYearly] = useState(true);
  const [ai, setAi] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [dbTasks, setDbTasks] = useState<Task[]>(seedTasks);
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
          <a href="#top" className="brand" aria-label="Folio home">
            <Logo />
            Folio
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
            <button type="button" className="nav-search" onClick={concept}>
              <Search size={14} /> Search docs <kbd>⌘K</kbd>
            </button>
            <button type="button" className="text-button" onClick={concept}>Log in</button>
            <Button onClick={concept}>Start writing</Button>
            <Button variant="unstyled" className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent>
          <SheetTitle>Folio</SheetTitle>
          <SheetDescription>Docs, wikis and projects in one place.</SheetDescription>
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
          <Button onClick={() => { setMenu(false); concept(); }}>Start writing</Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="frame" aria-hidden="true">
            <span className="corner tl" />
            <span className="corner tr" />
          </div>
          <div className="hero-stage">
            <div className="margin-notes" aria-hidden="true">
              <span className="note-l rise" style={{ animationDelay: "1.2s" }}>
                <Owner name="Mina" size={18} /> “Can we keep this one short?”
              </span>
              <span className="note-r rise" style={{ animationDelay: "1.4s" }}>
                <BadgeCheck size={14} /> Verified until Dec 1
              </span>
            </div>
            <div className="hero-copy hero-doc">
              <div className="doc-crumbs rise" style={{ animationDelay: ".2s" }}>
                <span>Juniper &amp; Co</span>
                <ChevronRight size={13} />
                <span>Handbook</span>
                <ChevronRight size={13} />
                <b>Start here</b>
              </div>
              <h1>
                <span className="doc-line rise" style={{ animationDelay: ".35s" }}>
                  <span className="doc-handle" aria-hidden="true">
                    <Plus size={18} />
                    <GripVertical size={18} />
                  </span>
                  Write it down once.
                </span>
                <span className="rise" style={{ animationDelay: ".5s" }}>
                  <em>Find it forever.</em>
                  <span className="doc-caret" aria-hidden="true" />
                </span>
              </h1>
              <p className="doc-slash rise" style={{ animationDelay: ".65s" }} aria-hidden="true">
                Type <kbd>/</kbd> for blocks, <kbd>@</kbd> to link a page
              </p>
              <p className="rise" style={{ animationDelay: ".75s" }}>
                Folio is the shared notebook for your team: docs, wikis and project tables in one place, with an assistant that has read every page so you don’t have to.
              </p>
              <div className="hero-ctas rise" style={{ animationDelay: ".9s" }}>
                <Button size="lg" onClick={concept}>
                  Start writing <span className="cta-note">Free for personal use</span>
                  <ArrowRight size={16} />
                </Button>
                <a className="button button-outline button-lg" href="#blocks">
                  <Play size={14} /> Take the tour
                </a>
              </div>
            </div>
          </div>
          <div className="hero-app">
            <FolioApp />
            <p className="hint mono">Tick a to-do, press + to add a block, switch the table view or ask Folio.</p>
          </div>
        </section>

        <section className="teams" aria-label="Fictional customers" data-reveal>
          <p>Teams who stopped asking “where is that doc?”</p>
          <div className="wordmarks" aria-hidden="true">
            <span className="wm wm-1">Larchmont</span>
            <span className="wm wm-2">PALLET</span>
            <span className="wm wm-3">wildacre</span>
            <span className="wm wm-4">Kestrelcode</span>
            <span className="wm wm-5">Hullabaloo</span>
            <span className="wm wm-6">grain.co</span>
          </div>
        </section>

        <section className="section" id="blocks">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">BLOCKS</span>
            <h2>Pages built like <em>building blocks.</em></h2>
            <p>Text, headings, to-dos, quotes and tables are all blocks. Move them, change them, nest them. A page grows the way your thinking does.</p>
          </div>
          <BlocksDemo />
        </section>

        <section className="section" id="databases">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">DATABASES</span>
            <h2>One table, <em>every view.</em></h2>
            <p>The same list of tasks as a table for planning, a board for the standup and a calendar for launch week. Change it once, it changes everywhere.</p>
          </div>
          <div className="db-stage" data-reveal>
            <Database tasks={dbTasks} setTasks={setDbTasks} big />
          </div>
        </section>

        <section className="section" id="templates">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">TEMPLATES</span>
            <h2>Never start from <em>a blank page.</em></h2>
            <p>Thousands of teams share how they run meetings, write specs and onboard people. Pick one and make it yours.</p>
          </div>
          <TemplateGallery />
        </section>

        <section className="section" id="product">
          <div className="section-head" data-reveal>
            <span className="eyebrow mono">PRODUCT</span>
            <h2>Everything you know, <em>easy to find.</em></h2>
            <p>Folio keeps the knowledge fresh, answers questions with sources and works even when the Wi-Fi doesn’t.</p>
          </div>
          <div className="bento">
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual find" aria-hidden="true">
                <span className="find-q"><Search size={13} /> how many vacation days do we get?</span>
                <motion.span className="find-a" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...spring, delay: 0.3 }}>
                  <Sparkles size={13} /> 27 days a year, plus your birthday. <b>Handbook › Benefits</b>
                </motion.span>
              </div>
              <h3>Ask across every page</h3>
              <p>Questions get a short answer and the pages it came from, not ten links to read.</p>
            </motion.article>
            <motion.article className="tile tile-wide" data-reveal {...lift}>
              <div className="tile-visual verify" aria-hidden="true">
                <span className="v-row"><BadgeCheck size={14} /> Expense policy <em>Verified</em></span>
                <span className="v-row"><BadgeCheck size={14} /> On-call guide <em>Verified</em></span>
                <span className="v-row v-old"><ShieldCheck size={14} /> Office Wi-Fi <em>Needs review</em></span>
              </div>
              <h3>A wiki that stays true</h3>
              <p>Owners verify pages until a date. Folio nudges them before anything goes stale.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual mention" aria-hidden="true">
                <span><AtSign size={13} /> <b>Theo</b> can you check the numbers?</span>
                <span className="reply"><Owner name="Theo" size={18} /> Done, they match.</span>
              </div>
              <h3>Comments where the work is</h3>
              <p>Mention someone on any block. The thread stays next to the words it is about.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual offline" aria-hidden="true">
                <WifiOff size={16} />
                <strong><CountIn value={100} suffix="%" /></strong>
                <span>of your pages, offline</span>
              </div>
              <h3>Works on the train</h3>
              <p>Pages you open are saved on your device and sync the moment you are back online.</p>
            </motion.article>
            <motion.article className="tile" data-reveal {...lift}>
              <div className="tile-visual perms" aria-hidden="true">
                {[["Everyone at Juniper", "Can read"], ["Design team", "Can edit"], ["Guests", "Can comment"]].map(([a, b]) => (
                  <span key={a}><Lock size={12} /> {a} <em>{b}</em></span>
                ))}
              </div>
              <h3>Sharing you can read</h3>
              <p>Who sees what is written in plain words, page by page.</p>
            </motion.article>
          </div>
        </section>

        <section className="section trust">
          <div className="trust-grid">
            {[
              { icon: ShieldCheck, title: "Private stays private", body: "Folio only answers from pages you can open, and never trains on your words." },
              { icon: CloudOff, title: "Yours, even offline", body: "A copy of your recent pages lives on your device, so writing never waits for a network." },
              { icon: Download, title: "Leave anytime", body: "Export the whole workspace as Markdown and CSV. Your words were always yours." },
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
            <h2>Free to write. <em>Fair to grow.</em></h2>
            <p>Personal use is free forever. Teams pay per member, and Folio AI is a switch you can turn on or off.</p>
            <div className="pricing-controls">
              <div className="billing" role="group" aria-label="Billing period">
                <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
                  {!yearly && <Pill id="billing-pill" />}
                  <span>Monthly</span>
                </button>
                <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
                  {yearly && <Pill id="billing-pill" />}
                  <span>Yearly <em>−17%</em></span>
                </button>
              </div>
              <button type="button" role="switch" aria-checked={ai} className="ai-switch" onClick={() => setAi((a) => !a)}>
                <span className="track"><motion.span className="thumb" layout transition={spring} /></span>
                <Sparkles size={13} /> Include Folio AI
              </button>
            </div>
          </div>
          <div className="plans">
            {plans.map((p) => {
              const base = yearly ? p.yearly : p.monthly;
              const price = base + (ai && base > 0 ? 8 : 0);
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
                    <span>{base > 0 ? "per member / month" : "forever"}</span>
                  </p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}><Check size={14} /> {f}</li>
                    ))}
                    <AnimatePresence initial={false}>
                      {ai && (
                        <motion.li key="ai" className="ai-feature" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={spring}>
                          <Sparkles size={14} /> {base > 0 ? "Folio AI, unlimited" : "Folio AI, 20 answers to try"}
                        </motion.li>
                      )}
                    </AnimatePresence>
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
            <h2>New in <em>Folio.</em></h2>
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
            <h2>Before you <em>move in.</em></h2>
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
            <motion.span className="swing" animate={{ rotate: [-6, 6] }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}>
              <Logo />
            </motion.span>
          </span>
          <h2>Start with a blank page. <em>Or a good one.</em></h2>
          <p>Bring your notes, invite your team, and let Folio keep it all findable.</p>
          <div className="hero-ctas">
            <Button size="lg" onClick={concept}>Start writing <ArrowRight size={16} /></Button>
            <a className="button button-outline button-lg" href="#templates">Browse templates</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="brand"><Logo /> Folio</a>
          <nav aria-label="Footer">
            {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Folio is a fictional product. The company, pages, people and prices are invented for this demo.</p>
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
