import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Calming deep-sea ambient generated with the WebAudio API.
 * Brown noise + slow LFO gain modulation ≈ underwater currents / waves.
 * No external audio file needed — plays consistently offline.
 */
export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; sources: AudioBufferSourceNode[] } | null>(null);

  const start = async () => {
    if (typeof window === "undefined") return;
    if (ctxRef.current) {
      await ctxRef.current.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    ctxRef.current = ctx;

    // Brown noise buffer (~4s loop)
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    // Low-pass for "underwater" muffling
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 420;
    lp.Q.value = 0.6;

    // Slow LFO modulating master gain -> ocean swell
    const master = ctx.createGain();
    master.gain.value = 0.18;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.09;
    lfo.connect(lfoGain).connect(master.gain);

    src.connect(lp).connect(master).connect(ctx.destination);
    src.start();
    lfo.start();

    // Fade in
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 2.5);

    nodesRef.current = { gain: master, sources: [src] };
  };

  const stop = async () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    await ctx.suspend();
  };

  useEffect(() => {
    if (on) void start();
    else void stop();
  }, [on]);

  // Auto-start on first user gesture anywhere
  useEffect(() => {
    if (typeof window === "undefined") return;
    const kick = () => {
      setOn(true);
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Mute ambient ocean" : "Play ambient ocean"}
      className="fixed bottom-6 right-6 z-[90] glass-strong rounded-full h-11 w-11 flex items-center justify-center text-cyan hover:text-mist transition-colors"
      data-hover
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span
        className="absolute inset-0 rounded-full border border-cyan/40 pointer-events-none"
        style={{ animation: on ? "sonar-ping 2.6s ease-out infinite" : undefined }}
      />
    </button>
  );
}