export type DiffLine = {
  old?: number;
  new?: number;
  kind: "ctx" | "add" | "del";
  code: string;
  note?: string;
};

export type Note = {
  id: string;
  severity: "Blocking" | "Risk" | "Nit";
  where: string;
  body: string;
  emphasis: string;
  fix: { after: number; code: string };
  action: string;
};

export type ReviewFile = {
  path: string;
  name: string;
  folder: string;
  added: number;
  removed: number;
  flag?: "blocking" | "risk";
  lines: DiffLine[];
  notes: Note[];
};

export const files: ReviewFile[] = [
  {
    path: "src/jobs/refund.ts",
    name: "refund.ts",
    folder: "src/jobs",
    added: 36,
    removed: 9,
    flag: "blocking",
    lines: [
      {
        old: 31,
        new: 31,
        kind: "ctx",
        code: "export async function runRefund(job: RefundJob) {",
      },
      {
        old: 32,
        kind: "del",
        code: "  const order = await orders.get(job.orderId)",
      },
      {
        new: 32,
        kind: "add",
        code: "  const order = await orders.get(job.orderId, { lock: true })",
      },
      {
        new: 33,
        kind: "add",
        code: "  const amount = job.amount ?? order.total",
      },
      {
        new: 34,
        kind: "add",
        code: "  const result = await gateway.refund(order.paymentId, amount)",
        note: "double",
      },
      {
        old: 33,
        new: 35,
        kind: "ctx",
        code: "  if (result.status === 'failed') {",
      },
      { old: 34, kind: "del", code: "    log.error('refund failed')" },
      {
        new: 36,
        kind: "add",
        code: "    return retryLater(job, { after: minutes(5) })",
        note: "silent",
      },
      { old: 35, new: 37, kind: "ctx", code: "  }" },
      {
        old: 36,
        new: 38,
        kind: "ctx",
        code: "  await ledger.record(order.id, -amount)",
      },
      { old: 37, new: 39, kind: "ctx", code: "}" },
    ],
    notes: [
      {
        id: "double",
        severity: "Blocking",
        where: "refund.ts:34",
        emphasis: "refunds twice",
        body: "A rerun of this job {e}. Return early when the order already has a refund.",
        fix: { after: 33, code: "  if (order.refundedAt) return order.refund" },
        action: "Commit fix",
      },
      {
        id: "silent",
        severity: "Nit",
        where: "refund.ts:36",
        emphasis: "silent",
        body: "Retries are now {e}. Keep one log line with the order id for on-call.",
        fix: {
          after: 35,
          code: "    log.warn('refund retry', { orderId: order.id })",
        },
        action: "Apply",
      },
    ],
  },
  {
    path: "src/jobs/scheduler.ts",
    name: "scheduler.ts",
    folder: "src/jobs",
    added: 12,
    removed: 4,
    lines: [
      {
        old: 12,
        new: 12,
        kind: "ctx",
        code: "export function schedule(job: Job, at: Date) {",
      },
      { old: 13, kind: "del", code: "  queue.push(job, at)" },
      { new: 13, kind: "add", code: "  const key = `${job.type}:${job.id}`" },
      {
        new: 14,
        kind: "add",
        code: "  queue.push(job, at, { dedupeKey: key })",
      },
      { old: 14, new: 15, kind: "ctx", code: "}" },
    ],
    notes: [],
  },
  {
    path: "src/jobs/worker.ts",
    name: "worker.ts",
    folder: "src/jobs",
    added: 3,
    removed: 3,
    lines: [
      {
        old: 40,
        new: 40,
        kind: "ctx",
        code: "worker.on('job', async (job) => {",
      },
      { old: 41, kind: "del", code: "  await handlers[job.type](job)" },
      {
        new: 41,
        kind: "add",
        code: "  await withTimeout(handlers[job.type](job), seconds(30))",
      },
      { old: 42, new: 42, kind: "ctx", code: "})" },
    ],
    notes: [],
  },
  {
    path: "src/ledger/entries.ts",
    name: "entries.ts",
    folder: "src/ledger",
    added: 8,
    removed: 1,
    flag: "risk",
    lines: [
      {
        old: 8,
        new: 8,
        kind: "ctx",
        code: "export async function record(orderId: string, cents: number) {",
      },
      {
        old: 9,
        kind: "del",
        code: "  return db.entries.insert({ orderId, cents })",
      },
      {
        new: 9,
        kind: "add",
        code: "  const total = await sumFor(orderId)",
        note: "race",
      },
      {
        new: 10,
        kind: "add",
        code: "  return db.entries.insert({ orderId, cents, total: total + cents })",
      },
      { old: 10, new: 11, kind: "ctx", code: "}" },
    ],
    notes: [
      {
        id: "race",
        severity: "Risk",
        where: "entries.ts:9",
        emphasis: "race",
        body: "Two refunds at once can {e} on this total. Hold a lock on the order while you read and write.",
        fix: {
          after: 8,
          code: "  await using lock = await db.lock(`ledger:${orderId}`)",
        },
        action: "Commit fix",
      },
    ],
  },
  {
    path: "src/ledger/balance.ts",
    name: "balance.ts",
    folder: "src/ledger",
    added: 19,
    removed: 0,
    lines: [
      {
        new: 1,
        kind: "add",
        code: "export function balance(entries: Entry[]) {",
      },
      {
        new: 2,
        kind: "add",
        code: "  return entries.reduce((sum, e) => sum + e.cents, 0)",
      },
      { new: 3, kind: "add", code: "}" },
    ],
    notes: [],
  },
  {
    path: "test/refund.test.ts",
    name: "refund.test.ts",
    folder: "test",
    added: 52,
    removed: 0,
    lines: [
      {
        new: 1,
        kind: "add",
        code: "test('a second run does not refund again', async () => {",
      },
      { new: 2, kind: "add", code: "  await runRefund(job)" },
      { new: 3, kind: "add", code: "  await runRefund(job)" },
      {
        new: 4,
        kind: "add",
        code: "  expect(gateway.refund).toHaveBeenCalledTimes(1)",
      },
      { new: 5, kind: "add", code: "})" },
    ],
    notes: [],
  },
];

export const strictness = {
  quiet: { label: "Quiet", notes: ["Blocking"], count: 1 },
  balanced: { label: "Balanced", notes: ["Blocking", "Risk"], count: 2 },
  thorough: { label: "Thorough", notes: ["Blocking", "Risk", "Nit"], count: 3 },
} as const;
