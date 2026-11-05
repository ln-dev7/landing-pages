"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowUp,
  Bookmark,
  ChartLine,
  ChevronsUpDown,
  Ellipsis,
  FlaskConical,
  Funnel,
  LayoutGrid,
  Lightbulb,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { CountIn, Pill, spring } from "./motion-kit";
import { answers, ranges, type Answer, type Range } from "./data";
import { Logo } from "./logo";

type Message =
  | { role: "user"; text: string }
  | { role: "plumb"; answer: Answer; shown: number; done: boolean }
  | { role: "note"; text: string };

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Chart({ range, focus }: { range: Range; focus: boolean }) {
  const data = ranges[range];
  const w = 520;
  const h = 150;
  const min = 35;
  const max = 50;
  const x = (i: number) => (i / (data.current.length - 1)) * w;
  const y = (v: number) => h - ((v - min) / (max - min)) * h;
  const line = (values: number[]) =>
    values
      .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
      .join(" ");
  const area = `${line(data.current)} L${w},${h} L0,${h} Z`;
  const dropX = x(data.drop);
  const last = data.current.length - 1;
  const tickEvery = Math.ceil(data.labels.length / 5);
  return (
    <div className="chart" data-focus={focus}>
      <div className="chart-axis" aria-hidden="true">
        {[50, 45, 40, 35].map((t) => (
          <span key={t} style={{ top: `${((max - t) / (max - min)) * 100}%` }}>
            {t}%
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Onboarding completion over ${range}: ${data.current[0]}% to ${data.current[last]}%`}
      >
        <defs>
          <linearGradient id="plumb-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--blue)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[50, 45, 40, 35].map((t) => (
          <line
            key={t}
            x1="0"
            x2={w}
            y1={y(t)}
            y2={y(t)}
            className="grid-line"
          />
        ))}
        <rect
          className="drop-band"
          x={dropX - 6}
          y="0"
          width={w - dropX + 6}
          height={h}
        />
        <path d={line(data.previous)} className="line-previous" />
        <path
          d={area}
          fill="url(#plumb-area)"
          className="line-area"
          key={`a-${range}`}
        />
        <path
          d={line(data.current)}
          className="line-current"
          key={`l-${range}`}
          pathLength={1}
        />
      </svg>
      <span
        className="drop-dot"
        style={{
          left: `${(x(last) / w) * 100}%`,
          top: `${(y(data.current[last]) / h) * 100}%`,
        }}
        aria-hidden="true"
      />
      <span className="drop-tag mono" style={{ right: 0 }} aria-hidden="true">
        <NumberFlow
          value={-(data.current[data.drop - 1] - data.current[last])}
          format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
          suffix=" pts"
          locales="en-US"
        />
      </span>
      <div className="chart-labels" aria-hidden="true">
        {data.labels.map((l, i) =>
          i % tickEvery === 0 ? (
            <span key={l} style={{ left: `${(x(i) / w) * 100}%` }}>
              {l}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
}

function Detail({ answer }: { answer: Answer }) {
  const d = answer.detail;
  if (d.kind === "cause")
    return (
      <div className="answer-card">
        <div className="answer-row">
          <span className="mono">SEGMENT</span>
          <strong>{d.segment}</strong>
        </div>
        <div className="answer-row">
          <span className="mono">IMPACT</span>
          <strong className="neg">{d.impact}</strong>
        </div>
        <p className="answer-reason">
          <Lightbulb size={14} aria-hidden="true" />
          {d.reason}
        </p>
      </div>
    );
  if (d.kind === "bars")
    return (
      <div className="answer-card">
        {d.rows.map((r, i) => (
          <div className="bar-row" key={r.label}>
            <span>{r.label}</span>
            <span className="bar-track">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${(r.value / 14) * 100}%` }}
                transition={{ ...spring, delay: 0.1 + i * 0.08 }}
              />
            </span>
            <CountIn
              className="bar-value"
              value={r.value / 100}
              format={{ style: "percent", maximumFractionDigits: 1 }}
            />
          </div>
        ))}
      </div>
    );
  return (
    <div className="answer-card answer-stat">
      <CountIn
        className="stat-value"
        value={d.value}
        prefix="+"
        suffix=" pts"
        format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
      />
      <span className="mono">{d.note}</span>
    </div>
  );
}

