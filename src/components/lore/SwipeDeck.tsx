import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Zap, Clock, ArrowRight, Heart, X, BookmarkPlus } from "lucide-react";
import type { NewsCard } from "@/lib/mock-data";
import { CategoryChip } from "./CategoryChip";

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
      <div className="glass-strong mx-4 mt-6 flex flex-col items-center gap-3 rounded-3xl px-6 py-10 text-center">
        <div className="text-5xl">🎉</div>
        <h3 className="text-lg font-bold">You're caught up</h3>
        <p className="text-sm text-muted-foreground">
          Liked {liked.length} stories. Streak +1.
        </p>
        <button
          onClick={() => setIndex(0)}
          className="gradient-neon shadow-neon mt-2 rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Reshuffle
        </button>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="relative h-[560px]">
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
        <ActionButton onClick={() => advance("left")} variant="skip">
          <X className="h-6 w-6" />
        </ActionButton>
        <ActionButton onClick={() => {}} variant="save">
          <BookmarkPlus className="h-5 w-5" />
        </ActionButton>
        <ActionButton onClick={() => advance("right")} variant="like">
          <Heart className="h-6 w-6 fill-current" />
        </ActionButton>
      </div>
    </div>
  );
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
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const skipOpacity = useTransform(x, [-140, -20], [1, 0]);

  function onDragEnd(_: unknown, info: PanInfo) {
    const off = info.offset.x;
    if (off > 120) onSwipe("right");
    else if (off < -120) onSwipe("left");
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale: 1 - depth * 0.04,
        y: depth * 10,
        zIndex: 10 - depth,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 }}
      exit={{ x: x.get() > 0 ? 400 : -400, opacity: 0, transition: { duration: 0.25 } }}
      whileTap={{ cursor: "grabbing" }}
    >
      <div className="glass-strong shadow-glass relative flex h-full flex-col overflow-hidden rounded-3xl">
        <div className="relative h-[55%] w-full overflow-hidden">
          <img src={card.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <CategoryChip category={card.category} />
            <span className="glass flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" /> {card.publishedAt}
            </span>
          </div>
          <div className="absolute right-4 top-4 text-3xl drop-shadow-lg">{card.emoji}</div>

          {isTop && (
            <>
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute left-4 top-20 rotate-[-12deg] rounded-xl border-2 border-lime-400 px-3 py-1 text-sm font-black tracking-widest text-lime-300"
              >
                LORE+
              </motion.div>
              <motion.div
                style={{ opacity: skipOpacity }}
                className="absolute right-4 top-20 rotate-[12deg] rounded-xl border-2 border-pink-400 px-3 py-1 text-sm font-black tracking-widest text-pink-300"
              >
                SKIP
              </motion.div>
            </>
          )}
        </div>

        <div className="relative -mt-6 flex flex-1 flex-col gap-3 px-5 pb-5">
          <h2 className="text-xl font-bold leading-tight tracking-tight">{card.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{card.hook}</p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">{card.source}</span>
              <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5">
                <Zap className="h-3 w-3 text-amber-300" /> +{card.xp} XP
              </span>
            </div>
            <Link
              to="/news/$id"
              params={{ id: card.id }}
              className="gradient-neon shadow-neon flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground"
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
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "skip" | "save" | "like";
}) {
  const cls =
    variant === "like"
      ? "gradient-neon text-primary-foreground shadow-neon h-14 w-14"
      : variant === "skip"
        ? "glass-strong text-pink-300 h-14 w-14"
        : "glass-strong text-cyan-300 h-11 w-11";
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={"flex items-center justify-center rounded-full " + cls}
    >
      {children}
    </motion.button>
  );
}
