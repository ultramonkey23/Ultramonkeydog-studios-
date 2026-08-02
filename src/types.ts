/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectVisualStyle =
  | "what-we-fed"
  | "bone-league"
  | "savage-crown"
  | "saga-anxious-fluff"
  | "feral-formation"
  | "box-o-battles";

export type PublicMediaState =
  | "PLAYABLE_DEMO"
  | "NATIVE_BUILD"
  | "READ_ONLY_PACKET"
  | "EARLY_BUILD"
  | "CAPTURE_REQUIRED";

export type VisualEvidenceState =
  | "PROMOTED_RUNTIME_ENVIRONMENT"
  | "WIRED_RUNTIME_CANDIDATE_DEVICE_PARTIAL"
  | "ACCEPTED_REFERENCE"
  | "CAPTURE_REQUIRED";

export interface PublicVisualEvidence {
  id: string;
  title: string;
  state: VisualEvidenceState;
  note: string;
  limitation?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  sourceLabel: string;
  sourceUrl: string;
}

export interface PublicVisual {
  style: ProjectVisualStyle;
  mediaState: PublicMediaState;
  mediaLabel: string;
  heading: string;
  note: string;
  facets: string[];
  evidence?: PublicVisualEvidence[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  accentColor: "neon-green" | "electric-blue" | "violet" | "warm-amber" | "crimson";
  publicVisual: PublicVisual;
  demoUrl?: string;
  demoLabel?: string;
  expandedDetails?: string;
  tone?: string;
  systemsUnderTheHood?: string[];
}

export interface ProductionRole {
  title: string;
  roleDescription: string;
  iconName: string;
  howAiHelps: string;
}

export interface FundingNeed {
  title: string;
  description: string;
  urgency: "High Priority" | "Mid Priority" | "Strategic Pillar";
}
