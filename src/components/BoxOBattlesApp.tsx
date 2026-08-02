import { useState } from "react";
import { AlertTriangle, BookOpenCheck, GitBranch, Scale, ShieldCheck, Swords } from "lucide-react";

import packetJson from "../data/box-o-battles/bob-0003-arbiter-card-comic-hud-v0.3.json";

type View = "verdict" | "routes" | "evidence";
type SupportState = "Confirmed" | "Plausibly Supported" | "Unsupported" | "Unknown";

type Step = {
  sequence: number;
  step: string;
  likelihood: number;
  support_state: SupportState;
  effective_strength: number;
  evidence_ids: string[];
  basis: string;
};

type Route = {
  combatant: string;
  route_id: string;
  dependency_group: string;
  label: string;
  defeat_condition: string;
  gate_state: string;
  conversion_score: number;
  evidence_confidence: number;
  steps: Step[];
};

type Packet = {
  card: { issue_number: string; title: string; collector_number: string };
  identity_bar: {
    combatant_a: { name: string; version_id: string; version_lock: string };
    combatant_b: { name: string; version_id: string; version_lock: string };
    scenario_lock: string;
  };
  verdict_stage: {
    recommended_winner: string;
    margin: string;
    victory_banner: string;
    balance_blade: { combatant_a_percent: number; combatant_b_percent: number; label: string };
    human_ruling: string;
  };
  hinge_gate: {
    question: string;
    support_state: SupportState;
    impact: string;
    evidence_ids: string[];
  };
  conversion_spines: Route[];
  issue_variants: Array<{
    variant_id: string;
    winner: string;
    margin: string;
    starting_distance_m: number;
  }>;
  card_back: {
    warning_panel: string;
    victory_trap: string;
    anchor_status: string;
    essence_status: string;
    ring_status: string;
  };
  proof_ceiling: string;
};

const packet = packetJson as Packet;

const supportClasses: Record<SupportState, string> = {
  Confirmed: "border-teal-400/35 bg-teal-400/10 text-teal-200",
  "Plausibly Supported": "border-amber-400/35 bg-amber-400/10 text-amber-200",
  Unsupported: "border-red-400/35 bg-red-400/10 text-red-200",
  Unknown: "border-zinc-600 bg-zinc-900 text-zinc-300",
};

const viewLabels: Record<View, string> = {
  verdict: "Verdict",
  routes: "Paths to Victory",
  evidence: "Evidence & Limits",
};

const readable = (value: string) => value.replaceAll("_", " ").toLowerCase();
const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

function VersionLock({ label, combatant }: { label: string; combatant: Packet["identity_bar"]["combatant_a"] }) {
  return (
    <article className="rounded-xl border border-white/10 bg-black/30 p-4">
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <h4 className="mt-2 font-display text-xl font-black uppercase text-white">{combatant.name}</h4>
      <p className="mt-1 font-mono text-[9px] text-amber-200">{combatant.version_id}</p>
      <p className="mt-3 text-xs leading-5 text-zinc-400">{combatant.version_lock}</p>
    </article>
  );
}

