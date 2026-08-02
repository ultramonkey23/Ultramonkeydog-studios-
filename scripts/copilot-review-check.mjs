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
const boxCard = read("src/components/BoxOBattlesApp.tsx");
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

const boxRequiredPatterns = [
  {
    label: "comicSupportTone mapping",
    pattern: /const\s+comicSupportTone\s*:\s*Record<\s*SupportState\s*,\s*string\s*>\s*=\s*\{/,
    probe: "const comicSupportTone : Record< SupportState, string > = {",
  },
  {
    label: "Unsupported comic support tone",
    pattern: /Unsupported\s*:\s*["'][^"']*\bborder-red-900\b[^"']*\bbg-red-200\b[^"']*\btext-red-950\b[^"']*["']/,
    probe: "Unsupported : 'border-red-900   bg-red-200 text-red-950'",
  },
  {
    label: "Unknown comic support tone",
    pattern: /Unknown\s*:\s*["'][^"']*\bborder-zinc-800\b[^"']*\bbg-zinc-300\b[^"']*\btext-zinc-950\b[^"']*["']/,
    probe: "Unknown: 'border-zinc-800 bg-zinc-300   text-zinc-950'",
  },
  {
    label: "route.highest_depth",
    pattern: /route\s*\.\s*highest_depth/,
    probe: "route . highest_depth",
  },
  {
    label: "route.anchor_status",
    pattern: /route\s*\.\s*anchor_status/,
    probe: "route\n  . anchor_status",
  },
  {
    label: "route.essence_status",
    pattern: /route\s*\.\s*essence_status/,
    probe: "route\t. essence_status",
  },
  {
    label: "highestDepthIndex",
    pattern: /\bhighestDepthIndex\b/,
    probe: "highestDepthIndex",
  },
];

const boxForbiddenPatterns = [
  {
    label: "fixed Victory Depth index",
    pattern: /const\s+reached\s*=\s*index\s*<=\s*3\b/,
    probe: "const reached = index\n  <=\t3;",
  },
  {
    label: "BOB #003-specific Victory Depth sentence",
    pattern: /D3\s+Agency\s+reached\.\s*D4\s+Anchor\s+remains\s+separated\s+but\s+not\s+destroyed\.\s*D5\s+Essence\s+remains\s+unresolved\./,
    probe: "D3 Agency reached.  D4 Anchor remains separated but not destroyed.\nD5 Essence remains unresolved.",
  },
  {
    label: "Confirmed-only comic support ternary",
    pattern: /beat\s*\.\s*support_state\s*===\s*["']Confirmed["']\s*\?/,
    probe: "beat . support_state === 'Confirmed'\n  ?",
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
