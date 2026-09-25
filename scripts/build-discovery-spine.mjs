/**
 * Public Discovery Spine.
 *
 * The front door at "/" is a single React page. Search engines, social cards,
 * link previews and anyone who wants to send someone to ONE project all need a
 * durable URL that contains real text. This script emits those URLs as static
 * HTML after the Vite build, straight from src/data.ts.
 *
 * src/data.ts stays the only owner of public project claims. This script
 * presents that data; it never invents a claim, a status, or a proof state.
 *
 * Output:
 *   dist/play/index.html      playable-right-now hub
 *   dist/press/index.html     shareable studio facts, approved copy and contact
 *   dist/<project-id>/index.html   one durable page per property
 *   dist/sitemap.xml
 */

import { build } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const ORIGIN = "https://ultramonkeydog-studios.vercel.app";
const OG_IMAGE = `${ORIGIN}/assets/og-card.png`;
const CONTACT = "haringcody@gmail.com";
const ITCH = "https://monkeydog23.itch.io/";

/** Load src/data.ts without duplicating it: bundle to a temp ESM file and import. */
async function loadProjectData() {
  const outfile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "umd-spine-")), "data.mjs");
  await build({
    entryPoints: [path.join(ROOT, "src", "data.ts")],
    outfile,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
  });
  return import(pathToFileURL(outfile).href);
}

const ACCENTS = {
  "neon-green": "#8fe36b",
  "electric-blue": "#5cc8ff",
  violet: "#b489ff",
  "warm-amber": "#f2b74c",
  crimson: "#ff5d5d",
};

/**
 * What a visitor can actually do, derived from the data rather than asserted.
 * This is the hierarchy the flat front door does not express.
 */
