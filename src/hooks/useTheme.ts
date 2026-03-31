import { useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  // Hydrate real theme on mount to avoid server/client mismatch
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      return;
    }
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const handler = () =>
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    window.addEventListener("toggleTheme", handler);
    return () => window.removeEventListener("toggleTheme", handler);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    // Sync with next-themes class on <html> so CSS variables match
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(theme);
    html.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isDark = theme === "dark";
  const accentTextClass = isDark ? "text-[#60A5FA]" : "text-[#007AFF]";

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
    accentTextClass,
    windowThemeClass,
    gridThemeClass,
    overlayThemeClass,
    headerClass,
    tabClass,
  };
};
