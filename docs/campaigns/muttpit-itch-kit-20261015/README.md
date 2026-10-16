# MUTTPIT itch.io Launch Kit — prepared 2026-10-15

> **Role:** execution-ready publishing handoff. Not a marketing authority.
> **Current-direction owner:** Google Drive `05 — Independent Public Visibility, Founder Reveal & Marketing Activation Owner v2` (not reachable from the Lab node that prepared this).
> **Status:** PREPARED. Publishing an itch.io project page is an external publication on Cody's account and is held for his go.

## Why this exists

`monkeydog23.itch.io` is the storefront the studio press page already calls "official", and today it holds exactly one project (Saga of Rebirth). The studio's only playable browser game — MUTTPIT — has **no itch.io page at all**, so none of itch's browse/search/tag discovery can find it. This is the single largest missing discovery surface the studio currently has.

## What is prepared

| File | Purpose |
| --- | --- |
| `itch_page_copy.md` | Every text field for the project page, ready to paste, with proof ceilings |
| `itch_devlog_01.md` | First devlog post ("arrival + receipts story") |
| `show_hn_draft.md` | Show HN submission text (separate decision) |
| `social_post_kits.md` | Manual post kit per `templates/PUBLIC_MANUAL_POST_KIT_TEMPLATE.md` + tagged link kit |
| `prepared/itch-cover-630x500.png` | Cover image (center crop of the real title-screen runtime capture) |
| `prepared/ss1-title.png` … `ss4-mailbox.png` | Screenshots — real runtime captures of the shipped build (1280×757) |
| `prepared/share-1200x630.png` | Share card cut from the bout capture (for social/reddit/HN) |

All prepared images derive from real browser captures of the shipped build (`public/assets/muttpit/*/capture.png`). Nothing is concept art passed off as gameplay.

## Publish steps (≈15 minutes, manual, on itch.io)

1. itch.io → Dashboard → **Create new project**.
2. Title: `MUTTPIT`. Project URL: `muttpit`. Classification: **Games → Strategy → Auto Battler** (tags in `itch_page_copy.md`).
3. Kind of project: **HTML** (browser game). Upload method below.
4. Paste the fields from `itch_page_copy.md`. Fill the "AI-generated content" disclosure exactly as written there (itch requires accurate disclosure).
5. Set cover `prepared/itch-cover-630x500.png`, screenshots in order ss1→ss4.
6. Pricing: **No payments / free** (matches the public build's existing claim).
7. Visibility: **Published** (or "Restricted" first if you want to look before it is public — link still works).
8. Web build: either (a) zip `repos/muttpit`'s shipped build output and use itch's **"This file will be played in the browser"** upload, with viewport 1280×757 and "Enable fullscreen" on, or (b) keep the build hosted on the studio site and use itch's **"Embed"** option pointing at `https://ultramonkeydog-studios.vercel.app/play/muttpit/`. Option (b) is one field and keeps the deployed bundle as the single truth; option (a) gets itch's own hosting and offline-ish resilience.
9. Page footer/links: studio site `https://ultramonkeydog-studios.vercel.app/` and `https://ultramonkeydog-studios.vercel.app/muttpit`.
10. After publishing: run `node scripts/verify-live-play.mjs https://monkeydog23.itch.io/muttpit --game muttpit` **only if** option (a) was used; for option (b) open the embedded page and confirm the game boots and a bout can start.

## Decisions that belong to Cody

- **Go / no-go on publishing the page** (external publication on his account).
- Embed (b) vs uploaded web build (a).
- Whether the first devlog (`itch_devlog_01.md`) posts at launch or a week later.
- Show HN timing (`show_hn_draft.md`) — the note's rule was one attempt only, after the try-first surface is excellent. The site now carries real captures and a direct play link; the remaining variable is timing/energy, not material.

## Measurement

`_vercel/insights/script.js` is now included on all studio pages (cookieless, first-party, same owner as the existing Speed Insights). It starts reporting only when Vercel Web Analytics is enabled for the project in the dashboard — a toggle on Cody's account, no code change. The tagged link kit in `social_post_kits.md` exists so source attribution is readable once that is on. Until then, treat all channel attribution as UNKNOWN.
