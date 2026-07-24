import jellyfishImg from "@/assets/jellyfish.png";
import { BubbleColumn } from "./Ambient";

export function Footer() {
  return (
    <footer className="relative bg-abyss border-t border-cyan/10 overflow-hidden">
      {/* ocean floor */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.18 0.06 235 / 0.7), transparent 70%)",
        }}
      />
      <BubbleColumn count={12} />

      <img
        src={jellyfishImg}
        alt=""
        aria-hidden
        className="absolute right-4 bottom-4 h-32 md:h-40 opacity-30 pointer-events-none animate-float-slow"
        style={{ filter: "drop-shadow(0 0 40px oklch(0.85 0.14 210 / 0.6))" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-cyan/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_oklch(0.85_0.14_210)]" />
            </span>
            <span className="font-display text-lg tracking-[0.35em] text-mist">ABYSS</span>
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-xs">
            Private deep-sea expeditions from Ponta Delgada, Azores. Founded 2019.
          </p>
        </div>

        {[
          { title: "Explore", links: ["Expeditions", "Depths", "Species", "Vessel"] },
          { title: "Company", links: ["About", "Science", "Sustainability", "Careers"] },
          { title: "Contact", links: ["Concierge", "Press", "Partnerships", "Newsletter"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="eyebrow">{col.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-muted-foreground hover:text-cyan transition-colors" data-hover>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-cyan/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
          <span>© 2026 ABYSS Exploration Co.</span>
          <span>37.7412° N · 25.6756° W</span>
          <span>Certified carbon-negative operator</span>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-6 -mt-2 text-center text-xs tracking-wide text-mist/80">
          Made with 🤍 by Team Elevate. Let's HackOcean!
        </div>
      </div>
    </footer>
  );
}