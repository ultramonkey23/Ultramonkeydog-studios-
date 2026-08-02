import { useEffect, useRef } from "react";

export type ProceduralFieldVariant =
  | "studio"
  | "what-we-fed"
  | "bone-league"
  | "savage-crown"
  | "saga-anxious-fluff"
  | "feral-formation"
  | "box-o-battles";

interface ProceduralFieldProps {
  seed: string;
  variant?: ProceduralFieldVariant;
  className?: string;
}

interface FieldPalette {
  ground: string;
  deep: string;
  structure: string;
  accents: readonly [string, string, string, string, string, string];
}

const PALETTES: Record<ProceduralFieldVariant, FieldPalette> = {
  studio: {
    ground: "#090611",
    deep: "#15101f",
    structure: "#f3dfb1",
    accents: ["#82d36b", "#45c8d3", "#ff5b45", "#ffd24a", "#b887ff", "#ff75b5"],
  },
  "what-we-fed": {
    ground: "#090b08",
    deep: "#162017",
    structure: "#f0dfae",
    accents: ["#72c85d", "#b6d74d", "#f16b3b", "#7d6ad8", "#61c5b2", "#d84d55"],
  },
  "bone-league": {
    ground: "#0b0710",
    deep: "#211126",
    structure: "#f1deb6",
    accents: ["#eb4a3f", "#4dd0d6", "#b7d94a", "#8f63d7", "#ff9c43", "#e474b8"],
  },
  "savage-crown": {
    ground: "#0b0708",
    deep: "#251016",
    structure: "#f2d79d",
    accents: ["#e74d2f", "#ffc94c", "#3bc7c6", "#8ecf58", "#c66cff", "#f07a95"],
  },
  "saga-anxious-fluff": {
    ground: "#100914",
    deep: "#25142d",
    structure: "#fff0c9",
    accents: ["#ff7167", "#5cc8ff", "#ffd84a", "#77daa0", "#b995ff", "#ff84c5"],
  },
  "feral-formation": {
    ground: "#080a14",
    deep: "#141a2e",
    structure: "#e8e1c2",
    accents: ["#ff9c45", "#48bda0", "#776bd8", "#d3c36b", "#62b4df", "#d978aa"],
  },
  "box-o-battles": {
    ground: "#0d0909",
    deep: "#221315",
    structure: "#f6e4b6",
    accents: ["#e94b39", "#ffc447", "#3f7cff", "#72c95a", "#b66ee8", "#ff79a8"],
  },
};

const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drawSteppedLine(
  context: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
) {
  const middleX = Math.round((x0 + x1) / 2);
  context.moveTo(Math.round(x0), Math.round(y0));
  context.lineTo(middleX, Math.round(y0));
  context.lineTo(middleX, Math.round(y1));
  context.lineTo(Math.round(x1), Math.round(y1));
}

function drawPropertySpectrum(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  phase: number,
) {
  const bandHeight = Math.max(2, Math.floor(height * 0.018));
  const segmentWidth = Math.ceil(width / palette.accents.length);
  for (let index = 0; index < palette.accents.length; index += 1) {
    context.globalAlpha = index === phase % palette.accents.length ? 0.98 : 0.72;
    context.fillStyle = palette.accents[index];
    context.fillRect(index * segmentWidth, 0, segmentWidth - 1, bandHeight);
    context.fillRect(width - ((index + 1) * segmentWidth), height - bandHeight, segmentWidth - 1, bandHeight);
  }
}

function drawHardTerritories(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  count: number,
) {
  for (let index = 0; index < count; index += 1) {
    const blockWidth = Math.max(8, Math.floor((random() * width * 0.28) / 4) * 4);
    const blockHeight = Math.max(5, Math.floor((random() * height * 0.2) / 3) * 3);
    const x = Math.floor((random() * Math.max(1, width - blockWidth)) / 4) * 4;
    const y = Math.floor((random() * Math.max(1, height - blockHeight)) / 3) * 3;
    context.globalAlpha = index % 4 === 0 ? 0.24 : 0.1 + random() * 0.08;
    context.fillStyle = index % 5 === 0
      ? palette.accents[index % palette.accents.length]
      : palette.deep;
    context.fillRect(x, y, blockWidth, blockHeight);
  }
}

