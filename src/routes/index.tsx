import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, TrendingUp, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/lore/MobileShell";
import { TopBar } from "@/components/lore/TopBar";
import { SwipeDeck } from "@/components/lore/SwipeDeck";
import { SectionTitle } from "@/components/lore/SectionTitle";
import { MarketTicker } from "@/components/lore/MarketTicker";
import { StatCard } from "@/components/lore/StatCard";
import { NEWS, USER } from "@/lib/mock-data";
import { CategoryChip } from "@/components/lore/CategoryChip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LORE — News with context" },
      {
        name: "description",
        content: "Swipe through the news that actually matters. Built for the TikTok generation.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const trending = NEWS.slice(0, 4);
  return (
    <MobileShell>
      <TopBar />
      <MarketTicker />

      <div className="animate-rise px-4 pt-4 pb-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="bg-pink-500 animate-live h-1.5 w-1.5 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-pink-300">
            Live feed · {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </span>
        </div>
        <h1 className="font-display text-[34px] font-bold leading-[1] tracking-tight">
          Today's <span className="text-gradient-neon text-shadow-glow">lore</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Swipe right to save · left to skip · tap to dive deeper.
        </p>
      </div>

      {/* Financial-dashboard style stat row */}
      <div className="animate-rise flex gap-2 px-4 pb-3" style={{ animationDelay: "60ms" }}>
        <StatCard
          label="Streak"
          value={USER.streak}
          delta="+1 today"
          tone="pink"
          points={[20, 25, 22, 30, 28, 36, 40, 38, 44, 50, 48, 55, 60, 58, 64, 70]}
        />
        <StatCard
          label="Today XP"
          value="+185"
          delta="▲ 24%"
          tone="lime"
          points={[10, 14, 12, 22, 28, 24, 30, 36, 32, 40, 44, 50, 48, 56, 60, 68]}
        />
        <StatCard
          label="Accuracy"
          value="67%"
          delta="▲ 3%"
          tone="cyan"
          points={[40, 42, 38, 45, 50, 48, 52, 55, 53, 58, 60, 57, 62, 65, 63, 67]}
        />
      </div>

      <SwipeDeck cards={NEWS} />

      <SectionTitle
        eyebrow="Trending now"
        title="What everyone's reading"
        action={
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
            <Sparkles className="h-3 w-3" /> Live
          </span>
        }
      />
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
        {trending.map((n, i) => (
          <Link
            key={n.id}
            to="/news/$id"
            params={{ id: n.id }}
            className="glass-strong animate-rise group relative w-[240px] shrink-0 overflow-hidden rounded-2xl transition-transform active:scale-[0.98]"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="relative h-32 w-full overflow-hidden">
              <img
                src={n.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute left-2 top-2">
                <CategoryChip category={n.category} />
              </div>
              <div className="absolute right-2 top-2 text-2xl drop-shadow-lg">{n.emoji}</div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
                <TrendingUp className="h-2.5 w-2.5 text-lime-300" />
                <span className="font-mono-tick text-[9px] font-bold text-lime-300">
                  +{12 + i * 7}%
                </span>
              </div>
            </div>
            <div className="space-y-1 px-3 py-2.5">
              <div className="line-clamp-2 text-[13px] font-bold leading-snug">{n.title}</div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{n.source}</span>
                <span className="font-mono-tick">{n.publishedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Daily streak CTA banner */}
      <div className="px-4 pt-6">
        <Link
          to="/profile"
          className="glass-strong neon-border glow-pink animate-rise relative flex items-center gap-3 overflow-hidden rounded-2xl p-4"
        >
          <div className="gradient-fire flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl shadow-neon">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-base font-bold">
              {USER.streak}-day streak burning
            </div>
            <p className="truncate text-[11px] text-muted-foreground">
              Read 1 more story to bank today's XP
            </p>
          </div>
          <div className="font-mono-tick text-sm font-bold text-pink-300">→</div>
        </Link>
      </div>
    </MobileShell>
  );
}
