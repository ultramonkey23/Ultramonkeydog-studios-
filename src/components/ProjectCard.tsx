/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from "../types";
import { Gamepad2, Dna, Trophy, Sparkles, FolderCode, ExternalLink, Activity, Heart, ShieldAlert, Cpu } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  key?: string;
}

function ProjectGraphic({ id }: { id: string }) {
  // Glow styles represent the retro CRT and creature-system neon interfaces
  if (id === "what-we-fed") {
    return (
      <div className="relative w-full aspect-video bg-zinc-950 border border-emerald-950 rounded overflow-hidden p-3 group/screen select-none">
        {/* CRT Scanline overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10" />
        
        {/* Dark glowing helix and status dashboard */}
        <div className="w-full h-full flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_center,rgba(4,47,31,0.18)_0%,rgba(9,9,11,0)_85%)]">
          {/* HUD Header */}
          <div className="flex justify-between items-center border-b border-emerald-950 pb-1.5 text-[8px] font-mono tracking-wider text-emerald-500">
            <span>MUTAGEN_SECTOR // DNA_LOOP</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              FEED_WINDOW_STABLE
            </span>
          </div>

          {/* Core game screen artwork visual */}
          <div className="flex-grow flex items-center justify-between px-3 relative my-2">
            
            {/* Pulsing Bio-glowing organism */}
            <div className="w-1/3 flex flex-col items-center justify-center relative">
              <div className="relative w-14 h-14 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <svg className="w-10 h-10 text-emerald-400/90 animate-pulse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
                  {/* Outer organism membrane */}
                  <circle cx="50" cy="50" r="38" strokeDasharray="14 10" />
                  {/* Core heartbeat nucleolus */}
                  <circle cx="50" cy="50" r="16" className="fill-emerald-500/30" />
                  <path d="M 30,50 L 45,50 L 50,30 L 55,70 L 60,50 L 70,50" stroke="#10b981" strokeWidth="4" />
                </svg>
              </div>
              <span className="text-[7px] font-mono text-emerald-400 mt-1 uppercase tracking-widest bg-emerald-950/60 border border-emerald-900/60 px-1.5 py-0.5 rounded leading-none">SPECIES_01 // APEX</span>
            </div>

            {/* Helix DNA map connecting rods */}
            <div className="w-2/3 h-full flex items-center justify-center relative">
              <svg className="w-full h-full opacity-70 text-emerald-500/40" viewBox="0 0 160 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M 5,40 Q 40,5 80,40 T 155,40" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 1.5" />
                <path d="M 5,40 Q 40,75 80,40 T 155,40" stroke="#059669" strokeWidth="2" strokeDasharray="1 3" />
                {[20, 40, 60, 80, 100, 120, 140].map((x, i) => {
                  const angle = (x / 140) * Math.PI * 2.2;
                  const yOffset = 22 * Math.sin(angle);
                  const y1 = 40 + yOffset;
                  const y2 = 40 - yOffset;
                  return (
                    <g key={i}>
                      <line x1={x} y1={y1} x2={x} y2={y2} stroke="#10b981" strokeOpacity="0.5" strokeWidth="1" />
                      <circle cx={x} cy={y1} r="2.5" fill="#10b981" className="animate-pulse" />
                      <circle cx={x} cy={y2} r="2.5" fill="#047857" />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Badge: Real game images coming soon */}
          <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-20">
            <span className="text-[7.5px] font-mono uppercase bg-zinc-950/95 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded tracking-widest shadow-2xl backdrop-blur-md font-bold">
              // REAL GAME IMAGES COMING SOON
            </span>
          </div>

          {/* HUD Footer Status indicators */}
          <div className="grid grid-cols-3 gap-2 border-t border-emerald-950 pt-1.5 text-[8px] font-mono text-zinc-500">
            <div>
              <span className="block text-[6px] text-zinc-650 uppercase">HUNGER_RATE</span>
              <span className="text-emerald-400">14.8 BPS / HIGH</span>
            </div>
            <div>
              <span className="block text-[6px] text-zinc-650 uppercase">GEN_MUTATION</span>
              <span className="text-emerald-400">STAGE_04 (APEX)</span>
            </div>
            <div className="text-right">
              <span className="block text-[6px] text-zinc-650 uppercase">DISH_COMBUST</span>
              <span className="text-emerald-500">92% INTEGRITY</span>
            </div>
          </div>
        </div>
        
        {/* Visual corner indicators */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-emerald-500/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-emerald-500/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-emerald-500/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-emerald-500/40 pointer-events-none" />
      </div>
    );
  }

  if (id === "bone-league") {
    return (
      <div className="relative w-full aspect-video bg-zinc-950 border border-sky-950 rounded overflow-hidden p-3 group/screen select-none">
        {/* CRT Scanline overlay effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10" />

        {/* Dystopian football tactics matrix screen */}
        <div className="w-full h-full flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.15)_0%,rgba(9,9,11,0)_85%)]">
          {/* HUD Header */}
          <div className="flex justify-between items-center border-b border-sky-950 pb-1.5 text-[8px] font-mono tracking-wider text-sky-400">
            <span>TACTICAL_GRID // DIVISION_EAST_IV</span>
            <span className="text-red-500/80 font-bold tracking-widest flex items-center gap-1 uppercase bg-red-950/20 px-1 py-0.5 border border-red-950/50 rounded animate-pulse">
              ● MEAT_GRINDER_ACTIVE
            </span>
          </div>

          <div className="flex-grow flex items-center justify-between gap-2 my-2 h-full py-1 relative">
            {/* Tactical Football Grid overlay */}
            <div className="w-1/2 h-full relative border border-sky-950/60 rounded flex items-center justify-center p-1 bg-zinc-900/10">
              <svg className="w-full h-full opacity-70 text-sky-500/40" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1">
                <g strokeOpacity="0.2">
                  <line x1="0" y1="20" x2="100" y2="20" />
                  <line x1="0" y1="40" x2="100" y2="40" strokeWidth="1.5" />
                  <line x1="0" y1="60" x2="100" y2="60" />
                  <line x1="25" y1="0" x2="25" y2="80" />
                  <line x1="50" y1="0" x2="50" y2="80" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="75" y1="0" x2="75" y2="80" />
                </g>
                <path d="M 15,20 L 40,45 L 85,25" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" className="animate-pulse" />
                <circle cx="15" cy="20" r="4.5" fill="#0284c7" className="stroke-sky-400 stroke-1" />
                <circle cx="40" cy="45" r="4.5" fill="#ef4444" className="stroke-red-400 stroke-1" />
                <circle cx="85" cy="25" r="4.5" fill="#0284c7" className="stroke-sky-400 stroke-1" />
                <line x1="15" y1="20" x2="15" y2="50" stroke="#f43f5e" strokeWidth="1" strokeDasharray="1 2" />
                <line x1="85" y1="25" x2="85" y2="60" stroke="#f43f5e" strokeWidth="1" strokeDasharray="1 2" />
              </svg>
              <div className="absolute top-1.5 left-1.5 text-[6px] font-mono text-zinc-650 bg-zinc-900 px-1 rounded uppercase">FIELD_MAP</div>
            </div>

            {/* Tactical Feed & Telemetry logs */}
            <div className="w-1/2 h-full flex flex-col justify-between text-[7px] font-mono text-zinc-400 bg-zinc-950/40 p-1.5 border border-sky-950/50 rounded">
              <span className="text-[6px] text-sky-400 uppercase tracking-widest block border-b border-sky-950 pb-0.5 mb-1 bg-sky-950/10 px-1">MATCH_FEED_STREAM</span>
              <div className="space-y-1 overflow-hidden h-[34px] text-[6px] leading-[1.3] text-zinc-500 font-sans">
                <p className="text-zinc-400 truncate">[12:40] ATHLETE #22 SACKED IN RED ZONE</p>
                <p className="text-red-400 truncate">[12:44] ATHLETE #09: KNEE JOINT SHATTER</p>
                <p className="text-sky-450 truncate">[12:51] CONTRACT COMPLETED / PAYOUT OK</p>
              </div>
              <div className="flex justify-between items-center text-[7px] border-t border-sky-950/50 pt-1 text-sky-400 mt-1">
                <span>REMAINING: 04:50</span>
                <span>MATCH: WIN_82%</span>
              </div>
            </div>
          </div>

          {/* Badge: Real game images coming soon */}
          <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-20">
            <span className="text-[7.5px] font-mono uppercase bg-zinc-950/95 text-sky-400 border border-sky-500/30 px-3 py-1 rounded tracking-widest shadow-2xl backdrop-blur-md font-bold">
              // REAL GAME IMAGES COMING SOON
            </span>
          </div>

          {/* HUD Footer Status indicators */}
          <div className="grid grid-cols-3 gap-2 border-t border-sky-950 pt-1.5 text-[8px] font-mono text-zinc-500">
            <div>
              <span className="block text-[6.5px] text-zinc-650 uppercase">ACTIVE_ROSTER</span>
              <span className="text-sky-450">08 / 11 CONVICTS</span>
            </div>
            <div>
              <span className="block text-[6.5px] text-zinc-650 uppercase">UPGRADE_POINTS</span>
              <span className="text-sky-400">920 BONE_COINS</span>
            </div>
            <div className="text-right">
              <span className="block text-[6.5px] text-zinc-650 uppercase">RISK_LEVEL</span>
              <span className="text-red-400 font-semibold">MAX_FATIGUE</span>
            </div>
          </div>
        </div>

        {/* Visual corner indicators */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-sky-500/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-sky-500/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-sky-500/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-sky-500/40 pointer-events-none" />
      </div>
    );
  }

  if (id === "saga-anxious-fluff") {
    return (
      <div className="relative w-full aspect-video bg-zinc-950 border border-amber-950 rounded overflow-hidden p-3 group/screen select-none">
        {/* Soft LCD grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.01)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_6px] pointer-events-none z-10" />

        {/* Colorful cozy game HUD */}
        <div className="w-full h-full flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.15)_0%,rgba(9,9,11,0)_85%)]">
          {/* HUD Header */}
          <div className="flex justify-between items-center border-b border-amber-950 pb-1.5 text-[8px] font-mono tracking-wider text-amber-500">
            <span>SENSORY_SHIELD_ACTIVE</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              CALM_TEMPO
            </span>
          </div>

          <div className="flex-grow flex items-center justify-between gap-4 my-2 h-full relative">
            
            {/* Mascot focus */}
            <div className="w-2/5 flex flex-col items-center justify-center relative">
              <div className="relative w-14 h-14 bg-amber-950/20 border-2 border-dashed border-amber-500/40 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                {/* Cute fluffy SVG layout */}
                <svg className="w-9 h-9 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeDasharray="2 1" />
                  {/* Big anxious eyes */}
                  <circle cx="9" cy="11" r="2" fill="currentColor" />
                  <circle cx="15" cy="11" r="2" fill="currentColor" />
                  <path d="M 10,15 Q 12,13 14,15" stroke="currentColor" strokeWidth="1.5" />
                  {/* Tiny fluffy cheeks */}
                  <circle cx="6" cy="13" r="1.5" fill="#f59e0b" fillOpacity="0.8" />
                  <circle cx="18" cy="13" r="1.5" fill="#f59e0b" fillOpacity="0.8" />
                </svg>
              </div>
              <span className="text-[7px] font-mono text-amber-400 mt-1.5 uppercase tracking-widest bg-amber-950/30 border border-amber-900/60 px-1 py-0.5 rounded leading-none">ANXIOUS_FLUFF</span>
            </div>

            {/* Radiant Adaptability parameters and meters */}
            <div className="w-3/5 h-full flex flex-col justify-center space-y-1.5">
              <div className="space-y-1">
                <div className="flex justify-between text-[7px] font-mono text-zinc-400">
                  <span>EMOTIONAL_STABILITY</span>
                  <span className="text-amber-400 font-semibold">92% (SECURE)</span>
                </div>
                <div className="w-full h-1 bg-zinc-900 border border-amber-950 rounded overflow-hidden">
                  <div className="h-full bg-amber-500 rounded" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[7px] font-mono text-zinc-400">
                  <span>EVOLUTION_THRESHOLD</span>
                  <span className="text-amber-400">STAGE 2 / 5</span>
                </div>
                <div className="w-full h-1 bg-zinc-900 border border-amber-950 rounded overflow-hidden">
                  <div className="h-full bg-amber-600 rounded" style={{ width: "45%" }} />
                </div>
              </div>

              {/* Passive status pins */}
              <div className="flex gap-1.5 pt-1">
                <span className="text-[6px] font-mono bg-amber-550/20 text-amber-450 px-1.5 py-0.5 rounded border border-amber-900/40 uppercase">SOFT_ACOUSTIC</span>
                <span className="text-[6px] font-mono bg-amber-550/20 text-amber-450 px-1.5 py-0.5 rounded border border-amber-900/40 uppercase">STEADY_SIGHT</span>
              </div>
            </div>
          </div>

          {/* Badge: Real game images coming soon */}
          <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-20">
            <span className="text-[7.5px] font-mono uppercase bg-zinc-950/95 text-amber-400 border border-amber-500/30 px-3 py-1 rounded tracking-widest shadow-2xl backdrop-blur-md font-bold font-mono">
              // REAL GAME IMAGES COMING SOON
            </span>
          </div>

          {/* HUD Footer */}
          <div className="grid grid-cols-3 gap-2 border-t border-amber-950 pt-1.5 text-[8px] font-mono text-zinc-500">
            <div>
              <span className="block text-[6.5px] text-zinc-650 uppercase">CHILD_SENSORY</span>
              <span className="text-amber-400">SAFE_PRESET_A</span>
            </div>
            <div>
              <span className="block text-[6.5px] text-zinc-650 uppercase">PASSIVE_TRAITS</span>
              <span className="text-amber-400">04 SLOTS ACTIVE</span>
            </div>
            <div className="text-right">
              <span className="block text-[6.5px] text-zinc-650 uppercase">AUDIO_SPIKES</span>
              <span className="text-emerald-500">0.0dB FILTERED</span>
            </div>
          </div>
        </div>

        {/* Visual corner indicators */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-amber-500/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-amber-500/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-amber-500/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-amber-500/40 pointer-events-none" />
      </div>
    );
  }

  // Fallback / "feral-formation" Violet HUD
  return (
    <div className="relative w-full aspect-video bg-zinc-950 border border-violet-950 rounded overflow-hidden p-3 group/screen select-none">
      {/* CRT Scanline overlay effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,6px_100%] pointer-events-none z-10" />

      {/* Cybernetic Formation Tactical Screen */}
      <div className="w-full h-full flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(9,9,11,0)_85%)]">
        {/* HUD Header */}
        <div className="flex justify-between items-center border-b border-violet-950 pb-1.5 text-[8px] font-mono tracking-wider text-violet-400">
          <span>SQUAD_MATRIX // DETERMINISTIC_MATH</span>
          <span className="text-violet-400 flex items-center gap-1 uppercase">
            ● FORECAST_CLASH_WINDOW
          </span>
        </div>

        <div className="flex-grow flex items-center justify-between gap-2.5 my-2 h-full py-1 relative">
          
          {/* Squad Grid node placement */}
          <div className="w-1/2 h-full relative border border-violet-950/60 rounded flex items-center justify-center p-1 bg-zinc-900/10">
            <svg className="w-full h-full opacity-70 text-violet-500/40" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1">
              <g strokeOpacity="0.18">
                <line x1="10" y1="20" x2="90" y2="20" />
                <line x1="10" y1="40" x2="90" y2="40" />
                <line x1="10" y1="60" x2="90" y2="60" />
                <line x1="30" y1="0" x2="30" y2="80" strokeDasharray="2 2" />
                <line x1="50" y1="0" x2="50" y2="80" strokeDasharray="2 2" strokeWidth="1.5" />
                <line x1="70" y1="0" x2="70" y2="80" strokeDasharray="2 2" />
              </g>
              {/* Formation markers */}
              <polygon points="50,15 62,25 50,35 38,25" stroke="#a78bfa" strokeWidth="1.5" fill="#8b5cf6" fillOpacity="0.15" />
              <polygon points="50,35 62,45 50,55 38,45" stroke="#a78bfa" strokeWidth="1.5" fill="#c084fc" fillOpacity="0.2" />
              <circle cx="50" cy="25" r="4" fill="#8b5cf6" className="stroke-violet-400 stroke-1 animate-pulse" />
              <circle cx="50" cy="45" r="4" fill="#c084fc" className="stroke-violet-300 stroke-1" />
              <circle cx="38" cy="25" r="2.5" fill="#6d28d9" />
              <circle cx="62" cy="25" r="2.5" fill="#6d28d9" />
            </svg>
            <div className="absolute top-1.5 left-1.5 text-[6px] font-mono text-zinc-650 bg-zinc-900 px-1 rounded uppercase">GRID_DEPLOY</div>
          </div>

          {/* Active Tactics statistics panel */}
          <div className="w-1/2 h-full flex flex-col justify-between text-[7px] font-mono text-zinc-400 bg-zinc-950/40 p-1.5 border border-violet-950/50 rounded">
            <span className="text-[6px] text-violet-400 uppercase tracking-widest block border-b border-violet-950 pb-0.5 mb-1 bg-violet-950/10 px-1">CLASH_MATCHUP_MATH</span>
            <div className="space-y-1 text-[6.5px] text-zinc-500 leading-tight font-sans">
              <div className="flex justify-between">
                <span>COMBO_CHAINS</span>
                <span className="text-violet-400 font-mono">03 ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>TEMPO_SCALE</span>
                <span className="text-violet-400 font-mono">1.25x SPEED</span>
              </div>
              <div className="flex justify-between">
                <span>PACT_ALIGN</span>
                <span className="text-violet-400 text-right truncate">APEX_HUNTER</span>
              </div>
            </div>
            
            <div className="text-[7px] border-t border-violet-950/50 pt-1 text-violet-400 mt-1 flex justify-between uppercase">
              <span>FORECAST:</span>
              <span className="text-emerald-400 font-semibold text-[6.5px]">ADV_88%</span>
            </div>
          </div>
        </div>

        {/* Badge: Real game images coming soon */}
        <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-20">
          <span className="text-[7.5px] font-mono uppercase bg-zinc-950/95 text-violet-400 border border-violet-500/30 px-3 py-1 rounded tracking-widest shadow-2xl backdrop-blur-md font-bold font-mono">
            // REAL GAME IMAGES COMING SOON
          </span>
        </div>

        {/* HUD Footer Status indicators */}
        <div className="grid grid-cols-3 gap-2 border-t border-violet-950 pt-1.5 text-[8px] font-mono text-zinc-500">
          <div>
            <span className="block text-[6.5px] text-zinc-650 uppercase">SQUAD_COUNT</span>
            <span className="text-violet-400">04 CREATURES</span>
          </div>
          <div>
            <span className="block text-[6.5px] text-zinc-650 uppercase">HABITAT_CORE</span>
            <span className="text-violet-400">TAIGA_GRID_B</span>
          </div>
          <div className="text-right">
            <span className="block text-[6.5px] text-zinc-650 uppercase">DECISION_LOOP</span>
            <span className="text-emerald-500">DETERMINISTIC</span>
          </div>
        </div>
      </div>

      {/* Visual corner indicators */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-violet-500/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-violet-500/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-violet-500/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-violet-500/40 pointer-events-none" />
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  let statusColor = "text-emerald-400 border-emerald-900/60 bg-emerald-950/20";
  let Icon = Gamepad2;
  let accentBorderClass = "hover:border-emerald-500/30";
  let activeTagGlow = "hover:shadow-[0_0_12px_-2px_rgba(16,185,129,0.15)]";
  let themeTextColor = "text-emerald-400";

  if (project.accentColor === "electric-blue") {
    statusColor = "text-sky-450 border-sky-900/60 bg-sky-950/20";
    Icon = Trophy;
    accentBorderClass = "hover:border-sky-500/30";
    activeTagGlow = "hover:shadow-[0_0_12px_-2px_rgba(14,165,233,0.15)]";
    themeTextColor = "text-sky-400";
  } else if (project.accentColor === "violet") {
    statusColor = "text-violet-450 border-violet-900/60 bg-violet-950/20";
    Icon = FolderCode;
    accentBorderClass = "hover:border-violet-500/30";
    activeTagGlow = "hover:shadow-[0_0_12px_-2px_rgba(139,92,246,0.15)]";
    themeTextColor = "text-violet-400";
  } else if (project.accentColor === "warm-amber") {
    statusColor = "text-amber-450 border-amber-900/60 bg-amber-950/20";
    Icon = Sparkles;
    accentBorderClass = "hover:border-amber-500/30";
    activeTagGlow = "hover:shadow-[0_0_12px_-2px_rgba(245,158,11,0.15)]";
    themeTextColor = "text-amber-450";
  } else if (project.accentColor === "neon-green") {
    Icon = Dna;
    themeTextColor = "text-emerald-400";
  }

  return (
    <div 
      id={`project-card-${project.id}`}
      className={`group flex flex-col justify-between bg-zinc-950 p-5 sm:p-6 border border-zinc-900 ${accentBorderClass} ${activeTagGlow} transition-all duration-300 font-sans shadow-lg select-text relative`}
    >
      {/* Decorative mechanical pixel in top right */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-zinc-800 group-hover:bg-amber-500 transition-colors pointer-events-none" />

      <div>
        {/* Vector Game Interface Screenshot Simulator */}
        <div className="mb-5 sm:mb-6 overflow-hidden rounded relative border border-zinc-950/60 group-hover:border-zinc-800 transition-colors shadow-black shadow-2xl">
          <ProjectGraphic id={project.id} />
        </div>

        {/* Header Block and Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 border border-zinc-850 text-zinc-400 group-hover:text-zinc-200 transition-colors rounded">
              <Icon size={16} />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors leading-tight">
                {project.title}
              </h3>
              {project.tone && (
                <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mt-0.5 font-medium">
                  {project.tone}
                </span>
              )}
            </div>
          </div>
          
          <span className={`text-[9px] font-mono tracking-widest font-semibold py-1 px-2.5 rounded border uppercase whitespace-nowrap leading-none ${statusColor}`}>
            {project.status}
          </span>
        </div>

        {/* Body Description */}
        <p className="text-zinc-400 group-hover:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5 transition-colors">
          {project.description}
        </p>

        {/* Feral Formation or generic detailed engine readout panel */}
        {project.expandedDetails && (
          <div className="mb-6 p-4 rounded bg-zinc-900/40 border border-zinc-900 font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-400 relative overflow-hidden group-hover:bg-zinc-900/60 transition-colors">
            <div className="absolute top-0 right-0 p-1 text-[8px] text-zinc-700 tracking-wider font-mono">CORE_SUB_ENGINE</div>
            <span className={`text-[9px] font-bold ${themeTextColor} uppercase tracking-widest block mb-2 border-b border-zinc-900 pb-1 flex items-center gap-1.5`}>
              <Activity size={10} className={themeTextColor} />
              Active System Sub-Systems
            </span>
            <p className="text-zinc-400 font-sans">
              {project.expandedDetails}
            </p>
          </div>
        )}

        {/* Systems Under the Hood list block */}
        {project.systemsUnderTheHood && project.systemsUnderTheHood.length > 0 && (
          <div className="mb-6 p-4 rounded bg-zinc-950 border border-zinc-900/80 font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-400 relative overflow-hidden group-hover:border-zinc-800 hover:bg-zinc-950/80 transition-colors">
            <div className="absolute top-0 right-0 p-1 text-[8px] text-zinc-700 tracking-wider font-mono">SPEC_READOUT</div>
            <span className={`text-[9px] font-bold ${themeTextColor} uppercase tracking-widest block mb-2.5 border-b border-zinc-900 pb-1.5 flex items-center gap-1.5`}>
              <Cpu size={11} className={themeTextColor} />
              Systems Under the Hood
            </span>
            <ul className="space-y-1.5 text-zinc-400 font-sans list-none pl-0">
              {project.systemsUnderTheHood.map((bullet, idx) => (
                <li key={idx} className="flex gap-2 items-start text-xs leading-relaxed">
                  <span className={`font-mono text-[10px] ${themeTextColor} shrink-0 mt-0.5`}>//</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Block & Navigation Tags */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900/60">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="text-[9px] font-mono text-zinc-500 bg-zinc-900/40 hover:bg-zinc-900 hover:text-zinc-3 w-content px-2 py-0.5 rounded border border-zinc-900 transition-colors uppercase font-medium"
            >
              #{tag.toLowerCase().replace(/\s+/g, '-')}
            </span>
          ))}
        </div>
        
        {project.demoUrl && (
          <div className="mt-5 flex gap-3">
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group-hover:scale-[1.01] flex-grow inline-flex items-center gap-2 justify-center bg-zinc-100 hover:bg-white text-zinc-950 hover:text-black font-semibold px-4 py-3 rounded text-xs tracking-wider font-mono uppercase transition-all shadow border border-zinc-300"
            >
              Launch Demo <ExternalLink size={13} className="text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a 
              href="https://forms.gle/ZHcmhicFxrvuY1hQ9"
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:scale-[1.01] flex-grow inline-flex items-center gap-2 justify-center bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-semibold px-4 py-3 rounded text-xs tracking-wider font-mono uppercase transition-all shadow"
            >
              Leave Feedback
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
