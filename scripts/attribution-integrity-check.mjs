import fs from "node:fs";
import path from "node:path";

/**
 * Attribution integrity — the tagged link kit is the studio's source-attribution
 * instrument. A mistagged link, an empty tag value, or a dead destination loses
 * the very evidence a campaign is supposed to produce, silently.
 *
 * Fails on:
 *   INCOMPLETE_TAG_TRIO        a tagged link missing utm_source/medium/campaign
 *   EMPTY_TAG_VALUE            any utm_* parameter with an empty value
 *   DEAD_INTERNAL_DESTINATION  an internal destination that no page provides
 *   CONFLICTING_CHANNEL_TAGS   one destination+channel tagged two different ways
 *
 * Reports (never fails) external links without tags as UNKNOWN attribution,
 * matching the doctrine that untracked channel attribution stays UNKNOWN.
 */

const ROOT = process.cwd();
const scanRoots = ["docs", "src", "scripts", "README.md"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".html", ".css", ".xml"]);
const REQUIRED_TAGS = ["utm_source", "utm_medium", "utm_campaign"];

function collectFiles(entry) {
  const absolute = path.join(ROOT, entry);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  const out = [];
  for (const name of fs.readdirSync(absolute)) {
    if (name === "node_modules" || name === "dist") continue;
    out.push(...collectFiles(path.join(entry, name)));
  }
  return out.filter((file) => textExtensions.has(path.extname(file)));
}

function normalizePath(raw) {
  let value = String(raw || "").trim();
  value = value.replace(/^`+|`+$/g, "");
  if (value.startsWith("...")) value = value.slice(3);
  value = value.replace(/^https?:\/\/[^/]+/i, "");
  value = value.split("#")[0].split("?")[0];
  if (value.length > 1 && value.endsWith("/")) value = value.slice(0, -1);
  return value || "/";
}

function internalDestinations() {
  // Providers only: pages the build actually writes. Links elsewhere in the
  // tree are consumers and must never count as proof that a destination exists.
  const known = new Set(["/", "/feed.xml"]);
  const spine = path.join(ROOT, "scripts", "build-discovery-spine.mjs");
  if (fs.existsSync(spine)) {
    const text = fs.readFileSync(spine, "utf8");
    for (const match of text.matchAll(/writePage\(\s*"([^"]+)"/g)) known.add(`/${match[1]}`);
    for (const match of text.matchAll(/slug:\s*"([^"]+)"/g)) known.add(`/${match[1]}`);
    for (const match of text.matchAll(/^\s*"([a-z0-9-]+)":\s*\{/gm)) known.add(`/${match[1]}`);
    for (const match of text.matchAll(/written\.push\(([^)]*)\)/gs)) {
      for (const item of match[1].matchAll(/"([^"]+)"/g)) known.add(normalizePath(item[1]));
    }
  }
  const publicRoot = path.join(ROOT, "public");
  if (fs.existsSync(publicRoot)) {
    for (const file of collectFiles("public")) {
      const rel = "/" + path.relative(publicRoot, file).split(path.sep).join("/");
      known.add(normalizePath(rel.replace(/\/index\.html?$/i, "")));
    }
  }
  return known;
}

function extractTaggedLinks() {
  const found = [];
  for (const file of scanRoots.flatMap(collectFiles)) {
    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split("\n")) {
      if (!line.includes("utm_")) continue;
      for (const token of line.split(/[\s<>"']+/)) {
        if (!token.includes("utm_")) continue;
        const queryStart = token.indexOf("?");
        if (queryStart < 0) continue;
        const destination = token.slice(0, queryStart);
        const params = new Map();
        for (const pair of token.slice(queryStart + 1).split("&")) {
          const [key, ...rest] = pair.split("=");
          if (!key) continue;
          params.set(key.trim().toLowerCase(), rest.join("=").trim());
        }
        found.push({
          file: path.relative(ROOT, file),
          token,
          destination: normalizePath(destination),
          params,
          external: /^https?:\/\//i.test(destination),
        });
      }
    }
  }
  return found;
}

const failures = [];
const known = internalDestinations();
const links = extractTaggedLinks();
const channelIndex = new Map();
let untaggedExternal = 0;

for (const link of links) {
  const label = `${link.file}: ${link.token}`;
  const tagKeys = [...link.params.keys()].filter((key) => key.startsWith("utm_"));
  const missing = REQUIRED_TAGS.filter((tag) => !tagKeys.includes(tag));
  if (missing.length > 0) {
    failures.push(`INCOMPLETE_TAG_TRIO ${label} missing ${missing.join(", ")}`);
    continue;
  }
  for (const key of tagKeys) {
    if (!link.params.get(key)) failures.push(`EMPTY_TAG_VALUE ${label} (${key})`);
  }
  const dynamicDestination = link.token.slice(0, link.token.indexOf("?")).includes("${");
  if (!link.external && !dynamicDestination && !known.has(link.destination)) {
    failures.push(`DEAD_INTERNAL_DESTINATION ${label} (${link.destination} is not provided by any page)`);
  }
  const source = link.params.get("utm_source") || "?";
  const signature = `${link.params.get("utm_medium")}|${link.params.get("utm_campaign")}`;
  const channelKey = `${dynamicDestination ? link.token.split("?")[0] : link.destination}::${source}`;
  const previous = channelIndex.get(channelKey);
  if (previous && previous.signature !== signature) {
    failures.push(
      `CONFLICTING_CHANNEL_TAGS ${label} (${source} on ${link.destination} is both ${previous.signature} and ${signature}, attributed by ${previous.file})`,
    );
  } else if (!previous) {
    channelIndex.set(channelKey, { signature, file: link.file });
  }
}

for (const file of scanRoots.flatMap(collectFiles)) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/https?:\/\/[^\s<>"')\]]+/g)) {
    const token = match[0].replace(/[.,;:]+$/, "");
    if (token.includes("utm_")) continue;
    if (/ultramonkeydog-studios\.vercel\.app|itch\.io|youtube\.com|reddit\.com|bsky\.app|news\.ycombinator\.com/i.test(token)) {
      untaggedExternal += 1;
    }
  }
}

const channels = [...new Set([...channelIndex.keys()].map((key) => key.split("::")[1]))].sort();

if (failures.length > 0) {
  console.error("Attribution integrity check failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Attribution integrity check passed: ${links.length} tagged link(s) carry complete trios and live destinations; ` +
    `channels: ${channels.join(", ") || "none"}; ${untaggedExternal} untagged external link(s) remain UNKNOWN attribution.`,
);
