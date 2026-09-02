// AB Fitness - Multi-Branch Website
// Routes: / → BranchSelector, /kavoor → Kavoor, /deralakatte → Deralakatte

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import BranchSelector from "./pages/BranchSelector"
import KavoorPage from "./pages/Kavoor"
import DeralakattePage from "./pages/Deralakatte"

function AppRoutes() {
  const location = useLocation()
  
  return (
    <Routes location={location}>
      <Route path="/" element={<BranchSelector />} />
      <Route path="/kavoor" element={<KavoorPage />} />
      <Route path="/deralakatte" element={<DeralakattePage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}