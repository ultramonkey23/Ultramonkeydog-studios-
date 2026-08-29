/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2, Swords } from "lucide-react";

import bundleJson from "../data/box-o-battles/public-bundle.v0.1.json";

/**
 * Box o' Battles, operable.
 *
 * The site used to hold one hand-copied BOB #003 packet — you could look at a
 * single verdict and nothing else. Then it held an archive, which is still a
 * museum: interesting to read, impossible to use.
 *
 * This picks two fighters and asks the owner to resolve them. The engine stays
 * in the Box repository; this sends a choice and renders what comes back. It
 * deliberately does NOT reimplement the Math Spine in the browser — a second
 * evaluator is exactly what docs/PUBLIC_TRUTH_ORDER.md was written to prevent,
 * and a consumer that calculated its own verdict would be lying about who
 * computed it.
 *
 * With no reachable owner endpoint the picker says so plainly and falls back to
 * the published archive, rather than pretending to compute.
 */

const ARBITER_ENDPOINT = (import.meta.env?.VITE_BOX_API ?? "").replace(/\/$/, "");

type RosterEntry = {
  dossier_key?: string;
  character_id: string;
  display_name: string;
  version_id: string;
  research_state: string;
  evidence_count: number;
  mechanism_count?: number;
  defense_count: number;
  vulnerability_count: number;
  mechanisms?: { display_name: string; effect_tags?: string[] }[];
};

type Step = { step: string; support_state: string; likelihood: number; effective_strength: number };
type Route = {
  route_id: string;
  combatant_id: string;
  dependency_group: string;
  defeat_condition: string;
  gate_state: string;
  conversion_score: number;
  evidence_confidence: number;
  steps: Step[];
};

type Verdict = {
  status: string;
  request_id: string;
  winner: string;
  margin: string;
  confidence: number;
  route_share: Record<string, number>;
  routes: Route[];
  trials: number;
  proof_ceiling: string;
};

type Battle = {
  battle_id: string;
  winner: string;
  margin: string;
  verdict_banner: string;
  ruling: string;
  hinge: string;
  scenario: string;
  verdict_confidence_1000: number;
  route_share: Record<string, number> | null;
  proof_ceiling: string;
};

type Replay = {
  benchmark_id: string;
  winner: string;
  margin: string;
  confidence: number;
  legacy_winner: string | null;
  legacy_margin: string | null;
  winner_changed: boolean;
  margin_changed: boolean;
};

type Bundle = {
  schema_version: string;
  generated_at: string;
  owner_commit: string;
  bundle_sha256: string;
  counts: { battles: number; roster: number; replays: number; contracts: number };
  battles: Battle[];
  roster: RosterEntry[];
  replays: { trials?: number; results?: Replay[]; drifted?: number };
};

const bundle = bundleJson as unknown as Bundle;

/** Fallback keys for the offline state: the bundle roster has no dossier_key. */
const OFFLINE_KEY = (entry: RosterEntry) =>
  entry.dossier_key ?? entry.character_id.toLowerCase().replaceAll("-", "_");

const MARGIN_TONE: Record<string, string> = {
  decisive: "text-red-300",
  clear: "text-amber-300",
  narrow: "text-blue-300",
  coin_flip: "text-zinc-300",
};

