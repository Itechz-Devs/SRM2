import { useCallback, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";

type ImageComparisonSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export default function ImageComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Original",
  afterLabel = "Enhanced SRM",
  className = "",
}: ImageComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    updatePosition(event.clientX);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    isDragging.current = false;
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (event.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] w-full select-none overflow-hidden bg-[#06100e] sm:aspect-video ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Before image (full width, base layer) */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {/* After image (clipped to slider position) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-200">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-emerald-300/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-950">
        {afterLabel}
      </span>

      {/* Divider line + handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white/80"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison slider"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 3L1 7L4 11" stroke="#07110f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 3L13 7L10 11" stroke="#07110f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}