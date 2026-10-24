import { Star, ExternalLink, ShieldCheck } from "lucide-react";

export type GoogleReviewsBadgeProps = {
  branch?: "kavoor" | "deralakatte";
  isDark?: boolean;
  variant?: "badge" | "card";
};

export default function GoogleReviewsBadge({
  branch = "kavoor",
  isDark = true,
  variant = "badge",
}: GoogleReviewsBadgeProps) {
  const reviewsUrl =
    branch === "kavoor"
      ? "https://maps.google.com/?q=AB+Fitness+Hub+Kavoor+Mangalore"
      : "https://maps.google.com/?q=AB+Fitness+Gym+Deralakatte+Mangalore";

  const branchTitle = branch === "kavoor" ? "Kavoor" : "Deralakatte";

  if (variant === "badge") {
    return (
      <a
        href={reviewsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
        style={{
          background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
          borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
          color: isDark ? "#f0f0f0" : "#111111",
        }}
      >
        <div className="flex items-center text-amber-400 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>
        <span className="font-extrabold text-[11px]">4.9</span>
        <span className="opacity-40">•</span>
        <span className="opacity-75 text-[11px]">250+ Google Reviews</span>
        <ExternalLink size={10} className="opacity-50" />
      </a>
    );
  }

  return (
    <div
      className="p-5 sm:p-6 rounded-[22px] border relative overflow-hidden"
      style={{
        background: isDark ? "#0f0f0f" : "#ffffff",
        borderColor: isDark ? "rgba(255, 255, 255, 0.09)" : "rgba(0, 0, 0, 0.08)",
        color: isDark ? "#f0f0f0" : "#111111",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255, 72, 0, 0.12)", color: "#ff4800" }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              Verified Social Proof
            </div>
            <div
              className="text-lg font-black uppercase"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Top Rated Gym in {branchTitle}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end text-amber-400 gap-0.5 mb-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <div className="text-[11px] font-bold opacity-80">4.9 / 5.0 Rating</div>
        </div>
      </div>

      <p className="text-xs opacity-75 leading-relaxed mb-4">
        "One of the best fitness centers in Mangalore with certified coaches, friendly atmosphere,
        and advanced strength equipment."
      </p>

      <a
        href={reviewsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors"
      >
        <span>Read verified member reviews on Google Maps</span>
        <ExternalLink size={12} />
      </a>
    </div>
  );
}
