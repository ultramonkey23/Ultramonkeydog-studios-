import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const failures = [];

function read(relativePath) {
  const absolute = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolute)) {
    failures.push(`missing ${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolute, "utf8");
}

function requirePattern(source, label, pattern) {
  if (!pattern.test(source)) {
    failures.push(`Box card lost packet-driven support/depth truth: ${label}`);
  }
}

function forbidPattern(source, label, pattern) {
  if (pattern.test(source)) {
    failures.push(`Box card reintroduced hard-coded packet state: ${label}`);
  }
}

const truthCheck = read("scripts/public-truth-order-check.mjs");
const signals = read("src/components/StudioSignals.tsx");
const signalsCss = read("src/studio-signals.css");
const projectCard = read("src/components/ProjectCard.tsx");
const boxCard = read("src/components/BoxArena.tsx");
const main = read("src/main.tsx");
const motionGuard = read("src/reduced-motion-scroll.ts");
const proceduralRendering = read("src/procedural-rendering.css");

for (const marker of [
  "extractSignalsBlock",
  "extractSignalObject",
  "tested-engine signal lost required truth",
  "immutable-card signal lost required truth",
]) {
  if (!truthCheck.includes(marker)) {
    failures.push(`truth-order gate is not scoped to live signal objects: ${marker}`);
  }
}

for (const marker of [
  "signalActionNodes",
  "signal.action?.kind === \"section\"",
  "signal.action?.kind === \"external\"",
  "preferredScrollBehavior",
  'rel="noopener noreferrer"',
]) {
  if (!signals.includes(marker)) {
    failures.push(`StudioSignals lost reviewed action behavior: ${marker}`);
  }
}
if (/if \(signal\.sourceUrl\) \{\s*return/s.test(signals)) {
  failures.push("StudioSignals source link once again hides configured actions");
}

for (const marker of [
  ".studio-signal__actions",
  "appearance: none",
  "button.studio-signal__source",
  "background: transparent",
]) {
  if (!signalsCss.includes(marker)) {
    failures.push(`signal button/link normalization regressed: ${marker}`);
  }
}

if (projectCard.includes('rel="noreferrer"')) {
  failures.push("ProjectCard contains target=_blank links without explicit noopener");
}
if ((projectCard.match(/rel="noopener noreferrer"/g) ?? []).length < 3) {
  failures.push("ProjectCard external links are not consistently hardened");
}

// These names moved when the abandoned Box simulator/spotlight components were
// deleted in ccd7720. The invariant did not move: the Box card must render
// support state and Victory Depth FROM the owner packet, never hard-coded.
// Each rule below is anchored on the identifier that carries that invariant today.
// The BOB #003 card component was retired when the arena replaced it — Cody
// called the two stacked Box widgets a duplicate and they were. The invariant
// these rules protect did not retire with it: the Box surface must render
// support state, gate state and the ordered conversion spine FROM owner output,
// never from anything decided here. Re-anchored on the component that carries
// that today. Rules whose subject genuinely no longer exists (Victory Depth
// belonged to the card packet) are gone rather than kept as theatre.
const boxRequiredPatterns = [
  {
    label: "route support state read from owner data",
    pattern: /step\s*\.\s*support_state/,
    probe: "step . support_state",
  },
  {
    label: "route gate state read from owner data",
    pattern: /route\s*\.\s*gate_state/,
    probe: "route\n  . gate_state",
  },
  {
    label: "a closed route says why it closed",
    pattern: /route\s*\.\s*gate_reasons/,
    probe: "route	. gate_reasons",
  },
  {
    label: "ordered conversion steps rendered",
    pattern: /route\s*\.\s*steps\s*\.\s*map/,
    probe: "route . steps . map",
  },
  {
    label: "owner matrix is the only source",
    pattern: /matchup-matrix\.v0\.1\.json/,
    probe: "matchup-matrix.v0.1.json",
  },
  {
    label: "owner provenance is displayed",
    pattern: /matrix\s*\.\s*owner_commit/,
    probe: "matrix . owner_commit",
  },
  {
    label: "proof ceiling is displayed",
    pattern: /matrix\s*\.\s*proof_ceiling/,
    probe: "matrix\n  . proof_ceiling",
  },
  {
    label: "reviewed disagreement is surfaced",
    // The arena reads this through optional chaining, so the rule has to
    // tolerate `?.` or it fails on the exact code it exists to protect.
    pattern: /matrix\s*\??\.\s*reviewed/,
    probe: "matrix ?. reviewed",
  },
];

const boxForbiddenPatterns = [
  {
    label: "browser-side verdict math",
    pattern: /function\s+(evaluate|resolve|compute)(Matchup|Verdict|Winner)/i,
    probe: "function computeVerdict(",
  },
  {
    label: "nondeterminism in a displayed result",
    pattern: /Math\.random/,
    probe: "Math.random()",
  },
];

for (const { label, pattern, probe } of boxRequiredPatterns) {
  requirePattern(boxCard, label, pattern);
  if (!pattern.test(probe)) {
    failures.push(`Box required-pattern self-test no longer tolerates formatting: ${label}`);
  }
}
for (const { label, pattern, probe } of boxForbiddenPatterns) {
  forbidPattern(boxCard, label, pattern);
  if (!pattern.test(probe)) {
    failures.push(`Box forbidden-pattern self-test no longer detects reformatted regression: ${label}`);
  }
}

for (const marker of [
  'import { MotionConfig } from "motion/react"',
  'reducedMotion="user"',
  "installReducedMotionScrollGuard()",
  'import "./procedural-rendering.css"',
]) {
  if (!main.includes(marker)) {
    failures.push(`main entry lost reviewed browser contract: ${marker}`);
  }
}

for (const marker of [
  "prefers-reduced-motion: reduce",
  "behavior: \"auto\"",
  "Element.prototype.scrollIntoView",
  "window.scrollTo",
]) {
  if (!motionGuard.includes(marker)) {
    failures.push(`programmatic reduced-motion guard regressed: ${marker}`);
  }
}

const crispIndex = proceduralRendering.indexOf("image-rendering: crisp-edges");
const pixelatedIndex = proceduralRendering.indexOf("image-rendering: pixelated");
if (crispIndex < 0 || pixelatedIndex < 0 || pixelatedIndex < crispIndex) {
  failures.push("pixelated scaling is not the final authoritative canvas rendering value");
}

if (failures.length > 0) {
  console.error(
    "Copilot review regression check failed:\n" +
      failures.map((failure) => `- ${failure}`).join("\n"),
  );
  process.exit(1);
}

console.log(
  "Copilot review check passed: live truth scoping, signal actions, regex-hardened Box packet rendering, external-link safety, reduced motion, and pixel scaling remain repaired.",
);
