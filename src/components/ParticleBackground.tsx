"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [particlesReady, setParticlesReady] = useState(false);
  const containerRef = useRef<Container | null>(null);

  useEffect(() => {
    const checkTheme = () => {
      const htmlEl = document.documentElement;
      const hasDarkClass = htmlEl.classList.contains("dark");
      setIsDarkMode(hasDarkClass);
    };

    checkTheme();

    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await particlesInit(engine);
    }).then(() => setParticlesReady(true));
  }, [particlesInit]);

  // Clean up lingering canvas when switching to light mode
  useEffect(() => {
    if (!isDarkMode && containerRef.current) {
      containerRef.current.destroy();
      containerRef.current = null;
    }
    if (!isDarkMode) {
      document.getElementById("tsparticles")?.remove();
    }
  }, [isDarkMode]);

  if (!particlesReady) {
    return null;
  }

  // Dark mode: original particle network
  if (isDarkMode) {
    return (
      <Particles
        key="dark"
        id="tsparticles"
        particlesLoaded={async (container) => {
          containerRef.current = container ?? null;
        }}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: {} },
            modes: { repulse: { distance: 150, duration: 0.4 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 140, enable: true, opacity: 0.5, width: 1 },
            move: { enable: true, speed: 0.25, outModes: { default: "bounce" } },
            number: { density: { enable: true, width: 800, height: 800 }, value: 70 },
            opacity: { value: 0.25 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="particles-container"
      />
    );
  }

  // Light mode: gradient mesh orbs (pure CSS, zero JS cost)
  return (
    <div className="particles-container">
      <div
        className="absolute rounded-full blur-[120px] opacity-50 animate-[float-1_20s_ease-in-out_infinite]"
        style={{
          width: "45vw",
          height: "45vw",
          top: "5%",
          left: "10%",
          background: "radial-gradient(circle, #007AFF 0%, #5856D6 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px] opacity-40 animate-[float-2_25s_ease-in-out_infinite]"
        style={{
          width: "40vw",
          height: "40vw",
          top: "30%",
          right: "5%",
          background: "radial-gradient(circle, #AF52DE 0%, #FF2D55 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[140px] opacity-35 animate-[float-3_22s_ease-in-out_infinite]"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "0%",
          left: "25%",
          background: "radial-gradient(circle, #34C759 0%, #30D5C8 50%, transparent 70%)",
        }}
      />
    </div>
  );
}
