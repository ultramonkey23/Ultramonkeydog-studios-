/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Activity,
  ArrowUpRight,
  Crown,
  ExternalLink,
  FileWarning,
  Gamepad2,
  Layers3,
  Scale,
  Sparkles,
  Trophy,
} from "lucide-react";

import {
  Project,
  ProjectVisualStyle,
  PublicMediaState,
  PublicVisualEvidence,
  VisualEvidenceState,
} from "../types";

interface ProjectCardProps {
  project: Project;
}

const styleTheme: Record<
  ProjectVisualStyle,
  { border: string; text: string; glow: string; wash: string; icon: typeof Gamepad2 }
> = {
  "what-we-fed": {
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    glow: "shadow-[0_0_60px_rgba(16,185,129,0.10)]",
    wash: "from-emerald-500/15 via-violet-950/10 to-transparent",
    icon: Layers3,
  },
  "bone-league": {
    border: "border-sky-400/30",
    text: "text-sky-300",
    glow: "shadow-[0_0_60px_rgba(14,165,233,0.10)]",
    wash: "from-sky-500/15 via-red-950/10 to-transparent",
    icon: Trophy,
  },
  "savage-crown": {
    border: "border-red-500/30",
    text: "text-red-300",
    glow: "shadow-[0_0_60px_rgba(239,68,68,0.10)]",
    wash: "from-red-500/15 via-amber-950/10 to-transparent",
    icon: Crown,
  },
  "saga-anxious-fluff": {
    border: "border-amber-400/30",
    text: "text-amber-200",
    glow: "shadow-[0_0_60px_rgba(251,191,36,0.10)]",
    wash: "from-amber-400/15 via-orange-950/10 to-transparent",
    icon: Sparkles,
  },
  "feral-formation": {
    border: "border-violet-400/30",
    text: "text-violet-300",
    glow: "shadow-[0_0_60px_rgba(139,92,246,0.10)]",
    wash: "from-violet-500/15 via-indigo-950/10 to-transparent",
    icon: Layers3,
  },
  "box-o-battles": {
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
  EARLY_BUILD: "border-violet-500/25 bg-violet-500/10 text-violet-200",
  CAPTURE_REQUIRED: "border-zinc-700 bg-zinc-900/80 text-zinc-300",
};

const evidenceTone: Record<VisualEvidenceState, string> = {
  PROMOTED_RUNTIME_ENVIRONMENT: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  WIRED_RUNTIME_CANDIDATE_DEVICE_PARTIAL: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  ACCEPTED_REFERENCE: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  CAPTURE_REQUIRED: "border-zinc-700 bg-zinc-900/80 text-zinc-300",
};

function EvidenceCard({ item }: { item: PublicVisualEvidence }) {
  const hasImage = Boolean(item.src && item.alt);

  return (
    <article className="overflow-hidden rounded-lg border border-white/8 bg-black/30">
      {hasImage ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="group/evidence block overflow-hidden border-b border-white/8 bg-black/40"
          aria-label={`Open source for ${item.title}`}
        >
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover/evidence:scale-[1.02]"
          />
        </a>
      ) : (
        <div className="flex min-h-28 items-center justify-center border-b border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_68%)] p-6 text-zinc-500">
          <FileWarning size={30} aria-hidden="true" />
        </div>
      )}

      <div className="p-4">
        <span className={`inline-flex rounded border px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${evidenceTone[item.state]}`}>
          {item.state.replaceAll("_", " ")}
        </span>
        <h5 className="mt-3 font-display text-base font-black text-white">{item.title}</h5>
        <p className="mt-2 text-xs leading-5 text-zinc-400">{item.note}</p>
        {item.limitation && (
          <p className="mt-3 border-l border-amber-500/40 pl-3 text-[11px] leading-5 text-amber-100/70">
            {item.limitation}
          </p>
        )}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-400 transition-colors hover:text-white"
        >
          <ExternalLink size={12} />
          {item.sourceLabel}
        </a>
      </div>
    </article>
  );
}

function ProjectVisualPlate({ project }: { project: Project }) {
  const visual = project.publicVisual;
  const theme = styleTheme[visual.style];
  const Icon = theme.icon;
  const evidence = visual.evidence ?? [];

  return (
    <div className={`relative isolate overflow-hidden rounded-xl border bg-[#08080b] ${theme.border} ${theme.glow}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.wash}`} />
      <div className="absolute inset-0 bg-grid-ambient opacity-20" />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className={`inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${theme.text}`}>
            <Icon size={14} />
            {project.title}
          </div>
          <span className={`rounded border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] ${mediaTone[visual.mediaState]}`}>
            {visual.mediaLabel}
          </span>
        </div>

        <div className="mt-5">
          <h4 className="font-display text-2xl font-black tracking-tight text-white">{visual.heading}</h4>
          <p className="mt-2 max-w-3xl text-xs leading-6 text-zinc-400">{visual.note}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {visual.facets.map((facet) => (
              <span key={facet} className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-300">
                {facet}
              </span>
            ))}
          </div>
        </div>

        {evidence.length > 0 ? (
          <div className={`mt-5 grid gap-3 ${evidence.length > 1 ? "md:grid-cols-2" : ""}`}>
            {evidence.map((item) => <EvidenceCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="mt-5 flex min-h-36 items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/25 p-6 text-center">
            <div>
              <Icon className={`mx-auto ${theme.text}`} size={32} aria-hidden="true" />
              <p className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                No evidence-ranked showcase media attached
              </p>
            </div>
          </div>
        )}
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
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-200 transition-colors hover:bg-amber-500/20">
              <Gamepad2 size={15} />
              {project.demoLabel ?? "Open project"}
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
