import { useEffect, useState } from "react";
import { ArrowUpRight, History, Play, Swords, X } from "lucide-react";

import BoxOBattlesSimulator from "./BoxOBattlesSimulator";
import "./box-o-battles-spotlight.css";

type RecentBattle = {
  fighterA?: { name?: string };
  fighterB?: { name?: string };
  winner?: "a" | "b" | "draw";
};

type StoredBoxState = {
  history?: RecentBattle[];
};

const STORAGE_KEY = "box-o-battles-public-simulator-v1";

function readRecentBattle() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as StoredBoxState;
    return Array.isArray(parsed.history) ? parsed.history[0] ?? null : null;
  } catch {
    return null;
  }
}

export default function BoxOBattlesSpotlight() {
  const [open, setOpen] = useState(false);
  const [recentBattle, setRecentBattle] = useState<RecentBattle | null>(null);

  useEffect(() => {
    setRecentBattle(readRecentBattle());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const recentWinner = recentBattle?.winner === "a"
    ? recentBattle.fighterA?.name
    : recentBattle?.winner === "b"
      ? recentBattle.fighterB?.name
      : recentBattle?.winner === "draw"
        ? "Draw"
        : null;

  return (
    <>
      <article className="bob-spotlight">
        <div className="bob-spotlight__art" aria-hidden="true">
          <span>VS</span>
          <i />
          <b />
        </div>

        <div className="bob-spotlight__copy">
          <p>One room in the Ultramonkeydog menagerie</p>
          <h3>Build a matchup. Let the Box chew on it.</h3>
          <span>
            Choose the fighters, lock their versions, set the fight rules, run the battle, and save everything for rematches or new opponents.
          </span>

          <div className="bob-spotlight__features" aria-label="Box o' Battles features">
            <em><Swords size={15} /> Create fighters</em>
            <em><Play size={15} /> Run battles</em>
            <em><History size={15} /> Reuse results</em>
          </div>

          <div className="bob-spotlight__actions">
            <button type="button" onClick={() => setOpen(true)}>
              Open the Battle Box
              <ArrowUpRight size={17} />
            </button>
            {recentBattle && (
              <small>
                Last battle: {recentBattle.fighterA?.name ?? "Fighter A"} vs {recentBattle.fighterB?.name ?? "Fighter B"}
                {recentWinner ? ` — ${recentWinner}` : ""}
              </small>
            )}
          </div>
        </div>
      </article>

      {open && (
        <div className="bob-spotlight__overlay" role="dialog" aria-modal="true" aria-label="Box o' Battles simulator">
          <div className="bob-spotlight__overlay-bar">
            <div><Swords size={18} /><strong>Box o' Battles</strong><span>Battle Simulator</span></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Box o' Battles">
              <X size={19} />
            </button>
          </div>
          <div className="bob-spotlight__overlay-scroll">
            <BoxOBattlesSimulator />
          </div>
        </div>
      )}
    </>
  );
}
