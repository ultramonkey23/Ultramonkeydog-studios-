import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";

import App from "./App.tsx";
import StudioFieldShell from "./components/StudioFieldShell";
import { installReducedMotionScrollGuard } from "./reduced-motion-scroll";
import "./index.css";
import "./procedural-shell.css";
import "./procedural-rendering.css";

installReducedMotionScrollGuard();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <StudioFieldShell>
        <App />
      </StudioFieldShell>
    </MotionConfig>
  </StrictMode>,
);
