"use client";

import { useEffect, useState } from "react";

// Match the actual iOS `AppAccent` enum (EunhoTheme.swift) so the web
// preview maps 1:1 to what the user would see in the shipping app.
type AccentKey = "cyan" | "amber" | "violet" | "rose" | "emerald";

// `hueRotate` is the CSS filter rotation applied to the in-bezel iPhone
// screenshot. The screenshot is the cyan-default app, so cyan = 0deg and
// every other accent is the angular delta in HSL space from cyan (~187deg)
// to the target hue. The iPhone screenshot's near-black background has
// saturation=0 so it stays black under any rotation — only the cyan ring,
// glow, and accent-colored UI elements shift.
const ACCENTS: Record<
  AccentKey,
  { hex: string; rgb: string; soft: string; hueRotate: string }
> = {
  cyan:    { hex: "#00E5FF", rgb: "0, 229, 255",   soft: "#BEEFF6", hueRotate: "0deg"    },
  amber:   { hex: "#FFB800", rgb: "255, 184, 0",   soft: "#FFE5B0", hueRotate: "-144deg" },
  violet:  { hex: "#BB86FC", rgb: "187, 134, 252", soft: "#E0CCFF", hueRotate: "78deg"   },
  rose:    { hex: "#FF4466", rgb: "255, 68, 102",  soft: "#FFB3C0", hueRotate: "163deg"  },
  emerald: { hex: "#00E676", rgb: "0, 230, 118",   soft: "#B0F5C8", hueRotate: "-41deg"  },
};

const STORAGE_KEY = "eunho-accent";

function applyAccent(key: AccentKey) {
  const a = ACCENTS[key];
  // Scope to .eunho-root so this doesn't leak to other pages if the user
  // back-navigates. We set vars at :root because the eunho-root rule reads
  // from the cascade — setting on document.documentElement wins regardless.
  const root = document.documentElement;
  root.style.setProperty("--eunho-ring", a.hex);
  root.style.setProperty("--eunho-ring-rgb", a.rgb);
  root.style.setProperty("--eunho-ring-soft", a.soft);
  root.style.setProperty("--eunho-hue-rotate", a.hueRotate);

  // Chrome quirk: `filter: hue-rotate(var(--x))` does not re-resolve when
  // --x changes (verified in Chrome 13x with both inline-style and
  // stylesheet rules — the variable updates everywhere except inside the
  // filter property). Belt-and-suspenders: also set the filter directly
  // on the screen-recolor element. This is the source of truth; the CSS
  // rule is just the initial-paint fallback for SSR.
  document.querySelectorAll<HTMLElement>(".eunho-screen-recolor").forEach((el) => {
    el.style.filter = `hue-rotate(${a.hueRotate})`;
  });
}

export function ThemeSwatch() {
  const [accent, setAccent] = useState<AccentKey>("cyan");

  // Hydration: read persisted choice, apply it immediately.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as AccentKey | null;
      if (saved && saved in ACCENTS) {
        setAccent(saved);
        applyAccent(saved);
      }
    } catch {
      // localStorage unavailable (private mode / SSR boundary). Default to cyan.
    }
  }, []);

  const pick = (key: AccentKey) => {
    setAccent(key);
    applyAccent(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // ignore quota / unavailable storage
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] tracking-[0.22em] uppercase font-medium"
        style={{ color: "#8B8B8B" }}
      >
        Glow color
      </span>
      <div className="flex items-center gap-2.5">
        {(Object.keys(ACCENTS) as AccentKey[]).map((key) => {
          const a = ACCENTS[key];
          const isSelected = accent === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => pick(key)}
              aria-label={`${key} accent`}
              aria-pressed={isSelected}
              className="relative grid place-items-center transition-transform"
              style={{
                width: 28,
                height: 28,
              }}
            >
              <span
                aria-hidden
                className="rounded-full transition-transform duration-200"
                style={{
                  width: 18,
                  height: 18,
                  background: a.hex,
                  boxShadow: isSelected
                    ? `0 0 12px 2px rgba(${a.rgb}, 0.7)`
                    : `0 0 6px 1px rgba(${a.rgb}, 0.35)`,
                  transform: isSelected ? "scale(1)" : "scale(0.9)",
                }}
              />
              {isSelected && (
                <span
                  aria-hidden
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: 0,
                    border: `1.5px solid #F5F5F5`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
