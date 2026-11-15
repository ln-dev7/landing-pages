"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Command,
  Inbox,
  Kanban,
  ListTodo,
  Map,
  Plus,
  RefreshCcw,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import {
  cycle,
  drafts,
  inbox,
  issues as seed,
  ME,
  nextStatus,
  people,
  priorityLabel,
  projects,
  statusLabel,
  statusOrder,
  weeks,
  type Issue,
  type Person,
  type Priority,
  type Status,
} from "./data";
import { spring } from "./motion-kit";

type View = "inbox" | "mine" | "issues" | "board" | "cycle" | "roadmap";
const views: { id: View; label: string; icon: typeof Inbox }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "mine", label: "My issues", icon: User },
  { id: "issues", label: "Issues", icon: ListTodo },
  { id: "board", label: "Board", icon: Kanban },
  { id: "cycle", label: "Active cycle", icon: RefreshCcw },
  { id: "roadmap", label: "Roadmap", icon: Map },
];

export function StatusIcon({ s }: { s: Status }) {
  const c = 7;
  return (
    <svg className="status-icon" data-s={s} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r={c} className="ring" />
      {s === "progress" && <path d="M8 3.5A4.5 4.5 0 0 1 8 12.5z" className="fill" />}
      {s === "review" && <path d="M8 3.5A4.5 4.5 0 1 1 3.5 8H8z" className="fill" />}
      {s === "done" && (
        <>
          <circle cx="8" cy="8" r="7" className="fill" />
          <path d="M5 8.2l2 2 4-4.2" className="tick" />
        </>
      )}
    </svg>
  );
}

export function PriorityIcon({ p }: { p: Priority }) {
  if (p === 4)
    return (
      <span className="prio prio-urgent" title="Urgent" aria-label="Urgent">
        !
      </span>
    );
  if (p === 0)
    return (
      <span className="prio prio-none" aria-label="No priority">
        ···
      </span>
    );
  return (
    <span className="prio" aria-label={priorityLabel[p]}>
      {[1, 2, 3].map((b) => (
        <i key={b} data-on={b <= p} style={{ height: 3 + b * 3 }} />
      ))}
    </span>
  );
}

export function Avatar({ who, size = 20 }: { who: Person; size?: number }) {
  const p = people[who];
  return (
    <span
      className="avatar"
      title={p.name}
      style={{ width: size, height: size, background: p.color, fontSize: size * 0.42 }}
    >
      {who}
    </span>
  );
}

const assistFor = (i: Issue) =>
  i.label === "Bug"
    ? [
        { key: "dup", text: "Looks like HAL-188, closed three weeks ago.", action: "Link duplicate" },
        { key: "rev", text: `${people.SP.name} changed this file 9 times this month.`, action: "Ask Sofia to review" },
      ]
    : [
        { key: "split", text: "This reads like three pieces of work.", action: "Split into 3" },
        { key: "est", text: "Similar issues took 5 points, not " + i.estimate + ".", action: "Set to 5" },
      ];

