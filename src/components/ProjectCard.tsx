/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CSSProperties } from "react";
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
import ProceduralField from "./ProceduralField";
import "../project-material.css";

interface ProjectCardProps {
  project: Project;
}

const styleTheme: Record<
  ProjectVisualStyle,
  {
    accent: string;
    signal: string;
    structure: string;
    icon: typeof Gamepad2;
  }
> = {
  "what-we-fed": {
    accent: "#8f3826",
    signal: "#b2b94e",
    structure: "#d1c69f",
    icon: Layers3,
  },
  "bone-league": {
    accent: "#8f2f24",
    signal: "#a68d4d",
    structure: "#d5c9ac",
    icon: Trophy,
  },
  "savage-crown": {
    accent: "#b6341f",
    signal: "#d2a43b",
    structure: "#d1b97e",
    icon: Crown,
  },
  "saga-anxious-fluff": {
    accent: "#c46354",
    signal: "#7ca77f",
    structure: "#e1cfac",
    icon: Sparkles,
  },
  "feral-formation": {
    accent: "#76526f",
    signal: "#a4a94b",
    structure: "#c6c3a1",
    icon: Layers3,
  },
  "box-o-battles": {
    accent: "#a32f24",
    signal: "#c09a42",
    structure: "#d8caa7",
    icon: Scale,
  },
};

const mediaTone: Record<PublicMediaState, string> = {
  PLAYABLE_DEMO: "project-card__status--playable",
  NATIVE_BUILD: "project-card__status--native",
  READ_ONLY_PACKET: "project-card__status--packet",
  EARLY_BUILD: "project-card__status--early",
  CAPTURE_REQUIRED: "project-card__status--capture",
};

const evidenceTone: Record<VisualEvidenceState, string> = {
  PROMOTED_RUNTIME_ENVIRONMENT: "project-card__evidence-state--promoted",
  WIRED_RUNTIME_CANDIDATE_DEVICE_PARTIAL: "project-card__evidence-state--partial",
  ACCEPTED_REFERENCE: "project-card__evidence-state--reference",
  CAPTURE_REQUIRED: "project-card__evidence-state--capture",
};

function EvidenceCard({ item }: { item: PublicVisualEvidence }) {
  const hasImage = Boolean(item.src && item.alt);

  return (
    <article className="project-card__evidence">
      {hasImage ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="project-card__evidence-media group/evidence block overflow-hidden"
          aria-label={`Open source for ${item.title}`}
        >
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover transition-transform duration-150 group-hover/evidence:translate-x-1"
          />
        </a>
      ) : (
        <div className="project-card__evidence-empty">
          <FileWarning size={28} aria-hidden="true" />
        </div>
      )}

      <div className="p-4">
        <span className={`project-card__evidence-state ${evidenceTone[item.state]}`}>
          {item.state.replaceAll("_", " ")}
        </span>
        <h5 className="mt-3 font-display text-base uppercase tracking-[0.02em] text-[var(--umd-bone)]">
          {item.title}
        </h5>
        <p className="mt-2 text-xs leading-5 text-[var(--umd-ash)]">{item.note}</p>
        {item.limitation && (
          <p className="mt-3 border-l-2 border-[var(--project-accent)] pl-3 text-[11px] leading-5 text-[var(--umd-bone)]/70">
            {item.limitation}
          </p>
        )}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--umd-ash)] transition-colors hover:text-[var(--project-structure)]"
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
    <>
      <div className="project-card__visual">
        <ProceduralField
          seed={`${project.id}:${visual.heading}`}
          variant={visual.style}
        />
        <div className="project-card__visual-shade" />

        <div className="project-card__visual-content">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="project-card__framing-label">
                <Icon size={13} />
                Studio-generated framing · not project evidence
              </span>
              <p className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--project-structure)]">
                {project.title}
              </p>
            </div>
            <span className={`project-card__status ${mediaTone[visual.mediaState]}`}>
              {visual.mediaLabel}
            </span>
          </div>

          <div className="max-w-2xl">
            <h4 className="font-display text-3xl uppercase leading-[0.92] tracking-[0.01em] text-[var(--project-structure)] sm:text-4xl">
              {visual.heading}
            </h4>
            <div className="project-card__title-line" />
            <p className="mt-4 max-w-xl text-xs leading-6 text-[var(--umd-bone)]/72">
              {visual.note}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {visual.facets.map((facet) => (
                <span key={facet} className="project-card__facet">
                  {facet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {evidence.length > 0 && (
        <div className={`mt-4 grid gap-3 ${evidence.length > 1 ? "md:grid-cols-2" : ""}`}>
          {evidence.map((item) => (
            <EvidenceCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const theme = styleTheme[project.publicVisual.style];
  const customProperties = {
    "--project-accent": theme.accent,
    "--project-signal": theme.signal,
    "--project-structure": theme.structure,
  } as CSSProperties;

  return (
    <article
      id={`project-card-${project.id}`}
      className="project-card p-4 sm:p-5"
      style={customProperties}
    >
      <ProjectVisualPlate project={project} />

      <div className="project-card__body">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-2xl uppercase leading-none tracking-[0.02em] text-[var(--project-structure)]">
              {project.title}
            </h3>
            {project.tone && (
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--umd-ash)]">
                {project.tone}
              </p>
            )}
          </div>
          <span className="project-card__status project-card__status--capture w-fit">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--umd-bone)]/78">
          {project.description}
        </p>

        {project.expandedDetails && (
          <div className="project-card__truth mt-5">
            <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--project-signal)]">
              <Activity size={12} />
              Current public truth
            </div>
            <p className="mt-2 text-xs leading-6 text-[var(--umd-ash)]">
              {project.expandedDetails}
            </p>
          </div>
        )}

        {project.systemsUnderTheHood && project.systemsUnderTheHood.length > 0 && (
          <div className="mt-5 border-t border-[var(--umd-line-soft)] pt-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--project-signal)]">
              Selected systems
            </p>
            <ul className="mt-3 grid gap-2 text-xs leading-5 text-[var(--umd-ash)] sm:grid-cols-2">
              {project.systemsUnderTheHood.map((system) => (
                <li key={system} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--project-accent)]" />
                  <span>{system}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5 border-t border-[var(--umd-line-soft)] pt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="project-card__action mt-5"
            >
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