function actionTier(project) {
  if (project.demoUrl) {
    return { rank: 0, label: "PLAYABLE NOW", priority: "0.9" };
  }
  if (project.publicVisual.mediaState === "NATIVE_BUILD") {
    return { rank: 1, label: "IN DEVELOPMENT — NATIVE BUILD", priority: "0.7" };
  }
  if (project.publicVisual.mediaState === "PRECOMPUTED_MATRIX") {
    return { rank: 2, label: "INTERACTIVE MATCHUP MATRIX", priority: "0.7" };
  }
  return { rank: 3, label: "IN DEVELOPMENT", priority: "0.6" };
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const STYLE = `
:root{color-scheme:dark;--bone:#e9e3d6;--ink:#060608;--dim:#9b93a6;--edge:#241f2e}
*{box-sizing:border-box}
body{margin:0;background:var(--ink);color:var(--bone);
  font:16px/1.6 ui-sans-serif,system-ui,"Segoe UI",Helvetica,Arial,sans-serif}
a{color:var(--accent)}
.wrap{max-width:820px;margin:0 auto;padding:28px 20px 72px}
.crumb{font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;
  text-transform:uppercase;color:var(--dim)}
.crumb a{color:var(--dim);text-decoration:none;border-bottom:1px solid var(--edge)}
.crumb a:hover{color:var(--bone)}
.tier{display:inline-block;margin:26px 0 10px;padding:5px 11px;border:1px solid var(--accent);
  border-radius:2px;color:var(--accent);
  font:700 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.16em}
h1{margin:.1em 0 .12em;font-size:clamp(2rem,7vw,3.1rem);line-height:1.02;letter-spacing:-.02em}
.tone{margin:0 0 20px;color:var(--accent);font-size:1.05rem}
.lede{font-size:1.12rem;color:#cfc8bd}
h2{margin:44px 0 12px;font-size:.79rem;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
ul{margin:0;padding-left:1.15em}
li{margin:.42em 0}
.tags{display:flex;flex-wrap:wrap;gap:7px;padding:0;list-style:none;margin:14px 0 0}
.tags li{margin:0;padding:4px 9px;border:1px solid var(--edge);border-radius:2px;
  font-size:.76rem;color:var(--dim)}
.cta{display:inline-block;margin:6px 10px 6px 0;padding:13px 22px;border-radius:3px;
  background:var(--accent);color:var(--ink);font-weight:800;text-decoration:none;letter-spacing:.02em}
.cta--ghost{background:transparent;color:var(--bone);border:1px solid var(--edge);font-weight:600}
.card{border:1px solid var(--edge);border-left:2px solid var(--accent);border-radius:3px;
  padding:15px 17px;margin:11px 0;background:#0b0a10}
.card h3{margin:0 0 6px;font-size:1rem}
.state{font:700 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.13em;
  color:var(--accent);display:block;margin-bottom:7px}
.limit{margin:9px 0 0;padding-left:11px;border-left:1px solid var(--edge);color:var(--dim);font-size:.9rem}
.next{display:flex;flex-wrap:wrap;gap:9px;padding:0;list-style:none;margin:14px 0 0}
.next li{margin:0}
.next a{display:inline-block;padding:8px 13px;border:1px solid var(--edge);border-radius:2px;
  color:var(--bone);text-decoration:none;font-size:.9rem}
.next a:hover{border-color:var(--accent);color:var(--accent)}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--edge);color:var(--dim);font-size:.86rem}
`.trim();

function page({ slug, title, description, accent, body }) {
  const url = `${ORIGIN}/${slug}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Cody Haring">
<link rel="canonical" href="${url}">
<link rel="icon" href="/assets/og-card.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Ultramonkeydog Studios">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta name="theme-color" content="#060608">
<style>:root{--accent:${accent}}
${STYLE}</style>
</head>
<body>
<div class="wrap">
<p class="crumb"><a href="/">Ultramonkeydog Studios</a> &nbsp;/&nbsp; <a href="/play">Play</a></p>
${body}
<footer>
<p>Ultramonkeydog Studios — creator-owned, directed by Cody Haring.
Every state label on this page is copied from the studio's project record, including the parts that are not finished.</p>
<p><a href="/">Back to the front door</a> &middot; <a href="/press">Press &amp; collaboration</a> &middot; <a href="mailto:${CONTACT}">${CONTACT}</a></p>
</footer>
</div>
</body>
</html>
`;
}

function projectPage(project, siblings) {
  const tier = actionTier(project);
  const accent = ACCENTS[project.accentColor] ?? "#f2b74c";
  const visual = project.publicVisual;

  const parts = [];
  parts.push(`<p class="tier">${esc(tier.label)}</p>`);
  parts.push(`<h1>${esc(project.title)}</h1>`);
  if (project.tone) parts.push(`<p class="tone">${esc(project.tone)}</p>`);

  parts.push(`<h2>What is this?</h2>`);
  parts.push(`<p class="lede">${esc(project.description)}</p>`);
  parts.push(
    `<ul class="tags">${project.tags.map((tag) => `<li>${esc(tag)}</li>`).join("")}</ul>`,
  );

  parts.push(`<h2>What can I do right now?</h2>`);
  if (project.demoUrl) {
    parts.push(
      `<p><a class="cta" href="${esc(project.demoUrl)}">${esc(project.demoLabel ?? "Play it")}</a>` +
        `<a class="cta cta--ghost" href="/play">See everything playable</a></p>`,
    );
    parts.push(`<p>Runs in the browser. No install, no account, no launcher.</p>`);
  } else {
    parts.push(
      `<p>Not playable in a browser yet — this one is <strong>${esc(project.status)}</strong>. ` +
        `The honest answer is that you can read what it is and what has been proven, and then go play ` +
        `something that is finished enough to hand to a stranger.</p>`,
    );
    parts.push(`<p><a class="cta" href="/play">Play what is live</a></p>`);
  }

  if (project.systemsUnderTheHood?.length) {
    parts.push(`<h2>Why it is interesting</h2>`);
    parts.push(
      `<ul>${project.systemsUnderTheHood.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>`,
    );
  }

  parts.push(`<h2>What has actually been proven</h2>`);
  parts.push(`<p><strong>Current state:</strong> ${esc(project.status)}</p>`);
  parts.push(`<p>${esc(visual.note)}</p>`);
  if (project.expandedDetails) parts.push(`<p>${esc(project.expandedDetails)}</p>`);
  for (const item of visual.evidence ?? []) {
    parts.push(
      `<div class="card"><span class="state">${esc(item.state)}</span>` +
        `<h3>${esc(item.title)}</h3><p>${esc(item.note)}</p>` +
        (item.limitation ? `<p class="limit">Limit: ${esc(item.limitation)}</p>` : "") +
        `</div>`,
    );
  }

  parts.push(`<h2>Where do I go next?</h2>`);
  const links = siblings
    .filter((other) => other.id !== project.id)
    .sort((a, b) => actionTier(a).rank - actionTier(b).rank)
    .map((other) => `<li><a href="/${other.id}">${esc(other.title)}</a></li>`)
    .join("");
  parts.push(`<ul class="next">${links}</ul>`);

  return page({
    slug: project.id,
    title: `${project.title} — Ultramonkeydog Studios`,
    description: project.description,
    accent,
    body: parts.join("\n"),
  });
}

function playPage(projects) {
  const playable = projects.filter((project) => project.demoUrl);
  const rest = projects
    .filter((project) => !project.demoUrl)
    .sort((a, b) => actionTier(a).rank - actionTier(b).rank);

  const parts = [];
  parts.push(`<p class="tier">PLAY NOW</p>`);
  parts.push(`<h1>Play something weird.</h1>`);
  parts.push(
    `<p class="lede">Two Ultramonkeydog games run in a browser tab right now. ` +
      `No download, no account, no launcher. Start with either one.</p>`,
  );

  for (const project of playable) {
    const accent = ACCENTS[project.accentColor] ?? "#f2b74c";
    parts.push(
      `<div class="card" style="border-left-color:${accent}">` +
        `<span class="state" style="color:${accent}">PLAYABLE NOW</span>` +
        `<h3>${esc(project.title)}</h3>` +
        `<p>${esc(project.description)}</p>` +
        `<p><a class="cta" style="background:${accent}" href="${esc(project.demoUrl)}">` +
        `${esc(project.demoLabel ?? "Play it")}</a>` +
        `<a class="cta cta--ghost" href="/${project.id}">What is this?</a></p>` +
        `</div>`,
    );
  }

  parts.push(`<h2>Not playable in a browser yet</h2>`);
  parts.push(
    `<p>These are real and in progress. They are listed here so the answer to ` +
      `"what else is there?" is a link instead of a rumour.</p>`,
  );
  parts.push(
    `<ul class="next">${rest
      .map((project) => `<li><a href="/${project.id}">${esc(project.title)}</a></li>`)
      .join("")}</ul>`,
  );

  return page({
    slug: "play",
    title: "Play — Ultramonkeydog Studios",
    description:
      "Ultramonkeydog games you can play in a browser right now, plus everything else the studio is building.",
    accent: "#f2b74c",
    body: parts.join("\n"),
  });
}

function pressPage(projects) {
  const playable = projects.filter((project) => project.demoUrl);
  const inquiry = (subject, body) =>
    `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const parts = [
    `<p class="tier">STUDIO / PRESS / COLLABORATION</p>`,
    `<h1>Strange games. Deep systems.</h1>`,
    `<p class="lede">Ultramonkeydog Studios is Cody Haring's creator-owned home for games, creatures, sound, stories and strange tools. AI assists production; Cody directs the ideas, systems and final taste.</p>`,
    `<p><a class="cta" href="${esc(inquiry("Ultramonkeydog Studios — press inquiry", "Hi Cody,\n\nI'm reaching out from [outlet / channel] about [project / story].\n\nMy deadline or proposed timing is [date].\n"))}">Request an interview or assets</a>` +
      `<a class="cta cta--ghost" href="${esc(ITCH)}">Studio on itch.io</a></p>`,
    `<h2>Copy you can use</h2>`,
    `<div class="card"><h3>Short studio description</h3><p>Ultramonkeydog Studios is Cody Haring's creator-owned studio making systems-rich games, creature worlds, audio experiments and strange interactive projects. Its work blends dark humor, transformation and human-directed AI-assisted production.</p></div>`,
    `<div class="card"><h3>About Cody</h3><p>Cody Haring designs the studio's concepts and systems, directs the creative work, and makes final release decisions. His influences include death metal, underground hip hop, roguelites, anime, manga and horror.</p></div>`,
    `<h2>Playable coverage starting points</h2>`,
    `<p>These are public browser demos. Cover the current build you actually play; the games continue to evolve.</p>`,
  ];
  for (const project of playable) {
    parts.push(`<div class="card"><span class="state">PUBLIC BROWSER DEMO</span>` +
      `<h3>${esc(project.title)}</h3><p>${esc(project.description)}</p>` +
      `<p><a class="cta" href="${esc(project.demoUrl)}">${esc(project.demoLabel ?? "Play")}</a>` +
      `<a class="cta cta--ghost" href="/${esc(project.id)}">Project facts</a></p></div>`);
  }
  parts.push(
    `<h2>Audio creators: help shape Vocal</h2>`,
    `<p>Monkey's Ear is a developing family of audio modules. Its standalone Voice/Vocal VST3 is the first candidate for tester feedback. A Windows x64 tester bundle has an automated validation path; a public release and human REAPER listening approval are still pending. Request testing details and tell Cody your DAW, Windows version and the vocal problem you want it to solve.</p>`,
    `<p><a class="cta" href="${esc(inquiry("Monkey's Ear Vocal — tester interest", "Hi Cody,\n\nI want to test Vocal. My DAW and version: [ ].\nWindows version: [ ].\nVocal use case / problem: [ ].\nListening or workflow feedback I can provide: [ ].\n"))}">Ask about Vocal testing</a>` +
      `<a class="cta cta--ghost" href="https://github.com/ultramonkey23/monkeys-ear">See the audio project</a></p>`,
    `<h2>Studio image and usage</h2>`,
    `<p><a href="/assets/og-card.png">Download the 1200 × 630 studio image</a>. It is a conceptual studio image, not a screenshot from any playable game. For current game screenshots, footage, logos, or interview material, email Cody with the project and format you need.</p>`,
    `<h2>Contact and official links</h2>`,
    `<ul><li>Press, publishing, collaboration and tester inquiries: <a href="mailto:${CONTACT}">${CONTACT}</a></li>` +
      `<li><a href="${ORIGIN}/">Official studio website</a></li>` +
      `<li><a href="${esc(ITCH)}">Official itch.io storefront</a></li></ul>`,
  );
  return page({
    slug: "press",
    title: "Press & collaboration — Ultramonkeydog Studios",
    description: "Studio facts, approved descriptions, two playable browser demos, press contact and Monkey's Ear Vocal tester inquiries.",
    accent: "#f2b74c",
    body: parts.join("\n"),
  });
}

