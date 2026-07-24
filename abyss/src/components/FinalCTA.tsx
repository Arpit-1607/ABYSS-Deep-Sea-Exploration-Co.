import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import submarineImg from "@/assets/submarine.png";
import { ParticleField } from "./Ambient";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [0, 1, 0.25]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);

  return (
    <section id="cta" ref={ref} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-abyss">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.15_0.06_240)_0%,oklch(0.05_0.02_250)_60%)]" />

      <ParticleField count={80} />

      <motion.img
        src={submarineImg}
        alt=""
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 h-56 md:h-72 opacity-70 pointer-events-none"
        style={{ x, opacity, scale, left: "50%", marginLeft: "-14rem" }}
      />
      {/* Submarine glow lights */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 flex gap-6 pointer-events-none"
        style={{ x, left: "50%", marginLeft: "-8rem" }}
      >
        <div className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_60px_20px_oklch(0.85_0.14_210/0.9)]" />
        <div className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_60px_20px_oklch(0.85_0.14_210/0.9)]" />
      </motion.div>

      <div className="relative z-10 max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="eyebrow">The final frontier</div>
          <h2 className="mt-6 font-display text-5xl md:text-7xl font-light text-mist leading-[1.05]">
            Ready to discover<br />
            <span className="italic text-cyan text-glow">the unknown?</span>
          </h2>
          <p className="mt-8 max-w-lg mx-auto text-muted-foreground">
            Six berths remain across the 2027 season. Your submersible is waiting.
          </p>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-abyss btn-abyss-hover mt-12 !py-5 !px-10 text-base"
            data-hover
          >
            Book Your Expedition <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}