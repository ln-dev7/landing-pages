"use client";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Menu } from "lucide-react";
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
import { Terminal } from "./terminal";
import { CountIn, Pill, spring, useActiveSection } from "./motion-kit";

const LN = "https://lndev.me/";
const SUPPORT = "https://lndev.mychariow.shop/prd_3cu1s0";
const SOURCE =
  "https://github.com/ln-dev7/landing-pages/tree/master/landing-pages/nightshift";
const INSTALL = "curl -fsSL https://nightshift.example/install | sh";

const links = [
  { href: "#demo", label: "demo" },
  { href: "#night", label: "last night" },
  { href: "#runbooks", label: "runbooks" },
  { href: "#pricing", label: "pricing" },
  { href: "#faq", label: "faq" },
];
const sections = ["demo", "night", "runbooks", "pricing", "faq"];

const concept = () =>
  toast("Nightshift is a concept by LN", {
    description: "There's nothing to install. The terminal above is the demo.",
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

const MOON = String.raw`
        _.._
      .' .-'\`
     /  /
     |  |      *
     \  '.___.;     .
      '._  _.'   *
         ''
`;

const night = [
  {
    t: 12,
    label: "23:12",
    text: "Watched deploy v410 for 15 min. All good.",
    who: "auto",
  },
  {
    t: 100,
    label: "00:40",
    text: "Renewed the TLS certificate for the public API.",
    who: "auto",
  },
  {
    t: 194,
    label: "02:14",
    text: "SEV1 latency. Rolled back v412 after finding a config change.",
    who: "auto",
  },
  {
    t: 281,
    label: "03:41",
    text: "SEV2 disk-full. Rotated logs, freed 29G.",
    who: "auto",
  },
  {
    t: 320,
    label: "04:20",
    text: "Search reindex was slow. Added two nodes, removed them at 05:10.",
    who: "auto",
  },
  {
    t: 362,
    label: "05:02",
    text: "SEV3 noise. Rate-limited a scraper and tuned the alert.",
    who: "auto",
  },
  {
    t: 430,
    label: "06:10",
    text: "Payment provider outage. Woke Maya: it needs a human call.",
    who: "human",
  },
  {
    t: 475,
    label: "06:55",
    text: "Wrote the morning summary and the postmortem drafts.",
    who: "auto",
  },
];

const permissions = [
  { id: "restart", label: "restart unhealthy pods", key: "restart_pods" },
  {
    id: "rollback",
    label: "roll back the last deploy",
    key: "rollback_deploys",
  },
  { id: "scale", label: "scale up to +50% capacity", key: "scale_up" },
  { id: "logs", label: "rotate and trim logs", key: "rotate_logs" },
  { id: "flags", label: "turn off feature flags", key: "kill_flags" },
];

const plans = [
  {
    id: "solo",
    name: "solo",
    base: 0,
    per: 0,
    note: "1 team · 5 services · community runbooks",
  },
  {
    id: "team",
    name: "team",
    base: 99,
    per: 6,
    note: "unlimited services · custom runbooks · postmortems",
  },
  {
    id: "scale",
    name: "scale",
    base: 499,
    per: 4,
    note: "SSO · audit log · on-prem runner",
  },
];

const faqs = [
  {
    q: "NAME — what is nightshift",
    a: "An AI on-call engineer. It reads your alerts, investigates with your metrics and logs, fixes what your runbooks allow and wakes a human for the rest.",
  },
  {
    q: "SAFETY — can it break production",
    a: "It can only run actions you allow in its runbooks, and every action is logged with the evidence behind it. Anything else becomes a question for a human.",
  },
  {
    q: "HUMANS — who gets woken up",
    a: "Your normal rotation, but only when Nightshift can't fix it or the fix needs judgment. It pages with a summary, graphs and what it already tried.",
  },
  {
    q: "BUGS — is any of this real",
    a: "No. Nightshift is a fictional product designed by LN. Services, incidents, people and prices are invented and the terminal runs on this page only.",
  },
];

export default function Nightshift() {
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState(194);
  const [allowed, setAllowed] = useState<Record<string, boolean>>({
    restart: true,
    rollback: true,
    scale: true,
    logs: true,
    flags: false,
  });
  const [wake, setWake] = useState(10);
  const [plan, setPlan] = useState("team");
  const [services, setServices] = useState(24);
  const [clock, setClock] = useState({ h: 2, m: 14, s: 7 });
  const { active, select } = useActiveSection(sections);
  useReveal();

  useEffect(() => {
    const t = window.setInterval(
      () =>
        setClock((c) => {
          const s = (c.s + 1) % 60;
          const m = s === 0 ? (c.m + 1) % 60 : c.m;
          return { h: c.h, m, s };
        }),
      1000,
    );
    return () => window.clearInterval(t);
  }, []);

  const shown = night.filter((e) => e.t <= time);
  const hh = Math.floor((23 * 60 + time) / 60) % 24;
  const mm = (23 * 60 + time) % 60;
  const p = plans.find((x) => x.id === plan) ?? plans[1];
  const price = p.base + p.per * Math.max(0, services - 5);
  const bar = Math.round((time / 480) * 24);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      toast("Copied", {
        description: "It points at an example domain. Nothing will install.",
      });
    } catch {
      toast("Couldn't copy", {
        description: "Select the command and copy it by hand.",
      });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="crt" aria-hidden="true" />
      <a className="skip" href="#main">
        skip to content
      </a>
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Nightshift home">
            <span className="brand-moon">☾</span> nightshift
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
                  <span>[{l.label}]</span>
                </a>
              );
            })}
            <a href={LN}>
              <span>[docs]</span>
            </a>
          </nav>
          <div className="nav-actions">
            <Button onClick={concept}>&gt; install</Button>
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
          <SheetTitle>☾ nightshift</SheetTitle>
          <SheetDescription>you sleep. it takes the pager.</SheetDescription>
          <nav aria-label="Mobile" className="sheet-links">
            {[...links, { href: LN, label: "docs" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => {
                  if (l.href.startsWith("#")) select(l.href.slice(1));
                  setMenu(false);
                }}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.05 + i * 0.05 }}
              >
                &gt; {l.label}
              </motion.a>
            ))}
          </nav>
          <Button
            onClick={() => {
              setMenu(false);
              concept();
            }}
          >
            &gt; install
          </Button>
        </SheetContent>
      </Sheet>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.p
                className="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                &gt; status: you are asleep. <span className="good">good.</span>
              </motion.p>
              <h1>
                {["YOU SLEEP.", "WE TAKE", "THE PAGER."].map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                      duration: 0.6,
                      ease: "linear",
                      delay: 0.3 + i * 0.45,
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="hero-sub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 1.7 }}
              >
                Nightshift is an AI on-call engineer. It reads the alert,
                investigates with your metrics and logs, fixes what your
                runbooks allow and only wakes a human when it really has to.
              </motion.p>
              <motion.div
                className="hero-ctas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 1.9 }}
              >
                <Button size="lg" onClick={concept}>
                  &gt; start free trial
                </Button>
                <a
                  className="button button-outline button-lg"
                  href="#demo"
                  onClick={() => select("demo")}
                >
                  watch an incident ↓
                </a>
              </motion.div>
            </div>
            <motion.div
              className="hero-side"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              aria-hidden="true"
            >
              <pre className="moon">{MOON}</pre>
              <div className="utc">
                <small>UTC</small>
                <span>
                  {String(clock.h).padStart(2, "0")}:
                  <NumberFlow
                    value={clock.m}
                    format={{ minimumIntegerDigits: 2 }}
                  />
                  :
                  <NumberFlow
                    value={clock.s}
                    format={{ minimumIntegerDigits: 2 }}
                  />
                </span>
              </div>
              <ul className="side-list">
                <li>
                  <i className="led" data-state="free" /> 42 services watched
                </li>
                <li>
                  <i className="led" data-state="ask" /> 1 incident open
                </li>
                <li>
                  <i className="led" data-state="off" /> 0 humans awake
                </li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="hero-term"
            id="demo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 2.1 }}
          >
            <Terminal />
            <p className="hint">
              click the terminal and type. try: help · status · open 2 · sleep
            </p>
          </motion.div>
        </section>

        <section className="section stats" aria-label="Nightshift in numbers">
          {[
            { v: 4, suf: " min", label: "median time to fix" },
            {
              v: 0.71,
              suf: "",
              label: "of incidents closed without waking anyone",
              pct: true,
            },
            { v: 9, suf: " h", label: "of sleep saved per engineer, per week" },
            { v: 312, suf: "", label: "runbooks in the community library" },
          ].map((s) => (
            <div className="stat" key={s.label} data-reveal>
              <CountIn
                className="stat-value"
                value={s.v}
                suffix={s.suf}
                format={s.pct ? { style: "percent" } : {}}
              />
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        <section className="section night" id="night">
          <header className="section-head" data-reveal>
            <span className="eyebrow">## last night</span>
            <h2>8 hours. 8 events. 1 human woken.</h2>
            <p>
              Drag through the night to see what Nightshift did while the team
              slept.
            </p>
          </header>
          <div className="night-panel" data-reveal>
            <div className="night-top">
              <div className="night-clock">
                <NumberFlow value={hh} format={{ minimumIntegerDigits: 2 }} />:
                <NumberFlow value={mm} format={{ minimumIntegerDigits: 2 }} />
              </div>
              <pre className="night-bar" aria-hidden="true">
                23:00 [{"#".repeat(bar)}
                {"-".repeat(24 - bar)}] 07:00
              </pre>
            </div>
            <label className="sr-only" htmlFor="night-time">
              Time of night
            </label>
            <input
              id="night-time"
              type="range"
              min={0}
              max={480}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="night-range"
            />
            <ol className="night-log">
              <AnimatePresence initial={false}>
                {shown.map((e) => (
                  <motion.li
                    key={e.label}
                    data-who={e.who}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: -12,
                      transition: { duration: 0.12 },
                    }}
                    transition={spring}
                  >
                    <span className="ts">{e.label}</span>
                    <span className="tag" data-who={e.who}>
                      {e.who === "human" ? "PAGED" : "AUTO"}
                    </span>
                    {e.text}
                  </motion.li>
                ))}
              </AnimatePresence>
              {shown.length === 0 && (
                <li className="empty">quiet so far. 23:00, all green.</li>
              )}
            </ol>
            <p className="night-sum">
              handled alone:{" "}
              <NumberFlow
                value={shown.filter((e) => e.who === "auto").length}
              />{" "}
              · humans woken:{" "}
              <NumberFlow
                value={shown.filter((e) => e.who === "human").length}
              />
            </p>
          </div>
        </section>

        <section className="section runbooks" id="runbooks">
          <header className="section-head" data-reveal>
            <span className="eyebrow">## runbooks</span>
            <h2>It only does what you allow.</h2>
            <p>
              Tick what Nightshift may do on its own. The policy file updates as
              you go.
            </p>
          </header>
          <div className="rb" data-reveal>
            <div className="rb-list" role="group" aria-label="Allowed actions">
              {permissions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="checkbox"
                  aria-checked={allowed[p.id]}
                  onClick={() =>
                    setAllowed((a) => ({ ...a, [p.id]: !a[p.id] }))
                  }
                >
                  <span className="box">{allowed[p.id] ? "[x]" : "[ ]"}</span>{" "}
                  {p.label}
                </button>
              ))}
              <div className="wake">
                <span>wake a human after</span>
                <span className="stepper">
                  <button
                    type="button"
                    aria-label="Wake sooner"
                    onClick={() => setWake((w) => Math.max(5, w - 5))}
                  >
                    -
                  </button>
                  <b>
                    <NumberFlow value={wake} />
                  </b>
                  <button
                    type="button"
                    aria-label="Wake later"
                    onClick={() => setWake((w) => Math.min(60, w + 5))}
                  >
                    +
                  </button>
                </span>
                <span>min</span>
              </div>
            </div>
            <pre className="policy">
              <span className="dim"># nightshift.yaml</span>
              {"\n"}
              <span className="key">autonomy</span>:{"\n"}
              {permissions.map((p) => (
                <motion.span
                  key={p.id + String(allowed[p.id])}
                  className="pl"
                  data-on={allowed[p.id]}
                  initial={{ backgroundColor: "rgba(255,176,0,0.25)" }}
                  animate={{ backgroundColor: "rgba(255,176,0,0)" }}
                  transition={{ duration: 0.8 }}
                >
                  {"  "}
                  {p.key}: {allowed[p.id] ? "allow" : "ask_human"}
                  {"\n"}
                </motion.span>
              ))}
              <span className="key">escalation</span>:{"\n"}
              {"  "}page_after: {wake}m{"\n"}
              {"  "}rotation: primary → secondary{"\n"}
              <span className="key">always</span>:{"\n"}
              {"  "}- log_every_action{"\n"}
              {"  "}- attach_evidence
            </pre>
          </div>
        </section>

        <section
          className="section integrations"
          aria-label="Integrations"
          data-reveal
        >
          <pre className="table">
            {`+------------+-----------------------+-----------+
| type       | works with            | setup     |
+------------+-----------------------+-----------+
| metrics    | prometheus-style, otel| 2 min     |
| logs       | any http or syslog    | 2 min     |
| deploys    | git + your ci         | 5 min     |
| chat       | team chat, email      | 1 min     |
| paging     | your rotation         | 3 min     |
+------------+-----------------------+-----------+`}
          </pre>
        </section>

        <section className="section pricing" id="pricing">
          <header className="section-head" data-reveal>
            <span className="eyebrow">## pricing</span>
            <h2>Cheaper than one bad night.</h2>
          </header>
          <div className="price-term" data-reveal>
            <p className="dim">$ nightshift plans --services {services}</p>
            <div role="radiogroup" aria-label="Plan" className="plan-rows">
              {plans.map((x) => {
                const total = x.base + x.per * Math.max(0, services - 5);
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="radio"
                    aria-checked={plan === x.id}
                    onClick={() => setPlan(x.id)}
                  >
                    {plan === x.id && (
                      <Pill id="plan-pill" className="pill plan-pill" />
                    )}
                    <span className="radio">
                      {plan === x.id ? "(•)" : "( )"}
                    </span>
                    <span className="plan-name">{x.name}</span>
                    <span className="plan-note">{x.note}</span>
                    <span className="plan-price">
                      {x.id === "solo" ? "free" : `$${total}/mo`}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="services">
              <span>services</span>
              <span className="stepper">
                <button
                  type="button"
                  aria-label="Fewer services"
                  onClick={() => setServices((s) => Math.max(5, s - 5))}
                >
                  -
                </button>
                <b>
                  <NumberFlow value={services} />
                </b>
                <button
                  type="button"
                  aria-label="More services"
                  onClick={() => setServices((s) => Math.min(200, s + 5))}
                >
                  +
                </button>
              </span>
              <span className="total">
                total ={" "}
                <NumberFlow
                  value={plan === "solo" ? 0 : price}
                  format={{
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }}
                  locales="en-US"
                />
                /mo
              </span>
            </div>
            <div className="price-actions">
              <Button onClick={concept}>&gt; start with {p.name}</Button>
              <span className="dim">fictional prices. nothing is billed.</span>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <header className="section-head" data-reveal>
            <span className="eyebrow">## man nightshift</span>
            <h2>Questions, answered.</h2>
          </header>
          <Accordion className="faq-list" data-reveal>
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
            GO BACK
            <br />
            TO SLEEP.
          </h2>
          <div className="install">
            <code>
              <span className="dim">$</span> {INSTALL}
            </code>
            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={copy}
            >
              [copy]
            </motion.button>
          </div>
          <p className="dim">
            or start a free trial and connect your first service in five
            minutes.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          ☾ nightshift is a fictional product. services, incidents, people and
          prices are invented for this demo.
        </p>
        <p>
          designed and developed by <a href={LN}>LN</a> ·{" "}
          <a href={SOURCE}>source</a> ·{" "}
          <a href={SUPPORT}>support the project ↗</a>
        </p>
      </footer>
      <Toaster />
    </MotionConfig>
  );
}
