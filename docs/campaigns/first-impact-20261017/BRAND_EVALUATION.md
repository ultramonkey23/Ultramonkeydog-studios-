# FIRST IMPACT — Brand evaluation

All three directions retain the established ink, cream, ember palette and are vector originals. Quig remains the studio mascot, not a game logo or a claim about a public AI product.

| Direction | Website masthead | Video title card | 1200px thumbnail | Verdict |
|---|---|---|---|---|
| 01 Surgical Stamp | Strong primary lockup | Strong | Strong | Recommended public default. It preserves the existing M/play mark and reads instantly. |
| 02 Quig Signal | Strong secondary / about page | Warm, character-led | Strong when the face is large | Use for Quig-led announcements and the studio about surface. |
| 03 Experiment Press | Good editorial/press page | Good opener | Too text-dense at small size | Use as a campaign/press treatment, not the social avatar. |

## Ghengis Mon title-screen pass

The game remains publicly titled **GHENGIS MON**. The title-screen masthead was strengthened in `broodriot/scripts/TitleScreenOverlay.gd`: a larger outlined, shadowed title now anchors the left panel; **BROOD RIOT · WAR OF FIVE CONTINENTS** remains the descriptor, with a `WAR RECORD 0001` campaign cue. This was evaluated in the actual 1280×720 Godot title capture: `concept/gm_title_brand.png` (capture source: `concept/gm_title_brand_720.avi`), not a mockup.

## Generation gate

The mandatory local ComfyUI check was run on 2026-10-18. It initially returned `BUSY_OR_LOW_VRAM` (0.02 GB free vs. 3.0 GB minimum), caused by a stale 9.5 GB local Ollama model and Comfy's idle cache. The stale model was unloaded and Comfy's `/free` action cleared the idle cache; preflight then passed at 3.33 GB free. One local source-transform study was made with the existing Quig reference, with full provenance in `concept/quig_signal_local_exploration.generation.json`. It was rejected as a final mark because it lost Quig's three-eye identity and read as a generic silhouette. No hosted generation was used. Vector exploration is deliberately the production route because the deliverable is a scalable identity system, not bitmap concept art.
