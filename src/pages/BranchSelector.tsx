// Branch Selector - AB Fitness multi-branch landing
import { useState, useEffect, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Sun, Moon, MapPin } from "lucide-react"
import logoImg from "@/imports/image-10.png"

type Colors = { bg: string; card: string; surface: string; orange: string; cyan: string; lime: string; text: string; muted: string; border: string; isDark: boolean }
const DARK: Colors = { bg: "#080808", card: "#0f0f0f", surface: "#161616", orange: "#ff4800", cyan: "#00d4ff", lime: "#b3ff00", text: "#f0f0f0", muted: "#888888", border: "#ffffff10", isDark: true }
const LIGHT: Colors = { bg: "#f4f4f4", card: "#ffffff", surface: "#ebebeb", orange: "#d93c08", cyan: "#007aaa", lime: "#3d7000", text: "#0d0d0d", muted: "#666666", border: "rgba(0,0,0,0.09)", isDark: false }
type TC = { isDark: boolean; toggle: () => void }
const TCtx = createContext<TC>({ isDark: true, toggle: () => {} })
const useTheme = () => useContext(TCtx)
const useC = (): Colors => useTheme().isDark ? DARK : LIGHT

function TP({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem("ab-theme")
      if (s === "dark") return true
      if (s === "light") return false
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const toggle = () => {
    document.documentElement.classList.add("theme-switching")
    setIsDark(p => {
      const n = !p
      try { localStorage.setItem("ab-theme", n ? "dark" : "light") } catch {}
      return n
    })
    setTimeout(() => document.documentElement.classList.remove("theme-switching"), 450)
  }
  return <TCtx.Provider value={{ isDark, toggle }}>{children}</TCtx.Provider>
}

function Logo({ size = 40 }: { size?: number }) {
  return <img src={logoImg} alt="AB Fitness" style={{ width: size, height: size, objectFit: "contain" }} />
}

const IK = "ab-intro-played"

// ─── CINEMATIC INTRO ──────────────────────────────────────────────────────────
// Timing constants (ms) — easy to tune
const INTRO_TIMING = {
  logoDelay: 0,
  wordmarkDelay: 550,
  quoteDelay: 950,
  progressDelay: 1350,
  exitStart: 2700, // when content starts fading
  unmount: 3380, // when overlay is fully gone
} as const

function CinematicIntro({ onDone }: { onDone: () => void }) {
  const c = useC()
  const [logoIn, setLogoIn] = useState(false)
  const [glowActive, setGlowActive] = useState(false)
  const [wordmarkIn, setWordmarkIn] = useState(false)
  const [quoteIn, setQuoteIn] = useState(false)
  const [progressIn, setProgressIn] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t0 = setTimeout(() => setLogoIn(true), INTRO_TIMING.logoDelay)
    const t1 = setTimeout(() => setGlowActive(true), 650)
    const t2 = setTimeout(() => setWordmarkIn(true), INTRO_TIMING.wordmarkDelay)
    const t3 = setTimeout(() => setQuoteIn(true), INTRO_TIMING.quoteDelay)
    const t4 = setTimeout(() => setProgressIn(true), INTRO_TIMING.progressDelay)
    const t5 = setTimeout(() => setExiting(true), INTRO_TIMING.exitStart)
    const t6 = setTimeout(() => {
      try { sessionStorage.setItem(IK, "1") } catch {}
      onDone()
    }, INTRO_TIMING.unmount)
    return () => [t0, t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
  }, [onDone])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden${
        exiting ? " intro-overlay-exit" : ""
      }`}
      style={{ background: "#080808" }}
    >
      {/* Ambient radial — deliberately subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${c.orange}12 0%, transparent 70%)`,
        }}
      />

      {/* Thin scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Content block */}
      <div
        className={`flex flex-col items-center gap-0 select-none${
          exiting ? " intro-content-exit" : ""
        }`}
      >
        {/* Logo */}
        <div className={`opacity-0${logoIn ? " intro-logo-in" : ""}`}>
          <div
            className={glowActive ? "intro-logo-glow" : ""}
            style={{ borderRadius: "50%" }}
          >
            <img
              src={logoImg}
              alt="AB Fitness Hub"
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                boxShadow: `0 0 0 1.5px ${c.orange}80, 0 0 32px ${c.orange}33`,
              }}
            />
          </div>
        </div>

        {/* Wordmark */}
        <div
          className={`mt-5 opacity-0${wordmarkIn ? " intro-wordmark-in" : ""}`}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
              fontWeight: 800,
              letterSpacing: "0.35em",
              color: c.text,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            AB FITNESS HUB
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.45em",
              color: c.orange,
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            MANGALORE
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-7 mb-6 opacity-0${
            wordmarkIn ? " intro-wordmark-in" : ""
          }`}
          style={{ width: 32, height: 1, background: `${c.orange}66` }}
        />

        {/* Quote */}
        <div className={`opacity-0 px-6${quoteIn ? " intro-quote-in" : ""}`}>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: c.muted,
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            DISCIPLINE&nbsp;&nbsp;&middot;&nbsp;&nbsp;STRENGTH&nbsp;&nbsp;&middot;&nbsp;&nbsp;CONSISTENCY
          </p>
        </div>

        {/* Progress line */}
        <div
          className={`mt-8 opacity-0${progressIn ? " intro-quote-in" : ""}`}
          style={{
            width: "clamp(100px, 20vw, 140px)",
            height: 1.5,
            background: c.border,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            className={progressIn ? "intro-progress-fill" : ""}
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, ${c.orange}, #ff8c00)`,
              borderRadius: 2,
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
// ────────────────────────────────────────────────────────────────────────────

