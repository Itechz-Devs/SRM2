type ResolutionGridProps = {
  label?: string;
  variant?: "coarse" | "fine";
  className?: string;
};

const coarseColors = ["#6f8f45", "#7ca35a", "#8aa75c", "#536f3b", "#b2a56e", "#496f5a"];
const fineColors = [
  "#5f7f3d", "#6f8f45", "#7ca35a", "#8aa75c", "#94b06a", "#536f3b",
  "#b2a56e", "#a89660", "#496f5a", "#3f6250", "#7ca35a", "#8aa75c",
];

export default function ResolutionGrid({
  label,
  variant = "coarse",
  className = "",
}: ResolutionGridProps) {
  const cells = variant === "coarse" ? 6 : 14;
  const colors = variant === "coarse" ? coarseColors : fineColors;
  const cols = variant === "coarse" ? 6 : 14;
  const rows = variant === "coarse" ? 4 : 10;
  const cellSize = 300 / cols;

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 200" className="w-full" role="img" aria-label={label ?? "Resolution grid"}>
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const colorIndex = (row * cols + col) % colors.length;
            return (
              <rect
                key={`${row}-${col}`}
                x={col * cellSize}
                y={row * (200 / rows)}
                width={cellSize}
                height={200 / rows}
                fill={colors[colorIndex]}
                stroke="rgba(7,17,15,0.35)"
                strokeWidth={variant === "coarse" ? 1.5 : 0.4}
              />
            );
          }),
        )}
      </svg>
      {label ? (
        <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
          {label}
        </p>
      ) : null}
    </div>
  );
}