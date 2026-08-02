import type { CSSProperties, ReactNode } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  FlaskConical,
  ImageOff,
  Link2,
} from "lucide-react";

import {
  STUDIO_SIGNALS,
  StudioSignal,
  StudioSignalState,
} from "../data/studioSignals";
import "../studio-signals.css";

const statePresentation: Record<
  StudioSignalState,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  PLAYABLE: {
    label: "Playable",
    color: "#a1aa49",
    icon: CircleDot,
  },
  TESTED: {
    label: "Tested",
    color: "#72887b",
    icon: FlaskConical,
  },
  INTEGRATED: {
    label: "Integrated",
    color: "#c49a3d",
    icon: Link2,
  },
  WITNESSED_OPERATIONALLY: {
    label: "Witnessed operationally",
    color: "#a63d25",
    icon: CheckCircle2,
  },
  CAPTURE_REQUIRED: {
    label: "Capture required",
    color: "#8d826c",
    icon: ImageOff,
  },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function preferredScrollBehavior(): ScrollBehavior {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function signalActionNodes(signal: StudioSignal): ReactNode[] {
  const nodes: ReactNode[] = [];

  if (signal.sourceUrl) {
    nodes.push(
      <a
        key="source"
        href={signal.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="studio-signal__source"
      >
        {signal.sourceLabel}
        <ExternalLink size={12} />
      </a>,
    );
  }

  if (signal.action?.kind === "section") {
    nodes.push(
      <button
        key="section-action"
        type="button"
        onClick={() =>
          document.getElementById(signal.action!.target)?.scrollIntoView({
            behavior: preferredScrollBehavior(),
            block: "center",
          })
        }
        className="studio-signal__source"
      >
        {signal.action.label}
        <ArrowUpRight size={12} />
      </button>,
    );
  }

  if (signal.action?.kind === "external") {
    nodes.push(
      <a
        key="external-action"
        href={signal.action.target}
        target="_blank"
        rel="noopener noreferrer"
        className="studio-signal__source"
      >
        {signal.action.label}
        <ArrowUpRight size={12} />
      </a>,
    );
  }

  return nodes;
}

function SignalActions({ signal }: { signal: StudioSignal }) {
  const nodes = signalActionNodes(signal);
  if (nodes.length === 0) {
    return <span className="studio-signal__source">{signal.sourceLabel}</span>;
  }

  return <div className="studio-signal__actions">{nodes}</div>;
}

export default function StudioSignals() {
  return (
    <section aria-labelledby="studio-signals-heading" className="studio-signals">
      <div className="studio-signals__header">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--umd-gold)]">
            Owned web · verified work
          </p>
          <h4
            id="studio-signals-heading"
            className="mt-2 font-display text-3xl uppercase leading-none tracking-[0.02em] text-[var(--umd-bone)] sm:text-4xl"
          >
            Current studio signals
          </h4>
          <p className="mt-3 text-xs leading-6 text-[var(--umd-ash)] sm:text-sm">
            Each signal names its surviving owner, evidence state, source, and proof
            ceiling. Progress is not promoted by novelty alone.
          </p>
        </div>
        <p className="studio-signals__quig-boundary">
          Quig outreach remains dry-run and human-approved until a public voice packet
          and channel gate are explicitly accepted.
        </p>
      </div>

      <div className="studio-signals__grid">
        {STUDIO_SIGNALS.map((signal) => {
          const state = statePresentation[signal.state];
          const StateIcon = state.icon;
          const customProperties = {
            "--signal-color": state.color,
          } as CSSProperties;

          return (
            <article key={signal.id} className="studio-signal" style={customProperties}>
              <div className="studio-signal__meta">
                <p className="font-mono text-[9px] font-bold uppercase leading-5 tracking-[0.14em] text-[var(--umd-ash)]">
                  {signal.project}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--umd-line)]">
                  {formatDate(signal.date)}
                </p>
                <span className="studio-signal__state mt-4">
                  <StateIcon size={11} />
                  {state.label}
                </span>
              </div>

              <div>
                <h5 className="font-display text-xl uppercase leading-none tracking-[0.02em] text-[var(--umd-bone)] sm:text-2xl">
                  {signal.title}
                </h5>
                <p className="mt-3 text-xs leading-6 text-[var(--umd-ash)]">
                  {signal.summary}
                </p>

                <div className="studio-signal__proof">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--signal-color)]">
                    Proof ceiling
                  </p>
                  <p className="mt-1.5 text-[11px] leading-5 text-[var(--umd-ash)]">
                    {signal.proofCeiling}
                  </p>
                  <SignalActions signal={signal} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
