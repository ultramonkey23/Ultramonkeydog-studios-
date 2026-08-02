/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectVisualStyle =
  | "wild-fable"
  | "necro-sport"
  | "crown-biology"
  | "all-ages-mythic"
  | "cosmic-slate"
  | "arbiter-card";

export type PublicMediaState =
  | "PLAYABLE_DEMO"
  | "NATIVE_BUILD"
  | "READ_ONLY_PACKET"
  | "CONCEPT_TREATMENT"
  | "EARLY_BUILD"
  | "RUNTIME_ASSET";

export interface PublicVisualAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  asset?: PublicVisualAsset;
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
