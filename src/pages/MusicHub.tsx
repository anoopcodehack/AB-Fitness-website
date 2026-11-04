import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Headphones,
  Radio,
  Play,
  ExternalLink,
  Flame,
  Activity,
  Volume2,
  Clock,
  Dumbbell,
  MapPin,
  MessageCircle,
  Share2,
  Check,
  Disc3,
  ListMusic,
  Heart,
  TrendingUp,
} from "lucide-react";
import logoImg from "@/imports/image-10.png";
import GymStatusBadge from "@/components/GymStatusBadge";

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────
type Colors = {
  bg: string;
  card: string;
  surface: string;
  orange: string;
  cyan: string;
  lime: string;
  text: string;
  muted: string;
  faint: string;
  border: string;
  borderFaint: string;
  navBg: string;
  navBorder: string;
  mobileMenuBg: string;
  isDark: boolean;
};

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
  isDark: true,
};

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
  isDark: false,
};

type ThemeCtx = { isDark: boolean; toggle: () => void };
const ThemeContext = createContext<ThemeCtx>({ isDark: true, toggle: () => {} });
const useTheme = () => useContext(ThemeContext);
const useC = (): Colors => (useTheme().isDark ? DARK_C : LIGHT_C);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("ab-theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggle = () => {
    document.documentElement.classList.add("theme-switching");
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("ab-theme", next ? "dark" : "light");
      } catch {}
      return next;
    });
    setTimeout(() => document.documentElement.classList.remove("theme-switching"), 450);
  };

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>;
}

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
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
        border: `1.5px solid ${isDark ? "rgba(255,72,0,0.3)" : "rgba(0,0,0,0.15)"}`,
        cursor: "pointer",
        flexShrink: 0,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 6,
          display: "flex",
          alignItems: "center",
          opacity: isDark ? 1 : 0,
          transition: "opacity 0.2s",
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
          transition: "opacity 0.2s",
        }}
      >
        <Sun size={11} color="#d93c08" />
      </span>
      <span
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: isDark ? "#ff4800" : "#d93c08",
          left: isDark ? 34 : 4,
          transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isDark ? "0 0 8px rgba(255,72,0,0.5)" : "0 1px 4px rgba(0,0,0,0.25)",
        }}
      >
        {isDark ? <Moon size={11} color="#fff" /> : <Sun size={11} color="#fff" />}
      </span>
    </button>
  );
}

// ─── PLAYLIST & MARQUEE DATA ──────────────────────────────────────────────────
type PlaylistCategory = "all" | "beast" | "cardio" | "hiphop" | "desi" | "cooldown";

type Playlist = {
  id: string;
  category: PlaylistCategory;
  title: string;
  tagline: string;
  bpm: string;
  intensity: "Maximum" | "High" | "Mid-High" | "Peak Bass" | "Low / Recovery";
  duration: string;
  tracksCount: string;
  accent: string;
  accentBg: string;
  coverImage: string;
  genre: string;
  bestFor: string;
  spotifyId: string;
  spotifyUrl: string;
  youtubeId: string;
  youtubeUrl: string;
  highlights: string[];
};

type MarqueeTrack = {
  id: string;
  title: string;
  artist: string;
  bpm: string;
  coverImage: string;
  categoryTag: string;
  accent: string;
  targetPlaylistId: string;
};

