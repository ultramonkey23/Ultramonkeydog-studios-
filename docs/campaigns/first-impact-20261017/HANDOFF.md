# FIRST IMPACT CAMPAIGN — HANDOFF (written 2026-10-18, session close)

Successor: you are finishing the Ultramonkeydog Studios FIRST IMPACT campaign.
Cody Haring owns IP + final artistic authority. Everything below is verified
state from the outgoing session — trust it, but re-verify cheaply before building on it.

## 0. THE HANDOFF PROMPT (paste to the next agent)

> You are finishing the ULTRAMONKEYDOG STUDIOS "FIRST IMPACT" campaign (studio
> arrival video + Ghengis Mon arrival video + branding + distribution prep).
> Boot the private production system first (deep health / lane / drift checks;
> it is the partner for this work). Read
> the private campaign handoff — it is
> your full state map. Built so far: Video A (studio, 44.5s) and Video B
> (Ghengis Mon, 60.7s), each in 16:9 + 9:16, at
> `scratch\first_impact\video{A,B}_*.mp4`, cut to Cody's own music (Mega Mind /
> Devour). Your jobs IN ORDER: (1) critique both videos at mobile size from
> contact sheets, improve weak cuts/typography/pacing and re-export; (2) finish
> branding — studio logo/wordmark directions + Ghengis Mon title screen
> evaluated in real contexts (Quig is the studio mascot; his identity contract
> is in `mcp__lab__partner_identity`); (3) distribution prep (website, social
> metadata, platform formats — NEVER claim anything published); (4) copy final
> exports + manifest + production report into
> `C:\Users\harin\Ultramonkeydog-studios-\docs\campaigns\first-impact-20261017\`
> and close out private production with a receipt. Creative
> voice Cody mandated: he is framed as an ANONYMOUS MAD-SCIENTIST OUTSIDER game
> dev; tease Sage + "proprietary software that breaks my limits" as LORE ONLY
> (private tooling and Sage are never public releases); Quig appears as studio mascot.
> Never optimize for minimal/safe — take the highest-value complete improvement.
> If provider limits bite, spawn cheap sub-agents (Cody authorized creating
> sub-agents/skills; grems in `state/grem_identity.json` + grem_discovery are
> inspiration). Editing mechanics: all shell via `is_background:true` (this host
> kills foreground shell); ffmpeg drawtext needs `fontfile=/Windows/Fonts/...`
> (no drive letter — colons/backslashes break the filter parser); Godot 4.6.1
> Movie Maker capture recipe is proven in HANDOFF §3.

## 1. Cody's creative direction (all confirmed in chat, 2026-10-17)

1. Frame Cody as a **mad scientist anonymous outsider game dev**.
2. **Show Sage a bit + "I have proprietary software that breaks my limits to
   create"** — but Sage and private tooling are **NOT public releases**, only
   cool lore/tease. Never imply they will ship.
3. **Quig is the studio mascot** (his canonical identity: QUIG_PARTNER_V1,
   "the recurring companion face across Cody's creations" — retrieve via
   `mcp__lab__partner_identity`). Already a Ghengis Mon narrator voice.
4. Provider/model hard limits are not an excuse — **spawn cheap sub-agents**;
   Cody permits creating skills + sub-agents to work better with private production tooling.
   (No LLxprt subagents are registered — `/subagent` is a user-side CLI command.
   Parallelize via background shell jobs meanwhile.)
5. Honesty law from the mission: real gameplay / dev capture / art asset labels
   must stay truthful; no fake footage; no false publish claims.

## 2. What is BUILT and verified (paths on this machine)

Production workspace: private first-impact workspace.
- `videoA_studio_16x9.mp4` + `videoA_studio_9x16.mp4` — 44.5s studio arrival,
  Mega Mind bed (Cody's track, downloaded w/ provenance). Structure: black
  "ONE ANONYMOUS MAD SCIENTIST" → Quig mascot beat (studio-creature.svg render)
  → EXHIBIT A-D (Ghengis Mon battle / MUTTPIT "playable free now" / What We Fed
  / Savage Crown) → "THE SYSTEMS ARE ALIVE" (War Market) → Sage lore tease
  ("THE SECRET INGREDIENT / proprietary software that breaks my limits") →
  moonmaw breath shot → outro ("the experiments continue" + URL + honest status).
- `videoB_ghengismon_16x9.mp4` + `videoB_ghengismon_9x16.mp4` — 60.7s game
  trailer, Devour bed (the game's THE FALL primary score; "Devour" IS the
  mechanic). Structure: "EVERY EMPIRE BEGINS AS AN EGG" → Hero Scion hatching
  still → War Market fork → conquest map → **real captured Riot battle motion**
  (14s) → "THE RIOT" text beat → consequence still → real title-screen motion →
  GHENGIS MON outro (BROOD RIOT · WAR OF FIVE CONTINENTS · in development).
- Builders (ffmpeg via Python subprocess, no shell quoting): `build_video_a.py`,
  `build_video_b.py` — re-run after edits; segments cached in `segments_a/`,
  `segments_b/`.
- Contact sheets for mobile-size critique: `frames/videoA_contact.png`
  (built), `frames/videoB_contact.png` (build command was interrupted —
  regenerate: `ffmpeg -y -i videoB_ghengismon_9x16.mp4 -vf "fps=1/5,
  scale=270:480,tile=4x3" frames/videoB_contact.png`).

