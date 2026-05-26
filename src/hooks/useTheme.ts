import { useEffect, useMemo, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

type Theme = "dark" | "light";

/**
 * Single source of truth for theming. Delegates state to next-themes (which
 * also runs in the root layout's ThemeProvider) and exposes the derived class
 * helpers used across the app.
 *
 * The Taskbar dispatches a "toggleTheme" CustomEvent for legacy reasons; we
 * keep listening for it here and forward to next-themes so callers don't need
 * to change.
 */
export const useTheme = () => {
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to "dark" pre-mount to match the configured next-themes default
  // and avoid a flash on first paint.
  const theme: Theme =
    mounted && (resolvedTheme === "dark" || resolvedTheme === "light")
      ? resolvedTheme
      : "dark";

  const setTheme = (next: Theme) => setNextTheme(next);

  useEffect(() => {
    const handler = () => setNextTheme(theme === "dark" ? "light" : "dark");
    window.addEventListener("toggleTheme", handler);
    return () => window.removeEventListener("toggleTheme", handler);
  }, [theme, setNextTheme]);

  const isDark = theme === "dark";

  const windowThemeClass = isDark
    ? "terminal-window bg-[#0B0F14]/90 border border-gray-700/90"
    : "bg-[#F6F6F8]/95 backdrop-blur-2xl rounded-3xl apple-shadow apple-card-lift border border-white/80";

  const gridThemeClass = isDark
    ? "bg-[#111827]/70 border border-gray-700"
    : "bg-gradient-to-br from-[#D2D2D8] to-[#C8C8D0] border-none rounded-[2rem]";

  const overlayThemeClass = isDark
    ? "bg-[#0B0F14]/95 border border-gray-700"
    : "bg-[#F6F6F8]/98 backdrop-blur-3xl apple-shadow-overlay rounded-3xl";

  const headerClass = useMemo(
    () => (selected: boolean) =>
      isDark
        ? `py-0.5 text-[12px] leading-none tracking-[0.01em] ${
            selected ? "bg-white text-black" : "bg-gray-500 text-black"
          }`
        : `py-2.5 text-[13px] leading-none tracking-[0.02em] ${
            selected
              ? "bg-transparent text-[#1D1D1F] font-semibold"
              : "bg-transparent text-[#86868B] font-medium"
          }`,
    [isDark],
  );

  const tabClass = useMemo(
    () => (active: boolean) =>
      active
        ? isDark
          ? "px-1.5 py-1 rounded shrink-0 leading-none text-[11px] bg-gray-200 text-black"
          : "px-3 py-1.5 rounded-lg shrink-0 leading-normal text-[12px] bg-white text-[#1D1D1F] font-semibold tracking-wide shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] apple-transition z-10 relative"
        : isDark
          ? "px-1.5 py-1 rounded shrink-0 leading-none text-[11px] text-[#60A5FA] hover:bg-gray-800/55"
          : "px-3 py-1.5 rounded-lg shrink-0 leading-normal text-[12px] text-[#515154] hover:text-[#1D1D1F] font-medium tracking-wide apple-transition relative",
    [isDark],
  );

  return {
    theme,
    setTheme,
    isDark,
    windowThemeClass,
    gridThemeClass,
    overlayThemeClass,
    headerClass,
    tabClass,
  };
};
