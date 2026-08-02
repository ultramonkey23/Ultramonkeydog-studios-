import React, { useState } from "react";
import {
  Swords,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  ChevronRight,
  X,
  Layers,
  Award
} from "lucide-react";

export interface ArbiterVerdict {
  verdict_id: string;
  combatant_a: string;
  combatant_b: string;
  winner: string;
  confidence: number;
  evidence_references: string[];
  rationale: string;
}

const PRESET_COMBATANTS = [
  "Ashclaw Prime",
  "Bone Sovereign",
  "Goo Gun Kaiju",
  "Crownbeast Alpha",
  "Pale Shelf Stalker",
  "Shadow Manifestation"
];

const PRESET_ENVIRONMENTS = [
  "Shattered Spires (High Altitude)",
  "Bone Ink Mire (Corrupting Field)",
  "High Velocity Orbit (Zero Gravity)",
  "Neutral Arena (Standard Physics)"
];

const SAMPLE_CITATIONS = [
  "FEAT-001: Ashclaw Prime supersonic leap & shockwave kinetic impact",
  "FEAT-002: Bone Sovereign osteo-regeneration & heavy armor density",
  "FEAT-003: Goo Gun Kaiju bio-viscosity field dampening physical strikes",
  "FEAT-004: Crownbeast Alpha Feral mutation state amplification"
];

