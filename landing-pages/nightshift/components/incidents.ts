export type Kind = "alert" | "agent" | "cmd" | "out" | "chart" | "ok" | "warn";
export type Line = { kind: Kind; text: string; chart?: number[] };

export type Incident = {
  id: string;
  name: string;
  service: string;
  severity: "SEV1" | "SEV2" | "SEV3";
  start: string;
  intro: Line[];
  question: string;
  yes: Line[];
  no: Line[];
};

export const incidents: Incident[] = [
  {
    id: "latency",
    name: "api-latency",
    service: "api-gateway",
    severity: "SEV1",
    start: "02:14",
    intro: [
      {
        kind: "alert",
        text: "p95 latency on api-gateway is 2.4 s (SLO 400 ms)",
      },
      { kind: "agent", text: "On it. Pulling the last hour of metrics." },
      { kind: "cmd", text: "query p95(api-gateway) --last 1h" },
      {
        kind: "chart",
        text: "p95 ms",
        chart: [180, 175, 190, 185, 180, 182, 178, 640, 1300, 1900, 2250, 2400],
      },
      {
        kind: "agent",
        text: "It started at 02:09, two minutes after deploy v412 went out.",
      },
      { kind: "cmd", text: "diff deploy v411..v412 --config" },
      { kind: "out", text: "- db.pool.size: 40\n+ db.pool.size: 4" },
      {
        kind: "agent",
        text: "Found it. v412 cut the database pool from 40 to 4. Requests are queueing.",
      },
    ],
    question: "Roll back api-gateway to v411?",
    yes: [
      { kind: "cmd", text: "deploy rollback api-gateway --to v411" },
      { kind: "out", text: "✓ rollback complete in 38 s · 12/12 pods healthy" },
      {
        kind: "chart",
        text: "p95 ms",
        chart: [2400, 2300, 1600, 900, 420, 230, 190, 185, 180, 178, 182, 180],
      },
      {
        kind: "ok",
        text: "p95 is back to 180 ms. Incident closed in 4 min. Postmortem draft is in #incidents.",
      },
    ],
    no: [
      {
        kind: "warn",
        text: "Holding. I paged Maya (secondary) with the diff and both graphs attached.",
      },
      {
        kind: "agent",
        text: "I'll keep watching and post every five minutes until she's on.",
      },
    ],
  },
  {
    id: "disk",
    name: "disk-full",
    service: "db-replica-2",
    severity: "SEV2",
    start: "03:41",
    intro: [
      { kind: "alert", text: "disk usage on db-replica-2 is 94% and rising" },
      { kind: "agent", text: "Checking what grew." },
      { kind: "cmd", text: "du -sh /var/* --sort" },
      {
        kind: "out",
        text: "41G  /var/log/postgres   ← +30G in 6 h\n 6G  /var/lib/postgres\n 1G  /var/tmp",
      },
      {
        kind: "agent",
        text: "Slow-query logging was left at debug after Tuesday's investigation.",
      },
    ],
    question: "Rotate the logs and set logging back to warn?",
    yes: [
      {
        kind: "cmd",
        text: "logs rotate db-replica-2 && pg config set log_min_duration 500ms",
      },
      { kind: "out", text: "✓ freed 29G · disk at 61%" },
      {
        kind: "chart",
        text: "disk %",
        chart: [62, 70, 78, 85, 90, 94, 94, 61, 61, 61, 61, 61],
      },
      {
        kind: "ok",
        text: "Disk is stable. I added a check so debug logging can't stay on for more than a day.",
      },
    ],
    no: [
      {
        kind: "warn",
        text: "Understood. Disk fills in about 3 h at this rate. I set a reminder at 85% free space left.",
      },
    ],
  },
  {
    id: "noise",
    name: "checkout-5xx",
    service: "checkout",
    severity: "SEV3",
    start: "05:02",
    intro: [
      { kind: "alert", text: "5xx rate on checkout is 1.2% (threshold 1%)" },
      { kind: "agent", text: "First, are real customers affected?" },
      {
        kind: "cmd",
        text: "query errors(checkout) --group-by client --last 30m",
      },
      {
        kind: "out",
        text: "bot-scraper-77     98.1%\nweb                 1.4%\nios                 0.5%",
      },
      {
        kind: "agent",
        text: "One scraper is hammering a retired endpoint. Customer error rate is 0.02%. Nobody needs to wake up.",
      },
    ],
    question:
      "Rate-limit the scraper and teach this alert to ignore known bots?",
    yes: [
      {
        kind: "cmd",
        text: "ratelimit add bot-scraper-77 --rps 1 && alert tune checkout-5xx --exclude bots",
      },
      { kind: "out", text: "✓ rule active · alert updated" },
      {
        kind: "ok",
        text: "Quiet again. That's one 5 a.m. page nobody will get next time.",
      },
    ],
    no: [
      {
        kind: "warn",
        text: "Leaving it. I'll mention it in the morning summary instead of paging anyone.",
      },
    ],
  },
];

const blocks = "▁▂▃▄▅▆▇█";
export function spark(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values
    .map(
      (v) =>
        blocks[
          Math.round(((v - min) / (max - min || 1)) * (blocks.length - 1))
        ],
    )
    .join("");
}
