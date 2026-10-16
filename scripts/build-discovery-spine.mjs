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
.captures{margin:16px 0 0}
.captures figure{margin:0 0 22px}
.captures img{display:block;width:100%;height:auto;border:1px solid var(--edge);border-radius:3px}
.captures figcaption{margin-top:8px;font:600 11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;
  letter-spacing:.11em;text-transform:uppercase;color:var(--dim)}
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
  jsonLd = "",
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
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
<script defer src="/_vercel/insights/script.js"></script>
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

const DISPATCHES = [
  ["pick-your-strange", "Pick your strange.", "2026-10-16", "A first visit to the studio: creature worlds, sound, tools, and the human behind them."],
  ["a-level-up-should-change-the-question", "A Level-Up Should Change the Question", "2026-10-14", "Growth, attachment, and the choices power makes harder."],
  ["a-monster-should-survive-as-a-shadow", "A Monster Should Survive as a Shadow", "2026-10-12", "Silhouette, action, consequence, then surface."],
  ["the-machine-stays-private", "The Machine Stays Private. The Work Has to Survive in Public.", "2026-10-10", "Human direction, private machinery, public work."],
  ["the-pit-keeps-receipts", "A Fight Should Keep Its Receipts", "2026-10-08", "The studio’s smaller browser-game sample and its inspectable outcomes."],
];

function dispatchIndex() {
  return page({slug:"dispatches",title:"Studio Dispatches — Ultramonkeydog Studios",description:"Read Cody Haring’s studio dispatches: creature design, meaningful growth, human direction, and unusual independent work.",accent:"#d8b475",crumbHref:"/",crumbLabel:"Studio",body:`<p class="tier">THE STUDIO JOURNAL</p><h1>Dispatches from the strange.</h1><p class="lede">Not a promise of finished worlds. A record of what matters while making them.</p><nav aria-label="Studio dispatches">${DISPATCHES.map(([slug,title,date,summary])=>`<article class="card"><time datetime="${date}">${date}</time><h2><a href="/dispatches/${slug}">${esc(title)}</a></h2><p>${esc(summary)}</p></article>`).join("")}</nav>`});
}