const PLAYLISTS: Playlist[] = [
  {
    id: "beast-mode-phonk",
    category: "beast",
    title: "Beast Mode & Heavy Phonk",
    tagline: "Uncompromising Bass & Aggressive Rhythms for Heavy PRs",
    bpm: "155 - 165 BPM",
    intensity: "Maximum",
    duration: "3h 45m",
    tracksCount: "68 Tracks",
    accent: "#ff4800",
    accentBg: "rgba(255, 72, 0, 0.14)",
    coverImage:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    genre: "Drift Phonk • Hardstyle • Heavy Bass • Metal Trap",
    bestFor: "Max Deadlifts, Squat Sets, Bench PRs & Powerlifting",
    spotifyId: "37i9dQZF1DX76Wlfdnj7AP",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
    youtubeId: "Wp6F5w5hY9M",
    youtubeUrl: "https://music.youtube.com/search?q=beast+mode+gym+phonk+workout",
    highlights: ["Ghostface Playa", "Kordhell", "DVRST", "Mick Gordon", "Gravechill"],
  },
  {
    id: "cardio-hiit-rush",
    category: "cardio",
    title: "Cardio Rush & HIIT Stamina",
    tagline: "High-Cadence Four-on-the-Floor Electronic Driving Pulse",
    bpm: "130 - 138 BPM",
    intensity: "High",
    duration: "2h 55m",
    tracksCount: "54 Tracks",
    accent: "#00d4ff",
    accentBg: "rgba(0, 212, 255, 0.14)",
    coverImage:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80",
    genre: "Tech House • Progressive EDM • Melodic Drum & Bass",
    bestFor: "Treadmill Sprints, Assault Bike, Rowing, Speed Rope & HIIT",
    spotifyId: "37i9dQZF1DXdURbg6aqWOh",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdURbg6aqWOh",
    youtubeId: "vB6t5jYc1Lg",
    youtubeUrl: "https://music.youtube.com/search?q=cardio+hiit+workout+edm+beats",
    highlights: ["Fisher", "Fred Again..", "Sub Focus", "John Summit", "Dimension"],
  },
  {
    id: "gym-floor-hiphop",
    category: "hiphop",
    title: "AB Daily Floor Pump (Trap & Rap)",
    tagline: "Heavy 808s and Certified Anthems for Pure Hypertrophy",
    bpm: "120 - 128 BPM",
    intensity: "Mid-High",
    duration: "3h 20m",
    tracksCount: "62 Tracks",
    accent: "#b3ff00",
    accentBg: "rgba(179, 255, 0, 0.14)",
    coverImage:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
    genre: "Modern Trap • 90s Hardcore Rap • Grime • Gym Edits",
    bestFor: "Push / Pull / Legs, Dumbbell Isolations, Arm Day & Cable Dropsets",
    spotifyId: "37i9dQZF1DWTl4ym9csNA2",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWTl4ym9csNA2",
    youtubeId: "1-xGerv5FOk",
    youtubeUrl: "https://music.youtube.com/search?q=hip+hop+gym+workout+motivation+trap",
    highlights: ["Travis Scott", "Eminem", "DMX", "Pop Smoke", "21 Savage"],
  },
  {
    id: "desi-south-bass",
    category: "desi",
    title: "Desi & South Bass Floor Pump",
    tagline: "High-Energy Indian & Regional Heavy Bass Anthems",
    bpm: "135 - 150 BPM",
    intensity: "Peak Bass",
    duration: "2h 40m",
    tracksCount: "48 Tracks",
    accent: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.14)",
    coverImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    genre: "Dhol Bass Remixes • South Cinema Hype Tracks • Street Metal",
    bestFor: "Peak Evening Rush Hours, Group Motivation & High Energy Lifting",
    spotifyId: "37i9dQZF1DX89tqXwB6z5g",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX89tqXwB6z5g",
    youtubeId: "ZgI4i2xX76Y",
    youtubeUrl: "https://music.youtube.com/search?q=desi+gym+workout+bass+remix",
    highlights: ["Anirudh", "Bloodywood", "DIVINE", "Nucleya", "KGF Anthem Remixed"],
  },
  {
    id: "cool-down-mobility",
    category: "cooldown",
    title: "Cool-Down & Mobility Stretch",
    tagline: "Slow-Tempo Atmospheric Lo-Fi for Post-Workout Recovery",
    bpm: "82 - 96 BPM",
    intensity: "Low / Recovery",
    duration: "2h 15m",
    tracksCount: "45 Tracks",
    accent: "#a855f7",
    accentBg: "rgba(168, 85, 247, 0.14)",
    coverImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    genre: "Chillhop • Ambient Soundscapes • Low-Fi Beats",
    bestFor: "Post-Workout Stretching, Foam Rolling, Sauna & Protein Hub Shakes",
    spotifyId: "37i9dQZF1DX4WYpdgoIcn6",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
    youtubeId: "jfKfPfyJRdk",
    youtubeUrl: "https://music.youtube.com/search?q=lofi+workout+cool+down+stretch",
    highlights: ["Kupla", "Idealism", "Kavv", "Jinsang", "Nujabes Inspired"],
  },
];