## 3. Proven production mechanics (re-use, don't rediscover)

- **Godot 4.6.1 Movie Maker**: `C:\Users\harin\Downloads\Godot_v4.6.1-stable_win64.exe\
  Godot_v4.6.1-stable_win64_console.exe --path C:\Users\harin\broodriot
  --write-movie <out.avi> --fixed-fps 30 -s res://<driver>.gd` renders every
  frame at 1280x720 native (RTX 4080, ~65% realtime). Proven captures:
  `footage/gm_title.avi` (14s real title screen — USE THIS, clean),
  `footage/gm_riot_720.avi` (15s real battle with combat callouts, via
  `tools/capture_riot.gd`). `footage/gm_title_1080.avi` and `gm_play_1080.avi`
  have black borders (game renders 1280x720 into a 1920x1080 window) — if used,
  `crop=1280:720:0:0` first. Capture drivers live in
  `C:\Users\harin\broodriot\.godot-cli\capture_*.gd` (untracked scratch zone,
  same place as the historical playtest_driver.gd).
- **Play-driver gotcha** (why gm_play never played rounds): the parent
  `playtest_driver.gd` never dismisses the title overlay; "AWAKEN A NEW
  CONQUEST" opens a confirm modal whose button reads "START FRESH CONQUEST".
  A subclass overriding `_play()` with `await super._play()` ran inconsistently
  (one run looped 100s at the title, one exited in 3s) — if you need free-play
  footage, write a STANDALONE driver using the parent's `_press/_buttons/
  _watch_battle/_shop_round` helpers and its view dispatch (battle_active →
  watch; conquest_map.visible → press "LAUNCH INVASION"; shop_director.visible →
  _shop_round; war_camp.visible → camp_closed.emit()) instead of subclassing.
- **ffmpeg drawtext**: `fontfile=/Windows/Fonts/georgiab.ttf` (forward slashes,
  NO drive letter — `C:\...` inside -vf breaks the filter parser). Fonts used:
  georgiab.ttf (statements), GOTHICB.TTF (labels). Never use apostrophes or
  colons inside `text='...'`.
- **SVG→PNG**: ffmpeg has no svg decoder here; headless Edge works:
  `Start-Process msedge -ArgumentList '--headless','--disable-gpu',
  '--window-size=1280,1440','--default-background-color=00000000',
  '--screenshot=<out.png>','file:///<svg>' -Wait`.
- **Shell on this host**: every foreground `run_shell_command` can die
  instantly — ALWAYS `is_background:true` + `check_async_tasks` polling.

## 4. Music state (complete, provenance intact)

- SoundCloud verified live: `https://soundcloud.com/cody-haring-380974285/tracks`
  (88+ tracks, tool = `python -m yt_dlp`). The four named tracks all exist and
  are downloaded with .info.json provenance to
  private first-impact source-staging archive:
  Devour (id 620698710, THE FALL primary score per
  `quig-vault/asset_manifests/savage_crown_soundtrack_atlas.json`),
  Mega-mind (1486149688), the Sound (1093149880), shifting the realms (1048677886).
- Normalized beds in `scratch/first_impact/audio/`: bed_studio_megamind.m4a (55s,
  Video A), bed_ghengis_devour.m4a (62s from Devour 20s, Video B),
  bed_sting_thesound.m4a (30s), bed_title_shifting.m4a (40s — unused yet, ideal
  for a title-screen/logo short). Energy maps in `analyze_audio.py` output.
- Idle extras: The Sound + Shifting the Realms are unused — good for a logo
  sting / title showcase short (see §6 open work).

## 5. Portfolio truth map (for edits + branding)

