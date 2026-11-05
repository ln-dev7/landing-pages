"use client";
import { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { answers, type Answer } from "./data";
import { Pill, spring } from "./motion-kit";

/* ——— Shared bits ——— */

function ViewHead({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="app-head">
      <div>
        <h3>{title}</h3>
        <p>{sub}</p>
      </div>
      {children}
    </header>
  );
}

function Segmented<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="range" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
        >
          {value === o && <Pill id={id} />}
          <span>{o}</span>
        </button>
      ))}
    </div>
  );
}

function Spark({ values, bad }: { values: number[]; bad?: boolean }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const d = values
    .map(
      (v, i) =>
        `${i ? "L" : "M"}${(i / (values.length - 1)) * 60},${
          18 - ((v - min) / (max - min || 1)) * 16
        }`,
    )
    .join(" ");
  return (
    <svg
      className="sparkline"
      viewBox="0 0 60 20"
      aria-hidden="true"
      data-bad={bad}
    >
      <path d={d} />
    </svg>
  );
}

/* ——— Ask Plumb history ——— */

export function AskView({
  onAsk,
  busy,
}: {
  onAsk: (a: Answer) => void;
  busy: boolean;
}) {
  const meta: Record<string, { when: string; who: string; tag: string }> = {
    onboarding: { when: "Today, 09:52", who: "Maya", tag: "Drop found" },
    plans: { when: "Yesterday", who: "Theo", tag: "Comparison" },
    checklist: { when: "Mon", who: "Maya", tag: "Experiment" },
    exports: { when: "Last week", who: "Ines", tag: "Churn" },
  };
  return (
    <>
      <ViewHead title="Ask Plumb" sub="Questions your team asked this week">
        <span className="view-stat">
          <NumberFlow value={47} /> questions
        </span>
      </ViewHead>
      <ul className="history">
        {answers.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: i * 0.05 }}
          >
            <button type="button" onClick={() => onAsk(a)} disabled={busy}>
              <span className="history-icon">
                <Sparkles size={14} />
              </span>
              <span className="history-text">
                <strong>{a.question}</strong>
                <small>
                  {meta[a.id].who} · {meta[a.id].when}
                </small>
              </span>
              <em>{meta[a.id].tag}</em>
              <span className="history-go">
                Ask again <ArrowUpRight size={12} />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      <p className="view-hint">
        Pick a question to replay it in the panel on the right.
      </p>
    </>
  );
}

/* ——— Watchers ——— */

const watcherSeed = [
  {
    id: "checkout",
    name: "Checkout errors",
    rule: "above 2% of sessions",
    value: "6.4%",
    spark: [1.1, 1.3, 1.2, 1.4, 1.2, 3.8, 6.4],
    triggered: true,
    cause: "Safari 18 only, since 14:05. Starts with the payment form update.",
  },
  {
    id: "onboarding",
    name: "Onboarding completion",
    rule: "drops 3 pts in a day",
    value: "40.6%",
    spark: [46.4, 46.1, 46.8, 45.9, 46.3, 46.2, 40.6],
    triggered: true,
    cause: "Android app 5.8. The invite step fails for 1,204 teams.",
  },
  {
    id: "signups",
    name: "Daily sign-ups",
    rule: "below 120",
    value: "184",
    spark: [150, 162, 171, 158, 176, 181, 184],
    triggered: false,
  },
  {
    id: "latency",
    name: "Answer time p95",
    rule: "above 3 s",
    value: "1.8 s",
    spark: [2.2, 2.1, 1.9, 2.0, 1.9, 1.8, 1.8],
    triggered: false,
  },
  {
    id: "churn",
    name: "Churned teams",
    rule: "above 25 a week",
    value: "17",
    spark: [21, 19, 22, 18, 20, 16, 17],
    triggered: false,
  },
];

