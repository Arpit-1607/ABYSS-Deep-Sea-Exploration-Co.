import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {X} from "lucide-react";
import anglerfishImg from "@/assets/species-anglerfish-real.jpg";
import seahorseImg from "@/assets/species-seahorse.jpg";
import combJellyImg from "@/assets/species-jelly.jpg";
import turtleImg from "@/assets/species-turtle.jpg";

const SPECIES = [
  {
    name: "Sea Turtle",
    sci: "Chelonia mydas",
    depth: "40 m",
    img: turtleImg,
    fact:
      "Ancient mariners of the reef — sea turtles have navigated Earth's oceans for over 100 million years. Guided by the planet's magnetic field, they return across thousands of kilometres to the exact beach where they hatched to lay their own eggs.",
  },
  {
    name: "Comb Jelly",
    sci: "Ctenophora",
    depth: "1,000 m",
    img: combJellyImg,
    fact:
      "One of the oldest animal lineages on Earth. Comb jellies swim by beating eight rows of iridescent cilia that scatter light into a shifting rainbow, and many species produce their own soft blue-green bioluminescence when disturbed.",
  },
  {
    name: "Anglerfish",
    sci: "Melanocetus johnsonii",
    depth: "2,000 m",
    img: anglerfishImg,
    fact:
      "The abyss's most iconic predator. A modified dorsal spine dangles a bioluminescent lure powered by symbiotic bacteria, drawing curious prey straight into needle-toothed jaws where sunlight has never reached.",
  },
  {
    name: "Seahorse",
    sci: "Hippocampus",
    depth: "30 m",
    img: seahorseImg,
    fact:
      "A fish that swims upright and mates for life. Males carry the developing young in a brood pouch until birth — one of the only species on Earth where the father is fully pregnant.",
  },
];

export function Species() {
  const [active, setActive] = useState<null | number>(null);

  return (
    <section id="species" className="relative py-32 bg-midnight/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="text-center mb-16">
          <div className="eyebrow">Field register</div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-light text-mist">
            Creatures we <span className="italic text-cyan">catalogued</span>.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIES.map((s, i) => (
            <motion.button
              key={s.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative text-left rounded-3xl overflow-hidden glass"
              data-hover
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 80px oklch(0.85 0.14 210 / 0.4)" }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[10px] font-mono tracking-widest text-cyan">{s.depth}</div>
                <div className="mt-1 font-display text-2xl text-mist text-glow">{s.name}</div>
                <div className="mt-1 text-xs italic text-muted-foreground">{s.sci}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-abyss/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-4xl w-full grid md:grid-cols-2 rounded-3xl overflow-hidden glass-strong"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full glass flex items-center justify-center text-mist hover:text-cyan"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={SPECIES[active].img} alt={SPECIES[active].name} className="h-full w-full object-cover aspect-square md:aspect-auto" />
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="eyebrow">Species profile</div>
                <h3 className="mt-3 font-display text-4xl text-mist text-glow">{SPECIES[active].name}</h3>
                <div className="mt-1 italic text-cyan/80">{SPECIES[active].sci}</div>
                <div className="mt-6 text-sm font-mono text-cyan">Encountered at {SPECIES[active].depth}</div>
                <p className="mt-6 text-muted-foreground leading-relaxed">{SPECIES[active].fact}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}