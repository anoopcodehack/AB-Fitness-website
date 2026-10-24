import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Home, MapPin, ArrowLeft } from "lucide-react";
import logoImg from "@/imports/image-10.png";

type Colors = {
  bg: string;
  card: string;
  surface: string;
  orange: string;
  cyan: string;
  lime: string;
  text: string;
  muted: string;
  border: string;
  isDark: boolean;
};

const DARK: Colors = {
  bg: "#080808",
  card: "#0f0f0f",
  surface: "#161616",
  orange: "#ff4800",
  cyan: "#00d4ff",
  lime: "#b3ff00",
  text: "#f0f0f0",
  muted: "#888888",
  border: "#ffffff12",
  isDark: true,
};

const LIGHT: Colors = {
  bg: "#f4f4f4",
  card: "#ffffff",
  surface: "#ebebeb",
  orange: "#d93c08",
  cyan: "#007aaa",
  lime: "#3d7000",
  text: "#0d0d0d",
  muted: "#666666",
  border: "rgba(0,0,0,0.09)",
  isDark: false,
};

export default function NotFound() {
  const navigate = useNavigate();
  const [isDark] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem("ab-theme");
      if (s === "dark") return true;
      if (s === "light") return false;
    } catch {}
    return true;
  });

  const c = isDark ? DARK : LIGHT;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: c.bg, color: c.text }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.orange}18 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative z-10 max-w-lg w-full text-center p-8 sm:p-10 rounded-[28px] border"
        style={{
          background: c.card,
          borderColor: c.border,
          boxShadow: c.isDark ? "0 20px 60px rgba(0,0,0,0.6)" : "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img
            src={logoImg}
            alt="AB Fitness"
            className="w-12 h-12 rounded-full object-cover border"
            style={{ borderColor: `${c.orange}55` }}
          />
          <div className="text-left">
            <div
              className="font-black text-[16px] tracking-wider leading-none uppercase"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              AB FITNESS HUB
            </div>
            <div
              className="text-[10px] font-bold tracking-[0.25em] uppercase"
              style={{ color: c.orange }}
            >
              Mangalore
            </div>
          </div>
        </div>

        {/* 404 Visual */}
        <div className="relative inline-flex items-center justify-center my-4">
          <span
            className="text-[96px] sm:text-[120px] font-black tracking-tighter leading-none select-none opacity-20"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              color: c.text,
            }}
          >
            404
          </span>
          <div
            className="absolute w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg"
            style={{
              background: `${c.orange}18`,
              borderColor: `${c.orange}44`,
              color: c.orange,
            }}
          >
            <Dumbbell size={32} />
          </div>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          Lost Your Rep?
        </h1>
        <p className="text-sm font-light mb-8 max-w-sm mx-auto" style={{ color: c.muted }}>
          The page you are looking for has been moved or doesn't exist. Let's get you back to your
          workout!
        </p>

        {/* Action navigation buttons */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => navigate("/kavoor")}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer"
            style={{
              background: c.orange,
              color: "#fff",
              boxShadow: `0 4px 16px ${c.orange}44`,
            }}
          >
            <MapPin size={14} /> Kavoor Branch
          </button>

          <button
            onClick={() => navigate("/deralakatte")}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer"
            style={{
              background: c.surface,
              border: `1px solid ${c.border}`,
              color: c.text,
            }}
          >
            <MapPin size={14} /> Deralakatte Branch
          </button>
        </div>

        <div
          className="flex items-center justify-center gap-3 pt-4 border-t"
          style={{ borderColor: c.border }}
        >
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-80 cursor-pointer"
            style={{ color: c.muted }}
          >
            <Home size={13} /> Select Branch Home
          </button>
          <span style={{ color: c.border }}>•</span>
          <button
            onClick={() => navigate("/protein-hub")}
            className="inline-flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-80 cursor-pointer"
            style={{ color: c.cyan }}
          >
            Protein Hub Cafe
          </button>
        </div>
      </div>
    </div>
  );
}
