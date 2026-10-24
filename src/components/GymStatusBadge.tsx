import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export type BranchHours = {
  branch: "kavoor" | "deralakatte";
  className?: string;
  variant?: "pill" | "compact" | "card";
};

export default function GymStatusBadge({
  branch = "kavoor",
  className = "",
  variant = "pill",
}: BranchHours) {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    label: string;
    detail: string;
  }>({
    isOpen: true,
    label: "Open Now",
    detail: "Closes 10:00 PM",
  });

  useEffect(() => {
    const checkStatus = () => {
      // Calculate current Indian Standard Time (IST = UTC+5:30)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);

      const day = istDate.getDay(); // 0 is Sunday, 1-6 Mon-Sat
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      const isSunday = day === 0;

      // Standard gym hours:
      // Mon-Sat: 5:30 AM (330 min) to 10:00 PM (1320 min)
      // Sunday: 6:00 AM (360 min) to 1:00 PM (780 min)
      const openTime = isSunday ? 6 * 60 : 5 * 60 + 30;
      const closeTime = isSunday ? 13 * 60 : 22 * 60;

      if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
        const closeLabel = isSunday ? "Closes 1:00 PM" : "Closes 10:00 PM";
        setStatus({
          isOpen: true,
          label: "Open Now",
          detail: closeLabel,
        });
      } else {
        const nextOpen = isSunday
          ? "Opens 5:30 AM Mon"
          : day === 6
            ? "Opens 6:00 AM Sun"
            : "Opens 5:30 AM";
        setStatus({
          isOpen: false,
          label: "Closed",
          detail: nextOpen,
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [branch]);

  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${className}`}
        style={{ color: status.isOpen ? "#22c55e" : "#eab308" }}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
          }`}
        />
        <span>{status.label}</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all ${className}`}
      style={{
        background: status.isOpen ? "rgba(34, 197, 94, 0.12)" : "rgba(234, 179, 8, 0.12)",
        border: `1px solid ${status.isOpen ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
        color: status.isOpen ? "#22c55e" : "#eab308",
      }}
      title={`${branch === "kavoor" ? "Kavoor" : "Deralakatte"} Branch Operating Status`}
    >
      <span className="relative flex h-2 w-2">
        {status.isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status.isOpen ? "bg-emerald-500" : "bg-amber-500"
          }`}
        />
      </span>
      <span className="font-extrabold uppercase tracking-wider">{status.label}</span>
      <span className="opacity-40">•</span>
      <span className="flex items-center gap-1 opacity-90 font-medium text-[10px]">
        <Clock size={11} /> {status.detail}
      </span>
    </div>
  );
}
