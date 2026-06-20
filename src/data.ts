/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FundingNeed, ProductionRole, Project } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "what-we-fed",
    title: "WHAT WE FED",
    tone: "Dark mythic creature RPG",
    description:
      "A Godot creature RPG roguelite about hunger, bonding, mutation pressure, music-driven escalation, tactical lane/sector combat, and becoming the thing other creatures fear.",
    tags: ["Creature RPG", "Godot", "Mutation", "Bond vs Eat", "Combat Audio", "Dark Fantasy"],
    status: "Active Systems Pass",
    accentColor: "neon-green",
    glowClass: "glow-green",
    conceptPrompt: "A bioluminescent organic helix mutating in dark waters",
    expandedDetails:
      "Recent Lab-tracked work focused on pruning stale debug systems, repairing sector targeting behavior, and retiring false LaneManager doctrine in favor of the real ZoneManager combat authority.",
    systemsUnderTheHood: [
      "Deterministic sector targeting now resolves enemies by stable identity instead of brittle lane scans.",
      "Zone occupancy accounts for strikers and orbiters, reducing weird spawn and marker behavior.",
      "Combat presentation and HUD refreshes read live enemy identity directly where possible.",
      "First-party songs, combat backgrounds, impact VFX, sprites, UI panels, shell sigils, and shaders are candidate source material for future studio reuse.",
    ],
  },
  {
    id: "bone-league",
    title: "Bone League: Black Bracket",
    tone: "Sports horror management sim",
    description:
      "A dark football roguelite management sim where doomed athletes are drafted into an 8-week Circle, matches resolve through layered simulation math, and every injury, upgrade, and roster decision can shape the season.",
    tags: ["Management Sim", "Roguelite", "Sports Horror", "Auto-Sim", "Strategy", "Procedural Seasons"],
    status: "Public Demo Live",
    accentColor: "electric-blue",
    glowClass: "glow-blue",
    conceptPrompt: "A digital tactical football hologram overlaying stadium blueprints",
    demoUrl: "https://bone-league-black-bracket-604506170438.us-east1.run.app",
    expandedDetails:
      "Bone League proves the studio can ship direct browser-accessible systems: draft pressure, roster management, strategic upgrades, persistent run state, procedural weeks, and readable simulation output.",
    systemsUnderTheHood: [
      "Single source-of-truth Zustand store orchestrating run state, roster, map nodes, meta progression, currency, histories, and routing.",
      "8-week procedural Circle Map structure with branching nodes, lane criteria, forward limits, and final championship endpoints.",
      "Math play simulator calculating Strength, Polish, Brutality, Awareness, Cunning, Precision, Speed, Agility, Grit, and Potential.",
      "Episodic prose match reports translate mathematical simulation logs into readable game narrative.",
    ],
  },
  {
    id: "savage-crown",
    title: "Savage Crown",
    tone: "Mobile-native mutation roguelite",
    description:
      "A native Android action roguelite systems project where mutations, creatures, passives, projectiles, and stat growth fuse into a living Crownbeast identity.",
    tags: ["Android Native", "C++ Core", "Kotlin/JNI", "Mutation Draft", "Crownbeast", "Offline-First"],
    status: "JNI / Leveling Proof",
    accentColor: "crimson",
    glowClass: "glow-crimson",
    conceptPrompt: "A fractured kaiju crown radiating mutation energy across a dark mobile canvas",
    expandedDetails:
      "Savage Crown is the studio's native technical proof track: deterministic C++ gameplay systems, Kotlin/JNI bridging, Android device validation, and Lab-routed gameplay/style intake.",
    systemsUnderTheHood: [
      "Unbounded leveling physics replaced shallow linear hardcaps with a dynamic resistance curve.",
      "JNI hot paths were flattened through Android CriticalNative bridge work for lower-overhead simulation calls.",
      "Offline-first runtime law keeps gameplay independent from network services, API keys, quotas, or cloud calls.",
      "Style intake now routes influences into mechanics, feel, math, and readability without copying protected assets.",
    ],
  },
  {
    id: "saga-anxious-fluff",
    title: "Saga of an Anxious Fluff",
    tone: "Colorful sensory-aware RPG",
    description:
      "A family-facing creature-growth RPG dedicated to Cody's son, proving accessible and sensory-aware games can still carry deep progression and satisfying system math.",
    tags: ["All-Ages RPG", "Creature Growth", "Family-Friendly", "Progression", "Sensory-Aware"],
    status: "Design / Early Build",
    accentColor: "warm-amber",
    glowClass: "glow-amber",
    conceptPrompt: "A glowing fuzzy golden organism radiating safety in deep woods",
    expandedDetails:
      "This branch concentrates the studio's accessibility work: predictable loops, gentle audio control, readable emotion, steady visuals, and mechanical depth without harsh sensory pressure.",
  },
  {
    id: "feral-formation",
    title: "Feral Formation",
    tone: "Tactical creature-party roguelite",
    description:
      "A tactical creature-party roguelite where squad management, tempo control, clash windows, adaptive rewards, and formation strategy decide the run.",
    tags: ["Tactical RPG", "Creature Party", "Roguelite", "Formation Systems", "Deterministic Combat"],
    status: "Public Demo Live",
    accentColor: "violet",
    glowClass: "glow-violet",
    conceptPrompt: "A tactical cybernetic grid displaying formation-driven matchup vectors",
    demoUrl: "https://feral-formation-604506170438.us-east1.run.app",
    expandedDetails:
      "Feral Formation is a high-tactical, mobile-first creature-party RPG roguelite with deterministic combat, clash windows, adaptive rewards, persistent creature mastery, matchup forecasting, and formation-driven strategy.",
  },
];

