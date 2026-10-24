import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

export type BranchSwitcherPillProps = {
  currentBranch: "kavoor" | "deralakatte";
  isDark?: boolean;
};

export default function BranchSwitcherPill({
  currentBranch,
  isDark = true,
}: BranchSwitcherPillProps) {
  const navigate = useNavigate();
  const targetBranch = currentBranch === "kavoor" ? "deralakatte" : "kavoor";
  const targetLabel = currentBranch === "kavoor" ? "Deralakatte Branch" : "Kavoor Branch";
  const targetDesc = currentBranch === "kavoor" ? "Plaza Ave, NITTE Univ" : "Durga Prasad Complex";

  return (
    <div
      className="inline-flex items-center gap-1.5 p-1 rounded-full text-xs border"
      style={{
        background: isDark ? "rgba(22, 22, 22, 0.85)" : "rgba(240, 240, 240, 0.85)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="px-2.5 py-1 rounded-full font-bold flex items-center gap-1 text-[11px]"
        style={{
          background: "#ff4800",
          color: "#ffffff",
        }}
      >
        <MapPin size={11} />
        <span>{currentBranch === "kavoor" ? "Kavoor" : "Deralakatte"}</span>
      </div>

      <button
        onClick={() => navigate(`/${targetBranch}`)}
        className="px-2.5 py-1 rounded-full font-medium text-[11px] flex items-center gap-1 transition-all hover:opacity-100 opacity-75 cursor-pointer"
        style={{ color: isDark ? "#f0f0f0" : "#111111" }}
        title={`Switch to ${targetLabel}`}
      >
        <span>Switch to {targetLabel}</span>
        <ArrowRight size={11} className="text-orange-500" />
      </button>

      <span className="opacity-30">|</span>

      <button
        onClick={() => navigate("/protein-hub")}
        className="px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors hover:text-cyan-400 cursor-pointer"
        style={{ color: isDark ? "#00d4ff" : "#007aaa" }}
        title="Visit AB Protein Hub Cafe"
      >
        Protein Hub 🥤
      </button>
    </div>
  );
}
