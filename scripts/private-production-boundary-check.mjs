import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const scanRoots = ["src", "public", "docs", "README.md", "metadata.json"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".html", ".css", ".txt"]);

const privateMarkers = [
  { label: "private studio engine name", pattern: /Ultramonkeydog\s+Lab/i },
  { label: "private organism boundary", pattern: /\bLAB_ORGANISM\b/i },
  { label: "private runtime module", pattern: /\blabcore\//i },
  { label: "private decision packet", pattern: /six_mind_decision_packet/i },
  { label: "private mind registry", pattern: /\bSIX_MINDS\b/i },
  { label: "private mind validation command", pattern: /four-mind-check/i },
  { label: "private architecture", pattern: /FOUR[- ]MIND|PROUST PATTERN|MYCELIAL SYMBIOSIS|ZERO[- ]POINT SPINE/i },
  { label: "private command surface", pattern: /Creator OS|Lab Cockpit|RUNTIME WATCHDOG/i },
  { label: "private organism claim", pattern: /The Lab is the read-only living organism/i },
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
  for (const marker of privateMarkers) {
    if (marker.pattern.test(content)) {
      failures.push(`${path.relative(ROOT, file)}: ${marker.label}`);
    }
  }
}

if (failures.length > 0) {
  console.error(
    "Private production boundary check failed:\n" +
      failures.map((failure) => `- ${failure}`).join("\n"),
  );
  process.exit(1);
}

console.log(
  "Private production boundary passed: the public studio repository exposes outcomes and approved evidence, not private architecture.",
);
