"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Sparkles,
  Map,
  X,
  RotateCcw,
  Download,
  DoorOpen,
  Eye,
  Bell,
  CirclePause,
  CirclePlay,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { chapters, clamp, smooth } from "@/lib/journey";
import { HouseAudio } from "./audio";
import type { HouseState } from "./house";
const House = dynamic(() => import("./house").then((m) => m.House), {
  ssr: false,
});
const offerings = ["Amber", "Moss", "Violet"];
const windows = [
  [0, 0.13],
  [0.19, 0.32],
  [0.37, 0.49],
  [0.55, 0.66],
  [0.73, 0.85],
  [0.92, 1],
];
export function Experience() {
  const [ready, setReady] = useState(false),
    [loaded, setLoaded] = useState(0),
    [fallback, setFallback] = useState(false),
    [guide, setGuide] = useState(false),
    [sound, setSound] = useState(false),
    [paused, setPaused] = useState(false),
    [reduced, setReduced] = useState(false),
    [active, setActive] = useState(0),
    [revealed, setRevealed] = useState(false),
    [offering, setOffering] = useState(-1),
    [ending, setEnding] = useState(false);
  const journey = useRef<HTMLElement>(null),
    panels = useRef<(HTMLElement | null)[]>([]),
    meter = useRef<HTMLDivElement>(null),
    audio = useRef<HouseAudio | null>(null);
  const state = useRef<HouseState>({
    progress: 0,
    paused: false,
    reduced: false,
    knock: 0,
    reveal: false,
    offering: -1,
    pointer: [0, 0],
  });
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => {
    setFallback(true);
    setReady(true);
  }, []);
  const onLoad = useCallback((n: number) => setLoaded(n), []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(media.matches);
      state.current.reduced = media.matches;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    audio.current = new HouseAudio();
    return () => audio.current?.dispose();
  }, []);
  useEffect(() => {
    const visibility = () => {
      if (document.hidden) audio.current?.disable();
      else if (sound) void audio.current?.enable().catch(() => setSound(false));
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [sound]);
  useEffect(() => {
    const previous = document.body.style.overflow;
    if (!ready) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [ready]);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!journey.current) return;
      const range = journey.current.offsetHeight - innerHeight;
      const p = clamp(scrollY / range);
      state.current.progress = p;
      let closest = 0;
      chapters.forEach((c, i) => {
        if (p > c.progress - 0.06) closest = i;
      });
      setActive(closest);
      meter.current?.style.setProperty("--progress", String(p));
      panels.current.forEach((el, i) => {
        if (!el) return;
        const [start, end] = windows[i];
        const opacity =
          (i === 0 ? 1 : smooth(start - 0.045, start, p)) *
          (i === 5 ? 1 : 1 - smooth(end, end + 0.045, p));
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0,${reduced ? 0 : (1 - opacity) * (p > end ? -18 : 18)}px,0)`;
        el.inert = opacity < 0.5;
        el.setAttribute("aria-hidden", opacity < 0.5 ? "true" : "false");
        el.style.visibility = opacity > 0.001 ? "visible" : "hidden";
      });
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const pointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse")
        state.current.pointer = [
          (e.clientX / innerWidth) * 2 - 1,
          (e.clientY / innerHeight) * 2 - 1,
        ];
    };
    const reset = () => {
      state.current.pointer = [0, 0];
    };
    update();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", reset);
    };
  }, [reduced]);
  const go = (index: number) => {
    setGuide(false);
    if (index < 5) setEnding(false);
    const h = journey.current?.offsetHeight ?? innerHeight;
    window.scrollTo({
      top: chapters[index].progress * (h - innerHeight),
      behavior: reduced ? "instant" : "smooth",
    });
  };
  const toggleSound = async () => {
    if (sound) {
      audio.current?.disable();
      setSound(false);
      toast("The house falls silent.");
    } else {
      try {
        await audio.current?.enable();
        setSound(true);
        toast("Sound is on. Listen closely.");
      } catch {
        toast("Sound could not start. You can still explore.");
      }
    }
  };
  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    state.current.paused = next;
    toast(next ? "Ambient animations paused." : "Ambient animations resumed.");
  };
  const knock = () => {
    state.current.knock += 1;
    audio.current?.chime();
    toast("Someone on the other side knocked back.");
  };
  const choose = (index: number) => {
    setOffering(index);
    state.current.offering = index;
    audio.current?.chime();
  };
  const keepTicket = () => {
    const gift = offering < 0 ? "Amber light" : offerings[offering] + " light";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="600" viewBox="0 0 1000 600"><rect width="1000" height="600" fill="#151d16"/><rect x="35" y="35" width="930" height="530" rx="4" fill="none" stroke="#b89667"/><text x="500" y="125" text-anchor="middle" fill="#e8d7b7" font-family="Georgia" font-size="90">HOLLOW</text><text x="500" y="185" text-anchor="middle" fill="#b89667" font-family="monospace" font-size="18">THE HOUSE AT NO. 13 · HALLOWEEN</text><path d="M450 350V280a50 50 0 0 1 100 0v70Z" fill="none" stroke="#b89667" stroke-width="3"/><text x="500" y="417" text-anchor="middle" fill="#e8d7b7" font-family="Georgia" font-size="40">The house remembers you.</text><text x="500" y="468" text-anchor="middle" fill="#b89667" font-family="monospace" font-size="20">YOUR LIGHT: ${gift.toUpperCase()}</text><text x="500" y="535" text-anchor="middle" fill="#b89667" font-family="monospace" font-size="14">An original experience by LN · lndev.me</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "hollow-admit-one.svg";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Your keepsake is ready.");
  };
  return (
    <>
      <a className="skip-link" href="#house-story" onClick={() => go(1)}>
        Skip the introduction
      </a>
      <div className={`world ${fallback ? "is-fallback" : ""}`}>
        {!fallback && (
          <House
            state={state}
            onReady={onReady}
            onError={onError}
            onLoad={onLoad}
          />
        )}
        {fallback && (
          <div className="fallback-art" aria-hidden="true">
            <div className="fallback-moon" />
            <div className="fallback-door">
              <span>13</span>
            </div>
          </div>
        )}
        <div className="atmosphere" />
        <div className="film-grain" />
      </div>
      <header className="header">
        <a
          className="wordmark"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go(0);
          }}
          aria-label="Hollow, back to the front door"
        >
          <span className="door-glyph" />
          hollow<span className="wordmark-dot">13</span>
        </a>
        <span className="header-caption">
          A HOUSE. A NIGHT. <span>A VERY BAD IDEA.</span>
        </span>
        <div className="header-actions">
          <Button
            variant="unstyled"
            className="icon-button"
            onClick={toggleSound}
            aria-label={sound ? "Turn sound off" : "Turn sound on"}
            aria-pressed={sound}
          >
            {sound ? <Volume2 /> : <VolumeX />}
          </Button>
          <Button
            variant="unstyled"
            className="guide-trigger"
            onClick={() => setGuide(true)}
          >
            <Map size={16} />
            <span>House guide</span>
          </Button>
        </div>
      </header>
      <main
        id="house-story"
        className="journey"
        ref={journey}
        aria-label="A Halloween journey through six rooms"
      >
        <section
          ref={(el) => {
            panels.current[0] = el;
          }}
          className="story-panel arrival"
          aria-label="The invitation"
        >
          <div className="hero-title">
            <p className="eyebrow">
              <span /> October 31 · You are expected <span />
            </p>
            <h1>HOLLOW</h1>
            <div className="hero-subline">
              <span>THE HOUSE AT NO. 13</span>
              <span>EST. 1893 — STILL OCCUPIED</span>
            </div>
          </div>
          <div className="hero-bottom">
            <div>
              <h2>
                Some houses
                <br />
                <i>remember you.</i>
              </h2>
              <p>
                One night. Five rooms.
                <br />
                Come in. We saved you a place.
              </p>
            </div>
            <Button className="enter-button" onClick={() => go(1)}>
              <span>Cross the threshold</span>
              <ArrowDown />
            </Button>
            <div className="hero-aside">
              <span className="small-star">✳︎</span>
              <p>
                An invitation to
                <br />
                the other side.
              </p>
              <span className="eyebrow">SCROLL TO STEP INSIDE</span>
            </div>
          </div>
        </section>
        <section
          ref={(el) => {
            panels.current[1] = el;
          }}
          className="story-panel threshold"
          aria-label="An open door"
        >
          <div className="chapter-heading">
            <span className="eyebrow">01 / THE THRESHOLD</span>
            <h2>
              It wasn’t
              <br />
              <i>the wind.</i>
            </h2>
          </div>
          <article className="invitation">
            <span className="eyebrow">A NOTE LEFT FOR YOU</span>
            <h3>Dear stranger,</h3>
            <p>
              We’ve been expecting someone.
              <br />
              You’ll do beautifully.
            </p>
            <p>
              Leave your sensible explanations
              <br />
              at the door. And please,
              <br />
              don’t count the shadows.
            </p>
            <div className="signature">The residents</div>
            <span className="wax-seal">13</span>
          </article>
          <div className="scene-bottom">
            <p>The latch turns before you touch it.</p>
            <Button variant="outline" onClick={knock}>
              <Bell size={16} /> Knock, just to be polite
            </Button>
          </div>
        </section>
        <section
          ref={(el) => {
            panels.current[2] = el;
          }}
          className="story-panel gallery"
          aria-label="Family secrets"
        >
          <div className="gallery-title">
            <span className="eyebrow">02 / THE FAMILY GALLERY</span>
            <h2>
              A familiar face.
              <br />
              <i>Not necessarily yours.</i>
            </h2>
          </div>
          <div className="gallery-note">
            <span className="catalogue-number">Fig. 013</span>
            <p>
              The family hasn’t sat for a portrait
              <br />
              in a hundred years.
              <br />
              They still like to look their best.
            </p>
            <Button
              variant="outline"
              aria-pressed={revealed}
              onClick={() => {
                setRevealed(!revealed);
                state.current.reveal = !revealed;
              }}
            >
              <Eye size={16} />
              {revealed ? "They see you now" : "Look a little closer"}
            </Button>
          </div>
          <p className="room-whisper">“Have we met before?”</p>
        </section>
        <section
          ref={(el) => {
            panels.current[3] = el;
          }}
          className="story-panel banquet"
          aria-label="The extra guest"
        >
          <div className="banquet-label">
            <span className="eyebrow">03 / DINNER IS SERVED</span>
            <h2>
              There’s always
              <br />
              room for <i>one more.</i>
            </h2>
          </div>
          <div className="menu-paper">
            <span className="eyebrow">TONIGHT’S MENU</span>
            <p>A little suspense</p>
            <span>followed by</span>
            <p>Unfinished business</p>
            <span>and, to finish</span>
            <p>Your just desserts</p>
            <div className="menu-rule" />
            <small>Dress code: living, preferably.</small>
          </div>
          <div className="scene-bottom">
            <p>Your host has been dying to meet you.</p>
            <Button
              variant="outline"
              onClick={() => {
                state.current.knock += 1;
                audio.current?.chime();
                toast("Compliments of the ghost.");
              }}
            >
              <Bell size={16} /> Ring for your host
            </Button>
          </div>
        </section>
        <section
          ref={(el) => {
            panels.current[4] = el;
          }}
          className="story-panel offering"
          aria-label="The moon garden"
        >
          <div className="offering-title">
            <span className="eyebrow">04 / THE MOON GARDEN</span>
            <h2>
              Even here,
              <br />
              <i>something grows.</i>
            </h2>
            <p>
              Past the locked rooms, a garden waits.
              <br />
              Choose a light. It will show you the way.
            </p>
          </div>
          <div
            className="offering-choices"
            role="group"
            aria-label="Choose your lantern light"
          >
            {offerings.map((label, i) => (
              <Button
                variant="unstyled"
                className={`offering-choice ${offering === i ? "is-chosen" : ""}`}
                key={label}
                aria-pressed={offering === i}
                onClick={() => choose(i)}
              >
                <span>0{i + 1}</span>
                <Sparkles />
                <strong>{label}</strong>
                <small>
                  {offering === i ? "YOUR LIGHT" : "LIGHT THE WAY"}
                  <ArrowUpRight size={14} />
                </small>
              </Button>
            ))}
          </div>
          <p className="offering-answer" role="status">
            {offering >= 0
              ? `${offerings[offering]} light. A little warmth for the way home.`
              : "A small light can change the whole room."}
          </p>
        </section>
        <section
          ref={(el) => {
            panels.current[5] = el;
          }}
          className={`story-panel departure ${ending ? "is-finished" : ""}`}
          aria-label="Until next time"
        >
          {!ending ? (
            <div className="exit-prompt">
              <span className="eyebrow">05 / THE WAY OUT</span>
              <h2>
                Take the light
                <br />
                <i>with you.</i>
              </h2>
              <p>The garden gate is open. Morning is finding its way in.</p>
              <Button
                className="enter-button"
                onClick={() => {
                  setEnding(true);
                  audio.current?.chime();
                }}
              >
                <DoorOpen size={19} /> Step into the morning
              </Button>
            </div>
          ) : (
            <div className="end-card">
              <div className="ticket-top">
                <span>HOLLOW / NO. 13</span>
                <span>ADMIT ONE LIVING SOUL</span>
              </div>
              <div className="ticket-body">
                <span className="door-glyph" />
                <p className="eyebrow">YOU MADE IT OUT. MOSTLY.</p>
                <h2>
                  Until
                  <br />
                  <i>next October.</i>
                </h2>
                <p>
                  You carried home{" "}
                  {offering < 0
                    ? "amber light"
                    : offerings[offering].toLowerCase() + " light"}
                  .<br />
                  Some things are worth bringing back.
                </p>
                <Button variant="outline" onClick={keepTicket}>
                  <Download size={16} /> Keep your invitation
                </Button>
              </div>
              <div className="ticket-bottom">
                <span>31 OCT / AFTER DARK</span>
                <Button variant="unstyled" onClick={() => go(0)}>
                  <RotateCcw size={14} /> Dare to return?
                </Button>
              </div>
              <div className="end-credits">
                <span>
                  Created by{" "}
                  <a href="https://lndev.me" target="_blank" rel="noreferrer">
                    LN
                  </a>
                </span>
                <a
                  href="https://github.com/ln-dev7/landing-pages"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open source · MIT
                </a>
                <a
                  href="https://lndev.mychariow.shop/prd_3cu1s0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support the project ↗
                </a>
              </div>
            </div>
          )}
        </section>
      </main>
      <aside className="journey-rail" aria-label="Journey progress">
        <span>{chapters[active].number}</span>
        <div className="rail-line" ref={meter}>
          <span />
        </div>
        <span>05</span>
      </aside>
      <div className="bottom-bar">
        <span>{chapters[active].label}</span>
        <div>
          <Button
            variant="unstyled"
            className="icon-button"
            aria-label={
              paused ? "Resume ambient animations" : "Pause ambient animations"
            }
            aria-pressed={!paused}
            onClick={toggleMotion}
          >
            {paused ? <CirclePlay size={17} /> : <CirclePause size={17} />}
          </Button>
          <span className="bottom-hint">
            {active === 5
              ? "THE HOUSE REMEMBERS"
              : "KEEP GOING. IT’S ONLY A HOUSE."}
          </span>
        </div>
      </div>
      <Sheet open={guide} onOpenChange={setGuide}>
        <SheetContent showCloseButton={false} className="house-guide">
          <div className="guide-top">
            <span className="eyebrow">PLEASE DON’T GET LOST</span>
            <Button
              variant="unstyled"
              className="icon-button"
              aria-label="Close house guide"
              onClick={() => setGuide(false)}
            >
              <X />
            </Button>
          </div>
          <SheetTitle>
            The house
            <br />
            <i>has its ways.</i>
          </SheetTitle>
          <SheetDescription>
            Follow the scroll, or choose a room. Nothing here can hurt you.
            Probably.
          </SheetDescription>
          <nav aria-label="Rooms" className="room-map">
            {chapters.map((c, i) => (
              <Button
                key={c.id}
                variant="unstyled"
                className={active === i ? "current-room" : ""}
                onClick={() => go(i)}
              >
                <span>{c.number}</span>
                <strong>{c.label}</strong>
                <ArrowUpRight size={18} />
              </Button>
            ))}
          </nav>
          <div className="guide-details">
            <p>
              An original fictional Halloween experience. No jump scares. Sound
              is optional. Built with Next.js, Three.js and customized
              shadcn/ui.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFallback(!fallback);
                setReady(!fallback);
                if (fallback) setLoaded(0);
                setGuide(false);
              }}
            >
              {fallback
                ? "Return to the 3D house"
                : "Use the lightweight illustrated version"}
            </Button>
            <p>
              Developed by <a href="https://lndev.me">LN</a>.<br />
              <a href="https://github.com/ln-dev7/landing-pages">
                Open-source code · MIT
              </a>{" "}
              ·{" "}
              <a href="https://lndev.mychariow.shop/prd_3cu1s0">
                Support the project
              </a>
            </p>
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={`house-loader ${ready ? "is-ready" : ""}`}
        aria-hidden={ready}
        inert={ready}
      >
        <span className="eyebrow">THE HOUSE AT NO. 13</span>
        <div className="loader-door">
          <div />
          <span>13</span>
        </div>
        <p>
          {loaded < 0.4
            ? "Lighting the candles…"
            : loaded < 0.9
              ? "Waking the residents…"
              : "Opening the door…"}
        </p>
        <div className="loader-line">
          <span style={{ transform: `scaleX(${loaded})` }} />
        </div>
        <span className="eyebrow" role="status">
          {Math.round(loaded * 100)} / 100
        </span>
        <Button variant="unstyled" className="loader-skip" onClick={onError}>
          Enter without 3D
        </Button>
      </div>
      <Toaster />
    </>
  );
}
