import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ClipboardCopy,
  RotateCcw,
  Save,
  Shield,
  Sparkles,
  Swords,
  Trophy,
} from "lucide-react";

import "./box-o-battles-simulator.css";

type Distance = "close" | "mid" | "long";
type Prep = "none" | "some" | "full";
type Side = "a" | "b" | "draw";

type FighterProfile = {
  id: string;
  name: string;
  version: string;
  power: number;
  speed: number;
  defense: number;
  reach: number;
  finish: number;
  instincts: number;
};

type BattleRules = {
  arena: string;
  distance: Distance;
  prep: Prep;
  trials: number;
};

type BattleResult = {
  id: string;
  createdAt: string;
  fighterA: FighterProfile;
  fighterB: FighterProfile;
  rules: BattleRules;
  winsA: number;
  winsB: number;
  draws: number;
  shareA: number;
  shareB: number;
  drawShare: number;
  winner: Side;
  seed: number;
};

type StoredState = {
  fighters: FighterProfile[];
  history: BattleResult[];
};

const STORAGE_KEY = "box-o-battles-public-simulator-v1";
const STAT_FIELDS: Array<{ key: keyof Pick<FighterProfile, "power" | "speed" | "defense" | "reach" | "finish" | "instincts">; label: string; help: string }> = [
  { key: "power", label: "Power", help: "How hard they can hit or affect the opponent." },
  { key: "speed", label: "Speed", help: "How quickly they act, react, and change position." },
  { key: "defense", label: "Defense", help: "How well they survive, resist, block, or recover." },
  { key: "reach", label: "Reach", help: "How reliably they can get to the opponent." },
  { key: "finish", label: "Finish", help: "How good they are at ending the fight for good." },
  { key: "instincts", label: "Fight IQ", help: "How well they choose the right move under pressure." },
];

function makeProfile(name: string): FighterProfile {
  return {
    id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    name,
    version: "Standard version",
    power: 50,
    speed: 50,
    defense: 50,
    reach: 50,
    finish: 50,
    instincts: 50,
  };
}

function clampStat(value: number) {
  return Math.max(1, Math.min(100, Math.round(value)));
}

function hashText(text: string) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function distanceBonus(fighter: FighterProfile, distance: Distance) {
  if (distance === "close") return fighter.power * 0.06 + fighter.defense * 0.04 - fighter.reach * 0.02;
  if (distance === "long") return fighter.reach * 0.06 + fighter.speed * 0.04 - fighter.power * 0.02;
  return fighter.speed * 0.025 + fighter.instincts * 0.025;
}

function prepBonus(fighter: FighterProfile, prep: Prep) {
  if (prep === "full") return fighter.instincts * 0.08 + fighter.reach * 0.02;
  if (prep === "some") return fighter.instincts * 0.035;
  return 0;
}

function trialScore(
  fighter: FighterProfile,
  opponent: FighterProfile,
  rules: BattleRules,
  random: () => number,
) {
  const attack =
    fighter.power * 0.22 +
    fighter.speed * 0.18 +
    fighter.reach * 0.14 +
    fighter.finish * 0.22 +
    fighter.instincts * 0.16 +
    fighter.defense * 0.08;
  const resistance =
    opponent.defense * 0.5 +
    opponent.speed * 0.18 +
    opponent.instincts * 0.17 +
    opponent.reach * 0.15;
  const uncertainty = (random() - 0.5) * 24;
  return attack - resistance * 0.28 + distanceBonus(fighter, rules.distance) + prepBonus(fighter, rules.prep) + uncertainty;
}

