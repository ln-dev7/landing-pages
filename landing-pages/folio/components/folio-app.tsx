"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { toast } from "sonner";
import {
  ArrowUp,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Columns3,
  FileText,
  GripVertical,
  Heading2,
  House,
  Inbox,
  List,
  ListChecks,
  MessageSquareQuote,
  NotebookPen,
  Palette,
  PenLine,
  Plus,
  Quote,
  Rocket,
  Search,
  Sparkles,
  Sun,
  Table2,
  Users,
} from "lucide-react";
import {
  owners,
  pages as seedPages,
  slashItems,
  tasks as seedTasks,
  type Block,
  type BlockType,
  type Page,
  type Task,
  type TaskStatus,
} from "./data";
import { spring } from "./motion-kit";

export const pageIcons = {
  rocket: Rocket,
  book: BookOpen,
  notes: NotebookPen,
  palette: Palette,
  users: Users,
  home: House,
  sun: Sun,
  pen: PenLine,
};
const iconCycle: Page["icon"][] = ["rocket", "sun", "pen", "palette", "book"];

export function PageIcon({ icon, color, size = 15 }: { icon: Page["icon"]; color: string; size?: number }) {
  const Icon = pageIcons[icon];
  return (
    <span className="page-icon" style={{ ["--c" as string]: color, width: size + 9, height: size + 9 }}>
      <Icon size={size} />
    </span>
  );
}

export function Owner({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <span className="owner" style={{ background: owners[name], width: size, height: size, fontSize: size * 0.46 }} title={name}>
      {name[0]}
    </span>
  );
}

const statusNext: Record<TaskStatus, TaskStatus> = {
  "Not started": "In progress",
  "In progress": "Done",
  Done: "Not started",
};

