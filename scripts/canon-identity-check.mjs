import fs from "node:fs";
import path from "node:path";

// Cross-repository identity gate. Site identity prose is a claim about a canon
// owned by another repository (docs/CANON_IDENTITIES.md). This check fails the
// build when the site silently promotes superseded creative identity or drifts
// off the pinned canon markers.

const ROOT = process.env.CANON_SCAN_ROOT || process.cwd();
const contractPath = path.join(process.cwd(), "docs", "CANON_IDENTITIES.md");
const dataPath = path.join(ROOT, "src", "data.ts");
const failures = [];

if (!fs.existsSync(contractPath)) {
  failures.push("missing docs/CANON_IDENTITIES.md (identity canon contract)");
}
if (!fs.existsSync(dataPath)) {
  failures.push("missing src/data.ts");
}

function extractContract(source) {
  const match = source.match(/```json\n([\s\S]*?)```/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function walkFiles(dir, out) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const contractSource = fs.existsSync(contractPath)
  ? fs.readFileSync(contractPath, "utf8")
  : "";
const contract = extractContract(contractSource);

if (!contract || !Array.isArray(contract.canons)) {
  failures.push("docs/CANON_IDENTITIES.md: missing or unparsable canons json block");
}

const dataSource = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, "utf8") : "";
const lowerData = dataSource.toLowerCase();

// Public promotion surface scanned for superseded identity language.
const scanRoots = ["src", "public"].map((d) => path.join(ROOT, d));
const scanFiles = [
  ...walkFiles(scanRoots[0], []),
  ...walkFiles(scanRoots[1], []),
  path.join(ROOT, "index.html"),
].filter((p) => fs.existsSync(p));

for (const canon of contract?.canons || []) {
  const id = canon.id;
  const required = canon.required_markers || [];
  const superseded = canon.superseded_markers || [];
  const pinText = canon.pin_text || "";

  // The project entry slice in src/data.ts must carry the current canon.
  const entryStart = lowerData.indexOf(`id: "${id}"`);
  if (entryStart < 0) {
    failures.push(`src/data.ts: no project entry with id "${id}"`);
    continue;
  }
  const nextEntry = lowerData.indexOf('\n  },', entryStart);
  const entrySlice = dataSource.slice(entryStart, nextEntry < 0 ? undefined : nextEntry);
  const lowerEntry = entrySlice.toLowerCase();

  for (const marker of required) {
    if (!lowerEntry.includes(marker.toLowerCase())) {
      failures.push(
        `src/data.ts [${id}]: current canon marker missing: "${marker}" (spec ${canon.spec_version || "?"} @ ${canon.spec_commit || "?"})`,
      );
    }
  }
  if (pinText && !lowerEntry.includes(pinText.toLowerCase())) {
    failures.push(
      `src/data.ts [${id}]: canon pin "${pinText}" missing from the entry evidence note`,
    );
  }

  for (const file of scanFiles) {
    const text = fs.readFileSync(file, "utf8").toLowerCase();
    for (const marker of superseded) {
      if (text.includes(marker.toLowerCase())) {
        failures.push(
          `${path.relative(ROOT, file)}: superseded identity marker "${marker}" (${id} canon ${canon.spec_version || "?"})`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Canon identity check FAILED:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `Canon identity check passed: ${(contract?.canons || []).length} canon pin(s) held, no superseded identity language on the public surface.`,
);
