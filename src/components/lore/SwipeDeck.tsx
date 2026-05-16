import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Zap, Clock, ArrowRight, Heart, X, BookmarkPlus, TrendingUp } from "lucide-react";
import type { NewsCard } from "@/lib/mock-data";
import { CategoryChip } from "./CategoryChip";
import { Sparkline } from "./Sparkline";

interface Props {
  cards: NewsCard[];
}

export function SwipeDeck({ cards }: Props) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);

  const visible = cards.slice(index, index + 3).reverse();

  function advance(dir: "left" | "right") {
    const c = cards[index];
    if (dir === "right" && c) setLiked((l) => [...l, c.id]);
    setIndex((i) => Math.min(i + 1, cards.length));
  }

  if (index >= cards.length) {
    return (
      <div className="glass-strong neon-border glow-pink animate-rise mx-4 mt-6 flex flex-col items-center gap-3 rounded-3xl px-6 py-12 text-center">
        <div className="animate-float text-6xl">🎉</div>
        <h3 className="font-display text-xl font-bold">You're all caught up</h3>
        <p className="text-sm text-muted-foreground">
          Liked <span className="font-mono-tick font-bold text-foreground">{liked.length}</span> stories · Streak +1
        </p>
        <button
          onClick={() => {
            setIndex(0);
            setLiked([]);
          }}
          className="gradient-neon shadow-neon mt-2 rounded-full px-6 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Reshuffle the feed
        </button>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="relative h-[580px]">
        <AnimatePresence initial={false}>
          {visible.map((card, i) => {
            const isTop = i === visible.length - 1;
            return (
              <SwipeCard
                key={card.id}
                card={card}
                isTop={isTop}
                depth={visible.length - 1 - i}
                onSwipe={advance}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <ActionButton onClick={() => advance("left")} variant="skip" label="Skip">
          <X className="h-6 w-6" strokeWidth={2.5} />
        </ActionButton>
        <ActionButton onClick={() => {}} variant="save" label="Save">
          <BookmarkPlus className="h-5 w-5" strokeWidth={2.4} />
        </ActionButton>
        <ActionButton onClick={() => advance("right")} variant="like" label="Lore+">
          <Heart className="h-6 w-6 fill-current" />
        </ActionButton>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {cards.map((_, i) => (
          <span
            key={i}
            className={
              "h-1 rounded-full transition-all duration-300 " +
              (i === index
                ? "w-6 bg-gradient-to-r from-pink-400 to-cyan-300"
                : i < index
                  ? "w-1.5 bg-white/40"
                  : "w-1.5 bg-white/15")
            }
          />
        ))}
      </div>
    </div>
  );
}

// Deterministic sparkline data per card id
function sparkFor(id: string): number[] {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return Array.from({ length: 16 }, (_, i) => {
    h = (h * 9301 + 49297) % 233280;
    return 30 + ((h % 60) + Math.sin(i / 2) * 12);
  });
}

function SwipeCard({
  card,
  isTop,
  depth,
  onSwipe,
}: {
  card: NewsCard;
  isTop: boolean;
  depth: number;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-12, 12]);
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const skipOpacity = useTransform(x, [-140, -20], [1, 0]);
  function onDragEnd(_: unknown, info: PanInfo) {
    const off = info.offset.x;
    const v = info.velocity.x;
    if (off > 110 || v > 600) onSwipe("right");
    else if (off < -110 || v < -600) onSwipe("left");
  }

  const points = sparkFor(card.id);
  const trend = points[points.length - 1] - points[0];
  const trendUp = trend >= 0;

  return (
    <motion.div
      className="absolute inset-0 will-change-transform transform-gpu"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: depth * 12,
        scale: 1 - depth * 0.045,
        transition: { type: "spring", stiffness: 260, damping: 28 },
      }}
      exit={{
        x: x.get() > 0 ? 480 : -480,
        rotate: x.get() > 0 ? 24 : -24,
        opacity: 0,
        transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
      }}
      whileTap={{ cursor: "grabbing" }}
    >
      <div
        className={
          "glass-strong shadow-glass relative flex h-full flex-col overflow-hidden rounded-3xl " +
          (isTop ? "glow-pink" : "")
        }
        style={{ zIndex: 10 - depth }}
      >
        <div className="relative h-[58%] w-full overflow-hidden">
          <img
            src={card.image}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />

          {/* Top meta row */}
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CategoryChip category={card.category} />
              <span className="glass flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {card.publishedAt}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-pink-500 animate-live h-1.5 w-1.5 rounded-full" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-pink-300">
                Live
              </span>
            </div>
          </div>

          {/* Floating emoji */}
          <div className="animate-float absolute right-5 bottom-5 text-5xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
            {card.emoji}
          </div>

          {/* Swipe verdict stamps */}
          {isTop && (
            <>
              <motion.div
                style={{ opacity: likeOpacity }}
                className="text-shadow-glow absolute left-4 top-20 -rotate-12 rounded-2xl border-2 border-lime-300 bg-lime-400/10 px-3 py-1.5 text-base font-black tracking-widest text-lime-200 backdrop-blur"
              >
                LORE+
              </motion.div>
              <motion.div
                style={{ opacity: skipOpacity }}
                className="absolute right-4 top-20 rotate-12 rounded-2xl border-2 border-pink-400 bg-pink-500/10 px-3 py-1.5 text-base font-black tracking-widest text-pink-200 backdrop-blur"
              >
                SKIP
              </motion.div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="relative -mt-8 flex flex-1 flex-col gap-3 px-5 pb-5">
          <h2 className="font-display text-[22px] font-bold leading-[1.1] tracking-tight">
            {card.title}
          </h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{card.hook}</p>

          {/* Mini financial dashboard row */}
          <div className="glass mt-1 flex items-center justify-between rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <TrendingUp
                className={"h-3.5 w-3.5 " + (trendUp ? "text-lime-300" : "text-pink-300 rotate-180")}
              />
              <span className="font-mono-tick text-[11px] font-bold tabular-nums text-foreground/90">
                {trendUp ? "+" : "−"}
                {Math.abs(trend).toFixed(1)}%
              </span>
              <span className="text-[10px] text-muted-foreground">24h interest</span>
            </div>
            <Sparkline
              points={points}
              color={trendUp ? "oklch(0.88 0.22 135)" : "oklch(0.72 0.27 350)"}
              width={90}
              height={26}
            />
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/80">{card.source}</span>
              <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono-tick">
                <Zap className="h-3 w-3 text-amber-300" />
                <span className="text-amber-200">+{card.xp} XP</span>
              </span>
            </div>
            <Link
              to="/news/$id"
              params={{ id: card.id }}
              className="gradient-neon shadow-neon flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold text-primary-foreground"
            >
              Read lore <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActionButton({
  children,
  onClick,
  variant,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "skip" | "save" | "like";
  label: string;
}) {
  const cls =
    variant === "like"
      ? "gradient-neon text-primary-foreground shadow-neon h-16 w-16 animate-pulse-glow"
      : variant === "skip"
        ? "glass-strong text-pink-300 h-14 w-14 hover:border-pink-300/40"
        : "glass-strong text-cyan-300 h-12 w-12";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.button
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.06 }}
        onClick={onClick}
        aria-label={label}
        className={"flex items-center justify-center rounded-full transition-colors " + cls}
      >
        {children}
      </motion.button>
      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