function drawOrderedDither(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  seedValue: number,
  phase: number,
) {
  context.globalAlpha = 0.16;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const matrixValue = BAYER_4X4[(x / 2) % 4 + (((y / 2) % 4) * 4)];
      const wave = ((x * 3 + y * 5 + phase * 7 + (seedValue & 31)) % 19) / 19;
      if (matrixValue / 16 < wave * 0.4) {
        context.fillStyle = palette.accents[(x + y + phase) % palette.accents.length];
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}

function drawPixelSpecimen(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  scale: number,
  bodyColor: string,
  detailColor: string,
  random: () => number,
  flip: boolean,
) {
  const direction = flip ? -1 : 1;
  const unit = Math.max(1, Math.floor(scale));
  const bodyWidth = unit * (5 + Math.floor(random() * 4));
  const bodyHeight = unit * (3 + Math.floor(random() * 3));
  const x = Math.round(centerX - bodyWidth / 2);
  const y = Math.round(centerY - bodyHeight / 2);

  context.globalAlpha = 0.34;
  context.fillStyle = bodyColor;
  context.fillRect(x, y, bodyWidth, bodyHeight);
  context.fillRect(x + direction * bodyWidth * 0.28, y - unit * 2, unit * 3, unit * 2);
  context.fillRect(x - direction * unit * 2, y + unit, unit * 3, unit * 2);
  context.fillRect(x + unit, y + bodyHeight, unit * 2, unit * 2);
  context.fillRect(x + bodyWidth - unit * 3, y + bodyHeight, unit * 2, unit * 2);
  const tailLength = unit * (3 + Math.floor(random() * 5));
  context.fillRect(flip ? x + bodyWidth : x - tailLength, y + unit, tailLength, unit);

  context.globalAlpha = 0.9;
  context.fillStyle = detailColor;
  context.fillRect(flip ? x + unit : x + bodyWidth - unit * 2, y + unit, unit, unit);
  context.fillRect(x + Math.floor(bodyWidth / 2), y - unit, unit, unit);
}

function drawLorenzTails(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  phase: number,
  count: number,
) {
  for (let trajectory = 0; trajectory < count; trajectory += 1) {
    let x = (random() - 0.5) * 9;
    let y = (random() - 0.5) * 9;
    let z = 18 + random() * 7;
    const sigma = 9.4 + random() * 1.2;
    const rho = 25.5 + random() * 4.5;
    const beta = 2.45 + random() * 0.35;
    const dt = 0.0065;
    let previousX = width / 2;
    let previousY = height / 2;

    context.beginPath();
    for (let step = 0; step < 620; step += 1) {
      const dx = sigma * (y - x);
      const dy = x * (rho - z) - y;
      const dz = x * y - beta * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;
      if (step < 90 || step % 4 !== 0) continue;
      const px = clamp(Math.round(width * 0.5 + x * width * 0.017), 0, width - 1);
      const py = clamp(Math.round(height * 0.5 + (z - 25) * height * 0.025), 0, height - 1);
      drawSteppedLine(context, previousX, previousY, px, py);
      previousX = px;
      previousY = py;
    }
    context.globalAlpha = trajectory === phase % Math.max(1, count) ? 0.38 : 0.18;
    context.strokeStyle = palette.accents[trajectory % palette.accents.length];
    context.lineWidth = trajectory === phase % Math.max(1, count) ? 1.1 : 0.65;
    context.stroke();
  }
}

function drawStudioMosaic(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  phase: number,
) {
  const columns = palette.accents.length;
  const columnWidth = width / columns;
  for (let index = 0; index < columns; index += 1) {
    const x = Math.floor(index * columnWidth);
    const rise = height * (0.18 + random() * 0.45);
    context.globalAlpha = index === phase % columns ? 0.28 : 0.16;
    context.fillStyle = palette.accents[index];
    context.fillRect(x + 2, height - rise, Math.max(3, Math.floor(columnWidth - 5)), rise);
    drawPixelSpecimen(
      context,
      x + columnWidth / 2,
      height - rise - 7,
      1 + random() * 1.4,
      palette.accents[index],
      palette.structure,
      random,
      index % 2 === 0,
    );
  }
  drawLorenzTails(context, width, height, palette, random, phase, 2);
}

function drawWildFable(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
) {
  context.lineWidth = 1;
  for (let root = 0; root < 11; root += 1) {
    let x = width * (0.08 + root * 0.085);
    let y = height;
    context.beginPath();
    context.moveTo(x, y);
    for (let joint = 0; joint < 6; joint += 1) {
      x += (random() - 0.5) * width * 0.11;
      y -= height * (0.09 + random() * 0.07);
      context.lineTo(Math.round(x), Math.round(y));
    }
    context.globalAlpha = 0.28 + random() * 0.18;
    context.strokeStyle = palette.accents[root % 3];
    context.stroke();
  }

  drawPixelSpecimen(context, width * 0.64, height * 0.52, 3.2, palette.accents[0], palette.accents[2], random, false);
  for (let leaf = 0; leaf < 18; leaf += 1) {
    context.globalAlpha = 0.3;
    context.fillStyle = palette.accents[leaf % 4];
    const x = Math.floor(random() * width);
    const y = Math.floor(random() * height * 0.78);
    context.fillRect(x, y, 2 + (leaf % 2), 1 + (leaf % 3 === 0 ? 1 : 0));
  }
}

function drawBoneLeague(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
) {
  context.globalAlpha = 0.24;
  context.strokeStyle = palette.accents[1];
  context.lineWidth = 1;
  for (let line = 1; line < 8; line += 1) {
    const x = Math.round((width / 8) * line);
    context.beginPath();
    context.moveTo(x, height * 0.18);
    context.lineTo(x, height * 0.88);
    context.stroke();
  }
  context.beginPath();
  context.moveTo(width * 0.06, height * 0.53);
  context.lineTo(width * 0.94, height * 0.53);
  context.stroke();

  context.lineWidth = 2;
  context.strokeStyle = palette.accents[0];
  for (let bracket = 0; bracket < 4; bracket += 1) {
    const x = width * (0.12 + bracket * 0.19);
    const y = height * (0.18 + (bracket % 2) * 0.42);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width * 0.08, y);
    context.lineTo(x + width * 0.08, y + height * 0.12);
    context.lineTo(x + width * 0.15, y + height * 0.12);
    context.stroke();
  }

  const skullX = Math.round(width * 0.73);
  const skullY = Math.round(height * 0.38);
  context.globalAlpha = 0.34;
  context.fillStyle = palette.structure;
  context.fillRect(skullX, skullY, 18, 13);
  context.fillRect(skullX + 3, skullY + 13, 12, 5);
  context.fillStyle = palette.accents[3];
  context.fillRect(skullX + 3, skullY + 4, 3, 3);
  context.fillRect(skullX + 12, skullY + 4, 3, 3);

  for (let mark = 0; mark < 12; mark += 1) {
    context.fillStyle = palette.accents[mark % palette.accents.length];
    context.globalAlpha = 0.24;
    context.fillRect(Math.floor(random() * width), Math.floor(random() * height), 2, 4 + (mark % 3));
  }
}