export function AskDemo() {
  const [range, setRange] = useState<Range>("7d");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const timers = useRef<number[]>([]);
  const thread = useRef<HTMLDivElement>(null);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const ask = useCallback((answer: Answer, delay = 0) => {
    clear();
    setBusy(true);
    const reduced = prefersReduced();
    const later = (fn: () => void, ms: number) =>
      timers.current.push(window.setTimeout(fn, ms));
    later(() => {
      setMessages((m) => [...m, { role: "user", text: answer.question }]);
      if (answer.focus === "drop") setRange("7d");
    }, delay);
    later(
      () =>
        setMessages((m) => [
          ...m,
          { role: "plumb", answer, shown: 0, done: false },
        ]),
      delay + (reduced ? 0 : 350),
    );
    const total = answer.text.length;
    const step = reduced ? total : 3;
    let shown = 0;
    const tick = () => {
      shown = Math.min(total, shown + step);
      const done = shown >= total;
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last?.role === "plumb")
          copy[copy.length - 1] = { ...last, shown, done };
        return copy;
      });
      if (done) setBusy(false);
      else later(tick, 18);
    };
    later(tick, delay + (reduced ? 0 : 1300));
  }, []);

  useEffect(() => {
    ask(answers[0], prefersReduced() ? 0 : 2600);
    return clear;
  }, [ask]);

  useEffect(() => {
    const el = thread.current;
    if (!el) return;
    const questions = el.querySelectorAll<HTMLElement>(".bubble-user");
    const latest = questions[questions.length - 1];
    if (latest) el.scrollTop = latest.offsetTop - 12;
  }, [messages]);

  const asked = new Set(
    messages
      .filter((m) => m.role === "user")
      .map((m) => (m as { text: string }).text),
  );
  const suggestions = answers.filter((a) => !asked.has(a.question)).slice(0, 3);
  const current = [...messages].reverse().find((m) => m.role === "plumb") as
    Extract<Message, { role: "plumb" }> | undefined;
  const focus = current?.done === true && current.answer.focus === "drop";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = draft.trim();
    if (!q || busy) return;
    setDraft("");
    const match = answers.find(
      (a) => a.question.toLowerCase() === q.toLowerCase(),
    );
    if (match) return ask(match);
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      {
        role: "note",
        text: "This demo runs on sample data and answers the suggested questions only. Pick one below.",
      },
    ]);
  };

  const kpis = ranges[range].kpis;
  const nav = [
    { icon: LayoutGrid, label: "Overview", active: true },
    { icon: Sparkles, label: "Ask Plumb", badge: "AI" },
    { icon: Lightbulb, label: "Watchers" },
    { icon: Funnel, label: "Funnels" },
    { icon: RefreshCw, label: "Retention" },
    { icon: Users, label: "People" },
    { icon: FlaskConical, label: "Experiments" },
  ];

  return (
    <div className="app" aria-label="Interactive Plumb demo with sample data">
      <aside className="app-side" aria-hidden="true">
        <div className="workspace">
          <span className="workspace-avatar">F</span>
          <span>
            <strong>Fernway</strong>
            <small>Demo workspace</small>
          </span>
          <ChevronsUpDown size={14} />
        </div>
        <div className="app-search">
          <Search size={14} />
          <span>Search</span>
          <kbd className="mono">⌘K</kbd>
        </div>
        <span className="side-label">Explore</span>
        <ul>
          {nav.map(({ icon: Icon, label, active, badge }) => (
            <li key={label} data-active={active}>
              <Icon size={15} />
              {label}
              {badge && <em>{badge}</em>}
            </li>
          ))}
        </ul>
        <span className="side-label">Pinned</span>
        <ul>
          <li>
            <Bookmark size={15} /> Weekly review
          </li>
          <li>
            <ChartLine size={15} /> Activation board
          </li>
        </ul>
      </aside>

      <section className="app-main">
        <header className="app-head">
          <div>
            <h3>Overview</h3>
            <p>All teams · sample data</p>
          </div>
          <div className="range" role="group" aria-label="Date range">
            {(Object.keys(ranges) as Range[]).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => setRange(r)}
              >
                {range === r && <Pill id="range-pill" />}
                <span>{r}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="icon-ghost"
            aria-label="Share this view"
            onClick={() => toast("Link copied — in a real workspace, anyway.")}
          >
            <Share2 size={15} />
          </button>
        </header>
        <div className="kpis">
          {kpis.map((k) => (
            <div className="kpi" key={k.label}>
              <span>{k.label}</span>
              <strong>
                <NumberFlow
                  value={k.unit === "%" ? k.value / 100 : k.value}
                  format={
                    k.unit === "%"
                      ? {
                          style: "percent",
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }
                      : { maximumFractionDigits: 0 }
                  }
                  locales="en-US"
                />
              </strong>
              <em data-good={k.good}>
                <motion.i
                  key={`${k.label}-${k.good}`}
                  initial={{ y: k.good ? 4 : -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={spring}
                >
                  {k.good ? "↑" : "↓"}
                </motion.i>{" "}
                <NumberFlow
                  value={k.delta}
                  suffix={k.deltaUnit}
                  format={{
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }}
                  locales="en-US"
                />
              </em>
            </div>
          ))}
        </div>
        <div className="chart-card">
          <div className="chart-head">
            <strong>Onboarding completion</strong>
            <span className="legend">
              <i className="legend-current" /> This period
              <i className="legend-previous" /> Previous
            </span>
          </div>
          <Chart range={range} focus={focus} />
        </div>
      </section>

      <section className="app-chat" aria-label="Ask Plumb">
        <header className="chat-head">
          <Logo small />
          <strong>Ask Plumb</strong>
          <Ellipsis size={16} aria-hidden="true" />
        </header>
        <div className="chat-thread" ref={thread} aria-live="polite">
          {messages.length === 0 && (
            <p className="chat-empty">Ask anything about your product.</p>
          )}
          {messages.map((m, i) => {
            if (m.role === "user")
              return (
                <motion.p
                  className="bubble-user"
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={spring}
                  style={{ originX: 1, originY: 1 }}
                >
                  {m.text}
                </motion.p>
              );
            if (m.role === "note")
              return (
                <motion.p
                  className="bubble-note"
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                >
                  {m.text}
                </motion.p>
              );
            return (
              <motion.div
                className="bubble-plumb"
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
              >
                {m.shown === 0 ? (
                  <span className="thinking" aria-label="Plumb is thinking">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  <p>
                    {m.answer.text.slice(0, m.shown)}
                    {!m.done && <span className="caret" />}
                  </p>
                )}
                {m.done && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={spring}
                  >
                    <Detail answer={m.answer} />
                  </motion.div>
                )}
                {m.done && (
                  <span className="query-tag mono">
                    1 query · 0.8 s · sample data
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence>
          {!busy && messages.length > 0 && (
            <motion.div
              className="chips"
              aria-label="Suggested questions"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {suggestions.map((s) => (
                <motion.button
                  type="button"
                  key={s.id}
                  onClick={() => ask(s)}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0, transition: spring },
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {s.question}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <form className="chat-input" onSubmit={submit}>
          <label htmlFor="ask-input" className="sr-only">
            Ask a question
          </label>
          <input
            id="ask-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about any metric…"
            autoComplete="off"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            aria-label="Send question"
            disabled={!draft.trim() || busy}
          >
            <ArrowUp size={15} />
          </motion.button>
        </form>
      </section>
    </div>
  );
}
