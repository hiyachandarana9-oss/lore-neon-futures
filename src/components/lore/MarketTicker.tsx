interface Tick {
  symbol: string;
  value: string;
  delta: number;
}

const TICKS: Tick[] = [
  { symbol: "NVDA", value: "$1,284.40", delta: 2.4 },
  { symbol: "BTC", value: "$112,840", delta: 1.8 },
  { symbol: "ETH", value: "$4,210", delta: -0.6 },
  { symbol: "SPY", value: "$612.20", delta: 0.4 },
  { symbol: "TSLA", value: "$348.10", delta: -1.2 },
  { symbol: "AAPL", value: "$248.55", delta: 0.9 },
  { symbol: "SOL", value: "$248.10", delta: 4.1 },
  { symbol: "GOLD", value: "$2,684", delta: 0.3 },
];

export function MarketTicker() {
  const stream = [...TICKS, ...TICKS];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-black/30">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-ticker flex w-max gap-6 py-2 font-mono-tick text-[11px]">
        {stream.map((t, i) => {
          const up = t.delta >= 0;
          return (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-bold tracking-wider text-foreground/90">{t.symbol}</span>
              <span className="text-foreground/70">{t.value}</span>
              <span
                className={
                  "rounded px-1.5 py-0.5 text-[10px] font-bold " +
                  (up ? "bg-lime-400/15 text-lime-300" : "bg-pink-500/15 text-pink-300")
                }
              >
                {up ? "▲" : "▼"} {Math.abs(t.delta).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
