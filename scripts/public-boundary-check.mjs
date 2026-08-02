import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const scanRoots = ["src", "metadata.json", "README.md", "docs", "_spatial_proofs"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".html", ".css"]);

const forbidden = [
  { label: "private Four-Mind architecture", pattern: /FOUR[- ]MIND/i },
  { label: "private Proust memory organ", pattern: /PROUST PATTERN/i },
  { label: "private mycelial architecture", pattern: /MYCELIAL SYMBIOSIS/i },
  { label: "private zero-point architecture", pattern: /ZERO[- ]POINT SPINE/i },
  { label: "private autonomous burst organ", pattern: /AUTONOMOUS BURST/i },
  { label: "private active-healing organ", pattern: /ACTIVE HEALING/i },
  { label: "private doctrine scanner terminology", pattern: /poisoned doctrine/i },
  { label: "private self-evolution claim", pattern: /self[- ]evolving organism/i },
  { label: "private autonomous scheduling claim", pattern: /schedul(?:e|es|ed|ing) code bursts/i },
  { label: "private self-healing claim", pattern: /actively heals itself/i },
  { label: "private validation-pressure detail", pattern: /validation pressure across/i },
  { label: "private command-organism detail", pattern: /local command organism/i },
  { label: "private creator OS surface", pattern: /Creator OS/i },
  { label: "private cockpit surface", pattern: /Lab Cockpit/i },
  { label: "private runtime watchdog", pattern: /RUNTIME WATCHDOG/i },
  { label: "duplicated winner stub", pattern: /winnerName\s*=\s*combatantA/i },
  { label: "duplicated winner stub", pattern: /winner\s*:\s*combatantA/i },
  { label: "duplicated fixed-confidence stub", pattern: /confidence\s*:\s*0\.85/i },
  { label: "public-site verdict evaluator", pattern: /Calculate Arbiter Verdict/i },
  { label: "public-site verdict evaluator", pattern: /function\s+evaluateVerdict|evaluate_verdict/i },
  { label: "retired fake battle", pattern: /Ashclaw Prime|Bone Sovereign/i },
  { label: "retired interactive evaluator presentation", pattern: /INTERACTIVE_DEMO|ARBITER_MATCHUP_ENGINE|Arbiter v1\.0/i },
  { label: "retired fixed-confidence presentation", pattern: /85% Confidence/i },
  { label: "stale fake-screenshot badge", pattern: /REAL GAME IMAGES COMING SOON/i },
  { label: "retired inline BOB preview", pattern: /BOB_0003_PREVIEW|interface\s+PublicBattlePreview/i },
  { label: "invented Box o' Battles heading", pattern: /Verdict Card, Not Power Meter/i },
];

function collectFiles(entry) {
  const absolute = path.join(ROOT, entry);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  const files = [];
  for (const child of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = path.join(entry, child.name);
    if (child.isDirectory()) files.push(...collectFiles(relative));
    else if (textExtensions.has(path.extname(child.name))) files.push(path.join(ROOT, relative));
  }
  return files;
}

const failures = [];
for (const file of scanRoots.flatMap(collectFiles)) {
  const content = fs.readFileSync(file, "utf8");
  for (const rule of forbidden) if (rule.pattern.test(content)) failures.push(`${path.relative(ROOT, file)}: ${rule.label}`);
}

const cardPath = path.join(ROOT, "src/data/box-o-battles/bob-0003-arbiter-card-comic-hud-v0.3.json");
const componentPath = path.join(ROOT, "src/components/BoxOBattlesApp.tsx");
if (!fs.existsSync(cardPath)) failures.push("missing owner-vendored BOB #003 Arbiter Card packet");
else {
  const card = JSON.parse(fs.readFileSync(cardPath, "utf8"));
  if (card.packet_role !== "READ_ONLY_PUBLIC_CARD") failures.push("BOB #003 packet lost READ_ONLY_PUBLIC_CARD role");
  if (card.card?.source_math_fingerprint !== "2539b24aeba078a584b2169494fe586966aa5d518ec0994957d64822b2c1c5e5") failures.push("BOB #003 source fingerprint drifted");
  if (card.verdict_stage?.balance_blade?.label !== "ROUTE SHARE — NOT WIN PROBABILITY") failures.push("Balance Blade truth label drifted");
}
if (!fs.existsSync(componentPath) || !/bob-0003-arbiter-card-comic-hud-v0\.3\.json/.test(fs.readFileSync(componentPath, "utf8"))) failures.push("BoxOBattlesApp must import the owner-vendored BOB #003 packet");

if (failures.length > 0) {
  console.error("Public boundary check failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Public boundary check passed: public truth, owner packet identity, and retired-content exclusions are intact.");
