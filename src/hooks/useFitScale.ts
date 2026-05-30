import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const nat = el.offsetHeight; // layout height, unaffected by CSS transform
      setNaturalH(nat);
      const lg = window.innerWidth >= 1024;
      if (!lg || !active || nat === 0) {
        setScale(1);
        return;
      }
      const avail = window.innerHeight - 130; // top/bottom padding + dock
      setScale(Math.max(0.62, Math.min(1, avail / nat)));
    };

    compute();
    window.addEventListener("resize", compute);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && ref.current) {
      ro = new ResizeObserver(compute);
      ro.observe(ref.current);
    }
    return () => {
      window.removeEventListener("resize", compute);
      ro?.disconnect();
    };
  }, [active]);

  return { ref, scale, naturalH };
}