function drawSavageAnatomy(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  phase: number,
) {
  const centerX = width * 0.67;
  context.globalAlpha = 0.34;
  context.fillStyle = palette.accents[1];
  for (let tooth = -2; tooth <= 2; tooth += 1) {
    const x = centerX + tooth * 12;
    const toothHeight = tooth === 0 ? 16 : 11 + Math.abs(tooth) * 2;
    context.beginPath();
    context.moveTo(x - 5, height * 0.18);
    context.lineTo(x + 5, height * 0.18);
    context.lineTo(x, height * 0.18 - toothHeight);
    context.closePath();
    context.fill();
  }

  context.strokeStyle = palette.accents[2];
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(centerX, height * 0.2);
  context.lineTo(centerX, height * 0.82);
  context.stroke();

  for (let rib = 0; rib < 7; rib += 1) {
    const y = height * (0.29 + rib * 0.07);
    const reach = width * (0.07 + rib * 0.008);
    context.strokeStyle = palette.accents[(rib + phase) % palette.accents.length];
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(centerX, y);
    context.lineTo(centerX - reach, y - 5);
    context.lineTo(centerX - reach - 6, y + 4);
    context.moveTo(centerX, y);
    context.lineTo(centerX + reach, y - 5);
    context.lineTo(centerX + reach + 6, y + 4);
    context.stroke();
  }

  context.globalAlpha = 0.2;
  for (let ring = 0; ring < 4; ring += 1) {
    context.strokeStyle = palette.accents[(ring + 3) % palette.accents.length];
    context.lineWidth = 1;
    context.beginPath();
    context.arc(centerX, height * 0.5, 22 + ring * 13, 0, Math.PI * 2);
    context.stroke();
  }
  drawLorenzTails(context, width, height, palette, random, phase, 1);
}

