import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clownfishImg from "@/assets/clownfish.png";
import anglerImg from "@/assets/anglerfish-real.png";
import starfishImg from "@/assets/starfish.png";
import turtleImg from "@/assets/turtle.png";
import tangImg from "@/assets/tang.png";

/**
 * Reef-level marine life above the coral foreground.
 * All swim directions match their head direction.
 */
export function ReefCreatures() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [flee, setFlee] = useState({ x: 0, y: 0 });
  const [flee2, setFlee2] = useState({ x: 0, y: 0 });
  const [flee3, setFlee3] = useState({ x: 0, y: 0 });
  const [flee4, setFlee4] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const compute = (rx: number, ry: number) => {
        const cx = rect.left + rect.width * rx;
        const cy = rect.top + rect.height * ry;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const away = (220 - dist) / 220;
          return { x: (-dx / dist) * 60 * away, y: (-dy / dist) * 40 * away };
        }
        return { x: 0, y: 0 };
      };
      setFlee(compute(0.28, 0.78));
      setFlee2(compute(0.78, 0.72));
      setFlee3(compute(0.86, 0.80));
      setFlee4(compute(0.7, 0.86));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-[6]" aria-hidden>
      {/* Clownfish — curious/fleeing near the left coral (head faces right, drift right) */}
      <motion.img
        src={clownfishImg}
        alt=""
        loading="lazy"
        className="absolute h-24 md:h-32 will-change-transform"
        style={{
          left: "16%",
          bottom: "14%",
          filter:
            "drop-shadow(0 6px 20px oklch(0.06 0.02 250 / 0.7)) drop-shadow(0 0 24px oklch(0.72 0.18 45 / 0.35))",
        }}
        animate={{
          x: [0 + flee.x, 30 + flee.x, -10 + flee.x, 0 + flee.x],
          y: [0 + flee.y, -14 + flee.y, -4 + flee.y, 0 + flee.y],
          rotate: [-2, 3, -1, -2],
        }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Extra clownfish (right of coral) — feeding cluster, cursor-reactive */}
      <motion.img
        src={clownfishImg}
        alt=""
        loading="lazy"
        className="absolute h-20 md:h-28 will-change-transform"
        style={{
          left: "76%",
          bottom: "16%",
          filter:
            "drop-shadow(0 6px 18px oklch(0.06 0.02 250 / 0.7)) drop-shadow(0 0 22px oklch(0.72 0.18 45 / 0.35))",
        }}
        animate={{
          x: [0 + flee2.x, -22 + flee2.x, 8 + flee2.x, 0 + flee2.x],
          y: [0 + flee2.y, -10 + flee2.y, -2 + flee2.y, 0 + flee2.y],
          rotate: [-3, 2, -1, -3],
        }}
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.img
        src={clownfishImg}
        alt=""
        loading="lazy"
        className="absolute h-16 md:h-24 will-change-transform"
        style={{
          left: "84%",
          bottom: "10%",
          filter:
            "drop-shadow(0 5px 16px oklch(0.06 0.02 250 / 0.65)) drop-shadow(0 0 18px oklch(0.72 0.18 45 / 0.3))",
          scaleX: -1,
        }}
        animate={{
          x: [0 + flee3.x, 20 + flee3.x, -6 + flee3.x, 0 + flee3.x],
          y: [0 + flee3.y, -8 + flee3.y, 2 + flee3.y, 0 + flee3.y],
          rotate: [2, -3, 1, 2],
        }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
      />
      <motion.img
        src={clownfishImg}
        alt=""
        loading="lazy"
        className="absolute h-14 md:h-20 will-change-transform"
        style={{
          left: "70%",
          bottom: "20%",
          filter:
            "drop-shadow(0 4px 14px oklch(0.06 0.02 250 / 0.6))",
        }}
        animate={{
          x: [0 + flee4.x, 14 + flee4.x, -4 + flee4.x, 0 + flee4.x],
          y: [0 + flee4.y, -12 + flee4.y, -3 + flee4.y, 0 + flee4.y],
          rotate: [-2, 4, 0, -2],
        }}
        transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity, delay: 2.4 }}
      />

      {/* Starfish resting on the reef, gentle breathing */}
      <motion.img
        src={starfishImg}
        alt=""
        loading="lazy"
        className="absolute h-20 md:h-28"
        style={{
          left: "58%",
          bottom: "6%",
          filter:
            "drop-shadow(0 8px 18px oklch(0.06 0.02 250 / 0.75)) drop-shadow(0 0 18px oklch(0.72 0.18 45 / 0.3))",
          rotate: -12,
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Anglerfish drifting mid-deep — head faces LEFT in source, flip to face RIGHT (drift direction) */}
      <motion.div
        className="absolute"
        style={{ top: "44%" }}
        animate={{ x: ["-20vw", "115vw"] }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      >
        <div className="relative" style={{ transform: "scaleX(-1)" }}>
          <motion.img
            src={anglerImg}
            alt=""
            loading="lazy"
            className="h-28 md:h-40 opacity-90"
            style={{
              filter:
                "drop-shadow(0 0 30px oklch(0.06 0.02 250 / 0.9)) drop-shadow(0 0 40px oklch(0.85 0.14 210 / 0.35))",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.span
            className="absolute rounded-full bg-aqua"
            style={{
              left: "6%",
              top: "38%",
              width: 10,
              height: 10,
              boxShadow:
                "0 0 20px oklch(0.9 0.15 195 / 0.95), 0 0 45px oklch(0.85 0.14 210 / 0.7)",
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Small sea turtle resting near the coral (lively, small, not swimming across) */}
      <motion.img
        src={turtleImg}
        alt=""
        loading="lazy"
        className="absolute h-16 md:h-24 opacity-95"
        style={{
          left: "34%",
          bottom: "8%",
          filter:
            "drop-shadow(0 8px 20px oklch(0.06 0.02 250 / 0.75)) drop-shadow(0 0 24px oklch(0.85 0.14 210 / 0.35))",
        }}
        animate={{
          y: [0, -6, 0, -3, 0],
          x: [0, 4, -2, 3, 0],
          rotate: [-2, 2, -1, 1, -2],
        }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Tang fish — head faces RIGHT; drift right (head-forward) */}
      <motion.img
        src={tangImg}
        alt=""
        loading="lazy"
        className="absolute h-14 md:h-20 opacity-90"
        style={{
          top: "62%",
          filter:
            "drop-shadow(0 6px 16px oklch(0.06 0.02 250 / 0.6)) drop-shadow(0 0 20px oklch(0.85 0.14 210 / 0.4))",
        }}
        animate={{ x: ["-20vw", "120vw"], y: [0, -20, 10, -6, 0] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      />
      {/* Second tang drifts LEFT — flip so head faces left (head-forward) */}
      <motion.img
        src={tangImg}
        alt=""
        loading="lazy"
        className="absolute h-10 md:h-14 opacity-80"
        style={{
          top: "68%",
          filter: "drop-shadow(0 4px 12px oklch(0.06 0.02 250 / 0.5))",
          scaleX: -1,
        }}
        animate={{ x: ["120vw", "-20vw"], y: [0, -12, 4, 0] }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity, delay: 6 }}
      />
    </div>
  );
}