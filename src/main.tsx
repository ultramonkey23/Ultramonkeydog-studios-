import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import StudioFieldShell from "./components/StudioFieldShell";
import "./index.css";
import "./procedural-shell.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudioFieldShell>
      <App />
    </StudioFieldShell>
  </StrictMode>,
);
