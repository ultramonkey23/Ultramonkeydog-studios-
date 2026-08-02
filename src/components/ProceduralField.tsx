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
    context.globalAlpha = index === phase % palette.accents.length ? 0.96 : 0.68;
    context.fillStyle = palette.accents[index];
    context.fillRect(index * segmentWidth, 0, segmentWidth - 1, bandHeight);
    context.fillRect(
      width - ((index + 1) * segmentWidth),
      height - bandHeight,
      segmentWidth - 1,
      bandHeight,
    );
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

  context.globalAlpha = 0.26 + random() * 0.18;
  context.fillStyle = bodyColor;
  context.fillRect(x, y, bodyWidth, bodyHeight);
  context.fillRect(x + direction * bodyWidth * 0.28, y - unit * 2, unit * 3, unit * 2);
  context.fillRect(x - direction * unit * 2, y + unit, unit * 3, unit * 2);
  context.fillRect(x + unit, y + bodyHeight, unit * 2, unit * 2);
  context.fillRect(x + bodyWidth - unit * 3, y + bodyHeight, unit * 2, unit * 2);

  const tailLength = unit * (3 + Math.floor(random() * 5));
  context.fillRect(
    flip ? x + bodyWidth : x - tailLength,
    y + unit,
    tailLength,
    unit,
  );

  context.globalAlpha = 0.82;
  context.fillStyle = detailColor;
  context.fillRect(
    flip ? x + unit : x + bodyWidth - unit * 2,
    y + unit,
    unit,
    unit,
  );
  context.fillRect(x + Math.floor(bodyWidth / 2), y - unit, unit, unit);
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

  // Hard-edged color territories keep project color alive without a smooth AI wash.
  const territoryCount = variant === "studio" ? 18 : 12;
  for (let index = 0; index < territoryCount; index += 1) {
    const blockWidth = Math.max(8, Math.floor((random() * width * 0.32) / 4) * 4);
    const blockHeight = Math.max(5, Math.floor((random() * height * 0.24) / 3) * 3);
    const x = Math.floor((random() * Math.max(1, width - blockWidth)) / 4) * 4;
    const y = Math.floor((random() * Math.max(1, height - blockHeight)) / 3) * 3;
    context.globalAlpha = index % 4 === 0 ? 0.26 : 0.12 + random() * 0.1;
    context.fillStyle = index % 5 === 0
      ? palette.accents[index % palette.accents.length]
      : palette.deep;
    context.fillRect(x, y, blockWidth, blockHeight);
  }

  // Small creature-like specimens make the field feel inhabited rather than clinical.
  const specimenCount = variant === "studio" ? 8 : 4;
  for (let index = 0; index < specimenCount; index += 1) {
    const color = palette.accents[index % palette.accents.length];
    const detail = palette.accents[(index + 2) % palette.accents.length];
    const x = width * (0.1 + random() * 0.8);
    const y = height * (0.14 + random() * 0.72);
    drawPixelSpecimen(
      context,
      x,
      y,
      1 + random() * 1.7,
      color,
      detail,
      random,
      index % 2 === 0,
    );
  }

  // Ordered dither replaces fog and carries alternating property color.
  context.globalAlpha = 0.18;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const matrixValue = BAYER_4X4[(x / 2) % 4 + (((y / 2) % 4) * 4)];
      const wave = ((x * 3 + y * 5 + phase * 7 + (seedValue & 31)) % 19) / 19;
      if (matrixValue / 16 < wave * 0.43) {
        context.fillStyle = palette.accents[(x + y + phase) % palette.accents.length];
        context.fillRect(x, y, 1, 1);
      }
    }
  }

  // Bounded Lorenz-derived paths act as energetic tails, not the entire identity.
  const trajectories = variant === "studio" ? 6 : 3;
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
    for (let step = 0; step < 720; step += 1) {
      const dx = sigma * (y - x);
      const dy = x * (rho - z) - y;
      const dz = x * y - beta * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;

      if (step < 80 || step % 3 !== 0) continue;
      const px = clamp(Math.round(width * 0.5 + x * width * 0.019), 0, width - 1);
      const py = clamp(Math.round(height * 0.48 + (z - 25) * height * 0.028), 0, height - 1);
      drawSteppedLine(context, previousX, previousY, px, py);
      previousX = px;
      previousY = py;
    }
    context.globalAlpha = trajectory === phase % trajectories ? 0.82 : 0.34;
    context.strokeStyle = palette.accents[trajectory % palette.accents.length];
    context.lineWidth = trajectory === phase % trajectories ? 1.35 : 0.75;
    context.stroke();
  }

  // Scar cuts and confetti-like signal blocks create authored asymmetry.
  context.globalAlpha = 0.58;
  context.lineWidth = 1;
  for (let index = 0; index < 16; index += 1) {
    const startX = Math.floor(random() * width);
    const startY = Math.floor(random() * height);
    const length = 8 + Math.floor(random() * 34);
    context.strokeStyle = index % 3 === 0
      ? palette.accents[index % palette.accents.length]
      : palette.structure;
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

  context.globalAlpha = 0.94;
  for (let index = 0; index < 18; index += 1) {
    const x = Math.floor(random() * width);
    const y = Math.floor(random() * height);
    const active = (index + phase) % 5 === 0;
    context.fillStyle = active
      ? palette.accents[(index + phase) % palette.accents.length]
      : palette.structure;
    context.fillRect(x, y, active ? 3 : 1, active ? 2 : 1);
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
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
