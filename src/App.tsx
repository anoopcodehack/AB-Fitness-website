// AB Fitness - Multi-Branch Website
// Routes: / → BranchSelector, /kavoor → Kavoor, /deralakatte → Deralakatte, /protein-hub → ProteinHub, * → NotFound

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import BranchSelector from "./pages/BranchSelector";
import KavoorPage from "./pages/Kavoor";
import DeralakattePage from "./pages/Deralakatte";
import ProteinHubPage from "./pages/ProteinHub";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<BranchSelector />} />
        <Route path="/kavoor" element={<KavoorPage />} />
        <Route path="/deralakatte" element={<DeralakattePage />} />
        <Route path="/protein-hub" element={<ProteinHubPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Vercel Web Analytics tracker */}
      <Analytics />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
