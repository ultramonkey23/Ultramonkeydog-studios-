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
  { label: "retired generic agent dashboard label", pattern: /AI ENGINE CO-PILOT|NODE_0[1-9]/i },
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
  for (const rule of forbidden) {
    if (rule.pattern.test(content)) failures.push(`${path.relative(ROOT, file)}: ${rule.label}`);
  }
}

const cardPath = path.join(ROOT, "src/data/box-o-battles/bob-0003-arbiter-card-comic-hud-v0.3.json");
const boxComponentPath = path.join(ROOT, "src/components/BoxOBattlesApp.tsx");
if (!fs.existsSync(cardPath)) failures.push("missing owner-vendored BOB #003 Arbiter Card packet");
else {
  const card = JSON.parse(fs.readFileSync(cardPath, "utf8"));
  if (card.packet_role !== "READ_ONLY_PUBLIC_CARD") failures.push("BOB #003 packet lost READ_ONLY_PUBLIC_CARD role");
  if (card.card?.source_math_fingerprint !== "2539b24aeba078a584b2169494fe586966aa5d518ec0994957d64822b2c1c5e5") failures.push("BOB #003 source fingerprint drifted");
  if (card.verdict_stage?.balance_blade?.label !== "ROUTE SHARE — NOT WIN PROBABILITY") failures.push("Balance Blade truth label drifted");
}
if (!fs.existsSync(boxComponentPath) || !/bob-0003-arbiter-card-comic-hud-v0\.3\.json/.test(fs.readFileSync(boxComponentPath, "utf8"))) {
  failures.push("BoxOBattlesApp must import the owner-vendored BOB #003 packet");
}

const dataPath = path.join(ROOT, "src", "data.ts");
const projectCardPath = path.join(ROOT, "src", "components", "ProjectCard.tsx");
const contractPath = path.join(ROOT, "docs", "VISUAL_TRUTH_CONTRACT.md");
const data = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, "utf8") : "";
const projectCard = fs.existsSync(projectCardPath) ? fs.readFileSync(projectCardPath, "utf8") : "";
const contract = fs.existsSync(contractPath) ? fs.readFileSync(contractPath, "utf8") : "";

const stalePublicLabels = [
  "WHAT WE FED title sigil",
  "Wild Fable Ink",
  "Mythic Necro-Sport Anime",
  "Crown Biology / Mathematical Mutation",
  "All-Ages Mythic Color",
  "Cosmic Slate / Dark Field Archive",
];
for (const label of stalePublicLabels) {
  if (data.includes(label)) failures.push(`src/data.ts: retired or invented public label returned: ${label}`);
}