export function KeelApp() {
  const [view, setView] = useState<View>("issues");
  const [list, setList] = useState<Issue[]>(seed);
  const [sel, setSel] = useState("HAL-214");
  const [filter, setFilter] = useState<"all" | "bugs">("all");
  const [palette, setPalette] = useState(false);
  const [read, setRead] = useState<string[]>([]);
  const [made, setMade] = useState(0);
  const [applied, setApplied] = useState<string[]>([]);
  const [overCol, setOverCol] = useState<Status | null>(null);
  const [open, setOpen] = useState<string | null>("Checkout v3");
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-15% 0px" });
  const seen = useInView(root, { once: true, margin: "-15% 0px" });

  const issue = list.find((i) => i.id === sel) ?? list[0];
  const unread = inbox.filter((n) => !read.includes(n.id)).length;

  const setStatus = useCallback((id: string, s: Status) => {
    setList((l) => l.map((i) => (i.id === id ? { ...i, status: s } : i)));
  }, []);

  const create = useCallback(() => {
    const d = drafts[made % drafts.length];
    const id = `HAL-${231 + made}`;
    setList((l) => [{ ...d, id, status: "todo" }, ...l]);
    setMade((m) => m + 1);
    setSel(id);
    setView((v) => (v === "issues" || v === "board" || v === "mine" ? v : "issues"));
    toast(`${id} created`, { description: d.title });
  }, [made]);

  // A teammate picks up an issue a moment after the demo comes into view.
  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => {
      setStatus("HAL-221", "progress");
      toast("Sofia Park started HAL-221", { description: "Search results flicker on slow networks" });
    }, 2600);
    return () => window.clearTimeout(t);
  }, [seen, setStatus]);

  // ⌘K / Ctrl+K opens the command menu while the demo is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
      if (e.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView]);

  const shown = useMemo(
    () =>
      list.filter(
        (i) =>
          (view !== "mine" || i.assignee === ME) &&
          (filter === "all" || i.label === "Bug"),
      ),
    [list, view, filter],
  );

  const commands = [
    { label: "Create new issue", hint: "C", run: create },
    { label: "Go to board", hint: "G B", run: () => setView("board") },
    { label: "Open active cycle", hint: "G C", run: () => setView("cycle") },
    { label: "Go to roadmap", hint: "G R", run: () => setView("roadmap") },
    { label: "Go to inbox", hint: "G I", run: () => setView("inbox") },
    { label: `Mark ${issue.id} as done`, hint: "S D", run: () => setStatus(issue.id, "done") },
    {
      label: `Assign ${issue.id} to me`,
      hint: "A",
      run: () => setList((l) => l.map((i) => (i.id === issue.id ? { ...i, assignee: ME } : i))),
    },
    { label: "Show only bugs", hint: "F B", run: () => { setFilter("bugs"); setView("issues"); } },
  ];

  const apply = (key: string) => {
    setApplied((a) => [...a, `${issue.id}:${key}`]);
    if (key === "est") setList((l) => l.map((i) => (i.id === issue.id ? { ...i, estimate: 5 } : i)));
    toast("Keel Assist", {
      description:
        key === "dup" ? "Linked as a duplicate of HAL-188." :
        key === "rev" ? "Sofia was asked to review." :
        key === "split" ? "Three sub-issues drafted." : "Estimate set to 5 points.",
    });
  };

  return (
    <div className="app" ref={root} aria-label="Interactive Keel workspace">
      <aside className="app-side">
        <div className="workspace">
          <span className="workspace-avatar">H</span>
          <span>
            <strong>Halyard</strong>
            <small>14 members</small>
          </span>
          <ChevronDown size={14} />
        </div>
        <button type="button" className="side-search" onClick={() => setPalette(true)}>
          <Search size={13} /> Search or jump
          <kbd>⌘K</kbd>
        </button>
        <ul className="side-list">
          {views.map(({ id, label, icon: Icon }) => (
            <li key={id} data-active={view === id}>
              <button type="button" onClick={() => setView(id)} aria-pressed={view === id}>
                {view === id && <motion.span layoutId="side-pill" className="side-pill" transition={spring} />}
                <Icon size={14} />
                <span>{label}</span>
                {id === "inbox" && unread > 0 && (
                  <em className="count">
                    <NumberFlow value={unread} />
                  </em>
                )}
              </button>
            </li>
          ))}
        </ul>
        <p className="side-label mono">YOUR TEAMS</p>
        <ul className="side-teams">
          <li><i style={{ background: "#6d5cff" }} /> Web</li>
          <li><i style={{ background: "#0ea5e9" }} /> Mobile</li>
          <li><i style={{ background: "#10b981" }} /> Platform</li>
        </ul>
      </aside>

      <div className="app-tabs" role="tablist" aria-label="Views">
        {views.map((v) => (
          <button key={v.id} type="button" role="tab" aria-selected={view === v.id} onClick={() => setView(v.id)}>
            {view === v.id && <motion.span layoutId="tab-pill" className="pill" transition={spring} />}
            <span>{v.label}</span>
          </button>
        ))}
      </div>

      <section className="app-main">
        <header className="main-head">
          <h3>{views.find((v) => v.id === view)?.label}</h3>
          {(view === "issues" || view === "mine" || view === "board") && (
            <div className="seg" role="group" aria-label="Filter">
              {(["all", "bugs"] as const).map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {filter === f && <motion.span layoutId="filter-pill" className="pill" transition={spring} />}
                  <span>{f === "all" ? "All" : "Bugs"}</span>
                </button>
              ))}
            </div>
          )}
          <span className="grow" />
          <button type="button" className="new-issue" onClick={create}>
            <Plus size={14} /> New issue <kbd>C</kbd>
          </button>
        </header>

        <div className="main-body">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              className="view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {(view === "issues" || view === "mine") && (
                <LayoutGroup>
                  {statusOrder.map((s) => {
                    const rows = shown.filter((i) => i.status === s);
                    if (!rows.length) return null;
                    return (
                      <div className="group" key={s}>
                        <p className="group-head">
                          <StatusIcon s={s} /> {statusLabel[s]}
                          <span className="mono">
                            <NumberFlow value={rows.length} />
                          </span>
                        </p>
                        <ul>
                          <AnimatePresence initial={false}>
                            {rows.map((i) => (
                              <motion.li
                                key={i.id}
                                layout
                                layoutId={i.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={spring}
                                className="row"
                                data-selected={sel === i.id}
                                data-done={i.status === "done"}
                              >
                                <PriorityIcon p={i.priority} />
                                <span className="row-id mono">{i.id}</span>
                                <button
                                  type="button"
                                  className="status-btn"
                                  aria-label={`${i.id}: move from ${statusLabel[i.status]} to ${statusLabel[nextStatus[i.status]]}`}
                                  onClick={() => setStatus(i.id, nextStatus[i.status])}
                                >
                                  <StatusIcon s={i.status} />
                                </button>
                                <button type="button" className="row-title" onClick={() => setSel(i.id)}>
                                  {i.title}
                                </button>
                                <span className="label" data-label={i.label}>{i.label}</span>
                                <Avatar who={i.assignee} />
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                      </div>
                    );
                  })}
                </LayoutGroup>
              )}

              {view === "board" && (
                <div className="board">
                  {(["todo", "progress", "review", "done"] as Status[]).map((s) => {
                    const cards = shown.filter((i) => i.status === s);
                    return (
                      <div className="col" key={s} data-col={s} data-over={overCol === s}>
                        <p className="group-head">
                          <StatusIcon s={s} /> {statusLabel[s]}
                          <span className="mono"><NumberFlow value={cards.length} /></span>
                        </p>
                        <LayoutGroup>
                          {cards.map((i) => (
                            <motion.div
                              key={i.id}
                              layout
                              layoutId={`card-${i.id}`}
                              className="card"
                              data-selected={sel === i.id}
                              drag
                              dragSnapToOrigin
                              dragElastic={0.7}
                              whileDrag={{ scale: 1.04, rotate: -1.5, zIndex: 20, boxShadow: "0 18px 40px -16px #1111134d" }}
                              onDrag={(_, info) => {
                                const el = document
                                  .elementsFromPoint(info.point.x - window.scrollX, info.point.y - window.scrollY)
                                  .find((e) => (e as HTMLElement).dataset?.col) as HTMLElement | undefined;
                                setOverCol((el?.dataset.col as Status) ?? null);
                              }}
                              onDragEnd={(_, info) => {
                                const el = document
                                  .elementsFromPoint(info.point.x - window.scrollX, info.point.y - window.scrollY)
                                  .find((e) => (e as HTMLElement).dataset?.col) as HTMLElement | undefined;
                                setOverCol(null);
                                if (el?.dataset.col && el.dataset.col !== i.status) setStatus(i.id, el.dataset.col as Status);
                              }}
                              onTap={() => setSel(i.id)}
                              transition={spring}
                            >
                              <span className="card-top">
                                <span className="mono">{i.id}</span>
                                <Avatar who={i.assignee} size={18} />
                              </span>
                              <strong>{i.title}</strong>
                              <span className="card-foot">
                                <PriorityIcon p={i.priority} />
                                <span className="label" data-label={i.label}>{i.label}</span>
                                {s !== "done" && (
                                  <button
                                    type="button"
                                    className="card-next"
                                    aria-label={`Move ${i.id} to ${statusLabel[nextStatus[s]]}`}
                                    onClick={(e) => { e.stopPropagation(); setStatus(i.id, nextStatus[s]); }}
                                  >
                                    <ArrowRight size={12} />
                                  </button>
                                )}
                              </span>
                            </motion.div>
                          ))}
                        </LayoutGroup>
                      </div>
                    );
                  })}
                </div>
              )}

              {view === "cycle" && <CycleView list={list} />}

              {view === "roadmap" && (
                <div className="roadmap">
                  <div className="rm-head">
                    <span />
                    <div className="rm-weeks mono">
                      {weeks.map((w) => <span key={w}>{w}</span>)}
                    </div>
                  </div>
                  <div className="rm-rows">
                    <i className="rm-today" style={{ left: `calc(150px + (100% - 150px) * ${0.6 / weeks.length})` }}>
                      <b className="mono">Today</b>
                    </i>
                    {projects.map((p) => (
                      <div key={p.name} className="rm-row" data-open={open === p.name}>
                        <span className="rm-name">
                          <Avatar who={p.lead} size={18} /> {p.name}
                        </span>
                        <div className="rm-track">
                          <motion.button
                            type="button"
                            className="rm-bar"
                            aria-expanded={open === p.name}
                            onClick={() => setOpen(open === p.name ? null : p.name)}
                            style={{
                              left: `${(p.start / weeks.length) * 100}%`,
                              width: `${(p.len / weeks.length) * 100}%`,
                              ["--c" as string]: p.color,
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ ...spring, delay: 0.05 * p.start }}
                          >
                            <motion.i initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} transition={{ ...spring, delay: 0.3 }} />
                            <span>{p.progress}%</span>
                          </motion.button>
                          <AnimatePresence>
                            {open === p.name && (
                              <motion.div
                                className="rm-miles"
                                style={{ left: `${(p.start / weeks.length) * 100}%`, width: `${(p.len / weeks.length) * 100}%` }}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                              >
                                {p.milestones.map((m, k) => (
                                  <span key={m} data-done={(k + 1) / p.milestones.length <= p.progress / 100 + 0.1}>
                                    <i /> {m}
                                  </span>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "inbox" && (
                <div className="inbox">
                  <div className="inbox-bar">
                    <span className="mono">
                      <NumberFlow value={unread} /> unread
                    </span>
                    <button type="button" onClick={() => setRead(inbox.map((n) => n.id))} disabled={!unread}>
                      <Check size={13} /> Mark all as read
                    </button>
                  </div>
                  <ul>
                    {inbox.map((n) => (
                      <li key={n.id} data-read={read.includes(n.id)}>
                        <button
                          type="button"
                          onClick={() => {
                            setRead((r) => (r.includes(n.id) ? r : [...r, n.id]));
                            const m = n.text.match(/HAL-\d+/);
                            if (m) setSel(m[0]);
                          }}
                        >
                          <Avatar who={n.who} size={26} />
                          <span>
                            <strong>{people[n.who].name}</strong> {n.text}
                            <small>{n.detail}</small>
                          </span>
                          <em className="mono">{n.time}</em>
                          <i className="dot" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <aside className="app-detail" aria-label="Issue details">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.2 }}
            className="detail"
          >
            <span className="mono detail-id">{issue.id} · {issue.project}</span>
            <h4>{issue.title}</h4>
            <div className="detail-status" role="group" aria-label="Status">
              {(["backlog", "todo", "progress", "review", "done"] as Status[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-label={statusLabel[s]}
                  title={statusLabel[s]}
                  aria-pressed={issue.status === s}
                  onClick={() => setStatus(issue.id, s)}
                >
                  {issue.status === s && <motion.span layoutId="status-pill" className="pill" transition={spring} />}
                  <StatusIcon s={s} />
                </button>
              ))}
              <span className="detail-status-label">{statusLabel[issue.status]}</span>
            </div>
            <dl className="props">
              <div><dt>Priority</dt><dd><PriorityIcon p={issue.priority} /> {priorityLabel[issue.priority]}</dd></div>
              <div><dt>Assignee</dt><dd><Avatar who={issue.assignee} size={18} /> {people[issue.assignee].name}</dd></div>
              <div><dt>Estimate</dt><dd><NumberFlow value={issue.estimate} /> points</dd></div>
            </dl>
            <div className="assist">
              <p className="assist-head">
                <Sparkles size={13} /> Keel Assist
              </p>
              {assistFor(issue).map((a, k) => {
                const done = applied.includes(`${issue.id}:${a.key}`);
                return (
                  <motion.div
                    key={a.key}
                    className="assist-item"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.25 + k * 0.12 }}
                  >
                    <p>{a.text}</p>
                    <button type="button" onClick={() => apply(a.key)} disabled={done} data-done={done}>
                      {done ? <><Check size={12} /> Done</> : a.action}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </aside>

      <AnimatePresence>
        {palette && (
          <Palette commands={commands} onClose={() => setPalette(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CycleView({ list }: { list: Issue[] }) {
  const extra = list
    .filter((i) => i.status === "done" && !seed.find((s) => s.id === i.id && s.status === "done"))
    .reduce((a, i) => a + i.estimate, 0);
  const lost = seed
    .filter((s) => s.status === "done" && list.find((i) => i.id === s.id)?.status !== "done")
    .reduce((a, i) => a + i.estimate, 0);
  const today = cycle.done.length - 1;
  const done = cycle.done.map((v, k) => (k === today ? v + extra - lost : v));
  const scope = cycle.scope[cycle.scope.length - 1];
  const W = 420, H = 150;
  const x = (k: number) => (k / (cycle.scope.length - 1)) * W;
  const y = (v: number) => H - (v / 40) * H;
  const area = `M0,${H} ` + done.map((v, k) => `L${x(k)},${y(v)}`).join(" ") + ` L${x(today)},${H} Z`;
  const line = done.map((v, k) => `${k ? "L" : "M"}${x(k)},${y(v)}`).join(" ");
  const scopeLine = cycle.scope.map((v, k) => `${k ? "L" : "M"}${x(k)},${y(v)}`).join(" ");
  const pace = done[today] / (today + 1);
  const proj = `M${x(today)},${y(done[today])} L${x(cycle.scope.length - 1)},${y(Math.min(40, done[today] + pace * (cycle.scope.length - 1 - today)))}`;
  const counts = (["progress", "review", "todo", "done"] as Status[]).map((s) => ({ s, n: list.filter((i) => i.status === s).length }));
  return (
    <div className="cycle">
      <div className="cycle-top">
        <div>
          <strong>{cycle.name}</strong>
          <span className="mono">{cycle.range} · 4 days left</span>
        </div>
        <div className="cycle-stats">
          <span><em>Scope</em><b><NumberFlow value={scope} /></b></span>
          <span><em>Completed</em><b><NumberFlow value={done[today]} /></b></span>
          <span className="hot"><em>Progress</em><b><NumberFlow value={done[today] / scope} format={{ style: "percent" }} /></b></span>
        </div>
      </div>
      <svg className="burn" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-label="Burn-up chart">
        <path d={scopeLine} className="scope" vectorEffect="non-scaling-stroke" />
        <motion.path d={area} className="area" initial={false} animate={{ d: area }} transition={spring} />
        <motion.path d={line} className="line" vectorEffect="non-scaling-stroke" initial={false} animate={{ d: line }} transition={spring} />
        <motion.path d={proj} className="proj" vectorEffect="non-scaling-stroke" initial={false} animate={{ d: proj }} transition={spring} />
        <line x1={x(today)} x2={x(today)} y1="0" y2={H} className="today" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="cycle-legend mono">
        <span><i className="l-scope" /> Scope</span>
        <span><i className="l-done" /> Completed</span>
        <span><i className="l-proj" /> Projection</span>
      </div>
      <ul className="cycle-counts">
        {counts.map(({ s, n }) => (
          <li key={s}>
            <StatusIcon s={s} /> {statusLabel[s]}
            <b><NumberFlow value={n} /></b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Palette({
  commands,
  onClose,
}: {
  commands: { label: string; hint: string; run: () => void }[];
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const hits = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(() => {
    input.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => setIdx(0), [q]);
  const run = (c?: { run: () => void }) => {
    if (!c) return;
    c.run();
    onClose();
  };
  return (
    <motion.div
      className="palette-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="palette"
        role="dialog"
        aria-label="Command menu"
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={spring}
        onClick={(e) => e.stopPropagation()}
      >
        <label className="palette-input">
          <Command size={14} />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(hits.length - 1, i + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
              if (e.key === "Enter") run(hits[idx]);
              if (e.key === "Escape") onClose();
            }}
            placeholder="Type a command or search…"
            aria-label="Command"
          />
          <kbd>esc</kbd>
        </label>
        <ul>
          {hits.length === 0 && <li className="palette-empty">No command matches “{q}”.</li>}
          {hits.map((c, i) => (
            <li key={c.label}>
              <button type="button" data-active={i === idx} onMouseEnter={() => setIdx(i)} onClick={() => run(c)}>
                {i === idx && <motion.span layoutId="palette-pill" className="palette-pill" transition={spring} />}
                <CircleDot size={13} />
                <span>{c.label}</span>
                <kbd>{c.hint}</kbd>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
