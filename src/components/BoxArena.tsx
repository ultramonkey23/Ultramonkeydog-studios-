/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2, Swords } from "lucide-react";

/**
 * Box o' Battles, operable, with no service behind it.
 *
 * The site held one hand-copied packet, then an archive, then a picker that
 * needed a live endpoint. All three were wrong in the same direction: the thing
 * a visitor wants is to choose a fight and get a real answer, and none of them
 * did that on their own.
 *
 * So the owner engine resolves every pairing in every arena ahead of time and
 * ships the results. This component picks and looks up. Nothing is computed in
 * the browser, nothing is fetched from a server at runtime, and nothing is
 * approximated or generated — every number below came out of the same Math
 * Spine that produces the reviewed battle packets, at a pinned commit, from a
 * fixed seed. Rebuild the matrix and you get the same bytes back.
 *
 * That matters beyond honesty: there is no second evaluator to drift, no
 * service to keep alive, no request to fail, and it works offline.
 */

const MATRIX_URL = "/box/matchup-matrix.v0.1.json";

type Step = { step: string; support_state: string; effective_strength: number };
type Route = {
  combatant_id: string;
  dependency_group: string;
  defeat_condition: string;
  gate_state: string;
  gate_reasons: string[];
  conversion_score: number;
  evidence_confidence: number;
  steps: Step[];
};
type Resolved = {
  winner: string;
  margin: string;
  confidence: number;
  route_share: Record<string, number>;
  routes: Route[];
};
type Arena = { arena_id: string; label: string; distance_m: number; blurb: string };
type Fighter = {
  dossier_key: string;
  character_id: string;
  display_name: string;
  version_id: string;
  evidence_count: number;
  mechanism_count: number;
  defense_count: number;
  vulnerability_count: number;
  mechanisms: string[];
};
type Matrix = {
  owner_commit: string;
  seed: number;
  trials: number;
  matrix_sha256: string;
  arenas: Arena[];
  roster: Fighter[];
  counts: { fighters: number; pairings: number; arenas: number; resolved: number };
  how_this_was_made: string;
  proof_ceiling: string;
  matchups: Record<string, Record<string, Resolved>>;
};

const MARGIN_TONE: Record<string, string> = {
  decisive: "text-red-300",
  clear: "text-amber-300",
  narrow: "text-blue-300",
  coin_flip: "text-zinc-300",
};