function visitorDispatch() {
  return page({
    slug:"dispatches/pick-your-strange",title:"Pick Your Strange — A First Visit to Ultramonkeydog Studios",
    description:"A first-visit guide to Cody Haring’s creature worlds, audio experiments and unusual software. Choose your doorway without mistaking development for release.",
    accent:"#e5b981",pageClass:"visitor-page",stylesheet:"/assets/studio-visitor-guide-v1.css",crumbHref:"/dispatches",crumbLabel:"Dispatches",
    body:`<article><header class="visitor-cover"><p class="tier">STUDIO DISPATCH / OCTOBER 16, 2026</p><h1>Pick your<br><em>strange.</em></h1><p class="lede">You do not need to understand the machinery. Find the thing that gets under your skin.</p><a class="cta" href="#doorways">Choose a doorway ↓</a><p>Ultramonkeydog Studios / Created and directed by Cody Haring</p></header>
<section class="visitor-intro"><h2>Different worlds. Not different skins.</h2><p>A creature should become something. A system should leave consequences. Horror should have room for beauty, humor and something worth protecting. Those ideas connect this studio’s work, but they do not make every project the same game.</p><p>If this is your first visit, start with a question—not a wall of project names.</p></section>
<section id="doorways" aria-labelledby="doorway-title"><h2 id="doorway-title">What pulls you in?</h2><div class="visitor-grid">
<article class="visitor-door"><span>01 / MUTATION</span><h3>I want power<br>to change me.</h3><p>Savage Crown’s direction is biological horror, hostile supernatural systems and earned monstrous escalation. Creature identity, grafts and passive synergy belong to the fantasy—not just a bigger damage number.</p><p class="limit">In development. This is a project record, not a download or release announcement.</p><a class="cta" href="/savage-crown?utm_source=studio_dispatch&utm_medium=owned_web&utm_campaign=pick_your_strange">Enter Savage Crown ↗</a></article>
<article class="visitor-door"><span>02 / ATTACHMENT</span><h3>I want the monster<br>to matter.</h3><p>What We Fed asks what you keep, what you consume and what you become. Bond vs Eat puts usefulness beside attachment inside a wondrous, mythic creature-RPG direction.</p><p class="limit">In development. Read the current evidence and unfinished work before expecting a public build.</p><a class="cta" href="/what-we-fed?utm_source=studio_dispatch&utm_medium=owned_web&utm_campaign=pick_your_strange">Enter What We Fed ↗</a></article>
<article class="visitor-door"><span>03 / WONDER</span><h3>I want tenderness<br>without shallow systems.</h3><p>Saga of an Anxious Fluff is the family-facing, creature-growth branch: wonder, deep progression and a sensory-aware design intent can belong together.</p><p class="limit">Early work. Sensory-aware intent is not a proven accessibility outcome.</p><a class="cta" href="/saga-anxious-fluff?utm_source=studio_dispatch&utm_medium=owned_web&utm_campaign=pick_your_strange">Meet Anxious Fluff ↗</a></article>
<article class="visitor-door"><span>04 / MAKING</span><h3>I want to meet<br>the person making this.</h3><p>Cody is a self-taught creator using AI as a bridge across disciplines. The concepts, criticism, direction and final decisions stay human. The press record is the place for the founder story, official links and asset requests.</p><p class="limit">No consulting offer, paid role or partnership terms are implied.</p><a class="cta" href="/press?utm_source=studio_dispatch&utm_medium=owned_web&utm_campaign=pick_your_strange">Meet Cody ↗</a></article>
</div></section>
<section class="visitor-intro"><h2>And the other frequencies?</h2><p>Monkey’s Ear explores audio tools. MAW and Prehensile belong to the software-making side. They are not interchangeable with the games, and a development tool is not a promise of effortless autonomous production.</p><p><a href="/#creation-tools">Explore the making tools</a> · <a href="/press#monkeys-ear">Read the audio boundary</a></p><p>The <a href="/dispatches">dispatch archive</a> goes deeper into the design choices. Read what interests you; you do not need to follow every branch.</p></section>
<section class="visitor-close"><h2>Follow a thread.<br>Not a hype cycle.</h2><p>Open one project record above. If a specific idea stays with you, tell Cody what caught—and what you could not understand.</p><a class="cta" href="mailto:${CONTACT}?subject=%5BUMD%20DOORWAY%5D%20The%20thread%20that%20caught%20me">Send one specific thought ↗</a><p class="limit">Opens your email app. Optional feedback, not a mailing-list subscription. Do not send confidential material. No beta place, release date or response time is promised.</p></section></article>`,
  });
}