export function Database({
  tasks,
  setTasks,
  big = false,
}: {
  tasks: Task[];
  setTasks: (f: (t: Task[]) => Task[]) => void;
  big?: boolean;
}) {
  const [view, setView] = useState<"table" | "board" | "calendar">("table");
  const [sort, setSort] = useState(false);
  const cycle = (id: string) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, status: statusNext[x.status] } : x)));
  const rows = sort ? [...tasks].sort((a, b) => a.day - b.day) : tasks;
  const done = tasks.filter((t) => t.status === "Done").length;
  return (
    <div className="db" data-big={big}>
      <div className="db-head">
        <strong>
          <Table2 size={14} /> Launch tasks
        </strong>
        <div className="db-views" role="tablist" aria-label="Database view">
          {([
            ["table", "Table", Table2],
            ["board", "Board", Columns3],
            ["calendar", "Calendar", CalendarDays],
          ] as const).map(([id, label, Icon]) => (
            <button key={id} type="button" role="tab" aria-selected={view === id} onClick={() => setView(id)}>
              {view === id && <motion.span layoutId={big ? "dbv-big" : "dbv"} className="db-pill" transition={spring} />}
              <Icon size={12} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <span className="db-progress mono">
          <NumberFlow value={done} />/{tasks.length} done
        </span>
        {view === "table" && (
          <button type="button" className="db-sort" aria-pressed={sort} onClick={() => setSort((s) => !s)}>
            Sort by due
          </button>
        )}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          {view === "table" && (
            <div className="db-table" role="table">
              <div className="db-tr db-th" role="row">
                <span role="columnheader">Task</span>
                <span role="columnheader">Owner</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Due</span>
              </div>
              <LayoutGroup>
                {rows.map((t) => (
                  <motion.div key={t.id} layout transition={spring} className="db-tr" role="row" data-done={t.status === "Done"}>
                    <span role="cell" className="db-name">
                      <FileText size={12} /> {t.name}
                    </span>
                    <span role="cell"><Owner name={t.owner} /> {t.owner}</span>
                    <span role="cell">
                      <button type="button" className="chip" data-s={t.status} onClick={() => cycle(t.id)} aria-label={`${t.name}: ${t.status}, change status`}>
                        {t.status}
                      </button>
                    </span>
                    <span role="cell" className="mono db-due">{t.due}</span>
                  </motion.div>
                ))}
              </LayoutGroup>
            </div>
          )}
          {view === "board" && (
            <div className="db-board">
              <LayoutGroup>
                {(["Not started", "In progress", "Done"] as TaskStatus[]).map((s) => (
                  <div key={s} className="db-col">
                    <span className="chip" data-s={s}>{s}</span>
                    {tasks.filter((t) => t.status === s).map((t) => (
                      <motion.button
                        key={t.id}
                        type="button"
                        layout
                        layoutId={(big ? "big-" : "") + t.id}
                        transition={spring}
                        className="db-card"
                        onClick={() => cycle(t.id)}
                        aria-label={`${t.name}, move to ${statusNext[t.status]}`}
                      >
                        <strong>{t.name}</strong>
                        <span><Owner name={t.owner} size={16} /> {t.due}</span>
                      </motion.button>
                    ))}
                  </div>
                ))}
              </LayoutGroup>
            </div>
          )}
          {view === "calendar" && (
            <div className="db-cal">
              {["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"].map((d, i) => (
                <div key={d} className="db-day" data-launch={i === 4}>
                  <span className="mono">{d}</span>
                  {tasks.filter((t) => t.day === i).map((t) => (
                    <button key={t.id} type="button" className="db-event" data-s={t.status} onClick={() => cycle(t.id)}>
                      {t.name}
                    </button>
                  ))}
                  {i === 4 && <em className="launch-flag">Launch</em>}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const slashIcon: Record<string, typeof Heading2> = {
  h2: Heading2,
  todo: ListChecks,
  callout: MessageSquareQuote,
  quote: Quote,
  bullet: List,
};

function BlockView({
  b,
  onToggle,
  tasks,
  setTasks,
  cited,
}: {
  b: Block;
  onToggle: () => void;
  tasks: Task[];
  setTasks: (f: (t: Task[]) => Task[]) => void;
  cited: boolean;
}) {
  const inner = (() => {
    switch (b.type) {
      case "h2":
        return <h3 className="blk-h2">{b.text}</h3>;
      case "p":
        return <p className="blk-p">{b.text}</p>;
      case "bullet":
        return <p className="blk-bullet">{b.text}</p>;
      case "quote":
        return <blockquote className="blk-quote">{b.text}</blockquote>;
      case "callout":
        return (
          <div className="blk-callout">
            <Sun size={15} /> <p>{b.text}</p>
          </div>
        );
      case "todo":
        return (
          <label className="blk-todo" data-done={b.done}>
            <input type="checkbox" checked={!!b.done} onChange={onToggle} />
            <motion.span className="box" animate={{ scale: b.done ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.3 }}>
              {b.done && <Check size={11} strokeWidth={3} />}
            </motion.span>
            <span className="txt">{b.text}</span>
          </label>
        );
      case "db":
        return <Database tasks={tasks} setTasks={setTasks} />;
    }
  })();
  return (
    <div className="blk" data-cited={cited} data-type={b.type}>
      <span className="blk-grip" aria-hidden="true">
        <GripVertical size={13} />
      </span>
      {inner}
    </div>
  );
}

type Msg = { role: "you" | "folio"; text: string; cites?: string[] };

const prompts = ["Summarize this page", "What is still open?", "Draft the launch email"];

export function FolioApp() {
  const [pages, setPages] = useState(seedPages);
  const [current, setCurrent] = useState("launch");
  const [open, setOpen] = useState<string[]>(["handbook", "notes"]);
  const [tasks, setTasks] = useState(seedTasks);
  const [slash, setSlash] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState<{ text: string; shown: number; cites?: string[] } | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [saved, setSaved] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const seen = useInView(root, { once: true, margin: "-15% 0px" });
  const thread = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const page = pages.find((p) => p.id === current)!;
  const blocks = page.blocks.length
    ? page.blocks
    : [{ id: `${page.id}-e`, type: "p" as BlockType, text: "This page is still empty. Press / to add a block, or ask Folio to draft it." }];

  const edit = (f: (b: Block[]) => Block[]) => {
    setPages((ps) => ps.map((p) => (p.id === current ? { ...p, blocks: f(p.blocks) } : p)));
    setSaved(false);
    window.setTimeout(() => setSaved(true), 700);
  };

  const answer = useCallback(
    (q: string) => {
      const p = pages.find((x) => x.id === current)!;
      const todos = p.blocks.filter((b) => b.type === "todo");
      const open = todos.filter((b) => !b.done);
      const openTasks = tasks.filter((t) => t.status !== "Done");
      if (q === prompts[0]) {
        if (p.id !== "launch")
          return { text: `${p.title}: ${p.blocks.filter((b) => b.type !== "h2").slice(0, 2).map((b) => b.text.replace(/\.$/, "")).join(". ")}.`, cites: p.blocks.slice(0, 2).map((b) => b.id) };
        return {
          text: `Launch is Friday, Nov 20. The goal is 1,500 sign-ups in week one and a demo under two minutes. ${todos.length - open.length} of ${todos.length} checks are done, and ${openTasks.length} launch tasks are still open.`,
          cites: ["b1", "b3", "b6", "b9"],
        };
      }
      if (q === prompts[1]) {
        const list = [...open.map((b) => b.text), ...openTasks.map((t) => `${t.name} (${t.owner}, ${t.due})`)];
        return {
          text: list.length ? `Still open: ${list.slice(0, 4).join("; ")}${list.length > 4 ? `, and ${list.length - 4} more` : ""}.` : "Nothing. Every check and task on this page is done.",
          cites: [...open.map((b) => b.id), "b9"],
        };
      }
      return {
        text: "Subject: We launch on Friday. Hi! After months of beta, Juniper opens to everyone on November 20. You get early access 24 hours before. Watch the two-minute demo, then tell us what you think.",
        cites: ["b1", "b4"],
      };
    },
    [pages, current, tasks],
  );

  const ask = useCallback(
    async (q: string) => {
      if (busy.current) return;
      busy.current = true;
      setMsgs((m) => [...m, { role: "you", text: q }]);
      const a = answer(q);
      const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      await new Promise((r) => setTimeout(r, quick ? 0 : 450));
      if (quick) {
        setMsgs((m) => [...m, { role: "folio", text: a.text, cites: a.cites }]);
        busy.current = false;
        return;
      }
      const words = a.text.split(" ");
      for (let i = 1; i <= words.length; i++) {
        setTyping({ text: a.text, shown: i, cites: a.cites });
        await new Promise((r) => setTimeout(r, 38));
      }
      setTyping(null);
      setMsgs((m) => [...m, { role: "folio", text: a.text, cites: a.cites }]);
      busy.current = false;
    },
    [answer],
  );

  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => ask(prompts[0]), 1600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);

  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const insert = (type: BlockType) => {
    const item = slashItems.find((s) => s.type === type)!;
    edit((b) => {
      const at = b.findIndex((x) => x.type === "db");
      const nb: Block = { id: `n${Date.now()}`, type, text: item.sample, done: type === "todo" ? false : undefined };
      if (at < 0) return [...b, nb];
      return [...b.slice(0, at), nb, ...b.slice(at)];
    });
    setSlash(false);
  };

  const tree = pages.filter((p) => !p.parent);
  const kids = (id: string) => pages.filter((p) => p.parent === id);

  return (
    <div className="app" ref={root} aria-label="Interactive Folio workspace">
      <aside className="app-side">
        <div className="workspace">
          <span className="workspace-avatar">J</span>
          <span>
            <strong>Juniper &amp; Co</strong>
            <small>Team space</small>
          </span>
        </div>
        <button type="button" className="side-row" onClick={() => toast("Search", { description: "Try asking Folio on the right instead." })}>
          <Search size={13} /> Search
        </button>
        <button type="button" className="side-row" onClick={() => toast("Inbox", { description: "Three comments mention you this week." })}>
          <Inbox size={13} /> Inbox <em>3</em>
        </button>
        <p className="side-label mono">PAGES</p>
        <ul className="tree">
          {tree.map((p) => {
            const children = kids(p.id);
            const isOpen = open.includes(p.id);
            return (
              <li key={p.id}>
                <div className="tree-row" data-active={current === p.id}>
                  {current === p.id && <motion.span layoutId="tree-pill" className="tree-pill" transition={spring} />}
                  <button
                    type="button"
                    className="tree-chev"
                    aria-label={isOpen ? `Collapse ${p.title}` : `Expand ${p.title}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpen((o) => (o.includes(p.id) ? o.filter((x) => x !== p.id) : [...o, p.id]))}
                    disabled={!children.length}
                  >
                    <motion.span animate={{ rotate: isOpen && children.length ? 90 : 0 }} transition={spring}>
                      <ChevronRight size={12} />
                    </motion.span>
                  </button>
                  <button type="button" className="tree-link" onClick={() => setCurrent(p.id)}>
                    <PageIcon icon={p.icon} color={p.color} size={11} /> {p.title}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && children.length > 0 && (
                    <motion.ul
                      className="tree-kids"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={spring}
                    >
                      {children.map((c) => (
                        <li key={c.id}>
                          <div className="tree-row" data-active={current === c.id}>
                            {current === c.id && <motion.span layoutId="tree-pill" className="tree-pill" transition={spring} />}
                            <button type="button" className="tree-link" onClick={() => setCurrent(c.id)}>
                              <PageIcon icon={c.icon} color={c.color} size={11} /> {c.title}
                            </button>
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="app-tabs" role="tablist" aria-label="Pages">
        {pages.filter((p) => p.blocks.length).map((p) => (
          <button key={p.id} type="button" role="tab" aria-selected={current === p.id} onClick={() => setCurrent(p.id)}>
            {current === p.id && <motion.span layoutId="tab-pill" className="pill" transition={spring} />}
            <span>{p.title}</span>
          </button>
        ))}
      </div>

      <section className="editor">
        <header className="editor-bar">
          <span className="crumbs">
            {page.parent && <>{pages.find((p) => p.id === page.parent)?.title} / </>}
            <b>{page.title}</b>
          </span>
          <span className="saved mono" data-saved={saved}>
            {saved ? "Saved" : "Saving…"}
          </span>
          <span className="faces" aria-label="Also here: Ana and Theo">
            <Owner name="Ana" size={20} />
            <Owner name="Theo" size={20} />
          </span>
        </header>
        <div className="editor-scroll">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={page.id}
              className="doc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="cover" style={{ ["--c" as string]: page.color }} />
              <motion.button
                type="button"
                className="doc-icon"
                aria-label="Change page icon"
                whileHover={{ scale: 1.06, rotate: -4 }}
                whileTap={{ scale: 0.92 }}
                onClick={() =>
                  setPages((ps) =>
                    ps.map((p) => (p.id === current ? { ...p, icon: iconCycle[(iconCycle.indexOf(p.icon) + 1) % iconCycle.length] } : p)),
                  )
                }
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={page.icon} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={spring}>
                    <PageIcon icon={page.icon} color={page.color} size={26} />
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <h2 className="doc-title">{page.title}</h2>
              <p className="doc-meta mono">Edited by {page.editedBy} · just now</p>
              <div className="blocks">
                <AnimatePresence initial={false}>
                  {blocks.map((b) => (
                    <motion.div
                      key={b.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={spring}
                      onMouseEnter={() => setHover(null)}
                    >
                      <BlockView
                        b={b}
                        tasks={tasks}
                        setTasks={setTasks}
                        cited={hover === b.id}
                        onToggle={() => edit((bs) => bs.map((x) => (x.id === b.id ? { ...x, done: !x.done } : x)))}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="slash-row">
                  <button type="button" className="slash-btn" onClick={() => setSlash((s) => !s)} aria-expanded={slash}>
                    <Plus size={13} /> Type <kbd>/</kbd> for blocks
                  </button>
                  <AnimatePresence>
                    {slash && (
                      <motion.ul
                        className="slash-menu"
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={spring}
                      >
                        <li className="slash-label mono">BASIC BLOCKS</li>
                        {slashItems.map((s) => {
                          const Icon = slashIcon[s.type];
                          return (
                            <li key={s.type}>
                              <button type="button" onClick={() => insert(s.type)}>
                                <span className="slash-ico"><Icon size={14} /></span>
                                <span>
                                  <b>{s.label}</b>
                                  <small>{s.hint}</small>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <aside className="ask">
        <p className="ask-head">
          <Sparkles size={13} /> Ask Folio
        </p>
        <div className="ask-thread" ref={thread} aria-live="polite">
          {msgs.length === 0 && !typing && <p className="ask-empty">Folio has read every page in this space. Ask it anything.</p>}
          {msgs.map((m, i) => (
            <motion.div key={i} className="msg" data-role={m.role} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
              <p>{m.text}</p>
              {m.cites && m.cites.length > 0 && (
                <span className="cites">
                  {m.cites.map((c, k) => (
                    <button key={c} type="button" onMouseEnter={() => setHover(c)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(c)} onBlur={() => setHover(null)}>
                      {k + 1}
                    </button>
                  ))}
                  <small>sources on this page</small>
                </span>
              )}
            </motion.div>
          ))}
          {typing && (
            <div className="msg" data-role="folio">
              <p>
                {typing.text.split(" ").slice(0, typing.shown).join(" ")}
                <i className="caret" />
              </p>
            </div>
          )}
        </div>
        <div className="ask-chips">
          {prompts.map((p) => (
            <button key={p} type="button" onClick={() => ask(p)}>
              {p}
            </button>
          ))}
        </div>
        <div className="ask-input">
          <span>Ask about this page…</span>
          <span className="send"><ArrowUp size={13} /></span>
        </div>
      </aside>
    </div>
  );
}
