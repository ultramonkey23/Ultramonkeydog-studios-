/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Cpu,
  Eye,
  FileText,
  FlaskConical,
  Layers,
  Megaphone,
  Palette,
  Terminal,
  Wrench,
} from "lucide-react";

import { PRODUCTION_ROLES } from "../data";
import StudioSignals from "./StudioSignals";

const iconMap = {
  Terminal,
  Cpu,
  Palette,
  FileText,
  Layers,
  Eye,
  Megaphone,
  FlaskConical,
} as const;

export default function MethodGrid() {
  return (
    <div id="method-grid-section">
      <StudioSignals />

      <div className="mb-6 max-w-3xl">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          Current production capabilities
        </p>
        <p className="mt-3 text-xs leading-6 text-zinc-400 sm:text-sm">
          AI extends research, implementation, analysis, and production throughput.
          Cody retains architecture, rejection pressure, taste, interpretation, and
          release authority.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTION_ROLES.map((role) => {
          const Icon = iconMap[role.iconName as keyof typeof iconMap] ?? Wrench;

          return (
            <article
              key={role.title}
              className="group flex h-full flex-col rounded-xl border border-white/7 bg-[linear-gradient(145deg,rgba(24,24,27,0.58),rgba(6,6,8,0.92))] p-5 transition-colors hover:border-amber-500/25"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-white/7 bg-black/25 p-2.5 text-zinc-500 transition-colors group-hover:text-amber-300">
                  <Icon size={18} />
                </div>
                <h4 className="font-display text-sm font-bold text-white">
                  {role.title}
                </h4>
              </div>

              <p className="mt-4 text-xs leading-6 text-zinc-400">
                {role.roleDescription}
              </p>

              <div className="mt-auto border-t border-white/6 pt-4">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                  AI contribution
                </p>
                <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                  {role.howAiHelps}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
