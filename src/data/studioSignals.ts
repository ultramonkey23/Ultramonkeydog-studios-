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
    id: "studios-visual-evidence-rank",
    project: "Ultramonkeydog Studios",
    date: "2026-08-02",
    state: "WITNESSED_OPERATIONALLY",
    title: "Visual evidence now outranks asset novelty",
    summary:
      "The site removed a weak utility-sigil showcase, added evidence-ranked media states, corrected stale Savage Crown claims, and passed the hosted deployment gate.",
    sourceLabel: "Studios merge e41e534",
    sourceUrl:
      "https://github.com/ultramonkey23/Ultramonkeydog-studios-/commit/e41e534fff4cde2e8de9804f3c11f19ec5ab666d",
    proofCeiling:
      "Code and hosted deployment are proven. Final human visual approval remains separate.",
  },
  {
    id: "savage-crown-live-visual-strain",
    project: "Savage Crown",
    date: "2026-08-02",
    state: "TESTED",
    title: "The player body now responds to the build",
    summary:
      "Player VisualStrain is derived from live elasticity, entropy, and discordance instead of being pinned to one fixed strain, preserving deterministic body-plan selection.",
    sourceLabel: "Savage Crown commit 2f3801b",
    sourceUrl:
      "https://github.com/ultramonkey23/savage-crown/commit/2f3801bdb61650fb8c410e835fba41c7d69d0bdb",
    proofCeiling:
      "Host tests passed. Same-version device capture and Cody's visual judgment are still required.",
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
    title: "BOB #003 has one owner and one public consumer",
    summary:
      "The validated Arbiter Card packet is owned by Box o' Battles and rendered read-only by Studios with Card Front, Comic Panel Flow, Card Back, Issue Variants, and Replay Seal.",
    sourceLabel: "BOB #003 public card packet",
    proofCeiling:
      "Packet validation and Studios integration are proven. Statistical calibration and independent matchup validation are not.",
    action: {
      label: "View Box o' Battles",
      kind: "section",
      target: "project-card-box-o-battles",
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
