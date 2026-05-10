"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * Small client island for theme toggling.
 * Used inside server-rendered pages (e.g. /app/support) so the rest of the
 * page can ship as static HTML for App Store review crawlers.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder of the same size pre-hydration so layout doesn't shift.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-xl p-1.5"
      >
        <span className="block w-6 h-6" />
      </button>
    );
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded-xl p-1.5 hover:bg-[#F2F2F7] dark:hover:bg-transparent dark:border dark:border-gray-700"
    >
      {isDark ? (
        <Sun className="w-6 h-6" color="white" />
      ) : (
        <Moon className="w-6 h-6" color="#1D1D1F" />
      )}
    </button>
  );
}
