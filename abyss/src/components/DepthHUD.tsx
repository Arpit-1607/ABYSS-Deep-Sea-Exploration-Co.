import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

// Ordered zones, mapped by scroll progress
const ZONES = [
  { name: "Surface",      depth: 0,     temp: 22, oxygen: 8.2, visibility: 40, species: "Reef fish, turtles" },
  { name: "Sunlight Zone",depth: 50,    temp: 20, oxygen: 7.4, visibility: 30, species: "Dolphins, tuna" },
  { name: "Coral Reef",   depth: 200,   temp: 18, oxygen: 6.6, visibility: 22, species: "Anemones, seahorses" },
  { name: "Twilight",     depth: 1000,  temp: 6,  oxygen: 3.1, visibility: 6,  species: "Lanternfish, squid" },
  { name: "Midnight",     depth: 3000,  temp: 3,  oxygen: 2.4, visibility: 1,  species: "Anglerfish, gulper eel" },
  { name: "Abyssal",      depth: 6000,  temp: 2,  oxygen: 2.0, visibility: 0,  species: "Dumbo octopus, isopods" },
  { name: "Hadal",        depth: 11000, temp: 1,  oxygen: 1.8, visibility: 0,  species: "Snailfish, amphipods" },
];

function interp(p: number, key: "depth" | "temp" | "oxygen" | "visibility") {
  const scaled = p * (ZONES.length - 1);
  const i = Math.min(ZONES.length - 2, Math.floor(scaled));
  const t = scaled - i;
  const a = ZONES[i][key];
  const b = ZONES[i + 1][key];
  return a + (b - a) * t;
}

function zoneFor(p: number) {
  const idx = Math.min(ZONES.length - 1, Math.floor(p * ZONES.length));
  return ZONES[idx];
}

export function DepthHUD() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });

  const [zone, setZone] = useState(ZONES[0]);
  const [depth, setDepth] = useState(0);
  const [temp, setTemp] = useState(22);
  const [oxygen, setOxygen] = useState(8.2);
  const [visibility, setVisibility] = useState(40);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    return smooth.on("change", (p) => {
      setZone(zoneFor(p));
      setDepth(interp(p, "depth"));
      setTemp(interp(p, "temp"));
      setOxygen(interp(p, "oxygen"));
      setVisibility(interp(p, "visibility"));
    });
  }, [smooth]);

  const indicatorHeight = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const pressure = depth / 10 + 1;

  return (
    <div
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Depth telemetry"
    >
      {/* Slim glowing vertical rail (always visible) */}
      <div className="relative h-[60vh] w-[3px] rounded-full bg-cyan/10 overflow-hidden group cursor-pointer">
        <motion.div
          className="absolute left-0 right-0 top-0 rounded-full bg-gradient-to-b from-aqua via-cyan to-teal"
          style={{ height: indicatorHeight, boxShadow: "0 0 18px oklch(0.85 0.14 210 / 0.9), 0 0 40px oklch(0.85 0.14 210 / 0.5)" }}
        />
        {/* traveling glow head */}
        <motion.span
          className="absolute -left-[5px] h-3 w-3 rounded-full bg-aqua"
          style={{
            top: indicatorHeight,
            boxShadow: "0 0 20px oklch(0.9 0.15 195 / 0.9), 0 0 40px oklch(0.85 0.14 210 / 0.7)",
            translateY: "-50%",
          }}
        />
      </div>

      {/* Expanded telemetry panel */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong ml-4 rounded-2xl px-5 py-5 w-64 shadow-deep"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="eyebrow">Telemetry</div>
              <span className="h-2 w-2 rounded-full bg-aqua animate-pulse-glow" />
            </div>
            <Row label="Depth" value={`${Math.round(depth).toLocaleString()} m`} />
            <Row label="Zone" value={zone.name} />
            <Row label="Temp" value={`${temp.toFixed(1)}°C`} />
            <Row label="Pressure" value={`${pressure.toFixed(1)} atm`} />
            <Row label="Oxygen" value={`${oxygen.toFixed(1)} mg/L`} />
            <Row label="Visibility" value={`${Math.max(0, visibility).toFixed(0)} m`} />
            <Row label="Species" value={zone.species} small />
            <div className="mt-3 text-[10px] font-mono tracking-widest text-muted-foreground text-right">
              ABYSS · DISCOVERY
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-baseline justify-between py-1.5 border-b border-cyan/10 last:border-0 gap-3"
    >
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={`font-mono ${small ? "text-[11px]" : "text-sm"} text-cyan tabular-nums text-right`}>
        {value}
      </span>
    </motion.div>
  );
}