import { createFileRoute } from "@tanstack/react-router";
import { Flame, Trophy, Target, Calendar } from "lucide-react";
import { MobileShell } from "@/components/lore/MobileShell";
import { TopBar } from "@/components/lore/TopBar";
import { SectionTitle } from "@/components/lore/SectionTitle";
import { XPBar } from "@/components/lore/XPBar";
import { USER, BADGES, LEADERBOARD } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "LORE — Your streak" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <MobileShell>
      <TopBar title="You" />

      <section className="px-4 pt-2">
        <div className="glass-strong shadow-glass relative overflow-hidden rounded-3xl p-5">
          <div className="gradient-neon absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl" />
          <div className="flex items-center gap-4">
            <div className="gradient-neon shadow-neon flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
              {USER.avatar}
            </div>
            <div>
              <div className="text-lg font-bold">{USER.handle}</div>
              <div className="text-xs text-muted-foreground">Level {USER.level} · Oracle in training</div>
            </div>
          </div>
          <div className="mt-4">
            <XPBar value={USER.xp} max={USER.nextLevelXp} />
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        <StreakCard />
        <StatCard
          icon={<Target className="h-4 w-4" />}
          label="Predictions"
          value={`${USER.predictionsCorrect}/${USER.predictionsTotal}`}
          sub={`${Math.round((USER.predictionsCorrect / USER.predictionsTotal) * 100)}% hit rate`}
          tint="mint"
        />
      </div>

      <SectionTitle eyebrow="Collection" title="Badges" />
      <div className="grid grid-cols-3 gap-3 px-4">
        {BADGES.map((b) => (
          <div
            key={b.id}
            className={
              "glass-strong rounded-2xl p-3 text-center transition " +
              (b.unlocked ? "ring-neon" : "opacity-40 grayscale")
            }
          >
            <div className="text-3xl">{b.emoji}</div>
            <div className="mt-1 text-[11px] font-semibold">{b.name}</div>
            <div className="text-[9px] leading-tight text-muted-foreground">{b.desc}</div>
          </div>
        ))}
      </div>

      <SectionTitle
        eyebrow="This week"
        title="Leaderboard"
        action={<Trophy className="h-4 w-4 text-amber-300" />}
      />
      <div className="space-y-2 px-4">
        {LEADERBOARD.map((u) => {
          const isYou = u.name === "you";
          return (
            <div
              key={u.rank}
              className={
                "flex items-center gap-3 rounded-2xl p-3 " +
                (isYou ? "gradient-neon shadow-neon text-primary-foreground" : "glass")
              }
            >
              <div className="w-6 text-center text-sm font-black">{u.rank}</div>
              <div className={"flex h-9 w-9 items-center justify-center rounded-xl text-lg " + (isYou ? "bg-white/20" : "bg-white/10")}>
                {u.avatar}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{isYou ? "you" : u.name}</div>
                <div className={"text-[10px] " + (isYou ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {u.xp.toLocaleString()} XP · {u.streak}d streak
                </div>
              </div>
              {u.rank <= 3 && <span className="text-lg">{["🥇", "🥈", "🥉"][u.rank - 1]}</span>}
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}

function StreakCard() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-4">
      <div className="gradient-fire absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl" />
      <div className="flex items-center gap-2 text-pink-300">
        <Flame className="h-4 w-4" />
        <span className="text-[11px] font-semibold uppercase tracking-wider">Streak</span>
      </div>
      <div className="mt-1 text-3xl font-black">{USER.streak}<span className="text-base font-semibold text-muted-foreground"> days</span></div>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
        <Calendar className="h-3 w-3" /> best: {USER.longestStreak}d
      </div>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={
              "h-2 flex-1 rounded-full " +
              (i < 5 ? "gradient-fire" : "bg-white/10")
            }
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tint: "mint" | "fire";
}) {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-4">
      <div className={"absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl gradient-" + tint} />
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-1 text-3xl font-black tabular-nums">{value}</div>
      <div className="mt-1 text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}
