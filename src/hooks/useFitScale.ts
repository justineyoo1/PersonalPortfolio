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

    const run = () => {
      clearTimeout(debounce);
      debounce = window.setTimeout(compute, 50);
    };

    run();
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);
    window.addEventListener("load", run);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run).catch(() => {});
    }

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && ref.current) {
      ro = new ResizeObserver(run);
      ro.observe(ref.current);
    }

    // On cold production loads the initial compute sometimes doesn't apply
    // (only a later resize did). A dispatched resize reliably re-triggers it,
    // so kick a few times after mount to guarantee the fit lands.
    const kicks = [200, 600, 1200, 2000].map((d) =>
      window.setTimeout(() => window.dispatchEvent(new Event("resize")), d),
    );

    return () => {
      clearTimeout(debounce);
      kicks.forEach(clearTimeout);
      window.removeEventListener("resize", run);
      window.removeEventListener("orientationchange", run);
      window.removeEventListener("load", run);
      ro?.disconnect();
    };
  }, [active]);

  return { ref, scale, naturalH };
}
