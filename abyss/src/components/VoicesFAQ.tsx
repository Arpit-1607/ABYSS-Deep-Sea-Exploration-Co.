import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Nothing in space rivals descending into a hydrothermal vent field. ABYSS gave me the closest thing to a first contact I will ever have.",
    name: "Dr. Iris Nakamura",
    role: "Marine biologist · Woods Hole",
  },
  {
    quote: "The engineering is Apple-caliber. The service is Aman-caliber. And then you drop past 4,000 meters and it stops being a hotel.",
    name: "Sébastien Vaury",
    role: "Founder · Vaury Automotive",
  },
  {
    quote: "My children will grow up knowing we saw a snailfish alive in the Mariana. ABYSS turned my family into explorers.",
    name: "Priya Kohli",
    role: "Guest · Mariana Descent",
  },
];

const FAQ = [
  { q: "Do I need diving experience to book?", a: "No. Guests remain inside the pressurised submersible for the entire descent. A one-day briefing at our Azores base prepares you for the mission." },
  { q: "How safe is a dive to 11,000 meters?", a: "Every Leviathan-VII hull is certified beyond Challenger Deep and carries five independent life-support and ballast systems. Zero incidents in 47 expeditions." },
  { q: "What's included?", a: "All submersible dives, mothership accommodation, executive chef meals, expedition photography, and a co-authored scientific report." },
  { q: "How do you offset emissions?", a: "Our mothership is solar-hybrid and submersibles are battery-electric. Every expedition funds reef restoration exceeding its footprint by 3×." },
  { q: "Can I bring a research team?", a: "Yes — charter dives with dedicated payload space for instruments and up to two additional scientists are available on request." },
];

export function VoicesFAQ() {
  return (
    <section className="relative py-32 bg-abyss">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="eyebrow">Voices from the deep</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-light text-mist">
            What our <span className="italic text-cyan">explorers</span> say.
          </h2>

          <div className="mt-10 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 relative"
              >
                <Quote className="h-6 w-6 text-cyan/50 mb-3" />
                <p className="text-mist leading-relaxed">{t.quote}</p>
                <footer className="mt-4 flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan/60 to-teal/60 shadow-glow" />
                  <div>
                    <div className="text-mist">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow">Frequently asked</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-light text-mist">
            Before you <span className="italic text-cyan">descend</span>.
          </h2>

          <div className="mt-10 divide-y divide-cyan/10 glass rounded-2xl overflow-hidden">
            {FAQ.map((item, i) => (
              <FaqRow key={item.q} q={item.q} a={item.a} initial={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ q, a, initial }: { q: string; a: string; initial?: boolean }) {
  const [open, setOpen] = useState(!!initial);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full text-left p-6 group"
      data-hover
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-lg text-mist group-hover:text-cyan transition-colors">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-cyan shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </button>
  );
}