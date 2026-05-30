import React, { useEffect, useRef } from "react";

// The classic donut.c, rendered as a rotating ASCII torus.
// Frames are written straight to the <pre> via a ref so we never trigger a
// React re-render per frame.

const CHARS = ".,-~:;=!*#$@";

function renderDonut(A: number, B: number, cols: number, rows: number): string {
  const out = new Array(cols * rows).fill(" ");
  const zbuf = new Array(cols * rows).fill(0);

  const cosA = Math.cos(A),
    sinA = Math.sin(A),
    cosB = Math.cos(B),
    sinB = Math.sin(B);

  const R1 = 1,
    R2 = 2,
    K2 = 5;
  const K1 = cols * K2 * 3 / (8 * (R1 + R2));

  for (let theta = 0; theta < 6.283; theta += 0.12) {
    const ct = Math.cos(theta),
      st = Math.sin(theta);
    for (let phi = 0; phi < 6.283; phi += 0.04) {
      const cp = Math.cos(phi),
        sp = Math.sin(phi);

      const circlex = R2 + R1 * ct;
      const circley = R1 * st;

      const x = circlex * (cosB * cp + sinA * sinB * sp) - circley * cosA * sinB;
      const y = circlex * (sinB * cp - sinA * cosB * sp) + circley * cosA * cosB;
      const z = K2 + cosA * circlex * sp + circley * sinA;
      const ooz = 1 / z;

      const xp = Math.round(cols / 2 + K1 * ooz * x);
      // 0.5 compensates for monospace cells being ~2x taller than wide.
      const yp = Math.round(rows / 2 - K1 * ooz * y * 0.5);

      const L =
        cp * ct * sinB -
        cosA * ct * sp -
        sinA * st +
        cosB * (cosA * st - ct * sinA * sp);

      if (L > 0 && xp >= 0 && xp < cols && yp >= 0 && yp < rows) {
        const idx = xp + yp * cols;
        if (ooz > zbuf[idx]) {
          zbuf[idx] = ooz;
          const lum = Math.floor(L * 8);
          out[idx] = CHARS[lum > 0 ? Math.min(lum, CHARS.length - 1) : 0];
        }
      }
    }
  }

  let s = "";
  for (let j = 0; j < rows; j++) {
    s += out.slice(j * cols, (j + 1) * cols).join("") + "\n";
  }
  return s;
}

type Props = {
  animate?: boolean;
  cols?: number;
  rows?: number;
  className?: string;
  /** rotation increments per frame */
  speed?: number;
};

export default function AsciiDonut({
  animate = true,
  cols = 44,
  rows = 22,
  className,
  speed = 1,
}: Props) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let A = 0.0;
    let B = 0.0;
    let raf = 0;
    let last = 0;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      if (ref.current) ref.current.textContent = renderDonut(A, B, cols, rows);
    };

    if (!animate || reduce) {
      A = 0.7;
      B = 0.3;
      draw();
      return;
    }

    const loop = (t: number) => {
      // throttle to ~30fps to stay light on the battery
      if (t - last >= 33) {
        last = t;
        draw();
        A += 0.07 * speed;
        B += 0.03 * speed;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [animate, cols, rows, speed]);

  return (
    <pre
      ref={ref}
      aria-hidden
      className={className}
      style={{ filter: "drop-shadow(0 0 10px rgba(86, 211, 100, 0.35))" }}
    />
  );
}
