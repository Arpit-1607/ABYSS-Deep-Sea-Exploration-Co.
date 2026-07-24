import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Cpu, Leaf, Radar, ShieldCheck, Ship } from "lucide-react";

const TIMELINE = [
  { icon: ShieldCheck, title: "PADI + DNV certified crew", desc: "Every dive led by scientists with 8+ years in deep-water research." },
  { icon: Ship, title: "Luxury private cabins", desc: "Six suites aboard the mothership — Egyptian linen, panoramic teak decks." },
  { icon: Cpu, title: "World-class submersibles", desc: "Titanium hulls certified to 11,300 m. Only fleet of its class." },
  { icon: Leaf, title: "Zero-emission technology", desc: "Solar-hybrid mothership, battery-electric submersibles, carbon-negative operation." },
  { icon: Radar, title: "Real-time sonar mesh", desc: "Live 3D mapping of the seafloor streamed to guests during descent." },
  { icon: Award, title: "Explorer's Club partner", desc: "Every guest becomes a co-author of the expedition's public science report." },
];

const STATS = [
  { v: 47_800, suffix: " m", label: "Meters explored" },
  { v: 1_240, suffix: "", label: "Species logged" },
  { v: 47, suffix: "", label: "Expeditions" },
  { v: 12, suffix: "", label: "Countries served" },
  { v: 89, suffix: "", label: "Researchers hosted" },
];

export function WhyStats() {
  return (
    <section className="relative py-32 bg-abyss">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <div className="eyebrow">Why ABYSS</div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-light text-mist">
            Built for the <span className="italic text-cyan">impossible</span>.
          </h2>
        </div>

        <div className="relative grid md:grid-cols-2 gap-8">
          <div className="absolute left-1/2 top-0 bottom-0 hidden md:block w-px bg-gradient-to-b from-transparent via-cyan/40 to-transparent" />
          {TIMELINE.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className={`relative glass rounded-2xl p-6 ${i % 2 === 1 ? "md:mt-16" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-mist">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live stats */}
        <div className="mt-32 glass-strong rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCounter({ v, suffix, label }: { v: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(v * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, v]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl text-mist text-glow tabular-nums">
        {n.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}