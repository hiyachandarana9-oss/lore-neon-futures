import type { Category } from "@/lib/mock-data";

const tints: Record<Category, string> = {
  Markets: "from-fuchsia-500/30 to-violet-500/30",
  Tech: "from-cyan-400/30 to-violet-500/30",
  Crypto: "from-amber-400/30 to-pink-500/30",
  Geopolitics: "from-lime-300/30 to-cyan-400/30",
  Culture: "from-pink-400/30 to-amber-300/30",
  Climate: "from-cyan-400/30 to-lime-300/30",
};

export function CategoryChip({ category }: { category: Category }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border border-white/10 bg-gradient-to-r px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/90 backdrop-blur " +
        tints[category]
      }
    >
      {category}
    </span>
  );
}
