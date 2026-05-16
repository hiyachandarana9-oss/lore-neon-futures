export function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between px-4 pt-6 pb-3">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}