/** Pairs are stored once, unordered. Normalise before looking one up. */
function pairKey(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function Picker({
  label,
  roster,
  value,
  exclude,
  onChange,
}: {
  label: string;
  roster: Fighter[];
  value: string;
  exclude: string;
  onChange: (key: string) => void;
}) {
  const chosen = roster.find((entry) => entry.dossier_key === value);
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
          <option key={entry.dossier_key} value={entry.dossier_key} disabled={entry.dossier_key === exclude}>
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
              <b className="text-amber-300">{chosen.mechanism_count}</b> mechanisms
            </span>
            <span>
              <b className="text-red-300">{chosen.vulnerability_count}</b> weaknesses
            </span>
          </div>
          {chosen.mechanisms.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {chosen.mechanisms.map((mechanism) => (
                <span
                  key={mechanism}
                  className="rounded border border-white/10 bg-zinc-950 px-2 py-1 font-mono text-[9px] text-zinc-400"
                >
                  {mechanism}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function RouteCard({ route }: { route: Route }) {
  const open = route.gate_state === "OPEN";
  return (
    <article className={`rounded-lg border bg-black/30 p-4 ${open ? "border-white/10" : "border-red-400/20"}`}>
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
      {!open && route.gate_reasons.length > 0 && (
        <p className="mt-2 border-l-2 border-red-400/40 pl-3 text-xs leading-5 text-red-200/80">
          {route.gate_reasons.join(" · ")}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {route.steps.map((step) => {
          const strength = step.effective_strength;
          const tone =
            strength >= 0.6 ? "text-teal-300" : strength >= 0.35 ? "text-amber-300" : "text-red-300";
          return (
            <span
              key={step.step}
              title={`${step.support_state} · effective strength ${(strength * 100).toFixed(0)}%`}
              className="rounded border border-white/10 bg-zinc-950 px-2 py-1 font-mono text-[9px] uppercase text-zinc-500"
            >
              {step.step} <b className={tone}>{(strength * 100).toFixed(0)}</b>
            </span>
          );
        })}
      </div>
    </article>
  );
}

export default function BoxArena() {
  const [matrix, setMatrix] = useState<Matrix | null>(null);
  const [loadError, setLoadError] = useState("");
  const [a, setA] = useState("frieren");
  const [b, setB] = useState("sauron");
  const [arena, setArena] = useState("NEUTRAL_FIELD");

  useEffect(() => {
    let cancelled = false;
    fetch(MATRIX_URL)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: Matrix) => {
        if (!cancelled) setMatrix(data);
      })
      .catch((cause) => {
        if (!cancelled) setLoadError(cause instanceof Error ? cause.message : "could not load the matrix");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const resolved = useMemo(() => {
    if (!matrix) return null;
    return matrix.matchups[pairKey(a, b)]?.[arena] ?? null;
  }, [matrix, a, b, arena]);

  /** Which arenas change this pairing's winner — the interesting part. */
  const arenaWinners = useMemo(() => {
    if (!matrix) return {};
    const entry = matrix.matchups[pairKey(a, b)] ?? {};
    return Object.fromEntries(Object.entries(entry).map(([id, value]) => [id, value.winner]));
  }, [matrix, a, b]);

  const swap = useCallback(() => {
    setA(b);
    setB(a);
  }, [a, b]);

  if (loadError) {
    return (
      <div className="mx-auto max-w-7xl rounded-2xl border border-amber-500/25 bg-[#070708] p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-300" />
          <p className="text-sm text-zinc-400">
            The matchup matrix could not be loaded ({loadError}). Nothing will be shown rather than guessed.
          </p>
        </div>
      </div>
    );
  }

  if (!matrix) {
    return (
      <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border border-amber-500/25 bg-[#070708] p-6 text-sm text-zinc-500">
        <Loader2 size={16} className="animate-spin text-amber-300" /> Loading the Arbiter&rsquo;s record…
      </div>
    );
  }

  const shares = Object.entries(resolved?.route_share ?? {});

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
          {matrix.counts.fighters} version-locked fighters, {matrix.counts.pairings} pairings, {matrix.counts.arenas}{" "}
          arenas — {matrix.counts.resolved} resolved matchups. Every fighter&rsquo;s abilities were recorded without
          knowing who they&rsquo;d face, so the engine has to work out whether one can actually reach the other rather
          than compare two power levels.
        </p>
      </header>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <Picker label="Combatant A" roster={matrix.roster} value={a} exclude={b} onChange={setA} />
        <div className="flex items-center justify-center lg:px-2">
          <button
            type="button"
            onClick={swap}
            aria-label="Swap combatants"
            className="rounded-full border border-white/10 p-3 text-amber-400 transition-colors hover:border-amber-400/50"
          >
            <Swords size={22} />
          </button>
        </div>
        <Picker label="Combatant B" roster={matrix.roster} value={b} exclude={a} onChange={setB} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {matrix.arenas.map((entry) => {
          const active = entry.arena_id === arena;
          const winner = arenaWinners[entry.arena_id];
          return (
            <button
              key={entry.arena_id}
              type="button"
              onClick={() => setArena(entry.arena_id)}
              title={entry.blurb}
              className={`flex-1 rounded border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-amber-400/60 bg-amber-400/10"
                  : "border-white/10 bg-black/30 hover:border-white/25"
              }`}
            >
              <span
                className={`block font-display text-sm font-black uppercase ${active ? "text-amber-200" : "text-zinc-300"}`}
              >
                {entry.label}
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-500">
                {entry.distance_m}m · {winner ?? "—"}
              </span>
            </button>
          );
        })}
      </div>

      {resolved ? (
        <div className="mt-5 space-y-4">
          <section className="rounded-xl border border-amber-400/25 bg-[linear-gradient(135deg,rgba(120,53,15,0.18),rgba(0,0,0,0.62))] p-5 sm:p-6">
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-amber-300">
              Compiled candidate — not a reviewed verdict
            </p>
            <h4 className="mt-3 font-display text-3xl font-black uppercase text-white sm:text-5xl">{resolved.winner}</h4>
            <p
              className={`mt-1 font-display text-xl font-black uppercase ${MARGIN_TONE[resolved.margin] ?? "text-amber-300"}`}
            >
              {resolved.margin.replaceAll("_", " ")} · {(resolved.confidence * 100).toFixed(1)}% confidence
            </p>
          </section>

          {shares.length >= 2 && (
            <section className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                <span className="text-red-200">
                  {shares[0][0]} · {shares[0][1].toFixed(1)}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-500">
                  Route share — not win probability
                </span>
                <span className="text-amber-200">
                  {shares[1][1].toFixed(1)} · {shares[1][0]}
                </span>
              </div>
              <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-zinc-900">
                <div className="bg-red-500/75" style={{ width: `${shares[0][1]}%` }} />
                <div className="bg-amber-500/75" style={{ width: `${shares[1][1]}%` }} />
              </div>
            </section>
          )}

          <section>
            <h4 className="mb-3 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500">
              Paths to victory · {resolved.routes.length} evaluated ·{" "}
              {resolved.routes.filter((route) => route.gate_state === "OPEN").length} open
            </h4>
            <div className="grid gap-3 lg:grid-cols-2">
              {resolved.routes
                .slice()
                .sort((left, right) => right.conversion_score - left.conversion_score)
                .map((route) => (
                  <RouteCard key={`${route.combatant_id}-${route.dependency_group}`} route={route} />
                ))}
            </div>
          </section>
        </div>
      ) : (
        <p className="mt-5 text-sm text-zinc-500">No resolved matchup for that pairing.</p>
      )}

      <footer className="mt-6 border-t border-white/10 pt-4 font-mono text-[9px] leading-5 uppercase tracking-[0.08em] text-zinc-600">
        {matrix.how_this_was_made}
        <br />
        Matrix {matrix.matrix_sha256.slice(0, 12)} · owner {matrix.owner_commit.slice(0, 7)} · {matrix.trials} trials ·
        seed {matrix.seed}
        <br />
        {matrix.proof_ceiling}
      </footer>
    </div>
  );
}