const MARQUEE_TRACKS: MarqueeTrack[] = [
  {
    id: "t1",
    title: "Sahara",
    artist: "Hensonn",
    bpm: "160 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Beast Mode Phonk",
    accent: "#ff4800",
    targetPlaylistId: "beast-mode-phonk",
  },
  {
    id: "t2",
    title: "Losing It",
    artist: "FISHER",
    bpm: "126 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Cardio HIIT Rush",
    accent: "#00d4ff",
    targetPlaylistId: "cardio-hiit-rush",
  },
  {
    id: "t3",
    title: "Till I Collapse",
    artist: "Eminem ft. Nate Dogg",
    bpm: "171 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Gym Floor Classic",
    accent: "#b3ff00",
    targetPlaylistId: "gym-floor-hiphop",
  },
  {
    id: "t4",
    title: "Metamorphosis",
    artist: "INTERWORLD",
    bpm: "165 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Deadlift PR Vibe",
    accent: "#ff4800",
    targetPlaylistId: "beast-mode-phonk",
  },
  {
    id: "t5",
    title: "KGF Monster Bass Edit",
    artist: "Ravi Basrur & Bass Boost",
    bpm: "142 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
    categoryTag: "South Bass Energy",
    accent: "#f59e0b",
    targetPlaylistId: "desi-south-bass",
  },
  {
    id: "t6",
    title: "Can't Be Touched",
    artist: "Roy Jones Jr.",
    bpm: "145 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Fighter Stamina",
    accent: "#00d4ff",
    targetPlaylistId: "cardio-hiit-rush",
  },
  {
    id: "t7",
    title: "Bones",
    artist: "Imagine Dragons",
    bpm: "114 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Heavy Barbell Reps",
    accent: "#b3ff00",
    targetPlaylistId: "gym-floor-hiphop",
  },
  {
    id: "t8",
    title: "Aarambh Hai Prachand",
    artist: "Piyush Mishra (Bass Boost)",
    bpm: "138 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Indian Gym Anthem",
    accent: "#f59e0b",
    targetPlaylistId: "desi-south-bass",
  },
  {
    id: "t9",
    title: "Midnight City",
    artist: "M83 (Workout Edit)",
    bpm: "105 BPM",
    coverImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80",
    categoryTag: "Recovery Stretch",
    accent: "#a855f7",
    targetPlaylistId: "cool-down-mobility",
  },
];