function growthDispatch() {
  return page({
    slug: "dispatches/a-level-up-should-change-the-question",
    title: "A Level-Up Should Change the Question — Ultramonkeydog Studios",
    description: "More damage is not the whole fantasy. A studio design dispatch about creature growth, attachment, and power that changes what you choose next.",
    accent: "#b5c279",
    pageClass: "shadow-page growth-page",
    stylesheet: "/assets/studio-shadow-dispatch-v1.css",
    crumbHref: "/what-we-fed",
    crumbLabel: "What We Fed",
    body: `<article class="shadow-dispatch">
<header class="shadow-hero"><div><p class="shadow-kicker">STUDIO DISPATCH 05 / OCTOBER 14, 2026</p><h1>A level-up should change <em>the question.</em></h1><p class="shadow-deck">Yesterday: can I survive this creature? Tomorrow: do I keep it beside me—or make its power part of me?</p><a class="shadow-cta" href="/what-we-fed">Explore What We Fed ↗</a></div><figure class="growth-plate" aria-label="Design principle: survival becomes attachment, then a consequential choice"><span>01 / SURVIVE</span><strong>FEAR</strong><span>02 / UNDERSTAND</span><strong>ATTACH</strong><span>03 / CHOOSE</span><strong>BOND<br>OR EAT</strong><figcaption>DESIGN PRINCIPLE / NOT A GAME SCREEN</figcaption></figure></header>
<section class="shadow-body"><p class="shadow-lead">If getting stronger only makes the same decision easier, the number grew. The character did not.</p><p>There is pleasure in a bigger damage number. We are not trying to take that away. But the creature-RPG fantasy we care about asks for another kind of growth: a change in what you can do, what you notice, and what you are willing to lose.</p><p>Start weak, become feared is not simply a promise to inflate statistics. It is a promise that the relationship between you and the world should change. Something that once cornered you might become a companion. Something you learned to love might also offer the exact power your build is missing.</p><blockquote>Power is more interesting when it gives you a harder choice.</blockquote></section>
<section class="shadow-sequence" aria-labelledby="growth-title"><div><p class="shadow-kicker">THE GROWTH TEST</p><h2 id="growth-title">More power.<br><em>Different decisions.</em></h2></div><ol><li><span>01</span><strong>New verb</strong><p>Does growth add a way to act, combine, defend, or relate—not just a larger result?</p></li><li><span>02</span><strong>New pressure</strong><p>Does that power create a weakness, commitment, or rhythm you must learn?</p></li><li><span>03</span><strong>New attachment</strong><p>Is the creature a particular presence you care about, rather than a disposable stat container?</p></li><li><span>04</span><strong>New question</strong><p>Would your stronger self make a different choice in the same situation?</p></li></ol></section>
<section class="shadow-body"><h2>Hunger is useful. That is the problem.</h2><p>What We Fed puts Bond vs Eat at the center of its design direction. The interesting tension is not a morality button labeled good or evil. It is the collision between attachment and usefulness: keep a creature beside you, or consume what it could let you become.</p><p>That distinction matters. A creature should not need a speech to become memorable. Its behavior, support, danger, and place in your build can make the relationship specific. Then the reward is no longer just an item. It is a decision about that relationship.</p><p>We want wonder to survive inside the horror. A strange world is more unsettling when there is something in it worth protecting. A power fantasy is more personal when your final shape remembers how you got there.</p><p class="shadow-boundary">Read this as creative direction, not a feature-completion announcement. What We Fed is in development. This editorial contains no gameplay capture and does not establish a public demo, finished progression, release date, accessibility outcome, or commercial readiness. The project record separates current evidence from unfinished work.</p></section>
<section class="shadow-end"><p class="shadow-kicker">WHAT WOULD YOU KEEP?</p><h2>Grow teeth.<br><em>Keep a heart.</em></h2><p><a class="shadow-cta" href="/what-we-fed">Open the What We Fed record ↗</a></p><p><a class="shadow-link" href="mailto:${CONTACT}?subject=What%20We%20Fed%20%E2%80%94%20what%20I%20would%20keep">Tell Cody which choice stayed with you</a></p><p class="growth-support">No beta signup or download is promised. The email opens your mail app; sharing a thought is optional and is not a mailing-list subscription.</p></section>
</article>`,
  });
}

