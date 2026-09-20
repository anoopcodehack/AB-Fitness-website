// AB Protein Hub — Deralakatte menu page
import { useState, useEffect, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Sun, Moon } from "lucide-react"
import logoImg from "@/imports/image-10.png"
import menuPhotoImg from "@/imports/AB fitness menu.png"

// ─── INLINE SVG ICONS (no emoji) ─────────────────────────────────────────────
function SvgIcon({ name, size = 20, color }: { name: string; size?: number; color: string }) {
  const icons: Record<string, React.ReactElement> = {
    cup: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" fill={color + "11"} />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" fill={color + "22"} />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    bowl: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z" fill={color + "22"} />
        <path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10" />
        <line x1="12" y1="12" x2="12" y2="22" />
      </svg>
    ),
    salad: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21h10M12 21V11" />
        <path d="M12 11C10 9 7 9 5 11c2 0 4 1 5 2" fill={color + "11"} />
        <path d="M12 11c2-2 5-2 7 0-2 0-4 1-5 2" fill={color + "11"} />
        <path d="M12 7c0-2 2-4 4-4-1 2-1 4 0 5" />
        <path d="M12 7c0-2-2-4-4-4 1 2 1 4 0 5" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color + "22"} />
      </svg>
    ),
    flame: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A4.5 4.5 0 0 0 12 19a4.5 4.5 0 0 0 3.5-4.5C15.5 11 12 8 12 8s-.5 2-2 3c-1 .7-1.5 2-1.5 3.5z" fill={color + "33"} />
        <path d="M12 8C12 8 9 5 9 3c3 0 6 2 6 6 0 2-1.5 3.5-1.5 3.5" />
      </svg>
    ),
    delivery: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" fill={color + "11"} />
        <path d="M16 8h4l3 3v5h-7V8z" fill={color + "11"} />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.8 13.7 19.8 19.8 0 0 1 2.7 5a2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.9 10.4a16 16 0 0 0 5.7 5.7l1-1a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.5 2.5z" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill={color + "22"} />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  }
  return (
    <span style={{ display: "inline-flex", width: size, height: size, flexShrink: 0 }}>
      {icons[name] ?? icons["check"]}
    </span>
  )
}

