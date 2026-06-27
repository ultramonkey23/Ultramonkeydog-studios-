/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRODUCTION_ROLES } from "../data";
import { 
  Terminal, 
  Cpu, 
  Palette, 
  FileText, 
  Layers, 
  Eye, 
  Megaphone, 
  FlaskConical,
  Wrench,
  Dna
} from "lucide-react";

export default function MethodGrid() {
  const getIcon = (name: string) => {
    const iconClass = "text-zinc-500 group-hover:text-amber-400 transition-colors duration-300";
    switch (name) {
      case "Terminal": return <Terminal size={18} className={iconClass} />;
      case "Cpu": return <Cpu size={18} className={iconClass} />;
      case "Palette": return <Palette size={18} className={iconClass} />;
      case "FileText": return <FileText size={18} className={iconClass} />;
      case "Layers": return <Layers size={18} className={iconClass} />;
      case "Eye": return <Eye size={18} className={iconClass} />;
      case "Megaphone": return <Megaphone size={18} className={iconClass} />;
      case "FlaskConical": return <FlaskConical size={18} className={iconClass} />;
      default: return <Wrench size={18} className={iconClass} />;
    }
  };

  return (
    <div id="method-grid-section" className="relative group/grid">
      {/* Animated SVG Connection Lines (Visible primarily on desktop) */}
      <div className="absolute inset-0 z-0 hidden lg:block opacity-30 group-hover/grid:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <svg className="w-full h-full text-amber-500/20" preserveAspectRatio="none" viewBox="0 0 1000 600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6">
          <path d="M 166 100 C 333 100, 333 300, 500 300 C 666 300, 666 100, 833 100" strokeWidth="2" strokeDasharray="4 8" className="animate-[pulse_3s_ease-in-out_infinite]" />
          <path d="M 166 300 C 166 500, 500 500, 500 300 C 500 100, 833 100, 833 300" strokeWidth="1" />
          <path d="M 166 500 C 333 500, 333 300, 500 300 C 666 300, 666 500, 833 500" strokeWidth="2" strokeDasharray="4 8" className="animate-[pulse_4s_ease-in-out_infinite]" />
          {/* Node pulse rings */}
          {[
            [166, 100], [500, 100], [833, 100],
            [166, 300], [500, 300], [833, 300],
            [166, 500], [500, 500], [833, 500]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" fill="#09090b" stroke="#f59e0b" strokeWidth="2" className="animate-pulse" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTION_ROLES.map((role, idx) => (
          <div
            key={role.title}
            className="group relative flex flex-col justify-between glass-card p-6 rounded-xl border-white/5 hover:border-amber-500/30 transition-all duration-300 select-none overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(245,158,11,0.06)]"
          >
            {/* Subtle grid HUD accents */}
            <div className="absolute top-0 right-0 p-1.5 font-mono text-[9px] text-zinc-700 select-none tracking-widest group-hover:text-amber-500/60 transition-colors">
              NODE_{String(idx + 1).padStart(2, "0")}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-zinc-900/80 border border-zinc-850 rounded-md group-hover:border-amber-500/20 group-hover:bg-amber-950/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative z-10">{getIcon(role.iconName)}</div>
                </div>
                <h4 className="font-display font-medium text-xs sm:text-sm text-zinc-200 group-hover:text-white transition-colors">
                  {role.title}
                </h4>
              </div>

              <p className="text-zinc-400 group-hover:text-zinc-300 text-xs leading-relaxed mb-5 font-sans min-h-[48px] transition-colors">
                {role.roleDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-900/80 mt-auto group-hover:border-amber-900/40 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono text-zinc-500 group-hover:text-amber-400 uppercase tracking-widest transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                  AI ENGINE CO-PILOT
                </span>
                <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-905 group-hover:text-amber-500/80 group-hover:border-amber-900/30 transition-colors">
                  PASSIVE
                </span>
              </div>
              <p className="text-[11px] text-zinc-450 group-hover:text-zinc-400 leading-relaxed font-sans transition-colors">
                {role.howAiHelps}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
