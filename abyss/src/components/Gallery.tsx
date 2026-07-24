import { motion } from "framer-motion";
import reef from "@/assets/zone-reef.jpg";
import twilight from "@/assets/zone-twilight.jpg";
import midnight from "@/assets/zone-midnight.jpg";
import abyssal from "@/assets/zone-abyssal.jpg";
import hadal from "@/assets/zone-hadal.jpg";
import angler from "@/assets/species-anglerfish.jpg";
import squid from "@/assets/species-squid.jpg";
import cteno from "@/assets/species-ctenophore.jpg";
import dumbo from "@/assets/species-dumbo.jpg";

const IMAGES = [
  { src: hadal, h: "row-span-2", cap: "Hadal vent field · 10,340 m" },
  { src: squid, h: "", cap: "Colossal squid · Ross Sea" },
  { src: reef, h: "", cap: "Belize reef · 22 m" },
  { src: abyssal, h: "row-span-2", cap: "Whale silhouette · 4,120 m" },
  { src: cteno, h: "", cap: "Comb jelly · 900 m" },
  { src: twilight, h: "", cap: "Twilight column · 620 m" },
  { src: angler, h: "", cap: "Anglerfish · 1,880 m" },
  { src: midnight, h: "row-span-2", cap: "Midnight zone · 2,600 m" },
  { src: dumbo, h: "", cap: "Dumbo octopus · 3,400 m" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-32 bg-abyss">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <div className="eyebrow">Expedition log</div>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-light text-mist max-w-3xl">
            Frames from the <span className="italic text-cyan">deep</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {IMAGES.map((im, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl glass ${im.h}`}
              data-hover
            >
              <img
                src={im.src}
                alt={im.cap}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent opacity-70" />
              <figcaption className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-cyan/90 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{im.cap}</span>
                <span className="h-1 w-1 rounded-full bg-cyan animate-pulse-glow" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}