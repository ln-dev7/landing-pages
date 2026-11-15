export type AppId = "book" | "wait" | "orders" | "loyalty" | "reviews" | "gifts";

export type App = {
  id: AppId;
  name: string;
  goal: string;
  line: string;
  time: string;
  moment: string;
  tile: [string, string];
  inks: string[];
  wash: string;
};

export const apps: App[] = [
  {
    id: "book",
    name: "Reservations",
    goal: "fill the slow nights",
    line: "Online booking with deposits, so a table held is a table filled.",
    time: "16:30",
    moment: "Tonight is booked out by 4:30 pm.",
    tile: ["#ff9b73", "#e2512b"],
    inks: ["#ffd9c8", "#ffa27e", "#e8582f", "#a8341a"],
    wash: "#fff2ea",
  },
  {
    id: "wait",
    name: "Waitlist",
    goal: "keep walk-ins happy",
    line: "Guests join from the door and get a text when the table is ready.",
    time: "19:40",
    moment: "Six walk-ins wait at the bar, not at the door.",
    tile: ["#ffd36a", "#e59a0c"],
    inks: ["#ffeab0", "#ffd061", "#e8a012", "#a86a05"],
    wash: "#fff8e6",
  },
  {
    id: "orders",
    name: "Orders",
    goal: "sell past the last table",
    line: "Pickup and delivery straight from your menu, without the big app fees.",
    time: "20:15",
    moment: "Pickup orders keep the kitchen busy at 8:15.",
    tile: ["#a8d67e", "#5c9a2b"],
    inks: ["#dcefc6", "#a9d77f", "#62a232", "#3a6b17"],
    wash: "#f3f9ec",
  },
  {
    id: "loyalty",
    name: "Loyalty",
    goal: "bring regulars back",
    line: "A stamp card in the guest's phone. The tenth visit is on you.",
    time: "21:30",
    moment: "Table 12 just earned their free dessert.",
    tile: ["#d9a7ff", "#9147d6"],
    inks: ["#ecd6ff", "#cc9cf8", "#9a52dc", "#62259a"],
    wash: "#f8f0ff",
  },
  {
    id: "reviews",
    name: "Reviews",
    goal: "answer every guest",
    line: "Every review in one place, with a reply drafted in your voice.",
    time: "23:10",
    moment: "Last night's reviews are answered before close.",
    tile: ["#7fc8ff", "#2f7fd6"],
    inks: ["#cfe8ff", "#8ec8fb", "#3a85d8", "#1a5294"],
    wash: "#eef6ff",
  },
  {
    id: "gifts",
    name: "Gift cards",
    goal: "get paid before they come",
    line: "Digital gift cards that pay you today and bring two guests later.",
    time: "Sunday",
    moment: "Gift cards paid for next month's Mondays.",
    tile: ["#ff9cc0", "#d83b7a"],
    inks: ["#ffd6e6", "#ffa1c4", "#de4a85", "#9c1f53"],
    wash: "#fff0f5",
  },
];

export const place = {
  name: "Osteria Lume",
  where: "Neighbourhood trattoria · Porto",
  rating: 4.8,
  reviews: 1932,
};

export const times = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
export const full = ["19:30", "20:00"];

export const dishes = [
  { id: "cacio", name: "Cacio e pepe", price: 14, tone: "#f4d27a" },
  { id: "ragu", name: "Slow ragù pappardelle", price: 17, tone: "#c8643a" },
  { id: "tira", name: "Tiramisu", price: 8, tone: "#a77a52" },
];

export const giftAmounts = [25, 50, 100];
export const giftStyles = [
  { id: "olive", bg: "linear-gradient(135deg,#55693a,#2c381c)" },
  { id: "tomato", bg: "linear-gradient(135deg,#ec6a3f,#a8341a)" },
  { id: "night", bg: "linear-gradient(135deg,#2a2420,#0f0c0a)" },
];

export const reviewList = [
  { who: "Marta R.", stars: 5, text: "The ragù tastes like Sunday at my grandmother's. We waited 15 minutes and got a text exactly when they said.", src: "Google" },
  { who: "Joel P.", stars: 4, text: "Lovely dinner, a little loud by 9. The tiramisu alone is worth the trip.", src: "Mesa" },
];

export const stats = [
  { v: 31, suffix: "%", label: "fewer no-shows with deposits" },
  { v: 2.4, suffix: "×", label: "more regulars after the stamp card" },
  { v: 96, suffix: "%", label: "of reviews answered within a day" },
];

export const quotes = [
  {
    place: "Osteria Lume",
    city: "Porto",
    who: "Inês Carvalho, owner",
    text: "We stopped losing Tuesday nights. Deposits for big tables and the waitlist did more for us than any ad.",
    app: "book" as AppId,
  },
  {
    place: "Kōji Ramen",
    city: "Lyon",
    who: "Ren Aoki, chef",
    text: "Pickup orders now pay for a full extra cook, and we kept every euro the delivery apps used to take.",
    app: "orders" as AppId,
  },
  {
    place: "Pão & Pó",
    city: "Lisbon",
    who: "Tiago Neves, manager",
    text: "The stamp card brought back the morning regulars. People ask for their seventh stamp like it is a medal.",
    app: "loyalty" as AppId,
  },
];

export const updates = [
  { t: "Deposits only for big tables", d: "Ask for a deposit from six guests up, and keep it simple for couples.", app: "book" as AppId, date: "November 13, 2026" },
  { t: "Waitlist texts in 12 languages", d: "Guests get the 'your table is ready' text in the language their phone uses.", app: "wait" as AppId, date: "November 11, 2026" },
  { t: "Sold-out dishes hide themselves", d: "Mark a dish as finished in the kitchen and it disappears from pickup orders.", app: "orders" as AppId, date: "November 9, 2026" },
  { t: "Gift cards for a set menu", d: "Sell a tasting menu for two as a gift, not only an amount.", app: "gifts" as AppId, date: "November 6, 2026" },
];

export const agents = [
  { name: "Clara", init: "CL", tone: "#ffa27e", open: 2 },
  { name: "Duarte", init: "DU", tone: "#a9d77f", open: 4 },
  { name: "Yara", init: "YA", tone: "#cc9cf8", open: 3 },
];

export const faqs = [
  { q: "Is Mesa a real product?", a: "No. Mesa is a fictional product made for this landing page. The restaurants, guests, numbers and prices are invented, and nothing you do here is saved." },
  { q: "Can I start with only reservations?", a: "Yes. Each app works alone. Most places start with Reservations and add the Waitlist before their first busy weekend." },
  { q: "What does it cost?", a: "On this imagined plan, the first app is free and each extra app costs 29 € a month. There is no fee per guest or per order." },
  { q: "Does it work with my till?", a: "Mesa sends orders and covers to the common restaurant tills. If yours is not on the list, the team sets it up for you." },
  { q: "Who owns the guest list?", a: "You do. Export every guest, booking and review at any time, in a file you can open anywhere." },
];
