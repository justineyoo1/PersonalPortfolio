"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts an integer up to `to` once it scrolls into view, then pins to `to`.
 * Robust by construction: a mount-level timeout guarantees the final value
 * lands even when IntersectionObserver / rAF are throttled (e.g. offscreen or
 * background tabs). Respects prefers-reduced-motion.
 */
export function CountUp({
  to,
  durationMs = 1700,
  className,
  format,
}: {
  to: number;
  durationMs?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setVal(to);
      return;
    }

    let rafId = 0;
    let safetyId = 0;
    let fallbackId = 0;
    let started = false;
    let startTime = 0;

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / durationMs);
      // easeOutQuart — gentler deceleration than cubic for a smoother count.
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(eased * to));
      if (t < 1) rafId = requestAnimationFrame(step);
      else setVal(to);
    };

    const begin = () => {
      if (started) return;
      started = true;
      clearTimeout(fallbackId);
      rafId = requestAnimationFrame(step);
      safetyId = window.setTimeout(() => setVal(to), durationMs + 400);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          begin();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    fallbackId = window.setTimeout(() => {
      io.disconnect();
      setVal(to);
    }, durationMs + 1200);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(safetyId);
      clearTimeout(fallbackId);
    };
  }, [to, durationMs]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {format ? format(val) : val}
    </span>
  );
}
