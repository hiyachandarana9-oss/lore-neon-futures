import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, TrendingUp, Swords, User } from "lucide-react";

const items = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/predict", label: "Predict", icon: TrendingUp },
  { to: "/battle", label: "Battle", icon: Swords },
  { to: "/ai", label: "AI", icon: BookOpen },
  { to: "/profile", label: "You", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 px-3 pb-4 pt-2">
      <div className="glass-strong shadow-glass flex items-center justify-around rounded-3xl px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition"
            >
              <div
                className={
                  "flex h-9 w-9 items-center justify-center rounded-xl transition " +
                  (active
                    ? "gradient-neon text-primary-foreground shadow-neon"
                    : "text-muted-foreground group-hover:text-foreground")
                }
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </div>
              <span
                className={
                  "text-[10px] font-medium tracking-wide " +
                  (active ? "text-foreground" : "text-muted-foreground")
                }
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
