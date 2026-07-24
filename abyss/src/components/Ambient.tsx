import { useEffect, useState } from "react";

/** Floating cyan particle field with optional density */
export function ParticleField({ count = 40, className = "" }: { count?: number; className?: string }) {
  const [seeds] = useState(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: 4 + Math.random() * 8,
      delay: Math.random() * 6,
    }))
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {seeds.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan/50"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `pulse-glow ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function BubbleColumn({ count = 20 }: { count?: number }) {
  const [seeds] = useState(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 4 + Math.random() * 12,
      dur: 6 + Math.random() * 8,
      delay: Math.random() * 8,
    }))
  );
  useEffect(() => {}, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {seeds.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full border border-cyan/40 bg-cyan/5"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            bottom: 0,
            animation: `bubble-rise ${s.dur}s linear infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GodRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-1/3 left-1/2 h-[140%] w-[80%] -translate-x-1/2 opacity-30 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 0%, transparent 0deg, oklch(0.85 0.14 210 / 0.35) 12deg, transparent 30deg, transparent 60deg, oklch(0.85 0.14 210 / 0.25) 75deg, transparent 100deg)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}