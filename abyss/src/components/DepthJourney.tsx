import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import reefImg from "@/assets/zone-reef.jpg";
import twilightImg from "@/assets/zone-twilight.jpg";
import midnightImg from "@/assets/zone-midnight.jpg";
import abyssalImg from "@/assets/zone-abyssal.jpg";
import hadalImg from "@/assets/zone-hadal.jpg";

const ZONES = [
  {
    name: "Coral Reef",
    depth: "0 – 200 m",
    img: reefImg,
    tint: "oklch(0.5 0.12 200 / 0.35)",
    species: "Reef fish · Sea turtles · Anemones",
    desc: "Where sunlight sculpts turquoise cathedrals of living coral and shoals ripple like static.",
  },
  {
    name: "Twilight Zone",
    depth: "200 – 1,000 m",
    img: twilightImg,
    tint: "oklch(0.3 0.1 225 / 0.55)",
    species: "Lanternfish · Vampyroteuthis · Snipe eel",
    desc: "The last blue light fades. Silhouettes migrate vertically in the largest daily animal movement on Earth.",
  },
  {
    name: "Midnight Zone",
    depth: "1,000 – 4,000 m",
    img: midnightImg,
    tint: "oklch(0.12 0.06 240 / 0.7)",
    species: "Anglerfish · Gulper eel · Comb jellies",
    desc: "Pitch black. 90% of species produce their own light. Encounters are brief, alien and unforgettable.",
  },
  {
    name: "Abyssal Zone",
    depth: "4,000 – 6,000 m",
    img: abyssalImg,
    tint: "oklch(0.08 0.04 245 / 0.8)",
    species: "Giant isopod · Dumbo octopus · Grenadier",
    desc: "A near-freezing plain the size of every continent combined. Our submersibles hunt for the unnamed.",
  },
  {
    name: "Hadal Zone",
    depth: "6,000 – 11,034 m",
    img: hadalImg,
    tint: "oklch(0.05 0.06 30 / 0.6)",
    species: "Snailfish · Amphipods · Vent tubeworms",
    desc: "Trenches deeper than Everest is tall. Hydrothermal vents power ecosystems without a single ray of sunlight.",
  },
];

export function DepthJourney() {
  return (
    <section id="journey" className="relative bg-abyss">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 text-center">
        <div className="eyebrow inline-flex items-center gap-3">
          <span className="h-px w-8 bg-cyan/60" />
          The descent
          <span className="h-px w-8 bg-cyan/60" />
        </div>
        <h2 className="mt-6 font-display text-5xl md:text-7xl font-light text-mist max-w-3xl mx-auto">
          Six worlds stacked <span className="italic text-cyan text-glow">beneath one</span>.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
          Every 500 meters, biology, chemistry and light rewrite themselves. Scroll to descend through each zone.
        </p>
      </div>

      {ZONES.map((z, i) => (
        <ZonePanel key={z.name} zone={z} index={i} />
      ))}
    </section>
  );
}

function ZonePanel({ zone, index }: { zone: (typeof ZONES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img src={zone.img} alt={zone.name} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: zone.tint }} />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-abyss/70" />
      </motion.div>

      <div className={`relative mx-auto max-w-7xl px-6 py-24 w-full ${flip ? "text-right" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1 }}
          className={`max-w-xl ${flip ? "ml-auto" : ""}`}
        >
          <div className="eyebrow">Zone 0{index + 1}</div>
          <div className={`mt-3 flex items-center gap-4 ${flip ? "justify-end" : ""}`}>
            <span className="font-mono text-xs tracking-widest text-cyan">{zone.depth}</span>
            <span className="h-px w-16 bg-cyan/40" />
          </div>
          <h3 className="mt-6 font-display text-5xl md:text-7xl font-light text-mist text-glow">
            {zone.name}
          </h3>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{zone.desc}</p>
          <div className="mt-6 text-sm text-cyan/80 font-mono">{zone.species}</div>
        </motion.div>
      </div>
    </div>
  );
}