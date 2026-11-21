export interface ShaderPalette {
  base: [number, number, number];
  warm: [number, number, number];
  mid: [number, number, number];
  cool: [number, number, number];
  cursor: [number, number, number];
  rgScale: [number, number, number];
  brightness: number;
}

export interface ShaderVariant {
  id: string;
  label: string;
  description: string;
  swatch: string;
  hero: ShaderPalette;
  wave: [number, number, number][];
}

const s = (r: number, g: number, b: number): [number, number, number] => [r, g, b];

export const SHADER_VARIANTS: ShaderVariant[] = [
  {
    id: "warm",
    label: "Warm",
    description: "Coral, peach, golden",
    swatch: "#ff945e",
    hero: {
      base: s(0.1, 0, 0),
      warm: s(0.9, 0.1, 0.1),
      mid: s(0.6, 0.5, 0.1),
      cool: s(0.1, 0.35, 0.45),
      cursor: s(0.18, 0.06, 0.02),
      rgScale: s(0.825, 0.825, 1),
      brightness: 2.5,
    },
    wave: [
      s(1, 0.32, 0.42),
      s(1, 0.58, 0.38),
      s(1, 0.82, 0.38),
      s(0.7, 0.62, 1),
      s(0.45, 0.72, 1),
    ],
  },
  {
    id: "mono",
    label: "Mono",
    description: "Charcoal to silver, no hue",
    swatch: "#8a8a8a",
    hero: {
      base: s(0.02, 0.02, 0.03),
      warm: s(0.38, 0.38, 0.42),
      mid: s(0.18, 0.18, 0.22),
      cool: s(0.55, 0.55, 0.6),
      cursor: s(0.06, 0.06, 0.08),
      rgScale: s(1, 1, 1),
      brightness: 1.5,
    },
    wave: [
      s(0.06, 0.06, 0.08),
      s(0.2, 0.2, 0.24),
      s(0.38, 0.38, 0.42),
      s(0.58, 0.58, 0.62),
      s(0.76, 0.76, 0.8),
    ],
  },
  {
    id: "twilight",
    label: "Twilight",
    description: "Cyan, magenta, and violet",
    swatch: "#7d4dff",
    hero: {
      base: s(0.02, 0.02, 0.1),
      warm: s(0.1, 0.85, 0.8),
      mid: s(0.85, 0.2, 0.65),
      cool: s(0.35, 0.2, 0.75),
      cursor: s(0.16, 0.04, 0.14),
      rgScale: s(1, 1, 1),
      brightness: 1.9,
    },
    wave: [
      s(0.2, 0.85, 0.85),
      s(0.45, 0.95, 0.7),
      s(0.95, 0.4, 0.8),
      s(0.65, 0.3, 0.95),
      s(0.3, 0.45, 0.95),
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    description: "Espresso, caramel, milk",
    swatch: "#7a4a22",
    hero: {
      base: s(0.025, 0.015, 0.005),
      warm: s(0.15, 0.085, 0.04),
      mid: s(0.22, 0.13, 0.06),
      cool: s(0.27, 0.18, 0.1),
      cursor: s(0.08, 0.04, 0.015),
      rgScale: s(1, 1, 1),
      brightness: 2.5,
    },
    wave: [
      s(0.165, 0.078, 0.031),
      s(0.29, 0.157, 0.094),
      s(0.431, 0.247, 0.118),
      s(0.541, 0.333, 0.188),
      s(0.659, 0.416, 0.243),
    ],
  },
  {
    id: "royal",
    label: "Royal",
    description: "Royal blue, petrol, and teal",
    swatch: "#2960e0",
    hero: {
      base: s(0.005, 0.012, 0.03),
      warm: s(0.064, 0.152, 0.352),
      mid: s(0.04, 0.22, 0.248),
      cool: s(0.024, 0.14, 0.116),
      cursor: s(0.008, 0.028, 0.045),
      rgScale: s(1, 1, 1),
      brightness: 2.5,
    },
    wave: [
      s(0.04, 0.08, 0.22),
      s(0.14, 0.3, 0.62),
      s(0.08, 0.48, 0.62),
      s(0.06, 0.5, 0.42),
      s(0.08, 0.42, 0.3),
    ],
  },
];

const variantsMap = new Map(SHADER_VARIANTS.map((v) => [v.id, v]));

export function getVariantById(id?: string): ShaderVariant {
  return (id && variantsMap.get(id)) || SHADER_VARIANTS[0];
}
