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
import "../method-material.css";

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

      <div className="mb-6 max-w-3xl border-l-4 border-[var(--umd-rust)] pl-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--umd-gold)]">
          Current production capabilities
        </p>
        <p className="mt-3 text-xs leading-6 text-[var(--umd-ash)] sm:text-sm">
          AI extends research, implementation, analysis, and production throughput.
          Cody retains architecture, rejection pressure, taste, interpretation, and
          release authority.
        </p>
      </div>

      <div className="method-capabilities">
        {PRODUCTION_ROLES.map((role, index) => {
          const Icon = iconMap[role.iconName as keyof typeof iconMap] ?? Wrench;

          return (
            <article key={role.title} className="method-capability">
              <div className="method-capability__index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="method-capability__identity">
                <div className="method-capability__icon">
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="font-display text-lg uppercase leading-none tracking-[0.02em] text-[var(--umd-bone)]">
                    {role.title}
                  </h4>
                  <p className="mt-3 text-xs leading-6 text-[var(--umd-ash)]">
                    {role.roleDescription}
                  </p>
                </div>
              </div>

              <div className="method-capability__ai">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--umd-bile)]">
                  AI contribution
                </p>
                <p className="mt-2 text-[11px] leading-5 text-[var(--umd-ash)]">
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
