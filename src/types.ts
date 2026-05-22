/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  accentColor: "neon-green" | "electric-blue" | "violet" | "warm-amber";
  glowClass: string;
  imagePath?: string;
  conceptPrompt?: string;
  demoUrl?: string;
  expandedDetails?: string;
  tone?: string;
  systemsUnderTheHood?: string[];
}

export interface ProductionRole {
  title: string;
  roleDescription: string;
  iconName: string;
  howAiHelps: string;
  exampleOutput: string;
}

export interface FundingNeed {
  title: string;
  description: string;
  urgency: "High Priority" | "Mid Priority" | "Strategic Pillar";
}
