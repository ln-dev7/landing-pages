"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  CornerUpLeft,
  Ellipsis,
  FileCode,
  Folder,
  GitPullRequest,
} from "lucide-react";
import { toast } from "sonner";
import { files, type DiffLine, type Note } from "./review-data";
import { Logo } from "./logo";

const KEYWORDS = /^(export|async|function|const|await|return|if|using|test)$/;

function highlight(code: string) {
  const out: React.ReactNode[] = [];
  const re = /('[^']*'|`[^`]*`|\b\d+\b|[A-Za-z_]\w*)/g;
  let last = 0;
  for (const m of code.matchAll(re)) {
    const t = m[0];
    const at = m.index ?? 0;
    if (at > last) out.push(code.slice(last, at));
    let cls = "";
    if (/^['`]/.test(t)) cls = "tok-str";
    else if (/^\d/.test(t)) cls = "tok-num";
    else if (KEYWORDS.test(t)) cls = "tok-kw";
    else if (code[at + t.length] === "(") cls = "tok-fn";
    out.push(
      cls ? (
        <span key={at} className={cls}>
          {t}
        </span>
      ) : (
        t
      ),
    );
    last = at + t.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function NoteBody({ note }: { note: Note }) {
  const [before, after] = note.body.split("{e}");
  return (
    <p>
      {before}
      <strong>{note.emphasis}</strong>
      {after}
    </p>
  );
}

type Row = DiffLine & { fixed?: boolean; key: string };

export function ReviewDemo() {
  const [active, setActive] = useState(files[0].path);
  const [read, setRead] = useState(0);
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [paths, setPaths] = useState<
    { id: string; d: string; x: number; y: number }[]
  >([]);
  const stage = useRef<HTMLDivElement>(null);
  const lineEls = useRef(new Map<string, HTMLElement>());
  const cardEls = useRef(new Map<string, HTMLElement>());

  const total = files.length;
  const ready = read >= total;
  const file = files.find((f) => f.path === active) ?? files[0];

  useEffect(() => {
    if (prefersReduced()) {
      setRead(total);
      return;
    }
    let n = 0;
    const start = window.setTimeout(function tick() {
      n += 1;
      setRead(n);
      if (n < total) timer = window.setTimeout(tick, 420);
    }, 1500);
    let timer = start;
    return () => window.clearTimeout(timer);
  }, [total]);

  const rows: Row[] = [];
  let offset = 0;
  file.lines.forEach((l, i) => {
    rows.push({
      ...l,
      new: l.new ? l.new + offset : undefined,
      key: `${file.path}-${i}`,
    });
    const fix = file.notes.find((n) => applied[n.id] && l.new === n.fix.after);
    if (fix) {
      offset += 1;
      rows.push({
        new: (l.new ?? 0) + offset,
        kind: "add",
        code: fix.fix.code,
        fixed: true,
        key: `${file.path}-fix-${fix.id}`,
      });
    }
  });

  const measure = useCallback(() => {
    const root = stage.current;
    if (!root || window.innerWidth < 900) {
      setPaths([]);
      return;
    }
    const box = root.getBoundingClientRect();
    const next: typeof paths = [];
    file.notes.forEach((n) => {
      const line = lineEls.current.get(n.id);
      const card = cardEls.current.get(n.id);
      if (!line || !card) return;
      const l = line.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const x1 = l.right - box.left - 14;
      const y1 = l.top - box.top + l.height / 2;
      const x2 = c.left - box.left;
      const y2 = c.top - box.top + 22;
      const mid = (x1 + x2) / 2;
      next.push({
        id: n.id,
        d: `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`,
        x: x1,
        y: y1,
      });
    });
    setPaths(next);
  }, [file]);

  useLayoutEffect(() => {
    measure();
  }, [measure, ready, applied]);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure]);

  const apply = (note: Note) => {
    setApplied((a) => ({ ...a, [note.id]: true }));
    toast(
      note.action === "Apply"
        ? "Suggestion applied"
        : "Fix committed to the branch",
      {
        description: `${note.where} · demo only, nothing is pushed`,
      },
    );
  };

  const folders = Array.from(new Set(files.map((f) => f.folder)));
  const open = file.notes.filter((n) => !applied[n.id]).length;

  return (
    <div
      className="review"
      aria-label="Interactive Redline review on a demo pull request"
    >
      <header className="review-head">
        <span className="pr-icon" aria-hidden="true">
          <GitPullRequest size={16} />
        </span>
        <div className="pr-title">
          <strong>
            Make refund job safe to rerun <span>#317</span>
          </strong>
          <small>harbor/payments · demo repository</small>
        </div>
        <span className="pr-state">Open</span>
        <div className="pr-progress" aria-live="polite">
          <span>
            {ready
              ? `Review ready · ${total} files`
              : `Reading ${Math.max(read, 1)} of ${total} files`}
          </span>
          <i>
            <b style={{ width: `${(Math.max(read, 0.4) / total) * 100}%` }} />
          </i>
        </div>
        <button
          type="button"
          className="icon-ghost"
          aria-label="More actions"
          onClick={() => toast("Merge stays with you — Redline never merges.")}
        >
          <Ellipsis size={16} />
        </button>
      </header>

      <div className="review-body" ref={stage}>
        <nav className="tree" aria-label="Files changed">
          <span className="tree-title">
            Files changed <em>{total}</em>
          </span>
          {folders.map((folder) => (
            <div key={folder} className="tree-group">
              <span className="tree-folder">
                <ChevronDown size={13} aria-hidden="true" />
                <Folder size={14} aria-hidden="true" />
                {folder}
              </span>
              {files
                .filter((f) => f.folder === folder)
                .map((f, i) => {
                  const seen = files.indexOf(f) < read;
                  return (
                    <button
                      type="button"
                      key={f.path}
                      className="tree-file"
                      aria-current={f.path === active ? "true" : undefined}
                      onClick={() => setActive(f.path)}
                      data-seen={seen}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <FileCode size={14} aria-hidden="true" />
                      <span className="tree-name">{f.name}</span>
                      {f.flag && seen && (
                        <i
                          className="tree-flag"
                          data-flag={f.flag}
                          aria-label={
                            f.flag === "blocking"
                              ? "Blocking note"
                              : "Risk note"
                          }
                        />
                      )}
                      <span className="tree-stat mono">
                        <ins>+{f.added}</ins> <del>−{f.removed}</del>
                      </span>
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="diff">
          <div className="diff-head mono">
            <span>
              {file.path} <ins>+{file.added}</ins> <del>−{file.removed}</del>
            </span>
            <small>
              Viewed {files.indexOf(file) + 1} of {total}
            </small>
          </div>
          <div className="diff-code mono" data-scanning={!ready}>
            {rows.map((r) => (
              <div
                key={r.key}
                className="diff-line"
                data-kind={r.kind}
                data-fixed={r.fixed}
                data-noted={Boolean(r.note && ready && !applied[r.note])}
                data-severity={
                  file.notes.find((n) => n.id === r.note)?.severity
                }
                ref={(el) => {
                  if (r.note && el) lineEls.current.set(r.note, el);
                }}
              >
                <span className="ln">{r.kind === "del" ? r.old : r.new}</span>
                <span className="sign">
                  {r.kind === "add" ? "+" : r.kind === "del" ? "−" : ""}
                </span>
                <code>{highlight(r.code)}</code>
              </div>
            ))}
          </div>
        </div>

        <aside className="notes" aria-label="Redline notes">
          <header className="notes-head">
            <span className="notes-avatar">
              <Logo />
            </span>
            <strong>Redline</strong>
            <span>
              {ready
                ? file.notes.length
                  ? `${file.notes.length} note${file.notes.length > 1 ? "s" : ""} · ${open} open`
                  : "No notes"
                : "Reading…"}
            </span>
          </header>
          {!ready && (
            <div className="notes-skeleton" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          )}
          {ready && file.notes.length === 0 && (
            <p className="notes-clear">
              <Check size={15} /> Nothing to flag in {file.name}. It does what
              the description says.
            </p>
          )}
          {ready &&
            file.notes.map((n, i) => (
              <article
                key={n.id}
                className="note"
                data-severity={n.severity}
                data-done={Boolean(applied[n.id])}
                style={{ animationDelay: `${i * 260}ms` }}
                onAnimationEnd={measure}
                ref={(el) => {
                  if (el) cardEls.current.set(n.id, el);
                }}
              >
                <header>
                  <span className="sev">{n.severity}</span>
                  <code className="mono">{n.where}</code>
                </header>
                <NoteBody note={n} />
                {applied[n.id] ? (
                  <p className="note-done">
                    <Check size={14} />{" "}
                    {n.action === "Apply" ? "Applied" : "Committed"} as{" "}
                    <code className="mono">
                      {n.id === "double"
                        ? "9c41e2a"
                        : n.id === "race"
                          ? "e07b5d1"
                          : "3fa8c90"}
                    </code>
                  </p>
                ) : (
                  <>
                    <pre className="suggestion mono">
                      <span>+</span>
                      {n.fix.code.trim()}
                    </pre>
                    <div className="note-actions">
                      <button
                        type="button"
                        className="button button-sm"
                        onClick={() => apply(n)}
                      >
                        {n.action}
                      </button>
                      <button
                        type="button"
                        className="button button-outline button-sm"
                        onClick={() =>
                          toast("Reply sent to the thread", {
                            description:
                              "In the demo, Redline answers in the docs instead.",
                          })
                        }
                      >
                        <CornerUpLeft size={13} /> Reply
                      </button>
                    </div>
                  </>
                )}
              </article>
            ))}
        </aside>

        {ready && paths.length > 0 && (
          <svg className="connectors" aria-hidden="true">
            {paths.map((p) => {
              const sev = file.notes.find((n) => n.id === p.id)?.severity;
              const done = applied[p.id];
              return (
                <g key={p.id} data-severity={sev} data-done={Boolean(done)}>
                  <path d={p.d} pathLength={1} />
                  <circle cx={p.x} cy={p.y} r="4" />
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
