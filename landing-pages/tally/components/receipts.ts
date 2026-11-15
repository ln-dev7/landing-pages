export const categories = [
  { id: "meals", label: "Meals", deductible: 0.5 },
  { id: "software", label: "Software", deductible: 1 },
  { id: "travel", label: "Travel", deductible: 1 },
  { id: "equipment", label: "Equipment", deductible: 1 },
  { id: "office", label: "Office", deductible: 1 },
] as const;
export type CategoryId = (typeof categories)[number]["id"];

export type Receipt = {
  id: string;
  merchant: string;
  what: string;
  date: string;
  total: number;
  tax: number;
  category: CategoryId;
  confidence: number;
  bank: string;
  items: [string, number][];
};

export const receipts: Receipt[] = [
  {
    id: "r1",
    merchant: "Café Luz",
    what: "Client lunch",
    date: "Nov 3",
    total: 48.6,
    tax: 3.9,
    category: "meals",
    confidence: 0.97,
    bank: "CARD 4821 · CAFE LUZ · −\u2060$48.60",
    items: [
      ["2 × lunch menu", 36.0],
      ["2 × espresso", 6.0],
      ["service", 2.7],
    ],
  },
  {
    id: "r2",
    merchant: "Penline",
    what: "Design software",
    date: "Nov 1",
    total: 24,
    tax: 0,
    category: "software",
    confidence: 0.99,
    bank: "CARD 4821 · PENLINE.EXAMPLE · −\u2060$24.00",
    items: [["Pro plan, monthly", 24.0]],
  },
  {
    id: "r3",
    merchant: "Coastline Rail",
    what: "Train to client",
    date: "Nov 4",
    total: 86.5,
    tax: 0,
    category: "travel",
    confidence: 0.94,
    bank: "CARD 4821 · COASTLINE RAIL · −\u2060$86.50",
    items: [
      ["Return, standard", 82.0],
      ["Seat reservation", 4.5],
    ],
  },
  {
    id: "r4",
    merchant: "Desk & Co",
    what: "Laptop stand",
    date: "Nov 5",
    total: 59,
    tax: 4.7,
    category: "equipment",
    confidence: 0.91,
    bank: "CARD 4821 · DESK AND CO · −\u2060$59.00",
    items: [
      ["Aluminium stand", 54.3],
      ["Shipping", 0],
    ],
  },
  {
    id: "r5",
    merchant: "Hive Works",
    what: "Coworking day",
    date: "Nov 6",
    total: 35,
    tax: 2.8,
    category: "office",
    confidence: 0.96,
    bank: "CARD 4821 · HIVE WORKS · −\u2060$35.00",
    items: [["Day pass", 32.2]],
  },
];

export const INCOME = 8400;
export const history = [6100, 7200, 5800, 8900, 7600];
export const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
