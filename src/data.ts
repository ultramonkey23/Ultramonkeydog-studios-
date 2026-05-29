/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, FundingNeed, ProductionRole } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "what-we-fed",
    title: "WHAT WE FED",
    tone: "Dark mythic creature RPG",
    description: "A dark creature-driven RPG roguelite about genetic mutation, hunger, timing-based combat, music-driven escalation, and unforgiving mechanics where you must become feared.",
    tags: ["Creature RPG", "Roguelite", "DNA Systems", "Bond vs Eat", "Dark Fantasy"],
    status: "In Development",
    accentColor: "neon-green",
    glowClass: "glow-green",
    conceptPrompt: "A bioluminescent organic helix mutating in dark waters"
  },
  {
    id: "bone-league",
    title: "Bone League: Black Bracket",
    tone: "Sports horror management sim",
    description: "A dark football roguelite management sim where doomed athletes are drafted into an 8-week Circle, matches resolve through layered simulation math, and every injury, upgrade, and roster decision can shape the season.",
    tags: ["Management Sim", "Roguelite", "Sports Horror", "Auto-Sim", "Strategy", "Procedural Seasons"],
    status: "Public Demo / In Development",
    accentColor: "electric-blue",
    glowClass: "glow-blue",
    conceptPrompt: "A digital tactical football hologram overlaying stadium blueprints",
    demoUrl: "https://bone-league-black-bracket-604506170438.us-east1.run.app",
    expandedDetails: "Bone League: Black Bracket is a dark dystopian football roguelite management simulator about drafting doomed athletes, surviving an 8-week Circle, resolving matches through layered simulation math, managing injury/death, and turning every season into a brutal tactical campaign.",
    systemsUnderTheHood: [
      "Single source-of-truth Zustand store orchestrating run state, roster, map nodes, meta progression, currency, histories, and routing.",
      "8-week procedural Circle Map structure with branching nodes, lane criteria, forward limits, and final championship endpoints.",
      "Math play simulator calculating Strength, Polish, Brutality, Awareness, Cunning, Precision, Speed, Agility, Grit, and Potential.",
      "Tactical playbook mechanisms matching player formations directly to dynamic synergy thresholds.",
      "Draft pressure engines notifying players of under-staff risk and state-linked limits shielding growth scaling caps.",
      "Episodic prose match reports translating real mathematical simulation logs to immersive game narratives.",
      "Integrated asset catalogs and fallback interface structures guaranteeing layout alignment stability."
    ]
  },
  {
    id: "savage-crown",
    title: "Savage Crown",
    tone: "Mobile-native mutation roguelite",
    description: "Savage Crown is a mobile-first action/roguelite systems project where mutations, creatures, passives, projectiles, and stat growth fuse into a living Crownbeast identity. Every new ingredient multiplies the build space instead of acting like isolated content.",
    tags: ["Android Native", "C++ Simulation Core", "Kotlin/JNI Bridge", "Mutation Draft", "Crownbeast System", "Procedural Synergy", "Mobile-First"],
    status: "In Development",
    accentColor: "crimson",
    glowClass: "glow-crimson",
    conceptPrompt: "A fractured kaiju crown radiating mutation energy across a dark mobile canvas",
    expandedDetails: "Savage Crown is being built as a technically aggressive mobile game experiment: deterministic C++ systems, Android/JNI integration, and a mutation-driven design spine where complexity becomes power. The long-term goal is a game where creature DNA, weapons, projectiles, passives, stats, and visual identity all feed a mathematical build engine instead of static upgrade lists."
  },
  {
    id: "saga-anxious-fluff",
    title: "Saga of an Anxious Fluff",
    tone: "Colorful creature-growth RPG",
    description: "A colorful, sensory-aware RPG/roguelite dedicated to Cody's son, proving family-friendly games can still hold deep mechanical scaling, stat passives, and deeply satisfying mathematical progression.",
    tags: ["All-Ages RPG", "Creature Growth", "Family-Friendly", "Progression", "Sensory-Aware"],
    status: "In Design / Early Development",
    accentColor: "warm-amber",
    glowClass: "glow-amber",
    conceptPrompt: "A glowing fuzzy golden organism radiating safety in deep woods"
  },
  {
    id: "feral-formation",
    title: "Feral Formation",
    tone: "Tactical creature-party roguelite",
    description: "A tactical creature-party roguelite where squad management, tempo control, clash windows, adaptive rewards, and formation strategy decide the run.",
    tags: ["Tactical RPG", "Creature Party", "Roguelite", "Formation Systems", "Deterministic Combat"],
    status: "Public Demo / In Development",
    accentColor: "violet",
    glowClass: "glow-violet",
    conceptPrompt: "A tactical cybernetic grid displaying formation-driven matchup vectors",
    demoUrl: "https://feral-formation-604506170438.us-east1.run.app",
    expandedDetails: "Feral Formation is a high-tactical, mobile-first, creature-party RPG roguelite with deterministic combat, clash windows, adaptive rewards, persistent creature mastery, matchup forecasting, and formation-driven strategy."
  }
];