function sitemap(projects) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [
    { loc: `${ORIGIN}/`, priority: "1.0" },
    { loc: `${ORIGIN}/play`, priority: "0.9" },
    { loc: `${ORIGIN}/press`, priority: "0.7" },
    ...projects
      .slice()
      .sort((a, b) => actionTier(a).rank - actionTier(b).rank)
      .map((project) => ({ loc: `${ORIGIN}/${project.id}`, priority: actionTier(project).priority })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${entry.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function writePage(slug, html) {
  const dir = path.join(DIST, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error("discovery-spine: dist/ not found — run the Vite build first.");
    process.exit(1);
  }

  const { PROJECTS_DATA } = await loadProjectData();
  const written = [];

  writePage("play", playPage(PROJECTS_DATA));
  written.push("/play");

  writePage("press", pressPage(PROJECTS_DATA));
  written.push("/press");

  for (const project of PROJECTS_DATA) {
    writePage(project.id, projectPage(project, PROJECTS_DATA));
    written.push(`/${project.id}`);
  }

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap(PROJECTS_DATA), "utf8");
  written.push("/sitemap.xml");

  console.log(`discovery-spine: ${written.length} public URLs\n  ${written.join("\n  ")}`);
}

main().catch((error) => {
  console.error("discovery-spine failed:", error);
  process.exit(1);
});
