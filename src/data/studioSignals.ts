export type StudioSignalState =
  | "PLAYABLE"
  | "TESTED"
  | "INTEGRATED"
  | "WITNESSED_OPERATIONALLY"
  | "CAPTURE_REQUIRED";

export interface StudioSignal {
  id: string;
  project: string;
  date: string;
  state: StudioSignalState;
  title: string;
  summary: string;
  sourceLabel: string;
  sourceUrl?: string;
  proofCeiling: string;
  action?: {
    label: string;
    kind: "section" | "external";
    target: string;
  };
}

export const STUDIO_SIGNALS: StudioSignal[] = [
  {
    id: "monkeys-ear-windows-vst3-artifacts",
    project: "Monkey's Ear",
    date: "2026-09-16",
    state: "TESTED",
    title: "Monkey's Ear now preserves validated Windows VST3 artifacts",
    summary:
      "The public Monkey's Ear repository now builds and preserves validated Windows VST3 artifacts for the main instrument and standalone Vocal module. Recent host probes also verify that VST3 automation reaches DSP controls, turning the project from source-only proof into a concrete product body that can enter a bounded early-access release path.",
    sourceLabel: "Monkey's Ear public commit 4ab786b",
    sourceUrl:
      "https://github.com/ultramonkey23/monkeys-ear/commit/4ab786b258a35427f4139f5922f787f01e05a2d6",
    proofCeiling:
      "Build, artifact preservation, deterministic DSP tests, and focused host-side validation are proven. A stranger-friendly installer, broader DAW compatibility, independent user acceptance, support flow, pricing, and paying-user validation are still open; this is not yet evidence for a finished mass-market release.",
    action: {
      label: "Explore Monkey's Ear",
      kind: "external",
      target: "https://github.com/ultramonkey23/monkeys-ear",
    },
  },
  {
    id: "box-o-battles-math-spine-v0-1",
    project: "Box o' Battles",
    date: "2026-08-02",
    state: "TESTED",
    title: "The Arbiter no longer guesses",
    summary:
      "The legacy evidence-string stub now fails closed. The owner repository evaluates six-step permanent-defeat routes, collapses correlated routes, combines independent groups, separates reliability from route advantage, fingerprints replay inputs, and rejects manipulated outputs.",
    sourceLabel: "Private owner merge 02b9b84",
    proofCeiling:
      "Generic engine, replay, persistence, HTTP behavior, and remote CI are proven. BOB #003 has not been recomputed through this engine; franchise dogfood, sensitivity analysis, calibration, and independent validation remain open.",
    action: {
      label: "Open the Box",
      kind: "section",
      target: "box-o-battles",
    },
  },
  {
    id: "studios-visual-evidence-rank",
    project: "Ultramonkeydog Studios",
    date: "2026-08-02",
    state: "WITNESSED_OPERATIONALLY",
    title: "Visual evidence now outranks asset novelty",
    summary:
      "The site removed a weak utility-sigil showcase, added evidence-ranked media states, corrected stale Savage Crown claims, and passed the hosted deployment gate.",
    sourceLabel: "Studios merge e41e534",
    sourceUrl:
      "https://github.com/ultramonkey23/Ultramonkeydog-studios-/commit/e41e534fff4cde3d8feb0404c414027727ec4fe",
    proofCeiling:
      "Code and hosted deployment are proven. Final human visual approval remains separate.",
  },
  {
    id: "savage-crown-live-visual-strain",
    project: "Savage Crown",
    date: "2026-08-02",
    state: "TESTED",
    title: "Player strain now reads live build stats",
    summary:
      "The player path derives VisualStrain from live elasticity, entropy, and discordance instead of pinning every run to one fixed strain.",
    sourceLabel: "Private owner commit 2f3801b",
    proofCeiling:
      "Host tests passed for the current path. Category-dispatched anatomy is a recognized owner-law contradiction under repair; same-version device capture and Cody's visual judgment are also still required.",
    action: {
      label: "View Savage Crown",
      kind: "section",
      target: "project-card-savage-crown",
    },
  },
  {
    id: "box-o-battles-owner-card",
    project: "Box o' Battles",
    date: "2026-08-02",
    state: "INTEGRATED",
    title: "BOB #003 remains an owner-held immutable card",
    summary:
      "Box o' Battles owns the validated BOB #003 packet and Studios renders it read-only through Card Front, Comic Panel Flow, Card Back, Issue Variants, and Replay Seal. The packet predates the merged Math Spine core and is not presented as a fresh recomputation.",
    sourceLabel: "BOB #003 public card packet",
    proofCeiling:
      "Packet validation and Studios integration are proven. Generation by the current Math Spine, statistical calibration, and independent matchup validation are not.",
    action: {
      label: "Open the Box",
      kind: "section",
      target: "box-o-battles",
    },
  },
  {
    id: "box-o-battles-0003-generic-replay-drift",
    project: "Box o' Battles",
    date: "2026-08-29",
    state: "TESTED",
    title: "Replayed on the current engine, BOB #003 flips",
    summary:
      "The owner's dossier benchmark replays Vader vs Sauron through the current generic engine at 5000 trials. It returns Sauron at a coin-flip margin, where the card recorded Darth Vader at a narrow one. The winner reverses. The replay is a generic dossier run against a neutral 60m courtyard, not a regeneration of the authored card, and the owner labels it a candidate dual run rather than authority — but it is the closest thing to a recomputation that exists, and it disagrees.",
    sourceLabel: "Private owner merge 56b8c4d — make profile-sim-check",
    proofCeiling:
      "The replay is deterministic and reproducible. It does not overturn the card: a generic dossier replay and the authored Arbiter card are different computations, and neither is calibrated or independently adjudicated. Treat the card's winner as unsettled rather than confirmed.",
    action: {
      label: "Open the Box",
      kind: "section",
      target: "box-o-battles",
    },
  },
  {
    id: "what-we-fed-title-capture",
    project: "WHAT WE FED",
    date: "2026-08-02",
    state: "CAPTURE_REQUIRED",
    title: "The real title composition must be captured as a whole",
    summary:
      "The title is a live composition of the Ruins backdrop, lair silhouette, title rail, particles, mist, typography, and supporting sigil—not one isolated bitmap.",
    sourceLabel: "Current TitleScreen owner",
    sourceUrl:
      "https://github.com/ultramonkey23/what-we-fed/blob/master/scenes/ui/TitleScreen.gd",
    proofCeiling:
      "Repository ownership is known. A current full-scene capture has not yet been approved for public showcase.",
    action: {
      label: "View WHAT WE FED",
      kind: "section",
      target: "project-card-what-we-fed",
    },
  },
];