- Ghengis Mon = `C:\Users\harin\broodriot` (Godot 4, registry `broodriot`).
  Title screen (TitleScreenOverlay.gd) is already strong (anime key art,
  Warlord's Oath menu, Celeste briefing quote). 58 playtest stills +
  74 full-playthrough stills in `.godot-cli/`. Creature art in
  `art/generated/creatures/` (30+). NOTE: the repo has UNCOMMITTED-then-pushed
  waves of work from parallel sessions (portrait identity, UI fixes) — refresh
  `git -C broodriot pull` before adding anything.
- MUTTPIT: only shipped playable game (studios URL). Captures:
  `Ultramonkeydog-studios-\public\assets\muttpit\{title,kennel,bout,mailbox}\capture.png`.
- What We Fed: `C:\Users\harin\what-we-fed` — action horror, 12-track audio vault
  in `assets/audio/` (DAMNHEAVY etc.), combat stills in `docs/ai/visual_audits/`.
- Savage Crown: Android C++, living-body creature art in `docs/art/generated_life/`.
- Bone League / Feral Formation / Box o' Battles / Monkey's Ear: one honest
  artifact each (see `projects/PROJECT_INDEX.md`).
- Studio brand: `Ultramonkeydog-studios-\public\assets\studio-mark.svg` (M+play
  mark) + `studio-creature.svg` (the multi-eyed creature = Quig mascot anchor;
  rendered copy at `stills/studio_creature.png`). Palette #241914 / #EEE1BF /
  #EE8765 / #A94B35.

## 6. Remaining work (priority order)

> Update 2026-10-18 (outgoing session): first mobile-size critique pass DONE and
> fixed — 9:16 text overflow resolved via `fit_size` (geometric auto-shrink,
> factor 0.75 after a second tightening pass); the wrong "Sage" screenshot
> (a terminal artifact) was replaced with an honest text-card lore tease; the
> weak Savage Crown still was replaced with the game's real menu capture.
> Successor's critique should judge pacing / music sync / shot quality now.

1. **Critique + improve both videos** (mission standard: "artistically good at
   phone size"). Build both contact sheets, view at mobile size, fix weak cuts /
   text sizing / pacing, re-export. Known soft spots to check: Video A sage_phone
   crop (phone screenshot 1080x2404 — vertical crop should be fine but verify
   the tease reads), 9:16 upscale softness on 720px sources, Video B riot clip
   audio-less motion (game SFX are not in the mix — music-only is intended).
2. **Branding**: (a) studio logo/wordmark — explore 2-3 directions via
   `generate_image` + refined SVG, judged in title-card/website/thumbnail
   contexts; preserve existing identity, avoid generic AI-icon look;
   (b) Ghengis Mon title screen — it is already strong; an improvement must be
   real (e.g. motion/atmosphere or a stronger wordmark) and evaluated IN the
   game; `TitleScreenOverlay.gd` + `assets/art/title/broodriot_title_screen_keyart.png`
   are the surfaces. Optional quick win: a 6-10s logo/title sting using
   bed_title_shifting.m4a + bed_sting_thesound.m4a.
3. **Distribution prep**: inspect https://ultramonkeydog-studios.vercel.app/
   (the live site), draft social metadata + platform specs (TikTok/IG Reels/
   YT Shorts 9:16, website 16:9, itch); Metricool only if actually connected;
   NEVER claim a post went live. MUTTPIT itch kit already prepared at
   `Ultramonkeydog-studios-\docs\campaigns\muttpit-itch-kit-20261015\`.
4. **Deliver + close**: copy final exports + `manifest.json` (track provenance,
   asset sources, clip labeling) + `PRODUCTION_REPORT.md` (what was made/tested/
   improved, what is incomplete, decisions needing Cody) into
   `Ultramonkeydog-studios-\docs\campaigns\first-impact-20261017\`. Then a private-production
   receipt (`receipts/receipt_<ts>_first_impact_campaign.md`, declaring
   FILES_CHANGED) + `python labctl finish --receipt <path> --yes -m ...`
   (two runs may be needed; if GH013 push block: `git rebase --autostash
   origin/master` then re-run finish). Remember: receipt COMMIT/END_HEAD pins
   need a follow-up "receipt: pin landing head" finish after landing.

## 7. Open creative calls for Cody (final authority)

- Public title: "GHENGIS MON" vs "BROOD RIOT: WAR OF FIVE CONTINENTS" (current
  edits show both — the outro uses the combined form).
- Whether MUTTPIT copy should say "playable free" (current cut says it).
- Sage tease wording ("THE SECRET INGREDIENT / proprietary software that
  breaks my limits") — currently lore-flavored, private tooling unnamed on screen.
- Which extra short deserves production first (logo sting vs title showcase vs
  Quig mascot short).
