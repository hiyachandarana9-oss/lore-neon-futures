import { BottomNav } from "./BottomNav";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[440px]">
      <main className="pb-28">{children}</main>
      <BottomNav />
    </div>
  );
}