// ─── THEME (mirrors Deralakatte) ──────────────────────────────────────────────
type Colors = {
  bg: string; card: string; surface: string; orange: string; cyan: string
  lime: string; text: string; muted: string; faint: string; border: string
  borderFaint: string; navBg: string; navBorder: string; mobileMenuBg: string; isDark: boolean
}
const DARK_C: Colors = {
  bg: "#080808", card: "#0f0f0f", surface: "#161616",
  orange: "#ff4800", cyan: "#00d4ff", lime: "#b3ff00",
  text: "#f0f0f0", muted: "#888888", faint: "#ffffff0a",
  border: "#ffffff10", borderFaint: "#ffffff08",
  navBg: "rgba(8,8,8,0.95)", navBorder: "#ff480022",
  mobileMenuBg: "#0a0a0a", isDark: true,
}
const LIGHT_C: Colors = {
  bg: "#f4f4f4", card: "#ffffff", surface: "#ebebeb",
  orange: "#d93c08", cyan: "#007aaa", lime: "#3d7000",
  text: "#0d0d0d", muted: "#666666", faint: "#00000007",
  border: "rgba(0,0,0,0.09)", borderFaint: "rgba(0,0,0,0.06)",
  navBg: "rgba(244,244,244,0.96)", navBorder: "rgba(217,60,8,0.2)",
  mobileMenuBg: "#eeeeee", isDark: false,
}
type ThemeCtx = { isDark: boolean; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ isDark: true, toggle: () => {} })
const useTheme = () => useContext(ThemeContext)
const useC = (): Colors => useTheme().isDark ? DARK_C : LIGHT_C

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("ab-theme")
    if (saved === "dark") return true
    if (saved === "light") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const toggle = () => {
    document.documentElement.classList.add("theme-switching")
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem("ab-theme", next ? "dark" : "light")
      return next
    })
    setTimeout(() => document.documentElement.classList.remove("theme-switching"), 450)
  }
  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative", display: "inline-flex", alignItems: "center",
        width: 62, height: 30, borderRadius: 15,
        background: isDark ? "#1c1c1c" : "#e0e0e0",
        border: `1.5px solid ${isDark ? "rgba(255,72,0,0.3)" : "rgba(0,0,0,0.15)"}`,
        cursor: "pointer", flexShrink: 0,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <span style={{ position: "absolute", left: 6, display: "flex", alignItems: "center", opacity: isDark ? 1 : 0, transition: "opacity 0.2s" }}>
        <Moon size={11} color="#00d4ff" />
      </span>
      <span style={{ position: "absolute", right: 6, display: "flex", alignItems: "center", opacity: isDark ? 0 : 1, transition: "opacity 0.2s" }}>
        <Sun size={11} color="#d93c08" />
      </span>
      <span style={{
        position: "absolute", width: 22, height: 22, borderRadius: "50%",
        background: isDark ? "#ff4800" : "#d93c08",
        left: isDark ? 34 : 4,
        transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: isDark ? "0 0 8px rgba(255,72,0,0.5)" : "0 1px 4px rgba(0,0,0,0.25)",
      }}>
        {isDark ? <Moon size={11} color="#fff" /> : <Sun size={11} color="#fff" />}
      </span>
    </button>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const c = useC()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? c.navBg : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.navBorder}` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[66px]">
        {/* Logo + wordmark */}
        <button onClick={() => navigate("/deralakatte")} className="flex items-center gap-2.5 cursor-pointer" style={{ background: "none", border: "none" }}>
          <img src={logoImg} alt="AB Fitness Hub" width={40} height={40} className="rounded-full object-cover" style={{ boxShadow: `0 0 0 1.5px ${c.orange}66` }} />
          <div>
            <div className="font-bold text-[13px] leading-none" style={{ fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.12em", color: c.text }}>
              AB FITNESS HUB
            </div>
            <div className="text-[9px] font-semibold tracking-[0.3em] uppercase" style={{ color: c.orange }}>
              Protein Hub · Deralakatte
            </div>
          </div>
        </button>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => navigate("/deralakatte")}
            className="inline-flex items-center gap-2 font-semibold text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
            style={{ background: c.orange, color: "#fff", boxShadow: c.isDark ? `0 0 20px ${c.orange}55` : `0 2px 12px ${c.orange}55` }}
          >
            ← Back to Gym
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="p-2" style={{ color: c.text }} onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={`block w-5 h-0.5 mb-1.5 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} style={{ background: c.text }} />
            <span className={`block w-5 h-0.5 mb-1.5 transition-all ${open ? "opacity-0" : ""}`} style={{ background: c.text }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: c.text }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}
        style={{ background: c.mobileMenuBg, borderTop: `1px solid ${c.navBorder}` }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <button
            onClick={() => { setOpen(false); navigate("/deralakatte") }}
            className="font-semibold text-sm text-left"
            style={{ color: c.orange, background: "none", border: "none", cursor: "pointer" }}
          >
            ← Back to Gym
          </button>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO BANNER ──────────────────────────────────────────────────────────────
function Hero() {
  const c = useC()
  return (
    <section
      className="relative pt-[66px] pb-0 overflow-hidden"
      style={{ background: c.isDark ? "#0a0500" : "#fff8f5" }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${c.orange}14 0%, transparent 70%)` }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center relative z-10">
        {/* Icon badge */}
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] mb-6 mx-auto"
          style={{ background: `${c.orange}18`, border: `2px solid ${c.orange}44`, boxShadow: c.isDark ? `0 0 32px ${c.orange}33` : "none" }}
        >
          <SvgIcon name="cup" size={44} color={c.orange} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: `${c.orange}18`, border: `1px solid ${c.orange}44` }}>
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: c.orange }}>AB Fitness Hub</span>
        </div>

        <h1
          className="font-black uppercase leading-tight mb-3"
          style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(2.6rem,7vw,4.5rem)", color: c.text }}
        >
          AB{" "}
          <span style={{ color: c.orange, textShadow: c.isDark ? `0 0 40px ${c.orange}88` : "none" }}>
            PROTEIN
          </span>{" "}
          HUB
        </h1>

        <p className="text-[14px] leading-relaxed mb-3 max-w-lg mx-auto" style={{ color: c.muted }}>
          Hotel Plaza Avenue, beside NITTE University, near Yenepoya Hospital,<br />
          Deralakatte, Ullal, Karnataka 575018
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a
            href="tel:8075506251"
            className="inline-flex items-center gap-2 font-bold text-[13px] px-5 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ background: c.orange, color: "#fff", boxShadow: c.isDark ? `0 0 20px ${c.orange}55` : `0 2px 12px ${c.orange}44` }}
          >
            <SvgIcon name="phone" size={15} color="#fff" /> 8075506251
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold" style={{ background: c.card, border: `1px solid ${c.border}`, color: c.muted }}>
            <SvgIcon name="delivery" size={15} color={c.muted} /> Available on Swiggy &amp; Zomato
          </div>
        </div>

        {/* Ticker strip */}
        <div
          className="rounded-[14px] px-6 py-3 text-[12px] font-bold uppercase tracking-widest"
          style={{ background: c.orange, color: "#fff", boxShadow: c.isDark ? `0 0 24px ${c.orange}66` : "none" }}
        >
          Protein Shakes &nbsp;·&nbsp; Smoothies &nbsp;·&nbsp; Oats &amp; Bowls &nbsp;·&nbsp; Salads &amp; Sandwiches &nbsp;·&nbsp; Fresh Juices &nbsp;·&nbsp; Milkshakes &nbsp;·&nbsp; Power Combos
        </div>
      </div>
    </section>
  )
}

// ─── MENU CARD COMPONENT ──────────────────────────────────────────────────────
function MenuCard({ icon, title, subtitle, items, accent }: {
  icon: string
  title: string
  subtitle?: string
  items: { name: string; price: string; note?: string }[]
  accent: string
}) {
  const c = useC()
  return (
    <div
      className="rounded-[22px] overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        boxShadow: c.isDark ? "none" : "0 2px 16px rgba(0,0,0,0.07)",
      }}
    >
      {/* Header bar */}
      <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${accent}18`, borderBottom: `1px solid ${accent}33` }}>
        <div
          className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-transform duration-300 hover:scale-110"
          style={{ background: `${accent}22` }}
        >
          <SvgIcon name={icon} size={22} color={accent} />
        </div>
        <div>
          <div className="font-black text-[15px] uppercase tracking-wide" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>
            {title}
          </div>
          {subtitle && <div className="text-[11px] mt-0.5 italic" style={{ color: c.muted }}>{subtitle}</div>}
        </div>
        <div className="ml-auto w-2 h-2 rounded-full" style={{ background: accent, boxShadow: c.isDark ? `0 0 8px ${accent}` : "none" }} />
      </div>

      {/* Items */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SvgIcon name="check" size={12} color={accent} />
              <span className="text-[13px]" style={{ color: c.muted }}>{item.name}</span>
              {item.note && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${accent}22`, color: accent }}>{item.note}</span>}
            </div>
            <span className="font-bold text-[13px] shrink-0" style={{ color: accent }}>₹{item.price}/-</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── HYDRATION TABLE ──────────────────────────────────────────────────────────
function HydrationTable() {
  const c = useC()
  const accent = "#00d4ff"

  const juices = [
    { name: "ABC", price: "80" },
    { name: "Mix Fruit", price: "80" },
    { name: "Pineapple", price: "60" },
    { name: "Pine Malon", price: "60" },
    { name: "Maskmelon", price: "60" },
    { name: "Watermelon", price: "50" },
  ]
  const milkshakes = [
    { name: "Mix Fruit", price: "100" },
    { name: "Dry Fruit", price: "100" },
    { name: "Apple / Mango", price: "80" },
    { name: "Strawberry / Blueberry", price: "80" },
    { name: "Dates / Banana", price: "80" },
    { name: "Pineapple / Grape", price: "70" },
  ]

  return (
    <div
      className="rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: c.card, border: `1px solid ${c.border}`, boxShadow: c.isDark ? "none" : "0 2px 16px rgba(0,0,0,0.07)" }}
    >
      <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${accent}18`, borderBottom: `1px solid ${accent}33` }}>
        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: `${accent}22` }}>
          <SvgIcon name="zap" size={22} color={accent} />
        </div>
        <div>
          <div className="font-black text-[15px] uppercase tracking-wide" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>
            Hydration &amp; Refreshers
          </div>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full" style={{ background: accent, boxShadow: c.isDark ? `0 0 8px ${accent}` : "none" }} />
      </div>

      <div className="p-5 grid grid-cols-2 gap-4">
        {/* Fresh Juices */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3 pb-1.5" style={{ color: accent, borderBottom: `1px solid ${accent}33` }}>
            Fresh Juices
          </div>
          {juices.map(j => (
            <div key={j.name} className="flex justify-between items-center py-1.5 text-[12px]" style={{ borderBottom: `1px solid ${c.borderFaint}` }}>
              <span style={{ color: c.muted }}>{j.name}</span>
              <span className="font-bold" style={{ color: accent }}>₹{j.price}/-</span>
            </div>
          ))}
        </div>
        {/* Milkshakes */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3 pb-1.5" style={{ color: accent, borderBottom: `1px solid ${accent}33` }}>
            Milkshakes
          </div>
          {milkshakes.map(m => (
            <div key={m.name} className="flex justify-between items-center py-1.5 text-[12px]" style={{ borderBottom: `1px solid ${c.borderFaint}` }}>
              <span style={{ color: c.muted }}>{m.name}</span>
              <span className="font-bold" style={{ color: accent }}>₹{m.price}/-</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── POWER COMBOS ─────────────────────────────────────────────────────────────
function PowerCombos() {
  const c = useC()
  const accent = "#ff4800"

  const combos = [
    { name: "Salad + Protein Shake", price: "215" },
    { name: "Salad + Smoothie", price: "195" },
    { name: "Sandwich + Protein Shake", price: "195" },
    { name: "Sandwich + Smoothie", price: "185" },
    { name: "Salad + Fresh Juice", price: "180" },
    { name: "Sandwich + Fresh Juice", price: "160" },
  ]

  return (
    <div
      className="rounded-[22px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: c.isDark
          ? `linear-gradient(135deg, ${accent}22 0%, ${c.card} 60%)`
          : c.card,
        border: `1px solid ${accent}44`,
        boxShadow: c.isDark ? `0 0 32px ${accent}18` : "0 2px 16px rgba(0,0,0,0.07)",
      }}
    >
      <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${accent}22`, borderBottom: `1px solid ${accent}44` }}>
        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: `${accent}22` }}>
          <SvgIcon name="flame" size={22} color={accent} />
        </div>
        <div>
          <div className="font-black text-[15px] uppercase tracking-wide" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>
            Power Combos
          </div>
          <div className="text-[11px] mt-0.5 italic" style={{ color: c.muted }}>The Ultimate Gym Fuel</div>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest" style={{ background: accent, color: "#fff" }}>Best Value</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {combos.map((combo, i) => (
          <div
            key={combo.name}
            className="flex items-center justify-between gap-4 px-4 py-3 rounded-[14px] transition-all hover:scale-[1.01]"
            style={{
              background: i % 2 === 0 ? `${accent}10` : c.faint,
              border: `1px solid ${accent}22`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <SvgIcon name="arrow" size={14} color={accent} />
              <span className="text-[13px] font-medium" style={{ color: c.text }}>{combo.name}</span>
            </div>
            <span
              className="font-black text-[15px] shrink-0"
              style={{ fontFamily: "Barlow Condensed, sans-serif", color: accent, textShadow: c.isDark ? `0 0 12px ${accent}88` : "none" }}
            >
              ₹{combo.price}/-
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN MENU SECTION ────────────────────────────────────────────────────────
function MenuSection() {
  const c = useC()

  return (
    <section style={{ background: c.bg, paddingBottom: 80 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">

        {/* Section label */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: `${c.orange}18`, border: `1px solid ${c.orange}33` }}>
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: c.orange }}>Full Menu</span>
          </div>
          <h2 className="font-black uppercase" style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(2rem,5vw,3rem)", color: c.text }}>
            Fuel Your{" "}
            <span style={{ color: c.orange }}>Performance</span>
          </h2>
          <p className="text-[14px] mt-2 max-w-md mx-auto" style={{ color: c.muted }}>
            All prices in INR. Fresh, healthy, and made for your fitness goals.
          </p>
        </div>

        {/* Row 1 — Protein Shakes + Smoothies */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <MenuCard
            icon="cup"
            title="Protein Shakes"
            subtitle="Premium recovery for peak performance."
            accent={c.orange}
            items={[
              { name: "Dry Fruit", price: "180" },
              { name: "Apple Cinnamon", price: "160" },
              { name: "Peanut Butter", price: "150" },
              { name: "Chocolate Cream", price: "150" },
              { name: "Coffee", price: "150" },
              { name: "Banana Dates", price: "130" },
              { name: "Vanilla", price: "150" },
            ]}
          />
          <MenuCard
            icon="leaf"
            title="Smoothies"
            subtitle="Natural energy & nutrient boost."
            accent={c.lime}
            items={[
              { name: "Dry Fruit", price: "130" },
              { name: "Blueberry / Strawberry / Mango", price: "120" },
              { name: "Chocolate Cream", price: "150" },
              { name: "Dates / Grape", price: "150" },
              { name: "Oats / Banana", price: "80" },
            ]}
          />
        </div>

        {/* Row 2 — Oats & Bowls + Salads & Sandwiches */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <MenuCard
            icon="bowl"
            title="Oats & Bowls"
            subtitle="Perfect pre or post-workout fuel."
            accent={c.cyan}
            items={[
              { name: "Nutty Fruit", price: "130" },
              { name: "Rolled Oats with Chia", price: "100" },
              { name: "Oats Mix Fruit / Chocolate Bowl", price: "100" },
            ]}
          />
          <MenuCard
            icon="salad"
            title="Salads & Sandwiches"
            accent={c.lime}
            items={[
              { name: "Fruit Salad Bowl", price: "150" },
              { name: "Veg Salad", price: "120" },
              { name: "Choco-PB Banana Sandwich", price: "100" },
              { name: "PB Banana Sandwich", price: "80" },
            ]}
          />
        </div>

        {/* Row 3 — Hydration full width */}
        <div className="mb-5">
          <HydrationTable />
        </div>

        {/* Row 4 — Power Combos full width */}
        <div className="mb-5">
          <PowerCombos />
        </div>

        {/* ── ACTUAL MENU PHOTO ── */}
        <div className="mb-5">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
              style={{ background: `${c.orange}18`, border: `1px solid ${c.orange}33` }}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: c.orange }}>
                Our Menu
              </span>
            </div>
            <h3
              className="font-black uppercase"
              style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: c.text }}
            >
              The Full <span style={{ color: c.orange }}>Menu Board</span>
            </h3>
            <p className="text-[13px] mt-1" style={{ color: c.muted }}>
              Scan or read the complete in-store menu
            </p>
          </div>

          <div
            className="rounded-[24px] overflow-hidden"
            style={{
              border: `2px solid ${c.orange}44`,
              boxShadow: c.isDark
                ? `0 0 60px ${c.orange}18, 0 8px 40px rgba(0,0,0,0.4)`
                : `0 8px 40px rgba(0,0,0,0.12)`,
            }}
          >
            <img
              src={menuPhotoImg}
              alt="AB Protein Hub full menu"
              className="w-full h-auto block"
              style={{ display: "block", maxHeight: "90vh", objectFit: "contain", background: "#000" }}
            />
          </div>
        </div>

        {/* Swiggy / Zomato badge */}
        <div
          className="rounded-[18px] px-6 py-5 flex flex-wrap items-center justify-between gap-4"
          style={{ background: c.card, border: `1px solid ${c.border}` }}
        >
          <div>
            <div className="font-black text-[16px] uppercase" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>
              Order Online
            </div>
            <div className="text-[13px] mt-0.5" style={{ color: c.muted }}>
              Available on Swiggy &amp; Zomato — fresh delivery to your doorstep
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] font-bold text-[13px]" style={{ background: "#fc8019", color: "#fff" }}>
              <SvgIcon name="delivery" size={14} color="#fff" /> Swiggy
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] font-bold text-[13px]" style={{ background: "#e23744", color: "#fff" }}>
              <SvgIcon name="menu" size={14} color="#fff" /> Zomato
            </div>
          </div>
        </div>

        {/* Small print */}
        <p className="text-center text-[11px] mt-4" style={{ color: c.muted }}>
          Prices are in INR. Menu subject to change. Keep your menu clean.
        </p>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const c = useC()
  const navigate = useNavigate()
  return (
    <footer className="py-8 px-4 text-center" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
      <img src={logoImg} alt="AB Fitness Hub" width={36} height={36} className="rounded-full object-cover mx-auto mb-3" style={{ boxShadow: `0 0 0 1.5px ${c.orange}66` }} />
      <div className="font-black text-[14px] uppercase tracking-wider mb-1" style={{ fontFamily: "Barlow Condensed, sans-serif", color: c.text }}>
        AB Protein Hub
      </div>
      <div className="text-[11px] mb-4 flex items-center justify-center gap-1.5" style={{ color: c.muted }}>
        <SvgIcon name="location" size={12} color={c.muted} /> Hotel Plaza Avenue, Deralakatte, Mangalore
        <span className="mx-1">·</span>
        <SvgIcon name="phone" size={12} color={c.muted} /> 8075506251
      </div>
      <button
        onClick={() => navigate("/deralakatte")}
        className="inline-flex items-center gap-2 font-semibold text-[13px] px-5 py-2.5 rounded-full transition-all hover:scale-105"
        style={{ background: c.orange, color: "#fff", border: "none", cursor: "pointer", boxShadow: c.isDark ? `0 0 16px ${c.orange}44` : "none" }}
      >
        ← Back to AB Fitness Hub
      </button>
      <p className="text-[11px] mt-4" style={{ color: c.muted }}>
        © 2026 AB Fitness Hub, Deralakatte. All rights reserved.
      </p>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function ProteinHubContent() {
  const c = useC()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div style={{ background: c.bg, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <MenuSection />
      <Footer />
    </div>
  )
}

export default function ProteinHub() {
  return (
    <ThemeProvider>
      <ProteinHubContent />
    </ThemeProvider>
  )
}
