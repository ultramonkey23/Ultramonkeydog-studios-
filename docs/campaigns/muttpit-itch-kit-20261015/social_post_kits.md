# MUTTPIT manual post kits + tagged link kit — 2026-10-15

> Per `templates/PUBLIC_MANUAL_POST_KIT_TEMPLATE.md`: open kit → choose platform → copy caption → attach prepared media → post manually. No automation. Each caption is written for its platform, not duplicated verbatim everywhere.

## 1. POST ME FIRST

- **What happened:** MUTTPIT — a free browser auto-battler with deterministic, auditable fights — is now fully presented with real runtime captures and, once the itch kit is published, on itch.io.
- **Why a stranger might care:** "Bite Order is the build" + fights that keep receipts is a genuinely unusual design promise, and it's playable in one click with no account.
- **Platform to try first:** itch.io page (discovery surface) or Reddit r/WebGames (where browser games get tried) — each needs its community's rules checked first.
- **Exact media:** `prepared/share-1200x630.png` for links; `prepared/ss3-bout.png` for image posts; `prepared/ss2-kennel.png` when explaining the build system.
- **What remains UNKNOWN:** whether any channel produces actual plays; attribution is only readable once Vercel Web Analytics is toggled on.

## 2. MEDIA INVENTORY

| label | file | dims | type | best channels | alt text | provenance | status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| share card | prepared/share-1200x630.png | 1200×630 | still | Reddit/X/link previews | "MUTTPIT bout mid-impact in a fenced dirt pit, damage burst on the front dog, bout log below" | ffmpeg crop of shipped-build bout capture | READY |
| bout frame | prepared/ss3-bout.png | 1280×757 | still | itch, forums, img posts | (see above) | runtime capture | READY |
| kennel | prepared/ss2-kennel.png | 1280×757 | still | posts explaining builds | "four illustrated mongrels with stats and editable bite orders" | runtime capture | READY |
| title | prepared/ss1-title.png | 1280×757 | still | headers | "MUTTPIT title screen, six strains under the logo" | runtime capture | READY |
| mailbox | prepared/ss4-mailbox.png | 1280×757 | still | play-by-mail explainer | "opponent code input and verdict packet audit" | runtime capture | READY |
| 9:16 vertical | — | — | video | Shorts/TikTok/Reels | — | — | **GAP** — needs a real capture session (game is landscape; a vertical edit must show real gameplay, not crops) |
| trailer clip | — | — | video | YouTube/itch | — | — | **GAP** — same |

Missing variants stay gaps. Do not fabricate.

## 3. CAPTIONS BY PLATFORM

**Reddit r/WebGames / r/incremental-ish communities (check each sub's self-promo rules first; participate, don't drop links cold):**

```
I made MUTTPIT — a free browser auto-battler where you write each dog's action order and every fight leaves a tamper-evident receipt. 36 dogs, 8-week season, play-by-mail kennel codes. No account. Looking for people who like breaking deterministic systems: https://ultramonkeydog-studios.vercel.app/play/muttpit/
```

**X/Bluesky (short):**

```
Bite Order is the build. Rewrite one line, the same two kennels fight a different fight.
MUTTPIT — free browser auto-battler, 36 scarred dogs, fights that keep receipts.
https://ultramonkeydog-studios.vercel.app/play/muttpit/
```

**Discord/word-of-mouth (one-to-one):**

```
This is the weird dog fighting game I've been building — it's free in the browser, no account. The fights are fully deterministic and hand you a re-derivable verdict packet, so if you beat me you can prove it: https://ultramonkeydog-studios.vercel.app/play/muttpit/
```

**Builder/technical audience (Hacker News, dev Discords) — use `show_hn_draft.md` spine, trimmed:**

```
MUTTPIT went from repo baseline to public build in ~43.5h while I tested my private AI-native dev system (I directed; Lab orchestrated/proved; MAW executed; Claude Code contributed implementation). The game itself is the argument — deterministic seeded battles, tamper-evident Verdict Packets, play-by-mail kennel codes: https://ultramonkeydog-studios.vercel.app/play/muttpit/
```

**Founder/creator story (longer, personal — for devlogs, interviews, personal feeds):** use `itch_devlog_01.md` as the spine.

## 4. TAGGED LINK KIT

Base: `https://ultramonkeydog-studios.vercel.app/play/muttpit/`

| source tag | link |
| --- | --- |
| itch page | `.../play/muttpit/?utm_source=itch&utm_medium=page&utm_campaign=muttpit-discovery` |
| reddit | `...?utm_source=reddit&utm_medium=post&utm_campaign=muttpit-discovery` |
| hn | `...?utm_source=hn&utm_medium=show&utm_campaign=muttpit-discovery` |
| bluesky/x | `...?utm_source=bsky&utm_medium=post&utm_campaign=muttpit-discovery` |
| youtube/video | `...?utm_source=youtube&utm_medium=video&utm_campaign=muttpit-discovery` |
| devlog | `...?utm_source=itch&utm_medium=devlog&utm_campaign=muttpit-discovery` |

These only pay off once Vercel Web Analytics is enabled (dashboard toggle; the script is already in every page). Until then attribution is UNKNOWN — do not report source numbers.

## 5. CLAIM LIMITS (non-negotiable)

Never post: "fully autonomous", "AI built the whole game", "replaced a team", "viral", "commercially validated", invented player counts, or any release date for unreleased projects. The ~44-hour figure is the baseline→inspected-build window, and Claude Code's later implementation contribution is named honestly.