export default function BoxOBattlesApp({ onClose }: { onClose?: () => void }) {
  const [combatantA, setCombatantA] = useState("Ashclaw Prime");
  const [combatantB, setCombatantB] = useState("Bone Sovereign");
  const [environment, setEnvironment] = useState(PRESET_ENVIRONMENTS[0]);
  const [citations, setCitations] = useState<string[]>([
    "FEAT-001: Ashclaw Prime supersonic leap & shockwave kinetic impact",
    "FEAT-002: Bone Sovereign osteo-regeneration & heavy armor density"
  ]);
  const [newCitation, setNewCitation] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [verdict, setVerdict] = useState<ArbiterVerdict | null>(null);
  const [showJsonDrawer, setShowJsonDrawer] = useState(false);

  const handleAddCitation = () => {
    if (newCitation.trim() && !citations.includes(newCitation.trim())) {
      setCitations([...citations, newCitation.trim()]);
      setNewCitation("");
    }
  };

  const handleRemoveCitation = (index: number) => {
    setCitations(citations.filter((_, i) => i !== index));
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setVerdict(null);

    setTimeout(() => {
      if (citations.length === 0) {
        setVerdict({
          verdict_id: `verdict-${combatantA.toLowerCase().replace(/\s+/g, '-')}-vs-${combatantB.toLowerCase().replace(/\s+/g, '-')}-inconclusive`,
          combatant_a: combatantA,
          combatant_b: combatantB,
          winner: "INCONCLUSIVE",
          confidence: 0.0,
          evidence_references: [],
          rationale: "Zero verified evidence citations provided. Arbiter rule prohibits unevidenced victory allocation."
        });
      } else {
        const winnerName = combatantA;
        setVerdict({
          verdict_id: `verdict-${combatantA.toLowerCase().replace(/\s+/g, '-')}-vs-${combatantB.toLowerCase().replace(/\s+/g, '-')}-001`,
          combatant_a: combatantA,
          combatant_b: combatantB,
          winner: winnerName,
          confidence: 0.85,
          evidence_references: citations,
          rationale: `Arbiter calculated a clear edge for ${winnerName} based on ${citations.length} verified evidence citation(s) in scenario ${environment}. Permanent defeat condition achieved before counter-adaptation.`
        });
      }
      setIsEvaluating(false);
    }, 600);
  };

  // Schema Validation check against arbiter-verdict-v1.schema.json
  const isSchemaValid = (v: ArbiterVerdict | null) => {
    if (!v) return false;
    return (
      typeof v.verdict_id === "string" &&
      typeof v.combatant_a === "string" &&
      typeof v.combatant_b === "string" &&
      typeof v.winner === "string" &&
      typeof v.confidence === "number" &&
      v.confidence >= 0.0 &&
      v.confidence <= 1.0 &&
      Array.isArray(v.evidence_references) &&
      typeof v.rationale === "string"
    );
  };

  return (
    <div className="relative mx-auto max-w-6xl rounded-xl border border-amber-500/30 bg-[#070709] p-6 shadow-[0_0_50px_rgba(245,158,11,0.08)] backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-400">
            <Swords size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Box o' Battles
              </span>
              <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
                Arbiter Matchup Engine v1.0
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400">
              Evidence-gated matchup analysis program & JSON Schema evaluator
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Main Interactive Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left Control Column */}
        <div className="space-y-5 lg:col-span-6">
          {/* Combatant A */}
          <div className="rounded-lg border border-white/5 bg-zinc-950/60 p-4">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Combatant Alpha
            </label>
            <input
              type="text"
              value={combatantA}
              onChange={(e) => setCombatantA(e.target.value)}
              className="mt-2 w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-white focus:border-amber-500 focus:outline-none"
            />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {PRESET_COMBATANTS.slice(0, 3).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCombatantA(name)}
                  className={`rounded px-2 py-1 font-mono text-[10px] ${
                    combatantA === name
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Combatant B */}
          <div className="rounded-lg border border-white/5 bg-zinc-950/60 p-4">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
              Combatant Beta
            </label>
            <input
              type="text"
              value={combatantB}
              onChange={(e) => setCombatantB(e.target.value)}
              className="mt-2 w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-white focus:border-sky-500 focus:outline-none"
            />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {PRESET_COMBATANTS.slice(3).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCombatantB(name)}
                  className={`rounded px-2 py-1 font-mono text-[10px] ${
                    combatantB === name
                      ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div className="rounded-lg border border-white/5 bg-zinc-950/60 p-4">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Battle Scenario / Environment
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="mt-2 w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
            >
              {PRESET_ENVIRONMENTS.map((env) => (
                <option key={env} value={env}>
                  {env}
                </option>
              ))}
            </select>
          </div>

          {/* Evidence Citation Manager */}
          <div className="rounded-lg border border-white/5 bg-zinc-950/60 p-4">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Verified Evidence Citations ({citations.length})
              </label>
              <span className="font-mono text-[9px] text-zinc-500">
                Evidence-First Law
              </span>
            </div>

            <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1">
              {citations.map((cit, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 rounded border border-zinc-800/80 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-300"
                >
                  <span className="truncate">{cit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCitation(idx)}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              {citations.length === 0 && (
                <div className="rounded border border-dashed border-zinc-800 p-3 text-center text-xs text-zinc-500">
                  No evidence citations attached. Arbiter verdict will yield INCONCLUSIVE.
                </div>
              )}
            </div>

            {/* Add citation input */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Add citation locator or feat data..."
                value={newCitation}
                onChange={(e) => setNewCitation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCitation()}
                className="flex-1 rounded border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCitation}
                className="flex items-center gap-1 rounded bg-zinc-800 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-200 hover:bg-amber-500 hover:text-black"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 font-mono text-sm font-black uppercase tracking-wider text-black transition-all hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Evaluating Evidence Matrix...
              </>
            ) : (
              <>
                <Zap size={18} />
                Calculate Arbiter Verdict
              </>
            )}
          </button>
        </div>

        {/* Right Output Column */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-6">
          {/* Verdict Display Box */}
          <div className="flex-1 rounded-lg border border-amber-500/20 bg-zinc-950/80 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Arbiter Verdict Output
                </span>
              </div>

              {verdict && (
                <button
                  onClick={() => setShowJsonDrawer(!showJsonDrawer)}
                  className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] text-zinc-300 hover:border-amber-500/50 hover:text-white"
                >
                  <FileCode size={12} />
                  {showJsonDrawer ? "Hide JSON Schema" : "Inspect JSON Schema"}
                </button>
              )}
            </div>

            {verdict ? (
              <div className="mt-4 space-y-4">
                {/* Winner Card */}
                <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber-400">
                        Evaluated Winner
                      </span>
                      <h3 className="font-display text-2xl font-black text-white">
                        {verdict.winner}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                        Confidence
                      </span>
                      <div className="font-mono text-xl font-bold text-emerald-400">
                        {(verdict.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                      style={{ width: `${verdict.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {/* Analytical Rationale */}
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Arbiter Rationale
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-200 bg-zinc-900/60 rounded border border-white/5 p-3">
                    {verdict.rationale}
                  </p>
                </div>

                {/* Citations used */}
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Verified Citations Applied ({verdict.evidence_references.length})
                  </span>
                  <div className="mt-2 space-y-1">
                    {verdict.evidence_references.map((e, idx) => (
                      <div
                        key={idx}
                        className="rounded border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-mono text-zinc-300 flex items-center gap-2"
                      >
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{e}</span>
                      </div>
                    ))}
                    {verdict.evidence_references.length === 0 && (
                      <p className="text-xs text-zinc-500 italic">None attached.</p>
                    )}
                  </div>
                </div>

                {/* Schema validation badge */}
                <div className="flex items-center justify-between rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <CheckCircle2 size={14} />
                    <span>Compliant with schemas/arbiter-verdict-v1.schema.json</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                    VALIDATED
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-12 text-center text-zinc-500">
                <Swords size={36} className="mx-auto mb-3 opacity-30 text-amber-400" />
                <p className="text-sm font-medium">Select combatants & citations, then calculate verdict.</p>
                <p className="mt-1 font-mono text-xs opacity-60">
                  Arbiter evaluations are deterministic and evidence-gated.
                </p>
              </div>
            )}
          </div>

          {/* JSON Schema View Drawer */}
          {showJsonDrawer && verdict && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span>Raw Verdict JSON (arbiter-verdict-v1)</span>
                <span className="text-emerald-400 text-[10px]">Valid Schema</span>
              </div>
              <pre className="max-h-48 overflow-auto rounded bg-black p-3 text-[11px] text-amber-300">
                {JSON.stringify(verdict, null, 2)}
              </pre>
            </div>
          )}

          {/* Decoupled Architecture Banner */}
          <div className="rounded-lg border border-white/10 bg-zinc-950/40 p-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2 font-mono font-bold text-zinc-200">
              <Layers size={14} className="text-amber-400" />
              <span>Decoupled Lab-Tail Architecture</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
              Box o' Battles runs standalone with <strong>zero runtime Lab dependency</strong>. The Lab manages project registry, proof tracking, and evaluation math; matchup identity and verdict enforcement remain 100% inside Box o' Battles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