function VerdictView() {
  const shareA = packet.verdict_stage.balance_blade.combatant_a_percent;
  const shareB = packet.verdict_stage.balance_blade.combatant_b_percent;

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-amber-400/25 bg-[linear-gradient(135deg,rgba(120,53,15,0.18),rgba(0,0,0,0.62))] p-5 sm:p-6">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-300">Current ruling</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-black uppercase text-white sm:text-5xl">{packet.verdict_stage.recommended_winner}</h3>
            <p className="mt-1 font-display text-xl font-black uppercase text-amber-300">{packet.verdict_stage.margin} · {readable(packet.verdict_stage.victory_banner)}</p>
          </div>
          <Scale className="text-amber-300" size={34} />
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-300">{packet.verdict_stage.human_ruling}</p>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <span className="text-red-200">{packet.identity_bar.combatant_a.name} · {shareA.toFixed(1)}</span>
          <span className="text-zinc-500">Route share, not universal win probability</span>
          <span className="text-amber-200">{shareB.toFixed(1)} · {packet.identity_bar.combatant_b.name}</span>
        </div>
        <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-zinc-900">
          <div className="bg-red-500/75" style={{ width: `${shareA}%` }} />
          <div className="bg-amber-500/75" style={{ width: `${shareB}%` }} />
        </div>
      </section>

      <section className="rounded-xl border border-amber-400/25 bg-amber-400/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-amber-200">The question that can flip the matchup</p>
          <span className={`rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase ${supportClasses[packet.hinge_gate.support_state]}`}>{packet.hinge_gate.support_state}</span>
        </div>
        <p className="mt-3 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{packet.hinge_gate.question}</p>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-center gap-2"><GitBranch size={16} className="text-amber-300" /><strong className="text-sm text-white">Scenario branches</strong></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {packet.issue_variants.map((variant) => (
            <article key={variant.variant_id} className="rounded-lg border border-white/10 bg-zinc-950/70 p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-zinc-500">{variant.starting_distance_m} m start</p>
              <p className="mt-2 text-xs font-bold text-white">{variant.winner}</p>
              <p className="mt-1 text-[10px] uppercase text-amber-200">{readable(variant.margin)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function RoutesView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {packet.conversion_spines.map((route) => (
        <article key={route.route_id} className="rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.12em] text-zinc-500">{route.combatant}</p>
              <h3 className="mt-1 font-display text-xl font-black text-white">{route.label}</h3>
            </div>
            <span className={`rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase ${route.gate_state === "OPEN" ? supportClasses.Confirmed : supportClasses.Unsupported}`}>{route.gate_state}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-zinc-400">{route.defeat_condition}</p>
          <p className="mt-3 font-mono text-[9px] uppercase text-amber-200">Route strength {percent(route.conversion_score)}</p>

          <ol className="mt-4 space-y-2">
            {route.steps.map((step) => (
              <li key={`${route.route_id}-${step.step}`} className="rounded-lg border border-white/8 bg-zinc-950/65 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold capitalize text-white">{step.sequence}. {readable(step.step)}</span>
                  <span className={`rounded border px-2 py-0.5 font-mono text-[8px] font-bold uppercase ${supportClasses[step.support_state]}`}>{step.support_state}</span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-zinc-400">{step.basis}</p>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}

function EvidenceView() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <VersionLock label="Continuity lock A" combatant={packet.identity_bar.combatant_a} />
        <VersionLock label="Continuity lock B" combatant={packet.identity_bar.combatant_b} />
      </div>

      <section className="rounded-xl border border-white/10 bg-black/30 p-5">
        <div className="flex items-center gap-2"><BookOpenCheck size={17} className="text-teal-300" /><h3 className="font-display text-lg font-black text-white">Scenario</h3></div>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{packet.identity_bar.scenario_lock}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {packet.hinge_gate.evidence_ids.map((id) => <span key={id} className="rounded border border-white/10 bg-zinc-950 px-2 py-1 font-mono text-[9px] text-zinc-400">{id}</span>)}
        </div>
      </section>

      <section className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
        <div className="flex items-start gap-3"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-300" /><div><h3 className="font-display text-lg font-black text-white">Victory is not always total destruction</h3><p className="mt-2 text-sm leading-6 text-zinc-300">{packet.card_back.warning_panel}</p><p className="mt-2 text-xs leading-5 text-zinc-500">{packet.card_back.victory_trap}</p></div></div>
      </section>

      <section className="rounded-xl border border-white/10 bg-zinc-950/75 p-4">
        <div className="flex items-start gap-3"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-teal-300" /><p className="text-xs leading-5 text-zinc-400">{packet.proof_ceiling}</p></div>
      </section>
    </div>
  );
}

export default function BoxOBattlesApp() {
  const [view, setView] = useState<View>("verdict");

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-amber-500/25 bg-[#070708] p-4 shadow-[0_0_80px_rgba(245,158,11,0.07)] sm:p-6">
      <header className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/35 bg-amber-500/10 text-amber-300"><Swords size={22} /></div>
          <div>
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-300">{packet.card.issue_number} · Matchup case file</p>
            <h2 className="mt-1 font-display text-xl font-black text-white sm:text-2xl">{packet.card.title}</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(viewLabels) as View[]).map((key) => (
            <button key={key} type="button" onClick={() => setView(key)} className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${view === key ? "border-amber-400/45 bg-amber-400/10 text-amber-200" : "border-white/10 bg-zinc-950 text-zinc-400 hover:text-white"}`}>{viewLabels[key]}</button>
          ))}
        </div>
      </header>

      <div className="mt-5">
        {view === "verdict" && <VerdictView />}
        {view === "routes" && <RoutesView />}
        {view === "evidence" && <EvidenceView />}
      </div>
    </div>
  );
}
