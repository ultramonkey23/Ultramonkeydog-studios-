# FIRST IMPACT — Production Report (outgoing session, 2026-10-18)

Owner: Cody Haring (IP + final artistic authority). Produced with private production tooling.
Status: FINAL CAMPAIGN PACKAGE PREPARED — exports, brand directions, distribution copy, and evidence are staged for Cody review. Nothing has been published.

## What was really made

| Deliverable | State | Where |
|---|---|---|
| VIDEO A — Ultramonkeydog Studios arrives (30.9s, 16:9 + 9:16) | REBUILT, staged | `exports/videoA_studio_16x9.mp4`, `exports/videoA_studio_9x16.mp4` |
| VIDEO B — Ghengis Mon arrives (47.6s, 16:9 + 9:16) | RE-CUT, staged | `exports/videoB_ghengismon_16x9.mp4`, `exports/videoB_ghengismon_9x16.mp4` |
| Brand system | EVALUATED, staged | `brand_direction_01_surgical_stamp.svg`, `brand_direction_02_quig_signal.svg`, `brand_direction_03_experiment_press.svg`, `BRAND_EVALUATION.md` |
| Distribution deck | PREPARED, not published | `DISTRIBUTION_PREP.md` |
| Music beds (Mega Mind / Devour / The Sound / Shifting the Realms) | DONE, provenance recorded | private campaign audio workspace + source-staging archive |
| Real gameplay motion capture | DONE | `footage/gm_riot_720.avi` (15s Riot battle w/ live callouts), `footage/gm_title.avi` (14s title) |
| Handoff + recipes + hazard map | DONE | `HANDOFF.md` (this folder + private production workspace) |

## What was tested / validated

- SoundCloud truth: live enumeration of Cody's profile (88+ tracks) via yt-dlp;
  all four named tracks verified real and downloaded with .info.json provenance.
- Capture pipeline: Godot 4.6.1 Movie Maker rendered the actual Ghengis Mon
  game (title + Riot battle) at 30fps — real gameplay, not mock-up footage.
- Video builds: deterministic ffmpeg builders (`build_video_a.py`,
  `build_video_b.py`) with per-segment caching; both aspect masters muxed with
  loudnorm'd Cody music and honest labels ("playable free · right now" only for
  MUTTPIT; "in development" for Ghengis Mon).

## First critique pass — DONE by producing session (2026-10-18)

Contact-sheet review at mobile size caught three real defects, fixed and
re-exported before handoff:
1. **Text overflow in 9:16** — long statement lines (EXHIBIT titles, studio
   wordmark) exceeded the 1080px frame and clipped both sides. Fixed with a
   geometric auto-fit font scaler (`fit_size`) in both builders.
2. **Wrong "Sage" image** — the staged phone screenshot was a terminal session
   artifact, not Sage. It was removed from the prior cut. The replacement in
   Video A v3 is stronger and truer: a carefully edited terminal sequence from
   an actual private Sage front-door session, explicitly labeled as private
   tooling / actual front door. It is not presented as a public product.
3. **Weak Savage Crown still** — blown-up pixel body read as mush; replaced
   with the game's real menu material-field capture.
Successor's critique pass should now judge pacing/music sync/impact, not clipping.

## Second creative cut — 2026-10-18

- **Studio Arrival was rebuilt, not merely repaired.** The previous 44.5-second
  exhibit reel lacked a decisive through-line. Video A is now a 30.9-second
  studio arrival: the door opens, Quig keeps watch, the actual private Sage
  front door visibly pulses, then real work erupts into Ghengis Mon, MUTTPIT,
  What We Fed and Savage Crown. Every visible source remains truthfully
  identified. The Sage excerpt is backed by `evidence/sage_frontdoor_excerpt.txt`.
- **Ghengis Mon was tightened without changing its truth.** The game trailer is
  now 47.6 seconds. Its void opening and menu dwell shrink, the Riot becomes
  immediately and explicitly real gameplay, and the genuine title-screen
  capture receives the final breath it earned. The game, rather than private
  tooling, remains the subject of Video B.

## Final critique / branding / distribution pass — 2026-10-18

- **Mobile review completed.** Both revised 9:16 cuts were reviewed as contact sheets. Video A's Sage sequence is now an actual front-door excerpt rather than an invented interface, while its story moves quickly enough to work as arrival material. Video B was tightened from 60.7s to 47.6s: premise and menu exposition compress, Riot play is explicitly labeled real gameplay, and the real title screen remains the payoff. The final contacts are `concept/videoA_contact_v3.png` and `concept/videoB_contact_v4.png`.
- **Branding completed.** Three scalable SVG directions were rendered and judged in a single contact sheet. Direction 01, Surgical Stamp, is the recommended public default because it preserves the established M/play identity at small size. Direction 02 uses Quig as the recurring mascot face without turning him into a product logo. Direction 03 is a press plate. A local Comfy study was generated only after the GPU friction repair and rejected as a final mark because it erased Quig's three-eye identity; the full provenance and rejection are retained.
- **Ghengis Mon context proof completed.** The actual title screen was strengthened, then Movie Maker captured from the running Godot project. `concept/gm_title_brand.png` is a real 1280×720 title-screen frame, not a mockup. A source parser collision discovered after the required pull was repaired before this proof.
- **Distribution preparation completed.** The live studio URL returned HTTP 200; existing OG/Twitter metadata is present. `DISTRIBUTION_PREP.md` contains platform/master mapping, citations, upload checks, and paste-ready copy. Nothing has been posted or scheduled.

## Decisions that need Cody's final call (HANDOFF §7)

- Public title form: `GHENGIS MON` (recommended) vs `BROOD RIOT: WAR OF FIVE CONTINENTS`.
- "playable free" wording for MUTTPIT.
- Sage tease wording ("THE SECRET INGREDIENT / proprietary software that
  breaks my limits" — lore only; private tooling and Sage are never public releases).
- Which extra short is produced first (logo sting / title showcase / Quig short).

## Music provenance (all Cody-authored, SoundCloud cody-haring-380974285)

- Devour (id 620698710) — Video B bed; THE FALL primary score per the internal
  savage_crown_soundtrack_atlas.json. Name matches the game's core verb.
- Mega-mind (id 1486149688) — Video A bed (quiet intro + lift = built-in reveal).
- the Sound (id 1093149880) and shifting the realms (id 1048677886) — cut as
  sting/title beds, reserved for the logo sting / title showcase short.
