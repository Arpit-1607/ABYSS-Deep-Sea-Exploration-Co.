import { useEffect, useState } from "react";

/**
 * Occasional sonar wave that sweeps across the screen from a random side.
 * Purely additive ambient — sits above scene but ignores pointer events.
 */
export function SonarSweep() {
  const [key, setKey] = useState(0);
  const [origin, setOrigin] = useState({ x: 10, y: 40 });

  useEffect(() => {
    let t: number;
    const schedule = () => {
      const delay = 14000 + Math.random() * 16000;
      t = window.setTimeout(() => {
        setOrigin({ x: Math.random() * 100, y: 20 + Math.random() * 60 });
        setKey((k) => k + 1);
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden mix-blend-screen" aria-hidden>
      <span
        key={key}
        className="absolute rounded-full"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
          border: "1px solid oklch(0.85 0.14 210 / 0.55)",
          boxShadow: "0 0 30px oklch(0.85 0.14 210 / 0.6), inset 0 0 20px oklch(0.85 0.14 210 / 0.3)",
          animation: "sonar-sweep 4.5s ease-out forwards",
        }}
      />
    </div>
  );
}