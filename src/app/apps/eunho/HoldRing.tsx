"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const HOLD_DURATION_MS = 2500;
const RESET_DELAY_MS = 1900;
const ACCENT = "#00E5FF";

// Match the real app's HomeView: 12 particles evenly around the ring, slight
// per-particle wobble in radius / size / speed (seeded at mount).
const PARTICLE_COUNT = 12;
type Particle = {
  baseAngle: number; // radians
  radiusOffset: number;
  sizeMul: number;
  speedMul: number;
};

export function HoldRing() {
  // Hold state
  const [progress, setProgress] = useState(0); // 0 to 1
  const [held, setHeld] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs for the rAF loop
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const particleRafRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completionAtRef = useRef<number | null>(null);

  // Canvas refs for the 60fps particle + ripple layer
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heldRef = useRef(false);
  const progressRef = useRef(0);
  const completedRef = useRef(false);

  // Stable random particles (seeded once at mount)
  const particles = useMemo<Particle[]>(() => {
    const seed = (i: number, salt: number) =>
      ((Math.sin(i * 99.71 + salt * 13.37) + 1) / 2) % 1;
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      baseAngle: (i / PARTICLE_COUNT) * Math.PI * 2,
      radiusOffset: (seed(i, 1) - 0.5) * 12,
      sizeMul: 0.6 + seed(i, 2) * 0.8,
      speedMul: 0.85 + seed(i, 3) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Progress tick (drives `progress` state at rAF cadence)
  const tick = (now: number) => {
    if (startTimeRef.current == null) startTimeRef.current = now;
    const elapsed = now - startTimeRef.current;
    const p = Math.min(elapsed / HOLD_DURATION_MS, 1);
    setProgress(p);
    progressRef.current = p;
    if (p >= 1) {
      setCompleted(true);
      completedRef.current = true;
      setHeld(false);
      heldRef.current = false;
      completionAtRef.current = now;
      startTimeRef.current = null;
      rafRef.current = null;
      resetTimeoutRef.current = setTimeout(() => {
        setProgress(0);
        progressRef.current = 0;
        setCompleted(false);
        completedRef.current = false;
        completionAtRef.current = null;
      }, RESET_DELAY_MS);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const begin = () => {
    if (completed) return;
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setHeld(true);
    heldRef.current = true;
    startTimeRef.current = null;
    if (reducedMotion) {
      setProgress(1);
      progressRef.current = 1;
      setCompleted(true);
      completedRef.current = true;
      completionAtRef.current = performance.now();
      setHeld(false);
      heldRef.current = false;
      resetTimeoutRef.current = setTimeout(() => {
        setProgress(0);
        progressRef.current = 0;
        setCompleted(false);
        completedRef.current = false;
        completionAtRef.current = null;
      }, RESET_DELAY_MS);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const end = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (!completedRef.current) {
      setHeld(false);
      heldRef.current = false;
      setProgress(0);
      progressRef.current = 0;
      startTimeRef.current = null;
    }
  };

  // Particle + ripple canvas loop (always running while mounted, reads refs)
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const center = size / 2;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);

      const p = progressRef.current;
      const h = heldRef.current;

      if (h && p > 0.02) {
        // Ripple rings (2 staggered, accelerating with progress)
        const cycleRate = 0.6 + p * 2.2;
        const tSec = t / 1000;
        const phaseBase = (tSec * cycleRate) % 1;
        for (let i = 0; i < 2; i++) {
          const offset = i / 2;
          const phase = (phaseBase + offset) % 1;
          const scale = 1.0 + phase * 0.55;
          const opacity = (1.0 - phase) * p * 0.7;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = ACCENT;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(center, center, (size * 0.38) * scale, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Orbiting spark particles
        const ringRadius = size * 0.38;
        for (const part of particles) {
          const angle =
            part.baseAngle + tSec * 1.2 * part.speedMul * (0.4 + p * 0.6);
          const radius = ringRadius + part.radiusOffset;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const partSize = part.sizeMul * (2.5 + p * 3.5);
          const alpha = p * 0.8 * part.sizeMul;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = ACCENT;
          ctx.beginPath();
          ctx.arc(x, y, partSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Completion burst — 3 expanding ripple waves over ~700ms
      if (completedRef.current && completionAtRef.current != null) {
        const since = t - completionAtRef.current;
        const dur = 700;
        if (since < dur) {
          const k = since / dur; // 0..1
          for (let w = 0; w < 3; w++) {
            const wPhase = Math.max(0, k - w * 0.12);
            if (wPhase <= 0) continue;
            const scale = 1.0 + wPhase * 0.7;
            const opacity = (1.0 - wPhase) * (1.0 - w * 0.25);
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = ACCENT;
            ctx.lineWidth = 2 - w * 0.4;
            ctx.beginPath();
            ctx.arc(center, center, (size * 0.42) * scale, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      particleRafRef.current = requestAnimationFrame(draw);
    };
    particleRafRef.current = requestAnimationFrame(draw);

    return () => {
      if (particleRafRef.current) cancelAnimationFrame(particleRafRef.current);
    };
  }, [reducedMotion, particles]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (particleRafRef.current) cancelAnimationFrame(particleRafRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // Ring math — match real app proportions
  const size = 220;
  const lineWidth = Math.round(size * 0.18); // ~40 — matches GlowRingView lineWidth = size * 0.18
  const r = (size - lineWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  // Inner gauge: 2px white hairline inside the bloom (mirrors real app)
  const innerR = r - lineWidth * 0.525;
  const innerCircumference = 2 * Math.PI * innerR;
  const innerDashOffset = innerCircumference * (1 - progress);

  // Tip glow: small dot at leading edge — only while held and not yet complete
  const tipAngle = -90 + 360 * progress; // degrees
  const tipX = size / 2 + r * Math.cos((tipAngle * Math.PI) / 180);
  const tipY = size / 2 + r * Math.sin((tipAngle * Math.PI) / 180);

  // Center G-mark: fades + scales slightly as hold builds
  const logoFade = 1 - Math.min(progress * 1.6, 0.85);
  const logoScale = 1 - progress * 0.08;

  const secondsRemaining = ((1 - progress) * (HOLD_DURATION_MS / 1000)).toFixed(1);

  return (
    <div
      className="eunho-screen-recolor absolute inset-0 flex flex-col items-center justify-center select-none"
      style={{ background: "#0A0A0A", touchAction: "none" }}
    >
      {/* Top status line — fades out as hold builds, like the real app */}
      <div
        className="text-center mb-6 transition-opacity"
        style={{ opacity: held ? Math.max(1 - progress * 2, 0) : 1 }}
      >
        <p
          className="font-serif text-[#F5F5F5] leading-tight"
          style={{ fontSize: "22px" }}
        >
          Hold<span style={{ color: ACCENT }}>.</span>{" "}
          <span className="font-serif italic text-[#F5F5F5]/75">Don&apos;t tap.</span>
        </p>
        <p
          className="font-serif italic mt-1"
          style={{ fontSize: "13px", color: "#BEEFF6" }}
        >
          2.5 seconds. No accidents.
        </p>
      </div>

      <button
        type="button"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
          begin();
        }}
        onPointerUp={end}
        onPointerCancel={end}
        onPointerLeave={(e) => {
          if (heldRef.current) end();
        }}
        className="relative rounded-full focus:outline-none"
        aria-label="Hold to check in"
        style={{
          width: size,
          height: size,
          background: "transparent",
          border: "none",
          padding: 0,
          touchAction: "none",
          cursor: held ? "grabbing" : "pointer",
        }}
      >
        {/* Particle + ripple canvas (60fps, behind the ring) */}
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none"
          style={{
            width: size * 1.8,
            height: size * 1.8,
            left: -size * 0.4,
            top: -size * 0.4,
            zIndex: 0,
          }}
        />

        {/* Outer bloom halo — intensifies with progress + held state */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            zIndex: 1,
            boxShadow: completed
              ? `0 0 24px 4px rgba(0,229,255,0.95), 0 0 60px 14px rgba(0,229,255,0.55), 0 0 140px 50px rgba(0,229,255,0.20)`
              : `
                0 0 ${14 + 24 * progress}px ${1 + 2 * progress}px rgba(0,229,255,${0.45 + 0.5 * progress}),
                0 0 ${40 + 60 * progress}px ${6 + 18 * progress}px rgba(0,229,255,${0.2 + 0.3 * progress}),
                0 0 ${100 + 120 * progress}px ${24 + 50 * progress}px rgba(0,229,255,${0.07 + 0.13 * progress})
              `,
          }}
        />

        {/* SVG ring stack (track + progress + tip glow + inner hairline gauge) */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block relative"
          style={{ zIndex: 2 }}
        >
          {/* Layer 1: outer soft halo behind the tube */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(0,229,255,0.05)"
            strokeWidth={lineWidth * 1.8}
            style={{ filter: "blur(6px)" }}
          />
          {/* Layer 2: main track — frosted cyan tube */}
          <defs>
            <linearGradient id="eunho-track" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,229,255,0.14)" />
              <stop offset="50%" stopColor="rgba(0,229,255,0.07)" />
              <stop offset="100%" stopColor="rgba(0,229,255,0.12)" />
            </linearGradient>
            <linearGradient id="eunho-progress" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,229,255,0.55)" />
              <stop offset="60%" stopColor={ACCENT} />
              <stop offset="100%" stopColor={ACCENT} />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#eunho-track)"
            strokeWidth={lineWidth}
            strokeLinecap="round"
          />
          {/* Layer 3: inner highlight tube — adds 3D depth */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(0,229,255,0.08)"
            strokeWidth={lineWidth * 0.4}
            strokeLinecap="round"
          />

          {/* Progress fill — bright neon stroke, gradient, with bloom */}
          {progress > 0.005 && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="url(#eunho-progress)"
              strokeWidth={lineWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                filter: `drop-shadow(0 0 ${6 + 14 * progress}px rgba(0,229,255,${0.7 + 0.3 * progress}))`,
              }}
            />
          )}

          {/* Hold overlay — extra-bright pass over the progress, only while held */}
          {held && progress > 0.005 && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={ACCENT}
              strokeWidth={lineWidth * 1.05}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              opacity={0.85}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                filter: `drop-shadow(0 0 ${10 + 16 * progress}px rgba(0,229,255,${0.7 + 0.3 * progress}))`,
              }}
            />
          )}

          {/* Inner 2px white hairline gauge — unmistakable progress marker */}
          {held && progress > 0.005 && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={innerR}
              fill="none"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={innerCircumference}
              strokeDashoffset={innerDashOffset}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
          )}

          {/* Tip glow — small dot at leading edge with bloom (only mid-progress, not on complete) */}
          {progress > 0.01 && progress < 0.995 && (
            <circle
              cx={tipX}
              cy={tipY}
              r={lineWidth * 0.35}
              fill={ACCENT}
              style={{
                filter: `drop-shadow(0 0 8px rgba(0,229,255,0.95))`,
              }}
            />
          )}
        </svg>

        {/* Center G-mark logo — pinned dead-center of the ring — plus the
            seconds label below it (absolutely placed so it never nudges the
            logo off-center). */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        >
          <img
            src="/img/apps/eunho/logo-mark.png"
            alt=""
            aria-hidden="true"
            className="block"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size * 0.32,
              height: size * 0.32,
              opacity: completed ? 0.15 : logoFade,
              transform: `translate(-50%, -50%) scale(${logoScale})`,
              transition: "opacity 150ms ease-out",
              // Tint the alpha PNG cyan via a CSS filter chain.
              // The PNG is a black silhouette + alpha; this turns the silhouette
              // into ACCENT cyan with bloom, like .renderingMode(.template) in SwiftUI.
              filter:
                "brightness(0) saturate(100%) invert(80%) sepia(60%) saturate(2500%) hue-rotate(140deg) brightness(105%) contrast(95%) drop-shadow(0 0 6px rgba(0,229,255,0.6))",
            }}
          />
          <p
            className="text-[#F5F5F5] tabular-nums"
            style={{
              position: "absolute",
              left: "50%",
              top: "66%",
              transform: "translateX(-50%)",
              fontSize: "15px",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              opacity: held && !completed ? 1 : 0,
              transition: "opacity 120ms ease-out",
              whiteSpace: "nowrap",
            }}
          >
            {secondsRemaining}s
          </p>
        </div>
      </button>

      <p
        className="mt-7 text-[10px] tracking-[0.22em] uppercase transition-colors"
        style={{ color: completed ? ACCENT : "#8B8B8B" }}
      >
        {completed
          ? "Day held"
          : held
            ? "Holding…"
            : "Press and hold"}
      </p>
    </div>
  );
}
