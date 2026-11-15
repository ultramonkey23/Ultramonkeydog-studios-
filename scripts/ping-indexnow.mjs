/**
 * IndexNow ping.
 *
 * Submits the studio's public URLs to the IndexNow shared endpoint so
 * Bing, DuckDuckGo and the AI search indexes that subscribe to it re-crawl
 * changed pages immediately after a deploy instead of waiting for a
 * scheduler. No dependencies: global fetch + the committed key file.
 *
 * The verification key is committed at public/<key>.txt so
 * https://ultramonkeydog-studios.vercel.app/<key>.txt proves ownership to
 * every participating engine. Rotate by replacing the key constant and the
 * key file together.
 *
 * Usage:
 *   node scripts/ping-indexnow.mjs                    # every URL in the live sitemap
 *   node scripts/ping-indexnow.mjs --local            # read dist/sitemap.xml instead
 *   node scripts/ping-indexnow.mjs --url /ghengis-mon /dispatches
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ORIGIN = "https://ultramonkeydog-studios.vercel.app";
const HOST = "ultramonkeydog-studios.vercel.app";
const KEY = "15f39537a6990debcd4ad3afc5c4e622";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_FILE = path.join(ROOT, "public", `${KEY}.txt`);

function fail(message) {
  console.error(`indexnow: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(KEY_FILE)) fail(`missing key file public/${KEY}.txt`);
if (fs.readFileSync(KEY_FILE, "utf8").trim() !== KEY) {
  fail(`public/${KEY}.txt does not contain the key`);
}

const args = process.argv.slice(2);
const local = args.includes("--local");
const urlIndex = args.indexOf("--url");
const explicit = urlIndex >= 0 ? args.slice(urlIndex + 1).filter((a) => !a.startsWith("--")) : [];

function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

let urls;
if (explicit.length > 0) {
  urls = explicit.map((value) =>
    /^https?:\/\//i.test(value) ? value : `${ORIGIN}${value.startsWith("/") ? value : `/${value}`}`,
  );
} else if (local) {
  const sitemapPath = path.join(ROOT, "dist", "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) fail("dist/sitemap.xml not found — run the build first");
  urls = urlsFromSitemap(fs.readFileSync(sitemapPath, "utf8"));
} else {
  const response = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!response.ok) fail(`live sitemap fetch failed: HTTP ${response.status}`);
  urls = urlsFromSitemap(await response.text());
}

if (urls.length === 0) fail("no URLs to submit");

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList: urls,
};

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

// 200/202 = accepted. 400/422 surface the submission problem, 429 means back
// off and retry later; all of them are reported, never hidden.
console.log(
  `indexnow: submitted ${urls.length} URL(s) to ${ENDPOINT} -> HTTP ${response.status}`,
);
if (response.status !== 200 && response.status !== 202) {
  console.error(`indexnow: body ${await response.text()}`);
  process.exit(1);
}
