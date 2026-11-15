"use client";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { toast } from "sonner";
import {
  ArrowUp,
  Check,
  ChevronDown,
  Copy,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  MessageCircle,
  NotebookText,
  Paperclip,
  Plus,
  Sparkles,
} from "lucide-react";
import { answers, files, memo, projects, recents, risks, thinking, type Draft, type Style } from "./data";
import { Logo } from "./logo";
import { spring } from "./motion-kit";

type Turn =
  | { role: "you"; text: string }
  | { role: "wren"; text: string; steps?: string[]; risks?: boolean; done: boolean };

const prompts = ["Draft the board memo", "What are the risks?", "Make it shorter"];
const fileIcon = { PDF: FileText, CSV: FileSpreadsheet, Notes: NotebookText } as const;
const quick = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, quick() ? 0 : ms));

export function WrenApp() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [streaming, setStreaming] = useState<{ text: string; shown: number } | null>(null);
  const [step, setStep] = useState(-1);
  const [style, setStyle] = useState<Style>("Balanced");
  const [styleOpen, setStyleOpen] = useState(false);
  const [doc, setDoc] = useState<Draft | null>(null);
  const [version, setVersion] = useState<"v1" | "v2">("v1");
  const [versions, setVersions] = useState<("v1" | "v2")[]>([]);
  const [written, setWritten] = useState(0);
  const [extra, setExtra] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const seen = useInView(root, { once: true, margin: "-15% 0px" });

  const stream = useCallback(async (text: string) => {
    if (quick()) return;
    const words = text.split(" ");
    for (let i = 1; i <= words.length; i++) {
      setStreaming({ text, shown: i });
      await wait(32);
    }
    setStreaming(null);
  }, []);

  const writeDoc = useCallback(async (v: "v1" | "v2") => {
    setDoc(memo[v]);
    setVersion(v);
    setVersions((vs) => (vs.includes(v) ? vs : [...vs, v]));
    setWritten(0);
    for (let i = 1; i <= memo[v].blocks.length; i++) {
      await wait(420);
      setWritten(i);
    }
  }, []);

  const ask = useCallback(
    async (q: string) => {
      if (busy) return;
      setBusy(true);
      setTurns((t) => [...t, { role: "you", text: q }]);
      await wait(350);
      const isDraft = q === prompts[0];
      const isRisk = q === prompts[1];
      const isShort = q === prompts[2];
      const steps = isDraft ? thinking : isRisk ? ["Re-reading the draft", "Checking each number against its source", "Ranking what could go wrong"] : isShort ? ["Keeping every number", "Cutting each section to one line"] : ["Reading your project files", "Thinking it through"];
      for (let i = 0; i < steps.length; i++) {
        setStep(i);
        await wait(520);
      }
      setStep(steps.length);
      let text: string;
      if (isDraft) {
        text = answers[style];
        writeDoc("v1");
      } else if (isRisk) {
        text = "Three risks stand out. I can add them to the draft as a short section.";
      } else if (isShort) {
        text = "Here is a version you can read in twenty seconds. The full one is still under v1.";
        writeDoc("v2");
      } else {
        text = `Good question. From your three files, I would start with the churn numbers: they answer most of “${q.slice(0, 60)}”. Want me to add a paragraph about it to the draft?`;
      }
      await stream(text);
      setTurns((t) => [...t, { role: "wren", text, steps, risks: isRisk, done: true }]);
      setStep(-1);
      setBusy(false);
    },
    [busy, stream, style, writeDoc],
  );

  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => ask(prompts[0]), 1600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);

  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [turns, streaming, step]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q);
  };

  const current = doc ? memo[version] : null;
  const pendingSteps = busy && step >= 0;

  return (
    <div className="app" ref={root} aria-label="Interactive Wren workspace">
      <aside className="app-side">
        <button type="button" className="new-chat" onClick={() => { setTurns([]); setDoc(null); setVersions([]); setExtra(false); }}>
          <Plus size={14} /> New chat
        </button>
        <p className="side-label mono">PROJECTS</p>
        <ul className="side-projects">
          {projects.map((p) => (
            <li key={p.id} data-active={p.id === "memo"}>
              <button type="button" onClick={() => p.id !== "memo" && toast(p.name, { description: `${p.files} files. This demo keeps you in the board memo.` })}>
                <FolderOpen size={13} />
                <span>{p.name}</span>
                <em className="mono">{p.files}</em>
              </button>
            </li>
          ))}
        </ul>
        <p className="side-label mono">RECENT</p>
        <ul className="side-recents">
          {recents.map((r) => (
            <li key={r}>
              <MessageCircle size={12} /> {r}
            </li>
          ))}
        </ul>
        <div className="side-plan">
          <span className="plan-dot" /> Wren Plus
          <small>Your chats are never used for training</small>
        </div>
      </aside>

      <section className="chat">
        <header className="chat-head">
          <strong><FolderOpen size={14} /> Board memo Q4</strong>
          <span className="chat-files">
            {files.map((f) => {
              const Icon = fileIcon[f.kind as keyof typeof fileIcon];
              return (
                <span key={f.name} className="file-chip" title={`${f.name} · ${f.size}`}>
                  <Icon size={12} /> {f.name}
                </span>
              );
            })}
          </span>
        </header>
        <div className="chat-thread" ref={thread} aria-live="polite">
          {turns.length === 0 && !busy && (
            <div className="chat-empty">
              <span className="chat-logo"><Logo /></span>
              <p>What are we working on?</p>
            </div>
          )}
          {turns.map((t, i) =>
            t.role === "you" ? (
              <motion.p key={i} className="turn-you" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                {t.text}
              </motion.p>
            ) : (
              <motion.div key={i} className="turn-wren" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                <span className="wren-mark"><Logo small /></span>
                <div>
                  {t.steps && (
                    <details className="steps-done">
                      <summary><Check size={12} /> Thought it through · {t.steps.length} steps</summary>
                      <ul>
                        {t.steps.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                    </details>
                  )}
                  <p>{t.text}</p>
                  {t.risks && (
                    <>
                      <ol className="risk-list">
                        {risks.map((r) => <li key={r}>{r}</li>)}
                      </ol>
                      <button
                        type="button"
                        className="add-draft"
                        disabled={extra || !doc}
                        onClick={() => { setExtra(true); toast("Added to the draft", { description: "A “Risks” section is now at the end of the memo." }); }}
                      >
                        {extra ? <><Check size={12} /> Added</> : <><Plus size={12} /> Add to draft</>}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ),
          )}
          {pendingSteps && (
            <div className="turn-wren">
              <span className="wren-mark thinking"><Logo small /></span>
              <div>
                <ul className="steps-live">
                  {(turns[turns.length - 1]?.role === "you" && turns[turns.length - 1].text === prompts[0]
                    ? thinking
                    : turns[turns.length - 1]?.text === prompts[1]
                      ? ["Re-reading the draft", "Checking each number against its source", "Ranking what could go wrong"]
                      : turns[turns.length - 1]?.text === prompts[2]
                        ? ["Keeping every number", "Cutting each section to one line"]
                        : ["Reading your project files", "Thinking it through"]
                  ).map((s, k) => (
                    <motion.li key={s} initial={{ opacity: 0, x: -6 }} animate={{ opacity: k <= step ? 1 : 0.35, x: 0 }} data-done={k < step}>
                      {k < step ? <Check size={12} /> : <span className="spin" />} {s}
                    </motion.li>
                  ))}
                </ul>
                {streaming && (
                  <p>
                    {streaming.text.split(" ").slice(0, streaming.shown).join(" ")}
                    <i className="caret" />
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="chat-foot">
          <div className="prompt-chips">
            {prompts.map((p) => (
              <button key={p} type="button" onClick={() => ask(p)} disabled={busy}>
                {p}
              </button>
            ))}
          </div>
          <form className="composer" onSubmit={send}>
            <input id="wren-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Reply to Wren…" aria-label="Message Wren" autoComplete="off" />
            <div className="composer-row">
              <button type="button" className="attach" aria-label="Attach a file" onClick={() => toast("Files", { description: "Drop PDFs, sheets or notes into the project." })}>
                <Paperclip size={14} />
              </button>
              <div className="style-pick">
                <button type="button" className="style-btn" aria-expanded={styleOpen} onClick={() => setStyleOpen((o) => !o)}>
                  <Sparkles size={12} /> {style} <ChevronDown size={12} />
                </button>
                <AnimatePresence>
                  {styleOpen && (
                    <motion.ul className="style-menu" initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4 }} transition={spring}>
                      {(["Concise", "Balanced", "Detailed"] as Style[]).map((s) => (
                        <li key={s}>
                          <button type="button" aria-pressed={style === s} onClick={() => { setStyle(s); setStyleOpen(false); }}>
                            {s} {style === s && <Check size={12} />}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <button type="submit" className="send" aria-label="Send" disabled={!input.trim() || busy}>
                <ArrowUp size={15} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <aside className="canvas" aria-label="Draft">
        <header className="canvas-head">
          <strong><FileText size={13} /> Draft</strong>
          {versions.length > 0 && (
            <div className="versions" role="tablist" aria-label="Versions">
              {versions.map((v) => (
                <button key={v} type="button" role="tab" aria-selected={version === v} onClick={() => { setVersion(v); setWritten(memo[v].blocks.length); }}>
                  {version === v && <motion.span layoutId="ver-pill" className="pill" transition={spring} />}
                  <span>{v}</span>
                </button>
              ))}
            </div>
          )}
          <button type="button" className="copy" aria-label="Copy draft" disabled={!doc} onClick={() => toast("Copied", { description: "The draft is on your clipboard (in a real app)." })}>
            <Copy size={13} />
          </button>
        </header>
        <div className="canvas-body">
          {!current ? (
            <p className="canvas-empty">Drafts Wren writes appear here, ready to edit and copy.</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.article key={version} className="paper" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <h4>{current.title}</h4>
                <p className="paper-meta mono">
                  <NumberFlow value={current.blocks.slice(0, written).reduce((a, b) => a + b.p.split(" ").length + (b.h ? b.h.split(" ").length : 0), 0) + (extra ? 34 : 0)} /> words
                </p>
                {current.blocks.slice(0, written).map((b, i) => (
                  <motion.section key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                    {b.h && <h5>{b.h}</h5>}
                    <p>{b.p}</p>
                  </motion.section>
                ))}
                {written < current.blocks.length && <span className="writing"><i className="caret" /></span>}
                <AnimatePresence>
                  {extra && written >= current.blocks.length && (
                    <motion.section className="added" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} transition={spring}>
                      <h5>Risks</h5>
                      <ul>
                        {risks.map((r) => <li key={r}>{r}</li>)}
                      </ul>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.article>
            </AnimatePresence>
          )}
        </div>
      </aside>
    </div>
  );
}
