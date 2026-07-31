import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Measure before the browser paints so the desktop never shows one frame at
// full size (overflowing the viewport, with the dock overlapping the apps
// window) before snapping to the fitted scale. useLayoutEffect can't run
// during SSR, so fall back to useEffect there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scales an element down so it fits the viewport height without page scroll.
 * - Only on desktop (lg+); on smaller screens it returns scale 1 (normal stacking/scroll).
 * - Never upscales (capped at 1) and floored at 0.62 so it never gets unreadable.
 * - `active` lets the caller disable scaling (e.g. while a window is expanded
 *   full-screen, where the overlay must render at 1:1).
 *
 * offsetHeight is used to read the *natural* (pre-transform) height, so applying
 * the resulting transform never feeds back into the measurement.
 */
export function useFitScale(active: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [naturalH, setNaturalH] = useState(0);

  useIsomorphicLayoutEffect(() => {
    let debounce = 0;

    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const nat = el.offsetHeight; // layout height, unaffected by CSS transform
      // Ignore transient zero-height reads (pre-layout) instead of resetting
      // the scale back to 1, which left it stuck unscaled on first paint.
      if (nat === 0) return;
      setNaturalH(nat);
      const lg = window.innerWidth >= 1024;
      if (!lg || !active) {
        setScale(1);
        return;
      }
      const avail = window.innerHeight - 130; // top/bottom padding + dock
      setScale(Math.max(0.62, Math.min(1, avail / nat)));
    };

    // setTimeout (not rAF — rAF is paused on hidden/background tabs, which left
    // the scale unapplied until a resize). Debounced so the ResizeObserver
    // can't trip its loop warning.
    const debounced = () => {
      clearTimeout(debounce);
      debounce = window.setTimeout(compute, 60);
    };

    // Apply immediately, then re-apply after first paint and after
    // fonts/async data settle — the first measurement can be premature.
    compute();
    const t1 = setTimeout(compute, 150);
    const t2 = setTimeout(compute, 600);

    window.addEventListener("resize", debounced);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && ref.current) {
      ro = new ResizeObserver(debounced);
      ro.observe(ref.current);
    }
    return () => {
      clearTimeout(debounce);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", debounced);
      ro?.disconnect();
    };
  }, [active]);

  return { ref, scale, naturalH };
}
