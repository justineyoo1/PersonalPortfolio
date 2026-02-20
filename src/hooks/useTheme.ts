import { useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
      return "light";
    }
    return "dark";
  });

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
  const accentTextClass = isDark ? "text-[#60A5FA]" : "text-[#2563EB]";
  const windowThemeClass = isDark
    ? "terminal-window bg-[#0B0F14]/90 border border-gray-700/90"
    : "terminal-window bg-[#F6F6F6]/92 border border-gray-300/90";
  const gridThemeClass = isDark
    ? "bg-[#111827]/45 border border-gray-700"
    : "bg-gray-100/60 border border-gray-300";
  const overlayThemeClass = isDark
    ? "bg-[#0B0F14]/95 border border-gray-700"
    : "bg-white border border-gray-300";

  const headerClass = useMemo(
    () => (selected: boolean) =>
      `py-0.5 text-[12px] leading-none tracking-[0.01em] ${
        isDark
          ? selected
            ? "bg-white text-black"
            : "bg-gray-500 text-black"
          : selected
            ? "bg-gray-500 text-black"
            : "bg-gray-200 text-black"
      }`,
    [isDark],
  );

  const tabClass = useMemo(
    () => (active: boolean) =>
      active
        ? isDark
          ? "px-1.5 py-1 rounded shrink-0 leading-none text-[11px] bg-gray-200 text-black"
          : "px-1.5 py-1 rounded shrink-0 leading-none text-[11px] bg-gray-800 text-white"
        : isDark
          ? "px-1.5 py-1 rounded shrink-0 leading-none text-[11px] text-[#60A5FA] hover:bg-gray-800/55"
          : "px-1.5 py-1 rounded shrink-0 leading-none text-[11px] text-[#2563EB] hover:bg-gray-200/65",
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
