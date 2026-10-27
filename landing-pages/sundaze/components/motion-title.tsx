"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
export function MotionTitle({
  lines,
  as: Tag = "h2",
  id,
}: {
  lines: { text: string; outline?: boolean; accent?: boolean }[];
  as?: "h1" | "h2";
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let index = 0;
  return (
    <Tag
      ref={ref}
      id={id}
      className={`motion-title ${entered ? "words-entered" : ""}`}
      aria-label={lines.map((l) => l.text).join(" ")}
    >
      {lines.map((line, i) => (
        <span
          aria-hidden="true"
          className={`motion-line ${line.outline ? "line-outline" : ""} ${line.accent ? "line-accent" : ""}`}
          key={i}
        >
          {line.text.split(" ").map((word, j) => (
            <span className="word-mask" key={j}>
              <span
                className="word-body"
                style={
                  {
                    "--word-delay": `${Math.min(index++ * 65, 280)}ms`,
                  } as CSSProperties
                }
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
