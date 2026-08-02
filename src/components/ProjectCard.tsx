/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Activity,
  ArrowUpRight,
  Crown,
  Dna,
  ExternalLink,
  Gamepad2,
  Layers3,
  Scale,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Project, ProjectVisualStyle, PublicMediaState } from "../types";

interface ProjectCardProps {
  project: Project;
}

const styleTheme: Record<
  ProjectVisualStyle,
  {
    eyebrow: string;
    border: string;
    text: string;
    glow: string;
    wash: string;
    icon: typeof Gamepad2;
  }
> = {
  "wild-fable": {
    eyebrow: "Wild Fable Ink",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    glow: "shadow-[0_0_60px_rgba(16,185,129,0.10)]",
    wash: "from-emerald-500/15 via-emerald-950/10 to-transparent",
    icon: Dna,
  },
  "necro-sport": {
    eyebrow: "Mythic Necro-Sport",
    border: "border-sky-400/30",
    text: "text-sky-300",
    glow: "shadow-[0_0_60px_rgba(14,165,233,0.10)]",
    wash: "from-sky-500/15 via-red-950/10 to-transparent",
    icon: Trophy,
  },
  "crown-biology": {
    eyebrow: "Crown Biology",
    border: "border-red-500/30",
    text: "text-red-300",
    glow: "shadow-[0_0_60px_rgba(239,68,68,0.10)]",
    wash: "from-red-500/15 via-amber-950/10 to-transparent",
    icon: Crown,
  },
  "all-ages-mythic": {
    eyebrow: "All-Ages Mythic Color",
    border: "border-amber-400/30",
    text: "text-amber-200",
    glow: "shadow-[0_0_60px_rgba(251,191,36,0.10)]",
    wash: "from-amber-400/15 via-orange-950/10 to-transparent",
    icon: Sparkles,
  },
  "cosmic-slate": {
    eyebrow: "Cosmic Slate",
    border: "border-violet-400/30",
    text: "text-violet-300",
    glow: "shadow-[0_0_60px_rgba(139,92,246,0.10)]",
    wash: "from-violet-500/15 via-indigo-950/10 to-transparent",
    icon: Layers3,
  },
  "arbiter-card": {
    eyebrow: "Arbiter Card",
    border: "border-amber-500/30",
    text: "text-amber-300",
    glow: "shadow-[0_0_60px_rgba(245,158,11,0.10)]",
    wash: "from-amber-500/15 via-zinc-950/10 to-transparent",
    icon: Scale,
  },
};

const mediaTone: Record<PublicMediaState, string> = {
  PLAYABLE_DEMO: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  NATIVE_BUILD: "border-red-500/30 bg-red-500/10 text-red-200",
  READ_ONLY_PACKET: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  CONCEPT_TREATMENT: "border-zinc-700 bg-zinc-900/80 text-zinc-300",
  EARLY_BUILD: "border-violet-500/25 bg-violet-500/10 text-violet-200",
};

function OrganicMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 360 180" className={`h-full w-full ${className}`} aria-hidden="true">
      <path d="M32 130 C78 38 135 155 181 67 C225 -16 277 139 330 46" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M55 146 C96 70 134 172 198 91 C246 31 289 136 321 82" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 10" opacity="0.55" />
      <circle cx="83" cy="86" r="13" fill="currentColor" opacity="0.7" />
      <circle cx="183" cy="67" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="278" cy="99" r="10" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function BracketMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 360 180" className={`h-full w-full ${className}`} aria-hidden="true">
      <path d="M45 34 H130 V69 H188 V91 H246 V127 H320" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M45 70 H130 V91" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.55" />
      <path d="M45 120 H188 V91" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.55" />
      {[45, 130, 188, 246, 320].map((x, index) => (
        <circle key={x} cx={x} cy={[34, 69, 91, 127, 127][index]} r="8" fill="currentColor" />
      ))}
    </svg>
  );
}

function CrownMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 360 180" className={`h-full w-full ${className}`} aria-hidden="true">
      <path d="M58 129 L88 49 L143 100 L180 30 L217 100 L272 49 L302 129 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M86 128 C110 104 131 140 157 111 C178 87 199 139 228 108 C251 84 270 119 294 101" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 7" opacity="0.6" />
      <circle cx="180" cy="87" r="22" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function FluffMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 360 180" className={`h-full w-full ${className}`} aria-hidden="true">
      <circle cx="180" cy="91" r="46" fill="currentColor" opacity="0.16" />
      <circle cx="138" cy="80" r="22" fill="currentColor" opacity="0.2" />
      <circle cx="223" cy="80" r="22" fill="currentColor" opacity="0.2" />
      <path d="M126 113 C145 145 215 145 235 113" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M77 62 L87 80 L106 85 L88 95 L84 115 L72 98 L52 101 L66 86 Z" fill="currentColor" opacity="0.55" />
      <path d="M290 42 L297 57 L313 62 L299 70 L296 87 L286 73 L269 76 L280 63 Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function FormationMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 360 180" className={`h-full w-full ${className}`} aria-hidden="true">
      <path d="M74 125 L126 54 L181 111 L233 48 L291 125" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
      {[
        [74, 125],
        [126, 54],
        [181, 111],
        [233, 48],
        [291, 125],
      ].map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={index === 2 ? 19 : 12} fill="currentColor" opacity={index === 2 ? 0.32 : 0.18} />
          <circle cx={x} cy={y} r={index === 2 ? 8 : 5} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

function ArbiterMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 360 180" className={`h-full w-full ${className}`} aria-hidden="true">
      <path d="M180 22 V158" stroke="currentColor" strokeWidth="2" strokeDasharray="5 8" opacity="0.55" />
      <path d="M42 52 H145 L171 89 L145 126 H42" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M318 52 H215 L189 89 L215 126 H318" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.65" />
      <circle cx="180" cy="89" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M171 89 L178 96 L191 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VisualMark({ style, className }: { style: ProjectVisualStyle; className: string }) {
  switch (style) {
    case "wild-fable":
      return <OrganicMark className={className} />;
    case "necro-sport":
      return <BracketMark className={className} />;
    case "crown-biology":
      return <CrownMark className={className} />;
    case "all-ages-mythic":
      return <FluffMark className={className} />;
    case "cosmic-slate":
      return <FormationMark className={className} />;
    case "arbiter-card":
      return <ArbiterMark className={className} />;
  }
}

function ProjectVisualPlate({ project }: { project: Project }) {
  const visual = project.publicVisual;
  const theme = styleTheme[visual.style];
  const Icon = theme.icon;

  return (
    <div className={`relative isolate min-h-64 overflow-hidden rounded-xl border bg-[#08080b] ${theme.border} ${theme.glow}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.wash}`} />
      <div className="absolute inset-0 bg-grid-ambient opacity-35" />
      <div className="absolute -right-14 -top-12 h-44 w-44 rounded-full border border-white/5" />
      <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full border border-white/5" />

      <div className="relative z-10 flex min-h-64 flex-col justify-between p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className={`inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${theme.text}`}>
            <Icon size={14} />
            {theme.eyebrow}
          </div>
          <span className={`rounded border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] ${mediaTone[visual.mediaState]}`}>
            {visual.mediaLabel}
          </span>
        </div>

        <div className="relative my-2 h-28 overflow-hidden rounded-lg border border-white/5 bg-black/25">
          <VisualMark style={visual.style} className={theme.text} />
        </div>

        <div>
          <h4 className="font-display text-xl font-black tracking-tight text-white">{visual.heading}</h4>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-400">{visual.note}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {visual.facets.map((facet) => (
              <span key={facet} className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-300">
                {facet}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article id={`project-card-${project.id}`} className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[linear-gradient(145deg,rgba(24,24,27,0.82),rgba(9,9,11,0.96))] p-4 shadow-2xl transition-transform duration-300 hover:-translate-y-1 sm:p-6">
      <ProjectVisualPlate project={project} />

      <div className="flex flex-1 flex-col pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-black tracking-tight text-white">{project.title}</h3>
            {project.tone && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">{project.tone}</p>}
          </div>
          <span className="w-fit rounded border border-zinc-700 bg-zinc-950 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-300">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-zinc-300">{project.description}</p>

        {project.expandedDetails && (
          <div className="mt-5 rounded-lg border border-white/6 bg-black/20 p-4">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              <Activity size={12} />
              Current public truth
            </div>
            <p className="mt-2 text-xs leading-6 text-zinc-400">{project.expandedDetails}</p>
          </div>
        )}

        {project.systemsUnderTheHood && project.systemsUnderTheHood.length > 0 && (
          <div className="mt-5 border-t border-white/6 pt-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-500">Selected systems</p>
            <ul className="mt-3 grid gap-2 text-xs leading-5 text-zinc-400 sm:grid-cols-2">
              {project.systemsUnderTheHood.map((system) => (
                <li key={system} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                  <span>{system}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5 border-t border-white/6 pt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded border border-zinc-800 bg-zinc-950/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-500">
                {tag}
              </span>
            ))}
          </div>

          {project.demoUrl && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded bg-zinc-100 px-4 py-3 font-mono text-[10px] font-black uppercase tracking-[0.13em] text-zinc-950 transition-transform hover:scale-[1.02]">
                {project.demoLabel ?? "Open public build"}
                <ExternalLink size={13} />
              </a>
              <a href="https://forms.gle/ZHcmhicFxrvuY1hQ9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white">
                Leave feedback
                <ArrowUpRight size={13} />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
