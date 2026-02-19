"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);

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

  if (!particlesReady) {
    return null;
  }

  return (
    <Particles
      key={isDarkMode ? "dark" : "light"}
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, resize: {} },
          modes: { repulse: { distance: 150, duration: 0.4 } },
        },
        particles: {
          color: { value: isDarkMode ? "#ffffff" : "#0f172a" },
          links: { color: isDarkMode ? "#ffffff" : "#0f172a", distance: 140, enable: true, opacity: isDarkMode ? 0.5 : 0.35, width: 1 },
          move: { enable: true, speed: 0.25, outModes: { default: "bounce" } },
          number: { density: { enable: true, width: 800, height: 800 }, value: 70 },
          opacity: { value: isDarkMode ? 0.25 : 0.12 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="particles-container"
    />
  );
}
