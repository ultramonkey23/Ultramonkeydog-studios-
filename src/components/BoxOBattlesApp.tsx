import {
  AlertTriangle,
  CheckCircle2,
  Database,
  FileCheck2,
  GitBranch,
  Scale,
  ShieldCheck,
  Swords,
  X,
} from "lucide-react";

interface PublicBattlePreview {
  battleId: string;
  combatantA: string;
  combatantB: string;
  winner: string;
  margin: string;
  routeShareA: number;
  routeShareB: number;
  confidence: number;
  victoryClass: string;
  victoryDepth: string;
  anchorState: string;
  hinge: string;
  sourceState: string;
  calibrationState: string;
}

const BOB_0003_PREVIEW: PublicBattlePreview = {
  battleId: "BOB-0003",
  combatantA: "Darth Vader",
  combatantB: "Movie Sauron",
  winner: "Darth Vader",
  margin: "Narrow field win",
  routeShareA: 59.27,
  routeShareB: 40.73,
  confidence: 64.53,
  victoryClass: "FIELD WIN",
  victoryDepth: "D3 — Agency",
  anchorState: "Unresolved",
  hinge: "Sever the Ring hand before the mace converts.",
  sourceState: "Stored corpus report",
  calibrationState: "Uncalibrated",
};

export default function BoxOBattlesApp({ onClose }: { onClose?: () => void }) {
  const packet = BOB_0003_PREVIEW;

  return (
    <div className="relative mx-auto max-w-6xl rounded-xl border border-amber-500/30 bg-[#070709] p-6 shadow-[0_0_50px_rgba(245,158,11,0.08)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-400">
            <Swords size={22} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">Box o' Battles</span>
              <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                Read-only Studios consumer
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400">Corpus-backed Arbiter packet preview</p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Box o' Battles preview"
            className="flex h-8 w-8 items-center justify-center self-end rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white sm:self-auto"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-emerald-400" size={18} />
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">Consumer boundary enforced</p>
            <p className="mt-1 text-xs leading-6 text-zinc-300">
              This website does not accept evidence, calculate winners, validate verdict schemas, or import private production infrastructure. The owning Box o' Battles project produces the packet; Studios presents approved output read-only.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-12">
        <section className="glass-card rounded-lg p-5 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">{packet.battleId}</p>
              <h2 className="mt-1 font-display text-2xl font-black text-white">{packet.combatantA} vs {packet.combatantB}</h2>
            </div>
            <span className="rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-300">
              {packet.sourceState}
            </span>
          </div>

          <div className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300">Recommended result</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-3xl font-black text-white">{packet.winner}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-amber-200">{packet.margin}</p>
              </div>
              <div className="sm:text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">Confidence</p>
                <p className="font-mono text-2xl font-black text-emerald-400">{packet.confidence.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.12em]">
              <span className="text-amber-300">{packet.combatantA} {packet.routeShareA.toFixed(2)}</span>
              <span className="text-zinc-500">Route share — not probability</span>
              <span className="text-sky-300">{packet.routeShareB.toFixed(2)} {packet.combatantB}</span>
            </div>
            <div className="flex h-3 overflow-hidden rounded-full border border-white/10 bg-zinc-950">
              <div className="bg-amber-500" style={{ width: `${packet.routeShareA}%` }} />
              <div className="bg-sky-500" style={{ width: `${packet.routeShareB}%` }} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded border border-zinc-800 bg-zinc-950/70 p-3">
              <Scale size={16} className="text-amber-400" />
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">Victory class</p>
              <p className="mt-1 text-sm font-bold text-white">{packet.victoryClass}</p>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-950/70 p-3">
              <GitBranch size={16} className="text-violet-400" />
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">Victory depth</p>
              <p className="mt-1 text-sm font-bold text-white">{packet.victoryDepth}</p>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-950/70 p-3">
              <Database size={16} className="text-sky-400" />
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">Anchor state</p>
              <p className="mt-1 text-sm font-bold text-white">{packet.anchorState}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-4 lg:col-span-5">
          <div className="glass-card rounded-lg p-5">
            <div className="flex items-center gap-2">
              <FileCheck2 size={17} className="text-amber-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">Decisive hinge</h3>
            </div>
            <p className="mt-4 font-display text-xl font-semibold leading-snug text-zinc-100">{packet.hinge}</p>
            <p className="mt-3 text-xs leading-6 text-zinc-500">
              A field win does not claim absolute erasure. The unresolved anchor remains visible instead of being flattened into a bigger winner banner.
            </p>
          </div>

          <div className="glass-card rounded-lg p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">Truth state</h3>
            </div>
            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-zinc-500">Packet role</dt>
                <dd className="text-right font-semibold text-zinc-200">Read-only preview</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-zinc-500">Calibration</dt>
                <dd className="text-right font-semibold text-amber-300">{packet.calibrationState}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-500">Live recomputation</dt>
                <dd className="text-right font-semibold text-emerald-300">Disabled</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 shrink-0 text-amber-400" size={17} />
              <p className="text-xs leading-6 text-zinc-400">
                This is a corpus preview, not proof that the full Verdict Chamber, Theatre, Forge, replay seal, or public packet pipeline has shipped.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
