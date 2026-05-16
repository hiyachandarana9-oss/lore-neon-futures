import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/lore/MobileShell";
import { TopBar } from "@/components/lore/TopBar";
import { PERSONALITIES } from "@/lib/mock-data";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "LORE — Your AI" }] }),
  component: AIPage,
});

function AIPage() {
  const [selected, setSelected] = useState("a2");
  const active = PERSONALITIES.find((p) => p.id === selected)!;

  return (
    <MobileShell>
      <TopBar title="AI" />
      <div className="px-4 pt-2 pb-4">
        <h1 className="text-2xl font-black tracking-tight">
          Pick your <span className="text-gradient-neon">narrator</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Same news, different vibe. Switch anytime.
        </p>
      </div>

      <div className="space-y-3 px-4">
        {PERSONALITIES.map((p) => {
          const isActive = p.id === selected;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={
                "glass-strong relative w-full overflow-hidden rounded-2xl p-4 text-left transition " +
                (isActive ? "ring-neon" : "")
              }
            >
              <div className={"absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl gradient-" + p.gradient} />
              <div className="flex items-start gap-3">
                <div className={"flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-neon gradient-" + p.gradient}>
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold">{p.name}</h3>
                    {isActive && (
                      <span className="flex items-center gap-1 rounded-full bg-lime-400/20 px-2 py-0.5 text-[10px] font-semibold text-lime-300">
                        <Check className="h-3 w-3" /> active
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-cyan-300">{p.tagline}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.vibe}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-4 pt-6">
        <div className="glass-strong relative overflow-hidden rounded-2xl p-4">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Preview · {active.name}
          </div>
          <p className="text-sm leading-relaxed">
            {previewText(active.id)}
          </p>
        </div>
      </div>
    </MobileShell>
  );
}

function previewText(id: string) {
  switch (id) {
    case "a1":
      return "Nvidia's $4T moment is the culmination of a 30-year bet on parallel compute — a story that begins in a Denny's booth in 1993 and now reshapes global energy demand.";
    case "a2":
      return "Bro. Nvidia just hit $4T. That's bigger than the GDP of India. Jensen's leather jacket is now legally a national landmark. 🚀🔥";
    case "a3":
      return "NVDA: $4.0T mkt cap. FY26E rev $185B (+58% YoY). DC segment 72% of revs. Capex commitments from hyperscalers +$200B for '26. Multiple compression risk: 38x fwd.";
    case "a4":
      return "Everyone's bullish on Nvidia. That alone should make you nervous. Concentration risk in 4 hyperscaler customers. Custom silicon from Google and AWS is the real story nobody's pricing in.";
    default:
      return "";
  }
}
