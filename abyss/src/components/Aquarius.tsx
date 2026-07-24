import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";

type Msg = { id: string; role: "ai" | "user"; text: string };

const ZONE_MESSAGES: { at: number; text: string; key: string }[] = [
  { at: 0.0,  key: "surface",  text: "Welcome to the surface. Everything beneath us remains largely unexplored. Our journey begins now." },
  { at: 0.05, key: "descent",  text: "Pressure is increasing. Initiating descent sequence. Stay alert for the first signs of marine life." },
  { at: 0.16, key: "sunlight", text: "We are now entering the Sunlight Zone, where most ocean life thrives and sunlight still reaches the sea." },
  { at: 0.35, key: "twilight", text: "Natural light begins to fade. Watch closely for the first bioluminescent organisms." },
  { at: 0.55, key: "midnight", text: "Complete darkness surrounds us. Every source of light now comes from life itself." },
  { at: 0.75, key: "abyssal",  text: "An immense underwater desert. Extreme pressure. Extraordinary survival." },
  { at: 0.9,  key: "hadal",    text: "We've reached one of Earth's deepest frontiers. Very few humans have ever explored these depths." },
  { at: 0.98, key: "discovery",text: "Mission complete. Thank you for exploring the unknown with ABYSS. Every expedition brings us one step closer to understanding our oceans." },
];

const KB: { match: RegExp; reply: string }[] = [
  { match: /biolumin|glow|light/i, reply: "Bioluminescence is light produced by living organisms — a chemical reaction between luciferin and oxygen. In the deep sea it's used to hunt, camouflage, communicate, and attract mates. Nearly 80% of midwater species produce their own light." },
  { match: /depth|how deep|current depth/i, reply: "Your current depth is displayed on the telemetry rail at the left of the screen. Scroll deeper and the readings update in real time as we descend from the surface toward the Hadal Zone at 11,000 m." },
  { match: /pressure/i, reply: "Pressure increases by roughly 1 atmosphere every 10 metres. At 11,000 m the hull withstands over 1,100 atmospheres — the equivalent of a fully loaded jumbo jet resting on a fingertip." },
  { match: /telemetry/i, reply: "The telemetry rail on your left tracks depth, ocean zone, temperature, pressure, oxygen, visibility and nearby marine species. Hover the glowing bar to expand the full panel." },
  { match: /coral/i, reply: "Coral reefs are living cities built by tiny animals called polyps. They cover less than 1% of the ocean floor yet host over 25% of all marine species." },
  { match: /submarine|vessel|leviathan/i, reply: "You are aboard Leviathan-VII — a titanium-hulled submersible rated to 11,000 m with panoramic sapphire viewports and a life-support envelope of 96 hours." },
  { match: /zone|where am i/i, reply: "The ocean is layered into zones: Surface, Sunlight, Twilight, Midnight, Abyssal and Hadal. The telemetry panel names the zone you are currently drifting through." },
  { match: /dark|why is it dark/i, reply: "Below roughly 1,000 m no sunlight penetrates. All the light you see from here on is produced by life itself — bioluminescence." },
  { match: /species|creature|animal|fish|live here/i, reply: "Different zones host wildly different life: reef fish and turtles near the surface, lanternfish and squid in the twilight, anglerfish and gulper eels in the midnight, and pale ghost-white amphipods in the hadal trenches." },
  { match: /fact|interesting|tell me something/i, reply: "Here's one — we have better maps of the surface of Mars than of Earth's ocean floor. Over 80% of the ocean remains unexplored." },
  { match: /jelly/i, reply: "Jellyfish have drifted the oceans for more than 500 million years — older than the dinosaurs, older than trees, older than bones. They are 95% water and have no brain, no heart and no bones." },
  { match: /anglerfish/i, reply: "The anglerfish dangles a bioluminescent lure powered by symbiotic bacteria. In many species the tiny male permanently fuses to the female's body — a lifelong parasitic mate." },
  { match: /turtle/i, reply: "Sea turtles have navigated Earth's oceans for over 100 million years. Using the planet's magnetic field they return across thousands of kilometres to the exact beach where they hatched." },
  { match: /seahorse/i, reply: "Seahorses mate for life and it's the male who becomes pregnant — carrying developing young in a brood pouch until birth." },
  { match: /hello|hi|hey/i, reply: "Hello, Explorer. I'm right here beside you. Ask me anything about the depths we're passing through." },
  { match: /thank/i, reply: "It's an honour to descend with you." },
];

function reply(q: string): string {
  for (const k of KB) if (k.match.test(q)) return k.reply;
  return "That's a wonderful question. The deep ocean still guards most of its secrets — I'd suggest watching the telemetry as we descend, and asking me about the zone, the species, or the submarine itself.";
}

