# FIRST IMPACT — Production Report (outgoing session, 2026-10-18)

Owner: Cody Haring (IP + final artistic authority). Produced with Ultramonkeydog Lab.
Status: FINAL CAMPAIGN PACKAGE PREPARED — exports, brand directions, distribution copy, and evidence are staged for Cody review. Nothing has been published.

## What was really made

| Deliverable | State | Where |
|---|---|---|
| VIDEO A — Ultramonkeydog Studios arrives (44.5s, 16:9 + 9:16) | BUILT, staged | `exports/videoA_studio_16x9.mp4`, `exports/videoA_studio_9x16.mp4` |
| VIDEO B — Ghengis Mon arrives (53.3s, 16:9 + 9:16) | POLISHED, staged | `exports/videoB_ghengismon_16x9.mp4`, `exports/videoB_ghengismon_9x16.mp4` |
| Brand system | EVALUATED, staged | `brand_direction_01_surgical_stamp.svg`, `brand_direction_02_quig_signal.svg`, `brand_direction_03_experiment_press.svg`, `BRAND_EVALUATION.md` |
| Distribution deck | PREPARED, not published | `DISTRIBUTION_PREP.md` |
| Music beds (Mega Mind / Devour / The Sound / Shifting the Realms) | DONE, provenance recorded | lab `scratch/first_impact/audio/` + `~/.lab/source_staging/first-impact/cody-soundcloud/` |
| Real gameplay motion capture | DONE | `footage/gm_riot_720.avi` (15s Riot battle w/ live callouts), `footage/gm_title.avi` (14s title) |
| Handoff + recipes + hazard map | DONE | `HANDOFF.md` (this folder + lab scratch) |

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
   artifact, not Sage. REMOVED; the tease is now an honest text card
   ("THE SECRET INGREDIENT / proprietary software that breaks my limits") —
   no fake UI, no tool-internals leak.
3. **Weak Savage Crown still** — blown-up pixel body read as mush; replaced
   with the game's real menu material-field capture.
Successor's critique pass should now judge pacing/music sync/impact, not clipping.

## Final critique / branding / distribution pass — 2026-10-18

- **Mobile review completed.** Both 9:16 contact sheets were visually inspected. Video A's already-fixed type remains readable; its lore card correctly avoids inventing a Sage UI. Video B had the real pacing defect: too much duplicate Riot dwell before its best title image. It was rebuilt from 60.7s to 53.3s: premise and menu exposition tighten, the Riot retains its actual gameplay authority, and the real title screen receives a longer ending payoff. The final contact is `concept/videoB_contact.png`.
- **Branding completed.** Three scalable SVG directions were rendered and judged in a single contact sheet. Direction 01, Surgical Stamp, is the recommended public default because it preserves the established M/play identity at small size. Direction 02 uses Quig as the recurring mascot face without turning him into a product logo. Direction 03 is a press plate. A local Comfy study was generated only after the GPU friction repair and rejected as a final mark because it erased Quig's three-eye identity; the full provenance and rejection are retained.
- **Ghengis Mon context proof completed.** The actual title screen was strengthened, then Movie Maker captured from the running Godot project. `concept/gm_title_brand.png` is a real 1280×720 title-screen frame, not a mockup. A source parser collision discovered after the required pull was repaired before this proof.
- **Distribution preparation completed.** The live studio URL returned HTTP 200; existing OG/Twitter metadata is present. `DISTRIBUTION_PREP.md` contains platform/master mapping, citations, upload checks, and paste-ready copy. Nothing has been posted or scheduled.

## Decisions that need Cody's final call (HANDOFF §7)

- Public title form: `GHENGIS MON` (recommended) vs `BROOD RIOT: WAR OF FIVE CONTINENTS`.
- "playable free" wording for MUTTPIT.
- Sage tease wording ("THE SECRET INGREDIENT / proprietary software that
  breaks my limits" — lore only; Lab/Sage are never public releases).
- Which extra short is produced first (logo sting / title showcase / Quig short).

## Music provenance (all Cody-authored, SoundCloud cody-haring-380974285)

- Devour (id 620698710) — Video B bed; THE FALL primary score per the Lab's
  savage_crown_soundtrack_atlas.json. Name matches the game's core verb.
- Mega-mind (id 1486149688) — Video A bed (quiet intro + lift = built-in reveal).
- the Sound (id 1093149880) and shifting the realms (id 1048677886) — cut as
  sting/title beds, reserved for the logo sting / title showcase short.
