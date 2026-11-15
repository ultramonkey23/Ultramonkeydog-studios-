# receipt_20261114_studios_search_discovery_upgrade - every public URL statically indexable

LAB_RECEIPT_CONTRACT_V1:
PRIME_LAW_COMPLIANT: yes
RESULT: PASS - studios site search/AI discoverability upgrade shipped and live: front door pre-rendered with real copy + JSON-LD, 75/75 seo-verify checks green in the build chain, deployed via 1da3e6a, IndexNow accepted 27 URLs (HTTP 202)
PROJECT_ID: ultramonkeydog-studios
MISSION: Audit and upgrade the public studio site for 100% search/AI indexability, rich previews and Core Web Vitals, then evolve it further and ship without manual steps
ROUTING_DECISION: not-routed-directed-client-mission
ACTUAL_WORK_REQUIRED: yes
ACTUAL_WORK_COMPLETED: yes
WORK_PRODUCT_TYPE: SEO/render-path infrastructure (build-time static generation, crawler files, structured data, deploy verification)
RISK_LANE: LOW
PARENT_DIRECTOR_OBJECTIVE: Principal Web Systems & Technical SEO Architect mission on ultramonkeydog-studios: eliminate CSR blind spots, wire crawler infrastructure, rich metadata/schema, verify the built output, then keep evolving and push
CURRENT_COHERENT_MISSION: Make every public studio URL readable by non-JS crawlers with rich structured data, prove it programmatically at build time, deploy and register it with search indexes
MISSION_RELATIONSHIP: CHILD_ADVANCES_PARENT
PARENT_STATUS: OPEN
CHILD_STATUS: PASS
SURVIVING_PARENT_GAPS: Google Search Console property + VITE_GOOGLE_SITE_VERIFICATION env var are account-bound and remain un-set (indexing does not depend on them); Core Web Vitals field data is not yet observed (no CrUX/Speed Insights traffic yet); og-image variants per project are still shared studio-wide
INTENDED_ADVANTAGE: non-JS crawlers and AI discovery agents now read the full studio document on every route, with Organization/ItemList/Article/BreadcrumbList schema so search engines can render rich results; the build refuses to ship a discoverability regression
RECOVERED_INHERITANCE: the discovery spine's law (src/data.ts owns every public claim; the generator presents, never invents) extended to the home document, llms.txt and structured data
CANONICAL_OWNERS: scripts/build-discovery-spine.mjs (home injection, llms.txt/llms-full.txt, 404, JSON-LD, sitemap), scripts/verify-seo-output.mjs (75-check discoverability verifier), scripts/ping-indexnow.mjs + public/<key>.txt (IndexNow), scripts/generate_app_icons.py (deterministic icon set), public/robots.txt + public/manifest.webmanifest, vercel.json (headers), index.html (head), docs/SEARCH_DISCOVERY.md (the map)
CONSUMER_TRACE: audit found dist/index.html was a 3.3KB CSR shell with no crawlable copy -> build-discovery-spine.mjs now injects a static home body (claims mirrored from src/data.ts) + Organization/ItemList JSON-LD before React hydrates -> dispatch pages get Article JSON-LD with archive dates, every static route gets BreadcrumbList -> robots.txt names the AI crawlers, sitemap carries per-entry lastmod/changefreq, llms.txt/llms-full.txt follow llmstxt.org -> seo:verify asserts all of it inside npm run build -> push 1da3e6a -> Vercel auto-deploy verified live (llms.txt and IndexNow key 200) -> IndexNow submission accepted (202)
GENERICITY_CHECK: nothing is hand-duplicated: the home static body, llms.txt and schema all render from src/data.ts through the same loader the existing pages use; seo:verify reads only the built dist/; icons are regenerated deterministically from the studio-mark geometry by script, not exported by hand
VERTICAL_SLICE_CHECK: src/data.ts -> spine static pages + home injection -> dist/ (index.html copy+JSON-LD, robots.txt, sitemap.xml, llms*.txt, 404.html, manifest, key file) -> seo:verify 75/75 -> live curl 200s on new artifacts -> IndexNow 202; every hop observed on this host
PROOF_CLAIM_MATCH: npm run build exit 0 with all boundary/canon/attribution/review gates green and seo-verify 75/75; tsc red at start (fretfang style map gap, pre-existing) fixed and lint now fully green; live checks after deploy: /llms.txt 200, /15f39537a6990debcd4ad3afc5c4e622.txt 200, home serves static copy + JSON-LD to curl; IndexNow POST accepted
PROOF_BUDGET_USED: 6 build runs (each under 2 minutes on this host), one negative check round (BreadcrumbList verifier over-reach on home root - fixed to exempt the trail root), live curl probes, one IndexNow POST
FILES_CHANGED: scripts/build-discovery-spine.mjs, scripts/verify-seo-output.mjs, scripts/ping-indexnow.mjs, scripts/generate_app_icons.py, index.html, vercel.json, package.json, public/robots.txt, public/manifest.webmanifest, public/15f39537a6990debcd4ad3afc5c4e622.txt, public/assets/studio-icon-192.png, public/assets/studio-icon-512.png, public/assets/studio-icon-512-maskable.png, public/assets/apple-touch-icon.png, docs/SEARCH_DISCOVERY.md, src/components/ProjectCard.tsx, src/components/ProceduralField.tsx, receipts/receipt_20261114_studios_search_discovery_upgrade.md

## DIRECTOR_READABLE

1. The CSR blind spot is gone. The front door at "/" was a 3.3KB empty shell to any crawler without JavaScript. The discovery spine now injects the full static studio document (copy, project doorways, navigation) plus Organization and ItemList JSON-LD into dist/index.html at build time; React replaces it on load, and both read the same src/data.ts claims.

2. The whole discovery surface is machine-readable and self-proving. robots.txt names Googlebot, Bingbot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended; sitemap.xml carries per-entry lastmod/changefreq; llms.txt and llms-full.txt follow llmstxt.org; every static route has canonical, Open Graph/Twitter cards, one h1, Article JSON-LD on dated dispatches and BreadcrumbList trails; a manifest plus a deterministic icon set makes the site a first-class web app. `npm run build` now ends in seo:verify - 75 assertions over the built output - so a discoverability regression cannot ship.

3. It is live and registered. Push 1da3e6a auto-deployed (new artifacts verified 200 on the live origin), and IndexNow accepted all 27 public URLs (HTTP 202) for Bing, DuckDuckGo and the AI search indexes. Also fixed along the way: the pre-existing tsc red (fretfang style map) so the whole lint chain is green.

What I am NOT claiming: search rankings or indexing completion (engines decide their own crawl schedules); field Core Web Vitals scores (no real-user traffic measured yet); Google Search Console verification (account-bound token not available to this host).
