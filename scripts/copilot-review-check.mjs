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

for (const marker of [
  "comicSupportTone",
  'Unsupported: "border-red-900 bg-red-200 text-red-950"',
  'Unknown: "border-zinc-800 bg-zinc-300 text-zinc-950"',
  "route.highest_depth",
  "route.anchor_status",
  "route.essence_status",
  "highestDepthIndex",
]) {
  if (!boxCard.includes(marker)) {
    failures.push(`Box card lost packet-driven support/depth truth: ${marker}`);
  }
}
for (const forbidden of [
  "const reached = index <= 3",
  "D3 Agency reached. D4 Anchor remains separated but not destroyed. D5 Essence remains unresolved.",
  'beat.support_state === "Confirmed" ?',
]) {
  if (boxCard.includes(forbidden)) {
    failures.push(`Box card reintroduced hard-coded packet state: ${forbidden}`);
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
  "Copilot review check passed: live truth scoping, signal actions, Box packet rendering, external-link safety, reduced motion, and pixel scaling remain repaired.",
);
