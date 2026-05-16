export function XPBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>{value.toLocaleString()} XP</span>
        <span>{max.toLocaleString()}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="gradient-neon h-full rounded-full shadow-neon" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
