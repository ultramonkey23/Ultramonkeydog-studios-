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
  mid: string;
  structure: string;
  accent: string;
  signal: string;
}

const PALETTES: Record<ProceduralFieldVariant, FieldPalette> = {
  studio: {
    ground: "#070604",
    deep: "#15110d",
    mid: "#5f5545",
    structure: "#c9bb98",
    accent: "#a83f25",
    signal: "#a5ad48",
  },
  "what-we-fed": {
    ground: "#080704",
    deep: "#17140d",
    mid: "#59623c",
    structure: "#d1c69f",
    accent: "#8f3826",
    signal: "#b2b94e",
  },
  "bone-league": {
    ground: "#080706",
    deep: "#1b1716",
    mid: "#5b4653",
    structure: "#d5c9ac",
    accent: "#8f2f24",
    signal: "#a68d4d",
  },
  "savage-crown": {
    ground: "#070504",
    deep: "#1a0e0b",
    mid: "#5f241b",
    structure: "#d1b97e",
    accent: "#b6341f",
    signal: "#d2a43b",
  },
  "saga-anxious-fluff": {
    ground: "#090705",
    deep: "#201714",
    mid: "#79564e",
    structure: "#e1cfac",
    accent: "#c46354",
    signal: "#7ca77f",
  },
  "feral-formation": {
    ground: "#060706",
    deep: "#121915",
    mid: "#4c6155",
    structure: "#c6c3a1",
    accent: "#76526f",
    signal: "#a4a94b",
  },
  "box-o-battles": {
    ground: "#080705",
    deep: "#181511",
    mid: "#5e5546",
    structure: "#d8caa7",
    accent: "#a32f24",
    signal: "#c09a42",
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

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  seedValue: number,
  palette: FieldPalette,
  phase: number,
) {
  const random = mulberry32(seedValue);
  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, width, height);
  context.fillStyle = palette.ground;
  context.fillRect(0, 0, width, height);

  // Broad material planes. Quantized placement keeps them blocky and stable.
  for (let index = 0; index < 11; index += 1) {
    const blockWidth = Math.max(8, Math.floor((random() * width * 0.34) / 4) * 4);
    const blockHeight = Math.max(5, Math.floor((random() * height * 0.22) / 3) * 3);
    const x = Math.floor((random() * (width - blockWidth)) / 4) * 4;
    const y = Math.floor((random() * (height - blockHeight)) / 3) * 3;
    context.globalAlpha = 0.28 + random() * 0.22;
    context.fillStyle = index % 3 === 0 ? palette.mid : palette.deep;
    context.fillRect(x, y, blockWidth, blockHeight);
  }

  // Ordered dither replaces smooth fog or bloom.
  context.globalAlpha = 0.2;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const matrixValue = BAYER_4X4[(x / 2) % 4 + (((y / 2) % 4) * 4)];
      const wave = ((x * 3 + y * 5 + phase * 7 + (seedValue & 31)) % 19) / 19;
      if (matrixValue / 16 < wave * 0.42) {
        context.fillStyle = palette.structure;
        context.fillRect(x, y, 1, 1);
      }
    }
  }

  // Bounded Lorenz-derived paths. The trajectory is quantized into stepped segments.
  const trajectories = 3;
  for (let trajectory = 0; trajectory < trajectories; trajectory += 1) {
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
    for (let step = 0; step < 760; step += 1) {
      const dx = sigma * (y - x);
      const dy = x * (rho - z) - y;
      const dz = x * y - beta * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;

      if (step < 80 || step % 2 !== 0) continue;
      const px = clamp(Math.round(width * 0.5 + x * width * 0.018), 0, width - 1);
      const py = clamp(Math.round(height * 0.48 + (z - 25) * height * 0.027), 0, height - 1);
      drawSteppedLine(context, previousX, previousY, px, py);
      previousX = px;
      previousY = py;
    }
    context.globalAlpha = trajectory === 0 ? 0.82 : 0.38;
    context.strokeStyle = trajectory === 0 ? palette.accent : palette.structure;
    context.lineWidth = trajectory === 0 ? 1.35 : 0.8;
    context.stroke();
  }

  // Scar cuts and sparse signal blocks create readable structure without fake telemetry.
  context.globalAlpha = 0.72;
  context.strokeStyle = palette.mid;
  context.lineWidth = 1;
  for (let index = 0; index < 14; index += 1) {
    const startX = Math.floor(random() * width);
    const startY = Math.floor(random() * height);
    const length = 8 + Math.floor(random() * 34);
    context.beginPath();
    drawSteppedLine(
      context,
      startX,
      startY,
      clamp(startX + (random() > 0.5 ? length : -length), 0, width - 1),
      clamp(startY + Math.floor((random() - 0.5) * 18), 0, height - 1),
    );
    context.stroke();
  }

  context.globalAlpha = 0.9;
  for (let index = 0; index < 9; index += 1) {
    const x = Math.floor(random() * width);
    const y = Math.floor(random() * height);
    const active = (index + phase) % 4 === 0;
    context.fillStyle = active ? palette.signal : palette.structure;
    context.fillRect(x, y, active ? 3 : 2, active ? 2 : 1);
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
      drawField(context, width, height, seedValue, palette, phase);
    };

    const configureMotion = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      intervalId = undefined;
      phase = 0;
      render();
      if (!reducedMotion.matches) {
        intervalId = window.setInterval(() => {
          phase = (phase + 1) % 4;
          render();
        }, 1100);
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
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