export const PRODUCTION_ROLES: ProductionRole[] = [
  {
    title: "Systems Design",
    roleDescription: "Architecting game economies, creature mutation trees, stat scaling structures, and roguelite progression loops.",
    iconName: "Palette",
    howAiHelps: "Models curves, flags balance outliers, and turns rough systems intent into testable structures.",
    exampleOutput: "Scaling maps",
  },
  {
    title: "Code & Debugging",
    roleDescription: "Building gameplay logic, rendering blocks, input listeners, state modules, and platform-specific bridges.",
    iconName: "Terminal",
    howAiHelps: "Accelerates implementation and audits while Cody keeps architecture and final behavior under human control.",
    exampleOutput: "Validated patches",
  },
  {
    title: "Art Direction",
    roleDescription: "Drafting mood targets, creature silhouettes, color systems, interface texture, and visual identity references.",
    iconName: "Layers",
    howAiHelps: "Generates candidate visual directions that are filtered through the studio's specific horror and underground taste.",
    exampleOutput: "Mood targets",
  },
  {
    title: "Combat Logic",
    roleDescription: "Designing combat clocks, clash windows, targeting rules, deterministic action steps, and active creature moves.",
    iconName: "Cpu",
    howAiHelps: "Stress-tests edge cases and maps multi-agent flow so combat stays readable under pressure.",
    exampleOutput: "Combat maps",
  },
  {
    title: "UI / UX Planning",
    roleDescription: "Creating touch maps, tactical dashboards, high-contrast menus, and responsive viewport structures.",
    iconName: "Eye",
    howAiHelps: "Runs layout stress checks and catches text, viewport, and state problems before they become public friction.",
    exampleOutput: "Screen audits",
  },
  {
    title: "Documentation",
    roleDescription: "Turning design notes, code decisions, receipts, and build proof into durable project memory.",
    iconName: "FileText",
    howAiHelps: "Collects scattered direction into readable specs, handoffs, and validation records.",
    exampleOutput: "Living docs",
  },
  {
    title: "Grant Materials",
    roleDescription: "Preparing public program pitches, support requests, budget reasoning, and compliance-friendly materials.",
    iconName: "Megaphone",
    howAiHelps: "Improves structure, vocabulary, clarity, and evidence trails for funders and incubators.",
    exampleOutput: "Pitch packs",
  },
  {
    title: "Playtest Analysis",
    roleDescription: "Parsing player logs, session reports, control friction, failure thresholds, and balance diagnostics.",
    iconName: "FlaskConical",
    howAiHelps: "Finds patterns in raw feedback and points iteration toward the highest-impact fixes.",
    exampleOutput: "Bug targets",
  },
  {
    title: "Trailer / Marketing Prep",
    roleDescription: "Compiling hooks, teaser language, gameplay capture plans, transcripts, and sound timing notes.",
    iconName: "Megaphone",
    howAiHelps: "Drafts sharp public copy and campaign structures for high-identity indie communities.",
    exampleOutput: "Launch notes",
  },
];

export const FUNDING_NEEDS: FundingNeed[] = [
  {
    title: "Dedicated Game-Development Workstation",
    description: "Hardware for local builds, engine work, asset prep, simulation testing, and faster iteration without phone-only bottlenecks.",
    urgency: "High Priority",
  },
  {
    title: "Drawing & Visual Production Tools",
    description: "Active display/tablet support and visual software for creature sheets, UI textures, pixel work, and original asset direction.",
    urgency: "High Priority",
  },
  {
    title: "Premium AI Production Tools",
    description: "Coding agents, analysis tools, regression helpers, image pipelines, and documentation systems for disciplined solo production.",
    urgency: "Strategic Pillar",
  },
  {
    title: "Original Asset Creation Support",
    description: "Custom sound effects, music support, creature art, animation help, voice/audio experiments, and tactile feedback polish.",
    urgency: "Strategic Pillar",
  },
  {
    title: "Playable Demo Development",
    description: "Polishing browser prototypes and native builds into clearer vertical slices for public testing, funders, and storefront preparation.",
    urgency: "High Priority",
  },
  {
    title: "Public-Facing Materials",
    description: "Pitch decks, manuals, short-form videos, technical summaries, screenshots, capture passes, and community-ready project pages.",
    urgency: "Mid Priority",
  },
];