export function Aquarius() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Welcome aboard, Explorer. I'm AQUARIUS, your intelligent expedition guide. I'll accompany you throughout your descent.",
    },
  ]);
  const seen = useRef<Set<string>>(new Set(["surface"]));
  const scrollBox = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Open/close via Nav custom event
  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener("aquarius:toggle", onToggle);
    return () => window.removeEventListener("aquarius:toggle", onToggle);
  }, []);

  // Zone narration on scroll
  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      for (const z of ZONE_MESSAGES) {
        if (p >= z.at && !seen.current.has(z.key)) {
          seen.current.add(z.key);
          pushAi(z.text);
        }
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    scrollBox.current?.scrollTo({ top: scrollBox.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  function pushAi(text: string) {
    setTyping(true);
    const id = Math.random().toString(36).slice(2);
    setTimeout(() => {
      setMessages((m) => [...m, { id, role: "ai", text }]);
      setTyping(false);
    }, 700 + Math.min(1400, text.length * 12));
  }

  function send() {
    const q = input.trim();
    if (!q) return;
    const id = Math.random().toString(36).slice(2);
    setMessages((m) => [...m, { id, role: "user", text: q }]);
    setInput("");
    pushAi(reply(q));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="panel"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-24 right-4 md:right-6 z-[70] w-[min(92vw,380px)] h-[70vh] max-h-[640px] rounded-3xl glass-strong shadow-deep overflow-hidden flex flex-col"
          style={{ border: "1px solid oklch(0.85 0.14 210 / 0.25)" }}
        >
          <header className="flex items-center gap-3 px-5 py-4 border-b border-cyan/15">
            <AquariusAvatar size={40} />
            <div className="flex-1 min-w-0">
              <div className="font-display text-mist text-lg leading-none">AQUARIUS</div>
              <div className="text-[10px] uppercase tracking-widest text-cyan/80 mt-1">Onboard Guide · Online</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-9 w-9 rounded-full glass flex items-center justify-center text-mist hover:text-cyan"
              aria-label="Close AQUARIUS"
              data-hover
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollBox} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={m.role === "ai" ? "flex items-end gap-2" : "flex items-end gap-2 justify-end"}
              >
                {m.role === "ai" && (
                  <span className="relative shrink-0">
                    <AquariusAvatar size={26} pulse />
                  </span>
                )}
                <div
                  className={
                    m.role === "ai"
                      ? "max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed text-mist glass border border-cyan/15"
                      : "max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed text-mist bg-cyan/15 border border-cyan/25"
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <AquariusAvatar size={26} pulse />
                <div className="rounded-2xl rounded-bl-sm px-4 py-3 glass border border-cyan/15 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-cyan"
                      style={{ boxShadow: "0 0 10px oklch(0.85 0.14 210 / 0.9)" }}
                      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="p-3 border-t border-cyan/15 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the depths…"
              className="flex-1 bg-transparent border border-cyan/20 rounded-full px-4 py-2.5 text-sm text-mist placeholder:text-muted-foreground outline-none focus:border-cyan/60 transition-colors"
            />
            <button
              type="submit"
              className="h-10 w-10 shrink-0 rounded-full bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan hover:bg-cyan/30 transition-colors"
              aria-label="Send"
              data-hover
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function AquariusAvatar({ size = 36, pulse = false }: { size?: number; pulse?: boolean }) {
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-full"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #48CAE4, #00B4D8 45%, #0077B6 75%, #023E8A)",
          boxShadow:
            "0 0 18px oklch(0.85 0.14 210 / 0.75), 0 0 40px oklch(0.7 0.16 220 / 0.5), inset 0 0 12px oklch(0.95 0.05 200 / 0.5)",
        }}
        animate={pulse ? { scale: [1, 1.06, 1] } : { y: [0, -2, 0] }}
        transition={{ duration: pulse ? 1.6 : 3.2, ease: "easeInOut", repeat: Infinity }}
      />
      <span
        className="absolute rounded-full bg-white/70"
        style={{ width: size * 0.18, height: size * 0.18, top: size * 0.22, left: size * 0.28, filter: "blur(1px)" }}
      />
      <Sparkles className="relative h-3 w-3 text-white/90" style={{ transform: `scale(${size / 36})` }} />
    </span>
  );
}

/**
 * Launcher button — mount inside the Nav next to the Book Expedition button.
 */
export function AquariusLauncher() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("aquarius:toggle"))}
      className="relative h-10 w-10 rounded-full flex items-center justify-center group"
      aria-label="Open AQUARIUS assistant"
      data-hover
    >
      <span
        className="absolute inset-0 rounded-full border border-cyan/40 group-hover:border-cyan/70 transition-colors"
        style={{ boxShadow: "0 0 18px oklch(0.85 0.14 210 / 0.4)" }}
      />
      <AquariusAvatar size={32} />
      {/* tiny orbiting bubbles */}
      <motion.span
        className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan/70"
        style={{ top: -2, left: "50%", boxShadow: "0 0 8px oklch(0.85 0.14 210 / 0.9)" }}
        animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="pointer-events-none absolute h-1 w-1 rounded-full bg-aqua"
        style={{ bottom: -1, right: 2, boxShadow: "0 0 8px oklch(0.9 0.15 195 / 0.9)" }}
        animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </button>
  );
}

/**
 * One-shot volume reminder toast — appears on load, fades after 8s, only once per session.
 */
export function VolumeReminder() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("abyss:volumeReminderShown")) return;
    const t1 = setTimeout(() => setShow(true), 1200);
    const t2 = setTimeout(() => setShow(false), 1200 + 8000);
    sessionStorage.setItem("abyss:volumeReminderShown", "1");
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8, x: 8 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="fixed top-24 right-16 md:right-20 z-[60] glass-strong rounded-2xl px-4 py-2.5 max-w-xs text-xs text-mist border border-cyan/25 shadow-deep"
        >
          <span className="mr-1">🔊</span>
          For the best experience, increase your volume and use headphones.
        </motion.div>
      )}
    </AnimatePresence>
  );
}