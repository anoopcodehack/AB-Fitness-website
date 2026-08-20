import { useState, useEffect, useRef, createContext, useContext } from "react"
import { Sun, Moon } from "lucide-react"
import logoImg from "@/imports/image-10.png"
import galleryImg1 from "@/imports/image.png"
import galleryImg2 from "@/imports/image-17.png"
import galleryImg3 from "@/imports/image-18.png"
import galleryImg4 from "@/imports/image-16.png"
import galleryImg5 from "@/imports/image-19.png"
import galleryImg6 from "@/imports/image-20.png"
import trainer1Img from "@/imports/image-26.png"
import trainer2Img from "@/imports/WhatsApp_Image_2026-08-16_at_7.24.30_PM.jpeg"
import thareshImg from "@/imports/THARESH.png"
import sujayImg from "@/imports/SUJAY.png"
import gymVideo from "@/imports/AB_fitness_v.mp4"
import abtImg from "@/imports/ABabt.jpeg"
import eventFlyerImg from "@/imports/IMG-20260816-WA0003-1.jpg"

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────
type Colors = {
  bg: string
  card: string
  surface: string
  orange: string
  cyan: string
  lime: string
  text: string
  muted: string
  faint: string
  border: string
  borderFaint: string
  navBg: string
  navBorder: string
  mobileMenuBg: string
  inputBg: string
  inputBorder: string
  isDark: boolean
}

const DARK_C: Colors = {
  bg: "#080808",
  card: "#0f0f0f",
  surface: "#161616",
  orange: "#ff4800",
  cyan: "#00d4ff",
  lime: "#b3ff00",
  text: "#f0f0f0",
  muted: "#888888",
  faint: "#ffffff0a",
  border: "#ffffff10",
  borderFaint: "#ffffff08",
  navBg: "rgba(8,8,8,0.95)",
  navBorder: "#ff480022",
  mobileMenuBg: "#0a0a0a",
  inputBg: "#161616",
  inputBorder: "#ffffff10",
  isDark: true,
}

const LIGHT_C: Colors = {
  bg: "#f4f4f4",
  card: "#ffffff",
  surface: "#ebebeb",
  orange: "#d93c08",
  cyan: "#007aaa",
  lime: "#3d7000",
  text: "#0d0d0d",
  muted: "#666666",
  faint: "#00000007",
  border: "rgba(0,0,0,0.09)",
  borderFaint: "rgba(0,0,0,0.06)",
  navBg: "rgba(244,244,244,0.96)",
  navBorder: "rgba(217,60,8,0.2)",
  mobileMenuBg: "#eeeeee",
  inputBg: "#f9f9f9",
  inputBorder: "rgba(0,0,0,0.12)",
  isDark: false,
}

type ThemeCtx = { isDark: boolean; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ isDark: true, toggle: () => {} })
const useTheme = () => useContext(ThemeContext)
const useC = (): Colors => {
  const { isDark } = useTheme()
  return isDark ? DARK_C : LIGHT_C
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("ab-theme")
    if (saved === "dark") return true
    if (saved === "light") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  const toggle = () => {
    document.documentElement.classList.add("theme-switching")
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem("ab-theme", next ? "dark" : "light")
      return next
    })
    setTimeout(
      () => document.documentElement.classList.remove("theme-switching"),
      450,
    )
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

function useTilt<T extends HTMLElement = HTMLDivElement>(strength = 12) {
  const ref = useRef<T>(null)
  const onMove = (e: React.MouseEvent<T>) => {
    if (reducedMotion()) return
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * strength
    const y = ((e.clientY - top) / height - 0.5) * -strength
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateZ(8px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ""
  }
  return { ref, onMove, onLeave }
}

function useInView(threshold = 0.12, rootMargin = "0px 0px -48px 0px") {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])
  return { ref, visible }
}

// dir: 'up' | 'left' | 'right' | 'scale'
function Reveal({
  children,
  delay = 0,
  dir = "up",
  threshold = 0.12,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  dir?: "up" | "left" | "right" | "scale"
  threshold?: number
  className?: string
}) {
  const { ref, visible } = useInView(threshold)
  return (
    <div
      ref={ref}
      className={`rv rv-${dir}${visible ? " in" : ""} ${className}`}
      style={{ "--rv-d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// ─── SVG ICON LIBRARY ─────────────────────────────────────────────────────────
function Icon({
  name,
  size = 28,
  color,
  className = "",
}: {
  name: string
  size?: number
  color: string
  className?: string
}) {
  const icons: Record<string, React.ReactElement> = {
    dumbbell: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 6.5h11M6.5 17.5h11" />
        <rect x="2" y="5" width="3" height="14" rx="1.5" />
        <rect x="19" y="5" width="3" height="14" rx="1.5" />
        <rect x="5" y="9" width="2" height="6" rx="1" />
        <rect x="17" y="9" width="2" height="6" rx="1" />
      </svg>
    ),
    lightning: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon
          points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
          fill={color + "33"}
        />
      </svg>
    ),
    fist: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 11V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1" />
        <path d="M14 10V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6a8 8 0 0 0 16 0v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1" />
      </svg>
    ),
    lotus: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="2" />
        <path d="M12 10c-4 2-6 5-6 8h12c0-3-2-6-6-8z" />
        <path d="M6 18c-2-1-4-4-3-7" />
        <path d="M18 18c2-1 4-4 3-7" />
      </svg>
    ),
    running: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13" cy="4" r="1.5" />
        <path d="M5 21l5-5m4-6l3 3-3 5m-2-9l2-4 4 1-2 4" />
        <path d="M9 12l-4 3" />
      </svg>
    ),
    trophy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 21h8M12 17v4M7 4H4v2a4 4 0 0 0 3.5 3.97M17 4h3v2a4 4 0 0 1-3.5 3.97" />
        <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" fill={color + "22"} />
      </svg>
    ),
    diamond: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 22 12 12 22 2 12" fill={color + "22"} />
      </svg>
    ),
    group: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="7" r="3" />
        <path d="M1 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
        <path d="M17 11a4 4 0 0 1 4 4v2" />
      </svg>
    ),
    heart: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
          fill={color + "22"}
        />
      </svg>
    ),
    target: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
    ),
    shield: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          fill={color + "22"}
        />
      </svg>
    ),
    clock: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    location: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
          fill={color + "22"}
        />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    phone: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.8 13.7 19.8 19.8 0 0 1 2.7 5a2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.9 10.4a16 16 0 0 0 5.7 5.7l1-1a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.5 2.5z" />
      </svg>
    ),
    mail: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" fill={color + "11"} />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1.5">
        <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" />
      </svg>
    ),
    check: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrow: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    flame: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M8.5 14.5A4.5 4.5 0 0 0 12 19a4.5 4.5 0 0 0 3.5-4.5C15.5 11 12 8 12 8s-.5 2-2 3c-1 .7-1.5 2-1.5 3.5z"
          fill={color + "33"}
        />
        <path d="M12 8C12 8 9 5 9 3c3 0 6 2 6 6 0 2-1.5 3.5-1.5 3.5" />
      </svg>
    ),
    kettle: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="14" r="7" fill={color + "11"} />
        <rect x="10" y="4" width="4" height="4" rx="1" />
        <line x1="12" y1="8" x2="12" y2="7" />
      </svg>
    ),
  }
  return (
    <span
      className={className}
      style={{ display: "inline-flex", width: size, height: size }}
    >
      {icons[name] ?? icons["diamond"]}
    </span>
  )
}

