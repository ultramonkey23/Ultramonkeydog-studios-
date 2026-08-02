import type { ReactNode } from "react";

import ProceduralField from "./ProceduralField";

interface StudioFieldShellProps {
  children: ReactNode;
}

export default function StudioFieldShell({ children }: StudioFieldShellProps) {
  return (
    <div className="studio-field-shell">
      <ProceduralField
        seed="ultramonkeydog-studios-public-field-2026"
        variant="studio"
        className="studio-field-shell__field"
      />
      <div className="studio-field-shell__content">{children}</div>
    </div>
  );
}