function BranchCard({ name, location, desc, href, accent, badge }: { name: string; location: string; desc: string; href: string; accent: string; badge?: string }) {
  const c = useC()
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(href)} className="group relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]" style={{ background: c.card, border: `1px solid ${c.border}`, boxShadow: c.isDark ? "0 0 40px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.1)" }}>
      <div className="h-1.5 w-full" style={{ background: accent }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 60%)` }} />
      {badge && (
        <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}>{badge}</div>
      )}
      <div className="p-8 sm:p-10 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${accent}18` }}>
            <Logo size={36} />
          </div>
          <div>
            <h2 className="font-black text-[28px] sm:text-[36px] uppercase leading-none" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>{name}</h2>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mt-1.5" style={{ color: accent }}>
              <MapPin size={11} /> {location}
            </div>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed mb-8 max-w-sm" style={{ color: c.muted }}>{desc}</p>
        <div className="flex items-center gap-3" style={{ color: accent }}>
          <span className="text-[13px] font-bold uppercase tracking-wider">Explore {name}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function BranchSelectorContent() {
  const c = useC()
  const { isDark, toggle } = useTheme()
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try { return !sessionStorage.getItem(IK) } catch { return false }
  })
  const done = () => { try { sessionStorage.setItem(IK, "1") } catch {}; setShowIntro(false) }
  return (
    <div style={{ background: c.bg, minHeight: "100vh", width: "100%" }}>
      {showIntro && <CinematicIntro onDone={done} />}
      {!showIntro && (
        <>
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 h-20" style={{ background: c.isDark ? "rgba(8,8,8,0.95)" : "rgba(244,244,244,0.96)", borderBottom: `1px solid ${c.isDark ? "#ff480022" : "rgba(217,60,8,0.2)"}`, backdropFilter: "blur(20px)" }}>
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <div>
                <div className="font-black text-[16px] leading-none uppercase tracking-wider" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>AB Fitness Hub</div>
                <div className="text-[9px] font-medium uppercase tracking-[0.25em] mt-0.5" style={{ color: c.orange }}>Mangalore</div>
              </div>
            </div>
            <button onClick={toggle} className="relative w-12 h-6 rounded-full" style={{ background: c.card, border: `1px solid ${c.border}` }} aria-label="Toggle theme">
              <div className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: c.orange, left: isDark ? "4px" : "24px", boxShadow: `0 0 8px ${c.orange}` }}>
                {isDark ? <Moon size={10} color="white" /> : <Sun size={10} color="white" />}
              </div>
            </button>
          </header>

          <main className="pt-32 pb-20 px-6 sm:px-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="h-px w-10 rounded-full" style={{ background: c.orange, boxShadow: c.isDark ? `0 0 8px ${c.orange}` : "none" }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: c.orange }}>Select Your Location</span>
                  <div className="h-px w-10 rounded-full" style={{ background: c.orange, boxShadow: c.isDark ? `0 0 8px ${c.orange}` : "none" }} />
                </div>
                <h1 className="font-black uppercase leading-tight mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>
                  Choose Your <span style={{ color: c.orange }}>Branch</span>
                </h1>
                <p className="text-[15px] max-w-lg mx-auto" style={{ color: c.muted }}>
                  Select the AB Fitness Hub location closest to you to explore our facilities, trainers, and programs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <BranchCard
                  name="Kavoor"
                  location="Mangalore"
                  desc="Our flagship branch in Kavoor featuring state-of-the-art equipment, expert trainers, and a motivating atmosphere for your fitness journey."
                  href="/kavoor"
                  accent={c.orange}
                  badge="Flagship"
                />
                <BranchCard
                  name="Deralakatte"
                  location="Mangalore"
                  desc="Our newest branch in Deralakatte bringing premium fitness facilities and expert guidance to the community."
                  href="/deralakatte"
                  accent={c.cyan}
                  badge="New"
                />
              </div>

              <div className="text-center mt-14">
                <p className="text-[12px]" style={{ color: c.muted }}>More locations coming soon. Stay tuned!</p>
              </div>
            </div>
          </main>

          <footer className="py-8 px-6 text-center" style={{ borderTop: `1px solid ${c.border}` }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Logo size={24} />
              <span className="font-bold text-[13px] uppercase tracking-wider" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>AB Fitness Hub</span>
            </div>
            <p className="text-[11px]" style={{ color: c.muted }}>© 2026 AB Fitness Hub, Mangalore. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  )
}

export default function BranchSelector() {
  return (
    <TP>
      <BranchSelectorContent />
    </TP>
  )
}