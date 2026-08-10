// components/ui/AdSlot.tsx
// Reusable, compliant ad slot component. Currently renders a placeholder.
// Replace inner content with actual ad unit when ready.

interface AdSlotProps {
  id: string;
  size?: "banner" | "rectangle" | "leaderboard";
  className?: string;
}

export default function AdSlot({ id, size = "rectangle", className = "" }: AdSlotProps) {
  // Only render ad slots in production when an ad client is configured
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;

  const sizeMap = {
    banner: "w-full h-16",
    rectangle: "w-72 h-24",
    leaderboard: "w-full h-24",
  };

  return (
    <div
      id={id}
      role="complementary"
      aria-label="Advertisement"
      className={`flex items-center justify-center bg-slate-100 rounded-lg text-xs text-slate-400 ${sizeMap[size]} ${className}`}
    >
      <span className="sr-only">Advertisement</span>
    </div>
  );
}

// ─── Content-contextual ad slot for article pages ─────────────────────────────
export function ContentAdSlot({ id, className = "" }: { id: string; className?: string }) {
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;

  return (
    <div
      id={id}
      role="complementary"
      aria-label="Advertisement"
      className={`my-6 w-full flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl h-20 text-xs text-slate-400 ${className}`}
    >
      <span className="sr-only">Advertisement</span>
    </div>
  );
}
