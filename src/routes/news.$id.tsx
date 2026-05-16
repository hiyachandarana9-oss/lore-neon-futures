import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Share2, BookmarkPlus, Zap } from "lucide-react";
import { MobileShell } from "@/components/lore/MobileShell";
import { CategoryChip } from "@/components/lore/CategoryChip";
import { NEWS } from "@/lib/mock-data";

export const Route = createFileRoute("/news/$id")({
  component: NewsLorePage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Story not found.</div>
  ),
  loader: ({ params }): { news: (typeof NEWS)[number] } => {
    const news = NEWS.find((n) => n.id === params.id);
    if (!news) throw notFound();
    return { news };
  },
});

function NewsLorePage() {
  const { news } = Route.useLoaderData();

  return (
    <MobileShell>
      <div className="relative h-[42vh] w-full overflow-hidden">
        <img src={news.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <Link
            to="/"
            className="glass flex h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button className="glass flex h-10 w-10 items-center justify-center rounded-full">
              <BookmarkPlus className="h-5 w-5" />
            </button>
            <button className="glass flex h-10 w-10 items-center justify-center rounded-full">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
          <div className="flex items-center gap-2">
            <CategoryChip category={news.category} />
            <span className="text-[11px] text-muted-foreground">
              {news.source} · {news.publishedAt}
            </span>
          </div>
          <h1 className="text-2xl font-black leading-tight tracking-tight">{news.title}</h1>
          <p className="text-sm text-muted-foreground">{news.hook}</p>
        </div>
      </div>

      <section className="px-4 pt-5">
        <SectionLabel emoji="❓" title="Why should I care?" />
        <div className="glass-strong space-y-3 rounded-2xl p-4">
          {news.whyCare.map((w, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="gradient-neon mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-primary-foreground">
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed">{w}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionLabel emoji="📜" title="The timeline" />
        <div className="glass-strong rounded-2xl p-4">
          <ol className="relative space-y-4 border-l-2 border-white/10 pl-5">
            {news.timeline.map((t, i) => (
              <li key={i} className="relative">
                <span className="gradient-neon shadow-neon absolute -left-[27px] top-1 h-3 w-3 rounded-full" />
                <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                  {t.date}
                </div>
                <div className="text-sm">{t.event}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionLabel emoji="🧠" title="The full lore" />
        <div className="glass-strong rounded-2xl p-4 text-sm leading-relaxed text-foreground/90">
          {news.body}
        </div>
      </section>

      {news.predictionPrompt && (
        <section className="px-4 pt-6">
          <SectionLabel emoji="🔮" title="Make a call" />
          <div className="glass-strong relative overflow-hidden rounded-2xl p-4">
            <div className="gradient-neon absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl" />
            <p className="text-sm font-medium">{news.predictionPrompt}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="gradient-mint rounded-xl py-2.5 text-sm font-bold text-primary-foreground">
                YES
              </button>
              <button className="gradient-fire rounded-xl py-2.5 text-sm font-bold text-primary-foreground">
                NO
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> AI-suggested prediction
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-300" /> +50 XP if right
              </span>
            </div>
          </div>
        </section>
      )}
    </MobileShell>
  );
}

function SectionLabel({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2 px-1">
      <span className="text-lg">{emoji}</span>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h3>
    </div>
  );
}
