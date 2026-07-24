import { useEffect, useState } from "react";
import { AquariusLauncher } from "./Aquarius";


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Expeditions", href: "#expeditions" },
    { label: "Depths", href: "#journey" },
    { label: "Species", href: "#species" },
    { label: "Vessel", href: "#submarine" },
    { label: "Journal", href: "#gallery" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass rounded-full py-2 px-4" : ""
        }`}
        style={scrolled ? { maxWidth: "72rem" } : undefined}
      >
        <a href="#top" className="flex items-center gap-2.5" data-hover>
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-cyan/50" />
            <span className="absolute inset-1 rounded-full border border-cyan/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_oklch(0.85_0.14_210)]" />
          </span>
          <span className="font-display text-lg tracking-[0.35em] text-mist">ABYSS</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-muted-foreground hover:text-cyan transition-colors"
              data-hover
            >
              {l.label}
              <span className="pointer-events-none absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan opacity-0 shadow-[0_0_10px_oklch(0.85_0.14_210)] transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#cta" className="btn-abyss btn-abyss-hover text-sm !py-2 !px-5" data-hover>
            Book Expedition
          </a>
          <AquariusLauncher />
        </div>

      </div>
    </header>
  );
}