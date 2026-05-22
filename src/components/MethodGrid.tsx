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
    <div 
      id="method-grid-section" 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {PRODUCTION_ROLES.map((role, idx) => (
        <div
          key={role.title}
          className="group relative flex flex-col justify-between bg-zinc-950/60 hover:bg-zinc-900/40 p-5 rounded-lg border border-zinc-900 hover:border-zinc-800 transition-all duration-300 select-none overflow-hidden"
        >
          {/* Subtle grid HUD accents */}
          <div className="absolute top-0 right-0 p-1.5 font-mono text-[9px] text-zinc-700 select-none tracking-widest group-hover:text-zinc-500 transition-colors">
            NODE_{String(idx + 1).padStart(2, "0")}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-zinc-900/80 border border-zinc-850 rounded-md group-hover:border-amber-500/20 group-hover:bg-zinc-950 transition-all duration-300">
                {getIcon(role.iconName)}
              </div>
              <h4 className="font-display font-medium text-xs sm:text-sm text-zinc-200 group-hover:text-white transition-colors">
                {role.title}
              </h4>
            </div>

            <p className="text-zinc-400 hover:text-zinc-300 text-xs leading-relaxed mb-5 font-sans min-h-[48px]">
              {role.roleDescription}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-900/80 mt-auto">
             <div className="flex items-center justify-between mb-1.5">
               <span className="text-[9px] font-mono text-zinc-500 group-hover:text-amber-500/80 uppercase tracking-widest transition-colors">
                 AI ENGINE CO-PILOT
               </span>
               <span className="text-[9px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-905">
                 PASSIVE
               </span>
             </div>
             <p className="text-[11px] text-zinc-450 leading-relaxed font-sans">
               {role.howAiHelps}
             </p>
          </div>
        </div>
      ))}
    </div>
  );
}
