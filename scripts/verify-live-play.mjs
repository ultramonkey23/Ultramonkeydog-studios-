/**
 * Deployed-runtime gate for mounted play bundles.
 *
 * "The HTML returns 200" is not a published game. This check opens the REAL
 * deployed URL the way a browser resolves it and asserts the whole asset chain
 * loads: every script/style reference in the served HTML must resolve against
 * the final (post-redirect) URL, stay inside the game's mount, and come back
 * 200 with a non-trivial body. The class of failure it exists to catch is the
 * 2026-10-05 white screen: /play/muttpit/ canonicalized to /play/muttpit under
 * trailingSlash:false, relative ./assets refs resolved to /play/assets/..., the
 * module 404'd, and the page rendered nothing.
 *
 * Browser-level gameplay proof is a separate, deeper rung (real browser). This
 * gate is the always-on deployed smoke: cheap, deterministic, no browser.
 *
 * Usage: node scripts/verify-live-play.mjs <url> --game <id>
 */

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const url = process.argv.find((a) => a.startsWith("http")) ?? "";
const game = arg("--game", "");
if (!url || !game) {
  console.error("FAIL verify-live-play: need <url> and --game <id>");
  process.exit(2);
}

const MIN_ASSET_BYTES = 512; // a 404 body is ~300 bytes; a real bundle is far larger
const failures = [];
const notes = [];

function fail(msg) {
  failures.push(msg);
  console.log(`FAIL ${msg}`);
}

async function fetchInfo(target) {
  try {
    const res = await fetch(target, { redirect: "follow" });
    const body = Buffer.from(await res.arrayBuffer());
    return { status: res.status, body, contentType: res.headers.get("content-type") ?? "", finalUrl: res.url };
  } catch (err) {
    return { status: 0, body: Buffer.alloc(0), contentType: "", finalUrl: target, error: String(err) };
  }
}

const page = await fetchInfo(url);
if (page.status !== 200) {
  fail(`page ${url} -> HTTP ${page.status} ${page.error ?? ""}`);
  process.exit(1);
}
notes.push(`page ${url} -> 200 (final ${page.finalUrl})`);

const html = page.body.toString("utf8");
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
const assetRefs = refs.filter((r) => /\.(js|css|mjs)(\?|$)/.test(r));
if (assetRefs.length === 0) {
  fail("served HTML declares no js/css assets at all");
}

const mount = `/play/${game}/`;
for (const ref of assetRefs) {
  const resolved = new URL(ref, page.finalUrl);
  const asset = await fetchInfo(resolved.href);
  const pathName = resolved.pathname;
  if (!pathName.startsWith(mount)) {
    fail(`asset ${ref} resolved to ${pathName} — escaped the ${mount} mount (canonicalization broke relative refs)`);
    continue;
  }
  if (asset.status !== 200) {
    fail(`asset ${pathName} -> HTTP ${asset.status}`);
    continue;
  }
  if (asset.body.length < MIN_ASSET_BYTES) {
    fail(`asset ${pathName} -> ${asset.body.length} bytes (below ${MIN_ASSET_BYTES}; looks like an error page)`);
    continue;
  }
  notes.push(`asset ${pathName} -> 200 (${asset.body.length} bytes)`);
}

for (const note of notes) console.log(`PASS ${note}`);
if (failures.length) {
  console.log(`RESULT: FAIL (${failures.length} problems) — a white screen is not a published game`);
  process.exit(1);
}
console.log("RESULT: PASS — deployed asset chain resolves and loads");
