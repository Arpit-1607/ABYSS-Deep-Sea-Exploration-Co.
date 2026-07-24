import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { DepthHUD } from "@/components/DepthHUD";
import { DepthJourney } from "@/components/DepthJourney";
import { Expeditions } from "@/components/Expeditions";
import { Species } from "@/components/Species";
import { Submarine } from "@/components/Submarine";
import { WhyStats } from "@/components/WhyStats";
import { Gallery } from "@/components/Gallery";
import { VoicesFAQ } from "@/components/VoicesFAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { SonarCursor } from "@/components/SonarCursor";
import { LiquidCursor } from "@/components/LiquidCursor";
import { AmbientAudio } from "@/components/AmbientAudio";
import { GlobalBubbles } from "@/components/GlobalBubbles";
import { SonarSweep } from "@/components/SonarSweep";
import { Aquarius, VolumeReminder } from "@/components/Aquarius";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // lock scroll during preloader
    document.body.style.overflow = ready ? "" : "hidden";
    if (!ready) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [ready]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <SonarCursor />
      <LiquidCursor />
      <AmbientAudio />
      <GlobalBubbles count={36} />
      <SonarSweep />
      <Nav />
      <DepthHUD />
      <main>
        <Hero />
        <DepthJourney />
        <Expeditions />
        <Species />
        <Submarine />
        <WhyStats />
        <Gallery />
        <VoicesFAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Aquarius />
      <VolumeReminder />
    </>
  );
}