function Picker({
  label,
  roster,
  value,
  exclude,
  onChange,
}: {
  label: string;
  roster: RosterEntry[];
  value: string;
  exclude: string;
  onChange: (key: string) => void;
}) {
  const chosen = roster.find((entry) => OFFLINE_KEY(entry) === value);
  return (
    <div className="flex-1 rounded-xl border border-white/10 bg-black/35 p-4">
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="mt-3 w-full rounded border border-white/15 bg-zinc-950 px-3 py-2 font-display text-lg font-black uppercase text-white outline-none focus:border-amber-400/60"
      >
        {roster.map((entry) => (
          <option key={OFFLINE_KEY(entry)} value={OFFLINE_KEY(entry)} disabled={OFFLINE_KEY(entry) === exclude}>
            {entry.display_name}
          </option>
        ))}
      </select>
      {chosen && (
        <>
          <p className="mt-2 break-all font-mono text-[9px] uppercase tracking-[0.05em] text-zinc-600">
            {chosen.version_id}
          </p>
          <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] text-zinc-400">
            <span>
              <b className="text-teal-300">{chosen.evidence_count}</b> evidence
            </span>
            <span>
              {/* The bundle carries a count; the live roster carries the list itself. */}
              <b className="text-amber-300">{chosen.mechanism_count ?? chosen.mechanisms?.length ?? 0}</b> mechanisms
            </span>
            <span>
              <b className="text-red-300">{chosen.vulnerability_count}</b> weaknesses
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function ShareBar({ share }: { share: Record<string, number> }) {
  const entries = Object.entries(share).filter(([, value]) => typeof value === "number");
  if (entries.length < 2) return null;
  const [[leftName, leftValue], [rightName, rightValue]] = entries;
  return (
    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
        <span className="text-red-200">
          {leftName} · {leftValue.toFixed(1)}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-500">
          Route share — not win probability
        </span>
        <span className="text-amber-200">
          {rightValue.toFixed(1)} · {rightName}
        </span>
      </div>
      <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-zinc-900">
        <div className="bg-red-500/75" style={{ width: `${leftValue}%` }} />
        <div className="bg-amber-500/75" style={{ width: `${rightValue}%` }} />
      </div>
    </section>
  );
}

function RouteCard({ route }: { route: Route }) {
  const open = route.gate_state === "OPEN";
  return (
    <article className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.1em] text-zinc-500">
          {route.combatant_id} · {route.dependency_group}
        </p>
        <span
          className={`rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase ${
            open
              ? "border-teal-400/35 bg-teal-400/10 text-teal-200"
              : "border-red-400/35 bg-red-400/10 text-red-200"
          }`}
        >
          {route.gate_state}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{route.defeat_condition}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {route.steps.map((step) => (
          <span
            key={step.step}
            title={`${step.support_state} · likelihood ${(step.likelihood * 100).toFixed(0)}%`}
            className="rounded border border-white/10 bg-zinc-950 px-2 py-1 font-mono text-[9px] uppercase text-zinc-400"
          >
            {step.step} {(step.effective_strength * 100).toFixed(0)}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function BoxArena() {
  const offlineRoster = useMemo(
    () => [...bundle.roster].sort((a, b) => a.display_name.localeCompare(b.display_name)),
    [],
  );
  const [roster, setRoster] = useState<RosterEntry[]>(offlineRoster);
  const [online, setOnline] = useState<boolean | null>(ARBITER_ENDPOINT ? null : false);
  const [a, setA] = useState("frieren");
  const [b, setB] = useState("sauron");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ARBITER_ENDPOINT) return;
    let cancelled = false;
    fetch(`${ARBITER_ENDPOINT}/api/roster`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data) => {
        if (cancelled) return;
        setRoster(data.roster);
        setOnline(true);
      })
      .catch(() => {
        if (!cancelled) setOnline(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const arbitrate = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`${ARBITER_ENDPOINT}/api/matchup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, trials: 2000 }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
      setVerdict(data);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "the arbiter could not be reached");
      setVerdict(null);
    } finally {
      setBusy(false);
    }
  }, [a, b]);

  const replays = bundle.replays.results ?? [];
  const drifted = bundle.replays.drifted ?? 0;

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-amber-500/25 bg-[#070708] p-4 shadow-[0_0_80px_rgba(245,158,11,0.07)] sm:p-6">
      <header className="border-b border-white/10 pb-5">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-300">
          Box o&rsquo; Battles &middot; the Arbiter
        </p>
        <h3 className="mt-1 font-display text-2xl font-black uppercase text-white sm:text-3xl">
          Pick two. Settle it properly.
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
          {bundle.counts.roster} version-locked fighters, {(bundle.counts.roster * (bundle.counts.roster - 1)) / 2}{" "}
          possible matchups. Every fighter&rsquo;s abilities were recorded without knowing who they&rsquo;d face, so the
          engine has to actually work out whether one can reach the other — not compare two power levels.
        </p>
      </header>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <Picker label="Combatant A" roster={roster} value={a} exclude={b} onChange={setA} />
        <div className="flex items-center justify-center lg:px-2">
          <Swords className="text-amber-400" size={26} />
        </div>
        <Picker label="Combatant B" roster={roster} value={b} exclude={a} onChange={setB} />
      </div>

      {online === false ? (
        <section className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-300" />
            <div>
              <p className="font-display text-base font-black text-white">The Arbiter is not connected</p>
              <p className="mt-2 text-xs leading-6 text-zinc-400">
                Resolving a new matchup runs in the Box o&rsquo; Battles engine, which is not reachable from this
                deployment yet. This page will not fake a verdict in the browser — a consumer that computed its own
                result would be lying about who calculated it. Published verdicts and engine replays are below.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={arbitrate}
            disabled={busy || a === b}
            className="inline-flex items-center gap-2 rounded bg-amber-400 px-5 py-3 font-display text-sm font-black uppercase tracking-[0.06em] text-black transition-opacity disabled:opacity-40"
          >
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Swords size={15} />}
            {busy ? "Arbitrating…" : "Arbitrate"}
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500">
            2,000 seeded trials · resolved by the owner engine
          </span>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded border border-red-400/30 bg-red-400/5 px-3 py-2 font-mono text-[11px] text-red-200">
          {error}
        </p>
      )}

      {verdict && (
        <div className="mt-5 space-y-4">
          <section className="rounded-xl border border-amber-400/25 bg-[linear-gradient(135deg,rgba(120,53,15,0.18),rgba(0,0,0,0.62))] p-5 sm:p-6">
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-amber-300">
              Compiled candidate — not a reviewed verdict
            </p>
            <h4 className="mt-3 font-display text-3xl font-black uppercase text-white sm:text-5xl">{verdict.winner}</h4>
            <p
              className={`mt-1 font-display text-xl font-black uppercase ${MARGIN_TONE[verdict.margin] ?? "text-amber-300"}`}
            >
              {verdict.margin.replaceAll("_", " ")} · {(verdict.confidence * 100).toFixed(1)}% confidence
            </p>
            <p className="mt-4 max-w-4xl text-xs leading-6 text-zinc-400">{verdict.proof_ceiling}</p>
          </section>

          {verdict.route_share && <ShareBar share={verdict.route_share} />}

          <section>
            <h4 className="mb-3 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Paths to victory · {verdict.routes.length} evaluated
            </h4>
            <div className="grid gap-3 lg:grid-cols-2">
              {verdict.routes
                .slice()
                .sort((left, right) => right.conversion_score - left.conversion_score)
                .map((route) => (
                  <RouteCard key={route.route_id} route={route} />
                ))}
            </div>
          </section>
        </div>
      )}

      <section className="mt-8 border-t border-white/10 pt-6">
        <h4 className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500">
          Reviewed verdicts · {bundle.counts.battles} published
        </h4>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {bundle.battles.map((battle) => (
            <article key={battle.battle_id} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.1em] text-amber-300">
                {battle.verdict_banner}
              </p>
              <h5 className="mt-2 font-display text-xl font-black uppercase text-white">{battle.winner}</h5>
              <p className="font-mono text-[10px] uppercase text-zinc-500">
                {battle.margin.replaceAll("_", " ")} · {(battle.verdict_confidence_1000 / 10).toFixed(1)}%
              </p>
              <p className="mt-3 text-xs leading-6 text-zinc-400">{battle.hinge}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h4 className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500">
          Engine replays · {drifted} of {replays.length} recorded verdicts no longer reproduce
        </h4>
        <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="bg-black/40 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
                <th className="px-3 py-3">Matchup</th>
                <th className="px-3 py-3">Current engine</th>
                <th className="px-3 py-3">Recorded</th>
                <th className="px-3 py-3">Agreement</th>
              </tr>
            </thead>
            <tbody>
              {replays.map((replay) => (
                <tr key={replay.benchmark_id} className="border-t border-white/8">
                  <td className="px-3 py-3 font-mono text-[11px] text-zinc-400">
                    {replay.benchmark_id.replace("DOSSIER-", "").replace("OPEN-", "")}
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-bold text-white">{replay.winner}</span>{" "}
                    <span className="font-mono text-[10px] uppercase text-zinc-500">
                      {replay.margin.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {replay.legacy_winner ? (
                      <span className={replay.winner_changed ? "font-bold text-red-300" : "text-zinc-400"}>
                        {replay.legacy_winner}{" "}
                        <span className="font-mono text-[10px] uppercase text-zinc-600">
                          {replay.legacy_margin?.replaceAll("_", " ")}
                        </span>
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase text-zinc-600">open pair</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded border px-2 py-1 font-mono text-[9px] font-bold uppercase ${
                        replay.winner_changed
                          ? "border-red-400/35 bg-red-400/10 text-red-200"
                          : replay.margin_changed
                            ? "border-amber-400/35 bg-amber-400/10 text-amber-200"
                            : "border-teal-400/30 bg-teal-400/10 text-teal-200"
                      }`}
                    >
                      {replay.winner_changed ? "winner flips" : replay.margin_changed ? "margin moves" : "holds"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-6 border-t border-white/10 pt-4 font-mono text-[9px] leading-5 uppercase tracking-[0.08em] text-zinc-600">
        Owner {bundle.owner_commit.slice(0, 7)} · bundle {bundle.bundle_sha256.slice(0, 12)} · generated{" "}
        {bundle.generated_at}
        <br />
        Every number here is computed in the Box o&rsquo; Battles repository. This page presents; it does not calculate.
        No verdict is calibrated.
      </footer>
    </div>
  );
}
