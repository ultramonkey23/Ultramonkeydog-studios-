/**
 * SEO output verifier.
 *
 * Programmatic inspection of the built `dist/` output: proves that the static
 * home document carries real copy, JSON-LD and meta tags; that robots.txt,
 * sitemap.xml, llms.txt and llms-full.txt exist and are well-formed; and that
 * every static route has one h1, a canonical and indexable robots directives.
 *
 * Run after the build: `npm run seo:verify` (or `node scripts/verify-seo-output.mjs`).
 * Exits non-zero on the first failed assertion set so it can gate deploys.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const ORIGIN = "https://ultramonkeydog-studios.vercel.app";

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
}

function read(rel) {
  return fs.readFileSync(path.join(DIST, rel), "utf8");
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    });
}

if (!fs.existsSync(DIST)) {
  console.error("seo-verify: dist/ not found — run the build first");
  process.exit(1);
}

// --- Home document -------------------------------------------------------
const home = read("index.html");
check("home: static copy present", home.includes("Ultramonkeydog Studios") && home.length > 10000, `${home.length} bytes`);
check("home: h1 present", /<h1[ >]/.test(home));
check("home: canonical", home.includes(`<link rel="canonical" href="${ORIGIN}/"`));
check("home: robots meta index", /<meta name="robots" content="index, follow/.test(home));
check("home: og:title + og:image", home.includes('property="og:title"') && home.includes('property="og:image"'));
check("home: twitter:card summary_large_image", home.includes('name="twitter:card" content="summary_large_image"'));
check("home: manifest link", home.includes('rel="manifest" href="/manifest.webmanifest"'));

const homeLd = jsonLdBlocks(home);
const graph = homeLd.flatMap((block) => block?.["@graph"] ?? []);
const organization = graph.find((node) => node["@type"] === "Organization");
const itemList = graph.find((node) => node["@type"] === "ItemList");
check("home: JSON-LD parses", homeLd.length > 0 && homeLd.every(Boolean));
check("home: JSON-LD Organization + sameAs", Boolean(organization?.sameAs?.length >= 3), organization?.sameAs?.join(", "));
check("home: JSON-LD VideoGame ItemList", Boolean(itemList?.itemListElement?.length >= 5), `${itemList?.itemListElement?.length ?? 0} entries`);

// --- robots.txt ----------------------------------------------------------
const robots = read("robots.txt");
const requiredAgents = ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];
check("robots.txt: named crawlers allowed", requiredAgents.every((agent) => new RegExp(`User-agent: ${agent}\\b`).test(robots)), requiredAgents.filter((a) => !new RegExp(`User-agent: ${a}\\b`).test(robots)).join(","));
check("robots.txt: sitemap declared", robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`));

// --- sitemap.xml ---------------------------------------------------------
const sitemap = read("sitemap.xml");
const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
const locs = urls.map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1]).filter(Boolean);
check("sitemap: entries with loc", urls.length > 10 && locs.length === urls.length, `${urls.length} URLs`);
check("sitemap: all locs absolute on origin", locs.every((loc) => loc.startsWith(`${ORIGIN}/`)));
check("sitemap: every entry has lastmod", urls.every((block) => /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(block)));
check("sitemap: changefreq + priority present", urls.every((block) => /<changefreq>/.test(block) && /<priority>/.test(block)));
check("sitemap: XML well-formed root", sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));

// --- llms.txt / llms-full.txt -------------------------------------------
for (const file of ["llms.txt", "llms-full.txt"]) {
  const text = read(file);
  check(`${file}: exists and dense`, text.includes("Ultramonkeydog Studios") && text.length > 800, `${text.length} bytes`);
}

// --- every static route --------------------------------------------------
const excludedDirs = new Set(["assets", "media", "captures", "box", "play"]);
function collectPages(relDir) {
  const absDir = path.join(DIST, relDir);
  const pages = [];
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const rel = path.join(relDir, entry.name);
    if (entry.isDirectory()) {
      if (relDir === "" && excludedDirs.has(entry.name)) continue;
      pages.push(...collectPages(rel));
    } else if (entry.name === "index.html") {
      pages.push(rel);
    }
  }
  return pages;
}
const routePages = collectPages("");
if (fs.existsSync(path.join(DIST, "play", "index.html"))) {
  routePages.push(path.join("play", "index.html"));
}
for (const rel of routePages) {
  const html = read(rel);
  const route = `/${rel.replace(/\/index\.html$/, "")}`;
  const canonicals = html.match(/<link rel="canonical"/g)?.length ?? 0;
  const h1s = html.match(/<h1[ >]/g)?.length ?? 0;
  check(`route ${route}: canonical + single h1 + indexable`, canonicals === 1 && h1s === 1 && !/noindex/.test(html), `canonicals=${canonicals} h1s=${h1s}`);
}

// --- dispatch pages carry Article JSON-LD --------------------------------
const dispatchPages = routePages.filter((rel) => rel.startsWith("dispatches/") && rel !== "dispatches/index.html");
for (const rel of dispatchPages) {
  const blocks = jsonLdBlocks(read(rel));
  check(`route /${rel.replace(/\/index\.html$/, "")}: Article JSON-LD`, blocks.some((block) => block?.["@type"] === "Article"));
}

// --- supporting files ----------------------------------------------------
check("404.html: exists, noindexed", fs.existsSync(path.join(DIST, "404.html")) && read("404.html").includes("noindex"));
const manifest = JSON.parse(read("manifest.webmanifest"));
check("manifest: name + icons", Boolean(manifest.name) && manifest.icons?.length >= 1, manifest.name);
check("manifest: served from dist", fs.existsSync(path.join(DIST, "manifest.webmanifest")));
check("feed.xml: rss present", read("feed.xml").includes("<rss"));

// --- report --------------------------------------------------------------
const failed = results.filter((result) => !result.ok);
for (const { name, ok, detail } of results) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
}
console.log(`\nseo-verify: ${results.length - failed.length}/${results.length} checks passed`);
if (failed.length > 0) {
  console.error(`seo-verify: ${failed.length} FAILED`);
  process.exit(1);
}
