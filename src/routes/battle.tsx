import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Swords, Flame } from "lucide-react";
import { MobileShell } from "@/components/lore/MobileShell";
import { TopBar } from "@/components/lore/TopBar";
import { BATTLES } from "@/lib/mock-data";

export const Route = createFileRoute("/battle")({
  head: () => ({ meta: [{ title: "LORE — News battle" }] }),
  component: BattlePage,
});

function BattlePage() {
  const [votes, setVotes] = useState<Record<string, "a" | "b">>({});

  return (
    <MobileShell>
      <TopBar title="Battle" />
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5 text-pink-300" />
          <h1 className="text-2xl font-black tracking-tight">
            News <span className="text-gradient-neon">battle</span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">Tap the story that matters more. The crowd decides.</p>
      </div>

      <div className="space-y-6 px-4 pb-4">
        {BATTLES.map((bt) => {
          const totalRaw = bt.a.votes + bt.b.votes;
          const voted = votes[bt.id];
          const aBoost = voted === "a" ? 1 : 0;
          const bBoost = voted === "b" ? 1 : 0;
          const aTotal = bt.a.votes + aBoost;
          const bTotal = bt.b.votes + bBoost;
          const total = totalRaw + aBoost + bBoost;
          const aPct = Math.round((aTotal / total) * 100);
          const bPct = 100 - aPct;

          return (
            <div key={bt.id} className="space-y-3">
              <div className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {bt.topic}
              </div>
              <div className="relative">
                <BattleSide
                  story={bt.a}
                  pct={aPct}
                  voted={voted === "a"}
                  disabled={!!voted}
                  onClick={() => !voted && setVotes((v) => ({ ...v, [bt.id]: "a" }))}
                  tint="neon"
                />
                <div className="my-2 flex items-center justify-center">
                  <div className="glass-strong shadow-neon flex h-9 w-9 items-center justify-center rounded-full text-xs font-black">
                    VS
                  </div>
                </div>
                <BattleSide
                  story={bt.b}
                  pct={bPct}
                  voted={voted === "b"}
                  disabled={!!voted}
                  onClick={() => !voted && setVotes((v) => ({ ...v, [bt.id]: "b" }))}
                  tint="fire"
                />
              </div>
              {voted && (
                <div className="flex items-center justify-center gap-1 text-[11px] text-lime-300">
                  <Flame className="h-3 w-3" /> +10 XP · vote counted
                </div>
              )}
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}

function BattleSide({
  story,
  pct,
  voted,
  disabled,
  onClick,
  tint,
}: {
  story: { emoji: string; title: string; votes: number };
  pct: number;
  voted: boolean;
  disabled: boolean;
  onClick: () => void;
  tint: "neon" | "fire";
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled && !voted}
      className={
        "glass-strong relative w-full overflow-hidden rounded-2xl p-4 text-left transition " +
        (voted ? "ring-neon" : disabled ? "opacity-70" : "")
      }
    >
      <motion.div
        initial={false}
        animate={{ width: disabled ? `${pct}%` : "0%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={"absolute inset-y-0 left-0 opacity-30 gradient-" + tint}
      />
      <div className="relative flex items-center gap-3">
        <div className={"flex h-12 w-12 items-center justify-center rounded-xl text-2xl gradient-" + tint + (voted ? " shadow-neon" : "")}>
          {story.emoji}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold leading-tight">{story.title}</div>
          {disabled ? (
            <div className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
              {pct}% · {(story.votes + (voted ? 1 : 0)).toLocaleString()} votes
            </div>
          ) : (
            <div className="mt-0.5 text-[11px] text-muted-foreground">Tap to vote</div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
