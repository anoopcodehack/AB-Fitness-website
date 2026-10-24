import { Phone, MessageCircle, MapPin, Dumbbell } from "lucide-react";

export type MobileQuickBarProps = {
  branch?: "kavoor" | "deralakatte";
  onOpenTrial: () => void;
  isDark?: boolean;
};

export default function MobileQuickBar({
  branch = "kavoor",
  onOpenTrial,
  isDark = true,
}: MobileQuickBarProps) {
  const phone = branch === "kavoor" ? "+918431293951" : "+917019844639";
  const waPhone = branch === "kavoor" ? "918431293951" : "917019844639";
  const mapsUrl =
    branch === "kavoor"
      ? "https://maps.google.com/?q=AB+Fitness+Hub+Kavoor+Mangalore"
      : "https://maps.google.com/?q=AB+Fitness+Gym+Deralakatte+Mangalore";

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2 border-t"
      style={{
        background: isDark ? "rgba(10, 10, 10, 0.94)" : "rgba(255, 255, 255, 0.94)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {/* Call button */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95"
          style={{
            background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
            color: isDark ? "#f0f0f0" : "#111",
          }}
        >
          <Phone size={17} className="mb-0.5 text-orange-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
            `Hi AB Fitness Hub (${branch === "kavoor" ? "Kavoor" : "Deralakatte"}), I would like to inquire about gym membership plans.`,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95"
          style={{
            background: isDark ? "rgba(37, 211, 102, 0.1)" : "rgba(37, 211, 102, 0.15)",
            color: "#22c55e",
          }}
        >
          <MessageCircle size={17} className="mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
        </a>

        {/* Directions */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95"
          style={{
            background: isDark ? "rgba(0, 212, 255, 0.1)" : "rgba(0, 122, 170, 0.1)",
            color: isDark ? "#00d4ff" : "#007aaa",
          }}
        >
          <MapPin size={17} className="mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Map</span>
        </a>

        {/* Free trial button */}
        <button
          type="button"
          onClick={onOpenTrial}
          className="flex flex-col items-center justify-center py-1.5 rounded-xl transition-transform active:scale-95 text-white"
          style={{
            background: "linear-gradient(135deg, #ff4800 0%, #e03600 100%)",
            boxShadow: "0 2px 8px rgba(255, 72, 0, 0.4)",
          }}
        >
          <Dumbbell size={17} className="mb-0.5 text-white" />
          <span className="text-[10px] font-black uppercase tracking-wider">Free Pass</span>
        </button>
      </div>
    </div>
  );
}
