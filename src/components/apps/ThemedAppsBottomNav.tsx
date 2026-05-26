"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AppsBottomNav } from "./AppsBottomNav";

export function ThemedAppsBottomNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  return (
    <AppsBottomNav
      isDark={isDark}
      onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
