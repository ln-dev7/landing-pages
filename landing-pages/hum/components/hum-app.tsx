"use client";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowUp,
  AtSign,
  Check,
  ChevronDown,
  Eye,
  FileVideo,
  Hash,
  Headphones,
  Heart,
  Mic,
  MicOff,
  MessageSquare,
  PartyPopper,
  PhoneOff,
  Smile,
  Sparkles,
  ThumbsUp,
  X,
} from "lucide-react";
import { catchup, channels as seed, people, type Channel, type Msg, type Reaction, type Who } from "./data";
import { spring } from "./motion-kit";

export const reactionIcons = { thumbs: ThumbsUp, heart: Heart, party: PartyPopper, eyes: Eye, check: Check };

export function Face({ who, size = 30, dot = false }: { who: Who; size?: number; dot?: boolean }) {
  const p = people[who];
  return (
    <span className="face" style={{ width: size, height: size, background: p.color, fontSize: size * 0.4 }} title={p.name}>
      {p.short[0]}
      {dot && <i className="presence" data-s={p.status} />}
    </span>
  );
}

const clock = () => {
  const d = new Date();
  return `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export function HumApp() {
  const [chans, setChans] = useState<Channel[]>(seed);
  const [cur, setCur] = useState("launch");
  const [panel, setPanel] = useState<"catchup" | string>("catchup");
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState<Who | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [summary, setSummary] = useState(0);
  const [huddle, setHuddle] = useState(false);
  const [muted, setMuted] = useState(false);
  const [secs, setSecs] = useState(0);
  const [threadDraft, setThreadDraft] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const seen = useInView(root, { once: true, margin: "-15% 0px" });

  const channel = chans.find((c) => c.id === cur)!;
  const unread = chans.reduce((a, c) => a + c.unread, 0);
  const thread = panel !== "catchup" ? channel.msgs.find((m) => m.id === panel) : undefined;

  // The catch-up writes itself, line by line, when the demo comes into view.
  useEffect(() => {
    if (!seen) return;
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quick) return setSummary(catchup.length);
    const ids = catchup.map((_, i) => window.setTimeout(() => setSummary(i + 1), 900 + i * 650));
    return () => ids.forEach(window.clearTimeout);
  }, [seen]);

  useEffect(() => {
    if (!huddle) return;
    const t = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [huddle]);

  // Start each channel at the top; follow new messages to the bottom.
  const total = channel.msgs.length;
  const count = useRef({ cur, n: total });
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    if (count.current.cur !== cur) {
      el.scrollTo({ top: 0 });
    } else if (total > count.current.n || typing) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
    count.current = { cur, n: total };
  }, [cur, total, typing]);

  const open = useCallback((id: string, jump?: string) => {
    setCur(id);
    setChans((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
    if (jump) {
      setFlash(jump);
      window.setTimeout(() => setFlash(null), 1800);
    }
  }, []);

  const react = (mid: string, icon: Reaction["icon"]) =>
    setChans((cs) =>
      cs.map((c) =>
        c.id !== cur
          ? c
          : {
              ...c,
              msgs: c.msgs.map((m) => {
                if (m.id !== mid) return m;
                const rs = m.reactions ?? [];
                const has = rs.find((r) => r.icon === icon);
                const next = has
                  ? rs.map((r) => (r.icon === icon ? { ...r, n: r.n + (r.mine ? -1 : 1), mine: !r.mine } : r)).filter((r) => r.n > 0)
                  : [...rs, { icon, n: 1, mine: true }];
                return { ...m, reactions: next };
              }),
            },
      ),
    );

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const id = `m${Date.now()}`;
    const target = cur;
    setChans((cs) => cs.map((c) => (c.id === target ? { ...c, msgs: [...c.msgs, { id, who: "you", time: clock(), text }] } : c)));
    setDraft("");
    const bot = chans.find((c) => c.id === target)!.reply;
    window.setTimeout(() => setTyping(bot.who), 700);
    window.setTimeout(() => {
      setTyping(null);
      setChans((cs) => cs.map((c) => (c.id === target ? { ...c, msgs: [...c.msgs, { id: id + "r", who: bot.who, time: clock(), text: bot.text }] } : c)));
    }, 2300);
  };

  const sendReply = (e: FormEvent) => {
    e.preventDefault();
    const text = threadDraft.trim();
    if (!text || !thread) return;
    setChans((cs) =>
      cs.map((c) =>
        c.id !== cur ? c : { ...c, msgs: c.msgs.map((m) => (m.id === thread.id ? { ...m, replies: [...(m.replies ?? []), { who: "you", text, time: clock() }] } : m)) },
      ),
    );
    setThreadDraft("");
  };

  const suggestions = ["Looks good to me!", "Can we push this to Monday?", "On it."];
  const rooms = chans.filter((c) => !c.dm);
  const dms = chans.filter((c) => c.dm);

  return (
    <div className="app" ref={root} aria-label="Interactive Hum workspace">
      <aside className="app-side">
        <div className="workspace">
          <span className="workspace-avatar">P</span>
          <span>
            <strong>Pennant</strong>
            <small>
              <i className="presence-inline" /> 24 online
            </small>
          </span>
          <ChevronDown size={14} />
        </div>
        <button type="button" className="catch-btn" data-on={panel === "catchup"} onClick={() => setPanel("catchup")}>
          <Sparkles size={14} /> Catch up
          {unread > 0 && (
            <em>
              <NumberFlow value={unread} />
            </em>
          )}
        </button>
        <p className="side-label mono">CHANNELS</p>
        <ul className="chan-list">
          {rooms.map((c) => (
            <li key={c.id} data-active={cur === c.id} data-unread={c.unread > 0}>
              <button type="button" onClick={() => open(c.id)}>
                {cur === c.id && <motion.span layoutId="chan-pill" className="chan-pill" transition={spring} />}
                <Hash size={13} />
                <span>{c.name}</span>
                {c.id === "design" && (
                  <span className="in-huddle" title="2 people in a huddle">
                    <Headphones size={11} /> 2
                  </span>
                )}
                {c.unread > 0 && (
                  <motion.em initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    {c.unread}
                  </motion.em>
                )}
              </button>
            </li>
          ))}
        </ul>
        <p className="side-label mono">DIRECT MESSAGES</p>
        <ul className="chan-list">
          {dms.map((c) => (
            <li key={c.id} data-active={cur === c.id}>
              <button type="button" onClick={() => open(c.id)}>
                {cur === c.id && <motion.span layoutId="chan-pill" className="chan-pill" transition={spring} />}
                <Face who={c.dm!} size={18} dot />
                <span>{c.name}</span>
              </button>
            </li>
          ))}
          {(["theo", "mina"] as Who[]).map((w) => (
            <li key={w}>
              <button type="button" className="dm-static" onClick={() => open("dm-ana")}>
                <Face who={w} size={18} dot />
                <span>{people[w].name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="app-tabs" role="tablist" aria-label="Channels">
        {chans.map((c) => (
          <button key={c.id} type="button" role="tab" aria-selected={cur === c.id} onClick={() => open(c.id)}>
            {cur === c.id && <motion.span layoutId="tab-pill" className="pill" transition={spring} />}
            <span>{c.dm ? c.name.split(" ")[0] : `#${c.name}`}</span>
          </button>
        ))}
      </div>

      <section className="room">
        <header className="room-head">
          <div>
            <strong>
              {channel.dm ? <Face who={channel.dm} size={20} dot /> : <Hash size={15} />} {channel.name}
            </strong>
            <span>{channel.topic}</span>
          </div>
          <span className="room-faces" aria-hidden="true">
            {(["ana", "theo", "mina", "sam"] as Who[]).map((w) => <Face key={w} who={w} size={22} />)}
          </span>
          <button type="button" className="huddle-btn" data-on={huddle} onClick={() => { setHuddle((h) => !h); setSecs(0); }}>
            <Headphones size={14} /> {huddle ? "In huddle" : "Huddle"}
          </button>
        </header>
        <AnimatePresence>
          {huddle && (
            <motion.div className="huddle" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={spring}>
              <div className="huddle-inner">
                <span className="wave" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} data-muted={muted} />)}
                </span>
                <span className="huddle-faces">
                  <Face who="you" size={24} />
                  <Face who="ana" size={24} />
                  <Face who="mina" size={24} />
                </span>
                <span className="mono huddle-time">
                  <NumberFlow value={Math.floor(secs / 60)} format={{ minimumIntegerDigits: 2 }} />:
                  <NumberFlow value={secs % 60} format={{ minimumIntegerDigits: 2 }} />
                </span>
                <button type="button" aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted} onClick={() => setMuted((m) => !m)}>
                  {muted ? <MicOff size={14} /> : <Mic size={14} />}
                </button>
                <button type="button" className="leave" aria-label="Leave huddle" onClick={() => setHuddle(false)}>
                  <PhoneOff size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="msgs" ref={list}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={cur} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="day mono"><span>Today</span></p>
              {channel.msgs.map((m: Msg) => (
                <motion.article
                  key={m.id}
                  layout
                  className="msg"
                  data-flash={flash === m.id}
                  data-you={m.who === "you"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                >
                  <Face who={m.who} />
                  <div className="msg-body">
                    <p className="msg-meta">
                      <strong>{people[m.who].name}</strong> <span className="mono">{m.time}</span>
                    </p>
                    <p className="msg-text">{m.text}</p>
                    {m.file && (
                      <span className="file">
                        <FileVideo size={16} /> {m.file} <em>24 MB</em>
                      </span>
                    )}
                    <div className="reacts">
                      {(m.reactions ?? []).map((r) => {
                        const Icon = reactionIcons[r.icon];
                        return (
                          <motion.button key={r.icon} type="button" layout className="react" data-mine={!!r.mine} onClick={() => react(m.id, r.icon)} whileTap={{ scale: 0.88 }} aria-label={`${r.icon}, ${r.n}`}>
                            <Icon size={12} />
                            <NumberFlow value={r.n} />
                          </motion.button>
                        );
                      })}
                      <span className="react-add">
                        <Smile size={13} />
                        <span className="react-pick">
                          {(Object.keys(reactionIcons) as Reaction["icon"][]).map((k) => {
                            const Icon = reactionIcons[k];
                            return (
                              <button key={k} type="button" aria-label={`React with ${k}`} onClick={() => react(m.id, k)}>
                                <Icon size={13} />
                              </button>
                            );
                          })}
                        </span>
                      </span>
                    </div>
                    {m.replies && m.replies.length > 0 && (
                      <button type="button" className="replies" onClick={() => setPanel(m.id)} data-on={panel === m.id}>
                        <span className="reply-faces">
                          {[...new Set(m.replies.map((r) => r.who))].slice(0, 3).map((w) => <Face key={w} who={w} size={18} />)}
                        </span>
                        <NumberFlow value={m.replies.length} /> {m.replies.length === 1 ? "reply" : "replies"}
                        <span className="mono">Last reply {m.replies[m.replies.length - 1].time}</span>
                      </button>
                    )}
                  </div>
                </motion.article>
              ))}
              <AnimatePresence>
                {typing && (
                  <motion.p className="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <span className="dots"><i /><i /><i /></span> {people[typing].short} is typing…
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="composer-wrap">
          <div className="suggest">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => setDraft(s)}>
                {s}
              </button>
            ))}
          </div>
          <form className="composer" onSubmit={send}>
            <AtSign size={14} />
            <input
              id="hum-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${channel.dm ? channel.name : "#" + channel.name}`}
              aria-label="Message"
              autoComplete="off"
            />
            <button type="submit" aria-label="Send" disabled={!draft.trim()}>
              <ArrowUp size={14} />
            </button>
          </form>
        </div>
      </section>

      <aside className="side-panel">
        <AnimatePresence mode="wait" initial={false}>
          {thread ? (
            <motion.div key="thread" className="thread" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }}>
              <header className="panel-head">
                <strong><MessageSquare size={13} /> Thread</strong>
                <button type="button" aria-label="Close thread" onClick={() => setPanel("catchup")}><X size={14} /></button>
              </header>
              <div className="thread-list">
                <div className="t-root">
                  <Face who={thread.who} size={24} />
                  <p><strong>{people[thread.who].short}</strong> {thread.text}</p>
                </div>
                <p className="t-count mono">{thread.replies?.length} replies</p>
                {thread.replies?.map((r, i) => (
                  <motion.div key={i} className="t-reply" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: i * 0.05 }}>
                    <Face who={r.who} size={22} />
                    <p><strong>{people[r.who].short}</strong> <span className="mono">{r.time}</span><br />{r.text}</p>
                  </motion.div>
                ))}
              </div>
              <form className="composer composer-sm" onSubmit={sendReply}>
                <input value={threadDraft} onChange={(e) => setThreadDraft(e.target.value)} placeholder="Reply…" aria-label="Reply in thread" autoComplete="off" />
                <button type="submit" aria-label="Send reply" disabled={!threadDraft.trim()}><ArrowUp size={13} /></button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="catch" className="catch" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }}>
              <header className="panel-head">
                <strong><Sparkles size={13} /> Catch up</strong>
                <span className="mono">since 8:30</span>
              </header>
              <p className="catch-lede">
                You missed <b><NumberFlow value={13} /></b> messages in 3 channels. Here is what matters.
              </p>
              <ul className="catch-list">
                <AnimatePresence>
                  {catchup.slice(0, summary).map((c) => (
                    <motion.li key={c.jump} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                      <button type="button" onClick={() => open(c.channel, c.jump)}>
                        <span className="catch-chan mono">#{c.channel}</span>
                        <span>{c.text}</span>
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
                {summary < catchup.length && (
                  <li className="catch-wait">
                    <span className="dots"><i /><i /><i /></span> Reading the backlog
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}