// ─── CINEMATIC INTRO ──────────────────────────────────────────────────────────
const INTRO_SESSION_KEY = "ab-intro-played"

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
  const [logoIn, setLogoIn] = useState(false)
  const [glowActive, setGlowActive] = useState(false)
  const [wordmarkIn, setWordmarkIn] = useState(false)
  const [quoteIn, setQuoteIn] = useState(false)
  const [progressIn, setProgressIn] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // play logo rise immediately
    const t0 = setTimeout(() => setLogoIn(true), INTRO_TIMING.logoDelay)
    const t1 = setTimeout(() => setGlowActive(true), 650)
    const t2 = setTimeout(() => setWordmarkIn(true), INTRO_TIMING.wordmarkDelay)
    const t3 = setTimeout(() => setQuoteIn(true), INTRO_TIMING.quoteDelay)
    const t4 = setTimeout(() => setProgressIn(true), INTRO_TIMING.progressDelay)
    const t5 = setTimeout(() => setExiting(true), INTRO_TIMING.exitStart)
    const t6 = setTimeout(() => onDone(), INTRO_TIMING.unmount)
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
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,72,0,0.07) 0%, transparent 70%)",
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
                boxShadow:
                  "0 0 0 1.5px rgba(255,72,0,0.5), 0 0 32px rgba(255,72,0,0.2)",
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
              color: "#ffffff",
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
              color: "#ff4800",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            KAVOOR &middot; MANGALORE
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-7 mb-6 opacity-0${
            wordmarkIn ? " intro-wordmark-in" : ""
          }`}
          style={{ width: 32, height: 1, background: "rgba(255,72,0,0.4)" }}
        />

        {/* Quote */}
        <div className={`opacity-0 px-6${quoteIn ? " intro-quote-in" : ""}`}>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.45)",
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
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            className={progressIn ? "intro-progress-fill" : ""}
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #ff4800, #ff8c00)",
              borderRadius: 2,
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: 62,
        height: 30,
        borderRadius: 15,
        background: isDark ? "#1c1c1c" : "#e0e0e0",
        border: `1.5px solid ${
          isDark ? "rgba(255,72,0,0.3)" : "rgba(0,0,0,0.15)"
        }`,
        cursor: "pointer",
        flexShrink: 0,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* track icons */}
      <span
        style={{
          position: "absolute",
          left: 6,
          display: "flex",
          alignItems: "center",
          opacity: isDark ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <Moon size={11} color="#00d4ff" />
      </span>
      <span
        style={{
          position: "absolute",
          right: 6,
          display: "flex",
          alignItems: "center",
          opacity: isDark ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <Sun size={11} color="#d93c08" />
      </span>
      {/* sliding knob */}
      <span
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: isDark ? "#ff4800" : "#d93c08",
          left: isDark ? 34 : 4,
          transition:
            "left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isDark
            ? "0 0 8px rgba(255,72,0,0.5)"
            : "0 1px 4px rgba(0,0,0,0.25)",
        }}
      >
        {isDark ? (
          <Moon size={11} color="#fff" />
        ) : (
          <Sun size={11} color="#fff" />
        )}
      </span>
    </button>
  )
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ size = 42 }: { size?: number }) {
  const c = useC()
  return (
    <img
      src={logoImg}
      alt="AB Fitness Hub"
      width={size}
      height={size}
      className="rounded-full object-cover shrink-0"
      style={{
        boxShadow: c.isDark
          ? `0 0 0 1.5px ${c.orange}66, 0 0 16px ${c.orange}44`
          : `0 0 0 1.5px ${c.orange}55, 0 2px 8px rgba(0,0,0,0.12)`,
      }}
    />
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const c = useC()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#programs" },
    { label: "Pricing", href: "#memberships" },
    { label: "Gallery", href: "#gallery" },
  ]

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
        <a href="#hero" className="flex items-center gap-2.5">
          <Logo size={40} />
          <div>
            <div
              className="font-bold text-[13px] tracking-widest leading-none"
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                letterSpacing: "0.12em",
                color: c.text,
              }}
            >
              AB FITNESS HUB
            </div>
            <div
              className="text-[9px] font-semibold tracking-[0.3em] uppercase"
              style={{ color: c.orange }}
            >
              Kavoor · Mangalore
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium transition-colors duration-200 relative group"
              style={{ color: c.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = c.muted)}
            >
              {l.label}
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: c.orange }}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-semibold text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
            style={{
              background: c.orange,
              color: "#fff",
              boxShadow: c.isDark
                ? `0 0 20px ${c.orange}55`
                : `0 2px 12px ${c.orange}55`,
            }}
          >
            Contact Us
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="p-2"
            style={{ color: c.text }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-0.5 mb-1.5 transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
              style={{ background: c.text }}
            />
            <span
              className={`block w-5 h-0.5 mb-1.5 transition-all ${
                open ? "opacity-0" : ""
              }`}
              style={{ background: c.text }}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
              style={{ background: c.text }}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-80" : "max-h-0"
        }`}
        style={{
          background: c.mobileMenuBg,
          borderTop: `1px solid ${c.navBorder}`,
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-medium text-sm transition-colors"
              style={{ color: c.muted }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-white text-center font-semibold text-sm px-5 py-2.5 rounded-full"
            style={{ background: c.orange }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const c = useC()
  const contentRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState({ members: 0, trainers: 0, years: 0 })

  // Count-up animation
  useEffect(() => {
    const targets = { members: 300, trainers: 2, years: 2 }
    let frame = 0
    const t = setInterval(() => {
      frame++
      const p = Math.min(frame / 80, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount({
        members: Math.round(targets.members * e),
        trainers: Math.round(targets.trainers * e),
        years: Math.round(targets.years * e),
      })
      if (p >= 1) clearInterval(t)
    }, 20)
    return () => clearInterval(t)
  }, [])

  // Subtle hero parallax — content drifts up + fades as user scrolls away
  useEffect(() => {
    if (reducedMotion()) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = contentRef.current
        if (!el) return
        const section = el.closest("section") as HTMLElement
        const progress = Math.max(
          0,
          Math.min(window.scrollY / (section?.offsetHeight || 800), 1),
        )
        el.style.opacity = String(1 - progress * 0.65)
        el.style.transform = `translateY(${progress * -36}px)`
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const glowStat = (color: string) =>
    c.isDark ? `0 0 16px ${color}88` : `0 2px 6px ${color}44`

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-[66px]"
      style={{ background: c.bg }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: c.isDark
            ? `linear-gradient(${c.orange}08 1px, transparent 1px), linear-gradient(90deg, ${c.orange}08 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Animated blobs + orbiting particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Morphing blob 1 */}
        <div
          className="animate-morph absolute top-[15%] left-[8%] w-[380px] h-[380px] opacity-[0.07]"
          style={{
            background: `radial-gradient(circle, ${c.orange}, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
        {/* Morphing blob 2 */}
        <div
          className="animate-morph absolute bottom-[10%] right-[5%] w-[300px] h-[300px] opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${c.cyan}, transparent 70%)`,
            filter: "blur(40px)",
            animationDelay: "-4s",
            animationDirection: "reverse",
          }}
        />
        {/* Floating x blob */}
        <div
          className="animate-float-x absolute top-[50%] right-[20%] w-[200px] h-[200px] opacity-[0.05]"
          style={{
            background: `radial-gradient(circle, ${c.lime}, transparent 70%)`,
            filter: "blur(25px)",
            animationDelay: "-2s",
          }}
        />
        {/* Orbiting dot 1 */}
        <div
          className="animate-orbit absolute top-[30%] left-[50%] w-2 h-2 rounded-full opacity-60"
          style={
            {
              background: c.orange,
              "--orbit-r": "140px",
              "--orbit-dur": "9s",
              boxShadow: `0 0 8px ${c.orange}`,
            } as React.CSSProperties
          }
        />
        {/* Orbiting dot 2 */}
        <div
          className="animate-orbit absolute top-[55%] left-[55%] w-1.5 h-1.5 rounded-full opacity-40"
          style={
            {
              background: c.cyan,
              "--orbit-r": "90px",
              "--orbit-dur": "13s",
              animationDirection: "reverse",
              boxShadow: `0 0 6px ${c.cyan}`,
            } as React.CSSProperties
          }
        />
        {/* Static accent dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-float absolute rounded-full opacity-20"
            style={{
              width: [4, 6, 3, 5, 4, 6][i],
              height: [4, 6, 3, 5, 4, 6][i],
              left: `${[15, 70, 40, 85, 25, 60][i]}%`,
              top: `${[20, 35, 65, 55, 80, 15][i]}%`,
              background: [c.orange, c.cyan, c.lime, c.orange, c.cyan, c.lime][
                i
              ],
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3.5 + i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10"
      >
        {/* ─ MOBILE ─ */}
        <div
          className="lg:hidden rounded-2xl overflow-hidden"
          style={{
            background: c.card,
            border: `1px solid ${c.orange}33`,
            boxShadow: c.isDark ? "none" : "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div className="px-5 sm:px-8 pt-10 pb-6">
            <div
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{
                background: `${c.orange}18`,
                color: c.orange,
                border: `1px solid ${c.orange}33`,
              }}
            >
              <Icon name="flame" size={14} color={c.orange} /> #1 Gym in Kavoor,
              Mangalore
            </div>
            <h1
              className="font-black leading-[1.05] mb-4"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 4rem)",
                fontFamily: "Barlow Condensed, sans-serif",
                textTransform: "uppercase",
                color: c.text,
              }}
            >
              Shape Your
              <br />
              Body, Shape
              <br />
              <span
                style={{
                  color: c.orange,
                  textShadow: c.isDark ? `0 0 30px ${c.orange}88` : "none",
                }}
              >
                Your Destiny.
              </span>
            </h1>
            <p
              className="text-[14px] leading-relaxed mb-7"
              style={{ color: c.muted }}
            >
              Our mission is to transform your health and fitness through
              incremental achievements, proving that even the smallest steps can
              lead to significant results.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 text-white font-bold text-[13px] px-5 py-3 rounded-full transition-all hover:scale-105"
                style={{
                  background: c.orange,
                  boxShadow: c.isDark
                    ? `0 0 20px ${c.orange}55`
                    : `0 2px 12px ${c.orange}44`,
                }}
              >
                Explore Courses <Icon name="arrow" size={16} color="#fff" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold text-[13px] px-5 py-3 rounded-full transition-all"
                style={{ border: `1.5px solid ${c.orange}55`, color: c.orange }}
              >
                Book Free Trial
              </a>
            </div>
            <div
              className="flex gap-6 pt-5"
              style={{ borderTop: `1px solid ${c.border}` }}
            >
              {[
                { val: `${count.members}+`, label: "Members", col: c.orange },
                { val: `${count.trainers}+`, label: "Trainers", col: c.cyan },
                { val: `${count.years}+`, label: "Years", col: c.lime },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-xl font-black"
                    style={{
                      color: s.col,
                      textShadow: glowStat(s.col),
                      fontFamily: "Barlow Condensed, sans-serif",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[10px] font-medium mt-0.5 uppercase tracking-wider"
                    style={{ color: c.muted }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative h-[240px] sm:h-[300px] overflow-hidden"
            style={{
              background: c.isDark
                ? `linear-gradient(135deg, #1a0a00 0%, #0a0a0a 100%)`
                : `linear-gradient(135deg, #f0e8e4 0%, #f4f4f4 100%)`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${c.orange}22 0%, transparent 70%)`,
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=700&h=500&fit=crop&auto=format&q=90"
              alt="Athlete at AB Fitness Hub"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{
                opacity: c.isDark ? 0.8 : 0.75,
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 20%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 20%)",
              }}
            />
            <div className="absolute right-4 bottom-4 w-[64px] h-[64px]">
              <svg
                viewBox="0 0 90 90"
                className="w-full h-full"
                style={{ animation: "spin 14s linear infinite" }}
              >
                <defs>
                  <path
                    id="cpM"
                    d="M 45,45 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
                  />
                </defs>
                <text
                  style={{ fontSize: "7.5px", fill: c.orange, fontWeight: 700 }}
                >
                  <textPath href="#cpM">
                    Focus on Form • Stay Consistent • Progress •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: c.card,
                    boxShadow: `0 0 12px ${c.orange}66`,
                  }}
                >
                  <Logo size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─ DESKTOP ─ */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-center min-h-[560px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-px w-10 rounded-full"
                style={{
                  background: c.orange,
                  boxShadow: c.isDark ? `0 0 8px ${c.orange}` : "none",
                }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.35em]"
                style={{ color: c.orange }}
              >
                #1 Gym in Kavoor, Mangalore
              </span>
            </div>
            <h1
              className="font-black leading-[1.03] mb-6 uppercase"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 5rem)",
                fontFamily: "Barlow Condensed, sans-serif",
                color: c.text,
              }}
            >
              Shape Your
              <br />
              Body, Shape
              <br />
              <span
                style={{
                  color: c.orange,
                  textShadow: c.isDark ? `0 0 40px ${c.orange}88` : "none",
                }}
              >
                Your Destiny.
              </span>
            </h1>
            <p
              className="leading-relaxed mb-8 max-w-md text-[15px]"
              style={{ color: c.muted }}
            >
              Our mission is to transform your health and fitness through
              incremental achievements, proving that even the smallest steps can
              lead to significant results.
            </p>
            <div className="flex gap-4 mb-12">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 text-white font-bold text-[14px] px-7 py-4 rounded-full transition-all hover:scale-105"
                style={{
                  background: c.orange,
                  boxShadow: c.isDark
                    ? `0 0 24px ${c.orange}55`
                    : `0 2px 16px ${c.orange}50`,
                }}
              >
                Explore Courses <Icon name="arrow" size={18} color="#fff" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold text-[14px] px-7 py-4 rounded-full transition-all"
                style={{ border: `1.5px solid ${c.orange}55`, color: c.orange }}
              >
                Book Free Trial
              </a>
            </div>
            <div
              className="flex gap-10 pt-8"
              style={{ borderTop: `1px solid ${c.border}` }}
            >
              {[
                {
                  val: `${count.members}+`,
                  label: "Active Members",
                  col: c.orange,
                },
                {
                  val: `${count.trainers}+`,
                  label: "Expert Trainers",
                  col: c.cyan,
                },
                {
                  val: `${count.years}+`,
                  label: "Years Excellence",
                  col: c.lime,
                },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-4xl font-black"
                    style={{
                      color: s.col,
                      textShadow: glowStat(s.col),
                      fontFamily: "Barlow Condensed, sans-serif",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[11px] font-medium mt-1 uppercase tracking-wider"
                    style={{ color: c.muted }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center items-end h-[560px]">
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: c.isDark
                  ? `linear-gradient(135deg, #1a0800 0%, ${c.bg} 100%)`
                  : `linear-gradient(135deg, #f0e8e4 0%, #ebebeb 100%)`,
                border: `1px solid ${c.orange}22`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 60% 40%, ${c.orange}22 0%, transparent 65%)`,
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=700&h=800&fit=crop&auto=format&q=90"
                alt="Athlete at AB Fitness Hub"
                className="w-full h-full object-cover object-top"
                style={{
                  opacity: c.isDark ? 0.9 : 0.8,
                  maskImage:
                    "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              />
            </div>
            <div className="absolute right-4 bottom-4 z-10 w-[90px] h-[90px]">
              <svg
                viewBox="0 0 90 90"
                className="w-full h-full"
                style={{ animation: "spin 14s linear infinite" }}
              >
                <defs>
                  <path
                    id="cp"
                    d="M 45,45 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
                  />
                </defs>
                <text
                  style={{ fontSize: "7.5px", fill: c.orange, fontWeight: 700 }}
                >
                  <textPath href="#cp">
                    Focus on Form • Stay Consistent • Progress •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: c.card,
                    boxShadow: `0 0 16px ${c.orange}88`,
                  }}
                >
                  <Logo size={34} />
                </div>
              </div>
            </div>
            <div
              className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-2xl p-4 animate-float"
              style={{
                background: c.card,
                border: `1px solid ${c.cyan}44`,
                boxShadow: c.isDark
                  ? `0 0 20px ${c.cyan}22`
                  : `0 4px 16px rgba(0,0,0,0.12)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${c.cyan}22` }}
                >
                  <Icon name="group" size={20} color={c.cyan} />
                </div>
                <div>
                  <div
                    className="font-black text-lg"
                    style={{
                      color: c.text,
                      fontFamily: "Barlow Condensed, sans-serif",
                    }}
                  >
                    300+
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: c.cyan }}
                  >
                    Members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  const c = useC()
  const items = [
    "Strength Training",
    "CrossFit & HIIT",
    "Boxing & Combat",
    "Yoga & Mobility",
    "Cardio Zone",
    "Personal Training",
    "Bootcamp",
    "Results Guaranteed",
  ]
  const rep = [...items, ...items, ...items]
  return (
    <div
      className="overflow-hidden py-4 relative"
      style={{
        background: c.orange,
        boxShadow: c.isDark
          ? `0 0 40px ${c.orange}66`
          : `0 2px 16px ${c.orange}44`,
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "ticker 28s linear infinite",
          width: "max-content",
        }}
      >
        {rep.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-white text-[13px] font-bold uppercase tracking-wider shrink-0 px-8"
          >
            <Icon
              name={
                i % 4 === 0
                  ? "dumbbell"
                  : i % 4 === 1
                    ? "lightning"
                    : i % 4 === 2
                      ? "target"
                      : "trophy"
              }
              size={16}
              color="#fff"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── SECTION WRAPPERS ─────────────────────────────────────────────────────────
function Section({
  children,
  id = "",
  bg,
  border = false,
}: {
  children: React.ReactNode
  id?: string
  bg: string
  border?: boolean
}) {
  const c = useC()
  return (
    <section
      id={id || undefined}
      className="py-16 md:py-24"
      style={{
        background: bg,
        borderTop: border ? `1px solid ${c.orange}18` : undefined,
      }}
    >
      {children}
    </section>
  )
}

function SectionLabel({
  text,
  center = false,
}: {
  text: string
  center?: boolean
}) {
  const c = useC()
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${
        center ? "justify-center" : ""
      }`}
    >
      <div
        className="h-px w-8 rounded-full"
        style={{
          background: c.orange,
          boxShadow: c.isDark ? `0 0 8px ${c.orange}` : "none",
        }}
      />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.35em]"
        style={{ color: c.orange }}
      >
        {text}
      </span>
      {center && (
        <div
          className="h-px w-8 rounded-full"
          style={{
            background: c.orange,
            boxShadow: c.isDark ? `0 0 8px ${c.orange}` : "none",
          }}
        />
      )}
    </div>
  )
}

function Heading({
  children,
  center = false,
  size = "lg",
}: {
  children: React.ReactNode
  center?: boolean
  size?: "lg" | "md"
}) {
  const c = useC()
  return (
    <h2
      className={`font-black uppercase leading-tight ${
        center ? "text-center" : ""
      }`}
      style={{
        color: c.text,
        fontSize:
          size === "lg"
            ? "clamp(1.8rem, 4vw, 3.2rem)"
            : "clamp(1.5rem, 3.5vw, 2.6rem)",
        fontFamily: "Barlow Condensed, sans-serif",
      }}
    >
      {children}
    </h2>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const c = useC()
  const [open, setOpen] = useState<number | null>(0)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }
  const items = [
    {
      icon: "shield",
      title: "Expert Guidance",
      body: "Immerse yourself in a fitness experience like no other. Our modern facilities boast the latest equipment, diverse training areas, and innovative fitness programs.",
    },
    {
      icon: "dumbbell",
      title: "Cutting-Edge Facilities",
      body: "State-of-the-art gym floor, cardio zone, boxing ring, yoga studio, and recovery lounge — everything under one roof in Kavoor, Mangalore.",
    },
    {
      icon: "diamond",
      title: "Flexible Membership Options",
      body: "Monthly, quarterly, and annual plans designed to fit your schedule and budget. First trial session is always free.",
    },
  ]
  return (
    <Section id="about" bg={c.surface} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal dir="left" className="relative hidden md:block">
          <div
            className="absolute -inset-3 rounded-[24px] opacity-40 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${c.orange}22, transparent, ${c.cyan}22)`,
              filter: "blur(10px)",
            }}
          />
          <img
            src={abtImg}
            alt="Trainer at AB Fitness Hub"
            className="relative w-full h-[440px] object-cover rounded-[20px]"
            style={{
              border: `1px solid ${c.orange}33`,
              objectPosition: "center top",
            }}
          />
          <div
            className="absolute -bottom-5 -right-5 w-[108px] h-[108px] rounded-[20px] flex flex-col items-center justify-center text-white shadow-2xl"
            style={{
              background: c.orange,
              boxShadow: c.isDark
                ? `0 0 40px ${c.orange}88`
                : `0 4px 24px ${c.orange}66`,
            }}
          >
            <div
              className="text-3xl font-black"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              2+
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-center leading-tight">
              Years
              <br />
              Excellence
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionLabel text="About Us" />
          </Reveal>
          <Reveal delay={80}>
            <Heading size="md">
              Fitness is not just a destination,{" "}
              <span style={{ color: c.orange }}>it's a journey</span>
            </Heading>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="leading-relaxed my-6 text-[14px] sm:text-[15px]"
              style={{ color: c.muted }}
            >
              Connect with fellow members, participate in group classes, and
              share your achievements as we celebrate success together. AB
              Fitness Hub in Kavoor has been Mangalore's most trusted fitness
              community since 2016.
            </p>
          </Reveal>
          <div className="space-y-3 mb-8">
            {items.map((item, i) => (
              <Reveal key={i} delay={i * 80 + 200}>
                <div
                  className="rounded-[16px] overflow-hidden transition-all duration-200"
                  style={{
                    background: c.card,
                    border: `1px solid ${
                      open === i ? c.orange + "55" : c.border
                    }`,
                    boxShadow:
                      open === i
                        ? c.isDark
                          ? `0 0 16px ${c.orange}22`
                          : `0 2px 12px ${c.orange}18`
                        : "none",
                  }}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name={item.icon}
                        size={22}
                        color={open === i ? c.orange : c.muted}
                      />
                      <span
                        className="font-semibold text-[14px]"
                        style={{ color: open === i ? c.orange : c.text }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span
                      className="text-xl font-light shrink-0 transition-transform duration-200"
                      style={{
                        color: c.orange,
                        transform: open === i ? "rotate(45deg)" : "none",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      open === i ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p
                      className="px-5 pb-5 text-[13px] font-light leading-relaxed"
                      style={{ color: c.muted }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 text-white font-bold text-[14px] px-7 py-4 rounded-full transition-all hover:scale-105"
              style={{
                background: c.orange,
                boxShadow: c.isDark
                  ? `0 0 24px ${c.orange}55`
                  : `0 2px 16px ${c.orange}44`,
              }}
            >
              Explore Programs <Icon name="arrow" size={18} color="#fff" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* ── VIDEO PLAYER ── */}
      <Reveal delay={100} className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div
          className="relative rounded-[24px] overflow-hidden cursor-pointer group"
          style={{
            border: `1px solid ${c.orange}33`,
            boxShadow: c.isDark
              ? `0 0 60px ${c.orange}18`
              : `0 8px 40px rgba(0,0,0,0.12)`,
          }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={gymVideo}
            className="w-full block"
            style={{ maxHeight: 520, objectFit: "cover" }}
            playsInline
            loop
            onEnded={() => setPlaying(false)}
          />
          {/* overlay + play/pause button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
            style={{ background: "rgba(0,0,0,0.38)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                background: c.orange,
                boxShadow: `0 0 40px ${c.orange}88`,
              }}
            >
              {playing ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <rect x="5" y="4" width="4" height="16" />
                  <rect x="15" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <polygon points="6,3 21,12 6,21" />
                </svg>
              )}
            </div>
          </div>
          {/* bottom label */}
          {!playing && (
            <div className="absolute bottom-5 left-5">
              <div className="text-white font-bold text-[15px] drop-shadow-lg">
                Watch AB Fitness Hub in Action
              </div>
              <div className="text-white/60 text-[12px] font-light">
                Kavoor, Mangalore
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  )
}

// ─── PROGRAMS ─────────────────────────────────────────────────────────────────
function Programs() {
  const c = useC()
  const programs = [
    {
      icon: "dumbbell",
      title: "Strength Training",
      desc: "Build raw power and muscle with structured progressive overload programs guided by certified coaches.",
      tag: "Popular",
      color: c.orange,
      img: "https://images.unsplash.com/photo-1722925541142-5db2668ca492?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      icon: "lightning",
      title: "CrossFit & HIIT",
      desc: "High-intensity functional training that torches calories and builds full-body athletic conditioning.",
      tag: null,
      color: c.cyan,
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      icon: "fist",
      title: "Boxing & Combat",
      desc: "Master technique, explosiveness, and reflexes in our fully equipped boxing ring.",
      tag: null,
      color: c.lime,
      img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      icon: "lotus",
      title: "Yoga & Mobility",
      desc: "Restore balance, flexibility, and mental clarity with guided yoga and functional mobility.",
      tag: null,
      color: c.cyan,
      img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      icon: "running",
      title: "Cardio Zone",
      desc: "State-of-the-art treadmills, ellipticals, bikes, and rowing machines for every cardio goal.",
      tag: null,
      color: c.orange,
      img: "https://images.unsplash.com/photo-1633394782240-f81aba3f850d?w=600&h=400&fit=crop&auto=format&q=80",
    },
    {
      icon: "trophy",
      title: "Personal Training",
      desc: "One-on-one sessions tailored exclusively to your body composition, goals, and fitness level.",
      tag: "Premium",
      color: c.lime,
      img: "https://images.unsplash.com/photo-1648542036561-e1d66a5ae2b1?w=600&h=400&fit=crop&auto=format&q=80",
    },
  ]
  return (
    <Section id="programs" bg={c.bg} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel text="Our Services" />
            <Heading>
              Fitness Classes{" "}
              <span style={{ color: c.orange }}>Built for Results</span>
            </Heading>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 font-semibold text-[13px] px-6 py-3 rounded-full transition-all hover:scale-105"
            style={{ border: `1.5px solid ${c.orange}66`, color: c.orange }}
          >
            View All →
          </a>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 70} dir="up">
              <div
                className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                style={{
                  background: c.card,
                  border: `1px solid ${c.borderFaint}`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = p.color + "55"
                  el.style.boxShadow = c.isDark
                    ? `0 0 24px ${p.color}18`
                    : `0 4px 20px ${p.color}20`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = c.borderFaint
                  el.style.boxShadow = "none"
                }}
              >
                {/* Background image hero */}
                <div className="relative h-40 overflow-hidden shrink-0">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 100%)`,
                    }}
                  />
                  {p.tag && (
                    <div
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: c.orange, color: "#fff" }}
                    >
                      {p.tag}
                    </div>
                  )}
                  <div
                    className="absolute bottom-3 left-3 w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${p.color}cc`,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Icon name={p.icon} size={20} color="#fff" />
                  </div>
                </div>
                {/* Text content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="font-bold text-[16px] mb-2"
                    style={{ color: c.text }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed font-light flex-1"
                    style={{ color: c.muted }}
                  >
                    {p.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: p.color }}
                  >
                    Learn More <Icon name="arrow" size={14} color={p.color} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── HOW WE WORK ──────────────────────────────────────────────────────────────
function HowWeWork() {
  const c = useC()
  return (
    <Section bg={c.surface} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal dir="left">
          <div>
            <SectionLabel text="How We Work" />
            <Heading size="md">
              Join the Movement,{" "}
              <span style={{ color: c.orange }}>Embrace the Difference</span>
            </Heading>
            <p
              className="leading-relaxed my-6 text-[14px] sm:text-[15px]"
              style={{ color: c.muted }}
            >
              Our team of experienced trainers is here to guide you every step
              of the way. With a wealth of knowledge and passion for helping
              members succeed, our trainers ensure you get the most out of every
              workout.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: "diamond",
                  title: "Flexible Membership",
                  desc: "We offer flexible membership options to fit your busy lifestyle and budget.",
                  color: c.orange,
                },
                {
                  icon: "group",
                  title: "Specialized Programs",
                  desc: "Whether you're looking to build muscle, improve endurance, or enhance athletic performance.",
                  color: c.cyan,
                },
              ].map((f, i) => (
                <div
                  key={f.title}
                  className="p-5 rounded-[18px] transition-all duration-200"
                  style={{
                    background: c.card,
                    border: `1px solid ${f.color}33`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <Icon
                    name={f.icon}
                    size={28}
                    color={f.color}
                    className="mb-3"
                  />
                  <h4
                    className="font-bold text-[14px] mb-2"
                    style={{ color: c.text }}
                  >
                    {f.title}
                  </h4>
                  <p
                    className="text-[12px] leading-relaxed font-light"
                    style={{ color: c.muted }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 text-white font-bold text-[14px] px-7 py-4 rounded-full transition-all hover:scale-105"
              style={{
                background: c.orange,
                boxShadow: c.isDark
                  ? `0 0 24px ${c.orange}55`
                  : `0 2px 16px ${c.orange}44`,
              }}
            >
              Explore Programs <Icon name="arrow" size={18} color="#fff" />
            </a>
          </div>
        </Reveal>
        <Reveal dir="right">
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[360px]">
              <div
                className="absolute -top-4 -right-4 w-28 h-28 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${c.orange}33, transparent)`,
                  filter: "blur(20px)",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1738523686534-7055df5858d6?w=500&h=600&fit=crop&auto=format&q=80"
                alt="Personal training"
                className="relative z-10 w-full h-[420px] object-cover rounded-[20px]"
                style={{ border: `1px solid ${c.orange}33` }}
              />
              <div
                className="absolute z-20 bottom-5 left-5 rounded-[16px] p-4 flex items-center gap-3"
                style={{
                  background: c.card,
                  border: `1px solid ${c.cyan}44`,
                  boxShadow: c.isDark
                    ? `0 0 20px ${c.cyan}22`
                    : `0 4px 16px rgba(0,0,0,0.12)`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${c.cyan}22` }}
                >
                  <Icon name="group" size={20} color={c.cyan} />
                </div>
                <div>
                  <div
                    className="font-black text-[14px]"
                    style={{
                      color: c.text,
                      fontFamily: "Barlow Condensed, sans-serif",
                    }}
                  >
                    300+ Members
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: c.cyan }}
                  >
                    Transformed lives
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

// ─── TRAINER CARD (3D tilt) ────────────────────────────────────────────────────
function TrainerCard({
  t,
  c,
  onClick,
  active,
}: {
  t: {
    name: string
    role: string
    exp: string
    cert: string
    icon: string
    color: string
    img: string
    bio: string
  }
  c: Colors
  onClick: () => void
  active: boolean
}) {
  const { ref, onMove, onLeave } = useTilt<HTMLButtonElement>(10)
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className="group rounded-[20px] overflow-hidden h-full tilt-card w-full text-left"
      style={{
        background: c.card,
        border: active ? `1px solid ${t.color}55` : `1px solid ${c.borderFaint}`,
        boxShadow: active ? `0 16px 48px ${t.color}22` : "none",
        transition:
          "transform 0.18s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseMove={onMove}
      onMouseLeave={(e) => {
        onLeave()
        const el = e.currentTarget as HTMLElement
        if (!active) {
          el.style.borderColor = c.borderFaint
          el.style.boxShadow = "none"
        }
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        if (!active) {
          el.style.borderColor = t.color + "55"
          el.style.boxShadow = `0 16px 48px ${t.color}22`
        }
      }}
    >
      <div className="relative overflow-hidden h-60">
        <img
          src={t.img}
          alt={t.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(20%)" }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.filter = "grayscale(20%)")
          }
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${c.card} 0%, transparent 55%)`,
          }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-bar pointer-events-none" />
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: `${t.color}33`,
            border: `1px solid ${t.color}66`,
            backdropFilter: "blur(4px)",
          }}
        >
          <Icon name={t.icon} size={16} color={t.color} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[15px]" style={{ color: c.text }}>
          {t.name}
        </h3>
        <div
          className="text-[12px] font-semibold mt-0.5"
          style={{ color: t.color }}
        >
          {t.role}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${t.color}22`, color: t.color }}
          >
            {t.exp}
          </span>
          <span className="text-[10px]" style={{ color: c.muted }}>
            {t.cert}
          </span>
        </div>
      </div>
    </button>
  )
}

// ─── TRAINERS ─────────────────────────────────────────────────────────────────
function Trainers() {
  const c = useC()
  const [selected, setSelected] = useState<number | null>(null)
  const trainers = [
    {
      name: "SUJAY POOJARY",
      role: "MMA Coach & Gym Trainer",
      exp: "4+ yrs",
      cert: "Mangalore, D.K. | Ph: 8431293951",
      icon: "zap",
      color: c.cyan,
      img: sujayImg,
      bio: "SUJAY POOJARY is a specialized MMA coach and gym trainer with 4+ years of experience. He combines combat sports expertise with functional fitness training to deliver comprehensive athletic development and conditioning.",
    },
    {
      name: "THARESH",
      role: "Fat Loss & Strength Coach",
      exp: "8+ yrs",
      cert: "Mangalore, D.K. | Ph: 7760745826",
      icon: "dumbbell",
      color: c.orange,
      img: thareshImg,
      bio: "THARESH specializes in fat loss, strength training, and muscle building workouts. With 8+ years of lifting experience, he provides customized diet plans, expert exercise techniques, and personalized workout strategies for sustainable results and optimal performance.",
    },
  ]
  const activeTrainer = selected !== null ? trainers[selected] : null

  return (
    <Section id="trainers" bg={c.bg} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <SectionLabel text="Expert Team" center />
          <Heading center>
            Meet Our <span style={{ color: c.orange }}>Certified</span> Trainers
          </Heading>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 relative">
          {trainers.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 90} dir="up">
              <button
                type="button"
                onClick={() => setSelected(idx)}
                className="w-full overflow-hidden rounded-[22px] text-left transition-all"
                style={{
                  background: c.card,
                  border: `1px solid ${c.borderFaint}`,
                  boxShadow: selected === idx ? `0 18px 40px ${t.color}18` : "none",
                }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(18%)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(0,0,0,0.12), transparent 60%)`,
                    }}
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-black text-[26px] leading-none mb-2" style={{ color: c.text }}>
                    {t.name}
                  </h3>
                  <div
                    className="text-[16px] font-semibold mb-3"
                    style={{ color: t.color }}
                  >
                    {t.role}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${t.color}22`, color: t.color }}
                    >
                      {t.exp}
                    </span>
                    <span className="text-[11px]" style={{ color: c.muted }}>
                      {t.cert}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {activeTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
            <div
              className="relative w-full max-w-xl rounded-[26px] p-6"
              style={{
                background: c.card,
                border: `1px solid ${c.borderFaint}`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.2)`,
              }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full font-bold"
                style={{ background: `${c.orange}18`, color: c.text }}
              >
                ×
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={activeTrainer.img}
                  alt={activeTrainer.name}
                  className="h-20 w-20 rounded-[18px] object-cover"
                />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: activeTrainer.color }}>
                    {activeTrainer.role}
                  </div>
                  <h3 className="font-black text-[30px] leading-none" style={{ color: c.text }}>
                    {activeTrainer.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${activeTrainer.color}22`, color: activeTrainer.color }}
                >
                  {activeTrainer.exp}
                </span>
                <span className="text-[10px]" style={{ color: c.muted }}>
                  {activeTrainer.cert}
                </span>
              </div>

              <p className="text-[15px] leading-relaxed" style={{ color: c.muted }}>
                {activeTrainer.bio}
              </p>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
function Schedule() {
  const c = useC()
  const scheduleData = [
    {
      time: "06:00–07:00",
      mon: "Strength",
      tue: "Yoga",
      wed: "CrossFit",
      thu: "Cardio",
      fri: "Boxing",
      sat: "Bootcamp",
    },
    {
      time: "07:00–08:00",
      mon: "Yoga",
      tue: "CrossFit",
      wed: "Yoga",
      thu: "Strength",
      fri: "Cardio",
      sat: "Kickboxing",
    },
    {
      time: "08:00–09:00",
      mon: "CrossFit",
      tue: "Strength",
      wed: "Kickboxing",
      thu: "CrossFit",
      fri: "Yoga",
      sat: "Strength",
    },
    {
      time: "17:00–18:00",
      mon: "CrossFit",
      tue: "CrossFit",
      wed: "CrossFit",
      thu: "Yoga",
      fri: "Strength",
      sat: "Bootcamp",
    },
    {
      time: "18:00–19:00",
      mon: "Strength",
      tue: "Cardio",
      wed: "CrossFit",
      thu: "Strength",
      fri: "Kickboxing",
      sat: "Yoga",
    },
    {
      time: "19:00–20:00",
      mon: "Yoga",
      tue: "Bootcamp",
      wed: "CrossFit",
      thu: "Kickboxing",
      fri: "Strength",
      sat: "Yoga",
    },
  ]

  const classPill: Record<string, { bg: string; color: string }> = c.isDark
    ? {
        Strength: { bg: `${c.orange}20`, color: c.orange },
        Yoga: { bg: "#00ff8820", color: "#00cc66" },
        CrossFit: { bg: `${c.lime}20`, color: c.lime },
        Cardio: { bg: `${c.cyan}20`, color: c.cyan },
        Boxing: { bg: "#ff00aa20", color: "#ff66cc" },
        Kickboxing: { bg: "#ff00aa20", color: "#ff66cc" },
        Bootcamp: { bg: "#ffaa0020", color: "#ffaa00" },
      }
    : {
        Strength: { bg: `${c.orange}18`, color: c.orange },
        Yoga: { bg: "#00aa5518", color: "#007a3d" },
        CrossFit: { bg: `${c.lime}25`, color: c.lime },
        Cardio: { bg: `${c.cyan}18`, color: c.cyan },
        Boxing: { bg: "#cc006618", color: "#aa0055" },
        Kickboxing: { bg: "#cc006618", color: "#aa0055" },
        Bootcamp: { bg: "#aa660018", color: "#7a4400" },
      }

  return (
    <Section bg={c.surface} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <SectionLabel text="Class Schedule" center />
          <Heading center>
            Training Classes <span style={{ color: c.orange }}>Schedule</span>
          </Heading>
        </Reveal>
        <Reveal delay={120} dir="scale">
          <div
            className="overflow-x-auto rounded-[20px]"
            style={{ border: `1px solid ${c.orange}33` }}
          >
            <table className="w-full text-sm border-collapse min-w-[680px]">
              <thead>
                <tr style={{ background: c.orange }}>
                  <th className="p-4 text-white font-bold text-left text-[11px] uppercase tracking-wider">
                    Time
                  </th>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((d) => (
                    <th
                      key={d}
                      className="p-4 text-white font-bold text-center text-[11px] uppercase tracking-wider"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, i) => (
                  <tr
                    key={row.time}
                    style={{
                      background: i % 2 === 0 ? c.card : c.surface,
                      borderBottom: `1px solid ${c.borderFaint}`,
                    }}
                  >
                    <td
                      className="p-3 font-mono text-[11px] border-r"
                      style={{ color: c.muted, borderColor: c.borderFaint }}
                    >
                      {row.time}
                    </td>
                    {(["mon", "tue", "wed", "thu", "fri", "sat"] as const).map(
                      (d) => {
                        const s = classPill[row[d]] || {
                          bg: c.border,
                          color: c.muted,
                        }
                        return (
                          <td key={d} className="p-2 text-center">
                            <span
                              className="inline-block px-2.5 py-1 text-[11px] font-bold rounded-full"
                              style={{ background: s.bg, color: s.color }}
                            >
                              {row[d]}
                            </span>
                          </td>
                        )
                      },
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

// ─── MEMBERSHIPS ──────────────────────────────────────────────────────────────
function Memberships() {
  const c = useC()
  const [category, setCategory] = useState<"general" | "student">("general")

  const plans: Record<"general" | "student", {
    duration: string
    months: number
    price: number
    perMonth: number
    saving: number
    savingPct: number
    best: boolean
  }[]> = {
    general: [
      {
        duration: "1 Month",
        months: 1,
        price: 1500,
        perMonth: 1500,
        saving: 0,
        savingPct: 0,
        best: false,
      },
      {
        duration: "3 Months",
        months: 3,
        price: 3300,
        perMonth: 1100,
        saving: 1200,
        savingPct: 27,
        best: false,
      },
      {
        duration: "6 Months",
        months: 6,
        price: 5999,
        perMonth: 1000,
        saving: 3001,
        savingPct: 33,
        best: false,
      },
      {
        duration: "12 Months",
        months: 12,
        price: 9999,
        perMonth: 833,
        saving: 8001,
        savingPct: 44,
        best: true,
      },
    ],
    student: [
      {
        duration: "1 Month",
        months: 1,
        price: 1300,
        perMonth: 1300,
        saving: 0,
        savingPct: 0,
        best: false,
      },
      {
        duration: "3 Months",
        months: 3,
        price: 3000,
        perMonth: 1000,
        saving: 900,
        savingPct: 23,
        best: false,
      },
      {
        duration: "6 Months",
        months: 6,
        price: 5500,
        perMonth: 917,
        saving: 2300,
        savingPct: 29,
        best: false,
      },
      {
        duration: "12 Months",
        months: 12,
        price: 8999,
        perMonth: 750,
        saving: 6601,
        savingPct: 42,
        best: true,
      },
    ],
  }

  const features = [
    { icon: "dumbbell", label: "Full gym floor access" },
    { icon: "group", label: "Group classes included" },
    { icon: "shield", label: "Locker room access" },
    { icon: "target", label: "Fitness assessment" },
  ]

  return (
    <Section id="memberships" bg={c.bg} border>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Reveal className="text-center mb-10">
          <SectionLabel text="Pricing" center />
          <Heading center>
            Simple, <span style={{ color: c.orange }}>Transparent</span> Pricing
          </Heading>
          <p
            className="mt-3 text-[14px] font-light max-w-md mx-auto"
            style={{ color: c.muted }}
          >
            No hidden fees. Choose your membership type and duration.
          </p>
        </Reveal>

        {/* Category toggle */}
        <Reveal delay={80} className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-1 rounded-full p-1"
            style={{ background: c.surface, border: `1px solid ${c.orange}33` }}
          >
            {(["general", "student"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-7 py-2.5 rounded-full text-[13px] font-bold transition-all capitalize tracking-wide"
                style={
                  category === cat
                    ? {
                        background: c.orange,
                        color: "#fff",
                        boxShadow: c.isDark
                          ? `0 0 16px ${c.orange}66`
                          : `0 2px 10px ${c.orange}44`,
                      }
                    : { color: c.muted }
                }
              >
                {cat === "student" ? "Student" : "General"}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {plans[category].map((plan, i) => (
            <Reveal key={plan.duration} delay={i * 70} dir="up">
              <div
                className="relative rounded-[22px] p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                style={
                  plan.best
                    ? {
                        background: c.orange,
                        boxShadow: c.isDark
                          ? `0 0 40px ${c.orange}55, 0 0 80px ${c.orange}22`
                          : `0 6px 28px ${c.orange}55`,
                        animation: "pulse-glow 2.5s ease-in-out infinite",
                      }
                    : {
                        background: c.card,
                        border: `1px solid ${c.border}`,
                        boxShadow: c.isDark
                          ? "none"
                          : "0 2px 12px rgba(0,0,0,0.06)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!plan.best) {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = c.orange + "55"
                    el.style.boxShadow = c.isDark
                      ? `0 0 20px ${c.orange}18`
                      : `0 4px 20px ${c.orange}22`
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.best) {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = c.border
                    el.style.boxShadow = c.isDark
                      ? "none"
                      : "0 2px 12px rgba(0,0,0,0.06)"
                  }
                }}
              >
                {/* Best value badge */}
                {plan.best && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
                    style={{
                      background: c.isDark ? "#080808" : "#0d0d0d",
                      color: c.orange,
                    }}
                  >
                    Best Value
                  </div>
                )}

                {/* Saving badge */}
                {plan.savingPct > 0 && (
                  <div
                    className="absolute top-4 right-4 text-[10px] font-black px-2.5 py-1 rounded-full"
                    style={
                      plan.best
                        ? {
                            background: "rgba(255,255,255,0.25)",
                            color: "#fff",
                          }
                        : {
                            background: c.isDark
                              ? `${c.lime}22`
                              : `${c.lime}28`,
                            color: c.lime,
                          }
                    }
                  >
                    -{plan.savingPct}%
                  </div>
                )}

                {/* Duration */}
                <div className="mb-5">
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.3em] mb-1"
                    style={{
                      color: plan.best ? "rgba(255,255,255,0.7)" : c.muted,
                    }}
                  >
                    {plan.duration}
                  </div>
                  <div
                    className="font-black leading-none"
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: "clamp(2.2rem, 5vw, 2.8rem)",
                      color: plan.best ? "#fff" : c.orange,
                      textShadow: plan.best
                        ? "none"
                        : c.isDark
                          ? `0 0 20px ${c.orange}55`
                          : "none",
                    }}
                  >
                    ₹{plan.price.toLocaleString("en-IN")}
                  </div>
                  <div
                    className="text-[12px] font-medium mt-1"
                    style={{
                      color: plan.best ? "rgba(255,255,255,0.65)" : c.muted,
                    }}
                  >
                    ₹{plan.perMonth.toLocaleString("en-IN")}/month
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="mb-5 h-px"
                  style={{
                    background: plan.best ? "rgba(255,255,255,0.2)" : c.border,
                  }}
                />

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5">
                      <Icon
                        name="check"
                        size={15}
                        color={plan.best ? "#fff" : c.orange}
                      />
                      <span
                        className="text-[12px]"
                        style={{
                          color: plan.best ? "rgba(255,255,255,0.85)" : c.muted,
                        }}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                  {plan.saving > 0 && (
                    <li className="flex items-center gap-2.5">
                      <Icon
                        name="check"
                        size={15}
                        color={plan.best ? "#fff" : c.orange}
                      />
                      <span
                        className="text-[12px]"
                        style={{
                          color: plan.best ? "rgba(255,255,255,0.85)" : c.muted,
                        }}
                      >
                        Save ₹{plan.saving.toLocaleString("en-IN")} total
                      </span>
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="block text-center text-[13px] font-bold py-3 rounded-[14px] transition-all hover:scale-[1.02]"
                  style={
                    plan.best
                      ? {
                          background: "rgba(255,255,255,0.22)",
                          color: "#fff",
                          border: "1.5px solid rgba(255,255,255,0.35)",
                        }
                      : {
                          background: `${c.orange}18`,
                          color: c.orange,
                          border: `1.5px solid ${c.orange}44`,
                        }
                  }
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={300} className="text-center">
          <p className="text-[12px] font-light" style={{ color: c.muted }}>
            Student discount available with valid ID &nbsp;·&nbsp; Free trial
            session for new members &nbsp;·&nbsp;
            <a
              href="tel:+918660563719"
              className="font-semibold"
              style={{ color: c.orange }}
            >
              {" "}
              Call 8660563719
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Rohish Komarpant",
    reviewCount: 3,
    time: "2 weeks ago",
    stars: 5,
    text: "gym is literally too good, all the machines are worth like heaven. im from just 2 weeks i this gym and i obsessed with this one. trainer and owner also ...",
    initial: "R",
    color: "#ff4800",
  },
  {
    name: "Nityantha H",
    reviewCount: 3,
    time: "10 months ago",
    stars: 5,
    text: "Excellent equipments available with an affordable fee for students and elders",
    initial: "N",
    color: "#007aaa",
  },
  {
    name: "Kamran Akmal",
    reviewCount: 1,
    time: "a year ago",
    stars: 5,
    text: "It's good gym",
    initial: "K",
    color: "#3d7000",
  },
  {
    name: "Shravan Shetty",
    reviewCount: 1,
    time: "2 weeks ago",
    stars: 5,
    text: "Nice gym and very nice environment 👌",
    initial: "S",
    color: "#ff4800",
  },
  {
    name: "RITHWIK P poojary",
    reviewCount: 2,
    time: "2 weeks ago",
    stars: 5,
    text: "Gym sir top mare 💪 10/10",
    initial: "R",
    color: "#007aaa",
  },
  {
    name: "Adarsh K",
    reviewCount: 1,
    time: "2 weeks ago",
    stars: 5,
    text: "it's been a year . It's fun and organised 💪",
    initial: "A",
    color: "#3d7000",
  },
  {
    name: "Ashin Akku",
    reviewCount: 3,
    time: "2 weeks ago",
    stars: 5,
    text: "Good and especially clean and perfect",
    initial: "A",
    color: "#ff4800",
  },
]

function Reviews() {
  const c = useC()
  const [active, setActive] = useState(0)
  const total = REVIEWS.length

  const prev = () => setActive((a) => (a - 1 + total) % total)
  const next = () => setActive((a) => (a + 1) % total)

  // Show 3 cards on desktop (active, active+1, active+2)
  const visible = [0, 1, 2].map((offset) => REVIEWS[(active + offset) % total])

  return (
    <Section bg={c.surface} border>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <SectionLabel text="Google Reviews" center />
          <Heading center>
            What Our <span style={{ color: c.orange }}>Members</span> Say
          </Heading>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Icon key={i} name="star" size={18} color="#f59e0b" />
              ))}
            <span
              className="ml-2 text-[13px] font-bold"
              style={{ color: c.text }}
            >
              5.0
            </span>
            <span className="text-[13px]" style={{ color: c.muted }}>
              · 7 Google Reviews
            </span>
          </div>
        </Reveal>

        {/* Desktop: 3-up carousel */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
          {visible.map((r, idx) => (
            <ReviewCard key={r.name + idx} r={r} c={c} highlight={idx === 0} />
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden mb-6">
          <ReviewCard r={REVIEWS[active]} c={c} highlight />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: c.card, border: `1px solid ${c.border}` }}
            aria-label="Previous review"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={c.muted}
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 20 : 7,
                  height: 7,
                  background: i === active ? c.orange : c.border,
                }}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: c.card, border: `1px solid ${c.border}` }}
            aria-label="Next review"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={c.muted}
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Trust summary */}
        <TrustSummary c={c} />
      </div>
    </Section>
  )
}

function ReviewCard({
  r,
  c,
  highlight,
}: {
  r: typeof REVIEWS[0]
  c: Colors
  highlight: boolean
}) {
  return (
    <div
      className="rounded-[20px] p-5 flex flex-col gap-3 transition-all duration-300"
      style={{
        background: highlight ? c.card : c.bg,
        border: `1px solid ${highlight ? c.orange + "44" : c.borderFaint}`,
        boxShadow: highlight
          ? c.isDark
            ? `0 0 24px ${c.orange}14`
            : "0 4px 20px rgba(0,0,0,0.08)"
          : "none",
      }}
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-[14px] shrink-0"
          style={{ background: r.color }}
        >
          {r.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="font-bold text-[13px] truncate"
            style={{ color: c.text }}
          >
            {r.name}
          </div>
          <div className="text-[11px]" style={{ color: c.muted }}>
            {r.reviewCount} review{r.reviewCount > 1 ? "s" : ""}
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={c.isDark ? "#4285f4" : "#4285f4"}
        >
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>

      {/* Stars + time */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="#f59e0b"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
        </div>
        <span className="text-[11px]" style={{ color: c.muted }}>
          {r.time}
        </span>
      </div>

      {/* Text */}
      <p
        className="text-[13px] leading-relaxed font-light flex-1"
        style={{ color: c.text }}
      >
        "{r.text}"
      </p>
    </div>
  )
}

function TrustSummary({ c }: { c: Colors }) {
  const points = [
    {
      emoji: "⭐",
      label: "Great equipment",
      sub: "Machines worth like heaven",
    },
    {
      emoji: "🧹",
      label: "Clean environment",
      sub: "Especially clean and perfect",
    },
    { emoji: "💰", label: "Affordable fees", sub: "For students and elders" },
    { emoji: "🤝", label: "Friendly atmosphere", sub: "Fun and organised" },
  ]
  return (
    <div
      className="mt-10 rounded-[20px] p-6 sm:p-8"
      style={{ background: c.card, border: `1px solid ${c.border}` }}
    >
      <div
        className="text-[11px] font-black uppercase tracking-[0.3em] text-center mb-6"
        style={{ color: c.muted }}
      >
        What Members Say
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {points.map((p) => (
          <div
            key={p.label}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="text-[28px]">{p.emoji}</div>
            <div className="font-bold text-[13px]" style={{ color: c.text }}>
              {p.label}
            </div>
            <div className="text-[11px] font-light" style={{ color: c.muted }}>
              {p.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  const c = useC()
  const gallery = [
    {
      src: galleryImg1,
      alt: "Dumbbell rack with LED mirror wall",
      span: "row-span-2",
    },
    {
      src: galleryImg2,
      alt: "Yellow gym machines and cable stations",
      span: "",
    },
    {
      src: galleryImg3,
      alt: "Cardio equipment — Energie Fitness treadmills",
      span: "",
    },
    {
      src: galleryImg4,
      alt: "Supplement and protein powder display",
      span: "",
    },
    { src: galleryImg5, alt: "AB Fitness Hub reception and logo", span: "" },
    {
      src: galleryImg6,
      alt: "Treadmill row with AB Fitness branding",
      span: "row-span-2",
    },
  ]
  return (
    <Section id="gallery" bg={c.bg} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <SectionLabel text="Gallery" center />
          <Heading center>
            Inside <span style={{ color: c.orange }}>AB Fitness</span> Hub
          </Heading>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[140px] sm:auto-rows-[180px]">
          {gallery.map((p, i) => (
            <Reveal key={i} delay={i * 60} dir="scale" className={p.span}>
              <div
                className={`group relative overflow-hidden rounded-[18px] w-full h-full`}
                style={{
                  background: c.card,
                  border: `1px solid ${c.borderFaint}`,
                }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%] group-hover:grayscale-0"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(0,0,0,0.28)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: c.orange,
                      boxShadow: `0 0 20px ${c.orange}88`,
                    }}
                  >
                    <span className="text-white font-bold text-xl">+</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const c = useC()
  const [open, setOpen] = useState<number | null>(0)
  const faqs = [
    {
      q: "How do I know which membership option is right for me?",
      a: "Our team is here to help guide you through the selection process. Whether you're looking for flexible month-to-month options or prefer the savings of an annual plan, we have membership options to suit your needs.",
    },
    {
      q: "Can I try out the gym before committing to a membership?",
      a: "Absolutely! We offer a completely free trial session so you can experience the gym, meet our trainers, and get a feel for the environment before making any commitment.",
    },
    {
      q: "Do you offer personal training services, and how do I get started?",
      a: "Yes, we have certified personal trainers available for one-on-one sessions. Simply contact us or visit the gym and we'll match you with the right trainer for your goals.",
    },
    {
      q: "Do you provide nutritional guidance or meal planning services?",
      a: "Our Elite and Pro plans include nutrition coaching. We also offer standalone nutrition consultation packages with our ISSA-certified nutrition coach Deepa Bhat.",
    },
    {
      q: "What happens if I'm injured or need assistance during a workout?",
      a: "All our trainers are trained in first aid. The gym is equipped with a first aid station and we have a clear emergency protocol. Member safety is our top priority at all times.",
    },
  ]
  return (
    <Section bg={c.surface} border>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <Heading center>
            Frequently Asked <span style={{ color: c.orange }}>Questions</span>
          </Heading>
          <p className="font-light text-[14px] mt-3" style={{ color: c.muted }}>
            Everything you need to know about AB Fitness Hub, Kavoor.
          </p>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 70}>
              <div
                key={i}
                className="rounded-[18px] overflow-hidden transition-all duration-200"
                style={{
                  background: c.card,
                  border: `1px solid ${
                    open === i ? c.orange + "55" : c.border
                  }`,
                  boxShadow:
                    open === i
                      ? c.isDark
                        ? `0 0 16px ${c.orange}18`
                        : `0 2px 12px ${c.orange}12`
                      : "none",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span
                    className="font-semibold text-[14px] leading-snug"
                    style={{ color: open === i ? c.orange : c.text }}
                  >
                    {i + 1}. {faq.q}
                  </span>
                  <span
                    className="text-2xl font-light shrink-0 transition-transform duration-200"
                    style={{
                      color: c.orange,
                      transform: open === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p
                    className="px-5 pb-5 text-[13px] font-light leading-relaxed"
                    style={{ color: c.muted }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── EVENTS DATA ──────────────────────────────────────────────────────────────
type EventItem = {
  id: string
  type: "upcoming" | "completed"
  title: string
  subtitle: string
  image: string
  date: string
  time: string
  location: string
  phone: string
  description: string
  activities: string[]
  prize: string
  registrationUrl?: string
  eventDate?: Date
}

const EVENTS: EventItem[] = [
  {
    id: "annual-2025",
    type: "completed",
    title: "1st Year Annual Celebration",
    subtitle: "Events Building Show",
    image: eventFlyerImg,
    date: "24.08.2025",
    time: "10:00 AM",
    location: "2nd Floor, Durgaprasad Complex, Kavoor, Mangalore",
    phone: "+91 8277299541",
    description:
      "AB Fitness Gym celebrated its 1st year anniversary with an Events Building Show, awarding medals and mementos to all event winners.",
    activities: [
      "Max Pushups",
      "Max Pullups",
      "Max Hanging",
      "Max Plank",
      "Max Crunches",
      "Max Front Barbel Raise",
    ],
    prize: "Medals & Mementos to All Winners",
  },
]

// ─── EVENTS ───────────────────────────────────────────────────────────────────
function Events() {
  const c = useC()
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming")
  const upcoming = EVENTS.filter((e) => e.type === "upcoming")
  const completed = EVENTS.filter((e) => e.type === "completed")

  return (
    <Section id="events" bg={c.surface} border>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Reveal className="text-center mb-10">
          <SectionLabel text="Events" center />
          <Heading center>
            AB Fitness <span style={{ color: c.orange }}>Events</span>
          </Heading>
          <p
            className="mt-3 text-[14px] font-light max-w-md mx-auto"
            style={{ color: c.muted }}
          >
            Competitions, celebrations, and milestones that define our
            community.
          </p>
        </Reveal>

        {/* Tab switcher */}
        <Reveal delay={80} className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-1 rounded-full p-1.5"
            style={{ background: c.card, border: `1px solid ${c.border}` }}
          >
            {(["upcoming", "completed"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 capitalize tracking-wide"
                style={
                  tab === t
                    ? {
                        background: c.orange,
                        color: "#fff",
                        boxShadow: c.isDark
                          ? `0 0 16px ${c.orange}55`
                          : `0 2px 12px ${c.orange}44`,
                      }
                    : { color: c.muted }
                }
              >
                {t === "upcoming" ? "🟡 Upcoming" : "🟢 Completed"}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tab content with fade transition */}
        <div style={{ minHeight: 340 }}>
          {/* UPCOMING TAB */}
          {tab === "upcoming" && (
            <Reveal dir="up">
              {upcoming.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-6">
                  {/* Animated dumbbell */}
                  <div className="animate-float relative">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: `${c.orange}12`,
                        border: `2px dashed ${c.orange}44`,
                      }}
                    >
                      <Icon name="dumbbell" size={36} color={c.orange} />
                    </div>
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse-ring"
                      style={{ background: c.orange, opacity: 0.5 }}
                    />
                  </div>
                  <div className="text-center">
                    <div
                      className="font-black text-[22px] mb-2 uppercase tracking-widest"
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        color: c.text,
                      }}
                    >
                      No Upcoming Events
                    </div>
                    <p
                      className="text-[14px] font-light"
                      style={{ color: c.muted }}
                    >
                      Stay tuned — something exciting is coming.
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold"
                    style={{
                      background: `${c.orange}12`,
                      border: `1px solid ${c.orange}33`,
                      color: c.orange,
                    }}
                  >
                    <Icon name="target" size={14} color={c.orange} />
                    Follow us on Instagram for announcements
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {upcoming.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-[20px] overflow-hidden"
                      style={{
                        background: c.card,
                        border: `1px solid ${c.orange}44`,
                      }}
                    >
                      {ev.image && (
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-56 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div
                          className="font-black text-[18px] uppercase mb-1"
                          style={{
                            fontFamily: "Barlow Condensed, sans-serif",
                            color: c.text,
                          }}
                        >
                          {ev.title}
                        </div>
                        <div
                          className="text-[13px] font-semibold mb-4"
                          style={{ color: c.orange }}
                        >
                          {ev.subtitle}
                        </div>
                        <div
                          className="flex gap-4 text-[12px] mb-4"
                          style={{ color: c.muted }}
                        >
                          <span>📅 {ev.date}</span>
                          <span>🕙 {ev.time}</span>
                        </div>
                        <div
                          className="text-[12px] mb-5"
                          style={{ color: c.muted }}
                        >
                          📍 {ev.location}
                        </div>
                        {ev.registrationUrl && (
                          <a
                            href={ev.registrationUrl}
                            className="inline-flex items-center gap-2 font-bold text-[13px] px-5 py-2.5 rounded-full text-white transition-all hover:scale-105"
                            style={{ background: c.orange }}
                          >
                            Register Now{" "}
                            <Icon name="arrow" size={14} color="#fff" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          )}

          {/* COMPLETED TAB */}
          {tab === "completed" && (
            <Reveal dir="up">
              {completed.length === 0 ? (
                <div className="text-center py-16" style={{ color: c.muted }}>
                  No completed events yet.
                </div>
              ) : (
                <div className="space-y-8">
                  {completed.map((ev) => (
                    <CompletedEventCard key={ev.id} ev={ev} c={c} />
                  ))}
                </div>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  )
}

function CompletedEventCard({ ev, c }: { ev: EventItem; c: Colors }) {
  const TIMELINE = [
    "Announced",
    "Event Day",
    "Competitions",
    "Winners",
    "Memories",
  ]

  return (
    <div
      className="rounded-[24px] overflow-hidden"
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        boxShadow: c.isDark
          ? `0 0 40px ${c.orange}0a`
          : "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left — poster image */}
        <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
          <img
            src={ev.image}
            alt={ev.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            style={{ minHeight: 300 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 60%)",
            }}
          />
          {/* Completed badge overlay */}
          <div className="absolute top-4 left-4">
            <div
              className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.75)",
                color: "#4ade80",
                border: "1px solid #4ade8055",
                backdropFilter: "blur(6px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Completed
            </div>
          </div>
        </div>

        {/* Right — details */}
        <div className="p-6 sm:p-8 flex flex-col">
          {/* Org name */}
          <div
            className="text-[11px] font-black uppercase tracking-[0.3em] mb-1"
            style={{ color: c.orange }}
          >
            AB FITNESS GYM
          </div>
          <h3
            className="font-black text-[22px] sm:text-[26px] leading-tight mb-1 uppercase"
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              color: c.text,
            }}
          >
            {ev.title}
          </h3>
          <div
            className="text-[14px] font-bold mb-4"
            style={{ color: c.muted }}
          >
            {ev.subtitle}
          </div>

          {/* Date / Time / Location */}
          <div className="flex flex-wrap gap-3 mb-5">
            {[
              { icon: "target", label: ev.date },
              { icon: "running", label: ev.time },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full"
                style={{
                  background: `${c.orange}14`,
                  border: `1px solid ${c.orange}33`,
                  color: c.text,
                }}
              >
                <Icon name={icon} size={12} color={c.orange} />
                {label}
              </div>
            ))}
          </div>
          <div className="text-[12px] mb-5" style={{ color: c.muted }}>
            📍 {ev.location} &nbsp;·&nbsp; 📞 {ev.phone}
          </div>

          {/* Activities */}
          <div className="mb-5">
            <div
              className="text-[11px] font-black uppercase tracking-widest mb-3"
              style={{ color: c.muted }}
            >
              Events
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ev.activities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 text-[12px] font-semibold"
                  style={{ color: c.text }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: c.orange }}
                  />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Prize */}
          <div
            className="flex items-center gap-2 text-[12px] font-bold px-4 py-2.5 rounded-[12px] mb-6"
            style={{
              background: `${c.orange}14`,
              border: `1px solid ${c.orange}33`,
              color: c.orange,
            }}
          >
            <Icon name="trophy" size={14} color={c.orange} />
            {ev.prize}
          </div>

          {/* View event photos link */}
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all hover:gap-3"
            style={{ color: c.cyan }}
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Event Photos <Icon name="arrow" size={14} color={c.cyan} />
          </a>
        </div>
      </div>

      {/* Timeline strip */}
      <div
        className="px-6 sm:px-8 py-5"
        style={{ borderTop: `1px solid ${c.border}` }}
      >
        <div
          className="text-[10px] font-black uppercase tracking-widest mb-4"
          style={{ color: c.muted }}
        >
          Event Timeline
        </div>
        <div className="flex items-center gap-0 overflow-x-auto">
          {TIMELINE.map((step, i) => (
            <div key={step} className="flex items-center shrink-0">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{ background: c.orange, color: "#fff" }}
                >
                  {i + 1}
                </div>
                <div
                  className="text-[10px] font-semibold text-center whitespace-nowrap"
                  style={{ color: c.text }}
                >
                  {step}
                </div>
              </div>
              {i < TIMELINE.length - 1 && (
                <div
                  className="w-8 sm:w-12 h-[2px] shrink-0 mx-1"
                  style={{ background: `${c.orange}44` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTABanner() {
  const c = useC()
  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1676655079738-af54dfd6318e?w=1600&h=600&fit=crop&auto=format&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: c.isDark ? 0.3 : 0.15 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: c.isDark
            ? `linear-gradient(135deg, ${c.bg} 30%, ${c.orange}22 100%)`
            : `linear-gradient(135deg, ${c.bg}ee 30%, ${c.orange}18 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: c.isDark
            ? `linear-gradient(${c.orange}08 1px, transparent 1px), linear-gradient(90deg, ${c.orange}08 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <Reveal
        dir="up"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <Heading center>
          READY TO{" "}
          <span
            style={{
              color: c.orange,
              textShadow: c.isDark ? `0 0 40px ${c.orange}` : "none",
            }}
          >
            TRANSFORM
          </span>
          <br />
          YOUR LIFE?
        </Heading>
        <p
          className="font-light mt-4 mb-10 max-w-md mx-auto text-[14px] sm:text-[15px]"
          style={{ color: c.muted }}
        >
          Your first trial session is completely free. Visit AB Fitness Hub in
          Kavoor, Mangalore.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 text-white font-bold text-[14px] px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{
              background: c.orange,
              boxShadow: c.isDark
                ? `0 0 32px ${c.orange}66`
                : `0 4px 20px ${c.orange}55`,
            }}
          >
            {/* Pulse rings */}
            <span
              className="animate-pulse-ring absolute inset-0 rounded-full pointer-events-none"
              style={{ border: `2px solid ${c.orange}` }}
            />
            <span
              className="animate-pulse-ring absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: `2px solid ${c.orange}`,
                animationDelay: "0.7s",
              }}
            />
            Book a Free Trial <Icon name="arrow" size={18} color="#fff" />
          </a>
          <a
            href="tel:+918660563719"
            className="inline-flex items-center gap-2 font-semibold text-[14px] px-8 py-4 rounded-full transition-all"
            style={{
              border: `1.5px solid ${c.border}`,
              color: c.text,
              background: c.card,
            }}
          >
            <Icon name="phone" size={16} color={c.orange} /> Call Us Now
          </a>
        </div>
      </Reveal>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const c = useC()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  return (
    <Section id="contact" bg={c.bg} border>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 md:gap-16">
        <Reveal dir="left">
          <div>
            <SectionLabel text="Contact Us" />
            <Heading size="md">
              Visit Us in <span style={{ color: c.orange }}>Kavoor</span>,
              Mangalore
            </Heading>
            <div className="space-y-5 my-8">
              {[
                {
                  icon: "location",
                  label: "Location",
                  value:
                    "AB Fitness Hub,2nd Floor Durga Prasad Complex, Kavoor, Mangalore, Karnataka – 575015",
                  color: c.orange,
                },
                {
                  icon: "phone",
                  label: "Phone",
                  value: "+91 8660563719 ,8277299541",
                  color: c.cyan,
                },
                {
                  icon: "clock",
                  label: "Hours",
                  value:
                    "Mon–Sat:\n 5:00 AM – 11:00 AM\n3:30 PM – 11:00 PM\nSunday: Holiday",
                  color: c.orange,
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
                    style={{
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}33`,
                    }}
                  >
                    <Icon name={item.icon} size={20} color={item.color} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-[13px] font-light whitespace-pre-line"
                      style={{ color: c.muted }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="h-48 rounded-[18px] overflow-hidden"
              style={{ border: `1px solid ${c.orange}33` }}
            >
              <iframe
                title="AB Fitness Hub"
                src="https://maps.google.com/maps?q=Kavoor+Mangalore+Karnataka&output=embed&z=15"
                className="w-full h-full border-0 opacity-80"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
        <Reveal dir="right">
          <div
            className="rounded-[24px] p-6 sm:p-8"
            style={{
              background: c.card,
              border: `1px solid ${c.orange}33`,
              boxShadow: c.isDark
                ? `0 0 40px ${c.orange}10`
                : `0 4px 24px rgba(0,0,0,0.08)`,
            }}
          >
            <h3
              className="font-black text-[22px] mb-1 uppercase"
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                color: c.text,
              }}
            >
              Book a Free Trial
            </h3>
            <p
              className="text-[13px] font-light mb-7"
              style={{ color: c.muted }}
            >
              We'll reach out within 24 hours to confirm your session.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const message = `🏋️ AB FITNESS HUB — FREE TRIAL ENQUIRY

Hello! I'd like to book a free trial.

👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}
💬 Message: ${form.message || "No message provided"}

Thank you! 🙏`
                const whatsappUrl = `https://wa.me/918660563719?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
              className="space-y-4"
            >
                {[
                  {
                    id: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Your Name",
                  },
                  {
                    id: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                  {
                    id: "phone",
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                  },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-[11px] font-bold uppercase tracking-widest mb-2"
                      style={{ color: c.muted }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[(f.id as keyof typeof form)]}
                      onChange={(e) =>
                        setForm({ ...form, [f.id]: e.target.value })
                      }
                      className="w-full px-4 py-3 text-[14px] rounded-[14px] outline-none transition-all"
                      style={{
                        background: c.inputBg,
                        border: `1px solid ${c.inputBorder}`,
                        color: c.text,
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = c.orange + "88")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = c.inputBorder)
                      }
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: c.muted }}
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your fitness goals..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 text-[14px] rounded-[14px] outline-none transition-all resize-none"
                    style={{
                      background: c.inputBg,
                      border: `1px solid ${c.inputBorder}`,
                      color: c.text,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = c.orange + "88")
                    }
                    onBlur={(e) => (e.target.style.borderColor = c.inputBorder)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white font-bold text-[14px] py-4 rounded-[14px] transition-all hover:scale-[1.01]"
                  style={{
                    background: c.orange,
                    boxShadow: c.isDark
                      ? `0 0 24px ${c.orange}44`
                      : `0 2px 16px ${c.orange}44`,
                  }}
                >
                  Book My Free Trial →
                </button>
              </form>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  const c = useC()
  return (
    <section
      className="py-12 md:py-16"
      style={{ background: c.surface, borderTop: `1px solid ${c.orange}18` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 items-center">
        <Reveal dir="left">
          <div>
            <h3
              className="font-black leading-tight uppercase"
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: c.text,
              }}
            >
              Subscribe to our newsletter
            </h3>
          </div>
        </Reveal>
        <Reveal dir="right" delay={80}>
          <div className="flex items-center justify-end gap-3">
            <p
              className="text-[14px] font-medium"
              style={{ color: c.muted }}
            >
              Follow us on Instagram
            </p>
            <a
              href="https://www.instagram.com/abfitnesshub_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[52px] h-[52px] flex items-center justify-center rounded-[14px] transition-all hover:scale-105"
              style={{
                background: c.orange,
                boxShadow: c.isDark
                  ? `0 0 16px ${c.orange}55`
                  : `0 2px 10px ${c.orange}44`,
              }}
              aria-label="Open Instagram"
              title="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const c = useC()
  return (
    <footer
      style={{ background: c.card, borderTop: `1px solid ${c.orange}22` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={40} />
              <div>
                <div
                  className="font-bold text-[13px] uppercase"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    letterSpacing: "0.1em",
                    color: c.text,
                  }}
                >
                  AB FITNESS HUB
                </div>
                <div
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: c.orange }}
                >
                  Kavoor · Mangalore
                </div>
              </div>
            </div>
            <p
              className="text-[12px] leading-relaxed font-light mb-5"
              style={{ color: c.muted }}
            >
              Mangalore's premier fitness destination, transforming bodies and
              minds since 2016.
            </p>
            <div className="flex gap-2 flex-wrap">
              <a
                href="https://www.instagram.com/abfitnesshub_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                style={{
                  background: `${c.orange}18`,
                  border: `1px solid ${c.orange}55`,
                }}
                title="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={c.orange}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill={c.orange}
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
          </div>
          {[
            {
              title: "Our Services",
              links: [
                "Personal Training",
                "Group Fitness Classes",
                "Nutritional Counseling",
                "Cardiovascular Workouts",
                "Functional Training",
              ],
            },
            {
              title: "Useful Links",
              links: ["Home", "About Us", "Services", "Pricing", "Features"],
            },
            {
              title: "Support",
              links: [
                "Contact Us",
                "Help Center",
                "Privacy Policy",
                "Terms & Conditions",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="font-bold text-[13px] mb-4 uppercase tracking-wider"
                style={{ color: c.text }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[12px] font-light transition-colors"
                      style={{ color: c.muted }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = c.orange)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = c.muted)
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="rounded-[18px] p-4 mb-8 flex flex-wrap gap-5"
          style={{
            background: c.surface,
            border: `1px solid ${c.borderFaint}`,
          }}
        >
          {[
            {
              icon: "instagram",
              val: "@abfitnesshub_official",
              col: c.lime,
              href: "https://www.instagram.com/abfitnesshub_official/",
            },
            { icon: "phone", val: "+91 8660563719 ,8277299541", col: c.cyan },
            {
              icon: "location",
              val: "2nd Floor Durga Prasad Complex,Kavoor, Mangalore, Karnataka",
              col: c.orange,
            },
          ].map((item) => (
            <div key={item.val} className="flex items-center gap-3">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Icon name={item.icon} size={16} color={item.col} />
                </a>
              ) : (
                <Icon name={item.icon} size={16} color={item.col} />
              )}
              <span className="text-[12px]" style={{ color: c.muted }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{
            borderTop: `1px solid ${c.borderFaint}`,
            paddingTop: "1.5rem",
          }}
        >
          <p className="text-[12px]" style={{ color: c.muted }}>
            © 2024 AB Fitness Hub,2nd Floor Durga Prasad Complex, Kavoor,
            Mangalore. All rights reserved.
          </p>
          <a
            href="#"
            className="text-[12px] transition-colors"
            style={{ color: c.muted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.muted)}
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function AppInner() {
  const c = useC()

  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem(INTRO_SESSION_KEY)
    } catch {
      return false
    }
  })

  const handleIntroDone = () => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1")
    } catch {
      /* ok */
    }
    setShowIntro(false)
  }

  return (
    <div style={{ background: c.bg, minHeight: "100vh" }}>
      {showIntro && <CinematicIntro onDone={handleIntroDone} />}
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Programs />
      <HowWeWork />
      <Trainers />
      <Schedule />
      <Memberships />
      <Reviews />
      <Gallery />
      <Events />
      <FAQ />
      <CTABanner />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