function drawAnxiousFluff(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  phase: number,
) {
  const centerX = width * 0.66;
  const centerY = height * 0.5;
  for (let puff = 0; puff < 15; puff += 1) {
    const angle = (Math.PI * 2 * puff) / 15;
    const radius = 16 + (puff % 3) * 7;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius * 0.7;
    context.globalAlpha = 0.27 + (puff === phase % 15 ? 0.2 : 0);
    context.fillStyle = palette.accents[puff % palette.accents.length];
    context.beginPath();
    context.arc(x, y, 8 + (puff % 4), 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 0.42;
  context.fillStyle = palette.structure;
  context.fillRect(centerX - 18, centerY - 10, 36, 20);
  context.fillStyle = palette.accents[0];
  context.fillRect(centerX - 9, centerY - 3, 3, 3);
  context.fillRect(centerX + 6, centerY - 3, 3, 3);

  for (let star = 0; star < 18; star += 1) {
    const x = random() * width;
    const y = random() * height;
    const color = palette.accents[(star + phase) % palette.accents.length];
    context.globalAlpha = 0.36;
    context.fillStyle = color;
    context.fillRect(x - 3, y, 7, 1);
    context.fillRect(x, y - 3, 1, 7);
  }

  context.globalAlpha = 0.22;
  context.strokeStyle = palette.accents[1];
  for (let speed = 0; speed < 7; speed += 1) {
    const y = height * (0.17 + speed * 0.11);
    context.beginPath();
    context.moveTo(width * 0.1, y);
    context.lineTo(width * (0.24 + speed * 0.03), y);
    context.stroke();
  }
}

function drawFeralFormation(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  phase: number,
) {
  const points = [
    [0.54, 0.24],
    [0.72, 0.22],
    [0.63, 0.43],
    [0.48, 0.62],
    [0.72, 0.67],
    [0.84, 0.48],
  ].map(([x, y]) => [x * width, y * height]);
  const links = [[0, 2], [1, 2], [2, 3], [2, 4], [2, 5], [3, 4], [4, 5]];
  context.globalAlpha = 0.35;
  context.lineWidth = 1;
  for (const [a, b] of links) {
    context.strokeStyle = palette.accents[(a + b + phase) % palette.accents.length];
    context.beginPath();
    drawSteppedLine(context, points[a][0], points[a][1], points[b][0], points[b][1]);
    context.stroke();
  }
  points.forEach(([x, y], index) => {
    context.fillStyle = palette.accents[(index + phase) % palette.accents.length];
    context.globalAlpha = index === phase % points.length ? 0.9 : 0.52;
    context.beginPath();
    context.moveTo(x, y - 6);
    context.lineTo(x + 7, y + 5);
    context.lineTo(x - 7, y + 5);
    context.closePath();
    context.fill();
  });

  context.globalAlpha = 0.2;
  context.strokeStyle = palette.accents[0];
  context.beginPath();
  context.arc(width * 0.67, height * 0.48, Math.min(width, height) * 0.24, 0.35, Math.PI * 1.7);
  context.stroke();
  for (let mote = 0; mote < 12; mote += 1) {
    context.fillStyle = palette.accents[mote % palette.accents.length];
    context.fillRect(random() * width, random() * height, 1 + (mote % 2), 1 + (mote % 2));
  }
}

function drawBoxOBattles(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  phase: number,
) {
  const gutter = 4;
  const panels = [
    [width * 0.47, height * 0.16, width * 0.2, height * 0.25],
    [width * 0.69, height * 0.16, width * 0.23, height * 0.18],
    [width * 0.47, height * 0.44, width * 0.17, height * 0.34],
    [width * 0.67, height * 0.37, width * 0.25, height * 0.41],
  ];
  panels.forEach(([x, y, panelWidth, panelHeight], index) => {
    context.globalAlpha = 0.16 + (index === phase % panels.length ? 0.12 : 0);
    context.fillStyle = palette.accents[index % palette.accents.length];
    context.fillRect(x, y, panelWidth, panelHeight);
    context.globalAlpha = 0.62;
    context.strokeStyle = palette.structure;
    context.lineWidth = 1;
    context.strokeRect(x + gutter, y + gutter, panelWidth - gutter * 2, panelHeight - gutter * 2);
  });

  context.globalAlpha = 0.78;
  context.strokeStyle = palette.accents[1];
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(width * 0.46, height * 0.73);
  context.lineTo(width * 0.92, height * 0.22);
  context.stroke();
  context.fillStyle = palette.accents[0];
  context.beginPath();
  context.moveTo(width * 0.9, height * 0.2);
  context.lineTo(width * 0.94, height * 0.21);
  context.lineTo(width * 0.92, height * 0.26);
  context.closePath();
  context.fill();

  context.globalAlpha = 0.22;
  for (let y = 3; y < height; y += 5) {
    for (let x = Math.floor(width * 0.45); x < width; x += 5) {
      if ((x + y) % 3 === 0) {
        context.fillStyle = palette.accents[(x + y + phase) % palette.accents.length];
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}

function drawVariantGrammar(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: FieldPalette,
  random: () => number,
  phase: number,
  variant: ProceduralFieldVariant,
) {
  switch (variant) {
    case "what-we-fed":
      drawWildFable(context, width, height, palette, random);
      break;
    case "bone-league":
      drawBoneLeague(context, width, height, palette, random);
      break;
    case "savage-crown":
      drawSavageAnatomy(context, width, height, palette, random, phase);
      break;
    case "saga-anxious-fluff":
      drawAnxiousFluff(context, width, height, palette, random, phase);
      break;
    case "feral-formation":
      drawFeralFormation(context, width, height, palette, random, phase);
      break;
    case "box-o-battles":
      drawBoxOBattles(context, width, height, palette, phase);
      break;
    default:
      drawStudioMosaic(context, width, height, palette, random, phase);
  }
}

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  seedValue: number,
  palette: FieldPalette,
  phase: number,
  variant: ProceduralFieldVariant,
) {
  const random = mulberry32(seedValue);
  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, width, height);
  context.fillStyle = palette.ground;
  context.fillRect(0, 0, width, height);

  drawPropertySpectrum(context, width, height, palette, phase);
  drawHardTerritories(context, width, height, palette, random, variant === "studio" ? 16 : 8);
  drawVariantGrammar(context, width, height, palette, random, phase, variant);
  drawOrderedDither(context, width, height, palette, seedValue, phase);

  context.globalAlpha = 0.9;
  for (let index = 0; index < 12; index += 1) {
    const x = Math.floor(random() * width);
    const y = Math.floor(random() * height);
    context.fillStyle = index % 4 === phase % 4
      ? palette.accents[(index + phase) % palette.accents.length]
      : palette.structure;
    context.fillRect(x, y, index % 4 === phase % 4 ? 3 : 1, index % 4 === phase % 4 ? 2 : 1);
  }
  context.globalAlpha = 1;
}

export default function ProceduralField({
  seed,
  variant = "studio",
  className = "",
}: ProceduralFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return undefined;

    const seedValue = hashSeed(`${seed}:${variant}`);
    const palette = PALETTES[variant];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let phase = 0;
    let intervalId: number | undefined;

    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = clamp(Math.ceil(rect.width / 4), 96, 360);
      const height = clamp(Math.ceil(rect.height / 4), 56, 240);
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      drawField(context, width, height, seedValue, palette, phase, variant);
    };

    const configureMotion = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      intervalId = undefined;
      phase = 0;
      render();
      if (!reducedMotion.matches) {
        intervalId = window.setInterval(() => {
          phase = (phase + 1) % 6;
          render();
        }, 1250);
      }
    };

    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(container);
    reducedMotion.addEventListener("change", configureMotion);
    configureMotion();

    return () => {
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", configureMotion);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [seed, variant]);

  return (
    <div
      ref={containerRef}
      className={`procedural-field ${className}`}
      data-visual-role="STUDIO_GENERATED_FRAMING"
      data-palette-role="PROPERTY_SPECTRUM"
      data-grammar={variant}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
