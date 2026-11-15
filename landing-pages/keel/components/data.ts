export type Status = "backlog" | "todo" | "progress" | "review" | "done";
export type Priority = 0 | 1 | 2 | 3 | 4;

export const statusOrder: Status[] = ["progress", "review", "todo", "backlog", "done"];
export const statusLabel: Record<Status, string> = {
  backlog: "Backlog",
  todo: "Todo",
  progress: "In progress",
  review: "In review",
  done: "Done",
};
/** Where a click on the status circle sends an issue next. */
export const nextStatus: Record<Status, Status> = {
  backlog: "todo",
  todo: "progress",
  progress: "review",
  review: "done",
  done: "todo",
};
export const priorityLabel = ["No priority", "Low", "Medium", "High", "Urgent"];

export const people = {
  AM: { name: "Ana Moretti", color: "#f59e0b" },
  JK: { name: "Jonas Keller", color: "#10b981" },
  SP: { name: "Sofia Park", color: "#ec4899" },
  RD: { name: "Ravi Desai", color: "#3b82f6" },
  LT: { name: "Lea Tran", color: "#8b5cf6" },
} as const;
export type Person = keyof typeof people;
export const ME: Person = "LT";

export type Issue = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  label: "Bug" | "Feature" | "Polish" | "Infra";
  assignee: Person;
  project: string;
  estimate: number;
};

export const issues: Issue[] = [
  { id: "HAL-214", title: "Coupon field keeps the pay button disabled", status: "progress", priority: 4, label: "Bug", assignee: "AM", project: "Checkout v3", estimate: 2 },
  { id: "HAL-219", title: "Offline queue for comments on mobile", status: "progress", priority: 3, label: "Feature", assignee: "LT", project: "Mobile offline", estimate: 5 },
  { id: "HAL-207", title: "Saved cards on the new checkout", status: "review", priority: 3, label: "Feature", assignee: "SP", project: "Checkout v3", estimate: 3 },
  { id: "HAL-221", title: "Search results flicker on slow networks", status: "todo", priority: 2, label: "Bug", assignee: "SP", project: "Search rewrite", estimate: 2 },
  { id: "HAL-225", title: "Empty states for the billing portal", status: "todo", priority: 1, label: "Polish", assignee: "LT", project: "Billing portal", estimate: 1 },
  { id: "HAL-226", title: "Move image resizing to the edge", status: "todo", priority: 2, label: "Infra", assignee: "RD", project: "Search rewrite", estimate: 3 },
  { id: "HAL-230", title: "Dark mode tokens for charts", status: "backlog", priority: 1, label: "Polish", assignee: "JK", project: "Design tokens 2.0", estimate: 2 },
  { id: "HAL-198", title: "Retry failed webhooks with backoff", status: "done", priority: 3, label: "Infra", assignee: "RD", project: "Billing portal", estimate: 3 },
  { id: "HAL-202", title: "Address autocomplete on checkout", status: "done", priority: 2, label: "Feature", assignee: "AM", project: "Checkout v3", estimate: 2 },
];

/** Issues the "New issue" button and the C key create, in order. */
export const drafts: Omit<Issue, "id" | "status">[] = [
  { title: "Keyboard cheat sheet in the help menu", priority: 1, label: "Polish", assignee: "LT", project: "Design tokens 2.0", estimate: 1 },
  { title: "Push notification when a sync fails", priority: 2, label: "Feature", assignee: "JK", project: "Mobile offline", estimate: 2 },
  { title: "Invoice PDF misses the VAT number", priority: 3, label: "Bug", assignee: "RD", project: "Billing portal", estimate: 1 },
  { title: "Prefetch the next page of results", priority: 2, label: "Infra", assignee: "SP", project: "Search rewrite", estimate: 2 },
];

export const projects = [
  { name: "Checkout v3", start: 0, len: 6, progress: 64, lead: "AM" as Person, color: "#6d5cff",
    milestones: ["Saved cards", "Coupons", "Launch to 10%"] },
  { name: "Mobile offline", start: 2, len: 7, progress: 38, lead: "LT" as Person, color: "#0ea5e9",
    milestones: ["Local store", "Sync queue", "Conflict UI"] },
  { name: "Search rewrite", start: 1, len: 5, progress: 52, lead: "SP" as Person, color: "#f59e0b",
    milestones: ["New index", "Typo tolerance", "Rollout"] },
  { name: "Billing portal", start: 4, len: 5, progress: 21, lead: "RD" as Person, color: "#10b981",
    milestones: ["Invoices", "Plan changes", "Tax IDs"] },
  { name: "Design tokens 2.0", start: 6, len: 4, progress: 8, lead: "JK" as Person, color: "#ec4899",
    milestones: ["Audit", "Charts", "Dark mode"] },
];
export const weeks = ["Nov 2", "Nov 9", "Nov 16", "Nov 23", "Nov 30", "Dec 7", "Dec 14", "Dec 21", "Dec 28", "Jan 4", "Jan 11"];

export const inbox = [
  { id: "n1", who: "JK" as Person, text: "mentioned you on HAL-219", detail: "“Can the queue survive an app restart?”", time: "4m" },
  { id: "n2", who: "SP" as Person, text: "moved HAL-207 to In review", detail: "Saved cards on the new checkout", time: "22m" },
  { id: "n3", who: "AM" as Person, text: "assigned you HAL-225", detail: "Empty states for the billing portal", time: "1h" },
  { id: "n4", who: "RD" as Person, text: "closed HAL-198", detail: "Retry failed webhooks with backoff", time: "3h" },
];

/** Cycle 24, ten working days. Completed points before today's work. */
export const cycle = {
  name: "Cycle 24",
  range: "Nov 2 – Nov 13",
  scope: [30, 30, 32, 32, 33, 34, 34, 35, 35, 36],
  done: [2, 4, 7, 9, 12, 15, 17],
};
