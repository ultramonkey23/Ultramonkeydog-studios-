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

const statePresentation: Record<
  StudioSignalState,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  PLAYABLE: {
    label: "Playable",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    icon: CircleDot,
  },
  TESTED: {
    label: "Tested",
    className: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    icon: FlaskConical,
  },
  INTEGRATED: {
    label: "Integrated",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    icon: Link2,
  },
  WITNESSED_OPERATIONALLY: {
    label: "Witnessed operationally",
    className: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    icon: CheckCircle2,
  },
  CAPTURE_REQUIRED: {
    label: "Capture required",
    className: "border-zinc-600 bg-zinc-900 text-zinc-300",
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

function SignalAction({ signal }: { signal: StudioSignal }) {
  if (signal.sourceUrl) {
    return (
      <a
        href={signal.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:text-white"
      >
        {signal.sourceLabel}
        <ExternalLink size={12} />
      </a>
    );
  }

  if (signal.action?.kind === "section") {
    return (
      <button
        type="button"
        onClick={() =>
          document
            .getElementById(signal.action!.target)
            ?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:text-white"
      >
        {signal.action.label}
        <ArrowUpRight size={12} />
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
      {signal.sourceLabel}
    </span>
  );
}

export default function StudioSignals() {
  return (
    <section aria-labelledby="studio-signals-heading" className="mb-12">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Owned web · verified work
          </p>
          <h4
            id="studio-signals-heading"
            className="mt-2 font-display text-2xl font-black tracking-tight text-white sm:text-3xl"
          >
            Current studio signals
          </h4>
          <p className="mt-3 text-xs leading-6 text-zinc-400 sm:text-sm">
            Each signal names its surviving owner, evidence state, source, and proof
            ceiling. Progress is not promoted by novelty alone.
          </p>
        </div>
        <p className="max-w-sm font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-zinc-600">
          Quig outreach remains dry-run and human-approved until a public voice packet
          and channel gate are explicitly accepted.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {STUDIO_SIGNALS.map((signal) => {
          const state = statePresentation[signal.state];
          const StateIcon = state.icon;

          return (
            <article
              key={signal.id}
              className="relative overflow-hidden rounded-xl border border-white/8 bg-[linear-gradient(145deg,rgba(24,24,27,0.72),rgba(5,5,7,0.96))] p-5 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                  {signal.project} · {formatDate(signal.date)}
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] ${state.className}`}
                >
                  <StateIcon size={11} />
                  {state.label}
                </span>
              </div>

              <h5 className="mt-4 font-display text-lg font-black leading-tight text-white">
                {signal.title}
              </h5>
              <p className="mt-3 text-xs leading-6 text-zinc-400">{signal.summary}</p>

              <div className="mt-5 border-t border-white/7 pt-4">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                  Proof ceiling
                </p>
                <p className="mt-1.5 text-[11px] leading-5 text-zinc-500">
                  {signal.proofCeiling}
                </p>
                <div className="mt-3">
                  <SignalAction signal={signal} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