if (/src:\s*["'`]([^"'`]*\/)?title_sigil\.png/i.test(data)) {
  failures.push("src/data.ts: atmospheric title_sigil.png must not be promoted as showcase media");
}

const requiredVisualTruth = [
  "CAPTURE_REQUIRED",
  "GL-WORLD-RUINED-DIVINE-MACHINE-001",
  "PROMOTED_RUNTIME_ENVIRONMENT",
  "GL-BODY-PLANS-001 + GL-ANATOMY-001",
  "WIRED_RUNTIME_CANDIDATE_DEVICE_PARTIAL",
  "Body-First Visual Engine",
];
for (const required of requiredVisualTruth) {
  if (!data.includes(required)) failures.push(`src/data.ts: missing visual evidence truth marker: ${required}`);
}

if (!projectCard.includes("PublicVisualEvidence") || !projectCard.includes("EvidenceCard")) {
  failures.push("src/components/ProjectCard.tsx: evidence-ranked visual renderer is missing");
}
if (!projectCard.includes("STUDIO_GENERATED_FRAMING") && !projectCard.includes("Studio-generated framing")) {
  failures.push("src/components/ProjectCard.tsx: procedural framing is not visibly separated from project evidence");
}
if (!contract.includes("File existence is not showcase fitness")) {
  failures.push("docs/VISUAL_TRUTH_CONTRACT.md: asset-promotion correction is missing");
}

const signalsPath = path.join(ROOT, "src", "data", "studioSignals.ts");
const signalsComponentPath = path.join(ROOT, "src", "components", "StudioSignals.tsx");
const methodGridPath = path.join(ROOT, "src", "components", "MethodGrid.tsx");
const signals = fs.existsSync(signalsPath) ? fs.readFileSync(signalsPath, "utf8") : "";
const signalsComponent = fs.existsSync(signalsComponentPath) ? fs.readFileSync(signalsComponentPath, "utf8") : "";
const methodGrid = fs.existsSync(methodGridPath) ? fs.readFileSync(methodGridPath, "utf8") : "";

for (const required of [
  "WITNESSED_OPERATIONALLY",
  "TESTED",
  "INTEGRATED",
  "CAPTURE_REQUIRED",
  "proofCeiling",
  "sourceLabel",
]) {
  if (!signals.includes(required)) failures.push(`src/data/studioSignals.ts: missing signal contract marker: ${required}`);
}
if (!signalsComponent.includes("Current studio signals") || !signalsComponent.includes("Proof ceiling")) {
  failures.push("src/components/StudioSignals.tsx: owned-web evidence presentation is missing");
}
if (!methodGrid.includes("<StudioSignals />")) {
  failures.push("src/components/MethodGrid.tsx: studio signals are not rendered");
}
if (!signalsComponent.includes("dry-run and human-approved")) {
  failures.push("src/components/StudioSignals.tsx: Quig publication boundary is missing");
}

const proceduralPath = path.join(ROOT, "src", "components", "ProceduralField.tsx");
const shellPath = path.join(ROOT, "src", "components", "StudioFieldShell.tsx");
const indexCssPath = path.join(ROOT, "src", "index.css");
const proceduralContractPath = path.join(ROOT, "docs", "PROCEDURAL_VISUAL_SYSTEM.md");
const spatialScanPath = path.join(ROOT, "scripts", "spatial-scan.mjs");
const workflowPath = path.join(ROOT, ".github", "workflows", "visual-proof.yml");
const procedural = fs.existsSync(proceduralPath) ? fs.readFileSync(proceduralPath, "utf8") : "";
const shell = fs.existsSync(shellPath) ? fs.readFileSync(shellPath, "utf8") : "";
const indexCss = fs.existsSync(indexCssPath) ? fs.readFileSync(indexCssPath, "utf8") : "";
const proceduralContract = fs.existsSync(proceduralContractPath) ? fs.readFileSync(proceduralContractPath, "utf8") : "";
const spatialScan = fs.existsSync(spatialScanPath) ? fs.readFileSync(spatialScanPath, "utf8") : "";
const visualWorkflow = fs.existsSync(workflowPath) ? fs.readFileSync(workflowPath, "utf8") : "";

for (const required of [
  "BAYER_4X4",
  "drawSteppedLine",
  "STUDIO_GENERATED_FRAMING",
  "prefers-reduced-motion",
  "imageSmoothingEnabled = false",
]) {
  if (!procedural.includes(required)) failures.push(`src/components/ProceduralField.tsx: missing procedural visual law marker: ${required}`);
}
if (!shell.includes("ProceduralField") || !shell.includes("ultramonkeydog-studios-public-field-2026")) {
  failures.push("src/components/StudioFieldShell.tsx: deterministic studio field shell is missing");
}
for (const required of ["--umd-ground", "--umd-bone", "--umd-rust", "image-rendering: pixelated", "backdrop-filter: none"] ) {
  if (!indexCss.includes(required)) failures.push(`src/index.css: missing material-system marker: ${required}`);
}
for (const rejected of [
  "fonts.googleapis.com",
  "blur(16px)",
  "blur(12px)",
  "#0ea5e9",
  "#8b5cf6",
  "linear-gradient(to bottom right, #ffffff, #a1a1aa)",
]) {
  if (indexCss.includes(rejected)) failures.push(`src/index.css: generic AI visual token returned: ${rejected}`);
}
for (const required of [
  "Hard tone bands",
  "Ordered dithering",
  "STUDIO_GENERATED_FRAMING",
  "The same seed and viewport class must reproduce the same composition",
]) {
  if (!proceduralContract.includes(required)) failures.push(`docs/PROCEDURAL_VISUAL_SYSTEM.md: missing contract marker: ${required}`);
}
for (const required of ["Page.captureScreenshot", "TEXT_CLIPPED", "PAGE_HORIZONTAL_OVERFLOW", "LOW_CONTRAST_SAMPLE"]) {
  if (!spatialScan.includes(required)) failures.push(`scripts/spatial-scan.mjs: missing visual proof check: ${required}`);
}
if (!visualWorkflow.includes("npm run spatial:scan") || !visualWorkflow.includes("upload-artifact")) {
  failures.push(".github/workflows/visual-proof.yml: visual proof execution or artifact upload is missing");
}

if (failures.length > 0) {
  console.error("Public boundary check failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Public boundary check passed: owner packet identity, public/private separation, evidence-ranked visuals, deterministic procedural framing, and browser visual-proof gates are intact.");
