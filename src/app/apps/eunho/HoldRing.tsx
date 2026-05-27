"use client";

import { useEffect, useRef, useState } from "react";

const HOLD_DURATION_MS = 2500;
const RESET_DELAY_MS = 1800;

export function HoldRing() {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [held, setHeld] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const tick = (now: number) => {
    if (startTimeRef.current == null) startTimeRef.current = now;
    const elapsed = now - startTimeRef.current;
    const p = Math.min(elapsed / HOLD_DURATION_MS, 1);
    setProgress(p);
    if (p >= 1) {
      setCompleted(true);
      setHeld(false);
      startTimeRef.current = null;
      rafRef.current = null;
      resetTimeoutRef.current = setTimeout(() => {
        setProgress(0);
        setCompleted(false);
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
    startTimeRef.current = null;
    if (reducedMotion) {
      // Reduce-motion: skip the animation, go straight to completed
      setProgress(1);
      setCompleted(true);
      setHeld(false);
      resetTimeoutRef.current = setTimeout(() => {
        setProgress(0);
        setCompleted(false);
      }, RESET_DELAY_MS);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  };

  const end = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (!completed) {
      setHeld(false);
      setProgress(0);
      startTimeRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // Ring math
  const size = 184;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);

  const secondsRemaining = ((1 - progress) * (HOLD_DURATION_MS / 1000)).toFixed(1);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center select-none"
      style={{ background: "#0A0A0A", touchAction: "none" }}
    >
      {/* Top status line */}
      <div className="text-center mb-6">
        <p
          className="font-serif text-[#F5F5F5] leading-tight"
          style={{ fontSize: "22px" }}
        >
          Hold<span style={{ color: "#00E5FF" }}>.</span>{" "}
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
        onPointerDown={begin}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
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
        {/* Animated glow that intensifies with progress */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              0 0 ${14 + 24 * progress}px ${1 + 2 * progress}px rgba(0,229,255,${0.5 + 0.45 * progress}),
              0 0 ${40 + 60 * progress}px ${6 + 16 * progress}px rgba(0,229,255,${0.22 + 0.28 * progress}),
              0 0 ${100 + 120 * progress}px ${24 + 48 * progress}px rgba(0,229,255,${0.08 + 0.12 * progress})
            `,
          }}
        />
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(0,229,255,0.12)"
            strokeWidth={stroke}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#00E5FF"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              filter: `drop-shadow(0 0 ${4 + 10 * progress}px rgba(0,229,255,${0.6 + 0.4 * progress}))`,
            }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {completed ? (
            <p
              className="font-serif text-[#F5F5F5]"
              style={{ fontSize: "18px" }}
            >
              Day held<span style={{ color: "#00E5FF" }}>.</span>
            </p>
          ) : held ? (
            <p
              className="text-[#F5F5F5] tabular-nums"
              style={{ fontSize: "18px", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
            >
              {secondsRemaining}s
            </p>
          ) : (
            <p
              className="font-serif italic text-[#F5F5F5]/65"
              style={{ fontSize: "14px" }}
            >
              Press
            </p>
          )}
        </div>
      </button>

      <p
        className="mt-7 text-[10px] tracking-[0.22em] uppercase"
        style={{ color: completed ? "#00E5FF" : "#8B8B8B" }}
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
