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
 *   dist/dispatches/<slug>/index.html   durable studio editorials
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
const OG_IMAGE = `${ORIGIN}/assets/studio-share-v3.png`;
const CONTACT = "haringcody@gmail.com";
const ITCH = "https://monkeydog23.itch.io/";

/** Load src/data.ts without duplicating it: bundle to a temp ESM file and import. */
async function loadProjectData() {
  const outfile = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), "umd-spine-")),
    "data.mjs",
  );
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
.limit{margin:9px 0 0;padding-left:11px;border-left:1px solid var(--edge);color:var(--dim);font-size:1rem}
.next{display:flex;flex-wrap:wrap;gap:9px;padding:0;list-style:none;margin:14px 0 0}
.next li{margin:0}
.next a{display:inline-block;padding:8px 13px;border:1px solid var(--edge);border-radius:2px;
  color:var(--bone);text-decoration:none;font-size:1rem}
.wrap{overflow-wrap:break-word}
a:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
.cta,.next a{min-height:44px}
@media(max-width:480px){.wrap{padding:20px 16px 48px}.cta{display:block;margin-right:0;text-align:center}h1{font-size:clamp(1.8rem,8vw,2.3rem)}}
.next a:hover{border-color:var(--accent);color:var(--accent)}
footer{margin-top:56px;padding-top:20px;border-top:1px solid var(--edge);color:var(--dim);font-size:.86rem}
`.trim();

function page({
  slug,
  title,
  description,
  accent,
  body,
  crumbHref = "/play",
  crumbLabel = "Play",
  pageClass = "",
  stylesheet = "",
  ogImage = OG_IMAGE,
  ogImageAlt = "Ultramonkeydog Studios: We make weird things that bite back. AI-assisted studio illustration, not gameplay.",
  ogImageWidth = 1200,
  ogImageHeight = 630,
}) {
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
<link rel="icon" href="/assets/studio-mark.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Ultramonkeydog Studios">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="${esc(ogImageWidth)}">
<meta property="og:image:height" content="${esc(ogImageHeight)}">
<meta property="og:image:alt" content="${esc(ogImageAlt)}">
<meta name="twitter:image:alt" content="${esc(ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<meta name="theme-color" content="#060608">
${stylesheet ? `<link rel="stylesheet" href="${esc(stylesheet)}">` : ""}
<style>:root{--accent:${accent}}
${STYLE}</style>
</head>
<body class="${esc(pageClass)}">
<div class="wrap">
<p class="crumb"><a href="/">Ultramonkeydog Studios</a> &nbsp;/&nbsp; <a href="${esc(crumbHref)}">${esc(crumbLabel)}</a></p>
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

function receiptsDispatch(projects) {
  const muttpit = projects.find((project) => project.id === "muttpit");
  if (!muttpit?.demoUrl) throw new Error("MUTTPIT public play URL is required for the receipts dispatch");
  const capture = muttpit.publicVisual.evidence?.find((item) => item.id === "muttpit-bout");
  if (!capture?.src) throw new Error("MUTTPIT runtime bout capture is required for the receipts dispatch");
  const captureUrl = `${ORIGIN}${capture.src}`;
  const body = [
    `<article class="dispatch">`,
    `<header class="dispatch-hero"><div><p class="dispatch-kicker">STUDIO DISPATCH 02 / OCTOBER 8, 2026</p><h1><span>A fight</span><span>should keep</span><em>its receipts.</em></h1><p class="dispatch-deck">Why MUTTPIT makes the outcome inspectable—and why that matters more than pretending the machine is magic.</p><a class="dispatch-cta" href="${esc(muttpit.demoUrl)}">Enter the Pit ↗</a><p class="dispatch-boundary">Free browser build. No account. No install. Keyboard or touch.</p></div><figure><img src="${esc(capture.src)}" width="${esc(capture.width ?? 1280)}" height="${esc(capture.height ?? 757)}" alt="${esc(capture.alt)}"><figcaption>REAL RUNTIME CAPTURE / SHIPPED BROWSER BUILD</figcaption></figure></header>`,
    `<section class="dispatch-body"><p class="dispatch-lead">Most auto-battlers ask you to trust the result. MUTTPIT lets the result show its work.</p><p>You draft four scarred, junk-armored mongrels. You decide each dog’s bite order. Then you mail that exact kennel into the Pit. The fight resolves from the two builds and a seed: same kennels, same seed, same event log, same replay hash.</p><p>That does not make the dogs predictable. Temperament, strain, stats, scars and the order of their moves still collide. It makes the consequence legible. When your kennel gets broken, you can inspect why, change the build and send it back meaner.</p><blockquote>Randomness can create a story. Hidden causality only creates an excuse.</blockquote><p>The idea comes from the same obsession running through Ultramonkeydog Studios: growth should change identity and action, and feedback should reveal cause, state, timing and consequence. In MUTTPIT, the receipts are part of the fantasy. The Pit is brutal. The verdict is not a shrug.</p></section>`,
    `<section class="dispatch-mechanism"><p class="dispatch-kicker">THE LOOP</p><ol><li><span>01</span><strong>Draft a kennel.</strong><p>Four dogs. Six strains. Different stats, temperaments and grudges.</p></li><li><span>02</span><strong>Write the bite order.</strong><p>The sequence of attacks is part of the build, not decoration.</p></li><li><span>03</span><strong>Mail it to a rival.</strong><p>Share a Kennel Code. No synchronous lobby or live-service account.</p></li><li><span>04</span><strong>Audit the verdict.</strong><p>The event log and Verdict Packet make the outcome replayable and tamper-evident.</p></li></ol></section>`,
    `<section class="dispatch-body"><h2>Made by one outsider, with a lot of strange machinery</h2><p>I’m Cody Haring, a self-taught autistic creator. I use AI as a bridge across code, art and production, then direct, test, reject and reshape the result until it belongs to this studio. MUTTPIT’s dog art is AI-assisted and art-directed; its game rules, interface, writing and final decisions are human-directed.</p><p>This is a small game, not the studio’s flagship and not a promise that everything else is ready. It is real work you can play today—and a clean sample of what Ultramonkeydog values: creatures as mechanics, systems with consequences, and enough honesty to show where the machine ends and the human judgment begins.</p><p class="dispatch-boundary">Public proof: the browser build and captures linked here were live when this dispatch was published. Audience demand, long-term balance and commercial readiness are not established.</p></section>`,
    `<section class="dispatch-end"><p class="dispatch-kicker">THE PIT IS OPEN</p><h2>Build four dogs.<br>Send back a verdict.</h2><p><a class="dispatch-cta" href="${esc(muttpit.demoUrl)}">Play MUTTPIT now ↗</a><a class="dispatch-link" href="/muttpit">Read the game record</a></p></section>`,
    `</article>`,
  ];
  return page({
    slug: "dispatches/the-pit-keeps-receipts",
    title: "A Fight Should Keep Its Receipts — Ultramonkeydog Studios",
    description: "Inside MUTTPIT’s deterministic mailed-in fights: draft four mongrels, write their bite order, and inspect the verdict instead of trusting a black box.",
    accent: "#efad47",
    body: body.join("\n"),
    crumbHref: "/muttpit",
    crumbLabel: "MUTTPIT",
    pageClass: "dispatch-page",
    stylesheet: "/assets/studio-dispatch-v1.css",
    ogImage: captureUrl,
    ogImageAlt: capture.alt,
    ogImageWidth: capture.width ?? 1280,
    ogImageHeight: capture.height ?? 757,
  });
}

function privateEngineDispatch() {
  const body = [
    `<article class="engine-dispatch">`,
    `<header class="engine-hero"><div><p class="engine-kicker">STUDIO DISPATCH 03 / OCTOBER 10, 2026</p><h1>The machine stays <em>private.</em><br>The work has to survive <strong>in public.</strong></h1><p class="engine-deck">Ultramonkeydog Studios is one human director using AI as a bridge across disciplines—not a secret team, an effortless content factory, or a machine replacing judgment.</p><p><a class="engine-cta" href="/press">Open the public studio record ↗</a></p></div><figure><img src="/assets/studio-transformation-cover-v2.webp" width="1024" height="1536" alt="Studio illustration of a small vulnerable creature transforming into a large bone-armored predator"><figcaption>AI-ASSISTED STUDIO ILLUSTRATION / NOT GAMEPLAY</figcaption></figure></header>`,
    `<section class="engine-body"><p class="engine-lead">The private system can help Cody move faster. It cannot make the work worth caring about.</p><p>I’m Cody Haring: a self-taught autistic creator building games, audio tools and unusual software. I use a private creation engine to coordinate research, criticism and execution across disciplines I could not staff in the traditional way.</p><p>That engine is leverage, not authorship. I originate the concepts, design the systems, set the constraints, reject the wrong answers, integrate the pieces and decide what earns release. When the machinery produces generic work, the answer is not to market it harder. The answer is to cut it, correct it or make it stranger.</p><blockquote>Private machinery earns nothing. Public work has to carry its own weight.</blockquote></section>`,
    `<section class="engine-ledger" aria-labelledby="ledger-title"><div><p class="engine-kicker">THE PUBLIC / PRIVATE LINE</p><h2 id="ledger-title">No magic curtain.<br><em>A hard boundary.</em></h2></div><dl><div><dt>PUBLIC</dt><dd>Playable artifacts, honest status, source when a project is ready, visible limitations and a direct way to respond.</dd></div><div><dt>PRIVATE</dt><dd>The studio’s internal creation system, working state, private research and unreleased project material.</dd></div><div><dt>HUMAN</dt><dd>Concept, taste, system design, criticism, integration, acceptance and the final decision to ship—or not.</dd></div></dl></section>`,
    `<section class="engine-body"><h2>Proof is the part a stranger can touch.</h2><p>The studio website and press record are public. MAW’s source and setup are public. MUTTPIT is a small playable sample, not the flagship. Prehensile is still experimental and not yet presented as a public product. The flagship worlds remain in development.</p><p>Those boundaries matter. A build passing on one machine is not broad compatibility. An accessibility intention is not an accessibility outcome. A strange internal architecture is not audience demand. Each claim has to stop where the evidence stops.</p><p class="engine-boundary">Current proof ceiling: public pages, one browser-playable portfolio sample, a public MAW repository, and bounded development evidence described on the studio record. Audience demand, commercial readiness, broad compatibility and sustained autonomous operation are not established.</p></section>`,
    `<section class="engine-end"><p class="engine-kicker">ONE HUMAN DIRECTOR / WORK YOU CAN INSPECT</p><h2>Don’t trust the machine.<br><em>Judge what survived it.</em></h2><p><a class="engine-cta" href="/press">Meet Cody + inspect the record ↗</a><a class="engine-link" href="/#creation-tools">See the creation tools</a></p></section>`,
    `</article>`,
  ];
  return page({
    slug: "dispatches/the-machine-stays-private",
    title: "The Machine Stays Private. The Work Has to Survive in Public. — Ultramonkeydog Studios",
    description: "Cody Haring on building Ultramonkeydog Studios with a private AI-assisted creation engine, human direction, and public proof that stops where the evidence stops.",
    accent: "#c8ff3d",
    body: body.join("\n"),
    crumbHref: "/#cody",
    crumbLabel: "Cody Haring",
    pageClass: "engine-page",
    stylesheet: "/assets/studio-engine-dispatch-v1.css",
  });
}

const FLAGSHIP_DOORWAYS = {
  "savage-crown": {number: "01", lane: "MUTATION / CONSEQUENCE", hook: "Become the thing the world fears.", direction: "Biological horror, hostile supernatural systems, and a creature identity shaped by mutation, grafts and passive synergy. The ambition is earned monstrous escalation—not growth that only changes a number.", accent: "#ee8765"},
  "what-we-fed": {number: "02", lane: "HUNGER / BOND", hook: "Hunger is a choice. So is attachment.", direction: "Bond vs Eat puts attachment and consumption at the center of creature growth. Hunger, mutation pressure and music-driven escalation belong to the same wondrous, mythic creature world.", accent: "#b5c279"},
  "saga-anxious-fluff": {number: "03", lane: "TENDERNESS / DEPTH", hook: "Wonder deserves depth.", direction: "Tenderness, strange creatures and deep progression belong in the same family-facing world. Sensory-aware design is an intent; tested accessibility outcomes are not established.", accent: "#e0bf89"},
};

function projectPage(project, siblings) {
  const doorway = FLAGSHIP_DOORWAYS[project.id];
  const tier = actionTier(project);
  const accent = doorway?.accent ?? ACCENTS[project.accentColor] ?? "#f2b74c";
  const visual = project.publicVisual;

  const parts = [];
  if (doorway) parts.push(`<header class="project-cover"><p class="project-lane">${doorway.number} / ${esc(doorway.lane)}</p>`);
  parts.push(`<p class="tier">${esc(tier.label)}</p>`);
  parts.push(`<h1>${esc(project.title)}</h1>`);
  if (doorway) parts.push(`<p class="project-hook">${esc(doorway.hook)}</p></header>`);
  else if (project.tone) parts.push(`<p class="tone">${esc(project.tone)}</p>`);

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
    parts.push(
      `<p>Runs in the browser. No install, no account, no launcher.</p>`,
    );
  } else if (doorway) {
    const inquiry = `mailto:${CONTACT}?subject=${encodeURIComponent(`[UMD PROJECT] ${project.title}`)}&body=${encodeURIComponent(`Hi Cody,\n\nI'm interested in ${project.title}.\nMy question or idea:\nRelevant link (optional):\nTiming (if relevant):\n`)}`;
    parts.push(`<p>This project is in development. There is no public playable release offered on this page. Read the current evidence below, or ask Cody a specific question about the project.</p>`);
    parts.push(`<p><a class="cta" href="${esc(inquiry)}">Ask about ${esc(project.title)}</a></p><p class="contact-boundary">Opens your email app. No signup or mailing-list enrollment. Please do not send confidential material.</p>`);
  } else {
    parts.push(
      `<p>Not playable in a browser yet — this one is <strong>${esc(project.status)}</strong>. ` +
        `The honest answer is that you can read what it is and what has been proven, and then go play ` +
        `something that is finished enough to hand to a stranger.</p>`,
    );
    parts.push(`<p><a class="cta" href="/play">Play what is live</a></p>`);
  }

  if (doorway) parts.push(`<h2>The design obsession</h2><p class="lede">${esc(doorway.direction)}</p>`);
  if (project.systemsUnderTheHood?.length) {
    if (doorway) parts.push(`<details class="proof-record"><summary>Explore the development systems</summary>`);
    else parts.push(`<h2>Why it is interesting</h2>`);
    parts.push(
      `<ul>${project.systemsUnderTheHood.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>`,
    );
  }

  if (doorway && project.systemsUnderTheHood?.length) parts.push(`</details>`);
  parts.push(`<h2>What has actually been proven</h2>`);
  parts.push(`<p><strong>Current state:</strong> ${esc(project.status)}</p>`);
  parts.push(`<p>${esc(visual.note)}</p>`);
  if (project.expandedDetails)
    parts.push(`<p>${esc(project.expandedDetails)}</p>`);
  if (doorway && visual.evidence?.length) parts.push(`<details class="proof-record"><summary>Read the evidence and its limits</summary>`);
  for (const item of visual.evidence ?? []) {
    parts.push(
      `<div class="card"><span class="state">${esc(item.state)}</span>` +
        `<h3>${esc(item.title)}</h3><p>${esc(item.note)}</p>` +
        (item.limitation
          ? `<p class="limit">Limit: ${esc(item.limitation)}</p>`
          : "") +
        `</div>`,
    );
  }

  if (doorway && visual.evidence?.length) parts.push(`</details>`);
  parts.push(`<h2>More from the studio</h2>`);
  const links = siblings
    .filter((other) => other.id !== project.id && other.id !== "bone-league")
    .sort((a, b) => (FLAGSHIP_DOORWAYS[a.id] ? 0 : 1) - (FLAGSHIP_DOORWAYS[b.id] ? 0 : 1))
    .map((other) => `<li><a href="/${other.id}">${esc(other.title)}</a></li>`)
    .join("");
  parts.push(`<ul class="next">${links}</ul>`);

  return page({
    slug: project.id,
    title: `${project.title} — Ultramonkeydog Studios`,
    description: project.description,
    accent,
    body: parts.join("\n"),
    crumbHref: "/#worlds",
    crumbLabel: "The work",
    pageClass: doorway ? `project-page project-page--${project.id}` : "",
    stylesheet: doorway ? "/assets/studio-project-v3.css" : "",
  });
}

function playPage(projects) {
  const playable = projects.filter((project) => project.demoUrl && project.id !== "bone-league");
  const rest = projects
    .filter((project) => !project.demoUrl)
    .sort((a, b) => actionTier(a).rank - actionTier(b).rank);

  const parts = [];
  parts.push(`<p class="tier">PLAY NOW</p>`);
  parts.push(`<h1>Play something weird.</h1>`);
  const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const playableCount = COUNT_WORDS[playable.length] ?? String(playable.length);
  parts.push(
    `<p class="lede">${playableCount} Ultramonkeydog ${playable.length === 1 ? "game runs" : "games run"} in a browser tab right now. ` +
      `These are playable portfolio proof, not a studio release announcement. ` +
      `The flagship worlds remain in development.</p>`,
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

  parts.push(`<details><summary>Earlier project archive</summary><p>Bone League is a smaller project, not ready to lead outreach or release work.</p><p><a href="/bone-league">Read the archived project record</a></p></details>`);
  parts.push(`<h2>Flagship and other work in development</h2>`);
  parts.push(
    `<p>These are real and in progress. They are listed here so the answer to ` +
      `"what else is there?" is a link instead of a rumour.</p>`,
  );
  parts.push(
    `<ul class="next">${rest
      .map(
        (project) =>
          `<li><a href="/${project.id}">${esc(project.title)}</a></li>`,
      )
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
  const inquiry = `mailto:${CONTACT}?subject=${encodeURIComponent("[UMD PRESS] Interview or assets")}&body=${encodeURIComponent("Hi Cody,\n\nMy outlet or project:\nStory or collaboration idea:\nAssets requested:\nTiming:\n")}`;
  const ids = ["savage-crown", "what-we-fed", "saga-anxious-fluff"];
  const featured = ids
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);
  const feral = projects.find((project) => project.id === "feral-formation");
  const parts = [
    `<header class="press-cover"><div><p class="press-eyebrow">CREATOR-OWNED / HUMAN-DIRECTED / PRESS KIT</p><h1>Cody Haring.<br><em>Ultramonkeydog<br>Studios.</em></h1><p class="press-deck">One human director.<br>A private creation engine.<br>Strange work with teeth.</p><p class="lede">Games, creature worlds, audio experiments and unusual software. Cody originates the concepts, designs the causal systems, directs AI-assisted production and decides what earns release.</p><a class="cta" href="${esc(inquiry)}">Request an interview or assets ↗</a></div><figure><img src="/assets/studio-transformation-cover-v2.webp" width="1024" height="1536" alt="Studio cover illustration of a small creature transforming into a large bone-armored predator"><figcaption>AI-assisted studio illustration. Not gameplay.</figcaption></figure></header>`,
    `<section class="press-editorial"><div><p class="press-eyebrow">THE HUMAN / REUSABLE BIO</p><h2>Self-taught.<br>Independent.<br><em>Unusual by design.</em></h2></div><div><p>Cody Haring is a self-taught autistic creator and the founder of Ultramonkeydog Studios. He uses AI as a bridge across disciplines while retaining authorship, design, criticism and final authority.</p><p>His work draws from death-metal tension, underground-hip-hop recombination, creature obsession, RPGs, horror and family life. Weak beginnings can become feared; growth changes identity, actions and world response. Darkness leaves room for humor, tenderness, mystery and wonder.</p></div></section>`,
    `<section class="press-description"><p class="press-eyebrow">COPY YOU CAN USE / STUDIO DESCRIPTION</p><p>Ultramonkeydog Studios is Cody Haring’s privately owned studio for systems-heavy games, creature worlds, audio experiments and unusual software. Its signature is transformation with consequences, dark humor and human-directed production. Creative authority and original IP stay with the studio.</p></section>`,
    `<section class="press-stories"><p class="press-eyebrow">STORY ANGLES</p><h2>More than an AI novelty story.</h2><ol><li><strong>The outsider’s bridge.</strong> A self-taught creator building a private creation engine with ordinary subscriptions and modest model credits. Cody’s account, not an audited productivity claim.</li><li><strong>Transformation with consequences.</strong> Creature worlds where growth changes what you can do and how the world responds.</li><li><strong>Human direction.</strong> AI as a production bridge, with a human author making the decisions.</li><li><strong>Room for overlooked people.</strong> Work intended for overlooked, disabled and neurodivergent people. Tested accessibility outcomes are not yet established.</li></ol></section>`,
    `<section class="press-projects"><p class="press-eyebrow">CURRENT WORK / NOT RELEASE ANNOUNCEMENTS</p><h2>Different worlds.<br>Distinct ambitions.</h2>`,
  ];
  for (const [index, project] of featured.entries()) {
    parts.push(
      `<article class="press-project" data-project="${esc(project.id)}"><span class="press-number">0${index + 1}</span><div><p class="press-eyebrow">${esc(project.id === "savage-crown" ? "FLAGSHIP / IN DEVELOPMENT" : "IN DEVELOPMENT")}</p><h3>${esc(project.title)}</h3></div><div><p>${esc(project.description)}</p><p class="limit">${esc(project.status)}</p><a href="/${esc(project.id)}">Project and current evidence ↗</a></div></article>`,
    );
  }
  parts.push(
    `</section><section id="monkeys-ear" class="press-audio"><p class="press-eyebrow">AUDIO / VALIDATION IN PROGRESS</p><h2>Monkey’s Ear.</h2><p>Audio modules and plugins in development. Voice/Vocal is the current validation candidate; the future integrated instrument is not a current release claim.</p><p class="limit">A Windows Vocal candidate has automated build and state-reconstruction proof. Real host workflow, listening and stable-distribution evidence remain incomplete. No commercial release, audio-quality or latency claim is made here.</p></section>`,
  );
  if (feral?.demoUrl)
    parts.push(
      `<section class="press-demo"><p class="press-eyebrow">SECONDARY PORTFOLIO PROOF</p><h2>A smaller piece you can try.</h2><p>${esc(feral.description)}</p><p><a class="cta cta--ghost" href="${esc(feral.demoUrl)}">Try Feral Formation ↗</a></p><p class="limit">A public browser demo. Not the studio’s flagship launch.</p></section>`,
    );
  parts.push(
    `<section class="press-editorial"><div><p class="press-eyebrow">INDEPENDENT BY DESIGN</p><h2>Original products.<br><em>Creative control.</em></h2></div><div><p>The studio’s path is original products, direct audience support, grants, credits and selective partnerships that preserve creative control. It is not offering consulting or custom client services. The private creation engine is not for sale or public access.</p><p>Paid roles, budgets and partnership terms require a separate explicit agreement. No compensation or revenue share is promised here.</p></div></section>`,
    `<section class="press-assets"><p class="press-eyebrow">ASSETS / OFFICIAL LINKS</p><h2>Use the right evidence.</h2><p><a href="/assets/studio-transformation-cover-v2.webp">View the studio cover illustration</a> · <a href="/assets/studio-share-v3.png">1200 × 630 studio share image</a>. Both are conceptual studio artwork, not gameplay. Ask about art reuse and request current screenshots, footage or logos through the contact action.</p><ul class="next"><li><a href="${ORIGIN}/">Official studio website</a></li><li><a href="${esc(ITCH)}">Official itch.io storefront</a></li></ul></section>`,
    `<section class="press-inquiry"><p class="press-eyebrow">ONE SPECIFIC CONVERSATION</p><h2>Interview, assets,<br><em>or an aligned opportunity?</em></h2><p>Tell Cody your outlet or project, the idea, the assets you need and the timing. A clear request is more useful than a vague collaboration offer.</p><p><a class="cta" href="${esc(inquiry)}">Request an interview or assets ↗</a></p><p class="limit">You choose what to share through your email app. No mailing-list enrollment. Do not send confidential material.</p></section>`,
  );
  return page({
    slug: "press",
    title: "Ultramonkeydog Studios Press Kit | Cody Haring",
    description:
      "Meet Cody Haring’s creator-owned studio: strange games, creature worlds, audio experiments, founder story, official links and asset requests.",
    accent: "#d8b475",
    crumbHref: "/press",
    crumbLabel: "Press kit",
    pageClass: "press-page",
    stylesheet: "/assets/studio-press-v2.css",
    body: parts.join("\n"),
  });
}

