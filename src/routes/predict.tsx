import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Clock, Users } from "lucide-react";
import { MobileShell } from "@/components/lore/MobileShell";
import { TopBar } from "@/components/lore/TopBar";
import { SectionTitle } from "@/components/lore/SectionTitle";
import { CategoryChip } from "@/components/lore/CategoryChip";
import { PREDICTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/predict")({
  head: () => ({ meta: [{ title: "LORE — Predict" }] }),
  component: PredictPage,
});

function PredictPage() {
  return (
    <MobileShell>
      <TopBar title="Predict" />
      <div className="px-4 pt-2 pb-4">
        <h1 className="text-2xl font-black tracking-tight">
          Bet on the <span className="text-gradient-neon">future</span>
        </h1>
        <p className="text-sm text-muted-foreground">No real money. Just bragging rights & XP.</p>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4">
        <Tile label="Open" value="4" />
        <Tile label="Correct" value="18" />
        <Tile label="Hit rate" value="67%" />
      </div>

      <SectionTitle eyebrow="Live markets" title="Make a call" />
      <div className="space-y-3 px-4">
        {PREDICTIONS.map((p) => (
          <div key={p.id} className="glass-strong relative overflow-hidden rounded-2xl p-4">
            <div className="gradient-neon absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-15 blur-3xl" />
            <div className="mb-2 flex items-center justify-between">
              <CategoryChip category={p.category} />
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {p.endsIn}
              </span>
            </div>
            <p className="text-base font-semibold leading-snug">{p.question}</p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="gradient-mint h-full rounded-full"
                style={{ width: `${p.yesPct}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span className="text-lime-300">YES {p.yesPct}%</span>
              <span className="text-pink-300">NO {100 - p.yesPct}%</span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {p.volume}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> trending
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className={
                    "rounded-full px-4 py-1.5 text-xs font-bold transition " +
                    (p.yourStake === "yes"
                      ? "gradient-mint text-primary-foreground"
                      : "glass text-lime-300")
                  }
                >
                  YES
                </button>
                <button
                  className={
                    "rounded-full px-4 py-1.5 text-xs font-bold transition " +
                    (p.yourStake === "no"
                      ? "gradient-fire text-primary-foreground"
                      : "glass text-pink-300")
                  }
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-strong rounded-2xl p-3 text-center">
      <div className="text-xl font-black text-gradient-neon">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
