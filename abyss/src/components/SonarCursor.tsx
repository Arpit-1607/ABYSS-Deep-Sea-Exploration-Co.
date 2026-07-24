import { useEffect, useState } from "react";

export function SonarCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [pings, setPings] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("cursor-sonar");

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = (e: MouseEvent) => {
      const id = Date.now();
      setPings((p) => [...p, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setPings((p) => p.filter((x) => x.id !== id)), 900);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseover", over);
    return () => {
      document.body.classList.remove("cursor-sonar");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[200] mix-blend-screen transition-transform duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`,
        }}
        aria-hidden
      >
        <div className="h-8 w-8 rounded-full border border-cyan/70 shadow-[0_0_20px_oklch(0.85_0.14_210/0.6)]" />
        <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_oklch(0.85_0.14_210)]" style={{ top: 13, left: 13 }} />
      </div>
      {pings.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed z-[199] h-10 w-10 rounded-full border border-cyan/70"
          style={{ left: p.x - 20, top: p.y - 20, animation: "sonar-ping 0.9s ease-out forwards" }}
          aria-hidden
        />
      ))}
    </>
  );
}