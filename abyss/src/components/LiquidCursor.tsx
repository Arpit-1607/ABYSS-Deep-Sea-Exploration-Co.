import { useEffect, useRef } from "react";

/**
 * Water-cursor enhancement: emits tiny rising bubbles along the pointer path
 * and soft ripple rings on click. Pure DOM/CSS — cheap, GPU-friendly.
 * Layered on top of the existing SonarCursor without replacing it.
 */
export function LiquidCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastEmit = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const layer = layerRef.current;
    if (!layer) return;

    const spawnBubble = (x: number, y: number, size: number) => {
      const b = document.createElement("span");
      const drift = (Math.random() - 0.5) * 40;
      const dur = 1600 + Math.random() * 1800;
      b.className = "lc-bubble";
      b.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;--drift:${drift}px;animation-duration:${dur}ms;`;
      layer.appendChild(b);
      setTimeout(() => b.remove(), dur);
    };




    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.hypot(dx, dy);
      lastPos.current = { x: e.clientX, y: e.clientY };
      if (now - lastEmit.current < 55) return;
      if (speed < 2) return;
      lastEmit.current = now;
      const size = 3 + Math.random() * 5;
      spawnBubble(
        e.clientX + (Math.random() - 0.5) * 14,
        e.clientY + (Math.random() - 0.5) * 8,
        size
      );
      if (Math.random() < 0.35) {
        spawnBubble(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 12,
          2 + Math.random() * 3
        );
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);


  return <div ref={layerRef} className="lc-layer" aria-hidden />;
}