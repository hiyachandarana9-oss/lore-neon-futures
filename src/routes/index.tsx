import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/lore/MobileShell";
import { TopBar } from "@/components/lore/TopBar";
import { SwipeDeck } from "@/components/lore/SwipeDeck";
import { SectionTitle } from "@/components/lore/SectionTitle";
import { NEWS } from "@/lib/mock-data";
import { CategoryChip } from "@/components/lore/CategoryChip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LORE — News with context" },
      { name: "description", content: "Swipe through the news that actually matters. Built for the TikTok generation." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const trending = NEWS.slice(0, 4);
  return (
    <MobileShell>
      <TopBar />
      <div className="px-4 pt-1 pb-3">
        <h1 className="text-2xl font-black tracking-tight">
          Today's <span className="text-gradient-neon">lore</span>
        </h1>
        <p className="text-sm text-muted-foreground">Swipe right to save. Left to skip.</p>
      </div>

      <SwipeDeck cards={NEWS} />

      <SectionTitle eyebrow="Trending now" title="What everyone's reading" />
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
        {trending.map((n) => (
          <Link
            key={n.id}
            to="/news/$id"
            params={{ id: n.id }}
            className="glass-strong relative w-[230px] shrink-0 overflow-hidden rounded-2xl"
          >
            <div className="relative h-28 w-full">
              <img src={n.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
              <div className="absolute left-2 top-2"><CategoryChip category={n.category} /></div>
              <div className="absolute right-2 top-2 text-xl">{n.emoji}</div>
            </div>
            <div className="space-y-1 px-3 py-2.5">
              <div className="line-clamp-2 text-sm font-semibold leading-snug">{n.title}</div>
              <div className="text-[10px] text-muted-foreground">{n.source} · {n.publishedAt}</div>
            </div>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}
