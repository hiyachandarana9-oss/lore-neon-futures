import { Flame, Zap } from "lucide-react";
import { USER } from "@/lib/mock-data";

export function TopBar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 pb-3">
      <div className="glass shadow-glass flex items-center justify-between rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="gradient-neon flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-primary-foreground shadow-neon">
            L
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">{title ?? "LORE"}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              news with context
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Stat icon={<Flame className="h-3.5 w-3.5" />} value={USER.streak} tint="fire" />
          <Stat icon={<Zap className="h-3.5 w-3.5" />} value={USER.xp.toLocaleString()} tint="neon" />
        </div>
      </div>
    </header>
  );
}

function Stat({
  icon,
  value,
  tint,
}: {
  icon: React.ReactNode;
  value: string | number;
  tint: "fire" | "neon";
}) {
  return (
    <div className="glass-strong flex items-center gap-1.5 rounded-full px-2.5 py-1">
      <span
        className={
          "flex h-5 w-5 items-center justify-center rounded-full text-primary-foreground " +
          (tint === "fire" ? "gradient-fire" : "gradient-neon")
        }
      >
        {icon}
      </span>
      <span className="text-xs font-semibold tabular-nums">{value}</span>
    </div>
  );
}
