import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Clock, Gauge, Sparkles, Users } from "lucide-react";

const EXPEDITIONS = [
  {
    name: "Mariana Descent",
    depth: "10,935 m",
    duration: "9 days",
    difficulty: "Extreme",
    rare: "Snailfish · Xenophyophores",
    availability: "2 seats · Q2 2027",
    price: "$1,250,000",
    tag: "Signature",
  },
  {
    name: "Bioluminescent Passage",
    depth: "3,400 m",
    duration: "5 days",
    difficulty: "Advanced",
    rare: "Vampire squid · Comb jellies",
    availability: "6 seats · Q4 2026",
    price: "$480,000",
    tag: "Guest favourite",
  },
  {
    name: "Vent Fields of Alvin",
    depth: "2,500 m",
    duration: "7 days",
    difficulty: "Advanced",
    rare: "Tubeworms · Yeti crab",
    availability: "4 seats · Q1 2027",
    price: "$620,000",
    tag: "Scientific",
  },
  {
    name: "Reef to Twilight",
    depth: "900 m",
    duration: "4 days",
    difficulty: "Intermediate",
    rare: "Six-gill shark · Lanternfish",
    availability: "10 seats · Q3 2026",
    price: "$180,000",
    tag: "First dive",
  },
];

export function Expeditions() {
  return (
    <section id="expeditions" className="relative py-32 bg-abyss">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="eyebrow">Fleet expeditions</div>
            <h2 className="mt-4 font-display text-5xl md:text-6xl font-light text-mist max-w-2xl">
              Chart a course into the <span className="italic text-cyan">unmapped</span>.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Four active expeditions across three oceans. All berths are private, hand-crewed, and carbon-neutral.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {EXPEDITIONS.map((e, i) => (
            <TiltCard key={e.name} exp={e} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ exp, delay }: { exp: (typeof EXPEDITIONS)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group relative rounded-3xl glass p-8 overflow-hidden transition-shadow hover:shadow-glow"
      data-hover
    >
      <div className="pointer-events-none absolute -top-32 -right-24 h-64 w-64 rounded-full bg-cyan/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-coral">{exp.tag}</span>
          <h3 className="mt-2 font-display text-3xl md:text-4xl text-mist">{exp.name}</h3>
        </div>
        <ArrowUpRight className="h-5 w-5 text-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Meta icon={Gauge} label="Max depth" value={exp.depth} />
        <Meta icon={Clock} label="Duration" value={exp.duration} />
        <Meta icon={Sparkles} label="Difficulty" value={exp.difficulty} />
        <Meta icon={Users} label="Availability" value={exp.availability} />
      </div>

      <div className="mt-6 pt-6 border-t border-cyan/15">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Rare encounters</div>
        <div className="mt-1 text-sm text-cyan/90 font-mono">{exp.rare}</div>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">From</div>
          <div className="font-display text-3xl text-mist text-glow">{exp.price}</div>
        </div>
        <button className="btn-ghost-abyss !py-2 !px-5 text-sm" data-hover>Reserve</button>
      </div>
    </motion.article>
  );
}

function Meta({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 text-sm text-mist">{value}</div>
    </div>
  );
}