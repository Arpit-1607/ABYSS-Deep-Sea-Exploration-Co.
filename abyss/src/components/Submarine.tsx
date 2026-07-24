import { motion } from "framer-motion";
import { useRef, useState } from "react";
import submarineImg from "@/assets/submarine.png";
import { Battery, Compass, Cpu, Gauge, Shield, Users } from "lucide-react";

const SPECS = [
  { icon: Gauge, label: "Max depth", value: "11,300 m", desc: "Titanium hull certified beyond Challenger Deep." },
  { icon: Users, label: "Capacity", value: "3 pilots · 4 guests", desc: "Panoramic 300° acrylic viewport dome." },
  { icon: Battery, label: "Endurance", value: "96 hours", desc: "Solid-state battery bank, zero-emission dive." },
  { icon: Shield, label: "Safety", value: "5 redundancies", desc: "Independent life-support and ballast systems." },
  { icon: Cpu, label: "Technology", value: "AI-assisted sonar", desc: "3D bathymetric mapping in real time." },
  { icon: Compass, label: "Navigation", value: "Inertial + doppler", desc: "GPS-denied precision under the crush." },
];

export function Submarine() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState(0);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    setRot(x * 30);
  };

  return (
    <section id="submarine" className="relative py-32 bg-abyss overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at center, oklch(0.28 0.09 230 / 0.4), transparent 60%)" }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="eyebrow">The vessel</div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-light text-mist">
            Meet <span className="italic text-cyan text-glow">Leviathan-VII</span>.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            A hand-built luxury submersible, engineered to survive the deepest place on Earth for four days at a time.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setRot(0)}
            className="lg:col-span-3 relative aspect-[16/10] flex items-center justify-center"
          >
            <div className="absolute inset-10 rounded-full bg-cyan/15 blur-3xl" />
            <motion.img
              src={submarineImg}
              alt="Leviathan-VII deep-sea submersible"
              loading="lazy"
              className="relative max-h-full max-w-full drop-shadow-[0_30px_60px_oklch(0.05_0.02_250/0.9)]"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              style={{ transform: `perspective(1200px) rotateY(${rot}deg)` }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.4em] text-muted-foreground">
              Drag horizontally
            </div>
          </div>

          <ul className="lg:col-span-2 space-y-2">
            {SPECS.map((s, i) => {
              const Icon = s.icon;
              const isActive = active === i;
              return (
                <li key={s.label}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-2xl p-4 transition-all border ${
                      isActive
                        ? "glass-strong border-cyan/40 shadow-glow"
                        : "border-transparent hover:bg-glass/40"
                    }`}
                    data-hover
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isActive ? "bg-cyan/20 text-cyan" : "bg-muted/50 text-muted-foreground"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.label}</div>
                        <div className="text-mist font-display text-lg">{s.value}</div>
                      </div>
                    </div>
                    <motion.p
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      className="overflow-hidden text-sm text-muted-foreground pl-14 pr-2"
                    >
                      <span className="block pt-2">{s.desc}</span>
                    </motion.p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}