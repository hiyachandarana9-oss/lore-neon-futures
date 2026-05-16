export type Category = "Markets" | "Tech" | "Crypto" | "Geopolitics" | "Culture" | "Climate";

export interface NewsCard {
  id: string;
  title: string;
  hook: string;
  category: Category;
  source: string;
  publishedAt: string;
  image: string;
  emoji: string;
  gradient: "neon" | "fire" | "mint";
  whyCare: string[];
  timeline: { date: string; event: string }[];
  body: string;
  predictionPrompt?: string;
  xp: number;
}

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=900&q=70`;

export const NEWS: NewsCard[] = [
  {
    id: "n1",
    title: "Nvidia eats the world (again)",
    hook: "$4T cap. Every AI model on Earth runs on their silicon. The data center boom isn't slowing.",
    category: "Tech",
    source: "Bloomberg",
    publishedAt: "2h ago",
    image: img("1518770660439-4636190af475"),
    emoji: "🤖",
    gradient: "neon",
    whyCare: [
      "Your phone, your apps, even TikTok's algo — all trained on Nvidia GPUs.",
      "If Nvidia sneezes, the entire AI economy catches a cold.",
      "Energy grids are being rebuilt to feed these chips.",
    ],
    timeline: [
      { date: "1993", event: "Founded in a Denny's booth." },
      { date: "2012", event: "AlexNet wins on Nvidia GPUs — deep learning era begins." },
      { date: "2023", event: "ChatGPT mania sends stock 3x." },
      { date: "2025", event: "Crosses $4T market cap." },
    ],
    body: "Nvidia's grip on AI infrastructure is tightening as hyperscalers commit another $200B in capex for 2026...",
    predictionPrompt: "Will Nvidia hit $5T market cap before Q3 2026?",
    xp: 25,
  },
  {
    id: "n2",
    title: "Bitcoin ETFs swallow $80B",
    hook: "Wall Street is now the biggest BTC whale. Retail just got front-run by BlackRock.",
    category: "Crypto",
    source: "CoinDesk",
    publishedAt: "5h ago",
    image: img("1640340434855-6084b1f4901c"),
    emoji: "₿",
    gradient: "fire",
    whyCare: [
      "Bitcoin is no longer the rebel currency — it's a Wall Street asset class.",
      "ETFs absorbing supply = supply shock = price asymmetry.",
      "Your 401k may already own BTC and not know it.",
    ],
    timeline: [
      { date: "2009", event: "Satoshi mines block zero." },
      { date: "2021", event: "El Salvador adopts BTC as legal tender." },
      { date: "Jan 2024", event: "Spot Bitcoin ETFs approved in the US." },
      { date: "2026", event: "ETF holdings cross $80B." },
    ],
    body: "Institutional flows into spot Bitcoin ETFs continue to set records...",
    predictionPrompt: "Will BTC close above $150k by end of 2026?",
    xp: 30,
  },
  {
    id: "n3",
    title: "EU drops the hammer on Big Tech",
    hook: "New DMA rules force Apple, Meta, Google to open up — or pay 10% of global revenue.",
    category: "Geopolitics",
    source: "Reuters",
    publishedAt: "1d ago",
    image: img("1529107386315-e1a2ed48a620"),
    emoji: "⚖️",
    gradient: "mint",
    whyCare: [
      "Sideloading apps on iPhone in Europe is now the law.",
      "Sets the global template — expect copycat regs everywhere.",
      "Could shave billions off Big Tech earnings.",
    ],
    timeline: [
      { date: "2020", event: "EU proposes Digital Markets Act." },
      { date: "2024", event: "DMA enters into force." },
      { date: "2026", event: "First mega-fines issued." },
    ],
    body: "The European Commission has escalated enforcement of the Digital Markets Act...",
    predictionPrompt: "Will Apple be fined >$10B under the DMA in 2026?",
    xp: 20,
  },
  {
    id: "n4",
    title: "TSMC builds Arizona fortress",
    hook: "America's chip independence play is real. $65B of fabs going up in the desert.",
    category: "Tech",
    source: "WSJ",
    publishedAt: "3h ago",
    image: img("1581092918056-0c4c3acd3789"),
    emoji: "🏭",
    gradient: "neon",
    whyCare: [
      "Taiwan tension premium on chips just dropped a notch.",
      "Reshoring is the biggest industrial trend of the decade.",
      "Skilled labor shortage is the next bottleneck.",
    ],
    timeline: [
      { date: "2020", event: "TSMC announces Arizona Fab 1." },
      { date: "2024", event: "First wafer produced in AZ." },
      { date: "2026", event: "Fab 3 (2nm) breaks ground." },
    ],
    body: "TSMC's Arizona campus is ramping faster than analysts expected...",
    predictionPrompt: "Will TSMC Arizona ship 2nm chips before 2028?",
    xp: 25,
  },
  {
    id: "n5",
    title: "Climate insurance market melts",
    hook: "Florida, California — insurers are pulling out. Who pays when the next hurricane hits?",
    category: "Climate",
    source: "FT",
    publishedAt: "6h ago",
    image: img("1569163139394-de4798aa62b6"),
    emoji: "🌪️",
    gradient: "fire",
    whyCare: [
      "Uninsurable homes = collapsing real estate values.",
      "Taxpayers become the insurer of last resort.",
      "A preview of climate-driven economic shocks.",
    ],
    timeline: [
      { date: "2022", event: "State Farm exits CA new policies." },
      { date: "2024", event: "Florida Citizens insurer hits 1.4M policies." },
      { date: "2026", event: "Federal climate reinsurance bill debated." },
    ],
    body: "Private insurers continue to retreat from climate-exposed markets...",
    predictionPrompt: "Will the US pass a federal climate reinsurance backstop by 2027?",
    xp: 20,
  },
];

export interface Prediction {
  id: string;
  question: string;
  category: Category;
  endsIn: string;
  yesPct: number;
  volume: string;
  yourStake?: "yes" | "no";
}

export const PREDICTIONS: Prediction[] = [
  { id: "p1", question: "Nvidia hits $5T market cap before Q3 2026?", category: "Tech", endsIn: "82d", yesPct: 64, volume: "$2.1M", yourStake: "yes" },
  { id: "p2", question: "BTC closes above $150k by Dec 31, 2026?", category: "Crypto", endsIn: "210d", yesPct: 47, volume: "$4.8M" },
  { id: "p3", question: "Apple fined >$10B under DMA in 2026?", category: "Geopolitics", endsIn: "150d", yesPct: 28, volume: "$680k" },
  { id: "p4", question: "OpenAI IPO announced in 2026?", category: "Tech", endsIn: "320d", yesPct: 18, volume: "$1.2M" },
];

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  desc: string;
}

export const BADGES: Badge[] = [
  { id: "b1", name: "First Swipe", emoji: "👆", unlocked: true, desc: "Read your first lore." },
  { id: "b2", name: "7-Day Streak", emoji: "🔥", unlocked: true, desc: "A week of daily news." },
  { id: "b3", name: "Oracle", emoji: "🔮", unlocked: true, desc: "10 correct predictions." },
  { id: "b4", name: "Whale Watcher", emoji: "🐋", unlocked: false, desc: "Stake on 50 markets." },
  { id: "b5", name: "Geopolitics Nerd", emoji: "🌍", unlocked: false, desc: "Read 25 geopolitics stories." },
  { id: "b6", name: "Diamond Mind", emoji: "💎", unlocked: false, desc: "30-day streak." },
];

export interface Personality {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  gradient: "neon" | "fire" | "mint";
  vibe: string;
}

export const PERSONALITIES: Personality[] = [
  { id: "a1", name: "Sage", tagline: "Calm. Deep. Contextual.", emoji: "🧙", gradient: "mint", vibe: "Explains like a wise mentor — full historical depth." },
  { id: "a2", name: "Hype", tagline: "Loud. Fast. Meme-fluent.", emoji: "🚀", gradient: "fire", vibe: "TikTok energy. Cuts to the spicy take in 5 seconds." },
  { id: "a3", name: "Analyst", tagline: "Numbers. Charts. No vibes.", emoji: "📊", gradient: "neon", vibe: "Bloomberg-grade rigor. Sources every claim." },
  { id: "a4", name: "Skeptic", tagline: "Question everything.", emoji: "🕵️", gradient: "neon", vibe: "Devil's advocate. Surfaces the counter-narrative." },
];

export interface BattleStory {
  id: string;
  emoji: string;
  title: string;
  votes: number;
}

export interface Battle {
  id: string;
  topic: string;
  a: BattleStory;
  b: BattleStory;
}

export const BATTLES: Battle[] = [
  {
    id: "bt1",
    topic: "Which story matters more this week?",
    a: { id: "a", emoji: "🤖", title: "Nvidia hits $4T", votes: 12480 },
    b: { id: "b", emoji: "₿", title: "BTC ETFs swallow $80B", votes: 9320 },
  },
  {
    id: "bt2",
    topic: "Bigger long-term impact?",
    a: { id: "a", emoji: "⚖️", title: "EU breaks Big Tech", votes: 7210 },
    b: { id: "b", emoji: "🏭", title: "TSMC Arizona scales", votes: 6190 },
  },
];

export const LEADERBOARD = [
  { rank: 1, name: "@alpha_sage", xp: 24850, streak: 142, avatar: "🦊" },
  { rank: 2, name: "@bytequeen", xp: 22100, streak: 98, avatar: "👑" },
  { rank: 3, name: "@oracle.eth", xp: 19720, streak: 76, avatar: "🔮" },
  { rank: 4, name: "you", xp: 8420, streak: 12, avatar: "🌀" },
  { rank: 5, name: "@dogeparent", xp: 7980, streak: 21, avatar: "🐶" },
];

export const USER = {
  handle: "@you",
  avatar: "🌀",
  xp: 8420,
  level: 14,
  nextLevelXp: 10000,
  streak: 12,
  longestStreak: 34,
  predictionsCorrect: 18,
  predictionsTotal: 27,
};
