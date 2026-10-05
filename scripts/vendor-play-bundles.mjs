/**
 * Play-bundle vendoring — the publication owner of mounted game builds.
 *
 * A game dist/ built with relative ("./assets/...") references only resolves
 * those assets correctly when the browser's URL ends in a slash. This site runs
 * `trailingSlash: false`, so /play/muttpit/ canonicalizes to /play/muttpit and
 * relative refs then resolve against /play/ -> 404 -> white screen. That is a
 * real production failure mode (observed 2026-10-05), not theory.
 *
 * This script owns the mount: it copies a built game into public/play/<game>/
 * and rewrites HTML asset references to ABSOLUTE /play/<game>/... URLs, so the
 * build works under any URL canonicalization. It records what was vendored in
 * a manifest so a publication claim can be tied to an exact source build.
 *
 * Usage: node scripts/vendor-play-bundles.mjs --game <id> [--from <dist-dir>]
 *   --from defaults to ../<game>/dist relative to this repo root.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const game = arg("--game", "");
if (!game) {
  console.error("FAIL vendor: --game <id> is required");
  process.exit(2);
}
const from = path.resolve(ROOT, arg("--from", path.join("..", game, "dist")));
const dest = path.join(ROOT, "public", "play", game);

if (!fs.existsSync(path.join(from, "index.html"))) {
  console.error(`FAIL vendor: no index.html in source dist ${from}`);
  process.exit(2);
}

const MAX_BYTES = 25 * 1024 * 1024;

// fresh copy — stale hashed assets from older builds must not survive
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(from, dest, { recursive: true });

const mount = `/play/${game}/`;
const htmlPath = path.join(dest, "index.html");
const before = fs.readFileSync(htmlPath, "utf8");
const after = before.replace(/(src|href)="\.\//g, `$1="${mount}`);
if (after === before) {
  console.warn("WARN vendor: no relative ./ refs found in index.html to rewrite");
}
fs.writeFileSync(htmlPath, after);

function dirSize(dir) {
  let total = 0;
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = dirSize(p);
      total += sub.total;
      files.push(...sub.files);
    } else {
      const size = fs.statSync(p).size;
      total += size;
      files.push({ file: path.relative(dest, p), bytes: size });
    }
  }
  return { total, files };
}

const { total, files } = dirSize(dest);
if (total >= MAX_BYTES) {
  console.error(`FAIL vendor: vendored build is ${total} bytes (>= 25MB budget)`);
  process.exit(1);
}

let sourceSha = "unknown";
try {
  sourceSha = execSync("git rev-parse --short HEAD", { cwd: from })
    .toString()
    .trim();
} catch {
  try {
    sourceSha = execSync("git -C .. rev-parse --short HEAD").toString().trim();
  } catch {
    /* keep unknown */
  }
}

const manifest = {
  schema: "studios_play_vendor_v1",
  game,
  mount,
  vendored_at: new Date().toISOString(),
  source_dist: path.relative(ROOT, from),
  source_sha: sourceSha,
  total_bytes: total,
  files,
};
fs.writeFileSync(path.join(dest, ".vendor-manifest.json"), JSON.stringify(manifest, null, 2));

const refs = [...after.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
console.log(`PASS vendor: ${game} -> public/play/${game} (${total} bytes, ${files.length} files, sha ${sourceSha})`);
console.log(`  html refs: ${refs.join(", ")}`);
