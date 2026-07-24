import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import jellyfishImg from "@/assets/jellyfish.png";

type Phase = "black" | "intro" | "descending" | "done";

const DEPTHS = [0, 50, 200, 500, 1000, 3000, 6000, 11000];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("black");
  const [depthIndex, setDepthIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase("intro"), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "descending") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= DEPTHS.length) {
        clearInterval(id);
        setTimeout(() => {
          setPhase("done");
          onDone();
        }, 700);
        return;
      }
      setDepthIndex(i);
    }, 380);
    return () => clearInterval(id);
  }, [phase, onDone]);

  const beginDescent = () => setPhase("descending");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-abyss"
        >
          {/* radial ambient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, oklch(0.2 0.08 235 / 0.6), oklch(0.05 0.02 250) 60%)",
            }}
          />

          {/* particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-cyan/40"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse-glow ${3 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* drifting jellyfish */}
          <motion.img
            src={jellyfishImg}
            alt=""
            aria-hidden
            className="absolute h-72 md:h-96 opacity-80 pointer-events-none"
            initial={{ x: "-20vw", y: "40vh", rotate: -8 }}
            animate={{ x: "110vw", y: "20vh", rotate: 4 }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{ filter: "drop-shadow(0 0 60px oklch(0.85 0.14 210 / 0.7))" }}
          />

          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                <motion.div
                  initial={{ letterSpacing: "0.6em", opacity: 0 }}
                  animate={{ letterSpacing: "0.35em", opacity: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="font-display text-5xl md:text-7xl font-light text-mist text-glow"
                >
                  ABYSS
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1.4 }}
                  className="mt-8 max-w-md text-sm md:text-base text-muted-foreground font-light leading-relaxed"
                >
                  The ocean covers 71% of Earth.<br />We have explored less than 5%.
                </motion.p>

                <motion.button
                  onClick={beginDescent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 1 }}
                  className="mt-12 btn-abyss btn-abyss-hover"
                >
                  <span className="h-2 w-2 rounded-full bg-abyss animate-pulse-glow" />
                  Begin Descent
                </motion.button>
              </motion.div>
            )}

            {phase === "descending" && (
              <motion.div
                key="descend"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* deepening overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: 0.2 + depthIndex * 0.11 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "linear-gradient(to bottom, oklch(0.05 0.02 250 / 0), oklch(0.03 0.02 245) 80%)" }}
                />

                {/* rising bubbles */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full border border-cyan/50 bg-cyan/10"
                    style={{
                      width: 6 + Math.random() * 10,
                      height: 6 + Math.random() * 10,
                      left: `${Math.random() * 100}%`,
                      animation: `bubble-rise ${4 + Math.random() * 4}s linear infinite`,
                      animationDelay: `${Math.random() * 4}s`,
                    }}
                  />
                ))}

                {/* depth meter */}
                <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-cyan/70 mb-4">Depth</div>
                  <ul className="space-y-3 font-mono text-sm">
                    {DEPTHS.map((d, i) => (
                      <li
                        key={d}
                        className={`transition-all duration-500 ${
                          i <= depthIndex
                            ? "text-cyan text-glow scale-105"
                            : "text-muted-foreground/40"
                        }`}
                      >
                        <span className="inline-block w-8 text-right">{d}</span>
                        <span className="ml-1 text-xs opacity-60">m</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="eyebrow mb-4">Descending</div>
                  <div className="font-display text-6xl md:text-8xl font-light text-mist text-glow tabular-nums">
                    {DEPTHS[depthIndex].toLocaleString()}
                    <span className="text-3xl ml-2 text-cyan/70">m</span>
                  </div>
                  <div className="mt-6 text-xs md:text-sm text-muted-foreground max-w-xs">
                    {getZoneName(DEPTHS[depthIndex])}
                  </div>
                </div>

                {/* headlights at bottom */}
                {depthIndex >= DEPTHS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-8"
                  >
                    <div className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_60px_20px_oklch(0.85_0.14_210/0.7)]" />
                    <div className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_60px_20px_oklch(0.85_0.14_210/0.7)]" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getZoneName(depth: number) {
  if (depth === 0) return "Surface — where light begins";
  if (depth <= 200) return "Sunlight Zone — coral reefs, tropical life";
  if (depth <= 1000) return "Twilight Zone — the last blue light";
  if (depth <= 4000) return "Midnight Zone — bioluminescent hunters";
  if (depth <= 6000) return "Abyssal Zone — near-freezing dark";
  return "Hadal Zone — pressure of 1,100 atmospheres";
}