import { useState, useEffect } from "react";
import { X, Dumbbell, Calendar, Phone, User, CheckCircle2, MessageCircle } from "lucide-react";

export type FreeTrialModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultBranch?: "kavoor" | "deralakatte";
  theme?: "dark" | "light";
};

export default function FreeTrialModal({
  isOpen,
  onClose,
  defaultBranch = "kavoor",
  theme = "dark",
}: FreeTrialModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState<"kavoor" | "deralakatte">(defaultBranch);
  const [timeSlot, setTimeSlot] = useState("Morning (6 AM - 10 AM)");
  const [goal, setGoal] = useState("Muscle Building");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setBranch(defaultBranch);
  }, [defaultBranch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDark = theme === "dark";
  const branchPhone = branch === "kavoor" ? "918431293951" : "917019844639";
  const branchName =
    branch === "kavoor" ? "Kavoor (Durga Prasad Complex)" : "Deralakatte (Plaza Avenue)";

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const message = `Hi AB Fitness Hub (${branch === "kavoor" ? "Kavoor" : "Deralakatte"}), I would like to book a Free 1-Day Trial Workout Pass!%0A%0A👤 *Name:* ${encodeURIComponent(
      name,
    )}%0A📱 *Phone:* ${encodeURIComponent(phone || "Not provided")}%0A📍 *Branch:* ${encodeURIComponent(
      branchName,
    )}%0A⏰ *Preferred Time:* ${encodeURIComponent(timeSlot)}%0A🎯 *Fitness Goal:* ${encodeURIComponent(
      goal,
    )}`;

    const waUrl = `https://wa.me/${branchPhone}?text=${message}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[28px] p-6 sm:p-8 border shadow-2xl transition-all"
        style={{
          background: isDark ? "#0f0f0f" : "#ffffff",
          borderColor: isDark ? "#ff480033" : "#d93c0825",
          color: isDark ? "#f0f0f0" : "#0d0d0d",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          style={{
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            color: isDark ? "#f0f0f0" : "#0d0d0d",
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3
              className="text-2xl font-black uppercase mb-2"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Trial Request Sent!
            </h3>
            <p className="text-sm opacity-70 mb-6 max-w-sm mx-auto">
              Our team at AB Fitness {branch === "kavoor" ? "Kavoor" : "Deralakatte"} will confirm
              your trial slot on WhatsApp shortly. Get ready to sweat!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
              style={{ background: "#ff4800" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppBooking}>
            {/* Header */}
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                style={{
                  background: "rgba(255, 72, 0, 0.15)",
                  color: "#ff4800",
                }}
              >
                <Dumbbell size={13} />
                <span>100% Free · No Commitment</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black uppercase leading-tight"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                Claim Your Free 1-Day Pass
              </h2>
              <p className="text-xs sm:text-sm opacity-70 mt-1">
                Experience world-class gym equipment, certified trainers, and athletic energy at AB
                Fitness Hub Mangalore.
              </p>
            </div>

            {/* Branch selector pills */}
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 opacity-80">
                Choose Branch
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBranch("kavoor")}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer"
                  style={{
                    background: branch === "kavoor" ? "#ff4800" : isDark ? "#181818" : "#f0f0f0",
                    color: branch === "kavoor" ? "#fff" : isDark ? "#f0f0f0" : "#333",
                    borderColor: branch === "kavoor" ? "#ff4800" : isDark ? "#282828" : "#e0e0e0",
                  }}
                >
                  Kavoor Branch
                </button>
                <button
                  type="button"
                  onClick={() => setBranch("deralakatte")}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer"
                  style={{
                    background:
                      branch === "deralakatte" ? "#ff4800" : isDark ? "#181818" : "#f0f0f0",
                    color: branch === "deralakatte" ? "#fff" : isDark ? "#f0f0f0" : "#333",
                    borderColor:
                      branch === "deralakatte" ? "#ff4800" : isDark ? "#282828" : "#e0e0e0",
                  }}
                >
                  Deralakatte Branch
                </button>
              </div>
            </div>

            {/* Input: Name */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                Your Name *
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 opacity-50" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Shetty"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all"
                  style={{
                    background: isDark ? "#161616" : "#f9f9f9",
                    borderColor: isDark ? "#2a2a2a" : "#e0e0e0",
                    color: isDark ? "#f0f0f0" : "#0d0d0d",
                  }}
                />
              </div>
            </div>

            {/* Input: Phone */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                Phone Number (WhatsApp)
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-3.5 opacity-50" />
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all"
                  style={{
                    background: isDark ? "#161616" : "#f9f9f9",
                    borderColor: isDark ? "#2a2a2a" : "#e0e0e0",
                    color: isDark ? "#f0f0f0" : "#0d0d0d",
                  }}
                />
              </div>
            </div>

            {/* Preferred slot & Goal */}
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-3 opacity-50" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none"
                    style={{
                      background: isDark ? "#161616" : "#f9f9f9",
                      borderColor: isDark ? "#2a2a2a" : "#e0e0e0",
                      color: isDark ? "#f0f0f0" : "#0d0d0d",
                    }}
                  >
                    <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                    <option value="Afternoon (11 AM - 4 PM)">Afternoon (11 AM - 4 PM)</option>
                    <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">
                  Fitness Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border outline-none"
                  style={{
                    background: isDark ? "#161616" : "#f9f9f9",
                    borderColor: isDark ? "#2a2a2a" : "#e0e0e0",
                    color: isDark ? "#f0f0f0" : "#0d0d0d",
                  }}
                >
                  <option value="Muscle Building">Muscle Building / Hypertrophy</option>
                  <option value="Fat Loss & Tone">Fat Loss & Toning</option>
                  <option value="Strength & Power">Strength & Powerlifting</option>
                  <option value="General Health">General Health & Cardio</option>
                  <option value="Personal Training">Personal Training (1-on-1)</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                style={{
                  background: "#25D366",
                  boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
                }}
              >
                <MessageCircle size={18} />
                <span>Confirm & Send on WhatsApp</span>
              </button>

              <div className="text-center pt-2">
                <a
                  href={`tel:${branchPhone}`}
                  className="text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-1.5"
                >
                  <Phone size={12} /> Prefer calling? Call{" "}
                  {branch === "kavoor" ? "Kavoor" : "Deralakatte"} directly
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
