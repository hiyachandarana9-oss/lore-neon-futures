interface Props {
  points: number[];
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function Sparkline({
  points,
  color = "oklch(0.88 0.22 135)",
  className,
  width = 80,
  height = 28,
}: Props) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const areaD = `${d} L${width},${height} L0,${height} Z`;
  const last = points[points.length - 1];
  const lastY = height - ((last - min) / range) * height;
  const id = `sg-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${id})`} />
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={lastY} r="2.2" fill={color}>
        <animate attributeName="r" values="2.2;3.4;2.2" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
