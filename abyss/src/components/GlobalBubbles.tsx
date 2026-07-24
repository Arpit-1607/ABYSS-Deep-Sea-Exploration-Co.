import { useMemo } from "react";

/**
 * Site-wide realistic bubbles rising from the bottom of the viewport.
 * Fixed overlay, pointer-events-none, sits above backgrounds but below content.
 */
export function GlobalBubbles({ count = 32 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 4 + Math.random() * 18;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          dur: 10 + Math.random() * 14,
          delay: -Math.random() * 20,
          drift: (Math.random() - 0.5) * 60,
          opacity: 0.25 + Math.random() * 0.5,
        };
      }),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.98 0.02 210 / 0.95), oklch(0.85 0.13 210 / 0.35) 55%, transparent 70%)",
            boxShadow:
              "inset -1px -2px 4px oklch(0.98 0.02 210 / 0.6), 0 0 12px oklch(0.85 0.13 210 / 0.35)",
            border: "1px solid oklch(0.95 0.05 210 / 0.35)",
            // custom horizontal drift via CSS var
            ["--drift" as string]: `${b.drift}px`,
            animation: `bubble-float ${b.dur}s linear ${b.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}