export function WatchersView() {
  const [on, setOn] = useState<Record<string, boolean>>(
    Object.fromEntries(watcherSeed.map((w) => [w.id, w.id !== "churn"])),
  );
  const [open, setOpen] = useState<string | null>("checkout");
  const triggered = watcherSeed.filter((w) => w.triggered && on[w.id]).length;
  return (
    <>
      <ViewHead title="Watchers" sub="Plumb checks these every five minutes">
        <span className="view-stat" data-alert={triggered > 0}>
          <NumberFlow value={triggered} /> triggered
        </span>
      </ViewHead>
      <ul className="watchers">
        {watcherSeed.map((w, i) => {
          const active = on[w.id];
          const firing = w.triggered && active;
          return (
            <motion.li
              key={w.id}
              layout
              data-firing={firing}
              data-off={!active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: i * 0.04 }}
            >
              <div className="watch-row">
                <button
                  type="button"
                  className="watch-main"
                  aria-expanded={firing ? open === w.id : undefined}
                  onClick={() => firing && setOpen(open === w.id ? null : w.id)}
                >
                  <i className="watch-dot" />
                  <span>
                    <strong>{w.name}</strong>
                    <small className="mono">{w.rule}</small>
                  </span>
                </button>
                <Spark values={w.spark} bad={firing} />
                <b className="watch-value">{active ? w.value : "—"}</b>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  aria-label={`${active ? "Pause" : "Resume"} ${w.name}`}
                  className="switch"
                  onClick={() => setOn((s) => ({ ...s, [w.id]: !s[w.id] }))}
                >
                  <motion.i layout transition={spring} />
                </button>
              </div>
              <AnimatePresence initial={false}>
                {firing && open === w.id && (
                  <motion.p
                    className="watch-cause"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                  >
                    <span>Likely cause</span> {w.cause}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

/* ——— Funnels ——— */

const funnelSteps = [
  "Signed up",
  "Invited the team",
  "First chart",
  "Shared an answer",
];
const funnelData = {
  All: [5240, 3620, 2670, 1990],
  Web: [2900, 2260, 1690, 1300],
  iOS: [1210, 920, 650, 470],
  Android: [1130, 590, 330, 220],
} as const;
type Platform = keyof typeof funnelData;

export function FunnelsView({
  onAsk,
  title = "Funnels",
}: {
  onAsk: (a: Answer) => void;
  title?: string;
}) {
  const [platform, setPlatform] = useState<Platform>("All");
  const values = funnelData[platform];
  const drops = values.slice(1).map((v, i) => 1 - v / values[i]);
  const leak = drops.indexOf(Math.max(...drops)) + 1;
  return (
    <>
      <ViewHead title={title} sub="Activation · last 30 days">
        <Segmented
          id="funnel-pill"
          label="Platform"
          options={Object.keys(funnelData) as Platform[]}
          value={platform}
          onChange={setPlatform}
        />
      </ViewHead>
      <ol className="funnel-view">
        {funnelSteps.map((step, i) => {
          const share = values[i] / values[0];
          const fromPrev = i ? values[i] / values[i - 1] : 1;
          return (
            <li key={step} data-leak={i === leak}>
              <div className="funnel-label">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {i === leak && (
                  <motion.em
                    key={platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={spring}
                  >
                    Biggest leak
                  </motion.em>
                )}
              </div>
              <div className="funnel-track">
                <motion.span
                  animate={{ width: `${Math.max(share * 100, 3)}%` }}
                  initial={false}
                  transition={spring}
                />
              </div>
              <div className="funnel-numbers">
                <b>
                  <NumberFlow value={values[i]} locales="en-US" />
                </b>
                <small>
                  {i ? (
                    <NumberFlow
                      value={fromPrev}
                      format={{ style: "percent", maximumFractionDigits: 0 }}
                      suffix=" from previous"
                    />
                  ) : (
                    "teams"
                  )}
                </small>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="view-foot">
        <p>
          {platform === "Android"
            ? "Android loses half its teams at the invite step."
            : `“${funnelSteps[leak]}” loses the most teams on ${
                platform === "All" ? "every platform" : platform
              }.`}
        </p>
        <button
          type="button"
          className="mini-button"
          onClick={() => onAsk(answers[0])}
        >
          <Sparkles size={13} /> Ask why
        </button>
      </div>
    </>
  );
}

/* ——— Retention ——— */

const curves = {
  All: [100, 62, 51, 45, 41, 39],
  Team: [100, 74, 66, 61, 58, 56],
  Starter: [100, 55, 42, 35, 31, 29],
} as const;
type Plan = keyof typeof curves;
const cohorts = ["Sep 28", "Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2"];

export function RetentionView() {
  const [plan, setPlan] = useState<Plan>("All");
  const [cell, setCell] = useState<{ c: number; w: number } | null>(null);
  const grid = useMemo(
    () =>
      cohorts.map((_, c) =>
        curves[plan].map((v, w) =>
          w === 0 ? 100 : Math.round(v + Math.sin(c * 1.7 + w) * 2.5 + c * 0.6),
        ),
      ),
    [plan],
  );
  const shown = cell ?? { c: 1, w: 3 };
  const value = grid[shown.c][shown.w];
  return (
    <>
      <ViewHead title="Retention" sub="Weekly active teams by sign-up week">
        <Segmented
          id="plan-pill"
          label="Plan"
          options={Object.keys(curves) as Plan[]}
          value={plan}
          onChange={setPlan}
        />
      </ViewHead>
      <div className="cohorts" onMouseLeave={() => setCell(null)}>
        <span />
        {curves.All.map((_, w) => (
          <span key={w} className="cohort-week mono">
            W{w}
          </span>
        ))}
        {cohorts.map((name, c) => (
          <div key={name} className="cohort-row">
            <span className="cohort-name mono">{name}</span>
            {grid[c].map((v, w) => {
              const visible = w <= cohorts.length - 1 - c;
              if (!visible) return <span key={w} className="cohort-empty" />;
              return (
                <motion.button
                  type="button"
                  key={w}
                  className="cohort-cell"
                  aria-label={`Cohort ${name}, week ${w}: ${v}%`}
                  data-selected={shown.c === c && shown.w === w}
                  onMouseEnter={() => setCell({ c, w })}
                  onFocus={() => setCell({ c, w })}
                  animate={{
                    backgroundColor: `rgba(52, 96, 255, ${0.08 + (v / 100) * 0.82})`,
                  }}
                  transition={{ duration: 0.45, delay: (c + w) * 0.02 }}
                  style={{ color: v > 55 ? "#fff" : "var(--ink-2)" }}
                >
                  {v}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
      <p className="view-hint retention-hint" aria-live="polite">
        <strong>
          <NumberFlow value={value / 100} format={{ style: "percent" }} />
        </strong>{" "}
        of {plan === "All" ? "all" : plan} teams from the {cohorts[shown.c]}{" "}
        cohort were still active in week {shown.w}.
      </p>
    </>
  );
}

/* ——— People ——— */

const teams = [
  {
    name: "Lanternfish",
    plan: "Team",
    status: "Active",
    seen: "2 min ago",
    events: 18240,
    top: "Funnels",
  },
  {
    name: "Tidewell",
    plan: "Company",
    status: "Active",
    seen: "14 min ago",
    events: 42110,
    top: "Watchers",
  },
  {
    name: "Mosscap",
    plan: "Starter",
    status: "At risk",
    seen: "12 days ago",
    events: 610,
    top: "Exports",
  },
  {
    name: "Cinderpath",
    plan: "Team",
    status: "Active",
    seen: "1 h ago",
    events: 9930,
    top: "Ask Plumb",
  },
  {
    name: "Halfmoon Labs",
    plan: "Starter",
    status: "At risk",
    seen: "9 days ago",
    events: 1180,
    top: "Exports",
  },
  {
    name: "Orrery",
    plan: "Team",
    status: "Active",
    seen: "3 h ago",
    events: 7420,
    top: "Experiments",
  },
  {
    name: "Pebblebox",
    plan: "Starter",
    status: "New",
    seen: "Yesterday",
    events: 320,
    top: "Overview",
  },
  {
    name: "Quillmate",
    plan: "Starter",
    status: "At risk",
    seen: "3 weeks ago",
    events: 240,
    top: "Exports",
  },
];
const peopleFilters = ["All", "Active", "At risk", "New"] as const;
type PeopleFilter = (typeof peopleFilters)[number];

export function PeopleView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PeopleFilter>("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = teams.filter(
    (t) =>
      (filter === "All" || t.status === filter) &&
      t.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <ViewHead title="People" sub="Teams in this workspace">
        <span className="view-stat">
          <NumberFlow value={list.length} /> teams
        </span>
      </ViewHead>
      <div className="people-tools">
        <label className="people-search">
          <Search size={13} aria-hidden="true" />
          <span className="sr-only">Search teams</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams…"
            autoComplete="off"
          />
        </label>
        <Segmented
          id="people-pill"
          label="Status"
          options={peopleFilters}
          value={filter}
          onChange={setFilter}
        />
      </div>
      <ul className="people">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((t) => (
            <motion.li
              key={t.name}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
              transition={spring}
            >
              <button
                type="button"
                aria-expanded={open === t.name}
                onClick={() => setOpen(open === t.name ? null : t.name)}
              >
                <span className="team-avatar" data-plan={t.plan}>
                  {t.name[0]}
                </span>
                <strong>{t.name}</strong>
                <em data-status={t.status}>{t.status}</em>
                <small>{t.seen}</small>
                <b className="mono">{t.events.toLocaleString("en-US")}</b>
              </button>
              <AnimatePresence initial={false}>
                {open === t.name && (
                  <motion.p
                    className="team-more"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                  >
                    {t.plan} plan · uses {t.top} the most ·{" "}
                    {t.status === "At risk"
                      ? "activity fell after the export limit"
                      : "activity steady this month"}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <li className="people-empty">No team matches “{query}”.</li>
        )}
      </ul>
    </>
  );
}

/* ——— Experiments ——— */

const experiments = [
  {
    id: "checklist",
    name: "Onboarding checklist v2",
    state: "Winning",
    days: 21,
    control: 41.2,
    variant: 46.0,
    confidence: 0.95,
    guardrails: ["Support tickets: flat", "Time to first chart: −12%"],
  },
  {
    id: "annual",
    name: "Annual toggle on pricing",
    state: "Running",
    days: 9,
    control: 8.4,
    variant: 9.5,
    confidence: 0.62,
    guardrails: ["Refund requests: flat", "Checkout errors: flat"],
  },
  {
    id: "signup",
    name: "Shorter sign-up form",
    state: "No effect",
    days: 28,
    control: 31.8,
    variant: 31.5,
    confidence: 0.18,
    guardrails: ["Spam sign-ups: +3%", "Activation: flat"],
  },
];

export function ExperimentsView() {
  const [id, setId] = useState(experiments[0].id);
  const exp = experiments.find((e) => e.id === id) ?? experiments[0];
  const max = Math.max(exp.control, exp.variant) * 1.15;
  const lift = exp.variant - exp.control;
  return (
    <>
      <ViewHead
        title="Experiments"
        sub="Results with confidence and guardrails"
      />
      <div className="experiments">
        <ul className="exp-list">
          {experiments.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                aria-pressed={e.id === id}
                onClick={() => setId(e.id)}
              >
                {e.id === id && (
                  <Pill id="exp-pill" className="pill exp-pill" />
                )}
                <span>
                  <strong>{e.name}</strong>
                  <small data-state={e.state}>
                    {e.state} · {e.days} days
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="exp-detail">
          {[
            { label: "Control", value: exp.control },
            { label: "Variant", value: exp.variant },
          ].map((row) => (
            <div className="exp-bar" key={row.label}>
              <span className="mono">{row.label.toUpperCase()}</span>
              <span className="exp-track">
                <motion.i
                  data-win={row.label === "Variant" && exp.state === "Winning"}
                  animate={{ width: `${(row.value / max) * 100}%` }}
                  initial={false}
                  transition={spring}
                />
              </span>
              <b>
                <NumberFlow
                  value={row.value / 100}
                  format={{ style: "percent", minimumFractionDigits: 1 }}
                />
              </b>
            </div>
          ))}
          <div className="exp-stats">
            <div>
              <span>Lift</span>
              <strong data-good={lift > 0.5}>
                <NumberFlow
                  value={lift}
                  format={{
                    signDisplay: "always",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }}
                  suffix=" pts"
                />
              </strong>
            </div>
            <div>
              <span>Confidence</span>
              <strong>
                <NumberFlow
                  value={exp.confidence}
                  format={{ style: "percent" }}
                />
              </strong>
              <i className="confidence">
                <motion.b
                  animate={{ width: `${exp.confidence * 100}%` }}
                  initial={false}
                  transition={spring}
                />
              </i>
            </div>
          </div>
          <ul className="guardrails">
            {exp.guardrails.map((g) => (
              <li key={g}>
                <Check size={12} /> {g}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mini-button"
            disabled={exp.state !== "Winning"}
            onClick={() =>
              toast("Variant shipped", {
                description: "In the demo only. Nothing changes anywhere.",
              })
            }
          >
            {exp.state === "Winning" ? "Ship the variant" : "Keep it running"}
          </button>
        </div>
      </div>
    </>
  );
}
