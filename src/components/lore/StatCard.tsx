import { Sparkline } from "./Sparkline";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  tone?: "pink" | "cyan" | "lime";
  points?: number[];
}

const tones: Record<NonNullable<Props["tone"]>, { color: string; chip: string }> = {
  pink: { color: "oklch(0.72 0.27 350)", chip: "text-pink-300" },
  cyan: { color: "oklch(0.82 0.18 200)", chip: "text-cyan-300" },
  lime: { color: "oklch(0.88 0.22 135)", chip: "text-lime-300" },
};

export function StatCard({ label, value, delta, tone = "lime", points }: Props) {
  const t = tones[tone];
  return (
    <div className="glass-strong relative flex-1 overflow-hidden rounded-2xl p-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-xl font-bold tabular-nums">{value}</span>
        {delta && <span className={"text-[10px] font-bold " + t.chip}>{delta}</span>}
      </div>
      {points && (
        <div className="-mr-1 mt-1">
          <Sparkline points={points} color={t.color} width={120} height={28} />
        </div>
      )}
    </div>
  );
}
