import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import heroImg from "@/assets/hero-abyss.jpg";
import jellyfishImg from "@/assets/jellyfish.png";
import seahorseImg from "@/assets/seahorse.png";
import fishImg from "@/assets/fish-school.png";
import coralImg from "@/assets/coral-reef.png";
import { GodRays, ParticleField } from "./Ambient";
import { ReefCreatures } from "./ReefCreatures";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", `${x * 20}px`);
      el.style.setProperty("--my", `${y * 20}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen overflow-hidden bg-abyss"
    >
      {/* Hero image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: yImg, translate: "var(--mx, 0) var(--my, 0)" }}
      >
        <img
          src={heroImg}
          alt="Luxury deep-sea submarine illuminated by bioluminescent jellyfish"
          className="h-full w-full object-cover opacity-90"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-abyss/30 to-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/60 via-transparent to-abyss/60" />
      </motion.div>

      <GodRays />
      <ParticleField count={80} />

      {/* Coral reef foreground - realistic, lively */}
      <motion.img
        src={coralImg}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-0 w-[110%] max-w-none z-[5]"
        style={{ filter: "drop-shadow(0 -30px 60px oklch(0.06 0.02 250 / 0.85))" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Reef creatures layered above the coral */}
      <ReefCreatures />

      {/* Big ambient jellyfish */}
      <motion.img
        src={jellyfishImg}
        alt=""
        aria-hidden
        className="absolute right-[-6%] top-[8%] h-72 md:h-[28rem] opacity-70 pointer-events-none"
        animate={{ y: [0, -30, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        style={{ filter: "drop-shadow(0 0 80px oklch(0.85 0.14 210 / 0.5))" }}
      />

      {/* Seahorse drifting across (replaces small jellyfish) */}
      <motion.img
        src={seahorseImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[36%] h-44 md:h-60 opacity-90"
        style={{ filter: "drop-shadow(0 0 40px oklch(0.85 0.14 210 / 0.55))" }}
        animate={{
          x: ["-15vw", "60vw", "120vw"],
          y: [0, -20, 10],
          rotate: [-4, 3, -2],
        }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      />

      {/* Colorful fish schools */}
      <img
        src={fishImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[58%] h-24 md:h-32 opacity-90"
        style={{ animation: "swim-left 32s linear infinite", filter: "drop-shadow(0 0 30px oklch(0.7 0.16 200 / 0.55))" }}
      />
      <img
        src={fishImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[72%] h-16 md:h-20 opacity-80"
        style={{ animation: "swim-right 40s linear -10s infinite", filter: "drop-shadow(0 0 24px oklch(0.7 0.16 200 / 0.5))" }}
      />

      {/* content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 pt-40 md:pt-52 pb-32"
        style={{ y: yText, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-10 bg-cyan/60" />
          Depth 11,000 m · Est. 2019
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="mt-6 font-display text-[13vw] md:text-[8vw] leading-[0.95] font-light text-mist max-w-5xl"
        >
          Explore Earth's<br />
          <span className="italic font-extralight text-glow bg-gradient-to-b from-mist via-cyan to-teal bg-clip-text text-transparent">
            Final Frontier
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Private luxury submersible expeditions to hydrothermal vents,
          bioluminescent trenches and unmapped ridges — places where sunlight
          has never reached.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#expeditions" className="btn-abyss btn-abyss-hover" data-hover>
            Book Expedition
            <ArrowDown className="h-4 w-4" />
          </a>
          <a href="#journey" className="btn-ghost-abyss" data-hover>
            <Play className="h-4 w-4" /> Watch Journey
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
        >
          {[
            ["11,034m", "Max depth"],
            ["47", "Expeditions"],
            ["1,240", "Species logged"],
            ["8 yrs", "Zero incidents"],
          ].map(([v, l]) => (
            <div key={l} className="border-l border-cyan/20 pl-4">
              <div className="font-display text-2xl md:text-3xl text-mist text-glow">{v}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll to dive</span>
        <div className="h-10 w-px bg-gradient-to-b from-cyan to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
}