function silhouetteDispatch() {
  const body = [
    `<article class="shadow-dispatch">`,
    `<header class="shadow-hero"><div><p class="shadow-kicker">STUDIO DISPATCH 04 / OCTOBER 12, 2026</p><h1>A monster should survive <em>as a shadow.</em></h1><p class="shadow-deck">Before lore. Before texture. Before the expensive detail. Its body should already tell you what it can do—and what it might do to you.</p><p><a class="shadow-cta" href="/#worlds">Enter the flagship worlds ↗</a></p></div><figure><img src="/assets/studio-creature.svg" width="640" height="720" alt="Inked three-eyed studio creature drawn over circular anatomy guides"><figcaption>STUDIO CREATURE STUDY / NOT GAMEPLAY</figcaption></figure></header>`,
    `<section class="shadow-body"><p class="shadow-lead">If two creatures become the same black shape at play size, color and lore are carrying a design the anatomy did not finish.</p><p>Ultramonkeydog Studios is obsessed with creatures as mechanics. A hooked back should imply a different attack than a heavy jaw. A defensive body should occupy space differently from a fast striker. Mutation should change the creature’s verbs—not just decorate the same skeleton.</p><p>That means the earliest useful question is brutally simple: if every surface detail disappears, does the body still communicate identity, direction and threat?</p><blockquote>Detail can make a monster beautiful. Silhouette makes it readable.</blockquote></section>`,
    `<section class="shadow-sequence" aria-labelledby="sequence-title"><div><p class="shadow-kicker">THE CREATURE TEST</p><h2 id="sequence-title">Shape first.<br><em>Then consequence.</em></h2></div><ol><li><span>01</span><strong>Shadow</strong><p>Can the creature be distinguished at a glance and at actual play size?</p></li><li><span>02</span><strong>Action</strong><p>Does the anatomy imply movement, reach, weight or defense before an explanation arrives?</p></li><li><span>03</span><strong>Consequence</strong><p>When the body mutates, do its options and the world’s response change with it?</p></li><li><span>04</span><strong>Surface</strong><p>Only then do color, material, scars and ornament earn their place.</p></li></ol></section>`,
    `<section class="shadow-body"><h2>Measurement can catch a lie. It cannot supply taste.</h2><p>The studio’s private creation system can measure transparent bounds and compare broad shape evidence. That is useful for catching accidental sameness, wasted canvas and silhouettes that collapse into each other.</p><p>It cannot decide whether a creature is frightening, tender, funny or worth remembering. A shape fingerprint is evidence for review—not a style score, an aesthetic verdict or permission to ship. Cody still makes the creative judgment.</p><p class="shadow-boundary">Proof boundary: this dispatch describes the studio’s current design method and a verified internal review mechanism. The illustration is a studio creature study, not gameplay. It does not prove final creature art, device readability, animation quality, playfeel or accessibility outcomes in any unreleased game.</p></section>`,
    `<section class="shadow-end"><p class="shadow-kicker">CREATURES ARE NOT DECORATION</p><h2>Read the body.<br><em>Then fear the change.</em></h2><p><a class="shadow-cta" href="/savage-crown">Enter Savage Crown’s record ↗</a><a class="shadow-link" href="/what-we-fed">Follow hunger into What We Fed</a></p></section>`,
    `</article>`,
  ];
  return page({
    slug: "dispatches/a-monster-should-survive-as-a-shadow",
    title: "A Monster Should Survive as a Shadow — Ultramonkeydog Studios",
    description: "Why Ultramonkeydog Studios designs creatures from silhouette, action and consequence before surface detail—and why measurement informs review without replacing taste.",
    accent: "#f08a5d",
    body: body.join("\n"),
    crumbHref: "/#worlds",
    crumbLabel: "The worlds",
    pageClass: "shadow-page",
    stylesheet: "/assets/studio-shadow-dispatch-v1.css",
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
  const shots = (visual.evidence ?? []).filter((item) => item.src);
  const heroShot =
    shots.find((item) => item.state === "PROMOTED_RUNTIME_GAMEPLAY") ?? shots[0];

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

  if (shots.length) {
    parts.push(
      `<h2>${project.demoUrl ? "From the shipped build" : "Captured evidence"}</h2>`,
    );
    parts.push(
      `<div class="captures">${shots
        .map(
          (item) =>
            `<figure><img src="${esc(item.src)}" width="${esc(item.width ?? 1280)}" height="${esc(item.height ?? 757)}" loading="lazy" alt="${esc(item.alt ?? item.title)}">` +
            `<figcaption>${esc(item.title)} — ${
              item.state === "PROMOTED_RUNTIME_GAMEPLAY"
                ? "real runtime capture / shipped browser build"
                : esc(item.state).toLowerCase()
            }</figcaption></figure>`,
        )
        .join("")}</div>`,
    );
    parts.push(
      `<p class="limit">Every image on this page is a capture of the actual shipped build driven in a real browser, not staged art.</p>`,
    );
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

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": project.demoUrl ? "VideoGame" : "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${ORIGIN}/${project.id}`,
    ...(heroShot ? { image: `${ORIGIN}${heroShot.src}` } : {}),
    genre: project.tags,
    author: {
      "@type": "Organization",
      name: "Ultramonkeydog Studios",
      url: ORIGIN,
    },
    ...(project.demoUrl
      ? {
          applicationCategory: "Game",
          operatingSystem: "Web Browser",
        }
      : {}),
  });

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
    ...(heroShot
      ? {
          ogImage: `${ORIGIN}${heroShot.src}`,
          ogImageAlt: heroShot.alt ?? heroShot.title,
          ogImageWidth: heroShot.width ?? 1280,
          ogImageHeight: heroShot.height ?? 757,
        }
      : {}),
    jsonLd,
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

  const leadShot = playable
    .flatMap((project) => (project.publicVisual.evidence ?? []).filter((item) => item.src))
    .find((item) => item.state === "PROMOTED_RUNTIME_GAMEPLAY");

  return page({
    slug: "play",
    title: "Play — Ultramonkeydog Studios",
    description:
      "Ultramonkeydog games you can play in a browser right now, plus everything else the studio is building.",
    accent: "#f2b74c",
    body: parts.join("\n"),
    ...(leadShot
      ? {
          ogImage: `${ORIGIN}${leadShot.src}`,
          ogImageAlt: leadShot.alt ?? leadShot.title,
          ogImageWidth: leadShot.width ?? 1280,
          ogImageHeight: leadShot.height ?? 757,
        }
      : {}),
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Play — Ultramonkeydog Studios",
      url: `${ORIGIN}/play`,
      hasPart: playable.map((project) => ({
        "@type": "VideoGame",
        name: project.title,
        url: `${ORIGIN}/${project.id}`,
        applicationCategory: "Game",
        operatingSystem: "Web Browser",
      })),
    }),
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
    `<section class="press-assets"><p class="press-eyebrow">ASSETS / OFFICIAL LINKS</p><h2>Use the right evidence.</h2><p><strong>Gameplay captures — real runtime captures of the shipped MUTTPIT browser build:</strong> <a href="/assets/muttpit/title/capture.png">title screen</a> · <a href="/assets/muttpit/kennel/capture.png">kennel screen</a> · <a href="/assets/muttpit/bout/capture.png">bout impact frame</a> · <a href="/assets/muttpit/mailbox/capture.png">mailbox / Verdict Packet</a> · <a href="/assets/muttpit/muttpit-share-1200x630.png">1200 × 630 share card cut from the bout capture</a>. Dog and key art are AI-assisted illustrations (local FLUX.2 Klein), art-directed, curated and retouched by the studio; interface, typography and all game text are authored in code.</p><p><strong>Studio artwork:</strong> <a href="/assets/studio-transformation-cover-v2.webp">studio cover illustration</a> · <a href="/assets/studio-share-v3.png">1200 × 630 studio share image</a>. Both are conceptual studio artwork, not gameplay. Ask about art reuse and request further screenshots, footage or logos through the contact action.</p><ul class="next"><li><a href="${ORIGIN}/">Official studio website</a></li><li><a href="${esc(ITCH)}">Official itch.io storefront</a></li></ul></section>`,
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
    { loc: `${ORIGIN}/dispatches`, priority: "0.8" },
    { loc: `${ORIGIN}/dispatches/pick-your-strange`, priority: "0.9" },
    { loc: `${ORIGIN}/dispatches/a-level-up-should-change-the-question`, priority: "0.9" },
    { loc: `${ORIGIN}/dispatches/a-monster-should-survive-as-a-shadow`, priority: "0.9" },
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
  writePage("dispatches", dispatchIndex());
  written.push("/dispatches");
  writePage("dispatches/pick-your-strange", visitorDispatch());
  written.push("/dispatches/pick-your-strange");

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

  writePage(
    "dispatches/a-monster-should-survive-as-a-shadow",
    silhouetteDispatch(),
  );
  written.push("/dispatches/a-monster-should-survive-as-a-shadow");

  writePage("dispatches/a-level-up-should-change-the-question", growthDispatch());
  written.push("/dispatches/a-level-up-should-change-the-question");

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