export const PRODUCTION_ROLES: ProductionRole[] = [
  {
    title: "Systems Design",
    roleDescription: "Architecting complex game economies, creature mutant trees, modular stat scaling structures, and roguelite progression loops.",
    iconName: "Palette",
    howAiHelps: "Simulates variable curves, monitors balance outliers across extreme runs, and crafts mathematical models for systems mechanics.",
    exampleOutput: "Perfect mathematical scaling"
  },
  {
    title: "Code & Debugging",
    roleDescription: "Writing robust gameplay logic, visual rendering blocks, input listeners, state modules, and cross-platform builds.",
    iconName: "Terminal",
    howAiHelps: "Acts as a rapid co-pilot to check syntax, generate boilerplate, and perform raw audits while the human director strictly dictates the architectural flow.",
    exampleOutput: "Zero-friction code blocks"
  },
  {
    title: "Art Direction",
    roleDescription: "Drafting mood panels, creature blueprints, high-identity color palettes, UI textures, and dark retro-arcade guides.",
    iconName: "Layers",
    howAiHelps: "Generates rapid conceptual bridges, producing detailed aesthetic options that are heavily filtered through Cody's specific horror and underground taste.",
    exampleOutput: "Visual asset coordinates"
  },
  {
    title: "Combat Logic",
    roleDescription: "Designing real-time battlefield clocks, clash-counter checks, deterministic action steps, and active creature combat moves.",
    iconName: "Cpu",
    howAiHelps: "Tests discrete collision edge-cases and designs complex multi-agent flow simulations to keep fighting readable and tight.",
    exampleOutput: "Deterministic execution maps"
  },
  {
    title: "UI / UX Planning",
    roleDescription: "Creating ergonomic touch maps, adaptive tactical dashboard layouts, high-contrast menus, and screen scales.",
    iconName: "Eye",
    howAiHelps: "Performs layout stress audits, screens safety ratios against high light levels, and verifies viewport structural bounds.",
    exampleOutput: "Oculosafe visual wireframes"
  },
  {
    title: "Documentation",
    roleDescription: "Synthesizing creative journals, systems specifications, math sheets, and code documentation into unified wikis.",
    iconName: "FileText",
    howAiHelps: "Collects sporadic design comments and drafts beautifully formatted specifications and game design blueprints.",
    exampleOutput: "Structured technical wikis"
  },
  {
    title: "Grant Materials",
    roleDescription: "Constructing formal grant submissions, public program pitches, budget models, and compliance papers for sponsors.",
    iconName: "Megaphone",
    howAiHelps: "Ensures structural layout compliance, reviews clarity of intent, and tracks required vocabulary constraints.",
    exampleOutput: "Funder-compliant structures"
  },
  {
    title: "Playtest Analysis",
    roleDescription: "Parsing player logs, control clicks, session durations, failure thresholds, and game balance diagnostics.",
    iconName: "FlaskConical",
    howAiHelps: "Processes thousands of lines of raw telemetry logs, highlighting combat hot-spots and interface friction points.",
    exampleOutput: "Targeted playtest bug logs"
  },
  {
    title: "Trailer / Marketing Prep",
    roleDescription: "Compiling strategic story hooks, teaser layouts, gameplay clips, video transcripts, and sound track timings.",
    iconName: "Megaphone",
    howAiHelps: "Acts as a dialogue sounding board and writes concise textual teasers tailored to high-identity indie communities.",
    exampleOutput: "Visual audio sync sheets"
  }
];

export const FUNDING_NEEDS: FundingNeed[] = [
  {
    title: "Dedicated Game-Development Workstation",
    description: "High-performance processing hardware to run modern game engines, compile local builds rapidly, bake ambient occlusion, and handle real-time simulation logic without hardware limits.",
    urgency: "High Priority"
  },
  {
    title: "Drawing & Visual Production Tools",
    description: "Professional active displays, tablets, and vector-design suites to craft distinctive pixel assets, character profiles, and aesthetic user interface grids.",
    urgency: "High Priority"
  },
  {
    title: "Premium AI Production Tools",
    description: "Licenses for AI-driven development agents, automated regression testing runners, state-of-the-art coding interfaces, and visual pipelines.",
    urgency: "Strategic Pillar"
  },
  {
    title: "Original Asset Creation Support",
    description: "Securing bespoke sound effects, custom chiptunes, professional voice synthesis assets, and tactile audio feedback systems, ensuring high-identity audio design.",
    urgency: "Strategic Pillar"
  },
  {
    title: "Playable Demo Development",
    description: "Porting current web/concept modules into highly optimized downloadable builds, preparing them for release on major indie platform storefronts.",
    urgency: "High Priority"
  },
  {
    title: "Public-Facing Materials",
    description: "Creating highly detailed game manuals, structural maps, production vlogs, and pitch files to capture community and sponsor attention.",
    urgency: "Mid Priority"
  },
  {
    title: "Future Commercial Release Preparation",
    description: "Establishing indie developer certificates, setting up digital distribution hubs, mapping legal frameworks, and doing direct storefront compliance audits.",
    urgency: "Strategic Pillar"
  }
];