// Duplicate tracks for infinite seamless horizontal scrolling loop
const INFINITE_MARQUEE_TRACKS = [...MARQUEE_TRACKS, ...MARQUEE_TRACKS];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function MusicHubContent() {
  const c = useC();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<"spotify" | "youtube">("spotify");
  const [activeCategory, setActiveCategory] = useState<PlaylistCategory>("all");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(PLAYLISTS[0]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);

  // Song request state
  const [reqBranch, setReqBranch] = useState<"kavoor" | "deralakatte">("kavoor");
  const [reqSong, setReqSong] = useState("");
  const [reqArtist, setReqArtist] = useState("");
  const [reqTime, setReqTime] = useState("Evening Workout (5 PM - 8 PM)");
  const [reqSent, setReqSent] = useState(false);

  useEffect(() => {
    document.title = "AB Music Hub | Gym Workout Playlists & Floor Beats • AB Fitness";
  }, []);

  const filteredPlaylists =
    activeCategory === "all" ? PLAYLISTS : PLAYLISTS.filter((p) => p.category === activeCategory);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleMarqueeCardClick = (track: MarqueeTrack) => {
    const matched = PLAYLISTS.find((p) => p.id === track.targetPlaylistId);
    if (matched) {
      setSelectedPlaylist(matched);
      const stageEl = document.getElementById("active-stage");
      stageEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuickRequestFromTrack = (track: MarqueeTrack) => {
    setReqSong(track.title);
    setReqArtist(track.artist);
    const reqSection = document.getElementById("request-track-section");
    reqSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSongRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqSong.trim()) return;

    const branchPhone = reqBranch === "kavoor" ? "918431293951" : "917019844639";
    const branchName = reqBranch === "kavoor" ? "Kavoor Branch" : "Deralakatte Branch";

    const text = `🎧 *AB Fitness Gym Floor Song Request*%0A%0A📍 *Branch:* ${encodeURIComponent(
      branchName,
    )}%0A🎵 *Song Name:* ${encodeURIComponent(reqSong)}%0A👤 *Artist:* ${encodeURIComponent(
      reqArtist || "Not specified",
    )}%0A⏰ *Workout Slot:* ${encodeURIComponent(
      reqTime,
    )}%0A%0A_Please queue this track on the gym floor audio system today!_ 🔥`;

    window.open(`https://wa.me/${branchPhone}?text=${text}`, "_blank", "noopener,noreferrer");
    setReqSent(true);
    setTimeout(() => setReqSent(false), 5000);
  };

  return (
    <div
      style={{
        background: c.bg,
        minHeight: "100vh",
        width: "100%",
        color: c.text,
      }}
    >
      {/* Scoped CSS animations for horizontal marquee ticker & rotating vinyl disc */}
      <style>{`
        @keyframes marquee-scroll-slow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes vinyl-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bar-bounce {
          0%, 100% { height: 25%; }
          50% { height: 100%; }
        }
      `}</style>

      {/* ─── STICKY HEADER ─────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all border-b"
        style={{
          background: c.navBg,
          backdropFilter: "blur(14px)",
          borderColor: c.navBorder,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[66px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer text-left"
            >
              <img
                src={logoImg}
                alt="AB Fitness"
                className="w-10 h-10 rounded-full object-cover border"
                style={{ borderColor: `${c.orange}55` }}
              />
              <div>
                <div
                  className="font-bold text-[14px] tracking-wider leading-none uppercase"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  AB MUSIC HUB
                </div>
                <div
                  className="text-[9px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: c.orange }}
                >
                  Official Gym Sound System
                </div>
              </div>
            </button>
          </div>

          {/* Center branch quick links */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => navigate("/kavoor")}
              className="px-3 py-1.5 rounded-full border transition-colors hover:text-orange-400 cursor-pointer"
              style={{
                borderColor: c.border,
                background: c.surface,
                color: c.muted,
              }}
            >
              Kavoor Branch
            </button>
            <button
              onClick={() => navigate("/deralakatte")}
              className="px-3 py-1.5 rounded-full border transition-colors hover:text-orange-400 cursor-pointer"
              style={{
                borderColor: c.border,
                background: c.surface,
                color: c.muted,
              }}
            >
              Deralakatte Branch
            </button>
            <button
              onClick={() => navigate("/protein-hub")}
              className="px-3 py-1.5 rounded-full border transition-colors hover:text-cyan-400 cursor-pointer text-cyan-500"
              style={{
                borderColor: "rgba(0, 212, 255, 0.3)",
                background: "rgba(0, 212, 255, 0.08)",
              }}
            >
              Protein Hub Cafe 🥤
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <GymStatusBadge branch="kavoor" variant="compact" className="hidden sm:inline-flex" />
            <ThemeToggle />
            <button
              onClick={handleShare}
              className="p-2 rounded-full border transition-colors cursor-pointer"
              style={{
                borderColor: c.border,
                background: c.surface,
                color: copiedLink ? "#22c55e" : c.muted,
              }}
              title="Share Music Hub Link"
            >
              {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="pt-28 pb-6 sm:pt-36 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient background glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] rounded-full pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${c.orange} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border"
            style={{
              background: `${c.orange}14`,
              borderColor: `${c.orange}35`,
              color: c.orange,
            }}
          >
            <Radio size={14} className="animate-pulse" />
            <span>AB Sound System • High-BPM Workout Audio</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-5"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Tuned for Maximum <span style={{ color: c.orange }}>PRs &amp; Energy</span>
          </h1>

          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 opacity-80">
            Music is 80% of workout motivation. Fuel your sets with high-BPM gym playlists curated
            specifically for heavy lifting, high-cadence cardio intervals, and peak gym floor hype.
          </p>

          {/* Platform Switcher (Spotify vs YouTube) */}
          <div
            className="inline-flex items-center p-1.5 rounded-2xl border mb-6"
            style={{
              background: c.card,
              borderColor: c.border,
            }}
          >
            <button
              onClick={() => setPlatform("spotify")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer"
              style={{
                background: platform === "spotify" ? "#1DB954" : "transparent",
                color: platform === "spotify" ? "#000000" : c.muted,
                boxShadow: platform === "spotify" ? "0 4px 16px rgba(29, 185, 84, 0.4)" : "none",
              }}
            >
              <Disc3 size={16} />
              <span>Spotify Player</span>
            </button>

            <button
              onClick={() => setPlatform("youtube")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer"
              style={{
                background: platform === "youtube" ? "#FF0000" : "transparent",
                color: platform === "youtube" ? "#ffffff" : c.muted,
                boxShadow: platform === "youtube" ? "0 4px 16px rgba(255, 0, 0, 0.4)" : "none",
              }}
            >
              <Play size={15} />
              <span>YouTube / YT Music</span>
            </button>
          </div>

          {/* Quick Info Pill */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold"
            style={{ color: c.muted }}
          >
            <span className="flex items-center gap-1.5">
              <Headphones size={13} className="text-orange-500" /> Free to stream directly
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Activity size={13} className="text-cyan-500" /> BPM matched for training zones
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Dumbbell size={13} className="text-lime-500" /> Played live on AB Gym floors
            </span>
          </div>
        </div>
      </section>

      {/* ─── SLOW-MOVING HORIZONTAL MUSIC IMAGES MARQUEE ───────────────────── */}
      <section
        className="w-full py-8 overflow-hidden relative border-y"
        style={{ borderColor: c.border }}
      >
        {/* Section title & hover instruction */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-orange-500" />
            <span
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: c.text, fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Floor Anthems &amp; Track Highlights
            </span>
          </div>
          <span className="text-[11px] font-semibold opacity-60 hidden sm:inline-block">
            Hover to pause • Click image to load vibe
          </span>
        </div>

        {/* Gradient edge masks for smooth infinite look */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${c.bg}, transparent)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${c.bg}, transparent)`,
          }}
        />

        {/* The moving track row */}
        <div
          className="overflow-hidden w-full select-none cursor-pointer"
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
        >
          <div
            className="flex gap-4 sm:gap-6"
            style={{
              animation: "marquee-scroll-slow 48s linear infinite",
              animationPlayState: marqueePaused ? "paused" : "running",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {INFINITE_MARQUEE_TRACKS.map((track, idx) => (
              <div
                key={`${track.id}-${idx}`}
                onClick={() => handleMarqueeCardClick(track)}
                className="group relative w-64 sm:w-72 rounded-[22px] overflow-hidden border transition-all duration-300 hover:scale-[1.03] shrink-0"
                style={{
                  background: c.card,
                  borderColor: `${track.accent}33`,
                  boxShadow: c.isDark
                    ? "0 8px 24px rgba(0,0,0,0.5)"
                    : "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                {/* Image Container with Vinyl Peeking Effect */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Dark gradient vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                    }}
                  />

                  {/* Category Pill Overlay */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md"
                      style={{
                        background: "rgba(0,0,0,0.65)",
                        border: `1px solid ${track.accent}55`,
                      }}
                    >
                      {track.categoryTag}
                    </span>
                  </div>

                  {/* BPM badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white backdrop-blur-md"
                      style={{
                        background: `${track.accent}cc`,
                        boxShadow: `0 2px 8px ${track.accent}66`,
                      }}
                    >
                      {track.bpm}
                    </span>
                  </div>

                  {/* Interactive audio equalizers on hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1 h-4">
                      {[40, 90, 60, 100, 75].map((h, bIdx) => (
                        <span
                          key={bIdx}
                          className="w-1 rounded-full bg-white transition-all"
                          style={{
                            height: `${h}%`,
                            animation: `bar-bounce ${0.5 + bIdx * 0.15}s ease-in-out infinite alternate`,
                          }}
                        />
                      ))}
                    </div>

                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white transition-all group-hover:scale-105"
                      style={{ background: "rgba(0,0,0,0.7)" }}
                    >
                      ▶ Load Vibe
                    </span>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h4
                      className="font-black text-base uppercase leading-tight line-clamp-1"
                      style={{
                        color: c.text,
                        fontFamily: "Barlow Condensed, sans-serif",
                      }}
                    >
                      {track.title}
                    </h4>
                    <p className="text-xs opacity-70 line-clamp-1 mt-0.5">{track.artist}</p>
                  </div>

                  {/* Quick Action Button */}
                  <div
                    className="mt-3 pt-2.5 border-t flex items-center justify-between text-[11px]"
                    style={{ borderColor: c.border }}
                  >
                    <span
                      className="font-bold flex items-center gap-1"
                      style={{ color: track.accent }}
                    >
                      <Activity size={12} /> {track.bpm}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickRequestFromTrack(track);
                      }}
                      className="font-semibold opacity-70 hover:opacity-100 transition-opacity hover:underline cursor-pointer"
                      title="Request track on gym floor"
                    >
                      Request on Floor 💬
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTIVE STAGE PLAYER ────────────────────────────────────────────── */}
      <section id="active-stage" className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
        <div
          className="rounded-[28px] border overflow-hidden p-6 sm:p-8 relative"
          style={{
            background: c.card,
            borderColor: selectedPlaylist.accent + "44",
            boxShadow: c.isDark
              ? `0 20px 60px ${selectedPlaylist.accent}15`
              : "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header strip */}
          <div
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b"
            style={{ borderColor: c.border }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                  style={{
                    background: selectedPlaylist.accentBg,
                    color: selectedPlaylist.accent,
                    border: `1px solid ${selectedPlaylist.accent}44`,
                  }}
                >
                  ⚡ NOW ACTIVE: {selectedPlaylist.bpm}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: c.surface, color: c.muted }}
                >
                  {selectedPlaylist.intensity} Intensity
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                {selectedPlaylist.title}
              </h2>
              <p className="text-xs sm:text-sm opacity-70 mt-0.5">{selectedPlaylist.tagline}</p>
            </div>

            {/* Direct Open in Streaming App Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href={selectedPlaylist.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
                style={{ background: "#1DB954" }}
              >
                <Disc3 size={15} /> Open in Spotify <ExternalLink size={12} />
              </a>

              <a
                href={selectedPlaylist.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-105"
                style={{ background: "#FF0000" }}
              >
                <Play size={14} /> Open in YT Music <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Player Embed & Interactive Vinyl Disc Display */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Embed container (7 cols) */}
            <div
              className="lg:col-span-7 rounded-2xl overflow-hidden border"
              style={{ borderColor: c.border, background: "#000" }}
            >
              {platform === "spotify" ? (
                <iframe
                  title={`Spotify - ${selectedPlaylist.title}`}
                  src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="360"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full border-0"
                />
              ) : (
                <div className="relative w-full aspect-video">
                  <iframe
                    title={`YouTube - ${selectedPlaylist.title}`}
                    src={`https://www.youtube-nocookie.com/embed/${selectedPlaylist.youtubeId}?autoplay=0&rel=0`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            {/* Playlist Meta & Vinyl Disc Turntable (5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              {/* Interactive Vinyl Spinning Card */}
              <div
                className="p-4 rounded-2xl border relative overflow-hidden flex items-center gap-4"
                style={{
                  background: c.surface,
                  borderColor: selectedPlaylist.accent + "44",
                }}
              >
                {/* Rotating Vinyl Record Graphic */}
                <div className="relative w-20 h-20 shrink-0">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center shadow-lg border border-neutral-700"
                    style={{
                      background: "radial-gradient(circle, #222 0%, #0d0d0d 60%, #1a1a1a 100%)",
                      animation: "vinyl-spin 8s linear infinite",
                    }}
                  >
                    {/* Vinyl grooves rings */}
                    <div className="w-14 h-14 rounded-full border border-neutral-700 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-800">
                        <img
                          src={selectedPlaylist.coverImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Center needle dot */}
                  <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white shadow" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: selectedPlaylist.accent }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                      Active Vinyl Deck
                    </span>
                  </div>
                  <div
                    className="font-black text-sm uppercase leading-tight line-clamp-1"
                    style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  >
                    {selectedPlaylist.title}
                  </div>
                  <p className="text-[11px] opacity-70 mt-0.5">{selectedPlaylist.genre}</p>
                </div>
              </div>

              {/* Target Training Zone */}
              <div
                className="p-4 rounded-xl border"
                style={{ background: c.surface, borderColor: c.border }}
              >
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                  Target Training Zone
                </div>
                <div className="text-sm font-bold" style={{ color: selectedPlaylist.accent }}>
                  {selectedPlaylist.bestFor}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  className="p-3 rounded-xl border"
                  style={{ background: c.surface, borderColor: c.border }}
                >
                  <div className="flex items-center gap-1.5 opacity-60 font-semibold mb-0.5">
                    <Clock size={12} /> Duration
                  </div>
                  <div className="text-sm font-extrabold">{selectedPlaylist.duration}</div>
                </div>

                <div
                  className="p-3 rounded-xl border"
                  style={{ background: c.surface, borderColor: c.border }}
                >
                  <div className="flex items-center gap-1.5 opacity-60 font-semibold mb-0.5">
                    <Volume2 size={12} /> Tracks Count
                  </div>
                  <div className="text-sm font-extrabold">{selectedPlaylist.tracksCount}</div>
                </div>
              </div>

              <div
                className="p-4 rounded-xl border"
                style={{ background: c.surface, borderColor: c.border }}
              >
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">
                  Featured Artists &amp; Sounds
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPlaylist.highlights.map((artist, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                      style={{
                        background: c.isDark ? "#222" : "#e5e5e5",
                        color: c.text,
                      }}
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[11px] opacity-70 italic flex items-center gap-1.5">
                <Flame size={13} className="text-orange-500 shrink-0" />
                <span>
                  Tip: Download this playlist in Spotify / YT Music for offline reps with no
                  buffering.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLAYLIST BROWSER & IMAGE CARDS ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div
              className="text-[11px] font-black uppercase tracking-widest"
              style={{ color: c.orange }}
            >
              Workout Sound Library
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Curated Workout Playlists
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: "all", label: "All Vibes" },
              { id: "beast", label: "Beast Mode" },
              { id: "cardio", label: "Cardio HIIT" },
              { id: "hiphop", label: "Floor Pump" },
              { id: "desi", label: "Desi Bass" },
              { id: "cooldown", label: "Cool Down" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as PlaylistCategory)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border"
                style={{
                  background: activeCategory === cat.id ? c.orange : c.surface,
                  borderColor: activeCategory === cat.id ? c.orange : c.border,
                  color: activeCategory === cat.id ? "#ffffff" : c.muted,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Playlist Grid with Cover Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((pl) => {
            const isSelected = selectedPlaylist.id === pl.id;

            return (
              <div
                key={pl.id}
                onClick={() => {
                  setSelectedPlaylist(pl);
                  const stageEl = document.getElementById("active-stage");
                  stageEl?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group rounded-[24px] overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer relative"
                style={{
                  background: c.card,
                  borderColor: isSelected ? pl.accent : c.border,
                  boxShadow: isSelected
                    ? `0 10px 30px ${pl.accent}25`
                    : c.isDark
                      ? "0 4px 20px rgba(0,0,0,0.4)"
                      : "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                {/* Visual Cover Art Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={pl.coverImage}
                    alt={pl.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md"
                      style={{
                        background: `${pl.accent}dd`,
                        boxShadow: `0 2px 8px ${pl.accent}55`,
                      }}
                    >
                      {pl.bpm}
                    </span>

                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-md"
                      style={{ background: "rgba(0,0,0,0.6)" }}
                    >
                      {pl.duration}
                    </span>
                  </div>

                  {/* Play on Stage Hint Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full text-white backdrop-blur-md transition-all group-hover:scale-105"
                      style={{
                        background: isSelected ? pl.accent : "rgba(0,0,0,0.75)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <Play size={12} fill="#fff" />{" "}
                      {isSelected ? "Playing in Stage" : "Load in Stage"}
                    </span>

                    <span className="text-[10px] font-bold text-white opacity-80">
                      {pl.tracksCount}
                    </span>
                  </div>
                </div>

                {/* Card Text Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className="text-xl font-black uppercase leading-tight mb-1"
                      style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                    >
                      {pl.title}
                    </h4>
                    <p className="text-xs opacity-75 mb-3 line-clamp-2 leading-relaxed">
                      {pl.tagline}
                    </p>

                    <div className="text-[11px] font-semibold opacity-60 mb-3">
                      Best For: <span className="opacity-90">{pl.bestFor}</span>
                    </div>
                  </div>

                  {/* Bottom Streaming App Links */}
                  <div
                    className="pt-3 border-t flex items-center justify-between"
                    style={{ borderColor: c.border }}
                  >
                    <span
                      className="text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      style={{ color: pl.accent }}
                    >
                      <ListMusic size={14} /> Listen Now
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={pl.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        style={{ background: "#1DB954", color: "#000" }}
                        title="Open in Spotify"
                      >
                        <Disc3 size={14} />
                      </a>
                      <a
                        href={pl.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        style={{ background: "#FF0000", color: "#fff" }}
                        title="Open in YouTube Music"
                      >
                        <Play size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── REQUEST A TRACK FOR GYM FLOOR ─────────────────────────────────── */}
      <section id="request-track-section" className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
        <div
          className="rounded-[28px] p-6 sm:p-10 border relative overflow-hidden"
          style={{
            background: c.card,
            borderColor: `${c.orange}33`,
            boxShadow: c.isDark ? "0 10px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div className="max-w-xl mx-auto text-center mb-8">
            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"
              style={{
                background: "rgba(255, 72, 0, 0.12)",
                color: "#ff4800",
              }}
            >
              <Radio size={13} />
              <span>Crowdsourced Gym Energy</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Request a Track for the Gym Floor
            </h3>
            <p className="text-xs sm:text-sm opacity-70 mt-1">
              Have a song that gives you an instant PR? Send your track request directly to the gym
              counter via WhatsApp, and we'll queue it on the gym floor audio system!
            </p>
          </div>

          <form onSubmit={handleSongRequestSubmit} className="max-w-lg mx-auto space-y-4">
            {/* Branch Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                Gym Branch
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setReqBranch("kavoor")}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer"
                  style={{
                    background: reqBranch === "kavoor" ? c.orange : c.surface,
                    borderColor: reqBranch === "kavoor" ? c.orange : c.border,
                    color: reqBranch === "kavoor" ? "#ffffff" : c.muted,
                  }}
                >
                  Kavoor Branch
                </button>
                <button
                  type="button"
                  onClick={() => setReqBranch("deralakatte")}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer"
                  style={{
                    background: reqBranch === "deralakatte" ? c.orange : c.surface,
                    borderColor: reqBranch === "deralakatte" ? c.orange : c.border,
                    color: reqBranch === "deralakatte" ? "#ffffff" : c.muted,
                  }}
                >
                  Deralakatte Branch
                </button>
              </div>
            </div>

            {/* Song Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                Song Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Till I Collapse, Sahara Phonk, Believer"
                value={reqSong}
                onChange={(e) => setReqSong(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none"
                style={{
                  background: c.surface,
                  borderColor: c.border,
                  color: c.text,
                }}
              />
            </div>

            {/* Artist & Slot */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                  Artist (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eminem, Hensonn"
                  value={reqArtist}
                  onChange={(e) => setReqArtist(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border outline-none"
                  style={{
                    background: c.surface,
                    borderColor: c.border,
                    color: c.text,
                  }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                  When Are You Working Out?
                </label>
                <select
                  value={reqTime}
                  onChange={(e) => setReqTime(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border outline-none"
                  style={{
                    background: c.surface,
                    borderColor: c.border,
                    color: c.text,
                  }}
                >
                  <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                  <option value="Afternoon (11 AM - 4 PM)">Afternoon (11 AM - 4 PM)</option>
                  <option value="Evening Workout (5 PM - 8 PM)">
                    Evening Workout (5 PM - 8 PM)
                  </option>
                  <option value="Night Session (8 PM - 10 PM)">Night Session (8 PM - 10 PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer mt-2"
              style={{
                background: "#25D366",
                boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
              }}
            >
              <MessageCircle size={17} />
              <span>Send Track Request via WhatsApp</span>
            </button>

            {reqSent && (
              <div className="text-center text-xs font-semibold text-emerald-500 pt-1">
                ✓ Track request ready on WhatsApp! Enjoy your training session.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="py-12 px-6 text-center border-t relative z-10"
        style={{ borderColor: c.border }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="AB Fitness"
                className="w-10 h-10 rounded-full object-cover border"
                style={{ borderColor: `${c.orange}55` }}
              />
              <div className="text-left">
                <div
                  className="font-black text-base uppercase leading-none"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  AB FITNESS HUB
                </div>
                <div className="text-[10px] font-bold tracking-widest text-orange-500 uppercase mt-0.5">
                  Kavoor &amp; Deralakatte, Mangalore
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => navigate("/kavoor")}
                className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Kavoor Gym
              </button>
              <span className="opacity-30">•</span>
              <button
                onClick={() => navigate("/deralakatte")}
                className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Deralakatte Gym
              </button>
              <span className="opacity-30">•</span>
              <button
                onClick={() => navigate("/protein-hub")}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Protein Hub Cafe
              </button>
              <span className="opacity-30">•</span>
              <button
                onClick={() => navigate("/")}
                className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Branch Selector
              </button>
            </div>
          </div>

          <p className="text-[11px] opacity-50">
            © 2026 AB Fitness Hub Mangalore. Workout audio playlists curated for member training
            motivation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function MusicHub() {
  return (
    <ThemeProvider>
      <MusicHubContent />
    </ThemeProvider>
  );
}
