export type AppId = "tips" | "members" | "shop" | "bookings" | "courses" | "letters";

export type App = {
  id: AppId;
  name: string;
  goal: string;
  line: string;
  /** Tile gradient, light to dark. */
  tile: [string, string];
  /** Halftone inks for this app, light to dark. */
  inks: string[];
  /** Soft wash behind the halftone. */
  wash: string;
};

export const apps: App[] = [
  {
    id: "tips",
    name: "Tips",
    goal: "turn a like into a thank-you",
    line: "Let fans send a one-off tip with a note, in two taps.",
    tile: ["#ffd76a", "#f2a516"],
    inks: ["#fde6a3", "#f6c445", "#e09a12", "#a66406"],
    wash: "#fff7e3",
  },
  {
    id: "members",
    name: "Memberships",
    goal: "earn every month, not once",
    line: "Monthly tiers with perks your supporters can see.",
    tile: ["#b9a4ff", "#6a4ff0"],
    inks: ["#ddd3ff", "#a893ff", "#6f55f0", "#4229b8"],
    wash: "#f3f0ff",
  },
  {
    id: "shop",
    name: "Shop",
    goal: "sell what you make",
    line: "Physical goods and downloads, on the page fans already visit.",
    tile: ["#8be3b6", "#19a76a"],
    inks: ["#c7f1da", "#6fd6a2", "#1ea86b", "#0c6e43"],
    wash: "#ecfbf3",
  },
  {
    id: "bookings",
    name: "Bookings",
    goal: "sell your time",
    line: "Paid calls and lessons, with the calendar handled for you.",
    tile: ["#8fd2ff", "#2a8fe6"],
    inks: ["#cdebff", "#7cc4fb", "#2f8fe4", "#145ca8"],
    wash: "#edf7ff",
  },
  {
    id: "courses",
    name: "Courses",
    goal: "teach what you know",
    line: "Lessons people can follow at their own pace.",
    tile: ["#ffab8a", "#ef5b3a"],
    inks: ["#ffd8c8", "#ffa07e", "#ef5f3e", "#b23519"],
    wash: "#fff1eb",
  },
  {
    id: "letters",
    name: "Letters",
    goal: "keep fans close",
    line: "A newsletter that knows who supports you.",
    tile: ["#ff9fcf", "#e0408f"],
    inks: ["#ffd4ea", "#ff9fcd", "#e2479a", "#a51c63"],
    wash: "#fff0f7",
  },
];

export const creator = {
  name: "Lina Ortiz",
  handle: "@lina.makes",
  craft: "Ceramics studio in Lisbon",
  fans: 18420,
};

export const tipAmounts = [
  { amount: 3, label: "A coffee" },
  { amount: 5, label: "A glaze test" },
  { amount: 10, label: "A kiln firing" },
];

export const tiers = [
  { id: "fan", name: "Fan", price: 4, perks: ["Monthly studio diary", "Name on the supporters wall"] },
  { id: "studio", name: "Studio", price: 9, perks: ["Everything in Fan", "Early access to new pieces", "Glaze recipes"], tag: "Most chosen" },
  { id: "patron", name: "Patron", price: 25, perks: ["Everything in Studio", "One signed piece a year", "Live firing nights"] },
];

export const products = [
  { id: "mug", name: "Speckled mug", price: 34, tone: "#e9dccb", glaze: "#8a6d52" },
  { id: "vase", name: "Moon vase", price: 72, tone: "#dfe5e8", glaze: "#5a7487" },
  { id: "plate", name: "Salt plate", price: 28, tone: "#ece8df", glaze: "#9c8b70" },
];

export const days = [
  { id: "thu", d: "Thu", n: 19 },
  { id: "fri", d: "Fri", n: 20 },
  { id: "sat", d: "Sat", n: 21 },
  { id: "mon", d: "Mon", n: 23 },
];
export const slots = ["10:00", "11:30", "14:00", "16:30"];

export const lessons = [
  { t: "Wedging and centring", m: 12 },
  { t: "Pulling your first walls", m: 18 },
  { t: "Trimming a foot ring", m: 15 },
  { t: "Glazing without drips", m: 21 },
  { t: "Your first firing", m: 16 },
];

export const issues = [
  { n: 42, t: "The kiln cracked. Here is what I learned.", d: "Nov 12", opens: "71%" },
  { n: 41, t: "Three glazes that never fail", d: "Nov 5", opens: "68%" },
  { n: 40, t: "Inside the new studio", d: "Oct 29", opens: "64%" },
];

export const stories = [
  {
    who: "Noor Haddad",
    what: "Illustrator · 41k followers",
    quote: "Memberships replaced my client work in eight months.",
    stat: 6200,
    unit: "$ a month",
    app: "members" as AppId,
  },
  {
    who: "Dario Ferri",
    what: "Synth tutorials · 12k subscribers",
    quote: "My course paid for itself before I finished recording it.",
    stat: 412,
    unit: "students in week one",
    app: "courses" as AppId,
  },
  {
    who: "Mei Tanaka",
    what: "Plant care · 88k followers",
    quote: "Tips used to be awkward. Now people tip with a note and I answer every one.",
    stat: 3.4,
    unit: "× more tips than before",
    app: "tips" as AppId,
  },
];

export const updates = [
  { t: "Gift a membership", d: "Fans can now buy a month of any tier for a friend, with a card you design.", app: "members" as AppId, date: "November 13, 2026" },
  { t: "Tip goals on your page", d: "Show a progress bar for the next thing your tips will pay for.", app: "tips" as AppId, date: "November 12, 2026" },
  { t: "Buffer time between calls", d: "Add a short break after each booking so calls never run back to back.", app: "bookings" as AppId, date: "November 10, 2026" },
  { t: "Send a letter to one tier", d: "Write to your Patrons only, or to everyone who bought from the shop.", app: "letters" as AppId, date: "November 7, 2026" },
];

export const agents = [
  { name: "Inès", init: "IN", tone: "#ffd76a", open: 3 },
  { name: "Tomás", init: "TO", tone: "#8fd2ff", open: 5 },
  { name: "Amara", init: "AM", tone: "#ff9fcf", open: 4 },
];

export const faqs = [
  { q: "Is Kudo a real product?", a: "No. Kudo is a fictional product made for this landing page. The creators, numbers and prices are invented, and nothing you do here is saved." },
  { q: "Do I need all six apps?", a: "No. Each app works on its own. Start with Tips, add Memberships later, and switch any app off without losing your page." },
  { q: "What does Kudo take?", a: "On this imagined plan, nothing on tips and 5% on everything else. Payment fees from the card network still apply." },
  { q: "Can fans pay in their own currency?", a: "Yes. Prices show in the fan's currency and you get paid in yours." },
  { q: "Can I move my supporters from another platform?", a: "Import a list of emails and tiers and Kudo invites them for you, with their current price kept." },
];
