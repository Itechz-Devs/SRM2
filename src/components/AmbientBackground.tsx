type AmbientBackgroundProps = {
  variant?: "amber" | "teal" | "mixed" | "rose" | "violet" | "spectrum";
  grid?: boolean;
};

const variantColors: Record<
  Exclude<NonNullable<AmbientBackgroundProps["variant"]>, "spectrum">,
  [string, string]
> = {
  amber: ["rgba(217,164,65,0.16)", "rgba(217,164,65,0.08)"],
  teal: ["rgba(45,212,191,0.16)", "rgba(45,212,191,0.08)"],
  mixed: ["rgba(217,164,65,0.14)", "rgba(45,212,191,0.14)"],
  rose: ["rgba(244,114,182,0.15)", "rgba(251,146,60,0.10)"],
  violet: ["rgba(167,139,250,0.16)", "rgba(99,102,241,0.10)"],
};

/**
 * A quiet, decorative background layer for sections that would otherwise be a
 * flat single color. Two large blurred glows drift slowly, with an optional
 * faint technical grid panning underneath. Purely decorative — pointer
 * events are disabled and it sits behind all content via z-index.
 *
 * "spectrum" renders three glows (teal, amber, violet) instead of two, for
 * sections that want a livelier, multi-hue wash rather than a single tint.
 */
export default function AmbientBackground({ variant = "mixed", grid = true }: AmbientBackgroundProps) {
  if (variant === "spectrum") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {grid ? <div className="grid-pan absolute inset-0 opacity-70" /> : null}
        <div
          className="drift-blob-a absolute -left-[8%] top-[6%] h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.14), transparent 70%)" }}
        />
        <div
          className="drift-blob-b absolute right-[6%] top-[38%] h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.13), transparent 70%)" }}
        />
        <div
          className="drift-blob-a absolute -right-[6%] bottom-[2%] h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.14), transparent 70%)" }}
        />
      </div>
    );
  }

  const [colorA, colorB] = variantColors[variant];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {grid ? <div className="grid-pan absolute inset-0 opacity-70" /> : null}
      <div
        className="drift-blob-a absolute -left-[10%] top-[10%] h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${colorA}, transparent 70%)` }}
      />
      <div
        className="drift-blob-b absolute -right-[10%] bottom-[5%] h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${colorB}, transparent 70%)` }}
      />
    </div>
  );
}