function sitemap(projects) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [
    { loc: `${ORIGIN}/`, priority: "1.0" },
    { loc: `${ORIGIN}/play`, priority: "0.9" },
    { loc: `${ORIGIN}/press`, priority: "0.7" },
    { loc: `${ORIGIN}/dispatches/the-machine-stays-private`, priority: "0.9" },
    { loc: `${ORIGIN}/dispatches/the-pit-keeps-receipts`, priority: "0.8" },
    ...projects
      .slice()
      .sort((a, b) => actionTier(a).rank - actionTier(b).rank)
      .map((project) => ({
        loc: `${ORIGIN}/${project.id}`,
        priority: actionTier(project).priority,
      })),
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
    console.error(
      "discovery-spine: dist/ not found — run the Vite build first.",
    );
    process.exit(1);
  }

  const { PROJECTS_DATA } = await loadProjectData();
  const written = [];

  writePage("play", playPage(PROJECTS_DATA));
  written.push("/play");

  writePage("press", pressPage(PROJECTS_DATA));
  written.push("/press");

  writePage(
    "dispatches/the-pit-keeps-receipts",
    receiptsDispatch(PROJECTS_DATA),
  );
  written.push("/dispatches/the-pit-keeps-receipts");

  writePage(
    "dispatches/the-machine-stays-private",
    privateEngineDispatch(),
  );
  written.push("/dispatches/the-machine-stays-private");

  for (const project of PROJECTS_DATA) {
    writePage(project.id, projectPage(project, PROJECTS_DATA));
    written.push(`/${project.id}`);
  }

  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    sitemap(PROJECTS_DATA),
    "utf8",
  );
  written.push("/sitemap.xml");

  console.log(
    `discovery-spine: ${written.length} public URLs\n  ${written.join("\n  ")}`,
  );
}

main().catch((error) => {
  console.error("discovery-spine failed:", error);
  process.exit(1);
});