function runBattle(fighterA: FighterProfile, fighterB: FighterProfile, rules: BattleRules): BattleResult {
  const seedSource = JSON.stringify({ fighterA, fighterB, rules });
  const seed = hashText(seedSource);
  const random = seededRandom(seed);
  let winsA = 0;
  let winsB = 0;
  let draws = 0;

  for (let trial = 0; trial < rules.trials; trial += 1) {
    const scoreA = trialScore(fighterA, fighterB, rules, random);
    const scoreB = trialScore(fighterB, fighterA, rules, random);
    const difference = scoreA - scoreB;
    if (Math.abs(difference) < 2.5) draws += 1;
    else if (difference > 0) winsA += 1;
    else winsB += 1;
  }

  const shareA = (winsA / rules.trials) * 100;
  const shareB = (winsB / rules.trials) * 100;
  const drawShare = (draws / rules.trials) * 100;
  const winner: Side = Math.abs(winsA - winsB) <= Math.max(2, rules.trials * 0.01)
    ? "draw"
    : winsA > winsB ? "a" : "b";

  return {
    id: `battle-${seed}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    fighterA: { ...fighterA },
    fighterB: { ...fighterB },
    rules: { ...rules },
    winsA,
    winsB,
    draws,
    shareA,
    shareB,
    drawShare,
    winner,
    seed,
  };
}

function FighterEditor({
  fighter,
  side,
  onChange,
  onSave,
}: {
  fighter: FighterProfile;
  side: "A" | "B";
  onChange: (fighter: FighterProfile) => void;
  onSave: () => void;
}) {
  const updateText = (key: "name" | "version", value: string) => onChange({ ...fighter, [key]: value });
  const updateStat = (key: typeof STAT_FIELDS[number]["key"], value: number) => onChange({ ...fighter, [key]: clampStat(value) });

  return (
    <section className="bob-sim__fighter" data-side={side.toLowerCase()}>
      <div className="bob-sim__fighter-heading">
        <span>Fighter {side}</span>
        <button type="button" onClick={onSave}><Save size={14} /> Save fighter</button>
      </div>

      <label>
        <span>Name</span>
        <input value={fighter.name} onChange={(event) => updateText("name", event.target.value)} placeholder="Character name" />
      </label>
      <label>
        <span>Version</span>
        <input value={fighter.version} onChange={(event) => updateText("version", event.target.value)} placeholder="Example: movie version, base form, 1990s run" />
      </label>

      <div className="bob-sim__stats">
        {STAT_FIELDS.map((field) => (
          <label key={field.key} title={field.help}>
            <span><strong>{field.label}</strong><small>{field.help}</small></span>
            <input
              type="range"
              min="1"
              max="100"
              value={fighter[field.key]}
              onChange={(event) => updateStat(field.key, Number(event.target.value))}
            />
            <output>{fighter[field.key]}</output>
          </label>
        ))}
      </div>
    </section>
  );
}

function percentage(value: number) {
  return `${value.toFixed(1)}%`;
}

export default function BoxOBattlesSimulator() {
  const [fighterA, setFighterA] = useState(() => makeProfile("Fighter A"));
  const [fighterB, setFighterB] = useState(() => makeProfile("Fighter B"));
  const [rules, setRules] = useState<BattleRules>({ arena: "Neutral arena", distance: "mid", prep: "none", trials: 2000 });
  const [savedFighters, setSavedFighters] = useState<FighterProfile[]>([]);
  const [history, setHistory] = useState<BattleResult[]>([]);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as StoredState;
      setSavedFighters(Array.isArray(parsed.fighters) ? parsed.fighters : []);
      setHistory(Array.isArray(parsed.history) ? parsed.history : []);
    } catch {
      setSavedFighters([]);
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    const state: StoredState = { fighters: savedFighters, history };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [savedFighters, history]);

  const records = useMemo(() => {
    const map = new Map<string, { wins: number; losses: number; draws: number; battles: number }>();
    for (const battle of history) {
      for (const side of ["a", "b"] as const) {
        const fighter = side === "a" ? battle.fighterA : battle.fighterB;
        const current = map.get(fighter.id) ?? { wins: 0, losses: 0, draws: 0, battles: 0 };
        current.battles += 1;
        if (battle.winner === "draw") current.draws += 1;
        else if (battle.winner === side) current.wins += 1;
        else current.losses += 1;
        map.set(fighter.id, current);
      }
    }
    return map;
  }, [history]);

  const saveFighter = (fighter: FighterProfile) => {
    const normalized = {
      ...fighter,
      id: fighter.id || `${fighter.name}-${fighter.version}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    setSavedFighters((current) => [normalized, ...current.filter((item) => item.id !== normalized.id)].slice(0, 30));
  };

  const simulate = () => {
    const next = runBattle(fighterA, fighterB, rules);
    setResult(next);
    setHistory((current) => [next, ...current].slice(0, 12));
  };

  const swap = () => {
    setFighterA(fighterB);
    setFighterB(fighterA);
    setResult(null);
  };

  const reset = () => {
    setFighterA(makeProfile("Fighter A"));
    setFighterB(makeProfile("Fighter B"));
    setRules({ arena: "Neutral arena", distance: "mid", prep: "none", trials: 2000 });
    setResult(null);
  };

  const loadBattle = (battle: BattleResult) => {
    setFighterA({ ...battle.fighterA });
    setFighterB({ ...battle.fighterB });
    setRules({ ...battle.rules });
    setResult(battle);
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const winnerName = result?.winner === "a" ? result.fighterA.name : result?.winner === "b" ? result.fighterB.name : "Too close to call";

  return (
    <div className="bob-sim">
      <header className="bob-sim__header">
        <div className="bob-sim__mark"><Swords size={24} /></div>
        <div>
          <p>Build the matchup. Run the numbers. Keep the history.</p>
          <h3>Battle Simulator</h3>
        </div>
        <span className="bob-sim__plain-language">You choose the stats. The Box runs the fight.</span>
      </header>

      <div className="bob-sim__saved">
        <div>
          <strong>Saved fighters</strong>
          <span>Reuse a fighter in any future battle.</span>
        </div>
        <select value="" onChange={(event) => {
          const fighter = savedFighters.find((item) => item.id === event.target.value);
          if (fighter) setFighterA({ ...fighter });
        }}>
          <option value="">Load into Fighter A…</option>
          {savedFighters.map((fighter) => <option key={`a-${fighter.id}`} value={fighter.id}>{fighter.name} — {fighter.version}</option>)}
        </select>
        <select value="" onChange={(event) => {
          const fighter = savedFighters.find((item) => item.id === event.target.value);
          if (fighter) setFighterB({ ...fighter });
        }}>
          <option value="">Load into Fighter B…</option>
          {savedFighters.map((fighter) => <option key={`b-${fighter.id}`} value={fighter.id}>{fighter.name} — {fighter.version}</option>)}
        </select>
      </div>

      <div className="bob-sim__fighters">
        <FighterEditor fighter={fighterA} side="A" onChange={setFighterA} onSave={() => saveFighter(fighterA)} />
        <button type="button" className="bob-sim__swap" onClick={swap} aria-label="Swap fighters"><ArrowLeftRight size={20} /></button>
        <FighterEditor fighter={fighterB} side="B" onChange={setFighterB} onSave={() => saveFighter(fighterB)} />
      </div>

      <section className="bob-sim__rules">
        <div><Shield size={18} /><strong>Fight rules</strong></div>
        <label><span>Arena</span><input value={rules.arena} onChange={(event) => setRules({ ...rules, arena: event.target.value })} /></label>
        <label><span>Starting distance</span><select value={rules.distance} onChange={(event) => setRules({ ...rules, distance: event.target.value as Distance })}><option value="close">Close</option><option value="mid">Mid-range</option><option value="long">Long-range</option></select></label>
        <label><span>Preparation</span><select value={rules.prep} onChange={(event) => setRules({ ...rules, prep: event.target.value as Prep })}><option value="none">No prep</option><option value="some">Some prep</option><option value="full">Full prep</option></select></label>
        <label><span>Simulated fights</span><select value={rules.trials} onChange={(event) => setRules({ ...rules, trials: Number(event.target.value) })}><option value={500}>500</option><option value={2000}>2,000</option><option value={5000}>5,000</option></select></label>
      </section>

      <div className="bob-sim__actions">
        <button type="button" className="bob-sim__run" onClick={simulate}><Sparkles size={18} /> Run the battle</button>
        <button type="button" onClick={reset}><RotateCcw size={16} /> Reset</button>
      </div>

      {result && (
        <section className="bob-sim__result" aria-live="polite">
          <div className="bob-sim__result-heading">
            <div><Trophy size={24} /><span><small>Result</small><strong>{winnerName}</strong></span></div>
            <button type="button" onClick={copyResult}><ClipboardCopy size={15} /> {copied ? "Copied" : "Copy battle data"}</button>
          </div>

          <div className="bob-sim__result-bars">
            <div><span>{result.fighterA.name}</span><strong>{percentage(result.shareA)}</strong></div>
            <div className="bob-sim__bar"><i style={{ width: `${result.shareA}%` }} /><b style={{ width: `${result.drawShare}%` }} /><em style={{ width: `${result.shareB}%` }} /></div>
            <div><span>Draws {percentage(result.drawShare)}</span><strong>{percentage(result.shareB)} {result.fighterB.name}</strong></div>
          </div>

          <div className="bob-sim__counts">
            <span>{result.winsA.toLocaleString()} wins for {result.fighterA.name}</span>
            <span>{result.draws.toLocaleString()} draws</span>
            <span>{result.winsB.toLocaleString()} wins for {result.fighterB.name}</span>
          </div>
          <p className="bob-sim__disclaimer">This is a matchup model built from the numbers entered above—not an official canon fact.</p>
        </section>
      )}

      <section className="bob-sim__history">
        <div className="bob-sim__history-heading"><strong>Battle history</strong><span>Results stay on this device and can be loaded again.</span></div>
        {history.length === 0 ? (
          <p className="bob-sim__empty">Run your first battle and it will appear here.</p>
        ) : (
          <div className="bob-sim__history-grid">
            {history.map((battle) => {
              const recordA = records.get(battle.fighterA.id);
              const recordB = records.get(battle.fighterB.id);
              return (
                <button type="button" key={battle.id} onClick={() => loadBattle(battle)}>
                  <small>{new Date(battle.createdAt).toLocaleDateString()}</small>
                  <strong>{battle.fighterA.name} vs {battle.fighterB.name}</strong>
                  <span>{battle.winner === "a" ? battle.fighterA.name : battle.winner === "b" ? battle.fighterB.name : "Draw"}</span>
                  <em>A record {recordA?.wins ?? 0}-{recordA?.losses ?? 0}-{recordA?.draws ?? 0} · B record {recordB?.wins ?? 0}-{recordB?.losses ?? 0}-{recordB?.draws ?? 0}</em>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
